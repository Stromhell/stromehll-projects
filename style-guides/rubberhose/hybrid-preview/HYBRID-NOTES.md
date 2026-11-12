# 2D/3D Hybrid Preview: how it's built

A 30 s preview of the "2D cast in 3D sets" explainer look. Everything is code, with no stock assets and no AI images.

## Stack
- **3D sets**: three.js r160 (`three.min.js`, local copy). Uses PCF soft shadows, ACES tone mapping and FogExp2.
- **2D cast**: the rubber-hose kit `../rh.js` draws each character every frame into a CanvasTexture. The texture sits on a flat card ("billboard") that turns to face the camera and gets a soft contact shadow under its feet.
- **Composite**: the WebGL frame is copied to a 2D canvas, which then adds:
  - blur cuts at shot edges;
  - pop-in paper tags pinned to 3D points (projected to the screen);
  - a heavy vignette;
  - film grain.
- **Render**: Playwright → `window.renderAt(t)` → JPEG frames → ffmpeg at 30 fps. Audio comes from a numpy synth (`hsfx.py`).

## Shots (hybrid.html `SHOTS`)
| t | Shot | 3D | 2D |
|---|---|---|---|
| 0–2.6 | Black card "The Man With the Key." | none | handwritten font |
| 2.6–9.6 | Server hallway | 52 racks, instanced blinking LEDs, strip lights, spotlight plus volumetric cone | Pip slides in and reacts |
| 9.6–16.6 | Night office | city window, desk lamp, whiteboard that writes "$17B / YEAR", strikes it out, adds tariff notes | Wendell slides in and points |
| 16.6–22.6 | Brass balance scale | the scale tips toward the GPU ($30,000) against a car | Gus does a take |
| 22.6–27.2 | Stamp desk | export licence, APPROVED then BLOCKED slams, camera shake | cartoon glove on the stamp |
| 27.2–30 | Black card "Pip has no idea." | none | none |

## Rules of the look
- Characters stay 2D. Never model them in 3D. That keeps the hand-drawn charm; the depth comes from the sets.
- Locomotion is a slide with a 2-frame leg wiggle (9 Hz) and a small bounce (`slidePose`).
- Lighting is chiaroscuro: one practical light per set (spotlight, lamp, strip). The rest falls to near black, with a vignette of 0.85.
- Data is diegetic: numbers live on whiteboards, paper, tags and scales, not in floating UI.
- Black handwritten cards come every 30–50 s in a full video.
- Each cut gets a whoosh. Foley: marker squeaks, stamp thuds, metal clank, paper, room tone. Music: a low minor pad with a pulse.

## New shot recipe
1. Make a `THREE.Scene` with one key light, fog and a couple of props.
2. `const card = castCard(scene, 'pip', 1.6)`, then each frame call `card.set(x, z, pose, camera)`.
3. Add the shot to `SHOTS` with its duration, a camera path function and tags.

Voice/narrator not included yet: ElevenLabs is reserved for other uses, so the voice route is still to be decided.
