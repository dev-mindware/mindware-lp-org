"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { AboutCinematic } from "./about-cinematic";
import { AboutStatic } from "./about-static";
import { getModeServerSnapshot, getModeSnapshot, subscribeMode } from "./capabilities";

/**
 * Secção About: experiência cinematográfica 3D controlada pelo scroll, com
 * versão estática para `prefers-reduced-motion` e dispositivos sem WebGL.
 */
export function AboutSection() {
  const mode = useSyncExternalStore(subscribeMode, getModeSnapshot, getModeServerSnapshot);
  const [webglFailed, setWebglFailed] = useState(false);
  const onUnsupported = useCallback(() => setWebglFailed(true), []);

  if (mode === "static" || webglFailed) return <AboutStatic />;
  return <AboutCinematic onUnsupported={onUnsupported} />;
}
