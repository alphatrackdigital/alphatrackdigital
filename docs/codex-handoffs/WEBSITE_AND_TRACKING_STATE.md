# Website And Tracking State

Last updated: 2026-06-23.

## Website Stack

Verified repo stack: Vite, React, TypeScript, React Router, Tailwind CSS, shadcn/Radix UI. The prompt's note that this is a Next.js project is unverified and conflicts with `package.json`, `README.md`, and repo structure.

## Deployment / Testing Context

- Vercel is the current development/testing environment for working site and server verification.
- Netlify is the planned future live deployment target after ATD purchases/subscribes to the paid Netlify plan.
- Working updates should later be mirrored to Netlify before final live deployment.
- Do not claim Netlify production validation is possible until the paid Netlify plan/account is ready and an approved deployment has happened.
- Vercel visual page-render evidence now exists for selected pages from `https://website-internal-test.vercel.app`.
- Vercel hydration fix console verification now exists for deployed commit `6a623a1977d8cb34d891f7c073ac6871c5b03e07`; React `#418`/`#423` and hydration errors did not appear on checked routes.
- Vercel GET-only final sanity evidence now exists for 11 key routes on `https://website-internal-test.vercel.app`; all checked routes returned `200`, rendered visible content, attempted no non-GET/HEAD requests, and showed no hydration-related errors.
- Contact Us has Vercel frontend submission evidence from 2026-06-22: one approved QA submission redirected to `/contact-us/thank-you` and showed `Message Received!`.
- Contact Us has redacted read-only Brevo verification from 2026-06-23: contact/list #8/source attributes/CRM deal/CRM task/internal notification log were verified for the existing QA submission. GA4/GTM/Meta, automation/workflow behavior, and human inbox review remain `Unverified`.
- Remaining lead-flow QA on 2026-06-23 added: Tracking Audit frontend success plus Brevo list/CRM/task/notification verification; Newsletter and Exit Popup controlled submissions plus Brevo list/source verification; Book-a-call UI/iframe inspection without booking.
- Continue using `https://website-internal-test.vercel.app` for active Vercel testing. Avoid stale URL `https://atd-website-test.vercel.app` unless separately fixed.

## Main Pages / Flows Touched

| Flow / page | Route | Status | Verification |
| --- | --- | --- | --- |
| Contact Us | `/contact-us` -> `/contact-us/thank-you/` | Form posts to lead endpoint, marks conversion intent, redirects after success | Vercel frontend submission evidence; redacted Brevo contact/list #8/CRM task/notification-log verification; `src/pages/ContactUs.tsx`, tests |
| Book A Free Strategy Call | `/book-a-call` -> `/book-a-call/thank-you/` | Brevo Meetings embed/webhook plus client fallback events | UI/iframe presence verified 2026-06-23; no booking performed; docs, `api/brevo-meeting-webhook.ts` |
| Tracking Audit | `/offer/tracking-audit` | Form posts to lead endpoint and pushes tracking audit event | Frontend visible success and Brevo list #11/source history/CRM deal/task/notification verified 2026-06-23 |
| Newsletter | footer/shared section | DOI-ready; pushes Subscribe event | One controlled submission completed; Brevo list #9/source history/internal notification verified 2026-06-23; frontend success text not captured |
| Exit popup | site-wide popup | Posts to `/api/brevo-subscribe`; pushes Lead event | One controlled submission completed; Brevo list #10/source history verified 2026-06-23; frontend success text not captured |
| Services/About/Results/Expertise/Homepage | multiple routes | Significant visual/layout/content work across earlier sessions/PRs | session index, GitHub PRs |

CTA config verified:

- `Book A Free Strategy Call` -> `/book-a-call`
- `Request a Free Tracking Audit` -> `/offer/tracking-audit`

## Form Behavior And Redirects

| Form | Endpoint | Redirect / success behavior | Brevo list |
| --- | --- | --- | --- |
| Contact Us | `/api/leads` or configured `VITE_LEADS_ENDPOINT` | navigates to `/contact-us/thank-you` after success | 8 |
| Tracking Audit | `/api/leads` or configured endpoint | stays on landing flow with success state/event | 11 |
| Newsletter | `/api/leads` | success or pending DOI confirmation | 9 |
| Exit popup | `/api/brevo-subscribe` | popup success state/event | 10 |
| Strategy Call | `/api/brevo-meeting-webhook` | server webhook plus thank-you route fallback | 7 |

`src/lib/apiEndpoints.ts` resolves local/Vercel-like hosts to same-origin API paths and nonlocal static hosts to `https://alphatra-serv.netlify.app`. Remaining-flow frontend evidence did not capture POST response details, likely because the deployed build/runtime may use configured endpoint values. Brevo read-only verification confirms downstream routing for the completed submissions where stated.

