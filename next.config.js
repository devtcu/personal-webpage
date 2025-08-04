/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const repoName = 'personal-webpage';

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif']
  },
  output: 'export',
  // Set basePath to your repository name if not using a custom domain
  // Use the name of your GitHub repository
  basePath: isProduction ? `/${repoName}` : '',
  assetPrefix: isProduction ? `/${repoName}/` : '',
  // This ensures that GitHub Pages won't try to process files with Jekyll
  distDir: 'out',
  // Environment variables available to both server and client
  env: {
    REPO_NAME: repoName,
    IS_PRODUCTION: isProduction,
    NEXT_PUBLIC_BASE_PATH: isProduction ? `/${repoName}` : '',
  },
  // Configure webpack to handle asset URLs correctly
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;