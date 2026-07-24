import type { MetadataRoute } from "next";

// Required so Next emits a static robots.txt under `output: export`.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://bibkin-maks.github.io/CarMotive/sitemap.xml",
  };
}
