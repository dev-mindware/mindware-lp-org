"use client";

import { useReducedMotion } from "framer-motion";
import CountUp from "react-countup";

/** Todas as métricas partilham a duração para aterrarem em conjunto, seja o valor 2 ou 15. */
const DURATION_SECONDS = 2.5;

/**
 * easeOutCubic. A curva por defeito do countup.js (easeOutExpo) gasta-se nos
 * primeiros ~20% do tempo: com números pequenos (+2, +10) saltaria logo para o
 * valor final e a contagem passaria despercebida. Esta deixa cada dígito respirar.
 */
const easeOutCubic = (
  time: number,
  startValue: number,
  change: number,
  duration: number,
) => change * (1 - Math.pow(1 - time / duration, 3)) + startValue;

type CountUpNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Espera (ms) entre o número entrar no ecrã e arrancar — serve para escalonar várias métricas. */
  delay?: number;
  className?: string;
};

/**
 * Número que conta de 0 até `value` quando entra no ecrã, uma única vez.
 * O valor final fica sempre no HTML servido: o countup.js só assume o
 * elemento depois de montar no cliente, por isso não há "0" no SSR nem
 * divergência na hidratação.
 */
export function CountUpNumber({
  value,
  prefix = "",
  suffix = "",
  delay = 0,
  className,
}: CountUpNumberProps) {
  const prefersReducedMotion = useReducedMotion();
  const finalValue = `${prefix}${value}${suffix}`;

  if (prefersReducedMotion) {
    return <span className={className}>{finalValue}</span>;
  }

  return (
    <CountUp
      end={value}
      duration={DURATION_SECONDS}
      easingFn={easeOutCubic}
      prefix={prefix}
      suffix={suffix}
      enableScrollSpy
      scrollSpyOnce
      scrollSpyDelay={delay}
    >
      {({ countUpRef }) => (
        <span ref={countUpRef} className={className}>
          {finalValue}
        </span>
      )}
    </CountUp>
  );
}
