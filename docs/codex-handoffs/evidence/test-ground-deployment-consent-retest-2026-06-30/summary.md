# Test-Ground Deployment And Consent Retest

Date: 2026-06-30

## Deployment

- Vercel project: `atd-website-test`.
- Canonical test URL: `https://website-internal-test.vercel.app/`.
- Unique preview URL: `https://atd-website-test-czd6u1svb-alphatrackdigitals-projects.vercel.app/`.
- Deployment target: preview only; Vercel reported `READY`.
- Deployment commit: `470696ba949da22464b95f5fe76b4ea1ecac511e`.
- Latest `main` includes consent-fix commit `9d5b8eaa175bf0a857a63bfb1bf117b1606b5e79`.

Before this task, `website-internal-test.vercel.app` resolved through the Vercel test project's older production-target deployment tied to `c0f63437d9ba8d36be9dea3c7b8747a6d9275ba8`. The previously cited `o6...` URL was a preview whose Git metadata referenced `16b21503bf178b4015743fcd641a41093b2aa418` with a dirty working tree. This made both URLs unsuitable as a clean latest-`main` source of truth.

A new clean preview was deployed from `main` at `470696b`. The test-only alias `website-internal-test.vercel.app` was then reassigned to that preview. Vercel subsequently resolved the alias to the new deployment. No Vercel production promotion occurred.

## Deployed Consent Fix

Both the canonical alias and unique preview returned `200` and byte-identical HTML. The deployed source contains:

- the real `gtag("consent", "update", consentUpdate)` call;
- `analytics_storage`;
- `ad_storage`;
- `ad_user_data`;
- `ad_personalization`;
- the later `atd_consent_update` diagnostic event.

The fix is therefore present in deployed code and is not merely a diagnostic `dataLayer.push()` event.

## Browser Retest

A fresh consent session was run on the unique preview hostname, which serves the same deployment as the canonical alias.

| Check | Result |
| --- | --- |
| Fresh visit | Ketch privacy dialog displayed; GTM, GA4, Meta, Ads/DoubleClick, and Clarity were absent in the available pre-consent inspection. |
| Accept All | Dialog closed; GTM container and Clarity project `xbn6g2k18j` script elements loaded. |
| GA4 | No GA4 or `g/collect` request was observed. |
| Meta | No Facebook Pixel request was observed. |
| Google Ads/DoubleClick | No request was observed; existing evidence says only Conversion Linker is configured. |
| Clarity | Loaded after Accept All. |
| Console | No warning or error was captured. |

The in-app browser's isolated inspection scope did not expose the page's `window.dataLayer`, `window.__atdConsentState`, `window.google_tag_manager`, or resource timing objects reliably. Actual GTM ad-consent registry values could not be independently proven outside Tag Assistant in this pass. Reject All and granular-purpose states were not repeated because Accept All plus deployed-source verification was the minimum required check and no additional clean browser contexts were available.

## Interpretation

Classification: **Stale test URL / alias pointed to an older deployment**.

This explains why manual evidence from the prior `website-internal-test.vercel.app` deployment could show the diagnostic event as granted while GTM retained denied ad fields: that alias was not serving the clean deployment containing `9d5b8ea`. The alias now serves latest `main`, and the real Consent Mode update call is present.

Remaining limitations:

- Manual Tag Assistant confirmation is still required to prove GTM's actual `ad_storage`, `ad_user_data`, and `ad_personalization` registry values after Accept All.
- GA4, Meta, and Ads/DoubleClick delivery remains unverified/non-firing in the sampled homepage check.
- Cookie Policy workaround approval, Book-a-call CRM/webhook proof, and production Namecheap/cPanel deployment remain separate open items.

## Safety

- The only external changes were a Vercel preview deployment and reassignment of the test-only alias.
- No Vercel production promotion, Namecheap/cPanel deployment, GTM publish, or other live-service configuration change occurred.
- No forms or webhooks were submitted.
- No secrets or private data are included.

Recommended next step: manually run Tag Assistant against `https://website-internal-test.vercel.app/`, select Accept All in a clean browser profile, and verify the four Consent Mode fields before proposing any GTM or Ketch change.
