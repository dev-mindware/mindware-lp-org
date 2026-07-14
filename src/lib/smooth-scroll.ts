import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type SmoothScrollOptions = {
  /** Lenis lerp — softer inertia around 0.08–0.12 */
  lerp?: number;
  /** Disable entirely (e.g. reduced motion / touch preference) */
  enabled?: boolean;
};

const DEFAULT_LERP = 0.1;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(pointer: coarse)").matches;
}

/**
 * Premium Lenis + GSAP ScrollTrigger smooth scrolling.
 * Single RAF loop via gsap.ticker. Native scroll on touch / reduced-motion.
 */
export function createSmoothScroll(options: SmoothScrollOptions = {}) {
  const lerp = options.lerp ?? DEFAULT_LERP;
  const shouldEnable =
    options.enabled ?? (!prefersReducedMotion() && !isCoarsePointer());

  if (!shouldEnable) {
    return {
      lenis: null as Lenis | null,
      destroy() {},
    };
  }

  const lenis = new Lenis({
    lerp,
    smoothWheel: true,
    // Keep native feel on touch / hybrid devices that still init desktop mode
    syncTouch: false,
    touchInertiaExponent: 1.2,
    wheelMultiplier: 1,
    autoRaf: false,
  });

  const onScroll = () => {
    ScrollTrigger.update();
  };
  lenis.on("scroll", onScroll);

  const onTick = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  const onVisibility = () => {
    if (document.hidden) {
      lenis.stop();
    } else {
      lenis.start();
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const onMotionChange = () => {
    if (motionQuery.matches) {
      lenis.stop();
    } else if (!document.hidden) {
      lenis.start();
    }
  };
  motionQuery.addEventListener("change", onMotionChange);

  ScrollTrigger.refresh();

  return {
    lenis,
    destroy() {
      motionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibility);
      gsap.ticker.remove(onTick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      ScrollTrigger.refresh();
    },
  };
}
