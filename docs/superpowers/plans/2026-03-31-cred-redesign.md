# CRED-Style Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Riverroute website from a navy/gold premium theme to a CRED-inspired pure black cinematic aesthetic with liquid glass, parallax, background video, and dramatic section reveals.

**Architecture:** Rewrite all section components against a new black/white/grey design system. Replace the current alternating navy/off-white sections with a unified black background. Add new reusable components for glass cards, parallax sections, and section reveals. Remove unused Aceternity UI components and icon dependencies.

**Tech Stack:** Next.js 14, Tailwind CSS, Framer Motion (motion/react), HTML5 Video, CSS backdrop-filter

---

### Task 1: Foundation — Tailwind Config + Global CSS + Layout

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Rewrite tailwind.config.ts**

Replace the entire config with the new black/white/grey design system. Remove navy, gold, off-white, aurora animation.

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        muted: "#444444",
        "muted-light": "#666666",
        subtle: "#1a1a1a",
        "subtle-border": "#151515",
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Rewrite globals.css**

Replace the entire file with new base styles — black background, white text, glass utility classes.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-subtle;
  }
  body {
    @apply bg-background text-foreground font-body;
  }
  html {
    @apply scroll-smooth;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-display;
  }
}

@layer components {
  .glass {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
  }

  .glass-strong {
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
  }

  .glass-input {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}
```

- [ ] **Step 3: Update layout.tsx body class**

Change the body className from `"font-body text-dark antialiased"` to `"font-body text-foreground antialiased bg-background"`.

```tsx
<body className="font-body text-foreground antialiased bg-background">{children}</body>
```

- [ ] **Step 4: Verify the build compiles**

Run: `npm run build`
Expected: Build succeeds (may have warnings about unused components — that's fine for now)

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts src/app/globals.css src/app/layout.tsx
git commit -m "feat: replace design system with black/white cinematic theme + glass utilities"
```

---

### Task 2: Reusable Components — Section Reveal + Parallax + Glass Card

**Files:**
- Create: `src/components/section-reveal.tsx`
- Create: `src/components/parallax-section.tsx`
- Create: `src/components/glass-card.tsx`
- Modify: `src/components/scroll-reveal.tsx`

- [ ] **Step 1: Create section-reveal.tsx**

Enhanced scroll reveal with staggered children animation.

```tsx
"use client";

import { motion, useInView } from "motion/react";
import { ReactNode, useRef } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function SectionReveal({
  children,
  className,
  staggerDelay = 0.15,
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
```

- [ ] **Step 2: Create parallax-section.tsx**

Section wrapper with parallax scroll behavior using Framer Motion.

```tsx
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ReactNode, useRef } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number; // 0.0 = no movement, 1.0 = normal scroll, <1 = slower (parallax)
}

export function ParallaxSection({
  children,
  className,
  speed = 0.5,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, (1 - speed) * -200]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

interface ParallaxElementProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxElement({
  children,
  className,
  speed = 0.5,
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, (1 - speed) * -150]);

  return (
    <motion.div ref={ref} style={{ y, willChange: "transform" }} className={className}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create glass-card.tsx**

Reusable liquid glass container.

```tsx
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "normal" | "strong";
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = "normal",
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        variant === "strong" ? "glass-strong" : "glass",
        hover &&
          "transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06]",
        className
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/components/section-reveal.tsx src/components/parallax-section.tsx src/components/glass-card.tsx
git commit -m "feat: add section-reveal, parallax-section, and glass-card components"
```

---

### Task 3: Floating Glass Navbar

**Files:**
- Modify: `src/components/ui/floating-navbar.tsx`
- Modify: `src/components/navbar.tsx`
- Modify: `src/data/nav-items.ts`

- [ ] **Step 1: Update nav-items.ts**

Replace with the new 5-section nav structure. Remove "Who We Serve" and "Careers" from main nav.

```typescript
export const navItems = [
  { name: "Industry", link: "#industry" },
  { name: "Building", link: "#building" },
  { name: "People", link: "#people" },
];
```

- [ ] **Step 2: Rewrite floating-navbar.tsx as liquid glass**

Replace the white pill navbar with a frosted glass dark navbar. Remove icon support — text only.

```tsx
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
```

- [ ] **Step 3: Update navbar.tsx wrapper**

Read current file first. Update to remove icon imports and pass simplified nav items.

```tsx
"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data/nav-items";

export function Navbar() {
  return <FloatingNav navItems={navItems} />;
}
```

- [ ] **Step 4: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/data/nav-items.ts src/components/ui/floating-navbar.tsx src/components/navbar.tsx
git commit -m "feat: rewrite navbar as liquid glass with simplified nav items"
```

---

### Task 4: Hero Section with Background Video

**Files:**
- Modify: `src/components/hero.tsx`
- Modify: `src/components/ui/text-generate-effect.tsx`

- [ ] **Step 1: Update text-generate-effect.tsx**

Slow down the animation timing. Change stagger to 80ms per word.

```tsx
"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
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
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration,
        delay: stagger(staggerDelay),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0"
              style={{
                filter: filter ? "blur(8px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="leading-snug tracking-wide">
        {renderWords()}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Rewrite hero.tsx**

Complete rewrite with background video, dark overlay, word-by-word reveal, no CTAs, parallax video.

```tsx
"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const headline = "software for india's storytellers.";
const subtext =
  "the tools behind the scenes of a ₹2.5 lakh crore industry. built by people who've lived it.";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative h-screen overflow-hidden bg-black">
      {/* Background video */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-0 transition-opacity duration-1000"
          onLoadedData={(e) => {
            (e.target as HTMLVideoElement).classList.replace("opacity-0", "opacity-100");
          }}
          poster=""
        >
          {/* Video source — replace with actual video when available */}
          {/* <source src="/video/hero.mp4" type="video/mp4" /> */}
        </video>

        {/* Fallback gradient when no video */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-black to-[#111]" />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-start justify-center px-6 md:px-16 lg:px-24 max-w-5xl"
      >
        <TextGenerateEffect
          words={headline}
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
          duration={0.4}
          staggerDelay={0.08}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-8 max-w-lg font-body text-base text-[#444] md:text-lg leading-relaxed"
        >
          {subtext}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] uppercase tracking-widest text-white/20">
            Scroll
          </span>
          {/* CSS chevron — no icon library */}
          <div className="w-4 h-4 border-b border-r border-white/20 rotate-45 -mt-1" />
        </motion.div>
      </motion.div>

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
```

- [ ] **Step 3: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/hero.tsx src/components/ui/text-generate-effect.tsx
git commit -m "feat: cinematic hero with video background, parallax, word-by-word reveal"
```

---

### Task 5: Industry Section

**Files:**
- Modify: `src/components/industry.tsx`
- Modify: `src/data/verticals.ts`

- [ ] **Step 1: Simplify verticals.ts**

Remove `iconName` and `size`/`source` fields. Just names for the minimal grid.

```typescript
export const verticals = [
  "Film",
  "OTT",
  "Television",
  "Music",
  "Live Events",
  "Animation",
  "Gaming",
  "Digital",
];
```

- [ ] **Step 2: Rewrite industry.tsx**

Replace the current section (which uses Lamp effect, icon cards, etc.) with the cinematic black version: big counter, bold statement, flat glass grid.

```tsx
"use client";

import { Counter } from "@/components/counter";
import { GlassCard } from "@/components/glass-card";
import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";
import { ParallaxElement } from "@/components/parallax-section";
import { verticals } from "@/data/verticals";

export function Industry() {
  return (
    <section id="industry" className="relative bg-black px-6 py-32 md:px-16 lg:px-24">
      <SectionReveal className="mx-auto max-w-5xl">
        {/* Big stat with parallax */}
        <ParallaxElement speed={0.5}>
          <div className="mb-6">
            <Counter
              target={250000}
              prefix="₹"
              suffix=" Cr"
              duration={2}
              className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
            />
          </div>
        </ParallaxElement>

        <SectionRevealChild index={1}>
          <p className="max-w-lg font-body text-base text-muted leading-relaxed md:text-lg mb-20">
            india&apos;s media &amp; entertainment industry. fragmented. underserved. ready.
          </p>
        </SectionRevealChild>

        {/* Verticals grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {verticals.map((name, idx) => (
            <SectionRevealChild key={name} index={idx + 2} staggerDelay={0.1}>
              <GlassCard hover className="px-5 py-4 text-center">
                <span className="font-body text-sm text-white/70">{name}</span>
              </GlassCard>
            </SectionRevealChild>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
```

- [ ] **Step 3: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/industry.tsx src/data/verticals.ts
git commit -m "feat: cinematic industry section with counter parallax and glass grid"
```

---

### Task 6: Building Section + Waitlist Form

**Files:**
- Create: `src/components/waitlist-form.tsx`
- Modify: `src/components/building.tsx`
- Modify: `src/data/horizons.ts`

- [ ] **Step 1: Simplify horizons.ts**

Update with audience context woven into descriptions. Remove `statusVariant`.

```typescript
export interface Horizon {
  title: string;
  description: string;
  status: string;
}

export const horizons: Horizon[] = [
  {
    title: "the vendor layer.",
    description:
      "equipment discovery, comparison, and booking — unified for the first time. built for rental vendors who power every production in the country.",
    status: "building now",
  },
  {
    title: "the production layer.",
    description:
      "budgets, schedules, call sheets — transparent, real-time, connected. for studios, producers, and coordinators who hold productions together.",
    status: "next",
  },
  {
    title: "the people layer.",
    description:
      "a professional network for the industry — verified, credible, useful. connecting crew, technicians, and filmmakers across the country.",
    status: "horizon",
  },
];
```

- [ ] **Step 2: Create waitlist-form.tsx**

Simple email capture form used in both building section and footer.

```tsx
"use client";

import { useState, FormEvent } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "waitlist", email }),
      });
      setSubmitted(true);
    } catch {
      // silent fail — form stays open for retry
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <p className="font-body text-sm text-white/50">
        you&apos;re on the list. we&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your email"
        className="glass-input rounded-lg px-5 py-3.5 font-body text-sm text-white placeholder-white/30 outline-none focus:border-white/20 w-full sm:w-72"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-white px-6 py-3.5 font-body text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
      >
        {loading ? "..." : "join"}
      </button>
    </form>
  );
}
```

- [ ] **Step 3: Rewrite building.tsx**

Three glass horizon cards with staggered reveal, plus inline waitlist CTA.

```tsx
"use client";

