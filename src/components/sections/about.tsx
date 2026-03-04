"use client";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function About() {
  return (
    <section id="about" className="py-24 bg-card overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="relative order-2 lg:order-1">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-60 pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl opacity-60 pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-muted group">
              <div className="absolute inset-0 bg-linear-to-tr from-primary/30 via-transparent to-transparent z-10 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-75" />
              <Image
                fill
                src="/oficial.jpg"
                alt="Mindware Team"
                className="w-full h-full object-cover aspect-4/5 lg:aspect-square group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 bg-background/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <span className="block font-bold text-foreground text-lg">
                      Sólidas & Seguras
                    </span>
                    <p className="text-sm text-muted-foreground">
                      Soluções digitais prontas para o futuro.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-3 mb-6"
            >
              <span className="h-px w-12 bg-primary"></span>
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm">
                Quem somos — Mindware
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight tracking-tight"
            >
              Construímos{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary">
                soluções estratégicas
              </span>{" "}
              que resolvem problemas reais.
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="space-y-6 text-lg text-muted-foreground leading-relaxed"
            >
              <p className="text-justify">
                Na Mindware, não desenvolvemos apenas software. Acreditamos que
                tecnologia sem propósito é desperdício de tempo e dinheiro. Por
                isso, cada projecto nasce com um objectivo claro: gerar
                eficiência, crescimento e vantagem competitiva para os nossos
                clientes.
              </p>

              <p className="text-justify">
                O nosso diferencial está na combinação de visão técnica com
                mentalidade de negócio. Não entregamos apenas código funcional;
                entregamos sistemas pensados para escalar, operar offline quando
                necessário, integrar microserviços e adaptar-se à realidade do
                mercado angolano. Criamos soluções robustas, seguras e
                orientadas a resultados.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10">
              <p className="font-medium text-foreground mb-6 text-lg border-l-4 border-primary pl-4">
                A Mindware existe para transformar ideias em soluções digitais
                sólidas e transformar negócios através da tecnologia.
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 h-14 px-8 group"
              >
                <Link href="https://api.whatsapp.com/send/?phone=926665793&text&type=phone_number&app_absent=0">
                  Fale Connosco
                </Link>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
