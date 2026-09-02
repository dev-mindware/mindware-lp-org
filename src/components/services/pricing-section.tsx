"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Mail,
  MailCheck,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WHATSAPP_URL } from "@/constants/site";
import { PACKAGE_INCLUDED, EMAIL_ADDONS, DOMAIN_ADDON } from "@/data/services";

const FAQS = [
  {
    q: "O que está exatamente incluído nos 132.514,00 Kz?",
    a: "O valor cobre o pacote base de presença digital: criação da identidade visual completa (logotipo, manual de aplicação, paleta de cores estratégica e assets), desenvolvimento do website profissional (até 5 secções), alojamento cloud de alta performance por 1 ano, certificado de segurança SSL (HTTPS), otimização SEO Google e integração direta com WhatsApp. O domínio exclusivo e as contas de e-mail institucional são serviços complementares contratados à parte conforme a dimensão e necessidades da sua empresa.",
  },
  {
    q: "Qual é o prazo médio de entrega?",
    a: "O projeto completo tem um prazo médio de entrega de 28 a 31 dias, estruturado em ciclos com validações interativas em cada etapa (briefing, identidade visual, engenharia web, testes e lançamento oficial).",
  },
  {
    q: "Como funciona a contratação do e-mail profissional e domínio?",
    a: "Pode adicionar o registo de domínio próprio (15.690,00 Kz / 1 ano) e o plano de e-mail pretendido para a sua operação: Email Start (14.989,00 Kz / 1 ano com 5 GB) ou Email Standard (25.450,00 Kz / 1 ano com 20 GB). A Mindware encarrega-se de toda a configuração técnica de DNS, apontamentos e parametrização dos e-mails.",
  },
  {
    q: "Como funciona o processo de pagamento?",
    a: "Trabalhamos com condições transparentes para segurança de ambas as partes (tipicamente 50% na adjudicação/início do briefing e 50% na validação final e publicação do website).",
  },
  {
    q: "Posso expandir o website ou adicionar funcionalidades no futuro?",
    a: "Sim. A arquitetura construída pela Mindware em Next.js é totalmente escalável. Pode adicionar mais páginas, blog corporativo, catálogos avançados ou integrações a qualquer momento.",
  },
];

