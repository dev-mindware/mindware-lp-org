"use client";
import { motion } from "framer-motion";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

import { stats } from "@/data";

export function Stats() {
  return (
    <section className="py-12 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-4"
            >
              <div
                className={`${manrope.className} text-4xl md:text-5xl font-bold mb-2 tracking-tight`}
              >
                {stat.value}
              </div>
              <div
                className={`${manrope.className} text-sm md:text-base opacity-80 font-medium uppercase tracking-wide`}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
