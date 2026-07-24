import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import GalleryPageClient from "./GalleryPageClient";

export const metadata: Metadata = {
  title: "Workshop Gallery",
  description:
    "A look inside the Carmotive workshop in Dingley Village — our team, our hoists, and the vehicles we care for.",
  alternates: { canonical: "https://bibkin-maks.github.io/CarMotive/gallery" },
};

const GALLERY_DIR = "image/galleryAssets";
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

// Filenames are UUIDs, so alt text cannot be derived from them. These are the
// frames whose subject is known; anything new dropped into the folder falls
// back to the generic line below and should be given a real description here.
const ALT_BY_FILE: Record<string, string> = {
  "328789fd-cdbe-4242-b81a-5976e0eb61b5.jpg":
    "A Carmotive technician running diagnostics on an engine bay with a work light",
  "d1824a79-29e4-4483-9161-ec37c537f653.jpg":
    "The Carmotive front desk, taking a customer booking by phone",
  "d48a55e3-4e78-4eb6-bc22-57cbde58c3dc.jpg":
    "The Carmotive workshop floor, with vehicles up on the hoists",
  "01e10a08-d174-4467-9f7e-3a5949196b37.jpg":
    "A Mercedes A45 raised on a hoist while a technician works on the wheel",
  "6d392fe7-2dd9-47ea-8e61-920aab718236.jpg":
    "A Honda CRX in the workshop mid-restoration, bonnet and hatch open",
  "7baeb7c3-a701-4cc1-87a6-47f1a0fd689b.jpg":
    "The Carmotive reception and customer waiting area",
};

const FALLBACK_ALT = "A photograph from the Carmotive workshop";

// Read at build time. The site is a static export, so this runs during
// `next build` and the resulting list is baked into the prerendered page —
// dropping a new photo into public/image/galleryAssets picks it up on the next
// build, with no code change.
function readGalleryImages() {
  const dir = path.join(process.cwd(), "public", GALLERY_DIR);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }

  return files
    .filter((file) => IMAGE_EXT.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      src: `${basePath}/${GALLERY_DIR}/${file}`,
      alt: ALT_BY_FILE[file] ?? FALLBACK_ALT,
      caption: "",
    }));
}

export default function GalleryPage() {
  return <GalleryPageClient images={readGalleryImages()} />;
}
