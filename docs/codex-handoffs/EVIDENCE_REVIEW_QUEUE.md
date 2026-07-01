# Evidence Review Queue

Last updated: 2026-07-01.

## 2026-07-01 Form/Widget/Popup Fix

| Evidence | Status | Next action |
| --- | --- | --- |
| `docs/codex-handoffs/evidence/form-widget-popup-fix-2026-06-30/summary.md` | Form failures fixed (Vercel Preview env var scope), Brevo widget consent-gating fixed, exit-popup/Ketch-modal conflict fixed. Lint/build/tests passed; canonical alias redeployed. | Repeat full production consent QA and Book-a-call CRM/webhook proof decision before Namecheap/cPanel approval. |

## 2026-06-30 Cookie Policy Resolution

| Evidence | Status | Next action |
| --- | --- | --- |
| `docs/codex-handoffs/evidence/cookie-policy-resolution-2026-06-30/summary.md` | Cookie Policy Section 4/5 tightened; lint/build passed; no live dashboards changed. Content blocker cleared. | Resolve remaining Namecheap/cPanel gates: Book-a-call CRM/webhook decision, explicit deployment approval, full production consent QA. |

## 2026-06-30 Google Ads Audience Source Check

| Evidence | Status | Next action |
| --- | --- | --- |
| `docs/codex-handoffs/evidence/google-ads-audience-source-setup-2026-06-30/summary.md` | Google Ads website-visitor audience source confirmed already live via linked GA4 property; no GTM change made (owner-approved no-op). | Revisit audience size after traffic accumulates; resolve account payment-method warning before any future campaign launch. |

## 2026-06-30 Test-Ground Follow-Up

| Evidence | Status | Next action |
| --- | --- | --- |
| `docs/codex-handoffs/evidence/final-test-ground-qa-2026-06-30/summary.md` | Final consent/GA4/Meta/Clarity/Conversion Linker test-ground QA passed; production readiness is conditional. | Obtain Cookie Policy implementation decision, decide whether Book-a-call CRM/webhook proof is a launch gate, then request explicit Namecheap/cPanel approval. |
| `docs/codex-handoffs/evidence/tag-assistant-consent-proof-2026-06-30/summary.md` | Accept All manual Consent Mode proof complete. | Retain as launch evidence; repeat on production only after an approved deploy. |
| `docs/codex-handoffs/evidence/clarity-funnels-setup-2026-06-30/summary.md` | Three funnels created without save failures. | Validate with production traffic later; defer Smart Events, masking review, and AI Visibility review. |
| `docs/codex-handoffs/evidence/test-ground-deployment-consent-retest-2026-06-30/summary.md` | Canonical test alias now serves clean `main` at `470696b`; deployed HTML contains the real gtag consent update; Accept All loaded GTM and Clarity. | Run owner/manual Tag Assistant on the canonical alias to confirm actual ad-consent registry values and tag firing. |
| `docs/codex-handoffs/evidence/gtm-ga4-meta-ads-diagnostic-2026-06-30/summary.md` | GTM/Clarity release verified. Meta is likely trigger-context related; Ads delivery tags are absent beyond Conversion Linker; GA4 remains unresolved because Tag Assistant reported not connected. | Owner/manual read-only Tag Assistant review of GA4 trigger, exception, consent, and measurement-variable resolution. Review allowed-hostname logic separately before proposing changes. |
| `docs/codex-handoffs/evidence/clarity-test-ground-qa-2026-06-30/summary.md` | Ketch/GTM/Clarity consent-gating passed. GA4, Meta, Google Ads, and DoubleClick proof remains open because no requests fired even on Accept All. | Use read-only GTM Preview and tag-firing inspection to determine the root cause. Do not change tags, triggers, variables, consent settings, or workspace configuration. |

Cookie Policy workaround approval remains pending. Book-a-call CRM/webhook proof remains incomplete. Namecheap/cPanel deployment is not approved and was not performed.

## Current Release Status

