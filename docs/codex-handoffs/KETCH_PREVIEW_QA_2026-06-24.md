# Ketch Preview QA

Date: 2026-06-24.

## Final Status Update - 2026-06-29

This report records an earlier failed preview and is retained for engineering history only. Later remediation passed, GTM Version 9 was published, and release commit `c0f63437d9ba8d36be9dea3c7b8747a6d9275ba8` was packaged for manual cPanel deployment. Do not use the blockers below as the current release state.

## Deployment

| Item | Value |
| --- | --- |
| Target | Vercel preview, non-production |
| Status | Ready |
| Preview URL | `https://atd-website-test-rglrf9sxv-alphatrackdigitals-projects.vercel.app` |
| Deployment ID | `dpl_EJzFbvDGGMPzB3tBnMNfZqVMaYEK` |
| Production deploy | Not performed |
| GTM publish | Not performed |
| Clarity install | Not performed |

Evidence folder: `docs/codex-handoffs/evidence/ketch-preview-qa-2026-06-24/`.

Generated JSON evidence has cookie values, localStorage values, and third-party query parameter values redacted. Screenshots contain only rendered page/banner state.

## Executive Result

Ketch is not ready for production. The repo-side installation deployed successfully to preview, but QA found Ketch/GTM configuration blockers:

- GA4 fires before any consent choice on ordinary page visits.
- Brevo Conversations loads before any consent choice on `/book-a-call`.
- Meta Pixel and Google Ads conversion requests fire before any consent choice on `/book-a-call/thank-you`.
- The Ketch preference UI exposes only `Targeted Advertising`, marks it `Always Active`, and stores it as granted even after `Reject All`.
- Accept All did not update `analytics_storage`, `ad_storage`, `ad_user_data`, or `ad_personalization` to `granted` in the observed `dataLayer`.
- GTM Preview / Tag Assistant and Ketch dashboard tracker discovery were not verified because no authenticated GTM/Ketch dashboard surface was available in this session.

## Script Order

Preview HTML confirmed:

1. Google Consent Mode v2 defaults.
2. Ketch Smart Tag.
3. Existing GTM container `GTM-MVXWCTZ8`.

This passed the repo/deployed HTML check.

## Route Coverage

Fresh browser contexts were used for each route. The Ketch banner appeared on every checked route.

| Route | HTTP | Banner | Pre-consent third-party activity observed |
| --- | --- | --- | --- |
| `/` | 200 | Pass | Ketch, GTM, GA4 |
| `/contact-us` | 200 | Pass | Ketch, GTM, GA4 |
| `/book-a-call` | 200 | Pass | Ketch, GTM, GA4, Brevo |
| `/offer/tracking-audit` | 200 | Pass | Ketch, GTM, GA4 |
| `/contact-us/thank-you` | 200 | Pass | Ketch, GTM, GA4 |
| `/book-a-call/thank-you` | 200 | Pass | Ketch, GTM, GA4, Meta, Google Ads |
| `/privacy-policy` | 200 | Pass | Ketch, GTM, GA4 |
| `/cookie-policy` | 200 | Pass | Ketch, GTM, GA4 |
| `/terms-of-service` | 200 | Pass | Ketch, GTM, GA4 |

No Microsoft Clarity requests were observed.

## Consent Interaction QA

