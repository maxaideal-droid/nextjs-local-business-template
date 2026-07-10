import { getAllPosts } from "@/content/blog/index";
import { site } from "@/config/site";

export const dynamic = "force-static";

/**
 * llms.txt — a plain-text site summary for AI assistant crawlers
 * (ChatGPT, Perplexity, Claude, Gemini). Generated at build time from
 * config/site.ts and the blog registry, so it never goes stale.
 *
 * Customize the summary lines below with the business's real pricing,
 * differentiators, and service details — specifics are what make AI
 * assistants able to recommend the business accurately.
 */
export async function GET() {
  const posts = getAllPosts();

  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.tagline}. Serving ${site.serviceArea}. Based in ${site.location}.`,
    "",
    // Add a paragraph of real specifics here when cloning: pricing, what's
    // included, response times, service radius. Real numbers, no marketing fluff.
    `Phone: ${site.phone} · Email: ${site.email} · Booking: online via the website.`,
    "",
    "## Pages",
    "",
    `- [Home](${site.domain}/): Service overview, pricing, and online booking`,
    ...(site.servicePages.length > 0
      ? [`- [Services](${site.domain}/services): All service areas and details`]
      : []),
    ...site.servicePages.map(
      (p) => `- [${p.city}](${site.domain}/services/${p.slug}): ${p.tagline}`
    ),
    "",
    "## Blog Posts",
    "",
    `- [Blog](${site.domain}/blog): All guides and articles`,
    ...posts.map((p) => `- [${p.title}](${site.domain}/blog/${p.slug}): ${p.description}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