GTM Version 9 is published and release commit `c0f63437d9ba8d36be9dea3c7b8747a6d9275ba8` is on `main`. The cPanel deployment package is prepared for manual deployment by the dev guy. Production deployment, the owner-run six-scenario matrix, and stakeholder/legal approval of the Cookie Policy workaround remain pending. Historical screenshots and raw intermediate QA captures were archived outside the repository on 2026-06-29.

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
| `docs/codex-handoffs/evidence/vercel-get-sanity-2026-06-23/2026-06-23_vercel_get_sanity_redacted-summary.json` | Confirms 11 key Vercel routes returned `200`, rendered visible content, attempted no non-GET/HEAD requests, and showed no `#418`, `#423`, or hydration-related errors. | Keep as internal GET-only Vercel evidence. Does not prove form submissions, Brevo routing, analytics delivery, webhooks, or workflow behavior. |
| 2026-06-23 remaining lead-flow QA evidence | Tracks remaining lead-flow GET check, one Tracking Audit submission, one Newsletter submission, one Exit Popup submission, Book-a-call UI inspection, and read-only Brevo verification. | Use as current internal QA evidence. GA4/GTM/Meta, workflow UI state, and real booking behavior remain unverified. |
| `docs/codex-handoffs/evidence/brevo-readonly-remaining-flow-verification-2026-06-23/*` | Confirms Brevo contact/list/source-history routing for lists `11`, `9`, and `10`, Tracking Audit CRM deal/task, Tracking Audit and Newsletter notification delivery evidence, and templates `19`-`30`. | Use as redacted Brevo proof. Do not expose QA identity or internal IDs. Workflow active/inactive state still needs read-only UI verification. |
| `docs/codex-handoffs/KETCH_REMEDIATION_PREVIEW_QA_2026-06-24.md` and `docs/codex-handoffs/evidence/ketch-remediation-preview-qa-2026-06-24/*` | Current Ketch remediation evidence proves the Brevo Conversations repo gate and documents the remaining Ketch/GTM blockers. | Use before any Ketch/GTM/Clarity action. Do not deploy production, publish GTM, or install Clarity until repeat QA passes. |
| `docs/codex-handoffs/KETCH_GTM_STRICT_PREVIEW_QA_2026-06-24.md` and `docs/codex-handoffs/evidence/ketch-gtm-strict-preview-qa-2026-06-24/*` | Current strict preview evidence proves GTM and GTM-managed non-essential tags are blocked until optional Consent Mode grants. | Use as the latest Ketch repo-side QA record. Ketch/GTM dashboard remediation is still required before production. |

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
- Current Vercel Tracking Audit frontend success evidence exists. Newsletter and Exit Popup have controlled submission evidence plus Brevo verification, but the saved DOM samples did not capture visible success text; capture fresh screenshots only if the user approves retesting or a non-submitting UI check can prove state.
- Strategy Call booking success evidence now exists as redacted JSON/DOM-derived summary; no screenshot was saved because confirmation contained private meeting details.
- Current Meta Events Manager browser/server deduplication view after approved test events.
- GA4 Realtime event evidence exists for recent booking-related events, but event parameter quality and PII exclusion still need review.
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

## Vercel GET-Only Final Sanity Check Notes

- Evidence file: `docs/codex-handoffs/evidence/vercel-get-sanity-2026-06-23/2026-06-23_vercel_get_sanity_redacted-summary.json`.
- Base URL checked: `https://website-internal-test.vercel.app`.
- Routes checked: `/`, `/contact-us`, `/contact-us/thank-you`, `/book-a-call`, `/book-a-call/thank-you`, `/offer/tracking-audit`, `/newsletter/confirmed`, `/service/conversion-tracking`, `/privacy-policy`, `/cookie-policy`, and `/terms-of-service`.
- Verified: all 11 routes returned `200`, rendered visible body content, attempted no non-GET/HEAD requests, and showed no `#418`, no `#423`, and no hydration-related console/page errors.
- Expected console errors were caused by third-party request blocking during QA, including GTM, fonts, images, GPT Engineer asset, and the Brevo meeting iframe.
- No forms were submitted, no submit buttons were clicked, no POST/PUT/PATCH/DELETE requests were sent, no webhook tests were run, and no live service settings were changed.
- Remaining controlled lead-flow submissions were not run because the prior QA identity is redacted in local evidence and cannot be recovered safely.

## Remaining Lead-Flow QA Notes

