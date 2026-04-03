"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.4,
  staggerDelay = 0.08,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
}) => {
  // Pre-compute lines and global word indices to avoid mutable state during render
  const lines = words.split("\n");
  let offset = 0;
  const parsed = lines.map((line) => {
    const lineWords = line.split(" ");
    const withIndices = lineWords.map((word, i) => ({
      word,
      globalIdx: offset + i,
    }));
    offset += lineWords.length;
    return withIndices;
  });

  return (
    <div className={cn("font-bold", className)}>
      <div className="leading-snug tracking-wide">
        {parsed.map((lineWords, lineIdx) => (
          <div key={lineIdx}>
            {lineWords.map(({ word, globalIdx }) => (
              <motion.span
                key={`${globalIdx}-${word}`}
                initial={{
                  opacity: 0,
                  filter: filter ? "blur(8px)" : "none",
                }}
                animate={{
                  opacity: 1,
                  filter: filter ? "blur(0px)" : "none",
                }}
                transition={{
                  duration: duration,
                  delay: globalIdx * staggerDelay,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
