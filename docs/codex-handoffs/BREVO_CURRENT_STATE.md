# Brevo Current State

Last updated: 2026-06-17. This file documents verified and unverified Brevo state without making live changes.

## Account / Workspace Context

| Item | State | Verification |
| --- | --- | --- |
| Workspace | Alpha Track Digital Limited | Notion/docs |
| CRM owner | `kenny@alphatrack.digital`, owner ID `68bf7b64faf0e9c68b0ccdb4` | `docs/brevo-crm-handoff.md` |
| Pipeline | `ATD Sales Pipeline`, ID `68bf7ba1f6e11688cf7a2164` | docs/Notion |
| Account timezone | `Africa/Accra`; review against operating timezone `Africa/Lagos` | docs |
| Live Brevo UI access in this pass | Not used | available connector only exposed DOI contact creation |

## Senders, Domains, Forms, Lists

Verified senders from docs/GitHub issues: `info@alphatrack.digital`, `sales@alphatrack.digital`, `audit@alphatrack.digital`, `marketing@alphatrack.digital`, `martech@alphatrack.digital`. `admin@alphatrack.digital` must not be used. `privacy@alphatrack.digital` is not currently configured as a sender per GitHub issue #26.

Known lists:

| ID | Name / purpose | Verification |
| ---: | --- | --- |
| 7 | Website - Strategy Call Bookings | docs/Notion |
| 8 | Website - Contact Form Enquiries | docs/Notion |
| 9 | ATD \| Newsletter | docs/Notion |
| 10 | ATD Website - Exit Popup Leads | docs/Notion |
| 11 | Tracking Audit Leads | docs/Notion |
| 12 | ATD \| Hot Leads | docs/Notion |
| 13 | ATD \| Test Leads | docs/Notion |
| 14 | ATD \| Suppression - Sales Converted | docs/Notion |

Forms/settings:

- Default profile update form exists, ID `68d3850363458815293f7017`. Verified by docs/Notion.
- Standalone unsubscribe form was not listed in Brevo Forms on 2026-06-16; campaign unsubscribe page still needs brand QA. Verified by docs/Notion.
- Campaign Google Analytics/UTM tracking reported active. Verified by docs/Notion.

## Lead Flow Mapping

| Flow | Route/source | Brevo list | Sender/recipient | Verification |
| --- | --- | --- | --- | --- |
| Contact Us | `/contact-us`, `contact_form` | 8 | `info@alphatrack.digital` -> `info@alphatrack.digital` | repo/docs |
| Book A Free Strategy Call | `/book-a-call`, Brevo Meetings webhook | 7 | `sales@alphatrack.digital`, launch copy to `martech@alphatrack.digital` | repo/docs |
| Request a Free Tracking Audit | `/offer/tracking-audit`, `tracking_audit_offer` | 11 | `audit@alphatrack.digital` -> `audit@`, `martech@` | repo/docs |
| Newsletter | `newsletter` | 9 | currently review against `marketing@` target | code/GitHub issue #28 |
| Exit popup | `exit_popup` via `/api/brevo-subscribe` | 10 | nurture/marketing path | repo/docs |

## Templates

| IDs | Purpose | Status | Verification |
| --- | --- | --- | --- |
| 19-23 | Tracking Audit nurture emails 01-05 | Reported upgraded branded reusable templates | docs/Notion |
| 24-26 | Strategy Call follow-up emails 01-03 | Reported upgraded | docs/Notion |
| 27-28 | General Enquiry follow-up emails 01-02 | Reported upgraded | docs/Notion |
| 29 | Newsletter welcome | Reported upgraded | docs/Notion |
| 30 | Exit Popup follow-up | Reported upgraded | docs/Notion |
| 6 | Newsletter DOI confirmation | Active DOI template per docs | `docs/brevo-double-opt-in.md` |

Test sends for templates `19`, `24`, `29`, and `30` were accepted by Brevo on 2026-06-15 per repo/Notion docs. No sends were performed in this pass.

## Workflows / Automations

