"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AFFILIATE_LOGIN_URL, AFFILIATE_REGISTER_URL } from "@/data/affiliate";
import {
  Stagger,
  StaggerItem,
  fadeUp,
  fadeUpSoft,
  scaleIn,
} from "./motion";

export function AffiliateFinalCta() {
  return (
    <section className="grain relative z-10 overflow-hidden border-t border-border/60 bg-transparent py-24 text-foreground sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 110%, rgba(153,86,246,0.3), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Stagger>
          <StaggerItem variants={fadeUpSoft}>
            <h2 className="text-4xl leading-[1.05] font-black tracking-tight text-balance sm:text-6xl">
              Pronto para começar a{" "}
              <em className="text-primary not-italic sm:italic">ganhar</em> com
              as suas referências?
            </h2>
          </StaggerItem>
          <StaggerItem variants={fadeUp}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Crie a sua conta de afiliado, partilhe o Mindgest e acompanhe
              comissões, níveis e levantamentos num só portal.
            </p>
          </StaggerItem>
          <StaggerItem variants={scaleIn}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={AFFILIATE_REGISTER_URL}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  size="lg"
                  className="h-14 bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg shadow-primary/40 hover:bg-primary/90"
                >
                  Criar conta de afiliado
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href={AFFILIATE_LOGIN_URL} target="_blank" rel="noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 border-border px-8 text-base font-bold"
                >
                  Já tenho conta
                </Button>
              </Link>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
