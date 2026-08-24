import type { Metadata } from "next";
import { ProductHeader, Footer } from "@/components/layout";
import { LOGIN_URL, MINDGEST_NAV, REGISTER_URL } from "@/data/mindgest/site";
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
  title: "Mindgest — Software de Gestão e Facturação Certificado AGT",
  description:
    "O Mindgest acompanha o seu negócio da primeira venda ao relatório do fim do mês: facturação certificada pela AGT, stock, clientes e multi-loja num só sistema.",
  keywords: [
    "software de facturação Angola",
    "software certificado AGT",
    "programa de facturação Luanda",
    "gestão de stock Angola",
    "facturação electrónica Angola",
    "Mindgest",
  ],
  alternates: {
    canonical: "/mindgest",
  },
  openGraph: {
    type: "website",
    locale: "pt_AO",
    url: "https://mindware.ao/mindgest",
    siteName: "Mindware",
    title: "Mindgest — Software de Gestão e Facturação Certificado AGT",
    description:
      "Venda, facture e cresça. Documentos fiscais autorizados pela AGT, stock, clientes e relatórios em todas as suas lojas, num só lugar.",
    images: [
      {
        url: "/mindgest/dashboard.png",
        width: 1200,
        height: 630,
        alt: "Painel do Mindgest com vendas, facturação e relatórios",
      },
    ],
  },
};

export default function MindgestPage() {
  return (
    <>
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
