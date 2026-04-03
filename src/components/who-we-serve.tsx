"use client";

import { GlassCard } from "@/components/glass-card";
import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";
import { ParallaxElement } from "@/components/parallax-section";
import { audiences } from "@/data/audiences";

export function WhoWeServe() {
  return (
    <section id="serve" className="relative bg-black px-6 py-32 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <ParallaxElement speed={0.7}>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl mb-16">
              who we serve.
            </h2>
          </ParallaxElement>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, idx) => (
            <SectionRevealChild key={audience.title} index={idx} staggerDelay={0.08}>
              <GlassCard hover className="p-6 h-full">
                <h3 className="font-display text-lg font-bold text-white mb-3">
                  {audience.title}
                </h3>
                <p className="font-body text-sm text-white/40 leading-relaxed">
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
