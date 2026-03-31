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
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto z-[5000] items-center justify-center",
          className
        )}
      >
        <div className="glass-strong flex items-center gap-1 px-2 py-2">
          {/* Logo */}
          <div className="flex items-center px-4">
            <span className="font-display text-sm font-bold text-white">
              the riverroute
            </span>
          </div>

          <div className="h-4 w-px bg-white/10" />

          {/* Nav links */}
          <div className="flex items-center">
            {navItems.map((navItem, idx: number) => (
              <a
                key={`link-${idx}`}
                href={navItem.link}
                className="rounded-full px-3.5 py-2 font-body text-[13px] font-medium text-white/50 transition-colors hover:text-white"
              >
                {navItem.name}
              </a>
            ))}
          </div>

          <div className="h-4 w-px bg-white/10" />

          {/* CTA */}
          <a
            href="#footer"
            className="rounded-full bg-white/10 border border-white/15 px-4 py-2 font-body text-[13px] font-medium text-white transition-all hover:bg-white/15"
          >
            Join Waitlist
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
