import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "localhost", "genuine-thrill-338e6da1f5.media.strapiapp.com"],
    // Ou utilise remotePatterns pour plus de sécurité :
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'images.unsplash.com',
    //     pathname: '/**',
    //   },
    // ],
  },
};

export default nextConfig;
