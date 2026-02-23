# SEO Monitoring Guide — xTriam Website

**Date:** February 22, 2026
**Context:** Post-migration recovery from Webflow to Next.js (migrated Dec 28, 2025)

---

## Table of Contents

1. [Tools Setup (Free)](#1-tools-setup-free)
2. [Paid Tool Recommendation](#2-paid-tool-recommendation)
3. [Weekly Monitoring Checklist](#3-weekly-monitoring-checklist)
4. [Monthly Deep Dive](#4-monthly-deep-dive)
5. [Target Keywords to Track](#5-target-keywords-to-track)
6. [Google Business Profile](#6-google-business-profile)
7. [Structured Data / Schema Markup](#7-structured-data--schema-markup)
8. [Recovery Timeline Expectations](#8-recovery-timeline-expectations)

---

## 1. Tools Setup (Free)

These are free and should be set up immediately.

### Google Search Console (Already Active)

GSC is the single most important tool. It shows exactly how Google sees the site.

**Key reports to use:**

| Report | What It Shows | Where to Find It |
|--------|--------------|------------------|
| **Performance > Search Results** | Clicks, impressions, CTR, and average position by query and page | Left sidebar > Performance |
| **Page Indexing** | Which pages are indexed, excluded, or errored | Left sidebar > Indexing > Pages |
| **Core Web Vitals** | LCP, INP, CLS — page speed metrics that affect rankings | Left sidebar > Experience |
| **Sitemaps** | Whether Google successfully fetched your sitemap | Left sidebar > Indexing > Sitemaps |
| **Links** | Who links to you (external) and your internal link structure | Left sidebar > Links |

**Immediate actions:**
- Submit `https://www.xtriam.com/sitemap.xml` (the fix we deployed today)
- Use the **URL Inspection tool** to request indexing of your top 5 pages: `/`, `/bpmpro`, `/bpmpro-features`, `/book-a-demo`, `/customer-success-stories`
- Use **Compare mode** in Performance to compare current 28 days vs. previous 28 days

### Google Keyword Planner (Free, No Ads Required)

For researching total search volume of keywords.

**Setup:**
1. Go to [ads.google.com](https://ads.google.com)
2. Create a Google Ads account — select **"Create an account without a campaign"** to skip billing
3. Navigate to **Tools > Keyword Planner**

**What you get without spending on ads:**
- Keyword ideas from seed terms (e.g., enter "CRM for window contractors")
- Search volume **ranges** (e.g., "100–1K" or "10–100" monthly searches) — not exact numbers
- Competition level (Low/Medium/High) — this is ad competition, not SEO difficulty, but still useful directionally
- Seasonal trend data

**Limitation:** Without active ad spend, volumes are broad ranges. For exact numbers, you need a paid SEO tool.

### Google Trends (Free)

For understanding relative search interest over time and seasonal patterns. Useful for comparing terms against each other (e.g., "window CRM" vs. "contractor CRM" vs. "remodeling software").

URL: [trends.google.com](https://trends.google.com)

### Ahrefs Webmaster Tools (Free)

A free tier from Ahrefs that works for sites you own and verify.

**What you get:**
- Backlink data for your site
- Site audit (crawl your site for technical SEO issues)
- Keyword data for terms you already rank for

**Does NOT include:** Competitor research, keyword volume for new terms, rank tracking.

**Setup:** Go to [ahrefs.com/webmaster-tools](https://ahrefs.com/webmaster-tools), verify site ownership via GSC integration.

### Screaming Frog SEO Spider (Free for up to 500 URLs)

A desktop app that crawls your site like Google does and reports issues.

**What it finds:**
- Broken links (404s)
- Missing or duplicate title tags
- Missing meta descriptions
- Missing canonical tags
- Redirect chains
- Image issues (missing alt text, oversized files)

**For xtriam.com:** The free 500-URL limit is more than enough for a ~37 page site.

**Download:** [screamingfrog.co.uk/seo-spider](https://www.screamingfrog.co.uk/seo-spider/)

---

## 2. Paid Tool Recommendation

For a small B2B SaaS company spending $50–150/month, here are the options:

### Comparison

| Tool | Plan | Price | Keywords Tracked | Site Audit | Keyword Research | Competitor Analysis |
|------|------|-------|-----------------|------------|-----------------|-------------------|
| **SE Ranking** | Essential | ~$52/mo (annual) | 500 daily | Yes | Yes (exact volumes) | Yes |
| **Mangools** | Entry | ~$30/mo (annual) | 200 daily | Basic | Yes (KWFinder) | Limited |
| **Ahrefs** | Starter | $29/mo | Credit-based | Yes | Yes | Limited by credits |
| **Semrush** | Pro | $140/mo | 500 daily | Yes | Yes | Yes (most comprehensive) |
| **Moz** | Starter | ~$49/mo | 50 | Yes | Yes | Basic |

### Recommendation: SE Ranking Essential (~$52/month annual)

**Why this one:**
- **500 keywords tracked daily** — more than enough, and you get exact position data (not just GSC averages)
- **Full keyword research** with exact monthly volumes and keyword difficulty scores
- **Automated site audits** — runs on a schedule, alerts you to new issues
- **Competitor analysis** — see what your competitors rank for
- **No credit system** — unlike Ahrefs Starter where you ration 100 credits/month
- **Additional users** at $20/month vs. $45–100 at Semrush/Ahrefs

**Budget alternative: Mangools at ~$30/month (annual)**

If spending less is preferred. KWFinder is excellent for keyword research, and SERPWatcher handles rank tracking for 200 keywords. Less comprehensive site audit, but covers the essentials.

---

## 3. Weekly Monitoring Checklist (~15 minutes)

Do this every Monday morning.

| # | Check | Tool | What to Look For |
|---|-------|------|-----------------|
| 1 | Total organic clicks (last 7 days) | GSC Performance | Week-over-week trend. Should be stable or growing. |
| 2 | Total impressions (last 7 days) | GSC Performance | A sudden drop = indexing problem. |
| 3 | Average position (last 7 days) | GSC Performance | Movement on key pages. Lower is better. |
| 4 | Indexed page count | GSC > Page Indexing | Should be ~37+. Any drop = something got deindexed. |
| 5 | Crawl errors | GSC > Page Indexing > Errors | Fix 404s and server errors immediately. |
| 6 | Core Web Vitals | GSC > Experience | All URLs should be "Good." |
| 7 | Top 10 keyword positions | SE Ranking / Mangools | Are your money keywords moving up or down? |

---

## 4. Monthly Deep Dive (~30 minutes)

| Check | What to Do |
|-------|-----------|
| **Query-level analysis** | In GSC, sort queries by impressions. Are you ranking for the right keywords? Any new keywords appearing? |
| **Page-level performance** | Which pages get the most/least traffic? Any pages losing traffic month-over-month? |
| **CTR analysis** | Pages with high impressions but low CTR need better title tags and meta descriptions. |
| **Backlink changes** | Any new links gained? Any important links lost? (GSC Links report or Ahrefs Webmaster Tools) |
| **Site audit** | Run a crawl in your paid tool or Screaming Frog. Fix broken links, missing titles, slow pages. |
| **Competitor check** | Are competitors ranking above you for target keywords? What content do they have that you don't? |

---

## 5. Target Keywords to Track

Based on the Search Console data from the last 3 months, these are the keywords to monitor. Set these up in your rank tracking tool.

### Tier 1 — Brand Keywords (protect these)

| Keyword | Current Position | Monthly Impressions (GSC) |
|---------|-----------------|--------------------------|
| xtriam | 2.1 | 97 |
| bpmpro | 2.9 | 64 |
| bpm pro | 5.0 | 23 |

### Tier 2 — Money Keywords (recover and grow these)

| Keyword | Current Position | Monthly Impressions (GSC) |
|---------|-----------------|--------------------------|
| window and door crm | 8.9 | 90 |
| windows and doors crm | 7.9 | 44 |
| crm for window companies | 8.5 | 35 |
| window business crm | 10.1 | 27 |
| crm for window company | 9.6 | 19 |
| window and door crm software | 8.4 | 17 |
| window company crm | 11.4 | 17 |
| best crm for window companies | 10.4 | 14 |
| doors company crm | 11.1 | 12 |
| window crm | 6.0 | 5 |

### Tier 3 — Opportunity Keywords (currently ranking poorly)

| Keyword | Current Position | Monthly Impressions (GSC) |
|---------|-----------------|--------------------------|
| door to door crm | 56.2 | 32 |
| window and door sales software | 44.5 | 31 |
| crm for blinds manufacturers | 73.5 | 30 |
| crm for door company | 14.3 | 10 |

### Tier 4 — Keywords to Research Volume For

Use Google Keyword Planner to check if these are worth targeting with content:
- "CRM for contractors"
- "Salesforce for contractors"
- "remodeling business software"
- "window contractor software"
- "home improvement CRM"
- "window dealer software"
- "proposal software for window companies"
- "window installation management software"

---

## 6. Google Business Profile

### Why It Matters (Even for B2B SaaS)

- When someone Googles "xTriam" or "bpmPro," a Google Business Profile shows a Knowledge Panel on the right with your address, phone, website, and reviews
- B2B buyers check Google reviews — even 5–10 reviews from bpmPro clients builds trust
- Having a verified South Miami, FL address establishes legitimacy for selling to Florida contractors
- It's free and takes 30 minutes to set up

### Setup Checklist

- [ ] Go to [business.google.com](https://business.google.com) and claim the listing
- [ ] Business name: **xTriam**
- [ ] Category: "Software company"
- [ ] Address: 5966 S Dixie Hwy Ste 300, South Miami, FL 33143
- [ ] Phone: (305) 204-9694
- [ ] Website: https://www.xtriam.com
- [ ] Description: Brief description of bpmPro and what xTriam does
- [ ] Photos: Office, team, product screenshots
- [ ] Hours: Business hours
- [ ] Ask 5–10 bpmPro clients for Google reviews

### Ongoing Effort

~10 minutes/month. Check for new reviews, respond to any, keep hours updated.

---

## 7. Structured Data / Schema Markup

Schema markup is structured data that tells Google what your content is about. It can trigger **rich results** (stars, FAQs, product info) directly in search results, taking up more space on the page.

### Priority Implementation Order

#### 1. Organization Schema (Sitewide — highest priority)

Add to root layout. Tells Google who xTriam is.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "xTriam",
  "url": "https://www.xtriam.com",
  "logo": "https://www.xtriam.com/logo.png",
  "description": "xTriam builds bpmPro, a Salesforce managed package for window and door contractors.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "5966 S Dixie Hwy Ste 300",
    "addressLocality": "South Miami",
    "addressRegion": "FL",
    "postalCode": "33143",
    "addressCountry": "US"
  },
  "telephone": "+1-305-204-9694",
  "email": "sales@xtriam.com",
  "sameAs": [
    "https://www.youtube.com/@xtriam/videos",
    "https://www.instagram.com/xtriam.windows.crm",
    "https://www.tiktok.com/@bpmpro"
  ]
}
```

#### 2. WebApplication Schema (on `/bpmpro` and `/bpmpro-features`)

Tells Google that bpmPro is a software product. Can trigger product rich results.

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "bpmPro",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "All",
  "url": "https://www.xtriam.com/bpmpro",
  "description": "CRM and business process management for window and door contractors, built on Salesforce."
}
```

#### 3. FAQPage Schema (on `/faqs`)

High impact — can generate expandable FAQ sections directly in Google results, taking up more real estate on the results page.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is bpmPro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "bpmPro is a Salesforce managed package..."
      }
    }
  ]
}
```

#### 4. BlogPosting Schema (on `/post/*` pages)

Helps Google understand blog content and can trigger rich results with dates and author info.

#### 5. BreadcrumbList Schema (all pages)

Helps Google display breadcrumb navigation in search results instead of the raw URL.

### How to Implement in Next.js

Add JSON-LD as a `<script>` tag in page components:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
/>
```

**Validate** all schema using [Google's Rich Results Test](https://search.google.com/test/rich-results) before deploying.

---

## 8. Recovery Timeline Expectations

| Timeframe | What to Expect |
|-----------|---------------|
| **Weeks 1–4** (now through mid-March) | Volatility. Rankings may fluctuate significantly as Google re-crawls with the new sitemap, canonical tags, and robots.txt. This is normal. |
| **Weeks 4–8** (mid-March through mid-April) | Stabilization. Most sites recover to pre-migration levels if technical setup is correct. Monitor for Tier 2 money keywords returning to page 1. |
| **Months 3–6** (April through August) | Full recovery and potential improvement. The Next.js site has better performance than Webflow, which should translate into ranking gains over time. |

### Key Milestones to Watch For

- [ ] Sitemap status in GSC changes from "Couldn't fetch" to "Success"
- [ ] Indexed page count reaches 37+ (matching our sitemap)
- [ ] "window and door crm" returns to position 5 or better
- [ ] Homepage average position drops below 10 (currently 12.3)
- [ ] Total weekly clicks exceed pre-migration baseline (~5–7 clicks/week)

---

## Action Plan Summary

| Priority | Action | Cost | Time | Status |
|----------|--------|------|------|--------|
| 1 | Fix robots.txt, sitemap.xml, canonical tags, OG metadata | Free | Done | **Completed Feb 22** |
| 2 | Submit sitemap in Google Search Console | Free | 5 min | Pending deploy |
| 3 | Request indexing of top 5 pages via URL Inspection | Free | 10 min | Pending deploy |
| 4 | Set up Google Keyword Planner (no-ads account) | Free | 30 min | To do |
| 5 | Claim and complete Google Business Profile | Free | 30 min | To do |
| 6 | Set up Ahrefs Webmaster Tools (free) | Free | 15 min | To do |
| 7 | Download and run Screaming Frog site audit | Free | 1 hour | To do |
| 8 | Sign up for SE Ranking Essential ($52/mo) or Mangools ($30/mo) | $30–52/mo | 1 hour | To do |
| 9 | Configure rank tracking for 20–30 target keywords | Included | 1 hour | To do |
| 10 | Implement Organization + FAQPage + WebApplication schema | Free | 2–3 hours | To do |
| 11 | Ask 5–10 bpmPro clients for Google reviews | Free | 30 min | To do |
| 12 | Implement BlogPosting + BreadcrumbList schema | Free | 1–2 hours | To do |
