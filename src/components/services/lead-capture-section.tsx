"use client";

import React from "react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { LeadCaptureForm } from "./lead-capture-form";
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Headphones,
} from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: Clock,
    title: "Resposta em até 24h",
    description: "Análise técnica rápida e orçamento detalhado para a sua empresa.",
  },
  {
    icon: ShieldCheck,
    title: "Sem Compromisso Inicial",
    description: "Tire as suas dúvidas e conheça o escopo completo antes de contratar.",
  },
  {
    icon: CheckCircle2,
    title: "Pacote All-in-One",
    description: "Website + Branding + Hospedagem cloud 1 ano a partir de 132.514 Kz.",
  },
  {
    icon: Headphones,
    title: "Acompanhamento Dedicado",
    description: "Comunicação direta com os nossos engenheiros e designers.",
  },
];

export function LeadCaptureSection() {
  return (
    <section
      id="orcamento"
      className="relative z-20 scroll-mt-20 border-t border-border bg-background py-28 text-foreground sm:py-32"
    >
      <SectionWrapper className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Informações & Argumentos de Conversão */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                <Sparkles className="size-3.5" />
                Orçamento Sem Compromisso
              </div>

              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-foreground leading-tight">
                Vamos transformar a sua{" "}
                <span className="text-primary">presença digital?</span>
              </h2>

              <p className="text-base text-muted-foreground leading-relaxed">
                Preencha o formulário ao lado para solicitar o pacote base ou uma
                solução sob medida. Os nossos especialistas entram em contacto
                consigo para estruturar o seu projeto.
              </p>
            </div>

            {/* Destaques em Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 pt-2">
              {HIGHLIGHTS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3.5 p-4 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm"
                  >
                    <div className="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                      <Icon className="size-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Formulário de Captação */}
          <div className="lg:col-span-7">
            <LeadCaptureForm />
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
