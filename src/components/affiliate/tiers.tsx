"use client";

import { PARTNER_TIERS, SOFTWARE_SHOTS } from "@/data/affiliate";
import { SoftwareFrame } from "./software-frame";
import { AffiliateHeading } from "./heading";
import {
  ScrollReveal,
  Stagger,
  StaggerItem,
  fadeLeft,
  fadeUpSoft,
} from "./motion";

export function AffiliateTiers() {
  const rankingShot = SOFTWARE_SHOTS.find((s) => s.id === "ranking");

  return (
    <section
      id="niveis"
      className="relative z-10 scroll-mt-24 border-t border-border/60 bg-transparent py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <AffiliateHeading
          index="02"
          label="Progressão de nível"
          align="center"
          title={
            <>
              Quanto mais clientes activos,{" "}
              <span className="text-primary">maior a comissão</span>
            </>
          }
          description="O nível sobe automaticamente. Contagem única por NIF. Recálculo a cada pagamento validado."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Stagger className="space-y-4">
            {PARTNER_TIERS.map((tier) => (
              <StaggerItem key={tier.id} variants={fadeLeft}>
                <div
                  className={`relative border p-5 sm:p-6 transition-shadow duration-500 ${
                    tier.highlighted
                      ? "border-primary bg-card shadow-[0_20px_60px_-30px_rgba(153,86,246,0.45)]"
                      : "border-border bg-card/70"
                  }`}
                >
                  {tier.highlighted ? (
                    <span className="absolute -top-3 left-5 bg-primary px-3 py-1 text-[10px] font-black tracking-widest text-primary-foreground uppercase">
                      Destaque
                    </span>
                  ) : null}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center bg-primary/10 text-lg font-black text-primary">
                        {tier.icon}
                      </span>
                      <div>
                        <h3 className="text-xl font-black tracking-tight">
                          {tier.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {tier.clients}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-primary">
                        {tier.total}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tier.recurring} + bónus {tier.bonus}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {tier.rational}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="space-y-6 lg:sticky lg:top-28">
            {rankingShot ? (
              <SoftwareFrame
                label={rankingShot.label}
                urlDisplay={rankingShot.urlDisplay}
                src={rankingShot.src}
                alt={rankingShot.alt}
              />
            ) : null}
            <ScrollReveal variants={fadeUpSoft} delay={0.15}>
              <p className="border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
                <span className="font-bold text-foreground">Elite (250+)</span>{" "}
                é o topo estratégico do programa — reservado a parceiros de
                altíssimo volume, com comissão recorrente efectiva de{" "}
                <span className="font-bold text-primary">38%</span>.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
