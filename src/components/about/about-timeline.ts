import gsap from "gsap";
import type { SceneState } from "./scene/types";

/**
 * Coreografia da secção About, numa única timeline de 0 a 100 unidades
 * controlada pelo progresso do scroll.
 *
 *   00–20  Cena 01 · A presença      — a luz revela a silhueta, a assinatura surge
 *   20–42  Cena 02 · Revelação       — aproximação ao rosto, varrimento de luz, etiquetas
 *   42–64  Cena 03 · Identidade      — rotação de 180° até às costas do colete
 *   64–86  Cena 04 · Filosofia       — a câmara recua, conteúdos institucionais
 *   86–100 Cena 05 · Encerramento    — regresso de frente, logótipo, assinatura e CTA
 *
 * Cada propriedade do estado 3D é animada por troços consecutivos que não se
 * sobrepõem no tempo, para que o scroll inverso seja exacto.
 */

export const SCENES = [
  { from: 0, label: "A presença" },
  { from: 20, label: "Revelação" },
  { from: 42, label: "Identidade" },
  { from: 64, label: "Filosofia" },
  { from: 86, label: "Encerramento" },
] as const;

export function sceneIndexAt(progress: number) {
  const p = progress * 100;
  let index = 0;
  SCENES.forEach((scene, i) => {
    if (p >= scene.from) index = i;
  });
  return index;
}

type Q = <T extends Element = HTMLElement>(selector: string) => T[];

