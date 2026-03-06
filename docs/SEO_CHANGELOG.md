# SEO Changelog — xtriam.com

Running log of SEO discoveries, issues, and fixes for the xTriam website.
Entries are reverse-chronological (newest first).

For reusable SEO knowledge and cross-site playbooks, see `../../docs/seo/`.

---

## 2026-03-05 — Mobile PageSpeed: 73 → 97 (Core Web Vitals all green)

**Trigger:** PageSpeed Insights showed Performance score of 73 on mobile with LCP at 4.9s (poor). Core Web Vitals directly impact Google rankings — this was likely contributing to the ranking drop.

**Changes made (3 commits):**

| Fix | Impact | Commit |
|-----|--------|--------|
| Replace client-side `LayoutWrapper` with `(marketing)` route group | Marketing pages now server-render (no hydration needed for layout) | `80da277` |
| Convert hero image from 770KB PNG to responsive WebP (14-51KB) | 93% image size reduction, 3 responsive sizes with `<picture>` | `80da277` |
| Replace Vimeo/YouTube iframes with click-to-play facades | Eliminates ~500KB 3rd-party JS on initial page load | `80da277` |
| Remove Geist Mono font | One fewer render-blocking font request | `80da277` |
| Convert Header to server component + client islands | Only mobile menu toggle and More dropdown need JavaScript | `dbbe0f2` |
| Add `<link rel=preload>` for hero image | Browser starts fetching LCP image immediately | `dbbe0f2` |
| Move Playfair Display font to blog-only layout | Saves 28KB font from critical path on non-blog pages | `7da0f05` |
| Replace lucide-react icons with inline SVGs in MobileNav | Removes icon library from homepage client bundle | `7da0f05` |
| Lazy-load FloatingHelpButton via `next/dynamic` | Deferred until after initial render | `7da0f05` |

**Results:**

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Performance | 73 | **97** | +24 points |
| FCP | 3.0s | **0.9s** | -70% |
| LCP | 4.9s | **1.8s** | -63% |
| TBT | 150ms | **170ms** | ~same |
| CLS | 0 | **0** | same |
| Best Practices | 77 | **100** | +23 points |
| Unused JS | 341KB | **175KB** | -49% |

**All Core Web Vitals now in green zone.** LCP at 1.8s is well under Google's 2.5s "good" threshold.

---

## 2026-03-05 — Ranking drop: "CRM for window contractors" — not visible from user's device

**Trigger:** Manual Google search for "CRM for window contractors" from Carlos's device shows xtriam.com **completely absent** from results.

