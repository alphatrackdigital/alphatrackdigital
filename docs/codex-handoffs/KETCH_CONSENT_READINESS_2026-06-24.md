# Ketch Consent Readiness Report

Date: 2026-06-24.

## Final Status Update - 2026-06-29

This report is historical implementation context. GTM workspace 9 was subsequently published as Version 9. Release commit `c0f63437d9ba8d36be9dea3c7b8747a6d9275ba8` is on `main`, and `atd-production-dist-c0f6343.zip` is ready for manual Namecheap/cPanel deployment by the dev guy. The full production six-scenario consent matrix and Cookie Policy workaround approval remain pending.

## Scope

Repo implementation for Ketch as the active website CMP plus safe handoff documentation. No production deploy, GTM publish, Ketch dashboard mutation, Clarity activation, billing action, campaign send, or secret exposure was performed.

Notion handoff created after repo implementation:

- `Ketch Consent Readiness - 2026-06-24`: `https://app.notion.com/p/38917ea57b5581739dede8fc2c13a640`

Preview QA completed after approved non-production deployment:

- `KETCH_PREVIEW_QA_2026-06-24.md`
- Evidence folder: `docs/codex-handoffs/evidence/ketch-preview-qa-2026-06-24/`
- Result: blocked for production. Ketch loads and banner appears, but Ketch purpose configuration and GTM consent gating failed key checks.

## Root Cause Of Old Consent Setup

`index.html` loaded GTM before any explicit Google Consent Mode default and then injected the expired Consently script on `alphatrack.digital` / `www.alphatrack.digital`, with a `consently-preview=1` escape hatch for other hosts. This meant the production CMP path depended on Consently and the repo did not set `analytics_storage`, `ad_storage`, `ad_user_data`, or `ad_personalization` defaults before GTM loaded.

## Files Changed

- `index.html`
- `docs/codex-handoffs/KETCH_CONSENT_READINESS_2026-06-24.md`
- `docs/codex-handoffs/README.md`
- `docs/codex-handoffs/WEBSITE_AND_TRACKING_STATE.md`
- `docs/codex-handoffs/OPEN_ITEMS_FOR_NEXT_AGENT.md`
- `docs/codex-handoffs/TECHNICAL_CHANGELOG.md`

## Implementation Summary

- Removed the Consently script injector and banner ID from `index.html`.
- Added Google Consent Mode v2 defaults before GTM:
  - `analytics_storage = denied`
  - `ad_storage = denied`
  - `ad_user_data = denied`
  - `ad_personalization = denied`
  - `personalization_storage = denied`
  - `functionality_storage = granted`
  - `security_storage = granted`
  - `wait_for_update = 500`
- Added Ketch Smart Tag before GTM:
  - `https://global.ketchcdn.com/web/v3/config/alphatrack_digital/website_smart_tag/boot.js`
- Preserved existing GTM container:
  - `GTM-MVXWCTZ8`
- Did not add Microsoft Clarity. Project ID `xbn6g2k18j` remains documented for later.

## Ketch Backup Notes

| Item | Current value |
| --- | --- |
| Workspace/account | AlphaTrack Digital |
| Website | `https://www.alphatrack.digital` |
| Property | Website Smart Tag |
| Property path/code | `alphatrack_digital` / `website_smart_tag` |
| Environment | `ATD_PROD_01` |
| Experience | `ATD Default XP` |
| Theme | `ATD Consent Theme - Dark v1` |
| Theme colors | `#33CC99`, `#00AFEF`, `#003399` |
| Banner buttons | Accept All, Manage Preferences, Reject All |
| Script URL | `https://global.ketchcdn.com/web/v3/config/alphatrack_digital/website_smart_tag/boot.js` |
| Legal documents in Ketch | Privacy Policy, Cookie Policy, Terms of Service |
| Known purposes | Analytics, Analytics & Measurement, Essential Services, Targeted Advertising, Website Essentials |
| Export/reporting path | Not verified in this repo-only pass |

## Purpose / Category Mapping

| Ketch purpose/category | Intended ATD dependency |
| --- | --- |
| Website Essentials / Essential Services | Required site operation, security, core forms, consent storage |
| Analytics & Measurement | GA4 and future Microsoft Clarity |
| Targeted Advertising | Meta Pixel, LinkedIn Insight Tag, Google Ads remarketing/conversion pixels |
| Preferences / Personalization | Only use if the website later stores user preferences |

Do not delete duplicate Ketch purposes yet. Complete tracker discovery and dependency review first.

## GTM / Consent Bridge Status

Repo implementation sets denied Consent Mode v2 defaults before GTM and loads the Ketch Smart Tag before GTM.

