# G6 act authoring brief (for each act writer)

Video: "GTA 6 Story Explained: Every Chapter, Every Betrayal and All the Endings" (prefix G6), Stormi 2D house style (same engine/look as Prime and Jensen: rig characters on painted plates). UK audience: British spelling on screen.
Repo dir: /home/user/repo/2d-history (git branch claude/project-thread-hwk5es). DO NOT commit or push; the lead does that. Never delete files.
Do NOT edit shared/ files, prime/ files, g6_kit.js, plates.js, head.tmpl/foot.tmpl or another writer's acts. Put act-specific helpers at the top of your own body.js.

## What you write
For each act N assigned to you: `gta6-story/production/acts/actN/body.js`, built into a page with
`bash gta6-story/production/acts/mk.sh N "short title"` -> acts/actN/act.html.
- Shot list (VO, visual, on-screen text, animation note) is in `gta6-story/build/data.py` (S list; act index = position in S: act0 Cold open, act1 Prologue, act2 Ch1 Just Like Paradise, act3 Ch1 The Bag, act4 Ch1 ends / Ch2, act5 Ch3 Money, act6 Ch4 Vice City Baby, act7 Ch4 ends / Ch5 Gallo + Niko, act8 Ch5 the pardon, act9 Endings). The VO per shot is `gta6-story/production/voice/actN.txt` (one paragraph per shot). window.SHOTS must have exactly one entry per paragraph, in order. Only act0 (title beat) and act9 (final 5 s must be a CLEAN frame with no text, for the YouTube end screen) use endTitle(secs) if wanted.
- Timing: if `gta6-story/production/voice/actN/vo-*.wav` exist for every paragraph, run `bash gta6-story/production/prep_act.sh N "title"` (real Whisper word timing -> acts/actN/timing.js). Otherwise make an estimate: `cd gta6-story/production && python3 fake_timing.py N > acts/actN/timing.js` (check the script's output format first). ALWAYS anchor actions to words with `A.at(S, 'word', fallbackSeconds)`, never hard-coded seconds alone: real timing will replace the estimate.

## Pattern to copy
Read `prime/production/ACT_BRIEF.md` (the engine notes), `prime/production/acts/act1/body.js` and one more Prime act body closely: plates loaded with K.load, per-shot `plate`, `cam` {z,x,y} [from,to] in plate pixel coords (plates 2560x1440, canvas 1920x1080), `bed` ambience loops, `light`, `init: S => {...}` with S.D.figs (rig figures: x,y feet in plate px, s scale, facing, mood, pose, anim, walk, hold), S.D.live (world space after plate), S.D.front, S.D.over (screen-space overlays), S.D.sfx [[time|word, name, gain]].
Cast + props: `gta6-story/production/g6_kit.js` (window.G6). Read its header. Cast: JASON, JASON_SHOT, JASON_PRISON, LUCIA, LUCIA_PRISON, LUCIA_GYM, LUCIA_WIG, TOMMY, BRIAN, CAL, DONNY, CAT, MATTIA, PAROLE, COP(k), SERGEANT, MENDEZ, DREQUAN, IKE, RAUL, VALENTINA, KARIM, NICOLE, ABE, KG, NATE, GALLO, NIKO, PROSECUTOR, COUNSELLOR, DEALER, VICKY, GUARD, GUNMAN(k), CREW(k). Spread: {x,y,s,...G6.LUCIA(),pose,mood,walk,hold}. Props: jar, trust, walkAway, statue, drive, ankleTag, shootPrompt, choice, phone, cashBundle, duffel, mask, payphone, monitorPadlock, ticket, laptopProgress, wantedTV, pardonDoc, confessionScroll, packages, net, helicopter, plane, boat, car, policeCar, pickup, motorbike, ambulance; plus PR bubble/counter/tag/briefcase/shadow and TW/K helpers. Known kit gotchas: don't use the `think` pose (broken); props inside a `hold` callback need about s=1.25; a car at s=1 is 560x192 px so scale vehicles up to real size next to people (a saloon is ~2.6x a person's height in length).
Kit test page: gta6-story/production/acts/kit_test/act.html.

