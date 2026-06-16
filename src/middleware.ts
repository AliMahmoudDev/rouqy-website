import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Remote Control Middleware
 * 
 * This middleware checks a remote JSON file to determine if the site should be active.
 * The freelancer controls the remote URL (e.g., a GitHub Gist) and can disable the site
 * by changing "active" from true to false.
 * 
 * Setup:
 * 1. Create a GitHub Gist with a file containing: {"active": true}
 * 2. Get the raw URL of the Gist file
 * 3. Set the REMOTE_STATUS_URL environment variable to that raw URL
 * 4. To disable the site, edit the Gist and change to: {"active": false}
 * 
 * Security: The URL is stored as an environment variable on Vercel, not in the code.
 */

// Remote status check URL (set in Vercel environment variables)
const REMOTE_STATUS_URL = process.env.REMOTE_STATUS_URL || '';

// Cache duration: how long to trust the cached status (5 minutes)
const CACHE_MS = 5 * 60 * 1000;

// Obfuscated cookie names (not easily guessable)
const COOKIE_LAST_CHECK = '_slc';
const COOKIE_STATUS = '_ssa';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API routes, assets, and the maintenance page itself
  if (
    pathname === '/maintenance' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // If no remote URL is configured, allow all access
  if (!REMOTE_STATUS_URL) {
    return NextResponse.next();
  }

  // Check cached status from cookies
  const lastCheck = request.cookies.get(COOKIE_LAST_CHECK)?.value;
  const cachedStatus = request.cookies.get(COOKIE_STATUS)?.value;
  const now = Date.now();

  if (lastCheck && now - parseInt(lastCheck) < CACHE_MS) {
    // Use cached result
    if (cachedStatus === '0') {
      return NextResponse.rewrite(new URL('/maintenance', request.url));
    }
    return NextResponse.next();
  }

  // Fetch remote status
  try {
    const res = await fetch(REMOTE_STATUS_URL, {
      cache: 'no-store',
      signal: AbortSignal.timeout(8000), // 8 second timeout
    });

    if (!res.ok) {
      // If remote returns error, fail open (allow access)
      return NextResponse.next();
    }

    const data = await res.json();
    const isActive = data.active !== false;

    const response = isActive
      ? NextResponse.next()
      : NextResponse.rewrite(new URL('/maintenance', request.url));

    // Cache the result in cookies
    response.cookies.set(COOKIE_LAST_CHECK, now.toString(), { path: '/' });
    response.cookies.set(COOKIE_STATUS, isActive ? '1' : '0', { path: '/' });

    return response;
  } catch {
    // Fail open: if remote is unreachable, allow access
    // This prevents the site from going down due to network issues
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|logo\\.svg|text\\.svg|project\\d+\\.jpg|apple-touch-icon\\.png|logo\\.png).*)',
  ],
};
