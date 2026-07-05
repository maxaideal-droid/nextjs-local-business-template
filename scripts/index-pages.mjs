/**
 * index-pages.mjs
 * Submits all URLs in the sitemap to the Google Indexing API.
 *
 * Requirements:
 *   - Google Search Console property verified (see SETUP.md Phase 3)
 *   - Web Search Indexing API enabled in Google Cloud console
 *   - Service account with Indexing API access added as Owner in GSC
 *   - Service account JSON key stored in GOOGLE_SERVICE_ACCOUNT_KEY env var
 *
 * Usage:
 *   GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}' node scripts/index-pages.mjs
 *   Or via GitHub Actions (see .github/workflows/index-pages.yml)
 *
 * The sitemap URL is read from site.domain + /sitemap.xml.
 * Update SITEMAP_URL below if your domain changes.
 */

import { createSign } from "crypto";

if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
  console.error("Error: GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set.");
  console.error("See SETUP.md Phase 5 for setup instructions.");
  process.exit(1);
}

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

// ─── UPDATE THIS when you set your real domain in config/site.ts ─────────────
// Read the sitemap from the live domain — must match site.domain in config/site.ts
const SITEMAP_URL = process.env.SITE_DOMAIN
  ? `${process.env.SITE_DOMAIN}/sitemap.xml`
  : (() => {
      console.error("Error: SITE_DOMAIN environment variable is not set.");
      console.error("Set it to your live domain, e.g. SITE_DOMAIN=https://acmelocal.com");
      process.exit(1);
    })();
// ────────────────────────────────────────────────────────────────────────────

function createJWT() {
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  })).toString("base64url");

  const sign = createSign("RSA-SHA256");
  sign.update(`${header}.${payload}`);
  const signature = sign.sign(serviceAccount.private_key, "base64url");

  return `${header}.${payload}.${signature}`;
}

async function getAccessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: createJWT(),
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`Auth failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function getSitemapUrls() {
  console.log(`Fetching sitemap: ${SITEMAP_URL}`);
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status} ${res.statusText}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  if (urls.length === 0) throw new Error("No <loc> entries found in sitemap");
  return urls;
}

async function submitUrl(url, token) {
  const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ url, type: "URL_UPDATED" }),
  });
  return res.json();
}

const token = await getAccessToken();
const urls = await getSitemapUrls();

console.log(`Submitting ${urls.length} URLs to Google Indexing API...`);
for (const url of urls) {
  const result = await submitUrl(url, token);
  const ok = result.urlNotificationMetadata;
  console.log(`${ok ? "✓" : "✗"} ${url}${ok ? "" : " — " + JSON.stringify(result)}`);
}
console.log("Done.");
