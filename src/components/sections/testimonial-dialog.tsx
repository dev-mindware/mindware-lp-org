"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Testimonial } from "@/data/testimonials";

interface TestimonialDialogProps {
  selectedTestimonial: Testimonial | null;
  onOpenChange: (open: boolean) => void;
}

export default function TestimonialDialog({
  selectedTestimonial,
  onOpenChange,
}: TestimonialDialogProps) {
  return (
    <Dialog open={!!selectedTestimonial} onOpenChange={onOpenChange}>
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
                  <span className="text-xs text-primary font-medium uppercase tracking-wide">
                    {selectedTestimonial?.role}
                  </span>
                </div>
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-lg text-muted-foreground mt-4 leading-relaxed italic">
              &quot;
              {selectedTestimonial?.video?.description ||
                selectedTestimonial?.content}
              &quot;
            </DialogDescription>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
