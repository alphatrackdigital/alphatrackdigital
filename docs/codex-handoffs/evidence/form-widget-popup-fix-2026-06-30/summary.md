# Form, Brevo Widget, and Exit-Popup/Consent Fix

Date: 2026-07-01 (continuation of 2026-06-30 launch-readiness QA)

## Scope

Fix three blockers found in manual QA on the canonical Vercel test ground (`https://website-internal-test.vercel.app/`): all four lead forms failing with generic error messages, the Brevo customer-support chat widget incorrectly gated behind analytics consent, and the exit-intent popup capable of opening while the Ketch consent banner/preference center was visible.

## Root cause of form failures

Not a source-code bug. The Vercel project's Brevo environment variables (`BREVO_API_KEY`, `BREVO_LIST_ID`, `BREVO_NEWSLETTER_LIST_ID`, `BREVO_AUDIT_LIST_ID`, `BREVO_CONTACT_LIST_ID`) were scoped only to the **Production** environment in Vercel project settings, not **Preview**. The canonical test alias `website-internal-test.vercel.app` resolves to a Preview deployment, so its `/api/leads` and `/api/brevo-subscribe` serverless functions ran with `BREVO_API_KEY` undefined, returned HTTP 500 with `{"ok": false, "message": "Lead service is not configured."}`, and all four forms (which all route through these two shared handlers) surfaced their generic frontend catch-block error text as a result.

Confirmed via `vercel env ls` (names/environments only, no values read or printed) before making any change.

## Vercel environment configuration change

Corrected directly in the Vercel dashboard (not via CLI, so no secret value was ever read, typed, or displayed to the agent): for each of the five variables above, the **Environments** scope was edited from "Production" to "Production and Preview" through the existing "Edit" dialog's environment checkboxes. The Value field was left untouched throughout - Vercel confirmed "Updated Environment Variable successfully" for each, and `vercel env ls` afterward showed all five as `Production, Preview`.

This is a Vercel project configuration change, not a source code change, and was made only after explicit owner approval to proceed this way.

## Files changed (source)

- `src/components/shared/WhatsAppWidget.tsx` - removed the `hasAnalyticsConsent()` / dataLayer-consent-watching logic that gated the Brevo Conversations widget behind `analytics_storage`. The widget now loads on the same lazy/idle schedule (6s delay, then idle callback or 12s timeout) unconditionally, since it is customer-support chat, not an analytics or advertising tag. A code comment documents the privacy rationale: functional/support communication is treated as covered by `functionality_storage`, which defaults to granted in `index.html`'s Consent Mode defaults, independent of `analytics_storage`/`ad_storage`/`ad_user_data`/`ad_personalization`.
- `src/components/shared/ExitIntentPopup.tsx` - added `isConsentUiVisible()`, which detects Ketch's banner and preference-center UI via `[data-ketch-backdrop="true"]` and `#lanyard_root [role="dialog"]` bounding-rect visibility (state/DOM-based, not a z-index fix). The existing `trigger()` function (the single entry point for both desktop mouseout and mobile scroll/timeout triggers) now checks this before opening the popup; if consent UI is visible it defers via a capped retry loop (1s interval, up to 30 retries) instead of opening or permanently giving up, so the popup can still appear normally once consent UI is dismissed.
- `src/test/whatsapp-widget.consent.test.tsx` - updated to assert the new behavior (loads without any consent signal being pushed to dataLayer) instead of the old analytics-gated behavior.

No other source files were changed.

## Form QA (canonical Vercel test ground, post-fix, clearly marked QA identity)

QA identity used throughout: `atd-qa-formwidgetfix-2026-07-01@alphatrack.digital`, first name `ATD-QA`, last name `FormWidgetFix`.

- **Contact Us**: submitted with Analytics/Tracking interest selected. Redirected to `/contact-us/thank-you` ("Message Received"), no generic error. `contact_form_submit` pushed to dataLayer.
- **Tracking Audit**: submitted with spend level and Google Ads platform selected. Same-page success state "Request received", no generic error. `tracking_audit_submit` pushed to dataLayer.
- **Newsletter** (footer): submitted with opt-in checked. Success state "You're subscribed!", no generic error. `newsletter_subscribe` pushed to dataLayer.
- **Exit Popup**: submitted after triggering via mouseout. Success state "Your audit request is in.", no generic error. `exit_popup_view`, `exit_popup_submit`, and `exit_popup_success` pushed to dataLayer in sequence.
- GA4/Meta event-row-level proof and Brevo list/CRM read-only verification were not repeated this session (out of scope for this fix pass); dataLayer-level proof above confirms the frontend-to-backend path now completes successfully for all four flows. No duplicate submissions beyond the one QA pass per form were made.

