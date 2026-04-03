"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { WavyBackground } from "@/components/ui/wavy-background";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative overflow-hidden bg-black">
      <WavyBackground
        containerClassName="h-screen"
        className="flex flex-col items-center justify-center text-center px-6 md:px-16 lg:px-24"
        backgroundFill="black"
        colors={["#38bdf8", "#6366f1", "#2dd4bf", "#818cf8", "#34d399"]}
        waveWidth={60}
        blur={8}
        speed="slow"
        waveOpacity={0.5}
      >
        <motion.div style={{ opacity }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-3xl font-bold leading-[1.15] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            The first OS for
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-display text-3xl font-bold leading-[1.15] tracking-tight text-white md:text-5xl lg:text-6xl mt-1"
          >
            Media &amp; Entertainment.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 max-w-2xl font-body text-lg text-white/40 md:text-xl leading-relaxed"
          >
            Built by the people who&apos;ve lived it.
          </motion.p>
        </motion.div>
      </WavyBackground>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] uppercase tracking-widest text-white/20">
            Scroll
          </span>
          <div className="w-4 h-4 border-b border-r border-white/20 rotate-45 -mt-1" />
        </motion.div>
      </motion.div>
    </section>
  );
}
