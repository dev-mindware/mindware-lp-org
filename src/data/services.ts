import { Palette, Layout } from "lucide-react";

/** Secções navegáveis do header contextual dos Serviços. */
export const SERVICE_NAV = [
  { name: "Branding", hash: "branding-section" },
  { name: "Websites", hash: "website-section" },
  { name: "Preços", hash: "precos" },
];

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
];
