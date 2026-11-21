/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Les images distantes sont affichées via <img>, donc non optimisées par Next.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "landtours.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "www.wildimages-phototours.com" },
      { protocol: "https", hostname: "i0.wp.com" },
    ],
  },
};

module.exports = nextConfig;
