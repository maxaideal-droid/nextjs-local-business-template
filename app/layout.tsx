import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Montserrat } from "next/font/google";
import Script from "next/script";
import { site } from "@/config/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// Only wire up analytics/verification when real values are present
const isRealGA4 = !site.ga4.startsWith("G-XXXXX");
const isRealAhrefs = site.ahrefs !== "YOUR_AHREFS_DATA_KEY";
const isRealGSC = site.gscVerification !== "YOUR_GSC_VERIFICATION_CONTENT";
const isRealAhrefsVerification = site.ahrefsSiteVerification !== "YOUR_AHREFS_SITE_VERIFICATION";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.name} is ${site.location}'s trusted local service. Contact us at ${site.phone}.`,
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.domain,
    images: [{ url: "/og/home.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: site.domain,
  },
  verification: {
    google: isRealGSC ? site.gscVerification : undefined,
  },
  ...(isRealAhrefsVerification && {
    other: {
      "ahrefs-site-verification": site.ahrefsSiteVerification,
    },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${montserrat.variable}`}
    >
      <body className="font-sans">
        {children}

        {/* Ahrefs analytics — only loads when a real key is configured */}
        {isRealAhrefs && (
          <Script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key={site.ahrefs}
            strategy="afterInteractive"
          />
        )}

        {/* Google Analytics 4 — only loads when a real measurement ID is configured */}
        {isRealGA4 && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${site.ga4}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${site.ga4}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  );
}
