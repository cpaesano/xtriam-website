# Phase II: Phone+PIN Authentication & Customer Support Portal

**Created:** January 4, 2026
**Project:** xtriam-website
**Status:** In Progress (Phases 1-5 Complete, Testing Remaining)
**Last Updated:** January 7, 2026

---

## 1. Overview

Add phone-based authentication that verifies customers against Salesforce bpmPro records, with a protected Support Portal featuring:
- AI Chat (Claude-powered)
- FAQs / Knowledge Base
- Support Tickets (Salesforce Cases)
- Account Information

## 2. User Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        AUTHENTICATION FLOW                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  1. User clicks "Customer Portal" or "Support"                   │
│                         ↓                                         │
│  2. Login page → User enters phone number                        │
│                         ↓                                         │
│  3. API verifies phone exists in Salesforce Contact/Account     │
│                         ↓                                         │
│  4. Twilio sends 6-digit PIN via SMS                             │
│                         ↓                                         │
│  5. User enters PIN                                               │
│                         ↓                                         │
│  6. API verifies PIN → Creates session cookie                    │
│                         ↓                                         │
│  7. User redirected to Support Portal dashboard                  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Technical Stack

### Existing (Already Installed)
| Package | Purpose |
|---------|---------|
| `jsforce` | Salesforce API connection |
| `@anthropic-ai/sdk` | Claude AI integration |
| `react-hook-form` | Form handling |
| `zod` | Schema validation |
| `lucide-react` | Icons |

### New Dependencies Required
```bash
npm install twilio jose
```

| Package | Purpose | Status |
|---------|---------|--------|
| `twilio` | Send SMS PIN codes | ✅ Installed |
| `jose` | JWT session tokens (httpOnly cookies) | ✅ Installed |

---

## 4. Environment Variables

Add to `.env.local`:

```env
# Salesforce Connection (for jsforce)
SF_LOGIN_URL=https://login.salesforce.com
SF_USERNAME=admin@xtriam.com
SF_PASSWORD=your-password
SF_SECURITY_TOKEN=your-security-token

# Twilio SMS
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Session Management
SESSION_SECRET=your-32-character-random-secret
SESSION_COOKIE_NAME=xtriam_session

# Claude AI (may already exist)
ANTHROPIC_API_KEY=your-anthropic-key
```

---

## 5. File Structure & Implementation Status

### 5.1 Library Files (`/lib/`)

| File | Purpose | Status |
|------|---------|--------|
| `lib/utils.ts` | cn() utility | ✅ Existing |
| `lib/salesforce.ts` | Salesforce connection & queries | ✅ Implemented |
| `lib/twilio.ts` | PIN generation & SMS sending | ✅ Implemented |
| `lib/session.ts` | JWT session management | ✅ Implemented |
| `lib/claude.ts` | AI chat with system prompt | ✅ Implemented |

#### `/lib/salesforce.ts` - Functions
- ✅ `getSalesforceConnection()` - Cached jsforce connection
- ✅ `findContactByPhone(phone)` - Query Contact by Phone/MobilePhone/HomePhone
- ✅ `getAccountInfo(accountId)` - Get Account details
- ✅ `getCases(contactId)` - Get support cases for contact
- ✅ `getCaseById(caseId)` - Get single case details
- ✅ `createCase(data)` - Create new support case
- ✅ `normalizePhoneNumber(phone)` - Format phone for matching

#### `/lib/twilio.ts` - Functions
- ✅ `generatePin()` - Generate 6-digit random PIN
- ✅ `sendPin(phone)` - Send PIN via SMS, store with 5-min expiry
- ✅ `verifyPin(phone, pin)` - Verify PIN matches stored value
- ✅ `clearExpiredPins()` - Cleanup expired PINs

#### `/lib/session.ts` - Functions
- ✅ `createSession(payload)` - Create JWT, set httpOnly cookie
- ✅ `getSession()` - Verify JWT, return user payload
- ✅ `destroySession()` - Clear session cookie
- ✅ `verifySessionToken(token)` - Verify JWT token

