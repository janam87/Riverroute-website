"use client";

import { verticals } from "@/data/verticals";
import { Counter } from "@/components/counter";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "motion/react";

export function Industry() {
  return (
    <section id="industry" className="bg-off-white">
      <div className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Headline */}
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
                className="font-display text-5xl font-bold text-gold md:text-7xl lg:text-8xl"
              />
              <p className="mt-3 font-body text-lg text-mid-grey">
                India&apos;s M&amp;E sector in 2024
              </p>
              <p className="mt-1 font-body text-xs text-mid-grey/70">
                Source: FICCI-EY 2024
              </p>
            </div>
          </ScrollReveal>

          {/* Verticals Grid */}
          <ScrollReveal className="mt-16">
            <BentoGrid className="mx-auto max-w-5xl">
              {verticals.map((vertical, i) => (
                <BentoGridItem
                  key={vertical.name}
                  title={vertical.name}
                  description={vertical.size}
                  header={
                    <div className="flex h-full min-h-[4rem] items-center justify-center text-4xl">
                      {vertical.icon}
                    </div>
                  }
                  className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                  icon={
                    <span className="text-[10px] text-mid-grey/60">
                      {vertical.source}
                    </span>
                  }
                />
              ))}
            </BentoGrid>
          </ScrollReveal>

          {/* Supporting Copy */}
          <ScrollReveal className="mt-16">
            <p className="mx-auto max-w-3xl text-center font-body text-lg text-mid-grey leading-relaxed">
              Every one of these verticals runs on people, processes, and
              relationships. Almost none of it has software built specifically
              for it.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* The Gap Callout — Lamp Effect */}
      <LampContainer className="bg-navy">
        <motion.h3
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="mt-8 bg-gradient-to-br from-white to-white/60 bg-clip-text text-center font-display text-2xl font-bold tracking-tight text-transparent md:text-4xl lg:text-5xl max-w-4xl px-6"
        >
          &ldquo;Crores of rupees worth of equipment leaves warehouses every
          day. Every single piece of it tracked on WhatsApp and hope.&rdquo;
        </motion.h3>
      </LampContainer>

      {/* Transition Copy */}
      <ScrollReveal className="py-16 text-center bg-off-white">
        <p className="font-display text-2xl font-semibold text-navy md:text-3xl">
          We are changing that. From the inside.
        </p>
      </ScrollReveal>
    </section>
  );
}
