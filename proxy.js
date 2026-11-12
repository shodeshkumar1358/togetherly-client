import { getSessionCookie } from "better-auth/cookies";
import { NextResponse } from "next/server";

export function proxy(request) {
  if (getSessionCookie(request)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/event/:path*"],
};
