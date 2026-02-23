# SEO Recovery — Post-Migration Fix

**Date:** February 22, 2026
**Status:** Deployed to production (pending Google re-indexing)

---

## Executive Summary

After migrating from Webflow to Next.js on **December 28, 2025**, the site lost Google rankings for key terms like "window contractors CRM." The root cause: Webflow automatically handled robots.txt, sitemap.xml, canonical URLs, and Open Graph tags — none of these were carried over to the Next.js site. Google crawled the site for **nearly two months** without these SEO fundamentals.

---

## Discovery

### How the Problem Was Identified

A drop in Google Search visibility prompted an investigation into what changed during the Webflow-to-Next.js migration. The key evidence came from **Google Search Console**:

| Field | Value |
|-------|-------|
| Sitemap URL | `https://www.xtriam.com/sitemap.xml` |
| Type | Sitemap |
| Submitted | Oct 16, 2025 |
| Last read | Dec 28, 2025 |
| Status | **Couldn't fetch** |
| Discovered pages | 36 |
| Discovered videos | 0 |

This confirms:
- The Webflow sitemap was previously submitted and working (36 pages discovered)
- Google attempted to fetch the sitemap on **December 28, 2025** — the day the DNS switched to the new Next.js site on Vercel
- The fetch failed because no sitemap existed on the new site
- Google has not been able to fetch a sitemap since

### Timeline

| Date | Event |
|------|-------|
| Oct 16, 2025 | Sitemap submitted to Google Search Console (Webflow version) |
| Dec 28, 2025 | Site goes live on Vercel (Next.js). Google tries to fetch sitemap — fails |
| Dec 28, 2025 – Feb 22, 2026 | ~56 days with no sitemap, no canonical tags, broken OG metadata |
| Feb 22, 2026 | SEO recovery fix deployed |

---

## Search Console Performance Data (Last 3 Months)

Data exported from Google Search Console on February 22, 2026, covering November 21, 2025 through February 20, 2026.

### Position Degradation Over Time

The most telling metric is **average search position** — lower is better. The migration happened on Dec 28.

| Period | Avg Position | Avg Daily Clicks | Avg Daily Impressions |
|--------|-------------|------------------|----------------------|
| **Pre-migration** (Nov 21 – Dec 27) | ~10.8 | 0.4 | 18.9 |
| **Week 1–2 post** (Dec 28 – Jan 14) | ~8.0 | 0.5 | 20.8 |
| **Week 3–5 post** (Jan 15 – Feb 5) | ~24.4 | 0.3 | 20.9 |
| **Week 6–8 post** (Feb 6 – Feb 20) | ~16.8 | 0.6 | 17.5 |

The first two weeks after migration looked stable — Google was still using cached data from the old Webflow site. The real damage appeared **around January 15**, when average position spiked from single digits to the 20s–60s. On Jan 17 it hit **55.9** and on Jan 18 it hit **63.1** — positions so low they're effectively invisible.

### Position Spike Detail (Jan 15–20)

| Date | Position | Clicks | Impressions |
|------|----------|--------|-------------|
| Jan 15 | 21.5 | 0 | 33 |
| Jan 16 | 24.9 | 0 | 27 |
| Jan 17 | **55.9** | 0 | 12 |
| Jan 18 | **63.1** | 0 | 20 |
| Jan 19 | 35.4 | 0 | 28 |
| Jan 20 | 32.5 | 3 | 35 |

This 2–3 week delay is typical. Google re-evaluates sites after a migration, and the absence of canonical tags, sitemap, and robots.txt caused a significant ranking penalty during that re-evaluation.

### Top Queries (Full Period)

| Query | Clicks | Impressions | CTR | Avg Position |
|-------|--------|-------------|-----|-------------|
| xtriam (brand) | 17 | 97 | 17.5% | 2.1 |
| bpmpro (brand) | 8 | 64 | 12.5% | 2.9 |
| windows and doors crm | 2 | 44 | 4.6% | 7.9 |
| window company crm | 2 | 17 | 11.8% | 11.4 |
| window and door crm | **0** | **90** | **0%** | **8.9** |
| crm for window companies | 0 | 35 | 0% | 8.5 |
| door to door crm | 0 | 32 | 0% | 56.2 |
| window and door sales software | 0 | 31 | 0% | 44.5 |
| crm for blinds manufacturers | 0 | 30 | 0% | 73.5 |
| window business crm | 0 | 27 | 0% | 10.1 |
| bpm pro | 0 | 23 | 0% | 5.0 |
| crm for window company | 0 | 19 | 0% | 9.6 |
| window and door crm software | 0 | 17 | 0% | 8.4 |
| best crm for window companies | 0 | 14 | 0% | 10.4 |

**Key finding:** Brand queries ("xtriam", "bpmpro") held strong at positions 2–3. But the high-value non-brand queries like "window and door crm" (90 impressions, 0 clicks, position 8.9) show the site is appearing but too far down to earn clicks. Competitive queries like "window and door sales software" (position 44.5) and "door to door crm" (position 56.2) have fallen off the first page entirely.

