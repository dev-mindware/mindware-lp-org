import type { Metadata } from "next";
import { ProductHeader, Footer } from "@/components/layout";
import { ServicePageBackground } from "@/components/services";
import {
  AFFILIATE_LOGIN_URL,
  AFFILIATE_NAV,
  AFFILIATE_REGISTER_URL,
  AFFILIATE_FAQS,
} from "@/data/affiliate";
import {
  AffiliateCertification,
  AffiliateCommissions,
  AffiliateFaq,
  AffiliateFinalCta,
  AffiliateHero,
  AffiliatePlans,
  AffiliateTiers,
  AffiliateWallet,
  AffiliateWithdrawal,
} from "@/components/affiliate";

export const metadata: Metadata = {
  title: "Programa de Afiliados em Angola | Mindgest Partners",
  description:
    "Adira ao melhor programa de afiliados em Angola: ganhe 20% no primeiro pagamento e até 38% de comissões recorrentes todos os meses a indicar o software de facturação Mindgest. Levantamentos rápidos e painel de controlo completo.",
  keywords: [
    "programa de afiliados",
    "programa de afiliados Angola",
    "afiliados Mindgest",
    "afiliados Angola",
    "ganhar comissões software",
    "renda recorrente Angola",
    "parceiros comerciais Mindware",
    "revenda de software facturação Luanda",
    "indicação de software AGT",
  ],
  alternates: {
    canonical: "/affiliate",
  },
  openGraph: {
    title: "Programa de Afiliados em Angola | Mindgest Partners",
    description:
      "Ganhe até 38% de comissões recorrentes todos os meses ao indicar o software de facturação certificado Mindgest. Portal com carteira digital e levantamentos rápidos.",
    url: "https://mindware.ao/affiliate",
    images: [
      {
        url: "/affiliate-login.png",
        width: 1200,
        height: 630,
        alt: "Programa de Afiliados Mindgest Angola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Programa de Afiliados em Angola | Mindgest Partners",
    description:
      "Comissões de 20% imediatas e até 38% recorrentes mensais. Ganhe com o ecossistema Mindgest.",
    images: ["/affiliate-login.png"],
  },
};

export default function AffiliatePage() {
  const affiliateJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://mindware.ao/affiliate/#webpage",
        url: "https://mindware.ao/affiliate",
        name: "Programa de Afiliados Mindgest",
        description:
          "Programa de parceiros e afiliados da Mindware para o software de facturação Mindgest em Angola. Comissões até 38% recorrentes.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Início",
              item: "https://mindware.ao",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Programa de Afiliados",
              item: "https://mindware.ao/affiliate",
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://mindware.ao/affiliate/#faq",
        mainEntity: AFFILIATE_FAQS.map((faq) => ({
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
    <div className="relative bg-transparent text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(affiliateJsonLd),
        }}
      />
      <ServicePageBackground />
      <ProductHeader
        product="Partners"
        basePath="/affiliate"
        items={AFFILIATE_NAV}
        secondary={{ label: "Entrar", href: AFFILIATE_LOGIN_URL }}
        cta={{ label: "Ser parceiro", href: AFFILIATE_REGISTER_URL }}
      />
      <AffiliateHero />
      <AffiliateCommissions />
      <AffiliateTiers />
      <AffiliatePlans />
      <AffiliateWallet />
      <AffiliateWithdrawal />
      <AffiliateCertification />
      <AffiliateFaq />
      <AffiliateFinalCta />
      <Footer />
    </div>
  );
}
