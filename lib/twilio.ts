import twilio from "twilio";

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// In-memory PIN storage with expiration
// NOTE: In production, use Redis or a database with TTL
const pinStore = new Map<string, { pin: string; expires: number }>();

/**
 * Generate a random 6-digit PIN
 */
export function generatePin(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Format phone number to E.164 format for Twilio
 */
export function formatPhoneForTwilio(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, "");

  // If 10 digits, assume US and add +1
  if (digits.length === 10) {
    return `+1${digits}`;
  }

  // If 11 digits starting with 1, add +
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  // Otherwise return with + prefix
  return `+${digits}`;
}

/**
 * Send a PIN code via SMS
 */
export async function sendPin(
  phone: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const pin = generatePin();
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Normalize phone for storage key
    const phoneKey = phone.replace(/\D/g, "");

    // Store PIN with expiration
    pinStore.set(phoneKey, { pin, expires });

    // Format phone for Twilio
    const formattedPhone = formatPhoneForTwilio(phone);

    // Send SMS
    await client.messages.create({
      body: `Your xTriam verification code is: ${pin}\n\nThis code expires in 5 minutes. Do not share this code with anyone.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone,
    });

    console.log(`PIN sent to ${formattedPhone}`);

    return { success: true };
  } catch (error) {
    console.error("Twilio sendPin error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to send verification code",
    };
  }
}

/**
 * Verify a PIN code
 */
export function verifyPin(phone: string, pin: string): boolean {
  // Normalize phone for lookup
  const phoneKey = phone.replace(/\D/g, "");

  const stored = pinStore.get(phoneKey);

  if (!stored) {
    console.log(`No PIN found for phone: ${phoneKey}`);
    return false;
  }

  // Check expiration
  if (Date.now() > stored.expires) {
    console.log(`PIN expired for phone: ${phoneKey}`);
    pinStore.delete(phoneKey);
    return false;
  }

  // Check PIN match
  if (stored.pin !== pin) {
    console.log(`PIN mismatch for phone: ${phoneKey}`);
    return false;
  }

  // PIN verified, clean up
  pinStore.delete(phoneKey);
  console.log(`PIN verified for phone: ${phoneKey}`);

  return true;
}

/**
 * Clear expired PINs (call periodically in production)
 */
export function clearExpiredPins(): void {
  const now = Date.now();
  for (const [phone, data] of pinStore.entries()) {
    if (now > data.expires) {
      pinStore.delete(phone);
    }
  }
}