### Top Pages

| Page | Clicks | Impressions | Avg Position |
|------|--------|-------------|-------------|
| `/` (homepage) | 26 | 1,047 | 12.3 |
| `/bpmpro` | 7 | 338 | 10.4 |
| `/bpmpro-features` | 4 | 201 | 4.6 |
| `/customer-success-stories` | 3 | 168 | 5.8 |
| `/contact` | 1 | 285 | **24.5** |
| `/about` | 0 | 191 | 3.4 |
| `/faqs` | 0 | 128 | 2.8 |
| `/savings` | 0 | 58 | 4.6 |
| `/blog` | 0 | 54 | 19.0 |
| `/book-a-demo` | 0 | 50 | 6.6 |
| `/video-library` | 0 | 41 | 6.5 |

The homepage has the most impressions (1,047) but an average position of 12.3 — page 2 of Google results. The `/contact` page is particularly concerning at position 24.5 despite 285 impressions.

### Geographic Distribution

| Country | Clicks | Impressions | Notes |
|---------|--------|-------------|-------|
| United States | 26 | 946 | Primary market (67% of clicks) |
| United Kingdom | 1 | 384 | High impressions, very low CTR |
| India | 2 | 89 | — |
| Canada | 2 | 44 | — |

The US accounts for 67% of clicks and 52% of impressions. The UK shows high impressions (384) but only 1 click — likely appearing for generic "window CRM" queries where UK users aren't the target audience.

### Device Breakdown

| Device | Clicks | Impressions | CTR | Avg Position |
|--------|--------|-------------|-----|-------------|
| Desktop | 23 | 1,426 | 1.6% | 15.5 |
| Mobile | 16 | 366 | 4.4% | 10.4 |
| Tablet | 0 | 11 | 0% | 3.3 |

Desktop dominates impressions (79%) but has worse positioning (15.5) compared to mobile (10.4). This makes sense for a B2B product — contractors research on desktop but mobile rankings held up better.

### Summary

The data tells a clear story:
1. **Brand queries are fine** — "xtriam" and "bpmpro" rank at positions 2–3
2. **Non-brand queries collapsed** — the money keywords like "window and door crm" dropped from first-page to second/third page
3. **The damage started ~Jan 15** — two weeks after migration, matching Google's typical re-evaluation cycle
4. **High impressions, zero clicks** — the site is still being shown but at positions too low to earn clicks (especially "window and door crm" at 90 impressions, 0 clicks)

---

## Root Cause Analysis

Webflow automatically generates and maintains several SEO-critical files and tags. When the site was rebuilt in Next.js, none of these were replicated:

### 1. Missing `robots.txt`

| Webflow (before) | Next.js (after migration) |
|-------------------|---------------------------|
| Auto-generated robots.txt | No robots.txt — 404 response |
| Included sitemap directive | N/A |

**Impact:** Crawlers had no guidance on what to index and couldn't discover the sitemap URL.

### 2. Missing `sitemap.xml`

| Webflow (before) | Next.js (after migration) |
|-------------------|---------------------------|
| Auto-generated sitemap with all 36 pages | No sitemap — 404 response |
| Google Search Console status: OK | Google Search Console status: **Couldn't fetch** |

**Impact:** Google lost its map of the site. Crawl efficiency dropped. New and existing pages had to be discovered organically through link-following instead of being explicitly declared.

### 3. Missing Canonical Tags

| Webflow (before) | Next.js (after migration) |
|-------------------|---------------------------|
| `<link rel="canonical">` on every page | No canonical tags on any page |

**Impact:** Without canonical tags, Google may treat `www.xtriam.com/bpmpro` and `xtriam.com/bpmpro` as duplicate content, diluting ranking signals.

### 4. Broken Open Graph Metadata

| Webflow (before) | Next.js (after migration) |
|-------------------|---------------------------|
| Page-specific OG title/description per page | All pages shared the homepage's OG title/description |
| Correct `www.xtriam.com` URLs | `metadataBase` set to `xtriam.com` (no www) |

**Root cause in code:** The root `layout.tsx` hardcoded `openGraph.title`, `openGraph.description`, and `openGraph.url` at the layout level. In Next.js, parent metadata merges with child metadata — but explicit parent values override child values. So even though individual pages (like `/bpmpro`) defined their own `title` and `description`, the OG tags always showed the homepage content.

### 5. Wrong Domain in `metadataBase`

| Before fix | After fix |
|------------|-----------|
| `metadataBase: new URL("https://xtriam.com")` | `metadataBase: new URL("https://www.xtriam.com")` |

**Impact:** All auto-generated URLs (canonical, OG URLs) would use the non-www domain, creating a mismatch with the actual canonical domain.

---

## Actions Taken

### File: `app/robots.ts` (Created)

Created a dynamic robots.txt using Next.js Metadata API:

- **Allow:** All crawlers on all public pages (`/`)
- **Disallow:** `/portal/`, `/api/`, `/login`, `/signup`, `/support/`
- **Sitemap directive:** `https://www.xtriam.com/sitemap.xml`

