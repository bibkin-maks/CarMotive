import type { Metadata } from "next";

// `/` and `/home` render the same page. Point /home's canonical at the root so
// search engines consolidate them instead of treating it as duplicate content.
export const metadata: Metadata = {
  alternates: { canonical: "https://bibkin-maks.github.io/CarMotive/" },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
