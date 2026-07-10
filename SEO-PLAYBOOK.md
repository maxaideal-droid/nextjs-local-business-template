# SEO Playbook — Ongoing Operations

Everything after SETUP.md is done. This is the ongoing work that actually moves rankings for a local service business. Battle-tested on a real site; nothing theoretical.

**Rule zero: always web-search current best practices before making SEO decisions.** Ranking factors, CTR curves, and AI-crawler behavior change fast — never rely on cached knowledge. Research the live SERP top 3 before writing any content.

---

## Operating cadence

**Daily (automated — verify occasionally):**
- Every push → all sitemap URLs submitted to Google Indexing API
- Every morning → GSC + GA4 fetched, one row appended to `seo-data/history.csv`

**Weekly (owner + agent):**
- Check GBP: respond to reviews, post a photo or update
- Review `seo-data/history.csv` trends — call out deltas (up/down/flat), not just snapshots
- Check for new queries with impressions but 0 clicks → title/meta improvements
- Flag any position drops

**Monthly:**
- One new city page (highest-opportunity city from GSC impressions data)
- One new blog post minimum (question-based queries, low difficulty, real volume)
- Schema audit: Google Rich Results Test on homepage + newest pages
- Core Web Vitals: PageSpeed Insights on homepage + newest city page; flag LCP > 2.5s
- Competitor check: search "[service] [city]" for each active city; note who's new above you

---

## Reading the data honestly

- **The GSC Page Indexing report lags days-to-weeks** for small sites. Trust `npm run check-indexing` (live URL Inspection API), not the dashboard chart.
- **New pages take days to 2+ weeks to index.** Sitemap + internal links + Indexing API pings all help, but the wait is normal. Only worry if a page is stuck for a month.
- **Impressions ≠ visitors.** One person searching repeatedly racks up impressions. Watch clicks and position.
- **Low positions get near-zero CTR.** Below position ~8, title/meta rewrites won't produce clicks — position is the blocker, not the snippet. Fix content and links first.
- **Local pack beats organic.** The map pack has a much flatter CTR curve than blue links — GBP optimization outranks on-page tweaks for "[service] [city]" money queries.
- **Owner's own searches are not ranking data.** Incognito still applies location personalization; exact-match queries ("mobile [service] [city]") rank far better than the generic ones that matter. Always verify against GSC position data.
- **A "0 clicks" query report may still mean clicks happened** — GSC suppresses rare queries for privacy. Cross-check the page-level report.

---

## Citations — the first backlinks (do these before any other link building)

Free listings, identical NAP (name, address, phone) everywhere. Inconsistent NAP actively hurts local rankings.

- **Free, no catch:** Bing Places, Apple Business Connect, Yelp, Facebook Business Page, Nextdoor, Foursquare, MapQuest
- **Included in tools you already pay for:** your booking platform's public directory listing (Vagaro/Booksy/etc.)
- **Free tier only, skip the upsell:** BBB (basic listing free; accreditation $500–1,000+/yr — not worth it), Chamber of Commerce (check for a free basic listing before paying for membership)
- **NAP rules:** exact business name, one phone format everywhere, service-area settings (no public address) matching the GBP setup

## Backlinks — what not to do

- **Never buy cheap links** (under ~$100/link = PBN/spam tier). For a new site fully dependent on organic traffic, a penalty is existential. Legitimate paid placements run $100–700+ and still aren't worth it at the start.
- **Do instead (free):** local blog/newspaper outreach, wedding/event blogs if relevant, Connectively (ex-HARO) journalist quotes, cross-promotion with adjacent local businesses (referral trades, mutual links).

---

## Google Business Profile — ongoing

Setup is in SETUP.md Phase 7. Ongoing:
- Reviews are the #1 trust signal — AI assistants filter on them too (recommended businesses average 4.1–4.3 stars). Ask every happy client; reviews from fresh Google accounts get filtered, so prioritize established accounts.
- Post monthly (photo or update) — profile activity is a ranking input
- Keep hours, service area, and services/prices current — must match the website

---

## AI assistant visibility (ChatGPT, Perplexity, Claude, Gemini)

AI assistants recommend very few businesses (~1–11% depending on platform). They cross-reference your site against listings, reviews, and directories before recommending anyone.

- **llms.txt** — already auto-generated at `/llms.txt`. Enrich it with real pricing and specifics in `app/llms.txt/route.ts`; specifics are what make AI able to recommend you.
- **Schema everywhere** — LocalBusiness/Service/FAQPage JSON-LD is how AI parses what you do (template does this; keep it on every new page)
- **Citations + reviews** — the multi-source confirmation AI requires; see sections above
- **FAQ content** — AI quotes well-structured Q&A; every long-form page should have an FAQ section with schema
- **robots.txt** — leave AI crawlers allowed (template default)

---

## Content pipeline

1. Pull keyword ideas from GSC (queries with impressions, no dedicated page) + a keyword CSV if you have one
2. Prioritize: question-based blog posts (KD ~0, real volume) and "[service] [city]" pages for cities in the service area
3. Research the SERP top 3 for the target keyword before writing — match or beat their depth; stay within 20% of their length
4. Every post follows `on-page-seo.md` + `references/voice.md` (the AI-tells checklist is the difference between content that reads human and content that doesn't)
5. Cite authoritative external sources — bonus: pages can pick up impressions for queries that mention the cited institutions

## Conversion elements worth copying

- **Click-to-text link** (`sms:+1XXXXXXXXXX`) in the hero — opens the visitor's native texting app pre-addressed; no app, no download. For solo operators this converts better than chatbots.
- **Referral/lead-capture page** — Netlify Forms (SETUP.md Phase 9): capture name + phone + "who referred you," show a promo code on the thank-you page
- **Visible pricing** — if competitors hide prices, publishing yours is a differentiator and earns "how much does X cost" queries
- **"When NOT to hire us" honesty** — the strongest trust/voice signal; use it on service pages and the booking section

---

## When traffic looks wrong

- **Unexplained "Paid Search" channel sessions** with no ads running → usually a booking-platform or directory link tagged as paid, or click spam. Check landing pages before reacting.
- **Queries from the wrong city/state** → often fuzzy matches against a same-named city elsewhere (or a competitor's location). Noise, not opportunity.
- **Engagement rate drops during a traffic spike** → new-channel dilution, not a site problem. Segment by channel before concluding anything.
