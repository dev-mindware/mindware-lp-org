"use client";
import { ArrowRight, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function About() {
  return (
    <section id="about" className="py-24 bg-card overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-test-test-full blur-2xl opacity-50 pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-test-test-full blur-2xl opacity-50 pointer-events-none" />

            <div className="relative rounded-test-test-2xl overflow-hidden shadow-2xl border border-white/10 bg-muted">
              <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent z-10 mix-blend-overlay" />
              <img
                src="/oficial.jpg"
                alt="Mindware team collaborating"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-primary"></span>
              <span className="text-primary font-bold uppercase tracking-widest text-sm">
                Quem Somos
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Impulsionando a Inovação Desde{" "}
              <span className="text-primary">o Primeiro Dia</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Na Mindware, acreditamos que a tecnologia deve ser um facilitador,
              não uma barreira. Fundada com a visão de preencher a lacuna entre
              engenharia complexa e design centrado no ser humano, passamos mais
              de uma década aperfeiçoando a arte da transformação digital.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nossa missão é simples: capacitar empresas com soluções de
              software robustas, escaláveis e intuitivas que resistem ao teste
              do tempo. Somos mais do que apenas desenvolvedores; somos os seus
              parceiros estratégicos na navegação do panorama digital em
              constante evolução.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 rounded-test-test-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                  <Star className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Excelência na Execução</h4>
                  <p className="text-sm text-muted-foreground">
                    Não cortamos atalhos. Cada linha de código é criada com
                    precisão e propósito
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 rounded-test-test-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Parceria Colaborativa</h4>
                  <p className="text-sm text-muted-foreground">
                    O seu sucesso é o nosso sucesso. Trabalhamos ao seu lado
                    como uma extensão da sua equipa.
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="link"
              className="text-primary font-semibold p-0 h-auto group text-base"
            >
              Descubra a Nossa História{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
