# Single-Page Scrolling Landing Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the landing page into a single continuous scrolling experience with 5 storytelling sections, bigger navbar, centered hero with prominent branding, horizontal-scroll industry carousel, and a new "Who We Serve" section.

**Architecture:** All changes happen on the existing single-page landing (`src/app/page.tsx`) and its section components. Nav links become anchor-based smooth scrollers. A new `WhoWeServe` component is created. Detail pages (`/about`, `/founders`, `/products/*`) remain untouched for "read more" deep dives.

**Tech Stack:** Next.js 14, Tailwind CSS, Framer Motion (motion/react), TypeScript

---

## File Structure

```
src/
├── app/
│   ├── page.tsx                          (MODIFY — add WhoWeServe section import)
│   ├── layout.tsx                        (no change — scroll-smooth already set)
├── components/
│   ├── hero.tsx                          (MODIFY — center content, new headline)
│   ├── industry.tsx                      (MODIFY — horizontal scroll carousel)
│   ├── building.tsx                      (no change — already correct)
│   ├── who-we-serve.tsx                  (CREATE — new section)
│   ├── founders.tsx                      (no change — already correct)
│   ├── footer.tsx                        (MODIFY — update links to anchors)
│   ├── ui/floating-navbar.tsx            (MODIFY — bigger, prominent logo)
├── data/
│   ├── nav-items.ts                      (MODIFY — anchor links)
```

---

## Tasks

### Task 1: Update nav items to anchor links and make navbar bigger

**Files:**
- Modify: `src/data/nav-items.ts`
- Modify: `src/components/ui/floating-navbar.tsx`

- [ ] **Step 1:** Update `src/data/nav-items.ts` — change all links to anchor-based:

```typescript
export const navItems = [
  { name: "The Industry", link: "#industry" },
  { name: "Products", link: "#building" },
  { name: "Who We Serve", link: "#serve" },
  { name: "Founders", link: "#founders" },
];
```

- [ ] **Step 2:** Update `src/components/ui/floating-navbar.tsx` — make navbar bigger with prominent logo:

