import {
  DatabaseZap,
  FileText,
  RefreshCw,
  ShieldCheck,
  WifiOff,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const BENEFITS = [
  {
    icon: WifiOff,
    title: "Venda sem internet",
    description:
      "A ligação caiu? O balcão continua a facturar. O POS funciona por completo sem depender da rede.",
  },
  {
    icon: DatabaseZap,
    title: "Dados sempre seguros",
    description:
      "Facturas, clientes e produtos ficam guardados no próprio computador. Uma falha de energia não faz perder uma única venda.",
  },
  {
    icon: FileText,
    title: "Documentos em A4 e talão",
    description:
      "Gere e imprima facturas e recibos em A4 ou talão, e exporte o SAF-T, mesmo estando offline.",
  },
  {
    icon: RefreshCw,
    title: "Sincroniza quando volta a net",
    description:
      "Assim que a ligação regressa, as vendas feitas offline seguem automaticamente para a sua conta Mindgest.",
  },
  {
    icon: Zap,
    title: "Rápido no balcão",
    description:
      "Aplicação nativa para Windows, pensada para filas de caixa: pesquisa de produtos e emissão de documentos em segundos.",
  },
  {
    icon: ShieldCheck,
    title: "Actualizações sem interrupções",
    description:
      "As novas versões descarregam em segundo plano e nunca reiniciam o POS com uma sessão de caixa aberta.",
  },
];

export function PosOffline() {
  return (
    <section
      id="pos-offline"
      className="scroll-mt-20 border-t border-border bg-background py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <SectionHeading
            index="03"
            label="Mindgest POS Offline"
            align="center"
            title={
              <>
                Sem internet,{" "}
                <span className="text-primary">sem parar de vender</span>
              </>
            }
            description="O Mindgest POS é a aplicação de ponto de venda para Windows que continua a funcionar quando a rede falha, e sincroniza tudo quando ela volta."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="h-full border border-border bg-card p-7 transition-colors hover:border-primary/40">
                <span className="grid size-11 place-items-center bg-primary/15 text-primary">
                  <item.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
