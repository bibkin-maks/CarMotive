import type { MetadataRoute } from "next";

// Required so Next emits a static sitemap.xml under `output: export`.
export const dynamic = "force-static";

const siteUrl = "https://bibkin-maks.github.io/CarMotive";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/services`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/gallery`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