**What the user sees:** xtriam.com does not appear at all for "CRM for window contractors" (was #3 on Feb 27).

**What automated web search shows:** xtriam.com at #4 — but this routes through different infrastructure and does not reflect what real users in South Florida see.

| Source | Position | Date |
|--------|----------|------|
| Carlos's device (manual search) | **#3** | Feb 27 |
| Carlos's device (manual search) | **Not visible** | Mar 5 |
| Automated web search tool | #4 | Mar 5 |

**Technical check:** No issues found — site returns 200, robots.txt and sitemap.xml serving correctly.

**Possible causes:**
- Google ranking volatility during SEO recovery period (still within first 2 weeks post-fix)
- Google may be A/B testing different SERP compositions by region/device
- The site's domain authority is still rebuilding after 56 days without proper SEO infrastructure
- Builder Prime is dominating with 3 listings, squeezing smaller sites off page 1

**Action:** Check Google Search Console for actual average position and impression data for this keyword over the past 7 days. GSC data is more reliable than manual spot-checks. If position has dropped significantly in GSC, consider adding more content depth to the homepage and key landing pages to strengthen relevance signals.

---

## 2026-02-27 — Google Search Console: impressions returning for industry keywords

**Status:** Site is confirmed back in Google's index. GSC is now showing impressions for non-brand, industry-relevant queries over the last 24 hours.

**Top queries (last 24 hrs, from GSC):**

| Query | Clicks | Impressions | Avg Position |
|-------|--------|-------------|--------------|
| software for selling windows and doors | 0 | 3 | 10.7 |
| give more | 0 | 1 | 12.0 |
| window and door sales software | 0 | 1 | 26.0 |

**Analysis:**
- "software for selling windows and doors" at position 10.7 is right at the page 1/page 2 border — one position improvement puts it on page 1
- "window and door sales software" at position 26 shows Google is associating the site with the right keyword family again
- "give more" is likely an irrelevant coincidental match
- Zero clicks is expected — positions 10+ get very low CTR, and impression volume is still ramping up
- Combined with "crm for window contractors" at #3 (confirmed earlier today via manual search), the recovery is progressing well

**Recovery timeline so far:**
- Feb 22: SEO fix deployed (robots.txt, sitemap, canonicals, OG metadata)
- Feb 27 (day 5): "crm for window contractors" back at #3, new industry keywords appearing in GSC
- Next milestone: clicks from organic search, more keywords entering page 1

---

## 2026-02-27 — Enriched 3 landing pages for SEO indexing + Google re-index requests

**Problem:** The three `/bpmpro-crm/` landing pages were not being indexed by Google. All three were too thin — short pages with minimal content that Google deemed low-value for indexing.

**Pages enriched:**

| Page | URL | Commit | What was added |
|------|-----|--------|----------------|
| Business Process Automation | `/bpmpro-crm/business-process-automation-for-window-contractors` | `7488b1c` | bpmPro logo in hero, expanded automation areas with bullet points, "Built on Salesforce" stats section, verified results testimonial card |
| Eliminate Manual Processes | `/bpmpro-crm/eliminate-manual-processes` | `bbf3cde` | bpmPro logo in hero, "Hidden Cost of Manual Processes" stat cards, "From Manual Chaos to Digital Clarity" before/after comparisons, 6 elimination area cards with bullets, "Built for Window Contractors" testimonial + verified results card |
| Import ES Windows Quotes | `/bpmpro-crm/quickly-import-your-es-windows-quotes` | `f843102` | bpmPro logo in hero, "Why Contractors Struggle with Manual Quote Entry" stat cards, expanded How It Works steps with bullets, "What Gets Imported" 5-card grid, "Works Alongside Your Other Tools" integrations section, "Real Results from Real Contractors" testimonial + verified results card |

**Pattern used across all three pages:**
- Added bpmPro logo above the h1 heading
- Added pain point / stat cards section with industry-relevant numbers
- Expanded existing sections with bullet-point detail
- Added a testimonial + verified results two-column section (quote from a real customer + blue/orange gradient card with 4 verified stats)
- Updated SEO metadata (title and description) for each page

**Google re-index requests:** All three pages were submitted for re-indexing via Google Search Console URL Inspection tool after deployment.

**Expected outcome:** Pages should appear in Google's index within 1–2 weeks. Monitor in GSC under "Pages" → "Why pages aren't indexed" to confirm they move from "Discovered - currently not indexed" to "Indexed."

---

## 2026-02-27 — Ranking recovery confirmed: "crm for window contractors" at position #3

**Discovery:** Google has re-indexed many xtriam.com pages after the Feb 22 SEO recovery fix. The robots.txt and sitemap.xml have been successfully read by Google.

**Key result:** For the keyword **"crm for window contractors"**, xtriam.com now ranks **#3** on Google (from Carlos's device), up from being completely out of rankings post-migration.

**SERP snapshot (Feb 27, 2026):**

| Position | Result | Domain |
|----------|--------|--------|
| #1 | Top 7 Contractor CRMs for Window & Door Companies | builderprime.com |
| #2 | CRM for the Construction Industry | pro.houzz.com |
| **#3** | **xTriam - Software Built for Contractors** | **xtriam.com** |

**Google snippet for xtriam.com:**
> "Specialized CRM++ for Window & Door Contractors. bpmPro is a Salesforce-native solution designed specifically for window and door contractors."

**Timeline:** Recovery took ~5 days from the SEO fix deploy (Feb 22) to confirmed ranking recovery (Feb 27). This is faster than the 4–8 week estimate from the original recovery doc.

**Status:** ~12 pages still not indexed per Google Search Console. Next step: review those pages and decide whether to improve content and request indexing.

---

## 2026-02-26 — GA4 internal traffic filter and production-only tracking

**Action 1:** Created IP filtering rule in GA4 to exclude internal traffic from analytics.

| Setting | Value |
|---------|-------|
| Rule name | LeJune |
| IP address | `136.28.118.141` |
| traffic_type | `internal` |
| Filter state | Active |

**Action 2:** Restricted GA4 script to only load on `www.xtriam.com`. Vercel preview deployments (e.g., `xtriam-website-*.vercel.app`) will no longer send data to production analytics.

**Commit:** `pending`

---

## 2026-02-24 — Google Analytics tracking restored

**Discovery:** Google Analytics showed zero new users since mid-January. All countries reported 0 active users for the last 28 days. Session data showed "No data available" for the last 7 days.

**Root cause:** The GA4 tracking snippet was never added to the Next.js site. Webflow injected GA automatically via its dashboard — that didn't carry over during migration.

**Fix:** Added `gtag.js` script and GA4 config (`G-JMQLNXQGYQ`) to `app/layout.tsx` using `next/script` with `afterInteractive` strategy.

**Commit:** `9663f57`

**Impact:** ~5 weeks of analytics data lost (mid-January through Feb 24). Data collection resumed immediately after deploy.

---

## 2026-02-23 — Favicon and Open Graph image for social sharing

**Discovery:** Link previews on WhatsApp and social platforms showed no image or a broken preview. Favicon had a white background (JPG) instead of transparency.

**Fix:**
- Replaced JPG favicon with transparent PNG
- Added 1200x630 OG image (`public/images/og-image.png`) for social link previews
- Updated `apple-icon.png` to match

**Commit:** `3d59a55`

**Impact:** Social sharing now shows branded preview image. Favicon renders cleanly on dark browser tabs.

---

## 2026-02-22 — Critical SEO recovery: robots.txt, sitemap, canonicals, OG metadata

**Discovery:** Google Search Console showed sitemap status "Couldn't fetch" since Dec 28 (migration day). Rankings for non-brand keywords collapsed ~Jan 15 — "window and door crm" dropped from single digits to positions 55–63. Brand keywords ("xtriam", "bpmpro") held at positions 2–3.

**Root cause:** Webflow auto-generated robots.txt, sitemap.xml, canonical tags, and per-page OG metadata. None of these were replicated in the Next.js build. The site ran for ~56 days without any of them.

**Issues found and fixed:**

| Issue | Before | After |
|-------|--------|-------|
| `robots.txt` | 404 (missing) | Dynamic `app/robots.ts` with allow/disallow rules and sitemap directive |
| `sitemap.xml` | 404 (missing) | Dynamic `app/sitemap.ts` with 37 URLs, correct priorities and frequencies |
| Canonical tags | Missing on all pages | `alternates.canonical: "./"` in root layout — auto-generates per page |
| `metadataBase` | `https://xtriam.com` (no www) | `https://www.xtriam.com` |
| OG title/description | Hardcoded homepage values on every page | Removed from root layout — each page inherits its own `title`/`description` |
| `/book-a-demo` OG URL | `https://xtriam.com/book-a-demo` | `https://www.xtriam.com/book-a-demo` |

**Commits:** `726950e`

**Post-fix actions:**
- Submitted sitemap to Google Search Console — status changed to "Success" (37 pages discovered)
- Requested indexing of top 5 pages via URL Inspection tool

**Detailed analysis:** See `docs/2026-02-22_SEO_RECOVERY.md` for full Search Console data, position tracking, and root cause breakdown.

**Impact:** Recovery expected over 4–8 weeks. Monitoring keyword positions weekly.

---

## 2026-01-22 — Book-a-demo Open Graph title fix

**Discovery:** Sharing the `/book-a-demo` page on social showed the generic site title instead of a page-specific title.

**Fix:** Added explicit `openGraph` metadata to `app/book-a-demo/page.tsx` with title "Book a Demo | See bpmPro for Window Pros".

**Commit:** `4094932`

---

## 2025-12-28 — Migration from Webflow to Next.js/Vercel (DNS cutover)

**Event:** DNS switched from Webflow to Vercel. The Next.js site went live at `www.xtriam.com`.

**What was preserved:**
- All 36+ URL paths (exact match with Webflow structure)
- Page content and copy
- Blog post URLs under `/post/`

**What was NOT preserved (discovered later):**
- robots.txt (Webflow auto-generated)
- sitemap.xml (Webflow auto-generated)
- Canonical tags (Webflow auto-generated)
- Per-page OG metadata (Webflow auto-generated)
- Google Analytics tracking snippet (Webflow injected via dashboard)

**Lesson:** When migrating from any managed platform (Webflow, WordPress, Squarespace), audit all auto-generated SEO assets before cutover. See `../../docs/seo/` for the migration checklist.

---

## Monitoring

**Tools in use:**
- Google Search Console (active)
- Google Analytics GA4 (`G-JMQLNXQGYQ`) — restored Feb 24, 2026

**Key metrics being tracked:**
- Sitemap status in GSC
- Indexed page count (target: 37+)
- Average position for "window and door crm" (target: < 5)
- Homepage average position (target: < 10, was 12.3)
- Weekly organic clicks (pre-migration baseline: ~5–7/week)

**Target keywords:** See `docs/2026-02-22_SEO_MONITORING_GUIDE.md` for full keyword list by tier.