## Vercel Visual Page-Render Evidence

Controlled browser screenshots were captured from `https://website-internal-test.vercel.app` under `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/` for homepage, Contact Us, Contact thank-you, Book A Free Strategy Call, booking thank-you, Tracking Audit, newsletter confirmed, Conversion Tracking service page, Privacy Policy, Cookie Policy, and Terms of Service.

This evidence verifies visual page rendering only. During capture, external GTM/GA/Meta-style requests and non-GET/HEAD requests were blocked. No forms were submitted, no POST/webhook requests were sent, and no Brevo routing, Meta event, GA4 event, or webhook behavior is verified by these screenshots.

Minor text/accessibility observation: styled headings may expose joined text in extracted text, such as `ThatMeasures` and `andStart`; review later during accessibility/content QA.

## Vercel Hydration Fix Verification

On 2026-06-23, deployed commit `6a623a1977d8cb34d891f7c073ac6871c5b03e07` was verified on `https://website-internal-test.vercel.app` with GET-only browser console checks.

Routes checked: `/`, `/contact-us`, `/contact-us/thank-you`, `/book-a-call`, `/offer/tracking-audit`, and `/newsletter/confirmed`.

Verified: React `#418` did not appear, React `#423` did not appear, hydration errors were not found, new application runtime errors were not found, and `#root data-prerendered` was `false` on all checked routes.

Expected blocked external request warnings came from QA blocking rules and included `www.googletagmanager.com`, `fonts.googleapis.com`, `cdn.gpteng.co`, `images.unsplash.com`, and `meet.brevo.com` on `/book-a-call`.

This evidence verifies the hydration fix on the Vercel test environment for the checked routes only. It does not verify form submissions, Brevo routing, GA4/GTM/Meta delivery, webhooks, or automation/workflow behavior.

## Vercel GET-Only Final Sanity Check

On 2026-06-23, a GET-only browser sanity check was completed against `https://website-internal-test.vercel.app`.

Routes checked: `/`, `/contact-us`, `/contact-us/thank-you`, `/book-a-call`, `/book-a-call/thank-you`, `/offer/tracking-audit`, `/newsletter/confirmed`, `/service/conversion-tracking`, `/privacy-policy`, `/cookie-policy`, and `/terms-of-service`.

Verified: all 11 routes returned `200`, rendered visible body content, attempted no non-GET/HEAD requests, and showed no `#418`, no `#423`, and no hydration-related console/page errors.

Evidence is stored at `docs/codex-handoffs/evidence/vercel-get-sanity-2026-06-23/2026-06-23_vercel_get_sanity_redacted-summary.json`.

Expected console errors were caused by QA blocking rules for third-party requests. Blocked hosts included `www.googletagmanager.com`, `fonts.googleapis.com`, `cdn.gpteng.co`, `images.unsplash.com`, and `meet.brevo.com`.

No forms were submitted, no submit buttons were clicked, no POST/PUT/PATCH/DELETE requests were sent, no webhook tests were run, and no live service settings were changed. This evidence does not verify form submission behavior, Brevo routing, CRM creation, transactional notifications, GA4/GTM/Meta delivery, or automation/workflow behavior.

Remaining controlled lead-flow submissions were not run because the prior QA identity is intentionally redacted in local evidence and cannot be recovered safely.

## Remaining Lead-Flow QA Evidence

On 2026-06-23, remaining lead-flow QA was completed against `https://website-internal-test.vercel.app` using one redacted QA identity.

GET-only sanity check: all 11 key routes returned `200`, rendered visible content, attempted no non-GET/HEAD requests, and showed no `#418`, no `#423`, and no hydration-related errors.

Tracking Audit: one controlled submission was completed on `/offer/tracking-audit`. Redacted frontend evidence captured the same-page success state `Request received`. Read-only Brevo verification confirmed the QA contact was in list `11`, source history included Tracking Audit, a matching Tracking Audit CRM deal was found, a matching CRM task was found, and the internal notification had subject/tag plus delivered evidence.

Newsletter: one controlled footer opt-in submission was completed. The saved frontend DOM sample did not capture the visible success/confirmation text, so frontend success remains partial. Read-only Brevo verification confirmed list `9`, newsletter source history, and internal notification subject/tag plus delivered evidence.

Exit Popup: one controlled popup submission was completed after triggering the popup on `/service/conversion-tracking`. The saved frontend DOM sample did not capture the visible success text, so frontend success remains partial. Read-only Brevo verification confirmed list `10` and exit-popup source history.

Book-a-call: `/book-a-call` was inspected only. The Brevo Meetings iframe was present with host `meet.brevo.com`. No real meeting was booked, no booking webhook was triggered directly, and no webhook test payload was sent.

