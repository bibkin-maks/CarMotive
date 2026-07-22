/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "",
  assetPrefix: "",

  images: {
    unoptimized: true,
    // Required from Next.js 16: every `quality` passed to <Image> must be declared.
    qualities: [85],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "",
  },
};

export default nextConfig;
