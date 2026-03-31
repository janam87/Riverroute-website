# Riverroute Website — CRED-Style Redesign Spec

## Overview

Full visual overhaul of the Riverroute marketing website. Replacing the current navy/gold premium theme with a CRED-inspired cinematic dark aesthetic: pure black backgrounds, bold serif display typography, liquid glass effects, parallax scroll, background video hero, and dramatic section reveals. No color accents. No icons.

## Design Principles

- **Pure black.** `#000` or `#0a0a0a` background throughout. No navy, no alternating light sections.
- **Bold serif headlines.** Playfair Display Black for all display text. Inter for body copy.
- **No color accent.** Black, white (`#fff`), and grey (`#444`–`#666`) only. No gold, no brand color. Warmth comes from video footage and glass light refraction.
- **No icons.** No Tabler icons, no emoji, no decorative symbols anywhere. Typography and layout do all the work.
- **Liquid glass.** Apple-style frosted glass (`backdrop-filter: blur`) on navbar, vertical grid items, product horizon cards, founder cards, and form inputs.
- **Cinematic motion.** Word-by-word text reveals, parallax scroll depth, staggered section reveals. All via Framer Motion.
- **Breathe.** Massive whitespace (blackspace). Each statement lands before the next begins.
- **Mobile-first.** Text scales 4xl on mobile, 7xl+ on desktop. Glass effects degrade gracefully on unsupported browsers.

## Tech Stack (unchanged)

- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion (`motion/react`)
- No new dependencies needed (glass is pure CSS, video is native HTML5)

## Page Structure — 5 Sections

### 1. Hero (full viewport)

**Background:** Muted, looped, autoplay HTML5 `<video>` element. Cinematic production footage — film sets, camera rigs, behind-the-scenes. Dark gradient overlay on top (70% opacity top, 40% middle, 80% bottom) so text stays fully readable.

**Content:**
- Headline: large bold serif, e.g. "software for india's storytellers." — reveals word-by-word after video fades in
- Subtext: one line, `#444` color, e.g. "the tools behind the scenes of a ₹2.5 lakh crore industry. built by people who've lived it."
- No buttons above the fold. No CTAs. Let the text breathe.
- Scroll indicator at bottom: subtle animated chevron (CSS only, no icon library)

**Animation:**
- Video fades in on load (opacity 0 → 1, ~1s)
- Headline reveals word-by-word with blur-to-sharp (existing `text-generate-effect` pattern, slowed down)
- Subtext fades in after headline completes
- Video has slight parallax — scrolls slower than the page (Framer Motion `useScroll` + `useTransform`)

**Video source:** Placeholder for now. Use a solid black fallback with a subtle gradient until a real video is provided. The component should accept a `src` prop.

### 2. The Industry

**Layout:** Centered, generous vertical padding (py-32+).

**Content:**
- Large animated counter: `₹2,50,000 Cr` — bold serif, ~64px desktop
- Supporting statement: "india's media & entertainment industry. fragmented. underserved. ready."
- 8 verticals in a flat 4×2 grid: Film, OTT, Television, Music, Live Events, Animation, Gaming, Digital
- Each grid item is a liquid glass card — frosted background, subtle border, text only (no icons)

**Animation:**
- Section fades up from black on scroll entry (section reveal)
- Counter animates on scroll into view (existing `counter.tsx` pattern)
- Counter number has parallax — scrolls slightly slower than surrounding content
- Grid items stagger in from below, 100ms apart

### 3. What We're Building

**Layout:** Three stacked product horizon cards, each a liquid glass panel.

**Content per card:**
- Bold serif title: "the vendor layer.", "the production layer.", "the people layer."
- One line of description (existing copy from `horizons.ts`)
- Status tag in small uppercase text: "building now", "next", "horizon"
- Audiences woven into descriptions — no separate "Who We Serve" section

**After the three cards:** Simple waitlist CTA — "get early access." headline + email input (glass style) + white "join" button.

**Animation:**
- Each card slides in on scroll, staggered 200ms apart
- Section title drifts at a different parallax rate than the cards
- Cards have subtle hover glow (border brightness increase)

### 4. The People (Founders)

**Layout:** Two founder cards side by side, both liquid glass (stronger blur than other cards — `blur(40px)`).

**Content per card:**
- Large photo placeholder (aspect-ratio 3:4, dark placeholder with silhouette until real photos provided)
- Name in bold serif
- One-liner role: "Co-founder · 10+ years in M&E"
- Credentials as small muted tags below (existing data from `founders.ts`)
- No long bios

**Animation:**
- Left card slides in from left, right from right, meeting center
- Cards drift slightly on parallax scroll
- Photos have subtle zoom on hover (scale 1.0 → 1.03)

### 5. Footer + CTA

**Layout:** Centered CTA section flowing into minimal footer.

**CTA:**
- Bold serif headline: "get early access."
- Subtext: "join the waitlist. we'll reach out when it's your turn."
- Email input (glass effect) + white "join" button
- This replaces the current 5-tab contact form. Just email capture.

**Footer:**
- Logo text: "the riverroute"
- Minimal links: LinkedIn, Careers, Privacy, Terms
- Copyright line
- No icons for social — just text links

