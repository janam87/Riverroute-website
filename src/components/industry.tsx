"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Counter } from "@/components/counter";
import { GlassCard } from "@/components/glass-card";
import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";
import { ParallaxElement } from "@/components/parallax-section";
import { verticals } from "@/data/verticals";

export function Industry() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="industry" className="relative bg-black px-6 py-32 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        {/* Heading + opening text */}
        <SectionReveal>
          <ParallaxElement speed={0.3}>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl mb-4">
              this is not just about films.
            </h2>
            <p className="font-body text-base text-white/50 leading-relaxed max-w-2xl mt-6">
              India&apos;s Media and Entertainment industry is one of the largest in the world.
            </p>
          </ParallaxElement>
        </SectionReveal>

        {/* Big stat with parallax */}
        <SectionReveal>
          <ParallaxElement speed={0.5}>
            <div className="mt-12 mb-2">
              <Counter
                target={250000}
                prefix="₹"
                suffix=" Cr"
                duration={2}
                className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
              />
            </div>
            <p className="font-body text-sm text-white/30 mb-1">
              India&apos;s M&amp;E sector in 2024
            </p>
            <p className="font-body text-[11px] text-white/15">
              Source: FICCI-EY 2024
            </p>
          </ParallaxElement>
        </SectionReveal>

        {/* Horizontal scroll carousel */}
        <SectionRevealChild index={0} staggerDelay={0.2}>
          <div className="mt-16 -mx-6 md:-mx-16 lg:-mx-24">
            <div className="flex gap-4 overflow-x-auto px-6 md:px-16 lg:px-24 pb-4 scrollbar-hide snap-x snap-mandatory">
              {verticals.map((vertical, idx) => (
                <motion.div
                  key={vertical.name}
                  className="snap-start flex-shrink-0"
                  animate={{ width: expanded === idx ? 320 : 200 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => setExpanded(expanded === idx ? null : idx)}
                >
                  <GlassCard hover className="px-5 py-6 cursor-pointer h-full">
                    <p className="font-body text-sm text-white/80 font-medium">
                      {vertical.name}
                    </p>
                    <p className="font-display text-2xl font-bold text-white mt-3">
                      {vertical.size}
                    </p>
                    <AnimatePresence>
                      {expanded === idx && (
                        <motion.p
                          className="font-body text-[11px] text-white/30 mt-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {vertical.source}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionRevealChild>

        {/* Closing statement */}
        <SectionRevealChild index={1} staggerDelay={0.3}>
          <p className="mt-16 mx-auto max-w-2xl text-center font-body text-base text-white/40 leading-relaxed">
            All of these verticals run on People, Processes and Relationships.
            Almost none of it has a software tailor made for them.
          </p>
        </SectionRevealChild>
      </div>
    </section>
  );
}
