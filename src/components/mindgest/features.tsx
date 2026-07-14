import Image from "next/image";
import {
  BarChart3,
  Bell,
  FileText,
  MonitorSmartphone,
  Package,
  Store,
} from "lucide-react";
import { Reveal } from "@/components/mindgest/reveal";
import { SectionHeading } from "@/components/mindgest/section-heading";

const DOC_CHIPS = [
  "Fatura Normal",
  "Fatura-Recibo",
  "Fatura Proforma",
  "Recibo",
  "Nota de Crédito",
];

const SMALL_FEATURES = [
  {
    icon: Package,
    title: "Items e stock",
    description:
      "Produtos e serviços com preços, categorias, código de barras e controlo de quantidades em cada loja.",
  },
  {
    icon: BarChart3,
    title: "Relatórios que falam claro",
    description:
      "Evolução de facturação, distribuição de vendas e desempenho por loja, sem folhas de cálculo.",
  },
  {
    icon: Bell,
    title: "Notificações em tempo real",
    description:
      "Fique a saber o que acontece no seu negócio no momento em que acontece.",
  },
  {
    icon: MonitorSmartphone,
    title: "Acesso web multiplataforma",
    description:
      "No computador, tablet ou telemóvel — sem instalação, basta iniciar sessão no navegador.",
  },
];

export function Features() {
  return (
    <section
      id="funcionalidades"
      className="scroll-mt-20 bg-background py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="01"
            label="Funcionalidades"
            title={
              <>
                Tudo o que o seu negócio precisa,{" "}
                <span className="text-primary">nada do que não precisa</span>
              </>
            }
            description="Do balcão ao escritório: documentos, clientes, stock e relatórios num sistema que qualquer pessoa da equipa aprende em minutos."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal className="md:col-span-2">
            <div className="group relative overflow-hidden border border-border bg-card p-8 text-foreground transition-colors hover:border-primary/40 sm:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <div className="inline-flex size-12 items-center justify-center bg-primary/10 text-primary">
                    <FileText className="size-6" />
                  </div>
                  <h3 className="mt-5 text-2xl font-black tracking-tight text-foreground">
                    Todos os documentos do seu negócio
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    Emita facturas, recibos, proformas e notas de crédito com
                    séries fiscais autorizadas pela AGT, numeração automática e
                    histórico completo, prontos a imprimir ou enviar.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {DOC_CHIPS.map((chip) => (
                      <span
                        key={chip}
                        className="border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="overflow-hidden border border-border shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
                  <Image
                    src="/mindgest/faturacao_eletronica.png"
                    alt="Ecrã de séries fiscais do Mindgest com séries de facturas, recibos e notas de crédito autorizadas pela AGT"
                    width={1679}
                    height={934}
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-2">
            <div className="group relative overflow-hidden border border-border bg-card p-8 text-foreground transition-colors hover:border-primary/60 sm:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <div className="inline-flex size-12 items-center justify-center bg-primary/15 text-primary">
                    <Store className="size-6" />
                  </div>
                  <h3 className="mt-5 text-2xl font-black tracking-tight text-foreground">
                    Várias lojas, um só painel
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    A visão do proprietário consolida as vendas, os serviços e
                    a facturação de toda a empresa. Alterne entre lojas num
                    clique e compare o desempenho de cada uma.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: "Morro Bento", value: "2,1M Kz", pct: "86%" },
                    { name: "Talatona", value: "1,4M Kz", pct: "61%" },
                    { name: "Viana", value: "740 mil Kz", pct: "38%" },
                  ].map((store) => (
                    <div
                      key={store.name}
                      className="border border-border bg-muted/40 p-4"
                    >
                      <p className="truncate text-[11px] font-semibold text-muted-foreground">
                        {store.name}
                      </p>
                      <p className="mt-1.5 text-sm font-black text-foreground">
                        {store.value}
                      </p>
                      <div className="mt-3 h-1.5 overflow-hidden bg-muted">
                        <div
                          className="h-full bg-primary"
                          style={{ width: store.pct }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="group h-full overflow-hidden border border-border bg-card text-foreground transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_rgba(153,86,246,0.25)]">
              <div className="overflow-hidden border-b border-border">
                <Image
                  src="/mindgest/clientes.png"
                  alt="Lista de clientes do Mindgest com NIF, contactos, endereço e estado de cada cliente"
                  width={1682}
                  height={838}
                  sizes="(min-width: 768px) 512px, 100vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black tracking-tight text-foreground">
                  Clientes organizados
                </h3>
                <p className="mt-2.5 leading-relaxed text-muted-foreground">
                  Fichas completas com NIF, contactos, histórico de compras e
                  documentos por cliente, tudo à distância de uma pesquisa.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="group h-full overflow-hidden border border-border bg-card text-foreground transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_rgba(153,86,246,0.25)]">
              <div className="overflow-hidden border-b border-border">
                <Image
                  src="/mindgest/settings.png"
                  alt="Definições de aparência do Mindgest com escolha de cor primária, tipografia e tema claro ou escuro"
                  width={1683}
                  height={923}
                  sizes="(min-width: 768px) 512px, 100vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black tracking-tight text-foreground">
                  À imagem da sua marca
                </h3>
                <p className="mt-2.5 leading-relaxed text-muted-foreground">
                  Personalize a cor, a tipografia e o tema (claro, escuro ou
                  automático) para que o sistema fique com a cara do seu
                  negócio.
                </p>
              </div>
            </div>
          </Reveal>

          {SMALL_FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i % 2 === 0 ? 0 : 120}>
              <div className="group h-full border border-border bg-card p-8 text-foreground transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_rgba(153,86,246,0.25)]">
                <div className="inline-flex size-12 items-center justify-center bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="mt-5 text-xl font-black tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
