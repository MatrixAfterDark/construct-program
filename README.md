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

## Dramatic greeting and grouped choices

The menu removes the repeated event title, enlarges the personalised greeting, types it at 48ms/character, pauses 650ms, types Choose your connection at 35ms/character, then reveals both complete command/description groups after a 450ms pause. No empty button bars appear during typing. The reverse-video bars fit their labels; the descriptions and tagline are inside each button's clickable area. Breathe uses preload=auto and load() during the opening; play() is still invoked directly on the briefing gesture. Actual first-sound latency remains browser/network-dependent.

## Wise choice and softer command reveal

Choosing Enter the Construct sets a route-only flag so the original terminal typing greets the guest with A wise choice, NAME., pauses 850ms, then continues the approved program title/floppy sequence. The standalone one-option experience retains its original welcome. The menu command labels are 8% larger and both selections resolve smoothly over 800ms after the opening typing completes, with no empty bars. Reduced-motion mode reveals them immediately.

## Capital terminal copy, audio entry and reveal flash fix

Opening descriptions and A WISE CHOICE, NAME. use capitals. The Construct click calls enterConstruct(), which unlocks/resumes the original WebAudio context before starting its existing typed program opening and tap sounds. Original standalone reset behavior is preserved.

The newly attached Neo bullet-stop and flying clips are inserted before the weapon racks in the continuous 8.29-second stream (about 10.6 seconds at 0.78 playback). Breathe stays at normal speed. Only the route-specific video is revised; approved Construct media remain unchanged.

The briefing final panel now enters gather mode and resets character resolve to zero before it is made visible. A newly created portrait also uses that zero-default resolve opacity while decoding. The rain-covered action screen stays in front until portrait preparation completes; the code formation sets resolve to one only when it finishes. This closes the early-image flash path. Automated checks cover preflight ordering and click-authorised typing audio; actual visual and audible phone acceptance remains outstanding.

## Rope-jump addition and concise Construct description

The newly attached 1.4-second rope-jump clip is inserted before the weapon racks, keeping the same green CRT treatment and continuous foreground rain. The single stream is 9.71 seconds (roughly 12.4 seconds at the established playback rate). The approved menu description now reads FIND YOUR MATRIX LOOK. / DOWNLOAD YOUR SKILLS. Audio, name reveal, code formation and the full Construct route are otherwise preserved.

## Construct audio interruption repair

The hidden Construct warm-up now forces muted=true rather than relying on volume=0. Its playing event cannot reveal/unmute the film until the explicit playback request has passed entryCompletion, and delayed warm-up promises cannot pause authorised playback.

Selection/training music retains the approved levels, fades and source asset, but routes through a GainNode when supported so ducking does not depend on an adjustable HTML media volume. Silent warm-up is explicit. A bounded visible/unmuted pause recovery attempts continuation without rewinding, while dialogue-finish restoration explicitly resumes the audio context and music playback. Pointer interaction can retry browser-blocked playback; hidden/off/muted states do not trigger unwanted playback. Original media files and original hosted projects remain unchanged.

New automated tests simulate ignored element-volume writes, delayed priming, native pause interruption, dialogue-level restoration, hidden/muted guards and an interrupted audio context. Prior route/lifecycle/receipt tests and syntax checks also pass. This repairs identified code weaknesses; the friend's exact phone/browser failure has not been reproduced in a real device browser, so same-device audio/video sync and background/return acceptance remain necessary.

## Speech-priority ducking and return home

Tank's music recovery can overlap the gong/Morpheus narration. Music now supports scoped speech ceilings, so a later request for 0.48 music volume remains capped at 0.08 while Morpheus's approved audio is playing. The narration releases its ceiling in finally on completion/cancellation, then the existing 1.4-second fade restores the bed. Nested/overlapping speech holds cannot release each other's cap. Paused playback can still recover without raising the speech level.

Both final routes have a BACK TO HOME link after the bottom footer, shown when the final reveal is ready. It returns to the new repository's opening choices with the same URL-encoded personalised name (OPERATIVE fallback). Existing live reference projects are unchanged. Automated ignored-volume, overlapping-hold, fade-level, route, syntax and hash checks pass; same-device iPhone audible balance and full desktop/phone visual review remain acceptance checks.

## Optional solo / plus-one confirmation

Both final invitations now offer SOLO OPERATIVE or BRINGING BACKUP · +1 below the approved party details. Solo submits immediately; Backup opens one optional guest-name field and a Confirm button. The guest name comes from the personalised URL; an unnamed/OPERATIVE link asks for a name before sending. This is an explicit attendance confirmation, separate from the automatic DETAILS VIEWED receipt.

Confirmations POST to the existing FormSubmit endpoint for steven.cuzzillo@gmail.com, with name, party size 1/2, optional backup name, event and submission time. Success appears only after HTTP and FormSubmit success acknowledgement. No attendance email is sent just by opening, scrolling or selecting Backup. A labelled Update Connection control lets guests send a revised confirmation. Successful choices persist per guest in the same browser, shared across both routes; duplicate taps/in-flight requests are blocked. Storage failure falls back to memory; other devices/cleared storage can submit again. Network failure/rejection/15-second timeout shows a retry message without claiming confirmation. Server acceptance after a lost response can still result in a duplicate on manual retry.

This feature is isolated in party-rsvp.js/CSS with standard buttons/forms, 48px touch targets, 16px inputs to avoid focus zoom, keyboard submission, explicit labels and live status. It does not alter media, audio controllers, clock, narration, training, pause/resume or reveal logic. Automated tests cover solo, optional backup, missing name, update, duplicate taps, reload, offline/rejection/timeout and blocked storage. Real iPhone/Android acceptance remains distinct from those checks.

