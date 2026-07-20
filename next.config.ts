/** @type {import('next').NextConfig} */

/**
 * The site deploys to GitHub Pages under /CarMotive, so production needs a
 * basePath. Applying it in development too meant `next dev` served nothing
 * at http://localhost:3000/ — every local visit to the root 404'd and you
 * had to know to type /CarMotive by hand. Scope it to production builds.
 */
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/CarMotive" : "";

const nextConfig = {
  output: "export",

  basePath,
  assetPrefix: basePath || undefined,

  images: {
    unoptimized: true,
  },

  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
