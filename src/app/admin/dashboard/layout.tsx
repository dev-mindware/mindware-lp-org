"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  PenSquare,
  Settings,
  LogOut,
  LayoutDashboard,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard/articles", label: "Artigos", icon: FileText },
  {
    href: "/admin/dashboard/editor",
    label: "Nova Publicação",
    icon: PenSquare,
  },
  { href: "/admin/dashboard/settings", label: "Configurações", icon: Settings },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Para simplificar, numa auth mocado usando cookie
    // Deletamos o cookie definindo uma data no passado
    document.cookie =
      "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
    router.refresh();
  };

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-2 px-6 py-6 mb-4">
        <Image src="/logo.png" alt="Logo" width={28} height={28} />
        <span className="font-bold text-xl uppercase tracking-widest text-primary">
          Admin
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-test-test-md font-medium transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-border/50">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sair da Conta
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border/50 bg-card/30 backdrop-blur-xl h-screen sticky top-0">
        <NavContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header / Topbar */}
        <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="p-0 w-64 border-r border-border/50 bg-background/95"
              >
                <NavContent />
              </SheetContent>
            </Sheet>
            <span className="font-bold text-lg">Admin</span>
          </div>

          <div className="hidden md:block">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Conteúdo Mindware
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="w-8 h-8 rounded-test-test-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-xs text-primary">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-muted/10 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
