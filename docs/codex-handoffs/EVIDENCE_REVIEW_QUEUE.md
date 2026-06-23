# Evidence Review Queue

Last updated: 2026-06-23.

This queue prioritizes evidence review without copying files, opening live tools, or updating Notion. Use it alongside `EVIDENCE_ARCHIVE_INVENTORY.md`.

## Priority 1 Evidence To Review Before Live QA

| Evidence | Why it matters | Next action |
| --- | --- | --- |
| `src/test/api-endpoints.test.ts` and `src/lib/apiEndpoints.ts` | Confirms Vercel-like testing hosts use same-origin API paths. | Rerun targeted tests if code changes; verify active Vercel test URL separately. |
| `test-results/brevo-browser-qa-20260615003058/*.png` | Historical form success screenshots for Contact, Tracking Audit, Newsletter, Exit Popup. | Human-review content; then retest same flows on current Vercel setup. |
| `test-results/brevo-browser-qa-book-call-20260615003058/book-a-call-page.png` | Historical Book A Free Strategy Call page evidence. | Human-review and retest on current Vercel setup. |
| `docs/brevo-qa-2026-06-14.md` | Records workflow QA passes and known failures. | Use as retest checklist; do not treat as current launch proof. |
| `docs/brevo-website-alignment.md` | Maps lead flows and attributes. | Verify against Vercel test submissions before live work. |
| `docs/codex-handoffs/WEBSITE_AND_TRACKING_STATE.md` | Current website/tracking state summary. | Keep updated with Vercel testing and future Netlify target context. |
| `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/*.png` | Current Vercel visual page-render evidence for key pages and legal routes. | Keep as internal visual QA evidence; do not treat as form, webhook, Brevo, Meta, or GA4 verification. |
| `docs/codex-handoffs/evidence/contact-us-form-test-2026-06-22/*` | Redacted evidence for one approved Contact Us frontend submission, redirect, and visible success state on the Vercel test URL. | Keep as partial internal QA evidence; Brevo/list #8/CRM/task/notification log has now been verified separately. |
| 2026-06-23 redacted Contact Us Brevo verification summary | Confirms Contact Us Brevo contact/list #8/source attributes/CRM deal/task/internal notification log for the existing QA submission. | Use as internal QA evidence and redacted Notion summary after commit; GA4/GTM/Meta and automations remain unverified. |
| 2026-06-23 Vercel hydration fix console verification | Confirms deployed commit `6a623a1977d8cb34d891f7c073ac6871c5b03e07` no longer shows React `#418`/`#423` or hydration errors on checked Vercel routes. | Use as internal frontend QA evidence; continue lead-flow QA one approved flow at a time. GA4/GTM/Meta remain unverified. |

## Priority 2 Evidence To Review Before Case-Study Drafting

| Evidence | Why it matters | Next action |
| --- | --- | --- |
| Root service-page review screenshots | Show visual evolution of paid media/conversion tracking pages. | Select only current/final screenshots; replace with fresh Vercel captures if needed. |
| Root `tmp-*.png` screenshot groups | Historical page iteration evidence. | Avoid bulk use; choose a small set after visual review. |
| `.tmp-audit/*.png` visual captures | May contain useful before/after page evidence. | Review for current relevance and privacy before reuse. |
| Homepage proof tests | Internal support for proof metrics rendering. | Pair with source-approved case-study claims before public use. |
| Public website visual assets | Useful for case-study visuals but not proof by themselves. | Use only with editorial approval and source context. |

## Priority 3 Evidence For Later Cleanup

| Evidence | Issue | Suggested action |
| --- | --- | --- |
| `.tmp-audit/pdfextract/` and `.tmp-audit/pdf-tools/` | Generated tooling/dependencies, not evidence. | Consider cleanup only after user approval. |
| `.playwright-mcp/*.log` and `.playwright-mcp/*.yml` | Browser automation logs can be large and sensitive. | Keep out of Notion; archive or clean only with approval. |
| Root `tmp-*.png` images | Many historical screenshots clutter root. | Later move curated safe files into a controlled evidence folder if approved. |
| `test-results/.last-run.json` | Test runner state, not narrative evidence. | Keep internal only. |
| Contact Us pre-fix React console evidence | The redacted Contact Us console summary captured `#418` and `#423` before the hydration fix. | Keep as historical pre-fix evidence; current Vercel hydration verification resolved `#418`/`#423` for checked routes. |

## Evidence Needing Screenshots Added

- Current Vercel visual screenshots now exist for homepage, Contact Us, Contact thank-you, Book A Free Strategy Call, booking thank-you, Tracking Audit, newsletter confirmed, Conversion Tracking service page, Privacy Policy, Cookie Policy, and Terms of Service.
- Current Vercel Contact Us frontend submission/redirect evidence now exists as redacted DOM/JSON evidence. No PNG screenshot was captured due to browser screenshot timeout.
- Current Vercel form submission success states after safe controlled test submissions for Tracking Audit, Newsletter, Exit Popup, and Strategy Call. Existing visual thank-you/confirmed screenshots do not prove submissions occurred.
- Current Meta Events Manager browser/server deduplication view after approved test events.
- Current GA4 DebugView/Realtime event views after approved test events.
- Current Brevo attribute grouping/source lifecycle UI after explicit read-only UI approval.
- Future Netlify deployed frontend and backend endpoint proof after paid plan purchase and approved deployment.

