import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Stats } from "@/components/sections/stats";
import { Services } from "@/components/sections/services";
import { Products } from "@/components/sections/products";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="grow">
        <Hero />
        <SectionWrapper>
          <About />
        </SectionWrapper>
        <SectionWrapper delay={0.1}>
          <Stats />
        </SectionWrapper>
        <SectionWrapper delay={0.1}>
          <Services />
        </SectionWrapper>
        <SectionWrapper>
          <Products />
        </SectionWrapper>
        <SectionWrapper>
          <Testimonials />
        </SectionWrapper>
        <SectionWrapper>
          <FAQ />
        </SectionWrapper>
        <SectionWrapper>
          <CTA />
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
}
