import type { Metadata } from "next";
import { Bebas_Neue, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const siteUrl = "https://bibkin-maks.github.io/CarMotive";
const ogImage = `${siteUrl}/image/3d_logo_carmotive.png`;
const description =
  "Carmotive is an automotive repairs workshop in southeastern Melbourne, offering mechanical, auto electrical and fleetcare services for all passenger vehicles. Open Monday to Friday, 8:00am to 5:00pm.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Carmotive | Automotive Repairs & Servicing in Melbourne",
    template: "%s | Carmotive",
  },
  description,
  keywords: [
    "car service Melbourne",
    "automotive repairs",
    "logbook servicing",
    "auto electrical",
    "fleet management",
    "mechanic southeastern Melbourne",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "Carmotive",
    title: "Carmotive | Automotive Repairs & Servicing in Melbourne",
    description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Carmotive" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carmotive | Automotive Repairs & Servicing in Melbourne",
    description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: true },
  category: "Automotive Repair",
};

// Local-business structured data. Search engines use this for rich results and
// local/Maps listings — name, address, phone, hours and geo in one place.
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${siteUrl}/#business`,
  name: "Carmotive",
  description,
  url: `${siteUrl}/`,
  image: ogImage,
  logo: `${siteUrl}/image/logo.png`,
  telephone: "+61395516555",
  email: "info@carmotive.com.au",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "292B Boundary Road",
    addressLocality: "Dingley Village",
    addressRegion: "VIC",
    postalCode: "3172",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -37.985615,
    longitude: 145.110033,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  areaServed: [
    "Dingley Village",
    "Melbourne",
    "Mordialloc",
    "Springvale",
    "Keysborough",
    "Clayton",
    "Moorabbin",
  ].map((name) => ({ "@type": "City", name })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body
        suppressHydrationWarning={true}
        className={`${poppins.variable} ${bebasNeue.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
