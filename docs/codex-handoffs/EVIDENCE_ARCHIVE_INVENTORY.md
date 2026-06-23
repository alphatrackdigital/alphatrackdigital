# Evidence Archive Inventory

Last updated: 2026-06-23.

## Purpose

This inventory records safe references to AlphaTrack Digital / ATD MarTech evidence assets that already exist in the repo or in safe local project records. It is intended to help future agents and reviewers find proof materials without copying raw transcripts, duplicating screenshots, exposing secrets, or touching live systems.

This pass did not copy evidence files, open live tools, update Notion, deploy, commit, push, or change any live service.

## Evidence Classification Rules

| Status | Meaning |
| --- | --- |
| `Verified` | The file/reference exists and its purpose is supported by repo docs, tests, or git history. |
| `Partial` | The file/reference exists, but the exact content or live implication needs human review. |
| `Unverified` | The item is referenced but not confirmed in this pass. |
| `Needs Retest` | Historical evidence exists, but current behavior must be retested before launch use. |
| `Sensitive Review Required` | The asset may include contacts, credentials, storage state, private UI state, logs, or customer/business-sensitive information. Do not copy to Notion or case-study material until reviewed. |

Safe for Notion:

- `Yes`: safe as a business-readable record or repo link.
- `Maybe`: summarize only after human review.
- `No`: keep out of Notion or reference only as restricted internal evidence.

Safe for client-facing case study:

- `Yes`: suitable as public-facing support after normal editorial review.
- `Later`: may support a case study after sanitization, retest, or screenshot replacement.
- `No`: keep internal only.

## Inventory

