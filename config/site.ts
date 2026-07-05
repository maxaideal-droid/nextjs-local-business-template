export const site = {
  name: "Acme Local Co",
  tagline: "Your trade · Your city, ST",
  phone: "000.000.0000",
  phoneE164: "+10000000000",
  email: "hello@acmelocal.com",
  domain: "https://acmelocal.com",
  location: "Dallas, TX",
  serviceArea: "Dallas, Collin & Denton County",
  booking: "https://booking-embed-url-here",
  ga4: "G-XXXXXXXXXX",
  gscVerification: "YOUR_GSC_VERIFICATION_CONTENT",
  ahrefs: "YOUR_AHREFS_DATA_KEY",
  ahrefsSiteVerification: "YOUR_AHREFS_SITE_VERIFICATION",

  // City landing pages — add one entry per city as you build them.
  // Each entry drives the nav dropdown, footer links, ServiceAreas section, and sitemap automatically.
  // slug must match the folder name under app/services/[slug]/
  servicePages: [
    // { city: "McKinney", slug: "your-service-mckinney-tx", tagline: "30 miles away, no travel fee." },
    // { city: "Frisco",   slug: "your-service-frisco-tx",   tagline: "$65 flat, Dolce Glow formula." },
  ] as { city: string; slug: string; tagline: string }[],
};
