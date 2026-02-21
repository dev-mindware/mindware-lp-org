"use client";

import React from "react";
import {
    FileText,
    HelpCircle,
    CheckCircle2,
    ArrowLeft,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { fyiData, docTypes, comparisonTable } from "@/data";

export function FYIContent() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": fyiData.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer || item.details?.map(d => d.text).join(" ") || ""
            }
        }))
    };

    return (
        <main className="min-h-screen bg-background text-foreground pt-32 pb-20 overflow-hidden relative">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Background Support Blobs - Adjusted for Light Mode */}
            <div className="absolute top-0 left-0 w-full h-full bg-primary/2 dark:bg-primary/5 pointer-events-none" />

            <div className="absolute top-40 -left-20 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse pointer-events-none" />
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-purple-500/5 dark:bg-purple-500/10 blur-[150px] mix-blend-multiply dark:mix-blend-screen pointer-events-none" />

            <SectionWrapper className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-16">

                        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/20 bg-primary/10 backdrop-blur-md text-primary text-xs font-bold uppercase tracking-widest mb-6 shadow-sm rounded-test-test-none">
                            <ShieldCheck className="w-4 h-4" />
                            Guia de Facturação de Angola - AGT
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none bg-linear-to-b from-foreground to-foreground/70 bg-clip-text">
                            Regime de <span className="text-primary italic">Facturação</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
                            A sua empresa precisa do <span className="text-foreground border-b-2 border-primary/30">melhor software de facturação em Angola</span>. Explore a nossa base de conhecimento para garantir conformidade total com a AGT.
                        </p>
                    </div>

                    {/* FAQ Section */}
                    <div className="space-y-12 mb-24">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary border border-primary/30 shadow-inner rounded-test-test-none">
                                <HelpCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tight">Perguntas Frequentes</h2>
                        </div>

                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {fyiData.map((item, i) => (
                                <AccordionItem
                                    key={i}
                                    value={`item-${i}`}
                                    className="border border-border/50 bg-card/50 dark:bg-white/3 backdrop-blur-xl px-8 transition-all hover:bg-card/80 dark:hover:bg-white/6 hover:border-primary/40 shadow-sm hover:shadow-md overflow-hidden rounded-test-test-none"
                                >
                                    <AccordionTrigger className="text-left py-7 hover:no-underline font-bold text-lg md:text-xl">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-8 text-muted-foreground leading-relaxed text-lg border-t border-border/50 pt-6">
                                        {item.answer && <p>{item.answer}</p>}

                                        {item.highlights && (
                                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {item.highlights.map((h, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 text-sm bg-primary/3 dark:bg-primary/5 p-3 border border-primary/10 dark:border-primary/20 backdrop-blur-sm rounded-test-test-none">
                                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                                        <span className="font-semibold text-foreground/80">{h}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {item.details && (
                                            <div className="space-y-6 mt-8">
                                                {item.details.map((d, idx) => (
                                                    <div key={idx} className="bg-muted/50 dark:bg-muted/30 p-5 border-l-4 border-primary/50 rounded-test-test-none">
                                                        <h5 className="font-black text-foreground text-xs uppercase tracking-[0.2em] mb-2">{d.sub}</h5>
                                                        <p className="font-medium">{d.text}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {item.subText && (
                                            <div className="mt-8 bg-linear-to-r from-primary/10 to-transparent p-6 border border-primary/10 italic text-base rounded-test-test-none">
                                                {item.subText}
                                            </div>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* Document Types Grid */}
                    <div className="space-y-12 mb-24">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary border border-primary/30 shadow-inner rounded-test-test-none">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tight">Tipos de Documentos Fiscais</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-12">
                            {docTypes.map((doc, i) => (
                                <div
                                    key={i}
                                    className="p-10 border border-border/50 bg-card/50 dark:bg-white/2 backdrop-blur-2xl relative overflow-hidden group hover:border-primary/40 transition-all hover:shadow-xl rounded-test-test-none"
                                >
                                    <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity rotate-12">
                                        <FileText size={120} />
                                    </div>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter text-primary mb-4 drop-shadow-sm">
                                        {doc.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-8 text-lg font-medium leading-relaxed max-w-3xl">
                                        {doc.desc}
                                    </p>

                                    {doc.elements && (
                                        <div className="space-y-4 mb-10">
                                            <p className="text-[10px] uppercase font-black text-primary/60 tracking-[0.3em] mb-4">Elementos Essenciais:</p>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                                                {doc.elements.map((el, idx) => (
                                                    <li key={idx} className="flex items-center gap-3 text-sm font-bold text-muted-foreground border-b border-border/30 pb-2">
                                                        <div className="w-1.5 h-1.5 bg-primary" /> {el}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {doc.scenarios && (
                                        <div className="space-y-6 mb-10">
                                            <p className="text-[10px] uppercase font-black text-primary/60 tracking-[0.3em] mb-4">Cenários de Aplicação:</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {doc.scenarios.map((scen, idx) => (
                                                    <div key={idx} className="bg-muted/30 p-5 border-l-2 border-primary/30 hover:bg-muted/50 transition-colors">
                                                        <h4 className="font-bold text-sm text-foreground mb-2">{scen.title}</h4>
                                                        <p className="text-xs text-muted-foreground leading-relaxed">{scen.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {doc.example && (
                                        <div className="mt-8 bg-primary/5 p-8 border border-primary/10 italic text-base relative">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                            <p className="font-bold text-primary mb-3 text-[10px] uppercase tracking-[0.4em]">Exemplo Robusto:</p>
                                            <p className="text-muted-foreground leading-relaxed">&quot;{doc.example}&quot;</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <div
                        className="p-1 bg-linear-to-br from-primary/20 via-border to-primary/20 shadow-xl mb-24 rounded-test-test-none"
                    >
                        <div className="bg-card/80 dark:bg-card/40 backdrop-blur-3xl p-10 md:p-16 overflow-x-auto border border-border/50 rounded-test-test-none">
                            <h3 className="text-4xl font-black mb-12 text-center uppercase tracking-tighter drop-shadow-md">
                                Tabela <span className="text-primary italic">Comparativa</span>
                            </h3>
                            <table className="w-full min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-primary/20">
                                        <th className="text-left py-6 px-4 uppercase text-xs font-black text-primary tracking-[0.2em]">Documento</th>
                                        <th className="text-center py-6 px-4 uppercase text-xs font-black text-primary tracking-[0.2em]">Gera IVA</th>
                                        <th className="text-center py-6 px-4 uppercase text-xs font-black text-primary tracking-[0.2em]">Liquidação</th>
                                        <th className="text-center py-6 px-4 uppercase text-xs font-black text-primary tracking-[0.2em]">Valor Fiscal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonTable.map((row, i) => (
                                        <tr key={i} className="border-b border-border/50 hover:bg-primary/2 transition-colors group">
                                            <td className="py-7 px-4 font-black text-foreground uppercase text-lg group-hover:text-primary transition-colors">{row.doc}</td>
                                            <td className="py-7 px-4 text-center text-base font-bold text-muted-foreground">{row.iva}</td>
                                            <td className="py-7 px-4 text-center text-base font-bold text-muted-foreground">{row.payment}</td>
                                            <td className="py-7 px-4 text-center">
                                                <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-test-test-none ${row.fiscal === 'Sim' ? 'bg-green-500/10 text-green-600 dark:text-green-500 border border-green-500/30' :
                                                    row.fiscal === 'Não' ? 'bg-red-500/10 text-red-600 dark:text-red-500 border border-red-500/30' :
                                                        'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border border-yellow-500/30'
                                                    }`}>
                                                    {row.fiscal}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="text-center space-y-10 py-16">
                        <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight italic text-muted-foreground/80">
                            Pronto para modernizar a sua facturação?
                        </h4>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Button size="lg" className="rounded-test-none">
                                Pedir Demonstração MindGest
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-test-none">
                                Saiba Mais
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">
                            MindGest ERP: O melhor software de facturação certificado pela AGT em Angola.
                        </p>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
