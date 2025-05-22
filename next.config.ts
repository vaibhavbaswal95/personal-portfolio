import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages needs this when the site isn't at the root URL
  // Update these with your actual GitHub username and repository name
  basePath: process.env.NODE_ENV === 'production' ? '/personal-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personal-portfolio/' : '',
  trailingSlash: true,
};

export default nextConfig;
