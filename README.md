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

## Cinematic briefing update

The Access the Briefing choice now starts an approximately 11-second express montage in the same page and user gesture: code rain, Morpheus beckons, Trinity kick, Neo dodge, white Construct weapon racks, then the animated Matrix/name reveal and approved invitation. A persistent Skip to Intel button bypasses the montage. Reduced-motion visitors bypass it automatically. The final page uses three film stills from the uploaded clips instead of claiming a selected character or completed training.

The uploaded Breathe.mp3 is copied byte-for-byte, plays at volume 0.38 and loops behind the briefing and invitation. Sound on/off remains visible. Existing lifecycle code pauses the route's music, videos, reveal timers and code rain while hidden. Direct briefing.html links present a launch button to obtain a reliable audio gesture. If media fails or autoplay is blocked, posters/enable-sound controls preserve access to the invitation.

The four new GIFs were converted only into separate route-specific MP4 copies so they can pause/resume reliably; the original approved website media remain byte-identical. New route assets total 10,917,061 bytes, including the unchanged 8,037,492-byte MP3. The nine new asset hashes are in briefing-media-hashes.json.

Automated checks cover montage order/timing, skip cancellation, receipt timing, relative links, names/fallback, reduced motion and playback rejection, plus prior lifecycle and receipt regressions. Browser playback, visual pacing, actual phone app switching and audible soundtrack checks remain separate acceptance work. The managed local preview daemon was unavailable during implementation.
