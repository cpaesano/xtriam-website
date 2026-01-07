import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { SessionPayload } from "@/types/auth";

// Secret key for signing JWTs
const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET || "default-secret-change-in-production"
);

// Cookie configuration
const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "xtriam_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

/**
 * Create a new session and set the cookie
 */
export async function createSession(
  payload: Omit<SessionPayload, "iat" | "exp">
): Promise<void> {
  const token = await new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/",
  });
}

/**
 * Get the current session from the cookie
 * Returns null if no valid session exists
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionPayload;
  } catch (error) {
    console.error("Session verification error:", error);
    return null;
  }
}

/**
 * Destroy the current session by clearing the cookie
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Check if a session is valid (for middleware use)
 * This version doesn't use cookies() and takes a token directly
 */
export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Get the cookie name (for middleware use)
 */
export function getSessionCookieName(): string {
  return COOKIE_NAME;
}
