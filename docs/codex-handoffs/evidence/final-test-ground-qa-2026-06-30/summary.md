# Final Test-Ground QA

Date: 2026-06-30

Canonical test URL: `https://website-internal-test.vercel.app/`

Test deployment commit: `470696ba949da22464b95f5fe76b4ea1ecac511e`

Repository documentation HEAD at sprint start: `105bb9634a689a4a3833b8d5fcc714124f990adc`

GTM: container `GTM-MVXWCTZ8`, published Version 9, Default Workspace 10 with `0` workspace changes.

## Final Status

| Area | Status | Evidence / limitation |
| --- | --- | --- |
| Canonical Vercel test deployment | Pass | Alias serves the clean preview containing consent fix `9d5b8ea`. |
| Accept All | Pass | All analytics/ad Consent Mode fields granted; `personalization_storage` remains denied by design. |
| Reject All | Pass | Fresh post-confirmation tab loaded no GTM, GA4, Meta, DoubleClick, or Clarity assets. |
| Analytics-only | Pass | GTM, GA4, and Clarity loaded; GA4 sent a route `page_view`; Meta and DoubleClick were absent. |
| Targeted Advertising-only | Pass | GTM, Meta PageView, and Conversion Linker traffic loaded; GA4 and Clarity were absent. |
| Clarity consent gating | Pass | Clarity collects only when analytics consent is granted. |
| Clarity funnels | Pass | Three funnels created without save failures; no private recordings viewed. |
| GA4 base/config | Pass | Google Tag exists, requires `analytics_storage`, and loaded after analytics consent. |
| GA4 page views | Pass | `send_page_view` resolves to `false`; virtual `page_view` uses `atd_route_view` and sent on a checked route. |
| GA4 conversion/event tags | Partial | Tags and repo events align for `generate_lead`, `contact_form_submit`, `tracking_audit_submit`, `newsletter_subscribe`, `exit_popup_success`, `booking_cta_click`, `booking_scheduler_open`, and `meeting_booking_redirect`. Existing GA4 Realtime evidence includes booking-related events, but this sprint did not produce runtime proof for every listed conversion event. No repeat submission was needed. |
| Meta base PageView | Pass | Base tag requires all three ad-consent fields. PageView traffic was observed after Accept All/advertising consent and absent after confirmed Reject All and Analytics-only. |
| Meta Lead events | Partial | Conversion tags align to booking, contact, tracking-audit, newsletter, exit-popup, and WhatsApp events. Base PageView delivery is proven, but current platform event-row and browser/server deduplication proof for each Lead flow remains a follow-up. |
| Google Ads | Deferred / future | Conversion Linker exists and requires `ad_storage`, `ad_user_data`, and `ad_personalization`. No conversion or delivery tags were created. Conversion ID/label may remain pending until Google Ads launch. |
| Book-a-call | Partial | One prior approved booking verified confirmation, Strategy Call list membership, confirmation email, and GA4 booking events. CRM deal/task and custom webhook proof remain incomplete. |
| Contact Us | Pass with analytics caveat | Prior frontend thank-you, Brevo list, source attributes, CRM deal/task, and notification evidence exists. Current per-submission Meta/GA4 event-row proof was not repeated. |
| Tracking Audit | Pass with analytics caveat | Prior frontend success, list routing, CRM deal/task, notification, and source-history evidence exists. |
| Newsletter | Partial | Brevo routing and notification evidence exists; the saved frontend sample did not capture visible success text. |
| Exit Popup | Partial | Brevo routing/source evidence exists; the saved frontend sample did not capture visible success text. |
| Cookie Policy workaround | Conditional | Website Cookie Policy remains live and linked, and legal routes return `200`. Exact Ketch attachment/workaround action remains undefined and requires stakeholder/legal or vendor guidance. |
| Legal pages | Pass | Privacy Policy, Cookie Policy, and Terms of Service returned `200` with rendered HTML. |
| Tracking Audit Nurture | Risk retained | Workflow remains paused, but contacts already active at pause time may continue. No workflow was reactivated. |

## Tracking Findings

### GA4

- Base Google Tag is present and consent-gated by `analytics_storage`.
- `send_page_view` uses a constant that resolves to `false`.
- The dedicated GA4 `page_view` tag uses `atd_route_view`, with data-layer page location/path and current page title.
- A GA4 route collection request was observed after analytics consent.
- Existing GTM tags match the repo event contract for the requested lead and booking events.

### Meta

- Base Pixel exists and requires `ad_storage`, `ad_personalization`, and `ad_user_data`.
- Meta PageView was observed after advertising consent.
- Meta was absent after confirmed Reject All and during Analytics-only.
- Conversion tags are sequenced through the base tag and use the documented repo events.

### Google Ads

- Conversion Linker exists and is correctly gated by all three advertising-consent fields.
- The linker emitted its expected consent-mode request under advertising consent.
- Google Ads conversion/delivery tracking is **Deferred until Google Ads launch**. No conversion tag, delivery tag, ID, or label was added.

## Changes And Safety

- GTM changes made: none.
- GTM publish performed in this sprint: none. Version 9 was already live.
- Source-code changes: none.
- Vercel changes in this sprint: none; the canonical alias/deployment correction was completed in the prior sprint.
- Controlled forms/bookings/webhooks submitted in this sprint: none. Existing evidence was sufficient.
- Live systems changed in this sprint: none. Read-only GTM/Tag Assistant and browser checks only.
- Secrets/private data exposed in committed evidence: none.
- Clarity follow-ups: production funnel validation, later Smart Events review, Balanced masking review without weakening defaults, and later AI Visibility review.

## Deployment Recommendation

Namecheap/cPanel deployment is **conditional**, not fully cleared:

- Core consent behavior, GA4 page views, Meta PageView, Clarity gating, and the deferred Google Ads scope are test-ground ready.
- Before production deployment, the owner must approve the exact website Cookie Policy workaround or obtain Ketch/vendor guidance.
- Decide whether Book-a-call CRM deal/task and custom webhook proof are mandatory launch gates. If mandatory, complete one separately controlled booking QA before production.
- Explicit Namecheap/cPanel deployment approval is still required.

No additional GTM publish is needed based on this sprint's evidence.
