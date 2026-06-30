# Clarity Test-Ground QA Summary

Date: 2026-06-30

Test URL: `https://atd-website-test-o6l381b8e-alphatrackdigitals-projects.vercel.app/`

## Scope

Documentation of the non-production Ketch, GTM Consent Mode, and Microsoft Clarity consent-gating QA completed before the prior agent stopped. This report does not establish production behavior.

## Scenario Results

| Scenario | Result | Consent and network result |
| --- | --- | --- |
| Fresh visit | Pass | Optional consent began denied; Clarity did not load. |
| Reject All | Pass | Analytics and advertising consent remained denied; Clarity did not load. |
| Accept All | Pass with tracking warning | Analytics and advertising consent changed to granted; Clarity project `xbn6g2k18j` loaded. GA4, Meta, Google Ads, and DoubleClick requests were not observed. |
| Analytics-only | Pass with tracking warning | `analytics_storage` changed to granted while advertising fields remained denied; Clarity loaded. GA4 requests were not observed. |
| Targeted Advertising-only | Pass with tracking warning | Advertising fields changed to granted while `analytics_storage` remained denied; Clarity did not load. Meta, Google Ads, and DoubleClick requests were not observed. |
| Saved choice and preferences reopening | Pass | The saved consent choice persisted and the floating preferences control reopened Ketch. |

## Findings

- Ketch consent controls behaved as expected in the tested scenarios.
- GTM Consent Mode updates reflected the selected analytics and advertising grants.
- Microsoft Clarity project `xbn6g2k18j` was consent-gated by `analytics_storage`: it loaded only for Accept All and Analytics-only, and did not load on Fresh Visit, Reject All, or Targeted Advertising-only.
- The checked legal pages rendered correctly.
- Console/network inspection did not identify a Clarity consent leak.
- Important warning: no GA4, Meta/Facebook Pixel, Google Ads, or DoubleClick network requests fired in any tested consent state, including Accept All. Their network/event proof remains open.
- The available local evidence does not determine the non-firing root cause. Classification: **Unknown / needs GTM Preview and tag-firing inspection**. Possible categories include missing, paused, or unpublished tags; trigger mismatch; consent requirements; preview-specific disabling; missing IDs/environment configuration; missing repo events; or a preview/browser-extension issue.

## Safety And Recommendation

- No live services or settings were changed.
- No forms were submitted and no webhook tests were run.
- Clarity consent-gating passed in the test ground. Wider GA4, Meta, Google Ads, and DoubleClick delivery remains open and should be diagnosed read-only in GTM Preview before any fix is proposed.