#### `/lib/claude.ts` - Functions
- ✅ `chat(messages)` - Send messages to Claude with bpmPro system prompt
- ✅ `getWelcomeMessage()` - Initial greeting message
- ✅ System prompt with bpmPro features, support hours, contact info

---

### 5.2 API Routes (`/app/api/`)

```
app/api/
├── auth/
│   ├── send-pin/route.ts      ✅ POST: Verify phone in SF, send PIN
│   ├── verify-pin/route.ts    ✅ POST: Verify PIN, create session
│   ├── session/route.ts       ✅ GET: Get current session
│   └── logout/route.ts        ✅ POST: Destroy session
│
└── support/
    ├── chat/route.ts          ✅ POST: AI chat with Claude
    ├── tickets/
    │   ├── route.ts           ⏳ Pending: GET list, POST create
    │   └── [caseId]/route.ts  ⏳ Pending: GET single ticket
    └── account/route.ts       ⏳ Pending: GET account info
```

#### API Endpoint Details

| Endpoint | Method | Request | Response | Status |
|----------|--------|---------|----------|--------|
| `/api/auth/send-pin` | POST | `{ phone: string }` | `{ success: true }` or `{ error: string }` | ✅ |
| `/api/auth/verify-pin` | POST | `{ phone: string, pin: string }` | `{ success: true, redirect: "/support" }` | ✅ |
| `/api/auth/session` | GET | - | `{ authenticated: boolean, user?: {...} }` | ✅ |
| `/api/auth/logout` | POST | - | `{ success: true }` | ✅ |
| `/api/support/chat` | POST | `{ message: string, history: [...] }` | `{ success: true, message: string }` | ✅ |
| `/api/support/tickets` | GET | - | `{ tickets: [...] }` | ⏳ |
| `/api/support/tickets` | POST | `{ subject, description, priority? }` | `{ success: true, caseId: string }` | ⏳ |
| `/api/support/tickets/[caseId]` | GET | - | `{ ticket: {...} }` | ⏳ |
| `/api/support/account` | GET | - | `{ account: {...} }` | ⏳ |

---

### 5.3 Pages (`/app/`)

```
app/
├── login/page.tsx             ✅ Phone + PIN login form
│
└── support/                   # PROTECTED (requires auth)
    ├── layout.tsx             ✅ Portal layout with sidebar nav
    ├── page.tsx               ✅ Dashboard with quick actions
    ├── chat/page.tsx          ✅ AI Chat interface
    ├── tickets/
    │   ├── page.tsx           ⏳ List all tickets
    │   ├── new/page.tsx       ⏳ Create new ticket
    │   └── [caseId]/page.tsx  ⏳ View ticket details
    ├── account/page.tsx       ⏳ Account information
    └── knowledge/page.tsx     ⏳ FAQs / Knowledge base
```

---

### 5.4 Components

```
components/
├── auth/
│   ├── index.ts               ✅ Exports
│   ├── LoginForm.tsx          ✅ Complete two-step login flow
│   ├── PhoneInput.tsx         ✅ Phone number with (XXX) XXX-XXXX formatting
│   └── PinInput.tsx           ✅ 6-digit PIN with auto-advance, paste support
│
├── support/
│   ├── index.ts               ✅ Exports
│   ├── PortalNav.tsx          ✅ Sidebar navigation with quick actions
│   ├── ChatInterface.tsx      ✅ AI chat UI with typing indicator
│   ├── TicketList.tsx         ⏳ Tickets table/cards
│   ├── TicketDetail.tsx       ⏳ Single ticket view
│   ├── TicketForm.tsx         ⏳ Create/edit ticket form
│   └── AccountCard.tsx        ⏳ Account info display
│
└── ui/
    └── ... (existing)
```

---

### 5.5 Middleware

| File | Purpose | Status |
|------|---------|--------|
| `middleware.ts` | Protects `/support/*` and `/api/support/*` routes | ✅ Implemented |

**Middleware logic:**
1. ✅ Check if path starts with `/support` or `/api/support`
2. ✅ Verify session cookie exists and is valid JWT
3. ✅ If invalid → redirect to `/login` (or return 401 for API)
4. ✅ If valid → allow request to proceed
5. ✅ If authenticated user visits `/login` → redirect to `/support`

