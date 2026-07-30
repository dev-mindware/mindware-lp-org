import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  AFFILIATE_HERO,
  AFFILIATE_REGISTER_URL,
  COMMISSION_RULES,
} from "@/data/affiliate";

const RULES = [COMMISSION_RULES.firstPayment, COMMISSION_RULES.recurring];

export function AffiliateHighlight() {
  return (
    <section
      id="affiliates"
      className="relative scroll-mt-20 overflow-hidden bg-background py-24 text-foreground sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 100%, rgba(153,86,246,0.14), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <SectionHeading
            index="04"
            label="Programa de Afiliados"
            align="center"
            title={
              <>
                {AFFILIATE_HERO.title.line1}{" "}
                <span className="text-primary">
                  {AFFILIATE_HERO.title.highlight}
                </span>
              </>
            }
            description={AFFILIATE_HERO.description}
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
            {RULES.map((rule) => (
              <div
                key={rule.label}
                className="border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_rgba(153,86,246,0.25)]"
              >
                <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                  {rule.label}
                </p>
                <p className="mt-3 text-5xl font-black tracking-tight text-primary">
                  {rule.rate}
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {rule.detail}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {AFFILIATE_HERO.pills.map((pill) => (
              <li
                key={pill}
                className="border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary"
              >
                {pill}
              </li>
            ))}
          </ul>

          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/affiliate"
              className="group inline-flex items-center justify-center gap-2 bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[0_8px_32px_rgba(153,86,246,0.4)] transition-all hover:bg-primary/90 hover:shadow-[0_8px_44px_rgba(153,86,246,0.6)]"
            >
              Conhecer o programa
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={AFFILIATE_REGISTER_URL}
              className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Tornar-me afiliado
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
