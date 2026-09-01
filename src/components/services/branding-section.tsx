"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Type, Layers, CheckCircle2, Sliders, ShieldCheck } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { FeatureItem } from "./feature-item";

interface PaletteTheme {
  name: string;
  primary: string;
  accent: string;
  dark: string;
  light: string;
  vibe: string;
}

const PALETTE_THEMES: PaletteTheme[] = [
  {
    name: "Mindware Signature",
    primary: "#9956f6",
    accent: "#c084fc",
    dark: "#0f0f14",
    light: "#f8f7fc",
    vibe: "Tecnologia & Inovação",
  },
  {
    name: "Obsidian Gold",
    primary: "#d4af37",
    accent: "#f59e0b",
    dark: "#121212",
    light: "#fdfbf7",
    vibe: "Luxo & Prestígio",
  },
  {
    name: "Emerald Executive",
    primary: "#10b981",
    accent: "#34d399",
    dark: "#061a14",
    light: "#f0fdf4",
    vibe: "Finanças & Crescimento",
  },
  {
    name: "Crimson Power",
    primary: "#ef4444",
    accent: "#f87171",
    dark: "#1c0a0a",
    light: "#fef2f2",
    vibe: "Energia & Autoridade",
  },
];

export function BrandingSection() {
  const [selectedTheme, setSelectedTheme] = useState<PaletteTheme>(PALETTE_THEMES[0]);

  return (
    <section
      id="branding-section"
      className="relative z-20 scroll-mt-20 border-t border-border bg-muted/20 py-28 text-foreground sm:py-32"
    >
      <SectionWrapper className="container mx-auto px-4">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Descriptions & Pillars */}
          <div className="lg:col-span-6 space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                <Palette className="size-3.5" />
                Autoridade & Percepção
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter">
                Identidade <span className="text-primary">Visual</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Mais do que um logo. Criamos um ecossistema visual estratégico que diferencia o seu negócio e comunica autoridade imediata antes mesmo da primeira palavra.
              </p>
            </div>

            <div className="space-y-6">
              <FeatureItem
                icon={Palette}
                title="Paleta de Cores Estratégica"
                description="Seleção cromática orientada à psicologia de consumo para despertar confiança e destaque no mercado."
                delay={0.1}
              />
              <FeatureItem
                icon={Type}
                title="Tipografia & Tom de Voz"
                description="Fontes selecionadas para garantir legibilidade máxima e transmitir solidez em ecrãs e suportes físicos."
                delay={0.2}
              />
              <FeatureItem
                icon={Layers}
                title="Manual & Sistema de Marca"
                description="Diretrizes claras de uso do logotipo, margens de segurança, versões monocromáticas e assets em alta resolução."
                delay={0.3}
              />
            </div>
          </div>

          {/* Right Column: Interactive Brand Studio with Palette Switcher */}
          <div className="lg:col-span-6">
            <div className="border border-border bg-card p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Studio Top Control */}
              <div className="flex items-center justify-between border-b border-border pb-5 mb-6">
                <div className="flex items-center gap-2">
                  <Sliders className="size-4 text-primary" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                    Estúdio de Marca Interativo
                  </span>
                </div>
                <span className="text-[11px] font-mono bg-primary/10 text-primary px-2.5 py-1 font-bold">
                  {selectedTheme.vibe}
                </span>
              </div>

              {/* Live Theme Switcher */}
              <div className="mb-6 space-y-2">
                <label className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                  Simule Variações de Identidade Visual:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PALETTE_THEMES.map((theme) => (
                    <button
                      key={theme.name}
                      type="button"
                      onClick={() => setSelectedTheme(theme)}
                      className={`p-2 text-left border text-xs font-bold transition-all cursor-pointer ${
                        selectedTheme.name === theme.name
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span
                          className="size-3 border border-black/10"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <span
                          className="size-3 border border-black/10"
                          style={{ backgroundColor: theme.accent }}
                        />
                      </div>
                      <span className="truncate block text-[11px]">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Brand Canvas Showcase */}
              <motion.div
                key={selectedTheme.name}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="border border-border/80 p-6 space-y-6 bg-muted/20"
              >
                {/* Brand Visual Card */}
                <div
                  className="p-6 text-white shadow-xl transition-all duration-500 flex flex-col justify-between min-h-[180px]"
                  style={{
                    background: `linear-gradient(135deg, ${selectedTheme.dark} 0%, ${selectedTheme.primary} 100%)`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="size-3 rounded-full"
                        style={{ backgroundColor: selectedTheme.accent }}
                      />
                      <span className="font-mono text-xs uppercase tracking-widest font-black">
                        Brand Identity Core
                      </span>
                    </div>
                    <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 backdrop-blur-md">
                      Vector SVG • CMYK & RGB
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl font-black tracking-tight">
                      Sua Marca Premium
                    </h3>
                    <p className="text-xs opacity-80">
                      Identidade visual desenhada para inspirar confiança, autoridade e escala.
                    </p>
                  </div>
                </div>

                {/* Color Swatches Grid */}
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div className="space-y-1">
                    <div
                      className="h-12 border border-border flex items-center justify-center font-mono text-[10px] font-bold text-white shadow-inner"
                      style={{ backgroundColor: selectedTheme.primary }}
                    >
                      Primary
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground block">
                      {selectedTheme.primary}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div
                      className="h-12 border border-border flex items-center justify-center font-mono text-[10px] font-bold text-white shadow-inner"
                      style={{ backgroundColor: selectedTheme.accent }}
                    >
                      Accent
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground block">
                      {selectedTheme.accent}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div
                      className="h-12 border border-border flex items-center justify-center font-mono text-[10px] font-bold text-white shadow-inner"
                      style={{ backgroundColor: selectedTheme.dark }}
                    >
                      Deep
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground block">
                      {selectedTheme.dark}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div
                      className="h-12 border border-border flex items-center justify-center font-mono text-[10px] font-bold text-foreground shadow-inner"
                      style={{ backgroundColor: selectedTheme.light }}
                    >
                      Light
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground block">
                      {selectedTheme.light}
                    </span>
                  </div>
                </div>

                {/* Deliverables Checklist for Branding */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-muted-foreground border-t border-border pt-4">
                  <div className="flex items-center gap-1.5 text-foreground">
                    <CheckCircle2 className="size-3 text-primary" />
                    <span>Logótipo Principal & Variações</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground">
                    <CheckCircle2 className="size-3 text-primary" />
                    <span>Paleta Hex / RGB / CMYK</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground">
                    <CheckCircle2 className="size-3 text-primary" />
                    <span>Manual de Identidade Visual</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground">
                    <CheckCircle2 className="size-3 text-primary" />
                    <span>Assets Vetoriais (AI, SVG, PNG)</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