---

### 5.6 Types

| File | Purpose | Status |
|------|---------|--------|
| `types/auth.ts` | TypeScript interfaces for auth & Salesforce | ✅ Implemented |

**Interfaces defined:**
- ✅ `SessionPayload` - JWT payload structure
- ✅ `SalesforceContact` - Contact record fields
- ✅ `SalesforceAccount` - Account record fields
- ✅ `SalesforceCase` - Case record fields
- ✅ `SendPinRequest/Response` - API types
- ✅ `VerifyPinRequest/Response` - API types
- ✅ `ChatMessage` - Chat message structure

---

## 6. Salesforce Integration Details

### Contact Query for Phone Verification
```sql
SELECT Id, FirstName, LastName, Email, Phone, MobilePhone,
       HomePhone, OtherPhone, AccountId, Account.Name
FROM Contact
WHERE Phone = :normalizedPhone
   OR MobilePhone = :normalizedPhone
   OR HomePhone = :normalizedPhone
   OR OtherPhone = :normalizedPhone
LIMIT 1
```

### Case Query for Tickets
```sql
SELECT Id, CaseNumber, Subject, Status, Priority,
       CreatedDate, Description, ClosedDate
FROM Case
WHERE ContactId = :contactId
ORDER BY CreatedDate DESC
```

### Case Creation
```javascript
{
  ContactId: session.contactId,
  AccountId: session.accountId,
  Subject: data.subject,
  Description: data.description,
  Priority: 'Medium',
  Origin: 'Web',
  Status: 'New'
}
```

---

## 7. Session Payload

```typescript
interface SessionPayload {
  contactId: string;      // Salesforce Contact ID
  accountId: string;      // Salesforce Account ID
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  iat: number;            // Issued at
  exp: number;            // Expires (7 days)
}
```

---

## 8. Implementation Phases

### Phase 1: Foundation ✅ COMPLETE
- [x] Install dependencies: `npm install twilio jose`
- [x] Create `/lib/salesforce.ts`
- [x] Create `/lib/twilio.ts`
- [x] Create `/lib/session.ts`
- [x] Create `/lib/claude.ts`
- [x] Create `/types/auth.ts`

### Phase 2: Authentication ✅ COMPLETE
- [x] Create `/middleware.ts`
- [x] Create `/app/api/auth/send-pin/route.ts`
- [x] Create `/app/api/auth/verify-pin/route.ts`
- [x] Create `/app/api/auth/session/route.ts`
- [x] Create `/app/api/auth/logout/route.ts`
- [x] Create `/components/auth/LoginForm.tsx`
- [x] Create `/components/auth/PhoneInput.tsx`
- [x] Create `/components/auth/PinInput.tsx`
- [x] Create `/components/auth/index.ts`
- [x] Create `/app/login/page.tsx`

### Phase 3: Support Portal Core ✅ COMPLETE
- [x] Create `/app/support/layout.tsx`
- [x] Create `/components/support/PortalNav.tsx`
- [x] Create `/components/support/index.ts`
- [x] Create `/app/support/page.tsx` (dashboard)
- [x] Create `/app/api/support/chat/route.ts`
- [x] Create `/components/support/ChatInterface.tsx`
- [x] Create `/app/support/chat/page.tsx`

### Phase 4: Tickets & Account ✅ COMPLETE
- [x] Create `/app/api/support/tickets/route.ts`
- [x] Create `/app/api/support/tickets/[caseId]/route.ts`
- [x] Create `/app/api/support/account/route.ts`
- [x] Create `/components/support/TicketList.tsx`
- [x] Create `/components/support/TicketForm.tsx`
- [x] Create `/components/support/TicketDetail.tsx`
- [x] Create `/components/support/AccountCard.tsx`
- [x] Create `/app/support/tickets/page.tsx`
- [x] Create `/app/support/tickets/new/page.tsx`
- [x] Create `/app/support/tickets/[caseId]/page.tsx`
- [x] Create `/app/support/account/page.tsx`

### Phase 5: Knowledge Base & Polish ✅ COMPLETE
- [x] Create `/app/support/knowledge/page.tsx`
- [x] Update Header with "Customer Portal" link
- [ ] Add loading states and error handling improvements
- [ ] Mobile responsiveness testing
- [ ] End-to-end testing

