"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";

const headline =
  "India's Media and Entertainment industry is one of the largest in the world. The people who run it deserve software that actually understands them.";

export function Hero() {
  return (
    <section id="hero" className="relative">
      <AuroraBackground className="bg-navy dark:bg-navy">
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <TextGenerateEffect
            words={headline}
            className="font-display text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl max-w-5xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
            className="mt-6 max-w-2xl font-body text-lg text-white/80 md:text-xl"
          >
            The Riverroute builds technology for the industry — from the inside.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#building"
              className="rounded-full bg-gold px-8 py-3 font-body text-sm font-semibold text-navy transition-all duration-150 hover:scale-[1.03] hover:shadow-lg"
            >
              Explore What We&apos;re Building
            </a>
            <a
              href="#contact"
              className="rounded-full border-2 border-white px-8 py-3 font-body text-sm font-semibold text-white transition-all duration-150 hover:bg-white/10"
            >
              Talk to the Founders
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="absolute bottom-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <IconChevronDown className="h-8 w-8 text-white/50" />
            </motion.div>
          </motion.div>
        </div>
      </AuroraBackground>
    </section>
  );
}
