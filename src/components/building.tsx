"use client";

import { GlassCard } from "@/components/glass-card";
import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";
import { ParallaxElement } from "@/components/parallax-section";
import { WaitlistForm } from "@/components/waitlist-form";
import { horizons } from "@/data/horizons";

export function Building() {
  return (
    <section id="building" className="relative bg-black px-6 py-32 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <ParallaxElement speed={0.7}>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl mb-4">
              what we&apos;re building.
            </h2>
            <p className="font-body text-base text-white/40 leading-relaxed max-w-2xl mb-16">
              We are building the software this industry has always deserved — designed for the people who keep it running, with their input, not in spite of it.
            </p>
          </ParallaxElement>
        </SectionReveal>

        <div className="space-y-4">
          {horizons.map((horizon, idx) => (
            <SectionRevealChild key={horizon.title} index={idx} staggerDelay={0.2}>
              <GlassCard hover className="p-7 md:p-8">
                <span className="font-body text-[11px] uppercase tracking-[0.15em] text-white/25">
                  {horizon.status}
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl mt-3 mb-4">
                  {horizon.title}
                </h3>
                <blockquote className="border-l border-white/10 pl-4 mb-4">
                  <p className="font-body text-sm italic text-white/35 leading-relaxed">
                    &ldquo;{horizon.quote}&rdquo;
                  </p>
                </blockquote>
                <p className="font-body text-sm text-white/50 leading-relaxed max-w-xl">
                  {horizon.description}
                </p>
              </GlassCard>
            </SectionRevealChild>
          ))}
        </div>

        {/* Waitlist CTA */}
        <SectionRevealChild index={3} staggerDelay={0.2}>
          <div className="mt-20 text-center">
            <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl mb-3">
              get early access.
            </h3>
            <p className="font-body text-sm text-muted mb-8">
              be the first to know when we launch.
            </p>
            <div className="flex justify-center">
              <WaitlistForm />
            </div>
          </div>
        </SectionRevealChild>
      </div>
    </section>
  );
}
