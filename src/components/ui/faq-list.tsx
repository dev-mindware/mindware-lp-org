import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqListProps = {
  items: readonly FaqItem[];
  className?: string;
};

/**
 * Lista de perguntas frequentes partilhada pela home, pelo Mindgest e pelo
 * programa de afiliados — para que as três páginas tenham o mesmo estilo.
 * Usa o Accordion (Radix) pela transição suave de altura ao abrir e fechar.
 */
export function FaqList({ items, className = "" }: FaqListProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className={`w-full space-y-3 ${className}`}
    >
      {items.map((faq, i) => (
        <Reveal key={faq.question} delay={i * 60}>
          <AccordionItem
            value={faq.question}
            className="border border-border bg-card px-6 transition-colors hover:border-primary/40 data-[state=open]:border-primary/40"
          >
            <AccordionTrigger className="py-5 text-left text-base font-bold tracking-tight hover:text-primary hover:no-underline sm:text-lg">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        </Reveal>
      ))}
    </Accordion>
  );
}
