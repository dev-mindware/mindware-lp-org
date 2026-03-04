import { testimonials } from "@/data/testimonials";
import dynamic from "next/dynamic";

const TestimonialsCarousel = dynamic(() => import("./testimonials-carousel"), {
  ssr: true,
});

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 bg-muted/30 overflow-hidden relative"
    >
      <TestimonialsCarousel testimonials={testimonials} />
    </section>
  );
}
