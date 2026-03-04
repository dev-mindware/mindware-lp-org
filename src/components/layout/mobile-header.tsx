import { Link, Menu } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Image from "next/image";
import { navItems } from "@/constants";
import { motion } from "framer-motion";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  pathname: string;
}

export function MobileHeader({
  activeSection,
  setActiveSection,
  pathname
}: HeaderProps) {
  return (
    <div className="md:hidden flex items-center gap-4">
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
                  : pathname === item.href;

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`text-lg font-medium px-4 py-3 rounded-test-test-lg transition-all flex items-center justify-between group ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() =>
                        isAnchor && setActiveSection(sectionId as string)
                      }
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
              <Button className="w-full h-12 text-lg font-bold text-foreground bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                Começar
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
