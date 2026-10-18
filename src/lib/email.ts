import nodemailer, { type Transporter } from "nodemailer";
import path from "path";
import fs from "fs";
import tls from "tls";

export interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  budget?: string;
  message: string;
}

export interface LeadMeta {
  ip?: string;
  userAgent?: string;
}

// Singleton transporter
let transporter: Transporter | null = null;

export function getEmailTransporter(): Transporter {
  if (!transporter) {
    const host = process.env.SMTP_HOST || "smtp.hostinger.com";
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = process.env.SMTP_SECURE === "true" || port === 465;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      throw new Error(
        "Configuração de SMTP incompleta: SMTP_USER e SMTP_PASS são obrigatórios no servidor."
      );
    }

    // CA extra opcional (ex.: antivírus/proxy que inspeciona TLS em máquinas de desenvolvimento).
    // Acrescenta-se às CAs de sistema; a validação do certificado continua estrita.
    let extraCa: string[] | undefined;
    const caFile = process.env.SMTP_TLS_CA_FILE;
    if (caFile && fs.existsSync(caFile)) {
      extraCa = [...tls.rootCertificates, fs.readFileSync(caFile, "utf8")];
    }

    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      // TLS seguro e estrito com validação de certificados
      tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2",
        ...(extraCa ? { ca: extraCa } : {}),
      },
      // Timeouts explícitos para evitar bloqueio de processos
      connectionTimeout: 10000, // 10 segundos para estabelecer ligação
      greetingTimeout: 10000,   // 10 segundos para handshake SMTP
      socketTimeout: 15000,     // 15 segundos de inactividade no socket
    });
  }

  return transporter;
}

/**
 * Escapa caracteres HTML para prevenir injecção de conteúdo (XSS/HTML Injection)
 */
function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Remove quebras de linha e caracteres de controlo para prevenir SMTP Header Injection (CRLF)
 */
