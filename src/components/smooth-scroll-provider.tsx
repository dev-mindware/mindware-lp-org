"use client";

import { useEffect, type ReactNode } from "react";
import "lenis/dist/lenis.css";
import { createSmoothScroll } from "@/lib/smooth-scroll";

type SmoothScrollProviderProps = {
  children: ReactNode;
  /** Lenis lerp — default 0.1 */
  lerp?: number;
};

/**
 * App Router-compatible Lenis provider. Wires GSAP ticker + ScrollTrigger sync.
 * No-ops on touch devices and when prefers-reduced-motion is set.
 */
export function SmoothScrollProvider({
  children,
  lerp = 0.1,
}: SmoothScrollProviderProps) {
  useEffect(() => {
    const { destroy } = createSmoothScroll({ lerp });
    return destroy;
  }, [lerp]);

  return children;
}
