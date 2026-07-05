import { site } from "@/config/site";

const infoItems = [
  "Real-time availability",
  "Automated email confirmations",
  "Easy rescheduling",
  "Service area: " + site.serviceArea,
  "Secure online payment / deposit",
];

export default function Booking() {
  return (
    <section
      id="booking"
      style={{ padding: "100px 6%", background: "linear-gradient(180deg, var(--color-cream), #f3e4cc)" }}
    >
      <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 60px" }}>
        <div style={{ textTransform: "uppercase", letterSpacing: "4px", fontSize: "12px", color: "var(--color-bronze)", fontWeight: 600, marginBottom: "8px" }}>
          Book Your Appointment
        </div>
        <h2 style={{ fontSize: "clamp(32px,5vw,48px)", marginBottom: "16px" }}>
          Reserve Your Spot
        </h2>
        <div style={{ width: "60px", height: "2px", background: "var(--color-gold)", margin: "18px auto" }} />
        <p style={{ color: "var(--color-bronze)", fontSize: "16px", fontWeight: 300 }}>
          Pick a time and we will come to you. Confirmation and reminder emails are sent automatically.
        </p>
      </div>

      <div
        style={{ maxWidth: "1000px", margin: "0 auto", background: "#fff", borderRadius: "22px", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1.1fr", boxShadow: "0 40px 80px -40px rgba(140,90,53,0.4)", border: "1px solid rgba(200,160,90,0.25)" }}
        className="booking-wrap"
      >
        <div style={{ background: "linear-gradient(160deg, var(--color-brown), #5a3f29)", color: "var(--color-cream)", padding: "50px 40px" }}>
          <div style={{ textTransform: "uppercase", letterSpacing: "4px", fontSize: "12px", color: "var(--color-gold)", fontWeight: 600 }}>
            Why Book With Us
          </div>
          <h3 style={{ color: "var(--color-cream)", fontSize: "28px", margin: "14px 0 16px" }}>
            Effortless Booking, Automated Reminders
          </h3>
          <p style={{ fontSize: "14px", fontWeight: 300, opacity: 0.9, marginBottom: "24px" }}>
            Once booked, you will automatically receive a confirmation email, a 24-hour reminder, and everything you need before your appointment.
          </p>
          <ul style={{ listStyle: "none", fontSize: "14px", fontWeight: 300 }}>
            {infoItems.map((item) => (
              <li key={item} style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.12)", display: "flex", gap: "10px" }}>
                <span style={{ color: "var(--color-gold)" }}>&#9788;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {site.booking === "https://booking-embed-url-here" ? (
            <div style={{ border: "1px dashed rgba(200,160,90,0.5)", borderRadius: "12px", padding: "60px 20px", textAlign: "center", color: "var(--color-bronze)", fontFamily: "var(--font-sans)", fontSize: "14px" }}>
              <p style={{ marginBottom: "12px", fontWeight: 600 }}>Booking Embed Placeholder</p>
              <p>Set <code>site.booking</code> in <code>config/site.ts</code> to your booking system embed URL (Vagaro, Calendly, Acuity, etc.).</p>
            </div>
          ) : (
            <iframe
              src={site.booking}
              width="100%"
              height={600}
              style={{ border: "1px solid rgba(200,160,90,0.25)", borderRadius: "12px" }}
              scrolling="yes"
              title={`Book an appointment with ${site.name}`}
            />
          )}
        </div>
      </div>
    </section>
  );
}
