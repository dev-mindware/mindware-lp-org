"use client";

import { Percent, RefreshCw } from "lucide-react";
import { COMMISSION_RULES } from "@/data/affiliate";
import { AffiliateHeading } from "./heading";
import { Stagger, StaggerItem, scaleIn } from "./motion";

const cards = [
  {
    ...COMMISSION_RULES.firstPayment,
    icon: Percent,
  },
  {
    ...COMMISSION_RULES.recurring,
    icon: RefreshCw,
  },
];

export function AffiliateCommissions() {
  return (
    <section
      id="comissoes"
      className="relative z-10 scroll-mt-24 border-t border-border bg-background py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <AffiliateHeading
          index="01"
          label="Modelo de comissões"
          title={
            <>
              Incentivos recorrentes{" "}
              <span className="text-primary">sobre cada subscrição</span>
            </>
          }
          description="Refira clientes para o Mindgest e ganhe no primeiro pagamento e em todas as mensalidades seguintes — em BASE, SMART e PRO."
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <StaggerItem key={card.label} variants={scaleIn}>
              <div className="group relative h-full overflow-hidden border border-border bg-card p-8 transition-transform duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-6 grid size-12 place-items-center bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <card.icon className="size-6" />
                  </div>
                  <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                    {card.label}
                  </p>
                  <p className="mt-3 text-5xl font-black tracking-tight text-foreground">
                    {card.rate}
                  </p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {card.detail}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