---

## 9. Security Considerations

| Item | Current Plan | Production Enhancement |
|------|--------------|------------------------|
| PIN Storage | In-memory Map | Redis with TTL |
| Rate Limiting | None | 3 attempts per phone per 15 min |
| Session Duration | 7 days | Consider shorter for sensitive data |
| HTTPS | Cookies secure in prod | Ensure HTTPS enforced |
| SOQL Injection | Phone normalized | Add proper escaping |

---

## 10. UI/UX Notes

### Login Page ✅ Implemented
- Clean, simple design with phone input
- Clear error messages
- "Didn't receive code? Resend" option
- "Use Different Phone Number" to go back
- Loading states during API calls

### Support Portal ✅ Implemented
- Sidebar navigation (collapsible on mobile)
- Welcome message with user's name
- Quick action cards on dashboard
- Contact info banner (phone + email)
- Consistent styling with main website

### AI Chat ✅ Implemented
- Message bubbles (user right, AI left)
- Typing indicator (animated dots) during AI response
- Auto-scroll to latest message
- Enter to send, Shift+Enter for newline
- Welcome message on chat start
- Powered by AI disclaimer with phone fallback

---

## 11. Future Enhancements (Not in Scope)

- Password-based login as alternative
- Remember device / trusted devices
- Email verification option
- Multi-factor authentication
- Chat history persistence
- File attachments on tickets
- Push notifications

---

## 12. Files Reference

### Key Implementation Files

| File | Purpose |
|------|---------|
| `/lib/salesforce.ts` | Salesforce jsforce connection & SOQL queries |
| `/lib/twilio.ts` | Twilio SMS + in-memory PIN storage |
| `/lib/session.ts` | JWT session with jose + httpOnly cookies |
| `/lib/claude.ts` | Claude AI chat with bpmPro system prompt |
| `/types/auth.ts` | TypeScript interfaces |
| `/middleware.ts` | Route protection for /support/* |
| `/app/login/page.tsx` | Login page with metadata |
| `/app/support/layout.tsx` | Portal layout with nav & user menu |
| `/app/support/page.tsx` | Dashboard with quick actions |
| `/app/support/chat/page.tsx` | AI Chat page |
| `/components/auth/LoginForm.tsx` | Two-step login flow |
| `/components/auth/PhoneInput.tsx` | Formatted phone input |
| `/components/auth/PinInput.tsx` | 6-digit PIN input |
| `/components/support/PortalNav.tsx` | Sidebar navigation |
| `/components/support/ChatInterface.tsx` | Chat UI with messages |

### Pattern Reference Files

| File | Purpose |
|------|---------|
| `/components/ui/Button.tsx` | Button patterns |
| `/components/ui/Input.tsx` | Input patterns |
| `/lib/utils.ts` | cn() utility |
| `/app/faqs/page.tsx` | FAQ accordion pattern |
| `/app/contact/page.tsx` | Form pattern |

---

## 13. Build Status

✅ **Build passes** as of January 7, 2026

```bash
npm run build
# ✓ Compiled successfully
# ✓ TypeScript checks passed
# ✓ Static pages generated
```

**Routes generated:**
- ○ `/login` - Static login page
- ○ `/support` - Static dashboard
- ○ `/support/chat` - Static chat page
- ○ `/support/tickets` - Static tickets list
- ○ `/support/tickets/new` - Static new ticket form
- ƒ `/support/tickets/[caseId]` - Dynamic ticket detail
- ○ `/support/account` - Static account page
- ○ `/support/knowledge` - Static knowledge base
- ƒ `/api/auth/*` - Dynamic auth endpoints
- ƒ `/api/support/chat` - Dynamic chat endpoint
- ƒ `/api/support/tickets` - Dynamic tickets API (GET list, POST create)
- ƒ `/api/support/tickets/[caseId]` - Dynamic single ticket API
- ƒ `/api/support/account` - Dynamic account API

---

*Document created by Claude Code during Phase II planning session.*
*Last updated after Phases 1-3 completion.*
