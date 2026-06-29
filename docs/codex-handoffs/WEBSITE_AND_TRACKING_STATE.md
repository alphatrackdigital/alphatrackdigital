# Website And Tracking State

## 2026-06-29 Ad Consent Propagation Correction

- Owner manual Tag Assistant testing exposed a Consent Mode mismatch after Accept All: analytics was granted in GTM, but the three advertising fields remained denied despite granted values in the diagnostic dataLayer event.
- Root cause was a plain dataLayer array used in place of the real gtag Consent Mode update.
- The Ketch bridge now completes all four optional fields, calls `gtag("consent", "update", consentUpdate)`, and only then pushes `atd_consent_update`.
- Preview `https://atd-website-test-o6l381b8e-alphatrackdigitals-projects.vercel.app` passed runtime GTM consent-state and network checks for fresh visit, Reject All, Accept All, Analytics-only, and Targeted Advertising-only.
- GTM Version 9 remains published; Clarity remains GTM-only under `analytics_storage`.
- The previous deployment ZIP is superseded. Manual cPanel deployment of the corrected package and full production QA remain pending.

Last updated: 2026-06-24.

## 2026-06-29 Published State

- GTM container `GTM-MVXWCTZ8` workspace 9 is live as Version 9.
- Clarity tag: `Clarity | BASE | analytics_measurement | all_pages | web`.
- Clarity project: `xbn6g2k18j`.
- Clarity requires `analytics_storage` and uses `TR | CONSENT | analytics_granted | atd_consent_update | global`.
- Clarity is not directly installed in repository source.
- Fresh visit and Accept All passed on the non-production preview before publish.
- Full six-scenario production consent QA remains pending owner verification.
- Cookie Policy remains live at `/cookie-policy`; the Ketch-specific workaround remains pending stakeholder/legal approval.

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

2026-06-23 note: Tracking Audit, Newsletter, and Exit Popup submissions may have generated browser/server analytics events depending on deployed configuration, but no GA4/GTM/Meta read-only verification was safely available in that session.

2026-06-24 note: GA4 Realtime was accessible read-only and showed recent `generate_lead`, `meeting_booked_confirmed`, and `meeting_booking_redirect` events after the approved Book-a-call QA booking. This does not prove Meta browser/server deduplication, event parameter quality, or absence of PII in analytics payloads.

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

Ketch repo-side installation was added on 2026-06-24:

- `index.html` now sets Google Consent Mode v2 defaults before GTM: `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`, and `personalization_storage` default to `denied`; `functionality_storage` and `security_storage` default to `granted`.
- The Ketch Smart Tag loads before GTM: `https://global.ketchcdn.com/web/v3/config/alphatrack_digital/website_smart_tag/boot.js`.
- The old Consently injector for `https://app.consently.net/consently.js` and banner ID `69d839dd9a39ae7fe289dbf5` was removed.
- Existing GTM container `GTM-MVXWCTZ8` was preserved.
- Microsoft Clarity was not installed or activated. Future Clarity project `xbn6g2k18j` should only be added after Ketch QA passes and should map to Analytics & Measurement consent.

Ketch/GTM consent updates are still pending dashboard/browser verification. See `KETCH_CONSENT_READINESS_2026-06-24.md`.

2026-06-24 preview QA result: blocked for production. Approved Vercel preview deployment `dpl_EJzFbvDGGMPzB3tBnMNfZqVMaYEK` at `https://atd-website-test-rglrf9sxv-alphatrackdigitals-projects.vercel.app` confirmed Ketch loads and the banner appears on required pages, but GA4 fired before consent, Brevo Conversations loaded before consent on `/book-a-call`, Meta and Google Ads fired before consent on `/book-a-call/thank-you`, Accept All did not grant observed Consent Mode fields, Reject All still stored `targeted_advertising` as granted, and Manage Preferences showed only `Targeted Advertising` as `Always Active`. See `KETCH_PREVIEW_QA_2026-06-24.md`.

2026-06-24 remediation preview result: still blocked for production. Vercel preview deployment `dpl_5QuDEghwXXvgQmB1Qznj6GyuDwRs` at `https://atd-website-test-qowl1215w-alphatrackdigitals-projects.vercel.app` verified the repo-side Brevo Conversations chat script is now gated behind analytics consent and no longer loads before consent in the repeat sample. However, public Ketch config exposes only `targeted_advertising`, references missing `analytics___measurement` in gtag mapping, leaves Cookie Policy blank, and still renders Targeted Advertising as Always Active. GA4, Meta, and Google Ads pre-consent failures remain. See `KETCH_REMEDIATION_PREVIEW_QA_2026-06-24.md`.

