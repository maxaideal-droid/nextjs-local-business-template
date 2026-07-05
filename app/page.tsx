import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import Testimonials from "@/components/Testimonials";
import CTAStrip from "@/components/CTAStrip";
import Footer from "@/components/Footer";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: `${site.name} is ${site.location}'s trusted local service provider. Serving ${site.serviceArea}. Contact us at ${site.phone}.`,
  alternates: {
    canonical: `${site.domain}/`,
  },
  openGraph: {
    url: `${site.domain}/`,
    title: `${site.name} — ${site.tagline}`,
    description: `${site.name} serves ${site.serviceArea}. Professional, mobile, and available now.`,
    images: [{ url: "/og/home.jpg", width: 1200, height: 630 }],
  },
};

// LocalBusiness JSON-LD — all values pulled from config/site.ts
const schema = {
  "@context": "https://schema.org",
  // Change @type to the most specific subtype that fits the business:
  // BeautySalon | HomeAndConstructionBusiness | FoodEstablishment | etc.
  // See: https://schema.org/LocalBusiness
  "@type": "LocalBusiness",
  name: site.name,
  description: `${site.name} is a local service business in ${site.location}. Serving ${site.serviceArea}.`,
  url: site.domain,
  telephone: site.phoneE164,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.split(",")[0]?.trim() ?? site.location,
    addressRegion: site.location.split(",")[1]?.trim() ?? "TX",
    addressCountry: "US",
  },
  areaServed: site.serviceArea,
  priceRange: "$$",
  image: `${site.domain}/logo-icon.png`,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Booking />
        <Testimonials />
        <CTAStrip />
      </main>
      <Footer />
    </>
  );
}