export function PricingSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      id="precos"
      className="relative z-30 scroll-mt-20 border-t border-border bg-background py-28 text-foreground sm:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <ShieldCheck className="size-3.5" />
            Investimento Transparente
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">
            Pacote All-in-One <span className="text-primary">Presença Digital</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Uma solução integrada de ponta a ponta sem taxas ocultas, criada para posicionar o seu negócio no mais alto patamar de autoridade.
          </p>
        </div>

        {/* Main Pricing Box */}
        <div className="max-w-5xl mx-auto border-2 border-primary/40 bg-card p-8 sm:p-12 lg:p-16 shadow-xl shadow-stone-900/5 dark:shadow-[0_30px_90px_-30px_rgba(153,86,246,0.3)] relative overflow-hidden mb-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl pointer-events-none opacity-30 dark:opacity-100" />

          {/* Top Audience Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-border">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                Identidade Visual + Website Profissional + Hospedagem Cloud (1 Ano)
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                Plano Presença Digital Completa
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase px-3 py-1 bg-primary/10 text-primary border border-primary/20">
                Empresas
              </span>
              <span className="text-[11px] font-mono font-bold uppercase px-3 py-1 bg-primary/10 text-primary border border-primary/20">
                Profissionais
              </span>
              <span className="text-[11px] font-mono font-bold uppercase px-3 py-1 bg-primary/10 text-primary border border-primary/20">
                Freelancers
              </span>
              <span className="text-[11px] font-mono font-bold uppercase px-3 py-1 bg-primary/10 text-primary border border-primary/20">
                Negócios Locais
              </span>
            </div>
          </div>

          {/* Pricing & CTA Center */}
          <div className="py-12 border-b border-border flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
                Investimento Pacote Base
              </span>
              <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground tabular-nums whitespace-nowrap">
                132.514,00&nbsp;<span className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-primary inline">Kz</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Sem custos escondidos. Alojamento cloud e suporte técnico incluídos no 1º ano. Domínio e e-mails profissionais configuráveis à parte.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Link
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                  "Olá Mindware! Gostaria de avançar com o plano de Presença Digital Completa (132.514,00 Kz)."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-8 py-6 text-base font-black bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <span>Pedir Orçamento & Iniciar</span>
                  <ArrowRight className="size-5" />
                </Button>
              </Link>
              <Link href="/" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-6 py-6 text-base font-bold border border-border bg-card hover:bg-muted text-foreground"
                >
                  Voltar ao Início
                </Button>
              </Link>
            </div>
          </div>

          {/* 8 Included Deliverables Grid */}
          <div className="pt-10 space-y-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" />
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-foreground">
                Tudo o que está incluído no pacote base:
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {PACKAGE_INCLUDED.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 border border-border bg-stone-50/70 dark:bg-muted/20 hover:border-primary/40 transition-colors shadow-xs"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-primary/10 text-primary">
                    <CheckCircle2 className="size-3.5" />
                  </span>
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold text-foreground">{item.title}</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add-ons Section: Email Profissional & Domínio */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              <Mail className="size-3.5" />
              Complementos Opcionais
            </div>
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              E-mails Profissionais & <span className="text-primary">Domínio Próprio</span>
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Dê ainda mais credibilidade à sua operação com endereços @suaempresa e registo de domínio oficial configurado pela equipa técnica da Mindware.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Domínio Card */}
            <div className="flex flex-col justify-between border border-border bg-card p-6 sm:p-8 hover:border-primary/50 transition-all shadow-xs hover:shadow-md">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 bg-stone-100 text-stone-700 dark:bg-muted dark:text-muted-foreground border border-border/50">
                    {DOMAIN_ADDON.badge}
                  </span>
                  <Globe className="size-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-foreground">{DOMAIN_ADDON.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {DOMAIN_ADDON.description}
                  </p>
                </div>
                <div className="pt-2">
                  <div className="text-2xl sm:text-3xl font-black text-foreground">
                    {DOMAIN_ADDON.price}
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{DOMAIN_ADDON.period}</span>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-border">
                  {DOMAIN_ADDON.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-foreground">
                      <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-border">
                <Link
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                    "Olá Mindware! Gostaria de incluir o Registo de Domínio (15.690,00 Kz / 1 ano) no meu projeto."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    variant="outline"
                    className="w-full font-bold text-xs uppercase tracking-wider border-border bg-card hover:border-primary hover:bg-primary/10 hover:text-primary shadow-xs"
                  >
                    Adicionar Domínio
                  </Button>
                </Link>
              </div>
            </div>

            {/* Email Start Card */}
            <div className="flex flex-col justify-between border border-border bg-card p-6 sm:p-8 hover:border-primary/50 transition-all shadow-xs hover:shadow-md">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 bg-stone-100 text-stone-700 dark:bg-muted dark:text-muted-foreground border border-border/50">
                    {EMAIL_ADDONS[0].badge}
                  </span>
                  <Mail className="size-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-foreground">{EMAIL_ADDONS[0].name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {EMAIL_ADDONS[0].description}
                  </p>
                </div>
                <div className="pt-2">
                  <div className="text-2xl sm:text-3xl font-black text-foreground">
                    {EMAIL_ADDONS[0].price}
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{EMAIL_ADDONS[0].period}</span>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-border">
                  {EMAIL_ADDONS[0].features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-foreground">
                      <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-border">
                <Link
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                    "Olá Mindware! Gostaria de subscrever o plano Email Start (14.989,00 Kz) para o meu domínio."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    variant="outline"
                    className="w-full font-bold text-xs uppercase tracking-wider border-border bg-card hover:border-primary hover:bg-primary/10 hover:text-primary shadow-xs"
                  >
                    Adicionar Email Start
                  </Button>
                </Link>
              </div>
            </div>

            {/* Email Standard Card (Highlighted) */}
            <div className="flex flex-col justify-between border-2 border-primary bg-card p-6 sm:p-8 relative shadow-lg shadow-stone-900/5 dark:shadow-[0_16px_36px_-16px_rgba(153,86,246,0.25)]">
              <div className="absolute -top-3 right-6 bg-primary text-primary-foreground text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-0.5">
                Mais Escolhido
              </div>
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 bg-primary/10 text-primary">
                    {EMAIL_ADDONS[1].badge}
                  </span>
                  <MailCheck className="size-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-foreground">{EMAIL_ADDONS[1].name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {EMAIL_ADDONS[1].description}
                  </p>
                </div>
                <div className="pt-2">
                  <div className="text-2xl sm:text-3xl font-black text-foreground">
                    {EMAIL_ADDONS[1].price}
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{EMAIL_ADDONS[1].period}</span>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-border">
                  {EMAIL_ADDONS[1].features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-foreground">
                      <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-border">
                <Link
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                    "Olá Mindware! Gostaria de subscrever o plano Email Standard (25.450,00 Kz) para o meu domínio."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    className="w-full font-bold text-xs uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                  >
                    Adicionar Email Standard
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Helper Note about Extra Mailboxes */}
          <div className="mt-6 p-4 border border-border bg-card shadow-xs text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <span>
              <strong className="text-foreground">Nota:</strong> Cada plano inclui 1 caixa de correio principal. Precisa de mais caixas para a sua equipa? Configuramos caixas adicionais sob medida no momento da ativação.
            </span>
            <Link
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                "Olá Mindware! Gostaria de saber mais sobre caixas de email adicionais para a minha equipa."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-primary font-bold hover:underline"
            >
              Falar com consultor &rarr;
            </Link>
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-primary font-bold">
              <HelpCircle className="size-3.5" />
              Dúvidas Frequentes
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Perguntas sobre o serviço
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-border bg-card transition-colors hover:border-primary/40 shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-foreground text-sm sm:text-base"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-foreground/80 leading-relaxed border-t border-border pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
