# Ketch/GTM Production Readiness - Corrected 2026-06-29

## Decision

The Meta consent leak was fixed and Microsoft Clarity was added through GTM with `analytics_storage` consent and the deterministic `atd_consent_update` trigger. GTM workspace 9 was published as Version 9. Release commit `c0f63437d9ba8d36be9dea3c7b8747a6d9275ba8` is on `main`.

The cPanel deployment package is prepared for manual deployment by the dev guy. Production deployment and the full owner-run six-scenario consent matrix remain pending. No Ketch account configuration was changed during release housekeeping.

## Preview

- URL: `https://atd-website-test-lxj2vgs9r-alphatrackdigitals-projects.vercel.app`
- Deployment: `dpl_CPkCiBDpW2oEqgzu56ykqVGDyeZx`
- Target: Preview only

## Verification Summary

| Area | Result |
| --- | --- |
| Eight required routes before consent | Pass |
| Reject All | Pass |
| Accept All | Pass |
| Analytics-only homepage | Pass |
| Targeted Advertising-only homepage | Pass |
| Saved choice and floating trigger | Pass |
| Thank-you route with Analytics-only | Pass: zero Meta requests |
| Thank-you route with Targeted Advertising-only | Pass: Meta allowed after all ad fields grant |
| Thank-you route with Accept All | Pass: Meta allowed after all ad fields grant |
| Brevo Conversations | Pass: analytics consent only |
| LinkedIn | Not configured |
| Google Ads conversion delivery | Not applicable: Conversion Linker only |
| Clarity | GTM-only in Version 9; requires `analytics_storage` |
| Cookie Policy | Workaround still pending approval |

## Corrected Meta Status

- Seven active-looking Custom HTML Meta tags are present.
- No visible pause state or malware warning was found.
- Orange icons are Custom Event trigger icons.
- All seven tags require `ad_storage`, `ad_user_data`, and `ad_personalization` in workspace `9`.

## Root Cause And Fix

Analytics-only consent released the live GTM container. The live version did not yet include workspace `9`'s unpublished Meta consent checks. On `/book-a-call/thank-you`, `generate_lead` triggered `Meta | CONV | Lead | booking_confirmation | web`, which sequenced the Meta base tag.

The site now blocks Meta transports unless all three advertising fields are granted. This provides fail-closed enforcement before and after the GTM workspace is published.

## Historical GTM Workspace Snapshot

- `22` modified tags:
  - `14` GA4 tags require `analytics_storage`;
  - `1` Google Ads Conversion Linker requires all three ad fields;
  - `7` Meta tags require all three ad fields.
- `0` added tags.
- `0` deleted tags.
- No LinkedIn or Clarity tag.
- No unrelated workspace change identified.

## Launch Gates

- GTM published: **Yes, Version 9**.
- Release commit: **`c0f63437d9ba8d36be9dea3c7b8747a6d9275ba8`**.
- Deployment package: **Prepared for manual Namecheap/cPanel deployment**.
- Production deployed: **No; pending dev-guy upload**.
- Full production six-scenario QA: **Pending owner verification**.
- Remaining non-technical/legal gate: explicit approval of the website Cookie Policy workaround or Ketch support resolution.
