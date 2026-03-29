# The Riverroute Website — Design Spec

**Date:** 2026-03-29
**Status:** Approved
**Source PRD:** TheRiverroute_Website_PRD_v1.docx

---

## 1. Architecture & Tech Foundation

### Routes
- `/` — single-scroll homepage with 6 anchor sections
- `/careers` — standalone careers page

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Component Libraries:**
  - Aceternity UI — visual/animated components (navbar, hero effects, cards, backgrounds, scroll animations)
  - shadcn/ui — form inputs, select, tabs, accordion, buttons (functional primitives)
  - Framer Motion — custom animations (counter, staggered reveals) — already an Aceternity dependency
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL) — wired up last
- **Email:** Resend — notification emails to founders on form submission — wired up last
- **Hosting:** Vercel — configured last
- **Analytics:** Plausible or GA4 — configured last
- **CMS:** None — all content hardcoded

### Build Order
1. Frontend (all sections, both pages, responsive, animations)
2. Supabase integration (contact_submissions table, RLS, API routes)
3. Resend integration (email notifications on form submit)
4. Vercel deployment + domain DNS
5. Analytics setup

---

## 2. Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Navy (Primary) | `#1B2A4A` | Hero backgrounds, nav, section backgrounds, heading text |
| Gold (Accent) | `#C9973A` | CTA buttons, accent borders, highlights, status badges |
| Off-White | `#F8F6F1` | Alternating section backgrounds |
| Light Grey | `#F5F5F5` | Card backgrounds, dividers |
| Dark | `#1A1A1A` | Body copy |
| Mid Grey | `#444444` | Secondary copy, labels, footnotes |
| White | `#FFFFFF` | Text on dark backgrounds |

### Typography
- **Headlines:** Playfair Display (Google Fonts), weight 700, sizes H1: 56–64px, H2: 36–40px, H3: 24–28px, line-height 1.15
- **Body:** Inter (Google Fonts), weight 400, size 16–18px, line-height 1.65
- **Labels:** Inter, weight 500, size 13–14px, line-height 1.4
- **Sub-headlines:** weight 600

### Responsive Breakpoints
- Mobile: 360px–768px (stacked layouts, hamburger nav)
- Tablet: 768px–1024px (2-column grids)
- Desktop: 1024px–2560px (full layouts)

### Photography
- Placeholder images throughout during development
- Production-ready dimensions so real photos can be swapped in later
- Hero images: dark overlay (navy at 50–60% opacity) for text legibility
- Founder photos: professional headshot placeholders, equal dimensions

---

## 3. Homepage (`/`) — Section Specifications

### 3.1 Navigation
- **Component:** Aceternity Floating Navbar
- **Desktop:** Logo (left) | Home · Industry · What We're Building · Who We Serve · Founders · Careers | "Talk to Us" gold pill button (right)
- **Mobile:** Hamburger menu with stacked links. "Talk to Us" always visible in header.
- **Behavior:** Sticky, hides on scroll down, reveals on scroll up. Background blur + border-bottom appears after scrolling past hero (200ms transition). Active nav state via Intersection Observer highlights current section.
- Clicking anchor links smooth-scrolls to section. "Careers" navigates to `/careers`.

