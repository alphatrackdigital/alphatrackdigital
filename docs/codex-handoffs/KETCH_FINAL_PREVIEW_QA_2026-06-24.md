# Ketch Final Preview QA - 2026-06-24

## 2026-06-29 Ad Consent Propagation Correction

Owner Tag Assistant evidence found that the diagnostic event could report advertising consent granted while GTM retained those fields as denied. The bridge was issuing a plain dataLayer array instead of the real gtag consent command. The corrected bridge calls `gtag("consent", "update", consentUpdate)` with all four optional fields before `atd_consent_update`.

Corrected preview: `https://atd-website-test-o6l381b8e-alphatrackdigitals-projects.vercel.app`

GTM runtime consent registry and network verification passed the required fresh, Reject All, Accept All, Analytics-only, and Targeted Advertising-only states. Tag Assistant connected, but its timeline UI remained blocked from automation by another extension panel. GTM Version 9 and Ketch configuration were not changed.

## 2026-06-29 Owner-Approved Publish Update

- GTM workspace 9 was published as Version 9 at 2026-06-29 20:33 Africa/Lagos.
- Clarity project `xbn6g2k18j` is installed through GTM only.
- Clarity requires `analytics_storage` and uses the repo-side `atd_consent_update` post-consent event.
- Fresh visit and Accept All passed on `https://atd-website-test-4g37aalfr-alphatrackdigitals-projects.vercel.app`.
- The owner will manually verify the remaining six-scenario production matrix after deployment.

## Scope

Ketch consent remediation for the AlphaTrack Digital website. No production deploy, no GTM publish, and no Microsoft Clarity install were performed.

Final preview deployment:

- URL: https://atd-website-test-n96vt528s-alphatrackdigitals-projects.vercel.app
- Deployment ID: `dpl_7eJ5Saar5oCmuEYbbm4GWYEDk3NA`

Current post-GTM-safety preview deployment:

- URL: https://atd-website-test-bizccowc5-alphatrackdigitals-projects.vercel.app
- Deployment ID: `dpl_Fj3xYipZUf7hdqsw52xGrNeYm2vL`
- Target: Vercel preview only; not production.

## Ketch Dashboard Changes

- `Analytics & Measurement` is now `Consent - Opt In` for the visible jurisdictions, including Global Standard/default.
- `Targeted Advertising` is now `Consent - Opt In` for the visible jurisdictions, including Global Standard/default.
- Both purposes are displayed in the deployed preference modal as separate switches:
  - `Analytics`
  - `Targeted Advertising`
- Public Ketch config now includes:
  - `analytics___measurement` with `legalBasisCode: consent_optin`
  - `targeted_advertising` with `legalBasisCode: consent_optin`

## Website Changes

- Removed the expired Consently path from `index.html`.
- Added Ketch Smart Tag in the global head:
  - `https://global.ketchcdn.com/web/v3/config/alphatrack_digital/website_smart_tag/boot.js`
- Added Consent Mode v2 defaults before Ketch/GTM:
  - `analytics_storage: denied`
  - `ad_storage: denied`
  - `ad_user_data: denied`
  - `ad_personalization: denied`
  - `personalization_storage: denied`
  - `functionality_storage: granted`
  - `security_storage: granted`
- Added a Ketch purpose bridge:
  - `analytics___measurement` -> `analytics_storage`
  - `targeted_advertising` -> `ad_storage`, `ad_user_data`, `ad_personalization`
- GTM is still preserved and gated. After GTM consent checks were visible in Consent Overview, the loader was updated so GTM can load after either analytics consent or targeted-advertising consent.
- Added a narrow GA transport guard that blocks `google-analytics.com/collect` and `google-analytics.com/g/collect` while `analytics_storage` is not `granted`. This prevents the targeted-advertising-only case from sending GA4 page views while analytics consent is denied.

## QA Results

