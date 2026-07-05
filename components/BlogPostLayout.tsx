import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BlogPost } from "@/types/blog";
import { site } from "@/config/site";

export default function BlogPostLayout({ post }: { post: BlogPost }) {
  const postUrl = `${site.domain}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${site.domain}${post.heroImage.src}`,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate ?? post.publishedDate,
    author: {
      "@type": "Person",
      name: "Author Name",              // Replace with real author name from references/author.md
      jobTitle: "Owner & Operator",
      url: site.domain,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.domain,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(", "),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.domain}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />
      <main>
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          style={{ backgroundColor: "var(--color-cream-2)", padding: "12px 24px", borderBottom: "1px solid rgba(200,160,90,0.2)" }}
        >
          <ol style={{ maxWidth: "860px", margin: "0 auto", display: "flex", gap: "8px", listStyle: "none", padding: 0, fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--color-text)", opacity: 0.7 }}>
            <li><Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link></li>
            <li aria-hidden="true">&#8250;</li>
            <li><Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>Blog</Link></li>
            <li aria-hidden="true">&#8250;</li>
            <li aria-current="page" style={{ opacity: 0.6 }}>{post.title}</li>
          </ol>
        </nav>

        {/* Article header */}
        <header style={{ backgroundColor: "var(--color-brown)", padding: "56px 24px 48px", textAlign: "center" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <h1 style={{ fontFamily: "var(--font-serif)", color: "var(--color-cream)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 600, lineHeight: 1.25, marginBottom: "20px" }}>
              {post.title}
            </h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--color-cream)", opacity: 0.75 }}>
              <span>By Author Name</span>
              <span style={{ color: "var(--color-gold)", opacity: 1 }}>&#183;</span>
              <time dateTime={post.publishedDate}>
                {new Date(post.publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </time>
              {post.updatedDate && (
                <>
                  <span style={{ color: "var(--color-gold)", opacity: 1 }}>&#183;</span>
                  <span>Updated {new Date(post.updatedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px" }}>
          <img
            src={post.heroImage.src}
            alt={post.heroImage.alt}
            width={post.heroImage.width}
            height={post.heroImage.height}
            style={{ width: "100%", height: "auto", display: "block", borderRadius: "2px", marginTop: "40px" }}
          />
          {post.heroImage.photographer && (
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--color-text)", opacity: 0.45, marginTop: "6px", textAlign: "right" }}>
              Photo by <a href={post.heroImage.pexelsUrl} rel="noopener noreferrer" target="_blank" style={{ color: "inherit" }}>{post.heroImage.photographer}</a> on Pexels
            </p>
          )}
        </div>

        {/* Article body */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 80px" }}>

          {post.tldr && (
            <div style={{ margin: "36px 0", padding: "20px 24px", borderLeft: "3px solid var(--color-gold)", backgroundColor: "var(--color-cream-2)" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-gold-dark)", marginBottom: "6px" }}>Summary</p>
              <p style={{ fontFamily: "var(--font-sans)", color: "var(--color-text)", lineHeight: 1.65, margin: 0 }}>{post.tldr}</p>
            </div>
          )}

          <div
            style={{ fontFamily: "var(--font-sans)", color: "var(--color-text)", lineHeight: 1.75, fontSize: "1rem", marginTop: "32px" }}
            dangerouslySetInnerHTML={{ __html: post.intro }}
          />

          {post.sections.length > 0 && (
            <nav aria-label="Table of contents" style={{ margin: "40px 0", padding: "24px 28px", backgroundColor: "var(--color-cream-2)", border: "1px solid rgba(200,160,90,0.25)", borderRadius: "2px" }}>
              <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, color: "var(--color-brown)", fontSize: "1rem", marginBottom: "14px" }}>In this post</p>
              <ol style={{ paddingLeft: "18px", margin: 0 }}>
                {post.sections.map((s) => (
                  <li key={s.id} style={{ marginBottom: "6px" }}>
                    <a href={`#${s.id}`} style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--color-gold-dark)", textDecoration: "none" }}>{s.heading}</a>
                  </li>
                ))}
                <li style={{ marginBottom: "6px" }}>
                  <a href="#faq" style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--color-gold-dark)", textDecoration: "none" }}>Frequently Asked Questions</a>
                </li>
              </ol>
            </nav>
          )}

          {post.sections.map((section) => (
            <section key={section.id} id={section.id} style={{ marginTop: "48px" }}>
              {section.image && (
                <div style={{ marginBottom: "20px" }}>
                  <img
                    src={section.image.src}
                    alt={section.image.alt}
                    width={section.image.width}
                    height={section.image.height}
                    loading="lazy"
                    style={{ width: "100%", height: "auto", display: "block", borderRadius: "2px" }}
                  />
                  {section.image.photographer && (
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--color-text)", opacity: 0.45, marginTop: "6px", textAlign: "right" }}>
                      Photo by <a href={section.image.pexelsUrl} rel="noopener noreferrer" target="_blank" style={{ color: "inherit" }}>{section.image.photographer}</a> on Pexels
                    </p>
                  )}
                </div>
              )}
              <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--color-brown)", fontSize: "clamp(1.35rem, 3vw, 1.65rem)", fontWeight: 600, marginBottom: "16px", paddingBottom: "10px", borderBottom: "1px solid rgba(200,160,90,0.3)" }}>
                {section.heading}
              </h2>
              <div
                style={{ fontFamily: "var(--font-sans)", color: "var(--color-text)", lineHeight: 1.75, fontSize: "1rem" }}
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </section>
          ))}

          {post.faqs.length > 0 && (
            <section id="faq" style={{ marginTop: "56px" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--color-brown)", fontSize: "clamp(1.35rem, 3vw, 1.65rem)", fontWeight: 600, marginBottom: "28px", paddingBottom: "10px", borderBottom: "1px solid rgba(200,160,90,0.3)" }}>
                Frequently Asked Questions
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {post.faqs.map((faq, i) => (
                  <div key={i}>
                    <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--color-brown)", fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px" }}>{faq.question}</h3>
                    <p style={{ fontFamily: "var(--font-sans)", color: "var(--color-text)", lineHeight: 1.7, margin: 0 }}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Author bio — fill in from references/author.md */}
          <div style={{ marginTop: "56px", padding: "24px 28px", backgroundColor: "var(--color-cream-2)", border: "1px solid rgba(200,160,90,0.25)", borderRadius: "2px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-gold-dark)", margin: "0 0 6px" }}>About the author</p>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-brown)", margin: "0 0 8px" }}>Author Name</p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--color-text)", lineHeight: 1.65, margin: 0 }}>
              Replace with your author bio from <code>references/author.md</code>. Include credentials, years of experience, and your service area.
            </p>
          </div>

          {/* CTA */}
          <div style={{ marginTop: "48px", padding: "40px 28px", backgroundColor: "var(--color-brown)", borderRadius: "2px", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-script)", fontStyle: "italic", color: "var(--color-gold)", fontSize: "1.1rem", marginBottom: "10px" }}>Ready when you are</p>
            <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--color-cream)", fontSize: "1.75rem", fontWeight: 600, marginBottom: "12px" }}>Book Your Appointment</h2>
            <p style={{ fontFamily: "var(--font-sans)", color: "var(--color-cream)", opacity: 0.8, marginBottom: "28px", fontSize: "0.9rem" }}>
              Mobile service across {site.serviceArea}. We come to you.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/#booking" style={{ display: "inline-block", padding: "14px 32px", backgroundColor: "var(--color-gold)", color: "var(--color-brown)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderRadius: "2px" }}>
                Book Now
              </Link>
              <a href={`tel:${site.phoneE164}`} style={{ display: "inline-block", padding: "14px 32px", border: "1px solid var(--color-gold)", color: "var(--color-gold)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderRadius: "2px" }}>
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
