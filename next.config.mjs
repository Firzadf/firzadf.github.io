/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com", "raw.githubusercontent.com", "via.placeholder.com"],
  },
  // Enable static export mode for easy deployment to GitHub Pages (firzadf.github.io)
  output: "export",
};

export default nextConfig;
