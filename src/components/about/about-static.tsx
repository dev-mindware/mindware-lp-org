import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { WHATSAPP_URL } from "@/constants/site";
import { ABOUT_HEADING, ABOUT_PILLARS, ABOUT_SIGNATURE } from "./about-content";
import { PORTRAIT_ASSETS } from "./character-config";

/**
 * Versão estática e acessível da secção About: usada com
 * `prefers-reduced-motion` ou quando o WebGL não está disponível.
 * Mantém a direcção de arte (escuro, contraluz roxo) sem movimento contínuo.
 */
export function AboutStatic() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative scroll-mt-20 overflow-hidden bg-[#0D0D0D] py-24 text-[#F5F3FA] sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[-10%] size-[70vmin] -translate-y-1/2 rounded-full bg-[#9956F6]/25 blur-[120px]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <Reveal>
            <div className="flex items-center gap-3 text-xs font-bold tracking-[0.25em] text-[#9956F6] uppercase">
              <span>{ABOUT_HEADING.index}</span>
              <span className="h-px w-8 bg-[#9956F6]/40" />
              <span className="text-[#F5F3FA]/60">{ABOUT_HEADING.label}</span>
            </div>
            <h2
              id="about-title"
              className="mt-4 text-3xl font-black tracking-tight text-balance sm:text-4xl"
            >
              {ABOUT_HEADING.title}
            </h2>
            <p className="mt-6 text-lg font-bold text-[#9956F6]">{ABOUT_SIGNATURE}</p>
          </Reveal>

          <ol className="mt-12 space-y-8">
            {ABOUT_PILLARS.map((pillar, i) => (
              <Reveal key={pillar.key} delay={i * 80}>
                <li className="border-l-2 border-[#9956F6] pl-6">
                  <p className="text-xs font-bold tracking-[0.25em] text-[#F5F3FA]/50 uppercase">
                    {pillar.index} · {pillar.kicker}
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight">{pillar.title}</h3>
                  <p className="mt-3 leading-relaxed text-[#F5F3FA]/70">{pillar.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={240}>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-12 inline-flex items-center gap-2 bg-[#9956F6] px-7 py-3.5 text-base font-bold text-white shadow-[0_8px_32px_rgba(153,86,246,0.4)] transition-all hover:bg-[#9956F6]/90"
            >
              Fale connosco
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <Image
              src={PORTRAIT_ASSETS.front.src}
              width={PORTRAIT_ASSETS.front.width}
              height={PORTRAIT_ASSETS.front.height}
              alt="Membro da equipa Mindware com o colete da marca e auscultadores ao pescoço"
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="absolute inset-x-0 bottom-0 mx-auto h-full w-auto object-contain object-bottom drop-shadow-[0_0_40px_rgba(153,86,246,0.45)]"
            />
            <Image
              src={PORTRAIT_ASSETS.back.src}
              width={PORTRAIT_ASSETS.back.width}
              height={PORTRAIT_ASSETS.back.height}
              alt="Costas do colete Mindware com o logótipo e a assinatura «A mente cria, o código segue.»"
              sizes="(min-width: 1024px) 12rem, 40vw"
              className="absolute right-0 bottom-0 w-[42%] border border-[#9956F6]/40 bg-[#171717] object-contain"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
