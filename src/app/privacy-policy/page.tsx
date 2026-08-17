import type { Metadata } from "next";
import { Footer, SimpleHeader } from "@/components/layout";
import { LegalDocument } from "@/components/legal";
import { privacyPolicy } from "@/data/legal";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Mindware recolhe, utiliza, partilha e protege os seus dados pessoais no website, no Mindgest e nos serviços contratados. Inclui a política de cookies.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Política de Privacidade | Mindware",
    description:
      "Que dados recolhemos, para que os usamos e que direitos lhe assistem, nos termos da Lei n.º 22/11 de Angola.",
    url: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SimpleHeader badge="Legal" />
      <LegalDocument
        doc={privacyPolicy}
        related={[{ label: "Termos de Serviço", href: "/terms-of-service" }]}
      />
      <Footer />
    </>
  );
}
