# GM act authoring brief (for each act writer)

Video: "Why Gulf Kings Never Fall" (prefix GM): 2026 Iran war strikes on six Gulf kingdoms, yet no crown fell -> pearl coast + British protection -> kings fall all around (1952-1969) -> Oman's son ousts father -> the oil deal + foreign workers -> 1979 Mecca siege, GCC, 1990 Kuwait invasion, US bases -> Arab Spring (cash + Bahrain crackdown) -> one-man rule, Kuwait parliament shut, 2026 war, oil running out. Stormi 2D house style: Gumball-style rig characters on painted plates, same engine as the Prime and Pattinson videos. UK audience: British spelling on screen.
Repo dir: /home/user/repo/2d-history (alias /home/user/stromehll-projects/2d-history, branch claude/project-thread-io2ggm). DO NOT commit or push; the lead does that. Never delete files.
Do NOT edit shared/ files, the kits (pr_kit.js, jh_kit.js, tw_kit.js, xu_kit.js, gm_kit.js), plates*.js, head.tmpl/foot.tmpl or another writer's acts. Put act-specific helpers at the top of your own body.js.

## What you write
For each act N assigned to you: `gulf-monarchies/production/acts/actN/body.js`, built into a page with
`bash gulf-monarchies/production/acts/mk.sh N "short title"` -> acts/actN/act.html.
- Shot list (VO, visual, on-screen text, animation note) is in `gulf-monarchies/build/data.py` (S list; act index = position in S). The VO per shot is `gulf-monarchies/production/voice/actN.txt` (one paragraph per shot). window.SHOTS must have exactly one entry per paragraph, in order. Only act7 calls endTitle(5) (a clean 5 s end card with NO VO, no subtitles, nothing moving fast: subscribe card for "Stormi Explain Everything"; check how pattinson act9 does it). act0's TITLE shot is a normal shot (its VO line plays over the title).
- timing.js: if `acts/actN/timing.js` is missing, make an estimate: `cd gulf-monarchies/production && python3 fake_timing.py N`. Real voice timing replaces it later, so ALWAYS anchor actions to words with `A.at(S, 'word', fallbackSeconds)` (word exactly as in the VO text incl. trailing punctuation if the word ends a sentence, e.g. 'gone.'), never hard-coded seconds alone. Shot lengths will change by +-30%. NOTE: the voice reads respelled names (Ka-boose for Qaboos etc.) but timing words come back from Whisper; if unsure, anchor to a plain neighbouring English word.

## Pattern to copy
Read `pattinson/production/ACT_BRIEF.md` (engine notes), then `pattinson/production/acts/act0/body.js`, `act4/body.js` and `act9/body.js` closely (and prime/production/ACT_BRIEF.md if needed): plates loaded with K.load, per-shot `plate`, `cam` {z,x,y} [from,to] in plate px (plates 2560x1440, canvas 1920x1080), `bed` ambience loops, `light`, `init: S => {...}` with S.D.figs (rig figures: x,y feet in plate px, s scale, facing, mood, pose, anim, walk), S.D.live (world space after plate), S.D.front, S.D.over (screen-space overlays: cards, counters), S.D.sfx [[time|word, name, gain]]. Helpers in tw_kit.js / xu_kit.js / jh_kit.js / pr_kit.js.
`gulf-monarchies/production/gm_kit.js` (window.GM): cast + props. READ ITS HEADER COMMENT. Test sheet: gulf-monarchies/production/acts/kit_test/act.html.
Running devices:
(1) the CROWNS STANDING tracker GM.crowns in the top-left corner (screen x ~200, y ~95, s .8) on story shots (not title/card/map shots, where it may sit larger in the map instead). Six crowns SA KW BH QA AE OM. States per act: act0 all wobble hard on shot 1 then settle upright on shot 2 'dropped.'; act1-2 upright with small wobbles on threat lines ('bodyguard', 'leaves', 'Britain will pull'); act3 OM wobbles on the coup then settles; act4 calm; act5 KW tips over (2) on 'nineteenth province' and springs back on 'back on the throne'; act6 BH wobbles hard on the Pearl Roundabout shots then settles; act7 all wobble on the 2026 line and hold; final shot gentle wobble. Ease every change.
(2) A PEARL (GM.pearl) appears in every act somewhere natural (diver's palm, market bowl, a desk paperweight, the Pearl Roundabout monument, a boss's desk, the vault) and returns in the last shot beside an almost empty oil barrel.
Name tags: highlight names when first introduced with the gold name tile (GM.ntag or PR tag): AL KHALIFA, AL SABAH, ABDUL KARIM QASIM, KING FAISAL II, HAROLD WILSON, GADDAFI (just a tag over a silhouette), SAID BIN TAIMUR, QABOOS, SHEIKH KHALIFA, SADDAM HUSSEIN (tag over a silhouette/stylised figure, no likeness), MOHAMMED BIN SALMAN, etc. Dates as date tags (e.g. 14 JULY 1958). Big numbers as rolling counters.
Sources: for 2026 lines show a small source tag (e.g. 'SOURCE: AL JAZEERA, 18 NOV 2026'); for the IMF line 'SOURCE: IMF, 2020'.

