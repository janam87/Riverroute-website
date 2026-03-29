# The Riverroute Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete frontend for The Riverroute's public website — a single-scroll homepage with 6 sections and a standalone careers page.

**Architecture:** Next.js 14 App Router with Aceternity UI for animated components and shadcn/ui for form primitives. All content hardcoded. Form submissions POST to a local API route (Supabase wired up later). Two routes: `/` (homepage) and `/careers`.

**Tech Stack:** Next.js 14, Tailwind CSS, Aceternity UI, shadcn/ui, Framer Motion, TypeScript

**Design Spec:** `docs/superpowers/specs/2026-03-29-riverroute-website-design.md`

---

## File Structure

```
Riverroute-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout — fonts, metadata, global styles
│   │   ├── page.tsx                # Homepage — assembles all sections
│   │   ├── globals.css             # Tailwind + custom CSS + aurora keyframes
│   │   ├── careers/
│   │   │   └── page.tsx            # Careers page
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts        # Contact form API (stub, Supabase later)
│   ├── components/
│   │   ├── ui/                     # Aceternity + shadcn primitives (auto-generated)
│   │   │   ├── aurora-background.tsx
│   │   │   ├── floating-navbar.tsx
│   │   │   ├── text-generate-effect.tsx
│   │   │   ├── 3d-card.tsx
│   │   │   ├── lamp.tsx
│   │   │   ├── bento-grid.tsx
│   │   │   ├── focus-cards.tsx
│   │   │   ├── tabs.tsx            # Aceternity animated tabs
│   │   │   ├── input.tsx           # shadcn
│   │   │   ├── textarea.tsx        # shadcn
│   │   │   ├── select.tsx          # shadcn
│   │   │   └── button.tsx          # shadcn
│   │   ├── navbar.tsx              # Site navigation using FloatingNav
│   │   ├── hero.tsx                # Hero section
│   │   ├── industry.tsx            # Industry & The Gap section
│   │   ├── building.tsx            # What We're Building section (3 Horizons)
│   │   ├── who-we-serve.tsx        # Who We Serve section
│   │   ├── founders.tsx            # Founders section
│   │   ├── contact.tsx             # Contact / CTA section (tabbed forms)
│   │   ├── footer.tsx              # Footer
│   │   ├── scroll-reveal.tsx       # Reusable scroll-triggered fade-up wrapper
│   │   └── counter.tsx             # Animated count-up component
│   ├── lib/
│   │   └── utils.ts                # cn() utility (Aceternity requirement)
│   └── data/
│       ├── nav-items.ts            # Navigation links data
│       ├── verticals.ts            # M&E verticals with stats
│       ├── horizons.ts             # 3 Horizon card data
│       ├── audiences.ts            # Who We Serve audience types
│       ├── founders.ts             # Founder profile data
│       └── jobs.ts                 # Job listings data
├── public/
│   ├── images/
│   │   ├── placeholder-hero.webp
│   │   ├── placeholder-varun.webp
│   │   └── placeholder-ria.webp
│   ├── favicon.ico
│   ├── sitemap.xml
│   └── robots.txt
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── package.json
└── .gitignore
```

---

## Task 1: Project Scaffolding & Dependencies

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `.gitignore`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/lib/utils.ts`

- [ ] **Step 1: Create Next.js 14 project**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbo
```

When prompted, accept defaults. This creates the full Next.js 14 scaffold with App Router, TypeScript, Tailwind CSS, and `src/` directory.

- [ ] **Step 2: Install Aceternity UI core dependencies**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
npm install motion clsx tailwind-merge
```

- [ ] **Step 3: Install additional dependencies**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
npm install @tabler/icons-react
```

`@tabler/icons-react` is used by Aceternity components for icons.

- [ ] **Step 4: Initialize shadcn/ui**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
npx shadcn@latest init
```

When prompted:
- Style: Default
- Base color: Neutral
- CSS variables: Yes

- [ ] **Step 5: Install shadcn form components**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
npx shadcn@latest add input textarea select button
```

- [ ] **Step 6: Create the cn() utility**

Verify `src/lib/utils.ts` exists (shadcn init creates it). It should contain:

```typescript
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

If shadcn already created this file, no changes needed.

- [ ] **Step 7: Update Tailwind config with design system**

Replace the contents of `tailwind.config.ts`:

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
        navy: "#1B2A4A",
        gold: "#C9973A",
        "off-white": "#F8F6F1",
        "light-grey": "#F5F5F5",
        dark: "#1A1A1A",
        "mid-grey": "#444444",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 8: Update globals.css with fonts and base styles**

Replace `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');

