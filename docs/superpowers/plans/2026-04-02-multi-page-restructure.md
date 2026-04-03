# Multi-Page Site Restructure — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the single-page landing site into a multi-page site with dedicated pages for About, Founders, and each product vertical.

**Architecture:** Next.js App Router pages. The landing page becomes a condensed overview linking to detail pages. Shared components (Navbar, Footer) already exist in layout. Each new page reuses existing UI primitives (GlassCard, SectionReveal, ParallaxElement) for visual consistency.

**Tech Stack:** Next.js 14+, Tailwind CSS, Framer Motion (motion/react), TypeScript

---

## New Site Map

```
/                    → Landing (condensed: hero, industry stats, product teasers, founder teasers, CTA)
/about               → About + USP + Who We Serve
/founders            → Meet the Crew (detailed founder bios)
/products/vendor     → Vendor Layer product detail
/products/production → Production Layer product detail
/products/people     → People Layer product detail
/careers             → (already exists, no changes)
```

## File Structure

```
src/
├── app/
│   ├── page.tsx                          (MODIFY — condense to overview with links)
│   ├── about/page.tsx                    (CREATE — about + USP + who we serve)
│   ├── founders/page.tsx                 (CREATE — meet the crew, detailed bios)
│   ├── products/
│   │   ├── vendor/page.tsx               (CREATE — vendor layer detail)
│   │   ├── production/page.tsx           (CREATE — production layer detail)
│   │   └── people/page.tsx               (CREATE — people layer detail)
├── components/
│   ├── navbar.tsx                        (no change — wrapper)
│   ├── footer.tsx                        (MODIFY — remove any tagline if present)
│   ├── hero.tsx                          (no change)
│   ├── industry.tsx                      (no change — used on landing)
│   ├── building.tsx                      (MODIFY — condense for landing, add links)
│   ├── founders.tsx                      (MODIFY — condense for landing teaser)
│   └── ui/floating-navbar.tsx            (MODIFY — update nav links for new pages)
├── data/
│   ├── founders.ts                       (MODIFY — fix Varun's bio, add detailed fields)
│   ├── horizons.ts                       (no change — product data)
│   ├── audiences.ts                      (no change — used on about page)
│   ├── nav-items.ts                      (MODIFY — update for new pages)
│   └── verticals.ts                      (no change)
```

---

## Founder Bio Corrections

### Varun Hemraj Khandelwal (from CV)
- **Role:** Film Producer & Industry Veteran
- **Bio:** "Two decades across every side of Indian film and television — from casting at UTV, to acting in shows like Kahani Ghar Ghar Ki and Diya aur Baati Hum, to producing at Roy Kapur Films, Good Co., and Dharma Productions. From The Sky is Pink to Goodbye to Sarzameen — he has been on set, behind the camera, and in the production office. He understands how this industry works because he has done every job in it."
- **Credentials:** Roy Kapur Films (The Sky is Pink), Good Co. (Goodbye), Dharma Productions (Sarzameen)
- **Detailed experience (for founders page):**
  - Casting Head, UTV Television (2004-2005)
  - Actor across Star Plus, Zee TV, Sony, Imagine TV (2006-2016)
  - Producer, Greenlight Entertainment / MTV (2014-2015)
  - Production Manager, Roy Kapur Films — The Sky is Pink, Yeh Ballet (2018-2020)
  - Executive Producer, Good Co. — Sunflower S1, Goodbye, Good Bad Girl, Ganapath (2020-2022)
  - Executive Producer, Dharma Productions — Sarzameen (2023)

### Ria Bhavsar (from CV — bio confirmed correct)
- **Role:** Show Coordinator & Production Operations
- **Bio (no change):** "The person who makes productions actually happen. From coordinating Delhi Crime S2 for Netflix to managing Class of 83 at Red Chillies, to heading operations at Saanvi Nayak Films — she has lived the chaos of Indian production operations firsthand."
- **Credentials:** Delhi Crime S2 (Netflix), Class of 83 (Red Chillies), Saanvi Nayak Films
- **Detailed experience (for founders page):**
  - Show Coordinator, Yamini Pictures — Delhi Crime S2 for Netflix (2019+)
  - Project Manager, Red Chillies Entertainment — Class of 83 for Netflix (2019+)
  - Head of Operations, Saanvi Nayak Films — Films, Documentaries, NFDC projects (2015-2018)
  - AD & Casting Director, Chrome Pictures — Ads for Nestle, Maruti, Subway etc. (2013-2015)
  - Production Assistant & AD, Electric Dreams Film Company (2013-2014)