## Plates (gulf-monarchies/production/plates/*.jpg, 2560x1440)
Reused already there: card (dark plain), title (starry gradient), chart, office, boardroom, skyline, newsroom, stage_blue.
New (being painted now by other agents in plates_a.js / plates_b.js; check `ls gulf-monarchies/production/plates`; read the comment line above each painter for floor y and hotspots; if missing when you start, code against it anyway with a stand-in plate (card/office/skyline) and switch once it exists):
A: gulf_night, palace_terrace, map, pearl_coast, fort_town, treaty_tent, oil_field, palace_hall, baghdad, desert_border, london_office, old_palace, palace_night, majlis.
B: dhow_deck (pearl dhow deck), royal_court (modern Saudi royal court hall), dhofar, ministry, construction, labour_camp, tehran, mosque_dawn, summit, kuwait_night, airbase, pearl_square, causeway, hotel_lobby, parliament, vault.
The sketch spec in data.py names the plate per shot (bg:...). Use those. Lesson L20: no background may look reused; where a plate appears twice (ministry, majlis, oil_field, desert_border, map, fort_town, treaty_tent, pearl_coast), frame a different area, different zoom and light (e.g. dusk tint) the second time. The gulf_night repeat in act7 and pearl_coast in the last shot are deliberate callbacks.

## Rules (Pushpam's, all are hard fails; also see /mnt/project-files/system/qa/FEEDBACK-LESSONS.json)
- Real people stylised, no likeness, no real logos, no national emblems, flags as plain colour only. Religious site (Grand Mosque, act5) shown only from far away, respectful, smoke and a news ticker, no violence on screen. No gore anywhere; deaths are told, not shown.
- Maps: coastline map plate only, labels drawn live, NO drawn borders.
- Every VO line has a visible action showing what is said. Nothing static > 2-3 s: camera drift/push on every shot, idle breathing, ambient motion (heat shimmer, waves, dust, flicker, crowd motion).
- No overlaps; nothing floats (feet on the plate floor line, seated people on a real chair/cushion, held objects in hands); nobody pops in (walk in/out of frame, or a deliberate camera reveal); complete bodies; varied poses; consistent scale; real-world object sizes vs people (a tank is ~2.4 m tall, a car 1.5 m, a door ~2.1 m). Road vehicles in side view must have turning wheels.
- Cards/text never over faces and stay above the subtitle band (bottom ~200 px of 1080 reserved).
- SFX on actions (names must exist in shared/sfx; check `ls shared/sfx`) and a `bed` ambience per shot. Lots of SFX.
- Rich detail: live props and light (glows, reflections, heat haze, dust, crowds) on top of plates so no frame looks plain.

## Check your work (required)
After building, snapshot frames: `node shared/snap.js gulf-monarchies/production/acts/actN/act.html /tmp/claude-0/gmsnapN.jpg t1,t2,...` (2-3 times per shot from timing.js) and LOOK at the sheet with Read. No [pageerror] lines allowed. Fix every overlap, float, empty frame, text-over-face, clipped text or wrong scale, re-snap, repeat until clean (max 3 rounds). Do not run full renders (CPU is shared, 4 cores); the lead renders.
Report back in under 150 words: acts done, plates used (incl. stand-ins to swap), known weak spots.
