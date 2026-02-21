"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

const navItems = [
  { name: "Inicio", href: "/#home" },
  { name: "Sobre", href: "/#about" },
  { name: "Serviços", href: "/#services" },
  { name: "Produtos", href: "/#products" },
  { name: "Testemunhos", href: "/#testimonials" },
  { name: "FAQs", href: "/#faq" },
  { name: "FYI", href: "/fyi" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("");

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      const sections = navItems
        .filter(item => item.href.includes("#"))
        .map(item => item.href.split("#")[1]);

      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed border-b top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 border-primary/10" : "bg-background"
        }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 text-foreground font-semibold text-lg"
        >
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <span>Mindware</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isAnchor = item.href.includes("#");
            const sectionId = isAnchor ? item.href.split("#")[1] : null;
            const isActive = isAnchor
              ? activeSection === sectionId
              : typeof window !== "undefined" && window.location.pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-5 py-2 shadow-lg shadow-primary/20">
            Começar
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] px-4 pt-4 sm:w-[400px] border-l border-border/50 bg-background/95 backdrop-blur-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-2 mb-8 mt-2">
                  <Image src="/logo.png" alt="Logo" width={32} height={32} />
                  <span className="font-bold text-xl">Mindware</span>
                </div>

                <div className="flex flex-col gap-2">
                  {navItems.map((item, i) => {
                    const isAnchor = item.href.includes("#");
                    const sectionId = isAnchor ? item.href.split("#")[1] : null;
                    const isActive = isAnchor
                      ? activeSection === sectionId
                      : typeof window !== "undefined" && window.location.pathname === item.href;

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className={`text-lg font-medium px-4 py-3 rounded-test-test-lg transition-all flex items-center justify-between group ${isActive
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                            }`}
                          onClick={() => isAnchor && setActiveSection(sectionId as string)}
                        >
                          {item.name}
                          {isActive && (
                            <motion.div
                              layoutId="active-indicator"
                              className="w-1.5 h-1.5 rounded-test-test-full bg-primary"
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-auto mb-8 space-y-4 px-4">
                  <Button className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                    Começar
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Mindware. Todos os direitos reservados.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
