# GTM Meta Tag Audit - Corrected 2026-06-29

## Correction

The seven Meta tags are **not visibly paused** and **no malware warning is visible** in the GTM tag list or opened Meta tag editor.

The earlier report was incorrect. GTM's DOM/accessibility snapshot repeated hidden warning text inside every tag row, including GA4 and Google Ads Conversion Linker rows. That text was not a reliable status signal. The supporting screenshots were archived outside the repository during 2026-06-29 housekeeping; compact structured evidence and this corrected audit remain in the repository.

The orange symbols are Custom Event trigger icons. They are not malware warnings.

## Container State

- Container: `GTM-MVXWCTZ8`
- Workspace: `9`
- Live version: `9`
- Workspace changes: `22` modified tags, `0` added, `0` deleted
- Publish performed: Yes

## Tag Inventory

| Tag | Trigger | Purpose/event | Additional consent |
| --- | --- | --- | --- |
| `Meta \| BASE \| pixel \| all_pages \| web` | `TR \| PV \| allowed_hostnames \| page_view \| global` | Load Meta Pixel and PageView | `ad_storage`, `ad_personalization`, `ad_user_data` |
| `Meta \| CONV \| Lead \| booking_confirmation \| web` | `TR \| CONV \| generate_lead \| data_layer \| global` | Lead after confirmed booking | Same three ad fields |
| `Meta \| CONV \| Lead \| contact_form \| web` | `TR \| CONV \| contact_form_submit \| data_layer \| global` | Lead after contact form submission | Same three ad fields |
| `Meta \| CONV \| Lead \| exit_popup \| web` | `TR \| CONV \| exit_popup_success \| data_layer \| global` | Lead after exit-popup submission | Same three ad fields |
| `Meta \| CONV \| Lead \| newsletter_subscribe \| web` | `TR \| CONV \| newsletter_subscribe \| data_layer \| global` | Lead after newsletter subscription | Same three ad fields |
| `Meta \| CONV \| Lead \| tracking_audit \| web` | `TR \| CONV \| tracking_audit_submit \| data_layer \| global` | Lead after tracking-audit submission | Same three ad fields |
| `Meta \| EVT \| Lead \| whatsapp_click \| web` | `TR \| CLK \| whatsapp_click \| wa \| global` | Lead after WhatsApp click | Same three ad fields |

No PII was inspected or added.

## Leak Root Cause

On the previous preview, selecting Analytics-only released GTM because the site intentionally loads GTM after either optional consent category. The published GTM version did not yet contain workspace `9`'s unpublished additional consent checks.

Direct navigation to `/book-a-call/thank-you` pushed:

- `atd_route_view`
- `generate_lead`
- `meeting_booking_redirect`

`generate_lead` matched:

- Tag: `Meta | CONV | Lead | booking_confirmation | web`
- Trigger: `TR | CONV | generate_lead | data_layer | global`
- Setup tag: `Meta | BASE | pixel | all_pages | web`

At that time:

- `ad_storage: denied`
- `ad_user_data: denied`
- `ad_personalization: denied`

The setup tag loaded `fbevents.js`, producing the observed Meta requests.

## Fix

`index.html` now has a fail-closed Meta transport guard. It blocks `connect.facebook.net` and `facebook.com` script, image, beacon, fetch, and XHR transports unless all three advertising consent fields are granted.

New preview:

`https://atd-website-test-lxj2vgs9r-alphatrackdigitals-projects.vercel.app`

Focused results on `/book-a-call/thank-you`:

- First visit: zero Meta requests.
- Reject All: zero Meta requests.
- Analytics-only: zero Meta requests while the three ad fields remain denied.
- Targeted Advertising-only: Meta allowed after all three ad fields grant.
- Accept All: Meta allowed after all three ad fields grant.

The Meta pause/malware blocker is removed. GTM Version 9 was published, preserving all three advertising-consent requirements.
