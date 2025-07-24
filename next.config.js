/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: false
  },
  // Ensure consistent CSS output
  output: 'standalone'
};

module.exports = nextConfig;
