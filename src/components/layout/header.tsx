"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { navItems } from "@/constants";
import { REGISTER_URL } from "@/data/mindgest/site";
import { MobileHeader } from "./mobile-header";

const ANCHOR_SECTIONS = navItems
  .filter((item) => item.href.includes("#"))
  .map((item) => item.href.split("#")[1]);

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("");

  // Âncoras só existem na homepage; noutras rotas o estado activo vem do pathname.
  const tracksAnchors = pathname === "/";

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      if (!tracksAnchors) return;

      if (window.scrollY < 50) {
        setActiveSection(ANCHOR_SECTIONS[0] ?? "");
        return;
      }

      const current = ANCHOR_SECTIONS.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (current) setActiveSection(current);
    };

    setActiveSection("");
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tracksAnchors]);

  const isItemActive = (href: string) => {
    if (href.includes("#")) {
      return tracksAnchors && activeSection === href.split("#")[1];
    }
    return pathname === href;
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? "bg-background/80 border-primary/10" : "bg-background"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link
          href="/"
          className="flex items-center space-x-2 text-lg font-semibold text-foreground"
        >
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <span>Mindware</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            if (item.children) {
              const hasActiveChild = item.children.some(
                (child) => pathname === child.href,
              );

              return (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger
                    className={`flex items-center gap-1 text-sm font-medium transition-colors outline-none ${
                      hasActiveChild
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="size-3.5" aria-hidden="true" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.name} asChild>
                        <Link
                          href={child.href}
                          className="flex cursor-pointer flex-col items-start gap-0.5"
                        >
                          <span className="font-semibold">{child.name}</span>
                          {child.description ? (
                            <span className="text-xs text-muted-foreground">
                              {child.description}
                            </span>
                          ) : null}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isItemActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ModeToggle />
          <Button
            asChild
            className="bg-primary px-5 py-2 font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
          >
            <a href={REGISTER_URL}>Começar</a>
          </Button>
        </div>

        <MobileHeader
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          pathname={pathname}
        />
      </div>
    </header>
  );
}