Brevo templates: read-only API verification confirmed templates `19`-`30` were present. Template content was not downloaded or stored.

Workflow/automation state: Brevo workflow API endpoints returned unavailable, so workflow active/inactive state remains unverified pending read-only UI verification. No workflow was activated or edited.

Analytics: GA4/GTM/Meta read-only verification was not safely available in this session. Do not mark analytics delivery or browser/server deduplication as verified.

## Controlled Contact Us Form Test Evidence

On 2026-06-22, one approved Contact Us QA submission was completed on `https://website-internal-test.vercel.app/contact-us`. The test used a QA identity, selected `Analytics/Tracking`, left marketing opt-in unchecked, reached `https://website-internal-test.vercel.app/contact-us/thank-you`, and confirmed visible success state `Message Received!`.

Evidence is stored under `docs/codex-handoffs/evidence/contact-us-form-test-2026-06-22/` as redacted JSON/DOM/console files. Browser screenshot capture timed out, so no PNG screenshot was saved for this pass.

This evidence verifies the Contact Us frontend submission path, redirect, and visible success state only. It does not verify Brevo contact creation/update, Brevo list #8 membership, CRM deal/task creation, internal notification email delivery, Meta CAPI delivery, or GA4 event delivery.

Console follow-up: the redacted console summary recorded repeated minified React errors `#418` and `#423` before the hydration fix. On 2026-06-23, Vercel console verification found no `#418`, no `#423`, and no hydration errors on the checked routes after deploying commit `6a623a1977d8cb34d891f7c073ac6871c5b03e07`.

## Contact Us Brevo Verification

On 2026-06-23, read-only Brevo verification was completed for the existing approved Contact Us QA submission. The verification confirmed the Brevo contact exists, list `8` membership exists, source/lead source fields are `Contact Form` / `contact_form`, service interest is `Analytics/Tracking`, consent state is `not_provided`, first/latest source lifecycle fields exist, and source timestamps align with the test submission.

CRM verification found a linked CRM deal and linked CRM task. No CRM note was found. Do not treat the missing CRM note as a blocker unless repo docs or an approved SOP explicitly require a note.

Transactional log verification found the Contact Us internal notification with expected subject/tag and request plus delivered events. This does not prove a human inbox user read the notification.

Still unverified for Contact Us: GA4/GTM/Meta delivery and automation/workflow behavior.

## Lead Source Capture

Frontend:

- `src/lib/attribution.ts` captures UTM fields, `gclid`, `fbclid`, `_fbp`, `_fbc`, landing page, and referrer in session storage.
- `src/lib/leads.ts` attaches attribution and a generated Meta event ID to lead submissions.
- Exit popup also attaches attribution and route context.

Backend:

- `api/leads.ts` and `netlify/functions/leads.mjs` preserve first/latest source lifecycle fields.
- `api/brevo-subscribe.ts` and `netlify/functions/brevo-subscribe.mjs` do the same for exit popup.
- `api/brevo-meeting-webhook.ts` and Netlify equivalent do the same for Brevo Meetings bookings.

Key attributes: `FIRST_SOURCE`, `FIRST_LEAD_SOURCE`, `FIRST_SOURCE_TIMESTAMP`, `LAST_SOURCE`, `LAST_LEAD_SOURCE`, `LAST_SOURCE_TIMESTAMP`, `SOURCE_HISTORY`.

## Event Tracking Implementation

DataLayer events:

| Event | Purpose |
| --- | --- |
| `atd_route_view` | SPA route view |
| `generate_lead` | Book-a-call thank-you conversion |
| `meeting_booking_redirect` | Visitor reached booking thank-you route |
| `contact_form_submit` | Contact thank-you conversion |
| `tracking_audit_submit` | Tracking audit form success |
| `newsletter_subscribe` | Newsletter signup success |
| `exit_popup_success` | Exit popup signup success |
| `booking_cta_click` | Click to `/book-a-call` |
| `booking_widget_loaded` | Brevo widget loaded |
| `booking_scheduler_open` | External Brevo scheduler opened |

## Meta Event Readiness

Repo implementation maps:

- Contact form -> `Lead` with event ID
- Exit popup -> `Lead` with event ID
- Tracking audit -> `Lead` with event ID
- Newsletter -> `Subscribe` with event ID
- Strategy call / booking -> `Lead` where CAPI is configured

Browser events expose `event_id` and `eventID`; `src/lib/tracking.ts` patches `fbq` calls to include matching `eventID` for standard events when available. Server events use `metaEventId` where present.

Unverified: current Meta Events Manager matching/deduplication state and whether auto-logged events such as `SubscribedButtonClick` are appearing alongside primary conversion events.

