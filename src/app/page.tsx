import {
  Faq,
  Features,
  FinalCta,
  Hero,
  HowItWorks,
  Marquee,
  MindIA,
  Pricing,
} from "@/components/mindgest";
import { Products } from "@/components/sections/products";
import { Testimonials } from "@/components/sections/testimonials";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Header, Footer } from "@/components/layout";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Marquee />
      <Features />
      <MindIA />
      <HowItWorks />
      <Pricing />
      <SectionWrapper>
        <Products />
      </SectionWrapper>
      <Faq />
      <SectionWrapper>
        <Testimonials />
      <FinalCta />
      </SectionWrapper>
      <Footer />
    </>
  );
}
