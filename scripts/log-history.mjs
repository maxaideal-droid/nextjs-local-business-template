/**
 * log-history.mjs — append today's key numbers to seo-data/history.csv.
 * Reads gsc-data/raw.json + ga-data/raw.json (run fetch-gsc-data.mjs and
 * fetch-ga-data.mjs first). Upserts today's row — safe to run twice a day.
 * The CSV is committed to the repo so day-over-day trends survive.
 * Run: npm run log-history
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { DOMAIN } from "./site-config.mjs";

const OUTPUT_DIR = "seo-data";
const CSV_PATH = `${OUTPUT_DIR}/history.csv`;
const HEADER =
  "date,gsc_impressions,gsc_clicks,homepage_position,homepage_impressions,homepage_clicks,ga_sessions,ga_users,ga_engagement_rate,ga_conversions";

function loadJson(path) {
  if (!existsSync(path)) throw new Error(`Missing ${path} — run fetch-gsc-data.mjs / fetch-ga-data.mjs first.`);
  return JSON.parse(readFileSync(path, "utf8"));
}

const gsc = loadJson("gsc-data/raw.json");
const ga = loadJson("ga-data/raw.json");

const gscImpressions = gsc.queries.reduce((sum, q) => sum + q.impressions, 0);
const gscClicks = gsc.queries.reduce((sum, q) => sum + q.clicks, 0);

const homepage = gsc.pages.find((p) => p.keys[0].replace(/\/$/, "") === DOMAIN) || {};

const row = [
  new Date().toISOString().slice(0, 10),
  gscImpressions,
  gscClicks,
  homepage.position?.toFixed(1) ?? "",
  homepage.impressions ?? "",
  homepage.clicks ?? "",
  ga.overview.sessions ?? "",
  ga.overview.activeUsers ?? "",
  ga.overview.engagementRate ? (Number(ga.overview.engagementRate) * 100).toFixed(1) : "",
  ga.overview.conversions ?? "",
].join(",");

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR);

let lines = [HEADER];
if (existsSync(CSV_PATH)) {
  lines = readFileSync(CSV_PATH, "utf8").trim().split("\n");
}

const today = row.split(",")[0];
const existingIndex = lines.findIndex((l) => l.startsWith(`${today},`));
if (existingIndex > 0) {
  lines[existingIndex] = row; // overwrite today's row if script runs twice in one day
} else {
  lines.push(row);
}

writeFileSync(CSV_PATH, lines.join("\n") + "\n");
console.log(`Logged ${today} → ${CSV_PATH}`);
console.log(row);
