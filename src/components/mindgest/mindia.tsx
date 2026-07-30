import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const CAPABILITIES = [
  "Respostas com base nos dados reais das suas lojas",
  "Perguntas em linguagem natural, sem relatórios complicados",
  "Sugestões prontas sobre facturação, stock, relatórios e clientes",
];

export function MindIA() {
  return (
    <section
      id="MindIA"
      className="grain relative scroll-mt-20 overflow-hidden border-y border-border bg-background py-24 text-foreground sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(153,86,246,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div>
              <SectionHeading
                index="02"
                label="Inteligência artificial"
                title={
                  <>
                    Pergunte.{" "}
                    <span className="text-primary">A MindIA responde.</span>
                  </>
                }
                description="A MindIA é o assistente com inteligência artificial do Mindgest. Conhece o seu negócio de ponta a ponta e responde ao que os relatórios levariam horas a mostrar."
              />
              <ul className="mt-8 space-y-4">
                {CAPABILITIES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center bg-primary/20 text-primary">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                <Sparkles className="size-4" />
                Incluída em todos os planos
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mx-auto w-full max-w-sm overflow-hidden border border-border bg-card shadow-[0_40px_100px_-30px_rgba(153,86,246,0.4)]">
              <Image
                src="/mindgest/mindia.png"
                alt="Conversa com a MindIA no Mindgest, com sugestões de perguntas sobre facturação, stock, relatórios e clientes"
                width={417}
                height={990}
                sizes="(min-width: 640px) 384px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
