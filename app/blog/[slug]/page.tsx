import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostLayout from "@/components/BlogPostLayout";
import { getPostBySlug, getAllSlugs } from "@/content/blog/index";
import { site } from "@/config/site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: { absolute: `${post.seoTitle ?? post.title} | ${site.name}` },
    description: post.description,
    alternates: {
      canonical: `${site.domain}/blog/${post.slug}`,
    },
    openGraph: {
      url: `${site.domain}/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.ogImage.src,
          width: post.ogImage.width,
          height: post.ogImage.height,
          alt: post.ogImage.alt,
        },
      ],
      type: "article",
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate ?? post.publishedDate,
      authors: ["Author Name"],   // Replace with real author name
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.ogImage.src],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return <BlogPostLayout post={post} />;
}
