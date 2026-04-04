"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Counter } from "@/components/counter";
import { SectionReveal } from "@/components/section-reveal";
import { verticals } from "@/data/verticals";

const storyText =
  "An industry worth lakhs of crores. Millions of people. Thousands of productions every year. Equipment worth crores leaves warehouses every single day — tracked on WhatsApp and hope. Budgets are managed on spreadsheets. Crew is hired through phone calls and personal favours. The people who power this industry deserve software that actually understands how it works. We are building that. From the inside.";

const words = storyText.split(" ");

// Split verticals into 2 rows for alternating marquees
const row1 = verticals.slice(0, 4);
const row2 = verticals.slice(4);
const row1Doubled = [...row1, ...row1, ...row1];
const row2Doubled = [...row2, ...row2, ...row2];

function VerticalCard({ vertical }: { vertical: (typeof verticals)[0] }) {
  return (
    <div className="flex-shrink-0 w-[180px]">
      <div
        className="px-4 py-4 h-full rounded-xl border border-white/10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        }}
      >
        <p className="font-body text-[11px] text-white/70 font-medium">
          {vertical.name}
        </p>
        <p className="font-display text-lg font-bold text-white mt-1">
          {vertical.size}
        </p>
        <p className="font-body text-[9px] text-white/20 mt-0.5">
          {vertical.source}
        </p>
      </div>
    </div>
  );
}

export function Industry() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="industry"
      className="relative bg-black"
    >
      {/* The section needs enough height for the scroll effect */}
      <div className="min-h-[200vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          <div className="px-6 md:px-16 lg:px-24">
            <div className="mx-auto max-w-6xl w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left column — heading, stat, scroll-reveal text */}
                <div className="pt-20 lg:pt-24">
                  <SectionReveal>
                    <h2 className="font-display text-xl font-bold tracking-tight text-white md:text-2xl lg:text-3xl leading-snug">
                      <span className="block">
                        India&apos;s Media and Entertainment industry
                      </span>
                      <span className="block">
                        is one of the largest in the world.
                      </span>
                    </h2>
                  </SectionReveal>

                  <SectionReveal>
                    <div className="mt-6">
                      <Counter
                        target={250000}
                        prefix="₹"
                        suffix=" Cr"
                        duration={2}
                        className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl"
                      />
                    </div>
                    <p className="font-body text-xs text-white/30 mt-1">
                      India&apos;s M&amp;E sector in 2024
                    </p>
                    <p className="font-body text-[10px] text-white/15">
                      Source: FICCI-EY 2024
                    </p>
                  </SectionReveal>

                  {/* CRED-style scroll reveal text */}
                  <div className="mt-10">
                    <p className="font-display text-lg md:text-xl lg:text-2xl font-medium leading-relaxed">
                      {words.map((word, i) => (
                        <ScrollWord
                          key={i}
                          word={word}
                          index={i}
                          total={words.length}
                          scrollYProgress={scrollYProgress}
                        />
                      ))}
                    </p>
                  </div>
                </div>

                {/* Right column — sticky cards with marquee rows */}
                <div className="hidden lg:flex flex-col justify-center gap-4 pt-20 lg:pt-24">
                  {/* Row 1 — scroll left */}
                  <div className="overflow-hidden">
                    <div className="flex gap-3 animate-marquee-slow">
                      {row1Doubled.map((v, idx) => (
                        <VerticalCard key={`r1-${idx}`} vertical={v} />
                      ))}
                    </div>
                  </div>

                  {/* Row 2 — scroll right */}
                  <div className="overflow-hidden">
                    <div className="flex gap-3 animate-marquee-slow-reverse">
                      {row2Doubled.map((v, idx) => (
                        <VerticalCard key={`r2-${idx}`} vertical={v} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: show cards below as horizontal scroll */}
          <div className="lg:hidden mt-10 overflow-hidden">
            <div className="flex gap-3 animate-marquee-slow px-6">
              {row1Doubled.map((v, idx) => (
                <VerticalCard key={`m-${idx}`} vertical={v} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollWord({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each word lights up as scroll progresses from 0.1 to 0.9
  const start = 0.1 + (index / total) * 0.7;
  const end = start + 0.7 / total;

  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}