function sanitizeHeaderString(text: string): string {
  return text.replace(/[\r\n\0\t]/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Sanitiza e normaliza números de telefone exclusivamente para caracteres numéricos
 */
function cleanPhoneForWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  // Se começou com 9 (ex: Angola 9xx xxx xxx, 9 dígitos), adiciona código de país 244
  if (digits.length === 9 && digits.startsWith("9")) {
    return `244${digits}`;
  }
  return digits.slice(0, 15);
}

export async function sendLeadNotificationEmail(
  payload: LeadPayload,
  meta?: LeadMeta
): Promise<{ messageId: string }> {
  const mailer = getEmailTransporter();
  const recipient =
    process.env.LEAD_RECIPIENT_EMAIL || "jonataosacapia@gmail.com";
  const fromEmail =
    process.env.SMTP_FROM || process.env.SMTP_USER || "no-reply@mindware.ao";

  // 1. Sanitização para cabeçalhos (Prevenção de CRLF / Header Injection)
  const cleanHeaderName = sanitizeHeaderString(payload.name).slice(0, 80);
  const cleanHeaderService = sanitizeHeaderString(payload.serviceType).slice(0, 80);
  const cleanReplyToEmail = sanitizeHeaderString(payload.email).toLowerCase().slice(0, 100);

  // 2. Sanitização para inserção no corpo HTML
  const safeName = sanitizeHtml(payload.name);
  const safeEmail = sanitizeHtml(payload.email);
  const safePhone = sanitizeHtml(payload.phone);
  const safeCompany = payload.company
    ? sanitizeHtml(payload.company)
    : "Não especificada";
  const safeServiceType = sanitizeHtml(payload.serviceType);
  const safeBudget = payload.budget ? sanitizeHtml(payload.budget) : "A combinar";
  const safeMessage = sanitizeHtml(payload.message).replace(/\n/g, "<br/>");

  const waDigits = cleanPhoneForWhatsApp(payload.phone);
  const waLink = waDigits
    ? `https://wa.me/${waDigits}?text=${encodeURIComponent(
        `Olá ${cleanHeaderName}, recebemos o seu contacto através da Mindware sobre o serviço "${cleanHeaderService}".`
      )}`
    : null;

  const timestamp = new Intl.DateTimeFormat("pt-PT", {
    timeZone: "Africa/Luanda",
    dateStyle: "full",
    timeStyle: "medium",
  }).format(new Date());

  // Assunto limpo, sem caracteres de controlo
  const subject = `🚀 Novo Lead [Serviços]: ${cleanHeaderName} - ${cleanHeaderService}`;

  // Logótipo em anexo seguro via CID (sem dependência de domínios externos)
  const logoPath = path.join(process.cwd(), "public", "logo.png");
  const attachments = [];
  let logoSrc = "https://mindware.ao/logo.png";

  if (fs.existsSync(logoPath)) {
    attachments.push({
      filename: "logo.png",
      path: logoPath,
      cid: "mindware-logo",
    });
    logoSrc = "cid:mindware-logo";
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${sanitizeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #f4f4f5; line-height: 1.5; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #09090b; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Container Principal com cantos vivos (identidade Mindware) -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; background-color: #121316; border: 1px solid #27272a; border-top: 3px solid #9956f6; border-radius: 0px; text-align: left; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Cabeçalho com Lockup Oficial Mindware -->
          <tr>
            <td style="padding: 24px 30px; border-bottom: 1px solid #27272a; background-color: #121316;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" style="vertical-align: middle;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 10px;">
                          <img src="${logoSrc}" alt="Mindware" width="30" height="30" style="display: block; width: 30px; height: 30px; border: 0;" />
                        </td>
                        <td style="vertical-align: middle; padding-right: 12px;">
                          <span style="font-size: 17px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px; text-transform: none;">Mindware</span>
                        </td>
                        <td style="vertical-align: middle; padding-right: 12px;">
                          <span style="display: inline-block; width: 1px; height: 16px; background-color: #3f3f46;"></span>
                        </td>
                        <td style="vertical-align: middle;">
                          <span style="display: inline-block; border: 1px solid rgba(153, 86, 246, 0.4); background-color: rgba(153, 86, 246, 0.12); color: #c499ff; font-size: 10px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; padding: 3px 8px; font-family: 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;">SERVIÇOS</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="font-family: 'SF Mono', Consolas, monospace; font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">NOVO LEAD</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Título e Subtítulo -->
          <tr>
            <td style="padding: 30px 30px 20px 30px;">
              <div style="font-family: 'SF Mono', Consolas, monospace; font-size: 11px; font-weight: 700; color: #9956f6; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 6px;">
                SOLICITAÇÃO DE ORÇAMENTO
              </div>
              <h1 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                ${safeName}
              </h1>
              <p style="margin: 0; font-size: 13px; color: #a1a1aa; line-height: 1.5;">
                Um novo potencial cliente submeteu o formulário através da página <strong>/service</strong> da Mindware.
              </p>
            </td>
          </tr>

          <!-- Tabela de Dados Formatada (Estilo Tech Editorial) -->
          <tr>
            <td style="padding: 0 30px 24px 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%; border: 1px solid #27272a; background-color: #0f1013;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #222329; font-family: 'SF Mono', Consolas, monospace; font-size: 11px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em; width: 34%;">
                    NOME COMPLETO
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #222329; font-size: 14px; font-weight: 600; color: #ffffff;">
                    ${safeName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #222329; font-family: 'SF Mono', Consolas, monospace; font-size: 11px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em;">
                    EMAIL
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #222329; font-size: 14px;">
                    <a href="mailto:${safeEmail}" style="color: #c499ff; text-decoration: none; font-weight: 600;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #222329; font-family: 'SF Mono', Consolas, monospace; font-size: 11px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em;">
                    TELEFONE / WHATSAPP
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #222329; font-size: 14px;">
                    <a href="tel:${safePhone}" style="color: #ffffff; text-decoration: none; font-weight: 600; font-family: 'SF Mono', Consolas, monospace;">${safePhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #222329; font-family: 'SF Mono', Consolas, monospace; font-size: 11px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em;">
                    EMPRESA / PROJETO
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #222329; font-size: 14px; color: #e4e4e7;">
                    ${safeCompany}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #222329; font-family: 'SF Mono', Consolas, monospace; font-size: 11px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em;">
                    SERVIÇO SOLICITADO
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #222329; font-size: 14px; font-weight: 700; color: #c499ff;">
                    ${safeServiceType}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-family: 'SF Mono', Consolas, monospace; font-size: 11px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em;">
                    INVESTIMENTO ESTIMADO
                  </td>
                  <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #ffffff; font-family: 'SF Mono', Consolas, monospace;">
                    ${safeBudget}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Mensagem / Requisitos do Projeto -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="font-family: 'SF Mono', Consolas, monospace; font-size: 11px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px;">
                MENSAGEM / ESPECIFICAÇÕES DO CLIENTE
              </div>
              <div style="background-color: #09090b; border: 1px solid #27272a; border-left: 3px solid #9956f6; border-radius: 0px; padding: 18px 20px; font-size: 14px; color: #e4e4e7; line-height: 1.6; word-break: break-word;">
                ${safeMessage}
              </div>
            </td>
          </tr>

          <!-- Ações Rápidas de Resposta (Botões estilo Mindware) -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td>
                    <div style="font-family: 'SF Mono', Consolas, monospace; font-size: 11px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">
                      AÇÕES RÁPIDAS DE CONTACTO:
                    </div>
                    <div>
                      ${
                        waLink
                          ? `<a href="${waLink}" target="_blank" rel="noopener noreferrer" style="background-color: #25D366; color: #000000; font-family: 'SF Mono', Consolas, monospace; font-weight: 800; font-size: 12px; letter-spacing: 0.05em; text-transform: uppercase; padding: 12px 20px; text-decoration: none; display: inline-block; margin-right: 10px; margin-bottom: 8px; border-radius: 0px;">CHAMAR NO WHATSAPP →</a>`
                          : ""
                      }
                      <a href="mailto:${safeEmail}?subject=Resposta:%20Mindware%20-%20Or%C3%A7amento%20de%20${encodeURIComponent(
    cleanHeaderService
  )}" style="background-color: #9956f6; color: #ffffff; font-family: 'SF Mono', Consolas, monospace; font-weight: 800; font-size: 12px; letter-spacing: 0.05em; text-transform: uppercase; padding: 12px 20px; text-decoration: none; display: inline-block; margin-bottom: 8px; border-radius: 0px;">RESPONDER POR EMAIL →</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Rodapé Institucional Mindware -->
          <tr>
            <td style="padding: 24px 30px; background-color: #0c0d10; border-top: 1px solid #27272a;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" style="vertical-align: middle;">
                    <div style="font-size: 13px; font-weight: 700; color: #ffffff;">Mindware</div>
                    <div style="font-size: 12px; color: #71717a; margin-top: 2px;">
                      A mente cria, <em>o código segue.</em>
                    </div>
                    <div style="font-size: 11px; color: #52525b; margin-top: 4px;">
                      Luanda - Vila Alice, Angola • <a href="https://mindware.ao" style="color: #9956f6; text-decoration: none;">mindware.ao</a>
                    </div>
                  </td>
                  <td align="right" style="vertical-align: middle; font-family: 'SF Mono', Consolas, monospace; font-size: 10px; color: #52525b; line-height: 1.5;">
                    <div>${timestamp}</div>
                    ${meta?.ip ? `<div>Origem: ${sanitizeHtml(meta.ip)}</div>` : ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const textContent = `
NOVO LEAD RECEBIDO - MINDWARE
=========================================
Data: ${timestamp}

Cliente: ${cleanHeaderName}
Email: ${cleanReplyToEmail}
Telefone: ${payload.phone}
Empresa: ${payload.company || "Não especificada"}
Serviço Solicitado: ${cleanHeaderService}
Investimento Previsto: ${payload.budget || "A combinar"}

Mensagem:
${payload.message}

---
A mente cria, o código segue.
Mindware Angola • https://mindware.ao
Origem: ${meta?.ip || "N/A"}
  `.trim();

  // Envio com remetente fixo no servidor e replyTo estritamente higienizado
  const info = await mailer.sendMail({
    from: `"Mindware Leads" <${fromEmail}>`,
    to: recipient,
    replyTo: cleanReplyToEmail,
    subject,
    text: textContent,
    html: htmlContent,
    attachments,
  });

  return { messageId: info.messageId };
}
