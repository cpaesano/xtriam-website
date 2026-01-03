# xTriam Website Discovery & Migration Documentation

**Created:** January 1, 2026
**Purpose:** Complete discovery of xtriam.com for migration from Webflow to custom portal
**Status:** Discovery Complete - Ready for Implementation Planning

---

## Table of Contents

1. [Project Context](#1-project-context)
2. [Current Website Audit](#2-current-website-audit)
3. [Complete URL Inventory](#3-complete-url-inventory)
4. [Content Inventory](#4-content-inventory)
5. [Technical Requirements](#5-technical-requirements)
6. [Architecture Options](#6-architecture-options)
7. [Migration Checklist](#7-migration-checklist)
8. [Implementation Roadmap](#8-implementation-roadmap)

---

## 1. Project Context

### xTriam Business Overview

xTriam is a software company that built **bpmPro**, a Salesforce-native second-generation managed package (2GP) designed for window and door contractors in Florida. The company provides:

- **bpmPro Software**: CRM++ running on Salesforce platform
- **Customer Support**: For 12+ client production orgs
- **Industry Content**: Blog, video library, industry news ("This Week in Windows")

### Related Projects

| Project | Location | Technology | Purpose |
|---------|----------|------------|---------|
| bpmProPackage-3-1 | `/Users/cpaesano/bpmProPackage-3-1/` | Salesforce 2GP (Apex, LWC) | Managed package source code |
| astor-realty-portal | `/Users/cpaesano/Projects/astor-realty-portal/` | Astro | Real estate portal |
| volunteers-for-seniors | `/Users/cpaesano/Projects/volunteers-for-seniors/` | Vite + React 19 + Firebase | Volunteer management |
| **xtriam-website** | `/Users/cpaesano/Projects/xtriam-website/` | Next.js 16.x | Company website + customer portal |

### Why Migrate from Webflow?

The current Webflow site is a **static marketing site**. The new requirements include:

1. **Customer Portal**: Subscribers need authenticated access
2. **AI-Powered Support**: First-layer support via Claude API integration
3. **Dynamic Content**: Integration with Salesforce production org data
4. **Self-Service Q&A**: Reduce support burden with intelligent responses

---

## 2. Current Website Audit

### Domain & Hosting Configuration

| Property | Current Value | Notes |
|----------|---------------|-------|
| Domain | xtriam.com | |
| Registrar | GoDaddy | DNS managed here |
| Current Host | Webflow | To be replaced |
| SSL | Yes (HTTPS) | Must maintain |
| www handling | www.xtriam.com (primary) | Sitemap uses www version |

### Webflow Sitemap Behavior

- **Auto-generated**: Yes, on every publish
- **Location**: https://www.xtriam.com/sitemap.xml
- **robots.txt**: https://www.xtriam.com/robots.txt
- **Blocked URL**: `/post/5-principles-of-effective-web-design`

### Contact Information (to preserve)

| Type | Value |
|------|-------|
| Phone | (305) 204-9694 |
| SMS | 1-305-204-9694 |
| Email | sales@xtriam.com |
| Address | 5966 S Dixie Hwy Ste 300, South Miami, FL 33143 |
| Hours | 9AM - 6PM, Mon to Fri |

### Social Media (to link)

| Platform | URL |
|----------|-----|
| YouTube | youtube.com/@xtriam/videos |
| Instagram | instagram.com/xtriam.windows.crm |
| TikTok | @bpmpro |

---

## 3. Complete URL Inventory

### CRITICAL: These URLs Must Be Preserved Exactly for SEO

#### Main Navigation Pages (15 pages)

| URL Path | Page Title | H1 Heading | Purpose |
|----------|-----------|------------|---------|
| `/` | Specialized CRM++ for Window Contractors | (varies by section) | Homepage - hero, pain points, features, testimonials, CTA |
| `/bpmpro` | Meet bpmPro | TBD | Product overview page |
| `/bpmpro-features` | bpmPro Features | TBD | Detailed feature list |
| `/savings` | bpmPro Cash Flow Calculator | Calculate your Additional Cash Flow... | Interactive ROI calculator tool |
| `/customer-success-stories` | Success Stories | TBD | Client testimonials and case studies |
| `/book-a-demo` | Book A Demo | Experience the Power of xTriam's bpmPro | Demo scheduling (redirects to /contact) |
| `/video-library` | Video Library | TBD | Product demo videos hub |
| `/about` | About xTriam | TBD | Company information |
| `/contact` | Contact Us | Contact Us | Contact form and info |
| `/blog` | Blog | TBD | Blog listing (paginated, 2 posts/page) |
| `/faqs` | Frequently Asked Questions | Frequently Asked Questions | FAQ accordion (4 sections) |
| `/this-week-in-windows` | This Week in Windows | TBD | Industry news hub (paginated) |
| `/privacy-policy` | Privacy Policy | TBD | Legal |
| `/terms-and-conditions` | Terms and Conditions | TBD | Legal |
| `/payment-processing-with-stripe-integration` | Payment Processing with Stripe | Accelerate Your Collections... | Stripe feature page |

#### Landing Pages (3 pages under /bpmpro-crm/)

| URL Path | H1 Heading | Purpose |
|----------|------------|---------|
| `/bpmpro-crm/business-process-automation-for-window-contractors` | Business Process Automation for Window Contractors | SEO landing page |
| `/bpmpro-crm/eliminate-manual-processes` | Eliminate Manual Processes | SEO landing page |
| `/bpmpro-crm/quickly-import-your-es-windows-quotes` | Quickly Import Your ES Windows Quotes | ES Windows integration landing |

#### Blog Posts (13+ posts under /post/)

| URL Path | Title | Date |
|----------|-------|------|
| `/post/why-building-on-platforms-like-salesforce-is-a-game-changer-for-small-businesses` | Why Building on Platforms Like Salesforce is a Game-Changer for Small Businesses | June 5, 2024 |
| `/post/leveraging-ai-for-small-business-success-the-xtriam-story` | Leveraging AI for Small Business Success: The xTriam Story | January 8, 2024 |
| `/post/the-ideal-territory-manager-navigating-challenges-in-window-manufacturing` | The Ideal Territory Manager: Navigating Challenges in Window Manufacturing | October 6, 2023 |
| `/post/the-power-of-meetings-streamlining-operations-for-window-dealers` | The Power of Meetings: Streamlining Operations for Window Dealers | September 7, 2023 |
| `/post/crafting-the-perfect-first-impression-navigating-the-initial-sales-interaction` | Crafting the Perfect First Impression: Navigating the Initial Sales Interaction | ~2023 |
| `/post/job-supervision-the-not-so-secret-key` | Job Supervision: The Not So Secret Key | ~2023 |
| `/post/making-informed-decisions-with-bpmpro-real-time-warehouse-insights` | Making Informed Decisions with bpmPro: Real-Time Warehouse Insights | June 5, 2023 |
| `/post/streamlining-sales-processes-automation-for-window-dealers` | Streamlining Sales Processes: Automation for Window Dealers | April 3, 2023 |
| `/post/monitoring-key-performance-indicators-at-small-and-medium-sized-businesses` | Monitoring Key Performance Indicators at Small and Medium-sized Businesses | December 5, 2022 |
| `/post/some-insights-about-business-process-management-bpm` | Some Insights about Business Process Management (BPM) | November 8, 2022 |
| `/post/key-points-about-streamlining-business-operations-for-window-contractors` | Key Points about Streamlining Business Operations for Window Contractors | October 10, 2022 |
| `/post/price-increases-in-the-window-and-door-industry-in-florida` | Price Increases in the Window and Door Industry in Florida | July 4, 2022 |
| `/post/xtriam-has-launched-bpmpro` | xTriam has launched bpmPro | June 27, 2022 |

**Note:** `/post/5-principles-of-effective-web-design` is blocked in robots.txt - may be draft/unpublished

#### This Week in Windows (5+ editions under /this-week-in-windows/)

| URL Path | Date |
|----------|------|
| `/this-week-in-windows/june-13-2025-windows-news` | June 13, 2025 |
| `/this-week-in-windows/june-06-2025-windows-news` | June 6, 2025 |
| `/this-week-in-windows/may-30-2025-windows-news` | May 30, 2025 |
| `/this-week-in-windows/may-23-2025-windows-news` | May 23, 2025 |
| `/this-week-in-windows/may-16-2025-windows-news` | May 16, 2025 |

**Note:** More editions likely exist (pagination indicates additional pages)

---

## 4. Content Inventory

### Homepage Sections

1. **Hero Section** - Product intro with multi-device mockup
2. **Pain Points** - Six common operational challenges
3. **Product Overview** - bpmPro CRM capabilities
4. **Customer Journey** - Four-stage process framework
5. **Core Features** - Feature list with links
6. **Business Benefits** - Strategic value propositions
7. **Success Stories** - Client testimonials
8. **Cash Flow Calculator** - Free assessment tool CTA
9. **Demo Booking** - Call-to-action section

### FAQ Structure (4 categories)

1. **Software and Technical Setup** (5 questions)
   - Is bpmPro a CRM?
   - Do I need to install it on my PC?
   - Can I access bpmContractor on different devices?
   - How do I set up bpmPro for my company users?
   - Can I customize user permissions and roles within bpmPro?

2. **Importing and Managing Company Data** (3 questions)
   - How can I import existing company contacts into bpmPro?
   - What measures does bpmPro take to validate contact data during import?
   - Can I load custom pricing data into bpmContractor?

3. **Subscription Plans: Professional vs. Enterprise** (4 questions)
   - Is there a limitation on the number of users for each plan?
   - Can users switch between plans or upgrade their subscription as needs evolve?
   - What are the deliverables of bpmContractor software?
   - How can I customize Sales Documents using bpmContractor?
   - Can I personalize Email Templates in bpmContractor?

4. **Customer and Technical Support** (1 question)
   - What level of customer support is provided for each subscription plan?

### Interactive Components to Recreate

| Component | Location | Functionality |
|-----------|----------|---------------|
| Cash Flow Calculator | `/savings` | 2-step form: sales volume inputs → staff details → monthly savings projection |
| FAQ Accordion | `/faqs` | Expandable sections with keyboard_arrow_down icons |
| Blog Pagination | `/blog` | 2 posts per page, PREV/NEXT navigation |
| This Week in Windows Pagination | `/this-week-in-windows` | Edition listing with PREV/NEXT |
| Contact Form | `/contact` | Name, email, message fields |
| Demo Booking | `/book-a-demo` | Redirects to contact, mentions Google Meet |

---

## 5. Technical Requirements

### New Requirements (Beyond Current Webflow Site)

| Requirement | Description | Priority |
|-------------|-------------|----------|
| **Customer Portal** | Authenticated access for bpmPro subscribers | HIGH |
| **AI Support Chat** | Claude API integration for first-layer support | HIGH |
| **Salesforce Integration** | Connect to xtriam production org for customer data | HIGH |
| **Q&A Knowledge Base** | Self-service answers powered by AI | MEDIUM |
| **User Authentication** | Login system for portal access | HIGH |
| **Usage Analytics** | Track portal usage, AI interactions | MEDIUM |

### Salesforce Production Org Context

- **Org Alias:** xtriam-production
- **Username:** admin@xtriam.com
- **Purpose:** Could serve as backend for portal functionality
- **Consideration:** Some features could be Experience Cloud, others custom

### AI Integration Requirements

| Feature | Implementation |
|---------|----------------|
| First-layer support | Claude API for answering common questions |
| Context awareness | Trained on bpmPro documentation, FAQs |
| Escalation path | Route complex issues to human support |
| Chat interface | Embedded in portal |
| Conversation history | Store for support quality analysis |

---

## 6. Architecture Options

### Option A: Next.js Full Stack (RECOMMENDED)

```
┌─────────────────────────────────────────────────────────────┐
│                     xtriam.com (Vercel)                      │
├─────────────────────────────────────────────────────────────┤
│  Next.js Application                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Marketing    │  │ Customer     │  │ AI Support   │       │
│  │ Pages        │  │ Portal       │  │ Chat         │       │
│  │ (SSG)        │  │ (Protected)  │  │ (API Routes) │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│         │                 │                 │                │
│         └─────────────────┼─────────────────┘                │
│                           │                                  │
│  ┌────────────────────────┴────────────────────────┐        │
│  │              API Routes (/api/*)                 │        │
│  │  • /api/auth/* (NextAuth.js)                    │        │
│  │  • /api/chat (Claude API)                       │        │
│  │  • /api/salesforce/* (SF API calls)             │        │
│  └──────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ Claude API       │ │ Salesforce       │ │ Database         │
│ (Anthropic)      │ │ Production Org   │ │ (Vercel Postgres │
│                  │ │ (xtriam-prod)    │ │  or Supabase)    │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

**Pros:**
- Single codebase for marketing + portal
- API routes handle AI and Salesforce integration
- Static generation for marketing pages (SEO optimized)
- Server-side rendering for dynamic portal content
- Easy deployment to Vercel

**Cons:**
- More complex than static-only site
- Requires database for user sessions/chat history

---

### Option B: Astro Marketing + Separate Portal

```
┌─────────────────────────────┐  ┌─────────────────────────────┐
│   xtriam.com (Vercel)       │  │  portal.xtriam.com (Vercel) │
│   Astro Static Site         │  │  Next.js Application        │
│   • Marketing pages         │  │  • Customer dashboard       │
│   • Blog                    │  │  • AI support chat          │
│   • SEO optimized           │  │  • Salesforce integration   │
└─────────────────────────────┘  └─────────────────────────────┘
```

**Pros:**
- Separation of concerns
- Marketing site stays super fast
- Portal can be more complex

**Cons:**
- Two codebases to maintain
- Two deployments
- Subdomain may dilute SEO slightly

---

### Option C: Salesforce Experience Cloud + Custom Frontend

```
┌─────────────────────────────┐
│   xtriam.com (Vercel)       │
│   Next.js/Astro             │
│   • Marketing pages only    │
└─────────────────────────────┘
              │
              │ Link to
              ▼
┌─────────────────────────────┐
│  Salesforce Experience Cloud│
│  (experience.xtriam.com)    │
│  • Customer portal          │
│  • Case management          │
│  • Knowledge articles       │
└─────────────────────────────┘
```

**Pros:**
- Native Salesforce integration
- Built-in case management
- Less custom code for portal

**Cons:**
- Limited AI integration options
- Less flexible UI/UX
- Additional Salesforce licensing costs
- Harder to customize

---

### Recommendation: Option A (Next.js Full Stack)

**Reasoning:**
1. Single codebase = easier maintenance
2. Full control over AI integration
3. Can still use Salesforce APIs without Experience Cloud costs
4. SEO preserved with static generation for marketing pages
5. Portal functionality with server-side rendering
6. You have experience with JavaScript/React from LWC development

---

## 7. Migration Checklist

### Phase 1: Pre-Migration (Before Any Code)

#### Content Export
- [ ] Screenshot every page for visual reference
- [ ] Export all text content from Webflow
- [ ] Download all images at original resolution
- [ ] Document all Webflow interactions/animations
- [ ] Export any embedded code snippets

#### SEO Baseline
- [ ] Record current Google Search Console performance
- [ ] Document rankings for key terms
- [ ] Export current sitemap.xml
- [ ] Save current robots.txt
- [ ] Note all indexed pages in Google

#### Technical Documentation
- [ ] Document form configurations
- [ ] Note any third-party integrations
- [ ] Record analytics/tracking codes
- [ ] Document custom fonts used
- [ ] Save color palette and brand guidelines

### Phase 2: Development

#### URL Structure (CRITICAL)
- [ ] Implement exact URL paths for all 15 main pages
- [ ] Implement exact URL paths for 3 landing pages
- [ ] Implement exact URL paths for 13+ blog posts
- [ ] Implement exact URL paths for This Week in Windows editions
- [ ] Implement `/sitemap.xml` generation
- [ ] Implement `/robots.txt` with same rules

#### SEO Elements
- [ ] Migrate all page titles exactly
- [ ] Migrate all meta descriptions
- [ ] Preserve H1 structure
- [ ] Maintain image alt tags
- [ ] Implement Open Graph tags
- [ ] Add structured data (JSON-LD)

#### Functionality
- [ ] Recreate Cash Flow Calculator
- [ ] Recreate FAQ accordion
- [ ] Implement blog pagination
- [ ] Implement This Week in Windows pagination
- [ ] Create contact form
- [ ] Integrate email sending

#### New Features
- [ ] Implement user authentication
- [ ] Build customer portal dashboard
- [ ] Integrate Claude API for chat
- [ ] Connect to Salesforce production org
- [ ] Build AI knowledge base

### Phase 3: DNS Transition

- [ ] Configure Vercel for custom domain
- [ ] Update GoDaddy DNS (A record or CNAME)
- [ ] Verify SSL certificate
- [ ] Test www and non-www versions
- [ ] Configure redirects (www → non-www or vice versa)

### Phase 4: Post-Migration

- [ ] Submit new sitemap to Google Search Console
- [ ] Verify all pages indexed
- [ ] Test all forms
- [ ] Test AI chat functionality
- [ ] Test portal login/authentication
- [ ] Monitor rankings for 30 days
- [ ] Keep Webflow backup for 90 days

---

## 8. Implementation Roadmap

### Sprint 1: Project Setup & Marketing Pages

**Goal:** Replicate current marketing site with identical URLs

1. Create Next.js project with App Router
2. Set up Tailwind CSS
3. Implement base layout (header, footer)
4. Build homepage
5. Build main navigation pages
6. Implement blog with static generation
7. Implement This Week in Windows section

### Sprint 2: Interactive Features & Forms

**Goal:** All current functionality working

1. Build Cash Flow Calculator (React component)
2. Implement FAQ accordion
3. Create contact form with email integration
4. Add pagination to blog and news sections
5. SEO optimization (meta tags, sitemap, robots.txt)

### Sprint 3: Authentication & Portal Foundation

**Goal:** User login and basic portal structure

1. Implement NextAuth.js for authentication
2. Create login/signup pages
3. Build protected portal routes
4. Create customer dashboard layout
5. Connect to Salesforce for customer data

### Sprint 4: AI Integration

**Goal:** Claude-powered support chat

1. Set up Claude API integration
2. Build chat interface component
3. Create knowledge base from FAQs and docs
4. Implement conversation history storage
5. Add escalation to human support flow

### Sprint 5: Polish & Launch

**Goal:** Production-ready deployment

1. Performance optimization
2. Accessibility audit
3. Cross-browser testing
4. DNS migration
5. Monitoring setup
6. Launch and verify SEO

---

## Appendix A: File Structure (Proposed)

```
xtriam-website/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (marketing)/              # Marketing pages group
│   │   │   ├── page.tsx              # Homepage /
│   │   │   ├── bpmpro/
│   │   │   ├── bpmpro-features/
│   │   │   ├── savings/
│   │   │   ├── customer-success-stories/
│   │   │   ├── book-a-demo/
│   │   │   ├── video-library/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── blog/
│   │   │   ├── faqs/
│   │   │   ├── this-week-in-windows/
│   │   │   ├── privacy-policy/
│   │   │   ├── terms-and-conditions/
│   │   │   ├── payment-processing-with-stripe-integration/
│   │   │   └── bpmpro-crm/
│   │   │       ├── business-process-automation-for-window-contractors/
│   │   │       ├── eliminate-manual-processes/
│   │   │       └── quickly-import-your-es-windows-quotes/
│   │   ├── (portal)/                 # Portal pages (protected)
│   │   │   ├── dashboard/
│   │   │   ├── support/
│   │   │   └── settings/
│   │   ├── post/                     # Blog posts
│   │   │   └── [slug]/
│   │   ├── api/                      # API routes
│   │   │   ├── auth/
│   │   │   ├── chat/
│   │   │   └── salesforce/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── marketing/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── CashFlowCalculator.tsx
│   │   │   └── FAQAccordion.tsx
│   │   ├── portal/
│   │   │   ├── PortalNav.tsx
│   │   │   └── ChatWidget.tsx
│   │   └── ui/                       # Shared UI components
│   ├── lib/
│   │   ├── claude.ts                 # Claude API client
│   │   ├── salesforce.ts             # Salesforce API client
│   │   └── auth.ts                   # Auth utilities
│   └── content/
│       ├── blog/                     # MDX blog posts
│       └── this-week-in-windows/     # MDX news editions
├── public/
│   ├── images/
│   ├── robots.txt
│   └── favicon.ico
├── next.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

---

## Appendix B: Environment Variables (Required)

```env
# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://xtriam.com

# Claude API
ANTHROPIC_API_KEY=

# Salesforce
SF_LOGIN_URL=https://login.salesforce.com
SF_CLIENT_ID=
SF_CLIENT_SECRET=
SF_USERNAME=admin@xtriam.com
SF_PASSWORD=
SF_SECURITY_TOKEN=

# Database (if using)
DATABASE_URL=

# Email (for contact form)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

---

## Appendix C: Key Dependencies

```json
{
  "dependencies": {
    "next": "^16.x",
    "react": "^19.x",
    "next-auth": "^4.x",
    "@anthropic-ai/sdk": "^0.x",
    "jsforce": "^2.x",
    "tailwindcss": "^3.x",
    "@headlessui/react": "^1.x",
    "framer-motion": "^10.x",
    "react-hook-form": "^7.x",
    "zod": "^3.x"
  }
}
```

---

**Document Version:** 1.1
**Last Updated:** January 1, 2026
**Author:** Claude Code Assistant
**Project Created:** `/Users/cpaesano/Projects/xtriam-website/`
**Status:** Project initialized with Next.js 16.1.1, Tailwind CSS, TypeScript
