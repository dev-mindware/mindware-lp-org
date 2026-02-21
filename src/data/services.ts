import { Palette, Layout, Mail } from "lucide-react";

export const services = [
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
