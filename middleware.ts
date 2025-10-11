import { NextRequest, NextResponse } from 'next/server'

// Blacklist of first-segment paths we should NOT treat as usernames.
const BLACKLIST = new Set([
  'api', '_next', 'favicon.ico', 'assets', 'images', 'blog', 'auth',
  'dashboard', 'pricing', 'features', 'about', 'contact', 'public', 'robots.txt', 'sitemap.xml'
])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only consider requests at root-level with a single segment (no slashes beyond the first)
  // and ignore requests that contain a file extension (e.g., .png, .js)
  const segs = pathname.replace(/^\//, '').split('/')
  if (segs.length === 1 && segs[0]) {
    const first = segs[0].toLowerCase()

    // ignore blacklisted/system paths and file-like requests
    if (!BLACKLIST.has(first) && !/\.[a-z0-9]+$/i.test(first)) {
      const url = request.nextUrl.clone()
      url.pathname = `/blog/${first}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