2026-06-24 strict preview result: repo-side pre-consent leaks are controlled in Vercel preview deployment `dpl_EG6Gcc6D3z5syrVeGoi48piH4o3T` at `https://atd-website-test-l6l6n0n6u-alphatrackdigitals-projects.vercel.app`. GTM is now loaded only after an explicit optional Consent Mode grant; pre-consent QA observed no GTM, GA4, Meta, Google Ads, LinkedIn, Brevo Conversations, Consently, Cookiebot, or Clarity requests on the checked flows. Ketch dashboard config remains blocked: only `targeted_advertising` is deployed, Cookie Policy is blank, Analytics & Measurement is missing, and Targeted Advertising is Always Active. See `KETCH_GTM_STRICT_PREVIEW_QA_2026-06-24.md`.

2026-06-24 final preview follow-up: current preview `https://atd-website-test-n96vt528s-alphatrackdigitals-projects.vercel.app` passed repo-side Ketch QA after Ketch purpose remediation. GTM container `GTM-MVXWCTZ8` was updated in draft/workspace mode only: 14 GA4 tags now require additional consent `analytics_storage`; 7 Meta Custom HTML tags now require `ad_storage`, `ad_personalization`, and `ad_user_data`; and the Google Ads Conversion Linker now requires `ad_storage`, `ad_personalization`, and `ad_user_data`. Workspace Changes showed `22`; no GTM publish, production deploy, or Clarity install was performed. GTM Templates showed no tag or variable templates, so the Ketch GTM template is not installed. GTM Preview connected to the Vercel preview URL, but the standalone Tag Assistant timeline could not be inspected through the Codex Chrome extension because Chrome blocked automation while an extension UI was open. Site-side QA confirmed first visit and Reject All kept GTM/GA/Meta/LinkedIn/Brevo Conversations/Clarity/Consently/Cookiebot absent; Accept All plus Confirm loaded GTM and Brevo Conversations while Clarity remained absent. GA/Meta delivery still needs Tag Assistant timeline verification before GTM publish approval.

2026-06-25 GTM-consent preview result: Vercel preview `https://atd-website-test-bizccowc5-alphatrackdigitals-projects.vercel.app` (`dpl_Fj3xYipZUf7hdqsw52xGrNeYm2vL`) passed the automated consent matrix. `index.html` now releases GTM after either analytics consent or targeted-advertising consent and includes a narrow GA transport guard that blocks `google-analytics.com/collect` and `google-analytics.com/g/collect` while `analytics_storage` is not granted. Consent Overview evidence shows GA4 requiring `analytics_storage`, Google Ads Conversion Linker requiring ad consent fields, and Meta tags requiring ad consent fields. No production deploy, GTM publish, or Clarity install was performed. Remaining launch-readiness caveat: Tag Assistant timeline proof and ad-platform request delivery were not fully captured; automated network QA did not observe Meta or Google Ads delivery after consent.

2026-06-25 final pre-production rerun: fresh automated page/network QA against `https://atd-website-test-bizccowc5-alphatrackdigitals-projects.vercel.app` passed again. Evidence file: `docs/codex-handoffs/evidence/ketch-final-gtm-consent-2026-06-25/browser-consent-matrix-rerun-2026-06-25.json`. Confirmed denied defaults in `window.__atdConsentState`, no optional requests before consent, Reject All denied analytics/ad fields, Accept All granted analytics/ad fields, Analytics-only allowed GA4/Brevo Conversations while ads remained blocked, Targeted Advertising-only kept GA collect blocked while ad consent was granted, choices persisted after reload, and the floating `Show Preferences` trigger reopened preferences. Tag Assistant timeline capture remains blocked because non-interrupting Chrome extension control failed before attach and no Chrome remote-debugging port was available; do not take over the user's active signed-in Chrome session without explicit approval.

2026-06-25 final verification continuation: automated page/network QA passed again with latest evidence timestamp `2026-06-25T21:38:51.615Z`. Sanitized blocker evidence was added at `docs/codex-handoffs/evidence/ketch-final-gtm-consent-2026-06-25/final-verification-blockers-2026-06-25.json`. After Codex restart, Chrome browser control attached successfully. GTM container `GTM-MVXWCTZ8` opened in workspace `9` with `Workspace Changes: 22`, and Tag Assistant connected to the approved preview URL, opening a `gtm_debug` preview site tab. The connected Tag Assistant timeline page still could not be automated because Chrome reported another extension UI was open on that page. GTM was not published.

2026-06-25 Ketch dashboard Cookie Policy retry: private Ketch dashboard access worked. The `Cookie Policy` document exists with URL `https://www.alphatrack.digital/cookie-policy`, status `Undeployed`, and current type `Privacy Policy`. Available document types are `Privacy Policy`, `Terms of Service`, `DPIA`, `DPA`, `MSA`, and `Other`; no dedicated `Cookie Policy` type is available. No Ketch document, purpose, theme, system, tracker, or jurisdiction was deleted or changed. Evidence: `docs/codex-handoffs/evidence/ketch-final-gtm-consent-2026-06-25/chrome-retry-ketch-cookie-policy-2026-06-25.json`.

