"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHATSAPP_URL } from "@/constants/site";
import { ABOUT_HEADING, ABOUT_PILLARS, ABOUT_SIGNATURE, ABOUT_TAGS } from "./about-content";
import { buildAboutTimeline, SCENES, sceneIndexAt } from "./about-timeline";
import { detectQuality } from "./capabilities";
import { CHARACTER_HEIGHT, CHARACTER_MODEL_URL, CHARACTER_RENDERS } from "./character-config";
import { SplitWords } from "./split-words";
import type { AboutScene, AnchorScreen } from "./scene/about-scene";
import { INITIAL_STATE } from "./scene/types";

gsap.registerPlugin(ScrollTrigger);

/** Âncora 3D de cada etiqueta e lado para onde o texto se estende. */
const TAG_LAYOUT: Record<string, { anchor: string; side: "left" | "right" }> = {
  software: { anchor: "head", side: "right" },
  automacao: { anchor: "headphones", side: "left" },
  produto: { anchor: "chest", side: "right" },
  inovacao: { anchor: "vest", side: "left" },
};

const VIEWS = ["Frente", "Perfil", "Costas"] as const;

type AboutCinematicProps = {
  /** Chamado quando o WebGL falha ao iniciar — o pai muda para a versão estática */
  onUnsupported: () => void;
};

