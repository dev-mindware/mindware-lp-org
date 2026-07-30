"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LegalSection } from "@/data/legal";

type LegalTocProps = {
  /** Nome do documento, mostrado no cabeçalho do índice. */
  title: string;
  sections: LegalSection[];
};

/** Cabeçalho fixo (80px) + folga antes de a secção activa mudar. */
const SCROLL_OFFSET = 140;

const formatIndex = (index: number) => String(index + 1).padStart(2, "0");

/** Índice da secção actualmente em leitura. */
function useActiveSection(sections: LegalSection[]) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    const syncActiveSection = () => {
      frame = 0;

      // No fundo da página a última secção fica activa mesmo que seja curta
      // de mais para chegar à zona de leitura.
      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8;

      if (reachedBottom) {
        setActiveIndex(sections.length - 1);
        return;
      }

      let current = 0;
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= SCROLL_OFFSET) {
          current = index;
        }
      });
      setActiveIndex(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncActiveSection);
    };

    syncActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return activeIndex;
}

type TocListProps = {
  sections: LegalSection[];
  activeIndex: number;
  onNavigate?: () => void;
};

function TocList({ sections, activeIndex, onNavigate }: TocListProps) {
  return (
    <ol>
      {sections.map((section, index) => {
        const isActive = index === activeIndex;

        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={isActive ? "true" : undefined}
              onClick={onNavigate}
              className={cn(
                "flex items-start gap-3 border-l-2 px-4 py-3 text-sm leading-snug transition-colors duration-200",
                isActive
                  ? "border-primary bg-primary/10 font-bold text-primary"
                  : "border-transparent font-medium text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-foreground",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "pt-px text-[11px] font-black tracking-widest tabular-nums",
                  isActive ? "text-primary" : "text-muted-foreground/50",
                )}
              >
                {formatIndex(index)}
              </span>
              <span>{section.title}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Índice fixo à esquerda, em ecrãs largos.
 * O `sticky` vive no filho para que possa deslizar dentro da célula da grelha.
 */
export function LegalToc({ title, sections }: LegalTocProps) {
  const activeIndex = useActiveSection(sections);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 border border-border/60 bg-card/50 backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-border/60 px-6 py-5">
          <span aria-hidden="true" className="h-4 w-1 shrink-0 bg-primary" />
          <h2 className="text-[10px] font-black tracking-[0.22em] text-foreground uppercase">
            {title}
          </h2>
        </div>
        <nav aria-label={`Índice — ${title}`} className="py-2">
          <TocList sections={sections} activeIndex={activeIndex} />
        </nav>
      </div>
    </aside>
  );
}

/**
 * Barra colada ao cabeçalho em mobile: mostra a secção actual e abre o índice
 * completo. Fica fora da grelha para o `sticky` ter espaço para deslizar.
 */
export function LegalTocMobile({ title, sections }: LegalTocProps) {
  const activeIndex = useActiveSection(sections);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-20 z-30 -mx-4 mb-12 border-y border-border/60 bg-background/90 backdrop-blur-xl lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="legal-toc-mobile"
        className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-4 text-left"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span aria-hidden="true" className="h-4 w-1 shrink-0 bg-primary" />
          <span className="text-[10px] font-black tracking-[0.25em] text-primary uppercase">
            {formatIndex(activeIndex)}
          </span>
          <span className="truncate text-sm font-bold text-foreground">
            {sections[activeIndex]?.title}
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <nav
          id="legal-toc-mobile"
          aria-label={`Índice — ${title}`}
          className="max-h-[60vh] overflow-y-auto border-t border-border/60 py-2"
        >
          <TocList
            sections={sections}
            activeIndex={activeIndex}
            onNavigate={() => setIsOpen(false)}
          />
        </nav>
      )}
    </div>
  );
}
