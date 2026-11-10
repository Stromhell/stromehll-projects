# JH act authoring brief (for each act writer)

Video: "China's Spy Service and the Most Important Man in AI" (prefix JH), 2D house style, Gumball-like rig characters on painted plates.
Repo dir: /home/user/repo/2d-history (git branch claude/project-thread-mxr012). DO NOT commit or push; the lead does that.
Do NOT edit shared/ files, jh_kit.js, tw_kit.js, xu_kit.js, head.tmpl/foot.tmpl or another writer's acts. Put any act-specific helpers at the top of your own body.js.

## What you write
For each act N assigned to you: `jensen-spy/production/acts/actN/body.js`, built into a page with
`bash jensen-spy/production/acts/mk.sh N "short title"` -> acts/actN/act.html.
- The shot list (VO, visual, on-screen text, animation note) is in `jensen-spy/build/data.py` (S list; act index = position in S, act0 = Cold open, act11 = Ending). The VO text per shot is `jensen-spy/production/voice/actN.txt` (one paragraph per shot). window.SHOTS must have exactly one entry per paragraph, in order (act 0 also gets an end title added by `endTitle(secs)` like the example; only act0 and act11 should use endTitle).
- timing.js in each act dir is an ESTIMATE for now; the real voice timing will replace it later. So ALWAYS anchor actions to words with `A.at(S, 'word', fallbackSeconds)` (first word match after the shot's VO start), never to hard-coded seconds alone. Shot lengths will change by +-30%.

## Pattern to copy
Read `hackers-2/production/acts/act0/body.js` and one more hackers-2 act body (e.g. act3) closely: plates loaded with K.load, per-shot `plate`, `cam` {z,x,y} [from,to] in plate pixel coords (plates are 2560x1440, canvas 1920x1080), `bed` ambience loops, `light`, `init: S => {...}` with S.D.figs (rig figures: x,y feet in plate px, s scale, facing, mood, pose, anim, walk), S.D.live (drawn in world space after plate), S.D.front, S.D.over (screen space overlays: cards, quotes, counters), S.D.sfx [[time|word, name, gain]]. Also skim `hackers-2/production/tw_kit.js` + `xu_kit.js` for helpers (TW.monitor, TW.win, TW.phone, TW.bubble, TW.stamp, TW.chair, TW.glow, K.card, XU.letter, XU.plane, XU.ticker, XU.badge, XU.car/drive, XU.gavel, XU.cellDoor ...). Find how walking/sitting is done in those bodies (walk, VP/TW.chair seat rules: seated figure seat top = floor y-120 at s 1.9) and reuse it.
`jensen-spy/production/jh_kit.js` adds: cast JH.JENSEN (leather jacket), JH.JENSEN_KID, JH.JENSEN_TEEN, JH.ALICE, JH.EXEC(k), JH.WOMAN(k), JH.OFFICIAL(k), JH.PRESIDENT, JH.ROOMMATE, JH.LORI, JH.ENGINEER(k), JH.AGENT(k); props JH.src (source tag 'REPORTED BY THE NEW YORK TIMES'), JH.doc (memo with redaction bar reveal + underline), JH.email (typing email window), JH.quote (quote card), JH.counter, JH.calendar, JH.pin, JH.profile (dossier card, can dissolve), JH.target, JH.chip, JH.lock, JH.brickWall. Read it.

## Plates available (jensen-spy/production/plates/*.jpg, 2560x1440)
neon_club (night club exterior, palms, neon), newsroom, boardroom (night skyline window), stage_blue (big stage + screen), skyline (night city), ky_school (Kentucky red-brick school, autumn), diner_ext (diner at night), booth (diner booth interior; fg_booth.png foreground), dishroom (diner kitchen/dish area; fg_sink.png), lab_wb (lab with whiteboard), serverhall (data hall corridor), office (open-plan office, dark), us_map, asia_map, worldmap (paper maps on wood), chip (green PCB with chip on dark), fbi_office (bright office), court_ext (courthouse exterior with podiums), long_table (gold banquet hall with long white table), fed (neoclassical building by day), bedroom (night bedroom w/ city window), rain_street, sec_room, tampa_street, border.
Being painted now (names fixed, may appear within the hour; check `ls`): taipei_bar (whisky bar interior, Taipei night window), computex_hall (expo hall), white_house_night, ministry (grey Beijing government building), abu_dhabi_flat (luxury flat, night skyline), party_lawn (Florida mansion terrace, string lights, pumpkins), gov_corridor (marble corridor), oval_office. If a plate you need is not there yet, write the code for it anyway and test with a stand-in plate, then switch when it lands.
View any plate with the Read tool on a downscaled copy (ffmpeg -vf scale=960:-1).

## Rules (Pushpam's, all are hard fails)
- Real people stylised, no likeness. Attribute claims on screen with JH.src where the VO says "according to the Times/Journal/FT/reports". Never show the private relationship (no romance imagery, no touching); Alice "never charged" stays neutral.
- Every VO line has a visible action showing what is said. Nothing static > 2-3 s: camera drift/push on every shot, idle breathing, ambient motion (steam, flicker, screen glow, crowd).
- No overlaps (characters never overlap each other or pass through props); nothing floats (feet on the plate's floor line, seated people on a real chair, papers held in hands or resting on a surface); nobody pops in (walk in/out of frame, or a deliberate camera reveal); complete bodies; varied poses; consistent scale; real-world object sizes vs people.
- Cards/text never sit over characters' faces and stay above the subtitle band (bottom ~200 px of 1080 is reserved for subtitles).
- Subject name highlighted when introduced (JENSEN HUANG, ALICE HUANG name tags).
- SFX on actions (names must exist in shared/sfx: alarm arrow birds_loop breath camera_shutter chime city_loop coins coins_cascade creak crowd_cheer crowd_loop door_slam drone drum fire_loop footsteps hit hum_loop night_loop office_loop paper paper_tear phone_ring pop rain_loop riser run_steps scrape stamp swell tension thud tick trading_loop typing whoosh whoosh_soft wind_loop) and a `bed` ambience per shot.
- Rich detail: add live props and light (glows, reflections, steam, crowds) on top of plates so no frame looks plain.

## Check your work (required)
After building, snapshot frames: `node shared/snap.js jensen-spy/production/acts/actN/act.html /tmp/claude-0/snapN.jpg t1,t2,...` (pick 2-3 times per shot from timing.js) and LOOK at the sheet with Read. No [pageerror] lines allowed. Fix every overlap, float, empty frame, text-over-face, clipped text or wrong scale, re-snap, repeat until clean. Do not run full renders (CPU is shared); the lead renders.
Report back briefly: acts done, plates used (incl. any stand-ins to swap), known weak spots.
