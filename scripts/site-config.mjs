/**
 * site-config.mjs — single place the SEO scripts read the site identity from.
 *
 * UPDATE the fallback values when cloning the template (keep them in sync
 * with config/site.ts). Env vars override, which is how GitHub Actions
 * injects them without editing code.
 */

// Live domain, no trailing slash. Must match site.domain in config/site.ts.
export const DOMAIN = (process.env.SITE_DOMAIN || "https://acmelocal.com").replace(/\/$/, "");

// Search Console property. Domain properties look like "sc-domain:acmelocal.com".
export const GSC_PROPERTY =
  process.env.GSC_PROPERTY || `sc-domain:${DOMAIN.replace(/^https?:\/\/(www\.)?/, "")}`;

// GA4 numeric property ID (GA4 Admin → Property → Property Settings → Property ID).
export const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || "000000000";
