"use client";

import React, { useState } from "react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Smartphone, Zap, Shield, MessageCircle, Monitor, CheckCircle2, Layers } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";

type ViewMode = "combined" | "desktop" | "mobile";

export function WebsiteSection() {
  const [viewMode, setViewMode] = useState<ViewMode>("combined");

  const features = [
    {
      icon: Search,
      title: "SEO & Google Search",
      text: "Estruturação semântica, metatags OpenGraph e sitemap XML para o seu negócio ser indexado rapidamente no Google.",
      stat: "100/100 SEO",
    },
    {
      icon: Globe,
      title: "Hospedagem Cloud & Deploy",
      text: "Infraestrutura cloud de alta velocidade e disponibilidade incluída por 1 ano completo, com prontidão imediata para domínio próprio.",
      stat: "1 Ano Incluído",
    },
    {
      icon: Smartphone,
      title: "Design Responsivo",
      text: "Layout adaptável com máxima fluidez e ergonomia de toque em smartphones, tablets e ecrãs widescreen.",
      stat: "Mobile First",
    },
    {
      icon: Zap,
      title: "Ultra Performance",
      text: "Construído em Next.js com carregamento em milissegundos mesmo em redes móveis de menor velocidade.",
      stat: "< 0.8s Load",
    },
    {
      icon: Shield,
      title: "Segurança & SSL",
      text: "Certificado de segurança HTTPS ativo, proteção contra acessos indevidos e infraestrutura de alta resiliência.",
      stat: "SSL Ativo",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Direto",
      text: "Botões de conversão integrados para encaminhar potenciais clientes diretamente para o WhatsApp da sua equipa.",
      stat: "Conversão Direta",
    },
  ];

  return (
    <section
      id="website-section"
      className="relative z-20 scroll-mt-20 border-t border-border bg-background py-28 text-foreground sm:py-32"
    >
      <SectionWrapper className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <Layers className="size-3.5" />
            Engenharia & Performance
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter">
            Website <span className="text-primary">Profissional</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Uma plataforma de alta conversão, desenhada sob medida para transformar visitantes casuais em clientes pagantes 24 horas por dia.
          </p>
        </div>

        {/* Interactive Showcase with Native Mockup Assets */}
        <div className="mb-24 border border-border bg-card p-6 sm:p-10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-border mb-10">
            <div className="flex items-center gap-2">
              <span className="size-2 bg-primary animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Demonstração Real de Projetos Entregues
              </span>
            </div>

            {/* View Mode Selector */}
            <div className="flex items-center bg-muted/60 p-1 border border-border">
              <button
                type="button"
                onClick={() => setViewMode("combined")}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === "combined"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Layers className="size-3.5" />
                <span>Ecrã Completo (PC + Mobile)</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("desktop")}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === "desktop"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Monitor className="size-3.5" />
                <span>MacBook Desktop</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("mobile")}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === "mobile"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Smartphone className="size-3.5" />
                <span>iPhone 3D</span>
              </button>
            </div>
          </div>

          {/* Viewport Display Area */}
          <div className="relative min-h-[460px] sm:min-h-[620px] flex items-center justify-center p-4 sm:p-8 bg-muted/20 border border-border/60 overflow-hidden">
            <div className="absolute inset-0 bg-radial from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />

            <AnimatePresence mode="wait">
              {viewMode === "combined" && (
                <motion.div
                  key="combined"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full max-w-5xl flex items-center justify-center py-6"
                >
                  {/* Laptop Mockup */}
                  <div className="w-full max-w-3xl relative z-10 transition-transform duration-500 hover:scale-[1.02]">
                    <NextImage
                      src="/Desktop-Mockup.png"
                      alt="MacBook Pro Desktop Website Mockup"
                      width={1600}
                      height={1000}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px)"
                      quality={90}
                      className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
                      priority
                    />
                  </div>

                  {/* Overlapping Angled Phone Mockup */}
                  <motion.div
                    initial={{ opacity: 0, x: 40, y: 30 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute -right-4 sm:right-4 md:right-12 bottom-0 z-20 w-[140px] sm:w-[220px] md:w-[280px] transition-transform duration-500 hover:scale-105 hover:-translate-y-2"
                  >
                    <NextImage
                      src="/Mockup-Mobile.png"
                      alt="iPhone 3D Mobile Website Mockup"
                      width={500}
                      height={1000}
                      sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 300px)"
                      quality={90}
                      className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
                    />
                  </motion.div>
                </motion.div>
              )}

              {viewMode === "desktop" && (
                <motion.div
                  key="desktop"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-4xl relative py-8 flex flex-col items-center"
                >
                  <div className="w-full transition-transform duration-500 hover:scale-[1.02]">
                    <NextImage
                      src="/Desktop-Mockup.png"
                      alt="MacBook Pro Desktop View"
                      width={1600}
                      height={1000}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px)"
                      quality={90}
                      className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
                      priority
                    />
                  </div>
                  <span className="mt-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Resolução Widescreen Otimizada para Conversão Desktop
                  </span>
                </motion.div>
              )}

              {viewMode === "mobile" && (
                <motion.div
                  key="mobile"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-4xl py-6 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12"
                >
                  <div className="w-[180px] sm:w-[260px] md:w-[300px] transition-transform duration-500 hover:scale-105">
                    <NextImage
                      src="/Mockup-Mobile.png"
                      alt="iPhone 3D Mobile View 1"
                      width={500}
                      height={1000}
                      sizes="(max-width: 640px) 180px, 300px)"
                      quality={90}
                      className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
                    />
                    <span className="mt-3 block text-center text-xs font-mono text-muted-foreground uppercase">
                      Vista Principal Mobile
                    </span>
                  </div>

                  <div className="w-[180px] sm:w-[260px] md:w-[300px] transition-transform duration-500 hover:scale-105">
                    <NextImage
                      src="/Mockup-Mobile2.png"
                      alt="iPhone 3D Mobile View 2"
                      width={500}
                      height={1000}
                      sizes="(max-width: 640px) 180px, 300px)"
                      quality={90}
                      className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
                    />
                    <span className="mt-3 block text-center text-xs font-mono text-muted-foreground uppercase">
                      Fluidez & Ergonomia Touch
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Mockup Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border text-center">
            <div className="p-3 bg-muted/40 border border-border/60">
              <span className="text-[10px] font-mono uppercase text-muted-foreground block">Velocidade</span>
              <span className="text-sm font-black text-primary">Ultra Rápido</span>
            </div>
            <div className="p-3 bg-muted/40 border border-border/60">
              <span className="text-[10px] font-mono uppercase text-muted-foreground block">Responsividade</span>
              <span className="text-sm font-black text-foreground">100% Fluido</span>
            </div>
            <div className="p-3 bg-muted/40 border border-border/60">
              <span className="text-[10px] font-mono uppercase text-muted-foreground block">SEO Google</span>
              <span className="text-sm font-black text-primary">100 / 100</span>
            </div>
            <div className="p-3 bg-muted/40 border border-border/60">
              <span className="text-[10px] font-mono uppercase text-muted-foreground block">Segurança</span>
              <span className="text-sm font-black text-foreground">SSL HTTPS</span>
            </div>
          </div>
        </div>

        {/* 6 Core Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="group relative flex flex-col justify-between border border-border bg-card p-8 transition-all duration-300 hover:border-primary/60 hover:shadow-[0_16px_36px_-12px_rgba(153,86,246,0.2)]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="size-6" />
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-muted px-2.5 py-1 text-muted-foreground group-hover:text-primary transition-colors">
                    {feature.stat}
                  </span>
                </div>

                <h3 className="text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feature.text}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border flex items-center gap-2 text-xs font-mono text-primary font-bold">
                <CheckCircle2 className="size-3.5" />
                <span>Padrão Mindware Incluído</span>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
