"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { site } from "@/config/site";

const serviceDropdown = site.servicePages.length > 0
  ? [
      { href: "/services", label: "All Service Areas" },
      ...site.servicePages.map((p) => ({ href: `/services/${p.slug}`, label: `${p.city}, TX` })),
    ]
  : null;

const navLinks = [
  { href: "/#about", label: "About" },
  { href: site.servicePages.length > 0 ? "/services" : "/#services", label: "Services", dropdown: serviceDropdown },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#booking", label: "Booking" },
  { href: "/#contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 6%",
          background: "rgba(247,239,228,0.85)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(200,160,90,0.25)",
          transition: "all .3s ease",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <img
            src="/logo-icon.png"
            alt={`${site.name} logo`}
            width={48}
            height={48}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid rgba(200,160,90,0.4)",
              boxShadow: "0 4px 12px -4px rgba(140,90,53,0.4)",
            }}
          />
          <div>
            <div
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "26px",
                fontWeight: 600,
                color: "var(--color-brown)",
                letterSpacing: "1px",
              }}
            >
              {site.name}
            </div>
            <small
              style={{
                display: "block",
                fontSize: "9px",
                letterSpacing: "3px",
                color: "var(--color-bronze)",
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              {site.tagline}
            </small>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav>
          <ul className="hidden md:flex" style={{ gap: "34px", listStyle: "none", alignItems: "center" }}>
            {navLinks.map((link) => (
              <li key={link.href} style={{ position: "relative" }} className={link.dropdown ? "nav-has-dropdown" : ""}>
                <Link href={link.href} className="nav-link">
                  {link.label}
                  {link.dropdown && <span style={{ marginLeft: "4px", fontSize: "0.6rem", opacity: 0.6, verticalAlign: "middle" }}>▾</span>}
                </Link>
                {link.dropdown && (
                  <ul className="nav-dropdown" style={{ position: "absolute", top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)", minWidth: "200px", background: "var(--color-cream)", border: "1px solid rgba(200,160,90,0.25)", borderRadius: "2px", boxShadow: "0 8px 24px rgba(59,42,30,0.12)", listStyle: "none", padding: "8px 0", zIndex: 1001 }}>
                    {link.dropdown.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} style={{ display: "block", padding: "10px 18px", fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", fontWeight: 500, color: "var(--color-brown)", textDecoration: "none", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/#booking"
          className="hidden md:inline-block"
          style={{
            background: "var(--color-brown)",
            color: "var(--color-cream)",
            padding: "10px 24px",
            borderRadius: "30px",
            textTransform: "uppercase",
            fontSize: "12px",
            letterSpacing: "2px",
            border: "1px solid var(--color-brown)",
            fontWeight: 500,
            transition: "all .3s ease",
            textDecoration: "none",
          }}
        >
          Book Now
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <span style={{ display: "block", width: "24px", height: "2px", background: "var(--color-brown)", transition: "transform 0.3s ease, opacity 0.3s ease", transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: "24px", height: "2px", background: "var(--color-brown)", transition: "opacity 0.3s ease", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: "24px", height: "2px", background: "var(--color-brown)", transition: "transform 0.3s ease, opacity 0.3s ease", transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
      </header>

      {/* Mobile overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "var(--color-brown)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.35s ease",
        }}
      >
        <p style={{ fontFamily: "var(--font-script), serif", fontStyle: "italic", color: "var(--color-gold)", fontSize: "1.1rem", letterSpacing: "0.04em", marginBottom: "32px", opacity: 0.8 }}>
          {site.name}
        </p>

        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "center" }}>
            {navLinks.map((link, i) => (
              <li key={link.href} style={{ transform: open ? "translateY(0)" : "translateY(20px)", opacity: open ? 1 : 0, transition: `transform 0.4s ease ${i * 0.06}s, opacity 0.4s ease ${i * 0.06}s`, marginBottom: link.label === "Contact" ? "24px" : "4px" }}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{ fontFamily: "var(--font-serif)", fontSize: link.label === "Blog" ? "1.1rem" : "2rem", fontWeight: 600, color: link.label === "Blog" ? "var(--color-gold)" : "var(--color-cream)", textDecoration: "none", letterSpacing: link.label === "Blog" ? "0.2em" : "0.04em", textTransform: link.label === "Blog" ? "uppercase" : "none", display: "block", padding: "8px 0" }}
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px" }}>
                    {link.dropdown.map((sub) => (
                      <li key={sub.href}>
                        <Link href={sub.href} onClick={() => setOpen(false)} style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.8rem", fontWeight: 500, color: "var(--color-gold)", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", padding: "4px 0", opacity: 0.75 }}>
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/#booking"
          onClick={() => setOpen(false)}
          style={{ marginTop: "8px", display: "inline-block", padding: "14px 40px", background: "var(--color-gold)", color: "var(--color-brown)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", borderRadius: "30px", transform: open ? "translateY(0)" : "translateY(20px)", opacity: open ? 1 : 0, transition: "transform 0.4s ease 0.4s, opacity 0.4s ease 0.4s" }}
        >
          Book Now
        </Link>

        <a
          href={`tel:${site.phoneE164}`}
          style={{ marginTop: "20px", fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--color-cream)", opacity: 0.5, textDecoration: "none", letterSpacing: "0.08em" }}
        >
          {site.phone}
        </a>
      </div>
    </>
  );
}
