"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/glass-card";
import { ScrollRevealText } from "@/components/scroll-reveal-text";
import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";
import Link from "next/link";
import { horizons } from "@/data/horizons";

const horizon = horizons[2]; // people

export default function PeoplePage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      {/* Back button */}
      <div className="px-6 pt-28 md:px-16 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="inline-flex items-center gap-2 font-body text-sm text-white/40 hover:text-white/70 transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="px-6 pt-12 pb-32 md:px-16 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <SectionReveal>
            {/* Status badge */}
            <div className="mb-8">
              <span className="inline-block font-body text-xs uppercase tracking-widest text-white/40 border border-white/10 rounded-full px-4 py-1.5">
                {horizon.status}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl mb-12">
              {horizon.title}
            </h1>

            {/* Problem quote */}
            <blockquote className="border-l-2 border-white/20 pl-6 md:pl-8">
              <p className="font-body text-lg text-white/50 leading-relaxed md:text-xl lg:text-2xl italic">
                &ldquo;{horizon.quote}&rdquo;
              </p>
            </blockquote>
          </SectionReveal>
        </div>
      </section>

      {/* Description — scroll reveal */}
      <ScrollRevealText text={horizon.longDescription} />

      {/* Features */}
      <section className="px-6 py-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <SectionReveal>
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl mb-12">
              what it does.
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {horizon.features.map((feature, index) => (
              <SectionRevealChild key={feature} index={index}>
                <GlassCard hover className="h-full p-6">
                  <div className="flex flex-col gap-3 h-full">
                    <span className="font-body text-xs text-white/20 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="font-body text-sm text-white/70 leading-relaxed">
                      {feature}
                    </p>
                  </div>
                </GlassCard>
              </SectionRevealChild>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
