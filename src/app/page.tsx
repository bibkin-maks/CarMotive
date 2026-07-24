import type { Metadata } from "next";
import Home from "./home/page";

export const metadata: Metadata = {
  alternates: { canonical: "https://bibkin-maks.github.io/CarMotive/" },
};

export default function RootPage() {
  return <Home />;
}
