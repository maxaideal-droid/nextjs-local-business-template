# Setup Guide — Next.js Local Business Template

Spin up a fully SEO-instrumented local business site in under an hour.

---

## Before you start

1. Create a new GitHub repo using the **"Use this template"** button on `nextjs-local-business-template`
2. Clone the new repo locally — never edit the template repo directly

---

## Phase 1 — Local Setup (~15 min)

- [ ] Open `config/site.ts` — fill in every field with the client's details
- [ ] Swap the 6 brand color variables in `app/globals.css` (`--color-cream`, `--color-gold`, `--color-bronze`, etc.)
- [ ] Replace placeholder content in `content/services.ts` (real service names, prices, descriptions)
- [ ] Replace placeholder content in `content/testimonials.ts` (real client reviews)
- [ ] Replace placeholder images in `public/` (gallery photos + OG image at 1200×630)
- [ ] Fill in `references/stats.md` — real pricing, turnaround times, review counts
- [ ] Fill in `references/stories.md` — 3–5 real client anecdotes to use in blog posts
- [ ] Fill in `references/author.md` — real author bio for blog schema
- [ ] Run `npm install`
- [ ] Run `npm run dev` — confirm site loads at `http://localhost:3000`
- [ ] Run `npm run build` — must complete with 0 errors, 0 warnings

---

## Phase 2 — Deploy to Netlify (~10 min)

- [ ] Push to GitHub (`main` branch)
- [ ] Go to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
- [ ] Connect the GitHub repo
- [ ] Set **Build command**: `npm run build`
- [ ] Set **Publish directory**: `out`
- [ ] Add custom domain in Netlify → Domain management
- [ ] Confirm HTTPS is active (Netlify provisions Let's Encrypt automatically)

> **Note:** `verify-seo.mjs` runs automatically during every build and exits with code 1 on critical SEO errors. Netlify treats this as a failed deploy — fix all errors before pushing.

---

## Phase 3 — Google Search Console (~10 min)

- [ ] Go to [search.google.com/search-console](https://search.google.com/search-console) → **Add property → URL prefix**
- [ ] Enter the client domain (e.g. `https://acmelocal.com`)
- [ ] Choose **HTML tag** verification → copy the `content="..."` value
- [ ] Add it to `config/site.ts` as `gscVerification`
- [ ] Push to GitHub → wait for Netlify deploy → click **Verify** in GSC
- [ ] In GSC: **Sitemaps** → submit `sitemap.xml`

---

## Phase 4 — Google Analytics 4 (~10 min)

- [ ] Go to [analytics.google.com](https://analytics.google.com) → **Create property**
- [ ] Enter business name + timezone
- [ ] Platform: **Web** → enter domain → turn on **Enhanced measurement**
- [ ] Copy the Measurement ID (`G-XXXXXXXXXX`)
- [ ] Add it to `config/site.ts` as `ga4`
- [ ] Push → confirm GA4 shows data collection active (Realtime view)

---

## Phase 5 — Google Indexing API Automation (~20 min)

This makes every push to `main` automatically notify Google of all updated URLs. No manual GSC clicking after this is set up.

- [ ] Go to [console.cloud.google.com](https://console.cloud.google.com) → **Create new project**
  - Name it `[ClientName] SEO` (e.g. `Acme Local SEO`)
- [ ] Enable **Web Search Indexing API** on that project
- [ ] Go to **IAM & Admin → Service Accounts → Create service account**
  - Name: `indexing-bot`
- [ ] Open the service account → **Keys tab → Add Key → JSON** → download the file
  - Keep this file safe — never commit it to the repo
- [ ] In GSC: **Settings → Users and permissions → Add user**
  - Paste the service account email (ends in `@[project].iam.gserviceaccount.com`)
  - Set role: **Owner**
- [ ] In GitHub repo: **Settings → Secrets and variables → Actions → New secret**
  - Name: `GOOGLE_SERVICE_ACCOUNT_KEY`
  - Value: paste the entire contents of the downloaded JSON file
- [ ] Push any change → check the **Actions tab** → confirm green checkmark

---

## Phase 6 — Ahrefs (~5 min)

- [ ] Add the site to Ahrefs
- [ ] Copy the analytics `data-key` value
- [ ] Copy the site verification `content` value
- [ ] Add both to `config/site.ts` as `ahrefs` and `ahrefsSiteVerification`
- [ ] Push

---

## Done — Final Verification

- [ ] Site is live at the custom domain with HTTPS
- [ ] GSC: property verified, `sitemap.xml` submitted, pages discovered
- [ ] GA4: Realtime view shows data collection active
- [ ] GitHub Actions: green checkmark on the last push to `main`
- [ ] Local build: `npm run build` → 0 errors, 0 warnings, every route shows `○ (Static)`
- [ ] View-source check: HTML contains rendered content and JSON-LD schema blocks

---

## Working on the site day-to-day

- **Always** update `config/site.ts` first — never hardcode business details in components
- **Every blog post** needs `seoTitle` if the H1 title is longer than ~38 chars
- **After Phase 5**, every push to `main` triggers the GitHub Action — no manual GSC submission needed
- **Build must pass** before marking any task done — `npm run build` with 0 errors, 0 warnings
- **Read `on-page-seo.md`** before generating any page or blog post
- **Read `references/voice.md`** before writing any customer-facing copy