## Brevo widget consent behavior

- Fresh visit, before any consent decision: widget lazy-loads on its normal timer regardless of consent state (confirmed via code review; no gating logic remains).
- **Reject All** (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`, `personalization_storage` all `denied`; only `functionality_storage`/`security_storage` `granted`), verified on a genuinely fresh page load: `brevo-conversations-script` element present in the DOM after the lazy-load window elapsed. Widget loads.
- Same Reject-All fresh load confirmed no regression: `clarity.ms` script absent, `window.fbq` undefined - Clarity and Meta remain correctly gated behind consent that was not granted.

## Exit popup vs. Ketch consent-modal behavior

- With the Ketch banner/preference-center visible (`[data-ketch-backdrop="true"]` present with non-zero size), a synthetic exit-intent mouseout event was dispatched: the popup did **not** open (`document.querySelector('[aria-labelledby="exit-popup-title"]')` returned null).
- After the consent UI was fully dismissed (Ketch's two-step banner -> detailed Purposes screen -> Confirm flow was completed), a fresh mouseout event opened the popup normally.
- No console errors were introduced by the guard logic.

## Consent regression check

- Ketch banner, "Manage Preferences" detail screen, Accept All, and Reject All all continued to function normally throughout testing; no Ketch dashboard settings were changed.
- Clarity: absent under Reject All on a fresh load (still analytics-consent gated, unchanged from prior sessions).
- Meta (`window.fbq`): absent under Reject All (still advertising-consent gated, unchanged from prior sessions).
- GTM (`window.google_tag_manager`) continued to load and process consent updates normally (`atd_consent_update`, `ketchPermitChanged`, `switchbitPermitChanged` events observed as expected).

## Build/lint result

- `npm run lint`: 0 errors, 7 pre-existing unrelated warnings (shadcn UI `react-refresh/only-export-components`), unchanged from before this session.
- `npx vitest run`: 20 test files, 65 tests, all passed, including the updated `whatsapp-widget.consent.test.tsx` and the pre-existing `exit-intent-popup.test.tsx` (8 tests, unaffected by the new guard).
- `npm run build` (client + server + homepage prerender): exit code 0.

## Vercel test deployment / alias status

- New preview deployment built from the current `main` (post-fix): `dpl_ED5bDnRcPkfLKgBtFNJSGg1cUuCR` (`atd-website-test-b1rnic9nu-alphatrackdigitals-projects.vercel.app`).
- Canonical test alias `https://website-internal-test.vercel.app/` reassigned to this deployment. Confirmed serving the fix on re-navigation.
- No Namecheap/cPanel deployment and no Vercel production promotion occurred.

## Safety confirmations

- Namecheap/cPanel: not touched.
- GTM: not published, not modified. Ketch dashboard: not modified (only the site's own consent banner/preference UI was interacted with as a website visitor would, which is expected end-user interaction, not a dashboard configuration change).
- GA4, Meta, Google Ads, Clarity, Brevo, Netlify, Notion dashboards: not touched.
- Brevo workflows: none activated.
- Forms/webhooks submitted: exactly one QA submission each for Contact Us, Tracking Audit, Newsletter, and Exit Popup, all using the clearly marked QA identity above and a message noting "Please disregard." No real customer data was used, and no submissions were repeated beyond what was needed to verify the fix.
- Secrets/private data: no environment variable values, API keys, tokens, or other secrets were read, printed, or exposed at any point. The Vercel environment-variable scope change was made entirely through the dashboard's masked Value field and environment checkboxes.

## Blocker status

This clears the three blockers in scope: form submission failures, Brevo widget consent-gating, and exit-popup/Ketch-modal conflict. Remaining pre-production items are unchanged from prior sessions: the Cookie Policy workaround decision, whether Book-a-call CRM/webhook proof is a mandatory launch gate, and explicit Namecheap/cPanel deployment approval. Namecheap/cPanel deployment remains **conditional** pending those items - not newly blocked or newly cleared by this session, since this session's fixes were specific to the test ground and did not touch production hosting.
