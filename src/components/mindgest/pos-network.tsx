import { Check, Network } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const POINTS = [
  "Um computador principal e vários caixas ligados por cabo de rede, sem precisar de internet",
  "Os terminais encontram-se automaticamente na rede local, sem configurações complicadas",
  "Numeração de documentos controlada pelo computador principal, sem duplicados entre caixas",
  "Ideal para lojas, supermercados, restaurantes e farmácias com mais de um balcão",
];

const NODES = ["Caixa 1", "Caixa 2", "Caixa 3"];

export function PosNetwork() {
  return (
    <section
      id="pos-rede-local"
      className="grain relative scroll-mt-20 overflow-hidden border-y border-border bg-background py-24 text-foreground sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 20% 50%, rgba(153,86,246,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal delay={150} className="order-2 lg:order-1">
            <div
              role="img"
              aria-label="Esquema de rede local: um computador principal ligado a vários caixas através de um switch"
              className="mx-auto w-full max-w-md border border-border bg-card p-8 shadow-[0_40px_100px_-30px_rgba(153,86,246,0.4)]"
            >
              <div className="mx-auto flex w-fit items-center gap-3 bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">
                <Network className="size-4" />
                Computador principal
              </div>
              <div className="mx-auto h-8 w-px bg-primary/50" />
              <div className="mx-auto w-fit border border-primary/40 px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase">
                Rede local
              </div>
              <div className="mt-0 grid grid-cols-3 gap-3">
                {NODES.map((node) => (
                  <div key={node} className="flex flex-col items-center">
                    <div className="h-6 w-px bg-primary/50" />
                    <div className="w-full border border-border bg-background px-2 py-3 text-center text-xs font-semibold">
                      {node}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2">
            <div>
              <SectionHeading
                index="04"
                label="Vários caixas"
                title={
                  <>
                    Uma loja, vários balcões,{" "}
                    <span className="text-primary">tudo em rede local</span>
                  </>
                }
                description="Ligue vários caixas entre si pela rede da loja. Funciona mesmo sem internet e sem depender de nenhum servidor externo."
              />
              <ul className="mt-8 space-y-4">
                {POINTS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center bg-primary/20 text-primary">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
