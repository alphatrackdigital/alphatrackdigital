# Technical Changelog

Last updated: 2026-06-17.

## Repo State Reviewed

- Branch: `main`
- Tracking: `origin/main`
- Initial status before docs: clean, no modified files reported.
- Current HEAD: `a9cfce7 feat: preserve Brevo lead source lifecycle`
- Git warning observed: unable to access `C:\Users\Kenny Dabiri/.config/git/ignore`; did not block status/log inspection.

## Branches Reviewed

| Branch | Notes |
| --- | --- |
| `main` | Current branch, matches `origin/main` at `a9cfce7` |
| `backend` | Local worktree path shown; tracks `origin/backend`; separate backend branch history exists |
| `backend-sync-tracking` | Behind `origin/backend` by 18 at inspection |
| `codex/complete-tracking-setup` | Remote/local branch present |
| `martech/brevo-campaign-attributes` | PR #24 branch, merged into main |
| `origin/vercel-backend` | Vercel backend port branch present |

## Recent Commit Highlights

| Commit | Summary | Files / areas |
| --- | --- | --- |
| `a9cfce7` | Preserve Brevo lead source lifecycle | API and Netlify handlers, contact form, tests, docs |
| `d3d2f51` | Add Meta event IDs to exit popup leads | exit popup, subscribe handlers, tests |
| `3a7c20f` | Add AI agent rules and refine contact form | `AGENTS.md`, `CLAUDE.md`, contact form |
| `5299bcc` | Enhance Brevo integration with service interest and budget normalization | lead handlers, docs, tests |
| `b233323` | Inject Meta event ID into Pixel calls | `src/lib/tracking.ts`, tests |
| `de4ee2e` | Expose Meta event ID to browser tags | newsletter/audit/tracking events |
| `c64e894` | Add Meta Conversions API tracking | API handlers, attribution, tests |
| `53e4490` | Finalize Brevo campaign readiness plumbing | attribution, transactional webhook, docs, tests |
| `450e9b9` | Align Vercel Brevo CRM handlers | Vercel-style `api/` handlers |
| `03470e5` | Add Brevo CRM API handoff fallback | Netlify functions and tests |

## Repo Files / Areas Changed Historically

Key files touched by recent martech work:

- `api/leads.ts`
- `api/brevo-subscribe.ts`
- `api/brevo-meeting-webhook.ts`
- `api/idempotency.ts`
- `netlify/functions/leads.mjs`
- `netlify/functions/brevo-subscribe.mjs`
- `netlify/functions/brevo-meeting-webhook.mjs`
- `netlify/functions/brevo-transactional-webhook.mjs`
- `netlify/functions/lib/idempotency.mjs`
- `src/lib/attribution.ts`
- `src/lib/leads.ts`
- `src/lib/tracking.ts`
- `src/lib/conversionSession.ts`
- `src/lib/apiEndpoints.ts`
- `src/pages/ContactUs.tsx`
- `src/pages/TrackingLandingPage.tsx`
- `src/components/shared/ExitIntentPopup.tsx`
- `src/components/shared/NewsletterSection.tsx`
- `src/components/shared/TrackingEvents.tsx`
- tests under `src/test/*`
- docs under `docs/*.md`

## Tracking / Analytics Changes

- SPA route events push `atd_route_view`.
- Conversion route events include `generate_lead`, `meeting_booking_redirect`, and `contact_form_submit`.
- Direct lead submissions push `tracking_audit_submit`, `newsletter_subscribe`, and `exit_popup_success`.
- Meta standard events map to `Lead` for contact, audit, booking, and exit popup; `Subscribe` for newsletter.
- Browser payloads include `event_id` and `eventID`; Meta Pixel wrapper injects matching `eventID`.
- Server-side Meta CAPI sends `Lead` or `Subscribe` using matching event IDs where configured.
- Brevo Meetings webhook sends GA4 Measurement Protocol booking events when GA4 env vars are configured.

## Brevo / CRM / Vercel / Netlify Changes

- Contact/audit/newsletter handlers write Brevo contacts, list membership, source lifecycle, attribution, consent, and campaign metadata.
- Exit popup handler writes separate Brevo contact/list fields and Meta CAPI event.
- CRM fallback creates deals/tasks for contact form, tracking audit, and meeting bookings where configured.
- Transactional webhook receiver exists in repo but must not be registered until deployed.
- `src/lib/apiEndpoints.ts` routes static/nonlocal hosts to `https://alphatra-serv.netlify.app` by default; local/Vercel-like hosts use same-origin API paths.
- Netlify redirects `/api/*` to Netlify functions.
- Vercel SPA rewrite sends non-API routes to `/index.html`.