| Check | Result | Evidence |
| --- | --- | --- |
| Ketch loads before GTM | Pass | First visit loads Ketch boot/sdk only; GTM request count `0`. |
| Consent Mode defaults before GTM | Pass | First dataLayer consent default denies analytics and ads fields before any GTM load. |
| Consently/Cookiebot removed | Pass | Request count `0` for Consently/Cookiebot on all tested pages. |
| Banner appears once | Pass | First visit shows Accept All, Manage Preferences, Reject All. |
| Accept All | Pass | Grants `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`; GTM and GA4 load after consent. |
| Reject All | Pass | Persists denied analytics/ad consent; GTM/GA/ad/social/Brevo Conversations remain blocked. |
| Manage Preferences | Pass | Separate switches exist for Analytics and Targeted Advertising; choices persist after reload. |
| Analytics-only | Pass | Grants analytics only; ad fields remain denied; GA4 and Brevo Conversations may load. |
| Targeted Advertising-only | Pass | Ad fields grant, analytics remains denied, GTM can load, and GA collect count remains `0`. |
| Floating trigger | Pass | `Show Preferences` appears after saved choice and reopens preferences. |
| Clarity | Pass | No Clarity script loads; project `xbn6g2k18j` remains uninstalled. |

## Pages Tested Before Consent

- `/`
- `/contact-us`
- `/book-a-call`
- `/offer/tracking-audit`
- `/book-a-call/thank-you`
- `/privacy-policy`
- `/cookie-policy`
- `/terms-of-service`

Before consent, GTM, GA4, Google Ads, Meta, LinkedIn, Brevo Conversations, Clarity, Consently, and Cookiebot request counts were `0` on the tested pages. `/book-a-call` still loads the embedded Brevo Meetings scheduler and one Brevo design-system font because those are core booking-widget assets, not Brevo Conversations tracking/chat.

## 2026-06-25 Automated Matrix

Evidence:

- `docs/codex-handoffs/evidence/ketch-final-gtm-consent-2026-06-25/gtm-consent-overview-current.png`
- `docs/codex-handoffs/evidence/ketch-final-gtm-consent-2026-06-25/gtm-consent-overview-ads-meta.png`
- `docs/codex-handoffs/evidence/ketch-final-gtm-consent-2026-06-25/browser-consent-matrix-final.json`
- `docs/codex-handoffs/evidence/ketch-final-gtm-consent-2026-06-25/browser-consent-matrix-rerun-2026-06-25.json`
- `docs/codex-handoffs/evidence/ketch-final-gtm-consent-2026-06-25/run-preview-consent-matrix-2026-06-25.mjs`
- `docs/codex-handoffs/evidence/ketch-final-gtm-consent-2026-06-25/final-verification-blockers-2026-06-25.json`
- `docs/codex-handoffs/evidence/ketch-final-gtm-consent-2026-06-25/chrome-retry-ketch-cookie-policy-2026-06-25.json`
- `docs/codex-handoffs/evidence/ketch-final-gtm-consent-2026-06-25/gtm-workspace-22-changes-2026-06-25.png`
- `docs/codex-handoffs/evidence/ketch-final-gtm-consent-2026-06-25/ketch-cookie-policy-edit-2026-06-25.png`

Automated browser checks passed on `https://atd-website-test-bizccowc5-alphatrackdigitals-projects.vercel.app`:

- Required pages show the Ketch banner before consent and do not load GTM/GA4/Google Ads/Meta/LinkedIn/Brevo Conversations/Clarity/old CMP requests before consent.
- Accept All grants `analytics_storage`, `ad_storage`, `ad_user_data`, and `ad_personalization`.
- Reject All keeps analytics/ad consent denied and optional tags blocked.
- Analytics-only grants analytics and keeps ad consent denied; GA4 and Brevo Conversations can load.
- Targeted Advertising-only grants ad consent, keeps analytics denied, allows GTM to load, and blocks GA collect requests.
- Floating `Show Preferences` trigger reopens preferences.
- Choices persist after reload.

2026-06-25 rerun result: the fresh Playwright network/consent matrix passed all checks again on the same preview URL. The rerun confirmed denied defaults through `window.__atdConsentState`, no optional requests before consent on the required pages, Reject All kept analytics/ad consent denied, Accept All granted analytics/ad consent, Analytics-only allowed GA4/Brevo Conversations while ads stayed blocked, Targeted Advertising-only granted ad consent while GA collect stayed blocked, choices persisted after reload, and `Show Preferences` reopened the preference center. The visible Ketch preference-center label is `Analytics`; the internal purpose code remains `analytics___measurement`.

