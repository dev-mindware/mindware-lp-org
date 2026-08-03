"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowLeft, ArrowRight, Quote, Play } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Testimonial } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/section-heading";
import dynamic from "next/dynamic";

const TestimonialDialog = dynamic(() => import("./testimonial-dialog"), {
  ssr: false, // Dialog only appears after interactions
});

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  }, [totalPages]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage,
  );

  if (visibleTestimonials.length < itemsPerPage) {
    visibleTestimonials.push(
      ...testimonials.slice(0, itemsPerPage - visibleTestimonials.length),
    );
  }

  return (
    <div
      className="mx-auto max-w-6xl px-6 sm:px-10"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          index="05"
          label="Depoimentos"
          title={
            <>
              Confiado pelas <span className="text-primary">pessoas</span>
            </>
          }
          description="Veja o que os nossos clientes dizem sobre construir o futuro com a Mindware."
        />
        <div className="flex shrink-0 gap-2">
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={prevSlide}
            aria-label="Anterior"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={nextSlide}
            aria-label="Próximo"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative min-h-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {visibleTestimonials.map((testimonial, index) => (
              <Card
                key={`${currentIndex}-${index}`}
                className={`bg-card border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col group relative ${
                  testimonial.video
                    ? "cursor-pointer ring-primary/20 hover:ring-2"
                    : ""
                }`}
                onClick={() =>
                  testimonial.video && setSelectedTestimonial(testimonial)
                }
              >
                <CardContent className="pt-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      {testimonial.video && (
                        <div className="bg-primary/10 p-2 text-primary group-hover:scale-110 transition-transform">
                          <Play className="w-4 h-4 fill-current" />
                        </div>
                      )}
                      <Quote className="h-8 w-8 text-primary/20" />
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-8 text-base leading-relaxed flex-1 italic">
                    &quot;{testimonial.content}&quot;
                  </p>

                  <div className="flex items-center gap-4 mt-auto border-t border-border/50 pt-6">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-primary font-medium uppercase tracking-wide">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 transition-all duration-300 ${
              idx === currentIndex
                ? "w-8 bg-primary"
                : "w-2 bg-primary/20 hover:bg-primary/40"
            }`}
            aria-label={`Ir para página ${idx + 1}`}
          />
        ))}
      </div>

      {selectedTestimonial && (
        <TestimonialDialog
          selectedTestimonial={selectedTestimonial}
          onOpenChange={(open) => !open && setSelectedTestimonial(null)}
        />
      )}
    </div>
  );
}
