# AI Knowledge Base Strategy for bpmPro Support Agent

**Version:** 1.0
**Last Updated:** January 7, 2026
**Purpose:** Define how to feed bpmPro product knowledge to the Claude AI support agent

---

## 1. Current State

The AI agent currently has a basic system prompt with:
- High-level feature descriptions
- Support contact information
- General behavior guidelines

**Location:** `/lib/claude.ts` → `SYSTEM_PROMPT`

**Limitations:**
- Cannot answer detailed "how to" questions
- No knowledge of specific UI steps
- No troubleshooting for error messages
- No knowledge of bpmPro Salesforce objects/fields

---

## 2. Knowledge Categories Needed

### Tier 1: Essential (Must Have)

| Category | Examples |
|----------|----------|
| **Feature Overviews** | What each module does, who uses it |
| **Common Tasks** | Create quote, manage project, add product |
| **Navigation** | Where to find things in the UI |
| **Common Errors** | Error messages and their solutions |
| **Support Escalation** | When/how to escalate to human support |

### Tier 2: Detailed (Should Have)

| Category | Examples |
|----------|----------|
| **Step-by-Step Guides** | Full workflows with screenshots descriptions |
| **Field Explanations** | What each field means and valid values |
| **Business Logic** | Commission calculations, pricing rules |
| **Integration Details** | ES Windows import, Stripe, email |
| **Admin Tasks** | User setup, permissions, configuration |

### Tier 3: Advanced (Nice to Have)

| Category | Examples |
|----------|----------|
| **Customization** | Custom fields, page layouts, flows |
| **Reporting** | Report types, filters, scheduling |
| **API/Developer** | Object structure, automation |
| **Migration** | Data import, cleanup procedures |

---

## 3. Implementation Options

### Option A: Expanded System Prompt (Simplest)

**Pros:** Easy to implement, no additional infrastructure
**Cons:** Limited by context window, static content

**Implementation:**

1. Create a comprehensive knowledge document
2. Include the most important sections in the system prompt
3. Keep total prompt under ~8,000 tokens for efficiency

```typescript
// lib/claude.ts
const SYSTEM_PROMPT = `You are a helpful customer support assistant for bpmPro...

## Quick Reference Guide

### Creating a Quote
1. Go to Accounts tab → Select Account
2. Click "New Quote" button
3. Fill in required fields:
   - Quote Name (auto-generated or custom)
   - Close Date (expected)
   - Primary Contact
4. Click "Add Products" to add line items
5. Products come from Product Catalog
6. Apply Discounts if applicable
7. Click "Generate PDF" for customer proposal
8. Click "Email Quote" to send directly

### Common Quote Errors
- "Missing Product Price": Product needs a Price Book entry
- "Quote Locked": Quote is already approved, clone it instead
...
`;
```

### Option B: Dynamic Context Injection (Recommended)

**Pros:** Larger knowledge base, relevant context per query
**Cons:** Requires keyword matching logic

**Implementation:**

1. Create a knowledge base object with topics
2. Match user query keywords to relevant topics
3. Inject relevant sections into system prompt dynamically

```typescript
// lib/knowledge-base.ts
export const KNOWLEDGE_BASE = {
  quotes: {
    keywords: ["quote", "proposal", "pricing", "estimate"],
    content: `
## Quotes & Proposals

### Creating a New Quote
1. Navigate to the Account record
2. Click "New Quote" in the related list
3. Fill in required fields...

### Quote Statuses
- Draft: Being edited
- Sent: Delivered to customer
- Accepted: Customer approved
- Rejected: Customer declined
...
    `
  },

  projects: {
    keywords: ["project", "board", "kanban", "installation", "schedule"],
    content: `
## Projects Board

### Understanding the Board
The Projects Board shows all active jobs in a Kanban view...
    `
  },

  payments: {
    keywords: ["payment", "stripe", "invoice", "deposit", "balance"],
    content: `
## Payments & Stripe

