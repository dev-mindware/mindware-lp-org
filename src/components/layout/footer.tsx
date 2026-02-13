"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const footerSections = [
  {
    title: "Empresa",
    links: [
      { name: "Sobre Nós", href: "#about" },
      { name: "Carreiras", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Contacto", href: "#contact" },
    ],
  },
  {
    title: "Serviços",
    links: [
      { name: "Desenvolvimento Web", href: "#services" },
      { name: "Apps Mobile", href: "#services" },
      { name: "Soluções Cloud", href: "#services" },
      { name: "Consultoria", href: "#services" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Política de Privacidade", href: "#" },
      { name: "Termos de Serviço", href: "#" },
      { name: "Política de Cookies", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card pt-16 b-0 relative overflow-hidden text-muted-foreground">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-teste-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="max-w-sm space-y-6">
            <Link
              href="/"
              className="flex items-center space-x-2 text-foreground font-semibold text-lg"
            >
              <Image
                src="/logo.png"
                alt="Logo Mindware"
                width={32}
                height={32}
              />
              <span>Mindware</span>
            </Link>

            <p className="text-foreground font-medium leading-snug text-lg">
              A mente cria,{" "}
              <em className="text-muted-foreground">o código segue.</em>
            </p>

            <div className="space-y-2 text-sm">
              <p>Luanda - Vila Alice, Angola</p>
              <p>+244 926 665 793</p>
            </div>

            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="w-10 h-10 rounded-teste-full bg-muted/50 hover:bg-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold mb-6 text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-4 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-center items-center gap-4 text-sm relative z-20">
          <p>© {currentYear} Mindware. Todos os direitos reservados.</p>
        </div>


      </div>
      <div className="w-full flex justify-center overflow-hidden pointer-events-none select-none mt-10 relative z-0">
        <svg viewBox="0 0 1000 200" className="w-full opacity-50">

          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            strokeWidth="1"
            className="font-black text-[11rem] tracking-tighter fill-transparent stroke-primary"
            initial={{ strokeDasharray: "1000", strokeDashoffset: 1000 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            Mindware
          </motion.text>
        </svg>
      </div>
    </footer>
  );
}
