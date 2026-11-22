# RP plate painting brief (Robert Pattinson / James Bond video, Stormi 2D house style)

Repo dir: /home/user/stromehll-projects/2d-history (branch claude/project-thread-8pl3l6). DO NOT commit or push; the lead does that. Never delete files. Don't edit shared/ or another writer's file.

## Job
Write plate painters in YOUR file (given in your task: `pattinson/production/plates_a.js` or `plates_b.js`) and paint them:
`node shared/p2/paint.js pattinson/production/plates_X.js pattinson/production/plates name1,name2`
Plates are 2560x1440 JPEGs, painted in code. Format: copy the helper header (gl, vg, hg, rr, poly, cone, reflect, shadow...) from `prime/production/plates.js` lines 1-116 into your file, then `window.PLATES = Object.assign(window.PLATES || {}, { name: (c, r, W, H, P) => {...} })`. P = P2 engine (P2.RNG, P2.shade, P2.rgb ...; see shared/p2/engine.js + motifs.js + props.js + streets.js etc. and reuse their helpers). Study 2-3 Prime plates (studio, shopfront, podcast, stadium in prime/production/plates.js) and LOOK at prime/production/plates/*.jpg to match the look: painterly, detailed, layered (sky/far/haze/mid/ground/props), soft light pools, film-grain, rich colour, never flat or blocky.

## Rules
- Empty stage: NO people painted in (characters are drawn on top later). Leave a clear floor band where figures stand: floor line roughly y 1150-1300, with the middle 1600 px of width free of tall props in front of the floor line.
- Real-world scale: a standing adult on the floor line will be about 560-640 px tall at the front. Doors ~1.4x that, cars ~1.6 m tall, etc.
- No real logos, brand names, film posters, or recognisable trademarks. No readable real text except generic words (CINEMA, THEATRE, OPEN). British spelling.
- At the top of each painter write a comment line: what it is, floor y, any hotspots the animator needs (e.g. "screen x 900-1660 y 300-720", "window x..").
- After painting, view each plate downscaled (`ffmpeg -loglevel error -y -i P.jpg -vf scale=960:-1 /tmp/claude-0/v_P.jpg` then Read) and fix anything plain, blocky, or wrong scale. Two rounds max per plate.
- Keep CPU modest: paint one or two plates per command.

## Plates
A-set (plates_a.js):
- barnes: leafy London riverside street in Barnes, late afternoon gold; Victorian terraced houses with bay windows, a red pillar box, plane trees, the Thames + a footbridge behind a low wall, ducks area on water. Road surface in the lower third (a car will drive along y ~1250).
- hall: small church-hall amateur theatre: tiny wooden stage with curtains, rows of folding chairs, bunting, a hand-painted backdrop, warm spot pool on stage. Stage floor y ~1180.
- castle: film set of a gothic castle courtyard (Hogwarts-like but generic): stone arches, banners in yellow/black and other house colours (no crests), a camera crane, light stands, cables. Overcast. Floor y ~1260.
- forest: misty Pacific-north-west pine forest, shafts of light, ferns, moss, wet rocks; cool green-blue. Floor y ~1260.
- premiere: night film-premiere red carpet: barriers with crowd area (painted as blurred dark shapes only, no faces), step-and-repeat wall with generic stars pattern, spotlights, flash glows. Carpet floor y ~1240.
- arthouse: small independent cinema interior: red velvet seats (rows rising back), small screen glowing, art-deco wall lamps, a cinema foyer door. Seats front row back at y ~1150 (people will sit there). Also a noticeboard on the left wall x 160-700 y 300-800.
- ny_night: neon New York side street at night after rain: bodegas, fire escapes, steam from a manhole, yellow cab parked at the side, wet reflections. Pavement y ~1250.
- lighthouse: stormy rocky island with a white lighthouse on the right third, crashing waves, dark sky, lamp glow. Ground (rock) y ~1250 on the left 2/3.
- chatshow: TV chat-show set: a sofa (left-centre, seat height ~ y 1000 at s 1.9 figures) and host desk (right), city-night backdrop screen, studio lights, warm floor. Floor y ~1250. Note sofa/desk coords.

B-set (plates_b.js):
- gotham_roof: rainy gothic city rooftop at night: stone parapet, gargoyle on the left, water tower, a searchlight beam in the sky (plain circle, NO bat symbol), wet roof reflections, lightning-lit clouds. Roof floor y ~1250.
- protest_street: rainy city street at night outside a cinema-like building with a blank marquee, wet pavement, street lamps, puddles; no text signs. Pavement y ~1250.
- foyer: bright cinema foyer: popcorn counter, carpet, two large blank poster frames on the back wall (frame A x 500-1000, frame B x 1500-2200, both y 220-900, left empty/dark so we draw posters later), queue barriers. Floor y ~1250.
- greek_hall: ancient Greek palace feasting hall: columns, long low tables, couches, torches and braziers, a loom in the background, warm firelight, painted frieze. Floor y ~1250.
- dunes: desert dunes at dusk, huge sky, distant rock formation, sand haze, two moons faintly. Sand floor y ~1250.
- ice_lab: icy sci-fi colony lab: frosted windows to a blizzard, metal walls, pods, blue light. Floor y ~1250.
- road: two-lane road through English countryside at morning, seen side-on (lanes run left-right across the frame: near lane y ~1300, far lane ~1150), hedges, fields, sky. 
- test_stage: dim London film studio stage for a screen test: one camera on a tripod, a single tall light with soft-box, five plain chairs lined against the back wall, black curtains, a taped X on the floor centre. Floor y ~1250.
- greyoffice: grand old-money executive office (Bond-like but generic): wood panelling, a big desk, green lamp, a globe, London skyline through window (Big Ben shape OK), Persian rug. Floor y ~1250.

## Report
Reply in under 150 words: plates done, floor y and hotspots per plate, anything weak.