| Evidence item name | Type | Source location or reference | Related area | What it appears to prove | Verification status | Safe for Notion | Safe for client-facing case study | Recommended action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Codex handoff pack commit | Git commit | `decfa5b6bbc8fd276d4a343919c3c164fc5b5790` | GitHub, SOP | Handoff pack was committed and pushed as documentation-only work. | Verified | Yes | Later | Link in Notion after approval. |
| ATD master Codex worklog | Doc | `docs/codex-handoffs/ATD_MASTER_CODEX_WORKLOG.md` | SOP, Notion | Consolidates repo, git, GitHub, Notion, and session metadata. | Verified | Yes | Later | Use as first internal handoff reference. |
| Brevo current state handoff | Doc | `docs/codex-handoffs/BREVO_CURRENT_STATE.md` | Brevo, SOP | Summarizes Brevo lists, templates, workflows, attributes, and risks. | Verified | Yes | Later | Use for internal Brevo readiness summary; do not treat as live UI proof. |
| Technical changelog handoff | Doc | `docs/codex-handoffs/TECHNICAL_CHANGELOG.md` | Website, Vercel, Netlify, Meta, GA4 | Lists repo files, env variable names, tracking and handler changes. | Verified | Yes | Later | Keep repo-only for detailed engineering context. |
| Website and tracking handoff | Doc | `docs/codex-handoffs/WEBSITE_AND_TRACKING_STATE.md` | Website, Meta, GA4, GTM | Summarizes website flows, lead capture, and tracking implementation. | Verified | Yes | Later | Update with Vercel/Netlify corrected context. |
| Open items handoff | Doc | `docs/codex-handoffs/OPEN_ITEMS_FOR_NEXT_AGENT.md` | SOP | Gives next-agent blockers and safe operating rules. | Verified | Yes | No | Keep current for future sessions. |
| Notion sync summary | Doc | `docs/codex-handoffs/NOTION_SYNC_SUMMARY.md` | Notion, SOP | Stages proposed Notion updates without changing Notion. | Verified | Yes | No | Add evidence archive sync proposal. |
| Brevo campaign readiness QA note | QA note | `docs/brevo-qa-2026-06-14.md` | Brevo, Website | Records workflow QA passes and gaps from 2026-06-14. | Verified | Yes | Later | Use as internal QA evidence; retest before launch claims. |
| Brevo campaign ops readiness doc | Doc | `docs/brevo-campaign-ops-readiness.md` | Brevo, CRM, Netlify | Records templates, segments, campaign settings, transactional status, and deploy blocker history. | Verified | Yes | Later | Keep as primary historical Brevo ops record. |
| Brevo CRM handoff doc | Doc | `docs/brevo-crm-handoff.md` | Brevo, CRM | Records CRM owner, pipeline, stages, API fallback, and QA checklist. | Verified | Yes | Later | Use internally; retest CRM handoff before live claims. |
| Brevo website alignment doc | Doc | `docs/brevo-website-alignment.md` | Brevo, Website | Maps website lead flows to Brevo lists, attributes, and notifications. | Verified | Yes | Later | Use for form QA checklist. |
| Brevo double opt-in doc | Doc | `docs/brevo-double-opt-in.md` | Brevo, Website | Documents DOI env variable names and newsletter behavior. | Verified | Yes | No | Keep internal; do not expose env values. |
| GA4 management doc | Doc | `docs/ga4-codex-management.md` | GA4, SOP | Documents GA4 MCP/admin helper model and event candidates. | Verified | Maybe | No | Keep repo-only unless stripped of local credential-path details. |
| GTM MCP doc | Doc | `docs/google-tag-manager-mcp.md` | GTM, Website | Documents GTM container and SPA dataLayer contract. | Verified | Yes | Later | Good internal evidence; client-safe version should remove tool setup details. |
| Infrastructure brief | Doc | `docs/infrastructure-brief.md` | Vercel, Netlify, Website | Documents hosting/runtime tradeoffs and serverless requirement. | Verified | Maybe | No | Update or supersede with corrected current Vercel testing / future Netlify context. |
| Netlify credit control doc | Doc | `docs/netlify-credit-control.md` | Netlify | Historical Netlify workflow and credit-control notes. | Partial | Maybe | No | Treat as historical; update/supersede before future Netlify paid deployment. |
| Playwright UI targeting doc | Doc | `docs/playwright-ui-targeting.md` | Website, SOP | Documents local UI QA workflow. | Verified | Yes | No | Keep as internal operating SOP. |
| Handoff session index | Doc | `docs/codex-handoffs/SESSION_INDEX_SUMMARY.md` | SOP, Codex | Lists relevant Codex session metadata without raw transcripts. | Verified | Yes | No | Keep repo-only unless summarized in Notion. |
| Recent martech commits | Git commit | `a9cfce7`, `d3d2f51`, `c64e894`, `5299bcc`, `53e4490`, `03470e5` | Website, Brevo, Meta, GA4 | Shows implementation history for source lifecycle, Meta CAPI, Brevo plumbing, CRM fallback. | Verified | Yes | Later | Link commits as internal evidence after approval. |
| GitHub PR #24 | GitHub issue | `https://github.com/alphatrackdigital/alphatrackdigital/pull/24` | GitHub, Brevo | Documents Brevo campaign attributes PR scope. | Partial | Yes | Later | Link as implementation proof if GitHub visibility is acceptable. |
| GitHub issues #25-#29 | GitHub issue | GitHub issues referenced in handoff docs | GitHub, Brevo, Launch QA | Record workflow build, deliverability, CRM, alert routing, and reporting tasks. | Partial | Yes | No | Use internally; do not assume current issue status without live GitHub check. |
| Notion Brevo task records | Notion record | Referenced in `NOTION_SYNC_SUMMARY.md` and prior read-only Notion fetches | Notion, Brevo | Shows Agency OS and Brevo readiness planning records exist. | Partial | Yes | No | Update only after user approval. |
| Test result screenshots for lead flows | Screenshot | `test-results/brevo-browser-qa-20260615003058/*.png` | Website, Brevo | Appears to show Contact, Tracking Audit, Newsletter, Exit Popup success states. | Partial | Maybe | Later | Human-review before Notion; retest on Vercel current setup. |
| Book-a-call test screenshot | Screenshot | `test-results/brevo-browser-qa-book-call-20260615003058/book-a-call-page.png` | Website, Brevo | Appears to show Book A Free Strategy Call page state. | Partial | Maybe | Later | Human-review and retest on active Vercel setup. |
| Brevo account audit JSON | Test result | `test-results/brevo-account-audit-2026-06-15.json` | Brevo | Likely stores Brevo account audit output. | Sensitive Review Required | No | No | Do not copy; inspect only with explicit approval and redaction plan. |
| Brevo Playwright current screenshot | Screenshot | `test-results/brevo-playwright-current.png` | Brevo | May show Brevo UI state. | Sensitive Review Required | No | No | Do not copy to Notion; review locally only if approved. |
| Brevo Playwright storage state | Other | `test-results/brevo-playwright-storage-state.json` | Brevo | Browser storage/auth state. | Sensitive Review Required | No | No | Keep out of docs and Notion; do not open unless explicitly required for security cleanup. |
| Brevo contacts screenshot | Screenshot | `brevo-contacts-before-filter.png` | Brevo | May show contacts/list UI before filtering. | Sensitive Review Required | No | No | Do not copy or publish; likely contains contact data. |
| Root service-page review screenshots | Screenshot | `conversion-tracking-review.png`, `paid-media-review.png`, `paid-media-desktop.png` | Website, Case Study | Visual QA snapshots for service pages. | Partial | Maybe | Later | Review visually before case-study use; replace with current Vercel screenshots if needed. |
| Root temporary page screenshots | Screenshot | `tmp-*.png` in repo root | Website | Historical visual QA iterations across About, Book A Call, services, expertise, results, newsletter. | Partial | Maybe | Later | Do not duplicate; select only current/final images if needed later. |
| `.tmp-audit` visual screenshot groups | Screenshot | `.tmp-audit/*.png`, `.tmp-audit/profile-pages/*.png` | Website, Case Study | Local visual audit captures for pages and brand/profile review. | Partial | Maybe | Later | Treat as review queue; avoid copying entire folder. |
| `.tmp-audit` extracted brand-guide text/pages | Doc, Screenshot | `.tmp-audit/brand-guide-text.txt`, `.tmp-audit/brand-guide-page*.png` | Website, Brand | Appears to support brand visual/reference work. | Sensitive Review Required | No | Later | Confirm rights/sensitivity before reuse. |
| `.tmp-audit` generated tooling folders | Other | `.tmp-audit/pdfextract/`, `.tmp-audit/pdf-tools/` | Other | Temporary tooling dependencies, not evidence. | Sensitive Review Required | No | No | Do not inventory individual files; consider cleanup separately with approval. |
| `.playwright-mcp` page/log captures | QA note, Other | `.playwright-mcp/*.yml`, `.playwright-mcp/*.log` | Website, Brevo | Browser automation traces and console logs. | Sensitive Review Required | No | No | Keep out of Notion; review only if debugging. |
| Public website visual assets | Screenshot, other | `public/*.png`, `public/*.jpg`, `src/assets/**` | Website, Case Study | Current site imagery/logos/tool icons. | Verified | Maybe | Later | Use as design assets, not proof, unless tied to a QA record. |
| Homepage proof tests | Test result | `src/test/index.homepage.test.tsx` | Website, Case Study | Tests homepage proof metrics and layout ordering. | Verified | Yes | Later | Use as internal validation; not a client-facing proof by itself. |
| API endpoint routing tests | Test result | `src/test/api-endpoints.test.ts`, `src/lib/apiEndpoints.ts` | Vercel, Netlify, Website | Confirms same-origin API routes for Vercel-like test hosts. | Verified | Yes | No | Use for corrected Vercel testing context. |
| Tracking tests | Test result | `src/test/tracking.test.ts` | Meta, GTM | Confirms dataLayer events and Meta event ID injection behavior. | Verified | Yes | Later | Retest in browser before launch evidence. |
| Lead function tests | Test result | `src/test/leads.function.test.ts`, `src/test/brevo-subscribe.function.test.ts`, `src/test/brevo-meeting-webhook.function.test.ts` | Brevo, Meta, GA4 | Validate lead payloads, CAPI event IDs, GA4 meeting behavior, DOI fallback. | Verified | Yes | No | Good internal engineering evidence; not client-facing. |
| E2E homepage smoke test | Test result | `e2e/homepage.smoke.spec.ts` | Website | Playwright smoke coverage for homepage. | Verified | Yes | Later | Rerun against Vercel testing environment when approved. |
| Vercel local config | Deployment note | `vercel.json`, `.vercel/project.json` | Vercel | Shows Vercel project wiring and SPA rewrite. | Partial | No | No | Do not publish project IDs; use only high-level summary. |
| Netlify local config | Deployment note | `netlify.toml`, `netlify/functions/*` | Netlify | Shows future Netlify-compatible functions and redirects. | Verified | Yes | No | Treat as future deployment readiness, not current live validation. |
| Vercel visual pass - home | Screenshot | `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/2026-06-19_vercel_home.png` | Vercel, Website, Evidence Archive | Shows the homepage rendered in a controlled browser capture on `https://website-internal-test.vercel.app`. Does not prove form submission, tracking, or backend behavior. | Verified for visual page rendering only | Yes | Later | Keep as internal visual QA evidence; use for Notion evidence sync after commit. |
| Vercel visual pass - Contact Us | Screenshot | `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/2026-06-19_vercel_contact-us.png` | Vercel, Website, Evidence Archive | Shows the Contact Us page rendered in a controlled browser capture on the Vercel testing URL. Does not prove form submission, Brevo routing, Meta, GA4, or webhook behavior. | Verified for visual page rendering only | Yes | Later | Keep as internal visual QA evidence; use for Notion evidence sync after commit. |
| Vercel visual pass - Contact Us thank-you | Screenshot | `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/2026-06-19_vercel_contact-us-thank-you.png` | Vercel, Website, Evidence Archive | Shows the Contact Us thank-you route rendered in a controlled browser capture on the Vercel testing URL. Does not prove a successful form submission occurred. | Verified for visual page rendering only | Yes | Later | Keep as internal visual QA evidence; use for Notion evidence sync after commit. |
| Vercel visual pass - Book A Free Strategy Call | Screenshot | `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/2026-06-19_vercel_book-a-call.png` | Vercel, Website, Evidence Archive | Shows the Book A Free Strategy Call page rendered in a controlled browser capture on the Vercel testing URL. Does not prove booking, webhook, or tracking behavior. | Verified for visual page rendering only | Yes | Later | Keep as internal visual QA evidence; use for Notion evidence sync after commit. |
| Vercel visual pass - Book A Free Strategy Call thank-you | Screenshot | `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/2026-06-19_vercel_book-a-call-thank-you.png` | Vercel, Website, Evidence Archive | Shows the strategy-call thank-you route rendered in a controlled browser capture on the Vercel testing URL. Does not prove a meeting booking or webhook fired. | Verified for visual page rendering only | Yes | Later | Keep as internal visual QA evidence; use for Notion evidence sync after commit. |
| Vercel visual pass - Tracking Audit | Screenshot | `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/2026-06-19_vercel_tracking-audit.png` | Vercel, Website, Evidence Archive | Shows the Tracking Audit page rendered in a controlled browser capture on the Vercel testing URL. Does not prove audit form submission, Brevo routing, Meta, or GA4 behavior. | Verified for visual page rendering only | Yes | Later | Keep as internal visual QA evidence; use for Notion evidence sync after commit. |
| Vercel visual pass - Newsletter confirmed | Screenshot | `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/2026-06-19_vercel_newsletter-confirmed.png` | Vercel, Website, Evidence Archive | Shows the newsletter confirmed route rendered in a controlled browser capture on the Vercel testing URL. Does not prove newsletter submission, DOI, Brevo routing, or Subscribe event behavior. | Verified for visual page rendering only | Yes | Later | Keep as internal visual QA evidence; use for Notion evidence sync after commit. |
| Vercel visual pass - Conversion Tracking service page | Screenshot | `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/2026-06-19_vercel_service-conversion-tracking.png` | Vercel, Website, Evidence Archive | Shows the Conversion Tracking service page rendered in a controlled browser capture on the Vercel testing URL. | Verified for visual page rendering only | Yes | Later | Keep as internal visual QA evidence; use for Notion evidence sync after commit. |
| Vercel visual pass - Privacy Policy | Screenshot | `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/2026-06-19_vercel_privacy-policy.png` | Vercel, Website, Evidence Archive | Shows the Privacy Policy page rendered in a controlled browser capture on the Vercel testing URL. | Verified for visual page rendering only | Yes | Later | Keep as internal visual QA evidence; use for Notion evidence sync after commit. |
| Vercel visual pass - Cookie Policy | Screenshot | `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/2026-06-19_vercel_cookie-policy.png` | Vercel, Website, Evidence Archive | Shows the Cookie Policy page rendered in a controlled browser capture on the Vercel testing URL. | Verified for visual page rendering only | Yes | Later | Keep as internal visual QA evidence; use for Notion evidence sync after commit. |
| Vercel visual pass - Terms of Service | Screenshot | `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/2026-06-19_vercel_terms-of-service.png` | Vercel, Website, Evidence Archive | Shows the Terms of Service page rendered in a controlled browser capture on the Vercel testing URL. | Verified for visual page rendering only | Yes | Later | Keep as internal visual QA evidence; use for Notion evidence sync after commit. |
| Controlled Contact Us form test - pre-submit summary | Form test / redacted JSON summary | `docs/codex-handoffs/evidence/contact-us-form-test-2026-06-22/2026-06-22_vercel_contact-us_pre-submit-redacted-summary.json` | Website, Vercel, Contact Us, Evidence Archive | Records redacted pre-submit state for one approved Contact Us QA submission on `https://website-internal-test.vercel.app`; confirms selected service interest and opt-in state without exposing the QA email. | Partial | Yes, if redacted | Later | Keep as internal QA evidence. Verify Brevo/list/CRM/internal notification separately through read-only checks after approval. Verify Meta/GA4 separately after approval. |
| Controlled Contact Us form test - result summary | Form test / redacted JSON summary | `docs/codex-handoffs/evidence/contact-us-form-test-2026-06-22/2026-06-22_vercel_contact-us_result-redacted-summary.json` | Website, Vercel, Contact Us, Evidence Archive | Records that one approved Contact Us submission reached `/contact-us/thank-you` and visible success state `Message Received!`; does not verify Brevo, CRM, notification, Meta, or GA4 delivery. | Partial | Yes, if redacted | Later | Keep as internal QA evidence. Verify Brevo/list/CRM/internal notification separately through read-only checks after approval. Verify Meta/GA4 separately after approval. |
| Controlled Contact Us form test - thank-you DOM | Form test / redacted DOM evidence | `docs/codex-handoffs/evidence/contact-us-form-test-2026-06-22/2026-06-22_vercel_contact-us_thank-you-redacted-dom.txt` | Website, Vercel, Contact Us, Evidence Archive | Redacted DOM evidence showing the Contact Us thank-you page and visible success copy after the approved submission. No screenshot PNG was captured due to browser screenshot timeout. | Partial | Yes, if redacted | Later | Keep as internal QA evidence. Capture a screenshot in a later pass if the browser capture issue is resolved. |
| Controlled Contact Us form test - console summary | Form test / redacted JSON summary | `docs/codex-handoffs/evidence/contact-us-form-test-2026-06-22/2026-06-22_vercel_contact-us_console-redacted-summary.json` | Website, Vercel, Contact Us, Evidence Archive | Redacted console summary from the Contact Us test found repeated minified React errors `#418` and `#423` before the hydration fix. Superseded by the 2026-06-23 Vercel hydration fix verification row. | Partial | Yes, if redacted | Later | Keep as historical pre-fix evidence; use the Vercel hydration fix verification as the current status for checked routes. |
| Contact Us Brevo contact/list/attribute verification | Read-only Brevo verification | Read-only Brevo inspection completed 2026-06-23; QA identity and internal IDs redacted | Brevo, Website, Contact Us, Evidence Archive | Confirms the existing QA Contact Us submission created or updated a Brevo contact, added it to list `8`, and populated Contact Form/contact_form source fields, service interest `Analytics/Tracking`, consent `not_provided`, first/latest source lifecycle fields, and aligned source timestamps. | Verified for Brevo Contact Us routing only | Yes, redacted summary only | Later | Keep as internal QA evidence. Use redacted summary in Notion after commit. Verify GA4/GTM/Meta separately. |
| Contact Us Brevo CRM verification | CRM verification | Read-only Brevo CRM inspection completed 2026-06-23; contact/deal/task IDs redacted | Brevo, Website, Contact Us, Evidence Archive | Confirms a CRM deal was found and linked to the QA contact, and a CRM task was found and linked to the QA contact/deal. No CRM note was found. | Verified for Brevo Contact Us routing only | Yes, redacted summary only | Later | Keep as internal QA evidence. Decide later whether a CRM note is required; do not treat missing note as a blocker unless the CRM SOP requires one. |
| Contact Us internal notification log verification | Transactional log verification | Read-only Brevo transactional log inspection completed 2026-06-23; recipient and message IDs redacted | Brevo, Website, Contact Us, Evidence Archive | Confirms the Contact Us internal notification transactional log had the expected subject/tag and request plus delivered events. Does not prove a human inbox user read the notification. | Verified for Brevo Contact Us routing only | Yes, redacted summary only | Later | Keep as internal QA evidence. Verify GA4/GTM/Meta separately. Human inbox review remains out of scope. |
| Vercel hydration fix console verification | Vercel console verification / frontend rendering QA | Vercel GET-only browser console verification completed 2026-06-23 on `https://website-internal-test.vercel.app`; deployed commit `6a623a1977d8cb34d891f7c073ac6871c5b03e07` | Vercel, Website, Frontend QA, Evidence Archive | Confirms React hydration errors `#418` and `#423` did not appear, no hydration errors were found, no new application runtime errors were found, and `#root data-prerendered` was `false` on `/`, `/contact-us`, `/contact-us/thank-you`, `/book-a-call`, `/offer/tracking-audit`, and `/newsletter/confirmed`. Browser rendering was used with external requests blocked. | Verified for hydration fix on Vercel test environment | Yes | Later | Keep as internal QA evidence. Use redacted summary in Notion after commit. Continue remaining lead-flow QA one flow at a time; GA4/GTM/Meta delivery remains unverified. |

