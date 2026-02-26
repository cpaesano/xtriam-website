# SEO Changelog — xtriam.com

Running log of SEO discoveries, issues, and fixes for the xTriam website.
Entries are reverse-chronological (newest first).

For reusable SEO knowledge and cross-site playbooks, see `../../docs/seo/`.

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
