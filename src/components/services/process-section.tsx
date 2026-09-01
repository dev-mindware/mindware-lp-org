"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { PROCESS_STEPS } from "@/data/services";

export function ProcessSection() {
  return (
    <section
      id="processo"
      className="relative z-20 scroll-mt-20 border-t border-border bg-muted/20 py-28 text-foreground sm:py-32"
    >
      <SectionWrapper className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <Clock className="size-3.5" />
            Metodologia & Prazos
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">
            Como damos vida ao <span className="text-primary">seu projeto</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Um processo transparente, estruturado em 4 etapas ágeis para garantir entrega impecável no prazo sem retrabalho.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between border border-border bg-card p-7 transition-all duration-300 hover:border-primary/60 hover:shadow-[0_20px_40px_-15px_rgba(153,86,246,0.25)]"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-primary transition-colors duration-300" />

                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-black text-primary/80 group-hover:text-primary transition-colors">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest bg-muted px-2.5 py-1 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {step.duration}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-primary font-bold">
                    <CheckCircle2 className="size-3.5" />
                    Etapa Validada
                  </span>
                  {idx < PROCESS_STEPS.length - 1 && (
                    <ArrowRight className="size-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom guarantee */}
        <div className="mt-16 border border-border/80 bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-foreground">
              Acompanhamento contínuo em cada fase
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Apresentamos prévias interativas e alinhamos feedback antes de avançar para a fase seguinte.
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs uppercase tracking-wider font-bold text-primary bg-primary/10 px-4 py-2">
            Tempo Médio: 10 a 12 dias
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
