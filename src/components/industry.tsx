"use client";

import { verticals } from "@/data/verticals";
import { Counter } from "@/components/counter";
import { ScrollReveal } from "@/components/scroll-reveal";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "motion/react";
import {
  IconMovie,
  IconDeviceTv,
  IconAntenna,
  IconMusic,
  IconTicket,
  IconWand,
  IconDeviceGamepad2,
  IconWorldWww,
} from "@tabler/icons-react";
import { ReactElement } from "react";

const iconMap: Record<string, ReactElement> = {
  movie: <IconMovie className="h-7 w-7" />,
  "device-tv": <IconDeviceTv className="h-7 w-7" />,
  antenna: <IconAntenna className="h-7 w-7" />,
  music: <IconMusic className="h-7 w-7" />,
  ticket: <IconTicket className="h-7 w-7" />,
  wand: <IconWand className="h-7 w-7" />,
  "device-gamepad-2": <IconDeviceGamepad2 className="h-7 w-7" />,
  "world-www": <IconWorldWww className="h-7 w-7" />,
};

export function Industry() {
  return (
    <section id="industry">
      {/* Stats area */}
      <div className="bg-off-white py-28 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Section label */}
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold/50" />
              <span className="font-body text-xs font-medium uppercase tracking-widest text-gold">
                The Industry
              </span>
              <div className="h-px w-8 bg-gold/50" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-navy md:text-5xl text-center">
              This is not just about films
            </h2>
          </ScrollReveal>

          {/* Anchor Stat */}
          <ScrollReveal className="mt-16 text-center">
            <div className="inline-block">
              <Counter
                target={250000}
                prefix="₹"
                suffix=" Cr"
                duration={1.5}
                className="font-display text-5xl font-bold text-navy md:text-7xl lg:text-8xl"
              />
              <p className="mt-4 font-body text-base text-mid-grey">
                India&apos;s M&amp;E sector in 2024
              </p>
              <p className="mt-1 font-body text-xs text-mid-grey/50">
                Source: FICCI-EY 2024
              </p>
            </div>
          </ScrollReveal>

          {/* Verticals Grid — clean 4-column */}
          <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {verticals.map((vertical, i) => (
              <ScrollReveal key={vertical.name} delay={i * 0.05}>
                <div className="group relative overflow-hidden rounded-2xl border border-navy/[0.06] bg-white p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/[0.06] hover:-translate-y-1">
                  {/* Icon */}
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy/[0.04] text-navy/70 transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                    {iconMap[vertical.iconName]}
                  </div>

                  {/* Name */}
                  <h3 className="font-display text-base font-bold text-navy leading-tight">
                    {vertical.name}
                  </h3>

                  {/* Size */}
                  <p className="mt-2 font-display text-xl font-bold text-gold">
                    {vertical.size}
                  </p>

                  {/* Source */}
                  <p className="mt-1 font-body text-[10px] text-mid-grey/40">
                    {vertical.source}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Supporting Copy */}
          <ScrollReveal className="mt-20">
            <p className="mx-auto max-w-2xl text-center font-body text-lg text-mid-grey/80 leading-relaxed">
              Every one of these verticals runs on people, processes, and
              relationships. Almost none of it has software built specifically
              for it.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* The Gap Callout — Lamp Effect */}
      <LampContainer className="bg-navy">
        <motion.blockquote
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="mt-8 max-w-3xl px-6 text-center"
        >
          <p className="font-display text-2xl font-bold leading-snug text-white/90 md:text-4xl lg:text-[2.75rem] lg:leading-snug">
            &ldquo;Crores of rupees worth of equipment leaves warehouses every
            day. Every single piece of it tracked on WhatsApp and hope.&rdquo;
          </p>
        </motion.blockquote>
      </LampContainer>

      {/* Transition Copy */}
      <div className="bg-off-white py-20">
        <ScrollReveal className="text-center px-6">
          <p className="font-display text-2xl font-semibold text-navy md:text-3xl">
            We are changing that. From the inside.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
