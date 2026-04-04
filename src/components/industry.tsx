"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Counter } from "@/components/counter";
import { SectionReveal } from "@/components/section-reveal";
import { verticals } from "@/data/verticals";

const storyText =
  "An industry worth lakhs of crores. Millions of people. Thousands of productions every year. Equipment worth crores leaves warehouses every single day — tracked on WhatsApp and hope. Budgets are managed on spreadsheets. Crew is hired through phone calls and personal favours. The people who power this industry deserve software that actually understands how it works. We are building that. From the inside.";

const words = storyText.split(" ");

const row1 = verticals.slice(0, 4);
const row2 = verticals.slice(4);
const row1Doubled = [...row1, ...row1, ...row1];
const row2Doubled = [...row2, ...row2, ...row2];

function VerticalCard({ vertical }: { vertical: (typeof verticals)[0] }) {
  return (
    <div className="flex-shrink-0 w-[180px]">
      <div className="px-4 py-4 h-full">
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
  const start = 0.15 + (index / total) * 0.65;
  const end = start + 0.65 / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

export function Industry() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={sectionRef} id="industry" className="relative bg-black">
      <div className="min-h-[250vh]">
        <div className="sticky top-0 min-h-screen overflow-hidden flex flex-col justify-center">
          <div className="px-6 md:px-16 lg:px-24 py-20">
            <div className="mx-auto max-w-5xl w-full">
              {/* Heading + stat */}
              <SectionReveal>
                <h2 className="font-display text-xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl leading-snug">
                  <span className="block">India&apos;s Media and Entertainment industry</span>
                  <span className="block">is one of the largest in the world.</span>
                </h2>
              </SectionReveal>

              <SectionReveal>
                <div className="mt-6">
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

          {/* Marquee cards inside a bordered container */}
          <div className="mx-6 md:mx-16 lg:mx-24 mb-12">
            <div className="mx-auto max-w-5xl">
              <div className="rounded-2xl border border-white/10 overflow-hidden py-4">
                {/* Row 1 */}
                <div className="overflow-hidden">
                  <div className="flex gap-3 animate-marquee-slow">
                    {row1Doubled.map((v, idx) => (
                      <VerticalCard key={`r1-${idx}`} vertical={v} />
                    ))}
                  </div>
                </div>
                {/* Row 2 */}
                <div className="overflow-hidden mt-2">
                  <div className="flex gap-3 animate-marquee-slow-reverse">
                    {row2Doubled.map((v, idx) => (
                      <VerticalCard key={`r2-${idx}`} vertical={v} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CRED-style scroll reveal text — big, bold, display */}
          <div className="px-6 md:px-16 lg:px-24 pb-20">
            <div className="mx-auto max-w-3xl">
              <p className="font-display text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.4] tracking-tight" style={{ wordSpacing: "0.08em" }}>
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
        </div>
      </div>
    </section>
  );
}
