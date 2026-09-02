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
    "Criação de websites profissionais de alta conversão, lojas virtuais, branding e identidade visual completa em Luanda, Angola. Pacote chave-na-mão a partir de 132.514,00 Kz com opções de e-mail corporativo e domínio próprio.",
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
      "Websites profissionais de alta performance, branding estratégico e infraestrutura cloud para empresas em Angola. Pacote base por 132.514,00 Kz com add-ons de email corporativo e domínio.",
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
      "Criação de websites profissionais e branding estratégico a partir de 132.514,00 Kz. Add-ons de email profissional e domínio próprio disponíveis.",
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
          "Pacote integrado de presença digital: criação de logotipo e manual de identidade visual, desenvolvimento de website profissional responsivo até 5 secções, alojamento cloud por 1 ano, certificado SSL e integração WhatsApp, com add-ons de domínio próprio e contas de e-mail corporativo.",
        offers: {
          "@type": "Offer",
          price: "132514.00",
          priceCurrency: "AOA",
          availability: "https://schema.org/InStock",
          url: "https://mindware.ao/service",
          description:
            "Pacote base de Identidade Visual + Website Profissional + Hospedagem Cloud 1 Ano.",
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
            name: "O que está incluído no plano base de 132.514,00 Kz?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O valor cobre identidade visual completa, website responsivo até 5 secções, alojamento cloud de alta performance por 1 ano, certificado SSL, SEO Google e integração com WhatsApp. O domínio próprio e as contas de e-mail corporativo são contratados à parte conforme as necessidades da empresa.",
            },
          },
          {
            "@type": "Question",
            name: "Qual é o prazo médio de entrega do website?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O projeto completo tem um prazo médio de entrega de 28 a 31 dias, com validações interativas em cada etapa.",
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
