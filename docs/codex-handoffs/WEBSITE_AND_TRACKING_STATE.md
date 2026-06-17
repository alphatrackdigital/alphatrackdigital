# Website And Tracking State

Last updated: 2026-06-17.

## Website Stack

Verified repo stack: Vite, React, TypeScript, React Router, Tailwind CSS, shadcn/Radix UI. The prompt's note that this is a Next.js project is unverified and conflicts with `package.json`, `README.md`, and repo structure.

## Main Pages / Flows Touched

| Flow / page | Route | Status | Verification |
| --- | --- | --- | --- |
| Contact Us | `/contact-us` -> `/contact-us/thank-you/` | Form posts to lead endpoint, marks conversion intent, redirects after success | `src/pages/ContactUs.tsx`, tests |
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

`src/lib/apiEndpoints.ts` resolves local/Vercel-like hosts to same-origin API paths and nonlocal static hosts to `https://alphatra-serv.netlify.app`.

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

- Latest fixes may not be live due to Netlify deploy blocker.
- 2026-06-14 QA found contact-page submit interference from footer newsletter validation; verify this after current contact form changes.
- Suppression/blocklist behavior needs retest before live nurture confidence.
- Newsletter notification routing should be confirmed against approved `marketing@` routing.
- Production transactional webhook endpoint should not be registered until deployed and verified.

## Suggested Retest Checklist

1. Confirm deployed frontend commit and backend commit.
2. Submit controlled Contact Us test; verify redirect, Brevo list #8, attributes, notification, Meta/GTM event.
3. Submit controlled Tracking Audit test; verify list #11, attributes, notification, Meta/GTM event.
4. Submit controlled Newsletter opt-in; verify DOI or direct capture, list #9, Subscribe event.
5. Submit controlled Exit Popup test; verify list #10 and Lead event.
6. Create controlled Brevo Meetings booking; verify list #7, sales alert, GA4 MP, Meta CAPI if configured.
7. Confirm matching browser/server Meta event IDs.
8. Confirm test/suppression contacts do not receive live nurture.
9. Confirm no PII is sent into GA4 event params.
10. Confirm debug/test modes are off after QA.
