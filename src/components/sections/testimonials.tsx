"use client";
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowLeft, ArrowRight, Quote, Play } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { testimonials } from "@/data";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  initials: string;
  video?: {
    src: string;
    description: string;
  };
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
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
    <section
      id="testimonials"
      className="py-24 bg-muted/30 overflow-hidden relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Confiado pelas pessoas
            </h2>
            <p className="text-lg text-muted-foreground">
              Veja o que nossos clientes dizem sobre construir o futuro com a
              Mindware.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-test-test-full hover:bg-primary hover:text-white transition-colors"
              onClick={prevSlide}
              aria-label="Anterior"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-test-test-full hover:bg-primary hover:text-white transition-colors"
              onClick={nextSlide}
              aria-label="Próximo"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative min-h-[400px]">
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
                  className={`bg-card border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col group relative ${testimonial.video ? "cursor-pointer ring-primary/20 hover:ring-2" : ""}`}
                  onClick={() => testimonial.video && setSelectedTestimonial(testimonial)}
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
                          <div className="bg-primary/10 p-2 rounded-test-test-full text-primary group-hover:scale-110 transition-transform">
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

        {/* Pagination Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-test-test-full transition-all duration-300 ${idx === currentIndex
                ? "w-8 bg-primary"
                : "w-2 bg-primary/20 hover:bg-primary/40"
                }`}
              aria-label={`Ir para página ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedTestimonial} onOpenChange={(open) => !open && setSelectedTestimonial(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-border/50 rounded-test-test-2xl">
          <div className="flex flex-col">
            <div className="aspect-video relative bg-black">
              {selectedTestimonial?.video && (
                <video
                  src={selectedTestimonial.video.src}
                  className="w-full h-full"
                  controls
                  autoPlay
                />
              )}
            </div>
            <div className="p-8">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                    <AvatarImage
                      src={selectedTestimonial?.avatar}
                      alt={selectedTestimonial?.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {selectedTestimonial?.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span>{selectedTestimonial?.name}</span>
                    <span className="text-xs text-primary font-medium uppercase tracking-wide">{selectedTestimonial?.role}</span>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-lg text-muted-foreground mt-4 leading-relaxed italic">
                &quot;{selectedTestimonial?.video?.description || selectedTestimonial?.content}&quot;
              </DialogDescription>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
