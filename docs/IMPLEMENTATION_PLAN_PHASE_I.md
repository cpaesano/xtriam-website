# xTriam Website - Phase I Implementation Plan

**Created:** January 2, 2026
**Updated:** January 2, 2026
**Decision:** Marketing site with AI-powered support (no portal needed)
**Scope:** Phase I - Replace Webflow + Add Claude AI support

---

## Strategic Architecture Decision

### The Challenge
- One-person team handling all support
- Repetitive questions consume significant time ("How do I clone a document?", "How do I apply a specialty item?")
- Users spread across 12+ separate Salesforce subscriber orgs
- No centralized user database
- No Salesforce Experience Cloud licenses

### The Solution: AI-First Support Strategy

Instead of building a customer portal, we'll use **Claude AI as first-layer support**:

```
Customer Question (via chat widget)
              ↓
         Claude AI
              ↓
     ┌────────┴────────┐
     │                 │
  Answered        Complex/Unclear
     ↓                 ↓
   Done         Contact Form → SF Case → Email
```

| Component | Technology | Purpose |
|-----------|------------|---------|
| Marketing Website | Next.js | SEO, lead gen, product info |
| AI Support Chat | Claude API | Answer common questions 24/7 |
| Contact Form | SF Case API | Escalation path for complex issues |
| Knowledge Base | Markdown files | Train Claude + public help content |

### Why This Works

1. **No portal login needed** - Users get help instantly via chat
2. **No Experience Cloud licenses** - Uses existing SF Enterprise license
3. **Reduces support burden** - Claude handles repetitive questions
4. **Scales automatically** - AI available 24/7
5. **Learns over time** - Add FAQs as you encounter them

---

## Phase I Scope: Marketing Website

### What We ARE Building

