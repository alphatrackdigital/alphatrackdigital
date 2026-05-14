## Brevo double opt-in setup

Newsletter subscriptions can use Brevo's DOI contact endpoint when both of these environment variables are set:

```env
BREVO_DOI_TEMPLATE_ID=
BREVO_DOI_REDIRECT_URL=
```

Behavior:

- If both values are present, newsletter submissions go to Brevo's DOI flow and the backend returns `pendingConfirmation: true`.
- If either value is missing, newsletter submissions fall back to the current single-opt-in contact creation flow.

Required Brevo-side setup:

1. Create an active Double Opt-In email template in Brevo.
2. Use the template ID as `BREVO_DOI_TEMPLATE_ID`.
3. Set `BREVO_DOI_REDIRECT_URL` to the page users should land on after confirming.
4. Keep `BREVO_NEWSLETTER_LIST_ID` pointed at the final newsletter list.

Recommended confirmation copy:

- Immediate form success: "Check your email to confirm your subscription."
- Post-confirmation page: "Your subscription is confirmed."