---

## Tasks

### Task 1: Fix founder data and update nav items

**Files:**
- Modify: `src/data/founders.ts`
- Modify: `src/data/nav-items.ts`

- [ ] **Step 1:** Update `founders.ts` — fix Varun's bio, add `detailedBio` and `experience` fields to the interface for the detailed founders page

```typescript
export interface Founder {
  name: string;
  fullName: string;
  title: string;
  role: string;
  bio: string;
  detailedBio: string;
  experience: { period: string; role: string; company: string; detail: string }[];
  credentials: string[];
  image: string;
}
```

- [ ] **Step 2:** Update Varun's entry with correct bio from his CV
- [ ] **Step 3:** Add detailed experience arrays for both founders
- [ ] **Step 4:** Update `nav-items.ts` to include new page links (About, Products, Founders)

### Task 2: Update landing page to be condensed overview

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/building.tsx` — condense product section, add "learn more" links to product pages, update subtitle with USP text
- Modify: `src/components/founders.tsx` — change heading to "meet the crew.", remove subtitle, add "learn more" link to founders page
- Modify: `src/components/ui/floating-navbar.tsx` — update nav for new pages

- [ ] **Step 1:** Update `building.tsx`:
  - Change subtitle to USP text: "A tech solution that is long awaited — diversified for Vendors, Production, and Professionals. Each one, uniquely mentored by leading professional experts. Designed to address the pain points and gaps for the Indian M&E industry."
  - Add "learn more →" link on each horizon card pointing to `/products/vendor`, `/products/production`, `/products/people`
  - Add `slug` field to horizons data or use index-based routing

- [ ] **Step 2:** Update `founders.tsx`:
  - Change heading from "the people." to "meet the crew."
  - Remove the subtitle paragraph ("Founded by two professionals...")
  - Add a "meet the founders →" link to `/founders`

- [ ] **Step 3:** Update `floating-navbar.tsx` nav links for new pages

- [ ] **Step 4:** Update `page.tsx` if any structural changes needed

### Task 3: Create About page

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1:** Create about page with:
  - Hero/header section with company mission
  - USP section: "A Tech Solution that is long awaited, diversified for Vendors, Production and Professionals. Each one, uniquely mentored by leading professional experts. Designed to address the pain points and gaps for the Indian M&E Industry dynamics."
  - "Who We Serve" section using `audiences.ts` data displayed as a grid of GlassCards
  - Do NOT include the line: "Products made from the people, and by the people, who will use it first — because they are part of the crew."
  - Reuse existing components: GlassCard, SectionReveal, SectionRevealChild

- [ ] **Step 2:** Add page metadata (title, description, OpenGraph)

### Task 4: Create Founders page

**Files:**
- Create: `src/app/founders/page.tsx`

- [ ] **Step 1:** Create founders page with:
  - Heading: "meet the crew."
  - No "Built from the Inside" text anywhere
  - Detailed founder cards using the `detailedBio` and `experience` fields
  - Show career timeline/experience list for each founder
  - Reuse GlassCard, SectionReveal components

- [ ] **Step 2:** Add page metadata

### Task 5: Create Product pages (vendor, production, people)

**Files:**
- Create: `src/app/products/vendor/page.tsx`
- Create: `src/app/products/production/page.tsx`
- Create: `src/app/products/people/page.tsx`
- Modify: `src/data/horizons.ts` — add `slug` and extended content fields

- [ ] **Step 1:** Extend `horizons.ts` with `slug`, `longDescription`, `features` fields for each product

- [ ] **Step 2:** Create vendor product page — the equipment tracking layer, "in active development"

- [ ] **Step 3:** Create production product page — budgets, schedules, call sheets layer

- [ ] **Step 4:** Create people product page — professional network layer

- [ ] **Step 5:** Each page should include: hero with product name, the problem quote, detailed description, features/capabilities, status indicator, and a waitlist CTA

- [ ] **Step 6:** Add page metadata for each

### Task 6: Footer cleanup

**Files:**
- Modify: `src/components/footer.tsx`

- [ ] **Step 1:** Verify no tagline exists under "the riverroute" name (currently clean — confirm and leave as-is)
- [ ] **Step 2:** Ensure footer links are updated for new pages if needed

### Task 7: Verify and test

- [ ] **Step 1:** Run `npm run build` to verify no build errors
- [ ] **Step 2:** Run dev server and verify all pages render correctly
- [ ] **Step 3:** Verify navigation between pages works
- [ ] **Step 4:** Check mobile responsiveness
