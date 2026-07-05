import Link from "next/link";
import { site } from "@/config/site";

// Renders only if servicePages has entries — safe to include on homepage unconditionally.
export default function ServiceAreas() {
  if (site.servicePages.length === 0) return null;

  return (
    <section id="service-areas" style={{ backgroundColor: "var(--color-cream-2)", padding: "80px 6%" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: "var(--color-gold-dark)", fontSize: "1.15rem", letterSpacing: "0.04em", marginBottom: "10px" }}>
            We come to you
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair), serif", color: "var(--color-brown)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 600, marginBottom: "14px", lineHeight: 1.2 }}>
            Service Areas
          </h2>
          <p style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "var(--color-text)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.75, fontSize: "0.95rem" }}>
            {site.name} serves {site.serviceArea}. No office visit required — we come to your home, hotel, or event.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {site.servicePages.map((page) => (
            <Link key={page.slug} href={`/services/${page.slug}`} style={{ textDecoration: "none" }}>
              <article style={{ backgroundColor: "var(--color-cream)", border: "1px solid rgba(200,160,90,0.3)", borderRadius: "2px", padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-gold-dark)", marginBottom: "8px" }}>
                    Mobile service · TX
                  </p>
                  <h3 style={{ fontFamily: "var(--font-playfair), serif", color: "var(--color-brown)", fontSize: "1.35rem", fontWeight: 600, marginBottom: "10px" }}>
                    {site.name} — {page.city}
                  </h3>
                  <p style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "var(--color-text)", fontSize: "0.875rem", lineHeight: 1.65, opacity: 0.85, marginBottom: "20px" }}>
                    {page.tagline}
                  </p>
                </div>
                <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "var(--color-gold-dark)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  See pricing &amp; details &#8594;
                </span>
              </article>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
