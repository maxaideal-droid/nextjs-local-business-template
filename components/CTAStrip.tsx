import { site } from "@/config/site";

export default function CTAStrip() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, var(--color-gold-dark), var(--color-bronze))",
        color: "#fff",
        textAlign: "center",
        padding: "80px 6%",
      }}
    >
      <h2 style={{ color: "#fff", fontSize: "clamp(28px, 4.5vw, 42px)", marginBottom: "18px" }}>
        Ready to Book?
      </h2>
      <p style={{ fontWeight: 300, marginBottom: "30px", opacity: 0.95 }}>
        Appointments fill up &mdash; especially around holidays and events in {site.serviceArea}.
      </p>
      <a
        href="#booking"
        style={{ display: "inline-block", padding: "16px 38px", borderRadius: "40px", fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, background: "#fff", color: "var(--color-brown)", border: "1px solid #fff", transition: "all .3s ease" }}
      >
        Book Your Appointment
      </a>
    </section>
  );
}
