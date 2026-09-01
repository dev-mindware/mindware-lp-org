import Link from "next/link";
import { ArrowRight, CheckCircle, Zap } from "lucide-react";

const TRUST_MARKERS = ["Processo ágil", "Código escalável", "Suporte contínuo"];

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

      {/* O header é `fixed h-20`: o `pt` tem de somar essa altura mais o
          espaço de respiro, por isso arranca nos 160px e sobe até 224px. */}
      <div className="relative mx-auto max-w-6xl px-6 pt-40 pb-28 sm:px-10 sm:pt-52 sm:pb-36 lg:pt-56 lg:pb-44">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="animate-fade-up inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"
            style={{ animationDelay: "0ms" }}
          >
            <Zap className="size-3.5" />
            Parceiro de inovação digital em Angola
          </div>

          <h1
            className="animate-fade-up mt-8 text-4xl leading-[1.05] font-black tracking-tight text-balance text-foreground sm:mt-10 sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "100ms" }}
          >
            Transformamos ideias em{" "}
            <em className="text-primary not-italic sm:italic">
              realidade digital
            </em>
          </h1>

          <p
            className="animate-fade-up mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:mt-8 sm:text-xl"
            style={{ animationDelay: "200ms" }}
          >
            Somos uma empresa angolana de design e desenvolvimento de software.
            Do primeiro esboço à implementação, construímos a tecnologia que
            impulsiona o seu crescimento.
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4"
            style={{ animationDelay: "300ms" }}
          >
            <Link
              href="/mindgest"
              className="group inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-[0_8px_32px_rgba(153,86,246,0.5)] transition-all hover:bg-primary/90 hover:shadow-[0_8px_44px_rgba(153,86,246,0.7)]"
            >
              Conhecer o Mindgest
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/service"
              className="inline-flex items-center gap-2 border border-border px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Os nossos serviços
            </Link>
          </div>

          <ul
            className="animate-fade-up mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-muted-foreground sm:mt-14"
            style={{ animationDelay: "400ms" }}
          >
            {TRUST_MARKERS.map((marker) => (
              <li key={marker} className="flex items-center gap-2">
                <CheckCircle className="size-5 text-primary" />
                {marker}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