## Running devices (keep consistent across acts)
- TRUST board (G6.trust): names ['MATTIA','CAT','VALENTINA','ABE','GALLO'] and xs = how many have betrayed so far; shown small top-right on the beats that mention betrayal (act0 intro full-size; act3 end: 0; act6 last shot: Valentina -> xs advances; act7: Mattia; act8: Gallo; act9 penultimate shot full-size with all X and a gold JASON + LUCIA box if you can).
- WALK AWAY? card (G6.walkAway) stamps #1 in act6 shot 1 (Abe), #2 in act8 shot 4 (prosecutor), #3 in act9 shot 1 (Jason), cracking on Lucia's answer.
- TOMMY savings jar (G6.jar): first coins in act3 shot 2, low in act3 shot 6, full in act5 last shot, shatters/empties in act7 shot 1, refills in act8 shot 1, full on the windowsill in act9 shot 4.

## Plates (gta6-story/production/plates/*.jpg, 2560x1440)
New: keys_road_night, keys_bay_day, stilt_porch, beach_bar, prison_corridor, interview_room, cafe_int, payday_shop, slaughterhouse_dusk, motel_ext, strip_stage, antiques_shop, vault, hotel_balcony, gym, airport_cargo, runway_dusk, boat_cabin, rooftop_bar, coastguard_base, bridge_dusk, visiting_booth, kitchen_window, leonida_map. Reused: bedroom (motel room / Cal's room), boardroom (penthouse / Abe's office), office, chart, card, title, neon_club (Jack of Hearts club front), skyline (Vice City night), rain_street (city bank fronts), serverhall, diner_ext (roadside diner), party_lawn (welcome party), tampa_street (quiet street for ending 1), court_ext, sec_room. Find each plate's floor line by viewing a downscaled copy (ffmpeg -vf scale=960:-1, Read tool). Use a different plate or a clearly different camera for consecutive shots.

## Rules (Pushpam's, all are hard fails)
- Original character designs only, no game art/logos. Violence shown through light, sound and aftermath only, never gore, no visible gunshot wounds; the SHOOT? prompts are just cards, cut away before anything happens.
- Every VO line has a visible action showing what is said. Nothing static > 2-3 s: camera drift/push on every shot, idle breathing, ambient motion (neon flicker, water shimmer, palms, steam, police-light sweeps).
- No overlaps; nothing floats (feet on the plate floor line, seated people on real seats, props held at the wrist or resting on a surface); nobody pops in (walk in/out of frame, or a camera reveal); complete bodies; varied poses; consistent scale; real-world object sizes vs people (cars, boats, planes, helicopters are BIG next to people). Road vehicles shown side-on driving, or front/rear view, wheels turning.
- Cards/text never over characters' faces or bodies and stay above the bottom ~200 px of 1080. Subject names highlighted on first appearance (name tag card).
- Lots of SFX on actions (names must exist in shared/sfx; list them with ls) and a `bed` ambience per shot.
- Rich detail: add live props and light on top of plates so no frame looks plain.

## Check your work (required)
After building, snapshot frames: `node shared/snap.js gta6-story/production/acts/actN/act.html /tmp/claude-0/-home-user/d00c403b-8070-5167-b171-c1550bf31c6c/scratchpad/g6snapN.jpg t1,t2,...` (2-3 times per shot from timing.js) and LOOK at the sheet with Read. No [pageerror] lines allowed. Fix every overlap, float, empty frame, text-over-face, clipped text or wrong scale, re-snap, repeat until clean. Do not run full renders (CPU is shared); the lead renders.
Report back briefly: acts done, timing real or estimated, known weak spots.
