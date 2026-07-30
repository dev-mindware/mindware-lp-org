"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { navItems } from "@/constants";
import { REGISTER_URL } from "@/data/mindgest/site";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  pathname: string;
}

export function MobileHeader({
  activeSection,
  setActiveSection,
  pathname,
}: HeaderProps) {
  return (
    <div className="flex items-center gap-4 md:hidden">
      <ModeToggle />
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Abrir Menu"
            className="hover:bg-transparent"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-75 border-l border-border/50 bg-background/95 px-4 pt-4 backdrop-blur-xl sm:w-100"
        >
          <div className="flex h-full flex-col overflow-y-auto">
            <div className="mt-2 mb-8 flex items-center space-x-2">
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              <span className="text-xl font-bold">Mindware</span>
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isAnchor = item.href.includes("#");
                const sectionId = isAnchor ? item.href.split("#")[1] : null;
                const isActive = isAnchor
                  ? activeSection === sectionId
                  : pathname === item.href;

                if (item.children) {
                  return (
                    <div key={item.name} className="mt-4">
                      <p className="px-4 pb-1 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                        {item.name}
                      </p>
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`flex items-center px-4 py-3 text-lg font-medium transition-all ${
                            pathname === child.href
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 text-lg font-medium transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    onClick={() => {
                      if (sectionId) setActiveSection(sectionId);
                    }}
                  >
                    {item.name}
                    {isActive ? (
                      <span
                        className="size-1.5 bg-primary"
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto mb-8 space-y-4 px-4 pt-8">
              <Button
                asChild
                className="h-12 w-full bg-primary text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
              >
                <a href={REGISTER_URL}>Começar</a>
              </Button>
              <p className="text-center text-xs text-muted-foreground">
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