2026-06-25 production approval status: Ketch is `NO-GO / BLOCKED` for production even though automated preview QA passed. Production launch requires five remaining gates: GTM Preview / Tag Assistant timeline proof, Google Ads/Meta/LinkedIn delivery confirmation after consent only, Ketch Cookie Policy resolution or approved workaround, explicit approval to publish GTM, and explicit approval to deploy production. See `KETCH_FINAL_PREVIEW_QA_2026-06-24.md` for the final go/no-go table and production launch checklist.

2026-06-25 Cookie Policy config check: Ketch public config includes Privacy Policy and Terms of Service URLs, but no `cookie-policy` URL. A final public recheck on 2026-06-25 returned `200` for the Ketch config endpoint and for website legal pages `/privacy-policy`, `/cookie-policy`, and `/terms-of-service`. The Ketch preference `privacyPolicy` tab appears hidden with an empty document id in public config. Treat Cookie Policy attachment as a Ketch dashboard/vendor support item; keep the website Cookie Policy page live as the current workaround unless the user explicitly approves that workaround for production.

## Known Issues

- Visual page rendering has current Vercel screenshot evidence for selected pages.
- React hydration errors `#418` and `#423` are resolved on the Vercel test deployment for the checked routes after commit `6a623a1977d8cb34d891f7c073ac6871c5b03e07`.
- The 2026-06-23 GET-only sanity pass confirmed 11 key Vercel routes returned `200` and showed no hydration-related errors.
- Contact Us frontend submission/redirect and Brevo contact/list #8/CRM task/internal notification log now have current evidence.
- Tracking Audit frontend success plus Brevo list #11/source history/CRM deal/task/internal notification evidence now exists.
- Newsletter and Exit Popup have controlled submission evidence and Brevo downstream verification, but their visible frontend success text was not captured in saved DOM samples.
- GA4 Realtime now has partial evidence for recent booking-related events. GTM container visibility is verified, but GTM event firing, Meta event delivery/deduplication, human inbox review, and CRM/webhook behavior for Book-a-call are still not fully verified.
- Brevo workflow UI state is now verified from read-only Automations list visibility: Exit Popup Workflow, Newsletter Workflow, General Enquiry Workflow, Strategy Call Workflow, and Tracking Audit Nurture appeared active on 2026-06-23. Workflow internals, triggers, duplicate-enrollment rules, and suppression/exclusion behavior were not opened or verified. Tracking Audit Nurture being active conflicts with earlier inactive-until-approved expectations and should be reviewed before launch traffic.
- On 2026-06-24, read-only Brevo workflow detail review found Tracking Audit Nurture active, triggered by list `Tracking Audit Leads - #11`, with five visible email steps and waits of `1 day`, `2 days`, `2 days`, and `2 days`. No configured exit/suppression condition was visible in settings. Logs showed a recent redacted contact received the first workflow email and entered a wait step. This is a high-priority risk before any more Tracking Audit testing or launch traffic.
- Later on 2026-06-24, the user approved pausing only Tracking Audit Nurture. The workflow was paused; the other four visible lead-flow workflows remained active. Active contacts still appeared in Tracking Audit Nurture after the pause, and the user declined removing/stopping those already-active contacts.
- On 2026-06-24, one approved Book-a-call QA booking was completed through the Brevo Meetings iframe on the Vercel test URL. Visible confirmation appeared and Brevo read-only verification confirmed list `Website - Strategy Call Bookings #7` plus Strategy Call confirmation email sent/delivered evidence. CRM deal/task, custom meeting webhook delivery, Meta deduplication, and human inbox review remain unverified.
- Brevo attribution risk from the Book-a-call verification: visible `SOURCE` showed `Strategy Call Booking`, but `LEAD_SOURCE` and first/latest source lifecycle fields still appeared to show the earlier Exit Popup state for the reused QA contact.
- GA4 Realtime showed recent `generate_lead`, `meeting_booked_confirmed`, and `meeting_booking_redirect` events after the booking test. GTM container `GTM-MVXWCTZ8` was visible read-only. Meta Events Manager dataset was accessible, but recent event rows and deduplication proof were not found in the sampled views.
- Netlify is a future live deployment target after paid plan purchase, not the immediate environment for current testing.
- 2026-06-14 QA found contact-page submit interference from footer newsletter validation; verify this after current contact form changes.
- Styled headings may expose joined text in extracted text, including `ThatMeasures` and `andStart`; review during accessibility/content QA.
- Suppression/blocklist behavior needs retest before live nurture confidence.
- Newsletter internal notification delivery evidence exists in Brevo SMTP logs; human inbox review remains out of scope.
- Production transactional webhook endpoint should not be registered until deployed and verified.
- Ketch production readiness is not complete until Tag Assistant confirms the unpublished GTM consent-check draft behaves correctly and the Cookie Policy is deployed/attached in Ketch.
- Ketch preview QA is currently blocked for production approval, not for repo-side consent behavior: pre-consent GTM/GA4/ads leaks are controlled in preview, Ketch purposes expose Analytics plus Targeted Advertising correctly, and the automated consent matrix passes. Remaining items are Cookie Policy attachment status, Tag Assistant timeline proof, ad-platform delivery confirmation, and explicit approval before any production/GTM publish/Clarity work.
- Unknown/random URLs returning `200` is a separate routing/404 SEO cleanup item and should not block Ketch implementation.

