"use client";

import { AFFILIATE_PLANS } from "@/data/affiliate";
import { AffiliateHeading } from "./heading";
import { Stagger, StaggerItem, scaleIn } from "./motion";

export function AffiliatePlans() {
  return (
    <section
      id="planos-afiliado"
      className="relative z-10 scroll-mt-24 border-t border-border bg-background py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <AffiliateHeading
          align="center"
          index="03"
          label="Planos para recomendar"
          title={
            <>
              Três planos Mindgest.{" "}
              <span className="text-primary">Uma comissão por cada um.</span>
            </>
          }
          description="Pode referir qualquer um dos planos abaixo. O PRO exige Certificação Comercial activa."
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {AFFILIATE_PLANS.map((plan) => (
            <StaggerItem key={plan.id} variants={scaleIn}>
              <div className="flex h-full flex-col border border-border bg-card p-7 transition-transform duration-500 hover:-translate-y-1.5">
                <p className="text-xs font-black tracking-[0.25em] text-primary uppercase">
                  {plan.name}
                </p>
                <p className="mt-4 flex flex-wrap items-baseline gap-x-1 text-2xl font-black tracking-tight sm:text-3xl">
                  <span className="whitespace-nowrap">{plan.price}</span>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {plan.period}
                  </span>
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>
                {plan.note ? (
                  <p className="mt-6 border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold leading-relaxed text-primary">
                    {plan.note}
                  </p>
                ) : (
                  <p className="mt-6 text-xs font-semibold text-muted-foreground">
                    Disponível para todos os afiliados
                  </p>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
