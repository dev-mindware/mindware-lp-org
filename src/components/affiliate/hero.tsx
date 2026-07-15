"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AFFILIATE_HERO,
  AFFILIATE_REGISTER_URL,
  SOFTWARE_SHOTS,
} from "@/data/affiliate";
import { SoftwareFrame } from "./software-frame";

export function AffiliateHero() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.92]);
  const loginShot = SOFTWARE_SHOTS.find((s) => s.id === "login");

  return (
    <section
      id="affiliate-home"
      className="relative z-10 min-h-screen overflow-hidden bg-transparent pt-28 pb-16 text-foreground"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(153,86,246,0.22), transparent 70%)",
        }}
      />

      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-6 inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-primary uppercase"
          >
            <span className="size-1.5 animate-pulse bg-primary" />
            {AFFILIATE_HERO.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl leading-[1.02] font-black tracking-tight sm:text-6xl lg:text-7xl"
          >
            {AFFILIATE_HERO.title.line1}
            <br />
            <span className="relative text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-300 to-primary">
              {AFFILIATE_HERO.title.highlight}
              <motion.span
                className="absolute inset-0 -z-10 bg-primary opacity-30 blur-3xl"
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {AFFILIATE_HERO.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-7 flex flex-wrap gap-2"
          >
            {AFFILIATE_HERO.pills.map((pill) => (
              <span
                key={pill}
                className="border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur-sm"
              >
                {pill}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link href={AFFILIATE_REGISTER_URL} target="_blank" rel="noreferrer">
              <Button
                size="lg"
                className="h-14 bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
              >
                Tornar-me afiliado
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="h-14 border-border px-8 text-base font-bold"
              onClick={() =>
                document
                  .getElementById("comissoes")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ver comissões
            </Button>
          </motion.div>
        </div>

        {loginShot ? (
          <SoftwareFrame
            label={loginShot.label}
            urlDisplay={loginShot.urlDisplay}
            src={loginShot.src}
            alt={loginShot.alt}
            priority
          />
        ) : null}
      </motion.div>

      <motion.button
        type="button"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() =>
          document
            .getElementById("comissoes")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="mx-auto mt-16 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs font-bold tracking-widest uppercase">
          Explorar o programa
        </span>
        <ArrowDown className="size-5" />
      </motion.button>
    </section>
  );
}
