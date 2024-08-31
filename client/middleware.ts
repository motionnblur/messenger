import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth/auth";

export async function middleware(request: NextRequest) {
  const isAuthenticated = await auth(request.cookies.get("SESSION_ID")!.value);

  if (isAuthenticated === null || isAuthenticated === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!login|api|_next/static|_next/image|favicon.ico).*)",
  ],
};