## Vercel Visual Screenshot Pass Notes

- Base URL captured: `https://website-internal-test.vercel.app`.
- Screenshot folder: `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/`.
- Browser rendering was used, while external GTM/GA/Meta-style requests and non-GET/HEAD requests were blocked during capture.
- This evidence proves only visual page rendering on the Vercel testing URL. It does not verify form submissions, Brevo routing, Meta events, GA4 events, or webhooks.
- Minor text/accessibility observation: styled headings may expose joined text in extracted text, such as `ThatMeasures` and `andStart`; review later during accessibility/content QA.

## Controlled Contact Us Form Test Notes

- Evidence folder: `docs/codex-handoffs/evidence/contact-us-form-test-2026-06-22/`.
- Verified: one approved Contact Us frontend submission on `https://website-internal-test.vercel.app`, redirect to `/contact-us/thank-you`, and visible success state `Message Received!`.
- Brevo read-only verification on 2026-06-23 confirmed contact/list #8/source attributes/CRM deal/task/internal notification log for the existing QA submission.
- Not verified: GA4/GTM/Meta delivery, automation/workflow behavior, or whether a team inbox user read the notification.
- No screenshot PNG was captured due to browser screenshot timeout; redacted DOM/result/console evidence exists.
- React console errors `#418` and `#423` were resolved for checked Vercel routes after deploying commit `6a623a1977d8cb34d891f7c073ac6871c5b03e07`; keep the redacted console file as historical pre-fix evidence.

## Vercel Hydration Fix Verification Notes

- Verification type: Vercel console verification / frontend rendering QA.
- Base URL checked: `https://website-internal-test.vercel.app`.
- Deployed commit verified: `6a623a1977d8cb34d891f7c073ac6871c5b03e07`.
- Routes checked: `/`, `/contact-us`, `/contact-us/thank-you`, `/book-a-call`, `/offer/tracking-audit`, and `/newsletter/confirmed`.
- Verified: React `#418` did not appear, React `#423` did not appear, hydration errors were not found, new application runtime errors were not found, and `#root data-prerendered` was `false` on all checked routes.
- Expected blocked external request warnings came from QA blocking rules and included `www.googletagmanager.com`, `fonts.googleapis.com`, `cdn.gpteng.co`, `images.unsplash.com`, and `meet.brevo.com` on `/book-a-call`.
- Not verified by this pass: GA4/GTM/Meta delivery, form submissions, webhooks, Brevo routing, Brevo automations/workflows, or human inbox review.

## Contact Us Brevo Verification Notes

- Verification type: read-only Brevo verification, CRM verification, and transactional log verification.
- Verified: QA contact exists in Brevo, list `8` membership exists, expected source/lead source/service interest/consent/source lifecycle/timestamp fields were present, CRM deal exists, CRM task exists, and internal notification log had expected subject/tag plus request and delivered events.
- Missing: no CRM note was found. Decide later whether CRM notes are required; do not treat as a blocker unless approved SOP requires it.
- Not verified: GA4/GTM/Meta delivery, automation/workflow behavior, or human inbox review.
- Redaction: keep QA identity, contact IDs, CRM IDs, recipient emails, internal record IDs, and transactional message IDs out of repo docs and Notion.

## Evidence Needing Live Retest

- Contact Us remaining external checks after approved Vercel submission: GA4/GTM/Meta delivery, automation/workflow behavior, and human inbox review. Brevo contact/list #8/CRM deal/task/internal notification log have been verified read-only.
- React `#418`/`#423` hydration errors are resolved for the checked Vercel routes on deployed commit `6a623a1977d8cb34d891f7c073ac6871c5b03e07`; monitor after future frontend deployments.
- Contact Us screenshot capture should be retried only if needed; current redacted DOM evidence exists but no PNG was captured.
- Contact Us form submission itself should not be repeated unless the user explicitly approves another controlled test.
- Tracking Audit form submission on the active Vercel testing setup.
- Newsletter subscription behavior on the active Vercel testing setup.
- Exit popup submission on the active Vercel testing setup.
- Brevo Meetings booking webhook behavior after the active server target is confirmed.
- Meta CAPI/browser deduplication for `Lead` and `Subscribe`.
- GA4 Measurement Protocol meeting event behavior.
- Brevo workflow suppression for test and sales-converted contacts.

## Evidence To Keep Out Of Notion

- `test-results/brevo-playwright-storage-state.json`
- `test-results/brevo-account-audit-2026-06-15.json` until reviewed/redacted
- `test-results/brevo-playwright-current.png`
- `brevo-contacts-before-filter.png`
- `.playwright-mcp/*`
- Raw Codex session JSONL files
- Local credential paths, browser storage state, auth/session files, and raw logs

