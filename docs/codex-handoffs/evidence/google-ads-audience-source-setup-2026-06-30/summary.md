# Google Ads Audience Source Setup

Date: 2026-06-30

## Scope

Owner decision: ATD will launch Meta ads first; Google Ads campaigns are not launching now. This task was to confirm/establish Google Ads website-visitor audience/data-segment readiness so future Google Ads remarketing can use traffic collected during this launch phase, then verify via GTM Preview/Tag Assistant and document the result. Allowed actions were limited to locating or creating the Google Ads website-visitor audience source/tag and, if required, adding a Google Ads base/audience tag in GTM container `GTM-MVXWCTZ8`.

## Why this was checked now

Future Google Ads remarketing depends on having a populated audience source before launch traffic exists. Checking now (rather than waiting for Google Ads launch) lets ATD bank visitor data during the Meta-first phase.

## Access confirmed

- Google Ads account `Alpha Track Digital Limited` (ocid 8015472714): accessible after live owner re-authentication in an isolated automated browser session.
- GTM container `GTM-MVXWCTZ8` (account "AlphaTrack Digital"): accessible via the same session. This is a shared agency login with several unrelated client containers visible; only `GTM-MVXWCTZ8` was opened or touched.
- Tag Assistant / GTM Preview: not exercised this session (no new tag was added, so no new preview/consent matrix was required; see below).
- Local repo docs: fully accessible.

## Key finding

The Google Ads website-visitor audience source **already exists and is already populated** — no creation was needed:

- Google Ads > Audience manager > Your data segments lists three auto-created segments under this account:
  - "All Users of AlphaTrack Digital" — All users — Website visitors — 48 members (Search/YouTube, "too small to serve" — below minimum size for ad delivery).
  - "Purchasers of AlphaTrack Digital" — Purchasers, 540-day membership window — Website visitors — 0 members.
  - "AdWords optimized list" — Custom combination segment, automatically created — under 1,000 members.
- Opening the "All Users" segment detail page shows **"Segment members: Google Analytics 4 property users"** — i.e. this audience source is populated through the **linked GA4 property**, not through a separate Google Ads website tag/pixel installed on the site.
- In GTM, the only Google Ads-related tag present is `Google Ads | BASE | conversion_linker | all_pages | web` (type: Conversion Linker), already consent-gated on `ad_storage`, `ad_user_data`, and `ad_personalization`, matching prior repo documentation. There is no separate Google Ads "Google Tag" (gtag.js / AW-XXXXXXX) base config tag in GTM, and none was added.

## Decision

Given the audience source is already live via the GA4-Google Ads link, the owner confirmed: treat this as sufficient for future Google Ads remarketing readiness. **No GTM changes were made.** Adding a separate, redundant Google Ads base/audience gtag to GTM was assessed as unnecessary and was not pursued, since the goal (banking visitor data ahead of a future Google Ads launch) is already being met.

## Confirmations

- Google Ads campaigns: still deferred. None created.
- Google Ads conversion actions: none created. Two pre-existing conversion actions were observed read-only on the account overview (status "No recent conversions"); neither was opened, edited, or touched.
- Google Ads conversion tags: none created.
- Billing: not touched. An existing "ads aren't running - verify payment method" account banner was observed and left untouched.
- Enhanced conversions: not configured.
- GTM: no tags, triggers, or variables added or modified. Workspace remained at "0 changes" (Default Workspace 10) throughout this session.
- GTM publish: not performed (no change to publish).
- Conversion Linker: remains present and consent-gated as previously verified; not modified.
- Other services (Meta, GA4, Clarity, Ketch, Brevo, Vercel, Netlify, Namecheap/cPanel, Notion): not touched.
- Secrets/private data: none exposed. Only the Google Ads `ocid` (an account identifier, not a credential) and aggregate, non-PII segment member counts are referenced above.

## Tag Assistant / GTM Preview

Not run this session. Phase 4 of the original task plan (consent-state preview matrix) was scoped specifically to verifying a *new* Google Ads base/audience tag's consent gating. Since no new tag was added, there was nothing new to preview-test. The existing Conversion Linker consent-gating behavior was already verified in the 2026-06-30 final test-ground QA (`docs/codex-handoffs/evidence/final-test-ground-qa-2026-06-30/summary.md`) and is unaffected by this session.

## Remaining future Google Ads work

- Create Google Ads conversion actions (deferred until Google Ads launch).
- Configure conversion tags in GTM once conversion actions exist.
- Decide on enhanced conversions.
- Campaign launch QA once Google Ads campaigns are approved to launch.
- Audience-size validation after more traffic accumulates (current "All Users" segment is below the minimum size to serve ads; this is expected pre-launch and will resolve organically as traffic grows).
- Resolve the existing Google Ads account "payment method" warning before any future campaign launch (out of scope for this session; billing was explicitly not touched).
