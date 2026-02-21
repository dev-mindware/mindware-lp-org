"use client";

import React from "react";
import NextImage from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";
import { Search, Globe, Smartphone } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";

interface WebsiteSectionProps {
    websiteX: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
}

export function WebsiteSection({ websiteX, scrollYProgress }: WebsiteSectionProps) {
    return (
        <section id="website-section" className="relative z-20 bg-muted/30 backdrop-blur-sm">
            <SectionWrapper className="py-32 container mx-auto px-4">
                <motion.div
                    style={{ x: websiteX }}
                    className="text-center max-w-3xl mx-auto mb-20 space-y-6"
                >
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Website <br /><span className="text-primary">Profissional</span></h2>
                    <p className="text-xl text-muted-foreground italic">Uma máquina de vendas funcionando 24/7 para você.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[
                        { icon: Search, title: "SEO Avançado", text: "Visibilidade imediata no Google e motores de busca." },
                        { icon: Globe, title: "Domínio & Host", text: "Tudo incluído por 1 ano para você não se preocupar." },
                        { icon: Smartphone, title: "Mobile Ready", text: "Experiência perfeita em smartphones e tablets." }
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            whileHover={{ scale: 1.03, y: -5 }}
                            transition={{
                                duration: 0.5,
                                delay: i * 0.15,
                                type: "spring",
                                stiffness: 200
                            }}
                            viewport={{ once: true }}
                            className="bg-card/40 backdrop-blur-lg p-10 rounded-test-test-[2rem] border border-border/50 hover:border-primary/50 shadow-lg hover:shadow-[0_8px_32px_rgba(153,86,246,0.2)] transition-all group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-b from-muted to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <card.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform relative z-10" />
                            <h3 className="text-2xl font-bold mb-4 relative z-10">{card.title}</h3>
                            <p className="text-muted-foreground font-medium relative z-10">{card.text}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Desktop/Mobile Showcase */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Desktop Mockup: Real Work Highlight */}
                    <motion.div
                        style={{ x: useTransform(scrollYProgress, [0.3, 0.6], [100, 0]) }}
                        className="lg:col-span-8"
                    >
                        <div className="relative group perspective-1000">
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Image Content */}
                            <div className="mt-10 overflow-hidden">
                                <NextImage
                                    src="/Desktop-Mockup.png"
                                    alt="Desktop Project Portfolio"
                                    width={1600}
                                    height={900}
                                    className="w-full h-auto opacity-95 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Mobile: Real Project Mockups */}
                    <motion.div
                        style={{ x: useTransform(scrollYProgress, [0.3, 0.6], [-100, 0]) }}
                        className="lg:col-span-4 relative h-[600px] flex items-center justify-center pl-8"
                    >
                        <div className="absolute inset-0 bg-primary/5 rounded-test-test-[3rem] blur-3xl" />

                        {/* Mockup 1: Portfolio Example 1 */}
                        <motion.div
                            style={{
                                y: useTransform(scrollYProgress, [0.4, 0.8], [50, -50]),
                                rotate: -5
                            }}
                            className="absolute z-10 w-[550px] left-0 md:-left-6"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <NextImage
                                    src="/Mockup-Mobile.png"
                                    alt="Projeto Mobile Portfolio 1"
                                    width={500}
                                    height={1000}
                                    className="rounded-test-test-[2.5rem]"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </SectionWrapper>
        </section>
    );
}
