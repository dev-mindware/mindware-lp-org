import { Download, Monitor } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { LOGIN_URL, POS_DOWNLOAD_URL } from "@/data/mindgest/site";

const STEPS = [
  "Descarregue e execute o instalador.",
  "Inicie sessão com a sua conta Mindgest.",
  "Abra o caixa e comece a vender, com ou sem internet.",
];

export function PosDownload() {
  return (
    <section
      id="download-pos"
      className="scroll-mt-20 bg-background py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <div className="grid items-center gap-10 border border-primary/30 bg-card p-8 shadow-[0_40px_100px_-30px_rgba(153,86,246,0.35)] sm:p-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                index="05"
                label="Descarregar"
                title={
                  <>
                    Instale o <span className="text-primary">Mindgest POS</span>
                  </>
                }
                description="Descarregue o instalador para Windows e ligue o POS à sua conta Mindgest."
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={POS_DOWNLOAD_URL}
                  className="group inline-flex items-center justify-center gap-2 bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[0_8px_36px_rgba(153,86,246,0.55)] transition-all hover:bg-primary/90"
                >
                  <Download className="size-4" />
                  Descarregar para Windows
                </a>
                <a
                  href={LOGIN_URL}
                  className="inline-flex items-center justify-center border border-border px-8 py-4 text-base font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  Já tenho conta
                </a>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Monitor className="size-4 shrink-0" />
                Windows 10 ou superior · Mindgest-POS-Setup.exe
              </p>
            </div>

            <ol className="space-y-5">
              {STEPS.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="grid size-9 shrink-0 place-items-center bg-primary/15 text-sm font-black text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1.5 text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
