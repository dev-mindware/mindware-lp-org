import { Header, Footer } from "@/components/layout";
import { UnderConstruction } from "@/components/ui/under-construction";

export default function BlogPage() {
  return (
    <>
      <Header />
      <UnderConstruction
        title="Mindware Blog"
        subtitle="Em Breve"
        description="Estamos a preparar artigos e insights profundos sobre tecnologia, design arquitetónico e desenvolvimento."
      />
      <Footer />
    </>
  );
}
