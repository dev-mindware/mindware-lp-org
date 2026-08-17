"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HeaderLockup } from "./header-lockup";
import { HeaderShell } from "./header-shell";

export type ProductNavItem = {
  name: string;
  /** id da secção na própria página, sem `#` */
  hash: string;
};

export type ProductLink = {
  label: string;
  href: string;
};

export type ProductHeaderProps = {
  /** Selo ao lado da marca — ex.: "Mindgest", "Partners", "Serviços" */
  product: string;
  /** Rota base da página do produto — usada nas âncoras e no selo */
  basePath: string;
  items: ProductNavItem[];
  /** Acção principal (botão preenchido) */
  cta: ProductLink;
  /** Acção secundária opcional — normalmente "Entrar" */
  secondary?: ProductLink;
};

/**
 * Header das páginas de produto (Mindgest, Afiliados, Serviços).
 *
 * Substitui a navegação global por navegação das secções da própria página.
 * O caminho de volta vive no lockup à esquerda, como em todos os outros
 * headers do site.
 */
export function ProductHeader({
  product,
  basePath,
  items,
  cta,
  secondary,
}: ProductHeaderProps) {
  const [activeSection, setActiveSection] = React.useState("");

  // Chave estável: o array de items é constante, mas a referência pode não ser.
  const sectionIds = items.map((item) => item.hash).join("|");

  React.useEffect(() => {
    const ids = sectionIds.split("|");

    const handleScroll = () => {
      const current = ids.find((id) => {
        const element = document.getElementById(id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });

      setActiveSection(current ?? "");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return (
    <HeaderShell progress>
      <HeaderLockup back badge={product} badgeHref={basePath} />

      <nav
        aria-label={`Secções — ${product}`}
        className="hidden items-center gap-7 lg:flex"
      >
        {items.map((item) => {
          const isActive = activeSection === item.hash;
          return (
            <Link
              key={item.hash}
              href={`${basePath}#${item.hash}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative py-1 text-[13px] font-semibold transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.name}
              {isActive ? (
                <motion.span
                  layoutId={`product-nav-active-${basePath}`}
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="hidden items-center gap-3 lg:flex">
        <ModeToggle />

        {secondary ? (
          <a
            href={secondary.href}
            className="border border-border px-4 py-2 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {secondary.label}
          </a>
        ) : null}

        <Button
          asChild
          className="bg-primary px-5 py-2 font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
        >
          <a href={cta.href}>{cta.label}</a>
        </Button>
      </div>

      <ProductHeaderMobile
        product={product}
        basePath={basePath}
        items={items}
        cta={cta}
        secondary={secondary}
      />
    </HeaderShell>
  );
}

function ProductHeaderMobile({
  product,
  basePath,
  items,
  cta,
  secondary,
}: ProductHeaderProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center gap-2 lg:hidden">
      <ModeToggle />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Abrir menu"
            className="hover:bg-transparent"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-75 border-l border-border/50 bg-background/95 px-4 pt-4 backdrop-blur-xl sm:w-100"
        >
          <SheetTitle className="sr-only">Menu — {product}</SheetTitle>
          <div className="flex h-full flex-col overflow-y-auto">
            <div className="mt-2 mb-8 px-4">
              <span className="border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-black tracking-[0.22em] text-primary uppercase">
                {product}
              </span>
            </div>

            <nav aria-label={`Secções — ${product}`} className="flex flex-col">
              {items.map((item) => (
                <Link
                  key={item.hash}
                  href={`${basePath}#${item.hash}`}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-lg font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="group mt-4 flex items-center gap-2 border-t border-border/60 px-4 pt-6 text-sm font-bold tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-foreground"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                />
                Voltar ao site
              </Link>
            </nav>

            <div className="mt-auto mb-8 space-y-3 px-4 pt-8">
              <Button
                asChild
                className="h-12 w-full bg-primary text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
              >
                <a href={cta.href}>{cta.label}</a>
              </Button>
              {secondary ? (
                <a
                  href={secondary.href}
                  className="flex h-12 w-full items-center justify-center border border-border text-base font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {secondary.label}
                </a>
              ) : null}
              <p className="pt-2 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} Mindware. Todos os direitos
                reservados.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
