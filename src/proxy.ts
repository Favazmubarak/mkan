import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Security Headers applied globally
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Admin Routes Protection & Indexing Prevention
  if (pathname.startsWith("/admin")) {
    // Prevent search engine indexing of admin portal
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");

    const sessionCookie = request.cookies.get("mkan_admin_session");

    // Keep the login page public. The protected route-group layout performs
    // the authoritative session check for every studio page.
    if (pathname === "/admin/login") {
      return response;
    }

    // Require session cookie for all other admin routes
    if (!sessionCookie || !sessionCookie.value) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
};
