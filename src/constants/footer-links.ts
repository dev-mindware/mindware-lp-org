import { Facebook, Instagram, Linkedin, Phone } from "lucide-react";
import { WHATSAPP_URL } from "./site";
import { APP_URL, REGISTER_URL } from "@/data/mindgest/site";

export const footerSections = [
  {
    title: "Produto",
    links: [
      { name: "Mindgest", href: "/mindgest" },
      { name: "Funcionalidades", href: "/mindgest#funcionalidades" },
      { name: "Planos", href: "/mindgest#planos" },
      { name: "Criar conta", href: REGISTER_URL },
      { name: "Entrar", href: APP_URL },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Sobre Nós", href: "/#about" },
      { name: "Serviços", href: "/service" },
      { name: "Programa de Afiliados", href: "/affiliate" },
      { name: "Contacto", href: "/#contact" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "FYI — Facturação em Angola", href: "/fyi" },
      { name: "Guia Fiscal Angola (PDF)", href: "/Guia Fiscal Angola.pdf" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Política de Privacidade", href: "/privacy-policy" },
      { name: "Termos de Serviço", href: "/terms-of-service" },
      { name: "Cookies", href: "/privacy-policy#cookies" },
    ],
  },
];

export const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=61574905379786",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/mind.ware/",
  },
  { name: "WhatsApp", icon: Phone, href: WHATSAPP_URL },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/company/mindware-ces",
  },
];
