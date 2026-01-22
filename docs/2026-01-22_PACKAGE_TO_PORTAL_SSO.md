# Package-to-Portal SSO Architecture

**Date:** January 2025
**Status:** In Development
**Projects:** xtriam-website (Next.js) + xtriam-salesforce (bpmPro package)

---

## Overview

This document describes the Single Sign-On (SSO) architecture that allows bpmPro users to access the xTriam Customer Portal directly from their Salesforce subscriber org without requiring phone/SMS verification.

## Problem Statement

**Current Flow (Phone Verification):**
1. User goes to xtriam.com/support
2. User enters phone number
3. Twilio sends SMS verification code
4. User enters code
5. Portal looks up Contact in xTriam org
6. User is authenticated

**Issues:**
- Users must remember which phone number is registered
- SMS delivery delays
- Twilio costs per verification
- Contact data in xTriam org can become stale
- Friction in the support experience

## Solution: Package-to-Portal SSO

**New Flow:**
1. User is already logged into their Salesforce subscriber org (using bpmPro)
2. User clicks "Need Help?" floating button in Salesforce
3. bpmPro generates a secure JWT token with user info
4. User is redirected to xtriam.com/api/auth/sso?token=xxx
5. Portal validates token and creates session
6. User is instantly logged in - no verification needed!

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  Subscriber Salesforce Org (bpmPro installed)                   │
│                                                                 │
│  User is logged in, working in Salesforce                       │
│                    │                                            │
│                    ▼                                            │
│  ┌─────────────────────────────────┐                           │
│  │  "Need Help?" floating button   │  (LWC in bpmPro package)  │
│  │  portalSupportButton            │                           │
│  └─────────────────────────────────┘                           │
│                    │                                            │
│                    ▼                                            │
│  ┌─────────────────────────────────┐                           │
│  │  PortalSSOController.cls        │  (Apex)                   │
│  │  generatePortalToken()          │                           │
│  └─────────────────────────────────┘                           │
│                    │                                            │
│  Generate JWT token containing:                                 │
│  - User ID, name, email, phone                                  │
│  - Org ID, Org name                                             │
│  - Timestamp + 5 min expiration                                 │
│  - Signed with shared secret (HMAC-SHA256)                      │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     │ HTTPS Redirect
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  xTriam Customer Portal (Next.js on Vercel)                     │
│                                                                 │
│  GET /api/auth/sso?token=eyJhbGciOiJIUzI1...                   │
│                    │                                            │
│                    ▼                                            │
│  ┌─────────────────────────────────┐                           │
│  │  /api/auth/sso/route.ts         │                           │
│  │  - Validate JWT signature       │                           │
│  │  - Check expiration             │                           │
│  │  - Extract user info            │                           │
│  │  - Create session               │                           │
│  └─────────────────────────────────┘                           │
│                    │                                            │
│                    ▼                                            │
│  User lands on /support - already authenticated!                │
└─────────────────────────────────────────────────────────────────┘
```

## Benefits

| Aspect | Phone/SMS (Current) | Package SSO (New) |
|--------|---------------------|-------------------|
| User experience | Enter phone, wait for SMS, enter code | One click |
| Speed | 30-60 seconds | Instant |
| Cost | ~$0.05 per verification (Twilio) | Free |
| Data freshness | Contacts in xTriam org (can be stale) | Real-time from subscriber org |
| Friction | High | None |
| Fallback | N/A | Keep phone verification for edge cases |

---

## JWT Token Specification

### Token Structure

Standard JWT format: `header.payload.signature`

### Header
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload
```json
{
  "sub": "005xx000001abcDEF",    // Salesforce User ID
  "name": "John Smith",          // User's full name
  "email": "john@company.com",   // User's email
  "phone": "9545921256",         // User's phone (digits only, no formatting)
  "orgId": "00Dxx000001abcDEF",  // Subscriber Org ID
  "orgName": "ABC Windows LLC",  // Company/Org name
  "iat": 1706000000,             // Issued at (Unix timestamp in seconds)
  "exp": 1706000300              // Expires at (5 minutes from iat)
}
```

### Signature

- Algorithm: HMAC-SHA256
- Secret: Shared between package (Custom Metadata) and portal (Environment Variable)
- Input: `base64UrlEncode(header) + "." + base64UrlEncode(payload)`

### Base64Url Encoding

JWT uses Base64Url, NOT standard Base64:
- Replace `+` with `-`
- Replace `/` with `_`
- Remove trailing `=` padding

---

## Salesforce Implementation (bpmPro Package)

### Components to Create

#### 1. LWC: `portalSupportButton`

**Location:** `force-app/main/default/lwc/portalSupportButton/`

**Files:**
- `portalSupportButton.html`
- `portalSupportButton.js`
- `portalSupportButton.css`
- `portalSupportButton.js-meta.xml`

**Behavior:**
- Floating button in bottom-right corner of screen
- Can be minimized/hidden (preference saved to localStorage)
- Click triggers Apex call to generate token
- Shows loading spinner while generating
- Redirects to portal with token

**UI Specifications:**
- Position: fixed
- Bottom: 20px
- Right: 20px
- Z-index: 9999 (float above other content)
- Primary color: brand blue
- Icon: Help/Support icon from SLDS
- Minimize button: small X or minus icon

**Meta.xml targets:**
```xml
<targets>
    <target>lightning__AppPage</target>
    <target>lightning__RecordPage</target>
    <target>lightning__HomePage</target>
    <target>lightning__UtilityBar</target>
