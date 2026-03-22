import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const accessCode = String(formData.get("accessCode") || "");
  const expectedCode = process.env.DRIVER_ACCESS_CODE;

  if (!expectedCode) {
    return NextResponse.redirect(new URL("/auth/driver-login", request.url));
  }

  if (accessCode !== expectedCode) {
    return NextResponse.redirect(new URL("/auth/driver-login", request.url));
  }

  const response = NextResponse.redirect(new URL("/driver", request.url));

  response.cookies.set("driver_session", "active", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}