export function buildAboutTimeline(root: HTMLElement, state: SceneState, wide: boolean) {
  const q: Q = (selector) => gsap.utils.toArray(root.querySelectorAll(selector));
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  const ease = "power2.inOut";
  const out = "power3.out";

  // ── Estado 3D ───────────────────────────────────────────────────────────
  // Cena 01 — luz e presença
  tl.to(state, { glow: 1, duration: 12, ease: "power1.in" }, 0);
  tl.to(state, { particles: 0.75, duration: 12 }, 0);
  tl.to(state, { assemble: 1, duration: 17, ease: "power1.inOut" }, 2);
  tl.to(state, { rim: 1.1, duration: 12 }, 3);
  tl.to(state, { exposure: 0.45, duration: 14 }, 6);
  tl.to(state, { key: 0.35, duration: 10 }, 9);
  tl.to(state, { ring: 0.45, duration: 8 }, 8);
  tl.to(state, { camZ: 6.6, camY: 0.25, lookY: 0.12, duration: 20, ease }, 0);

  // Cena 02 — aproximação ao rosto, depois desce até ao peito
  tl.to(state, { camZ: 3.1, camX: -0.22, camY: 0.95, lookX: -0.3, lookY: 0.82, duration: 10, ease }, 20);
  tl.to(state, { camZ: 3.9, camX: -0.05, camY: 0.35, lookX: -0.1, lookY: 0.25, duration: 9, ease }, 31);
  tl.to(state, { key: 1.1, duration: 4 }, 20);
  tl.to(state, { keySweep: 1, duration: 17, ease: "sine.inOut" }, 21);
  tl.to(state, { scan: 1, duration: 3 }, 21);
  tl.to(state, { scan: 0, duration: 4 }, 36);
  tl.to(state, { rotY: -0.2, duration: 18, ease: "sine.inOut" }, 22);

  // Cena 03 — rotação até às costas, a luz roxa acompanha
  tl.to(state, { camZ: 5, camX: 0, camY: 0.3, lookX: 0, lookY: 0.12, duration: 6, ease }, 42);
  tl.to(state, { ring: 1, duration: 4 }, 42);
  tl.to(state, { rotY: Math.PI, duration: 18, ease: "power1.inOut" }, 44);
  tl.to(state, { rim: 1.7, duration: 8 }, 44);
  tl.to(state, { rim: 1.2, duration: 6 }, 56);
  tl.to(state, { key: 0.8, duration: 6 }, 44);
  tl.to(state, { keySweep: 0.2, duration: 10, ease: "sine.inOut" }, 46);

  // Cena 04 — a câmara recua e abre espaço para o texto
  tl.to(state, { camZ: wide ? 6.6 : 7.4, camY: 0.1, lookY: wide ? 0.05 : -0.35, duration: 7, ease }, 64);
  tl.to(state, { figureX: wide ? 1.5 : 0, duration: 7, ease }, 64);
  tl.to(state, { glow: 0.6, ring: 0.35, duration: 6 }, 64);
  tl.to(state, { exposure: wide ? 0.38 : 0.2, duration: 6 }, 64);
  // vista ¾ posterior: mantém o volume e a impressão do colete à vista
  tl.to(state, { rotY: Math.PI * 1.2, duration: 20, ease: "sine.inOut" }, 66);

  // Cena 05 — regresso de frente, a luz estabiliza, as partículas diminuem
  tl.to(state, { camZ: 7.6, camY: 0.3, lookY: wide ? -0.35 : -0.45, figureX: 0, duration: 8, ease }, 86);
  tl.to(state, { rotY: Math.PI * 2, duration: 9, ease: "power2.out" }, 86);
  tl.to(state, { glow: 0.85, exposure: 0.45, ring: 0.25, duration: 8 }, 86);
  tl.to(state, { particles: 0.22, duration: 10 }, 88);
  tl.to(state, { rim: 1, key: 0.9, keySweep: 0, duration: 8 }, 88);

  // ── Tipografia e interface ──────────────────────────────────────────────
  // Cena 01 — assinatura por máscara
  // (as palavras começam com translateY(115%) inline; fixar `y: 0` evita que o
  // GSAP o converta num deslocamento em píxeis que nunca seria reposto)
  tl.fromTo(q("[data-el='eyebrow']"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 4, ease: out }, 2);
  tl.fromTo(
    q("[data-split='signature']"),
    { y: 0, yPercent: 115, rotate: 4 },
    { y: 0, yPercent: 0, rotate: 0, duration: 5, stagger: 0.9, ease: out },
    5,
  );
  tl.to(q("[data-el='intro']"), { autoAlpha: 0, y: -40, filter: "blur(6px)", duration: 5, ease: "power2.in" }, 16);

  // Cena 02 — etiquetas de interface ancoradas ao corpo
  q("[data-tag-inner]").forEach((tag, i) => {
    const at = 24 + i * 3;
    tl.fromTo(tag, { autoAlpha: 0 }, { autoAlpha: 1, duration: 2.5, ease: out }, at);
    tl.fromTo(
      tag.querySelector("[data-tag-line]"),
      { scaleX: 0 },
      { scaleX: 1, duration: 2.5, ease: out },
      at,
    );
    tl.fromTo(
      tag.querySelector("[data-tag-label]"),
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 3, ease: out },
      at + 1,
    );
    tl.to(tag, { autoAlpha: 0, duration: 2.5 }, 39 + i * 0.4);
  });

  // Cena 03 — instrumento de rotação e identidade da marca
  tl.fromTo(q("[data-el='orbit']"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 4, ease: out }, 42);
  tl.to(q("[data-el='orbit']"), { autoAlpha: 0, y: 16, duration: 3 }, 63);
  tl.fromTo(
    q("[data-split='brand']"),
    { y: 0, yPercent: 115 },
    { y: 0, yPercent: 0, duration: 4, stagger: 0.5, ease: out },
    56,
  );
  tl.to(q("[data-el='brand']"), { autoAlpha: 0, duration: 3 }, 63);

  // Cena 04 — conteúdos institucionais
  if (!wide) tl.fromTo(q("[data-el='scrim']"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 5 }, 64);
  tl.fromTo(q("[data-el='heading-meta']"), { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, duration: 4, ease: out }, 66);
  tl.fromTo(
    q("[data-split='heading']"),
    { y: 0, yPercent: 115 },
    { y: 0, yPercent: 0, duration: 5, stagger: 0.35, ease: out },
    67,
  );
  const pillars = q("[data-pillar]");
  pillars.forEach((pillar, i) => {
    if (wide) {
      // em ecrã largo, os três conceitos acumulam-se numa coluna
      const at = 71 + i * 4;
      tl.fromTo(pillar, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 4, ease: out }, at);
      tl.fromTo(
        pillar.querySelector("[data-pillar-rule]"),
        { scaleY: 0 },
        { scaleY: 1, duration: 4, ease: out },
        at,
      );
    } else {
      // em ecrã estreito, um conceito de cada vez no mesmo espaço
      const at = 70 + i * 5.5;
      tl.fromTo(pillar, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 2.5, ease: out }, at);
      if (i < pillars.length - 1) tl.to(pillar, { autoAlpha: 0, y: -24, duration: 2, ease: "power2.in" }, at + 3.5);
    }
  });
  tl.to(q("[data-el='philosophy']"), { autoAlpha: 0, y: -30, duration: 4, ease: "power2.in" }, 86);
  if (!wide) tl.to(q("[data-el='scrim']"), { autoAlpha: 0.35, duration: 4 }, 86);

  // Cena 05 — encerramento
  tl.fromTo(q("[data-el='finale-scrim']"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 6 }, 87);
  tl.fromTo(q("[data-el='logo']"), { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 5, ease: out }, 89);
  tl.fromTo(
    q("[data-split='finale']"),
    { y: 0, yPercent: 115 },
    { y: 0, yPercent: 0, duration: 5, stagger: 0.6, ease: out },
    90,
  );
  // só opacidade (não autoAlpha): o CTA tem de continuar focável pelo teclado
  tl.fromTo(q("[data-el='cta']"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 4, ease: out }, 94);

  // garante a duração total de 100 unidades
  tl.set({}, {}, 100);
  return tl;
}
