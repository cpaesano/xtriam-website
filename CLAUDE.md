# Claude Code Context - xTriam Website

This file provides context for Claude Code sessions working on the xTriam website project.

## Project Overview

| Property | Value |
|----------|-------|
| Project Name | xtriam-website |
| Purpose | xTriam company website + customer portal |
| Framework | Next.js 16.x (App Router) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Deployment Target | Vercel |
| Domain | xtriam.com (currently on Webflow) |

## What This Project Is

This is a **website + portal application** for xTriam, the company behind bpmPro (a Salesforce managed package for window contractors). It includes:

1. **Marketing Site**: Public-facing pages migrated from Webflow
2. **Customer Portal**: Authenticated area for bpmPro subscribers
3. **AI Support**: Claude-powered first-layer customer support
4. **Salesforce Integration**: Connect to xtriam production org

## Workspace Structure

This project is part of the **xtriam workspace**:

```
/Users/cpaesano/Projects/xtriam/
├── docs/                    # SHARED documentation (read these!)
├── xtriam-website/          # This project
└── xtriam-salesforce/       # Salesforce org project
```

## Shared Documentation (IMPORTANT)

**Read these for Salesforce integration work:**

| Document | Path | Purpose |
|----------|------|---------|
| Shared Context | `../docs/SHARED_CONTEXT.md` | Business context and overview |
| Integration Guide | `../docs/INTEGRATION_GUIDE.md` | API contracts and OAuth setup |
| Data Model | `../docs/DATA_MODEL.md` | SF objects and fields this site uses |
| Authentication | `../docs/AUTHENTICATION.md` | OAuth flows and token handling |

## Related Projects

| Project | Location | Relationship |
|---------|----------|--------------|
| xtriam-salesforce | `../xtriam-salesforce/` | Salesforce org this website integrates with |
| bpmProPackage-3-1 | `/Users/cpaesano/bpmProPackage-3-1/` | The managed package this website promotes |

## Critical Documentation

**Read this first:**
```
docs/XTRIAM_WEBSITE_DISCOVERY_2025-01-01.md
```

This contains:
- Complete URL inventory (36+ pages to preserve for SEO)
- Content inventory from current Webflow site
- Architecture decisions
- Migration checklist
- Implementation roadmap

## URL Structure (SEO Critical)

These URLs MUST be preserved exactly to maintain Google rankings:

### Main Pages
- `/` - Homepage
- `/bpmpro` - Product overview
- `/bpmpro-features` - Features list
- `/savings` - Cash flow calculator
- `/customer-success-stories` - Testimonials
- `/book-a-demo` - Demo scheduling
- `/video-library` - Product videos
- `/about` - Company info
- `/contact` - Contact form
- `/blog` - Blog listing
- `/faqs` - FAQ accordion
- `/this-week-in-windows` - Industry news
- `/privacy-policy` - Legal
- `/terms-and-conditions` - Legal
- `/payment-processing-with-stripe-integration` - Stripe feature

### Landing Pages
- `/bpmpro-crm/business-process-automation-for-window-contractors`
- `/bpmpro-crm/eliminate-manual-processes`
- `/bpmpro-crm/quickly-import-your-es-windows-quotes`

### Blog Posts (under /post/)
See `docs/XTRIAM_WEBSITE_DISCOVERY_2025-01-01.md` for full list of 13+ posts.

### Portal Routes (NEW - not on Webflow)
- `/portal/dashboard` - Customer dashboard
- `/portal/support` - AI support chat
- `/portal/settings` - Account settings
- `/login` - Authentication
- `/signup` - Registration

## Project Structure

```
xtriam-website/
├── src/
│   └── app/           # Next.js App Router pages
├── docs/              # Project documentation
├── public/            # Static assets
├── CLAUDE.md          # This file
└── package.json
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## Environment Variables (Required)

Create `.env.local` with:

```env
# Authentication
SESSION_SECRET=          # Random string for session encryption

# Claude API (for AI support)
ANTHROPIC_API_KEY=

# Salesforce (for portal integration)
SF_LOGIN_URL=https://login.salesforce.com
SF_USERNAME=admin@xtriam.com
SF_PASSWORD=
SF_SECURITY_TOKEN=

# Twilio (for SMS verification)
TWILIO_ACCOUNT_SID=      # Starts with "AC"
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=     # Must include +1, e.g., +13055551234
```

### Vercel Environment Variables - Lessons Learned

When adding environment variables to Vercel, watch out for these common issues:

| Issue | Example | Fix |
|-------|---------|-----|
| Missing country code | `3055551234` | Must be `+13055551234` (include +1) |
| Trailing spaces | `https://login.salesforce.com ` | Remove any trailing/leading spaces |
| Missing https:// | `login.salesforce.com` | Must be `https://login.salesforce.com` |
| Extra quotes | `"sk-ant-..."` | Don't wrap values in quotes |

**After adding/updating environment variables in Vercel, you MUST redeploy for changes to take effect.**

## Implementation Phases

### Phase 1: Marketing Site (Current)
Replicate all Webflow pages with identical URLs and content.

### Phase 2: Interactive Features
Cash flow calculator, FAQ accordion, contact form.

### Phase 3: Authentication & Portal
NextAuth.js, protected routes, customer dashboard.

### Phase 4: AI Integration
Claude API chat, knowledge base, support escalation.

### Phase 5: Launch
DNS migration from Webflow to Vercel.

## Business Context

**xTriam** is a software company that built **bpmPro**, a Salesforce 2GP managed package for window/door contractors in Florida. The company has 12+ production client orgs.

**Current site**: https://www.xtriam.com (Webflow)
**Goal**: Migrate to Next.js for dynamic portal capabilities and AI support.

## Contact Information (to preserve on site)

- Phone: (305) 204-9694
- Email: sales@xtriam.com
- Address: 5966 S Dixie Hwy Ste 300, South Miami, FL 33143
- YouTube: youtube.com/@xtriam/videos
- Instagram: instagram.com/xtriam.windows.crm
- TikTok: @bpmpro
