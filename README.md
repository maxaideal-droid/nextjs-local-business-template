# Next.js Local Business Template

A production-ready starter for local service business websites, optimized for local SEO and AI-assistant visibility. Built from a real, ranking local business site.

**To use:** click "Use this template" on GitHub, then follow [SETUP.md](./SETUP.md) top to bottom. Day-to-day SEO operations live in [SEO-PLAYBOOK.md](./SEO-PLAYBOOK.md). Rules for AI-assisted development are in [CLAUDE.md](./CLAUDE.md).

## What's included

- **Next.js App Router + TypeScript + Tailwind v4**, fully static export (`output: 'export'`) — deploys anywhere, built for Netlify
- **`config/site.ts`** — single source of truth for all business details; components never hardcode them
- **City landing page system** — one `servicePages[]` entry updates nav, footer, homepage, and sitemap automatically
- **Blog system** — registry-based, with Article + FAQPage + BreadcrumbList + Person schema baked into the layout
- **`llms.txt`** — auto-generated at build time for AI assistant crawlers (ChatGPT, Perplexity, Claude, Gemini)
- **Automatic Google indexing** — every push submits all sitemap URLs to the Google Indexing API
- **Daily SEO reporting** — GitHub Action pulls Search Console + GA4 data every morning and appends a row to a tracked history CSV for day-over-day trends
- **Live indexing checker** — inspect every sitemap URL's real index status via the URL Inspection API
- **Post-build SEO verification** — `npm run build` fails if critical SEO elements are missing from the rendered HTML

## Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Build + SEO verification (must pass 0 errors before deploy) |
| `npm run gsc` | Pull last 90 days of Search Console data → `gsc-data/report.md` |
| `npm run ga` | Pull last 30 days of GA4 data → `ga-data/report.md` |
| `npm run log-history` | Append today's numbers to `seo-data/history.csv` |
| `npm run check-indexing` | Live index status of every sitemap URL |
| `npm run fetch-images` | Download images from Pexels for blog/city pages |
