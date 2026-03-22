import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const accessCode = String(formData.get("accessCode") || "");
  const expectedCode = process.env.ADMIN_ACCESS_CODE;

  if (!expectedCode || accessCode !== expectedCode) {
    return NextResponse.redirect(new URL("/auth/admin-login", request.url), 303);
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);

  response.cookies.set("admin_session", "active", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}