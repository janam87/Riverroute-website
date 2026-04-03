"use client";

import { Counter } from "@/components/counter";
import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";
import { verticals } from "@/data/verticals";

export function Industry() {
  const doubled = [...verticals, ...verticals];

  return (
    <section id="industry" className="relative bg-black overflow-hidden">

      <div className="px-6 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="mx-auto max-w-5xl w-full">
          {/* Heading */}
          <SectionReveal>
            <h2 className="font-display text-xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl leading-snug">
              <span className="block">India&apos;s Media and Entertainment industry</span>
              <span className="block">is one of the largest in the world.</span>
            </h2>
          </SectionReveal>

          {/* Big stat */}
          <SectionReveal>
            <div className="mt-8">
              <Counter
                target={250000}
                prefix="₹"
                suffix=" Cr"
                duration={2}
                className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
              />
            </div>
            <p className="font-body text-sm text-white/30 mt-1">
              India&apos;s M&amp;E sector in 2024
            </p>
            <p className="font-body text-[11px] text-white/15">
              Source: FICCI-EY 2024
            </p>
          </SectionReveal>
        </div>
      </div>

      {/* Auto-scrolling marquee carousel */}
      <SectionRevealChild index={0} staggerDelay={0.2}>
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-marquee">
            {doubled.map((vertical, idx) => (
              <div
                key={`${vertical.name}-${idx}`}
                className="flex-shrink-0 w-[200px] md:w-[240px]"
              >
                <div
                  className="px-5 py-5 h-full relative overflow-hidden rounded-2xl border border-white/10"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)`,
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  <p className="font-body text-xs text-white/90 font-medium relative z-10">
                    {vertical.name}
                  </p>
                  <p className="font-display text-xl font-bold text-white mt-2 relative z-10">
                    {vertical.size}
                  </p>
                  <p className="font-body text-[10px] text-white/25 mt-1 relative z-10">
                    {vertical.source}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionRevealChild>

      {/* Closing statement */}
      <div className="px-6 md:px-16 lg:px-24 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionRevealChild index={1} staggerDelay={0.3}>
            <p className="max-w-3xl text-left font-body text-base text-white/30 md:text-lg leading-relaxed italic">
              &ldquo;Crores of rupees worth of equipment leaves warehouses every day.
              Every single piece of it tracked on WhatsApp and hope.&rdquo;
            </p>
            <p className="max-w-3xl text-left font-display text-lg text-white/60 md:text-xl lg:text-2xl leading-relaxed font-medium mt-8">
              The people who run this industry deserve software that actually understands them.
              We are changing that. From the inside.
            </p>
          </SectionRevealChild>
        </div>
      </div>

    </section>
  );
}
