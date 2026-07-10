/**
 * fetch-gsc-data.mjs — pull last 90 days of Search Console data.
 * Outputs gsc-data/report.md (readable) + gsc-data/raw.json (for log-history.mjs).
 * Run: npm run gsc
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { GSC_PROPERTY, DOMAIN } from "./site-config.mjs";
import { loadServiceAccount, getAccessToken } from "./google-auth.mjs";

const OUTPUT_DIR = "gsc-data";
const DAYS_BACK = 90;

async function queryGSC(token, dimensions, rowLimit = 200) {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - DAYS_BACK);

  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_PROPERTY)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
        dimensions,
        rowLimit,
      }),
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(`GSC API error: ${JSON.stringify(data.error)}`);
  return data.rows || [];
}

function buildReport(queries, pages) {
  const date = new Date().toISOString().slice(0, 10);
  const fmt = (n) => n.toFixed(1);

  const top = [...queries].sort((a, b) => b.impressions - a.impressions).slice(0, 25);
  const opportunities = queries
    .filter((r) => r.impressions >= 5 && r.clicks === 0)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20);
  const topPages = [...pages].sort((a, b) => b.clicks - a.clicks).slice(0, 15);

  let r = `# GSC Report — ${date} (last ${DAYS_BACK} days)\n\n`;

  r += `## Top queries by impressions\n`;
  r += `| Query | Impressions | Clicks | CTR | Avg Position |\n`;
  r += `|-------|------------|--------|-----|-------------|\n`;
  for (const row of top) {
    r += `| ${row.keys[0]} | ${row.impressions} | ${row.clicks} | ${fmt(row.ctr * 100)}% | ${fmt(row.position)} |\n`;
  }

  r += `\n## Opportunities — ranking but not getting clicked\n`;
  r += `These have impressions but 0 clicks. Better title/meta description = free traffic.\n\n`;
  r += `| Query | Impressions | Avg Position |\n`;
  r += `|-------|------------|-------------|\n`;
  for (const row of opportunities) {
    r += `| ${row.keys[0]} | ${row.impressions} | ${fmt(row.position)} |\n`;
  }

  r += `\n## Top pages by clicks\n`;
  r += `| Page | Clicks | Impressions | CTR | Avg Position |\n`;
  r += `|------|--------|------------|-----|-------------|\n`;
  for (const row of topPages) {
    const page = row.keys[0].replace(DOMAIN, "") || "/";
    r += `| ${page} | ${row.clicks} | ${row.impressions} | ${fmt(row.ctr * 100)}% | ${fmt(row.position)} |\n`;
  }

  return r;
}

// — Main —
const sa = loadServiceAccount();
console.log("Authenticating with Google...");
const token = await getAccessToken(sa, "https://www.googleapis.com/auth/webmasters.readonly");

console.log("Fetching search analytics...");
const [queries, pages] = await Promise.all([
  queryGSC(token, ["query"], 200),
  queryGSC(token, ["page"], 50),
]);
console.log(`Received ${queries.length} queries, ${pages.length} pages.`);

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR);

writeFileSync(
  `${OUTPUT_DIR}/raw.json`,
  JSON.stringify({ fetchedAt: new Date().toISOString(), queries, pages }, null, 2)
);
const report = buildReport(queries, pages);
writeFileSync(`${OUTPUT_DIR}/report.md`, report);

console.log(`\nSaved → ${OUTPUT_DIR}/report.md\n`);
console.log(report);
