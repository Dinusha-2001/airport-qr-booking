import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const accessCode = String(body.accessCode || "");
    const expectedCode = process.env.DRIVER_ACCESS_CODE;

    if (!expectedCode || accessCode !== expectedCode) {
      return NextResponse.json(
        { success: false, message: "Invalid driver access code." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("driver_session", "active", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Login failed." },
      { status: 500 }
    );
  }
}