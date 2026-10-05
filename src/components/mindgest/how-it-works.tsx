import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { REGISTER_URL } from "@/data/mindgest/site";

const STEPS = [
  {
    number: "01",
    title: "Crie a sua conta",
    description:
      "Registe a sua empresa em minutos, directamente no navegador. Sem instalação e sem cartão de crédito.",
  },
  {
    number: "02",
    title: "Configure a sua loja",
    description:
      "Adicione os seus items, clientes e a sua equipa. Se tiver mais do que uma loja, junte-as todas à mesma conta.",
  },
  {
    number: "03",
    title: "Comece a facturar",
    description:
      "Emita documentos no balcão ou no escritório e acompanhe as vendas em tempo real, os relatórios fazem-se sozinhos.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-20 border-t border-border bg-background py-24 text-foreground sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <SectionHeading
            index="06"
            label="Como funciona"
            align="center"
            title={
              <>
                A funcionar <span className="text-primary">hoje</span>, não
                para a semana
              </>
            }
            description="Três passos separam o seu negócio de uma gestão organizada."
          />
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 120}>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="block text-[88px] leading-none font-black tracking-tighter text-primary/20 select-none sm:text-[104px]"
                >
                  {step.number}
                </span>
                <div className="-mt-7 border-l-2 border-primary pl-5">
                <h3 className="text-xl font-black tracking-tight text-foreground">
                  {step.title}
                </h3>
                  <p className="mt-2.5 leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-16 flex justify-center">
            <a
              href={REGISTER_URL}
              className="bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Criar a minha conta agora
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
