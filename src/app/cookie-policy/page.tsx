import { Header, Footer } from "@/components/layout";
import { UnderConstruction } from "@/components/ui/under-construction";

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <UnderConstruction
        title="Cookies"
        subtitle="Em Revisão"
        description="Estamos a otimizar a nossa política de cookies e gestão de estado local para assegurar a melhor performance e respeito pela privacidade."
      />
      <Footer />
    </>
  );
}
