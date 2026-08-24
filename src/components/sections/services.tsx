import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/services";

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-20 overflow-hidden bg-muted/30 py-24 text-foreground sm:py-32"
    >
      {/* Em modo claro `--card` é branco puro como `--background`: sem o fundo
          esbatido da secção os cartões perdiam-se na página e só o traço de 1px
          os distinguia. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(153,86,246,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <SectionHeading
            index="03"
            label="Serviços"
            align="center"
            title={
              <>
                Também construímos{" "}
                <span className="text-primary">para si, de raiz</span>
              </>
            }
            description="Combinamos criatividade estratégica com engenharia de ponta para entregar soluções que impulsionam o seu negócio."
          />
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2 lg:gap-7">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              delay={index * 100}
              className="h-full"
            >
              <article
                className={`group relative flex h-full flex-col overflow-hidden border bg-card p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_28px_60px_-24px_rgba(153,86,246,0.38)] sm:p-9 ${
                  service.highlight
                    ? "border-primary shadow-[0_22px_50px_-28px_rgba(153,86,246,0.45)]"
                    : "border-border shadow-[0_2px_10px_-6px_rgba(15,15,20,0.12)]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-0.75 origin-left bg-primary transition-transform duration-500 ${
                    service.highlight
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />

                <service.icon
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-7 -right-7 size-40 rotate-12 text-primary opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.11]"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="inline-flex size-14 shrink-0 items-center justify-center bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <service.icon className="size-7" />
                  </span>
                  <span className="font-mono text-xs font-bold tracking-[0.2em] text-muted-foreground/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="relative mt-7 text-xl font-black tracking-tight text-foreground">
                  {service.title}
                </h3>
                <p className="relative mt-3 leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <ul className="relative mt-7 grow space-y-3 border-t border-border pt-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm font-medium text-muted-foreground"
                    >
                      <span
                        className="mt-[0.45rem] size-1.5 shrink-0 bg-primary"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.link}
                  aria-label={`Ver serviço de ${service.title}`}
                  className={`relative mt-8 inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold transition-all duration-300 ${
                    service.highlight
                      ? "bg-primary text-primary-foreground shadow-[0_8px_28px_-8px_rgba(153,86,246,0.6)] hover:bg-primary/90"
                      : "border border-border text-foreground group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                  }`}
                >
                  Ver serviço
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