### File: `app/sitemap.ts` (Created)

Created a dynamic sitemap.xml with **37 URLs** across five categories:

| Category | Count | Priority | Change Frequency |
|----------|-------|----------|------------------|
| Static pages (homepage, product, features, etc.) | 16 | 0.3–1.0 | weekly–yearly |
| Landing pages (`/bpmpro-crm/*`) | 3 | 0.8 | monthly |
| Blog posts (`/post/*`) | 16 | 0.6 | yearly |
| Newsletter editions (`/this-week-in-windows/*`) | 1 | 0.5 | yearly |
| Tutorials listing | 1 | 0.6 | monthly |

All URLs use the correct `https://www.xtriam.com` base domain.

### File: `app/layout.tsx` (Modified)

Changes to the root metadata object:

| Property | Before | After |
|----------|--------|-------|
| `metadataBase` | `https://xtriam.com` | `https://www.xtriam.com` |
| `alternates.canonical` | (missing) | `"./"` — generates per-page canonical tags |
| `openGraph.url` | Hardcoded homepage URL | Removed — auto-generated per page |
| `openGraph.title` | Hardcoded homepage title | Removed — inherits from page `title` |
| `openGraph.description` | Hardcoded homepage description | Removed — inherits from page `description` |
| `twitter.title` | Hardcoded homepage title | Removed — inherits from page `title` |
| `twitter.description` | Hardcoded homepage description | Removed — inherits from page `description` |

The `openGraph.type`, `openGraph.locale`, `openGraph.siteName`, and `twitter.card` were kept since these are site-wide defaults that should be inherited by all pages.

### File: `app/book-a-demo/page.tsx` (Modified)

Fixed the hardcoded OG URL from `https://xtriam.com/book-a-demo` to `https://www.xtriam.com/book-a-demo`.

---

## How the Fix Works

Next.js has a metadata merging system. The root layout defines base metadata, and each page can override or extend it:

1. **Canonical tags:** `alternates.canonical: "./"` in the root layout tells Next.js to generate a `<link rel="canonical">` tag for every page using the page's own URL. The `./` is relative — Next.js resolves it against `metadataBase` + the current route.

2. **OG tags:** By removing the hardcoded `title` and `description` from the root layout's `openGraph` config, Next.js now auto-generates these from each page's `title` and `description` metadata. Pages that define `title: "Book a Demo | bpmPro"` will now get `og:title: "Book a Demo | bpmPro"` instead of the homepage's title.

3. **Sitemap & robots:** Next.js compiles `app/sitemap.ts` and `app/robots.ts` into `/sitemap.xml` and `/robots.txt` at build time.

---

## Verification

Build completed successfully with both `/robots.txt` and `/sitemap.xml` listed as static routes.

### Expected Results per Route

| URL | Expected Tags |
|-----|---------------|
| `/` | `<link rel="canonical" href="https://www.xtriam.com/">`, OG title = homepage title |
| `/bpmpro` | `<link rel="canonical" href="https://www.xtriam.com/bpmpro">`, OG title = "bpmPro" page title |
| `/book-a-demo` | `<link rel="canonical" href="https://www.xtriam.com/book-a-demo">`, OG title = custom override |
| `/robots.txt` | Text file with Allow/Disallow rules + Sitemap directive |
| `/sitemap.xml` | XML with 37 URLs, all using `www.xtriam.com` |

---

## Post-Deploy Checklist

- [ ] Verify `/robots.txt` returns correct content on production
- [ ] Verify `/sitemap.xml` returns all 37 URLs on production
- [ ] View page source on homepage — confirm `<link rel="canonical">` tag present
- [ ] View page source on `/bpmpro` — confirm canonical and OG tags are page-specific
- [ ] **Submit sitemap in Google Search Console:** Go to Sitemaps > enter `https://www.xtriam.com/sitemap.xml` > Submit
- [ ] Monitor Search Console over the next 1–2 weeks for status change from "Couldn't fetch" to "Success"
- [ ] Monitor "Pages" report in Search Console for indexed page count recovery
- [ ] Check Google Search rankings for "window contractors CRM" and related terms over 2–4 weeks

---

## Lessons Learned

1. **Webflow does a lot silently.** When migrating away from any managed platform (Webflow, WordPress, Squarespace), create a checklist of auto-generated SEO assets: robots.txt, sitemap.xml, canonical tags, OG tags, structured data, redirect rules.

2. **Next.js doesn't generate SEO files by default.** Unlike Webflow, Next.js requires explicit creation of `robots.ts` and `sitemap.ts` files. The Metadata API is powerful but opt-in.

3. **Test OG tags page-by-page, not just the homepage.** The root layout's hardcoded OG values silently overrode every child page's metadata. This wasn't visible from the homepage alone.

4. **Use `www` consistently.** The `metadataBase` must match the canonical domain. A mismatch between `xtriam.com` and `www.xtriam.com` creates duplicate content signals.

5. **Check Google Search Console immediately after a migration.** The "Couldn't fetch" status on the sitemap was visible from day one. Catching it then would have saved two months of ranking erosion.