@layer base {
  body {
    @apply font-body text-dark bg-off-white;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display;
  }
}

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 9: Update root layout with fonts and metadata**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Riverroute — Built by the industry. For the industry.",
  description:
    "The Riverroute builds purpose-built technology for India's Media and Entertainment industry. From the people who know it best.",
  keywords: [
    "Indian M&E software",
    "Indian film industry technology",
    "media entertainment India software",
  ],
  openGraph: {
    title: "The Riverroute — Built by the industry. For the industry.",
    description:
      "Purpose-built technology for India's Media and Entertainment industry.",
    url: "https://theriverroute.com",
    siteName: "The Riverroute",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Riverroute — Built by the industry. For the industry.",
    description:
      "Purpose-built technology for India's Media and Entertainment industry.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body text-dark antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 10: Create placeholder homepage**

Replace `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main>
      <p className="p-8 font-display text-navy text-4xl">The Riverroute — Coming Soon</p>
    </main>
  );
}
```

- [ ] **Step 11: Run dev server and verify**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
npm run dev
```

Expected: App runs on `http://localhost:3000`, shows "The Riverroute — Coming Soon" in Playfair Display navy text on off-white background.

- [ ] **Step 12: Commit**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
git add -A
git commit -m "feat: scaffold Next.js 14 project with Aceternity UI, shadcn/ui, and design system"
```

---

## Task 2: Data Files

**Files:**
- Create: `src/data/nav-items.ts`, `src/data/verticals.ts`, `src/data/horizons.ts`, `src/data/audiences.ts`, `src/data/founders.ts`, `src/data/jobs.ts`

- [ ] **Step 1: Create nav items data**

Create `src/data/nav-items.ts`:

```typescript
export const navItems = [
  { name: "Home", link: "#hero" },
  { name: "Industry", link: "#industry" },
  { name: "What We're Building", link: "#building" },
  { name: "Who We Serve", link: "#who-we-serve" },
  { name: "Founders", link: "#founders" },
  { name: "Careers", link: "/careers" },
];
```

- [ ] **Step 2: Create verticals data**

Create `src/data/verticals.ts`:

```typescript
export interface Vertical {
  name: string;
  size: string;
  source: string;
  icon: string;
}

export const verticals: Vertical[] = [
  {
    name: "Film & Theatrical",
    size: "₹19,750 Cr",
    source: "FICCI-EY 2024",
    icon: "🎬",
  },
  {
    name: "OTT Platforms",
    size: "₹23,900 Cr",
    source: "PwC India 2024",
    icon: "📺",
  },
  {
    name: "Television",
    size: "₹70,600 Cr",
    source: "FICCI-EY 2024",
    icon: "📡",
  },
  {
    name: "Music",
    size: "₹5,300 Cr",
    source: "IBEF 2025",
    icon: "🎵",
  },
  {
    name: "Live Events",
    size: "₹12,000 Cr",
    source: "FICCI-EY 2024",
    icon: "🎪",
  },
  {
    name: "Animation & VFX",
    size: "US$2.2B",
    source: "IBEF 2025",
    icon: "🎨",
  },
  {
    name: "Online Gaming",
    size: "₹25,500 Cr",
    source: "PwC India 2024",
    icon: "🎮",
  },
  {
    name: "Digital Media",
    size: "₹63,000 Cr",
    source: "FICCI-EY 2024",
    icon: "📱",
  },
];
```

- [ ] **Step 3: Create horizons data**

Create `src/data/horizons.ts`:

```typescript
export interface Horizon {
  label: string;
  pullQuote: string;
  body: string;
  status: string;
  statusVariant: "active" | "development" | "roadmap";
}

export const horizons: Horizon[] = [
  {
    label: "Horizon 01 — The Vendor",
    pullQuote:
      "Crores of rupees worth of equipment leaves warehouses every day. Every single piece of it tracked on WhatsApp and hope.",
    body: "Our first product gives the people who rent out the equipment that powers Indian film and television something they have never had before: complete clarity.",
    status: "In active development",
    statusVariant: "active",
  },
  {
    label: "Horizon 02 — The Production",
    pullQuote:
      "A film passes through hundreds of hands, decisions, and stages before it reaches an audience. Most of that journey is invisible — even to the people making it.",
    body: "Our second product brings transparency and control to how films are produced, tracked, and managed.",
    status: "In development",
    statusVariant: "development",
  },
  {
    label: "Horizon 03 — The People",
    pullQuote:
      "India's M&E industry is one of the largest in the world. Yet a director in Chennai has no way to find a focus puller in Kolkata.",
    body: "Our third product connects the entire nation's film and entertainment industry into one living network.",
    status: "On the roadmap",
    statusVariant: "roadmap",
  },
];
```

- [ ] **Step 4: Create audiences data**

Create `src/data/audiences.ts`:

```typescript
export interface Audience {
  title: string;
  description: string;
}

export const audiences: Audience[] = [
  {
    title: "OTT Platforms & Broadcasters",
    description:
      "Track productions from greenlight to delivery with complete transparency.",
  },
  {
    title: "Production Houses & Studios",
    description:
      "Manage every production with the tools your teams actually need.",
  },
  {
    title: "Equipment Rental Vendors",
    description:
      "Complete clarity over every piece of equipment — where it is, who has it, when it returns.",
  },
  {
    title: "Set & Props Vendors",
    description:
      "Run your inventory with confidence, not spreadsheets.",
  },
  {
    title: "Post-Production Houses",
    description:
      "Seamless handoffs, tracked deliverables, no more chasing status updates.",
  },
  {
    title: "Coordinators & Line Producers",
    description:
      "The operational backbone of every production — finally with software that respects it.",
  },
  {
    title: "Technicians & Crew",
    description:
      "Your work keeps this industry alive. We are building tools that recognise that.",
  },
  {
    title: "Independent Filmmakers",
    description:
      "Professional-grade production tools — not just for the biggest studios.",
  },
];
```

- [ ] **Step 5: Create founders data**

Create `src/data/founders.ts`:

```typescript
export interface Founder {
  name: string;
  title: string;
  role: string;
  bio: string;
  credentials: string[];
  image: string;
  imdbUrl?: string;
}

export const founders: Founder[] = [
  {
    name: "Varun Hemraj Khandelwal",
    title: "Co-Founder",
    role: "Film Producer & Industry Veteran",
    bio: "Varun has spent over two decades inside the Indian film and television industry. From large-scale productions at Red Chillies Entertainment to independent films through Yamini Pictures and projects with NFDC Delhi, he has worked across feature films, advertising, and documentaries. He understands how this industry operates — not from a boardroom, but from a production floor.",
    credentials: [
      "Red Chillies Entertainment",
      "Yamini Pictures",
      "NFDC Delhi",
      "Feature Films, Advertising, Documentaries",
    ],
    image: "/images/placeholder-varun.webp",
    imdbUrl: "https://www.imdb.com/name/nm0000000/",
  },
  {
    name: "Ria Bhavsar",
    title: "Co-Founder",
    role: "Show Coordinator, Project Manager & Production Operations Leader",
    bio: "Ria has been the person who makes productions actually happen. From coordinating Delhi Crime Season 2 for Netflix to managing Class of 83 at Red Chillies, to heading operations at Saanvi Nayak Films — she has lived the chaos of Indian production operations. She knows every pain point because she has experienced each one firsthand.",
    credentials: [
      "Delhi Crime S2 (Netflix) — Show Coordinator",
      "Class of 83 (Netflix, Red Chillies) — Project Manager",
      "Saanvi Nayak Films — Head of Operations",
      "BMM, St. Andrews College Mumbai, 2012",
    ],
    image: "/images/placeholder-ria.webp",
  },
];
```

- [ ] **Step 6: Create jobs data**

Create `src/data/jobs.ts`:

```typescript
export interface Job {
  title: string;
  type: string;
  location: string;
  description: string;
  linkedinUrl: string;
}

export const jobs: Job[] = [
  // Add real job listings here when available.
  // Each entry links to a LinkedIn job post.
  // Example:
  // {
  //   title: "Full-Stack Developer",
  //   type: "Hybrid",
  //   location: "Mumbai",
  //   description: "Build purpose-built software for India's M&E industry...",
  //   linkedinUrl: "https://www.linkedin.com/jobs/view/0000000000",
  // },
];
```

- [ ] **Step 7: Commit**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
git add src/data/
git commit -m "feat: add all content data files for homepage and careers"
```

---

## Task 3: Install Aceternity UI Components

**Files:**
- Create: `src/components/ui/aurora-background.tsx`, `src/components/ui/floating-navbar.tsx`, `src/components/ui/text-generate-effect.tsx`, `src/components/ui/3d-card.tsx`, `src/components/ui/lamp.tsx`, `src/components/ui/bento-grid.tsx`, `src/components/ui/focus-cards.tsx`, `src/components/ui/tabs.tsx` (Aceternity animated tabs)

- [ ] **Step 1: Install Aceternity components via CLI**

Run each command one at a time. If the CLI asks to overwrite existing files (e.g., shadcn's `tabs.tsx`), rename the shadcn version first.

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
npx shadcn@latest add @aceternity/aurora-background
npx shadcn@latest add @aceternity/floating-navbar
npx shadcn@latest add @aceternity/text-generate-effect
npx shadcn@latest add @aceternity/3d-card
npx shadcn@latest add @aceternity/lamp
npx shadcn@latest add @aceternity/bento-grid
npx shadcn@latest add @aceternity/focus-cards
npx shadcn@latest add @aceternity/tabs
```

If any command fails (some Aceternity components may not be on the shadcn registry), manually create the component file by copying from the Aceternity UI website. The key components that MUST work:
- `aurora-background.tsx` — Hero background
- `floating-navbar.tsx` — Navigation
- `text-generate-effect.tsx` — Hero headline animation
- `3d-card.tsx` — Horizon cards
- `lamp.tsx` — Gap callout
- `bento-grid.tsx` — Verticals grid
- `focus-cards.tsx` — Audience grid

- [ ] **Step 2: Verify all UI component files exist**

```bash
ls -la src/components/ui/
```

Expected: All component files listed above should be present.

- [ ] **Step 3: Commit**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
git add src/components/ui/
git commit -m "feat: install Aceternity UI and shadcn/ui components"
```

---

## Task 4: Reusable Components — ScrollReveal & Counter

**Files:**
- Create: `src/components/scroll-reveal.tsx`, `src/components/counter.tsx`

- [ ] **Step 1: Create ScrollReveal wrapper**

Create `src/components/scroll-reveal.tsx`:

```tsx
"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create animated Counter component**

Create `src/components/counter.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  format?: (value: number) => string;
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
  format = formatIndianNumber,
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
      {prefix}{format(count)}{suffix}
    </span>
  );
}
```

- [ ] **Step 3: Verify build compiles**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
npm run build 2>&1 | tail -5
```

