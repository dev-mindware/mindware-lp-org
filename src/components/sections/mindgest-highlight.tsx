import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { mindgestHighlight } from "@/data/mindgest-highlight";
import { REGISTER_URL } from "@/data/mindgest/site";

export function MindgestHighlight() {
  return (
    <section
      id="mindgest"
      className="relative scroll-mt-20 overflow-hidden bg-muted/30 py-24 text-foreground sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(153,86,246,0.16), transparent 70%), radial-gradient(ellipse 50% 50% at 90% 100%, rgba(124,58,237,0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <SectionHeading
            index="01"
            label={mindgestHighlight.label}
            align="center"
            title={
              <>
                {mindgestHighlight.title.line1}{" "}
                <span className="text-primary">
                  {mindgestHighlight.title.highlight}
                </span>
              </>
            }
            description={mindgestHighlight.description}
          />
        </Reveal>

        <Reveal delay={100}>
          <ul className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {mindgestHighlight.features.map((feature) => (
              <li
                key={feature.title}
                className="flex flex-col items-center gap-3 text-center"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center bg-primary/10 text-primary">
                  <Check className="size-5" />
                </span>
                <div>
                  <p className="font-bold text-foreground">{feature.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/mindgest"
              className="group inline-flex items-center justify-center gap-2 bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[0_8px_32px_rgba(153,86,246,0.4)] transition-all hover:bg-primary/90 hover:shadow-[0_8px_44px_rgba(153,86,246,0.6)]"
            >
              Ver tudo sobre o Mindgest
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={REGISTER_URL}
              className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Criar conta grátis
            </a>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="relative mt-16 overflow-hidden border border-border bg-card shadow-[0_50px_100px_-40px_rgba(0,0,0,0.45)]">
            <div className="flex h-12 items-center gap-2.5 border-b border-border bg-muted/60 px-5">
              <span className="size-3.5 bg-red-500/60" />
              <span className="size-3.5 bg-yellow-500/60" />
              <span className="size-3.5 bg-green-500/60" />
              <span className="ml-5 border border-border bg-background/60 px-4 py-1.5 font-mono text-[11px] tracking-wider text-muted-foreground">
                {mindgestHighlight.urlDisplay}
              </span>
            </div>
            <div className="relative aspect-[16/9] w-full bg-muted/20">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Demonstração do ponto de venda do Mindgest"
                className="h-full w-full object-cover"
              >
                <source src={mindgestHighlight.video} type="video/mp4" />
                O seu navegador não suporta vídeos HTML5.
              </video>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
