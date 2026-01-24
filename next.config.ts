/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/CarMotive",
  assetPrefix: "/CarMotive/",

  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "/CarMotive",
  },
};

export default nextConfig;
