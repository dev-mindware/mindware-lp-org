import type { Metadata } from "next";
import { Footer, ProductHeader } from "@/components/layout";
import {
  BrandingSection,
  HeroSection,
  PricingSection,
  WebsiteSection,
  AudienceSection,
  ProcessSection,
  ServicePageBackground,
} from "@/components/services";
import { SERVICE_NAV, PACKAGE_INCLUDED } from "@/data/services";
import { WHATSAPP_URL } from "@/constants/site";

export const metadata: Metadata = {
  title: "Desenvolvimento de Websites e Branding em Angola | Mindware",
  description:
    "Criação de websites profissionais de alta conversão, lojas virtuais, branding e identidade visual completa em Luanda, Angola. Pacote chave-na-mão por 152.514,00 Kz com domínio próprio e e-mails corporativos incluídos.",
  keywords: [
    "desenvolvimento de website",
    "desenvolvimento de website Angola",
    "criação de sites Angola",
    "criação de websites Luanda",
    "empresa de desenvolvimento web Angola",
    "agência web Luanda",
    "branding Angola",
    "design de identidade visual Angola",
    "criação de logótipo Luanda",
    "email profissional domínio próprio",
    "preço criação de site Angola",
    "website profissional empresas Angola",
    "Mindware serviços",
  ],
  alternates: {
    canonical: "/service",
  },
  openGraph: {
    title: "Desenvolvimento de Websites e Branding em Angola | Mindware",
    description:
      "Websites profissionais de alta performance, branding estratégico e infraestrutura cloud para empresas em Angola. Pacote tudo-em-um por 152.514,00 Kz.",
    url: "https://mindware.ao/service",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Desenvolvimento de Websites e Branding Mindware Angola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desenvolvimento de Websites e Branding em Angola | Mindware",
    description:
      "Criação de websites profissionais, branding e email corporativo com domínio incluído por 152.514,00 Kz.",
    images: ["/og-image.png"],
  },
};

export default function ServicePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://mindware.ao/service/#service",
        name: "Desenvolvimento de Websites e Identidade Visual em Angola",
        serviceType: "Web Development & Brand Design",
        provider: {
          "@type": "Organization",
          name: "Mindware",
          url: "https://mindware.ao",
        },
        areaServed: {
          "@type": "Country",
          name: "Angola",
        },
        description:
          "Pacote integrado chave-na-mão de presença digital: criação de logotipo e manual de identidade visual, desenvolvimento de website profissional responsivo até 5 secções, domínio e alojamento cloud por 1 ano, e contas de email corporativo.",
        offers: {
          "@type": "Offer",
          price: "152514.00",
          priceCurrency: "AOA",
          availability: "https://schema.org/InStock",
          url: "https://mindware.ao/service",
          description:
            "Pacote tudo-em-um de Identidade Visual + Website Profissional + Hospedagem e Domínio 1 Ano.",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Entregáveis do Pacote de Serviços",
          itemListElement: PACKAGE_INCLUDED.map((item, index) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: item.title,
              description: item.desc,
            },
            position: index + 1,
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://mindware.ao/service/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "O que está incluído no plano de 152.514,00 Kz?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O valor cobre identidade visual completa, website responsivo até 5 secções, registo de domínio próprio por 1 ano, alojamento cloud por 1 ano, e-mails corporativos, SEO Google e integração com WhatsApp.",
            },
          },
          {
            "@type": "Question",
            name: "Qual é o prazo médio de entrega do website?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O projeto completo é entregue entre 10 a 12 dias úteis, com validações em cada etapa.",
            },
          },
          {
            "@type": "Question",
            name: "O website funciona bem em telemóveis e computadores?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim, todos os websites são construídos com abordagem mobile-first, garantindo carregamento rápido e navegação fluida em qualquer dispositivo.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="relative bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd),
        }}
      />
      <ServicePageBackground />
      <ProductHeader
        product="Serviços"
        basePath="/service"
        items={SERVICE_NAV}
        cta={{ label: "Pedir orçamento", href: WHATSAPP_URL }}
      />

      <HeroSection />
      <BrandingSection />
      <WebsiteSection />
      <AudienceSection />
      <ProcessSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
