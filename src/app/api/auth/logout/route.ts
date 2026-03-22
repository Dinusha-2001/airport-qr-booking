import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.delete("admin_session");
  response.cookies.delete("driver_session");
  return response;
}

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.delete("admin_session");
  response.cookies.delete("driver_session");
  return response;
}