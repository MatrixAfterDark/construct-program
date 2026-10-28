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

## Connected CRT revision

The new index now uses the original physical terminal and a program menu inside its CRT. Enter the Construct removes the menu and calls the existing terminal opening, with all original sequence behavior retained. The terminal startup gate applies only to pages with data-path-menu=true; experience.html remains the original one-option restore route.

Access the Briefing starts Breathe on the same user click and plays one continuous approximately five-second action-stream.mp4, avoiding per-shot buffering and black gaps. Aspect ratio is preserved with square pixels and letterboxing; every scene including weapon racks receives the same green CRT treatment. Continuous screen-blended code rain sits in front of the footage. At the end, the existing falling-code formation renderer (with a luminance mask for black backgrounds) resolves the supplied trio image over 2.2 seconds, then the Matrix/name reveal and approved invitation continue. No training-complete claims or selected-character controls are shown on this route.

New route deployment copies only Breathe, action-stream.mp4 and final-trio.png. Old individual route clips/stills remain in Git history/repository but are excluded from the deployed package. The full Construct media and original hosted projects remain unchanged. Automated behavior/syntax/hash checks passed; this revision still requires visual desktop/phone and audible playback review because the browser connection and local preview service were unavailable.

## Personalised typed computer menu

The computer choice uses the original opening Courier New face and matching responsive base font sizes, with larger supporting copy. It types WELCOME, NAME (OPERATIVE fallback), the program heading and the two choices using the existing pausable lifecycle clock. Invisible layout copies reserve space while typing; controls remain keyboard-accessible, typing cancels when either route is chosen, and reduced-motion visitors get immediate text. The menu can scroll within the CRT on short screens rather than shrink its text.

The existing five-second action stream now plays at 0.78 speed (roughly 6.5 seconds); Breathe remains at normal speed and starts on the briefing click. Additional uploaded GIFs (Fly, Stop Bullets, Trinity Jump Kick, Rope Jump) are pending reattachment because their temporary upload copies were cleared and were never saved in this repository. No substitute footage was introduced.

## Green command-bar entrance

The two menu choices use square green reverse-video command bars with dark terminal text. Enter the Construct blinks between two readable green levels every 1.8 seconds; hover/focus and reduced-motion mode stop the blink. Supporting text is shortened to the character/look hook, Sound on/Reality off, and Skip training/View the invitation. The personalised greeting and typing remain. Only menu presentation changed; the Construct, briefing, soundtrack and approved original sites remain unchanged.
