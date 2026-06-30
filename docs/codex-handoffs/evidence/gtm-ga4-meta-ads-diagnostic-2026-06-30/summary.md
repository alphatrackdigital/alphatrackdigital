# GTM, GA4, Meta, And Ads Diagnostic

Date: 2026-06-30

Test URL: `https://atd-website-test-o6l381b8e-alphatrackdigitals-projects.vercel.app/`

## Scope And Consent State

A fresh browser tab was opened and Ketch **Accept All** was selected. This was a read-only diagnostic; no form or webhook was submitted.

## Findings

### GTM Preview / Tag Assistant

- Tag Assistant accepted the test domain, opened the site with a `gtm_debug` parameter, and listed the domain as active.
- The injected Tag Assistant badge then reported **Tag Assistant Not Connected**. Opening the active domain returned to the site instead of exposing the event timeline.
- Consequently, per-event fired/not-fired, consent-blocked, exception, and trigger-evaluation details could not be read reliably.
- Local published evidence confirms GTM container `GTM-MVXWCTZ8`, Version 9, contains 14 GA4 tags, seven Meta tags, one Google Ads Conversion Linker, and the Clarity tag. The Meta tags are not visibly paused, and Version 9 was published.

### Runtime And Network

- Before consent, GTM, GA4, Meta, Ads/DoubleClick, and Clarity were absent in the fresh session.
- After Accept All, the page contained the GTM container script and Microsoft Clarity project `xbn6g2k18j` scripts.
- GA4 `g/collect`, Meta/Facebook Pixel, Google Ads, and DoubleClick requests were not observed in the prior network capture for this same preview.
- The in-app browser's isolated inspection scope did not expose the page's `window.dataLayer`, `window.__atdConsentState`, `window.gtag`, `window.google_tag_manager`, `window.fbq`, `window.clarity`, or resource timing objects reliably. Those globals are therefore not reported as absent.
- Existing redacted runtime evidence for this deployment records Accept All as granting `analytics_storage`, `ad_storage`, `ad_user_data`, and `ad_personalization`, and records the `atd_consent_update` diagnostic event.

### Tag And Trigger Interpretation

- **Clarity:** fired after Accept All. This proves GTM was released and an `analytics_storage`-gated tag could run.
- **Meta:** the base/PageView tag uses `TR | PV | allowed_hostnames | page_view | global`. The tested Vercel hostname is the leading explanation for the base tag not firing. The conversion tags use `generate_lead`, `contact_form_submit`, `exit_popup_success`, `newsletter_subscribe`, `tracking_audit_submit`, or WhatsApp-click triggers; none should fire from an untouched homepage. Repo event names match the documented Meta conversion triggers.
- **Google Ads/DoubleClick:** the container has only a Conversion Linker. No Google Ads conversion or remarketing tag is configured, so Ads/DoubleClick delivery requests are not expected from this homepage check.
- **GA4:** 14 published GA4 tags require `analytics_storage`, but their actual trigger evaluation could not be inspected. Clarity firing rules out a general analytics-consent failure. GA4 remains blocked on manual Tag Assistant/GTM trigger inspection.

## Root-Cause Classification

- **Meta:** likely **triggers do not match the test context**, specifically the base tag's allowed-hostname trigger plus conversion-event triggers that were intentionally not exercised.
- **Google Ads/DoubleClick:** **GTM tags missing** for conversion/remarketing delivery; only Conversion Linker is configured. This may be intentional and is not a Consent Mode failure.
- **GA4:** **unknown / needs manual GTM review**. Tag Assistant access was blocked by a **preview/browser extension issue**.
- Not supported by current evidence: GTM tags paused, GTM Version 9 unpublished, or consent requirements being too strict.

## Recommended Fix Plan

1. Manually inspect Version 9 in Tag Assistant for the Accept All `atd_consent_update` event and the following page-view/route event.
2. Review the allowed-hostname variable/trigger against the approved Vercel test hostname without changing it during diagnosis.
3. For each GA4 configuration/page-view tag, record the trigger result, blocking exceptions, and measurement-ID variable resolution without exposing the ID.
4. Confirm whether Google Ads conversion or remarketing delivery is intended. If it is, prepare a separate tag/trigger design; do not treat Conversion Linker alone as delivery proof.
5. Test Meta conversion tags only in a separately approved, non-submitting route/event diagnostic or controlled submission.

Any GTM tag, trigger, variable, consent, workspace, or publish change requires owner approval. Any additional form submission or webhook test also requires separate approval.

No live services or settings were changed. No forms or webhooks were submitted. No secrets or private data are included.
