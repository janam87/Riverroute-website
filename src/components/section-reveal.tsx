"use client";

import { motion, useInView } from "motion/react";
import { ReactNode, useRef } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
}

export function SectionReveal({
  children,
  className,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SectionRevealChildProps {
  children: ReactNode;
  className?: string;
  index?: number;
  staggerDelay?: number;
}

export function SectionRevealChild({
  children,
  className,
  index = 0,
  staggerDelay = 0.15,
}: SectionRevealChildProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * staggerDelay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
