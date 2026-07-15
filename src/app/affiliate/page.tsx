import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { ServicePageBackground } from "@/components/services";
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
  title: "Programa de Afiliados Mindgest",
  description:
    "Torne-se afiliado Mindgest: comissões de 20% no primeiro pagamento e até 38% recorrentes. Carteira digital, níveis Base a Elite e levantamentos seguros.",
  keywords: [
    "afiliados Mindgest",
    "programa de parceiros Angola",
    "comissões software facturação",
    "Mindware afiliados",
    "indicação Mindgest",
  ],
  openGraph: {
    title: "Programa de Afiliados | Mindware Mindgest",
    description:
      "Ganhe comissões recorrentes a referir o Mindgest. Portal completo com carteira, ranking e pagamentos.",
    url: "https://mindware.ao/affiliate",
    images: [
      {
        url: "/affiliate-login.png",
        width: 1200,
        height: 630,
        alt: "Portal de afiliados Mindware",
      },
    ],
  },
};

export default function AffiliatePage() {
  return (
    <div className="relative bg-transparent text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <ServicePageBackground />
      <Header />
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
