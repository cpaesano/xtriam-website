import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET || "default-secret-change-in-production"
);
const cookieName = process.env.SESSION_COOKIE_NAME || "xtriam_session";

const proposalSecret = new TextEncoder().encode(
  process.env.PROPOSAL_JWT_SECRET || "proposal-secret-change-in-production"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proposal protected routes - passcode auth
  const proposalViewMatch = pathname.match(/^\/proposal\/([^/]+)\/view/);
  if (proposalViewMatch) {
    const code = proposalViewMatch[1];
    const token = request.cookies.get("proposal_access")?.value;

    if (!token) {
      return NextResponse.redirect(new URL(`/proposal/${code}`, request.url));
    }

    try {
      const { payload } = await jwtVerify(token, proposalSecret);
      if ((payload as { proposalCode?: string }).proposalCode !== code) {
        return NextResponse.redirect(new URL(`/proposal/${code}`, request.url));
      }
    } catch {
      const response = NextResponse.redirect(new URL(`/proposal/${code}`, request.url));
      response.cookies.delete("proposal_access");
      return response;
    }
  }

  // Protected routes - require authentication
  if (pathname.startsWith("/support") || pathname.startsWith("/api/support")) {
    const token = request.cookies.get(cookieName)?.value;

    if (!token) {
      // No session cookie
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Verify the JWT
      await jwtVerify(token, secret);
    } catch {
      // Invalid or expired token
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      // Clear invalid cookie and redirect
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(cookieName);
      return response;
    }
  }

  // Redirect authenticated users away from login page
  if (pathname === "/login") {
    const token = request.cookies.get(cookieName)?.value;

    if (token) {
      try {
        await jwtVerify(token, secret);
        // Valid session, redirect to support portal
        return NextResponse.redirect(new URL("/support", request.url));
      } catch {
        // Invalid token, allow access to login (will clear on next request)
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/support/:path*", "/api/support/:path*", "/login", "/proposal/:code/view/:path*"],
};