2026-06-25 final verification continuation: the automated page/network matrix was rerun and passed again, with latest evidence timestamp `2026-06-25T21:38:51.615Z`. No production deploy, GTM publish, or Clarity install occurred.

2026-06-25 Chrome retry result: after Codex restart, Chrome browser control attached successfully. GTM container `GTM-MVXWCTZ8` opened in workspace `9`, showing `Workspace Changes: 22`. Tag Assistant connected to the approved preview URL and opened a `gtm_debug` preview site tab, but the connected Tag Assistant timeline page could not be automated because Chrome reported another extension UI was open on that page. GTM was not published because Tag Assistant timeline evidence remains incomplete.

Limit: automated network QA did not observe Meta or Google Ads request delivery after consent. Confirm final ad-platform delivery in Tag Assistant/timeline before production approval. Tag Assistant timeline was not captured in the rerun because the non-interrupting Chrome extension control path failed before attach, no Chrome remote debugging port was available, and foreground takeover of the user's active signed-in Chrome session was disallowed.

## Remaining Blockers

- GTM container `GTM-MVXWCTZ8` now has draft/workspace consent checks configured through Consent Overview. No GTM publish was performed.
- Workspace changes after GTM consent edits: `22`.
- GTM draft changes applied:
  - 14 GA4 tags were moved to Consent Configured with additional consent `analytics_storage`.
  - 7 Meta Custom HTML tags were moved to Consent Configured with additional consent `ad_storage`, `ad_personalization`, and `ad_user_data`.
  - 1 Google Ads Conversion Linker tag was moved to Consent Configured with additional consent `ad_storage`, `ad_personalization`, and `ad_user_data`.
- GTM Templates page shows no tag templates and no variable templates. The Ketch GTM consent template is not installed in this container. Current consent-update mechanism is the repo-side Ketch bridge plus GTM additional consent checks.
- LinkedIn Insight Tag was not visible in the sampled GTM tag list; if added later, it must require targeted-advertising consent.
- No Microsoft Clarity tag was visible or installed.
- GTM Preview/Tag Assistant connected to the Vercel preview URL, but the standalone Tag Assistant debug page could not be read through the Codex Chrome extension because Chrome reported another extension UI was open. Site-side QA still confirmed the Tag Assistant overlay connected.
- Site-side preview QA after GTM draft edits:
  - First visit: Ketch banner appeared; Ketch scripts loaded; GTM, GA, Meta, LinkedIn, Brevo Conversations, Clarity, Consently, and Cookiebot scripts were absent.
  - Reject All: optional scripts remained absent and the floating privacy trigger remained available.
  - Floating trigger: reopened preferences successfully.
  - Reopened preferences showed separate optional toggles for `Targeted Advertising` and `Analytics`.
  - Accept All plus Confirm: GTM and Brevo Conversations loaded; Clarity, Consently, and Cookiebot remained absent. GA/Meta request delivery still needs Tag Assistant timeline verification.
- Cookie Policy document exists in Ketch with URL `https://www.alphatrack.digital/cookie-policy`, but Ketch shows it as `Undeployed` and type `Privacy Policy`. The edit menu did not expose a `Cookie Policy` document type, and the property editor did not expose a Cookie Policy attachment field.
- 2026-06-25 public config check: Ketch public config includes `privacyPolicy.url` and `termsOfService.url`, but no `cookie-policy` URL. It also shows the preference `privacyPolicy` tab with an empty `policyDocumentId` and `visible: false`. Website legal pages `/privacy-policy`, `/cookie-policy`, and `/terms-of-service` all return HTTP `200`. Current workaround: keep the website Cookie Policy page live and linked from the site footer/navigation/legal pages; Ketch dashboard still needs vendor/platform support or a plan/configuration path to attach a dedicated Cookie Policy document.
- Ketch dashboard showed Google Tag Manager system with `Connections 0`; Google Ads also had `Connections 0` and disabled Connect action.
- 2026-06-25 final verification blocker: after Codex restart, Chrome browser control attached successfully. GTM and Ketch dashboard access were available. The remaining Chrome-side blocker is the connected Tag Assistant timeline page, where Chrome reports another extension UI is open and blocks automation until that overlay is dismissed manually.
- 2026-06-25 Cookie Policy recheck: the public Ketch config endpoint returns `200` and still includes Privacy Policy and Terms URLs but no Cookie Policy URL. The live website legal pages return `200` for `/privacy-policy`, `/cookie-policy`, and `/terms-of-service`. The production-ready options remain: attach/deploy a dedicated Cookie Policy in Ketch, or explicitly approve the live website Cookie Policy page as the production workaround.
- 2026-06-25 Ketch dashboard retry: the private Ketch dashboard was accessible. The `Cookie Policy` document exists with URL `https://www.alphatrack.digital/cookie-policy`, status `Undeployed`, and current type `Privacy Policy`. The document type dropdown offers `Privacy Policy`, `Terms of Service`, `DPIA`, `DPA`, `MSA`, and `Other`; there is no dedicated `Cookie Policy` type. No Ketch document, purpose, theme, system, tracker, or jurisdiction was deleted or changed.

