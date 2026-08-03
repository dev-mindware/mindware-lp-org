import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { LOGIN_URL, REGISTER_URL } from "@/data/mindgest/site";

export function FinalCta() {
  return (
    <section className="grain relative overflow-hidden border-y border-border bg-background py-24 text-foreground sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 110%, rgba(153,86,246,0.35), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="text-3xl leading-[1.05] font-black tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Pronto para pôr o seu negócio{" "}
            <em className="text-primary not-italic sm:italic">em ordem?</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Crie a sua conta em minutos e emita o primeiro documento ainda
            hoje. Sem instalação, sem compromisso.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={REGISTER_URL}
              className="group inline-flex items-center gap-2 bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[0_8px_36px_rgba(153,86,246,0.55)] transition-all hover:bg-primary/90"
            >
              Começar gratuitamente
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={LOGIN_URL}
              className="inline-flex items-center border border-border px-8 py-4 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Já tenho conta
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
