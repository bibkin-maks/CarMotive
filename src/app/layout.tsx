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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${poppins.variable} ${bebasNeue.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
