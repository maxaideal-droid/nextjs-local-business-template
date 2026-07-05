import Link from "next/link";
import { site } from "@/config/site";

const navigate = [
  { href: "/#about", label: "About" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#booking", label: "Booking" },
  { href: "/blog", label: "Blog" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      style={{ background: "var(--color-brown)", color: "var(--color-cream)", padding: "70px 6% 30px" }}
    >
      <div
        style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "50px", maxWidth: "1240px", margin: "0 auto 50px" }}
        className="footer-grid"
      >
        <div>
          <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "28px", color: "var(--color-cream)", marginBottom: "14px" }}>
            {site.name}
          </div>
          <p style={{ color: "rgba(247,239,228,0.75)", fontSize: "14px", fontWeight: 300 }}>
            {site.tagline} &mdash; serving {site.serviceArea}.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "18px" }}>
            {["IG", "FB", "TT"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s === "IG" ? "Instagram" : s === "FB" ? "Facebook" : "TikTok"}
                style={{ width: "38px", height: "38px", border: "1px solid rgba(200,160,90,0.4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", color: "var(--color-gold)" }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ color: "var(--color-cream)", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "18px", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
            Navigate
          </h4>
          <ul style={{ listStyle: "none" }}>
            {navigate.map((link) => (
              <li key={link.href} style={{ padding: "6px 0" }}>
                <Link href={link.href} style={{ color: "rgba(247,239,228,0.75)", fontSize: "14px", fontWeight: 300, textDecoration: "none" }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ color: "var(--color-cream)", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "18px", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
            Service Areas
          </h4>
          <ul style={{ listStyle: "none" }}>
            {site.servicePages.length > 0 ? (
              <>
                {site.servicePages.map((p) => (
                  <li key={p.slug} style={{ padding: "6px 0" }}>
                    <Link href={`/services/${p.slug}`} style={{ color: "rgba(247,239,228,0.75)", fontSize: "14px", fontWeight: 300, textDecoration: "none" }}>
                      {p.city}, TX
                    </Link>
                  </li>
                ))}
                <li style={{ padding: "6px 0" }}>
                  <Link href="/services" style={{ color: "rgba(247,239,228,0.75)", fontSize: "14px", fontWeight: 300, textDecoration: "none" }}>
                    All Service Areas
                  </Link>
                </li>
              </>
            ) : (
              <li style={{ padding: "6px 0", color: "rgba(247,239,228,0.75)", fontSize: "14px", fontWeight: 300 }}>
                {site.serviceArea}
              </li>
            )}
          </ul>
        </div>

        <div>
          <h4 style={{ color: "var(--color-cream)", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "18px", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}>
            Contact
          </h4>
          <ul style={{ listStyle: "none" }}>
            {[site.serviceArea, site.email, site.phone, "Mon–Sat, By Appointment"].map((item) => (
              <li key={item} style={{ padding: "6px 0", color: "rgba(247,239,228,0.75)", fontSize: "14px", fontWeight: 300 }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ textAlign: "center", paddingTop: "30px", borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: "12px", color: "rgba(247,239,228,0.5)", fontWeight: 300, letterSpacing: "1px" }}>
        &copy; {year} {site.name}. All rights reserved. &middot; {site.domain.replace("https://", "")}
      </div>
    </footer>
  );
}
