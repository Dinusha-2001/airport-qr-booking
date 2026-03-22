import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const adminSession = request.cookies.get("admin_session")?.value;
  const driverSession = request.cookies.get("driver_session")?.value;

  if (pathname.startsWith("/admin")) {
    if (adminSession !== "active") {
      return NextResponse.redirect(new URL("/auth/admin-login", request.url));
    }
  }

  if (pathname.startsWith("/driver")) {
    if (driverSession !== "active") {
      return NextResponse.redirect(new URL("/auth/driver-login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/driver/:path*"],
};