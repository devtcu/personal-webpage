/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  swcMinify: true,
  reactStrictMode: false, // Set to false to avoid extra renders
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif', 'image/jpeg', 'image/png'],
    unoptimized: true // Set to true to prevent image optimization issues
  },
  // Ensure consistent CSS output
  output: 'standalone',
  // Fix asset loading paths
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  basePath: '',
  // Fix CSS optimizations
  compiler: {
    // Remove unused CSS in production
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false
  },
  // Configure trailing slashes
  trailingSlash: false,
};

module.exports = nextConfig;
