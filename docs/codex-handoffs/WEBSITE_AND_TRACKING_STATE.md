# Website And Tracking State

Last updated: 2026-06-22.

## Website Stack

Verified repo stack: Vite, React, TypeScript, React Router, Tailwind CSS, shadcn/Radix UI. The prompt's note that this is a Next.js project is unverified and conflicts with `package.json`, `README.md`, and repo structure.

## Deployment / Testing Context

- Vercel is the current development/testing environment for working site and server verification.
- Netlify is the planned future live deployment target after ATD purchases/subscribes to the paid Netlify plan.
- Working updates should later be mirrored to Netlify before final live deployment.
- Do not claim Netlify production validation is possible until the paid Netlify plan/account is ready and an approved deployment has happened.
- Vercel visual page-render evidence now exists for selected pages from `https://website-internal-test.vercel.app`.
- Contact Us has partial Vercel frontend submission evidence from 2026-06-22: one approved QA submission redirected to `/contact-us/thank-you` and showed `Message Received!`. Brevo, CRM, notification, Meta, and GA4 effects remain `Unverified`.

## Main Pages / Flows Touched

| Flow / page | Route | Status | Verification |
| --- | --- | --- | --- |
| Contact Us | `/contact-us` -> `/contact-us/thank-you/` | Form posts to lead endpoint, marks conversion intent, redirects after success | Partial Vercel frontend submission evidence, `src/pages/ContactUs.tsx`, tests |
| Book A Free Strategy Call | `/book-a-call` -> `/book-a-call/thank-you/` | Brevo Meetings embed/webhook plus client fallback events | docs, `api/brevo-meeting-webhook.ts` |
| Tracking Audit | `/offer/tracking-audit` | Form posts to lead endpoint and pushes tracking audit event | `src/pages/TrackingLandingPage.tsx` |
| Newsletter | footer/shared section | DOI-ready; pushes Subscribe event | code/docs/tests |
| Exit popup | site-wide popup | Posts to `/api/brevo-subscribe`; pushes Lead event | code/tests |
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

`src/lib/apiEndpoints.ts` resolves local/Vercel-like hosts to same-origin API paths and nonlocal static hosts to `https://alphatra-serv.netlify.app`. Given the corrected deployment context, the next safe server verification should target the active Vercel development/testing setup if the user approves testing. Current Vercel runtime behavior is `Unverified` in this pass.

## Vercel Visual Page-Render Evidence

Controlled browser screenshots were captured from `https://website-internal-test.vercel.app` under `docs/codex-handoffs/evidence/vercel-visual-pass-2026-06-19/` for homepage, Contact Us, Contact thank-you, Book A Free Strategy Call, booking thank-you, Tracking Audit, newsletter confirmed, Conversion Tracking service page, Privacy Policy, Cookie Policy, and Terms of Service.

This evidence verifies visual page rendering only. During capture, external GTM/GA/Meta-style requests and non-GET/HEAD requests were blocked. No forms were submitted, no POST/webhook requests were sent, and no Brevo routing, Meta event, GA4 event, or webhook behavior is verified by these screenshots.

Minor text/accessibility observation: styled headings may expose joined text in extracted text, such as `ThatMeasures` and `andStart`; review later during accessibility/content QA.

## Controlled Contact Us Form Test Evidence

On 2026-06-22, one approved Contact Us QA submission was completed on `https://website-internal-test.vercel.app/contact-us`. The test used a QA identity, selected `Analytics/Tracking`, left marketing opt-in unchecked, reached `https://website-internal-test.vercel.app/contact-us/thank-you`, and confirmed visible success state `Message Received!`.

Evidence is stored under `docs/codex-handoffs/evidence/contact-us-form-test-2026-06-22/` as redacted JSON/DOM/console files. Browser screenshot capture timed out, so no PNG screenshot was saved for this pass.

This evidence verifies the Contact Us frontend submission path, redirect, and visible success state only. It does not verify Brevo contact creation/update, Brevo list #8 membership, CRM deal/task creation, internal notification email delivery, Meta CAPI delivery, or GA4 event delivery.

Console follow-up: the redacted console summary recorded repeated minified React errors `#418` and `#423`. This should be investigated, but is not yet a confirmed launch blocker.

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
- Contact Us frontend submission/redirect has partial current Vercel evidence, but Brevo/list #8, CRM, notification, Meta, GA4, and broader form/server behavior are not current-test validated.
- Repeated minified React console errors `#418` and `#423` were observed during the Contact Us test; investigate and scope before treating as a launch blocker.
- Netlify is a future live deployment target after paid plan purchase, not the immediate environment for current testing.
- 2026-06-14 QA found contact-page submit interference from footer newsletter validation; verify this after current contact form changes.
- Styled headings may expose joined text in extracted text, including `ThatMeasures` and `andStart`; review during accessibility/content QA.
- Suppression/blocklist behavior needs retest before live nurture confidence.
- Newsletter notification routing should be confirmed against approved `marketing@` routing.
- Production transactional webhook endpoint should not be registered until deployed and verified.

## Suggested Retest Checklist

1. Confirm active Vercel development/testing URL and deployed commit; visual-render screenshots exist for the 2026-06-19 Vercel pass.
2. Confirm Vercel same-origin API/server behavior with safe checks before form submissions.
3. Do not repeat Contact Us submission unless explicitly approved; current evidence verifies redirect/success state only.
4. After approval for read-only checks, verify Contact Us Brevo list #8, attributes, CRM handoff, internal notification, and Meta/GA4/GTM effects from the existing QA submission.
5. Investigate Contact Us React console errors `#418` and `#423` in a later QA pass.
6. Submit controlled Tracking Audit test only after approval; verify list #11, attributes, notification, Meta/GTM event.
7. Submit controlled Newsletter opt-in only after approval; verify DOI or direct capture, list #9, Subscribe event.
8. Submit controlled Exit Popup test only after approval; verify list #10 and Lead event.
9. Create controlled Brevo Meetings booking only after approval; verify list #7, sales alert, GA4 MP, Meta CAPI if configured.
10. Confirm matching browser/server Meta event IDs.
11. Confirm test/suppression contacts do not receive live nurture.
12. Confirm no PII is sent into GA4 event params.
13. Confirm debug/test modes are off after QA.
14. After Netlify paid plan purchase and explicit approval, mirror working updates to Netlify and repeat deployment/live readiness checks.