| Check | Status | Evidence / note |
| --- | --- | --- |
| Ketch Smart Tag loads before GTM | Pass | Deployed HTML order confirms Ketch before GTM. |
| Consent Mode v2 defaults before GTM | Pass | Deployed HTML and `dataLayer` show denied defaults before `gtm.js`. |
| Consently no longer loads | Pass | No Consently request observed in route or interaction captures. |
| Banner appears correctly on first visit | Partial | Banner appears on desktop/mobile, but purpose configuration is wrong. |
| Accept All grants analytics/ad consent | Fail | `dataLayer` still showed `analytics_storage: denied`; no observed grant update for ad consent fields. |
| Reject All keeps analytics/ad consent denied | Fail | Google consent stayed denied, but Ketch still stored `targeted_advertising` as granted. |
| Manage Preferences category-level selection | Fail | Only `Targeted Advertising` appeared and it was marked `Always Active`; no category-level analytics/marketing selection was available. |
| Choice persistence | Partial | Accept/Reject choice persists enough to hide the banner after reload, but rejected state still stores targeted advertising as granted. |
| Floating trigger reopens preferences | Pass | `Show Preferences` reopened the Ketch preference UI after reload on mobile. |
| Non-essential tags blocked before consent | Fail | GA4, Brevo Conversations, Meta, and Google Ads requests were observed before consent in the routes noted above. |
| GTM Preview / Tag Assistant confirms consent changes | Not verified | Authenticated GTM/Tag Assistant access was not available through current tooling. Runtime evidence indicates consent integration is incomplete/misconfigured. |
| Ketch dashboard tracker discovery | Not verified | Ketch dashboard was not available in this session. Preview traffic should now exist for manual tracker discovery review. |

## Observed Runtime Consent Signals

The preview `dataLayer` consistently showed the repo default:

- `analytics_storage: denied`
- `ad_storage: denied`
- `ad_user_data: denied`
- `ad_personalization: denied`
- `personalization_storage: denied`
- `functionality_storage: granted`
- `security_storage: granted`

After Ketch loaded, runtime events included:

- `ketchGeoip`
- `ketchJurisdiction`
- `ketchPermitChanged`
- `switchbitPermitChanged`

The observed Ketch/Google consent update only referenced `analytics_storage: denied`; it did not grant analytics after Accept All and did not update all Consent Mode v2 fields.

## Ketch Purpose Configuration Issue

The preference UI showed:

- `Targeted Advertising`
- `Always Active`

It did not show Analytics & Measurement, Website Essentials, or separate marketing/advertising toggles. Both first-visit legal-basis default and `Reject All` stored `targeted_advertising` as granted in the redacted consent evidence.

Required Ketch dashboard changes before retest:

- Remove `Always Active` behavior from Targeted Advertising unless there is a documented legal basis and business approval.
- Expose distinct controllable purposes for Analytics & Measurement and Targeted Advertising.
- Ensure Reject All denies optional analytics and advertising purposes.
- Ensure Accept All grants Analytics & Measurement and Targeted Advertising.
- Confirm Cookie Policy is deployed/attached correctly.
- Keep Website Essentials / Essential Services limited to required site operation and consent storage.

## Required GTM Changes Before Production

Do not publish without approval.

Required review/configuration:

- Confirm whether the Ketch GTM consent mode template is installed in GTM. Runtime evidence suggests some Ketch/Google consent integration is present, but it is incomplete or misconfigured.
- Configure Ketch consent updates for all required Consent Mode v2 fields:
  - `analytics_storage`
  - `ad_storage`
  - `ad_user_data`
  - `ad_personalization`
  - `personalization_storage` if used
- Gate GA4 page_view and conversion events on Analytics & Measurement consent, or deliberately document Consent Mode cookieless behavior if GA4 pings are allowed before consent in target jurisdictions.
- Gate Google Ads conversion/remarketing on Targeted Advertising consent and appropriate Google consent fields.
- Gate Meta Pixel and LinkedIn Insight Tag with additional consent checks/triggers tied to Targeted Advertising.
- Review Brevo Conversations loading. If treated as essential support functionality, document that basis; otherwise gate it behind the appropriate purpose.
- Keep Microsoft Clarity uninstalled until all Ketch/GTM checks pass, then add project `xbn6g2k18j` only under Analytics & Measurement consent.

## Legal Link Check

The Ketch banner Privacy Policy link pointed to:

- `https://www.alphatrack.digital/privacy-policy`

Footer/legal routes rendered in preview:

- `/privacy-policy`
- `/cookie-policy`
- `/terms-of-service`

Ketch dashboard document attachment still needs manual verification for Cookie Policy and Terms of Service.

## Production Recommendation

Do not deploy this Ketch migration to production yet.

Next safe step: fix Ketch purpose configuration and GTM consent gating in draft/preview only, then repeat this same preview QA before requesting production approval.
