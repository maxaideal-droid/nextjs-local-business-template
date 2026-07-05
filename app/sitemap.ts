import type { MetadataRoute } from "next";
import { getAllPosts } from "@/content/blog/index";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts().map((post) => ({
    url: `${site.domain}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate ?? post.publishedDate),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const servicePages = site.servicePages.map((page) => ({
    url: `${site.domain}/services/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: site.domain,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.domain}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...(site.servicePages.length > 0 ? [{ url: `${site.domain}/services`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 }] : []),
    ...servicePages,
    ...blogPosts,
  ];
}