## Evidence That Can Later Support The ATD Internal Case Study

- Sanitized Vercel testing screenshots showing visual page rendering for lead-flow and legal pages.
- Redacted Contact Us frontend submission/redirect evidence from 2026-06-22 plus redacted Brevo contact/list/CRM/task/notification-log verification from 2026-06-23. GA4/GTM/Meta proof still needs separate approval.
- Vercel hydration fix console verification from 2026-06-23 proving React `#418`/`#423` are resolved on checked test routes.
- Sanitized before/after website page screenshots from curated root or `.tmp-audit` assets.
- Repo docs proving source lifecycle, consent mapping, and tracking implementation.
- Git commits proving Meta CAPI/event ID and Brevo source lifecycle work.
- Historical Brevo QA docs with explicit caveats.
- Future Netlify live deployment proof after paid plan purchase and approved launch.

## Future Evidence Handling Rules

1. Future agents should not re-scan the entire repo, all Codex sessions, or all evidence folders unless the user explicitly asks.
2. Future agents should first read:
   - `docs/codex-handoffs/EVIDENCE_ARCHIVE_INVENTORY.md`
   - `docs/codex-handoffs/EVIDENCE_REVIEW_QUEUE.md`
   - `docs/codex-handoffs/OPEN_ITEMS_FOR_NEXT_AGENT.md`
3. Future agents should only add new evidence that is newly created, newly verified, newly uploaded by the user, newly linked from GitHub/Notion, or directly relevant to the current task.
4. Do not duplicate existing screenshots, PDFs, Looms, QA notes, or evidence files.
5. Before adding any new evidence file, check whether an inventory record already exists.
6. If an evidence file already exists, update its status or notes instead of creating a duplicate.
7. Prefer linking or referencing large files instead of copying them into the repo.
8. Only copy small, safe, non-sensitive evidence files into the repo when they are clearly useful for QA, case-study proof, or future handoff.
9. Never copy files that may contain secrets, contact data, API keys, tokens, auth headers, cookies, email lists, private customer details, or credential values.
10. If unsure whether a file is safe, mark it as `Sensitive Review Required` and do not copy it.
11. Store evidence files only in a clearly named future folder if needed, such as `docs/codex-handoffs/evidence/`.
12. Use consistent file names: `YYYY-MM-DD_area_platform_short-description.ext`. Example: `2026-06-17_brevo_attribute-grouping-ui.png`.
13. Each copied evidence file must have a matching row in `EVIDENCE_ARCHIVE_INVENTORY.md`.
14. Each evidence record should state what it proves, where it came from, whether it is verified, whether it is safe for Notion, whether it is safe for client-facing case studies, and the next action.

## Usage and Limit Control Rules

1. Avoid broad searches unless necessary.
2. Do not repeatedly re-read large files or long session transcripts.
3. Start with existing handoff docs before inspecting old sessions.
4. Use targeted searches for specific terms instead of scanning everything.
5. Stop and ask the user before doing high-token work such as reviewing all Codex sessions again, opening many screenshots, summarizing large transcripts, scanning the whole repo repeatedly, or generating large evidence reports.
6. When working on mobile or low-usage conditions, prioritize the current blocker, latest changed files, existing handoff docs, and user-provided evidence.
7. Keep outputs concise unless the user asks for a full report.
8. For future sessions, add an `Evidence Update Log` section instead of rebuilding the entire archive.
9. Future evidence updates should follow this lightweight flow: read inventory, check if evidence already exists, add or update only relevant records, summarize changes, and ask before commit/push.
10. If the task risks heavy usage, pause and ask: "Should I do a quick targeted evidence update or a full evidence archive scan?"

## Evidence Update Log

| Date | Update | Files changed |
| --- | --- | --- |
| 2026-06-18 | Initial evidence review queue created. No screenshots or evidence files were copied. | `EVIDENCE_REVIEW_QUEUE.md` |
| 2026-06-19 | Added Vercel visual screenshot pass to review queue. Screenshots are visual-render evidence only; no forms, POST/webhook requests, or live-service changes were made. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md` |
| 2026-06-22 | Added controlled Contact Us form-test evidence to review queue. Evidence verifies frontend submission, redirect, and visible success state only; Brevo, CRM, notifications, Meta, and GA4 remain unverified. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md` |
| 2026-06-23 | Added redacted Brevo read-only verification summary for the existing Contact Us QA submission. Brevo contact/list #8/source attributes/CRM deal/task/internal notification log verified; GA4/GTM/Meta and automations remain unverified. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `NOTION_SYNC_SUMMARY.md` |
| 2026-06-23 | Added Vercel hydration fix console verification. Deployed commit `6a623a1977d8cb34d891f7c073ac6871c5b03e07` was verified on the working Vercel test URL; React `#418`/`#423`, hydration errors, and new app runtime errors were absent on checked routes. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `NOTION_SYNC_SUMMARY.md` |
