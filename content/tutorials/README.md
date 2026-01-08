# bpmPro Tutorials (Source of Truth)

This folder is the **single source of truth** for all bpmPro tutorials.

## Workflow

1. **Create tutorial in Scribe** with screenshots
2. **Export as Markdown** from Scribe
3. **Save the .md file** in this folder with a descriptive name (e.g., `adding-sales-person.md`)
4. **Run the processor**: `npm run process-tutorials`

The processor will:
- Generate a summary for the AI knowledge base
- Create a tutorial page at `/tutorials/[name]` on the website
- Update the tutorials index

## File Naming Convention

Use lowercase with hyphens:
- `adding-sales-person.md` (correct)
- `csv-import-feature.md` (correct)
- `Adding Sales Person.md` (incorrect)

## Adding Metadata (Optional)

You can add frontmatter to customize how the tutorial appears:

```
---
title: "Adding a New Sales Person"
category: "admin"
keywords:
  - sales person
  - employee
  - contact
---
```

If no frontmatter is provided, the processor will auto-generate from the content.

## Current Tutorials

| File | Title | Website URL |
|------|-------|-------------|
| (tutorials will be listed here after processing) |

## Notes

- Scribe-hosted images will work automatically
- The AI assistant will provide summaries with links to full tutorials
- Run `npm run process-tutorials` after adding/updating any tutorial
