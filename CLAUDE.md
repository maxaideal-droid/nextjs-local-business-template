# Local Business Template — Project Overview

Next.js 15 starter for local business websites. Clone this template for each new client. Update `config/site.ts`, swap brand colors, replace placeholder content, and follow `SETUP.md`.

Business details live entirely in `config/site.ts` — never hardcode them in components.

---

# Voice — read before writing any content

When writing **any blog post, service page, or customer-facing copy**, read the files in `./references/`:

| File | What it is |
|------|-----------|
| `references/voice.md` | Writing style, sentence rhythm, vocabulary, formatting, anti-patterns |
| `references/humour.md` | How the brand handles humour |
| `references/stats.md` | Canonical real numbers — pricing, response times, reviews |
| `references/stories.md` | Recurring anecdotes the brand uses |
| `references/opinions.md` | Hot takes and strong opinions backed by numbers |

**Content rules:**

- Never use AI-tell phrases (e.g. "unlock", "leverage", "seamless", "world-class", "in today's fast-paced world"), exclamation marks, or emojis
- Start with the answer; add context after
- Use real numbers from `stats.md`, never round
- One story per post max (from `stories.md`, don't invent new ones)
- One strong opinion per post max (from `opinions.md`, backed by a number)
- Tell people when NOT to hire you — biggest voice tell

Before shipping any writing, re-read `references/voice.md` → "Tells that it's AI-written" and delete anything that matches.

---

# On-page SEO

When generating or editing a blog post, read `on-page-seo.md` at the root. Every item applicable to the page type must be satisfied.

Required for every long-form post:
- FAQ section with FAQPage schema (JSON-LD)
- Breadcrumbs + BreadcrumbList schema
- Author byline + Person schema
- Table of contents with anchor links
- 3–5 internal links, 2–3 external links to authoritative sources
- Open Graph + Twitter Card meta
- Length within 20% of SERP top-3 for the target keyword

---

# Technical SEO

Site-wide:
- `app/sitemap.ts` — auto-generated sitemap covering all routes
- `app/robots.ts` — allows all crawlers, points to sitemap
- Canonical URLs on every page (via `metadata.alternates.canonical`)
- Open Graph images (1200×630) — `/public/og/*.png`
- Image width/height attributes for CLS
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
- Static pre-rendering — `output: 'export'`
- Mobile viewport — set in `app/layout.tsx`
- GA4, Ahrefs analytics, and GSC verification — all configured via `config/site.ts`, only activate when real values replace placeholders

---

# Design

Premium, modern, elegant. Subtle animations, proper spacing, clear visual hierarchy. No emoji icons. No generic gradients. One accent colour (gold `#C8A05A` by default — swap per client).

Default brand color slots (swap all 6 in `app/globals.css`):
- `--color-cream: #F7EFE4`
- `--color-cream-2: #FBF6EE`
- `--color-gold: #C8A05A`
- `--color-gold-dark: #A9824A`
- `--color-bronze: #8C5A35`
- `--color-brown: #3B2A1E`
- `--color-text: #4A3B2C`

Fonts: Cormorant Garamond (script/italic), Playfair Display (headings), Montserrat (body).

---

# Development Rules

**Rule 1: Always read first** — before any action, read `CLAUDE.md`.

**Rule 2: Define before you build** — no code before spec approval.

**Rule 3: Look before you create** — check existing files before creating new ones.

**Rule 4: Test before you respond** — run `npm run build` before saying "done".

**Core Rule** — do exactly what is asked. Nothing more, nothing less.

---

# Tech Stack

- **Language:** TypeScript
- **Framework:** Next.js 15 (App Router)
- **Rendering:** Static Site Generation via `output: 'export'`. `out/` is the deployable.
- **Styling:** Tailwind CSS v4 — config via `@theme` in `app/globals.css`. No `tailwind.config.ts`.
- **Content:** Flat TypeScript files in `/content/*.ts`. No database.
- **Booking:** Iframe embed — URL lives in `config/site.ts` as `booking`
- **Deployment:** Netlify (build command: `npm run build`, publish dir: `out`)

**SSG constraints — do NOT break these:**
- No `cookies()`, `headers()`, or `searchParams` in server components
- No `fetch(..., { cache: 'no-store' })` or `export const dynamic = 'force-dynamic'`
- No runtime API routes
- Dynamic routes (`[slug]`) must implement `generateStaticParams`
- Async params in dynamic routes: `params: Promise<{ slug: string }>` — must `await params`
- All data fetched at **build time**, not request time

---

# Running the Project

1. `npm install`
2. `npm run dev` — opens on `http://localhost:3000`
3. To ship: `npm run build` → the `out/` directory is the deployable site

---

# Organisation Rules

- One component per file
- Shared components live in `/components/`
- Page-specific content lives in `/content/*.ts`
- Images live in `/public/`
- Don't create new top-level folders without asking

---

# New Client Setup

Follow `SETUP.md` in order. The 6 phases take under an hour:
1. Local setup — update `config/site.ts`, swap colors, replace content
2. Deploy to Netlify
3. Google Search Console verification + sitemap submission
4. Google Analytics 4
5. Google Indexing API automation (GitHub Action)
6. Ahrefs

After Phase 5, every push to `main` automatically notifies Google of all updated URLs. No manual GSC work after that.

---

# Testing

Before marking any task done:
- `npm run build` completes with no errors
- Every route shows `○ (Static)` in the build log
- **View-source check:** the HTML contains the actual rendered content and any JSON-LD schema
- **Voice check** (for content changes): re-read `references/voice.md` → "Tells that it's AI-written" and delete anything that matches

Never say "done" if the build is failing, there are console errors, the voice reads as AI, or the feature hasn't been tested.

---

# Scope

Only build what's requested. If anything is unclear, ask before starting.
