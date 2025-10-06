/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gateway.lighthouse.storage', 'ipfs.io', 'localhost'],
  },
  async rewrites() {
    return [
      // Route ONLY clean root-level paths (usernames) to blog pages
      // Exclude framework/system and our app routes so API/auth does not 404
      {
        source:
          '/:username((?!api|_next|favicon\\.ico|assets|images|blog|auth|dashboard|pricing|features|about|contact|public).+)',
        destination: '/blog/:username',
      },
    ]
  },
}

module.exports = nextConfig
