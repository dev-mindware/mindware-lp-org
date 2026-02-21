"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";
import { Palette, Layout, Sparkles } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { FeatureItem } from "./feature-item";

interface BrandingSectionProps {
    brandingScale: MotionValue<number>;
    brandingOpacity: MotionValue<number>;
}

export function BrandingSection({ brandingScale, brandingOpacity }: BrandingSectionProps) {
    return (
        <section id="branding-section" className="relative z-20 bg-muted/30 backdrop-blur-sm border-t border-border">
            <SectionWrapper className="py-32 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Identidade <br /><span className="text-primary">Visual</span></h2>
                            <div className="w-20 h-2 bg-primary" />
                        </div>

                        <div className="space-y-6">
                            <FeatureItem
                                icon={Palette}
                                title="Paleta Estratégica"
                                description="Cores que comunicam autoridade e despertam as emoções certas no seu público-alvo."
                                delay={0.1}
                            />
                            <FeatureItem
                                icon={Layout}
                                title="Tipografia Profissional"
                                description="Fontes selecionadas para garantir legibilidade e transmitir o tom de voz da sua marca."
                                delay={0.2}
                            />
                            <FeatureItem
                                icon={Sparkles}
                                title="Logo & Variações"
                                description="Um sistema visual completo adaptável a qualquer plataforma, do cartão ao outdoor."
                                delay={0.3}
                            />
                        </div>
                    </div>

                    <motion.div
                        style={{ scale: brandingScale, opacity: brandingOpacity }}
                        className="relative"
                    >
                        {/* Main Glass Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1, type: "spring" }}
                            viewport={{ once: true }}
                            className="bg-card/40 backdrop-blur-xl p-6 rounded-test-test-[2rem] border border-border/50 shadow-2xl relative overflow-hidden group min-h-[500px]"
                        >
                            {/* Liquid Depth Layer */}
                            <div className="absolute inset-0 bg-linear-to-br from-muted/50 to-transparent opacity-50 pointer-events-none" />

                            <div className="grid grid-cols-2 gap-4 h-full relative z-10">
                                {/* Palette Column */}
                                <div className="space-y-4">
                                    <div className="p-4 rounded-test-test-2xl bg-[#9956f6] text-white flex flex-col justify-end aspect-square shadow-lg shadow-primary/20 group-hover:scale-[1.02] transition-transform duration-500">
                                        <span className="text-[10px] font-mono opacity-60 uppercase">Primary</span>
                                        <span className="font-bold">#9956f6</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-24 rounded-test-test-xl bg-black border border-white/10 flex flex-col justify-end p-3 shadow-inner">
                                            <span className="text-[8px] font-mono opacity-50 text-white uppercase">Deep</span>
                                        </div>
                                        <div className="h-24 rounded-test-test-xl bg-white flex flex-col justify-end p-3 text-black shadow-inner">
                                            <span className="text-[8px] font-mono opacity-50 uppercase">Light</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Brand Asset Column */}
                                <div className="space-y-4">
                                    <div className="h-full rounded-test-test-2xl bg-linear-to-br from-primary/20 via-black to-black border border-border p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-inner group-hover:shadow-[inset_0_0_20px_rgba(153,86,246,0.3)] transition-shadow duration-500">
                                        <div className="w-16 h-16 rounded-test-test-full bg-primary/20 border border-primary/40 flex items-center justify-center backdrop-blur-sm">
                                            <Sparkles className="w-8 h-8 text-primary" />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-bold tracking-widest uppercase">Visual Equity</h4>
                                            <div className="h-1 w-12 bg-primary mx-auto rounded-test-test-full shadow-[0_0_10px_#9956f6]" />
                                        </div>
                                        <p className="text-[10px] text-muted-foreground leading-tight">Mockup de Asset Visual <br /> Alta Resolução</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating "Crystal" Logo Detail Overlay */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-6 right-6 w-32 aspect-square bg-black/40 backdrop-blur-2xl border border-white/20 rounded-test-test-2xl shadow-2xl p-4 flex items-center justify-center z-20"
                            >
                                <div className="absolute inset-0 rounded-test-test-2xl bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
                                <div className="w-full h-full border border-dashed border-primary/30 rounded-test-test-lg flex items-center justify-center">
                                    <Palette className="w-8 h-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </SectionWrapper>
        </section>
    );
}
