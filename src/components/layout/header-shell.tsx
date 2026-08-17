"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/** Distância, em px, a partir da qual o header ganha fundo e borda. */
const SCROLL_THRESHOLD = 24;

export type HeaderShellProps = {
  children: React.ReactNode;
  /**
   * Barra de progresso de leitura na aresta inferior. Só faz sentido em
   * páginas longas de secção única (produto), não em páginas de leitura
   * onde o próprio artigo já dá a noção de avanço.
   */
  progress?: boolean;
};

/**
 * Casca partilhada por todos os headers do site.
 *
 * Garante que os três tipos de header (global, produto, leitura) têm
 * exactamente a mesma altura, o mesmo trilho de conteúdo e o mesmo
 * comportamento ao rolar — antes cada um tinha o seu.
 */
export function HeaderShell({ children, progress = false }: HeaderShellProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  const { scrollYProgress } = useScroll();
  const readProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.25,
  });

  React.useEffect(() => {
    const handleScroll = () =>
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        isScrolled
          ? "border-border/60 bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6 sm:px-10">
        {children}
      </div>

      {progress ? (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: readProgress }}
          className={cn(
            "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary transition-opacity duration-300",
            isScrolled ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}
    </header>
  );
}