import { GlassCard } from "@/components/glass-card";
import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";
import { ParallaxElement } from "@/components/parallax-section";
import { WaitlistForm } from "@/components/waitlist-form";
import { horizons } from "@/data/horizons";

export function Building() {
  return (
    <section id="building" className="relative bg-black px-6 py-32 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <ParallaxElement speed={0.7}>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl mb-16">
              what we&apos;re building.
            </h2>
          </ParallaxElement>
        </SectionReveal>

        <div className="space-y-4">
          {horizons.map((horizon, idx) => (
            <SectionRevealChild key={horizon.title} index={idx} staggerDelay={0.2}>
              <GlassCard hover className="p-7 md:p-8">
                <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl mb-3">
                  {horizon.title}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed max-w-xl mb-3">
                  {horizon.description}
                </p>
                <span className="font-body text-[11px] uppercase tracking-[0.15em] text-white/20">
                  {horizon.status}
                </span>
              </GlassCard>
            </SectionRevealChild>
          ))}
        </div>

        {/* Waitlist CTA */}
        <SectionRevealChild index={3} staggerDelay={0.2}>
          <div className="mt-20 text-center">
            <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl mb-3">
              get early access.
            </h3>
            <p className="font-body text-sm text-muted mb-8">
              join the waitlist. we&apos;ll reach out when it&apos;s your turn.
            </p>
            <div className="flex justify-center">
              <WaitlistForm />
            </div>
          </div>
        </SectionRevealChild>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/components/waitlist-form.tsx src/components/building.tsx src/data/horizons.ts
git commit -m "feat: glass horizon cards with waitlist form in building section"
```

---

### Task 7: Founders Section

**Files:**
- Modify: `src/components/founders.tsx`
- Modify: `src/data/founders.ts`

- [ ] **Step 1: Simplify founders.ts**

Keep essential data, remove long bios and IMDb links.

```typescript
export interface Founder {
  name: string;
  role: string;
  credentials: string[];
  image: string;
}

export const founders: Founder[] = [
  {
    name: "Varun",
    role: "Co-founder · Film Producer · 20+ years in M&E",
    credentials: ["Red Chillies Entertainment", "Yamini Pictures", "NFDC Delhi"],
    image: "/images/placeholder-varun.webp",
  },
  {
    name: "Ria",
    role: "Co-founder · Production Operations · Show Coordinator",
    credentials: [
      "Delhi Crime S2 (Netflix)",
      "Class of 83 (Red Chillies)",
      "Saanvi Nayak Films",
    ],
    image: "/images/placeholder-ria.webp",
  },
];
```

- [ ] **Step 2: Rewrite founders.tsx**

Cinematic glass cards, left/right slide-in, parallax drift, hover zoom on photos.

```tsx
"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { GlassCard } from "@/components/glass-card";
import { SectionReveal } from "@/components/section-reveal";
import { ParallaxElement } from "@/components/parallax-section";
import { founders } from "@/data/founders";

export function Founders() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="people" className="relative bg-black px-6 py-32 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <ParallaxElement speed={0.7}>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl mb-16">
              the people.
            </h2>
          </ParallaxElement>
        </SectionReveal>

        <div ref={ref} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {founders.map((founder, idx) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, x: idx === 0 ? -60 : 60 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: idx === 0 ? -60 : 60 }
              }
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.15 }}
            >
              <ParallaxElement speed={0.8}>
                <GlassCard variant="strong" className="p-6 text-center">
                  {/* Photo placeholder */}
                  <div className="mx-auto mb-6 aspect-[3/4] max-w-[240px] overflow-hidden rounded-xl bg-white/[0.02]">
                    <div className="h-full w-full bg-gradient-to-b from-white/[0.03] to-transparent transition-transform duration-300 hover:scale-[1.03]" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white">
                    {founder.name}
                  </h3>
                  <p className="mt-2 font-body text-sm text-muted">
                    {founder.role}
                  </p>

                  {/* Credentials */}
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {founder.credentials.map((cred) => (
                      <span
                        key={cred}
                        className="font-body text-[11px] text-white/20"
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </ParallaxElement>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/founders.tsx src/data/founders.ts
git commit -m "feat: cinematic founders section with glass cards and slide-in animation"
```

---

### Task 8: Footer

**Files:**
- Modify: `src/components/footer.tsx`

- [ ] **Step 1: Rewrite footer.tsx**

Simple footer — CTA section + minimal text links. No icons.

```tsx
"use client";

import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";
import { WaitlistForm } from "@/components/waitlist-form";

export function Footer() {
  return (
    <footer id="footer" className="relative bg-black px-6 pt-32 pb-12 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        {/* CTA */}
        <SectionReveal>
          <div className="text-center mb-24">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl mb-4">
              get early access.
            </h2>
            <p className="font-body text-sm text-muted mb-10">
              join the waitlist. we&apos;ll reach out when it&apos;s your turn.
            </p>
            <div className="flex justify-center">
              <WaitlistForm />
            </div>
          </div>
        </SectionReveal>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-12" />

        {/* Bottom */}
        <SectionRevealChild index={0}>
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <span className="font-display text-sm font-bold text-white/40">
              the riverroute
            </span>

            <div className="flex gap-8 font-body text-xs text-white/30">
              <a
                href="https://www.linkedin.com/company/theriverroute"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white/60"
              >
                LinkedIn
              </a>
              <a href="/careers" className="transition-colors hover:text-white/60">
                Careers
              </a>
              <span>Privacy</span>
              <span>Terms</span>
            </div>

            <span className="font-body text-xs text-white/20">
              &copy; {new Date().getFullYear()} The Riverroute LLP
            </span>
          </div>
        </SectionRevealChild>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/footer.tsx
git commit -m "feat: minimal cinematic footer with waitlist CTA and text-only links"
```

---

### Task 9: Update Page + Remove Unused Components

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/components/who-we-serve.tsx`
- Delete: `src/components/contact.tsx`
- Delete: `src/components/ui/aurora-background.tsx`
- Delete: `src/components/ui/lamp.tsx`
- Delete: `src/components/ui/3d-card.tsx`
- Delete: `src/components/ui/bento-grid.tsx`

- [ ] **Step 1: Update page.tsx**

Remove WhoWeServe and Contact imports. Update to new 5-section structure.

```tsx
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Industry } from "@/components/industry";
import { Building } from "@/components/building";
import { Founders } from "@/components/founders";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Industry />
      <Building />
      <Founders />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Delete unused components**

```bash
rm src/components/who-we-serve.tsx
rm src/components/contact.tsx
rm src/components/ui/aurora-background.tsx
rm src/components/ui/lamp.tsx
rm src/components/ui/3d-card.tsx
rm src/components/ui/bento-grid.tsx
```

- [ ] **Step 3: Delete old scroll-reveal.tsx (replaced by section-reveal.tsx)**

```bash
rm src/components/scroll-reveal.tsx
```

- [ ] **Step 4: Verify full build**

Run: `npm run build`
Expected: Build succeeds with no import errors

- [ ] **Step 5: Run dev server and verify visually**

Run: `npm run dev`
Open http://localhost:3000 and verify:
- Black background throughout
- Glass navbar appears on scroll up
- Hero has word-by-word text reveal
- Industry section has counter + glass grid
- Building section has 3 glass horizon cards + waitlist
- Founders has 2 glass cards
- Footer has CTA + minimal links
- All sections have scroll reveal animations
- No icons anywhere

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: complete CRED-style redesign — remove unused components, update page structure"
```

---

### Task 10: Cleanup — Remove Unused Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Remove @tabler/icons-react and lucide-react**

These icon libraries are no longer used anywhere.

```bash
npm uninstall @tabler/icons-react lucide-react
```

- [ ] **Step 2: Verify build still passes**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: remove unused icon dependencies"
```
