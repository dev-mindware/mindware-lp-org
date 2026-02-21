import React from "react";
import { motion } from "framer-motion";
import { Check, Mail, Shield, Star, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Starter Business",
        description: "Ideal para profissionais liberais e pequenos negócios.",
        icon: Mail,
        features: [
            "1 Caixa de correio incluída",
            "10 GB de armazenamento",
            "10 Regras de encaminhamento",
            "10 Aliases de email",
            "1,000 Emails/dia",
            "Webmail: Mobile, Outlook, Gmail",
            "Proteção Anti-spam e Vírus"
        ],
        price: "11.881 Kz",
        renewal: "28.490 Kz / ano",
        discount: "Poupe 58%",
        highlight: false,
        color: "bg-zinc-800/50"
    },
    {
        name: "Premium Team Pack",
        description: "A melhor escolha para equipas. Leve 5, Pague 4.",
        icon: Star,
        features: [
            "### Especificações Técnicas",
            "50 GB de armazenamento/box",
            "50 Regras de encaminhamento",
            "30 Aliases de email",
            "3,000 Emails/dia",
            "Domínio Gratuito (1 ano)",
            "### Benefícios de IA (Incluídos)",
            "AI Mailbox Assistant: Gestão inteligente",
            "Pesquisa de IA: Encontre tudo instantaneamente",
            "Respostas Inteligentes: Sugestões rápidas",
            "Resumos Instantâneos de emails longos",
            "Assistente de Escrita: Tom e gramática"
        ],
        price: "153.428 Kz",
        renewal: "301.306 Kz / ano",
        discount: "Poupe 49%",
        highlight: true,
        color: "bg-primary/10",
        badge: "Melhor Valor"
    },
    {
        name: "Premium Pro",
        description: "Para profissionais independentes exigentes.",
        icon: Shield,
        features: [
            "Todos os recursos de IA ativados",
            "1 Caixa Profissional",
            "50 GB de armazenamento",
            "50 Regras e 30 Aliases",
            "3,000 Emails/dia",
            "Domínio Gratuito (1 ano)"
        ],
        price: "56.995 Kz",
        renewal: "79.438 Kz / ano",
        discount: "Poupe 28%",
        highlight: false,
        color: "bg-purple-900/20"
    }
];

export function EmailServiceSection() {
    return (
        <section id="email-section" className="relative py-24 bg-muted/30 backdrop-blur-sm overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-test-test-full" />
            </div>

            <SectionWrapper className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black uppercase tracking-tighter"
                    >
                        Email <span className="text-primary">Profissional</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        Aumente a confiança da sua marca com um email que carrega o seu nome.
                        Segurança, IA e performance em um só lugar.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            className={cn(
                                "relative p-8 border backdrop-blur-md min-h-[600px] shadow-sm flex flex-col",
                                "rounded-test-test-none", // Explicitly NO rounded-test-test CORNERS
                                plan.highlight
                                    ? "border-primary bg-primary/5 shadow-[0_0_30px_rgba(var(--primary),0.2)]"
                                    : "border-border/50 bg-card/30 hover:border-primary/50 transition-colors"
                            )}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-test-test-none shadow-lg">
                                    {plan.badge}
                                </div>
                            )}

                            <div className="mb-8">
                                <div className={cn(
                                    "w-12 h-12 flex items-center justify-center mb-4 border border-white/10 bg-white/5",
                                    "rounded-test-test-none"
                                )}>
                                    <plan.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-wide mb-2">{plan.name}</h3>
                                <p className="text-sm text-muted-foreground">{plan.description}</p>
                            </div>

                            <div className="grow space-y-4 mb-8">
                                {plan.features.map((feature, i) => {
                                    if (feature.startsWith("###")) {
                                        return (
                                            <h4 key={i} className="text-xs font-bold text-primary mt-4 mb-2 uppercase tracking-wider">
                                                {feature.replace("### ", "")}
                                            </h4>
                                        );
                                    }
                                    return (
                                        <div key={i} className="flex items-start gap-3 text-sm group">
                                            <Check className="w-4 h-4 text-primary mt-1 shrink-0 group-hover:scale-125 transition-transform" />
                                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">{feature}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="pt-8 border-t border-border/50 space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        {plan.discount && (
                                            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-test-test-none uppercase tracking-wide">
                                                {plan.discount}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black">{plan.price}</span>
                                        <span className="text-xs text-muted-foreground">/ano</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">Renovação: {plan.renewal}</p>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={cn(
                                        "w-full py-4 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all",
                                        "rounded-test-test-none",
                                        plan.highlight
                                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                            : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50"
                                    )}
                                >
                                    Começar Agora
                                    <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-muted-foreground">
                        * Todos os planos incluem suporte técnico 24/7 e proteção avançada.
                    </p>
                </div>
            </SectionWrapper>
        </section>
    );
}
