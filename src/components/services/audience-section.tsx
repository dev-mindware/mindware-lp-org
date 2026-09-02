"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, ArrowRight, Users } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { TARGET_AUDIENCES, AudienceProfile } from "@/data/services";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WHATSAPP_URL } from "@/constants/site";

export function AudienceSection() {
  const [activeId, setActiveId] = useState<string>(TARGET_AUDIENCES[0].id);

  const activeAudience: AudienceProfile =
    TARGET_AUDIENCES.find((item) => item.id === activeId) || TARGET_AUDIENCES[0];

  const IconComponent = activeAudience.icon;

  return (
    <section
      id="para-quem"
      className="relative z-20 scroll-mt-20 border-t border-border bg-background py-28 text-foreground sm:py-32"
    >
      <SectionWrapper className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <Users className="size-3.5" />
            Perfil & Segmento
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">
            Para quem é <span className="text-primary">este plano?</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Seja uma organização estabelecida ou um profissional autónomo, o pacote all-in-one entrega a arquitetura digital necessária para dominar o seu nicho.
          </p>
        </div>

        {/* Segment Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {TARGET_AUDIENCES.map((audience) => {
            const isSelected = audience.id === activeId;
            const TabIcon = audience.icon;
            return (
              <button
                key={audience.id}
                onClick={() => setActiveId(audience.id)}
                type="button"
                className={`relative flex items-center gap-2.5 px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${isSelected
                    ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                    : "border border-border bg-card text-stone-700 dark:text-muted-foreground hover:text-foreground hover:border-primary/40 shadow-xs"
                  }`}
              >
                <TabIcon className="size-4" />
                <span>{audience.title}</span>
                {isSelected && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 -z-10 bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAudience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Card: Context & Pain Points */}
            <div className="lg:col-span-7 border border-border bg-card p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden shadow-xs">
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4 border-b border-border/80 pb-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-12 items-center justify-center bg-primary/10 text-primary">
                      <IconComponent className="size-6" />
                    </span>
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                        {activeAudience.badge}
                      </span>
                      <h3 className="text-2xl font-black tracking-tight text-foreground">
                        {activeAudience.title}
                      </h3>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block text-xs font-mono bg-stone-100 text-stone-700 dark:bg-muted dark:text-muted-foreground border border-border/50 px-3 py-1">
                    Solução Dedicada
                  </span>
                </div>

                <p className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                  &ldquo;{activeAudience.tagline}&rdquo;
                </p>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {activeAudience.description}
                </p>

                {/* Challenges solved */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <AlertCircle className="size-4 text-amber-500" />
                    Desafios que Eliminamos:
                  </h4>
                  <div className="space-y-2.5">
                    {activeAudience.painPoints.map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-xs sm:text-sm text-foreground bg-stone-50/80 dark:bg-muted/40 p-3.5 border border-border"
                      >
                        <span className="text-primary font-bold font-mono">0{idx + 1}.</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Result Box */}
              <div className="bg-primary/10 dark:bg-primary/5 border border-primary/25 p-4 sm:p-5">
                <p className="text-xs sm:text-sm font-semibold text-foreground">
                  <span className="text-primary font-bold">Impacto Esperado:</span>{" "}
                  {activeAudience.results}
                </p>
              </div>
            </div>

            {/* Right Card: Exact Deliverables & Direct CTA */}
            <div className="lg:col-span-5 border border-primary/40 bg-card p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-lg shadow-stone-900/5 dark:shadow-[0_16px_40px_-16px_rgba(153,86,246,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl pointer-events-none opacity-40 dark:opacity-100" />

              <div className="space-y-6 relative z-10">
                <div className="space-y-1 border-b border-border/80 pb-5">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
                    Entrega Garantida
                  </span>
                  <h4 className="text-xl font-black text-foreground">
                    O que recebe neste plano:
                  </h4>
                </div>

                <ul className="space-y-4">
                  {activeAudience.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm font-medium text-foreground">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                        <CheckCircle2 className="size-3.5" />
                      </span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-6 border-t border-border relative z-10">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-mono uppercase text-muted-foreground">Pacote Base</span>
                  <span className="text-xl font-black text-foreground whitespace-nowrap">132.514,00&nbsp;Kz</span>
                </div>

                <Link
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                    `Olá Mindware! Gostaria de pedir um orçamento para o plano de serviços (Identidade Visual + Website) voltado para ${activeAudience.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    size="lg"
                    className="w-full h-12 bg-primary text-primary-foreground font-bold tracking-wide hover:bg-primary/90 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Pedir Proposta para {activeAudience.title}</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </SectionWrapper>
    </section>
  );
}