Expected: Build succeeds (or only warns about unused components).

- [ ] **Step 4: Commit**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
git add src/components/scroll-reveal.tsx src/components/counter.tsx
git commit -m "feat: add ScrollReveal and Counter reusable components"
```

---

## Task 5: Navbar Component

**Files:**
- Create: `src/components/navbar.tsx`

- [ ] **Step 1: Build the Navbar**

Create `src/components/navbar.tsx`:

```tsx
"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data/nav-items";
import {
  IconHome,
  IconBuildingFactory,
  IconRocket,
  IconUsers,
  IconUserCircle,
  IconBriefcase,
} from "@tabler/icons-react";

const icons = [
  <IconHome key="home" className="h-4 w-4" />,
  <IconBuildingFactory key="industry" className="h-4 w-4" />,
  <IconRocket key="building" className="h-4 w-4" />,
  <IconUsers key="serve" className="h-4 w-4" />,
  <IconUserCircle key="founders" className="h-4 w-4" />,
  <IconBriefcase key="careers" className="h-4 w-4" />,
];

const navItemsWithIcons = navItems.map((item, i) => ({
  ...item,
  icon: icons[i],
}));

export function Navbar() {
  return (
    <FloatingNav
      navItems={navItemsWithIcons}
      className="bg-navy/80 backdrop-blur-md border-gold/20"
    />
  );
}
```

Note: The FloatingNav component from Aceternity may need customization to add the "Talk to Us" gold pill button. After installing, check the component source in `src/components/ui/floating-navbar.tsx` and add a gold CTA button to the right side:

```tsx
<a
  href="#contact"
  className="bg-gold text-navy px-5 py-2 rounded-full text-sm font-body font-semibold hover:scale-[1.03] hover:shadow-lg transition-all duration-150"
>
  Talk to Us
</a>
```

The exact modification depends on the FloatingNav component's internal structure. Inspect the installed component and add the button in the appropriate place.

- [ ] **Step 2: Verify navbar renders**

Add the Navbar to `src/app/page.tsx` temporarily:

```tsx
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="h-screen flex items-center justify-center">
        <p className="font-display text-navy text-4xl">The Riverroute</p>
      </div>
    </main>
  );
}
```

Run `npm run dev` and verify the floating navbar appears and works.

- [ ] **Step 3: Commit**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
git add src/components/navbar.tsx src/app/page.tsx
git commit -m "feat: add floating navbar with nav items and gold CTA"
```

---

## Task 6: Hero Section

**Files:**
- Create: `src/components/hero.tsx`
- Create: `public/images/placeholder-hero.webp` (placeholder)

- [ ] **Step 1: Create placeholder hero image**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
mkdir -p public/images
```

For the placeholder, we'll use a CSS gradient instead of an actual image file. No image file needed during development — the Aurora Background provides the visual.

- [ ] **Step 2: Build the Hero section**

Create `src/components/hero.tsx`:

```tsx
"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";

const headline =
  "India's Media and Entertainment industry is one of the largest in the world. The people who run it deserve software that actually understands them.";

