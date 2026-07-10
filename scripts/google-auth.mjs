/**
 * google-auth.mjs — shared service-account auth for all Google API scripts.
 *
 * Key resolution order:
 *   1. GOOGLE_SERVICE_ACCOUNT_KEY env var (GitHub Actions)
 *   2. .secrets/gsc-key.json local file (gitignored)
 *
 * One service account covers Search Console, Indexing API, and GA4 —
 * see SETUP.md Phase 5 for how to create it and grant access.
 */

import { createSign } from "crypto";
import { readFileSync, existsSync } from "fs";

export function loadServiceAccount() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  }
  const localPath = ".secrets/gsc-key.json";
  if (existsSync(localPath)) {
    return JSON.parse(readFileSync(localPath, "utf8"));
  }
  throw new Error(
    "No service account key found.\n" +
      "  Option 1: set GOOGLE_SERVICE_ACCOUNT_KEY env var\n" +
      "  Option 2: save your JSON key to .secrets/gsc-key.json (gitignored)\n" +
      "See SETUP.md Phase 5."
  );
}

function createJWT(sa, scope) {
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({
      iss: sa.client_email,
      scope,
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  ).toString("base64url");
  const sign = createSign("RSA-SHA256");
  sign.update(`${header}.${payload}`);
  return `${header}.${payload}.${sign.sign(sa.private_key, "base64url")}`;
}

export async function getAccessToken(sa, scope) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: createJWT(sa, scope),
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`Auth failed: ${JSON.stringify(data)}`);
  return data.access_token;
}
