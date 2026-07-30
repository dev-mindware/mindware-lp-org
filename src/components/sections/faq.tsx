import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqList } from "@/components/ui/faq-list";
import { faqs } from "@/data/faqs";

export function FAQ() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-border bg-background py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <Reveal>
          <SectionHeading
            align="center"
            index="06"
            label="Perguntas frequentes"
            title="Ainda com dúvidas?"
            description="Se a sua pergunta não estiver aqui, fale connosco — respondemos depressa."
          />
        </Reveal>

        <FaqList items={faqs} className="mt-12" />
      </div>
    </section>
  );
}