| Feature | Description | Status |
|---------|-------------|--------|
| Homepage | Hero, pain points, features, testimonials, CTAs | Pending |
| Product pages | /bpmpro, /bpmpro-features, /savings | Pending |
| Content pages | /about, /contact, /faqs, /video-library | Pending |
| Blog | /blog, /post/[slug] with pagination | Pending |
| This Week in Windows | /this-week-in-windows with pagination | Pending |
| Landing pages | /bpmpro-crm/* (3 SEO landing pages) | Pending |
| Legal pages | /privacy-policy, /terms-and-conditions | Pending |
| Special pages | /customer-success-stories, /book-a-demo | Pending |
| Payment page | /payment-processing-with-stripe-integration | Pending |
| Cash Flow Calculator | Interactive ROI calculator | Pending |
| Contact Form | Creates SF Case via API, sends email | Pending |
| SEO | Sitemap, robots.txt, meta tags, structured data | Pending |
| Claude AI Chat | Pre-sales + first-layer support (public, no auth) | Pending |
| Knowledge Base | /help section with searchable guides | Pending |

### What We Are NOT Building (Phase I)

| Feature | Reason | Planned For |
|---------|--------|-------------|
| Customer Portal | AI chat + contact form is sufficient | Not needed |
| User Authentication | Not needed - AI serves everyone | Not needed |
| CMS Admin Interface | Edit MDX files directly in VS Code | Phase II |
| Self-hosted Video | YouTube embeds for now | Phase II |

---

## URL Inventory (35 URLs to Preserve)

### Main Navigation (15 pages)

| URL | Page | Priority |
|-----|------|----------|
| `/` | Homepage | Critical |
| `/bpmpro` | Product Overview | Critical |
| `/bpmpro-features` | Feature Details | Critical |
| `/savings` | Cash Flow Calculator | Critical |
| `/customer-success-stories` | Testimonials | High |
| `/book-a-demo` | Demo Booking (→ /contact) | High |
| `/video-library` | Video Hub | High |
| `/about` | Company Info | High |
| `/contact` | Contact Form | Critical |
| `/blog` | Blog Listing | High |
| `/faqs` | FAQ Accordion | High |
| `/this-week-in-windows` | Industry News | High |
| `/privacy-policy` | Legal | Medium |
| `/terms-and-conditions` | Legal | Medium |
| `/payment-processing-with-stripe-integration` | Stripe Feature | Medium |

### Landing Pages (3 pages)

| URL | Purpose |
|-----|---------|
| `/bpmpro-crm/business-process-automation-for-window-contractors` | SEO |
| `/bpmpro-crm/eliminate-manual-processes` | SEO |
| `/bpmpro-crm/quickly-import-your-es-windows-quotes` | ES Windows |

### Blog Posts (13+ posts)

All under `/post/[slug]` - see Discovery doc for full list.

### This Week in Windows (5+ editions)

All under `/this-week-in-windows/[slug]` - ongoing content.

---

## Technical Stack

```
xtriam-website/
├── Next.js 14+ (App Router)
├── TypeScript
├── Tailwind CSS
├── MDX (for blog content)
├── Claude API (pre-sales chat only)
├── Vercel (hosting)
└── GoDaddy (DNS)
```

### Key Dependencies

| Package | Purpose |
|---------|---------|
| next | Framework |
| tailwindcss | Styling |
| @anthropic-ai/sdk | AI chat for prospects |
| @mdx-js/react | Blog content |
| react-hook-form | Contact form |
| zod | Form validation |
| framer-motion | Animations (optional) |
| @headlessui/react | Accessible UI components |

---

## AI Knowledge Base Strategy

### Documentation Sources (Already Available)

We have extensive documentation in `/Users/cpaesano/bpmProPackage-3-1/docs/`:

| Folder | Content | Use For |
|--------|---------|---------|
| `guides/` | User guides (Projects Board, Stage Assignment, etc.) | How-to answers |
| `user-guide/` | Understanding Project Stages, etc. | Conceptual answers |
| `features/` | Feature documentation (15+ files) | Feature explanations |
| `bugs/` | Bug investigations and fixes | Troubleshooting |
| `clients/*/training/` | Training session minutes | Common questions |
| `clients/*/investigations/` | Issue resolutions | Problem solving |

### Key Documents for AI Training

| Document | Topic |
|----------|-------|
| `Projects_Board_User_Guide.md` | Projects Board usage |
| `Projects_Board_Usage_Guide.md` | Daily operations |
| `Projects_Board_V2_Rules_Guide.md` | Business rules |
| `Change_Salesperson_on_Sales_Document_Guide.md` | Common task |
| `UNDERSTANDING-PROJECT-STAGES.md` | Stage workflow |
| `Close_Deal_Wizard_Technical_Documentation.md` | Closing deals |
| `Commission_Payout_Manager_Technical_Documentation.md` | Commissions |

### Knowledge Base Structure (In This Project)

```
xtriam-website/
└── knowledge/
    ├── user-guides/           # How-to content (copied from bpmProPackage)
    │   ├── projects-board.md
    │   ├── sales-documents.md
    │   └── stages-workflow.md
    ├── features/              # Feature explanations
    │   ├── email-wizard.md
    │   ├── stripe-integration.md
    │   └── commission-payout.md
    ├── troubleshooting/       # Common issues & fixes
    │   └── common-errors.md
    └── faqs/                  # Q&A format (grows over time)
        ├── sales-documents.md
        ├── projects-board.md
        └── general.md
```

### FAQ Tracking Process

When you answer a support email, add it to the appropriate FAQ file:

```markdown
<!-- knowledge/faqs/sales-documents.md -->

## How do I clone a Sales Document?
1. Open the Sales Document
2. Click the "Clone" button in the toolbar
3. Select which items to include
4. Click "Create Clone"

## How do I apply a specialty item?
1. Navigate to Line Items
2. Click "Add Specialty Item"
3. Select the item from the list
4. Configure options and save
```

This becomes both:
1. **Claude's knowledge** - AI reads these files to answer questions
2. **Public help content** - Displayed on /help page for self-service

---

## Implementation Sprints

### Sprint 1: Foundation & Core Pages

**Goal:** Project setup and main marketing pages

- [ ] Configure project structure (app router)
- [ ] Set up Tailwind CSS with brand colors
- [ ] Create base layout (Header, Footer)
- [ ] Build Homepage with all sections
- [ ] Build /bpmpro product page
- [ ] Build /bpmpro-features page
- [ ] Build /about page
- [ ] Build /contact page with form

### Sprint 2: Content & Interactive Features

**Goal:** Blog, news, and interactive components

- [ ] Set up MDX for blog content
- [ ] Build /blog listing with pagination
- [ ] Build /post/[slug] dynamic pages
- [ ] Migrate all 13+ blog posts to MDX
- [ ] Build /this-week-in-windows listing
- [ ] Migrate news editions to MDX
- [ ] Build Cash Flow Calculator component
- [ ] Build FAQ accordion component

### Sprint 3: Remaining Pages & SEO

**Goal:** Complete all pages and SEO optimization

- [ ] Build /savings page (calculator integration)
- [ ] Build /faqs page
- [ ] Build /video-library page
- [ ] Build /customer-success-stories page
- [ ] Build /book-a-demo page (redirect to contact)
- [ ] Build 3 landing pages under /bpmpro-crm/
- [ ] Build legal pages (privacy, terms)
- [ ] Build /payment-processing-with-stripe-integration
- [ ] Implement sitemap.xml generation
- [ ] Implement robots.txt
- [ ] Add meta tags and Open Graph

### Sprint 4: AI Support Chat & Polish

**Goal:** Claude AI for pre-sales + first-layer support

- [ ] Set up knowledge/ folder structure
- [ ] Copy and adapt key guides from bpmProPackage docs
- [ ] Create initial FAQ files from common support questions
- [ ] Integrate Claude API with knowledge base context
- [ ] Build floating chat widget component
- [ ] Implement chat → contact form escalation flow
- [ ] Connect contact form to Salesforce Case API
- [ ] Build /help page (public knowledge base view)
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Cross-browser testing

### Sprint 5: Launch

**Goal:** DNS migration and go-live

- [ ] Configure Vercel custom domain
- [ ] Update GoDaddy DNS records
- [ ] Verify SSL certificate
- [ ] Test www redirect
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor for issues
- [ ] Keep Webflow backup (90 days)

---

## Content Migration Checklist

### From Webflow (Before Development)

- [ ] Screenshot all pages
- [ ] Export all text content
- [ ] Download all images (original resolution)
- [ ] Note all animations/interactions
- [ ] Document color palette
- [ ] Document typography (fonts)
- [ ] Export current sitemap.xml
- [ ] Save current robots.txt

### To New Site

- [ ] Convert blog posts to MDX
- [ ] Convert news editions to MDX
- [ ] Organize images in /public/images/
- [ ] Preserve all meta titles
- [ ] Preserve all meta descriptions
- [ ] Maintain H1 structure
- [ ] Maintain image alt tags

---

## Environment Variables (Phase I)

```env
# Claude API (for AI support chat)
ANTHROPIC_API_KEY=

# Salesforce (for creating Cases from contact form)
SF_LOGIN_URL=https://login.salesforce.com
SF_CLIENT_ID=
SF_CLIENT_SECRET=
SF_USERNAME=admin@xtriam.com
SF_PASSWORD=
SF_SECURITY_TOKEN=

# Email (backup/notification for contact form)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

# Site URL
NEXT_PUBLIC_SITE_URL=https://xtriam.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
```

Note: Salesforce credentials are used to create Cases when users submit the contact form (escalation from AI chat).

---

## File Structure (Phase I)

```
xtriam-website/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── bpmpro/
│   │   └── page.tsx
│   ├── bpmpro-features/
│   │   └── page.tsx
│   ├── savings/
│   │   └── page.tsx
│   ├── customer-success-stories/
│   │   └── page.tsx
│   ├── book-a-demo/
│   │   └── page.tsx
│   ├── video-library/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── blog/
│   │   └── page.tsx
│   ├── post/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── faqs/
│   │   └── page.tsx
│   ├── this-week-in-windows/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── privacy-policy/
│   │   └── page.tsx
│   ├── terms-and-conditions/
│   │   └── page.tsx
│   ├── payment-processing-with-stripe-integration/
│   │   └── page.tsx
│   ├── bpmpro-crm/
│   │   ├── business-process-automation-for-window-contractors/
│   │   │   └── page.tsx
│   │   ├── eliminate-manual-processes/
│   │   │   └── page.tsx
│   │   └── quickly-import-your-es-windows-quotes/
│   │       └── page.tsx
│   ├── help/
│   │   └── page.tsx                # Public knowledge base / help center
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts            # Claude API (with knowledge context)
│   │   └── contact/
│   │       └── route.ts            # Creates SF Case + sends email
│   ├── sitemap.ts                  # Dynamic sitemap
│   └── robots.ts                   # Dynamic robots.txt
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── marketing/
│   │   ├── Hero.tsx
│   │   ├── PainPoints.tsx
│   │   ├── Features.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CashFlowCalculator.tsx
│   │   └── FAQAccordion.tsx
│   ├── chat/
│   │   └── ChatWidget.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── content/
│   ├── blog/                       # MDX blog posts
│   └── this-week-in-windows/       # MDX news editions
├── knowledge/                      # AI knowledge base + public help content
│   ├── user-guides/                # How-to guides
│   ├── features/                   # Feature explanations
│   ├── troubleshooting/            # Common issues
│   └── faqs/                       # Q&A format (grows over time)
├── lib/
│   ├── claude.ts                   # Claude API client
│   ├── salesforce.ts               # Salesforce Case API client
│   └── mdx.ts                      # MDX utilities
├── public/
│   ├── images/
│   └── favicon.ico
├── docs/
│   ├── XTRIAM_WEBSITE_DISCOVERY_2025-01-01.md
│   ├── IMPLEMENTATION_PLAN_PHASE_I.md (this file)
│   └── PHASE_II_ROADMAP.md (to be created)
└── package.json
```

---

## Success Criteria (Phase I)

### Marketing Site
1. All 35+ URLs work identically to Webflow site
2. SEO rankings maintained (monitor for 30 days)
3. Cash Flow Calculator works correctly
4. All images and content migrated
5. Page load time < 3 seconds
6. Mobile responsive on all pages

### AI Support System
7. Claude chat answers common pre-sales questions
8. Claude chat answers common support questions (how-to, troubleshooting)
9. Chat gracefully escalates to contact form when unsure
10. Contact form creates Salesforce Case successfully
11. /help page displays knowledge base content

---

## Next Steps

1. ~~Review and approve this plan~~ ✓
2. **Begin Sprint 1: Foundation & Core Pages** ← Current
3. ~~Create PHASE_II_ROADMAP.md for future features~~ ✓

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-01-02 | Marketing site + AI support (no portal) | No Experience Cloud licenses, AI handles common questions |
| 2026-01-02 | Contact form creates SF Cases | Leverage existing Enterprise license |
| 2026-01-02 | Knowledge base in markdown files | Easy to update, trains Claude, powers /help page |
| 2026-01-02 | Defer CMS admin to Phase II | Editing MDX directly is acceptable for now |
| 2026-01-02 | Keep YouTube embeds for Phase I | Self-hosted video is significant scope |

---

**Document Version:** 1.1
**Last Updated:** January 2, 2026
**Status:** Approved - Sprint 1 in progress
