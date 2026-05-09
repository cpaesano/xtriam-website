# xTriam Website — Intake Log

> Lightweight catch-all for findings, gaps, and feature requests surfaced during use of www.xtriam.com (especially the Customer Support Portal). Triage when convenient.

## Open

| # | Item | Source / date | Notes | Triage |
|---|---|---|---|---|
| 1 | **bpmPro Assistant has no bpmPro-specific knowledge base** — falls back to "contact support" for basic Qs like "how to clone a sales document?" or "how to create a sales document?" | Carlos hit it 2026-05-09 while verifying the Anthropic key migration | The assistant uses Claude for response generation but doesn't have product docs / FAQs / how-to content embedded as retrieval context. Real customer-support gap that defeats the assistant's purpose. | **TODO** — requires a content + retrieval workstream. Options: (a) curate bpmPro FAQs into a markdown KB + retrieve via RAG; (b) embed bpmPro user manual into vector store; (c) add system prompt with explicit knowledge sections. Probably (a)+(b) combo. Estimated 1-2 days for first useful version. |

## Resolved

(none yet)