</targets>
```

#### 2. Apex Class: `PortalSSOController`

**Location:** `force-app/main/default/classes/`

**Files:**
- `PortalSSOController.cls`
- `PortalSSOController.cls-meta.xml`
- `PortalSSOControllerTest.cls`
- `PortalSSOControllerTest.cls-meta.xml`

**Main Method:**
```apex
@AuraEnabled
public static String generatePortalToken()
```

**Implementation Requirements:**

1. Get current user info:
```apex
User currentUser = [
    SELECT Id, Name, Email, Phone, MobilePhone
    FROM User
    WHERE Id = :UserInfo.getUserId()
];
```

2. Get org info:
```apex
String orgId = UserInfo.getOrganizationId();
String orgName = UserInfo.getOrganizationName();
```

3. Get settings from Custom Metadata:
```apex
Portal_SSO_Settings__mdt settings = Portal_SSO_Settings__mdt.getInstance('Default');
```

4. Build JWT payload as JSON

5. Sign with HMAC-SHA256:
```apex
Blob signature = Crypto.generateMac(
    'HmacSHA256',
    Blob.valueOf(headerAndPayload),
    Blob.valueOf(secretKey)
);
```

6. Return complete JWT and portal URL

**Helper Method for Base64Url:**
```apex
private static String base64UrlEncode(Blob input) {
    String base64 = EncodingUtil.base64Encode(input);
    base64 = base64.replace('+', '-');
    base64 = base64.replace('/', '_');
    base64 = base64.replaceAll('=+$', '');
    return base64;
}
```

#### 3. Custom Metadata: `Portal_SSO_Settings__mdt`

**Location:** `force-app/main/default/objects/Portal_SSO_Settings__mdt/`

**Fields:**

| API Name | Type | Description |
|----------|------|-------------|
| `Secret_Key__c` | Text(255) | Shared secret for JWT signing (CHANGE IN PRODUCTION!) |
| `Portal_URL__c` | URL | Base URL: `https://www.xtriam.com` |
| `Token_Expiry_Minutes__c` | Number(2,0) | Token lifetime, default: 5 |
| `Enabled__c` | Checkbox | Enable/disable SSO feature |

**Default Record:**

File: `force-app/main/default/customMetadata/Portal_SSO_Settings.Default.md-meta.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CustomMetadata xmlns="http://soap.sforce.com/2006/04/metadata"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <label>Default</label>
    <protected>false</protected>
    <values>
        <field>Portal_URL__c</field>
        <value xsi:type="xsd:string">https://www.xtriam.com</value>
    </values>
    <values>
        <field>Token_Expiry_Minutes__c</field>
        <value xsi:type="xsd:double">5</value>
    </values>
    <values>
        <field>Enabled__c</field>
        <value xsi:type="xsd:boolean">true</value>
    </values>
    <values>
        <field>Secret_Key__c</field>
        <value xsi:type="xsd:string">CHANGE_THIS_SECRET_KEY_IN_PRODUCTION</value>
    </values>
</CustomMetadata>
```

---

## Portal Implementation (Next.js)

### Components to Create

#### 1. API Route: `/api/auth/sso`

**Location:** `app/api/auth/sso/route.ts`

**Method:** GET (receives token as query parameter)

**Flow:**
1. Extract token from query string
2. Split token into header, payload, signature
3. Verify signature using shared secret
4. Check expiration (exp claim)
5. Optionally: Check if token was already used (prevent replay)
6. Extract user info from payload
7. Create session (same as current phone verification)
8. Redirect to /support

**Environment Variable:**
```
PORTAL_SSO_SECRET=your-shared-secret-here
```

#### 2. Session Handling Updates

Modify `lib/session.ts` if needed to handle SSO-based sessions.

