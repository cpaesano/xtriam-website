import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(
  process.env.PROPOSAL_JWT_SECRET || "proposal-secret-change-in-production"
);

const COOKIE_NAME = "proposal_access";
const SESSION_DURATION = 60 * 60 * 24 * 30; // 30 days

export interface ProposalViewer {
  id: string;
  name: string;
  role: "client" | "owner" | "contributor";
  avatar: string; // initials like "BO", "JF", "CP"
}

interface ProposalConfig {
  code: string;
  title: string;
  client: string;
  date: string;
  viewers: Record<string, ProposalViewer>; // passcode → viewer
}

export interface ProposalSessionPayload {
  proposalCode: string;
  viewerId: string;
  viewerName: string;
  viewerRole: "client" | "owner" | "contributor";
  viewerAvatar: string;
}

const proposals: Record<string, ProposalConfig> = {
  palmcity: {
    code: "palmcity",
    title: "Implementation Proposal",
    client: "Palm City Iron Works",
    date: "April 2026",
    viewers: {
      brian2608: {
        id: "brian",
        name: "Brian O'Neill",
        role: "client",
        avatar: "BO",
      },
      john1454: {
        id: "john",
        name: "John Felder",
        role: "client",
        avatar: "JF",
      },
      carlos1256: {
        id: "carlos",
        name: "Carlos Paesano",
        role: "owner",
        avatar: "CP",
      },
      alejandro4056: {
        id: "alejandro",
        name: "Alejandro Eliaschev",
        role: "contributor",
        avatar: "AE",
      },
    },
  },
};

export function getProposalConfig(code: string): Omit<ProposalConfig, "viewers"> | null {
  const config = proposals[code.toLowerCase()];
  if (!config) return null;
  const { viewers: _viewers, ...rest } = config;
  return rest;
}

export function validatePasscode(code: string, passcode: string): ProposalViewer | null {
  const config = proposals[code.toLowerCase()];
  if (!config) return null;
  return config.viewers[passcode] || null;
}

export async function createProposalSession(
  code: string,
  viewer: ProposalViewer
): Promise<void> {
  const payload: ProposalSessionPayload = {
    proposalCode: code,
    viewerId: viewer.id,
    viewerName: viewer.name,
    viewerRole: viewer.role,
    viewerAvatar: viewer.avatar,
  };

  const token = await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
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

export async function verifyProposalToken(
  token: string
): Promise<ProposalSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as ProposalSessionPayload;
  } catch {
    return null;
  }
}

export async function getProposalSession(): Promise<ProposalSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyProposalToken(token);
}

export function getProposalCookieName(): string {
  return COOKIE_NAME;
}
