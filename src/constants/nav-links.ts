export type NavItem = {
  name: string;
  href: string;
  children?: { name: string; href: string; description?: string }[];
};

export const navItems: NavItem[] = [
  { name: "Início", href: "/#home" },
  { name: "Mindgest", href: "/mindgest" },
  { name: "Serviços", href: "/service" },
  { name: "Afiliados", href: "/affiliate" },
  { name: "Sobre", href: "/#about" },
  {
    name: "Recursos",
    href: "/blog",
    children: [
      {
        name: "Blog",
        href: "/blog",
        description: "Artigos sobre tecnologia e desenvolvimento",
      },
      {
        name: "FYI",
        href: "/fyi",
        description: "Guia de facturação e fiscalidade em Angola",
      },
    ],
  },
];
