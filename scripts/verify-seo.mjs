/**
 * verify-seo.mjs
 * Post-build SEO checker. Parses every HTML file in /out and verifies
 * required on-page SEO items from on-page-seo.md.
 *
 * Critical failures exit with code 1 (blocks deploy on Netlify).
 * Warnings are reported but do not block.
 *
 * Run: node scripts/verify-seo.mjs
 * Auto-runs after build via "build" script in package.json.
 */

import { load } from "cheerio";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "out");

function getAllHtmlFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...getAllHtmlFiles(full));
    } else if (entry.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

const SKIP_PAGES = ["404.html", "_not-found.html", join("_not-found", "index.html")];

function checkPage(filePath, html) {
  const $ = load(html);
  const relPath = relative(OUT_DIR, filePath);
  const normalizedPath = relPath.replace(/\\/g, "/");
  const errors = [];
  const warnings = [];

  // Skip system pages
  if (SKIP_PAGES.some((p) => normalizedPath === p.replace(/\\/g, "/"))) {
    return { errors: [], warnings: [] };
  }

  // ── CRITICAL checks (block deploy) ────────────────────────────────────────

  // Title tag
  const title = $("title").first().text().trim();
  if (!title) errors.push("Missing <title> tag");
  else if (title.length < 40) warnings.push(`Title too short (${title.length} chars): "${title}"`);
  else if (title.length > 65) warnings.push(`Title too long (${title.length} chars): "${title}"`);

  // Meta description
  const desc = $('meta[name="description"]').attr("content") || "";
  if (!desc) errors.push("Missing meta description");
  else if (desc.length < 120) warnings.push(`Meta description short (${desc.length} chars)`);
  else if (desc.length > 165) warnings.push(`Meta description long (${desc.length} chars)`);

  // Canonical URL
  if (!$('link[rel="canonical"]').attr("href")) {
    errors.push("Missing canonical URL");
  }

  // Open Graph tags
  if (!$('meta[property="og:title"]').attr("content")) errors.push("Missing og:title");
  if (!$('meta[property="og:description"]').attr("content")) errors.push("Missing og:description");
  if (!$('meta[property="og:image"]').attr("content")) errors.push("Missing og:image");

  // H1
  const h1Count = $("h1").length;
  if (h1Count === 0) errors.push("No H1 found");
  else if (h1Count > 1) errors.push(`Multiple H1s found (${h1Count})`);

  // JSON-LD schema
  const jsonLdScripts = $('script[type="application/ld+json"]');
  if (jsonLdScripts.length === 0) {
    errors.push("No JSON-LD schema found");
  } else {
    jsonLdScripts.each((_, el) => {
      try {
        JSON.parse($(el).html() || "");
      } catch {
        errors.push("Invalid JSON in JSON-LD schema block");
      }
    });
  }

  // ── Blog post specific checks ──────────────────────────────────────────────
  // A blog post is inside the blog/ subdirectory but is NOT the listing page
  const isBlogPost =
    normalizedPath.startsWith("blog/") &&
    normalizedPath !== "blog/index.html" &&
    normalizedPath !== "blog.html";

  if (isBlogPost) {
    let hasArticle = false;
    let hasFaq = false;
    let hasBreadcrumb = false;

    jsonLdScripts.each((_, el) => {
      try {
        const schema = JSON.parse($(el).html() || "");
        if (schema["@type"] === "Article") hasArticle = true;
        if (schema["@type"] === "FAQPage") hasFaq = true;
        if (schema["@type"] === "BreadcrumbList") hasBreadcrumb = true;
      } catch { /* already caught above */ }
    });

    if (!hasArticle) errors.push("Blog post missing Article schema");
    if (!hasFaq) warnings.push("Blog post missing FAQPage schema");
    if (!hasBreadcrumb) errors.push("Blog post missing BreadcrumbList schema");

    // Check for a <time dateTime> element (published date)
    if ($("time[dateTime]").length === 0) {
      warnings.push("No <time dateTime> element found — published date may be missing");
    }
  }

  // ── Image checks ──────────────────────────────────────────────────────────
  $("img").each((_, el) => {
    const src = $(el).attr("src") || "(no src)";
    const name = src.split("/").pop();
    if (!$(el).attr("alt") && $(el).attr("alt") !== "") {
      warnings.push(`Image missing alt attribute: ${name}`);
    }
    if (!$(el).attr("width")) warnings.push(`Image missing width: ${name}`);
    if (!$(el).attr("height")) warnings.push(`Image missing height: ${name}`);
  });

  return { errors, warnings };
}

function run() {
  let htmlFiles;
  try {
    htmlFiles = getAllHtmlFiles(OUT_DIR);
  } catch {
    console.error("\n  /out directory not found — run npm run build first\n");
    process.exit(0);
  }

  if (htmlFiles.length === 0) {
    console.log("No HTML files found in /out");
    process.exit(0);
  }

  let totalErrors = 0;
  let totalWarnings = 0;
  const results = [];

  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf-8");
    const { errors, warnings } = checkPage(file, html);
    totalErrors += errors.length;
    totalWarnings += warnings.length;
    results.push({ file: relative(OUT_DIR, file), errors, warnings });
  }

  console.log("\n── SEO Verification ─────────────────────────────────────────\n");

  for (const { file, errors, warnings } of results) {
    if (errors.length === 0 && warnings.length === 0) {
      console.log(`  ok  ${file}`);
      continue;
    }
    console.log(`\n  ${file}`);
    for (const e of errors) console.log(`     [CRITICAL] ${e}`);
    for (const w of warnings) console.log(`     [warning]  ${w}`);
  }

  console.log("\n─────────────────────────────────────────────────────────────");
  console.log(`  ${htmlFiles.length} pages checked`);
  console.log(`  ${totalErrors} critical errors`);
  console.log(`  ${totalWarnings} warnings`);

  if (totalErrors > 0) {
    console.log("\n  Build blocked: fix critical errors before deploying.\n");
    process.exit(1);
  }

  console.log("\n  All critical checks passed.\n");
  process.exit(0);
}

run();
