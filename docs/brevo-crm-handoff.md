## Brevo CRM handoff setup

Current source of truth for turning AlphaTrack Digital campaign leads into Brevo CRM follow-up.

Last audited: 2026-06-10.

## Live Brevo CRM state

| Area | Current state |
| --- | --- |
| CRM owner | `kenny@alphatrack.digital` / owner ID `68bf7b64faf0e9c68b0ccdb4` |
| Pipeline | `Deals Pipeline` / pipeline ID `68bf7ba1f6e11688cf7a2164` |
| Deals | 0 existing deals at audit time |
| Tasks | 0 existing tasks at audit time |
| Notes/files | 0 existing notes/files at audit time |
| Companies | Available through `/companies`; the `/crm/companies` route is not supported |
| Account timezone | `Africa/Accra`; review against operating timezone `Africa/Lagos` before relying on timed sends/tasks |

## Pipeline stages

| Stage | Brevo stage ID | Recommended probability |
| --- | --- | --- |
| New | `8dae99f7-6de0-4c1f-9ca6-b5ee72a40d85` | 10% |
| Qualifying | `089c5fc7-da86-489a-a3b5-503bc5d4bd54` | 25% |
| Demo scheduled | `bc2f86a0-8374-479f-bd43-27675c04e31a` | 45% |
| Pending commitment | `c92aecbc-1bf0-41b9-8cac-63947375fb58` | 70% |
| In negotiation | `e2d8cd85-fe7b-40e5-a21d-c1836770bd1b` | 85% |
| Won | `ba4b582b-b96e-40b6-b024-d4527c60d657` | 100% |
| Lost | `1021864c-0cd0-44d7-9388-66e31123b54e` | 0% |

Audit note: Brevo currently reports every non-lost stage at `100%`. Update the pipeline probabilities before using CRM forecast reporting.

## Lead-to-CRM handoff rules

| Lead path | Source/list signal | CRM action | Deal stage | Follow-up task |
| --- | --- | --- | --- | --- |
| Strategy call booking | List `7` (`Website - Strategy Call Bookings`) or `LEAD_SOURCE=brevo_meetings_webhook` | Create deal immediately | `Demo scheduled` | Same-day call prep/review task |
| Tracking audit request | List `11` (`Tracking Audit Leads`) or `LEAD_SOURCE=tracking_audit_offer` | Create deal after explicit audit request or qualified engagement | `New` | Review site/tracking context within 1 business day |
| Contact form enquiry | List `8` (`Website - Contact Form Enquiries`) or `LEAD_SOURCE=contact_form` | Create deal for commercial/service enquiries | `Qualifying` | Reply and qualify within 1 business day |
| Hot lead | List `12` (`ATD | Hot Leads`) or high `LEAD_SCORE` | Create or update deal | `Qualifying` unless a call is already booked | Sales follow-up within 1 business day |
| Newsletter signup | List `9` (`ATD | Newsletter`) | Nurture only; no deal by default | N/A | No task unless score rises |
| Exit popup lead | List `10` (`ATD Website - Exit Popup Leads`) | Nurture only; no deal by default | N/A | No task unless score rises |
| Sales converted | List `14` (`ATD | Suppression - Sales Converted`) | Stop nurture and mark/keep deal as `Won` where applicable | `Won` | No nurture task |

## Deal defaults

Use these values when adding CRM actions in Brevo visual workflows or an API-backed handoff.

| Field | Value |
| --- | --- |
| `deal_owner` | `68bf7b64faf0e9c68b0ccdb4` |
| Pipeline | `68bf7ba1f6e11688cf7a2164` |
| Deal name | `[Company/Website or Contact Name] - [Offer]` |
| Deal description | Include `LEAD_SOURCE`, `WEBSITE_ROUTE`, `OFFER`, message/context, consent timestamp, and original list |
| Amount | Leave blank unless the lead has a qualified scope/value |
| Close date | Leave blank at creation; update during qualification |

## Task defaults

| Trigger | Task title | Due timing |
| --- | --- | --- |
| Strategy call booking | `Prepare for strategy call - [contact/company]` | Same day or next business day, depending on booking time |
| Tracking audit request | `Review tracking audit request - [website]` | Next business day |
| Contact form enquiry | `Reply to contact enquiry - [contact/company]` | Next business day |
| Hot lead score | `Follow up with hot lead - [contact/company]` | Next business day |

## Suppression rules

- Every nurture workflow should check list `14` before sending non-transactional follow-up.
- When a contact is added to list `14`, the contact should exit tracking audit, contact-form, newsletter, and exit-popup nurture.
- Converted contacts can still receive necessary transactional or meeting-related messages.

## QA checklist

Run these after ChatGPT Agent mode finishes the Brevo visual workflows.

1. Submit a tracking audit test lead and confirm contact attributes, list `11`, nurture entry, and no premature deal if the chosen rule requires engagement first.
2. Submit a contact form test lead with commercial intent and confirm list `8`, deal creation in `Qualifying`, and a reply task.
3. Book a Brevo Meetings test call and confirm list `7`, deal creation in `Demo scheduled`, and a prep task.
4. Add a test contact to list `12` and confirm a deal/task is created or updated without duplicating existing deals.
5. Add a test contact to list `14` and confirm all nurture paths stop or skip remaining promotional sends.
6. Confirm the pipeline stage probabilities are no longer all `100%`.
7. Confirm owner assignment routes to `kenny@alphatrack.digital`.
8. Confirm timezone-sensitive waits and task dates behave correctly for Nigeria operating hours.

## Deferred until automation builder is idle

- Do not edit active/in-progress Brevo visual workflows while another agent is arranging cards.
- Add CRM deal/task actions after the nurture workflows are saved and stable.
- Activate only after the QA checklist passes with test contacts.