export function Hero() {
  return (
    <section id="hero" className="relative">
      <AuroraBackground className="bg-navy">
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <TextGenerateEffect
            words={headline}
            className="font-display text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl max-w-5xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
            className="mt-6 max-w-2xl font-body text-lg text-white/80 md:text-xl"
          >
            The Riverroute builds technology for the industry — from the inside.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#building"
              className="rounded-full bg-gold px-8 py-3 font-body text-sm font-semibold text-navy transition-all duration-150 hover:scale-[1.03] hover:shadow-lg"
            >
              Explore What We&apos;re Building
            </a>
            <a
              href="#contact"
              className="rounded-full border-2 border-white px-8 py-3 font-body text-sm font-semibold text-white transition-all duration-150 hover:bg-white/10"
            >
              Talk to the Founders
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="absolute bottom-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <IconChevronDown className="h-8 w-8 text-white/50" />
            </motion.div>
          </motion.div>
        </div>
      </AuroraBackground>
    </section>
  );
}
```

- [ ] **Step 3: Add Hero to homepage**

Update `src/app/page.tsx`:

```tsx
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Verify hero renders**

Run `npm run dev`. Expected: Full-viewport aurora background with navy base, headline text animating in word by word, sub-headline and CTAs fading in after, bouncing down arrow at bottom.

- [ ] **Step 5: Commit**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
git add src/components/hero.tsx src/app/page.tsx
git commit -m "feat: add Hero section with aurora background and text animation"
```

---

## Task 7: Industry & The Gap Section

**Files:**
- Create: `src/components/industry.tsx`

- [ ] **Step 1: Build the Industry section**

Create `src/components/industry.tsx`:

```tsx
"use client";

import { verticals } from "@/data/verticals";
import { Counter } from "@/components/counter";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "motion/react";

export function Industry() {
  return (
    <section id="industry" className="bg-off-white py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Headline */}
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-navy md:text-5xl text-center">
            This is not just about films
          </h2>
        </ScrollReveal>

        {/* Anchor Stat */}
        <ScrollReveal className="mt-16 text-center">
          <div className="inline-block">
            <Counter
              target={250000}
              prefix="₹"
              suffix=" Cr"
              duration={1.5}
              className="font-display text-5xl font-bold text-gold md:text-7xl lg:text-8xl"
            />
            <p className="mt-3 font-body text-lg text-mid-grey">
              India&apos;s M&amp;E sector in 2024
            </p>
            <p className="mt-1 font-body text-xs text-mid-grey/70">
              Source: FICCI-EY 2024
            </p>
          </div>
        </ScrollReveal>

        {/* Verticals Grid */}
        <ScrollReveal className="mt-16">
          <BentoGrid className="mx-auto max-w-5xl">
            {verticals.map((vertical, i) => (
              <BentoGridItem
                key={vertical.name}
                title={vertical.name}
                description={vertical.size}
                header={
                  <div className="flex h-full min-h-[4rem] items-center justify-center text-4xl">
                    {vertical.icon}
                  </div>
                }
                className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                icon={
                  <span className="text-[10px] text-mid-grey/60">
                    {vertical.source}
                  </span>
                }
              />
            ))}
          </BentoGrid>
        </ScrollReveal>

        {/* Supporting Copy */}
        <ScrollReveal className="mt-16">
          <p className="mx-auto max-w-3xl text-center font-body text-lg text-mid-grey leading-relaxed">
            Every one of these verticals runs on people, processes, and
            relationships. Almost none of it has software built specifically for
            it.
          </p>
        </ScrollReveal>
      </div>

      {/* The Gap Callout — Lamp Effect */}
      <div className="mt-20">
        <LampContainer className="bg-navy">
          <motion.h3
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="mt-8 bg-gradient-to-br from-white to-white/60 bg-clip-text text-center font-display text-2xl font-bold tracking-tight text-transparent md:text-4xl lg:text-5xl max-w-4xl px-6"
          >
            &ldquo;Crores of rupees worth of equipment leaves warehouses every
            day. Every single piece of it tracked on WhatsApp and hope.&rdquo;
          </motion.h3>
        </LampContainer>
      </div>

      {/* Transition Copy */}
      <ScrollReveal className="py-16 text-center bg-off-white">
        <p className="font-display text-2xl font-semibold text-navy md:text-3xl">
          We are changing that. From the inside.
        </p>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 2: Add Industry section to homepage**

Update `src/app/page.tsx`:

```tsx
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Industry } from "@/components/industry";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Industry />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Expected: Off-white section with animated counter counting up to ₹2,50,000 Cr, bento grid of 8 verticals, lamp effect with the gap quote on navy, transition copy.

- [ ] **Step 4: Commit**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
git add src/components/industry.tsx src/app/page.tsx
git commit -m "feat: add Industry & The Gap section with counter, bento grid, and lamp effect"
```

---

## Task 8: What We're Building Section

**Files:**
- Create: `src/components/building.tsx`

- [ ] **Step 1: Build the section**

Create `src/components/building.tsx`:

```tsx
"use client";

import { horizons } from "@/data/horizons";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useState } from "react";

function StatusBadge({ status, variant }: { status: string; variant: string }) {
  const styles = {
    active: "bg-gold/20 text-gold border-gold/40",
    development: "bg-gold/10 text-gold/70 border-gold/20",
    roadmap: "bg-white/10 text-white/50 border-white/20",
  };

  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 font-body text-xs font-medium ${
        styles[variant as keyof typeof styles] || styles.roadmap
      }`}
    >
      {status}
    </span>
  );
}

