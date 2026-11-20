# PR act authoring brief (for each act writer)

Video: "What Really Happened to Prime? Logan Paul, KSI and the $1 Billion Drink" (prefix PR), 2D house style, Gumball-style rig characters on painted plates. UK audience: British spelling on screen.
Repo dir: /home/user/repo/2d-history (git branch claude/project-thread-888nhe). DO NOT commit or push; the lead does that. Never delete files.
Do NOT edit shared/ files, the kits (pr_kit.js, jh_kit.js, tw_kit.js, xu_kit.js), plates.js, head.tmpl/foot.tmpl or another writer's acts. Put act-specific helpers at the top of your own body.js.

## What you write
For each act N assigned to you: `prime/production/acts/actN/body.js`, built into a page with
`bash prime/production/acts/mk.sh N "short title"` -> acts/actN/act.html.
- The shot list (VO, visual, on-screen text, animation note) is in `prime/build/data.py` (S list; act index = position in S: act0 Cold open ... act8 Ending). The VO per shot is `prime/production/voice/actN.txt` (one paragraph per shot). window.SHOTS must have exactly one entry per paragraph, in order. Only act0 and act8 use endTitle(secs) (act0 for the title card beat if wanted; act8 for the end card).
- timing.js in each act dir may be an ESTIMATE; real voice timing replaces it later. ALWAYS anchor actions to words with `A.at(S, 'word', fallbackSeconds)`, never hard-coded seconds alone. Shot lengths will change by +-30%.

## Pattern to copy
Read `jensen-spy/production/acts/act0/body.js` and one more Jensen act body (e.g. act5) closely: plates loaded with K.load, per-shot `plate`, `cam` {z,x,y} [from,to] in plate pixel coords (plates 2560x1440, canvas 1920x1080), `bed` ambience loops, `light`, `init: S => {...}` with S.D.figs (rig figures: x,y feet in plate px, s scale, facing, mood, pose, anim, walk), S.D.live (world space after plate), S.D.front, S.D.over (screen-space overlays: cards, quotes, counters), S.D.sfx [[time|word, name, gain]]. Skim tw_kit.js / xu_kit.js / jh_kit.js helpers (TW.monitor, TW.phone, TW.bubble, TW.stamp, TW.chair, K.card, XU.gavel, JH.src, JH.quote, JH.counter, JH.calendar ...).
`prime/production/pr_kit.js` (window.PR) adds the cast and props. Read it. Cast spread into a figure: {x,y,s,...PR.KSI()}: LOGAN({blue}), LOGAN_BOX, KSI, KSI_BOX, HOST(k 0..2), SENATOR, FOOTBALLER, BOXER2, KID(k 0..5), SHOPPER(k 0..5), DIRECTOR(k 0..3), STREAMER(k 0..1). Props: bottle/can(c,x,y,s,{col,glow,rot}), hype(c,x,y,s,v), tag(c,x,y,s,kind,t0,t) kinds claim|court|settled|dismissed, counter(c,x,y,s,from,to,t0,t1,t,{pre,suf,dec}), label(c,x,y,s,lines,hi), priceTag, reduced(c,x,y,s,t0,t), meter(c,x,y,s,v,label), coffee, trophy, folders(c,x,y,s,n,t0,t), conveyor(c,x,y,w,s,t,{empty}), briefcase, bubble(c,x,y,s,text,{thought,tail}), phonePost, cola, shadow. Gotchas: most props take x,y as bottom centre; hype/tag/counter/bubble use centre. Use the figure's s for props (bottle at s 1.9 = forearm length). Kids draw at 0.8x. Test sheet: prime/production/acts/kit_test/act.html.
Running device: the HYPE METER (PR.hype) sits small in the top-left corner on story shots (not on title/cards), value per act: act0 swings 1->0, act1 rises .5->1, act2 1, act3 .8->.6, act4 .55->.4, act5 .4->.25, act6 .25->0, act7 0, act8 .1. Every lawsuit shot stamps PR.tag with the kind the on-screen text says.

## Plates available (prime/production/plates/*.jpg, 2560x1440)
New Prime plates (being painted now; check `ls prime/production/plates`; if missing, code against it anyway and test with a stand-in, then switch): studio (Sydney radio studio, harbour window), ring (boxing arena), shopfront (British supermarket exterior, dawn drizzle), playground (British school), shelf (supermarket drinks aisle), podcast (podcast studio), podium (Washington press podium), factory (bottling line), lineup (police line-up wall), stadium (football pitch-side night, blank LED board), title, card, chart. Reusable: boardroom, court_ext, office, bedroom (good for streamer room), lab_wb, newsroom, us_map, worldmap, stage_blue, skyline, fed and more (ls). Find each plate's floor line by viewing a downscaled copy (ffmpeg -vf scale=960:-1, Read tool).

## Rules (Pushpam's, all are hard fails)
- Real people stylised, no likeness, no real logos. Attribute reported numbers with JH.src-style tags where the VO says 'Bloomberg reported' etc. Lawsuits are claims unless a court ruled: tag them. Keep it fair and funny, never mocking looks.
- Every VO line has a visible action showing what is said. Nothing static > 2-3 s: camera drift/push on every shot, idle breathing, ambient motion (steam, flicker, screen glow, crowd).
- No overlaps (characters never overlap each other or pass through props); nothing floats (feet on the plate's floor line, seated people on a real chair, papers held in hands or resting on a surface); nobody pops in (walk in/out of frame, or a deliberate camera reveal); complete bodies; varied poses; consistent scale; real-world object sizes vs people.
- Cards/text never sit over characters' faces and stay above the subtitle band (bottom ~200 px of 1080 is reserved for subtitles).
- Subject names highlighted when introduced (LOGAN PAUL, KSI name tags; others on first appearance).
- SFX on actions (names must exist in shared/sfx: alarm arrow birds_loop breath camera_shutter chime city_loop coins coins_cascade creak crowd_cheer crowd_loop door_slam drone drum fire_loop footsteps hit hum_loop night_loop office_loop paper paper_tear phone_ring pop rain_loop riser run_steps scrape stamp swell tension thud tick trading_loop typing whoosh whoosh_soft wind_loop) and a `bed` ambience per shot.
- Rich detail: add live props and light (glows, reflections, steam, crowds) on top of plates so no frame looks plain.

## Check your work (required)
After building, snapshot frames: `node shared/snap.js prime/production/acts/actN/act.html /tmp/claude-0/snapN.jpg t1,t2,...` (pick 2-3 times per shot from timing.js) and LOOK at the sheet with Read. No [pageerror] lines allowed. Fix every overlap, float, empty frame, text-over-face, clipped text or wrong scale, re-snap, repeat until clean. Do not run full renders (CPU is shared); the lead renders.
Report back briefly: acts done, plates used (incl. any stand-ins to swap), known weak spots.
