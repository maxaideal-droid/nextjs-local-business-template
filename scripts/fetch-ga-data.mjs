/**
 * fetch-ga-data.mjs — pull last 30 days of GA4 data.
 * Outputs ga-data/report.md (readable) + ga-data/raw.json (for log-history.mjs).
 * Requires GA4_PROPERTY_ID in scripts/site-config.mjs and the service account
 * added as Viewer on the GA4 property (SETUP.md Phase 4).
 * Run: npm run ga
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { GA4_PROPERTY_ID } from "./site-config.mjs";
import { loadServiceAccount, getAccessToken } from "./google-auth.mjs";

const OUTPUT_DIR = "ga-data";
const DAYS_BACK = 30;

async function runReport(token, body) {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(`GA4 API error: ${JSON.stringify(data.error)}`);
  return data;
}

function toObjects(data) {
  if (!data.rows) return [];
  const dimNames = (data.dimensionHeaders || []).map((h) => h.name);
  const metNames = (data.metricHeaders || []).map((h) => h.name);
  return data.rows.map((row) => {
    const obj = {};
    (row.dimensionValues || []).forEach((v, i) => (obj[dimNames[i]] = v.value));
    (row.metricValues || []).forEach((v, i) => (obj[metNames[i]] = v.value));
    return obj;
  });
}

function fmtDuration(seconds) {
  const s = Math.round(Number(seconds) || 0);
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

function fmtPct(rate) {
  return `${(Number(rate) * 100).toFixed(1)}%`;
}

function buildReport(overview, pages, channels) {
  const date = new Date().toISOString().slice(0, 10);

  let r = `# GA4 Report — ${date} (last ${DAYS_BACK} days)\n\n`;

  r += `## Overview\n`;
  r += `| Sessions | Users | New users | Engagement rate | Avg engagement time | Conversions |\n`;
  r += `|----------|-------|-----------|-----------------|---------------------|-------------|\n`;
  r += `| ${overview.sessions ?? 0} | ${overview.activeUsers ?? 0} | ${overview.newUsers ?? 0} | ${fmtPct(overview.engagementRate ?? 0)} | ${fmtDuration(overview.averageSessionDuration)} | ${overview.conversions ?? 0} |\n`;

  r += `\n## Top pages by views\n`;
  r += `| Page | Views | Sessions |\n`;
  r += `|------|-------|----------|\n`;
  for (const row of pages) {
    r += `| ${row.pagePath} | ${row.screenPageViews} | ${row.sessions} |\n`;
  }

  r += `\n## Traffic by channel\n`;
  r += `| Channel | Sessions | Users |\n`;
  r += `|---------|----------|-------|\n`;
  for (const row of channels) {
    r += `| ${row.sessionDefaultChannelGroup} | ${row.sessions} | ${row.activeUsers} |\n`;
  }

  return r;
}

// — Main —
const sa = loadServiceAccount();
console.log("Authenticating with Google...");
const token = await getAccessToken(sa, "https://www.googleapis.com/auth/analytics.readonly");

console.log("Fetching GA4 analytics...");
const dateRanges = [{ startDate: `${DAYS_BACK}daysAgo`, endDate: "today" }];

const [overviewData, pagesData, channelsData] = await Promise.all([
  runReport(token, {
    dateRanges,
    metrics: [
      { name: "sessions" },
      { name: "activeUsers" },
      { name: "newUsers" },
      { name: "engagementRate" },
      { name: "averageSessionDuration" },
      { name: "conversions" },
    ],
  }),
  runReport(token, {
    dateRanges,
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }, { name: "sessions" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 15,
  }),
  runReport(token, {
    dateRanges,
    dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [{ name: "sessions" }, { name: "activeUsers" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  }),
]);

const overview = toObjects(overviewData)[0] || {};
const pages = toObjects(pagesData);
const channels = toObjects(channelsData);

console.log(`Received ${pages.length} pages, ${channels.length} channels.`);

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR);

writeFileSync(
  `${OUTPUT_DIR}/raw.json`,
  JSON.stringify({ fetchedAt: new Date().toISOString(), overview, pages, channels }, null, 2)
);
const report = buildReport(overview, pages, channels);
writeFileSync(`${OUTPUT_DIR}/report.md`, report);

console.log(`\nSaved → ${OUTPUT_DIR}/report.md\n`);
console.log(report);
