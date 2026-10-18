"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Mail,
  Phone,
  Building2,
  Layers,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WHATSAPP_URL } from "@/constants/site";
import Link from "next/link";

const SERVICE_OPTIONS = [
  "Presença Digital Completa (Website + Branding - 132.514 Kz)",
  "Desenvolvimento de Website Profissional",
  "Design de Marca & Identidade Visual",
  "Loja Virtual / E-commerce",
  "Consultoria / Projeto Personalizado",
];

const BUDGET_OPTIONS = [
  "Pacote Base (132.514,00 Kz)",
  "150.000 Kz - 300.000 Kz",
  "300.000 Kz - 600.000 Kz",
  "Acima de 600.000 Kz",
  "A definir após análise",
];

export function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: SERVICE_OPTIONS[0],
    budget: BUDGET_OPTIONS[0],
    message: "",
    website_hp: "", // Honeypot anti-spam
    _t: 0, // Timestamp de carregamento
  });

  React.useEffect(() => {
    setFormData((prev) => ({ ...prev, _t: Date.now() }));
  }, []);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação inicial no cliente
    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Por favor, preencha o seu nome completo.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setStatus("error");
      setErrorMessage("Por favor, informe um email válido.");
      return;
    }

    if (!formData.phone.trim()) {
      setStatus("error");
      setErrorMessage("Por favor, insira o seu contacto telefónico / WhatsApp.");
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage(
        "Por favor, descreva em poucas palavras o seu projeto (mínimo de 10 caracteres)."
      );
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao enviar pedido de orçamento.");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        serviceType: SERVICE_OPTIONS[0],
        budget: BUDGET_OPTIONS[0],
        message: "",
        website_hp: "",
        _t: Date.now(),
      });
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(
          "Não foi possível enviar o formulário. Por favor, tente novamente ou fale connosco pelo WhatsApp."
        );
      }
    }
  };

  if (status === "success") {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card/80 p-8 sm:p-12 text-center backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-500">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 shadow-inner">
          <CheckCircle2 className="size-10" />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
          <Sparkles className="size-3.5" />
          Pedido Recebido
        </span>

        <h3 className="mt-4 text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
          Obrigado pelo seu contacto!
        </h3>

        <p className="mx-auto mt-3 max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
          A equipa da Mindware já recebeu a sua solicitação. Vamos analisar os
          detalhes do seu projeto e entraremos em contacto nas próximas horas via
          WhatsApp ou email.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto border-border hover:bg-muted"
            onClick={() => setStatus("idle")}
          >
            Enviar outro pedido
          </Button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              type="button"
              className="w-full sm:w-auto bg-[#25D366] text-black font-bold hover:bg-[#20ba5a] shadow-lg"
            >
              Falar agora no WhatsApp
              <ArrowRight className="size-4 ml-1.5" />
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-2xl border border-border bg-card/70 p-6 sm:p-10 backdrop-blur-xl shadow-2xl transition-all duration-300"
    >
      {/* Campo Honeypot Oculto (Anti-bot) */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website_hp">Website</label>
        <input
          type="text"
          id="website_hp"
          name="website_hp"
          value={formData.website_hp}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-6">
        {/* Nome & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-xs font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5"
            >
              <User className="size-3.5 text-primary" />
              Nome Completo <span className="text-primary">*</span>
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Ex: Manuel António"
              value={formData.name}
              onChange={handleChange}
              disabled={status === "loading"}
              className="bg-background/50 border-border focus-visible:border-primary focus-visible:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5"
            >
              <Mail className="size-3.5 text-primary" />
              Email de Contacto <span className="text-primary">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="manuel@empresa.ao"
              value={formData.email}
              onChange={handleChange}
              disabled={status === "loading"}
              className="bg-background/50 border-border focus-visible:border-primary focus-visible:ring-primary/20"
            />
          </div>
        </div>

        {/* Telefone / WhatsApp & Empresa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-xs font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5"
            >
              <Phone className="size-3.5 text-primary" />
              Telefone / WhatsApp <span className="text-primary">*</span>
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="+244 9XX XXX XXX"
              value={formData.phone}
              onChange={handleChange}
              disabled={status === "loading"}
              className="bg-background/50 border-border focus-visible:border-primary focus-visible:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="company"
              className="text-xs font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5"
            >
              <Building2 className="size-3.5 text-primary" />
              Empresa / Projeto <span className="text-xs font-normal text-muted-foreground">(opcional)</span>
            </label>
            <Input
              id="company"
              name="company"
              type="text"
              placeholder="Ex: Grupo Horizonte Lda"
              value={formData.company}
              onChange={handleChange}
              disabled={status === "loading"}
              className="bg-background/50 border-border focus-visible:border-primary focus-visible:ring-primary/20"
            />
          </div>
        </div>

        {/* Tipo de Serviço & Orçamento Estimado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label
              htmlFor="serviceType"
              className="text-xs font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5"
            >
              <Layers className="size-3.5 text-primary" />
              Serviço Pretendido <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full h-9 rounded-md border border-input bg-background/50 px-3 py-1 text-sm text-foreground shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow]"
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-card text-foreground">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="budget"
              className="text-xs font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5"
            >
              <Sparkles className="size-3.5 text-primary" />
              Faixa de Investimento
            </label>
            <div className="relative">
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full h-9 rounded-md border border-input bg-background/50 px-3 py-1 text-sm text-foreground shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow]"
              >
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-card text-foreground">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mensagem / Descrição */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-xs font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5"
          >
            <MessageSquare className="size-3.5 text-primary" />
            Detalhes do Projeto / Objetivos <span className="text-primary">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="Conte-nos um pouco sobre a sua empresa, o que precisa no website ou na marca, referências ou funcionalidades essenciais..."
            value={formData.message}
            onChange={handleChange}
            disabled={status === "loading"}
            className="bg-background/50 border-border focus-visible:border-primary focus-visible:ring-primary/20 min-h-[110px]"
          />
        </div>

        {/* Alerta de Erro */}
        {status === "error" && errorMessage && (
          <div className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-3.5 text-xs text-destructive">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {/* Botão de Envio & Fallback WhatsApp */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            type="submit"
            size="lg"
            disabled={status === "loading"}
            className="w-full sm:w-auto min-w-[220px] font-bold uppercase tracking-wider text-xs shadow-xl transition-all duration-300"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                A enviar proposta...
              </>
            ) : (
              <>
                <Send className="size-4 mr-2" />
                Solicitar Proposta Grátis
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center sm:text-right">
            Prefere atendimento imediato?{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              Falar no WhatsApp
            </a>
          </p>
        </div>

        <p className="text-[11px] text-muted-foreground/80 leading-relaxed pt-2 border-t border-border/40">
          Ao submeter, concorda que os dados fornecidos sejam utilizados pela Mindware unicamente para responder ao seu pedido, nos termos da nossa{" "}
          <Link href="/privacy-policy" className="text-primary hover:underline font-medium">
            Política de Privacidade
          </Link>.
        </p>
      </div>
    </form>
  );
}
