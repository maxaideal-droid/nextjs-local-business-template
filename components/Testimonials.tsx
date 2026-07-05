import { testimonials } from "@/content/testimonials";

export default function Testimonials() {
  return (
    <section style={{ padding: "100px 6%", textAlign: "center" }}>
      <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 60px" }}>
        <div style={{ textTransform: "uppercase", letterSpacing: "4px", fontSize: "12px", color: "var(--color-bronze)", fontWeight: 600, marginBottom: "8px" }}>
          Client Reviews
        </div>
        <h2 style={{ fontSize: "clamp(32px,5vw,48px)", marginBottom: "16px" }}>
          What Clients Are Saying
        </h2>
        <div style={{ width: "60px", height: "2px", background: "var(--color-gold)", margin: "18px auto" }} />
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", maxWidth: "1180px", margin: "0 auto" }}
        className="test-grid"
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            style={{ background: "#fff", borderRadius: "16px", padding: "34px 28px", border: "1px solid rgba(200,160,90,0.2)", boxShadow: "0 20px 40px -30px rgba(140,90,53,0.3)", textAlign: "left" }}
          >
            <div style={{ color: "var(--color-gold)", fontSize: "15px", marginBottom: "14px", letterSpacing: "2px" }}>
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </div>
            <p style={{ fontSize: "14px", fontWeight: 300, fontStyle: "italic", marginBottom: "18px", color: "var(--color-text)" }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "14px", color: "var(--color-brown)" }}>
              {t.name}
              <span style={{ display: "block", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "11px", color: "var(--color-bronze)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "2px" }}>
                {t.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
