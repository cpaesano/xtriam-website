# Customer Portal User Manual

**Version:** 1.0
**Last Updated:** January 7, 2026
**For:** xTriam Support Team & Administrators

---

## Table of Contents

1. [Overview](#1-overview)
2. [Prerequisites for Testing](#2-prerequisites-for-testing)
3. [Environment Setup](#3-environment-setup)
4. [Testing the Authentication Flow](#4-testing-the-authentication-flow)
5. [Support Portal Features](#5-support-portal-features)
6. [AI Chat Agent](#6-ai-chat-agent)
7. [Troubleshooting](#7-troubleshooting)
8. [Production Deployment Checklist](#8-production-deployment-checklist)

---

## 1. Overview

The Customer Portal is a protected area of the xTriam website where bpmPro subscribers can:

- **Chat with AI Support**: Get instant answers to common questions
- **Create Support Tickets**: Submit issues that sync to Salesforce Cases
- **View Ticket History**: Track status of open and closed tickets
- **Access Knowledge Base**: Find FAQs, videos, and documentation
- **View Account Info**: See their contact and company details

### How It Works

```
User visits /login
       ↓
Enters phone number
       ↓
System verifies phone exists in Salesforce Contacts
       ↓
Twilio sends 6-digit PIN via SMS
       ↓
User enters PIN
       ↓
System creates JWT session cookie (7 days)
       ↓
User redirected to /support dashboard
```

---

## 2. Prerequisites for Testing

### 2.1 Required Accounts & Credentials

| Service | What You Need | Where to Get It |
|---------|---------------|-----------------|
| **Salesforce** | Admin credentials to xtriam production org | Your existing SF login |
| **Twilio** | Account SID, Auth Token, Phone Number | https://console.twilio.com |
| **Anthropic** | API Key for Claude | https://console.anthropic.com |

### 2.2 Test Data in Salesforce

You need at least one Contact in Salesforce with:
- A valid mobile phone number (where you can receive SMS)
- An associated Account
- Optionally, some Cases linked to this Contact

**Example Test Contact:**
```
Name: Test User
Phone: (305) 555-1234  ← Use your real phone for testing
Account: Test Company
Email: test@example.com
```

### 2.3 Twilio Setup

1. Sign up at https://www.twilio.com
2. Get a phone number capable of sending SMS
3. Note your Account SID and Auth Token from the Console
4. For testing, your phone must be verified in Twilio trial accounts

---

## 3. Environment Setup

### 3.1 Environment Variables

Create or update `.env.local` in the project root:

```env
# ===========================================
# SALESFORCE CONNECTION (jsforce)
# ===========================================
SF_LOGIN_URL=https://login.salesforce.com
SF_USERNAME=admin@xtriam.com
SF_PASSWORD=your-salesforce-password
SF_SECURITY_TOKEN=your-security-token

# To get security token:
# 1. Login to Salesforce
# 2. Click your avatar → Settings
# 3. Search "Reset Security Token"
# 4. Click "Reset Security Token" - it will be emailed to you

# ===========================================
# TWILIO SMS
# ===========================================
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+13055551234

# ===========================================
# SESSION MANAGEMENT
# ===========================================
SESSION_SECRET=generate-a-32-character-random-string-here

# To generate a secure secret:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# ===========================================
# CLAUDE AI
# ===========================================
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx
```

### 3.2 Start Development Server

```bash
cd /Users/cpaesano/Projects/xtriam/xtriam-website
npm run dev
```

The site will be available at http://localhost:3001

---

## 4. Testing the Authentication Flow

### 4.1 Test Login Process

1. **Navigate to Login**
   - Go to http://localhost:3001/login
   - Or click "Customer Portal" in the header

2. **Enter Phone Number**
   - Enter a phone number that exists in Salesforce Contacts
   - Use format: (305) 555-1234 or 3055551234
   - Click "Send Verification Code"

3. **Check for Errors**
   - If phone not found: "No account found with this phone number"
   - If Twilio fails: Check console for detailed errors

4. **Enter PIN**
   - Check your phone for SMS from Twilio
   - Enter the 6-digit PIN
   - PIN expires after 5 minutes

5. **Success**
   - You'll be redirected to /support dashboard
   - Session cookie is set for 7 days

### 4.2 Testing Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Invalid phone format | Form validation error |
| Phone not in Salesforce | "No account found with this phone number" |
| Wrong PIN entered | "Invalid or expired PIN" |
| Expired PIN (>5 min) | "Invalid or expired PIN" |
| Already logged in, visit /login | Redirect to /support |
| Visit /support without login | Redirect to /login |

### 4.3 Testing Logout

1. Click your name in the portal sidebar
2. Click "Sign Out"
3. Session is destroyed, redirected to /login

---

## 5. Support Portal Features

### 5.1 Dashboard (/support)

The main dashboard shows:
- Welcome message with user's first name
- Quick action cards (Chat, Create Ticket, View Tickets, Knowledge Base)
- Contact information banner

### 5.2 AI Chat (/support/chat)

- Real-time chat with Claude AI
- Typing indicator during responses
- Chat history maintained during session
- Powered by Claude Sonnet

**Test prompts:**
- "What is bpmPro?"
- "How do I create a quote?"
- "What are the support hours?"
- "How does the Projects Board work?"

### 5.3 Support Tickets (/support/tickets)

**List View:**
- Shows all Cases from Salesforce for this Contact
- Displays: Case Number, Subject, Status, Priority, Created Date
- Click any ticket to view details

**Create New Ticket (/support/tickets/new):**
- Enter Subject (required)
- Select Priority (Low/Medium/High)
- Enter Description (required)
- Creates a Case in Salesforce

**Ticket Detail (/support/tickets/[caseId]):**
- Shows full ticket information
- Status and priority badges
- Created/Updated/Closed dates
- Contact info for follow-up

### 5.4 Account Info (/support/account)

Displays:
- Contact: Name, Email, Phone (from session)
- Company: Name, Phone, Website, Address (from Salesforce Account)

### 5.5 Knowledge Base (/support/knowledge)

Links to:
- FAQs page
- Video Library
- Features Guide
- Popular topic shortcuts

---

## 6. AI Chat Agent

### 6.1 Current Knowledge Base

The AI agent currently knows:
- General bpmPro feature descriptions
- Support contact information
- Basic troubleshooting guidance

### 6.2 Expanding the Knowledge Base

**Option A: Expand System Prompt (Current Approach)**

Edit `/lib/claude.ts` and add more detailed information to `SYSTEM_PROMPT`:

```typescript
const SYSTEM_PROMPT = `You are a helpful customer support assistant for bpmPro...

## Detailed Feature Guides

### Creating a Quote
1. Navigate to the Quotes tab
2. Click "New Quote"
3. Select the Account/Opportunity
4. Add line items from the Product Catalog
5. Apply any discounts
6. Click "Generate PDF"

### Projects Board
- Drag-and-drop Kanban interface
- Columns: Lead, Sold, Ordered, Scheduled, Installed, Completed
- Each card shows: Customer name, Address, Status, Next action
...
`;
```

**Option B: RAG (Retrieval Augmented Generation) - Recommended for Scale**

For comprehensive product knowledge:

1. Create a knowledge base document with all bpmPro documentation
2. Use embeddings to search relevant sections
3. Pass relevant context to Claude with each query

This requires:
- Vector database (Pinecone, Supabase pgvector, etc.)
- Document chunking and embedding
- Query-time retrieval

**Option C: Provide Documentation Context (Quick Win)**

Create a detailed markdown file with all bpmPro knowledge and include key sections in the system prompt based on common questions.

### 6.3 Recommended Knowledge to Add

| Category | Information to Include |
|----------|----------------------|
| **Quote Creation** | Step-by-step guide, common fields, PDF generation |
| **Projects Board** | Column meanings, how to move cards, status updates |
| **Payments** | Stripe setup, payment links, tracking payments |
| **Reports** | Available reports, how to run them, exporting |
| **Commissions** | How they're calculated, payout process |
| **Common Errors** | Login issues, sync problems, permission errors |
| **Mobile App** | Salesforce mobile setup, offline mode |
| **Integrations** | ES Windows import, email sync, calendar |

---

## 7. Troubleshooting

### 7.1 Login Issues

**"No account found with this phone number"**
- Verify phone exists in Salesforce Contacts
- Check all phone fields: Phone, MobilePhone, HomePhone, OtherPhone
- Ensure phone format matches (system normalizes to (XXX) XXX-XXXX)

**SMS not received**
- Check Twilio console for delivery status
- Verify phone number is valid
- For trial accounts, recipient must be verified
- Check spam/blocked messages

**"Invalid or expired PIN"**
- PIN expires after 5 minutes
- Request a new PIN
- Ensure no typos (check carefully)

### 7.2 Salesforce Connection Issues

**Check console for jsforce errors:**

```bash
# View dev server output for errors
npm run dev
```

Common issues:
- Invalid credentials: Check SF_USERNAME, SF_PASSWORD, SF_SECURITY_TOKEN
- IP restrictions: Add your IP to Salesforce trusted IPs
- Password expired: Login to Salesforce and update password

### 7.3 AI Chat Issues

**No response from AI:**
- Check ANTHROPIC_API_KEY is set
- Check console for API errors
- Verify API key has credits

**Inaccurate responses:**
- AI only knows what's in the system prompt
- Expand knowledge base (see Section 6)

### 7.4 Session Issues

**Randomly logged out:**
- Session expires after 7 days
- If server restarts, sessions may be invalidated
- Check SESSION_SECRET is consistent

---

## 8. Production Deployment Checklist

### 8.1 Environment Variables (Vercel)

Add all env vars to Vercel project settings:
- Settings → Environment Variables
- Add each variable from `.env.local`
- Ensure they're set for Production environment

### 8.2 Twilio Production

- [ ] Upgrade from trial account if needed
- [ ] Verify phone number for production use
- [ ] Consider dedicated short code for high volume

### 8.3 Security Hardening

- [ ] Enable rate limiting (3 PIN attempts per phone per 15 min)
- [ ] Consider Redis for PIN storage instead of in-memory
- [ ] Review session duration (currently 7 days)
- [ ] Add audit logging for login attempts

### 8.4 Salesforce Considerations

- [ ] Create dedicated API user for portal
- [ ] Configure IP restrictions if needed
- [ ] Set up Connected App for OAuth (optional, more secure)

### 8.5 Testing

- [ ] Test login with multiple phone formats
- [ ] Test ticket creation/viewing
- [ ] Test AI chat with various questions
- [ ] Test logout and session expiry
- [ ] Mobile responsiveness testing
- [ ] Cross-browser testing

---

## Appendix A: File Reference

| File | Purpose |
|------|---------|
| `/lib/salesforce.ts` | Salesforce connection & queries |
| `/lib/twilio.ts` | PIN generation & SMS |
| `/lib/session.ts` | JWT session management |
| `/lib/claude.ts` | AI chat with system prompt |
| `/middleware.ts` | Route protection |
| `/app/login/page.tsx` | Login page |
| `/app/support/layout.tsx` | Portal layout |
| `/app/support/page.tsx` | Dashboard |

---

## Appendix B: Quick Reference

**URLs:**
- Login: `/login`
- Dashboard: `/support`
- AI Chat: `/support/chat`
- Tickets: `/support/tickets`
- New Ticket: `/support/tickets/new`
- Account: `/support/account`
- Knowledge Base: `/support/knowledge`

**Support Contact:**
- Phone: (305) 204-9694
- Email: sales@xtriam.com
- Hours: Mon-Fri, 8 AM - 6 PM EST

---

*Document created by Claude Code for xTriam Customer Portal v1.0*