export function AboutCinematic({ onUnsupported }: AboutCinematicProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const onUnsupportedRef = useRef(onUnsupported);

  useEffect(() => {
    onUnsupportedRef.current = onUnsupported;
  }, [onUnsupported]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!section || !stage || !canvas) return;

    const state = { ...INITIAL_STATE };
    const quality = detectQuality();
    const abort = new AbortController();
    let scene: AboutScene | null = null;
    let disposed = false;
    let visible = false;

    const setStatus = (status: "loading" | "ready" | "failed") => {
      stage.dataset.status = status;
    };
    setStatus("loading");

    // ── HUD e etiquetas actualizados a cada frame (sem estado React) ──────
    const tags = Array.from(stage.querySelectorAll<HTMLElement>("[data-tag]")).map((el) => ({
      el,
      inner: el.querySelector<HTMLElement>("[data-tag-inner]"),
      layout: TAG_LAYOUT[el.dataset.tag ?? ""],
      width: 0,
      side: el.dataset.side ?? "right",
    }));
    let stageWidth = stage.clientWidth;
    const rotationEl = stage.querySelector<HTMLElement>("[data-el='rotation']");
    const viewEls = Array.from(stage.querySelectorAll<HTMLElement>("[data-view]"));
    const anchor: AnchorScreen = { x: 0, y: 0, visible: false };
    let lastDeg = -1;

    const onFrame = (s: AboutScene) => {
      const margin = 12;
      for (const tag of tags) {
        if (!tag.layout || !tag.inner) continue;
        s.projectAnchor(tag.layout.anchor, anchor);
        if (!tag.width) tag.width = tag.inner.offsetWidth;
        // muda de lado quando a etiqueta não cabe; em último caso, encosta à margem
        let side = tag.layout.side;
        if (side === "right" && anchor.x + tag.width > stageWidth - margin) side = "left";
        else if (side === "left" && anchor.x - tag.width < margin) side = "right";
        const x =
          side === "right"
            ? Math.min(anchor.x, stageWidth - margin - tag.width)
            : Math.max(anchor.x, margin + tag.width);
        if (side !== tag.side) {
          tag.side = side;
          tag.el.dataset.side = side;
        }
        tag.el.style.transform = `translate3d(${x.toFixed(1)}px, ${anchor.y.toFixed(1)}px, 0)`;
        tag.el.style.visibility = anchor.visible ? "" : "hidden";
      }
      const deg = Math.round(((((state.rotY * 180) / Math.PI) % 360) + 360) % 360);
      if (deg !== lastDeg && rotationEl) {
        lastDeg = deg;
        rotationEl.textContent = `${String(deg).padStart(3, "0")}°`;
        const view = deg < 45 || deg > 315 ? 0 : deg > 135 && deg < 225 ? 2 : 1;
        viewEls.forEach((el, i) => el.toggleAttribute("data-active", i === view));
      }
    };

    // ── Cena 3D (carregada de forma progressiva) ─────────────────────────
    const boot = async () => {
      const [{ AboutScene }, { createGlbCharacter }] = await Promise.all([
        import("./scene/about-scene"),
        import("./scene/glb-character"),
      ]);
      if (disposed) return;
      try {
        scene = new AboutScene({ canvas, quality });
      } catch {
        onUnsupportedRef.current();
        return;
      }
      scene.state = state;
      scene.onFrame = onFrame;
      const rect = stage.getBoundingClientRect();
      scene.resize(rect.width, rect.height);
      scene.render();
      if (visible) scene.start();

      try {
        const rig = await createGlbCharacter(CHARACTER_MODEL_URL, CHARACTER_HEIGHT, scene.renderer, abort.signal);
        if (disposed || !scene) {
          rig.dispose();
          return;
        }
        scene.setCharacter(rig);
        setStatus("ready");
      } catch (error) {
        if (disposed || (error instanceof DOMException && error.name === "AbortError")) return;
        console.warn("[about] personagem 3D indisponível — a usar render estático", error);
        setStatus("failed");
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) scene?.start();
        else scene?.stop();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(section);

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      stageWidth = width;
      for (const tag of tags) tag.width = 0;
      scene?.resize(width, height);
    });
    ro.observe(stage);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      scene?.stop();
      setStatus("failed");
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const onPointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      scene?.setPointer(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -(((event.clientY - rect.top) / rect.height) * 2 - 1),
      );
    };
    if (finePointer) stage.addEventListener("pointermove", onPointerMove);

    // ── Timeline sincronizada com o scroll ───────────────────────────────
    const sceneLabel = stage.querySelector<HTMLElement>("[data-el='scene-label']");
    const sceneIndexEl = stage.querySelector<HTMLElement>("[data-el='scene-index']");
    const railItems = Array.from(stage.querySelectorAll<HTMLElement>("[data-rail]"));
    const progressBar = stage.querySelector<HTMLElement>("[data-el='progress']");
    let currentScene = -1;

    const mm = gsap.matchMedia();
    mm.add(
      { wide: "(min-width: 1024px)", narrow: "(max-width: 1023.98px)" },
      (context) => {
        const wide = !!context.conditions?.wide;
        Object.assign(state, INITIAL_STATE);
        const tl = buildAboutTimeline(stage, state, wide);
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top 75%",
          end: "bottom bottom",
          // o Lenis já suaviza o scroll no desktop; no toque suaviza-se aqui
          scrub: finePointer ? true : 0.6,
          animation: tl,
          onUpdate: (self) => {
            const index = sceneIndexAt(self.progress);
            if (progressBar) progressBar.style.transform = `scaleX(${self.progress.toFixed(4)})`;
            if (index === currentScene) return;
            currentScene = index;
            if (sceneLabel) sceneLabel.textContent = SCENES[index].label;
            if (sceneIndexEl) sceneIndexEl.textContent = String(index + 1).padStart(2, "0");
            railItems.forEach((el, i) => el.toggleAttribute("data-active", i === index));
          },
        });
        triggerRef.current = trigger;
        trigger.update();
        return () => {
          triggerRef.current = null;
        };
      },
    );

    void boot();

    return () => {
      disposed = true;
      abort.abort();
      mm.revert();
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      stage.removeEventListener("pointermove", onPointerMove);
      scene?.dispose();
      scene = null;
    };
  }, []);

  /** Se o CTA receber foco pelo teclado antes de estar visível, avança a cena. */
  const onFinaleFocus = () => {
    const trigger = triggerRef.current;
    if (!trigger || trigger.progress > 0.97) return;
    window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * 0.985, behavior: "instant" });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-title"
      className="relative h-[460svh] bg-[#0D0D0D] text-[#F5F3FA] lg:h-[560svh]"
    >
      <a
        href="#about-end"
        className="sr-only focus:not-sr-only focus:absolute focus:top-24 focus:left-6 focus:z-30 focus:bg-[#9956F6] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Saltar animação da secção Quem somos
      </a>

      <div
        ref={stageRef}
        data-status="loading"
        className="group/stage grain sticky top-0 h-svh w-full overflow-hidden"
      >
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block size-full" />

        {/* Render estático, visível apenas se a personagem 3D falhar */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[78%] justify-center group-data-[status=failed]/stage:flex lg:justify-end lg:pr-[12%]"
        >
          <Image
            src={CHARACTER_RENDERS.front.src}
            width={CHARACTER_RENDERS.front.width}
            height={CHARACTER_RENDERS.front.height}
            alt=""
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="h-full w-auto object-contain object-bottom opacity-90 drop-shadow-[0_0_48px_rgba(153,86,246,0.55)]"
          />
        </div>

        {/* Vinheta cinematográfica */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(13,13,13,0.85)_100%)]"
        />

        {/* Estado de carregamento */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 opacity-0 transition-opacity duration-700 group-data-[status=loading]/stage:opacity-100"
        >
          <span className="text-xs font-bold tracking-[0.35em] text-[#F5F3FA]/50 uppercase">
            A preparar a cena
          </span>
          <span className="relative h-px w-40 overflow-hidden bg-[#F5F3FA]/10">
            <span className="absolute inset-y-0 left-0 w-1/3 bg-[#9956F6] motion-safe:animate-[about-load_1.6s_ease-in-out_5]" />
          </span>
        </div>

        {/* HUD superior */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-24 flex items-start justify-between px-6 text-xs font-bold tracking-[0.3em] text-[#F5F3FA]/45 uppercase sm:px-10"
        >
          <span className="hidden sm:inline">
            <span className="text-[#9956F6]">Mindware</span> / Quem somos
          </span>
          <span className="ml-auto text-right">
            Cena <span data-el="scene-index" className="text-[#F5F3FA]">01</span>
            <span className="mx-2 text-[#F5F3FA]/25">—</span>
            <span data-el="scene-label" className="text-[#F5F3FA]/70">
              {SCENES[0].label}
            </span>
          </span>
        </div>

        {/* Linha de progresso */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#F5F3FA]/8">
          <div data-el="progress" className="h-full origin-left scale-x-0 bg-[#9956F6]" />
        </div>

        {/* Navegação de cenas (desktop) */}
        <ol
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-6 hidden -translate-y-1/2 flex-col gap-4 lg:flex"
        >
          {SCENES.map((scene, i) => (
            <li
              key={scene.label}
              data-rail
              data-active={i === 0 ? "" : undefined}
              className="group/rail flex items-center justify-end gap-3 text-xs font-bold tracking-[0.25em] text-[#F5F3FA]/30 uppercase transition-colors duration-500 data-[active]:text-[#F5F3FA]"
            >
              <span className="opacity-0 transition-opacity duration-500 group-data-[active]/rail:opacity-100">
                {scene.label}
              </span>
              <span className="h-px w-4 bg-current transition-all duration-500 group-data-[active]/rail:w-8 group-data-[active]/rail:bg-[#9956F6]" />
            </li>
          ))}
        </ol>

        {/* CENA 01 — assinatura */}
        <div
          data-el="intro"
          className="pointer-events-none absolute inset-x-0 bottom-[12%] px-6 text-center sm:bottom-[14%]"
        >
          <p
            data-el="eyebrow"
            className="text-xs font-bold tracking-[0.4em] text-[#9956F6] uppercase opacity-0"
          >
            Mindware · {ABOUT_HEADING.label}
          </p>
          <SplitWords
            as="p"
            group="signature"
            text={ABOUT_SIGNATURE}
            className="mx-auto mt-4 max-w-4xl text-4xl leading-[1.02] font-black tracking-tight text-balance sm:text-6xl lg:text-7xl"
            concealed
          />
        </div>

        {/* CENA 02 — etiquetas ancoradas ao modelo */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {ABOUT_TAGS.map((tag) => (
            <div
              key={tag.key}
              data-tag={tag.key}
              data-side={TAG_LAYOUT[tag.key]?.side ?? "right"}
              className="group/tag absolute top-0 left-0 will-change-transform"
            >
              <div
                data-tag-inner
                className="absolute top-0 left-0 flex -translate-y-1/2 items-center opacity-0 group-data-[side=left]/tag:right-0 group-data-[side=left]/tag:left-auto group-data-[side=left]/tag:flex-row-reverse"
              >
                <span className="relative block size-2.5 shrink-0 -translate-x-1/2 border border-[#9956F6] bg-[#0D0D0D] group-data-[side=left]/tag:translate-x-1/2">
                  <span className="absolute inset-[3px] bg-[#9956F6]" />
                </span>
                <span
                  data-tag-line
                  className="block h-px w-8 origin-left bg-[#9956F6]/70 group-data-[side=left]/tag:origin-right sm:w-16"
                />
                <span
                  data-tag-label
                  className="border border-[#F5F3FA]/15 bg-[#0D0D0D]/70 px-2.5 py-1.5 text-xs font-bold tracking-[0.2em] whitespace-nowrap text-[#F5F3FA] uppercase backdrop-blur-sm sm:px-3"
                >
                  {tag.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CENA 03 — instrumento de rotação */}
        <div
          data-el="orbit"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-[4%] flex flex-col items-center gap-3 opacity-0 lg:right-auto lg:bottom-[9%] lg:left-[max(2.5rem,calc((100vw-72rem)/2))] lg:items-start"
        >
          <span
            data-el="rotation"
            className="font-mono text-3xl font-bold tracking-widest text-[#F5F3FA] tabular-nums sm:text-4xl"
          >
            000°
          </span>
          <span className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase">
            {VIEWS.map((view, i) => (
              <span key={view} className="flex items-center gap-3">
                {i > 0 ? <span className="h-px w-6 bg-[#F5F3FA]/20" /> : null}
                <span
                  data-view
                  data-active={i === 0 ? "" : undefined}
                  className="text-[#F5F3FA]/35 transition-colors duration-500 data-[active]:text-[#9956F6]"
                >
                  {view}
                </span>
              </span>
            ))}
          </span>
        </div>
        <div
          data-el="brand"
          aria-hidden="true"
          className="pointer-events-none absolute top-[22%] left-6 max-w-[16rem] sm:left-10 lg:top-1/3"
        >
          <SplitWords
            group="brand"
            text="Identidade Mindware"
            className="block text-xs font-bold tracking-[0.35em] text-[#9956F6] uppercase"
            concealed
          />
          <SplitWords
            group="brand"
            text={ABOUT_SIGNATURE}
            className="mt-3 block text-xl leading-tight font-black sm:text-2xl"
            concealed
          />
        </div>

        {/* CENA 04 — filosofia (conteúdo institucional) */}
        <div
          data-el="scrim"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#0D0D0D_30%,rgba(13,13,13,0.75)_55%,transparent_80%)] opacity-0 lg:hidden"
        />
        <div
          data-el="philosophy"
          className="absolute inset-x-0 bottom-[8%] px-6 sm:px-10 lg:top-[calc(50%+2.5rem)] lg:bottom-auto lg:left-[max(2.5rem,calc((100vw-72rem)/2))] lg:w-[min(38rem,42vw)] lg:-translate-y-1/2 lg:px-0"
        >
          <div
            data-el="heading-meta"
            className="flex items-center gap-3 text-xs font-bold tracking-[0.25em] text-[#9956F6] uppercase opacity-0"
          >
            <span>{ABOUT_HEADING.index}</span>
            <span className="h-px w-8 bg-[#9956F6]/40" />
            <span className="text-[#F5F3FA]/60">{ABOUT_HEADING.label}</span>
          </div>
          <SplitWords
            as="h2"
            id="about-title"
            group="heading"
            text={ABOUT_HEADING.title}
            className="mt-4 text-2xl leading-tight font-black tracking-tight text-balance sm:text-4xl lg:text-[2.25rem]"
            concealed
          />
          <ol className="relative mt-8 grid min-h-[12.5rem] sm:min-h-[10rem] lg:mt-8 lg:min-h-0 lg:gap-5">
            {ABOUT_PILLARS.map((pillar) => (
              <li
                key={pillar.key}
                data-pillar
                className="relative col-start-1 row-start-1 pl-6 opacity-0 lg:row-start-auto"
              >
                <span
                  data-pillar-rule
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0.5 origin-top bg-[#9956F6]"
                />
                <p className="text-xs font-bold tracking-[0.25em] text-[#F5F3FA]/50 uppercase">
                  {pillar.index} · {pillar.kicker}
                </p>
                <h3 className="mt-1.5 text-xl font-black tracking-tight sm:text-2xl">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#F5F3FA]/70 sm:text-base lg:text-[0.95rem]">{pillar.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* CENA 05 — encerramento */}
        <div
          data-el="finale-scrim"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,#0D0D0D_15%,transparent)] opacity-0"
        />
        <div
          className="absolute inset-x-0 bottom-[7%] flex flex-col items-center px-6 text-center sm:bottom-[9%]"
          onFocusCapture={onFinaleFocus}
        >
          <Image
            data-el="logo"
            src="/logo.png"
            width={56}
            height={56}
            alt="Mindware"
            className="size-12 opacity-0 sm:size-14"
          />
          <SplitWords
            as="p"
            group="finale"
            text={ABOUT_SIGNATURE}
            className="mt-4 max-w-3xl text-3xl leading-[1.05] font-black tracking-tight text-balance sm:text-5xl"
            concealed
          />
          <div data-el="cta" className="mt-7 opacity-0">
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-[#9956F6] px-7 py-3.5 text-base font-bold text-white shadow-[0_8px_32px_rgba(153,86,246,0.45)] transition-all hover:bg-[#9956F6]/90 hover:shadow-[0_8px_44px_rgba(153,86,246,0.65)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5F3FA]"
            >
              Fale connosco
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
      <span id="about-end" aria-hidden="true" className="absolute bottom-0" />
    </section>
  );
}