## Vercel Visual Screenshot Pass Notes

- Base URL captured: `https://website-internal-test.vercel.app`.
- Screenshot folder: `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/`.
- The capture pass used browser rendering only. External GTM/GA/Meta-style requests and non-GET/HEAD requests were blocked during capture.
- No forms were submitted, no POST/webhook requests were sent, and no Brevo routing, Meta event, GA4 event, or webhook behavior is verified by this evidence.
- Minor text/accessibility observation: styled headings may expose joined text in extracted text, such as `ThatMeasures` and `andStart`; review later during accessibility/content QA.

## Controlled Contact Us Form Test Notes

- Test date: 2026-06-22.
- Base URL used: `https://website-internal-test.vercel.app`.
- Flow tested: Contact Us form only.
- Verified: one approved frontend submission, redirect to `/contact-us/thank-you`, and visible success state `Message Received!`.
- Not verified: Brevo contact creation/update, Brevo list #8 membership, CRM deal/task creation, internal notification email delivery, Meta CAPI delivery, and GA4 event delivery.
- The approved submission may have triggered live backend behavior configured in code.
- Browser screenshot capture timed out, so no PNG screenshot was saved for this pass. Redacted DOM/result/console evidence exists in `docs/codex-handoffs/evidence/contact-us-form-test-2026-06-22/`.
- Console follow-up: repeated minified React errors `#418` and `#423` were observed in the redacted console summary before the hydration fix. On 2026-06-23, the fix was deployed to the Vercel test environment and GET-only console verification found no `#418`, no `#423`, and no hydration errors on the checked routes.

