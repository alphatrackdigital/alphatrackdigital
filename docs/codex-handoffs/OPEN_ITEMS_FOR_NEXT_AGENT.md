# Open Items For Next Agent

Last updated: 2026-06-22.

## Current Deployment Context

- Vercel is the current development/testing environment for working site and server verification.
- Netlify is the future live deployment target after ATD purchases/subscribes to the paid Netlify plan.
- Working updates should later be mirrored to Netlify and deployed live only after the paid Netlify plan is ready and the user explicitly approves deployment.
- Do not treat Netlify paid deployment as the immediate blocker for current testing. The next safe technical step is Vercel development/server verification unless the user explicitly decides to handle Netlify subscription and deployment readiness first.

## Priority 1: Urgent Blockers

| Item | Next step | Verify before live changes |
| --- | --- | --- |
| Vercel development/server verification pending | Verify current Vercel test deployment and same-origin API behavior only after user approves testing | Current branch, deployed commit, Vercel test URL, env variable names only |
| Contact Us external effects not verified | Use read-only checks only after approval to verify the existing 2026-06-22 QA submission in Brevo/list #8/CRM/notifications and analytics tools | Do not repeat the Contact Us submission unless explicitly approved |
| Latest backend/form behavior not fully current-test validated | Run safe Vercel checks before any live or Netlify claim | Safe non-POST checks first; controlled test submissions only with approval |
| Contact Us React console errors observed | Reproduce and scope minified React errors `#418` and `#423` from the redacted console summary | Treat as QA follow-up, not confirmed launch blocker yet |
| Brevo transactional webhook not live | Register only after the final live endpoint returns expected auth behavior | `BREVO_TRANSACTIONAL_WEBHOOK_SECRET` set by name only, endpoint not `404` |
| Brevo Meetings validation pending | Test controlled booking only after active test/live server target is confirmed and approved | Webhook secret and endpoint configured by name only |
| Suppression/blocklist uncertainty | Run controlled QA before live campaign traffic | Lists #13/#14 and workflow exclusions |
| Netlify future deployment readiness | Keep as future live-deployment item until paid plan purchase | Paid Netlify plan, mirrored updates, approved deploy path |

## Priority 2: Important Cleanup

- Verify Brevo source lifecycle custom attributes exist and have correct types.
- Verify contact attribute grouping in Brevo UI without deleting or renaming attributes.
- Confirm newsletter internal notification routing uses `marketing@alphatrack.digital` where approved.
- Confirm profile update and unsubscribe pages are acceptable for launch.
- Confirm `GA4_MEASUREMENT_PROTOCOL_DEBUG_MODE=false` and Meta test-event code disabled outside tests.
- Confirm `SERVICE_INTEREST` and `MONTHLY_BUDGET` schema fixes are deployed.
- Review `EVIDENCE_ARCHIVE_INVENTORY.md` and `EVIDENCE_REVIEW_QUEUE.md` before adding new proof records.
- Add or review evidence records for `docs/codex-handoffs/evidence/contact-us-form-test-2026-06-22/`; keep QA identity details redacted.
- Update Notion only after reviewing `NOTION_SYNC_SUMMARY.md`.

## Priority 3: Nice-To-Have Improvements

- Add a small launch monitoring dashboard or daily report template.
- Add a nonsecret environment variable inventory page to repo docs.
- Add a clear "production deployment status" section to `README.md`.
- Consider consolidating older Brevo docs once this handoff pack is accepted.
- Add a scripted safe health check for deployed API paths without sending leads.
- Add an `Evidence Update Log` entry when new evidence is created or verified.

## Exact Next Steps

1. Read `ATD_MASTER_CODEX_WORKLOG.md`, `BREVO_CURRENT_STATE.md`, and `TECHNICAL_CHANGELOG.md`.
2. Read `EVIDENCE_ARCHIVE_INVENTORY.md` and `EVIDENCE_REVIEW_QUEUE.md`.
3. Run `git status`.
4. Confirm whether the user wants Vercel development/server checks, evidence review, live connector/UI checks, or repo-only work.
5. If live checks are approved, inspect Vercel/Brevo/Netlify read-only first and avoid mutations.
6. Do not activate, send, deploy, commit, push, or update Notion without explicit approval.
7. If Vercel testing is approved, verify env variable names only; never print values.
8. After any approved deploy in the future, run controlled endpoint checks before test submissions.
9. After test submissions, record evidence in repo docs first.
10. Prepare a Notion sync proposal; wait for approval before updating Notion.

## What To Verify Before Any Live Change

- The exact target account/workspace/site.
- The exact workflow/template/list/contact/attribute ID.
- The current active/inactive state.
- The rollback or stop condition.
- Whether the action can send email or mutate contacts.
- Whether any secret value would be exposed in logs or docs.

## Warnings

- Do not use the available Brevo DOI contact-creation tool for inspection; it can send a confirmation email.
- Do not treat Codex transcripts as documentation source text; summarize only safe metadata and verified outcomes.
- Do not rely on repo implementation as production behavior until deployed commit is verified.
- Do not assume the prompt's Next.js note is correct; repo evidence shows Vite React.
- Do not rebuild the evidence archive from scratch unless the user explicitly asks; update only relevant records.

## Evidence Archive Status

- Initial evidence archive inventory completed on 2026-06-18.
- Initial evidence review queue completed on 2026-06-18.
- Vercel visual screenshot evidence was added on 2026-06-19.
- Controlled Contact Us redacted form-test evidence was added on 2026-06-22.
- Contact Us evidence verifies frontend submission, redirect, and visible success state only; Brevo, CRM, notification, Meta, and GA4 remain unverified.
- Future evidence updates should be incremental and should add an `Evidence Update Log` entry.

## Suggested Prompt For Next Session

```text
Continue the AlphaTrack Digital / ATD MarTech handoff from repo docs under docs/codex-handoffs/. Start by reading ATD_MASTER_CODEX_WORKLOG.md, BREVO_CURRENT_STATE.md, TECHNICAL_CHANGELOG.md, WEBSITE_AND_TRACKING_STATE.md, EVIDENCE_ARCHIVE_INVENTORY.md, EVIDENCE_REVIEW_QUEUE.md, and OPEN_ITEMS_FOR_NEXT_AGENT.md. Do not make live changes unless I explicitly approve. Verify current git status, then help me decide the next safe step for Vercel development/server verification, evidence review, Brevo QA, Meta/GA4 verification, future Netlify readiness, or Notion sync. Never expose secrets or copy raw transcripts.
```