### Collecting Deposits
1. Open the Project record
2. Click "Request Payment"...
    `
  },

  // ... more topics
};

// lib/claude.ts
import { KNOWLEDGE_BASE } from "./knowledge-base";

function getRelevantContext(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  const relevantSections: string[] = [];

  for (const [topic, data] of Object.entries(KNOWLEDGE_BASE)) {
    if (data.keywords.some(kw => lowerMessage.includes(kw))) {
      relevantSections.push(data.content);
    }
  }

  return relevantSections.join("\n\n");
}

export async function chat(messages: ChatMessage[]): Promise<string> {
  const lastMessage = messages[messages.length - 1];
  const context = getRelevantContext(lastMessage.content);

  const dynamicPrompt = `${BASE_SYSTEM_PROMPT}

## Relevant Documentation
${context || "No specific documentation available for this query."}
`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: dynamicPrompt,
    messages: messages.map(m => ({ role: m.role, content: m.content })),
  });

  // ...
}
```

### Option C: RAG with Vector Database (Most Scalable)

**Pros:** Unlimited knowledge, semantic search, best quality
**Cons:** Requires vector DB, more complex setup

**Implementation:**

1. Chunk all bpmPro documentation into paragraphs
2. Generate embeddings for each chunk
3. Store in vector database (Pinecone, Supabase, etc.)
4. On each query, find most relevant chunks
5. Include top chunks in system prompt

```typescript
// Simplified example
import { embed, similarity } from "./embeddings";
import { vectorStore } from "./vector-store";

export async function chat(messages: ChatMessage[]): Promise<string> {
  const query = messages[messages.length - 1].content;

  // Get relevant documentation
  const queryEmbedding = await embed(query);
  const relevantDocs = await vectorStore.search(queryEmbedding, { topK: 5 });

  const context = relevantDocs.map(d => d.content).join("\n\n");

  const dynamicPrompt = `${BASE_SYSTEM_PROMPT}

## Relevant Documentation
${context}

Use the above documentation to answer the user's question. If the documentation doesn't cover their question, acknowledge that and suggest contacting support.
`;

  // ... call Claude with dynamic prompt
}
```

---

## 4. Recommended Approach: Start with Option B

### Phase 1: Create Knowledge Base File

Create `/lib/knowledge-base.ts` with initial topics:

1. **Quotes & Proposals** - Creating, editing, sending quotes
2. **Projects Board** - Kanban view, project workflow
3. **Close Deal Wizard** - Contract signing process
4. **Payments & Stripe** - Collecting payments
5. **Commission Manager** - How commissions work
6. **Reports & Dashboards** - Available reports
7. **Product Catalog** - Managing products/pricing
8. **Common Errors** - Error messages and fixes
9. **Account Setup** - New user onboarding
10. **Mobile Access** - Salesforce mobile app

### Phase 2: Source the Content

**Where to get the content:**

| Source | Type of Content |
|--------|-----------------|
| bpmPro AppExchange listing | Feature descriptions |
| Internal training docs | Step-by-step guides |
| Support ticket history | Common questions/answers |
| Salesforce Help articles | Platform-specific guides |
| Video transcripts | Tutorial content |
| Developer notes | Technical details |

**Recommended format for each topic:**

```markdown
## [Feature Name]

### Overview
Brief description of what this feature does and who uses it.

### How to Access
Navigation path in Salesforce/bpmPro.

### Step-by-Step Guide
1. First step
2. Second step
3. Third step

### Common Issues
- **Issue 1**: Solution
- **Issue 2**: Solution

### Tips
- Helpful tip 1
- Helpful tip 2

### Related Features
- Link to related topic
```

### Phase 3: Implement Dynamic Context

1. Update `/lib/claude.ts` to use the knowledge base
2. Test with various questions
3. Refine keyword matching
4. Add more topics based on actual user questions

---

## 5. Content Collection Template

Use this template to gather knowledge from your team:

```markdown
# bpmPro Knowledge Entry

**Feature/Topic:** ____________________
**Written By:** ____________________
**Date:** ____________________

## What is this feature?
[Brief description]

## Who uses it?
[Roles: Sales rep, Admin, Manager, etc.]

## How to access it
[Navigation: Tab → Button → etc.]

## Step-by-step instructions
1.
2.
3.

## Required fields
- Field 1: [description, valid values]
- Field 2: [description, valid values]

## Common questions
Q:
A:

Q:
A:

## Common errors and solutions
Error:
Solution:

## Tips and best practices
-
-

## Related features
-
```

---

## 6. Measuring Success

### Metrics to Track

| Metric | How to Measure |
|--------|----------------|
| **Resolution Rate** | % of chats that don't escalate to tickets |
| **User Satisfaction** | Add thumbs up/down to chat responses |
| **Topic Coverage** | % of questions AI can answer |
| **Escalation Reasons** | Why users still create tickets |

### Improvement Loop

1. Monitor chat transcripts (add logging)
2. Identify questions AI couldn't answer well
3. Add/improve knowledge for those topics
4. Re-test and measure improvement

---

## 7. Next Steps

### Immediate (This Week)
- [ ] Gather existing bpmPro documentation
- [ ] Create initial knowledge-base.ts with top 5 topics
- [ ] Update claude.ts to use dynamic context
- [ ] Test with common questions

### Short-term (This Month)
- [ ] Expand to 10-15 topics
- [ ] Add logging to track unanswered questions
- [ ] Refine keyword matching
- [ ] Add user feedback mechanism

### Long-term (Future)
- [ ] Consider RAG implementation for scale
- [ ] Add multi-language support
- [ ] Integrate with Salesforce Knowledge articles
- [ ] Add image/screenshot handling

---

## Appendix: Sample Knowledge Entry

```typescript
// Example topic in knowledge-base.ts

export const quotes = {
  keywords: [
    "quote", "quotes", "proposal", "proposals", "pricing",
    "estimate", "bid", "create quote", "new quote", "pdf"
  ],
  content: `
## Quotes & Proposals

### Overview
The Quotes module in bpmPro allows you to create professional proposals
for window and door projects. Quotes include product line items, pricing,
discounts, and can be converted to PDF for customer delivery.

### How to Create a New Quote

1. **Navigate to the Account or Opportunity**
   - Search for the customer in the global search
   - Or find them in the Accounts tab

2. **Click "New Quote"**
   - Located in the Quotes related list
   - Or use the Quick Action button

3. **Fill in Quote Details**
   - Quote Name: Auto-generated or custom
   - Close Date: When you expect to close
   - Contact: Primary contact for this quote
   - Description: Optional project notes

4. **Add Products**
   - Click "Add Products" button
   - Select from Product Catalog
   - Enter quantity and any overrides
   - Products pull pricing from Price Book

5. **Apply Discounts (Optional)**
   - Line item discounts: Edit each line
   - Quote-level discount: Use Discount field

6. **Generate PDF**
   - Click "Generate PDF" button
   - PDF uses your company's template
   - Includes logo, terms, line items

7. **Send to Customer**
   - Click "Email Quote" to send directly
   - Or download PDF and send manually

### Quote Statuses
- **Draft**: Being created/edited
- **Sent**: Delivered to customer
- **Accepted**: Customer approved (triggers next steps)
- **Rejected**: Customer declined

### Common Issues

**"Missing Price" Error**
- The product doesn't have a price in the active Price Book
- Solution: Go to Product record → Price Books → Add entry

**"Cannot Edit Quote"**
- Quote is locked after being Accepted
- Solution: Clone the quote to create a new editable version

**PDF Not Generating**
- Check that all required fields are filled
- Ensure PDF template is active
- Try refreshing the page and trying again

### Tips
- Use Quote Templates for common project types
- Preview PDF before sending to catch errors
- Add photos from the opportunity for visual proposals
  `
};
```

---

*Document created by Claude Code for xTriam AI Support Strategy*