### Live RSVP service verification limit

The desktop browser successfully reached the invitation with video/music playing and opened/focused the optional backup field. The labelled SETUP TEST NOT A GUEST submission did not receive service success; native diagnostics also returned HTTP 521 from FormSubmit's POST endpoint and public homepage. This is an observed service/network response in this environment, not a claim of a verified global outage. The UI correctly kept the request unconfirmed and offered retry.

On submission failure only, SEND BY EMAIL now offers an encoded mailto to the same organiser address with the guest, solo/+1 choice and backup prefilled. Guests must send that email in their mail app; the page does not mark a mailto click as confirmed. Normal two-button behavior is unchanged when FormSubmit acknowledges success. Mocked success/rejection/timeout and fallback tests pass; live automatic email delivery remains pending a healthy service acknowledgement and inbox check.

## Two one-tap choices and silent response notifications

The current RSVP UI contains only SOLO OPERATIVE and BRINGING BACKUP · +1. There are no name fields, optional guest-name fields, extra Confirm/Update buttons, or mailto/email-app handoffs. Either button sends the explicit response in the background using the personalised URL name; unnamed links retain OPERATIVE. The same buttons remain available to change the answer, and successful legacy choices migrate without re-sending.

Final-page DETAILS VIEWED notifications remain unchanged on both the full Construct and briefing finales. RSVP SELECTION is a separate message with linked name, solo/+1 and party size. Reaching the end does not imply an attendance answer. All existing audio, sequence and viewed-receipt scripts are preserved.

The existing FormSubmit service still returned HTTP 521 in this environment's health check. Failed RSVP selections are saved per name/device and marked waiting-to-send, not confirmed. The client makes up to three background attempts per page, with 20/60-second delays, and retries queued choices on a later visit/online/visible event. There is no server-side queue: a closed page cannot send until the visitor returns; blocked storage limits recovery to the current page. Notification IDs stay stable across retries to help identify duplicates after a lost response, but this email service provides no cross-device/server idempotency guarantee. Live receipt/RSVP email delivery remains unverified until healthy service acknowledgement and inbox confirmation.

Automated tests cover both one-tap choices, link-name/fallback, successful and failed submissions, response updates, deduplication, queue persistence/retries, visibility/online recovery, legacy migration, no name/email UI and both viewed triggers. Existing audio regressions pass.

## First-play film loading (v13)

The original film is preloaded during training without restarting its transfer at signoff. Playback now has a separate 12-second startup allowance and a 5.5-second progress watchdog, rather than a 5.5-second total budget including loading. Advancing native video time can reveal the film if the first frame callback is delayed. The approved media, zoom duration, music and speech mix are unchanged. Mock cold-start and cancellation tests pass; real first-visit iPhone verification remains outstanding. Email delivery remains unverified: the configured FormSubmit service returned HTTP 521 during the check.

## Simple button-only notification (v14)

Replaces separate final-page viewed receipts with button-only attendance messages for both routes. Uses the original Invite endpoint and small message format: name, ATTENDING, plus_one YES/NO, event, timestamp and email formatting fields. No guest inputs added. Queue/retry and confirmed-response checks remain so a network failure is never reported as success. All audio, media and sequence scripts are unchanged. End-to-end inbox delivery must still be confirmed.

## Selection acknowledgement and Neo dodge pacing (v15)

Buttons immediately display only SELECTION LOCKED after a choice. This acknowledges local selection, not email delivery. Backend acknowledgement, successful-delivery deduplication and pending retry logic remain separate and unchanged. No loading or failure messages are displayed. Email delivery remains unverified. All seven briefing clips remain in the same continuous, byte-identical MP4. Playback slows from .78x to .45x during the backward bullet dodge (2.20–3.75 source seconds), returning to .78x afterwards without seeking. The startup safety timeout is 30 seconds to allow the added screen time. No Construct/audio engine files or approved media were changed.

## Remove stray repeat after Neo flight (v16)

Removed original action-stream frames 160–163 (three stray backward-dodge frames plus a one-frame weapons-room flash) between Neo flight and rope jump. 229 frames remain at 24fps, 640x360, 9.541667s. The main backward-dodge shot at 2.20–3.75 source seconds retains its .45x playback. All seven principal clips remain in order. Only the generated briefing montage was re-exported; approved Construct source media and all audio stay unchanged.

## Existing FormSubmit recipient identifier (v17)

Switched only the attendance AJAX destination from the plain Gmail address to the existing recipient identifier supplied in the owner’s previous FormSubmit email for matrixafterdark.github.io. This is a delivery test, not a verified fix: a direct labelled test still received HTTP 521. Button acknowledgement, retry and delivery verification logic, footage and audio remain unchanged. Owner inbox receipt is still required to confirm delivery.

## Original receipt transport on selection (v18)

Restores the completion-receipt transport from commit 31c102eb8600a2ed5ad1c9f1644a482ac0456239, using the same AJAX service through the existing recipient identifier, with original POST headers, keepalive, DETAILS VIEWED message fields and five-second single retry. Adds the selected option to the email body and subject. Trigger moved to the two attendance buttons; automatic final-page arrival remains a no-op. Last acknowledged selection is tracked separately from the displayed local selection, and changes can be re-sent. Fresh storage keys prevent old page-view or prior provider tests from suppressing this test. The UI remains SELECTION LOCKED only. All eight automated suites pass; real inbox delivery remains unverified. Clips, audio and sequence runtime files are unchanged.
