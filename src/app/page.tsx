import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Stats } from "@/components/sections/stats";
import { Services } from "@/components/sections/services";
import { Products } from "@/components/sections/products";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Header, Footer } from "@/components/layout";

export default function Home() {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}
