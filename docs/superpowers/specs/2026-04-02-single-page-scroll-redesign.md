# Single-Page Scrolling Landing Redesign

## Goal
Restructure the landing page from a multi-page navigation model to a single continuous scrolling experience with 5 storytelling sections. Detail pages (`/about`, `/founders`, `/products/*`) remain for "read more" deep dives, but the landing page tells the complete story.

## Navbar

- **Bigger**: increased padding, larger logo text
- Logo: "the riverroute" — prominent display font, larger than current `text-sm`
- Nav links are **anchor-based smooth scroll** to landing page sections:
  - Home → `#hero`
  - The Industry → `#industry`
  - Products → `#building`
  - Who We Serve → `#serve`
  - Founders → `#founders`
  - Join Waitlist (CTA button) → `#footer`
- Always visible (current behavior)

## Section 1: Hero (`#hero`)

- Full viewport height
- Background video with dark overlay (existing)
- Content **centered** on page (currently left-aligned — change to center)
- **"the riverroute"** — very large, display font, bold, centered
- Below: **"Built for Crew, by Crew — finally, a software that works the way you do!!"**
- Scroll indicator at bottom (existing)
- Remove current headline ("built by the industry. for the industry.") and subtext

## Section 2: Problem Statement (`#industry`)

- Rework existing `Industry` component
- Opening text: "India's Media and Entertainment industry is one of the largest in the world."
- Big stat stays (₹2,50,000 Cr)
- **Horizontal scrolling carousel** of verticals (replacing current grid):
  - Each card shows vertical name + revenue figure
  - Scroll horizontally like iTunes/Netflix
  - On click, card expands to show larger detail
  - Touch/drag + mouse scroll support
- Closing line: "All of these verticals run on People, Processes and Relationships. Almost none of it has a software tailor made for them."

## Section 3: Products & USP (`#building`)

- Heading: "what we're building."
- USP subtitle: "A Tech Solution that is long awaited — diversified for Vendors, Production and Professionals. Each one, uniquely mentored by leading professional experts. Designed to address the pain points and gaps for the Indian M&E Industry dynamics."
- Product cards (existing horizon cards) with "learn more →" links to `/products/vendor`, `/products/production`, `/products/people`
- Waitlist CTA at bottom (existing)

## Section 4: Who We Serve (`#serve`) — NEW on landing page

- Heading: "who we serve."
- Grid of glass cards using `audiences.ts` data (8 audience types)
- **Do NOT include** the line: "Products made from the people, and by the people, who will use it first — because they are part of the crew."
- Uses existing SectionReveal + GlassCard components

## Section 5: Founders (`#founders`)

- Heading: "meet the crew."
- **No** "Built from the Inside" text anywhere
- Founder cards with photo placeholders, bios, credentials
- Bios are correct in data (Varun's already fixed)
- "meet the founders →" link to `/founders` detail page

## Footer (`#footer`)

- Waitlist CTA section (existing)
- **No tagline** under "the riverroute" name
- Footer links: anchor links for landing sections + detail page links
- Copyright line

## Scroll Storytelling

- Each section has generous vertical spacing (py-32 or more)
- SectionReveal animations trigger as user scrolls into each section
- Parallax effects on headings (existing)
- Smooth scroll behavior for nav anchor clicks (`scroll-behavior: smooth` on html)
- Consider scroll-snap for section-by-section feel

## Files to Modify

- `src/app/page.tsx` — add WhoWeServe section import
- `src/components/hero.tsx` — center content, new headline text
- `src/components/industry.tsx` — horizontal scroll carousel for verticals
- `src/components/building.tsx` — already has USP text (no change needed)
- `src/components/founders.tsx` — already correct (no change needed)
- `src/components/footer.tsx` — verify no tagline (already clean)
- `src/components/ui/floating-navbar.tsx` — bigger, anchor links
- `src/data/nav-items.ts` — all anchor links
- NEW: `src/components/who-we-serve.tsx` — new section component

## Files NOT Changed

- `src/data/founders.ts` — already correct
- `src/data/horizons.ts` — already has slugs
- `src/data/audiences.ts` — data used as-is
- Detail pages (`/about`, `/founders`, `/products/*`) — remain for deep dives
