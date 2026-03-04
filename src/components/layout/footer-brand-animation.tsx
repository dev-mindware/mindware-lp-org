"use client";

import { motion } from "framer-motion";

export function FooterBrandAnimation() {
  return (
    <motion.text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="middle"
      strokeWidth="1"
      className="font-black text-[11rem] tracking-tighter fill-transparent stroke-primary"
      // initial={{ strokeDasharray: "1000", strokeDashoffset: 1000 }}
      whileInView={{ strokeDashoffset: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 5, ease: "easeOut" }}
    >
      Mindware
    </motion.text>
  );
}