## Liquid Glass Implementation

CSS approach using `backdrop-filter`:

```css
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
```

**Where applied:**
- Navbar: `glass-strong`
- Vertical grid items: `glass`
- Product horizon cards: `glass`
- Founder cards: `glass-strong`
- Form inputs: `glass` (lighter)
- Waitlist CTA button border: subtle glass

**Fallback:** On browsers without `backdrop-filter` support, fall back to solid `rgba(255,255,255,0.06)` background — still looks fine, just not frosted.

## Animation System (Framer Motion)

### Parallax
- `useScroll()` tracks viewport scroll progress
- `useTransform()` maps scroll to translateY for different elements at different rates
- Hero video: 0.3x scroll speed (moves slower)
- Stat counter: 0.5x scroll speed
- Section titles: 0.7x scroll speed
- Cards: 1x (normal)

### Section Reveal
- Each section wrapped in a reveal component
- `useInView` triggers animation when section enters viewport
- Fade from opacity 0 → 1, translateY 60px → 0
- Duration: 600ms, ease-out
- Children stagger: headline first, then content blocks 150ms apart

### Word-by-Word Text Reveal
- Existing `text-generate-effect.tsx` pattern
- Words go from opacity 0 + blur(8px) → opacity 1 + blur(0)
- Stagger: 80ms per word
- Used on: hero headline, key section statements

### Hover Effects
- Glass cards: border brightens (rgba white 0.08 → 0.15), 200ms transition
- Founder photos: scale 1.0 → 1.03, 300ms
- CTA button: slight lift (translateY -2px) + shadow

## Components to Modify

| Component | Changes |
|-----------|---------|
| `globals.css` | Replace entire color system. Black bg, white text, remove navy/gold/off-white. Add glass utility classes. |
| `tailwind.config.ts` | Remove navy/gold/off-white tokens. Simplify to black/white/grey. |
| `layout.tsx` | Keep fonts (Playfair + Inter). Update metadata if needed. Remove aurora imports if any. |
| `hero.tsx` | Complete rewrite. Add `<video>` bg, dark overlay, word-by-word reveal, remove CTAs. |
| `industry.tsx` | Rewrite layout. Keep counter. Remove Lamp effect. Flat glass grid, no cards with icons. |
| `building.tsx` | Rewrite as glass cards. Merge audience context into descriptions. Add inline waitlist CTA. |
| `who-we-serve.tsx` | **Remove.** Content merged into building section. |
| `founders.tsx` | Rewrite as cinematic glass cards. Remove long bios, IMDb links. Photo + name + one-liner. |
| `contact.tsx` | **Remove.** Replaced by simple email capture in footer/building section. |
| `footer.tsx` | Simplify. Text links only, no icons. Integrate CTA above. |
| `navbar.tsx` / `floating-navbar.tsx` | Rewrite as liquid glass floating bar. Remove icon-based mobile nav. Text only. |
| `scroll-reveal.tsx` | Enhance with staggered children and parallax support. |
| `text-generate-effect.tsx` | Keep, slow down timing, ensure blur effect works. |
| `aurora-background.tsx` | **Remove.** No longer used. |
| `lamp.tsx` | **Remove.** No longer used. |
| `3d-card.tsx` | **Remove.** No longer used. |
| `bento-grid.tsx` | **Remove.** No longer used. |
| `counter.tsx` | Keep as-is. |

## Components to Add

| Component | Purpose |
|-----------|---------|
| `video-hero.tsx` | HTML5 video background with overlay, fallback, and parallax |
| `glass-card.tsx` | Reusable liquid glass container with variant support (normal/strong) |
| `parallax-section.tsx` | Section wrapper with parallax scroll behavior |
| `section-reveal.tsx` | Enhanced scroll reveal with staggered children |
| `waitlist-form.tsx` | Simple email capture (extracted from contact, used in building + footer) |

## Data Changes

- `nav-items.ts` — Update to match new 5-section structure (industry, building, people)
- `audiences.ts` — Content woven into `horizons.ts` descriptions; file can be kept for reference but no longer rendered as a standalone section
- `verticals.ts` — Keep, used in Industry grid (text only, no icons needed)
- `founders.ts` — Simplify: remove long bios, keep name + title + one-liner + credentials
- `horizons.ts` — Update descriptions to include audience context
- `jobs.ts` — Unchanged (careers page not in scope)

## Out of Scope

- Careers page redesign (separate effort)
- Supabase/Resend backend integration
- Analytics setup
- Domain/DNS/deployment
- Sourcing the actual hero video (use black fallback)
- Founder photos (use dark placeholders)

## Performance Considerations

- Video: use compressed MP4, `preload="metadata"`, lazy-load if below fold (it's not — it's hero)
- `backdrop-filter` can be expensive — limit glass layers visible simultaneously. No nested glass.
- Parallax: use `will-change: transform` on parallax elements. Use `useMotionValueEvent` sparingly.
- Section reveals: `useInView` with `once: true` — animate once, don't re-trigger.
- Target: Lighthouse 90+, FCP < 1.5s (without video), LCP < 2.5s
