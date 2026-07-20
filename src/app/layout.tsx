import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

/* Display face — condensed, automotive. Drives every heading. */
const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/* Body face — a grotesque reads tighter and more precise at UI sizes
   than the previous geometric (Poppins), and ships far fewer bytes
   now that it is loaded once here instead of per-component. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Carmotive — Automotive Repairs, Dingley Village",
    template: "%s | Carmotive",
  },
  description:
    "Mechanical, auto electrical and fleetcare repairs in southeastern Melbourne. Over 100 years of combined experience. Book a service at our Dingley Village workshop.",
  keywords: [
    "car service Melbourne",
    "auto electrical",
    "roadworthy certificate",
    "brake repairs",
    "logbook servicing",
    "Dingley Village mechanic",
  ],
  openGraph: {
    title: "Carmotive — Automotive Repairs, Dingley Village",
    description:
      "Mechanical, auto electrical and fleetcare repairs in southeastern Melbourne.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${bebas.variable} ${inter.variable}`}>
      <body suppressHydrationWarning={true} className="antialiased">
        {children}
      </body>
    </html>
  );
}
