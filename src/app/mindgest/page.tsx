import type { Metadata } from "next";
import { ProductHeader, Footer } from "@/components/layout";
import { LOGIN_URL, MINDGEST_NAV, REGISTER_URL } from "@/data/mindgest/site";
import { FAQS } from "@/data/mindgest/faqs";
import {
  Faq,
  Features,
  FinalCta,
  Hero,
  HowItWorks,
  Marquee,
  MindIA,
  Pricing,
} from "@/components/mindgest";

export const metadata: Metadata = {
  title: "Software de Facturação em Angola Certificado AGT | Mindgest",
  description:
    "Procura o melhor software de facturação em Angola? O Mindgest é 100% certificado pela AGT para emitir facturas, recibos e SAFT-AO. Gestão de stock, vendas, relatórios e multi-lojas num só sistema na nuvem.",
  keywords: [
    "software de facturação",
    "software de facturação Angola",
    "software certificado AGT",
    "programa de facturação Angola",
    "programa de facturação Luanda",
    "sistema de facturação electrónica Angola",
    "gestão de stock Angola",
    "sistema POS Angola",
    "SAFT Angola",
    "facturação para pequenas empresas Angola",
    "Mindgest",
    "Mindware",
  ],
  alternates: {
    canonical: "/mindgest",
  },
  openGraph: {
    type: "website",
    locale: "pt_AO",
    url: "https://mindware.ao/mindgest",
    siteName: "Mindware",
    title: "Software de Facturação em Angola Certificado AGT | Mindgest",
    description:
      "Venda, facture e cresça com o Mindgest: software de facturação certificado pela AGT, gestão de stock, clientes e relatórios em tempo real.",
    images: [
      {
        url: "/mindgest/dashboard.png",
        width: 1200,
        height: 630,
        alt: "Painel do Mindgest — Software de Facturação em Angola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software de Facturação em Angola Certificado AGT | Mindgest",
    description:
      "Emita facturas certificadas pela AGT em segundos. Gestão de stock, clientes e lojas no computador e telemóvel.",
    images: ["/mindgest/dashboard.png"],
  },
};

export default function MindgestPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://mindware.ao/mindgest/#software",
        name: "Mindgest",
        operatingSystem: "Web, Windows, macOS, iOS, Android",
        applicationCategory: "BusinessApplication",
        url: "https://mindware.ao/mindgest",
        description:
          "Software de facturação e gestão comercial certificado pela Administração Geral Tributária (AGT) em Angola. Emissão de facturas, notas de crédito, recibos, SAFT-AO e controlo de stock.",
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "AOA",
          lowPrice: "10000",
          highPrice: "50000",
          offerCount: "3",
        },
        featureList: [
          "Facturação Eletrónica Certificada pela AGT",
          "Exportação de Ficheiro SAF-T (AO)",
          "Gestão de Stock e Inventário em Tempo Real",
          "Múltiplas Lojas e Caixas num só Painel",
          "Inteligência Artificial MindIA Integrada",
          "Acesso Cloud 24/7 em Qualquer Dispositivo",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "128",
          bestRating: "5",
          worstRating: "1",
        },
        publisher: {
          "@type": "Organization",
          name: "Mindware",
          url: "https://mindware.ao",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://mindware.ao/mindgest/#faq",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <ProductHeader
        product="Mindgest"
        basePath="/mindgest"
        items={MINDGEST_NAV}
        secondary={{ label: "Entrar", href: LOGIN_URL }}
        cta={{ label: "Criar conta", href: REGISTER_URL }}
      />
      <Hero />
      <Marquee />
      <Features />
      <MindIA />
      <HowItWorks />
      <Pricing />
      <Faq />
      <FinalCta />
      <Footer />
    </>
  );
}
