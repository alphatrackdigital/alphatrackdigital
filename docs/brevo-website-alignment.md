## Brevo website alignment

Current source of truth for AlphaTrack Digital website lead capture.

### Contact Us

- Website route: `/contact-us`
- Thank-you route: `/contact-us/thank-you/`
- Lead source value: `contact_form`
- Brevo `SOURCE` attribute: `Contact Form`
- Brevo list: `8` (`Website - Contact Form Enquiries`)
- Sender/reply-to for internal notification: `info@alphatrack.digital`
- Internal recipient: `info@alphatrack.digital`

### Book A Free Strategy Call

- Website route: `/book-a-call`
- Thank-you route: `/book-a-call/thank-you/`
- Lead capture system: Brevo Meetings embed
- Brevo list: `7` (`Website - Strategy Call Bookings`)
- Sender/reply-to: `sales@alphatrack.digital`
- Internal recipient: `sales@alphatrack.digital`
- Server-side tracking endpoint: `/api/brevo-meeting-webhook`
- GA4 server event: `meeting` + `_booked` + `_confirmed`

Brevo Meetings should call `/api/brevo-meeting-webhook?token=<BREVO_MEETING_WEBHOOK_SECRET>` on
meeting-booked events. This covers confirmed bookings even when the visitor does not click Brevo's
post-booking "Proceed" button and never reaches `/book-a-call/thank-you/`.

The webhook sends a server-side GA4 Measurement Protocol event and intentionally does not forward
participant email or name values into GA4. Required runtime variables:

- `BREVO_MEETING_WEBHOOK_SECRET`
- `GA4_MEASUREMENT_ID`
- `GA4_MEASUREMENT_PROTOCOL_API_SECRET`
- `GA4_MEETING_BOOKED_EVENT_NAME` (optional; leave blank to use the built-in booking confirmation event name)
- `GA4_MEASUREMENT_PROTOCOL_DEBUG_MODE` (`true` only while checking DebugView)
- `GA4_BOOKING_PAGE_LOCATION` (optional; defaults to `https://alphatrack.digital/book-a-call`)

The server event includes `engagement_time_msec`, `session_id`, `page_location`, and `page_title`.
GA4 Measurement Protocol can accept events without `session_id`, but Google requires both
`engagement_time_msec` and `session_id` for user activity to appear reliably in Realtime reports.

Current Brevo account limitation: the `Meeting booked` automation trigger requires Sales Essentials
or Sales Advanced. Until that package is available, booking tracking uses the fallback client-side
events below:

- `booking_cta_click`: visitor clicks an internal `/book-a-call` CTA.
- `booking_widget_loaded`: embedded Brevo Meetings widget loads on `/book-a-call`.
- `booking_scheduler_open`: visitor opens the external `meet.brevo.com` scheduler fallback.
- `generate_lead` and `meeting_booking_redirect`: visitor reaches `/book-a-call/thank-you` after
  clicking Brevo's post-booking "Proceed" button.

### Request a Free Tracking Audit

- Website route: `/offer/tracking-audit`
- Lead source value: `tracking_audit_offer`
- Brevo `SOURCE` attribute: `Tracking Audit Landing Page`
- Brevo list: `11` (`Tracking Audit Leads`)
- Sender/reply-to for internal notification: `audit@alphatrack.digital`
- Internal recipients: `audit@alphatrack.digital`, `martech@alphatrack.digital`

### Backend requirement

The Contact Us and Tracking Audit forms submit to `/api/leads`. Production must route that path to
the repo backend function (`netlify/functions/leads.mjs`, or an equivalent hosted runtime). If
production hosting serves `/api/leads` from another runtime, website submissions may not reach Brevo
or internal recipients even when the frontend pages render correctly.
