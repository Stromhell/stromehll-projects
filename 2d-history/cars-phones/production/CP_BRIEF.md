# CP (Cars into Phones) build brief

Video: "Why Your New Car Is Basically a Giant Phone (And Why That's Dangerous)" (prefix CP), Stormi Explain Everything, 2D house style, Gumball-style rig characters on painted plates (same pipeline as Prime, prefix PR). UK audience: British spelling on screen.
Repo dir: /home/user/repo/2d-history. Script + shot list: cars-phones/build/data.py (S list; act index = position). Storyboard: cars-phones/storyboard/CP_storyboard.html.
DO NOT commit or push; the lead does that. Never delete files. Do NOT edit shared/ or prime/ or jensen-spy/ files.

Reference implementation to copy patterns from: prime/production/ (ACT_BRIEF.md, plates.js, pr_kit.js, acts/act0..act8/body.js), jensen-spy/production/acts/act0/body.js. Plates are painted with `node shared/p2/paint.js <plates.js> <outdir> name1,name2` (2560x1440 JPEG, P2/M2 helper libs in shared/p2/*.js).

## Story device
- DAVE: ordinary British driver, 30s, everyman (t-shirt/hoodie + jacket), the main character in most shots.
- NODDING DOG: a small brown dashboard dog toy (bobble head on a spring) that NODS at buttons and SHAKES its head at screens. Recurring in every act.
- EYES OFF ROAD meter: small gauge/counter in the top-left showing metres driven without looking; ticks up whenever a screen is touched, resets to 0 at the end.

## Rules (hard fails)
Real people stylised, no likeness, no real logos (brand names as plain text only). Every VO line has a visible action. Nothing static >2-3 s (camera drift, idle breathing, ambient motion: rain, wipers, screen glow, flicker). No overlaps, nothing floats, nobody pops in, complete bodies, consistent scale, real-world object sizes (a car is ~4.5 m long: about 2.6x an adult's height; a steering wheel ~38 cm). Road vehicles in side, front or rear view only (no odd angles). Text never over characters' faces, stays out of the bottom ~200 px (subtitle band). Detailed, painterly, never plain or blocky.

## Act writers (body.js per act)
Write `cars-phones/production/acts/actN/body.js`, build with `bash cars-phones/production/acts/mk.sh N "short title"` -> acts/actN/act.html. Follow prime/production/ACT_BRIEF.md "What you write" + "Pattern to copy" exactly (window.SHOTS one entry per VO paragraph of cars-phones/production/voice/actN.txt, in order; plates via K.load; per-shot plate, cam, bed, light, init with S.D.figs/live/front/over/sfx; ALWAYS anchor actions to words with A.at(S,'word',fallback)). timing.js is an ESTIMATE now; real VO timing replaces it later, shot lengths change +-30%. Read cars-phones/production/acts/actkit_test/body.js to see the CP kit in use.
Kits available: KIT (K), ANIM (A), RIG, TW, XU, JH, PR (pr_kit: counter, bubble, label, tag ...), CP (cp_kit, below). SFX names: see prime/production/ACT_BRIEF.md list.

Plates (cars-phones/production/plates, 2560x1440, floor-line y): motorway (windscreen view; dashboard top edge 1000, draw CP.dashOld/dashTablet over the bottom; vanishing point 1280,600), showroom (floor 1060, turntable centre 1280,1150), airfield (1180, runway), design_studio (1100, centre x 800-1800 clear), kitchen (floor 1250, table top y 1030 x 830-1730), scrapyard (1150, centre x 700-1900 clear), rome_stage (stage 1080, turntable 1280,1110), workshop (1100, centre x 640-1920 clear), gallery (1180; empty frame inner x560-1200 y260-940 for ENZO portrait; plinth x1700-2160 top y 900 for an engine), plus reused Prime plates: rain_street, office, boardroom, stage_blue, newsroom, skyline, chart, title, card, sec_room, podium, factory, shopfront (find floor lines by viewing a downscaled copy).

CP kit API (cp_kit.js): figure s=1 ≈ 380 units tall; car s=1 ≈ 990 long.
Cast (spread ...CP.X()): DAVE(), SALESMAN(), COP(), TESTER({helmet}), ENGINEER(k), EXEC(k), DESIGNER_VW(), DESIGNER_IVE(), ENZO(), OWNER(k) (mood:'angry'), PASSENGER(); fig.hold={near:CP.clipboardHold}.
World props (x,y bottom centre): car(c,x,y,s,{kind:'estate2005'|'tesla_like'|'suv_screen'|'saloon_ev'|'supercar_ev'|'mission_s',col,t,speed,wheelSpin,dir,lights,interior,shadow}); dog(c,x,y,s,t,mode 'nod'|'shake'|'idle',{t0}); seatHeated(c,x,y,s,t,{locked,warm}); mast(c,x,y,s,t,{off}); phoneHolder(c,x,y,s,{phone:true|'map'|'call'}); ruleSign(c,x,y,s,text,{col}).
Top-left anchored: dashOld(c,x,y,w,t,{press,lcd}) h=w*.325; dashTablet(c,x,y,w,t,{page:'home'|'climate'|'menu'|'ad'|'call'|'popup',glow,t0,slide,text,caller}) h=w*.625; dashHyper(c,x,y,w,t) h=w*.1625; popup(c,x,y,w,h,text,t0,t); stockBoard(c,x,y,w,h,t,{drop,pct,label}).
Centre anchored: steering(c,x,y,s,t,{turn}) dia 82s; eyesMeter(c,x,y,s,metres) (screen-space overlay, top-left corner on story shots; values per act: act0 0->120->0 shown from shot 3; act1 hidden except shot 4 at 120; act2 rises 306 then 1400; act3 ~200-500; act4 hidden; act5 last story shot resets to 0); priceTag(c,x,y,s,text,swing); padlock(c,x,y,s,open); invoice(c,x,y,s,text,rot); ticket(c,x,y,s,text,rot); analogDial(c,x,y,r,v,label,{screen}). '|' = line break in text. CP.shadow(c,x,y,w,a).
The NODDING DOG appears whenever Dave is at a dashboard (sits on the dash top), nods at buttons, shakes at screens.
Subject names highlighted on first mention (e.g. ANDREAS MINDT, VW design chief; TESLA MODEL S; VI BILÄGARE). Numbers shown as attributed tags where the VO cites them. Brand names as plain text only, no logos.

## Check your work (required)
After building, snapshot frames from /home/user/repo/2d-history: `node shared/snap.js cars-phones/production/acts/actN/act.html /tmp/claude-0/cpN.jpg t1,t2,...` (2-3 times per shot from timing.js) and LOOK at it with Read. No [pageerror] lines. Fix every overlap, float, pop-in, plain frame, text over faces or in subtitle band, wrong scale. Two fix rounds minimum. Report: per act, shots built, what each shows, remaining weak spots (under 150 words per act).

## v3 update (22 Nov): Tesla crash story added, 8 acts (0-7)
Script v3 in cars-phones/build/data.py: act0 Cold open (NEW: Key Largo 2019 Autopilot crash, verdict, then phone-vs-tablet split + title), act1 tablet (+NEW shot 5: 2021 screen recall), act2 70 mph test (unchanged), act3 Autopilot name problem (NEW), act4 doors (NEW), act5 money (was act3), act6 subscriptions (was act4), act7 fightback (was act5). Extra plates copied from Prime: court_ext, fbi_office, gov_corridor, lineup, us_map, neon_club, tampa_street, podcast.
SENSITIVE: real deaths. No gore, no victims depicted (memorial candle/flowers only), crashes shown from a distance as flashes, debris, blue lights. Lawsuits get a CLAIM tag; the Key Largo verdict gets a "JURY VERDICT (TESLA APPEALING)" tag. Tesla cars drawn as generic white/dark saloons (CP.car kind 'tesla_like'), no logos; brand as text only. Respectful tone in these shots (no jokes on the death beats; nodding dog absent there).
EYES OFF ROAD meter: act3 shows on shot 1-2 (~300), act4 hidden.

## QA + fix rounds (render checkup loop)
Per act N (from /home/user/repo/2d-history):
1. Real timing is already in acts/actN/timing.js (from the real VO). Rebuild page: `bash cars-phones/production/acts/mk.sh N "title"`.
2. Render: `bash shared/render_act.sh cars-phones N 2` then remix `python3 cars-phones/production/remix_cp.py N` (final file acts/actN/actN.mp4; the dry one actN_dry.mp4).
3. QA: `python3 /mnt/project-files/system/qa/qa_auto.py cars-phones/production/acts/actN/actN.mp4 --kind act`, read /mnt/project-files/system/qa/RENDER-QA-CHECKLIST.md, and make a 1 fps contact sheet (`ffmpeg -i actN.mp4 -vf "fps=1,scale=480:270,tile=6x6" /tmp/claude-0/qaN_%02d.jpg`) and LOOK at every sheet. Also zoom into a few full frames (ffmpeg -ss T -frames:v 1).
4. Write findings to cars-phones/production/qa/actN-roundR.md (timestamp, issue, severity high/med/low, cause, fix).
5. Fix every high/medium issue in body.js, re-render, re-check. Repeat until CLEAN (zero high/medium). Max 3 rounds; report what remains.
Common issues already seen: on-screen text cards too small to read (min ~34 px cap height at 1080p for tags, ~60 px for headline cards); shots that hold the same composition > 3 s (add camera push/pan, motion, cutaway insets); tiny characters in wide shots (fill frame better, s ≥ 1.4 for main figures in MED shots); objects clipping out of frame; covers/props with odd scale (e.g. a car cover bigger than the car); z-fighting/shimmer flagged by qa_auto (per-frame random -> seed it).
Never delete files: to replace a render, the scripts already overwrite only act outputs (allowed); keep body.js edits in place (git keeps history).
