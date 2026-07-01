# Brevo List Organization

Date: 2026-07-01

## Scope

Organize the existing ATD Brevo contact lists into purpose-specific folders without recreating, renaming, or deleting lists and without changing list IDs, contacts, workflows, forms, API configuration, or environment variables.

## Folders created or reused

Neither target folder existed before this task, so both were created:

- `ATD - Website Lead Capture`
- `ATD - Lifecycle & QA`

No duplicate folders were created.

## Lists moved

Moved to `ATD - Website Lead Capture`:

- `#7 Website - Strategy Call Bookings`
- `#8 Website - Contact Form Enquiries`
- `#9 ATD | Newsletter`
- `#10 ATD Website — Exit Popup Leads`
- `#11 Tracking Audit Leads`

Moved to `ATD - Lifecycle & QA`:

- `#12 ATD | Hot Leads`
- `#13 ATD | Test Leads`
- `#14 ATD | Suppression - Sales Converted`

Post-change verification confirmed all eight lists in the intended folders with their original names and IDs. No list was recreated, renamed, or deleted.

## Lists intentionally left untouched

- `#5 identified_contacts` remains in `marketing_automation`.
- `#4 Contacts involved in conversations` remains in `Conversations contacts`.

## Safety confirmations

- List IDs `#7` through `#14` were preserved.
- No contacts or contact records were edited or deleted.
- No automations or workflows were activated, paused, deleted, or edited.
- No forms, API keys or settings, sender settings, attributes, segments, CRM pipelines, environment variables, or deployment settings were changed.
- No secrets, credentials, private contact data, contact IDs, tokens, cookies, or authentication values were read into documentation or exposed.

## Launch impact

This is operational CRM cleanup, not a launch blocker. It improves list navigation and campaign/lead-capture administration without changing lead routing or automation behavior.

## Remaining deployment decisions

1. Decide whether optional Book-a-call CRM deal/task and custom webhook proof is required before production.
2. Obtain explicit approval for the Namecheap/cPanel deployment.
3. Complete the production six-scenario consent QA after deployment.

Cookie Policy is not a remaining blocker: it was cleared in commit `5e11ddc` and confirmed deployed on the canonical Vercel test ground. Form submission, Brevo widget loading, and exit-popup/Ketch-modal blockers were cleared in commits `0db41a4` and `9ac9d60`.
