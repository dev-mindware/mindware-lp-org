import { NextResponse } from "next/server";
import { sendLeadNotificationEmail, type LeadPayload } from "@/lib/email";

// Configurações de segurança da API
const MAX_PAYLOAD_BYTES = 32 * 1024; // 32 KB
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 5;
const REPLAY_WINDOW_MS = 20 * 1000; // 20 segundos de idempotência para duplo clique
const MIN_HUMAN_FILL_TIME_MS = 1800; // Mínimo de 1.8 segundos para preencher formulário

// Armazenamento em memória com limpeza automática de memória
interface RateLimitRecord {
  timestamps: number[];
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const recentSubmissions = new Map<string, number>(); // signature -> timestamp

let lastCleanup = Date.now();

function cleanupExpiredRecords() {
  const now = Date.now();
  if (now - lastCleanup < 60 * 1000 && rateLimitMap.size < 2000) {
    return;
  }
  lastCleanup = now;

  for (const [ip, record] of rateLimitMap.entries()) {
    const valid = record.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      record.timestamps = valid;
    }
  }

  for (const [sig, time] of recentSubmissions.entries()) {
    if (now - time > REPLAY_WINDOW_MS) {
      recentSubmissions.delete(sig);
    }
  }
}

function checkRateLimit(ip: string): boolean {
  cleanupExpiredRecords();
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { timestamps: [] };
  const validTimestamps = record.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    record.timestamps = validTimestamps;
    rateLimitMap.set(ip, record);
    return false; // Bloqueado
  }

  validTimestamps.push(now);
  record.timestamps = validTimestamps;
  rateLimitMap.set(ip, record);
  return true; // Permitido
}

function isDuplicateSubmission(signature: string): boolean {
  const now = Date.now();
  const lastTime = recentSubmissions.get(signature);
  if (lastTime && now - lastTime < REPLAY_WINDOW_MS) {
    return true;
  }
  recentSubmissions.set(signature, now);
  return false;
}

// Regex rigoroso para email compatível com RFC 5322 simplificado
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Caracteres permitidos para telefone internacional: dígitos, +, -, parêntesis e espaços
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{5,20}$/;

export async function POST(req: Request) {
  try {
    // 1. Validação de Content-Type
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { error: "Formato de requisição inválido. Utilize application/json." },
        { status: 415 }
      );
    }

    // 2. Extração segura de IP (considerando proxies confiáveis)
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : realIp?.trim() || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || undefined;

    // 3. Aplicação de Rate Limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error:
            "Limite de pedidos excedido. Por favor, aguarde um minuto antes de tentar novamente.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
          },
        }
      );
    }

    // 4. Verificação de tamanho do payload antes de consumir
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { error: "Tamanho da requisição excede o limite permitido (32KB)." },
        { status: 413 }
      );
    }

    const rawBody = await req.text();
    if (new TextEncoder().encode(rawBody).length > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { error: "Payload excessivamente grande." },
        { status: 413 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Corpo da requisição não é um JSON válido." },
        { status: 400 }
      );
    }

    // 5. Verificação de Honeypot Anti-Spam
    // Se website_hp tiver conteúdo, é um bot simples
    if (body.website_hp && typeof body.website_hp === "string" && body.website_hp.trim().length > 0) {
      // Retorno silencioso de sucesso
      return NextResponse.json({
        success: true,
        message: "Proposta recebida com sucesso!",
      });
    }

    // 6. Verificação de tempo mínimo de preenchimento humano (_t)
    const formMountedAt = typeof body._t === "number" ? body._t : Number(body._t);
    if (formMountedAt && !isNaN(formMountedAt)) {
      const elapsed = Date.now() - formMountedAt;
      if (elapsed > 0 && elapsed < MIN_HUMAN_FILL_TIME_MS) {
        // Submissão anormalmente rápida (< 1.8s) típica de automação
        return NextResponse.json({
          success: true,
          message: "Proposta recebida com sucesso!",
        });
      }
    }

    // 7. Validação estrita de tipos e limites de campos
    const { name, email, phone, company, serviceType, budget, message } = body;

    // Nome
    if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 80) {
      return NextResponse.json(
        { error: "O nome completo é obrigatório e deve ter entre 2 e 80 caracteres." },
        { status: 400 }
      );
    }

    // Email
    if (
      typeof email !== "string" ||
      email.trim().length > 100 ||
      !EMAIL_REGEX.test(email.trim())
    ) {
      return NextResponse.json(
        { error: "Por favor, informe um endereço de email válido." },
        { status: 400 }
      );
    }

    // Telefone
    const cleanPhone = typeof phone === "string" ? phone.trim() : "";
    if (!cleanPhone || cleanPhone.length < 6 || cleanPhone.length > 25 || !PHONE_REGEX.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Por favor, informe um número de telefone válido (ex: +244 9XX XXX XXX)." },
        { status: 400 }
      );
    }

    // Tipo de Serviço
    if (
      typeof serviceType !== "string" ||
      serviceType.trim().length < 2 ||
      serviceType.trim().length > 100
    ) {
      return NextResponse.json(
        { error: "Por favor, selecione um serviço válido." },
        { status: 400 }
      );
    }

    // Mensagem / Detalhes
    if (
      typeof message !== "string" ||
      message.trim().length < 10 ||
      message.trim().length > 2000
    ) {
      return NextResponse.json(
        {
          error:
            "A mensagem deve conter entre 10 e 2000 caracteres detalhando a sua necessidade.",
        },
        { status: 400 }
      );
    }

    // Empresa (opcional)
    const validCompany =
      typeof company === "string" && company.trim().length > 0
        ? company.trim().slice(0, 100)
        : undefined;

    // Orçamento (opcional)
    const validBudget =
      typeof budget === "string" && budget.trim().length > 0
        ? budget.trim().slice(0, 80)
        : undefined;

    // 8. Proteção contra Replay / Duplo Envio Imediato
    const submissionSignature = `${ip}:${email.trim().toLowerCase()}:${cleanPhone}:${message.trim().slice(0, 40)}`;
    if (isDuplicateSubmission(submissionSignature)) {
      return NextResponse.json({
        success: true,
        message: "Proposta já recebida com sucesso! Entraremos em contacto brevemente.",
      });
    }

    const leadPayload: LeadPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      company: validCompany,
      serviceType: serviceType.trim(),
      budget: validBudget,
      message: message.trim(),
    };

    // 9. Disparo Seguro via SMTP
    await sendLeadNotificationEmail(leadPayload, { ip, userAgent });

    return NextResponse.json(
      {
        success: true,
        message: "Proposta enviada com sucesso! A nossa equipa entrará em contacto brevemente.",
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err: unknown) {
    // Registo seguro: apenas código/classe do erro, nunca credenciais nem conteúdo do email
    const safe = err as { code?: string; responseCode?: number; command?: string };
    console.error(
      "[Segurança /api/leads] Falha no processamento do pedido",
      { code: safe?.code, responseCode: safe?.responseCode, command: safe?.command }
    );

    return NextResponse.json(
      {
        error:
          "Não foi possível processar o envio neste momento. Por favor, tente novamente ou fale connosco diretamente pelo WhatsApp.",
      },
      { status: 500 }
    );
  }
}
