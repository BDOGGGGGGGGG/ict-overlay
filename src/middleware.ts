import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await jwtVerify(token, getJwtSecret());
    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set({ name: "session", value: "", maxAge: 0, path: "/" });
    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
