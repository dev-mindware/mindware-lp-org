"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function ServicePageBackground() {
  const { scrollYProgress } = useScroll();

  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY1 = useTransform(scrollYProgress, [0, 1], ["-5%", "25%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          style={{ y: bgY, rotate }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--primary),transparent_70%)] opacity-10 dark:opacity-20"
        />

        <motion.div
          style={{ y: textY1 }}
          className="absolute top-1/3 left-20 w-full opacity-10 dark:opacity-20"
        >
          <h2 className="text-[18vw] font-black leading-none uppercase tracking-tighter select-none whitespace-nowrap text-primary blur-[2px]">
            MINDWARE
          </h2>
        </motion.div>
      </div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX: springScroll }}
      />
    </>
  );
}
