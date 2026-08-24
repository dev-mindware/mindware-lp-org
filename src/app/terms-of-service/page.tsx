import type { Metadata } from "next";
import { Footer, SimpleHeader } from "@/components/layout";
import { LegalDocument } from "@/components/legal";
import { termsOfService } from "@/data/legal";

export const metadata: Metadata = {
  title: "Termos de Serviço",
  description:
    "Condições de utilização dos serviços e plataformas da Mindware: âmbito dos serviços, responsabilidades, pagamentos, propriedade intelectual e lei aplicável.",
  alternates: { canonical: "/terms-of-service" },
  openGraph: {
    title: "Termos de Serviço | Mindware",
    description:
      "Regras de utilização dos serviços de desenvolvimento, branding e da plataforma Mindgest.",
    url: "/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <SimpleHeader badge="Legal" />
      <LegalDocument
        doc={termsOfService}
        related={[
          { label: "Política de Privacidade", href: "/privacy-policy" },
        ]}
      />
      <Footer />
    </>
  );
}
