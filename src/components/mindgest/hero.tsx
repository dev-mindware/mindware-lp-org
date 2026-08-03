import { ArrowRight, Sparkles } from "lucide-react";
import { DashboardShot } from "@/components/mindgest/dashboard-shot";
import { REGISTER_URL } from "@/data/mindgest/site";

export function Hero() {
  return (
    <section
      id="home"
      className="grain relative scroll-mt-20 overflow-hidden bg-background text-foreground"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(153,86,246,0.28), transparent 70%), radial-gradient(ellipse 40% 30% at 85% 20%, rgba(124,58,237,0.15), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="animate-fade-up inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"
            style={{ animationDelay: "0ms" }}
          >
            <Sparkles className="size-3.5" />
            Gestão e facturação para empresas e profissionais
          </div>

          <h1
            className="animate-fade-up mt-7 text-4xl leading-[1.05] font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "100ms" }}
          >
            Venda. Facture.{" "}
            <em className="text-primary not-italic sm:italic">Cresça.</em>
          </h1>

          <p
            className="animate-fade-up mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            style={{ animationDelay: "200ms" }}
          >
            O Mindgest acompanha o seu negócio inteiro, da primeira venda ao
            relatório do fim do mês, em todas as suas lojas, num só lugar.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href={REGISTER_URL}
              className="group inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-[0_8px_32px_rgba(153,86,246,0.5)] transition-all hover:bg-primary/90 hover:shadow-[0_8px_44px_rgba(153,86,246,0.7)]"
            >
              Criar conta grátis
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#planos"
              className="inline-flex items-center gap-2 border border-border px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Ver planos
            </a>
          </div>

          <p
            className="animate-fade-up mt-5 text-sm text-muted-foreground"
            style={{ animationDelay: "400ms" }}
          >
            Sem instalação · Funciona em qualquer dispositivo · Cancele quando
            quiser
          </p>
        </div>

        <div
          className="animate-fade-up relative mx-auto mt-16 max-w-5xl"
          style={{ animationDelay: "500ms" }}
        >
          <DashboardShot />
          <div
            aria-hidden="true"
            className="absolute -inset-x-8 -bottom-8 h-40 bg-gradient-to-t from-background to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
