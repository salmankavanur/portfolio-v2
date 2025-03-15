import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/blog',
  '/portfolio',
  '/contact',
  '/about',
  '/services',
  '/admin/login',
];

// Define public API routes
const publicApiRoutes = [
  '/api/auth',      // Auth routes
  '/api/contact',   // Contact form
  '/api/blog',      // Public blog posts
  '/api/portfolio', // Public portfolio items
  '/api/testimonials', // Public testimonials
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is an API route that should be protected
  if (pathname.startsWith('/api/')) {
    // Skip authentication for public API routes
    for (const route of publicApiRoutes) {
      if (pathname.startsWith(route)) {
        return NextResponse.next();
      }
    }

    // For protected API routes, check for valid session token
    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // For some routes, only allow admin users
    if (
      (pathname.startsWith('/api/users') || pathname.startsWith('/api/analytics')) &&
      token.role !== 'admin'
    ) {
      return NextResponse.json(
        { success: false, message: 'Forbidden' },
        { status: 403 }
      );
    }

    // User is authenticated, proceed to the API endpoint
    return NextResponse.next();
  }

  // For admin routes (non-API), NextAuth will handle authentication
  // in the layout component, so we don't need to do anything here

  return NextResponse.next();
}

// Configure middleware to run only on the following paths
export const config = {
  matcher: [
    // Protected API routes
    '/api/users/:path*',
    '/api/analytics/:path*',
    '/api/blog/:path*',
    '/api/portfolio/:path*',
    '/api/testimonials/:path*',
    '/api/contact/:path*',
  ],
};
