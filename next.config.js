/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gateway.lighthouse.storage', 'ipfs.io', 'localhost'],
    unoptimized: false,
  },
  // Note: username routing is handled in middleware.ts to avoid
  // complex rewrite/glob patterns in next.config which can trigger
  // micromatch recursion during Vercel build trace collection.
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Enable static optimization
  trailingSlash: false,
  // Optimize for Vercel
  experimental: {
    // optimizeCss: true, // Removed due to critters dependency issue
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
