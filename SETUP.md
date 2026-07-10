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

Two property types — pick one:

**Option A — Domain property (recommended, covers www + http + subdomains):**
- [ ] Go to [search.google.com/search-console](https://search.google.com/search-console) → **Add property → Domain**
- [ ] Enter the bare domain (e.g. `acmelocal.com`)
- [ ] Verify via **DNS TXT record** — copy the value, add it at your DNS provider (Netlify DNS: Domain settings → DNS records → add TXT), wait a few minutes, click Verify
- [ ] Note: HTML tag verification does NOT exist for Domain properties — leave `gscVerification` in `config/site.ts` empty and don't add one
- [ ] The scripts expect this type by default: `GSC_PROPERTY` becomes `sc-domain:acmelocal.com` automatically

**Option B — URL prefix property:**
- [ ] **Add property → URL prefix** → enter `https://acmelocal.com`
- [ ] Choose **HTML tag** verification → copy the `content="..."` value → add to `config/site.ts` as `gscVerification`
- [ ] Push → wait for deploy → click **Verify**
- [ ] Set `GSC_PROPERTY=https://acmelocal.com/` (URL-prefix format) in `scripts/site-config.mjs` and the GitHub secret

Then either way:
- [ ] In GSC: **Sitemaps** (left sidebar → Indexing → Sitemaps) → submit `sitemap.xml`
- [ ] Only ever submit the actual sitemap file here — never paste an individual page URL into the sitemap box (it creates a permanent error entry). To nudge a single page, use **URL Inspection → Request Indexing** instead.

> **Note:** After Phase 5 (Indexing API), you never need to manually submit URLs to GSC again — every push handles it automatically.

---

## Phase 4 — Google Analytics 4 (~10 min)

- [ ] Go to [analytics.google.com](https://analytics.google.com) → **Create property**
- [ ] Enter business name + timezone
- [ ] Platform: **Web** → enter domain → turn on **Enhanced measurement**
- [ ] Copy the Measurement ID (`G-XXXXXXXXXX`)
- [ ] Add it to `config/site.ts` as `ga4`
- [ ] Push → confirm GA4 shows data collection active (Realtime view)
- [ ] Copy the numeric **Property ID** (Admin → Property → Property Settings — a number like `544251922`, different from the G- ID)
- [ ] Put it in `scripts/site-config.mjs` as the `GA4_PROPERTY_ID` fallback (used by `npm run ga`)

**For the daily GA4 report (do after Phase 5's service account exists):**
- [ ] In GA4: **Admin → Property → Property Access Management → Add user** — paste the service account email, role **Viewer**
- [ ] In [console.cloud.google.com](https://console.cloud.google.com), on your SEO project: enable the **Google Analytics Data API**

---

## Phase 5 — Google Indexing API Automation (~20 min)

This makes every push to `main` automatically notify Google of all updated URLs. No manual GSC clicking after this is set up.

- [ ] Go to [console.cloud.google.com](https://console.cloud.google.com) → **Create new project**
  - Name it `[ClientName] SEO` (e.g. `Acme Local SEO`)
- [ ] Enable **Web Search Indexing API** on that project
- [ ] Also enable the **Google Search Console API** (powers `npm run gsc` reports and `npm run check-indexing`)
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
- [ ] In GitHub repo: **Settings → Secrets and variables → Actions → New secret**
  - Name: `SITE_DOMAIN`
  - Value: your live domain, e.g. `https://acmelocal.com`
- [ ] Push any change → check the **Actions tab** → confirm green checkmark with ✓ next to each URL
- [ ] For local script runs: save a copy of the JSON key at `.secrets/gsc-key.json` (already gitignored) — `npm run gsc`, `npm run ga`, and `npm run check-indexing` read it automatically

---

## Phase 6 — Daily SEO Reporting (~10 min)

The `SEO Daily Report` GitHub Action pulls GSC + GA4 data every morning, appends one row to `seo-data/history.csv` (committed to the repo — this is your day-over-day trend log), and uploads full reports as an artifact.

- [ ] Update `scripts/site-config.mjs` — domain and GA4 property ID fallbacks
- [ ] Add GitHub secret `GA4_PROPERTY_ID` (numeric ID from Phase 4)
- [ ] Confirm secrets from Phase 5 exist: `GOOGLE_SERVICE_ACCOUNT_KEY`, `SITE_DOMAIN`
- [ ] Adjust the cron in `.github/workflows/seo-daily-report.yml` to the client's timezone (default 8am CT)
- [ ] Trigger it manually once (Actions tab → SEO Daily Report → Run workflow) — confirm it commits `seo-data/history.csv`
- [ ] Verify locally: `npm run gsc && npm run ga && npm run log-history`

> New sites show near-zero numbers for weeks. The CSV is the point — trends over time, not daily snapshots.

---

## Phase 7 — Google Business Profile (~30 min, owner must do this)

The single biggest local ranking factor — map pack visibility depends on this, not the website.

- [ ] Go to [business.google.com](https://business.google.com) → sign in with the business's Google account → **Add business**
- [ ] Business name: exact legal/brand name — must match the website and all citations exactly
- [ ] Category: pick the closest match from Google's predefined list (you cannot type a custom one; if the exact service doesn't exist, choose the nearest parent category)
- [ ] If the business travels to customers (no storefront): choose **service-area business**, hide the street address, and list the cities/counties served — match the site's `serviceArea`
- [ ] Hours: set real hours (avoid "open with no main hours" — it can stall review of other edits); "by appointment" details go in the description
- [ ] Description: 750 chars, lead with service + city, real specifics, no keyword stuffing
- [ ] Photos: 5+ real photos (work results, equipment, owner) — never stock images
- [ ] Complete verification (video, postcard, or phone — whatever Google offers)
- [ ] After verification: get the review link (**Ask for reviews** button) and start collecting — reviews from accounts with no review history often get filtered, so ask established Google users first
- [ ] Don't embed a review widget on the site until 5+ public reviews exist — an empty widget is worse than none

---

## Phase 8 — Ahrefs (~5 min)

- [ ] Add the site to Ahrefs
- [ ] Copy the analytics `data-key` value
- [ ] Copy the site verification `content` value
- [ ] Add both to `config/site.ts` as `ahrefs` and `ahrefsSiteVerification`
- [ ] Push

---

## Phase 9 — Lead Capture with Netlify Forms (optional, ~20 min)

Free phone-number capture for offers (referral programs, discounts, quote requests) — no backend needed on a static site.

- [ ] Build the claim/contact page as a plain HTML `<form>` with `data-netlify="true"`, a hidden `form-name` input, and a `netlify-honeypot="bot-field"` spam trap; set `action` to a static thank-you page (mark it `robots: { index: false }`)
- [ ] In the Netlify dashboard: **Forms → Enable form detection** (off by default — the form records NOTHING until this is on)
- [ ] Trigger a redeploy after enabling — forms register at deploy time
- [ ] Test the pipe: `curl -X POST -d "form-name=yourform&name=Test&phone=000" https://yourdomain.com/yourpage` → expect 200 (404 means not registered yet)
- [ ] Add a notification email: Forms → Form notifications
- [ ] Submissions live in the Netlify dashboard (exportable as CSV) + your email
- [ ] If pairing with a promo code shown on the thank-you page: the page is public, so protect via the booking system's promo settings (one use per client), not secrecy — and only promise online-code redemption if online payments actually exist; otherwise word it "mention the code when you pay"

---

## Done — Final Verification

- [ ] Site is live at the custom domain with HTTPS
- [ ] GSC: property verified, `sitemap.xml` submitted, pages discovered
- [ ] GA4: Realtime view shows data collection active
- [ ] GitHub Actions: green checkmark on the last push to `main`
- [ ] Local build: `npm run build` → 0 errors, 0 warnings, every route shows `○ (Static)`
- [ ] View-source check: HTML contains rendered content and JSON-LD schema blocks
- [ ] `https://yourdomain.com/llms.txt` loads and shows real business details (auto-generated — edit `app/llms.txt/route.ts` to add pricing specifics)
- [ ] `npm run check-indexing` runs and reports every sitemap URL (new pages take days–weeks to index; that's normal)
- [ ] Read `SEO-PLAYBOOK.md` and schedule the ongoing work: citations, GBP posts, reviews, monthly content

---

## Working on the site day-to-day

- **Always** update `config/site.ts` first — never hardcode business details in components
- **Adding a city landing page:** create `app/services/[slug]/page.tsx`, then add one entry to `servicePages` in `config/site.ts` — the nav dropdown, footer links, Service Areas section, and sitemap all update automatically
- **Every blog post** needs `seoTitle` if the H1 title is longer than ~38 chars
- **After Phase 5**, every push to `main` triggers the GitHub Action — reads the live sitemap and submits every URL to Google automatically. No manual GSC work ever again.
- **Build must pass** before marking any task done — `npm run build` with 0 errors, 0 warnings
- **Read `on-page-seo.md`** before generating any page or blog post
- **Read `references/voice.md`** before writing any customer-facing copy
