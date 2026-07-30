"use client";

import { Clock } from "lucide-react";
import { SOFTWARE_SHOTS, WALLET_BALANCES } from "@/data/affiliate";
import { SoftwareFrame } from "./software-frame";
import { AffiliateHeading } from "./heading";
import {
  ScrollReveal,
  Stagger,
  StaggerItem,
  fadeLeft,
  fadeUpSoft,
} from "./motion";

export function AffiliateWallet() {
  const walletShot = SOFTWARE_SHOTS.find((s) => s.id === "wallet");

  return (
    <section
      id="carteira"
      className="relative z-10 scroll-mt-24 border-t border-border/60 bg-transparent py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <AffiliateHeading
              index="04"
              label="Carteira digital"
              title={
                <>
                  Transparência total{" "}
                  <span className="text-primary">nos seus ganhos</span>
                </>
              }
              description="Três saldos claros: pendente, disponível e histórico. Sem surpresas no momento de levantar."
            />

            <Stagger className="mt-10 space-y-4">
              {WALLET_BALANCES.map((balance) => (
                <StaggerItem key={balance.id} variants={fadeLeft}>
                  <div className="border border-border bg-card p-5 transition-colors duration-300 hover:border-primary/40">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-black tracking-tight">
                        {balance.label}
                      </h3>
                      <span className="font-mono text-sm font-bold text-primary">
                        {balance.example}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {balance.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <ScrollReveal variants={fadeUpSoft} delay={0.2} className="mt-6">
              <div className="flex gap-3 border border-primary/30 bg-primary/10 p-5">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-bold text-foreground">
                    Período de maturação — 15 dias
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Quando o cliente paga, a comissão entra no Saldo Pendente.
                    Após 15 dias de garantia e activação, move automaticamente
                    para o Saldo Disponível.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {walletShot ? (
            <SoftwareFrame
              label={walletShot.label}
              urlDisplay={walletShot.urlDisplay}
              src={walletShot.src}
              alt={walletShot.alt}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
