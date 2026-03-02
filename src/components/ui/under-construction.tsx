"use client";

import { motion } from "framer-motion";
import { HardHat, Cpu } from "lucide-react";

interface UnderConstructionProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export function UnderConstruction({
  title,
  subtitle = "Em Breve",
  description = "A nossa equipa está a desenvolver esta funcionalidade. Voltaremos com uma experiência completa em breve.",
}: UnderConstructionProps) {
  return (
    <main className="flex-1 relative flex items-center justify-center min-h-[80vh] overflow-hidden bg-background text-foreground">
      {/* Background massive typography */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none opacity-[0.03] overflow-hidden">
        <span className="text-[12rem] md:text-[20rem] lg:text-[25rem] font-black uppercase text-center block w-full whitespace-nowrap leading-none tracking-tighter">
          {title}
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-12 items-center pt-20 pb-32">
        {/* 90/10 Extreme Asymmetry Approach */}
        <motion.div
          className="md:col-span-9 space-y-8"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-none border-l-4 border-primary shadow-sm">
            <Cpu className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-bold tracking-widest uppercase">
              Sistema em Atualização
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.85]">
            {title}
            <br />
            <span className="text-muted-foreground/40 italic text-5xl md:text-7xl font-sans font-normal tracking-tight">
              {subtitle}
            </span>
          </h1>

          <p className="max-w-xl text-xl md:text-2xl text-muted-foreground border-l-2 border-border pl-6">
            {description}
          </p>
        </motion.div>

        <motion.div
          className="md:col-span-3 flex justify-start md:justify-center items-center mt-12 md:mt-0"
          initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-none border border-primary/30 bg-card flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-500 ease-out shadow-2xl group">
            <HardHat className="w-16 h-16 md:w-24 md:h-24 text-primary opacity-80 group-hover:scale-110 transition-transform duration-300" />
            <motion.div
              className="absolute inset-0 border border-primary"
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
}
