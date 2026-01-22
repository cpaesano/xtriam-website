# Lessons Learned: SMS Verification on Serverless (Vercel)

**Date:** January 2025
**Project:** xTriam Customer Portal
**Issue:** PIN verification failing with 401 errors in production

---

## The Problem

### Symptoms
- User enters phone number, receives SMS with verification code
- User enters the code correctly
- System returns 401 "Invalid or expired verification code"
- Browser console shows: `api/auth/verify-pin:1 Failed to load resource: the server responded with a status of 401`

### Root Cause
The original implementation stored PINs in an **in-memory JavaScript Map**:

```typescript
// THIS DOES NOT WORK ON SERVERLESS
const pinStore = new Map<string, { pin: string; expires: number }>();
```

**Why this fails on Vercel/serverless:**

1. `send-pin` API runs on serverless instance A → stores PIN in memory
2. `verify-pin` API runs on serverless instance B → different memory, PIN not found
3. Each API request can run on a completely different serverless function instance
4. There is no shared memory between instances

This might work intermittently if both requests happen to hit the same instance (warm function), but it's unreliable.

---

## The Solution: Twilio Verify

Instead of managing PIN storage ourselves, use **Twilio Verify** - a managed service that handles:
- PIN generation
- SMS delivery
- PIN storage with TTL
- Rate limiting
- Fraud detection

### Why Twilio Verify?

| Approach | Pros | Cons |
|----------|------|------|
| In-memory Map | Simple | Does not work on serverless |
| Redis (Vercel KV) | Fast, works on serverless | Additional service to manage |
| Database | Works on serverless | Overkill for temporary PINs |
| **Twilio Verify** | Managed, secure, no storage needed | Small additional cost per verification |

We chose Twilio Verify because:
- We already use Twilio for SMS
- No additional infrastructure to manage
- Built-in security features (rate limiting, fraud detection)
- Handles edge cases (retries, expiration)

---

## Implementation Guide

### Step 1: Create Twilio Verify Service

1. Go to [Twilio Console → Verify → Services](https://console.twilio.com/us1/develop/verify/services)
2. Click **Create new**
3. Configure:

| Setting | Value | Notes |
|---------|-------|-------|
| Friendly name | `[App Name] Portal` | e.g., "xTriam Customer Portal" |
| Branded Sender ID | `[Company]` | e.g., "xTriam" - appears as SMS sender name |
| Verify Events | Off | Only needed for analytics integrations |
| WhatsApp | Off | Not needed for US clients |

4. Copy the **Service SID** (starts with `VA`)

### Step 2: Add Environment Variable

Add to Vercel (and local `.env.local`):

```env
TWILIO_VERIFY_SERVICE_SID=VA880761505a25d3f98789f0645c95f1f2
```

**Important:** After adding to Vercel, you must **redeploy** for changes to take effect.

### Step 3: Update Code

#### lib/twilio.ts

```typescript
import twilio, { Twilio } from "twilio";

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
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+1${digits}`;  // US number
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }
  return `+${digits}`;
}

/**
 * Send verification code via Twilio Verify
 */
export async function sendPin(
  phone: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
    if (!serviceSid) {
      throw new Error("TWILIO_VERIFY_SERVICE_SID not configured");
    }

    const formattedPhone = formatPhoneForTwilio(phone);
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
      error: error instanceof Error ? error.message : "Failed to send verification code",
    };
  }
}

/**
 * Verify code using Twilio Verify
 */
export async function verifyPin(phone: string, pin: string): Promise<boolean> {
  try {
    const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
    if (!serviceSid) {
      console.error("TWILIO_VERIFY_SERVICE_SID not configured");
      return false;
    }

    const formattedPhone = formatPhoneForTwilio(phone);
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
```

#### API Route Changes

In `verify-pin/route.ts`, ensure `verifyPin` is awaited (it's now async):

```typescript
// Before (sync)
const isValid = verifyPin(phone, pin);

// After (async)
const isValid = await verifyPin(phone, pin);
```

---

## Required Environment Variables

| Variable | Example | Description |
|----------|---------|-------------|
| `TWILIO_ACCOUNT_SID` | `AC...` | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | `...` | Twilio auth token |
| `TWILIO_VERIFY_SERVICE_SID` | `VA...` | Verify service SID |

**Note:** `TWILIO_PHONE_NUMBER` is no longer needed - Twilio Verify uses its own sender pool.

---

## Twilio Verify Settings for US Clients

| Setting | Recommended Value | Reason |
|---------|-------------------|--------|
| SMS Channel | Enabled | Primary verification method |
| WhatsApp Channel | Disabled | Not commonly used in US |
| Voice Channel | Optional | Backup for users who can't receive SMS |
| Email Channel | Optional | Alternative verification method |
| Branded Sender ID | Company name | Professional appearance |
| Verify Events | Off | Only needed for external analytics |

---

## Cost Considerations

Twilio Verify pricing (as of 2025):
- ~$0.05 per successful verification
- Failed attempts may also incur charges
- Check current pricing at [twilio.com/verify](https://www.twilio.com/verify)

For a customer portal with moderate traffic, this is typically a few dollars per month.

---

## Debugging Checklist

If verification fails after implementing Twilio Verify:

1. **Check environment variable is set:**
   ```bash
   # In Vercel logs or local
   console.log("Service SID:", process.env.TWILIO_VERIFY_SERVICE_SID?.substring(0, 5));
   ```

2. **Check Twilio Console logs:**
   - Go to Monitor → Logs → Verify
   - Look for the phone number and check status

3. **Verify phone number format:**
   - Must be E.164 format: `+19545921256`
   - Check `formatPhoneForTwilio()` is working correctly

4. **Check Verify Service is active:**
   - Go to Verify → Services
   - Ensure the service is not paused or deleted

5. **Check for rate limiting:**
   - Twilio has rate limits on verification attempts
   - Too many failed attempts can temporarily block a number

---

## Key Takeaways

1. **Never use in-memory storage on serverless** - Each request can run on a different instance
2. **Use managed services when available** - Twilio Verify handles security, storage, and edge cases
3. **Always redeploy after adding env vars** - Vercel requires redeployment to pick up new variables
4. **Test the full flow in production** - Local testing may work due to single instance, production may not

---

## Files Changed

| File | Change |
|------|--------|
| `lib/twilio.ts` | Replaced in-memory storage with Twilio Verify API |
| `app/api/auth/send-pin/route.ts` | Updated env check for `TWILIO_VERIFY_SERVICE_SID` |
| `app/api/auth/verify-pin/route.ts` | Added `await` for async `verifyPin()` |
| `CLAUDE.md` | Updated environment variable documentation |

---

## References

- [Twilio Verify Documentation](https://www.twilio.com/docs/verify)
- [Twilio Verify API Reference](https://www.twilio.com/docs/verify/api)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
