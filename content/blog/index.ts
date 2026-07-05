import { BlogPost } from "@/types/blog";
import examplePost from "./example-post";

// Registry — the blog skill adds each new post import here
export const allPosts: BlogPost[] = [examplePost];

export function getAllSlugs(): string[] {
  return allPosts.map((p) => p.slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...allPosts].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}
