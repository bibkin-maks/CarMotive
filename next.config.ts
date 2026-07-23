/** @type {import('next').NextConfig} */

// Deployed to a GitHub *project* page at https://bibkin-maks.github.io/CarMotive/,
// so every asset and route must be served from the /CarMotive sub-path. This is
// applied on production builds only, so `next dev` keeps serving from root.
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/CarMotive" : "";

const nextConfig = {
  output: "export",

  // basePath stays empty: routing lives at the export root and every link/asset
  // in the app is prefixed manually via NEXT_PUBLIC_BASE_PATH below.
  basePath: "",
  // assetPrefix rewrites the Next-generated /_next/* bundle URLs to the sub-path.
  assetPrefix: basePath,

  images: {
    unoptimized: true,
    // Required from Next.js 16: every `quality` passed to <Image> must be declared.
    qualities: [85],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
