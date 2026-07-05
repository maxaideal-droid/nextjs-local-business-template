import { services } from "@/content/services";

export default function Services() {
  return (
    <section
      id="services"
      style={{ padding: "100px 6%", background: "var(--color-brown)", color: "var(--color-cream)" }}
    >
      <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 60px" }}>
        <div style={{ textTransform: "uppercase", letterSpacing: "4px", fontSize: "12px", color: "var(--color-gold)", fontWeight: 600, marginBottom: "8px" }}>
          Services &amp; Pricing
        </div>
        <h2 style={{ fontSize: "clamp(32px,5vw,48px)", marginBottom: "16px", color: "var(--color-cream)" }}>
          Choose Your Package
        </h2>
        <div style={{ width: "60px", height: "2px", background: "var(--color-gold)", margin: "18px auto" }} />
        <p style={{ color: "var(--color-cream)", fontSize: "16px", fontWeight: 300 }}>
          Every package includes professional service delivery and a satisfaction guarantee.
        </p>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", maxWidth: "1180px", margin: "0 auto" }}
        className="price-grid"
      >
        {services.map((svc) => (
          <div
            key={svc.name}
            className="price-card"
            style={{
              background: svc.featured ? "rgba(200,160,90,0.1)" : "rgba(255,255,255,0.04)",
              border: svc.featured ? "1px solid var(--color-gold)" : "1px solid rgba(200,160,90,0.3)",
              borderRadius: "18px",
              padding: "42px 32px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "10px" }}>
              {svc.tag}
            </div>
            <h3 style={{ color: "var(--color-cream)", fontSize: "26px", marginBottom: "6px" }}>{svc.name}</h3>
            <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "42px", color: "var(--color-gold)", margin: "14px 0" }}>
              {svc.price}{" "}
              <small style={{ fontSize: "14px", color: "var(--color-cream)", opacity: 0.7 }}>/ {svc.period}</small>
            </div>
            <ul style={{ listStyle: "none", margin: "24px 0", textAlign: "left" }}>
              {svc.features.map((f) => (
                <li key={f} style={{ fontSize: "14px", fontWeight: 300, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--color-gold)", fontWeight: 700 }}>&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#booking"
              style={{ display: "block", width: "100%", textAlign: "center", padding: "16px 38px", borderRadius: "40px", fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, transition: "all .3s ease", background: svc.featured ? "var(--color-gold-dark)" : "transparent", color: svc.featured ? "#fff" : "var(--color-cream)", border: svc.featured ? "1px solid var(--color-gold-dark)" : "1px solid var(--color-cream)" }}
            >
              Book This
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
