import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { CONTACT_EMAIL, WHATSAPP_URL } from "@/constants/site";

export function CTA() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-background pb-24 text-foreground sm:pb-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <div className="relative overflow-hidden border border-border bg-card px-8 py-16 text-center sm:px-16 sm:py-20">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 70% at 50% 0%, rgba(153,86,246,0.18), transparent 70%)",
              }}
            />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-black tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
                Pronto para construir algo{" "}
                <span className="text-primary">extraordinário?</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Conte-nos a sua ideia. Respondemos com um plano concreto, prazos
                e orçamento — sem compromisso.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-[0_8px_32px_rgba(153,86,246,0.4)] transition-all hover:bg-primary/90 hover:shadow-[0_8px_44px_rgba(153,86,246,0.6)]"
                >
                  <MessageCircle className="size-4" />
                  Falar no WhatsApp
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 border border-border px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Mail className="size-4" />
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
