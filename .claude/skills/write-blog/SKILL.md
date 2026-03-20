---
name: write-blog
description: Write and publish an SEO-targeted blog post for xtriam.com. Usage /write-blog "target keyword" "title idea"
argument-hint: "[target keyword] [title idea]"
---

# Write Blog Post for xtriam.com

You are creating a new blog post for the xTriam website targeting a specific SEO keyword.

**Target Keyword:** $ARGUMENTS

## Step 1: Research

Before writing, search Google for the target keyword to understand:
- What currently ranks on page 1
- What angle/format wins (listicle, how-to, comparison, guide)
- What content gaps exist that we can fill

## Step 2: Write the Blog Post

### Tone & Style Rules (MANDATORY)
- **Voice:** Operator to operator. Carlos has been in the window/door/construction industry since 2003. Write like someone who's been on job sites, not a marketing agency.
- **Specificity:** Use concrete numbers, not vague claims. "$70,200/year in quoting labor" not "significant cost savings."
- **Length:** 1,200-1,800 words. Long enough to rank, short enough to read.
- **NEVER use these words/phrases:** "AI agency", "leverage AI", "digital transformation", "cutting-edge", "disruptive", "synergy", "game-changer", "unlock", "empower"
- **Keep vendor-neutral publicly:** Say "AI-powered" not "Claude-powered" or "Claude API"

### Content Structure
1. **Hook** (1-2 paragraphs): Start with a specific pain point or scenario a window/door contractor recognizes immediately
2. **Body** (5-7 sections with H2/H3 headings): Actionable advice with numbers and examples
3. **bpmPro mention:** Naturally reference bpmPro 1-2 times as relevant — never salesy, always in context of solving the problem
4. **CTA paragraph:** End with a soft call to action

### Internal Links (include 2-4 of these naturally)
- `/bpmpro` — product overview
- `/bpmpro-features` — feature details
- `/book-a-demo` — demo booking
- `/customer-success-stories` — social proof
- `/payment-processing-with-stripe-integration` — payments feature
- `/savings` — ROI calculator

### Proof Points (use where relevant)
- $150M+ managed revenue across client organizations
- 75% faster quoting (Hurricane Window & Screen case study)
- ~$500/day savings in administrative time
- 20+ subscriber organizations
- 80% reduction in admin time
- Built by someone who ran a construction business since 2003

### SEO Requirements
- Target keyword must appear in: title, first paragraph, at least 2 H2 headings, and 2-3 times in body text
- Include 3-5 related/LSI keywords naturally throughout
- Meta description should front-load the keyword

## Step 3: Add to Codebase

The blog post lives in THREE files that must ALL be updated:

### File 1: Blog Post Content
**Path:** `app/(marketing)/post/[slug]/page.tsx`

Add a new entry to the `blogPosts` object. Format:

```typescript
  "your-slug-here": {
    title: "Your Title Here",
    date: "March 2026",
    category: "Technology",  // Technology, Operations, Marketing, Sales, News, Innovation
    image: "/images/blog/your-image-name.png",
    content: `
      <p>First paragraph with target keyword.</p>
      <br/>

      <h2>Section Heading</h2>

      <p>Content paragraph.</p>
      <br/>

      <p>Another paragraph with <strong>bold text</strong> and <a href="/bpmpro">internal link</a>.</p>
      <br/>

      <h3>Subsection</h3>

      <p>More content.</p>
      <br/>
    `,
  },
```

**HTML rules:**
- Every `<p>` is followed by `<br/>`
- Headings use `<h2>` and `<h3>` (never h1)
- Bold: `<strong>`
- Links: `<a href="/path">text</a>` (internal) or `<a href="https://..." target="_blank" rel="noopener noreferrer">text</a>` (external)
- Images: `<img src="/images/blog/name.png" alt="description" class="rounded-xl shadow-lg my-8 w-full" />`
- No markdown — this is HTML inside a template literal

### File 2: Blog Listing
**Path:** `app/(marketing)/blog/page.tsx`

Add a card entry to the `blogPosts` array near the top:

```typescript
  {
    slug: "your-slug-here",
    title: "Your Title Here",
    excerpt: "One compelling sentence summarizing the post.",
    date: "March 2026",
    category: "Technology",
    image: "/images/blog/your-image-name.png",
  },
```

### File 3: Sitemap
**Path:** `app/sitemap.ts`

Add the slug string to the `blogSlugs` array.

## Step 4: Verify

Run `npm run build` to confirm the post compiles without errors.

## Step 5: Generate Blog Image

Note: The image path is referenced but not created. After the post is written, remind the user they need to create or source an image at the referenced path. Suggest dimensions: 1200x630px (OG image ratio).

## Checklist Before Done
- [ ] Target keyword in title, first paragraph, 2+ headings, 2-3x in body
- [ ] 1,200-1,800 words
- [ ] 2-4 internal links included
- [ ] No banned words/phrases
- [ ] Added to page.tsx blogPosts object
- [ ] Added to blog/page.tsx listing
- [ ] Added to sitemap.ts blogSlugs
- [ ] `npm run build` passes
- [ ] Reminded user about blog image