## Environment Variable Names

Values are redacted. Variable names observed in `.env.example`, `.env.local` names, and code:

| Variable | Purpose |
| --- | --- |
| `BREVO_API_KEY` | Brevo API access for contact/email/CRM calls |
| `BREVO_LIST_ID` | Exit popup/default list ID |
| `BREVO_CONTACT_LIST_ID` | Contact Us list ID |
| `BREVO_AUDIT_LIST_ID` | Tracking Audit list ID |
| `BREVO_NEWSLETTER_LIST_ID` | Newsletter list ID |
| `BREVO_STRATEGY_CALL_LIST_ID` | Strategy Call list ID |
| `BREVO_DOI_TEMPLATE_ID` | Newsletter DOI template |
| `BREVO_DOI_REDIRECT_URL` | Newsletter DOI confirmation redirect |
| `BREVO_CONSENT_ATTRIBUTE` | Optional custom consent attribute |
| `BREVO_CONSENT_TIMESTAMP_ATTRIBUTE` | Optional custom consent timestamp attribute |
| `BREVO_MEETING_WEBHOOK_SECRET` | Brevo Meetings webhook auth secret |
| `BREVO_MEETING_WEBHOOK_URL` | Local env name observed; purpose likely webhook endpoint reference |
| `BREVO_TRANSACTIONAL_WEBHOOK_SECRET` | Transactional webhook auth secret |
| `GA4_MEASUREMENT_ID` | GA4 Measurement ID |
| `GA4_MEASUREMENT_PROTOCOL_API_SECRET` | GA4 MP API secret |
| `GA4_MEASUREMENT_PROTOCOL_DEBUG_MODE` | Temporary DebugView mode; should be false outside debug |
| `GA4_MEETING_BOOKED_EVENT_NAME` | Optional booking event override |
| `GA4_BOOKING_PAGE_LOCATION` | Optional booking page URL override |
| `GA4_PROPERTY_ID` | GA4 Admin/Data property ID |
| `GA4_ADMIN_CREDENTIALS` | Local GA4 admin credential path |
| `GOOGLE_APPLICATION_CREDENTIALS` | Local Google credential path |
| `GTM_CONTAINER_ID` | GTM container ID |
| `META_PIXEL_ID` | Meta pixel ID for CAPI |
| `META_CAPI_ACCESS_TOKEN` | Meta CAPI token |
| `META_GRAPH_API_VERSION` | Meta Graph API version |
| `META_CAPI_TEST_EVENT_CODE` | Meta test events code; remove/disable for production |
| `VITE_LEADS_ENDPOINT` | Frontend lead endpoint override |
| `VITE_BREVO_SUBSCRIBE_ENDPOINT` | Frontend exit-popup endpoint override |
| `VITE_SITE_URL` | Canonical site URL |
| `VITE_SUPABASE_URL` | Supabase project URL if enabled |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key |

## Deployment Status

- Production frontend decision in docs: Namecheap/cPanel static host.
- Backend API service: `https://alphatra-serv.netlify.app`.
- Netlify deploy to `alphatra-serv` was documented as blocked by account credit usage exceeded.
- Current production transactional webhook was documented as `404`; do not register in Brevo yet.
- Current production meeting webhook was documented as `405` on GET, meaning a receiver path exists but latest upgrade still needs deployment validation.
- This pass did not deploy or check live endpoints.

## Testing Performed

No tests were run during this documentation-only pass.

Previously documented validation includes focused tests, full test suite, lint, and production build passing during 2026-06-15/2026-06-16 readiness work. Treat those as historical until rerun after the next code or deploy change.

## Debug / Cleanup Risks

- Confirm `GA4_MEASUREMENT_PROTOCOL_DEBUG_MODE=false` in production.
- Remove/disable `META_CAPI_TEST_EVENT_CODE` outside Meta Events Manager test sessions.
- Confirm latest contact schema fixes are deployed before live QA.
- Confirm newsletter alert routing matches approved `marketing@` map.
- Confirm no secret values are committed or copied to Notion.
