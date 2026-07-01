# Meta CAPI Launch Readiness — 2026-07-01

## Decision

**Block Meta Ads launch.**

The production frontend is already configured to call the Vercel backend, but
that backend is missing the required Meta CAPI environment variables. The
production frontend build is also stale and predates the latest approved
frontend fixes. Browser/server deduplication has not been proven in Meta Test
Events.

## Current Runtime Mapping

| Surface | Source repo / branch | Runtime evidence | `/api/leads` destination |
| --- | --- | --- | --- |
| Vercel frontend test | `alphatrackdigital/alphatrackdigital@main` | Vercel project `atd-website-test`; canonical alias points to preview deployment `dpl_ED5bDnRcPkfLKgBtFNJSGg1cUuCR` | Same-origin `https://website-internal-test.vercel.app/api/leads` because the canonical alias is a preview deployment without a preview-scoped `VITE_LEADS_ENDPOINT` |
| Vercel backend test | `alphatrackdigital/atd-backend-test@main` | Vercel project `atd-backend-test`; production deployment `dpl_7kAUTRivRgnzWS6y7y4i39grLGAu`, commit `45eeaaf` | `https://atd-backend-test.vercel.app/api/leads` |
| Production frontend | Static Vite build on Namecheap/cPanel | `alphatrack.digital` serves LiteSpeed asset `index-CP8gsRdh.js`, last modified 2026-06-23 | Compiled `VITE_LEADS_ENDPOINT` points to `https://atd-backend-test.vercel.app/api/leads` |
| Netlify backend | Historical `alphatrackdigital/alphatrackdigital@backend` | `alphatra-serv` deploy `6a28859001e02f0008d0faf7`, commit `9b782887`, 2026-06-09 | Not called by the current production build; deployed handler predates the Meta CAPI implementation |

Runtime `OPTIONS` checks returned successful API responses from the Vercel
frontend same-origin handler, the dedicated Vercel backend, and Netlify. The
production domain `/api/leads` is not the lead API; the static frontend uses its
compiled cross-origin Vercel endpoint.

## Repository and Deployment Currency

- Frontend GitHub `main`: current local base and `origin/main` were `1e8bc12`
  before this QA follow-up. The focused issue #30 additions were local,
  uncommitted changes from the previous run.
- Vercel frontend alias: not reproducibly current with GitHub `main`. Its
  deployment metadata is anchored to `5e11ddc` and marked dirty. It predates
  current `main`.
- Vercel backend: deployed from `atd-backend-test@main` commit `45eeaaf`, which
  matches the backend repository head inspected during this QA.
- Netlify backend: stale. Its deployed commit predates CAPI and later CRM/source
  lifecycle changes.
- Production cPanel frontend: stale. The served main asset reports a
  2026-06-23 modification date and predates the later consent, form, legal, and
  tracking-readiness commits.

## Redacted Environment Status

Only presence, target scope, or absence is recorded.

| Runtime | BREVO API/list vars | META_PIXEL_ID | META_CAPI_ACCESS_TOKEN | META_GRAPH_API_VERSION | META_CAPI_TEST_EVENT_CODE |
| --- | --- | --- | --- | --- | --- |
| `atd-website-test` canonical preview | Present for Preview: API key and audit/contact/newsletter list IDs | Missing for Preview | Missing for Preview | Missing | Missing for Preview |
| `atd-website-test` Production target | Present | Present, redacted | Present, redacted | Missing; code fallback is `v23.0` | Present, redacted; remove after any active test window |
| `atd-backend-test` Production/Preview | Present: API key and audit/contact/newsletter list IDs | Missing | Missing | Missing; code fallback is `v23.0` | Missing |
| `alphatra-serv` Netlify production | Present: API key and audit/contact/newsletter list IDs | Missing | Missing | Missing | Missing |
| Static cPanel frontend | Not applicable; it is not a serverless backend | Not applicable | Not applicable | Not applicable | Not applicable |

## Verified CAPI Behavior

The frontend and backend implementations agree on the required behavior:

- `tracking_audit_offer` maps to Meta standard `Lead`.
- `submitLead` creates one `metaEventId`, sends it to the backend, and returns it
  to the browser tracking call.
- Server CAPI uses the submitted `metaEventId` as `event_id`.
- Missing `META_PIXEL_ID` or `META_CAPI_ACCESS_TOKEN` logs a safe skip and does
  not fail lead capture.
