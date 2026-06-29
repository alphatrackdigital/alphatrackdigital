# Pre-publish Result

Status: `PUBLISHED BY OWNER APPROVAL AFTER FOCUSED FIX VERIFICATION`

- Approved target: `https://atd-website-test-lxj2vgs9r-alphatrackdigitals-projects.vercel.app`
- Existing repo evidence reports that the consent matrix passed after the Meta fail-closed transport guard.
- GTM Workspace 9 now contains `Clarity | BASE | analytics_measurement | all_pages | web`.
- Tag type: Custom HTML using the standard Microsoft Clarity loader for project `xbn6g2k18j`.
- Trigger: `TR | PV | all_pages | page_view | global`.
- Additional consent required: `analytics_storage` only.
- Tag Assistant successfully opened the approved preview with GTM debug mode, but the connected timeline could not be inspected because Chrome reported that another extension UI was open on the page.
- Fallback QA used the GTM debug target, Ketch UI state, and DOM-loaded script URLs.
- Fresh first visit passed with no optional tag URLs.
- Reject All passed with no optional tag URLs and the Show Preferences control available.
- Accept All failed: after Accept All plus Confirm, GTM and Brevo Conversations loaded, but the Clarity loader did not appear.
- Per the stop-on-failure rule, Analytics-only, Targeted Advertising-only, and saved-choice reload were not run.
- Follow-up diagnosis confirmed the tag was saved with the exact project ID and `analytics_storage`, but its sole All Pages trigger ran before the consent update and was not retriggered afterward.
- Added `TR | CONSENT | analytics_granted | gtm.consentUpdate | global` as a second trigger while preserving All Pages and the `analytics_storage` requirement.
- The full matrix still requires a fresh GTM Preview session after this trigger change. GTM remains unpublished.
- Official Google guidance confirmed that queued `gtag('consent','update')` commands are not guaranteed to apply before the next dataLayer event.
- Replaced the inferred internal trigger with deterministic custom event `atd_consent_update`, emitted asynchronously by the existing Ketch bridge after the consent update.
- Deployed non-production preview `https://atd-website-test-4g37aalfr-alphatrackdigitals-projects.vercel.app`.
- Focused verification passed: fresh visit had no optional scripts; Accept All loaded `https://www.clarity.ms/tag/xbn6g2k18j` and the Clarity runtime after consent.
- Reject All, Analytics-only, Targeted Advertising-only, and saved-choice reload still require a fresh complete matrix before GTM publish.
- This record retains the original failed matrix for auditability.
- After the deterministic `atd_consent_update` fix, fresh visit and Accept All passed on `https://atd-website-test-4g37aalfr-alphatrackdigitals-projects.vercel.app`.
- The owner approved publishing without repeating the remaining scenarios and will manually complete the full production matrix.
- GTM workspace 9 was published as Version 9 at 2026-06-29 20:33 Africa/Lagos.
- Production deployment status is recorded separately.

The repeated malware/pause strings exposed in GTM's accessibility snapshot are not treated as authoritative visible status. Existing 2026-06-29 evidence documents that this was hidden repeated accessibility text and that visible tag rows were normal.
