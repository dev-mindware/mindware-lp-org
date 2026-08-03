import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { WHATSAPP_URL } from "@/constants/site";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-background py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <SectionHeading
            index="02"
            label="Quem somos"
            title={
              <>
                Construímos{" "}
                <span className="text-primary">soluções estratégicas</span> que
                resolvem problemas reais
              </>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <Reveal>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Na Mindware não desenvolvemos apenas software. Acreditamos que
                tecnologia sem propósito é desperdício de tempo e dinheiro. Por
                isso, cada projecto nasce com um objectivo claro: gerar
                eficiência, crescimento e vantagem competitiva para os nossos
                clientes.
              </p>
              <p>
                O nosso diferencial está na combinação de visão técnica com
                mentalidade de negócio. Não entregamos apenas código funcional;
                entregamos sistemas pensados para escalar, operar offline
                quando necessário, integrar microserviços e adaptar-se à
                realidade do mercado angolano.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="border-l-2 border-primary bg-card p-8">
              <p className="text-xl leading-relaxed font-bold tracking-tight text-balance text-foreground">
                A Mindware existe para transformar ideias em soluções digitais
                sólidas e transformar negócios através da tecnologia.
              </p>
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-[0_8px_32px_rgba(153,86,246,0.4)] transition-all hover:bg-primary/90 hover:shadow-[0_8px_44px_rgba(153,86,246,0.6)]"
              >
                Fale connosco
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
