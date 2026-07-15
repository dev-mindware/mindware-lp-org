"use client";

import { Plus } from "lucide-react";
import { AFFILIATE_FAQS } from "@/data/affiliate";
import { AffiliateHeading } from "./heading";
import { Stagger, StaggerItem, fadeUp } from "./motion";

export function AffiliateFaq() {
  return (
    <section
      id="faq-afiliado"
      className="relative z-10 scroll-mt-24 border-t border-border bg-background py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <AffiliateHeading
          align="center"
          index="07"
          label="Perguntas frequentes"
          title="Dúvidas sobre o programa?"
          description="As respostas mais importantes sobre níveis, clientes activos e levantamentos."
        />

        <Stagger className="mt-12 space-y-3">
          {AFFILIATE_FAQS.map((faq) => (
            <StaggerItem key={faq.question} variants={fadeUp}>
              <details className="group border border-border bg-card text-foreground transition-colors open:border-primary/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-bold text-foreground">
                    {faq.question}
                  </span>
                  <span className="grid size-8 shrink-0 place-items-center bg-primary/10 text-primary transition-transform duration-300 group-open:rotate-45">
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="px-6 pb-6 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