- Evidence folders:
  - `docs/codex-handoffs/evidence/remaining-lead-flow-qa-2026-06-23/`
  - `docs/codex-handoffs/evidence/tracking-audit-form-test-2026-06-23/`
  - `docs/codex-handoffs/evidence/newsletter-form-test-2026-06-23/`
  - `docs/codex-handoffs/evidence/exit-popup-form-test-2026-06-23/`
  - `docs/codex-handoffs/evidence/book-a-call-ui-check-2026-06-23/`
  - `docs/codex-handoffs/evidence/brevo-readonly-remaining-flow-verification-2026-06-23/`
- GET-only sanity recheck: all 11 key routes returned `200`, rendered visible content, attempted no non-GET/HEAD requests, and showed no `#418`, no `#423`, and no hydration-related errors.
- Tracking Audit: submitted once; frontend evidence captured visible success text `Request received`; Brevo read-only verification confirmed list `11`, source history, CRM deal/task, and internal notification delivery evidence.
- Newsletter: submitted once through the footer opt-in flow; frontend DOM sample did not capture visible success/confirmation text; Brevo read-only verification confirmed list `9`, source history, and internal notification delivery evidence.
- Exit Popup: submitted once after triggering popup on `/service/conversion-tracking`; frontend DOM sample did not capture visible success text; Brevo read-only verification confirmed list `10` and source history.
- Book-a-call: page inspected only; Brevo Meetings iframe was present; no meeting was booked and no webhook test was sent.
- Templates `19`-`30` were present through read-only Brevo API template check. Template content was not downloaded or stored.
- Brevo workflow API endpoints returned unavailable, but read-only Brevo Automations UI verification on 2026-06-23 showed five visible lead-flow workflow rows as active: Exit Popup Workflow, Newsletter Workflow, General Enquiry Workflow, Strategy Call Workflow, and Tracking Audit Nurture. This is a launch-readiness risk because earlier handoff notes expected Tracking Audit Nurture to remain inactive until approved.
- GA4/GTM/Meta read-only event delivery remains unverified. Meta Events Manager was accessible in the ATD Chrome context, but event-row extraction did not produce usable Lead/Subscribe/browser-server deduplication evidence. GA4/GTM event evidence was not verified.

## Brevo Workflow Detail Review Notes

- Review date: 2026-06-24.
- Review type: read-only Brevo workflow detail, settings, activity, workflow logs, and active contacts inspection.
- Workflows reviewed: Tracking Audit Nurture, General Enquiry Workflow, Newsletter Workflow, Exit Popup Workflow, and Strategy Call Workflow.
- All five visible lead-flow workflows were active.
- Tracking Audit Nurture:
  - Trigger visible: contact added to list `Tracking Audit Leads - #11`.
  - Visible sequence: email `Your tracking audit request - next steps`, wait `1 day`, email `3 tracking issues that usually hide wasted spend`, wait `2 days`, email `Why attribution breaks before the campaign does`, wait `2 days`, email `Ready to review your tracking setup?`, wait `2 days`, email `Last reminder: send over your tracking details`, exit.
  - Template IDs were not visible without opening edit panels. Templates `19`-`23` were previously verified as present, but this pass did not prove the workflow uses those exact template IDs.
  - Contact re-entry after exit appeared unchecked in sampled settings controls.
  - No configured exit/suppression condition was visible; only `Add exit condition` was visible.
  - Logs showed a recent redacted contact added to list `#11`, first workflow email sent, and a `1 Day(s)` wait entered.
  - Active contacts view showed one redacted contact in Tracking Audit Nurture at step 3 and one redacted contact in Tracking Audit Nurture at step 9.
- General Enquiry Workflow:
  - Trigger visible: contact added to list `Website - Contact Form Enquiries - #8`.
  - Visible sequence: email `Thanks for contacting AlphaTrack Digital`, wait `2 days`, email `Can we point you to the right next step?`, exit.
  - Logs showed a redacted Contact Us contact added to list `#8`, first workflow email sent, and a `2 Day(s)` wait entered.
  - Active contacts view showed one redacted contact in General Enquiry Workflow at step 3.
- Newsletter Workflow:
  - Trigger visible: contact added to list `ATD | Newsletter - #9`.
  - Visible sequence: email `Welcome to AlphaTrack Digital`, exit.
  - Logs showed a redacted Newsletter contact added to list `#9`, welcome email sent, and the contact exited workflow.