## Production Approval Pack

Current production recommendation: `NO-GO / BLOCKED`.

The latest automated preview QA passed on `https://atd-website-test-bizccowc5-alphatrackdigitals-projects.vercel.app`, using evidence file `docs/codex-handoffs/evidence/ketch-final-gtm-consent-2026-06-25/browser-consent-matrix-rerun-2026-06-25.json`. This clears the repo-side and preview page/network consent behavior, but it does not clear production launch because GTM/Tag Assistant and legal-policy checks remain incomplete.

| Area | Status | Evidence / Requirement | Production Impact |
| --- | --- | --- | --- |
| Ketch Smart Tag and Consent Mode defaults | Go | Automated rerun confirms Ketch loads, defaults are denied, and optional requests are blocked before consent. | Cleared for preview behavior. |
| Reject All | Go | Rerun confirms analytics/ad consent remain denied and optional tags remain blocked. | Cleared for preview behavior. |
| Accept All | Go | Rerun confirms analytics/ad consent grants and approved analytics/Brevo tracking can load after consent. | Cleared for preview behavior. |
| Analytics-only | Go | Rerun confirms GA4/Brevo Conversations can load while ad consent stays denied. | Cleared for preview behavior. |
| Targeted Advertising-only | Go | Rerun confirms ad consent grants while GA collect remains blocked because analytics is denied. | Cleared for preview behavior. |
| GTM Preview / Tag Assistant timeline proof | Blocked | Tag Assistant connected and opened the debug preview site, but timeline extraction is still blocked by a Chrome extension UI overlay on the connected Tag Assistant page. | Required before GTM publish or production deploy. |
| Google Ads / Meta / LinkedIn delivery after consent only | Blocked | Automated network QA confirms no ad-platform requests before consent, but Tag Assistant/platform delivery proof after advertising consent is still not captured. LinkedIn was not visible in sampled GTM tags. | Required before production approval. |
| Ketch Cookie Policy | Blocked | Ketch dashboard exposes no dedicated `Cookie Policy` document type. The Cookie Policy document remains `Undeployed` and typed as `Privacy Policy`; changing to `Other` was not applied because it is not evidence of banner/preference attachment. Either get Ketch support/vendor guidance or explicitly approve the website Cookie Policy workaround. | Required legal/configuration decision before production approval. |
| GTM publish approval | Blocked | Workspace consent checks are draft-only; explicit approval is required before publishing GTM. | Required launch gate. |
| Production deploy approval | Blocked | Current deployment is Vercel preview only. Explicit approval is required before production deployment. | Required launch gate. |
| Microsoft Clarity | Hold | Clarity project `xbn6g2k18j` remains uninstalled. | Install only after production consent gates are approved, under Analytics consent. |

## Production Launch Checklist

Complete these in order before production:

1. Capture GTM Preview / Tag Assistant timeline evidence for first visit before consent, Reject All, Accept All, Analytics-only, Targeted Advertising-only, and Manage Preferences after reload.
2. Confirm in Tag Assistant that Consent Mode defaults are denied before user choice and update correctly after each Ketch choice.
3. Confirm GA4 tags fire only with `analytics_storage`.
4. Confirm Google Ads conversion/remarketing tags fire only after `ad_storage`, `ad_user_data`, and `ad_personalization` are granted.
5. Confirm Meta Pixel tags fire only after Targeted Advertising/ad consent.
6. Confirm LinkedIn behavior: either no LinkedIn tag is present, or LinkedIn fires only after Targeted Advertising/ad consent.
7. Confirm Brevo Conversations remains gated behind Analytics consent unless a documented essential-use decision is approved.
8. Resolve the Ketch Cookie Policy attachment, or obtain explicit approval to use the live website Cookie Policy page as the production workaround.
9. Record sanitized screenshots or timeline notes in the evidence folder; do not include cookies, credentials, tokens, contact identifiers, or raw session data.
10. Request explicit approval to publish GTM workspace changes.
11. After GTM publish approval, publish GTM and immediately rerun preview/production-safe consent checks.
12. Request explicit approval to deploy production.
13. After production deploy approval, deploy production and rerun the consent QA checklist on the live domain.
14. Keep Microsoft Clarity uninstalled until production consent behavior is verified; then add project `xbn6g2k18j` under Analytics/Analytics & Measurement consent only.

## Recommendation

Ketch is ready for non-production stakeholder review on the current preview, but production remains blocked. GTM consent checks are visible in Consent Overview, and the site-side consent matrix now passes, but Tag Assistant timeline proof, ad-platform delivery confirmation, Cookie Policy resolution/workaround approval, explicit GTM publish approval, and explicit production deploy approval are required before launch. Do not publish GTM or install Microsoft Clarity yet. After Ketch/GTM consent behavior is approved, add Clarity project `xbn6g2k18j` under Analytics/Analytics & Measurement consent only.

## Separate SEO/Crawler Item

The app route cleanup remains separate: shorthand/random paths such as `/contact` and `/tracking-audit` show the React 404 content in preview. Use canonical app routes `/contact-us` and `/offer/tracking-audit` for QA.

## 2026-06-29 Clarity Continuation

- Confirmed Clarity project `xbn6g2k18j` is `AlphaTrack Digital – Official Website` for `https://www.alphatrack.digital`.
- Clarity remains in setup state with dashboard, recordings, and heatmaps disabled; no unexpected collection was visible.
- Observed settings: Balanced masking, cookies on, bot detection on, and one AlphaTrack administrator.
- No Clarity account setting was changed and the Clarity GTM auto-create/publish flow was not used.
- GTM Workspace 9 still showed 22 consent-related draft changes and no saved Clarity tag.
- A complete Clarity tag configuration and fresh pre-publish matrix were not completed, so GTM was not published and post-publish QA was not run.
- Evidence: `docs/codex-handoffs/evidence/clarity-gtm-consent-publish-2026-06-29/`.

## 2026-06-29 Production-Readiness Continuation

Fresh evidence is in `docs/codex-handoffs/evidence/ketch-final-production-readiness-2026-06-29/`.

- The full eight-route browser consent matrix passed again.
- Initial focused `/book-a-call/thank-you` QA found `fbevents.js` and the Meta pixel configuration endpoint under Analytics-only consent while the three ad fields were denied.
- Correction: the seven Meta Custom HTML tags are not visibly paused or malware-flagged. Hidden GTM accessibility text was incorrectly treated as tag status; visible screenshots show normal tag and trigger rows.
- Root cause: Analytics-only released the published GTM container, which does not yet include workspace `9`'s unpublished additional consent checks. `generate_lead` triggered the booking-confirmation Meta tag and sequenced the base pixel tag.
- A fail-closed Meta transport guard was added to `index.html`.
- New preview `https://atd-website-test-lxj2vgs9r-alphatrackdigitals-projects.vercel.app` passes the full consent matrix and focused thank-you-route checks. Analytics-only now produces zero Meta requests; Targeted Advertising-only and Accept All allow Meta only after all three ad fields grant.
- No LinkedIn tag exists. Google Ads has only a Conversion Linker; no conversion or remarketing tag exists to produce a conversion request.
- Public Ketch config still includes Privacy Policy and Terms links but no Cookie Policy link. The website Cookie Policy workaround remains pending explicit stakeholder/legal approval.

Corrected recommendation: GTM workspace `9` is technically ready for explicit publish approval, but it remains unpublished. Production is not safe to deploy until GTM is approved/published and post-publish QA passes. Clarity remains uninstalled.