export function Building() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "waitlist", name: "", email }),
      });
      setSubmitted(true);
    } catch {
      // Silently fail for now — Supabase integration later
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="building" className="bg-navy py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Headline */}
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold text-white md:text-5xl">
            We are building the software this industry has always deserved.
          </h2>
        </ScrollReveal>

        {/* Intro Copy */}
        <ScrollReveal className="mt-6">
          <p className="mx-auto max-w-3xl text-center font-body text-lg text-white/70 leading-relaxed">
            We are currently building our first products. They are designed for
            the people who keep this industry running — and they are being built
            with their input, not in spite of it.
          </p>
        </ScrollReveal>

        {/* Horizon Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {horizons.map((horizon, i) => (
            <ScrollReveal key={horizon.label} delay={i * 0.1}>
              <CardContainer className="inter-var w-full">
                <CardBody className="group/card relative h-full w-full rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <CardItem translateZ="30" className="w-full">
                    <StatusBadge
                      status={horizon.status}
                      variant={horizon.statusVariant}
                    />
                  </CardItem>

                  <CardItem
                    translateZ="40"
                    className="mt-4 font-display text-xl font-bold text-white"
                  >
                    {horizon.label}
                  </CardItem>

                  <CardItem
                    translateZ="30"
                    className="mt-4 font-body text-sm italic text-gold/80 leading-relaxed"
                  >
                    &ldquo;{horizon.pullQuote}&rdquo;
                  </CardItem>

                  <CardItem
                    translateZ="20"
                    className="mt-4 font-body text-sm text-white/70 leading-relaxed"
                  >
                    {horizon.body}
                  </CardItem>
                </CardBody>
              </CardContainer>
            </ScrollReveal>
          ))}
        </div>

        {/* Waitlist CTA */}
        <ScrollReveal className="mt-20">
          <div className="mx-auto max-w-md text-center">
            <p className="font-body text-sm text-white/60 mb-4">
              Be the first to know when we launch.
            </p>
            {submitted ? (
              <p className="font-body text-gold text-sm">
                Thank you. We will keep you in the loop.
              </p>
            ) : (
              <form
                onSubmit={handleWaitlist}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 rounded-full border border-white/20 bg-white/5 px-5 py-3 font-body text-sm text-white placeholder:text-white/40 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-gold px-6 py-3 font-body text-sm font-semibold text-navy transition-all duration-150 hover:scale-[1.03] hover:shadow-lg disabled:opacity-50"
                >
                  {loading ? "..." : "Stay in the Loop"}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to homepage**

Update `src/app/page.tsx`:

```tsx
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Industry } from "@/components/industry";
import { Building } from "@/components/building";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Industry />
      <Building />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Expected: Navy section with 3 horizon cards staggering in, 3D hover effect, status badges, inline email waitlist form.

- [ ] **Step 4: Commit**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
git add src/components/building.tsx src/app/page.tsx
git commit -m "feat: add What We're Building section with 3D horizon cards and waitlist"
```

---

## Task 9: Who We Serve Section

**Files:**
- Create: `src/components/who-we-serve.tsx`

- [ ] **Step 1: Build the section**

Create `src/components/who-we-serve.tsx`:

```tsx
"use client";

import { audiences } from "@/data/audiences";
import { ScrollReveal } from "@/components/scroll-reveal";
import { FocusCards } from "@/components/ui/focus-cards";

export function WhoWeServe() {
  // FocusCards expects { title, src } — we adapt for text-only cards
  // If FocusCards requires images, we'll use a custom grid instead
  return (
    <section id="who-we-serve" className="bg-off-white py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Headline */}
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold text-navy md:text-5xl max-w-4xl mx-auto leading-tight">
            From the biggest studios to the smallest vendor — if you work in
            Indian M&amp;E, we are building for you.
          </h2>
        </ScrollReveal>

        {/* Audience Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, i) => (
            <ScrollReveal key={audience.title} delay={i * 0.05}>
              <div className="group relative rounded-xl border border-navy/10 bg-white p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5">
                <h3 className="font-display text-lg font-bold text-navy">
                  {audience.title}
                </h3>
                <p className="mt-2 font-body text-sm text-mid-grey leading-relaxed">
                  {audience.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Philosophy Callout */}
        <ScrollReveal className="mt-20">
          <div className="mx-auto max-w-3xl rounded-2xl border-l-4 border-gold bg-navy/5 p-8 md:p-12">
            <p className="font-display text-xl font-semibold text-navy md:text-2xl leading-snug">
              &ldquo;Products made from the people, and by the people, who will
              use it first — because they are part of the crew.&rdquo;
            </p>
          </div>
        </ScrollReveal>

        {/* Industry Input CTA */}
        <ScrollReveal className="mt-16 text-center">
          <p className="font-body text-lg text-mid-grey">
            If you work in Indian M&amp;E — your experience is an asset. Share
            it with us.
          </p>
          <a
            href="#contact?tab=industry_input"
            className="mt-6 inline-block rounded-full bg-gold px-8 py-3 font-body text-sm font-semibold text-navy transition-all duration-150 hover:scale-[1.03] hover:shadow-lg"
          >
            Share Your Experience
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

Note: FocusCards from Aceternity expects image-based cards (`{ title, src }`). Since our audience cards are text-only, we use a custom card grid with hover effects instead. If you later want to add images to audience cards, swap to FocusCards at that point.

- [ ] **Step 2: Add to homepage**

Update `src/app/page.tsx`:

```tsx
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Industry } from "@/components/industry";
import { Building } from "@/components/building";
import { WhoWeServe } from "@/components/who-we-serve";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Industry />
      <Building />
      <WhoWeServe />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Expected: Off-white section, 4-column grid of audience cards with hover effects, gold-bordered philosophy callout, "Share Your Experience" CTA.

- [ ] **Step 4: Commit**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
git add src/components/who-we-serve.tsx src/app/page.tsx
git commit -m "feat: add Who We Serve section with audience grid and philosophy callout"
```

---

## Task 10: Founders Section

**Files:**
- Create: `src/components/founders.tsx`

- [ ] **Step 1: Build the section**

Create `src/components/founders.tsx`:

```tsx
"use client";

import { founders } from "@/data/founders";
import { ScrollReveal } from "@/components/scroll-reveal";
import { IconExternalLink } from "@tabler/icons-react";

export function Founders() {
  return (
    <section id="founders" className="bg-navy py-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Headline */}
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold text-white md:text-5xl">
            Built from the inside.
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-6">
          <p className="mx-auto max-w-3xl text-center font-body text-lg text-white/70 leading-relaxed">
            The Riverroute was founded by two professionals who have
            collectively spent more than three decades working inside the Indian
            film and television industry. This is not a pivot. It is a
            culmination.
          </p>
        </ScrollReveal>

        {/* Founder Cards */}
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {founders.map((founder, i) => (
            <ScrollReveal key={founder.name} delay={i * 0.15}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                {/* Placeholder Photo */}
                <div className="mx-auto h-64 w-64 rounded-xl bg-white/10 flex items-center justify-center">
                  <span className="font-body text-sm text-white/30">
                    Photo placeholder
                  </span>
                </div>

                {/* Name & Title */}
                <div className="mt-6 text-center">
                  <h3 className="font-display text-2xl font-bold text-white">
                    {founder.name}
                  </h3>
                  <p className="mt-1 font-body text-sm font-medium text-gold">
                    {founder.title}
                  </p>
                  <p className="mt-1 font-body text-sm text-white/60">
                    {founder.role}
                  </p>
                </div>

                {/* Bio */}
                <p className="mt-6 font-body text-sm text-white/70 leading-relaxed">
                  {founder.bio}
                </p>

                {/* Credentials */}
                <ul className="mt-6 space-y-1">
                  {founder.credentials.map((credential) => (
                    <li
                      key={credential}
                      className="font-body text-xs text-white/50"
                    >
                      • {credential}
                    </li>
                  ))}
                </ul>

                {/* IMDb Link */}
                {founder.imdbUrl && (
                  <a
                    href={founder.imdbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 font-body text-xs text-gold hover:text-gold/80 transition-colors"
                  >
                    IMDb <IconExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to homepage**

Update `src/app/page.tsx`:

```tsx
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Industry } from "@/components/industry";
import { Building } from "@/components/building";
import { WhoWeServe } from "@/components/who-we-serve";
import { Founders } from "@/components/founders";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Industry />
      <Building />
      <WhoWeServe />
      <Founders />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Expected: Navy section, two founder cards side by side on desktop (stacked on mobile), placeholder photo areas, narrative bios, credential lists, IMDb link on Varun's card.

- [ ] **Step 4: Commit**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
git add src/components/founders.tsx src/app/page.tsx
git commit -m "feat: add Founders section with profile cards and placeholder photos"
```

---

## Task 11: Contact / CTA Section

**Files:**
- Create: `src/components/contact.tsx`

- [ ] **Step 1: Build the contact section with tabbed forms**

Create `src/components/contact.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";

type FormType = "waitlist" | "investor" | "demo" | "industry_input" | "general";

const tabs: { label: string; value: FormType }[] = [
  { label: "Join Waitlist", value: "waitlist" },
  { label: "Investor Enquiry", value: "investor" },
  { label: "Request a Demo", value: "demo" },
  { label: "Industry Input", value: "industry_input" },
  { label: "General", value: "general" },
];

export function Contact() {
  const [activeTab, setActiveTab] = useState<FormType>("waitlist");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check URL for pre-selected tab
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("tab=industry_input")) {
      setActiveTab("industry_input");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = { type: activeTab };
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // Stub — Supabase later
    }
    setLoading(false);
    setSubmitted(true);
  }

  function resetForm() {
    setSubmitted(false);
  }

  return (
    <section id="contact" className="bg-off-white py-24 px-6">
      <div className="mx-auto max-w-2xl">
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold text-navy md:text-4xl leading-tight">
            The best products in this industry will be built with this industry.
            Let&apos;s talk.
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab.value);
                  setSubmitted(false);
                }}
                className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.value
                    ? "bg-navy text-white"
                    : "bg-navy/5 text-navy hover:bg-navy/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form or Success */}
          {submitted ? (
            <div className="text-center py-12">
              <p className="font-body text-lg text-navy">
                Thank you. We will be in touch.
              </p>
              <button
                onClick={resetForm}
                className="mt-4 font-body text-sm text-gold hover:text-gold/80 transition-colors"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Waitlist */}
              {activeTab === "waitlist" && (
                <>
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark placeholder:text-mid-grey/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark placeholder:text-mid-grey/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </>
              )}

              {/* Investor */}
              {activeTab === "investor" && (
                <>
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark placeholder:text-mid-grey/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <input
                    name="fund_firm"
                    type="text"
                    placeholder="Fund / Firm (optional)"
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark placeholder:text-mid-grey/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    required
                    rows={4}
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark placeholder:text-mid-grey/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold resize-none"
                  />
                </>
              )}

              {/* Demo */}
              {activeTab === "demo" && (
                <>
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark placeholder:text-mid-grey/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <input
                    name="company"
                    type="text"
                    placeholder="Company"
                    required
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark placeholder:text-mid-grey/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <input
                    name="role"
                    type="text"
                    placeholder="Role"
                    required
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark placeholder:text-mid-grey/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone (optional)"
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark placeholder:text-mid-grey/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </>
              )}

              {/* Industry Input */}
              {activeTab === "industry_input" && (
                <>
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark placeholder:text-mid-grey/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <input
                    name="role"
                    type="text"
                    placeholder="Role in industry"
                    required
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark placeholder:text-mid-grey/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <select
                    name="years_experience"
                    required
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Years of experience
                    </option>
                    <option value="1-3">1–3 years</option>
                    <option value="3-7">3–7 years</option>
                    <option value="7-15">7–15 years</option>
                    <option value="15+">15+ years</option>
                  </select>
                  <textarea
                    name="message"
                    placeholder="Biggest operational frustration"
                    required
                    rows={4}
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark placeholder:text-mid-grey/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold resize-none"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email (optional)"
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark placeholder:text-mid-grey/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </>
              )}

              {/* General */}
              {activeTab === "general" && (
                <>
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark placeholder:text-mid-grey/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark placeholder:text-mid-grey/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    required
                    rows={4}
                    className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 font-body text-sm text-dark placeholder:text-mid-grey/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold resize-none"
                  />
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-gold py-3 font-body text-sm font-semibold text-navy transition-all duration-150 hover:scale-[1.01] hover:shadow-lg disabled:opacity-50"
              >
                {loading
                  ? "Sending..."
                  : activeTab === "waitlist"
                  ? "Join Waitlist"
                  : activeTab === "investor"
                  ? "Send Enquiry"
                  : activeTab === "demo"
                  ? "Request Demo"
                  : activeTab === "industry_input"
                  ? "Share My Experience"
                  : "Send Message"}
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to homepage**

Update `src/app/page.tsx`:

```tsx
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Industry } from "@/components/industry";
import { Building } from "@/components/building";
import { WhoWeServe } from "@/components/who-we-serve";
import { Founders } from "@/components/founders";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Industry />
      <Building />
      <WhoWeServe />
      <Founders />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Expected: Off-white section, 5 tab buttons, form fields change per tab, waitlist is default, submit shows success message.

- [ ] **Step 4: Commit**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
git add src/components/contact.tsx src/app/page.tsx
git commit -m "feat: add Contact section with 5 tabbed form pathways"
```

---

## Task 12: Footer

**Files:**
- Create: `src/components/footer.tsx`

- [ ] **Step 1: Build the footer**

Create `src/components/footer.tsx`:

```tsx
import { IconBrandLinkedin } from "@tabler/icons-react";

const footerLinks = [
  { name: "Home", href: "#hero" },
  { name: "Industry", href: "#industry" },
  { name: "What We're Building", href: "#building" },
  { name: "Who We Serve", href: "#who-we-serve" },
  { name: "Founders", href: "#founders" },
  { name: "Careers", href: "/careers" },
];

export function Footer() {
  return (
    <footer className="bg-navy py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <p className="font-display text-xl font-bold text-white">
              The Riverroute
            </p>
            <p className="mt-1 font-body text-sm text-white/50">
              Built by the industry. For the industry.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-body text-sm text-white/60 hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social */}
          <a
            href="https://www.linkedin.com/company/theriverroute"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-gold transition-colors"
          >
            <IconBrandLinkedin className="h-6 w-6" />
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-8 md:flex-row md:justify-between">
          <div className="flex gap-4">
            <a
              href="#"
              className="font-body text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-body text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Terms
            </a>
          </div>
          <p className="font-body text-xs text-white/40">
            Mumbai, India
          </p>
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} The Riverroute LLP
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add footer to homepage**

Update `src/app/page.tsx`:

```tsx
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Industry } from "@/components/industry";
import { Building } from "@/components/building";
import { WhoWeServe } from "@/components/who-we-serve";
import { Founders } from "@/components/founders";
import { Contact } from "@/components/contact";
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
      <Contact />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Expected: Navy footer with logo, tagline, links, LinkedIn icon, privacy/terms links, Mumbai India, copyright.

- [ ] **Step 4: Commit**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
git add src/components/footer.tsx src/app/page.tsx
git commit -m "feat: add footer with links, social, and legal"
```

---

## Task 13: Contact API Route (Stub)

**Files:**
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Create the stub API route**

Create `src/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.type) {
      return NextResponse.json(
        { error: "Missing required field: type" },
        { status: 400 }
      );
    }

    // Log submission (replace with Supabase insert later)
    console.log("Contact form submission:", body);

    // TODO: Insert into Supabase contact_submissions table
    // TODO: Send email notification via Resend

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
```

- [ ] **Step 2: Verify form submission works end-to-end**

Run `npm run dev`. Fill out the waitlist form, submit. Check terminal for `Contact form submission:` log. Browser should show success message.

- [ ] **Step 3: Commit**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
git add src/app/api/contact/route.ts
git commit -m "feat: add stub contact API route for form submissions"
```

---

## Task 14: Careers Page

**Files:**
- Create: `src/app/careers/page.tsx`

- [ ] **Step 1: Build the careers page**

Create `src/app/careers/page.tsx`:

```tsx
import type { Metadata } from "next";
import { jobs } from "@/data/jobs";
import { IconBrandLinkedin, IconMail } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Careers — The Riverroute",
  description:
    "Join The Riverroute. We are building purpose-built software for India's Media and Entertainment industry with a small, high-ownership team.",
  openGraph: {
    title: "Careers — The Riverroute",
    description:
      "Join The Riverroute. Build purpose-built software for India's M&E industry.",
    url: "https://theriverroute.com/careers",
  },
};

export default function CareersPage() {
  const hasJobs = jobs.length > 0;

  return (
    <main>
      {/* Hero */}
      <section className="bg-navy py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl font-bold text-white md:text-6xl">
            Work at The Riverroute
          </h1>
          <p className="mt-6 mx-auto max-w-2xl font-body text-lg text-white/70 leading-relaxed">
            We are building purpose-built software for India&apos;s Media and
            Entertainment industry — with a small, high-ownership team that
            moves fast and ships real products.
          </p>
        </div>
      </section>

      {/* Why The Riverroute */}
      <section className="bg-off-white py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-navy">
            Why The Riverroute
          </h2>
          <ul className="mt-8 space-y-4 font-body text-mid-grey leading-relaxed">
            <li className="flex gap-3">
              <span className="text-gold font-bold">•</span>
              <span>
                You will be building for a ₹2,50,000 crore industry that has
                almost no purpose-built software. The opportunity is massive and
                real.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold font-bold">•</span>
              <span>
                You will work directly with the founders — both of whom come
                from inside the industry. No layers. No middlemen.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold font-bold">•</span>
              <span>
                You will own real features from day one. Not tickets — features.
                Your work ships and your name is on it.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold font-bold">•</span>
              <span>
                You will work with agentic AI-assisted development as a daily
                tool — real, hands-on experience with the future of how software
                gets built.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-white py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-navy">
            How We Work
          </h2>
          <p className="mt-6 font-body text-mid-grey leading-relaxed">
            We are a remote-first, async-first team based out of Mumbai. We
            believe in fast feedback loops — ship, learn, iterate. Every
            candidate goes through a short, real test task instead of algorithmic
            interviews. And we commit to this: if you take the time to apply, we
            will never ghost you. You will always hear back.
          </p>
        </div>
      </section>

      {/* Current Openings */}
      <section className="bg-off-white py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-navy">
            Current Openings
          </h2>
          {hasJobs ? (
            <div className="mt-8 space-y-6">
              {jobs.map((job) => (
                <div
                  key={job.title}
                  className="rounded-xl border border-navy/10 bg-white p-6"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-navy">
                        {job.title}
                      </h3>
                      <p className="font-body text-sm text-mid-grey">
                        {job.type} · {job.location}
                      </p>
                    </div>
                    <a
                      href={job.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2 font-body text-sm font-semibold text-navy transition-all duration-150 hover:scale-[1.03] hover:shadow-lg"
                    >
                      <IconBrandLinkedin className="h-4 w-4" />
                      Apply on LinkedIn
                    </a>
                  </div>
                  <p className="mt-4 font-body text-sm text-mid-grey leading-relaxed">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-navy/10 bg-white p-8 text-center">
              <p className="font-body text-mid-grey leading-relaxed">
                We are not actively hiring right now, but we are always
                interested in exceptional people. Send us a note.
              </p>
              <a
                href="mailto:hello@theriverroute.com"
                className="mt-4 inline-flex items-center gap-2 font-body text-sm text-gold hover:text-gold/80 transition-colors"
              >
                <IconMail className="h-4 w-4" />
                hello@theriverroute.com
              </a>
            </div>
          )}
        </div>
      </section>

      {/* What We Look For */}
      <section className="bg-white py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-navy">
            What We Look For
          </h2>
          <p className="mt-6 font-body text-mid-grey leading-relaxed">
            Beyond skills and experience, we look for three things: honesty —
            say what you mean and mean what you say. Ownership — if it is yours,
            it is yours. And curiosity about the industry we are building for —
            you do not need to be a film expert, but you need to care about
            understanding the people you are building for.
          </p>
        </div>
      </section>

      {/* Back to Home Link */}
      <section className="bg-navy py-12 px-6 text-center">
        <a
          href="/"
          className="font-body text-sm text-white/60 hover:text-gold transition-colors"
        >
          ← Back to The Riverroute
        </a>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify**

Run `npm run dev`, navigate to `http://localhost:3000/careers`. Expected: Navy hero, 4 content sections, empty state with mailto link (since no jobs defined), back link.

- [ ] **Step 3: Commit**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
git add src/app/careers/page.tsx
git commit -m "feat: add Careers page with sections and empty state"
```

---

## Task 15: SEO — Sitemap, Robots, Structured Data

**Files:**
- Create: `public/robots.txt`, `src/app/sitemap.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create robots.txt**

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://theriverroute.com/sitemap.xml
```

- [ ] **Step 2: Create dynamic sitemap**

Create `src/app/sitemap.ts`:

```typescript
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://theriverroute.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://theriverroute.com/careers",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
```

- [ ] **Step 3: Add JSON-LD structured data to layout**

Update `src/app/layout.tsx` — add a `<script>` tag inside `<head>` (or `<body>`) with structured data:

Add this inside the `<html>` tag, before `<body>`:

```tsx
<head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            name: "The Riverroute LLP",
            url: "https://theriverroute.com",
            description:
              "Purpose-built technology for India's Media and Entertainment industry.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Mumbai",
              addressCountry: "IN",
            },
            founder: [
              {
                "@type": "Person",
                name: "Varun Hemraj Khandelwal",
                jobTitle: "Co-Founder",
              },
              {
                "@type": "Person",
                name: "Ria Bhavsar",
                jobTitle: "Co-Founder",
              },
            ],
          },
          {
            "@type": "WebPage",
            name: "The Riverroute",
            url: "https://theriverroute.com",
          },
        ],
      }),
    }}
  />
</head>
```

- [ ] **Step 4: Verify**

Run `npm run build`. Check that `sitemap.xml` is generated. Check page source for JSON-LD script tag.

- [ ] **Step 5: Commit**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
git add public/robots.txt src/app/sitemap.ts src/app/layout.tsx
git commit -m "feat: add SEO — sitemap, robots.txt, and structured data"
```

---

## Task 16: Final Polish — Mobile Responsiveness & Accessibility

**Files:**
- Modify: Multiple component files as needed

- [ ] **Step 1: Test all breakpoints**

Run `npm run dev`. Use browser DevTools to test at:
- 360px (mobile)
- 768px (tablet)
- 1024px (desktop)
- 1440px (large desktop)

Check each section renders correctly. Fix any overflow, text sizing, or layout issues.

- [ ] **Step 2: Add missing alt texts and aria labels**

Review all components and ensure:
- All images have descriptive `alt` text
- Interactive elements have `aria-label` where needed
- Form inputs have associated labels (use `aria-label` for placeholder-only inputs)
- The nav hamburger menu has `aria-expanded` state

- [ ] **Step 3: Verify keyboard navigation**

Tab through the entire homepage. Verify:
- All links and buttons are focusable
- Tab order follows visual order
- Focus indicators are visible
- Forms are fully navigable by keyboard

- [ ] **Step 4: Run Lighthouse audit**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
npm run build && npm run start
```

Open `http://localhost:3000` in Chrome, run Lighthouse. Target: 90+ on all 4 categories. Fix any flagged issues.

- [ ] **Step 5: Commit all fixes**

```bash
cd /Users/janamshah_macair/Documents/Claude/Riverroute-website
git add -A
git commit -m "fix: mobile responsiveness and accessibility improvements"
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Project scaffolding & dependencies | package.json, tailwind.config.ts, globals.css, layout.tsx |
| 2 | Data files | src/data/*.ts (6 files) |
| 3 | Install Aceternity + shadcn components | src/components/ui/*.tsx |
| 4 | ScrollReveal & Counter | src/components/scroll-reveal.tsx, counter.tsx |
| 5 | Navbar | src/components/navbar.tsx |
| 6 | Hero section | src/components/hero.tsx |
| 7 | Industry & The Gap section | src/components/industry.tsx |
| 8 | What We're Building section | src/components/building.tsx |
| 9 | Who We Serve section | src/components/who-we-serve.tsx |
| 10 | Founders section | src/components/founders.tsx |
| 11 | Contact / CTA section | src/components/contact.tsx |
| 12 | Footer | src/components/footer.tsx |
| 13 | Contact API stub | src/app/api/contact/route.ts |
| 14 | Careers page | src/app/careers/page.tsx |
| 15 | SEO — sitemap, robots, structured data | sitemap.ts, robots.txt, layout.tsx |
| 16 | Mobile responsiveness & accessibility | Multiple files |
