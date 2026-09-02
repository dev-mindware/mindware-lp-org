"use client";

import React from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { ArrowDown, Users, CheckCircle2, ArrowRight, Layout, Palette, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WHATSAPP_URL } from "@/constants/site";

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.9]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative z-10 pt-28 pb-20 overflow-hidden"
    >
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="container mx-auto px-4 text-center max-w-5xl"
      >
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-6 inline-block"
        >
          <span className="px-5 py-2 bg-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-widest border border-primary/20 shadow-sm inline-flex items-center gap-2">
            <span className="size-2 bg-primary animate-pulse" />
            Serviço Chave-na-Mão • Angola
          </span>
        </motion.div>

        {/* Main Display Headline */}
        <div className="mb-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter"
          >
            PRESENÇA <br />
            <span className="text-primary italic relative">
              DIGITAL
              <motion.span
                className="absolute inset-0 blur-3xl opacity-20 bg-primary -z-10"
                animate={{ opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Identidade visual estratégica combinada com engenharia web de alta conversão. Para empresas, profissionais liberais e negócios em crescimento.
        </motion.p>

        {/* Quick Interactive Nav Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10"
        >
          <button
            type="button"
            onClick={() => scrollTo("branding-section")}
            className="px-4 py-2 text-xs font-mono font-bold border border-border bg-card hover:border-primary/50 text-foreground transition-all flex items-center gap-2 cursor-pointer"
          >
            <Palette className="size-3.5 text-primary" />
            <span>01. Identidade Visual</span>
          </button>
          <button
            type="button"
            onClick={() => scrollTo("website-section")}
            className="px-4 py-2 text-xs font-mono font-bold border border-border bg-card hover:border-primary/50 text-foreground transition-all flex items-center gap-2 cursor-pointer"
          >
            <Layout className="size-3.5 text-primary" />
            <span>02. Mockups & Website</span>
          </button>
          <button
            type="button"
            onClick={() => scrollTo("para-quem")}
            className="px-4 py-2 text-xs font-mono font-bold border border-border bg-card hover:border-primary/50 text-foreground transition-all flex items-center gap-2 cursor-pointer"
          >
            <Users className="size-3.5 text-primary" />
            <span>03. Para Quem É</span>
          </button>
          <button
            type="button"
            onClick={() => scrollTo("precos")}
            className="px-4 py-2 text-xs font-mono font-bold border border-primary/40 bg-primary/10 text-primary transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="size-3.5" />
            <span>132.514,00 Kz (Pacote Base)</span>
          </button>
        </motion.div>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            href={`${WHATSAPP_URL}?text=${encodeURIComponent(
              "Olá Mindware! Gostaria de saber mais sobre o pacote de Presença Digital (132.514,00 Kz)."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-6 text-base font-black bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <span>Pedir Orçamento</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollTo("website-section")}
            className="w-full sm:w-auto px-8 py-6 text-base font-bold border border-border bg-card hover:bg-muted text-foreground"
          >
            Explorar Mockups & Demonstração
          </Button>
        </motion.div>

        {/* Scroll down trigger */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => scrollTo("branding-section")}
          className="inline-flex flex-col items-center gap-2 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
        >
          <span className="text-[11px] uppercase tracking-widest font-mono font-bold">
            Explorar Solução
          </span>
          <ArrowDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
