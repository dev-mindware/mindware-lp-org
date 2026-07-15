"use client";

import { BadgeCheck, Shield } from "lucide-react";
import { CERTIFICATION } from "@/data/affiliate";
import { AffiliateHeading } from "./heading";
import {
  ScrollReveal,
  Stagger,
  StaggerItem,
  fadeLeft,
  scaleIn,
} from "./motion";

export function AffiliateCertification() {
  return (
    <section
      id="certificacao"
      className="relative z-10 scroll-mt-24 border-t border-border/60 bg-transparent py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <AffiliateHeading
            index="06"
            label="Certificação Comercial"
            title={
              <>
                Desbloqueie o plano <span className="text-primary">PRO</span>
              </>
            }
            description={CERTIFICATION.process}
          />

          <ScrollReveal variants={scaleIn}>
            <div className="relative overflow-hidden border border-primary/40 bg-card p-8 shadow-[0_30px_80px_-40px_rgba(153,86,246,0.5)]">
              <div className="absolute -right-10 -top-10 size-40 bg-primary/20 blur-3xl" />
              <div className="relative z-10 flex items-start gap-4">
                <div className="grid size-12 place-items-center bg-primary text-primary-foreground">
                  <Shield className="size-6" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                    Elegibilidade
                  </p>
                  <p className="mt-2 text-2xl font-black tracking-tight">
                    {CERTIFICATION.eligibility}
                  </p>
                </div>
              </div>

              <Stagger className="relative z-10 mt-8 space-y-4">
                {CERTIFICATION.benefits.map((benefit) => (
                  <StaggerItem key={benefit} variants={fadeLeft}>
                    <div className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {benefit}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
