"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants";
import { MobileHeader } from "./mobile-header";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("");

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      const sections = navItems
        .filter((item) => item.href.includes("#"))
        .map((item) => item.href.split("#")[1]);

      // Fallback para quando o usuário estiver no topo absoluto
      if (window.scrollY < 50) {
        const firstSection = sections[0];
        if (firstSection) {
          setActiveSection(firstSection);
        }
        return;
      }

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
      className={`fixed backdrop-blur-sm border-b top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 border-primary/10" : "bg-background"
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
              : pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
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
          <Link href="https://mindgest.mindware.ao/auth/register">
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-5 py-2 shadow-lg shadow-primary/20">
              Começar
            </Button>
          </Link>
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
