"use client";

import { Counter } from "@/components/counter";
import { GlassCard } from "@/components/glass-card";
import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";
import { ParallaxElement } from "@/components/parallax-section";
import { verticals } from "@/data/verticals";

export function Industry() {
  return (
    <section id="industry" className="relative bg-black px-6 py-32 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl mb-4">
            this is not just about films.
          </h2>
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

        {/* Verticals grid */}
        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
          {verticals.map((vertical, idx) => (
            <SectionRevealChild key={vertical.name} index={idx} staggerDelay={0.08}>
              <GlassCard hover className="px-5 py-5">
                <p className="font-body text-sm text-white/80 font-medium">
                  {vertical.name}
                </p>
                <p className="font-display text-lg font-bold text-white mt-2">
                  {vertical.size}
                </p>
                <p className="font-body text-[10px] text-white/20 mt-1">
                  {vertical.source}
                </p>
              </GlassCard>
            </SectionRevealChild>
          ))}
        </div>

        {/* Supporting copy */}
        <SectionRevealChild index={9}>
          <p className="mt-16 mx-auto max-w-2xl text-center font-body text-base text-white/40 leading-relaxed">
            Every one of these verticals runs on people, processes, and relationships.
            Almost none of it has software built specifically for it.
          </p>
        </SectionRevealChild>
      </div>
    </section>
  );
}