- Exit Popup Workflow:
  - Trigger visible: contact added to list `ATD Website - Exit Popup Leads - #10`.
  - Visible sequence: email `Before you go - one practical tracking tip`, exit.
  - Recent Exit Popup log rows were not visible in the sampled unfiltered workflow logs.
- Strategy Call Workflow:
  - Trigger visible: contact added to list `Website - Strategy Call Bookings - #7`.
  - Visible sequence: email `Your strategy call is booked - here's how to prepare`, wait `1 day`, email `Before our call: 3 things to review`, email `After your strategy call: next steps`, wait `1 day`, exit.
  - No real booking test has been approved, so this workflow should be reviewed before any booking QA.
- Highest risk: Tracking Audit Nurture is active, has already sent at least one nurture email to a recent redacted contact, and conflicts with earlier inactive-until-approved expectations.
- Recommended next step: ask the user whether to approve pausing Tracking Audit Nurture or to run a deeper read-only review of workflow/template/suppression internals before any more lead-flow testing.

## Tracking Audit Nurture Pause Notes

- Pause date: 2026-06-24.
- User approved pausing only `Tracking Audit Nurture`.
- Pre-action confirmation: workflow was `Active`, named `Tracking Audit Nurture`, and triggered by contact added to `Tracking Audit Leads - #11`.
- Action taken: selected Brevo `Pause automation`.
- Rationale: Brevo's `Deactivate automation` option stated active contacts would be removed; the user declined removing or stopping already-active contacts from the workflow and asked to finalize documentation.
- Post-action verification: `Tracking Audit Nurture` showed `Paused` in the Brevo Automations list.
- Other workflows remained active: Exit Popup Workflow, Newsletter Workflow, General Enquiry Workflow, and Strategy Call Workflow.
- Active contacts view still showed two redacted contacts in Tracking Audit Nurture and one redacted contact in General Enquiry Workflow.
- Important limitation: Brevo's pause wording says no new contacts can enter the automation but active contacts will continue. Because the user declined removing or stopping already-active contacts, already-active Tracking Audit Nurture contacts may still continue.
- No workflow internals, contacts, lists, templates, forms, CRM records, campaigns, sender settings, or attributes were edited.

## Final Launch-Readiness QA Notes

- Review date: 2026-06-24.
- Evidence folders:
  - `docs/codex-handoffs/evidence/book-a-call-booking-test-2026-06-24/`
  - `docs/codex-handoffs/evidence/final-launch-readiness-readonly-2026-06-24/`
