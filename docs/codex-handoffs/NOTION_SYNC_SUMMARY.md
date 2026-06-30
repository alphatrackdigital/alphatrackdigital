# Notion Sync Summary

## 2026-06-30 Cookie Policy Resolution Proposal

- Cookie Policy content tightened to remove inactive provider references and keep internal implementation details (tag IDs, account IDs, audience sizes, QA history, Cookiebot) out of the public page.
- Lint and build both passed; no live dashboards or production settings were changed.
- Repo source: `docs/codex-handoffs/evidence/cookie-policy-resolution-2026-06-30/summary.md`.
- This is a sync proposal only. Notion was not updated directly.

## 2026-06-30 Google Ads Audience Source Proposal

- Google Ads website-visitor audience source already exists for AlphaTrack Digital, populated via the linked GA4 property (no separate Google Ads website tag needed or added).
- No GTM change, no GTM publish, no Google Ads campaign/conversion action/conversion tag/billing change.
- Repo source: `docs/codex-handoffs/evidence/google-ads-audience-source-setup-2026-06-30/summary.md`.
- This is a sync proposal only. Notion was not updated directly.

## 2026-06-30 Final Test-Ground QA Proposal

- Canonical Vercel test URL now passes Accept All, Reject All, Analytics-only, and Targeted Advertising-only consent states.
- GA4 virtual route page views, Meta PageView, Clarity analytics gating, and Google Ads Conversion Linker consent behavior are verified.
- Google Ads conversion tracking is deferred until Google Ads launch; no delivery or conversion tags are required now.
- GTM Version 9 remains published with a clean workspace; no GTM change or publish occurred in the final sprint.
- Three Clarity funnels were created without save failures. No private recordings were viewed.
- Existing lead-flow evidence was reused; no repeat forms, bookings, or webhooks were submitted.
- Production deployment remains conditional on the Cookie Policy implementation decision, any required Book-a-call CRM/webhook proof, and explicit Namecheap/cPanel approval.
- Repo source: `docs/codex-handoffs/evidence/final-test-ground-qa-2026-06-30/summary.md`.
- This is a sync proposal only. Notion was not updated directly.

Last updated: 2026-06-23.

Do not update Notion from this file without user approval. This is a review-ready sync proposal only.

## Project Updates To Add

- Repo handoff pack created under `docs/codex-handoffs/`.
- Current repo evidence shows Vite React, not Next.js.
- Latest confirmed repo work includes Brevo first/latest source lifecycle fields, Meta event ID/CAPI readiness, Brevo schema fixes, and source attribution.
- Vercel is the current development/testing environment for working site and server verification.
- Netlify is the future live deployment target after paid plan purchase, not the immediate blocker for current testing.
- Brevo transactional webhook should not be registered until deployed endpoint is verified.
- Brevo live workflow state now has a read-only UI finding: the visible lead-flow workflows appear active, including Tracking Audit Nurture. This should be logged as a risk/review item, not as launch approval.
- Contact Us QA now has redacted proof of Vercel frontend success plus read-only Brevo contact/list #8/CRM task/internal notification-log verification.
- Vercel hydration fix QA now has verified console evidence: deployed commit `6a623a1977d8cb34d891f7c073ac6871c5b03e07` shows no React `#418`/`#423`, no hydration errors, and no new application runtime errors on the checked test routes.
- Vercel GET-only final sanity QA now has redacted evidence for 11 key routes on `https://website-internal-test.vercel.app`: all returned `200`, rendered visible content, attempted no non-GET/HEAD requests, and showed no hydration-related errors.
- Remaining lead-flow QA now has redacted evidence: Tracking Audit frontend success and Brevo list/CRM/task/notification verification; Newsletter and Exit Popup controlled submissions with Brevo list/source verification; Book-a-call UI/iframe inspection without booking.

## SOPs To Create Or Update

| SOP | Change |
| --- | --- |
| Brevo CRM and List Routing SOP | Add first/latest source lifecycle fields and deployment dependency warning |
| Brevo Workflow QA SOP | Add suppression/blocklist retest requirements and "no activation without approval" rule |
| Website Lead Capture QA SOP | Add Contact Us, Tracking Audit, Newsletter, Exit Popup, and Brevo Meetings retest checklist |
| Meta/GA4 Conversion QA SOP | Add browser/server event ID matching checks |
| Agent Handoff SOP | Link repo handoff docs, the new `AI_AGENT_CONTINUITY_PROTOCOL.md`, and require secret redaction |

## Evidence Records To Create Or Update

- Git commit evidence for `a9cfce7`, `d3d2f51`, `c64e894`, `5299bcc`, `53e4490`, and `03470e5`.
- GitHub PR #24 evidence.
- GitHub issues #25-#29 as open launch/readiness tasks.
- Repo docs evidence: `brevo-campaign-ops-readiness.md`, `brevo-crm-handoff.md`, `brevo-website-alignment.md`, `brevo-qa-2026-06-14.md`.
- Netlify deploy blocker evidence from existing docs/Notion.
- ATD Agency OS initial build handoff evidence.