## Suggested Retest Checklist

1. Use active Vercel development/testing URL `https://website-internal-test.vercel.app`; avoid stale URL `https://atd-website-test.vercel.app` unless separately fixed.
2. GET-only Vercel page rendering is current for 11 key routes; Tracking Audit, Newsletter, and Exit Popup controlled submissions have current Brevo downstream evidence.
3. Do not repeat Contact Us submission unless explicitly approved; current evidence verifies redirect/success state and Brevo contact/list #8/CRM task/internal notification log.
4. After approval, verify Contact Us, Tracking Audit, Newsletter, and Exit Popup Meta/GA4/GTM effects from existing evidence windows if available, or plan new controlled submissions only if event windows have expired and the user approves.
5. Decide whether CRM notes are required for Contact Us; none were found in the read-only Brevo check.
6. Monitor for React console regressions after future frontend deployments; `#418`/`#423` are resolved on the current checked Vercel routes.
7. Do not repeat Tracking Audit, Newsletter, or Exit Popup submissions unless explicitly approved; current redacted evidence exists.
8. If needed, capture non-submitting UI screenshots for Newsletter/Exit Popup success states only after planning how to avoid duplicate submissions.
9. Do not repeat Book-a-call booking without approval. Current evidence verifies one booking confirmation, Brevo list #7 membership, and Strategy Call confirmation email delivery; CRM deal/task, custom meeting webhook delivery, Meta CAPI, and browser/server dedupe remain unverified.
10. Do not submit more Tracking Audit leads while workflow internals remain unreviewed. The user declined removing/stopping already-active Tracking Audit Nurture contacts; review workflow/template/suppression details before any future reactivation.
11. Confirm matching browser/server Meta event IDs.
12. Confirm test/suppression contacts do not receive live nurture.
13. Confirm no PII is sent into GA4 event params.
14. Confirm debug/test modes are off after QA.
15. After Netlify paid plan purchase and explicit approval, mirror working updates to Netlify and repeat deployment/live readiness checks.
16. Before production deployment approval, complete the Ketch/GTM dashboard remediation items in `KETCH_GTM_STRICT_PREVIEW_QA_2026-06-24.md`, then rerun the Ketch QA checklist in `KETCH_CONSENT_READINESS_2026-06-24.md` on desktop and mobile.

## Ketch/GTM State - 2026-06-29

- Approved preview: `https://atd-website-test-bizccowc5-alphatrackdigitals-projects.vercel.app`
- Fresh full consent matrix: pass.
- Initial route-specific delivery check failed on `/book-a-call/thank-you`; a fail-closed Meta transport guard was added.
- Corrected preview `https://atd-website-test-lxj2vgs9r-alphatrackdigitals-projects.vercel.app` now produces zero Meta requests under Analytics-only and allows Meta only after all three ad fields grant.
- GTM workspace `9`: `22` modified tags, no added/deleted tags.
- Consent checks remain correct in draft: GA4 requires `analytics_storage`; Google Ads Conversion Linker and Meta require all three ad consent fields.
- Correction: all seven Meta tags are Custom HTML with normal visible status. No visible pause or malware warning was found; hidden repeated accessibility text caused the earlier false classification.
- No LinkedIn tag, Google Ads conversion tag, Google Ads remarketing tag, or Clarity tag is configured.
- Public Ketch config exposes `analytics___measurement` and `targeted_advertising` as opt-in purposes, but no Cookie Policy URL.
- GTM status: technically ready for explicit publish approval, but not published. Production and Clarity remain blocked pending GTM publish and post-publish QA.
- Clarity account verification confirmed project `xbn6g2k18j`, site `https://www.alphatrack.digital`, Balanced masking, cookies on, bot detection on, and setup not complete. No Clarity tag was saved or published in this continuation.