## Vercel Hydration Fix Console Verification Notes

- Verification date: 2026-06-23.
- Base URL checked: `https://website-internal-test.vercel.app`.
- Deployed commit verified: `6a623a1977d8cb34d891f7c073ac6871c5b03e07`.
- Routes checked: `/`, `/contact-us`, `/contact-us/thank-you`, `/book-a-call`, `/offer/tracking-audit`, and `/newsletter/confirmed`.
- Verified: React errors `#418` and `#423` did not appear, hydration errors were not found, new application runtime errors were not found, and `#root data-prerendered` was `false` on all checked routes.
- Browser rendering was used. No forms were submitted, no submit buttons were clicked, no POST/form/webhook requests were sent, and no live service was changed during verification.
- Expected blocked external request warnings were caused by QA blocking rules and included `www.googletagmanager.com`, `fonts.googleapis.com`, `cdn.gpteng.co`, `images.unsplash.com`, and `meet.brevo.com` on `/book-a-call`.
- This evidence does not verify GA4/GTM/Meta delivery, Brevo automation/workflow behavior, or broader form/backend behavior.

## Read-Only Brevo Contact Us Verification Notes

- Verification date: 2026-06-23.
- Scope: existing approved Contact Us QA submission only.
- Verified: Brevo contact exists, list `8` membership exists, Contact Form/contact_form source fields are present, service interest is `Analytics/Tracking`, consent is `not_provided`, first/latest source lifecycle fields are present, and source timestamps align with the test submission.
- Verified: CRM deal and CRM task exist and are linked to the QA contact/deal.
- Verified: Contact Us internal notification transactional log has expected subject/tag with request and delivered events.
- Missing: no CRM note was found. Do not treat this as a blocker unless repo docs or an approved SOP explicitly require CRM notes.
- Not verified: GA4/GTM/Meta delivery, automation/workflow behavior, and whether any team inbox user read the notification.
- Redaction rule: QA identity, contact IDs, CRM IDs, recipient emails, internal record IDs, and transactional message IDs must stay out of repo docs and Notion summaries.

