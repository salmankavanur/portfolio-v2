/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Allow images from external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'web-assets.same.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  // Enable strict mode for React
  reactStrictMode: true,

  // Customize the build output directory
  distDir: '.next',

  // Enable TypeScript type checking during build
  typescript: {
    // Handled by GitHub Actions in production, but enable for local builds
    ignoreBuildErrors: process.env.CI === 'true',
  },

  // Enable linting during build
  eslint: {
    // Handled by GitHub Actions in production, but enable for local builds
    ignoreDuringBuilds: process.env.CI === 'true',
  },

  // Configure headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
