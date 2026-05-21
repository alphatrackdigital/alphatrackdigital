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

The repo does not currently receive booking submissions from Brevo Meetings. Booking capture,
confirmation, and redirect behavior are controlled in Brevo Meetings.

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
