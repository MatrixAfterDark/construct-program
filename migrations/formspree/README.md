# Formspree migration prepared, not deployed

The owner must create a Formspree form with their chosen notification recipient and provide the Integration endpoint (https://formspree.io/f/FORM_ID). No password or API key is required.

Set the endpoint in this prepared script, then copy it to site-overrides/party-rsvp.js. Update its three HTML cache versions and override-hashes.json, adapt the existing RSVP tests to Formspree success responses, and run all checks before deploying the GitHub copy. Keep the original Sites project and original fallback repository untouched.

This adapter preserves two one-tap choices and the sole guest message SELECTION LOCKED. It removes FormSubmit-specific formatting and response checks, accepts Formspree HTTP/JSON acknowledgements, preserves bounded retry/timeout behavior, and uses separate provider storage so old FormSubmit acknowledgements cannot suppress new tests. The empty endpoint is guarded against accidental requests. No separate page-view notifications are sent.

The current live copy is unchanged pending the owner's form endpoint. Real inbox receipt and mobile checks remain outstanding. Free Formspree allowance was 50 submissions/month when checked 30 October 2026.
