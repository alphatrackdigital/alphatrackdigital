## Brevo campaign operations readiness

Current source of truth for the post-plumbing Brevo setup: segmentation, campaign settings, CRM
polish, premium email templates, workflow upgrades, UTM handling, transactional settings, and SMS.

Last updated: 2026-06-16.

## Current status

| Area | Status | Notes |
| --- | --- | --- |
| Core lead capture | Done | Website forms, Vercel QA API routes, and Brevo contact/list writes have passed QA. |
| CRM handoff | Done in backend | Deals/tasks are created by API fallback because Brevo visual CRM action cards are plan-gated. |
| QA data hygiene | Done | QA contacts are marked `IS_TEST_LEAD=true`, `LEAD_STATUS=test`, `HANDOFF_STATUS=qa_test`, and added to list `13`. |
| UTM/contact attribution | Implemented | Website submissions now capture inbound UTM/click IDs and write them to Brevo contact attributes. |
| Saved segments | Done | Created and verified in Brevo on 2026-06-15. Segment IDs `1`-`10` are listed below. |
| Premium email design | Done | Templates 19-30 were upgraded on 2026-06-15 with branded HTML, CTA hierarchy, template tags, and UTM-tagged links. |
| Workflow message polish | Done in templates | Automation steps still use the same template IDs, now with upgraded copy/design. |
| Campaign settings | Mostly done | Global UTM/Google Analytics tracking is active; test list includes `martech@alphatrack.digital` and `kenny@alphatrack.digital`; the default profile update form exists; unsubscribe/profile pages still need final brand/design review. |
| Transactional email settings | Receiver implemented, deploy blocked | Transactional email tracking is set to non-anonymous tracking; `/api/brevo-transactional-webhook` is ready for registration after the upgraded Netlify backend deploys, but Netlify currently blocks new deploys because account credit usage is exceeded. |
| SMS | Deferred | Account has 0 SMS credits; do not add SMS to launch until use case, consent, sender, and credits are confirmed. |

## Attribution fields

The following Brevo contact attributes were created on 2026-06-15 and are populated by website lead
capture when present:

| Attribute | Purpose |
| --- | --- |
| `UTM_SOURCE` | Inbound campaign source, e.g. `google`, `linkedin`, `brevo`. |
| `UTM_MEDIUM` | Inbound campaign medium, e.g. `cpc`, `email`, `paid_social`. |
| `UTM_CAMPAIGN` | Inbound campaign/campaign group name. |
| `UTM_CONTENT` | Creative, CTA, or placement variant. |
| `UTM_TERM` | Keyword or audience term where available. |
| `GCLID` | Google click ID. |
| `FBCLID` | Meta/Facebook click ID. |
| `LANDING_PAGE` | First captured page path/query for the session. |
| `REFERRER` | Browser referrer when supplied. |

Implementation points:

- `src/lib/attribution.ts` captures UTM/click IDs and stores first-touch data in session storage.
- `src/lib/leads.ts` attaches attribution to standard lead submissions.
- `src/components/shared/ExitIntentPopup.tsx` attaches attribution and current route to exit-popup submissions.
- `api/leads.ts`, `api/brevo-subscribe.ts`, `netlify/functions/leads.mjs`, and
  `netlify/functions/brevo-subscribe.mjs` sanitize and write attribution to Brevo.

## Segment plan

Created in Brevo UI under CRM > Contacts > Segments on 2026-06-15. Current category: `My segments`.

