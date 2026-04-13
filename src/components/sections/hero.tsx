"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedLinesBackground } from "../ui/animated-bg";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background"
    >
      <AnimatedLinesBackground />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-primary/20 rounded-test-test-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-primary/10 rounded-test-test-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-test-test-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-test-test-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-test-test-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-test-test-full h-2 w-2 bg-primary"></span>
            </span>
            Parceiro de Inovação Digital
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
            Transformando Ideias em{" "}
            <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent animate-gradient ">
              Realidade Digital
            </span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Somos uma empresa de Design e Desenvolvimento de software. Do design
            à implementação, construímos a tecnologia que impulsiona o seu
            crescimento.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
            <a href="https://wa.me/956985628">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-test-test-lg px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40"
              >
                Inicie Seu Projeto <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <Link href="/blog">
              <Button
                variant="outline"
                size="lg"
                className="rounded-test-test-lg px-8 h-12 text-base border-input hover:bg-accent hover:text-accent-foreground"
              >
                Ver Casos de Estudo
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-primary h-5 w-5" />
              <span>Processo Ágil</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-primary h-5 w-5" />
              <span>Código Escalável</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-primary h-5 w-5" />
              <span>Suporte 24/7</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
