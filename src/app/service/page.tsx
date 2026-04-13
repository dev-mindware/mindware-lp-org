import type { Metadata } from "next";
import { Footer } from "@/components/layout";
import {
  BackButton,
  BrandingSection,
  EmailServiceSection,
  HeroSection,
  PricingSection,
  WebsiteSection,
  ServicePageBackground,
} from "@/components/services";

export const metadata: Metadata = {
  title: "Serviços de Tecnologia em Angola",
  description:
    "Branding, websites profissionais, email corporativo e desenvolvimento de software em Angola. A Mindware transforma o seu negócio com soluções digitais premium em Luanda.",
  keywords: [
    "serviços de tecnologia Angola",
    "criação de website profissional Angola",
    "branding Angola",
    "email corporativo Angola",
    "email profissional domínio próprio",
    "agência web Luanda",
    "design identidade visual Angola",
    "software empresarial Angola",
  ],
  openGraph: {
    title: "Serviços Digitais Premium | Mindware Angola",
    description:
      "Branding, websites, email profissional e software sob medida para empresas em Angola. Qualidade premium, entrega rápida.",
    url: "https://mindware.ao/service",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Serviços Mindware Angola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serviços Digitais Premium | Mindware Angola",
    description:
      "Branding, websites, email profissional e software sob medida para empresas em Angola.",
    images: ["/og-image.png"],
  },
};

export default function ServicePage() {
  return (
    <div className="relative bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <ServicePageBackground />
      <BackButton />

      <HeroSection />
      <BrandingSection />
      <WebsiteSection />
      <PricingSection />
      <EmailServiceSection />
      <Footer />
    </div>
  );
}
