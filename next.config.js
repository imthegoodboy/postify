/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gateway.lighthouse.storage', 'ipfs.io', 'localhost'],
    unoptimized: false,
  },
  async rewrites() {
    return [
      // Route ONLY clean root-level paths (usernames) to blog pages
      // Exclude framework/system and our app routes so API/auth does not 404
      {
        // Match only a single path segment for usernames (no slashes).
        // Avoid complex negative-lookahead regexes here because they can
        // cause micromatch/collect-build-traces to recurse and crash the build.
        source: '/:username([^/]+)',
        destination: '/blog/:username',
      },
    ]
  },
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
