"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WHATSAPP_URL } from "@/constants/site";
import { PACKAGE_INCLUDED } from "@/data/services";

const FAQS = [
  {
    q: "O que está exatamente incluído nos 132.514,00 Kz?",
    a: "O valor cobre o pacote tudo-em-um: criação da identidade visual completa (logo, manual, paleta, assets), desenvolvimento do website profissional (até 5 secções), registo de domínio próprio por 1 ano, alojamento cloud por 1 ano, contas de e-mail institucionais, SEO Google e integração direta com WhatsApp.",
  },
  {
    q: "Qual é o prazo médio de entrega?",
    a: "O projeto completo é entregue entre 10 a 12 dias úteis, com validações interativas em cada etapa (briefing, protótipo visual, desenvolvimento e lançamento).",
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
        <div className="max-w-5xl mx-auto border-2 border-primary/40 bg-card p-8 sm:p-12 lg:p-16 shadow-[0_30px_90px_-30px_rgba(153,86,246,0.3)] relative overflow-hidden mb-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl pointer-events-none" />

          {/* Top Audience Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-border">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                Identidade Visual + Website Profissional + Hospedagem + E-mails
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
                Investimento Único Chave-na-Mão
              </span>
              <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground tabular-nums whitespace-nowrap">
                132.514,00&nbsp;<span className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-primary inline">Kz</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Sem custos escondidos. Domínio, alojamento e suporte incluídos no primeiro ano.
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
                Tudo o que está incluído no pacote:
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {PACKAGE_INCLUDED.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 border border-border/80 bg-muted/20 hover:border-primary/40 transition-colors"
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
                  className="border border-border bg-card transition-colors hover:border-primary/40"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-foreground text-sm sm:text-base"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""
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
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/60 pt-4">
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
