"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";

const headline =
  "India's Media and Entertainment industry is one of the largest in the world. The people who run it deserve software that actually understands them.";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#1a2744] to-[#0f1a2e]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,151,58,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,151,58,0.08),transparent_50%)]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Small label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 font-body text-xs font-medium uppercase tracking-widest text-gold">
            Built by the industry. For the industry.
          </span>
        </motion.div>

        <TextGenerateEffect
          words={headline}
          className="font-display text-3xl font-bold leading-[1.15] text-white md:text-5xl lg:text-[3.5rem] max-w-4xl"
          duration={0.3}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
          className="mt-8 max-w-xl font-body text-base text-white/60 md:text-lg leading-relaxed"
        >
          The Riverroute builds technology for the industry — from the inside.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#building"
            className="group relative rounded-full bg-gold px-8 py-3.5 font-body text-sm font-semibold text-navy transition-all duration-200 hover:shadow-[0_0_30px_rgba(201,151,58,0.3)] hover:scale-[1.02]"
          >
            Explore What We&apos;re Building
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 font-body text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/30"
          >
            Talk to the Founders
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-body text-[10px] uppercase tracking-widest text-white/30">
              Scroll
            </span>
            <IconChevronDown className="h-5 w-5 text-white/30" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-off-white to-transparent" />
    </section>
  );
}
