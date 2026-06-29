# Ketch Remediation Preview QA

Date: 2026-06-24.

## Final Status Update - 2026-06-29

This report is a historical remediation checkpoint. The final Ketch/Consent Mode/Clarity implementation is in release commit `c0f63437d9ba8d36be9dea3c7b8747a6d9275ba8`, GTM Version 9 is published, and the cPanel ZIP is ready for the dev guy. Manual production deployment and the full owner-run production consent matrix remain pending.

## Deployment

| Item | Value |
| --- | --- |
| Target | Vercel preview, non-production |
| Status | Ready |
| Preview URL | `https://atd-website-test-qowl1215w-alphatrackdigitals-projects.vercel.app` |
| Deployment ID | `dpl_5QuDEghwXXvgQmB1Qznj6GyuDwRs` |
| Production deploy | Not performed |
| GTM publish | Not performed |
| Clarity install | Not performed |

Evidence folder: `docs/codex-handoffs/evidence/ketch-remediation-preview-qa-2026-06-24/`.

Generated runtime JSON evidence has cookie values, localStorage values, and third-party query parameter values redacted. Screenshots contain rendered page/banner state only. The saved Ketch config evidence is a public Ketch CDN config response and does not include account session data.

## Executive Result

Production remains blocked. The repo-side Brevo Conversations early-load issue was fixed and verified, but Ketch dashboard configuration and GTM consent enforcement are still incomplete:

- Ketch public config exposes only `targeted_advertising`; `Website Essentials` and `Analytics & Measurement` are not deployed as visible purposes.
- `targeted_advertising` still renders as `Always Active` in Manage Preferences.
- Ketch gtag mapping references `analytics___measurement`, but that purpose is not present in the deployed public config.
- Ketch public config has Privacy Policy and Terms of Service URLs, but the Cookie Policy URL is blank.
- GA4 still fires before consent.
- Meta Pixel and Google Ads conversion requests still fire before consent on `/book-a-call/thank-you`.
- Accept All and Reject All still do not produce the required observed Consent Mode v2 state transitions.
- Microsoft Clarity remains absent, as required.

## Code Remediation Completed

`src/components/shared/WhatsAppWidget.tsx` now gates the Brevo Conversations chat widget behind analytics/measurement consent. It listens for Ketch/GTM consent updates through `window.dataLayer`, checks both Consent Mode `analytics_storage: granted` and Ketch-style analytics purpose grants, and only injects `brevo-conversations-script` after analytics consent is observed.

Focused test coverage was added in `src/test/whatsapp-widget.consent.test.tsx`:

- Brevo Conversations is not injected before consent, even after timers run.
- Brevo Conversations is injected after a `dataLayer` consent update grants `analytics_storage`.

Validation run:

- `npx vitest run src/test/whatsapp-widget.consent.test.tsx` passed.
- `npm run build:client` passed.

## Public Ketch Config Findings

Public config URL checked:

- `https://global.ketchcdn.com/web/v3/config/alphatrack_digital/website_smart_tag/production/default/en/config.json`

Key deployed config values:

| Check | Observed value | Status |
| --- | --- | --- |
| Deployment code | `ATD_PROD_01` | Pass |
| Property code | `website_smart_tag` | Pass |
| Purposes deployed | `targeted_advertising` only | Fail |
| Analytics & Measurement purpose | Missing, while referenced by gtag mapping as `analytics___measurement` | Fail |
| Website Essentials purpose | Missing from visible purposes | Fail |
| Targeted Advertising | Present, rendered Always Active in UI | Fail |
| Privacy Policy URL | `https://www.alphatrack.digital/privacy-policy` | Pass |
| Cookie Policy URL | Blank in public config | Fail |
| Terms of Service URL | `https://www.alphatrack.digital/terms-of-service` | Pass |
| gtag purpose mapping | `analytics_storage` -> `analytics___measurement` | Fail until matching purpose is deployed |

This explains why Manage Preferences shows only Targeted Advertising, why Analytics & Measurement is not selectable, and why Ketch cannot correctly grant analytics consent.

## Repeat Browser QA

