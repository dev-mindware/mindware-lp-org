"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function PremiumAnimatedButton() {
  return (
    <div className="relative inline-flex group">
      {/* Animated Border Layer */}
      <span className="absolute inset-0 rounded-teste-full p-[2px]">
        <span className="absolute inset-0 rounded-teste-full border-anim" />
      </span>

      <Button
        size="lg"
        className="relative z-10 rounded-teste-full px-8 h-12 text-base 
        bg-background text-foreground border border-border 
        hover:bg-background"
      >
        Inicie Seu Projeto
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
