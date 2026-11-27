# WN act authoring brief (for each act writer)

Video: "The $20 Billion App Accused of Being a Casino" (prefix WN): a man spends $25,000 in one click on Whatnot -> what Whatnot and box breaks are -> the 2022 golden-ticket card and the 3 winners -> arbitration claims that breaks are an illegal lottery (allegations; Whatnot denies) -> limits with gaps, minors, dark patterns -> Sean's story, chasing the dragon, Kapp + Parker -> China's rules vs UK/US/EU lag, creator ads, help. Stormi 2D house style: Gumball-style rig characters on painted plates, same engine as Gulf Kings / Prime / Pattinson. UK audience: British spelling on screen.
Repo dir: /home/user/stromehll-projects/2d-history (= /home/user/repo/2d-history, branch claude/project-thread-d5sjha). DO NOT commit or push; the lead does that. Never delete files. Don't touch /mnt/project-files.
Do NOT edit shared/ files, the kits (pr_kit.js, jh_kit.js, tw_kit.js, xu_kit.js, wn_kit.js), plates*.js, head.tmpl/foot.tmpl or another writer's acts. Put act-specific helpers at the top of your own body.js.

## What you write
For each act N assigned to you: `whatnot/production/acts/actN/body.js`, built with
`bash whatnot/production/acts/mk.sh N "short title"` -> acts/actN/act.html.
- Shot list (VO, visual, on-screen text, sketch spec incl. plate `bg:`, animation note) is in `whatnot/build/data.py` (S list; act index = position in S). VO per shot = `whatnot/production/voice/actN.txt` (one paragraph per shot). window.SHOTS must have exactly one entry per paragraph, in order. Only act6 calls endTitle(5) (clean 5 s end card, NO VO, no subtitles, nothing moving fast: subscribe card for "Stormi Explain Everything"; copy how gulf-monarchies act7 / pattinson act9 do it). act0's TITLE shot is a normal shot (its VO plays over the title).
- timing.js: if real `acts/actN/timing.js` is missing, make an estimate: `cd whatnot/production && python3 fake_timing.py N` (check the script's paths point at whatnot; fix a copy in your own act folder if not). Real voice timing replaces it later, so ALWAYS anchor actions to words with `A.at(S, 'word', fallbackSeconds)` (word as in the VO text incl. trailing punctuation if it ends a sentence), never hard-coded seconds alone. Shot lengths will change by +-30%. Numbers are spoken as words already in the VO.

## Pattern to copy
Read `gulf-monarchies/production/ACT_BRIEF.md` (same engine), then `gulf-monarchies/production/acts/act0/body.js`, `act4/body.js` and `act7/body.js` closely: plates loaded with K.load, per-shot `plate`, `cam` {z,x,y} [from,to] in plate px (plates 2560x1440, canvas 1920x1080), `bed` ambience loops, `light`, `init: S => {...}` with S.D.figs (rig figures), S.D.live (world space after plate), S.D.front, S.D.over (screen-space overlays), S.D.sfx [[time|word, name, gain]]. Helpers in tw_kit.js / xu_kit.js / jh_kit.js / pr_kit.js.
`whatnot/production/wn_kit.js` (window.WN): cast + props. READ ITS HEADER COMMENT. Test sheet: whatnot/production/acts/kit_test/act.html.
Running devices:
(1) The golden chase card (WN.goldCard) appears somewhere natural in every act and is the hero of the last shot.
(2) The SWIPE TO BID pill (WN.swipe) slides in on temptation moments (act0 shot1, act1 shot1, act4 shot4, act5 shots 2-4).
(3) Act 5 only: red SPENT tracker (WN.spent) top-left (screen x ~60, y ~60) climbing $0 -> ~$1.4M across the act (shot 4 to $25,000 single purchase pop, shot 5 to ~$1.4M), hold afterwards.
Name tags (gold name tile like GM.ntag / PR tag) on first appearance: SEAN, PAUL LESKO (LAWYER), DR MARK LEISER, ZACHARY KAPP, KEVIN PARKER, MRBEAST, LOGAN PAUL, WHATNOT SPOKESPERSON. Dates as date tags. Big numbers as rolling counters. Legal claims shown with an 'ALLEGED' or 'CLAIM' tag; Whatnot replies shown with a 'WHATNOT SAYS' tag.

## Plates (whatnot/production/plates/*.jpg, 2560x1440)
Reused (already there): kitchen_night, courtroom, title, studio, podcast, teen_room, warehouse, premiere, chatshow, partners_room, library, card, shelf, court_ext, bedroom, chart, living_room, office, court, asia_map, westminster, stadium.
New (being painted by other agents in plates_a.js / plates_b.js; check `ls whatnot/production/plates`; read the comment line above each painter for floor y and hotspots; if missing when you start, code against a stand-in (studio/office/card) and switch once it exists): break_studio, card_shop, lambo_showroom, auction_house, wn_hq, law_office, lecture, basement, ga_room, china_studio, creator_room.
For reused plates, find floor y by looking at the image (downscale and Read). Lesson L20: where a plate appears twice in the video (kitchen_night, break_studio, wn_hq, card_shop, courtroom/court, ga_room, lecture, podcast), frame a different area, zoom and light the second time.

## Rules (Pushpam's, all are hard fails; also see /mnt/project-files/system/qa/FEEDBACK-LESSONS.json, read-only)
- Real people stylised, no likeness, no real logos (no Whatnot logo, no NBA/team logos, no card brands); 'WHATNOT' may appear only as plain text in our own font.
- Every VO line has a visible action showing what is said. Nothing static > 2-3 s: camera drift/push on every shot, idle breathing, ambient motion.
- No overlaps; nothing floats (feet on the floor line, seated people on a real chair, held objects in hands); nobody pops in (walk in/out of frame or a camera reveal); complete bodies; varied poses; consistent scale; real-world object sizes vs people (car ~1.2 m tall supercar, door ~2.1 m, phone in hand is small; giant floating phones are clearly UI overlays, not props on the floor).
- Cards/text never over faces and stay above the subtitle band (bottom ~200 px of 1080 reserved).
- SFX on actions (names must exist in shared/sfx; `ls shared/sfx`) and a `bed` ambience per shot. Lots of SFX.
- Rich detail: live props and light (glows, ring-light flicker, LED pulses, chat streams, dust) on top of plates so no frame looks plain.

## Check your work (required)
After building, snapshot frames: `node shared/snap.js whatnot/production/acts/actN/act.html /tmp/claude-0/wnsnapN.jpg t1,t2,...` (2-3 times per shot) and LOOK at the sheet with Read. No [pageerror] lines allowed. Fix every overlap, float, empty frame, text-over-face, clipped text or wrong scale, re-snap, repeat until clean (max 3 rounds). Do not run full renders (CPU is shared, 4 cores, voice synthesis is running); the lead renders.
Report back in under 150 words: acts done, plates used (incl. stand-ins to swap), known weak spots.
