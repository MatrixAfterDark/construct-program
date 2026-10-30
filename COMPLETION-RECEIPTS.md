# Durable responses (v19)

Automatic final-page view notifications remain disabled. The two attendance buttons now post only to the separately hosted response service. Each response is stored before a {recorded:true,id} acknowledgement. The guest sees only SELECTION LOCKED after this acknowledgement. No message app or additional guest screen opens.

The service retains named choices and timestamps for the owner-only log. Trial links use trial=1 and test records do not enter actual guest totals. The owner-only CLEAR TEST RESPONSES action deletes tagged test records and the exact original setup-test identity only.

Email sending runs after storage in the background. Its known HTTP 521 failure is visible in the private log and does not lose attendance. Inbox delivery remains unverified and must not be claimed as working.
