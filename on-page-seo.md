# On-Page SEO Checklist

Canonical on-page SEO reference for this template. Every blog post, service page, and static page must satisfy every applicable item below.

**Every page must pass every applicable item. No exceptions.**

---

## HEAD / METADATA

- [ ] **Title tag**: 50–60 chars, primary keyword near the start
- [ ] **Meta description**: 150–160 chars, primary keyword + benefit + soft CTA
- [ ] **Canonical URL** set via `alternates.canonical` in page metadata
- [ ] **Open Graph tags**: `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type`
- [ ] **Twitter Card tags**: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] **Language attribute** on `<html>` (`lang="en"` — already set in `app/layout.tsx`)
- [ ] **Viewport meta tag** (already set in `app/layout.tsx`)
- [ ] **Favicon** (already set in `app/layout.tsx`)
- [ ] **Charset meta** (Next.js sets this automatically)

## URL STRUCTURE

- [ ] **Short slug** (under 60 chars)
- [ ] **Primary keyword** in the slug
- [ ] **Hyphens** only — never underscores
- [ ] **Lowercase** only
- [ ] **No stop words** ("the", "a", "of") unless necessary for clarity
- [ ] **Logical hierarchy**: `/services/[service-name]`, `/blog/[post-slug]`

## HEADINGS

- [ ] **Exactly one H1** per page, contains primary keyword
- [ ] **Logical H2 → H3** hierarchy (never skip levels)
- [ ] **H2s** use supporting keywords + questions from the cluster
- [ ] **No keyword stuffing** — write naturally

## COPY / BODY

- [ ] **Primary keyword** in the first 100 words
- [ ] **Direct answer** to the query in the first paragraph
- [ ] **Length** matches SERP average (within 20% of top-3 word count)
- [ ] **Short paragraphs** (1–4 sentences)
- [ ] **Readability**: 8th–10th grade level
- [ ] **Active voice** preferred
- [ ] **Bold key phrases** (sparingly)
- [ ] **Bullets and numbered lists** where appropriate

## FAQ SECTION (every blog post)

- [ ] **4–8 questions** from Ahrefs Questions tab + "People Also Ask"
- [ ] **Direct, clear answers** (2–4 sentences each)
- [ ] **FAQPage schema** (JSON-LD) applied

## IMAGES

- [ ] **Alt text** describes the image + keyword where natural
- [ ] **Descriptive filenames** with hyphens (e.g. `service-guide-hero.webp`)
- [ ] **WebP format**, compressed under 200 KB
- [ ] **Width/height attributes** specified (prevents CLS)
- [ ] **Lazy loading** (`loading="lazy"`) for below-fold images
- [ ] **Responsive srcset** where needed
- [ ] **Featured/hero image** for social sharing
- [ ] Images saved to `/public/blog/[post-slug]/`

## INTERNAL LINKS

- [ ] **3–5 internal links** per post
- [ ] Link to **related blog posts** and **relevant service pages**
- [ ] At least one link points to the **booking page**
- [ ] **Descriptive anchor text** — never "click here" or "read more"
- [ ] **Contextually placed** in body copy
- [ ] **Breadcrumb navigation** on every page

## EXTERNAL LINKS

- [ ] **2–3 external links** to authoritative sources (.gov, .edu, major publications)
- [ ] **Relevant** to the topic
- [ ] Open in **new tab** with `rel="noopener"`
- [ ] `rel="nofollow"` for sponsored links

## SCHEMA MARKUP (JSON-LD)

- [ ] **Article** schema on every blog post (`datePublished`, `dateModified`, `author`, `image`)
- [ ] **LocalBusiness** schema on homepage (already present — do not duplicate)
- [ ] **Service** schema on service/landing pages
- [ ] **FAQPage** schema wherever an FAQ section exists
- [ ] **BreadcrumbList** schema on every page
- [ ] **Organization** schema (site-wide — add to `app/layout.tsx` once)
- [ ] **Person** schema for author bylines on blog posts

## E-E-A-T SIGNALS

- [ ] **Author byline** with name on every blog post
- [ ] **Author bio** with credentials (years in business, qualifications)
- [ ] **Published date** displayed on page
- [ ] **"Last updated" date** when content is refreshed
- [ ] **Real stories, real numbers, real opinions** sourced from `references/` files
- [ ] **Cite authoritative sources** with external links
- [ ] Stats used in content match `references/stats.md` exactly — no rounding

## ACCESSIBILITY (affects SEO)

- [ ] **Semantic HTML5** tags: `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`
- [ ] **ARIA labels** on interactive elements where needed
- [ ] **Color contrast** meets WCAG AA (4.5:1 for body text)
- [ ] **Alt text** on ALL images (empty `alt=""` for decorative only)
- [ ] **Descriptive link text**

## MOBILE / RESPONSIVE

- [ ] **Responsive layout** (Tailwind handles this)
- [ ] **Touch targets** minimum 48×48 px
- [ ] **Body font size** minimum 16 px
- [ ] **No horizontal scroll** at any viewport

## SOCIAL PREVIEW

- [ ] **Open Graph image** (1200×630, under 1 MB)
- [ ] **Twitter Card image** (1200×600)
- [ ] **Compelling `og:description`** — can differ from meta description

## CONVERSION ELEMENTS (service and landing pages only)

- [ ] **Primary CTA** above the fold
- [ ] **Phone number** with click-to-call (`tel:` link using `site.phoneE164`)
- [ ] **Multiple CTA placements** throughout the page
- [ ] **Trust signals**: years in business, credentials, certifications
- [ ] **Testimonials** with first names
- [ ] **Service-area coverage** listed
- [ ] **Booking embed or button** visible

## LONG-FORM CONTENT (1500+ words)

- [ ] **Table of contents** with anchor links at the top
- [ ] **Jump links** (`id` attributes) on each H2 section
- [ ] **Back-to-top** link or button

## NEXT.JS / TECHNICAL (every page)

- [ ] Page renders as `○ (Static)` in `npm run build` output
- [ ] No `force-dynamic`, `cookies()`, `headers()`, or `searchParams` used
- [ ] Route added to `app/sitemap.ts`
- [ ] `generateStaticParams` implemented for any dynamic `[slug]` routes
- [ ] Build passes `npm run build` with zero errors

## VOICE CHECK (do last — every page)

- [ ] Re-read `references/voice.md` → "Tells that it's AI-written" and delete anything that matches
- [ ] At least one place where you tell the reader when NOT to use the service
- [ ] No exclamation marks
- [ ] No emojis
- [ ] Story (if used) comes from `references/stories.md` — never invented
- [ ] Opinion (if used) comes from `references/opinions.md` and is backed by a real number
- [ ] All numbers match `references/stats.md` exactly

---

## How to use this file

1. Read this file before generating any page.
2. Every page must satisfy every applicable item — no exceptions.
3. **Conversion Elements** apply to service and landing pages only.
4. **Long-Form Content** items apply to any post 1500+ words.
5. **Voice Check** applies to every single page, always last.
