"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

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
  const start = (index / total) * 0.85;
  const end = start + 0.85 / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

export function ScrollRevealText({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.4", "end 0.4"],
  });

  const words = text.split(" ");

  return (
    <div ref={ref} className="px-6 md:px-16 lg:px-24 py-20 md:py-32">
      <div className="mx-auto max-w-3xl">
        <p
          className="font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          style={{ lineHeight: "2", wordSpacing: "0.12em" }}
        >
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
  );
}
