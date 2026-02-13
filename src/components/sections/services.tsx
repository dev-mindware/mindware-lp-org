"use client";

import { motion } from "framer-motion";
import { Palette, Layout, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Identidade Visual",
    description:
      "Construa uma marca memorável. Design estratégico que comunica autoridade, desde o logo até a paleta de cores completa.",
    icon: Palette,
    features: [
      "Logo & Manual da Marca",
      "Paleta de Cores Estratégica",
      "Tipografia & Assets Visuais",
    ],
    link: "/service#branding-section",
  },
  {
    title: "Desenvolvimento Web",
    description:
      "Websites de alta performance projetados para converter. SEO, design responsivo e uma experiência de usuário impecável.",
    icon: Layout,
    features: [
      "Website Responsivo & Rápido",
      "SEO & Otimização Google",
      "Domínio Gratuito (1 ano)",
    ],
    highlight: true,
    link: "/service#website-section",
  },
  {
    title: "Email Profissional",
    description:
      "Segurança e profissionalismo em cada envio. Email corporativo com seu domínio, proteção avançada e recursos de IA.",
    icon: Mail,
    features: [
      "Email com Domínio Próprio",
      "Recursos de IA Integrados",
      "Segurança Anti-spam & Vírus",
    ],
    link: "/service#email-section",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Nossos Serviços
          </h2>
          <p className="text-lg text-muted-foreground">
            Combinamos criatividade estratégica com engenharia de ponta para entregar
            soluções que impulsionam o seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className={`h-full border-muted hover:border-primary/50 transition-all hover:shadow-lg bg-card group relative overflow-hidden flex flex-col ${service.highlight ? 'border-primary' : ''}`}>
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <service.icon className="w-32 h-32 text-primary transform rotate-12 translate-x-8 -translate-y-8" />
                </div>

                <CardHeader>
                  <div className="w-14 h-14 rounded-teste-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <service.icon className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col grow">
                  <CardDescription className="text-base mb-6">
                    {service.description}
                  </CardDescription>
                  <ul className="space-y-2 mb-8 grow">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-teste-full bg-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {service.link && (
                    <Link href={service.link} className="mt-auto">
                      <Button className="w-full group/btn" variant="default">
                        Ver Plano
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
