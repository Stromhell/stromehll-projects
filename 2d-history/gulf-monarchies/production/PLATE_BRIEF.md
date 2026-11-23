# GM plate painting brief ("Why Gulf Kings Never Fall", Stormi 2D house style)

Repo dir: /home/user/stromehll-projects/2d-history (branch claude/project-thread-io2ggm). DO NOT commit or push; the lead does that. Never delete files. Don't edit shared/ or another writer's file.

## Job
Write plate painters in YOUR file (given in your task: `gulf-monarchies/production/plates_a.js` or `plates_b.js`) and paint them:
`node shared/p2/paint.js gulf-monarchies/production/plates_X.js gulf-monarchies/production/plates name1,name2`
Plates are 2560x1440 JPEGs, painted in code. Format: copy the helper header (gl, vg, hg, rr, poly, cone, reflect, shadow...) from `prime/production/plates.js` lines 1-116 into your file, then `window.PLATES = Object.assign(window.PLATES || {}, { name: (c, r, W, H, P) => {...} })`. P = P2 engine (P2.RNG, P2.shade, P2.rgb ...; see shared/p2/engine.js + motifs.js + props.js + streets.js etc. and reuse their helpers). Study 2-3 Prime plates (studio, shopfront, podcast, stadium in prime/production/plates.js) and LOOK at prime/production/plates/*.jpg to match the look: painterly, detailed, layered (sky/far/haze/mid/ground/props), soft light pools, film-grain, rich colour, never flat or blocky.

## Rules
- Empty stage: NO people painted in (characters are drawn on top later). Leave a clear floor band where figures stand: floor line roughly y 1150-1300, with the middle 1600 px of width free of tall props in front of the floor line.
- Real-world scale: a standing adult on the floor line will be about 560-640 px tall at the front. Doors ~1.4x that, cars ~1.6 m tall, etc.
- No real logos, brand names, national emblems/coats of arms or recognisable trademarks; flags only as plain colour fields (no emblems, no text). Religious sites: generic, respectful, no real likeness. Maps: stylised, coastlines only, NO drawn borders that could be disputed (country areas as soft colour washes are fine). No readable real text except generic words (CINEMA, THEATRE, OPEN). British spelling.
- At the top of each painter write a comment line: what it is, floor y, any hotspots the animator needs (e.g. "screen x 900-1660 y 300-720", "window x..").
- After painting, view each plate downscaled (`ffmpeg -loglevel error -y -i P.jpg -vf scale=960:-1 /tmp/claude-0/v_P.jpg` then Read) and fix anything plain, blocky, or wrong scale. Two rounds max per plate.
- Keep CPU modest: paint one or two plates per command.

## Plates
A-set (plates_a.js):
- gulf_night: modern Gulf city skyline at night seen from a residential rooftop/balcony terrace: glittering towers (generic, no Burj likeness), a sea bay with lights, palm trees, a balcony railing at the front edge; sky dark blue with haze (interceptor streaks are drawn live later, leave sky clear). Floor (terrace) y ~1250.
- palace_terrace: grand white marble palace terrace at golden hour: arches, carved screens (mashrabiya), fountains, palm trees, sea behind. Floor y ~1250.
- map: stylised parchment-and-ink map of the Middle East and North Africa (Egypt, Libya, Arabian Peninsula, Iraq, Iran, Gulf). Land soft sand colour, sea teal, coastlines inked, NO borders and NO text (labels drawn live). In the top comment, give approximate pixel centres for: Egypt, Libya, Iraq, Iran, Yemen, Oman (Dhofar in its south-west), Saudi Arabia, Kuwait, Bahrain, Qatar, UAE, Tunisia, Mecca, the Strait of Hormuz.
- pearl_coast: early-1800s Gulf coast: turquoise shallows, wooden dhows with lateen sails, mud-brick houses and a wind tower, palm fronds, a wooden jetty at the front, bright hot sun haze. Floor (beach/jetty) y ~1260.
- fort_town: mud-brick fort courtyard of a small 1800s-1960s Gulf town: crenellated walls, a watchtower, carved wooden door, palm, a few clay pots. Floor y ~1250.
- treaty_tent: beach with a large open canvas tent (shade) and a small table with two cushioned stools inside at centre (seat height for seated figures; give coords), a British sailing warship offshore, rowing boat on sand. Floor y ~1250.
- oil_field: desert oil field: derricks, a nodding pump jack, pipelines, storage tanks, tanker ships far off on the sea, sunset sky. Floor y ~1260.
- palace_hall: 1950s royal throne room (Cairo-like but generic): gilded throne on a low dais centre, red carpet, chandeliers, tall windows. Floor y ~1250. Give throne coords.
- baghdad: dusk riverside palace in 1958 Baghdad-like city: domed palace with arched colonnade, date palms, a wide road in front (tanks will roll along y ~1250), river glint. 
- desert_border: flat desert border region with a distant road, a striped barrier post, sand haze, rocky outcrops; daylight. Floor y ~1260.
- london_office: 1960s Downing Street-style study (generic): wood panelling, desk with green-shaded lamp and papers centre (give desk top y and chair position for a seated figure behind it), bookshelves, tall sash window with grey London sky. Floor y ~1250.
- old_palace: dim 1960s Omani-style palace room: thick white walls, small high windows with bars throwing light shafts, a low cushioned seat on the left (coords), a heavy wooden chest, oil lamp. Floor y ~1250.
- palace_night: night courtyard of a seaside Omani-style palace (Salalah-like, generic): white walls, arched gate, torches, palms, the sea and a small airstrip light far right. Floor y ~1250.
- majlis: rich Gulf majlis / council room: long carpet, low cushioned seating along the walls, a long low table centre, brass coffee pots (dallah), ornate ceiling lamps. Floor y ~1250. Give seat coords.

B-set (plates_b.js):
- dhofar: green monsoon-season mountains of southern Oman: misty hills, frankincense trees, a small village with a new white clinic and school building, a dirt road. Floor y ~1260.
- ministry: modern Gulf government office counter hall: marble floor, long service counter with numbered windows (centre front), ceiling lights, potted palms, a big blank wall area for charts (x 1500-2300, y 250-750). Floor y ~1250.
- construction: huge Gulf construction site: half-built tower with cranes, scaffolding, steel beams, a bus parked at the side, dust haze, harsh sun. Floor y ~1260.
- labour_camp: workers' accommodation courtyard: rows of plain blocks, washing lines, a water cooler, a small office booth with a desk (front right, desk top coords), sunset. Floor y ~1250.
- tehran: 1979 Tehran-like street: wide avenue, apartment blocks, a mountain range behind (Alborz-like), plane trees, a blank billboard frame. Floor y ~1260.
- mosque_dawn: distant view of a vast generic marble mosque courtyard with minarets at dawn, seen from far away over rooftops; respectful, no real likeness, no people; soft dawn sky (smoke will be added live). Floor y ~1300.
- summit: modern summit hall: round table centre with six chairs (give coords), six plain coloured flags on poles without emblems, chandelier, a blank wall screen. Floor y ~1250.
- kuwait_night: 1990 Kuwait City-like night skyline with a pair of water-tower style towers (generic spheres on spires), a wide desert highway in the foreground (vehicles will drive along y ~1280), sodium lights.
- airbase: desert air base at noon: runway, a hangar, a parked grey cargo jet (side view), control tower, heat shimmer. Floor (apron) y ~1260.
- pearl_square: Manama-like roundabout plaza: a tall white monument of six curved arches holding a large pearl on top (centre-right, give coords of the pearl), surrounding road, low buildings, palms; daytime. Floor y ~1260.
- causeway: long sea causeway bridge over the Gulf seen side-on, road deck at y ~1150, sea below, a border-post building at the left end. 
- hotel_lobby: luxury hotel lobby: marble, huge chandeliers, gold columns, a grand staircase, potted palms; leave floor clear (camp beds drawn live). Floor y ~1260.
- parliament: semicircular parliament chamber with tiered seats, speaker's chair centre-back, wood and green leather, lit; doors at the right. Floor y ~1260.
- vault: futuristic sovereign wealth vault: polished steel, glowing stacks of gold bars on shelves (left and right), a central floor clear, cool blue light. Floor y ~1250.

## Report

Reply in under 150 words: plates done, floor y and hotspots per plate, anything weak.
