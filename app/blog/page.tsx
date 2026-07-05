import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/content/blog/index";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `Local Tips, Guides & Expert Advice | ${site.name}` },
  description: `Expert advice from the team at ${site.name}. Practical guides, honest answers, and tips for clients in ${site.serviceArea}.`,
  alternates: {
    canonical: `${site.domain}/blog`,
  },
  openGraph: {
    url: `${site.domain}/blog`,
    title: `Tips, Guides & Advice | ${site.name}`,
    description: `Expert advice from the team at ${site.name}. Practical guides and honest answers.`,
    images: [{ url: "/about-brand.jpg", width: 600, height: 750 }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${site.domain}/blog` },
  ],
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>
        <section style={{ backgroundColor: "var(--color-brown)", padding: "80px 24px 60px", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-script)", fontStyle: "italic", color: "var(--color-gold)", fontSize: "1.25rem", marginBottom: "12px", letterSpacing: "0.04em" }}>
            Tips, Guides &amp; Honest Advice
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)", color: "var(--color-cream)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 600, marginBottom: "16px" }}>
            The {site.name} Blog
          </h1>
          <p style={{ color: "var(--color-cream)", opacity: 0.8, maxWidth: "520px", margin: "0 auto", fontFamily: "var(--font-sans)", fontSize: "0.95rem", lineHeight: 1.7 }}>
            Everything you need to know &mdash; written by someone who does it for a living.
          </p>
        </section>

        <section style={{ backgroundColor: "var(--color-cream)", padding: "64px 24px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {posts.length === 0 ? (
              <p style={{ textAlign: "center", color: "var(--color-text)", fontFamily: "var(--font-sans)", opacity: 0.6 }}>
                Posts coming soon.
              </p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "32px" }}>
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    style={{ backgroundColor: "var(--color-cream-2)", borderRadius: "4px", overflow: "hidden", boxShadow: "0 2px 12px rgba(59,42,30,0.07)", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
                  >
                    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                      <img
                        src={post.heroImage.src}
                        alt={post.heroImage.alt}
                        width={post.heroImage.width}
                        height={post.heroImage.height}
                        loading="lazy"
                        style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }}
                      />
                      <div style={{ padding: "24px" }}>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--color-gold-dark)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                          {new Date(post.publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </p>
                        <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--color-brown)", fontSize: "1.25rem", fontWeight: 600, marginBottom: "12px", lineHeight: 1.3 }}>
                          {post.title}
                        </h2>
                        <p style={{ fontFamily: "var(--font-sans)", color: "var(--color-text)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "16px", opacity: 0.85 }}>
                          {post.description}
                        </p>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--color-gold-dark)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                          Read more &#8594;
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
