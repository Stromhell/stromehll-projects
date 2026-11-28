# JD act authoring brief (for each act writer)

Video: "The YouTuber a Casino Paid to Stop Posting" (prefix JD): a casino pays YouTuber Jack Doherty to stop posting -> 2017 supermarket kicked-out videos become a business -> fights and bodyguards (allegations only, slurs never shown: bleep blocks) -> Kick, the McLaren crash live, bans -> second chance, slapped, banned again -> golf heckle, trespassed from PGA Tour -> Shuffle contract, falling views. Stormi 2D house style: Gumball-style rig characters on painted plates, same engine as Whatnot / Gulf Kings / Prime. UK audience: British spelling on screen.
Repo dir: /home/user/repo/2d-history (branch claude/project-thread-3pdro7). DO NOT commit or push; the lead does that. Never delete files. Don't touch /mnt/project-files.
Do NOT edit shared/ files, whatnot/ files, jd_kit.js, plates_a.js, head.tmpl/foot.tmpl or another writer's acts. Put act-specific helpers at the top of your own body.js.

## What you write
For each act N assigned to you: `jack-doherty/production/acts/actN/body.js`, built with
`cd jack-doherty/production/acts && (sed "s/JD act N/JD act N - TITLE/" head.tmpl; cat actN/body.js foot.tmpl) > actN/act.html`
- Shot list (VO, visual, on-screen text, sketch spec incl. plate `bg:`, animation note) is in `jack-doherty/build/data.py` (S list; act index = position in S). VO per shot = `jack-doherty/production/voice/actN.txt` (one paragraph per shot). window.SHOTS must have exactly one entry per paragraph, in order. Only act6 calls endTitle(5) at the end (clean 5 s end card, NO VO, no subtitles, nothing moving fast: subscribe card for "Stormi Explain Everything"; copy how whatnot/production/acts/act6/body.js does it). act0's TITLE shot is a normal shot.
- timing.js: real voice timing `acts/actN/timing.js` may appear while you work (the lead writes it). If missing, make an estimate: `cd jack-doherty/production && python3 fake_timing.py N`. ALWAYS anchor actions to words with an `at(S, 'word', off)` helper (copy from whatnot act0 body.js), never hard-coded seconds alone. Shot lengths will change by +-30%.

## Pattern to copy
Read whatnot/production/ACT_BRIEF.md (same engine), then whatnot/production/acts/act0/body.js, act3/body.js and act6/body.js closely: plates loaded with K.load(name, PL + name + '.jpg') (PL = jack-doherty/production/plates/), per-shot `plate`, `cam` {z,x,y} [from,to] in plate px (plates 2560x1440, canvas 1920x1080), `bed` ambience loops, `light`, `init: S => {...}` with S.D.figs (rig figures), S.D.live (world space after plate), S.D.front, S.D.over (screen-space overlays), S.D.sfx [[time|word, name, gain]]. Helpers in whatnot/production/tw_kit.js / xu_kit.js / jh_kit.js / pr_kit.js / wn_kit.js (all loaded).
`jack-doherty/production/jd_kit.js` (window.JD): cast + props for this video. READ ITS HEADER. WN.* cast/props (phones, chat, chips, stamp, files, gavel, supercar...) also available. Test sheet: jack-doherty/production/acts/kit_test/act.html.
Running devices:
(1) JD.stamp red 'KICKED OUT' / 'BANNED' stamp thumps in whenever a door closes on Jack.
(2) The BANNED clipboard JD.list (screen-space top-right, x ~1560 y ~40, s ~.75) appears in act0 shot 5 empty, and gains a line at each ban: act1 shot 1 'SUPERMARKET' (n 0->1), act3 shot 6 'KICK' (->2), act4 shot 3 'KICK (AGAIN)' (->3), act5 shot 2 'PGA TOUR' (->4), act6 shot 4 'SHUFFLE (PAID)' (->5). Items array always ['SUPERMARKET','KICK','KICK (AGAIN)','PGA TOUR','SHUFFLE (PAID)']. Show it only on shots where it changes (+ act5 shot 4 full screen) so it doesn't clutter; keep it clear of faces.
Name tags (gold name tile like WN act tags) on first appearance: JACK DOHERTY, RICKY, N3ON, ANDREI ARLOVSKI, MACKENZIE HUGHES, SHUFFLE CEO. Dates as date tags. Big numbers as rolling counters (JD.counter). Allegations shown with an 'ALLEGED' tag; 'OUTCOME NOT REPORTED' where said.
Jack = JD.JACK() (adult, sunglasses), JD.JACK('teen') in 2017, JD.JACK('glove') in the ring. Keep him consistent.

## Plates (jack-doherty/production/plates/*.jpg, 2560x1440)
There: creator_room, chart, title, teen_room, lambo_showroom, courtroom, wn_hq, law_office, chatshow, studio, boardroom, shopfront, tampa_street, neon_club, ring.
Being painted now by another agent (plates_a.js): supermarket_aisle, night_highway, hospital, golf_course. Check `ls jack-doherty/production/plates`; read the comment line above each painter in plates_a.js for floor y and hotspots; if missing when you start, code against a stand-in (studio / tampa_street / courtroom) and switch once it exists (wait/poll a few minutes before finishing if needed).
Find floor y of each plate by looking at the image (downscale and Read). Where a plate appears twice, frame a different area, zoom and light the second time.

## Rules (Pushpam's, all are hard fails; also /mnt/project-files/system/qa/FEEDBACK-LESSONS.json, read-only)
- Real people stylised, no likeness, no real logos; KICK / SHUFFLE / McLAREN / PGA TOUR only as plain text in our own font.
- Every VO line has a visible action showing what is said. Nothing static > 2-3 s: camera drift/push on every shot, idle breathing, ambient motion.
- No overlaps; nothing floats (feet on the floor line, seated people on a real chair/bed, held objects in hands); nobody pops in (walk in/out of frame or a camera reveal); complete bodies; varied poses; consistent scale; real-world object sizes (car ~1.2-1.3 m tall supercar vs person, phone in hand is small; big floating phones/post cards are clearly UI overlays).
- Walkers keep walking until they arrive, then pose (never a pose mid-walk with frozen legs). Characters behind desks/beds drawn before the furniture overlay.
- Cards/text never over faces and stay above the subtitle band (bottom ~200 px of 1080 reserved).
- SFX on actions (names must exist in shared/sfx; `ls shared/sfx`) and a `bed` ambience per shot. Lots of SFX.
- Rich detail: live props and light (glows, neon flicker, rain, dust, crowd flashes) on top of plates so no frame looks plain.
- Never show or spell a slur: the slur clip is a red BLEEP block over a waveform.

## Check your work (required)
After building, snapshot frames: `node shared/snap.js jack-doherty/production/acts/actN/act.html /tmp/claude-0/jdsnapN.jpg t1,t2,...` (2-3 times per shot) and LOOK at the sheet with Read. No [pageerror] lines allowed. Fix every overlap, float, empty frame, text-over-face, clipped text or wrong scale, re-snap, repeat until clean (max 3 rounds). Do not run full renders (CPU is shared); the lead renders.
Report back in under 150 words: acts done, plates used (incl. stand-ins), known weak spots.
