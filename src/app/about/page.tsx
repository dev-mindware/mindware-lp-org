import { Footer, SimpleHeader } from "@/components/layout";
import { UnderDevelopment } from "@/components/ui/under-construction";

export default function AboutPage() {
  return (
    <>
      <SimpleHeader badge="Sobre" />
      <UnderDevelopment pageName="Sobre Nós" />
      <Footer />
    </>
  );
}