| Segment | ID | Current count | Logic |
| --- | ---: | ---: | --- |
| `ATD - QA/Test Contacts` | `1` | 30 | `IS_TEST_LEAD` is true. This matches the intended `IS_TEST_LEAD` true OR list `13` count as of creation. |
| `ATD - Campaign Eligible` | `2` | 112 | Not in QA/test list `13` and not in suppression list `14`. Brevo native campaign send rules still exclude unsubscribed/blocklisted contacts. |
| `ATD - Tracking Audit Leads - Active` | `3` | 1 | List `11`, not QA/test list `13`, not suppression list `14`. |
| `ATD - Strategy Call Leads` | `4` | 0 | List `7` or `LEAD_SOURCE=brevo_meetings_webhook`, not QA/test list `13`, not suppression list `14`. |
| `ATD - Contact Form Leads` | `5` | 4 | List `8` or `LEAD_SOURCE=contact_form`, not QA/test list `13`, not suppression list `14`. |
| `ATD - Newsletter Subscribers - Active` | `6` | 1 | List `9`, `OPT_IN=true`, not QA/test list `13`, not suppression list `14`. |
| `ATD - Exit Popup Leads` | `7` | 1 | List `10` or `LEAD_SOURCE=exit_popup`, not QA/test list `13`, not suppression list `14`. |
| `ATD - Paid Search Leads` | `8` | 0 | `UTM_MEDIUM` contains `cpc` or `UTM_SOURCE` is `google`/`bing`. |
| `ATD - Paid Social Leads` | `9` | 0 | `UTM_SOURCE` is `meta`, `facebook`, `instagram`, `linkedin`, or `tiktok`. |
| `ATD - Sales Converted Suppression` | `10` | 1 | List `14`; deal-stage won suppression can be added if Brevo exposes it reliably in segmentation. |

Notes:

- Use segments for campaign targeting/reporting; keep lists as durable source buckets.
- Every campaign and automation exclusion should include QA/test contacts and converted suppression.
- Confirm Apple MPP handling in Brevo before relying on open-based engagement segments.
- Live connector check on 2026-06-15 after setup: `segments_get_segments` returned all 10 saved segments under `My segments`.

## Premium email/template upgrade

Templates 19-30 were redesigned through the Brevo template API on 2026-06-15. The launch version
keeps the copy simple while upgrading the experience:

- Consistent branded header with AlphaTrack Digital identity.
- Narrow readable body width, strong spacing, mobile-first layout, and a single primary CTA per email.
- Preview text for every template.
- Footer with reason-for-receiving text and sender details.
- CTA links should point to stable website pages that tolerate query parameters.
- Enable Brevo/GA tracking after confirming links work with appended UTM parameters.

Template groups:

| Templates | Journey | Upgrade direction |
| --- | --- | --- |
| 19-23 | Tracking Audit Nurture | Consultative audit education, stronger CTA to book a strategy call, no over-selling. |
| 24-26 | Strategy Call Workflow | Prep, reminder/value framing, post-call next step. |
| 27-28 | General Enquiry Workflow | Fast acknowledgement, qualification prompt, relevant service CTA. |
| 29 | Newsletter Welcome | Branded welcome with expectation-setting and top resources. |
| 30 | Exit Popup Follow-up | One practical insight and a clean soft CTA. |

Test sends accepted by Brevo on 2026-06-15 for templates `19`, `24`, `29`, and `30` to
`kenny@alphatrack.digital`.

## Workflow upgrade plan