## Safe Evidence Ready For Notion

- `docs/codex-handoffs/ATD_MASTER_CODEX_WORKLOG.md`
- `docs/codex-handoffs/BREVO_CURRENT_STATE.md` as a summary, not live proof
- `docs/codex-handoffs/WEBSITE_AND_TRACKING_STATE.md` after corrected Vercel/Netlify context
- `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/*.png` as Vercel visual page-render evidence only
- `docs/codex-handoffs/evidence/contact-us-form-test-2026-06-22/*` as redacted Contact Us frontend submission/redirect evidence only
- Redacted 2026-06-23 Contact Us Brevo routing/CRM/task/notification-log verification summary
- 2026-06-23 Vercel hydration fix console verification summary for checked routes
- `docs/brevo-qa-2026-06-14.md` as historical QA with clear gaps
- `docs/brevo-campaign-ops-readiness.md` as historical readiness documentation
- Git commit `decfa5b6bbc8fd276d4a343919c3c164fc5b5790`
- Selected implementation commits listed above

## Evidence Requiring Review

- `test-results/brevo-browser-qa-20260615003058/*.png`
- `test-results/brevo-browser-qa-book-call-20260615003058/book-a-call-page.png`
- Root `tmp-*.png` screenshot groups
- Root service-page review screenshots
- `.tmp-audit/*.png` and `.tmp-audit/profile-pages/*.png`
- GitHub issue/PR links if workspace visibility or wording needs cleanup first

