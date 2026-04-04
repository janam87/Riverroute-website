"use client";

import { GlassCard } from "@/components/glass-card";
import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";
import { ParallaxElement } from "@/components/parallax-section";
import { audiences } from "@/data/audiences";

export function WhoWeServe() {
  return (
    <section id="serve" className="relative bg-black px-6 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <ParallaxElement speed={0.7}>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl mb-4">
              Built For The Industry.
            </h2>
            <p className="font-body text-base text-white/40 leading-relaxed max-w-2xl mb-16">
              From the biggest studios to the smallest vendor — if you work in Indian M&amp;E, we are building for you.
            </p>
          </ParallaxElement>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, idx) => (
            <SectionRevealChild key={audience.title} index={idx} staggerDelay={0.08}>
              <GlassCard hover className="p-5 h-full flex flex-col">
                <h3 className="font-display text-sm font-bold text-white min-h-[40px]">
                  {audience.title}
                </h3>
                <p className="font-body text-xs text-white/40 leading-relaxed mt-2">
                  {audience.description}
                </p>
              </GlassCard>
            </SectionRevealChild>
          ))}
        </div>
      </div>
    </section>
  );
}
