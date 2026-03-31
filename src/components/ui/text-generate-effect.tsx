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
  const wordsArray = words.split(" ");

  return (
    <div className={cn("font-bold", className)}>
      <div className="leading-snug tracking-wide">
        <div>
          {wordsArray.map((word, idx) => (
            <motion.span
              key={word + idx}
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
                delay: idx * staggerDelay,
                ease: "easeOut",
              }}
              className="inline-block"
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};
