"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { GlassCard } from "@/components/glass-card";
import { SectionReveal } from "@/components/section-reveal";
import { ParallaxElement } from "@/components/parallax-section";
import { founders } from "@/data/founders";

export function Founders() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="founders" className="relative bg-black px-6 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <ParallaxElement speed={0.7}>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl mb-4">
              Built By Insiders.
            </h2>
            <p className="font-body text-base text-white/40 leading-relaxed max-w-2xl mb-16">
              Three decades inside Indian film and television.
              This is not a pivot. It is a culmination.
            </p>
          </ParallaxElement>
        </SectionReveal>

        <div ref={ref} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {founders.map((founder, idx) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, x: idx === 0 ? -60 : 60 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: idx === 0 ? -60 : 60 }
              }
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.15 }}
            >
              <ParallaxElement speed={0.8}>
                <GlassCard variant="strong" className="p-6">
                  <h3 className="font-display text-xl font-bold text-white">
                    {founder.fullName}
                  </h3>
                  <p className="mt-1 font-body text-xs text-white/40">
                    {founder.title} · {founder.role}
                  </p>

                  <p className="mt-3 font-body text-sm text-white/40 leading-relaxed line-clamp-3">
                    {founder.bio}
                  </p>
                </GlassCard>
              </ParallaxElement>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/founders"
            className="font-body text-sm text-white/30 hover:text-white/60 transition-colors"
          >
            meet the founders &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
