/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif']
  },
  output: 'export',
  // Set basePath to your repository name if not using a custom domain
  // Use the name of your GitHub repository
  basePath: process.env.NODE_ENV === 'production' ? '/personal-webpage' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personal-webpage/' : '',
  // This ensures that GitHub Pages won't try to process files with Jekyll
  distDir: 'out',
};

module.exports = nextConfig;