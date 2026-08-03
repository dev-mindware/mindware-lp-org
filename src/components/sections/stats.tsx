import { CountUpNumber } from "@/components/ui/count-up-number";
import { Reveal } from "@/components/ui/reveal";
import { stats } from "@/data/stats";

/** Desfasamento entre colunas: cada métrica revela e conta a seguir à anterior. */
const STAGGER_MS = 100;

export function Stats() {
  return (
    <section className="grain relative overflow-hidden bg-primary py-16 text-primary-foreground">
      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid gap-10 text-center sm:grid-cols-3 sm:gap-6 sm:divide-x sm:divide-white/20">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * STAGGER_MS}>
              {/* tabular-nums: sem isto a largura dos dígitos muda a cada tick e o número treme */}
              <p className="text-5xl font-black tabular-nums tracking-tight sm:text-6xl">
                <CountUpNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  delay={index * STAGGER_MS}
                />
              </p>
              <p className="mt-2 text-sm font-semibold tracking-[0.15em] uppercase opacity-80">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
