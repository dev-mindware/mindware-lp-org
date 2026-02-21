"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

import { faqs } from "@/data";

export function FAQ() {

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
                className="bg-card/50 border border-border/50 hover:border-primary/30 rounded-test-test-2xl px-8 transition-all duration-300 backdrop-blur-sm"
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
