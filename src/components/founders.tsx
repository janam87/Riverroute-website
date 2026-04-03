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
    <section id="people" className="relative bg-black px-6 py-32 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <ParallaxElement speed={0.7}>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl mb-16">
              meet the crew.
            </h2>
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
                  {/* Photo placeholder */}
                  <div className="mx-auto mb-6 aspect-[3/4] max-w-[200px] overflow-hidden rounded-xl bg-white/[0.02]">
                    <div className="h-full w-full bg-gradient-to-b from-white/[0.03] to-transparent transition-transform duration-300 hover:scale-[1.03]" />
                  </div>

                  <div className="text-center">
                    <h3 className="font-display text-2xl font-bold text-white">
                      {founder.fullName}
                    </h3>
                    <p className="mt-1 font-body text-sm text-white/40">
                      {founder.title} · {founder.role}
                    </p>
                  </div>

                  <div className="mt-4 h-px w-full bg-white/[0.06]" />

                  <p className="mt-4 font-body text-sm text-white/40 leading-[1.7]">
                    {founder.bio}
                  </p>

                  {/* Credentials */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {founder.credentials.map((cred) => (
                      <span
                        key={cred}
                        className="font-body text-[11px] text-white/20 border border-white/[0.06] rounded-full px-3 py-1"
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
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
