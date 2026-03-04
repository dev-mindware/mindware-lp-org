"use client";

import { motion } from "framer-motion";
import { Hammer, ArrowLeft, HardHat } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UnderDevelopmentProps {
  pageName: string;
}

export function UnderDevelopment({ pageName }: UnderDevelopmentProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none opacity-[0.03] overflow-hidden">
        <span className="text-[12rem] md:text-[20rem] lg:text-[25rem] font-black uppercase text-center block w-full whitespace-nowrap leading-none tracking-tighter">
          {pageName}
        </span>
      </div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-test-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-test-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        <div className="flex justify-center mb-8">
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
            <div className="relative w-24 h-24  rounded-none border border-primary/30 bg-card flex items-center justify-center transform hover:rotate-6 transition-transform duration-500 ease-out shadow-2xl group">
              <Hammer className="w-12 h-12 text-primary opacity-80 group-hover:scale-110 transition-transform duration-300" />
              {/* <Hammer className="w-12 h-12 text-primary" /> */}

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

        <div className="inline-flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-primary"></span>
          <span className="text-primary font-bold uppercase tracking-widest text-sm">
            Em Construção
          </span>
          <span className="h-px w-12 bg-primary"></span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
          <span className="text-foreground">{pageName}</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl mx-auto">
          Nossa equipe de engenharia está trabalhando arduamente para
          disponibilizar esta funcionalidade em breve. Estamos preparando algo
          incrível.
        </p>

        <Link href="/">
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 text-lg font-bold rounded-test-full border-white/20 hover:bg-white/5 backdrop-blur-sm"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Voltar ao Início
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
