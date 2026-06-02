# xTriam Support Email Conventions

**Single source of truth** for how the xTriam Support Team writes emails to clients (bug resolutions, ticket responses, feature confirmations, investigation updates).

Any AI agent, human team member, or automation that drafts a support email on behalf of xTriam must follow this document. When conventions here change, every project and agent that references this file picks up the change automatically — do not duplicate this content elsewhere.

Applies to support correspondence across every xTriam product: bpmPro, InvoiceTicket, BluFound, Volunteers for Seniors, PlaxoHub, PicBuh, and future apps.

---

## 1. When to use the support voice vs. Carlos personally

| Context | Voice | Signature |
|---|---|---|
| Bug-fix notification, ticket response, technical explanation, resolution confirmation, investigation update | **Support team** | Team signature (§2) |
| Sales conversation, pricing, contract, one-on-one client relationship Carlos is personally driving, strategic discussion | **Carlos personally** | Personal signature (see `/Users/cpaesano/.claude/projects/*/memory/feedback_email_signature_format.md`) |

If the email is responding to a support ticket or explaining a fix, it is **always** the support voice. When in doubt, default to support.

---

## 2. Signature block

Two blank lines between the closing ("Best regards," or "Best,") and the signature. No personal phone number. No individual names. The team is the author.

```
Best regards,


xTriam Support Team
support@xtriam.com
https://www.xtriam.com/support
AI-powered customer support, tutorials, and support tickets
```

The tagline is fixed. Do not paraphrase it.

---

## 3. Structural template

### For a single-item email

```
Dear <Name>,

<One-sentence acknowledgement of what they reported.>

WHAT WAS REPORTED:
<Plain-language restatement of the issue from the client's perspective, no jargon they did not use.>

WHAT WE DID:   (or WHAT WE ARE DOING:  if in progress)
<What we changed, in language the client can follow. Name the root cause when it helps them trust the fix.>

RESULT:   (omit if in progress, include an ETA section instead)
<What they should observe now. Do they need to do anything? If not, say "No action is needed on your end.">

<Optional: a "one note" caveat if there's a nuance they should know.>

If you run into anything else, just let us know.

Best regards,


xTriam Support Team
support@xtriam.com
https://www.xtriam.com/support
AI-powered customer support, tutorials, and support tickets
```

### For a multi-item email (multiple tickets in one reply)

Use numbered `ITEM N` headings and repeat the WHAT WAS REPORTED / WHAT WE DID / RESULT block for each. End with a single combined closing line and one signature. Example: `/Users/cpaesano/Projects/xtriam/bpmpro-package/docs/clients/fspu/support-tickets/2026-04-21_EMAIL_TO_JASON.md`.

### For an in-progress update

Replace `WHAT WE DID` with `WHAT WE ARE DOING` and `RESULT` with an explicit ETA. Always close the loop: tell the client you will follow up when it's live.

---

## 4. Tone rules

- **No markdown syntax.** This is the single most-violated rule. Our workflow copies markdown content directly into Outlook/Gmail. Outlook does not render markdown, so every `**bold**` becomes literal asterisks in front of the client. Specifically:
  - No `**bold**` — use UPPERCASE for emphasis.
  - No `#`, `##`, `###` headings — use UPPERCASE section titles with blank lines above and below.
  - No `*italic*` or `_italic_`.
  - Tables (`|...|`) and bullet dashes (`-`) are acceptable unless flagged.
  - Apply the rule globally across the whole document on first mention. "Remove the asterisks" means everywhere, not only the spot the user pointed at.
- **No em dashes.** Use commas, periods, or parentheses. Em dashes read as AI-generated and as informal.
- **No exclamation marks.** Even good news is delivered calmly.
- **No marketing language.** "We are excited," "we are thrilled," "robust," "seamless," "leverage," "synergy" — banned.
- **Match the client's vocabulary.** If they said "the report," do not reply with "the custom analytics dashboard." If they said "the CSV," do not reply "the data ingestion pipeline."
- **Explain the root cause in plain language when it builds trust.** Clients tolerate bugs much better when they understand what caused them and believe we understand too.
- **End with a clean off-ramp.** "If you run into anything else, just let us know." Not a sales pitch, not a plea for feedback.
- **Date format in body text:** month spelled or abbreviated (e.g., "December 2025," "Apr 21, 2026"). ISO `YYYY-MM-DD` only in filenames and metadata.

---

## 5. Subject lines

Format: `<Product or Feature>: <Short outcome>`

Examples:
- `Linea Rossa CSV Import: Issue Resolved`
- `Report Access for Marc DeCarlo: Fixed`
- `Sales Cycle Duration Report: Update`
- `iPad Display on Manage Items: Fixed`

Keep under ~60 characters. Lead with the product or feature name so the client can scan their inbox. Use a colon (not an em dash) as the separator — see §4.

---

## 6. File layout convention

Every support email draft lives in a markdown file under the relevant project's client folder:

```
<project>/docs/clients/<client-alias>/support-tickets/YYYY-MM-DD_EMAIL_TO_<RECIPIENT>_<TOPIC>.md
```

The first two lines of the file are the email's `To` and `Subject`:

```markdown
**To:** recipient@example.com
**Subject:** <subject line>

---

<email body>
```

Reason: the author copies from the markdown file (IDE preview) into Outlook/Gmail. Terminal output introduces formatting artifacts. Never paste from terminal.

---

## 7. Examples in the repo

- Multi-item: `bpmpro-package/docs/clients/fspu/support-tickets/2026-04-21_EMAIL_TO_JASON.md`
- Single-item: `bpmpro-package/docs/clients/hurricanewindow/2026-04-22_EMAIL_TO_DAIMA_LINEA_ROSSA_FIX.md`

When adding a new example, pick one that illustrates a convention not already covered (in-progress update, multi-stakeholder reply, escalation, etc.).
