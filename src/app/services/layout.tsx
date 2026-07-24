import type { Metadata } from "next";

// The services page itself is a client component and cannot export metadata,
// so this segment layout carries its unique title/description/canonical.
export const metadata: Metadata = {
  title: "Car Services & Mechanical Repairs in South-East Melbourne",
  description:
    "Logbook servicing, brakes and suspension, auto electrical, air conditioning, engine and transmission repairs, roadworthy inspections and fleet care at Carmotive, Dingley Village.",
  alternates: { canonical: "https://bibkin-maks.github.io/CarMotive/services" },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
