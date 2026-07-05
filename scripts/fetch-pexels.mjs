/**
 * fetch-pexels.mjs
 * Downloads images from Pexels for a blog post and saves attribution data.
 *
 * Usage: node scripts/fetch-pexels.mjs
 *
 * Before running:
 *   1. Add PEXELS_API_KEY=your_key to .env.local (get a free key at pexels.com/api)
 *   2. Edit POST_CONFIG below to match your post slug and image search terms
 *
 * Images are saved to /public/blog/[slug]/ as JPG files.
 * Attribution JSON is saved alongside them.
 */

import { createWriteStream, mkdirSync, writeFileSync, existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import https from "https";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ─── EDIT THIS FOR EACH NEW POST ────────────────────────────────────────────
const POST_CONFIG = {
  slug: "example-post",
  images: {
    hero: "professional service quality result",
    // Add one key per section image, matching the section id in your post file:
    // "section-one": "relevant search term for this section",
  },
};
// ────────────────────────────────────────────────────────────────────────────

function loadApiKey() {
  const envPath = join(ROOT, ".env.local");
  if (!existsSync(envPath)) throw new Error(".env.local not found — add PEXELS_API_KEY=your_key");
  const content = readFileSync(envPath, "utf-8");
  const match = content.match(/PEXELS_API_KEY=(.+)/);
  if (!match) throw new Error("PEXELS_API_KEY not found in .env.local");
  return match[1].trim();
}

async function searchPexels(query, apiKey) {
  return new Promise((resolve, reject) => {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`;
    https.get(url, { headers: { Authorization: apiKey } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (!json.photos?.length) return reject(new Error(`No results for: ${query}`));
          resolve(json.photos[0]);
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", (err) => {
      file.close();
      reject(err);
    });
  });
}

async function run() {
  const apiKey = loadApiKey();
  const outDir = join(ROOT, "public", "blog", POST_CONFIG.slug);
  mkdirSync(outDir, { recursive: true });

  const attribution = {};

  for (const [key, query] of Object.entries(POST_CONFIG.images)) {
    console.log(`Searching: "${query}"...`);
    try {
      const photo = await searchPexels(query, apiKey);
      const filename = `${key}.jpg`;
      const dest = join(outDir, filename);
      await downloadFile(photo.src.large, dest);
      attribution[key] = {
        filename,
        src: `/blog/${POST_CONFIG.slug}/${filename}`,
        width: photo.width,
        height: photo.height,
        alt: query,
        photographer: photo.photographer,
        photographerUrl: photo.photographer_url,
        pexelsUrl: photo.url,
        pexelsId: photo.id,
      };
      console.log(`  Saved: ${filename} (by ${photo.photographer})`);
    } catch (err) {
      console.error(`  Failed [${key}]: ${err.message}`);
    }
  }

  writeFileSync(
    join(outDir, "attribution.json"),
    JSON.stringify(attribution, null, 2)
  );

  console.log("\nDone. Attribution saved to attribution.json");
  console.log("\nCopy these into your blog post content file:\n");

  for (const [key, data] of Object.entries(attribution)) {
    console.log(`// ${key}`);
    console.log(`{`);
    console.log(`  src: "${data.src}",`);
    console.log(`  alt: "${data.alt}",`);
    console.log(`  width: ${data.width},`);
    console.log(`  height: ${data.height},`);
    console.log(`  photographer: "${data.photographer}",`);
    console.log(`  pexelsUrl: "${data.pexelsUrl}",`);
    console.log(`}`);
    console.log();
  }
}

run().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
