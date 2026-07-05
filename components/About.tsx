import { site } from "@/config/site";

const pillars = [
  { title: "Customer-First", body: "Every appointment is built around your needs — not a one-size-fits-all approach." },
  { title: "Mobile & Convenient", body: "We come to your location with everything needed — no trips required on your end." },
  { title: "Custom Service", body: "Tailored to you. We match the service to what you actually need, not what's easiest for us." },
  { title: "Event Ready", body: "Available for weddings, events, photoshoots, and group bookings throughout " + site.serviceArea + "." },
];

export default function About() {
  return (
    <section
      id="about"
      style={{ padding: "100px 6%", background: "linear-gradient(180deg, var(--color-cream-2), var(--color-cream))" }}
    >
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "70px", alignItems: "center", maxWidth: "1180px", margin: "0 auto" }}
        className="about-grid"
      >
        <div style={{ aspectRatio: "4/5", borderRadius: "18px", overflow: "hidden", boxShadow: "0 30px 60px -25px rgba(140,90,53,0.45)" }}>
          <img
            src="/about-brand.jpg"
            alt={`${site.name} — ${site.tagline}`}
            width={600}
            height={750}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div>
          <div style={{ textTransform: "uppercase", letterSpacing: "4px", fontSize: "12px", color: "var(--color-bronze)", fontWeight: 600, marginBottom: "14px" }}>
            About The Business
          </div>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", marginBottom: "22px", lineHeight: 1.2 }}>
            The Art of Reliable, Personalized Service
          </h2>
          <p style={{ marginBottom: "18px", fontWeight: 300, color: "var(--color-text)" }}>
            {site.name} is a premium mobile service in {site.location} built on one promise: you get exactly what you asked for. Replace this paragraph with your own story. Keep it honest, specific, and under four sentences.
          </p>
          <p style={{ marginBottom: "18px", fontWeight: 300, color: "var(--color-text)" }}>
            We serve {site.serviceArea}. Replace this sentence with your real service area and what makes your approach different from the competition.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px", marginTop: "32px" }}>
            {pillars.map((p) => (
              <div key={p.title} style={{ background: "#fff", border: "1px solid rgba(200,160,90,0.25)", borderRadius: "14px", padding: "22px" }}>
                <h4 style={{ fontSize: "16px", marginBottom: "6px", color: "var(--color-gold-dark)" }}>{p.title}</h4>
                <p style={{ fontSize: "13px", color: "var(--color-bronze)", margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
