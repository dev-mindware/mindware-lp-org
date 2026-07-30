import { testimonials } from "@/data/testimonials";
import dynamic from "next/dynamic";

const TestimonialsCarousel = dynamic(() => import("./testimonials-carousel"), {
  ssr: true,
});

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-20 overflow-hidden bg-muted/30 py-24 sm:py-32"
    >
      <TestimonialsCarousel testimonials={testimonials} />
    </section>
  );
}
