import { Plus } from "lucide-react";
import { Reveal } from "@/components/mindgest/reveal";
import { SectionHeading } from "@/components/mindgest/section-heading";
import { FAQS } from "@/data/mindgest/faqs";

export function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-border bg-background py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            index="05"
            label="Perguntas frequentes"
            title="Ainda com dúvidas?"
            description="Se a sua pergunta não estiver aqui, fale connosco — respondemos depressa."
          />
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 60}>
              <details className="group border border-border bg-card text-foreground transition-colors open:border-primary/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-bold text-foreground">{faq.question}</span>
                  <span className="grid size-8 shrink-0 place-items-center bg-primary/10 text-primary transition-transform duration-300 group-open:rotate-45">
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="px-6 pb-6 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
