"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export function FAQ() {
  const faqs = [
    {
      question: "Como vocês estimam os custos do projeto?",
      answer:
        "Oferecemos modelos de preço fixo e por tempo e materiais. Após uma fase inicial de descoberta, fornecemos um detalhamento de marcos, alocação de recursos e cronogramas para garantir transparência e alinhamento com seu orçamento.",
    },
    {
      question: "Vocês fornecem suporte pós-lançamento?",
      answer:
        "Com certeza. Oferecemos vários pacotes de manutenção garantindo que seu software permaneça seguro, atualizado e sem bugs. Nossa equipe de suporte está disponível para problemas críticos, e fornecemos atualizações regulares para manter sua plataforma funcionando perfeitamente.",
    },
    {
      question: "Em quais tecnologias vocês são especializados?",
      answer:
        "Nossa stack principal inclui React, Next.js, Vue, Node.js, Python e serviços de nuvem como AWS e Azure. No entanto, somos agnósticos em tecnologia e escolheremos as melhores ferramentas para as necessidades específicas e requisitos de escala do seu negócio.",
    },
    {
      question: "Quanto tempo leva um projeto típico?",
      answer:
        "Os cronogramas variam com a complexidade, mas uma aplicação web típica leva de 8 a 12 semanas da descoberta ao lançamento. Trabalhamos em sprints ágeis, entregando valor incremental e permitindo flexibilidade conforme os requisitos evoluem.",
    },
    {
      question: "Vocês podem ajudar com projetos existentes?",
      answer:
        "Sim! Regularmente assumimos projetos existentes, seja para manutenção, adição de recursos ou reformulações completas. Começamos com uma auditoria de código completa para entender o estado atual e fornecer recomendações de melhoria.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Perguntas <span className="text-primary">Frequentes</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Tudo o que você precisa saber sobre nossos serviços
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="bg-card/50 border border-border/50 hover:border-primary/30 rounded-teste-2xl px-8 transition-all duration-300 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-lg md:text-xl font-semibold hover:no-underline hover:text-primary py-7 transition-colors text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-7 text-base md:text-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
