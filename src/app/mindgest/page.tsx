import type { Metadata } from "next";
import { ProductHeader, Footer } from "@/components/layout";
import {
  LOGIN_URL,
  MINDGEST_NAV,
  POS_DOWNLOAD_URL,
  REGISTER_URL,
} from "@/data/mindgest/site";
import { FAQS } from "@/data/mindgest/faqs";
import {
  Faq,
  Features,
  FinalCta,
  Hero,
  HowItWorks,
  Marquee,
  MindIA,
  PosDownload,
  PosNetwork,
  PosOffline,
  Pricing,
} from "@/components/mindgest";

export const metadata: Metadata = {
  title: {
    absolute: "Facturação Offline e Online em Angola, Certificado AGT | Mindgest",
  },
  description:
    "Software de facturação em Angola certificado pela AGT, online e offline. Emita facturas, recibos e SAFT-AO mesmo sem internet com o POS para Windows. Gestão de stock, vendas, relatórios e multi-lojas.",
  keywords: [
    "software de facturação",
    "software de facturação Angola",
    "software certificado AGT",
    "programa de facturação Angola",
    "programa de facturação Luanda",
    "sistema de facturação electrónica Angola",
    "gestão de stock Angola",
    "sistema POS Angola",
    "facturação offline",
    "facturação offline Angola",
    "software de facturação sem internet",
    "POS offline Angola",
    "programa de facturação offline",
    "ponto de venda sem internet",
    "software POS Windows Angola",
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
    title: "Facturação Offline e Online em Angola, Certificado AGT | Mindgest",
    description:
      "Venda, facture e cresça com o Mindgest: software de facturação certificado pela AGT que funciona online e offline, com gestão de stock, clientes e relatórios.",
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
    title: "Facturação Offline e Online em Angola, Certificado AGT | Mindgest",
    description:
      "Emita facturas certificadas pela AGT em segundos, mesmo sem internet. Gestão de stock, clientes e lojas no computador e telemóvel.",
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
          "Facturação Offline com o Mindgest POS para Windows",
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
        "@type": "SoftwareApplication",
        "@id": "https://mindware.ao/mindgest/#pos-offline",
        name: "Mindgest POS Offline",
        operatingSystem: "Windows",
        applicationCategory: "BusinessApplication",
        url: "https://mindware.ao/mindgest#pos-offline",
        downloadUrl: POS_DOWNLOAD_URL,
        description:
          "Aplicação de ponto de venda e facturação para Windows que funciona sem internet. Emite documentos em A4 e talão, guarda os dados no computador e sincroniza com a conta Mindgest quando a ligação volta.",
        featureList: [
          "Facturação e vendas sem internet",
          "Dados guardados localmente, sem perdas em falhas de energia",
          "Documentos em A4 e talão",
          "Sincronização automática com a conta Mindgest",
          "Vários caixas em rede local",
        ],
        isPartOf: { "@id": "https://mindware.ao/mindgest/#software" },
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
      <PosOffline />
      <PosNetwork />
      <PosDownload />
      <HowItWorks />
      <Pricing />
      <Faq />
      <FinalCta />
      <Footer />
    </>
  );
}