| Check | Status | Evidence / note |
| --- | --- | --- |
| Ketch Smart Tag loads before GTM | Pass | Deployed HTML order remains Consent Mode defaults, Ketch, then GTM. |
| Consent Mode v2 defaults before GTM | Pass | Defaults remain in `index.html` before Ketch/GTM. |
| Consently no longer loads | Pass | No Consently or Cookiebot request observed. |
| Banner appears on first visit | Partial | Banner appears, but purpose configuration is wrong. |
| Accept All grants analytics/ad consent | Fail | No observed grant for required analytics/ad Consent Mode fields. |
| Reject All keeps analytics/ad consent denied | Fail | Google fields stay denied, but Ketch still treats targeted advertising as Always Active/granted. |
| Manage Preferences category selection | Fail | Only Targeted Advertising appears and is Always Active; Analytics & Measurement is absent. |
| Floating trigger reopens preferences | Pass | Show Preferences trigger still opens the Ketch modal. |
| GA4 blocked before consent | Fail | GA4 request observed before consent. |
| Google Ads blocked before consent | Fail | Google Ads conversion requests observed before consent on `/book-a-call/thank-you`. |
| Meta blocked before consent | Fail | Meta Pixel requests observed before consent on `/book-a-call/thank-you`. |
| LinkedIn blocked before consent | Not observed | No LinkedIn request observed in this repeat sample. Still requires GTM tag review. |
| Brevo Conversations blocked before consent | Pass | `conversations-widget.brevo.com/brevo-conversations.js` was not observed in repeat QA. |
| Brevo Meetings iframe behavior | Needs decision | `meet.brevo.com` scheduler assets load on `/book-a-call`; classify as essential booking functionality or gate the booking page by policy. |
| Clarity remains uninstalled | Pass | No Microsoft Clarity request observed. |
| GTM Preview / Tag Assistant confirms consent changes | Not verified | Browser connector could not access authenticated GTM/Tag Assistant state in this session. Required before production approval. |
| Ketch dashboard tracker discovery | Not verified | Browser connector could not access authenticated Ketch dashboard state in this session. Public config proves deployed purpose mismatch. |

## Required Ketch Dashboard Fixes

Do not deploy production website changes or publish GTM while doing this work.

In Ketch, fix the deployed `ATD Default XP` experience for property `alphatrack_digital / website_smart_tag` and environment `ATD_PROD_01`:

1. Expose `Website Essentials` as required / always active for required site operation, security, consent storage, and strictly necessary booking/form functionality only.
2. Expose `Analytics & Measurement` as optional, default off, and selectable in Manage Preferences.
3. Expose `Targeted Advertising` as optional, default off, and selectable in Manage Preferences.
4. Remove Always Active from Targeted Advertising unless legal counsel and business owner explicitly approve and document that basis.
5. Attach and deploy document links:
   - Privacy Policy: `https://www.alphatrack.digital/privacy-policy`
   - Cookie Policy: `https://www.alphatrack.digital/cookie-policy`
   - Terms of Service: `https://www.alphatrack.digital/terms-of-service`
6. Align Ketch gtag purpose mappings:
   - `analytics_storage` -> Analytics & Measurement.
   - `ad_storage`, `ad_user_data`, and `ad_personalization` -> Targeted Advertising.
   - `personalization_storage` -> Preferences/Personalization only if the site actually stores user preferences.
7. Confirm the public config includes all deployed purposes before repeat browser QA.

## Required GTM Fixes

Do not publish GTM without explicit approval.

In a draft GTM workspace or Preview-only configuration, verify/install/configure the Ketch consent mode template or an equivalent Ketch-to-Consent Mode update path:

- GA4 page view and event tags must require Analytics & Measurement consent / `analytics_storage`.
- Google Ads conversion and remarketing tags must require Targeted Advertising plus `ad_storage`, `ad_user_data`, and `ad_personalization`.
- Meta Pixel and LinkedIn Insight Tag must be blocked by additional consent checks or consent-aware triggers until Targeted Advertising is granted.
- Brevo Conversations is now repo-gated behind analytics consent; document whether this should instead use a separate support/chat purpose.
- Brevo Meetings on `/book-a-call` must be documented as essential booking functionality or gated according to the approved policy.
- Clarity must remain uninstalled until Ketch/GTM consent QA passes; later add project `xbn6g2k18j` only under Analytics & Measurement.

## Recommendation

Ketch is not ready for production. The next safe step is dashboard-level remediation in Ketch and GTM draft/preview only, followed by a new Vercel preview QA pass. Do not publish GTM, do not deploy to production, and do not install Microsoft Clarity until the consent checks pass.
