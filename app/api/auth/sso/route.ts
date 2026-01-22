import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/session";
import type { SSOTokenPayload } from "@/types/auth";
import crypto from "crypto";

// Get SSO secret from environment
const SSO_SECRET = process.env.PORTAL_SSO_SECRET || "";

/**
 * Base64Url decode (reverse of Salesforce's base64UrlEncode)
 */
function base64UrlDecode(input: string): string {
  // Convert Base64Url to standard Base64
  let base64 = input.replace(/-/g, "+").replace(/_/g, "/");

  // Add padding if needed
  const padding = base64.length % 4;
  if (padding) {
    base64 += "=".repeat(4 - padding);
  }

  return Buffer.from(base64, "base64").toString("utf-8");
}

/**
 * Verify JWT signature using HMAC-SHA256
 */
function verifySignature(
  headerAndPayload: string,
  signature: string,
  secret: string
): boolean {
  // Create expected signature
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(headerAndPayload)
    .digest("base64")
    // Convert to Base64Url
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * Parse and validate JWT token
 */
function parseAndValidateToken(token: string): {
  valid: boolean;
  payload?: SSOTokenPayload;
  error?: string;
} {
  // Check if SSO is configured
  if (!SSO_SECRET) {
    return { valid: false, error: "SSO not configured" };
  }

  // Split token into parts
  const parts = token.split(".");
  if (parts.length !== 3) {
    return { valid: false, error: "Invalid token format" };
  }

  const [headerB64, payloadB64, signatureB64] = parts;

  // Verify signature
  const headerAndPayload = `${headerB64}.${payloadB64}`;
  try {
    if (!verifySignature(headerAndPayload, signatureB64, SSO_SECRET)) {
      return { valid: false, error: "Invalid token signature" };
    }
  } catch (e) {
    console.error("Signature verification error:", e);
    return { valid: false, error: "Signature verification failed" };
  }

  // Decode and parse payload
  let payload: SSOTokenPayload;
  try {
    const payloadJson = base64UrlDecode(payloadB64);
    payload = JSON.parse(payloadJson);
  } catch (e) {
    console.error("Payload decode error:", e);
    return { valid: false, error: "Invalid token payload" };
  }

  // Validate required fields
  if (!payload.sub || !payload.name || !payload.orgId) {
    return { valid: false, error: "Missing required token fields" };
  }

  // Check expiration
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) {
    return { valid: false, error: "Token expired" };
  }

  // Check if token is from the future (clock skew tolerance: 60 seconds)
  if (payload.iat && payload.iat > now + 60) {
    return { valid: false, error: "Token issued in the future" };
  }

  return { valid: true, payload };
}

/**
 * Split full name into first and last name
 */
function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");
  return { firstName, lastName };
}

/**
 * GET /api/auth/sso
 * Validates JWT token from bpmPro package and creates session
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  // Check for token
  if (!token) {
    return NextResponse.redirect(
      new URL("/login?error=missing_token", request.url)
    );
  }

  // Parse and validate token
  const result = parseAndValidateToken(token);

  if (!result.valid || !result.payload) {
    console.error("SSO token validation failed:", result.error);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(result.error || "invalid_token")}`, request.url)
    );
  }

  const payload = result.payload;

  // Split name into first/last
  const { firstName, lastName } = splitName(payload.name);

  // Create session with SSO data
  // Note: For SSO users, we use the SF User ID as contactId and orgId as accountId
  // This distinguishes SSO sessions from phone-verified sessions
  await createSession({
    contactId: payload.sub,        // SF User ID from subscriber org
    accountId: payload.orgId,      // Subscriber Org ID
    firstName,
    lastName,
    email: payload.email || "",
    phone: payload.phone || "",
    authMethod: "sso",
    orgId: payload.orgId,
    orgName: payload.orgName,
    sfUserId: payload.sub,
  });

  console.log(`SSO login successful: ${payload.name} from ${payload.orgName}`);

  // Redirect to support page
  return NextResponse.redirect(new URL("/support", request.url));
}
