import { Footer } from "@/components/layout";
import {
  BackButton,
  BrandingSection,
  EmailServiceSection,
  HeroSection,
  PricingSection,
  WebsiteSection,
  ServicePageBackground,
} from "@/components/services";

export default function ServicePage() {
  return (
    <div className="relative bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <ServicePageBackground />
      <BackButton />

      <HeroSection />
      <BrandingSection />
      <WebsiteSection />
      <PricingSection />
      <EmailServiceSection />
      <Footer />
    </div>
  );
}
