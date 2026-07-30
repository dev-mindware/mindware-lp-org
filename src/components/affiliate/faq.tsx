import { AFFILIATE_FAQS } from "@/data/affiliate";
import { FaqList } from "@/components/ui/faq-list";
import { AffiliateHeading } from "./heading";

export function AffiliateFaq() {
  return (
    <section
      id="faq-afiliado"
      className="relative z-10 scroll-mt-24 border-t border-border bg-background py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <AffiliateHeading
          align="center"
          index="07"
          label="Perguntas frequentes"
          title="Dúvidas sobre o programa?"
          description="As respostas mais importantes sobre níveis, clientes activos e levantamentos."
        />

        <FaqList items={AFFILIATE_FAQS} className="mt-12" />
      </div>
    </section>
  );
}
