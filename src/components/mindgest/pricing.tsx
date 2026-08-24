import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { NEGOTIATION_EMAIL, PLANS } from "@/data/mindgest/plans";
import { REGISTER_URL } from "@/data/mindgest/site";

export function Pricing() {
  return (
    <section
      id="planos"
      className="scroll-mt-20 bg-background py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <SectionHeading
            align="center"
            index="04"
            label="Planos"
            title={
              <>
                Um plano para cada fase do{" "}
                <span className="text-primary">seu negócio</span>
              </>
            }
            description="Comece pequeno e cresça sem mudar de sistema. Todos os planos incluem actualizações e novas funcionalidades."
          />
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => {
            const highlighted = plan.highlighted;
            return (
              <Reveal key={plan.id} delay={i * 120} className="h-full">
                <div
                  className={`relative flex h-full flex-col border bg-card p-8 text-foreground ${
                    highlighted
                      ? "border-primary shadow-[0_30px_80px_-30px_rgba(153,86,246,0.5)]"
                      : "border-border"
                  }`}
                >
                  {highlighted ? (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary px-4 py-1.5 text-xs font-black tracking-wide text-primary-foreground uppercase">
                      Mais popular
                    </span>
                  ) : null}

                  <h3 className="text-xl font-black tracking-tight text-foreground">
                    {plan.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {plan.tagline}
                  </p>

                  <div className="mt-6">
                    {plan.price === null ? (
                      <p className="text-3xl font-black tracking-tight text-primary sm:text-4xl">
                        Personalizável
                      </p>
                    ) : (
                      <p className="flex flex-wrap items-baseline gap-x-1 text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-2xl xl:text-3xl">
                        <span className="whitespace-nowrap">{plan.price}</span>
                        <span className="text-base font-semibold text-muted-foreground">
                          /mês
                        </span>
                      </p>
                    )}
                    {plan.priceNote ? (
                      <p className="mt-1.5 text-sm text-muted-foreground">
                        {plan.priceNote}
                      </p>
                    ) : null}
                  </div>

                  <ul className="mt-7 flex-1 space-y-3.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center bg-primary/10 text-primary">
                          <Check className="size-3" />
                        </span>
                        <span className="text-sm leading-relaxed text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.ctaHref ?? REGISTER_URL}
                    className={`mt-8 py-3.5 text-center text-sm font-bold transition-all ${
                      highlighted
                        ? "bg-primary text-primary-foreground shadow-[0_8px_28px_rgba(153,86,246,0.5)] hover:bg-primary/90"
                        : "border border-border text-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={150}>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Os preços apresentados são em Kwanzas (Kz). Precisa de algo à
            medida?{" "}
            <a
              href={`mailto:${NEGOTIATION_EMAIL}`}
              className="font-bold text-primary underline-offset-4 hover:underline"
            >
              Fale connosco
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