For each active workflow (#4-#8), verify in the Brevo editor:

1. Trigger list/source is correct.
2. QA/test and suppression exclusions are explicit.
3. Sender/reply-to is correct for the journey.
4. Wait steps are sensible for Nigeria operating cadence.
5. Every email step uses the redesigned template.
6. Links use stable site URLs and tolerate query strings.
7. Workflow is tested with a QA contact before activation.

Recommended behavior:

- Tracking audit: 5 emails over roughly 7-10 days, then stop unless the contact clicks/books.
- Strategy call: immediate confirmation/prep, one reminder-style value email, one post-call follow-up where appropriate.
- General enquiry: immediate acknowledgement plus one value/qualification follow-up.
- Newsletter: one welcome email only; future newsletters should be campaigns, not a long automation.
- Exit popup: one useful follow-up, then newsletter-only unless they engage.

## CRM companies/deals/tasks

Brevo Deals onboarding was completed through Playwright on 2026-06-15. The active CRM board is
`ATD Sales Pipeline`.

Current company attributes are mostly Brevo defaults: `name`, `domain`, `industry`, `website`,
`number_of_employees`, `revenue`, `linkedin`, and `owner`.

The following Brevo deal attributes were created on 2026-06-15 and are populated by backend CRM
handoff where available:

| Label | Internal name | Purpose |
| --- | --- | --- |
| `ATD Lead Source` | `atd_lead_source` | Original lead source attached to the CRM deal. |
| `ATD Offer` | `atd_offer` | Offer/conversion intent attached to the CRM deal. |
| `ATD Website Route` | `atd_website_route` | Website route that produced the deal. |
| `ATD UTM Source` | `atd_utm_source` | Inbound UTM source attached to the deal. |
| `ATD UTM Campaign` | `atd_utm_campaign` | Inbound UTM campaign attached to the deal. |

Recommended next CRM pass:

1. Confirm default pipeline and owner assignment after the backend branch is deployed.
2. Review pipeline probabilities if Brevo exposes forecast settings on the current plan.
3. Add or map company records only when there is a clear company/domain signal.
4. Avoid creating companies for personal email domains or vague newsletter-only contacts.
5. Review whether company records should be auto-created after live lead quality is clear.

## Campaign settings

Current Brevo UI status:

- Settings > Campaigns > Google Analytics/UTM: active.
- Settings > Campaigns > Test List: `martech@alphatrack.digital` and `kenny@alphatrack.digital`.
- Settings > Campaigns > Unsubscribe Pages: default page exists; needs brand/design review before launch.
- Forms > Profile update: default profile update form exists, ID `68d3850363458815293f7017`; needs final brand/design review before use in live campaigns.
- Forms > Unsubscribe: no standalone unsubscribe form was listed in the Forms app on 2026-06-16. This is separate from the campaign unsubscribe page and is not required unless ATD wants a separate hosted form.
- Campaign defaults: confirm physical/business details and default footer in the final pre-launch pass.
- Email campaign drafts: archive/delete the 12 setup draft campaigns after templates are finalized if they clutter reporting.

## Transactional email settings

Reviewed in Brevo UI:

- Tracking: anonymous tracking is set to `No`, so opens/clicks remain associated with contacts.

Implemented in repo:

- Netlify receiver: `netlify/functions/brevo-transactional-webhook.mjs`.
- Public path after deploy: `/api/brevo-transactional-webhook`.
- Required runtime variable: `BREVO_TRANSACTIONAL_WEBHOOK_SECRET`.
- Accepted authentication: `Authorization: Bearer <secret>`, `x-atd-webhook-secret`, `x-brevo-webhook-secret`, or `?token=<secret>`.
- Current behavior: validates the request, accepts single events or batched/wrapped events, logs non-email event/tag counts for launch QA, and returns a JSON summary.

Deployment check on 2026-06-16:

- Local repo is clean against `origin/main` at commit `53e4490874fc0d850bf42b6340dadd4e1188906c` except for an unrelated untracked `deno.lock`.
- `npm run lint`, `npm test -- --run`, and `npm run build` all passed before deployment retry.
- Production deploy to Netlify site `alphatra-serv` was blocked with: `Account credit usage exceeded - new deploys are blocked until credits are added`.
- Current production `https://alphatra-serv.netlify.app/api/brevo-transactional-webhook` returns `404`, so do not register it in Brevo yet.
- Current production `https://alphatra-serv.netlify.app/api/brevo-meeting-webhook` returns `405` on GET, which confirms the older meeting receiver path exists, but the upgraded backend still needs deployment.
- `https://alphatrackdigital.netlify.app/api/brevo-transactional-webhook` also returns `404`.

Contact form field audit on 2026-06-16:

- Live contact `kenny@ait.edu.gh` was created in Brevo list `8` from the contact form and stored: `FIRSTNAME`, `LASTNAME`, `MESSAGE`, `MONTHLY_BUDGET`, `LEAD_SOURCE`, `SOURCE`, `WEBSITE_ROUTE`, `OFFER`, `CONSENT_STATUS`, `CONSENT_TIMESTAMP`, `OPT_IN`, `LANDING_PAGE`, and `REFERRER`.
- Source lifecycle update is implemented for website lead handlers: `FIRST_SOURCE`, `FIRST_LEAD_SOURCE`, `FIRST_SOURCE_TIMESTAMP`, `LAST_SOURCE`, `LAST_LEAD_SOURCE`, `LAST_SOURCE_TIMESTAMP`, and `SOURCE_HISTORY`. Confirm these Brevo custom attributes exist before production QA; otherwise Brevo may reject contact upserts that include them.
- Brevo schema confirms `SERVICE_INTEREST` is a normal `multiple-choice` attribute with options `Paid Ads`, `Marketing Automation`, `Analytics/Tracking`, `Website/CRO`, `SEO`, `Other`, `Growth Strategy`, and `CRM & Lifecycle`.
- The existing production submission did not store `SERVICE_INTEREST` because the backend sent a text string while Brevo expects an array for a multiple-choice attribute.
- Repo fix: `api/leads.ts` and `netlify/functions/leads.mjs` now send `SERVICE_INTEREST` as an array and normalize `MONTHLY_BUDGET` to Brevo category values `1`-`4`; `src/pages/ContactUs.tsx` now submits budget enum values directly.
- Test coverage: `src/test/leads.function.test.ts` now asserts contact form storage for name, company, website, message, service interest, budget, source, route, offer, and consent fields.
- UI alignment fix: `src/pages/ContactUs.tsx` now renders service interest as a checkbox group so visitors can select multiple Brevo-supported service interests. `src/test/contact-us.accessibility.test.tsx` asserts the group is accessible and that multiple service interests can be selected at once.

Site-wide Brevo form audit on 2026-06-16:

- Contact form: covered by `/api/leads`; uses text fields plus `SERVICE_INTEREST` multiple-choice array and `MONTHLY_BUDGET` category value.
- Tracking audit form: covered by `/api/leads`; `AD_SPEND` and `AD_PLATFORMS` are text attributes, and campaign/consent fields are asserted in tests.
- Newsletter forms: covered by `/api/leads`; stores `SOURCE`, first/latest source lifecycle fields, `LEAD_SOURCE`, `WEBSITE_ROUTE`, `OFFER`, `CONSENT_STATUS`, `CONSENT_TIMESTAMP`, and `OPT_IN` when consent is present.
- Exit popup form: covered by `/api/brevo-subscribe`; stores `FIRSTNAME`, `WEBSITE`, `SOURCE`, first/latest source lifecycle fields, `LEAD_SOURCE`, `WEBSITE_ROUTE`, `OFFER`, consent fields, and attribution fields.
- Brevo Meetings webhook is not a site form, but its contact upsert attributes were reviewed; mapped fields are text/boolean and match the current Brevo schema.
- Repo fix: `netlify/functions/brevo-subscribe.mjs` now matches `api/brevo-subscribe.ts` for exit popup `OFFER=exit-popup`.
- Test coverage: `src/test/leads.function.test.ts` and `src/test/brevo-subscribe.function.test.ts` now assert contact, tracking audit, newsletter, and exit popup Brevo payload fields that are most likely to break due to schema/type drift.

Still deferred until the upgraded backend is deployed:

- Configuration: confirm SMTP/API identity and sender behavior after Netlify upgrade/deployment.
- Webhooks: register a transactional webhook pointing to the upgraded backend, for example
  `https://alphatra-serv.netlify.app/api/brevo-transactional-webhook` with bearer auth.
- Recommended transactional events for launch QA: `request`, `delivered`, `hardBounce`, `softBounce`, `blocked`, `invalid`, `deferred`, `click`, `opened`, `unsubscribed`.
- Tags: keep a naming convention such as `contact_form`, `tracking_audit_offer`, `newsletter`,
  `exit_popup`, `brevo_meetings_webhook`.
- Retention rules: keep enough logs for launch QA and incident diagnosis.
- Blocked/unsubscribed contacts: review before campaign activation.

Live connector checks:

- Transactional webhook listing returned `document_not_found`, which indicates no transactional webhook record exists.
- Marketing webhook listing returned `document_not_found`, which indicates no marketing webhook record exists.
- Do not create the webhook in Brevo until the upgraded Netlify endpoint is deployed and `BREVO_TRANSACTIONAL_WEBHOOK_SECRET` is set.
- 2026-06-16 repeat check returned the same no-webhook state for both transactional and marketing webhooks.

## SMS position

SMS is not launch-ready and should stay out of the first campaign unless explicitly scoped.

Do first if SMS becomes required:

1. Buy/confirm SMS credits.
2. Confirm sender/compliance requirements for target countries.
3. Add explicit SMS consent capture.
4. Start with appointment reminders only, not marketing blasts.
5. Test with internal numbers before sending externally.

## Remaining launch blockers

1. Add Netlify credits or upgrade the plan, then deploy the prepared backend to `alphatra-serv`.
2. Brevo Meetings webhook validation against the upgraded Netlify backend.
3. Unsubscribe/profile-update page brand review.
4. Transactional webhook registration and log verification against the upgraded Netlify backend.
5. Final inbox/deliverability test with real recipient(s), including workflow exclusions and suppression behavior.
