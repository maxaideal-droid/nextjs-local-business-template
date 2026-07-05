import { site } from "@/config/site";

const badges = [
  { num: "5+", label: "Years Serving " + site.location },
  { num: "100%", label: "Mobile Service" },
  { num: "5-Star", label: "Client Rated" },
  { num: "Same Day", label: "Availability" },
];

export default function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        marginTop: 0,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "160px 6% 100px",
      }}
    >
      <div style={{ position: "relative", zIndex: 2, maxWidth: "780px" }}>
        <div
          style={{
            textTransform: "uppercase",
            letterSpacing: "4px",
            fontSize: "12px",
            color: "var(--color-bronze)",
            fontWeight: 600,
            marginBottom: "18px",
          }}
        >
          {site.tagline}
        </div>

        <h1
          style={{
            fontSize: "clamp(42px, 7vw, 76px)",
            lineHeight: 1.1,
            marginBottom: "22px",
          }}
        >
          Your Business{" "}
          <span style={{ color: "var(--color-gold)" }}>Headline</span>
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "var(--color-text)",
            maxWidth: "560px",
            margin: "0 auto 36px",
            fontWeight: 300,
          }}
        >
          {site.name} brings professional service directly to you in {site.location} &mdash; replace this with your own one-sentence value proposition.
        </p>

        <div style={{ display: "flex", gap: "18px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#booking"
            style={{ display: "inline-block", padding: "16px 38px", borderRadius: "40px", fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, background: "var(--color-gold-dark)", color: "#fff", border: "1px solid var(--color-gold-dark)", transition: "all .3s ease" }}
          >
            Book Now
          </a>
          <a
            href="#gallery"
            style={{ display: "inline-block", padding: "16px 38px", borderRadius: "40px", fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, background: "transparent", color: "var(--color-brown)", border: "1px solid var(--color-brown)", transition: "all .3s ease" }}
          >
            View Gallery
          </a>
        </div>
      </div>

      <div style={{ display: "flex", gap: "40px", justifyContent: "center", marginTop: "60px", flexWrap: "wrap", position: "relative", zIndex: 2 }}>
        {badges.map((badge) => (
          <div key={badge.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "30px", color: "var(--color-gold-dark)" }}>
              {badge.num}
            </div>
            <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-bronze)", marginTop: "4px" }}>
              {badge.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
