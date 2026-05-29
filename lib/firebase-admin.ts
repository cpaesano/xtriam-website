import {
  cert,
  getApps,
  initializeApp,
  type App,
  type ServiceAccount,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

/**
 * Server-side Firebase Admin SDK for the dedicated `xtriam-support` project.
 *
 * This is intentionally separate from `lib/firebase-proposals.ts` (which uses
 * the client SDK against the `xtriam-proposals` project). All support data is
 * read/written here through the Admin SDK from Next.js API routes only — the
 * Admin SDK bypasses Firestore/Storage security rules, so the API route's JWT
 * session check is the real security boundary.
 */

const APP_NAME = "support";
const DEFAULT_BUCKET =
  process.env.FIREBASE_STORAGE_BUCKET || "xtriam-support.firebasestorage.app";

let cachedApp: App | null = null;
let settingsApplied = false;

function parseServiceAccount(): ServiceAccount {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_JSON env var is not set — cannot initialize the xtriam-support Admin SDK."
    );
  }

  let parsed: {
    project_id?: string;
    client_email?: string;
    private_key?: string;
  };
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON.");
  }

  // Defensive: some env stores (and the Vercel dashboard) escape the newlines
  // in the PEM private key. Normalize \n back to real newlines.
  if (parsed.private_key && parsed.private_key.includes("\\n")) {
    parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
  }

  return {
    projectId: parsed.project_id,
    clientEmail: parsed.client_email,
    privateKey: parsed.private_key,
  };
}

function getSupportApp(): App {
  if (cachedApp) return cachedApp;

  const existing = getApps().find((a) => a.name === APP_NAME);
  if (existing) {
    cachedApp = existing;
    return existing;
  }

  const sa = parseServiceAccount();
  cachedApp = initializeApp(
    {
      credential: cert(sa),
      projectId: sa.projectId,
      storageBucket: DEFAULT_BUCKET,
    },
    APP_NAME
  );
  return cachedApp;
}

/** Firestore for the xtriam-support project (lazy, cached). */
export function getAdminDb(): Firestore {
  const db = getFirestore(getSupportApp());
  if (!settingsApplied) {
    try {
      db.settings({ ignoreUndefinedProperties: true });
    } catch {
      // settings() throws if called after first use; safe to ignore.
    }
    settingsApplied = true;
  }
  return db;
}

/** Default Cloud Storage bucket for the xtriam-support project. */
export function getSupportBucket() {
  return getStorage(getSupportApp()).bucket();
}
