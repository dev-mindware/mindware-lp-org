import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { Hero } from "@/components/sections/hero";
import { MindgestHighlight } from "@/components/sections/mindgest-highlight";
import { About } from "@/components/sections/about";
import { Stats } from "@/components/sections/stats";
import { Services } from "@/components/sections/services";
import { AffiliateHighlight } from "@/components/sections/affiliate-highlight";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { LegacyHashRedirect } from "@/components/sections/legacy-hash-redirect";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <LegacyHashRedirect />
      <Header />
      <Hero />
      <MindgestHighlight />
      <About />
      <Stats />
      <Services />
      <AffiliateHighlight />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
