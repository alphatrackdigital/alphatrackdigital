# Ad Consent Propagation Fix

Date: 2026-06-29

- Owner Tag Assistant evidence showed `atd_consent_update` reporting all four optional consent fields as granted while GTM's Consent tab retained denied advertising consent.
- Root cause: the Ketch bridge pushed `["consent", "update", state]` as a plain dataLayer array instead of issuing the real `gtag("consent", "update", state)` command.
- Fix: complete all four optional consent fields, call the real gtag Consent Mode update, then push `atd_consent_update`.
- Corrected preview: `https://atd-website-test-o6l381b8e-alphatrackdigitals-projects.vercel.app`
- Verification used GTM's runtime consent registry (`google_tag_data.ics`) and network requests because another extension panel blocked automation of Tag Assistant's connected timeline.
- Results:
  - Fresh visit and Reject All: all analytics/ad fields denied; no optional requests.
  - Accept All: analytics and all three ad fields granted; Clarity loaded.
  - Analytics-only: analytics granted; all three ad fields denied; Clarity loaded; Meta/Ads blocked.
  - Targeted Advertising-only: analytics denied; all three ad fields granted; Clarity, GA collect, and Brevo Conversations blocked.
- GTM Version 9 remains published; no GTM or Ketch setting changed.
- Production-ready commit: `9d5b8eaa175bf0a857a63bfb1bf117b1606b5e79`. The dev guy should pull latest `main` and use the existing Namecheap/cPanel workflow.
- `atd-production-dist-ad-consent-fix-9d5b8ea.zip` is fallback/reference only. `atd-production-dist-c0f6343.zip` is superseded and must not be used.
- Full production six-scenario QA remains pending owner verification after manual deployment.
- Cookie Policy workaround remains pending stakeholder/legal approval.
