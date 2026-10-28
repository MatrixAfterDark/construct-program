# Construct Program — separate choice-screen experiment

Unpublished experiment. The original one-option site and repository remain unchanged:
https://matrixafterdark.github.io/the-construct-program/

## Restore points

Original source: MatrixAfterDark/the-construct-program at 27e7cc081362702a77d9a4714434c45fa17e1ef7.
Exact copied baseline in this repository: 866c58ed5f9e20d0d127392c08de5ceb52f608a4.
The complete one-option opening remains byte-identical in site-overrides/experience.html.

## Routes

index.html presents the two choices; experience.html runs the entire approved experience; briefing.html immediately shows the personalised invitation, countdown and approved party details. All preserve ?name=Lexi; OPERATIVE is the fallback. No RSVP. Briefing has no automatic sound or video. Existing pause/resume and successful-receipt deduplication remain in place. The shortcut sends the same final-page receipt when visible, not on the choice screen.

## Assets and deployment

The workflow downloads the original immutable v225-test release ZIP from the original repository and verifies its SHA256 plus all 499 deployment hashes before applying 16 text overrides. All media remain unchanged. GitHub generated source archives contain the controller, not the full website assets. The release ZIP remains the complete asset recovery source.

GitHub Pages has not been enabled and this new version has not been published. Before publication, review the choice screen and briefing on desktop/phone, verify both links and custom names, then run the existing full-experience acceptance checks. Automated tests do not substitute for audio/video, real phone app switching, full animation and scrolling checks.
