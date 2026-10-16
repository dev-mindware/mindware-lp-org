import type { QualityTier } from "./scene/types";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

let webglSupport: boolean | null = null;

export function hasWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    webglSupport = !!gl;
    (gl as WebGLRenderingContext | null)?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

export type AboutMode = "cinematic" | "static";

/** Subscrição para useSyncExternalStore: reage a mudanças de preferência. */
export function subscribeMode(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function getModeSnapshot(): AboutMode {
  if (window.matchMedia(REDUCED_MOTION).matches) return "static";
  return hasWebGL() ? "cinematic" : "static";
}

/** No servidor renderiza-se a versão cinematográfica (a maioria dos casos). */
export function getModeServerSnapshot(): AboutMode {
  return "cinematic";
}

/**
 * Nível de qualidade: dispositivos de toque, ecrãs pequenos ou com pouca
 * memória/CPU recebem menos pontos, menos partículas e DPR mais baixo.
 */
export function detectQuality(): QualityTier {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = window.innerWidth < 768;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 8;
  return coarse || small || cores <= 4 || memory <= 4 ? "low" : "high";
}
