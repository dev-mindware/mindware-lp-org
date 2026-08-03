import Link from "next/link";
import Image from "next/image";
import { FooterBrandAnimation } from "./footer-brand-animation";
import { footerSections, socialLinks } from "@/constants/footer-links";
import { PHONE_DISPLAY, PHONE_E164 } from "@/constants/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card pt-16 b-0 relative overflow-hidden text-muted-foreground">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        <div className="mb-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
          <div className="max-w-sm space-y-6 sm:col-span-2">
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
              <a
                href={`tel:${PHONE_E164}`}
                className="transition-colors hover:text-primary"
              >
                {PHONE_DISPLAY}
              </a>
            </div>

            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, name }) => (
                <Link
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visite o nosso ${name}`}
                  className="flex h-10 w-10 items-center justify-center bg-muted/50 text-muted-foreground transition-all duration-300 hover:bg-primary/20 hover:text-primary"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold mb-6 text-foreground text-lg">
                {section.title}
              </h3>
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
      <div className="pointer-events-none relative z-0 mt-10 flex w-full justify-center overflow-hidden select-none">
        <svg
          viewBox="0 0 1000 200"
          role="img"
          aria-label="Mindware"
          className="w-full opacity-50"
        >
          <FooterBrandAnimation />
        </svg>
      </div>
    </footer>
  );
}
