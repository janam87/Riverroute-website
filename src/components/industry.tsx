"use client";

import { Counter } from "@/components/counter";
import { GlassCard } from "@/components/glass-card";
import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";
import { ParallaxElement } from "@/components/parallax-section";
import { verticals } from "@/data/verticals";

export function Industry() {
  return (
    <section id="industry" className="relative bg-black px-6 py-32 md:px-16 lg:px-24">
      <SectionReveal className="mx-auto max-w-5xl">
        {/* Big stat with parallax */}
        <ParallaxElement speed={0.5}>
          <div className="mb-6">
            <Counter
              target={250000}
              prefix="₹"
              suffix=" Cr"
              duration={2}
              className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
            />
          </div>
        </ParallaxElement>

        <SectionRevealChild index={1}>
          <p className="max-w-lg font-body text-base text-muted leading-relaxed md:text-lg mb-20">
            india&apos;s media &amp; entertainment industry. fragmented. underserved. ready.
          </p>
        </SectionRevealChild>

        {/* Verticals grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {verticals.map((name, idx) => (
            <SectionRevealChild key={name} index={idx + 2} staggerDelay={0.1}>
              <GlassCard hover className="px-5 py-4 text-center">
                <span className="font-body text-sm text-white/70">{name}</span>
              </GlassCard>
            </SectionRevealChild>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
