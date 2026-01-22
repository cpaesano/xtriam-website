# xTriam Website - Phase II & Beyond Roadmap

**Created:** January 2, 2026
**Purpose:** Document features deferred from Phase I for future implementation

---

## Phase II: Content Management & Enhanced Features

### CMS Admin Interface

**Rationale:** Currently, you'll update blog posts and videos by editing MDX files directly in VS Code. Phase II adds a web-based admin interface.

**Options to Evaluate:**

| Option | Description | Pros | Cons |
|--------|-------------|------|------|
| Sanity | Headless CMS | Flexible, great DX | Additional service |
| Contentlayer | File-based CMS | Works with MDX | Limited UI |
| Keystatic | Git-based CMS | Free, integrates with repo | Newer tool |
| Custom Admin | Built-in Next.js | Full control | More dev work |

**Features Needed:**
- [ ] Create/edit blog posts (WYSIWYG or Markdown)
- [ ] Create/edit "This Week in Windows" editions
- [ ] Manage video library entries
- [ ] Image upload and management
- [ ] Preview before publish
- [ ] Draft/Published status

---

### Self-Hosted Video

**Rationale:** Currently using YouTube embeds. Self-hosting gives more control over privacy (public vs. gated) and branding.

**Options to Evaluate:**

| Option | Description | Pros | Cons |
|--------|-------------|------|------|
| Mux | Video API platform | Professional, HLS streaming | Cost per minute |
| Cloudflare Stream | Video hosting | Good pricing, global CDN | Cloudflare ecosystem |
| Bunny Stream | Video CDN | Affordable | Smaller feature set |
| Vercel Blob + custom | DIY approach | Full control | More complexity |

**Features Needed:**
- [ ] Upload videos directly
- [ ] Automatic transcoding (multiple resolutions)
- [ ] Adaptive streaming (HLS)
- [ ] Video player customization
- [ ] Gated content (require login for some videos)
- [ ] View analytics

---

### Enhanced Claude AI Features

**Phase I:** Basic pre-sales chat answering common questions.

**Phase II Enhancements:**
- [ ] Conversation history persistence
- [ ] User-specific context (if they identify themselves)
- [ ] Lead capture integration
- [ ] Handoff to human agent workflow
- [ ] Analytics on common questions
- [ ] Suggested improvements to knowledge base

---

## Salesforce Experience Cloud Portal

**Separate Project** - Not part of xtriam-website

### Why Salesforce for Customer Portal?

1. **Data lives there** - Subscriber info, contacts already in SF
2. **Native features** - Cases, Knowledge Articles, Experience Builder
3. **Less custom code** - Portal templates exist
4. **Security** - Salesforce handles authentication
5. **Integration** - Direct access to subscriber org data

### Portal Features (Salesforce Project)

| Feature | SF Component | Notes |
|---------|--------------|-------|
| Login/Registration | SF Identity | SSO possible |
| Support Tickets | Cases | Create, view, comment |
| Knowledge Base | Knowledge | Articles, FAQs |
| Training Videos | Files or custom | May need custom LWC |
| Account Info | Account/Contact | View subscription details |
| User Management | User object | Add/remove users |

### Licensing Considerations

- **Customer Community** license (lower cost, limited features)
- **Customer Community Plus** license (more features)
- Evaluate based on feature needs

### Domain Options

- `portal.xtriam.com` (subdomain)
- `support.xtriam.com` (alternative)
- Custom domain on SF Experience Cloud

---

## Phase III: Advanced Features

### Subscription & Billing Portal

**Only if decided NOT to use Salesforce CPQ:**

- [ ] View subscription status
- [ ] Download invoices
- [ ] Update payment method
- [ ] View usage metrics

**Note:** Likely better handled in Salesforce with CPQ/Billing.

### Community Features

- [ ] User forums (Q&A between customers)
- [ ] Feature requests/voting
- [ ] Beta program signup

### Advanced Analytics

- [ ] Marketing attribution
- [ ] Content performance
- [ ] User journey tracking
- [ ] AI chat analytics dashboard

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-01-02 | Hybrid approach (Next.js + SF Experience Cloud) | Leverage SF for portal, keep marketing site fast |
| 2026-01-02 | Defer CMS to Phase II | Editing MDX directly is acceptable for now |
| 2026-01-02 | Keep YouTube embeds for Phase I | Self-hosted video is significant scope |
| 2026-01-02 | Pre-sales chat only in Phase I | Full support chat needs auth (portal) |

---

## Questions for Future Phases

1. **Do you have Salesforce Experience Cloud licenses?** This affects timeline and cost.

2. **What's the priority order for Phase II features?**
   - CMS Admin Interface
   - Self-hosted Video
   - Enhanced AI Chat

3. **Video content strategy:**
   - How many training videos will you create?
   - Will some be public (marketing) vs. gated (customers only)?

4. **Billing/Invoicing:**
   - Are you using Salesforce CPQ?
   - Or a separate billing system?

---

**Document Version:** 1.0
**Last Updated:** January 2, 2026