- Vercel GET-only sanity checked `/`, `/book-a-call`, `/book-a-call/thank-you`, `/offer/tracking-audit`, `/newsletter/confirmed`, `/service/conversion-tracking`, `/privacy-policy`, `/cookie-policy`, and `/terms-of-service`. All rendered visible content and showed no React `#418` or `#423` errors.
- Book-a-call: one approved QA booking was completed through the Brevo Meetings iframe. Confirmation was visible, a calendar invite notice appeared, and the meeting URL was redacted/omitted.
- Brevo Book-a-call verification: contact found, list `Website - Strategy Call Bookings #7` verified, Strategy Call confirmation email sent/delivered evidence found. CRM deal/task and custom meeting webhook delivery were not verified.
- Attribution risk: visible Brevo contact fields showed `SOURCE` as `Strategy Call Booking`, but `LEAD_SOURCE` and first/latest lifecycle fields still appeared to show the earlier Exit Popup state.
- Workflow list status: Exit Popup Workflow, Newsletter Workflow, General Enquiry Workflow, and Strategy Call Workflow remained active. Tracking Audit Nurture remained paused, with two active contacts still shown.
- GA4 Realtime: accessible and showed recent `generate_lead`, `meeting_booked_confirmed`, and `meeting_booking_redirect` events. Event parameter quality, browser/server deduplication, and PII exclusion were not verified.
- GTM: ATD container `GTM-MVXWCTZ8` was visible read-only. Preview, publish, and event firing were not tested.
- Meta: ATD Web dataset was visible with Pixel and Conversions API indicators, but recent event rows and deduplication proof were not found in the sampled read-only views.
- Netlify: no deployment attempted; remains future live deployment target after paid plan purchase and explicit approval.

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
- Newsletter and Exit Popup visible frontend success screenshots if needed; current downstream Brevo verification is stronger than the captured DOM samples.
- Brevo Meetings booking webhook behavior after the active server target is confirmed and a real booking test is separately approved.
- Meta CAPI/browser deduplication for `Lead` and `Subscribe`.
- GA4 Measurement Protocol meeting event behavior.
- Brevo workflow detail review for triggers, email steps, duplicate enrollment, suppression, and exclusion behavior. Current visible UI state shows the five lead-flow workflows active, but workflow internals were not opened or edited.

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
- Vercel GET-only final sanity check from 2026-06-23 proving 11 key routes render on the working Vercel test URL without hydration-related errors.
- Redacted remaining lead-flow QA evidence from 2026-06-23: Tracking Audit frontend success plus Brevo list/CRM/task/notification proof; Newsletter and Exit Popup Brevo routing proof; Book-a-call UI/iframe proof without booking.
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
| 2026-06-30 | Added final test-ground QA, Tag Assistant consent proof, and Clarity funnel setup evidence. No GTM/source/Vercel changes or submissions were made in this sprint. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `NOTION_SYNC_SUMMARY.md`, `docs/codex-handoffs/evidence/*2026-06-30/summary.md` |
| 2026-06-30 | Deployed a clean Vercel preview from `470696b`, reassigned the test-only canonical alias, verified the consent fix in deployed HTML, and retested Accept All. GTM/Clarity loaded; GA4/Meta/Ads and manual consent-registry proof remain open. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `docs/codex-handoffs/evidence/test-ground-deployment-consent-retest-2026-06-30/summary.md` |
| 2026-06-30 | Added read-only GTM analytics/ads diagnostic. GTM and Clarity loaded after Accept All; Meta likely did not match the homepage test context; only Conversion Linker is configured for Google Ads; GA4 remains blocked on manual Tag Assistant inspection. No live changes, form submissions, or webhook tests occurred. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `docs/codex-handoffs/evidence/gtm-ga4-meta-ads-diagnostic-2026-06-30/summary.md` |
| 2026-06-30 | Added Clarity test-ground QA evidence and queued read-only GTM Preview/tag-firing diagnosis for GA4, Meta, Google Ads, and DoubleClick non-firing. No live changes, form submissions, or webhook tests occurred. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `docs/codex-handoffs/evidence/clarity-test-ground-qa-2026-06-30/summary.md` |
| 2026-06-18 | Initial evidence review queue created. No screenshots or evidence files were copied. | `EVIDENCE_REVIEW_QUEUE.md` |
| 2026-06-19 | Added Vercel visual screenshot pass to review queue. Screenshots are visual-render evidence only; no forms, POST/webhook requests, or live-service changes were made. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md` |
| 2026-06-22 | Added controlled Contact Us form-test evidence to review queue. Evidence verifies frontend submission, redirect, and visible success state only; Brevo, CRM, notifications, Meta, and GA4 remain unverified. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md` |
| 2026-06-23 | Added redacted Brevo read-only verification summary for the existing Contact Us QA submission. Brevo contact/list #8/source attributes/CRM deal/task/internal notification log verified; GA4/GTM/Meta and automations remain unverified. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `NOTION_SYNC_SUMMARY.md` |
| 2026-06-23 | Added Vercel hydration fix console verification. Deployed commit `6a623a1977d8cb34d891f7c073ac6871c5b03e07` was verified on the working Vercel test URL; React `#418`/`#423`, hydration errors, and new app runtime errors were absent on checked routes. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `NOTION_SYNC_SUMMARY.md` |
| 2026-06-23 | Added Vercel GET-only final sanity check evidence for 11 routes. All returned `200`, rendered visible content, attempted no non-GET/HEAD requests, and showed no `#418`, `#423`, or hydration-related errors. Remaining form tests require the private QA identity. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `NOTION_SYNC_SUMMARY.md`, `docs/codex-handoffs/evidence/vercel-get-sanity-2026-06-23/2026-06-23_vercel_get_sanity_redacted-summary.json` |
| 2026-06-23 | Added remaining lead-flow QA evidence. Tracking Audit, Newsletter, and Exit Popup were submitted once; Book-a-call UI was inspected without booking; Brevo read-only verification confirmed list/source-history routing, Tracking Audit CRM deal/task, Tracking Audit and Newsletter notification delivery evidence, and templates `19`-`30`. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `NOTION_SYNC_SUMMARY.md`, `docs/codex-handoffs/evidence/*2026-06-23/` |
| 2026-06-23 | Added read-only workflow and analytics status evidence. Brevo Automations UI showed Exit Popup Workflow, Newsletter Workflow, General Enquiry Workflow, Strategy Call Workflow, and Tracking Audit Nurture active; GA4/GTM/Meta event delivery remains unverified. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `NOTION_SYNC_SUMMARY.md`, `docs/codex-handoffs/evidence/read-only-workflow-analytics-status-2026-06-23/` |
| 2026-06-24 | Added read-only Brevo workflow detail review evidence. Tracking Audit Nurture is active, starts from list `#11`, sends five visible emails with wait steps, has no visible configured exit/suppression condition, and recent logs show a redacted contact was sent the first workflow email and entered a wait step. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `NOTION_SYNC_SUMMARY.md`, `docs/codex-handoffs/evidence/brevo-workflow-detail-review-2026-06-24/` |
| 2026-06-24 | Added approved pause evidence for Tracking Audit Nurture. Workflow status changed from active to paused; the other four visible lead-flow workflows remained active. Active contacts still appeared in Tracking Audit Nurture after pause, so already-active contact handling remains a separate decision. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `NOTION_SYNC_SUMMARY.md`, `docs/codex-handoffs/evidence/brevo-workflow-detail-review-2026-06-24/2026-06-24_brevo_tracking-audit-nurture-paused-redacted-summary.json` |
| 2026-06-24 | Added final launch-readiness QA evidence. One approved Book-a-call booking was completed and verified through Brevo list #7 plus confirmation email logs; workflow list state was rechecked; GA4 Realtime showed recent booking/key events; GTM container was visible; Meta event/deduplication proof remains unverified; Netlify remains future deployment. | `EVIDENCE_REVIEW_QUEUE.md`, `EVIDENCE_ARCHIVE_INVENTORY.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `NOTION_SYNC_SUMMARY.md`, `docs/codex-handoffs/evidence/book-a-call-booking-test-2026-06-24/`, `docs/codex-handoffs/evidence/final-launch-readiness-readonly-2026-06-24/` |
| 2026-06-24 | Added Ketch preview QA evidence. Non-production Vercel deployment `dpl_EJzFbvDGGMPzB3tBnMNfZqVMaYEK` was verified for Ketch/GTM script order and banner rendering. Production readiness failed because GA4/Brevo/Meta/Google Ads fired before consent and Ketch purposes were misconfigured. Evidence JSON is redacted for cookies, storage values, and third-party query values. | `KETCH_PREVIEW_QA_2026-06-24.md`, `KETCH_CONSENT_READINESS_2026-06-24.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `TECHNICAL_CHANGELOG.md`, `docs/codex-handoffs/evidence/ketch-preview-qa-2026-06-24/` |
| 2026-06-24 | Added Ketch remediation preview QA evidence. Non-production Vercel deployment `dpl_5QuDEghwXXvgQmB1Qznj6GyuDwRs` verified the Brevo Conversations repo gate, public Ketch config mismatch, and remaining pre-consent GA4/Meta/Google Ads blockers. | `KETCH_REMEDIATION_PREVIEW_QA_2026-06-24.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `TECHNICAL_CHANGELOG.md`, `docs/codex-handoffs/evidence/ketch-remediation-preview-qa-2026-06-24/`, `src/test/whatsapp-widget.consent.test.tsx` |
| 2026-06-24 | Added strict GTM-gated Ketch preview QA evidence. Non-production Vercel deployment `dpl_EG6Gcc6D3z5syrVeGoi48piH4o3T` verified no GTM/GA4/Meta/Google Ads/LinkedIn/Brevo Conversations/Clarity pre-consent requests in checked flows, while Ketch dashboard purpose/mapping issues remain. | `KETCH_GTM_STRICT_PREVIEW_QA_2026-06-24.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `TECHNICAL_CHANGELOG.md`, `docs/codex-handoffs/evidence/ketch-gtm-strict-preview-qa-2026-06-24/` |
