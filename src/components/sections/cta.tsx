"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CTA() {
  return (
    <section
      id="contact"
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="bg-card border border-border rounded-test-test-3xl p-12 md:p-20 relative overflow-hidden max-w-5xl mx-auto shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-test-test-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-test-test-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para Construir Algo <br />
            <span className="text-primary">Extraordinário?</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Vamos discutir a sua visão e como a nossa equipa pode ajudá-lo a
            concretizá-la com precisão e velocidade.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Introduza o seu endereço de email"
              className="flex-1 h-14 bg-background border-input text-base"
            />
            <Button
              size="lg"
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base shadow-sm shadow-primary/25"
            >
              Começar
            </Button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground">
            Sem spam, apenas conversa de qualidade. Cancele a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
}