## Evidence That Should Stay Repo-Only

- `docs/codex-handoffs/TECHNICAL_CHANGELOG.md`
- `docs/codex-handoffs/SESSION_INDEX_SUMMARY.md`
- `docs/ga4-codex-management.md` unless local credential-path details are removed
- `docs/playwright-ui-targeting.md`
- Test source files under `src/test/`
- Vercel/Netlify config files

## Evidence That Should Not Be Copied Due To Sensitivity Risk

- `test-results/brevo-playwright-storage-state.json`
- `test-results/brevo-account-audit-2026-06-15.json` until reviewed and redacted
- `test-results/brevo-playwright-current.png`
- `brevo-contacts-before-filter.png`
- `.playwright-mcp/*.log`
- `.playwright-mcp/*.yml`
- `.tmp-audit/brand-guide-text.txt` and brand-guide page captures until rights/sensitivity are confirmed
- Raw Codex session transcripts
- Any files containing credentials, auth state, contact lists, or private UI state

## Missing Evidence Needed For Launch Readiness

- Current Vercel hydration fix deployment/console verification is complete for the checked routes; broader Vercel form/server QA remains incomplete.
- Vercel form/server QA evidence for Tracking Audit, Newsletter, Exit Popup, and Strategy Call.
- Contact Us now has frontend submission/redirect evidence and Brevo contact/list #8/CRM task/internal notification log verification. GA4/GTM/Meta delivery, automation/workflow behavior, and human inbox review remain missing.
- Current Meta Events Manager proof of browser/server event ID matching.
- Current GA4 DebugView/Realtime proof for key events and meeting webhook.
- Current Brevo UI screenshots of source lifecycle attributes and attribute grouping after sensitive review.
- Current Brevo workflow screenshots showing inactive/active state and suppression logic after approval.
- Current unsubscribe/profile page review evidence.
- Future Netlify paid-plan deployment proof after subscription and deliberate deployment.
- Final production/live deployment proof after Netlify is ready.

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
| 2026-06-18 | Initial evidence archive inventory created from repo docs, safe file listings, existing handoff docs, and local project artifact references. No evidence files were copied. | `EVIDENCE_ARCHIVE_INVENTORY.md`, `EVIDENCE_REVIEW_QUEUE.md` |
| 2026-06-19 | Added 11 Vercel visual page-render screenshots from `https://website-internal-test.vercel.app`. No form submissions, POST/webhook requests, tracking verification, or live-service changes were made. | `EVIDENCE_ARCHIVE_INVENTORY.md`, `EVIDENCE_REVIEW_QUEUE.md`, `WEBSITE_AND_TRACKING_STATE.md` |
| 2026-06-22 | Added redacted evidence for one approved Contact Us frontend submission on the Vercel test URL. Verified redirect and visible success state only; Brevo, CRM, notification, Meta, and GA4 remain unverified. | `EVIDENCE_ARCHIVE_INVENTORY.md`, `EVIDENCE_REVIEW_QUEUE.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md` |
| 2026-06-23 | Added redacted read-only Brevo verification summary for the existing Contact Us QA submission. Verified Brevo contact/list #8/source attributes/CRM deal/task/internal notification log; GA4/GTM/Meta and automations remain unverified. | `EVIDENCE_ARCHIVE_INVENTORY.md`, `EVIDENCE_REVIEW_QUEUE.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `NOTION_SYNC_SUMMARY.md` |
| 2026-06-23 | Added Vercel hydration fix console verification summary. Deployed commit `6a623a1977d8cb34d891f7c073ac6871c5b03e07` was verified on `https://website-internal-test.vercel.app`; React `#418`/`#423` and hydration errors did not appear on checked routes. GA4/GTM/Meta and broader lead-flow behavior remain unverified. | `EVIDENCE_ARCHIVE_INVENTORY.md`, `EVIDENCE_REVIEW_QUEUE.md`, `WEBSITE_AND_TRACKING_STATE.md`, `OPEN_ITEMS_FOR_NEXT_AGENT.md`, `NOTION_SYNC_SUMMARY.md` |
