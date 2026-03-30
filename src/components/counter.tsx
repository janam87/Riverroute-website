"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

function formatIndianNumber(num: number): string {
  const str = num.toString();
  const lastThree = str.slice(-3);
  const rest = str.slice(0, -3);
  if (rest === "") return lastThree;
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return formatted + "," + lastThree;
}

export function Counter({
  target,
  prefix = "",
  suffix = "",
  duration = 1.5,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatIndianNumber(count)}
      {suffix}
    </span>
  );
}
