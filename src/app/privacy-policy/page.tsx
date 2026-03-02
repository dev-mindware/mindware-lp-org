import { Header, Footer } from "@/components/layout";
import { UnderConstruction } from "@/components/ui/under-construction";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <UnderConstruction
        title="Privacidade"
        subtitle="Política a ser revista"
        description="O nosso documento de política de privacidade está a ser atualizado para garantir a máxima transparência e segurança dos seus dados."
      />
      <Footer />
    </>
  );
}
