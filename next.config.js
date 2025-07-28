/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif']
  },
  output: 'standalone'
};

module.exports = nextConfig;
