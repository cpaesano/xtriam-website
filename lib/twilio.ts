import twilio, { Twilio } from "twilio";

// Lazy initialization of Twilio client
let client: Twilio | null = null;

function getTwilioClient(): Twilio {
  if (!client) {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      throw new Error("Twilio credentials not configured");
    }
    client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }
  return client;
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
 * Send a verification code via Twilio Verify
 * Uses Twilio's managed verification service (no in-memory storage needed)
 */
export async function sendPin(
  phone: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
    if (!serviceSid) {
      throw new Error("TWILIO_VERIFY_SERVICE_SID not configured");
    }

    // Format phone for Twilio
    const formattedPhone = formatPhoneForTwilio(phone);

    // Get Twilio client and send verification via Verify API
    const twilioClient = getTwilioClient();
    const verification = await twilioClient.verify.v2
      .services(serviceSid)
      .verifications.create({
        to: formattedPhone,
        channel: "sms",
      });

    console.log(`Verification sent to ${formattedPhone}, status: ${verification.status}`);

    return { success: true };
  } catch (error) {
    console.error("Twilio Verify sendPin error:", error);
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
 * Verify a PIN code using Twilio Verify
 * Returns true if the code is valid, false otherwise
 */
export async function verifyPin(
  phone: string,
  pin: string
): Promise<boolean> {
  try {
    const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
    if (!serviceSid) {
      console.error("TWILIO_VERIFY_SERVICE_SID not configured");
      return false;
    }

    // Format phone for Twilio
    const formattedPhone = formatPhoneForTwilio(phone);

    // Get Twilio client and check verification via Verify API
    const twilioClient = getTwilioClient();
    const verificationCheck = await twilioClient.verify.v2
      .services(serviceSid)
      .verificationChecks.create({
        to: formattedPhone,
        code: pin,
      });

    console.log(`Verification check for ${formattedPhone}, status: ${verificationCheck.status}`);

    return verificationCheck.status === "approved";
  } catch (error) {
    console.error("Twilio Verify verifyPin error:", error);
    return false;
  }
}
