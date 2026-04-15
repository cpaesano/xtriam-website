# Proposal System — Go-Live Checklist

Use this checklist before sharing any new proposal link with a client.

## Firebase / Firestore

- [ ] **Firestore database created** in the Firebase project (not just the project itself)
- [ ] **Firestore Security Rules** are published and allow read/write for proposal viewers
- [ ] **Composite indexes** exist for all queries:
  - `proposal_comments`: `proposalCode` (asc) + `sectionId` (asc) + `createdAt` (asc) + `__name__` (asc)
- [ ] **Test a comment end-to-end**: log in as a viewer, post a comment, confirm it appears in real-time
- [ ] **Test with a second viewer**: confirm comments from one viewer are visible to another

## Proposal Configuration

- [ ] Proposal config added to `lib/proposal.ts` with correct `code`, `title`, `client`, and `date`
- [ ] All viewers defined with unique passcodes, correct roles (`client`, `owner`, `contributor`), and avatars
- [ ] Passcodes tested — each viewer can log in and reaches `/proposal/{code}/view`

## Authentication & Security

- [ ] JWT secret (`PROPOSAL_JWT_SECRET`) is set in Vercel environment variables
- [ ] Middleware protects `/proposal/{code}/view/*` routes — unauthenticated users are redirected
- [ ] Session API (`/api/proposal/session`) returns correct viewer info after login

## Content & Sections

- [ ] All proposal sections render correctly (no broken images, missing text, layout issues)
- [ ] Section IDs in components match what the comment system expects
- [ ] Mobile responsiveness — proposal reads well on phone/tablet (clients will check on mobile)

## Deployment

- [ ] All changes pushed to `main` and Vercel deployment is live
- [ ] Verify the live URL loads: `https://www.xtriam.com/proposal/{code}`
- [ ] Test the full flow on the live URL (not just localhost):
  1. Enter passcode
  2. Browse all sections
  3. Leave a comment
  4. Confirm comment persists after page refresh
  5. Confirm comment is visible to a different viewer

## Communication

- [ ] Client notified with the proposal URL and their passcode(s)
- [ ] Internal team (contributors) have their passcodes and know how to access

## Post-Launch Monitoring

- [ ] Check browser console for Firestore errors after first client visit
- [ ] Verify `proposal_views` collection is tracking section views
- [ ] Confirm Firestore usage stays within Spark (free) plan limits