Ketch-to-GTM consent updates were not proven from local code because that behavior is dashboard/template dependent. Google's Ketch setup guidance says to link Google Tag Manager with Ketch and enable Consent Mode. Ketch also publishes a GTM consent mode template intended to control GTM tag firing from Ketch Smart Tag consent. Manual dashboard verification is still required before production approval.

Required manual GTM/Ketch checks:

- Confirm Ketch is linked to GTM or the Ketch GTM consent mode template is installed/configured.
- Confirm Ketch updates Consent Mode state for Analytics & Measurement and Targeted Advertising choices.
- Confirm GA4 and Google Ads tags use built-in consent checks.
- Confirm Meta, LinkedIn, and other Custom HTML tags have additional consent checks or triggers that block them until marketing consent.
- Confirm Brevo lead/form functionality remains essential, while marketing/newsletter opt-in remains explicit and separate.

## Before / After Tracking Behavior

Before:

- GTM loader was first in the head.
- Consently was injected after GTM on production hostnames.
- No repo-level Consent Mode v2 defaults were set before GTM.
- Clarity was not installed.

After repo change:

- Consent Mode v2 defaults are pushed before GTM.
- Ketch Smart Tag loads before GTM.
- GTM container `GTM-MVXWCTZ8` remains installed.
- Consently no longer loads from repo HTML.
- Clarity remains uninstalled.

Expected local behavior until dashboard verification:

- Google tags should see denied defaults before any granted update.
- Non-Google tags are only fully blocked if GTM dashboard consent checks/triggers are correctly configured.
- Ketch banner/theme/buttons require browser QA against a deployed or local page that can load Ketch.

## Legal Links

Repo routes exist for:

- Privacy Policy: `https://www.alphatrack.digital/privacy-policy`
- Cookie Policy: `https://www.alphatrack.digital/cookie-policy`
- Terms of Service: `https://www.alphatrack.digital/terms-of-service`

Manual Ketch dashboard check still needed: confirm the Cookie Policy document is deployed/attached correctly. Earlier dashboard state suggested it may have been undeployed.

## QA Checklist

Local static/code verification:

| Check | Status | Notes |
| --- | --- | --- |
| Consently removed from `index.html` | Pass | No `app.consently.net` injector remains. |
| Ketch Smart Tag added in head | Pass | Added before GTM. |
| GTM preserved | Pass | `GTM-MVXWCTZ8` unchanged. |
| Consent Mode v2 defaults before GTM | Pass | Defaults are declared before Ketch/GTM scripts. |
| Clarity not activated | Pass | No Clarity script added. |
| No credentials/secrets added | Pass | Only public script URL and IDs documented. |

Browser/deployed QA still required before production approval:

| Page / state | Status |
| --- | --- |
| Homepage | Not run |
| Contact page | Not run |
| Book-a-call page | Not run |
| Tracking audit/offer page | Not run |
| Thank-you pages | Not run |
| Privacy Policy | Not run |
| Cookie Policy | Not run |
| Terms of Service | Not run |
| Ketch banner appears once | Not run |
| No duplicate consent banner | Not run |
| Reject All blocks optional analytics/ads | Not run |
| Accept All allows configured analytics/ads tags | Not run |
| Manage Preferences saves selected choices | Not run |
| Floating preference trigger reopens choices | Not run |
| Consent choices persist after reload | Not run |
| Desktop dark theme renders correctly | Not run |
| Mobile dark theme renders correctly | Not run |
| GA4 cookies blocked before analytics consent where required | Not run |
| Meta/LinkedIn/Google Ads blocked before marketing consent | Not run |
| Clarity absent before and after consent | Not run |

## Remaining Manual Items

- Verify Ketch Cookie Policy deployment/attachment.
- Verify Ketch experience `ATD Default XP` is active for `ATD_PROD_01`.
- Verify Ketch floating trigger is enabled and visible.
- Verify Ketch purpose duplicates before any cleanup decision.
- Verify tracker discovery after installation; do not delete purposes before dependency review.
- Verify GTM consent mapping and tag firing in Preview/Tag Assistant.
- Verify deployed pages on desktop and mobile.
- Prepare a production deployment approval request only after QA evidence is collected.

## Clarity Next Step

After Ketch banner behavior and GTM consent updates pass QA, add Microsoft Clarity project `xbn6g2k18j` through GTM or the approved tag path under Analytics & Measurement consent only. Do not install it directly or publish it until approved.

## Separate SEO / Crawler Cleanup Item

Random/unknown URLs currently returning `200` should be handled separately as a routing/404 cleanup item. This does not block Ketch implementation but should be fixed before final SEO readiness.

## Production Recommendation

Not ready for production. The 2026-06-24 preview QA found pre-consent GA4/Brevo/Meta/Google Ads activity and incorrect Ketch purpose behavior. Fix Ketch purpose configuration and GTM consent gating in draft/preview only, then rerun preview QA before requesting production approval.
