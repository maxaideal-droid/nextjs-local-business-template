/**
 * check-indexing.mjs — live index status of every sitemap URL via the
 * Search Console URL Inspection API. Reads the LIVE sitemap, so it never
 * drifts from what's actually deployed.
 * Run: npm run check-indexing
 *
 * Note: the Page Indexing report in the Search Console UI lags days behind
 * for small sites. This script is the accurate, per-URL truth.
 */

import { GSC_PROPERTY, DOMAIN } from "./site-config.mjs";
import { loadServiceAccount, getAccessToken } from "./google-auth.mjs";

async function getUrlsFromSitemap() {
  const res = await fetch(`${DOMAIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`Could not fetch sitemap: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

async function inspectUrl(token, url) {
  const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: GSC_PROPERTY }),
  });
  const data = await res.json();
  if (data.error) return { url, error: data.error.message };
  const r = data.inspectionResult;
  return {
    url,
    verdict: r?.indexStatusResult?.verdict,
    coverageState: r?.indexStatusResult?.coverageState,
    lastCrawlTime: r?.indexStatusResult?.lastCrawlTime,
    crawledAs: r?.indexStatusResult?.crawledAs,
  };
}

const sa = loadServiceAccount();
console.log("Authenticating...\n");
const token = await getAccessToken(sa, "https://www.googleapis.com/auth/webmasters");

console.log("Fetching sitemap...");
const urls = await getUrlsFromSitemap();
console.log(`Found ${urls.length} URLs to check.\n`);

console.log("Checking indexing status...\n");
const results = await Promise.all(urls.map((url) => inspectUrl(token, url)));

const icon = (verdict) => (verdict === "PASS" ? "✓" : verdict === "NEUTRAL" ? "~" : "✗");

for (const r of results) {
  const path = r.url.replace(DOMAIN, "") || "/";
  if (r.error) {
    console.log(`  ✗  ${path}\n     Error: ${r.error}\n`);
  } else {
    const crawled = r.lastCrawlTime ? new Date(r.lastCrawlTime).toLocaleDateString() : "never";
    console.log(`  ${icon(r.verdict)}  ${path}`);
    console.log(`     Status: ${r.coverageState || r.verdict}`);
    console.log(`     Last crawled: ${crawled}`);
    if (r.crawledAs) console.log(`     Crawled as: ${r.crawledAs}`);
    console.log();
  }
}
