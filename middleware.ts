import NextAuth from "next-auth";
import { authConfig } from "@/auth";
const { auth } = NextAuth(authConfig);
const publicRoutes = ["/login", "/api/auth", "/api/auth/callback", "/api/teas"];
export default auth((req) => {
    const isPublicRoute = publicRoutes.some((route) => req.nextUrl.pathname === route || req.nextUrl.pathname.startsWith(route + "/") || req.nextUrl.pathname.startsWith(route));
    if (req.auth && req.nextUrl.pathname === "/login") {
        const redirectUrl = new URL("/dashboard", req.url);
        return Response.redirect(redirectUrl);
    }
    if (!req.auth && !isPublicRoute && req.nextUrl.pathname !== "/login") {
        const redirectUrl = new URL("/login", req.url);
        redirectUrl.searchParams.set("callbackUrl", req.nextUrl.href);
        return Response.redirect(redirectUrl);
    }
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
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};