## Case-Study Notes To Add

- ATD internal MarTech setup demonstrates a multi-flow lead capture system: Contact Us, Strategy Call, Tracking Audit, Newsletter, Exit Popup.
- Implementation includes attribution capture, source lifecycle preservation, consent mapping, Brevo list segmentation, Meta CAPI/event dedupe, and GA4 Measurement Protocol for meetings.
- The case study should clearly separate "implemented in repo" from "verified live in production".
- The blocker narrative is useful: backend deploy readiness exists, but production validation is blocked by Netlify account credits.

## Decisions To Log

- Production frontend remains Namecheap/cPanel static hosting unless changed deliberately.
- `alphatra-serv.netlify.app` is the backend API service for public forms.
- Brevo visual CRM actions are plan-gated; API fallback is used.
- Do not use the previously flagged internal admin sender address.
- SMS remains deferred.
- Raw transcripts and secrets must stay out of Notion.

## Open Tasks To Create Or Update

1. Resolve Netlify account credit/plan blocker and deploy backend after approval.
2. Verify deployed backend commit and API endpoints.
3. Register Brevo transactional webhook only after endpoint verification.
4. Do not repeat Contact Us, Tracking Audit, Newsletter, or Exit Popup submissions unless a new controlled retest is explicitly approved.
5. Review Brevo workflow active state and suppression rules. Read-only UI shows Exit Popup Workflow, Newsletter Workflow, General Enquiry Workflow, Strategy Call Workflow, and Tracking Audit Nurture active; workflow internals were not opened or edited.
6. Verify Brevo contact attribute grouping and source lifecycle attributes through read-only UI.
7. Confirm Meta Events Manager deduplication for Lead/Subscribe events.
8. Confirm GA4 DebugView/Realtime and turn off debug mode after testing.
9. Review Brevo unsubscribe/profile pages and sender/domain compliance.
10. Build first-week launch monitoring report.
11. Review and approve this repo handoff pack before copying summaries into Notion.

## Items To Keep Only In Repo Docs

- Detailed file-level changelog.
- Local session IDs and filesystem paths.
- Environment variable inventories beyond high-level business purpose.
- Any operational troubleshooting that mentions local machine paths.

## Items Requiring Approval Before Notion Update

- Any creation/update of Agency OS pages, tasks, evidence records, SOPs, or comments.
- Any link to GitHub issues/PRs if the user wants private/internal cleanup first.
- Any statement that a Brevo workflow is live-ready. The current safe statement is only that the five visible lead-flow workflows appeared active in read-only UI; readiness, triggers, suppression, duplicate enrollment, and email-step correctness remain unverified.
- Any deployment or live QA claim.

## Evidence Archive Sync Proposal

Evidence records that should be added to Notion after approval:

- Repo handoff pack commit `decfa5b6bbc8fd276d4a343919c3c164fc5b5790`.
- `docs/codex-handoffs/EVIDENCE_ARCHIVE_INVENTORY.md` as the internal source of truth for evidence records.
- `docs/codex-handoffs/EVIDENCE_REVIEW_QUEUE.md` as the evidence review workflow.
- Historical Brevo QA note: `docs/brevo-qa-2026-06-14.md`, with clear caveat that live/current Vercel retest is still needed.
- Historical Brevo readiness docs: `docs/brevo-campaign-ops-readiness.md`, `docs/brevo-crm-handoff.md`, and `docs/brevo-website-alignment.md`.
- Vercel hydration fix console verification from 2026-06-23: checked `https://website-internal-test.vercel.app` routes `/`, `/contact-us`, `/contact-us/thank-you`, `/book-a-call`, `/offer/tracking-audit`, and `/newsletter/confirmed`; React `#418`/`#423` did not appear.
- Vercel GET-only final sanity verification from 2026-06-23: checked 11 key routes on `https://website-internal-test.vercel.app`; all returned `200`, rendered visible content, attempted no non-GET/HEAD requests, and showed no hydration-related errors.
- Remaining lead-flow QA evidence from 2026-06-23: Tracking Audit submitted once with frontend success and Brevo verification; Newsletter submitted once with Brevo verification; Exit Popup submitted once with Brevo verification; Book-a-call UI/iframe inspected without booking.
- Brevo read-only remaining-flow verification from 2026-06-23: list memberships `11`, `9`, and `10`; source history for Tracking Audit, Newsletter, and Exit Popup; Tracking Audit CRM deal/task; Tracking Audit and Newsletter notification delivery evidence; templates `19`-`30` present.

Evidence records that should remain repo-only:

- `docs/codex-handoffs/TECHNICAL_CHANGELOG.md`.
- `docs/codex-handoffs/SESSION_INDEX_SUMMARY.md`.
- Local session metadata references.
- Environment variable inventories beyond variable names and high-level purpose.
- Test source files and raw automation logs.

Evidence records requiring sensitive review:

- `test-results/brevo-account-audit-2026-06-15.json`.
- `test-results/brevo-playwright-storage-state.json`.
- `test-results/brevo-playwright-current.png`.
- `brevo-contacts-before-filter.png`.
- `.playwright-mcp/*`.
- `.tmp-audit/brand-guide-text.txt` and brand-guide page captures.
- Any screenshot that may show contact records, private UI state, auth/session state, or customer data.

Case-study evidence now available:

- Historical website page screenshots in root `tmp-*.png` files and `.tmp-audit/*.png`.
- Root service-page screenshots such as `conversion-tracking-review.png`, `paid-media-review.png`, and `paid-media-desktop.png`.
- Repo docs showing implementation of source lifecycle, consent mapping, Meta CAPI/event ID dedupe, GA4 Measurement Protocol, and Brevo lead flow mapping.
- Vercel frontend QA evidence showing the hydration fix resolved React `#418`/`#423` on checked test routes.
- Vercel GET-only final sanity evidence showing 11 key test routes render successfully without hydration-related errors.
- Remaining lead-flow QA evidence showing Contact Us, Tracking Audit, Newsletter, and Exit Popup now have redacted internal proof, with analytics and workflow claims still withheld.
- Git commit evidence for the implementation sequence.

Missing evidence needed before a client-safe case-study draft:

- Optional fresh Vercel screenshots for Newsletter and Exit Popup success states if needed; current saved DOM samples did not capture visible success text.
- Real Book-a-call booking/webhook evidence after a separately approved controlled booking test.
- Redacted Contact Us QA evidence is now available for frontend success and Brevo routing/CRM/notification-log verification. GA4/GTM/Meta remain missing.
- Current Meta Events Manager and GA4 DebugView/Realtimes screenshots after approved test events.
- Sanitized Brevo UI screenshots for attributes, lists, workflows, and suppression after explicit read-only approval. Workflow API endpoints were unavailable in the 2026-06-23 read-only API check.
- Future Netlify deployment evidence after paid plan purchase and approved live deployment.

Corrected deployment context for Notion:

- Vercel = current development/testing environment.
- Netlify = future live deployment target after paid plan purchase.
- Do not record Netlify as the current live blocker unless specifically referring to future live deployment readiness.

Contact Us evidence sync proposal:

- Add a redacted evidence record for the 2026-06-22 Contact Us controlled QA submission: Vercel frontend submission, redirect, and `Message Received!` visible success state.
- Add a redacted evidence record for the 2026-06-23 read-only Brevo verification: contact found, list `8` membership, expected source/service/consent/source lifecycle fields, CRM deal/task, and internal notification request/delivery log.
- Add a Vercel frontend QA evidence record for the 2026-06-23 hydration fix verification: deployed commit `6a623a1977d8cb34d891f7c073ac6871c5b03e07`, checked routes, no React `#418`/`#423`, no hydration errors, and no new application runtime errors.
- Add a Vercel GET-only final sanity evidence record for the 2026-06-23 route check: 11 key routes checked, all `200`, no non-GET/HEAD requests attempted, no `#418`, no `#423`, and no hydration-related errors.
- Keep QA identity, contact IDs, CRM IDs, recipient emails, internal record IDs, and transactional message IDs out of Notion.
- Add redacted remaining lead-flow QA records for Tracking Audit, Newsletter, Exit Popup, Book-a-call UI inspection, and Brevo read-only verification.
- Add a redacted workflow-risk record: Brevo Automations UI showed Exit Popup Workflow, Newsletter Workflow, General Enquiry Workflow, Strategy Call Workflow, and Tracking Audit Nurture active on 2026-06-23. Do not present this as approval or readiness; record it as a review item.
- Add a redacted Brevo workflow-detail risk record from 2026-06-24: Tracking Audit Nurture is active, starts from list `#11`, has five visible email steps with waits, no visible configured exit/suppression condition, and recent logs showed a redacted contact received the first nurture email and entered a wait step.
- Add a redacted pause-action record from 2026-06-24: user approved pausing only Tracking Audit Nurture; it was paused successfully; the other four visible lead-flow workflows remained active; active contacts still appeared in Tracking Audit Nurture after pause; user declined removing/stopping those active contacts.
- Do not claim GA4/GTM/Meta delivery, real booking behavior, workflow internals/suppression correctness, or human inbox review is verified.

## Hard Warning

Do not copy raw transcripts, secrets, token values, cookies, API keys, webhook secrets, auth headers, credential values, or secret URLs into Notion. Use business-readable summaries and safe proof links only.
