import { Manrope } from "next/font/google";
import { FadeUp } from "@/components/animations/fade-up";
import { stats } from "@/data";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export function Stats() {
  return (
    <section className="py-12 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-x divide-white/20">
          {stats.map((stat, index) => (
            <FadeUp key={index} delay={index * 0.1} className="p-4">
              <div
                className={`${manrope.className} text-4xl md:text-5xl font-bold mb-2 tracking-tight`}
              >
                {stat.value}
              </div>
              <div
                className={`${manrope.className} text-sm md:text-base opacity-80 font-medium uppercase tracking-wide`}
              >
                {stat.label}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
