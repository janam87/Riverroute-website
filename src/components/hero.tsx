"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const headline = "software for india's storytellers.";
const subtext =
  "the tools behind the scenes of a ₹2.5 lakh crore industry. built by people who've lived it.";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative h-screen overflow-hidden bg-black">
      {/* Background video */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-0 transition-opacity duration-1000"
          onLoadedData={(e) => {
            (e.target as HTMLVideoElement).classList.replace("opacity-0", "opacity-100");
          }}
          poster=""
        >
          {/* Video source — replace with actual video when available */}
          {/* <source src="/video/hero.mp4" type="video/mp4" /> */}
        </video>

        {/* Fallback gradient when no video */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-black to-[#111]" />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-start justify-center px-6 md:px-16 lg:px-24 max-w-5xl"
      >
        <TextGenerateEffect
          words={headline}
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
          duration={0.4}
          staggerDelay={0.08}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-8 max-w-lg font-body text-base text-[#444] md:text-lg leading-relaxed"
        >
          {subtext}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] uppercase tracking-widest text-white/20">
            Scroll
          </span>
          {/* CSS chevron — no icon library */}
          <div className="w-4 h-4 border-b border-r border-white/20 rotate-45 -mt-1" />
        </motion.div>
      </motion.div>

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
