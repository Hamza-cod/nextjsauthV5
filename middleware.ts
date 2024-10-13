
import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { apiPrefix, authRoures, DEFAULT_LOGIN_REDIRECT, LOGIN_URI, publicRoutes } from "./routes";
import { NextResponse } from "next/server";
 const {auth} = NextAuth(authConfig);
export default  auth((req)=>{
 const {nextUrl}= req
 const isLoggedIn = !!req.auth
 const isApiAuthRoute = nextUrl.pathname.startsWith(apiPrefix)
 const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
 const isAuthRoute = authRoures.includes(nextUrl.pathname)

  // Allow access to AUTH API routes
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

 
  // Handle protected routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // Redirect to login if not authenticated and accessing a non-public route
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN_URI, nextUrl));
  }

  // Allow access to other routes
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}