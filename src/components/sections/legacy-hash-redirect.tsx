"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Âncoras que viviam na homepage quando ela era a página do Mindgest.
 * Links antigos (anúncios, bio do Instagram, QR codes) continuam a apontar
 * para mindware.ao/#planos — o fragmento nunca chega ao servidor, por isso
 * o redirecionamento tem de acontecer aqui.
 */
const MOVED_ANCHORS: Record<string, string> = {
  funcionalidades: "/mindgest#funcionalidades",
  planos: "/mindgest#planos",
  "como-funciona": "/mindgest#como-funciona",
  MindIA: "/mindgest#MindIA",
  products: "/#mindgest",
};

export function LegacyHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const destination = MOVED_ANCHORS[hash];
    if (destination) router.replace(destination);
  }, [router]);

  return null;
}
