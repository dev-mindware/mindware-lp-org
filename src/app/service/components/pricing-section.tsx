"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CountdownTimer } from "./countdown-timer";

export function PricingSection() {
    return (
        <section className="relative z-30 bg-primary dark:bg-primary/60 text-primary-foreground overflow-hidden">
            <div className="container mx-auto px-4 py-32 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-16">
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <span className="inline-block px-4 py-1.5 rounded-test-test-full bg-white/20 text-xs font-bold uppercase tracking-widest text-white">Oferta de Lançamento</span>
                            <h2 className="text-2xl md:text-3xl uppercase tracking-[0.5em] font-black opacity-90 text-white">Investimento</h2>
                        </motion.div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
                            <div className="space-y-1 opacity-60 relative text-white">
                                <span className="text-sm md:text-base uppercase tracking-widest font-bold">Normal</span>
                                <div className="text-3xl md:text-4xl font-black line-through decoration-white/60 decoration-4">250.000 <span className="text-lg">Kz</span></div>
                            </div>

                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1, type: "spring" }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="absolute -top-8 -right-8 md:-top-10 md:-right-10 bg-white text-primary px-3 py-2 md:px-4 md:py-3 rounded-test-test-full font-black text-xs md:text-base rotate-12 shadow-xl animate-pulse">
                                    -23%
                                </div>
                                <span className="text-sm md:text-base uppercase tracking-widest font-black text-white/90">Promocional</span>
                                <div className="text-6xl md:text-[8rem] font-black tracking-tighter tabular-nums leading-none drop-shadow-2xl text-white">
                                    192.514 <span className="text-2xl md:text-4xl uppercase">Kz</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Promo Timer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="space-y-6 pt-8 border-t border-white/20"
                    >
                        <div className="flex items-center justify-center gap-2 text-white/90 uppercase tracking-widest font-bold">
                            <Timer className="w-5 h-5" />
                            Termina a: <span className="text-white">10 de Junho</span>
                        </div>
                        <CountdownTimer targetDate="2026-06-10T00:00:00" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left border-y border-white/20 py-10">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 font-bold text-white"><CheckCircle2 className="w-5 h-5" /> Até 2 Rodadas de Revisão</div>
                            <div className="flex items-center gap-3 font-bold text-white"><CheckCircle2 className="w-5 h-5" /> Website c/ 5 Secções</div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 font-bold text-white"><CheckCircle2 className="w-5 h-5" /> Gestão de Hospedagem</div>
                            <div className="flex items-center gap-3 font-bold text-white"><CheckCircle2 className="w-5 h-5" /> Suporte Técnico</div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link href="https://wa.me/seu-numero" target="_blank" className="w-full md:w-auto">
                            <Button variant="secondary" size="lg" className="w-full px-10 py-6 text-lg font-black rounded-test-test-full shadow-xl hover:scale-105 transition-transform bg-white text-primary">
                                Quero Garantir a Promoção
                            </Button>
                        </Link>
                        <Link href="/" className="w-full md:w-auto">
                            <Button variant="outline" size="lg" className="w-full px-10 py-6 text-lg font-bold rounded-test-test-full border-2 border-white bg-transparent hover:bg-white hover:text-primary transition-all text-white">
                                Voltar ao Início
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative Background for Pricing */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] border-50 border-white/5 rounded-test-test-full pointer-events-none"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] border-30 border-white/5 rounded-test-test-full pointer-events-none"
            />
        </section>
    );
}
