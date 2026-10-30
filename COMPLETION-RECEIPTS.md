# Original receipt transport, button trigger (v18)

The original final-page notification method is now called only by Solo Operative or Bringing Backup · +1 on either route. It uses the same AJAX service through the existing recipient identifier and the original request format, adding the option as selection and appending it to the email subject. No separate message is sent when arriving at the final page.

The original five-second single retry is retained. Only a confirmed service success is recorded as sent. A local selected state is separate and displays SELECTION LOCKED immediately, whether or not email delivery has succeeded. Repeated acknowledged choices are suppressed; changing a choice sends an updated message. Fresh storage keys isolate old tests. Reopening the page restores the chosen button without sending; a failed choice can be tapped again to retry. No provider account or new bot is used.

The transport is restored, but inbox delivery is not verified. Neither an on-screen selection nor a mocked success response proves an email arrived. Browser and real-phone delivery checks remain outstanding.
