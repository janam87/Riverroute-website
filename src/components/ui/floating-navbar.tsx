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
    icon?: JSX.Element;
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
        <div className="flex items-center gap-1 rounded-full border border-navy/10 bg-white/90 px-1.5 py-1.5 shadow-xl shadow-black/[0.08] backdrop-blur-xl">
          {/* Logo */}
          <div className="flex items-center px-3">
            <span className="font-display text-sm font-bold text-navy">
              TR
            </span>
          </div>

          <div className="h-4 w-px bg-navy/10" />

          {/* Nav links */}
          <div className="flex items-center">
            {navItems.map((navItem, idx: number) => (
              <a
                key={`link-${idx}`}
                href={navItem.link}
                className="relative rounded-full px-3.5 py-2 font-body text-[13px] font-medium text-navy/50 transition-colors hover:bg-navy/[0.04] hover:text-navy"
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block">{navItem.name}</span>
              </a>
            ))}
          </div>

          <div className="h-4 w-px bg-navy/10" />

          {/* CTA */}
          <a
            href="#contact"
            className="rounded-full bg-navy px-4 py-2 font-body text-[13px] font-semibold text-white transition-all hover:bg-navy/90"
          >
            Talk to Us
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
