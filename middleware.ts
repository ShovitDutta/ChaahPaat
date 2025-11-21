import NextAuth from 'next-auth';
import { authConfig } from '@/auth';

const { auth } = NextAuth(authConfig);

// Define public routes that don't require authentication
const publicRoutes = ['/', '/login', '/api/auth', '/api/auth/callback', '/api/teas'];

export default auth((req) => {
  // Check if the current route is public
  const isPublicRoute = publicRoutes.some((route) =>
    req.nextUrl.pathname === route ||
    req.nextUrl.pathname.startsWith(route + '/') ||
    req.nextUrl.pathname.startsWith(route)
  );

  // If user is not authenticated and trying to access a protected route
  if (!req.auth && !isPublicRoute && req.nextUrl.pathname !== '/login') {
    // Redirect to login page with callback URL
    let redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('callbackUrl', req.nextUrl.href);
    return Response.redirect(redirectUrl);
  }

  // Allow the request to proceed
  return undefined;
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) - Auth routes are handled separately
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};