Replace the entire component with:

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
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
          {/* Logo — prominent */}
          <a href="#hero" className="flex items-center px-4">
            <span className="font-display text-lg font-bold text-white tracking-tight">
              the riverroute
            </span>
          </a>

          <div className="h-5 w-px bg-white/10" />

          {/* Nav links — all anchors */}
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
```

Key changes: logo `text-sm` → `text-lg`, link text `text-[13px]` → `text-sm`, padding `py-2` → `py-3`, `px-2` → `px-3`, link padding `px-3.5 py-2` → `px-4 py-2.5`, divider `h-4` → `h-5`, logo uses `<a href="#hero">` instead of `<Link href="/">`, all nav items use `<a>` tags (no `Link` needed since all anchors), CTA padding `px-4 py-2` → `px-5 py-2.5`.

- [ ] **Step 3:** Verify the dev server shows the bigger navbar with anchor links. Click each link — should smooth-scroll to the section.

- [ ] **Step 4:** Commit:

```bash
git add src/data/nav-items.ts src/components/ui/floating-navbar.tsx
git commit -m "feat: bigger navbar with anchor-scroll nav links"
```

---

### Task 2: Redesign hero section — centered, prominent branding

**Files:**
- Modify: `src/components/hero.tsx`

- [ ] **Step 1:** Replace `src/components/hero.tsx` with centered layout and new copy:

```tsx
"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const tagline =
  "Built for Crew, by Crew — finally, a software that works the way you do!!";

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
      {/* Fallback gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-black to-[#111]" />

      {/* Background video */}
      <motion.div style={{ y: videoY }} className="absolute inset-0">
        <video autoPlay muted loop playsInline className="h-full w-full object-cover">
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* Content — centered */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        {/* Prominent brand name */}
        <TextGenerateEffect
          words="the riverroute"
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl xl:text-9xl"
          duration={0.5}
          staggerDelay={0.12}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 max-w-2xl font-body text-lg text-white/50 md:text-xl leading-relaxed"
        >
          {tagline}
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
          <div className="w-4 h-4 border-b border-r border-white/20 rotate-45 -mt-1" />
        </motion.div>
      </motion.div>

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
```

Key changes: content centered (`items-center justify-center text-center`), brand name "the riverroute" replaces old headline, very large text (`text-5xl` up to `xl:text-9xl`), tagline replaces old subtext, old headline/subtext removed, overlay slightly stronger (`bg-black/65`).

- [ ] **Step 2:** Verify hero renders centered with large "the riverroute" and tagline below.

- [ ] **Step 3:** Commit:

```bash
git add src/components/hero.tsx
git commit -m "feat: centered hero with prominent brand name and tagline"
```

---

### Task 3: Rework industry section — horizontal scroll carousel

**Files:**
- Modify: `src/components/industry.tsx`

- [ ] **Step 1:** Replace `src/components/industry.tsx` with horizontal carousel:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Counter } from "@/components/counter";
import { GlassCard } from "@/components/glass-card";
import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";
import { ParallaxElement } from "@/components/parallax-section";
import { verticals } from "@/data/verticals";

export function Industry() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section id="industry" className="relative bg-black px-6 py-32 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <ParallaxElement speed={0.7}>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl mb-4">
              this is not just about films.
            </h2>
            <p className="font-body text-base text-white/50 leading-relaxed max-w-2xl mt-6">
              India&apos;s Media and Entertainment industry is one of the largest in the world.
            </p>
          </ParallaxElement>
        </SectionReveal>

        {/* Big stat */}
        <SectionReveal>
          <ParallaxElement speed={0.5}>
            <div className="mt-12 mb-2">
              <Counter
                target={250000}
                prefix="₹"
                suffix=" Cr"
                duration={2}
                className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
              />
            </div>
            <p className="font-body text-sm text-white/30 mb-1">
              India&apos;s M&amp;E sector in 2024
            </p>
            <p className="font-body text-[11px] text-white/15">
              Source: FICCI-EY 2024
            </p>
          </ParallaxElement>
        </SectionReveal>

        {/* Horizontal scroll carousel */}
        <SectionRevealChild index={0} staggerDelay={0.2}>
          <div className="mt-16 -mx-6 md:-mx-16 lg:-mx-24">
            <div className="flex gap-4 overflow-x-auto px-6 md:px-16 lg:px-24 pb-4 scrollbar-hide snap-x snap-mandatory">
              {verticals.map((vertical, idx) => (
                <motion.div
                  key={vertical.name}
                  className="snap-start flex-shrink-0"
                  animate={{
                    width: expandedIdx === idx ? 320 : 200,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <GlassCard
                    hover
                    className="px-5 py-6 cursor-pointer h-full"
                  >
                    <div onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}>
                      <p className="font-body text-sm text-white/80 font-medium">
                        {vertical.name}
                      </p>
                      <p className="font-display text-2xl font-bold text-white mt-3">
                        {vertical.size}
                      </p>
                      <AnimatePresence>
                        {expandedIdx === idx && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <p className="font-body text-[11px] text-white/30 mt-3">
                              {vertical.source}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionRevealChild>

        {/* Closing statement */}
        <SectionRevealChild index={1} staggerDelay={0.3}>
          <p className="mt-16 mx-auto max-w-2xl text-center font-body text-base text-white/40 leading-relaxed">
            All of these verticals run on People, Processes and Relationships.
            Almost none of it has a software tailor made for them.
          </p>
        </SectionRevealChild>
      </div>
    </section>
  );
}
```

Key changes: opening text updated, verticals displayed as horizontal scroll carousel with `overflow-x-auto` and `snap-x`, cards are fixed-width and expand on click, closing text uses user's exact wording. Added `scrollbar-hide` utility (need to add CSS).

- [ ] **Step 2:** Add scrollbar-hide utility to `src/app/globals.css`. Add this after the existing `@layer components` block:

```css
@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

- [ ] **Step 3:** Verify the horizontal carousel scrolls, cards expand on click, and closing text appears.

- [ ] **Step 4:** Commit:

```bash
git add src/components/industry.tsx src/app/globals.css
git commit -m "feat: horizontal scroll carousel for industry verticals"
```

---

### Task 4: Create "Who We Serve" section

**Files:**
- Create: `src/components/who-we-serve.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1:** Create `src/components/who-we-serve.tsx`:

```tsx
"use client";

import { GlassCard } from "@/components/glass-card";
import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";
import { ParallaxElement } from "@/components/parallax-section";
import { audiences } from "@/data/audiences";

export function WhoWeServe() {
  return (
    <section id="serve" className="relative bg-black px-6 py-32 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <ParallaxElement speed={0.7}>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl mb-16">
              who we serve.
            </h2>
          </ParallaxElement>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, idx) => (
            <SectionRevealChild key={audience.title} index={idx} staggerDelay={0.08}>
              <GlassCard hover className="p-6 h-full">
                <h3 className="font-display text-lg font-bold text-white mb-3">
                  {audience.title}
                </h3>
                <p className="font-body text-sm text-white/40 leading-relaxed">
                  {audience.description}
                </p>
              </GlassCard>
            </SectionRevealChild>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2:** Update `src/app/page.tsx` to include the new section between Building and Founders:

```tsx
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Industry } from "@/components/industry";
import { Building } from "@/components/building";
import { WhoWeServe } from "@/components/who-we-serve";
import { Founders } from "@/components/founders";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Industry />
      <Building />
      <WhoWeServe />
      <Founders />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3:** Verify "Who We Serve" section appears between Products and Founders with 8 audience cards.

- [ ] **Step 4:** Commit:

```bash
git add src/components/who-we-serve.tsx src/app/page.tsx
git commit -m "feat: add Who We Serve section to landing page"
```

---

### Task 5: Update footer links to use anchors

**Files:**
- Modify: `src/components/footer.tsx`

- [ ] **Step 1:** Update the footer links section in `src/components/footer.tsx`. Replace the links `<div>` (the one with `className="flex gap-8 ..."`):

```tsx
<div className="flex gap-8 font-body text-xs text-white/30">
  <a href="#industry" className="transition-colors hover:text-white/60">
    The Industry
  </a>
  <a href="#building" className="transition-colors hover:text-white/60">
    Products
  </a>
  <a href="#serve" className="transition-colors hover:text-white/60">
    Who We Serve
  </a>
  <a href="#founders" className="transition-colors hover:text-white/60">
    Founders
  </a>
  <a
    href="https://www.linkedin.com/company/theriverroute"
    target="_blank"
    rel="noopener noreferrer"
    className="transition-colors hover:text-white/60"
  >
    LinkedIn
  </a>
  <Link href="/careers" className="transition-colors hover:text-white/60">
    Careers
  </Link>
</div>
```

This changes About → "The Industry" anchor, Founders → anchor, adds "Products" and "Who We Serve" anchors. Keeps LinkedIn external and Careers as page link. Privacy/Terms removed (were non-functional spans).

- [ ] **Step 2:** Verify footer links scroll to correct sections.

- [ ] **Step 3:** Commit:

```bash
git add src/components/footer.tsx
git commit -m "feat: update footer links to anchor-scroll navigation"
```

---

### Task 6: Build and verify

- [ ] **Step 1:** Run `npm run build` — expect clean build with no errors.

- [ ] **Step 2:** Run dev server and verify:
  - Hero: "the riverroute" centered and large, tagline below
  - Navbar: bigger, prominent logo, all links scroll to sections
  - Industry: horizontal scroll carousel, cards expand on click
  - Products: unchanged, "learn more" links go to detail pages
  - Who We Serve: 8 audience cards in grid
  - Founders: "meet the crew." heading, no "Built from the Inside", correct bios
  - Footer: no tagline, anchor links work

- [ ] **Step 3:** Commit any fixes if needed.
