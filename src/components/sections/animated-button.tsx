"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function PremiumAnimatedButton() {
  return (
    <div className="relative inline-flex group">
      <span className="absolute inset-0 rounded-test-test-full p-[2px]">
        <span className="absolute inset-0 rounded-test-test-full border-anim" />
      </span>

      <Button
        size="lg"
        className="relative z-10 rounded-test-test-full px-8 h-12 text-base 
        bg-background text-foreground border border-border 
        hover:bg-background"
      >
        Inicie Seu Projeto
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