2026-06-23 note: Tracking Audit, Newsletter, and Exit Popup submissions may have generated browser/server analytics events depending on deployed configuration, but no GA4/GTM/Meta read-only verification was safely available in this session.

## GA4 / GTM State

- GTM container documented: `GTM-MVXWCTZ8`.
- `index.html` installs GTM loader and noscript iframe per docs.
- GA4 MP booking event implemented in Brevo Meetings webhook.
- GA4 property documented in GA4 docs: `523184243`.
- `GA4_MEASUREMENT_ID` in `.env.example`: `G-6C3CBH6GN9`.
- `GA4_MEASUREMENT_PROTOCOL_DEBUG_MODE` should be true only during DebugView.

Unverified: current GA4 Realtime/DebugView/key-event configuration.

## Consent / Banner

Consent handling is implemented at form level:

- Newsletter requires opt-in before newsletter submission.
- Contact/audit marketing opt-in is optional and separate from enquiry handling.
- Backend maps consent state to `OPT_IN`, `CONSENT_STATUS`, and `CONSENT_TIMESTAMP` where appropriate.

Consent/banner or Consently installation was not verified in the current repo pass. Marked unverified.

## Known Issues

- Visual page rendering has current Vercel screenshot evidence for selected pages.
- React hydration errors `#418` and `#423` are resolved on the Vercel test deployment for the checked routes after commit `6a623a1977d8cb34d891f7c073ac6871c5b03e07`.
- The 2026-06-23 GET-only sanity pass confirmed 11 key Vercel routes returned `200` and showed no hydration-related errors.
- Contact Us frontend submission/redirect and Brevo contact/list #8/CRM task/internal notification log now have current evidence.
- Tracking Audit frontend success plus Brevo list #11/source history/CRM deal/task/internal notification evidence now exists.
- Newsletter and Exit Popup have controlled submission evidence and Brevo downstream verification, but their visible frontend success text was not captured in saved DOM samples.
- GA4/GTM/Meta delivery, human inbox review, and real booking behavior are still not verified.
- Brevo workflow UI state is now verified from read-only Automations list visibility: Exit Popup Workflow, Newsletter Workflow, General Enquiry Workflow, Strategy Call Workflow, and Tracking Audit Nurture appeared active on 2026-06-23. Workflow internals, triggers, duplicate-enrollment rules, and suppression/exclusion behavior were not opened or verified. Tracking Audit Nurture being active conflicts with earlier inactive-until-approved expectations and should be reviewed before launch traffic.
- Netlify is a future live deployment target after paid plan purchase, not the immediate environment for current testing.
- 2026-06-14 QA found contact-page submit interference from footer newsletter validation; verify this after current contact form changes.
- Styled headings may expose joined text in extracted text, including `ThatMeasures` and `andStart`; review during accessibility/content QA.
- Suppression/blocklist behavior needs retest before live nurture confidence.
- Newsletter internal notification delivery evidence exists in Brevo SMTP logs; human inbox review remains out of scope.
- Production transactional webhook endpoint should not be registered until deployed and verified.

## Suggested Retest Checklist

1. Use active Vercel development/testing URL `https://website-internal-test.vercel.app`; avoid stale URL `https://atd-website-test.vercel.app` unless separately fixed.
2. GET-only Vercel page rendering is current for 11 key routes; Tracking Audit, Newsletter, and Exit Popup controlled submissions have current Brevo downstream evidence.
3. Do not repeat Contact Us submission unless explicitly approved; current evidence verifies redirect/success state and Brevo contact/list #8/CRM task/internal notification log.
4. After approval, verify Contact Us Meta/GA4/GTM effects from the existing QA submission if available, or plan a new controlled submission if event windows have expired.
5. Decide whether CRM notes are required for Contact Us; none were found in the read-only Brevo check.
6. Monitor for React console regressions after future frontend deployments; `#418`/`#423` are resolved on the current checked Vercel routes.
7. Do not repeat Tracking Audit, Newsletter, or Exit Popup submissions unless explicitly approved; current redacted evidence exists.
8. If needed, capture non-submitting UI screenshots for Newsletter/Exit Popup success states only after planning how to avoid duplicate submissions.
9. Create controlled Brevo Meetings booking only after separate approval; verify list #7, sales alert, GA4 MP, Meta CAPI if configured.
10. Review Brevo workflow internals only after explicit approval; visible UI state shows the five lead-flow workflows active, but triggers, steps, duplicate enrollment, and suppression/exclusion behavior remain unverified.
11. Confirm matching browser/server Meta event IDs.
12. Confirm test/suppression contacts do not receive live nurture.
13. Confirm no PII is sent into GA4 event params.
14. Confirm debug/test modes are off after QA.
15. After Netlify paid plan purchase and explicit approval, mirror working updates to Netlify and repeat deployment/live readiness checks.