The session should store:
- User info from token (name, email, phone)
- Org info (orgId, orgName) - NEW
- Source: 'sso' vs 'phone' - to track auth method

---

## Security Considerations

### Token Security

1. **Short Expiration:** Tokens expire in 5 minutes
2. **Single Use:** Portal should track used tokens to prevent replay attacks
3. **HTTPS Only:** All communication over HTTPS
4. **Secret Rotation:** Periodically rotate the shared secret

### Secret Key Management

1. **Never commit secrets to git**
2. Store in Custom Metadata (Salesforce) - protected
3. Store in Environment Variable (Vercel) - encrypted
4. Use a strong, random secret (min 32 characters)

### Generate a Secure Secret

```bash
# Generate a 64-character random secret
openssl rand -base64 48
```

---

## Setup Instructions

### Step 1: Deploy Salesforce Components

```bash
cd xtriam-salesforce
sf project deploy start --source-dir force-app/main/default/lwc/portalSupportButton
sf project deploy start --source-dir force-app/main/default/classes/PortalSSOController.cls
sf project deploy start --source-dir force-app/main/default/classes/PortalSSOControllerTest.cls
sf project deploy start --source-dir force-app/main/default/objects/Portal_SSO_Settings__mdt
sf project deploy start --source-dir force-app/main/default/customMetadata/Portal_SSO_Settings.Default.md-meta.xml
```

### Step 2: Configure Shared Secret

1. Generate a secure secret:
   ```bash
   openssl rand -base64 48
   ```

2. In Salesforce:
   - Setup → Custom Metadata Types → Portal SSO Settings → Manage Records
   - Edit "Default" record
   - Set Secret_Key__c to the generated secret

3. In Vercel:
   - Project Settings → Environment Variables
   - Add: `PORTAL_SSO_SECRET` = (same secret)
   - Redeploy

### Step 3: Add LWC to Lightning Pages

1. Open Lightning App Builder
2. Edit the desired page (Home, Record, App)
3. Drag `portalSupportButton` component to the page
4. Save and activate

### Step 4: Test

1. Log into a subscriber org
2. Click the floating "Need Help?" button
3. Should redirect to portal and be logged in automatically

---

## Fallback: Phone Verification

The existing phone/SMS verification remains available for:
- Users accessing portal directly (not from Salesforce)
- Emergency access if SSO has issues
- Users not in subscriber orgs

**Phone verification endpoint:** `/login` (existing)
**SSO endpoint:** `/api/auth/sso` (new)

---

## Files Changed/Created Summary

### xtriam-salesforce (bpmPro Package)

| File | Action |
|------|--------|
| `lwc/portalSupportButton/*` | Create |
| `classes/PortalSSOController.cls` | Create |
| `classes/PortalSSOController.cls-meta.xml` | Create |
| `classes/PortalSSOControllerTest.cls` | Create |
| `classes/PortalSSOControllerTest.cls-meta.xml` | Create |
| `objects/Portal_SSO_Settings__mdt/*` | Create |
| `customMetadata/Portal_SSO_Settings.Default.md-meta.xml` | Create |

### xtriam-website (Customer Portal)

| File | Action |
|------|--------|
| `app/api/auth/sso/route.ts` | Create |
| `lib/session.ts` | Modify (add orgId, orgName) |
| `.env.local` | Add PORTAL_SSO_SECRET |
| Vercel Environment Variables | Add PORTAL_SSO_SECRET |

---

## Testing Checklist

- [ ] LWC displays correctly on Lightning pages
- [ ] Button can be minimized and restored
- [ ] Clicking button generates valid JWT
- [ ] Token contains all required claims
- [ ] Token signature is valid
- [ ] Portal validates token correctly
- [ ] Session is created with correct user info
- [ ] User lands on /support authenticated
- [ ] Expired tokens are rejected
- [ ] Invalid signatures are rejected
- [ ] Phone verification still works as fallback

---

## Troubleshooting

### "Invalid token signature"
- Verify the secret key matches exactly in both systems
- Check for trailing spaces or newlines in the secret
- Ensure Base64Url encoding (not standard Base64)

### "Token expired"
- Check server time sync
- Increase Token_Expiry_Minutes__c if needed

### Button not appearing
- Verify LWC is added to the Lightning page
- Check browser console for JavaScript errors
- Verify component targets in meta.xml

### User info missing in portal
- Check SOQL query in Apex fetches all required fields
- Verify User record has email/phone populated

---

## References

- [JWT.io](https://jwt.io/) - JWT debugger and documentation
- [Salesforce Crypto Class](https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_classes_restful_crypto.htm)
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
