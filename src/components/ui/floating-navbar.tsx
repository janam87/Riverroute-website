"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setHidden(false);
      } else {
        if (direction < 0) {
          setHidden(false);
        } else {
          setHidden(true);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto z-[5000] items-center justify-center",
          className
        )}
      >
        <div className="glass-strong flex items-center gap-2 px-3 py-3">
          {/* Logo */}
          <a href="#hero" className="flex items-center px-4">
            <span className="font-display text-lg font-bold tracking-tight text-white">
              the riverroute
            </span>
          </a>

          <div className="h-5 w-px bg-white/10" />

          {/* Nav links */}
          <div className="flex items-center">
            {navItems.map((navItem, idx: number) => (
              <a
                key={`link-${idx}`}
                href={navItem.link}
                className="rounded-full px-4 py-2.5 font-body text-sm font-medium text-white/50 transition-colors hover:text-white"
              >
                {navItem.name}
              </a>
            ))}
          </div>

          <div className="h-5 w-px bg-white/10" />

          {/* CTA */}
          <a
            href="#footer"
            className="rounded-full bg-white/10 border border-white/15 px-5 py-2.5 font-body text-sm font-medium text-white transition-all hover:bg-white/15"
          >
            Join Waitlist
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
