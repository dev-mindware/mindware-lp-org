"use client";

import { AlertTriangle } from "lucide-react";
import { SOFTWARE_SHOTS, WITHDRAWAL_STEPS } from "@/data/affiliate";
import { SoftwareFrame } from "./software-frame";
import { AffiliateHeading } from "./heading";
import {
  ScrollReveal,
  Stagger,
  StaggerItem,
  fadeUpSoft,
  scaleIn,
} from "./motion";

export function AffiliateWithdrawal() {
  const withdrawShot = SOFTWARE_SHOTS.find((s) => s.id === "withdraw");

  return (
    <section
      id="levantamentos"
      className="relative z-10 scroll-mt-24 border-t border-border bg-background py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <AffiliateHeading
          index="05"
          label="Levantamentos"
          title={
            <>
              Do saldo disponível{" "}
              <span className="text-primary">para a sua conta</span>
            </>
          }
          description="Valor mínimo de 8.000 Kz. Pedido analisado pela equipa — comprovativo anexado ao painel quando aprovado."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-center">
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {WITHDRAWAL_STEPS.map((item) => (
              <StaggerItem key={item.step} variants={scaleIn}>
                <div className="h-full border border-border bg-card p-6 transition-transform duration-500 hover:-translate-y-1">
                  <span className="text-4xl font-black tracking-tighter text-primary/25">
                    {item.step}
                  </span>
                  <h3 className="-mt-2 text-lg font-black tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="space-y-6">
            {withdrawShot ? (
              <SoftwareFrame
                label={withdrawShot.label}
                urlDisplay={withdrawShot.urlDisplay}
                src={withdrawShot.src}
                alt={withdrawShot.alt}
              />
            ) : null}
            <ScrollReveal variants={fadeUpSoft} delay={0.12}>
              <div className="flex gap-3 border border-amber-500/30 bg-amber-500/10 p-5">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-bold text-foreground">
                    Banco e IBAN correctos.
                  </span>{" "}
                  Preencha bem os dados de perfil para evitar atrasos ou
                  rejeições. Se o pedido for rejeitado, o montante regressa de
                  imediato ao Saldo Disponível com justificação.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
