# WN plate painting brief ("The $20 Billion App Accused of Being a Casino", Stormi 2D house style)

Repo dir: /home/user/stromehll-projects/2d-history (branch claude/project-thread-d5sjha). DO NOT commit or push; the lead does that. Never delete files. Don't edit shared/ or another writer's file.

## Job
Write plate painters in YOUR file (given in your task: `whatnot/production/plates_a.js` or `plates_b.js`) and paint them:
`node shared/p2/paint.js whatnot/production/plates_X.js whatnot/production/plates name1,name2`
Plates are 2560x1440 JPEGs, painted in code. Format: copy the helper header (gl, vg, hg, rr, poly, cone, reflect, shadow...) from `prime/production/plates.js` lines 1-116 into your file, then `window.PLATES = Object.assign(window.PLATES || {}, { name: (c, r, W, H, P) => {...} })`. P = P2 engine (P2.RNG, P2.shade, P2.rgb ...; see shared/p2/engine.js + motifs.js + props.js + streets.js etc. and reuse their helpers). Study 2-3 Prime plates (studio, shopfront, podcast, stadium in prime/production/plates.js) and LOOK at prime/production/plates/*.jpg to match the look: painterly, detailed, layered (sky/far/haze/mid/ground/props), soft light pools, film-grain, rich colour, never flat or blocky.

## Rules
- Empty stage: NO people painted in (characters are drawn on top later). Leave a clear floor band where figures stand: floor line roughly y 1150-1300, with the middle 1600 px of width free of tall props in front of the floor line.
- Real-world scale: a standing adult on the floor line will be about 560-640 px tall at the front. Doors ~1.4x that, cars ~1.6 m tall, etc.
- No real logos, brand names, national emblems/coats of arms or recognisable trademarks; flags only as plain colour fields (no emblems, no text). No Whatnot logo, no NBA/sports team logos, no real card brands; trading cards are generic (coloured borders, abstract player silhouettes or stars). No readable real text except generic words (CINEMA, THEATRE, OPEN). British spelling.
- At the top of each painter write a comment line: what it is, floor y, any hotspots the animator needs (e.g. "screen x 900-1660 y 300-720", "window x..").
- After painting, view each plate downscaled (`ffmpeg -loglevel error -y -i P.jpg -vf scale=960:-1 /tmp/claude-0/v_P.jpg` then Read) and fix anything plain, blocky, or wrong scale. Two rounds max per plate.
- Keep CPU modest: paint one or two plates per command.

## Plates
A-set (plates_a.js):
- break_studio: a livestream trading-card "box break" studio at night: a wide desk centre-front (desk top y ~1060, desk spans x 700-1860; a host will sit BEHIND it, so leave the area above the desk clear from x 900-1660), shelves of colourful sealed card boxes on the back wall, two ring lights on stands, a camera on a tripod at the side, LED strip glow (purple/teal), stacks of card sleeves and a toploader rack on the desk ends, a small monitor showing a blank chat. Floor y ~1250.
- card_shop: cosy local trading-card shop in warm light: glass display counters with cards under glass (front left), wall of card binders and graded slabs, posters (generic, no text), a till, a "WANTED" corkboard area on the right wall left BLANK at x 1700-2100 y 380-760 for a poster drawn live. Floor y ~1250.
- lambo_showroom: glossy supercar showroom: polished floor with reflections, a round turntable platform centre (centre x 1280, top y ~1180, radius ~620) with NO car (car drawn live), big glass windows with a night city, spotlights from the ceiling. Floor y ~1240.
- auction_house: classic auction room: wooden rostrum on the right (auctioneer stands behind, rostrum top y ~1020, x 1750-2150), rows of chairs seen from behind at the front bottom, a big blank screen on the back wall (x 700-1500, y 260-700) for numbers drawn live, chandeliers, red walls with gilded frames (abstract paintings). Floor y ~1250.
- wn_hq: bright modern tech-company atrium: glass, white and mint-green, tall plants, mezzanine walkways, a giant blank LED wall centre (x 760-1800, y 200-720) for live numbers, a low podium area at centre-front, abstract shopping-bag/heart shapes on the wall (no logos). Floor y ~1250.
- law_office: US lawyer's office: dark wood desk centre (desk top y ~1050, chair behind for a seated figure, give coords), bookshelves of law books, framed certificates (no text), window with sunny city view, a green banker's lamp, stacks of files. Floor y ~1250.
B-set (plates_b.js):
- lecture: university lecture room / studio: a big whiteboard on the back wall (x 300-1500, y 260-820, mostly blank with faint marker smudges) and a large blank screen on the right (x 1650-2350, y 280-760), wooden lectern, tiered seating edges at the sides, warm daylight. Floor y ~1250.
- basement: dim suburban basement: concrete floor, a single bare bulb hanging centre (bulb at x 1280 y 300), towers of cardboard boxes and plastic tubs of trading cards stacked along both walls (many, varied), a water heater, small high window with blue night light, an old sofa on the right. Floor y ~1250.
- ga_room: support-group room in a community hall: a circle of plastic chairs (seen at 3/4 view, the chairs at the back of the circle and sides; leave the centre-front open; give seat coords for 5 chairs, seat height), a tea urn on a trestle table, noticeboard (no text), tall windows with soft morning light, wooden floor. Floor y ~1250.
- china_studio: a bright Chinese live-commerce (e-commerce livestream) studio: ring lights, a long product table centre (top y ~1060), racks of colourful products (clothes, gadgets, snack boxes), several monitors on stands, a big LED wall with abstract shapes, plants; NO real characters/logos (abstract glyph shapes only, use the glyph helper if you copy it from gulf plates). Leave a blank board at x 1900-2300 y 380-760 for odds drawn live. Floor y ~1250.
- creator_room: a YouTuber's bedroom studio: big LED-lit shelf wall with figurines, a gaming chair and desk with two monitors (left side), a camera on a tripod and a ring light, acoustic foam panels, a neon squiggle (no text), clear standing area centre. Floor y ~1250.