### 3.2 Hero (#hero)
- **Background:** Aceternity Aurora Background with navy (#1B2A4A) base
- **Headline:** Aceternity Text Generate Effect — "India's Media and Entertainment industry is one of the largest in the world. The people who run it deserve software that actually understands them."
- **Sub-headline:** Fades in after headline — "The Riverroute builds technology for the industry — from the inside."
- **CTA Primary:** "Explore What We're Building" → scrolls to #building | Gold background, dark text, pill shape
- **CTA Secondary:** "Talk to the Founders" → scrolls to #contact | White outlined, white text
- **Scroll indicator:** Subtle animated down-arrow at bottom of hero viewport
- **Constraint:** No product names, feature descriptions, or customer segment names.

### 3.3 Industry & The Gap (#industry)
- **Background:** Off-White (#F8F6F1)
- **Headline:** "This is not just about films"
- **Anchor stat:** Large display number ₹2,50,000 Cr — Framer Motion counter, counts up from 0 on scroll-into-view, 1.5s duration. Label: "India's M&E sector in 2024". Source footnote: FICCI-EY 2024.
- **Verticals grid:** Aceternity Bento Grid — 8 cards, each with icon, name, market size figure:
  - Film & Theatrical
  - OTT Platforms
  - Television
  - Music
  - Live Events
  - Animation & VFX
  - Online Gaming
  - Digital Media
- **Supporting copy:** "Every one of these verticals runs on people, processes, and relationships. Almost none of it has software built specifically for it."
- **The Gap callout:** Aceternity Lamp Effect — "Crores of rupees worth of equipment leaves warehouses every day. Every single piece of it tracked on WhatsApp and hope." — Most prominent visual element in the section.
- **Transition copy:** "We are changing that. From the inside."
- **Constraint:** All statistics sourced. Footnote citations beneath each figure.

### 3.4 What We're Building (#building)
- **Background:** Navy (#1B2A4A)
- **Headline:** "We are building the software this industry has always deserved."
- **Intro copy:** "We are currently building our first products. They are designed for the people who keep this industry running — and they are being built with their input, not in spite of it."
- **Horizon cards:** Aceternity 3D Card Effect, staggered reveal (100ms delay between cards)
  - **Horizon 01 — The Vendor:** Pull quote about equipment tracking. Body about clarity for equipment rental vendors. Status: "In active development" (gold badge).
  - **Horizon 02 — The Production:** Pull quote about invisible film journey. Body about transparency in production. Status: "In development" (gold badge, slightly muted).
  - **Horizon 03 — The People:** Pull quote about talent discovery. Body about connecting India's M&E network. Status: "On the roadmap" (muted badge).
- **Waitlist CTA:** Inline email capture — shadcn input + gold "Stay in the Loop" pill button. On submit: saves to API route (Supabase later) with type='waitlist'.
- **Constraint:** No product names, codenames, screenshots, feature lists, module names, or tech stack details.

### 3.5 Who We Serve (#who-we-serve)
- **Background:** Off-White (#F8F6F1)
- **Headline:** "From the biggest studios to the smallest vendor — if you work in Indian M&E, we are building for you."
- **Audience grid:** Aceternity Focus Cards — 8 cards, hover highlights one and blurs others:
  - OTT Platforms & Broadcasters
  - Production Houses & Studios
  - Equipment Rental Vendors
  - Set & Props Vendors
  - Post-Production Houses
  - Coordinators & Line Producers
  - Technicians & Crew
  - Independent Filmmakers
  - Each card: title + one-line description of what The Riverroute means for them.
- **Philosophy callout:** Prominent styled block — "Products made from the people, and by the people, who will use it first — because they are part of the crew."
- **CTA:** "If you work in Indian M&E — your experience is an asset. Share it with us." Button: "Share Your Experience" → scrolls to #contact with Industry Input tab pre-selected.

### 3.6 Founders (#founders)
- **Background:** Navy (#1B2A4A)
- **Headline:** "Built from the inside."
- **Sub-copy:** "The Riverroute was founded by two professionals who have collectively spent more than three decades working inside the Indian film and television industry. This is not a pivot. It is a culmination."
- **Layout:** Two cards side by side (desktop), stacked (mobile). Equal visual weight.
- **Varun card:** Placeholder photo (top) | Name: Varun Hemraj Khandelwal | Title: Co-Founder | Role: Film Producer & Industry Veteran | Narrative bio | IMDb link | Key credentials: Red Chillies Entertainment, Yamini Pictures, NFDC Delhi, feature films, advertising, documentaries
- **Ria card:** Placeholder photo (top) | Name: Ria Bhavsar | Title: Co-Founder | Role: Show Coordinator, Project Manager & Production Operations Leader | Narrative bio | Key credentials: Delhi Crime S2 (Netflix), Class of 83 (Netflix, Red Chillies), Saanvi Nayak Films | Degree: BMM, St. Andrews College Mumbai, 2012
- **Tone:** Narrative profiles, not resume summaries. Read like a colleague introduction.

### 3.7 Contact / CTA (#contact)
- **Background:** Off-White (#F8F6F1)
- **Headline:** "The best products in this industry will be built with this industry. Let's talk."
- **Form pathways:** shadcn Tabs — 5 tabs:
  - **Waitlist** (default): Name + Email → "Join Waitlist"
  - **Investor Enquiry:** Full Name + Fund/Firm (optional) + Message → "Send Enquiry"
  - **Request a Demo:** Full Name + Company + Role + Phone (optional) → "Request Demo"
  - **Industry Input:** Name + Role in industry + Years of experience (select: 1-3/3-7/7-15/15+) + Biggest operational frustration + Email (optional) → "Share My Experience"
  - **General:** Name + Email + Message → "Send Message"
- **Default tab:** Waitlist. When arriving via "Share Your Experience" CTA from #who-we-serve, Industry Input tab is pre-selected (via URL param or state).
- **Submit behavior:** POST to `/api/contact` (Supabase integration later). Inline success message replaces form: "Thank you. We will be in touch." No page reload. Form does not clear until user explicitly resets.
- **Form components:** shadcn input, textarea, select, button — styled to match design system.

### 3.8 Footer
- **Background:** Navy (#1B2A4A)
- Logo | Tagline: "Built by the industry. For the industry." | Page links | LinkedIn icon | Privacy Policy · Terms | Mumbai, India | © The Riverroute LLP 2026

---

## 4. Careers Page (`/careers`)

### 4.1 Hero/Header
- Navy background, Playfair Display headline: "Work at The Riverroute"
- Sub-copy about mission, small team, fast shipping. No image needed.

### 4.2 Why The Riverroute
- 3-4 bullet points: mission/market size, direct founder access, real feature ownership, agentic AI-assisted development, founding team framing.

### 4.3 How We Work
- Short prose: WFH, async-first, fast feedback loops, test task philosophy, no ghosting commitment.

### 4.4 Current Openings
- Aceternity 3D Card Effect per opening: Job Title | Type (Hybrid/Remote) | Location (Mumbai) | One-paragraph description | "Apply on LinkedIn" gold button → LinkedIn job post URL.
- URLs hardcoded, updated when listings change.

### 4.5 What We Look For
- Short prose: honesty, ownership, curiosity about the industry.

### 4.6 Empty State
- If no active listings: "We are not actively hiring right now, but we are always interested in exceptional people. Send us a note." with mailto link.

---

## 5. Global Interactions & Motion

| Element | Behavior | Spec |
|---------|----------|------|
| Scroll reveals | Sections/cards fade + slide up on scroll-into-view | 400ms, ease-out, trigger once |
| Nav | Floating Navbar — blur + border after hero | 200ms transition |
| Counter | ₹2,50,000 Cr count-up from 0 | 1.5s, on scroll-into-view |
| Horizon cards | Staggered reveal | 100ms delay between cards |
| CTA hover | Scale 1.03 + shadow increase | 150ms transition |
| Smooth scroll | All anchor links | Native smooth scroll behavior |
| Active nav | Intersection Observer | Highlights current section in nav |

**Principle:** Motion is purposeful, not decorative. Every animation makes content feel alive without drawing attention to itself.

---

## 6. SEO & Accessibility

### SEO
- Unique meta title + description per page
- Schema.org structured data: Organisation, Person (Varun, Ria), WebPage
- OG tags + Twitter Card tags on both pages
- `sitemap.xml` + `robots.txt` from day one
- Target keywords: Indian M&E software, Indian film industry technology, media entertainment India software

### Accessibility
- WCAG 2.1 Level AA minimum
- All images have descriptive alt text
- Color contrast ratios meet AA standards
- Full keyboard navigability
- Semantic HTML throughout

### Performance Targets
- Lighthouse: 90+ on Performance, Accessibility, Best Practices, SEO
- FCP: under 1.5s on 4G
- LCP < 2.5s, CLS < 0.1, FID < 100ms
- All images WebP with lazy loading

---

## 7. Supabase Schema (wired up last)

Table: `contact_submissions`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid, PK | default gen_random_uuid() |
| created_at | timestamptz | default now() |
| type | text, not null | 'waitlist' \| 'investor' \| 'demo' \| 'industry_input' \| 'general' |
| name | text, not null | |
| email | text, nullable | Required for waitlist and general |
| company | text, nullable | Demo pathway |
| role | text, nullable | Demo and industry_input |
| phone | text, nullable | Demo pathway |
| years_experience | text, nullable | Industry_input pathway |
| message | text, nullable | Investor, general, industry_input |
| fund_firm | text, nullable | Investor pathway |

RLS: insert-only from anon role. Select restricted to authenticated role.

---

## 8. Competitive Safety

Every piece of copy must pass: "If a well-funded competitor read this, would they know specifically what we are building, who we are building it for, and how we are building it?" If yes — rewrite.

**Never appear on site:** Product names/codenames, screenshots/mockups, feature lists/module names, tech stack details, specific target segments, pricing, launch timelines, early customer names.
