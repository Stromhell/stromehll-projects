# JD plate painting brief ("The YouTuber a Casino Paid to Stop Posting", Stormi 2D house style)

Repo dir: /home/user/repo/2d-history (branch claude/project-thread-3pdro7). DO NOT commit or push; the lead does that. Never delete files. Don't edit shared/ or other files.

## Job
Write plate painters in `jack-doherty/production/plates_a.js` and paint them:
`node shared/p2/paint.js jack-doherty/production/plates_a.js jack-doherty/production/plates name1,name2`
Plates are 2560x1440 JPEGs, painted in code. Copy the helper header from `whatnot/production/plates_a.js` (it already copied the Prime helpers), then `window.PLATES = Object.assign(window.PLATES || {}, { name: (c, r, W, H, P) => {...} })`. Study whatnot/production/plates_a.js + plates_b.js and LOOK at whatnot/production/plates/*.jpg (break_studio, lambo_showroom, card_shop) and prime/production/plates/shopfront.jpg, rain_street.jpg to match the look: painterly, detailed, layered, soft light pools, film grain, rich colour, never flat or blocky.

## Rules
- Empty stage: NO people painted in. Floor line roughly y 1150-1300; middle 1600 px of width free of tall props in front of the floor line.
- Real-world scale: a standing adult on the floor line ~560-640 px tall. Doors ~1.4x that. Shelves ~1.1-1.3x a person.
- No real logos/brand names (no Walmart, no PGA, no McLaren badges). Generic words only (e.g. aisle numbers, SALE, EXIT). British spelling.
- Top of each painter: a comment line with what it is, floor y, hotspots for the animator.
- After painting, view each plate downscaled (`ffmpeg -loglevel error -y -i P.jpg -vf scale=960:-1 /tmp/claude-0/v_P.jpg` then Read) and fix anything plain, blocky or wrong scale. Two rounds max per plate. Paint one or two plates per command (CPU shared with voice synthesis).

## Plates (plates_a.js)
- supermarket_aisle: interior of a giant American big-box supermarket: long aisle in one-point perspective, tall metal shelving both sides packed with colourful boxed goods (varied, detailed), hanging aisle signs with numbers, bright fluorescent ceiling, polished floor with reflections, a trolley parked at the side. Leave the centre floor clear for figures. Floor y ~1250.
- night_highway: wet multi-lane highway near Miami at night in rain: a long metal guardrail running across the front-middle (top of rail ~y 1150, spans full width), palm trees and city glow beyond, streetlights with halos, rain streaks, puddle reflections on the road. The road surface band y ~1180-1440 must be clear for a car drawn live (car ~1.6 m tall = ~260 px). Comment the lane y for the car.
- hospital: hospital A&E bay: a hospital bed on the left third (mattress top y ~1000, give coords) with white sheets, a privacy curtain on a rail, heart monitor on a stand, IV pole, cool blue-green light, a window with night blinds, clear standing area centre-right. Floor y ~1250.
- golf_course: sunny tournament golf hole in the Arizona desert: a tee box/fairway in the front-middle (grass floor y ~1250), a gallery rope on short white stakes across the front, a big packed grandstand of tiny painted spectators in the background (painted crowd is OK, it is far away), cacti and desert hills, blue sky, a leaderboard structure with blank panels (no text). Clear foreground for figures.
