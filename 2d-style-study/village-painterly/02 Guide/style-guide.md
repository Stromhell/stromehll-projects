# Village Painterly: character sheet, style guide, animation guide

Status: learning study, waiting for Pushpam's corrections (29 Oct 2026). Not used in any live video yet.
Live page with animated mockups: https://claude.ai/artifact/GgVHB5fmuBYedmezi8CXKC
Code: `03 Mockups/engine.js` (paint + shading), `cast.js` (rig + cast), `scenes.js` (mockups). Renders: `04 Renders/`.

## The look
Disney-style 2D cartoon set in an Indian village (refs 4 to 9). Natural proportions, warm brown skin, big eyes under
thick brows, painted backgrounds. One strong visible light per shot, and the characters are lit by that same light.
Thin warm-brown lines. Quiet, always-alive animation.

## Cast
| Character | Heads | Look |
|---|---|---|
| Raju, boy 10 | 4.5 | curly mop, cream kurta, rolled blue pants, barefoot |
| Arjun, young man 20 | 6.0 | neat hair, white shirt, jeans, satchel |
| Lakshmi, mother 40 | 5.8 | maroon dupatta with gold edge, earrings, bangles |
| Gopal, father 45 | 6.0 | broad, thick moustache, white shirt and mundu |
| Dada, grandfather 75 | 5.7 | stooped, white side hair, beard, round glasses |

Rig rule kept from the house rig: knees bend forward only, elbows back only, every joint is a soft curve.

## Faces
- Three-quarter view by default; far eye narrower, near the profile line.
- Large almond eyes: brown iris, one big highlight + one small bounce highlight, heavy upper lid line with an outer flick.
- Thick tapered brows carry the emotion (worry lifts inner ends, anger drops them, joy squeezes lower lids).
- Prominent rounded nose with a nostril (smaller for women and children). Small mouth, shaded lower lip.
- Blush on cheek and nose; hair casts a soft shadow on the forehead; age lines for elders.

## Shading recipe (every shape)
1. Flat colour. 2. Shadow crescent on the side away from the light. 3. Thin rim on the side facing the light.
4. Thin line, a darker version of the fill (never black). 5. Soft volume gradient + paper grain.
Shadows take the room's colour (blue night, teal hut, warm brown golden hour). Soft terminator on faces, hard on clothes.

## Backgrounds
4 to 6 depth layers with air haze; brush dabs and strokes for texture; the light source in shot or clearly implied,
with god rays and floating dust; dark blurred foreground framing; contact shadows; characters never cross props.

## Colour moods
- Golden hour: #93c2b6 #f2d48c #fffdf2 #d8a548, shadows #7a4a30, rim #ffe6a8
- Moonlit room: #2f4c60 #bfe3f0 #3f7470 #6f93a6, shadows #2f4f6e, accent lamp #ffb35a
- Firelight hut: #2b4d4a, flame #fff0a0 #ffa63a #ff5a1a, shadows #20474c, rim #ffc36b
- Doorway: #1f302f #3a2a20, light #ffaa5a, dupatta #8f2f22, shadows #2a3f3d
- Skin: deep #9a5e3e/#5e3424, mid #b77a50/#7c4631, light #c98f62/#8a553b, rims #e7a575 #f2b783 #f8c896

## Animation
| Motion | Timing | Rule |
|---|---|---|
| Breathing | every 3-5 s | never stops, even in a hold |
| Blink | every 3-4 s, 5 frames | own timer per character |
| Eyes lead | head 6-10 frames later | eyes, then head, then brows |
| Run | 0.9-1.5 cycles/s | bob at double frequency, dust per foot strike |
| Camera | 3-5% push per shot | layers at ~0.05 / 0.3 / 1 / 1.5 x ground speed |
| Ambient | always | smoke, dust, leaves, flicker, birds |
| Follow-through | 2-4 frames behind | dupatta, earrings, hair, paper |

## Do
D1 one visible light, characters lit by it · D2 shadows tinted by the room · D3 rim on the light side · D4 layered painted
backgrounds with haze and dust · D5 something moves every frame · D6 eyes lead · D7 ~4.5 heads kids, ~6 adults ·
D8 knees forward, elbows back, soft curves · D9 contact shadows · D10 cast shadows that tell story.

## Don't
X1 black or thick outlines · X2 grey/flat shading · X3 flat or mismatched-light backgrounds · X4 neon palettes for history ·
X5 frozen holds · X6 backward or sharp-corner joints · X7 floating/sliding/clipping · X8 chibi proportions ·
X9 synced blinks · X10 fast jerky camera.

## Open questions for Pushpam
1. Target = refs 4-9, with 1-3 only for techniques? 2. Fourth 2D style next to Leo / Gumball / Alium?
3. Eye, brow and nose sizes? 4. Thin brown line or nearly lineless? 5. Also test an AI keyframe route (costs credits)?
