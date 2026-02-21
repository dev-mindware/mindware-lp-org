"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
    heroScale: MotionValue<number>;
    heroOpacity: MotionValue<number>;
}

export function HeroSection({ heroScale, heroOpacity }: HeroSectionProps) {
    return (
        <section className="h-screen flex items-center justify-center relative z-10 overflow-hidden">
            <motion.div
                style={{ scale: heroScale, opacity: heroOpacity }}
                className="container mx-auto px-4 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    className="mb-6 inline-block relative group"
                >
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-test-test-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 px-6 py-2 rounded-test-test-full bg-background/50 backdrop-blur-md text-primary text-xs font-bold uppercase tracking-widest border border-border/50 shadow-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-test-test-full bg-primary animate-pulse" />
                        Serviço Premium
                    </span>
                </motion.div>

                <div className="mb-8 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-[10rem] font-black leading-none tracking-tighter"
                    >
                        PRESENÇA <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-300 to-primary bg-size-[200%_auto] animate-gradient italic relative">
                            DIGITAL
                            <motion.span
                                className="absolute inset-0 blur-3xl opacity-30 bg-primary -z-10"
                                animate={{ opacity: [0.2, 0.4, 0.2] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                        </span>
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 relative"
                >
                    Onde a arte da identidade visual encontra a precisão da engenharia web.
                    <div className="absolute -inset-4 bg-primary/5 blur-2xl -z-10 rounded-test-test-full opacity-50" />
                </motion.p>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    onClick={() => document.getElementById("branding-section")?.scrollIntoView({ behavior: "smooth" })}
                    className="flex flex-col items-center gap-2 text-muted-foreground mt-20 cursor-pointer"
                >
                    <span className="text-xs uppercase tracking-widest font-bold">Inicie a Jornada</span>
                    <ArrowDown className="w-5 h-5" />
                </motion.div>
            </motion.div>
        </section>
    );
}