- Duplicate Tracking Audit submissions continue the Brevo contact/list upsert
  but skip CRM deal/task, internal notification, and CAPI.
- Non-duplicate submissions complete Brevo capture/list membership before CRM,
  notification, and CAPI.
- `META_GRAPH_API_VERSION` defaults to `v23.0`.
- `META_CAPI_TEST_EVENT_CODE` is included only when configured.

Validation:

```text
alphatrackdigital:
npm run test -- src/test/leads.function.test.ts src/test/tracking.test.ts
14/14 passed

atd-backend-test:
npm test
3/3 passed
npm run type-check
passed
```

## Recommended Deployment Path

Use **Option B**, recognizing that production has already moved its form API
calls to the Vercel backend.

The Vercel project name still says `atd-backend-test`, but the current cPanel
build makes it the de facto production backend. Do not switch back to stale
Netlify for this launch.

### Backend developer steps

1. Pull `alphatrackdigital/atd-backend-test@main`.
2. Confirm the focused CAPI tests and `.env.example` documentation are present.
3. In Vercel project `atd-backend-test`, add for the Production environment:
   - `META_PIXEL_ID`
   - `META_CAPI_ACCESS_TOKEN`
   - optional `META_GRAPH_API_VERSION=v23.0`
4. For the controlled Test Events window only, add
   `META_CAPI_TEST_EVENT_CODE`.
5. Redeploy the Vercel backend from `main`.
6. Verify `/api/leads` responds to `OPTIONS` and that runtime logs show no CAPI
   rejection for the controlled request.
7. After Meta Test Events passes, delete `META_CAPI_TEST_EVENT_CODE` and
   redeploy the backend again.

### Frontend developer steps

1. Pull `alphatrackdigital/alphatrackdigital@main`.
2. Build the production frontend with:

   ```text
   VITE_LEADS_ENDPOINT=https://atd-backend-test.vercel.app/api/leads
   VITE_BREVO_SUBSCRIBE_ENDPOINT=https://atd-backend-test.vercel.app/api/brevo-subscribe
   ```

3. Deploy the new `dist` through the existing Namecheap/cPanel workflow.
4. Confirm the deployed JavaScript still contains those two Vercel endpoint
   overrides.
5. Run production consent and form QA before any paid traffic.

A frontend rebuild is required to publish the latest approved frontend code.
It is not required merely to activate CAPI on the already-selected Vercel
backend, provided the endpoint remains unchanged.

## Post-deploy QA

1. Open Meta Events Manager → ATD Web → Test events → Website.
2. Keep `META_CAPI_TEST_EVENT_CODE` enabled only for this test window.
3. Use:

   ```text
   https://website-internal-test.vercel.app/offer/tracking-audit?utm_source=meta&utm_medium=paid_social&utm_campaign=tracking_audit_pilot_jul2026&utm_content=codex_vercel_capi_test&utm_term=broad_test
   ```

   The canonical Vercel frontend currently calls its own same-origin backend.
   To test the dedicated backend with this URL, first configure Preview-scoped
   `VITE_LEADS_ENDPOINT` and `VITE_BREVO_SUBSCRIBE_ENDPOINT` to
   `atd-backend-test.vercel.app` and redeploy the preview. Otherwise use a
   dedicated preview built with those overrides.

4. Submit once with a fresh
   `kenny+codex-capi-YYYYMMDD-HHMMSS@alphatrack.digital` address.
5. Confirm:
   - HTTP submission succeeds;
   - Brevo contact is in list 11;
   - one CRM deal and one task exist;
   - the internal audit notification arrived;
   - Meta Test Events shows Browser + Server `Lead`;
   - both events have the same `event_id`;
   - Meta reports one deduplicated conversion.
6. Repeat the exact payload/email once only if duplicate behavior must be
   checked. Confirm no second CRM task, notification, or server event.
7. Remove `META_CAPI_TEST_EVENT_CODE`, redeploy, and confirm it is absent.
8. After the latest cPanel build is live, repeat the final test with:

   ```text
   https://alphatrack.digital/offer/tracking-audit?utm_source=meta&utm_medium=paid_social&utm_campaign=tracking_audit_pilot_jul2026&utm_content=codex_prod_capi_test&utm_term=broad_test
   ```

No form was submitted during this follow-up because the required Meta variables
are absent on the backend used by production and the production frontend is not
the latest approved build.
