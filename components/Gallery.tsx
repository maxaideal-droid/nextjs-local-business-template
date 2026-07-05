import { gallery } from "@/content/gallery";

export default function Gallery() {
  return (
    <section id="gallery" style={{ padding: "100px 6%" }}>
      <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 60px" }}>
        <div style={{ textTransform: "uppercase", letterSpacing: "4px", fontSize: "12px", color: "var(--color-bronze)", fontWeight: 600, marginBottom: "8px" }}>
          Gallery
        </div>
        <h2 style={{ fontSize: "clamp(32px,5vw,48px)", marginBottom: "16px" }}>
          Real Results
        </h2>
        <div style={{ width: "60px", height: "2px", background: "var(--color-gold)", margin: "18px auto" }} />
        <p style={{ color: "var(--color-bronze)", fontSize: "16px", fontWeight: 300 }}>
          Replace these placeholder images with your own portfolio shots.
        </p>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}
        className="gallery-grid"
      >
        {gallery.map((img) => (
          <div
            key={img.src}
            className="gallery-item"
            style={{ borderRadius: "14px", overflow: "hidden", position: "relative", aspectRatio: "16/10", boxShadow: "0 20px 40px -25px rgba(140,90,53,0.35)" }}
          >
            <img src={img.src} alt={img.alt} width={800} height={500} className="gallery-img" />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 2, padding: "16px 20px", color: "#fff", fontFamily: "var(--font-cormorant), serif", fontSize: "17px", background: "linear-gradient(0deg, rgba(59,42,30,0.7), transparent)" }}>
              {img.cap}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
