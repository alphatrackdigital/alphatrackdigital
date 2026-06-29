# Ketch GTM Strict Preview QA

Date: 2026-06-24.

## Final Status Update - 2026-06-29

This is historical preview evidence. The corrected consent implementation and Clarity post-consent trigger were released in commit `c0f63437d9ba8d36be9dea3c7b8747a6d9275ba8`; GTM Version 9 is live. The production build package is prepared for manual cPanel deployment. Owner-run production consent QA remains pending.

## Deployment

| Item | Value |
| --- | --- |
| Target | Vercel preview, non-production |
| Status | Ready |
| Preview URL | `https://atd-website-test-l6l6n0n6u-alphatrackdigitals-projects.vercel.app` |
| Deployment ID | `dpl_EG6Gcc6D3z5syrVeGoi48piH4o3T` |
| Production deploy | Not performed |
| GTM publish | Not performed |
| Clarity install | Not performed |

Evidence folder: `docs/codex-handoffs/evidence/ketch-gtm-strict-preview-qa-2026-06-24/`.

Runtime JSON evidence has third-party query values redacted and does not store cookies, localStorage values, auth headers, or account secrets.

## Executive Result

Repo-side pre-consent tracking behavior is now controlled in preview. GTM is no longer inserted on page load. It is released only after an explicit Google Consent Mode update grants one of the optional consent fields:

- `analytics_storage`
- `ad_storage`
- `ad_user_data`
- `ad_personalization`
- `personalization_storage`

This keeps GTM, GA4, Google Ads, Meta, LinkedIn, and other GTM-managed non-essential tags from firing while Ketch is still returning denied Consent Mode fields.

Ketch dashboard configuration is still blocked and must be fixed in Ketch/GTM UI before production approval:

- Public Ketch config still exposes only `targeted_advertising`.
- Analytics & Measurement is still missing while gtag mapping references `analytics___measurement`.
- Cookie Policy is still blank in public Ketch config.
- Manage Preferences still shows only Targeted Advertising and marks it Always Active.
- Accept All still does not grant observed Consent Mode v2 analytics/ad fields.
- Reject All still produces `targeted_advertising: true` because Targeted Advertising is configured as Always Active.

## Code Change

`index.html` now keeps the Consent Mode denied defaults and Ketch Smart Tag before GTM, but replaces the immediate GTM loader with a guarded loader:

1. Initialize denied Consent Mode v2 defaults.
2. Install a `dataLayer.push` observer.
3. Load Ketch Smart Tag.
4. Insert GTM only after a `consent update` grants an optional Consent Mode field.

The GTM noscript iframe was removed because it would load GTM when JavaScript is disabled, before Ketch can collect or apply consent.

Brevo Conversations remains gated in `src/components/shared/WhatsAppWidget.tsx` behind analytics consent.

## Browser QA Summary

| Check | Status | Evidence / note |
| --- | --- | --- |
| Ketch loads before GTM | Pass | Ketch requests observed; GTM was not inserted before consent. |
| Consent Mode v2 defaults before Ketch/GTM | Pass | Denied defaults appear first in `dataLayer`. |
| Consently/Cookiebot absent | Pass | No old CMP request observed. |
| Banner appears on first visit | Partial | Banner appears, but Ketch purposes remain wrong. |
| No GA4 before consent | Pass | No GA4 request observed in checked pre-consent flows. |
| No Google Ads before consent | Pass | No Google Ads request observed in checked pre-consent flows. |
| No Meta before consent | Pass | No Meta request observed on `/book-a-call/thank-you` before consent. |
| No LinkedIn before consent | Pass | No LinkedIn request observed. |
| No Brevo Conversations before consent | Pass | No `conversations-widget.brevo.com` request observed. |
| No Clarity | Pass | No Clarity request observed. |
| Accept All grants analytics/ad consent | Fail | Ketch still leaves observed optional Consent Mode fields denied. GTM remains blocked by design. |
| Reject All keeps analytics/ad consent denied | Partial | Consent Mode remains denied, but Ketch still emits `targeted_advertising: true`. |
| Manage Preferences category-level selection | Fail | Only Targeted Advertising appears and is Always Active. |
| Floating trigger reopens preferences | Previously passed | Not revalidated in this strict run; prior preview showed Show Preferences opens the modal. |
| GTM Preview / Tag Assistant | Not verified | Chrome dashboard automation was blocked in this session. |
| Ketch tracker discovery | Not verified | Chrome dashboard automation was blocked in this session. |

## Request Groups Observed

| Flow | Observed third-party groups |
| --- | --- |
| `/` first visit | Ketch only |
| `/book-a-call` first visit | Ketch and Brevo Meetings scheduler |
| `/book-a-call/thank-you` first visit | Ketch only |
| Accept All | Ketch only |
| Reject All | Ketch only |
| Manage Preferences | Ketch only |

Brevo Meetings on `/book-a-call` remains a policy decision: classify it as essential booking functionality or gate the booking page until consent.

## Remaining Dashboard Work

Do not deploy production or publish GTM until these are complete and retested:

1. In Ketch, deploy Website Essentials as required/always active.
2. In Ketch, deploy Analytics & Measurement as optional/default off/selectable.
3. In Ketch, deploy Targeted Advertising as optional/default off/selectable.
4. Remove Always Active from Targeted Advertising unless explicitly approved and legally justified.
5. Attach Privacy Policy, Cookie Policy, and Terms of Service to the deployed experience.
6. Configure Ketch gtag mappings so Analytics & Measurement grants `analytics_storage`, and Targeted Advertising grants `ad_storage`, `ad_user_data`, and `ad_personalization`.
7. In GTM draft/preview, ensure GA4 requires Analytics & Measurement consent and advertising tags require Targeted Advertising consent.
8. Rerun browser QA and GTM Preview / Tag Assistant before production approval.

## Recommendation

The repo-side pre-consent leak is fixed in preview, but Ketch is still not production-ready because the dashboard purpose and Consent Mode mappings remain wrong. Keep production blocked, keep GTM unpublished, and keep Microsoft Clarity uninstalled until Ketch/GTM dashboard remediation passes QA.