| Workflow | Current documented status | Trigger | Gaps / risk |
| --- | --- | --- | --- |
| Automation #3 | Prompt says partial/inactive; later docs/Notion say deleted | Tracking Audit list #11 | Treat prompt note as historical; do not recreate/activate without approval |
| #4 Tracking Audit Nurture | Reported active on 2026-06-14 | List #11 | Suppression and in-progress exit behavior need QA |
| #5 Strategy Call Workflow | Reported active | List #7 | Needs production Meetings webhook validation |
| #6 General Enquiry Workflow | Reported active | List #8 | Needs post-deploy metadata QA |
| #7 Newsletter Workflow | Reported active | List #9 | Duplicate/newsletter consent paths need QA |
| #8 Exit Popup Workflow | Reported active | List #10, template #30 | Needs duplicate-send and consent QA |

Desired Tracking Audit sequence from prompt:

1. Template 19
2. Wait 1 day
3. Template 20
4. Wait 2 days
5. Template 21
6. Wait 3 days
7. Template 22
8. Wait 4 days
9. Template 23
10. Exit/suppression logic if supported
11. Apply tag `TA_Nurture_Jun2026`
12. Prevent duplicate enrollment
13. Keep inactive until approved if creating a new/replacement workflow

## Contact Attributes

Campaign/source attributes documented and implemented in repo:

- `SOURCE`
- `LEAD_SOURCE`
- `FIRST_SOURCE`
- `FIRST_LEAD_SOURCE`
- `FIRST_SOURCE_TIMESTAMP`
- `LAST_SOURCE`
- `LAST_LEAD_SOURCE`
- `LAST_SOURCE_TIMESTAMP`
- `SOURCE_HISTORY`
- `WEBSITE_ROUTE`
- `OFFER`
- `CONSENT_STATUS`
- `CONSENT_TIMESTAMP`
- `OPT_IN`
- `UTM_SOURCE`, `UTM_MEDIUM`, `UTM_CAMPAIGN`, `UTM_CONTENT`, `UTM_TERM`
- `GCLID`, `FBCLID`, `LANDING_PAGE`, `REFERRER`

Operational attributes documented in Notion/docs:

- `LEAD_SCORE`
- `LEAD_STATUS`
- `IS_TEST_LEAD`
- `HANDOFF_STATUS`

Schema note: `SERVICE_INTEREST` is a Brevo multiple-choice attribute and must be sent as an array. `MONTHLY_BUDGET` should use category values `1`-`4`. Verified in repo docs and tests.

Visible contact attribute grouping: not changed in this pass. Current/desired grouping remains unverified in live UI.

## Tags / Segments

Saved segments 1-10 were reported created and verified under `My segments` on 2026-06-16. Segment names are documented in `docs/brevo-campaign-ops-readiness.md`.

Recommended tag naming from docs: `contact_form`, `tracking_audit_offer`, `newsletter`, `exit_popup`, `brevo_meetings_webhook`. Prompt also requests `TA_Nurture_Jun2026` for the clean Tracking Audit nurture sequence; this is unverified as created.

## Items That Must Remain Inactive / Untouched

- Any partial or replacement Tracking Audit nurture workflow until approved.
- Transactional webhook registration until the deployed endpoint is verified.
- SMS workflows; SMS is deferred and account had 0 credits per docs.
- Any Brevo live send, test send, campaign send, WhatsApp send, workflow activation, or contact mutation.

## Manual Brevo UI Verification Checklist

1. Confirm workflows #4-#8 current active/inactive status and exact steps.
2. Confirm Automation #3 is deleted or inactive and cannot send.
3. Confirm templates 19-30 exist, use correct senders, and contain approved links/footers.
4. Confirm attributes above exist with correct types.
5. Confirm `SERVICE_INTEREST` options and `MONTHLY_BUDGET` category values.
6. Confirm lists 7-14 and saved segments 1-10.
7. Confirm suppression for list #13 and #14 before live nurture.
8. Confirm sender/domain SPF, DKIM, DMARC, unsubscribe, and profile pages.
9. Confirm transactional webhook records are absent until endpoint is deployed.
10. Confirm no `admin@alphatrack.digital` usage.
