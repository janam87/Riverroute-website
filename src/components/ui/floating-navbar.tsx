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
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      // Show glass background after scrolling past ~10% of page (past hero)
      setScrolled(current > 0.08);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 inset-x-0 z-[5000] px-6 py-5 md:px-16 lg:px-24 transition-all duration-300",
          scrolled && "glass-strong py-4",
          className
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo — left */}
          <a href="/" className="flex-shrink-0">
            <span className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
              The Riverroute
            </span>
          </a>

          {/* Nav links — center */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((navItem, idx: number) => (
              <a
                key={`link-${idx}`}
                href={navItem.link}
                className="rounded-full px-4 py-2 font-body text-sm font-medium text-white/50 transition-colors hover:text-white"
              >
                {navItem.name}
              </a>
            ))}
          </div>

          {/* CTA — right */}
          <a
            href="/#footer"
            className="rounded-full bg-white/10 border border-white/15 px-5 py-2.5 font-body text-sm font-medium text-white transition-all hover:bg-white/15"
          >
            Join Waitlist
          </a>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};
