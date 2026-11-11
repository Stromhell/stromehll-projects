# DumDown character style rules

Rules for Claude Code (or anyone) making DumDown characters, scenes and animation with `dumdown-kit.js`.
The live, visual version of this guide is the "DumDown Character Bible" page.

## The look in one line
TV-anime character design: bold warm ink lines, two-tone cel shading, big expressive eyes,
oversized hands and chunky shoes, spiky "lock" hair. Original characters only. Never copy an
existing anime character's design, name, costume or colour scheme.

## Hard rules (do not change these in code)
1. **Line**: ink colour `#231A24`, never pure black. Outer contours 2.2–2.8 units, inner details 0.8–1.6.
2. **Shading**: exactly two tones per material (base + one hard shadow) via `cel()`. Light from top-left,
   shadow bottom-right. Shadows are cool (use `shade()`), never grey. No gradients on characters.
3. **Proportions**: about 6 heads tall. `DEFAULT_BODY` is the source of truth. Hands are 1.3× life size.
   Shoes are chunky. Do not "fix" these toward realism.
4. **Eyes**: tall eyes, thick upper lash with outer flick, two-tone iris, pupil, two highlights.
   The house signature is the half-lidded `deadpan` expression.
5. **Hair**: built from tapered locks on a head sphere. One accent streak or one ahoge per character, max.
6. **Colour**: three outfit colours + neutrals per character. Pick from `PALETTES`.
7. **Silhouette test**: a character must read as a black silhouette at thumbnail size.

## Cast
| Key | Role | Default face |
|---|---|---|
| `dum` | Deadpan narrator in an orange play-button hoodie | `deadpan` |
| `down` | Hyper co-host, teal jacket, long blonde hair, fingerless gloves | `excited` |

New characters: `generateCharacter('seed')`, then edit the returned spec. Keep the seed in the script.

## Views, poses, expressions
- Views: `front`, `threequarter`, `side`, `back`, `threequarterback`. Mirror with `dir: -1`.
- Poses (`POSES`): stand, standSide, wave, point, shrug, think, fistPump, hips, peace, thumbsUp.
- Hands (`HAND_POSES`): relaxed, open, fist, point, peace, thumbsup, grab.
- Expressions (`EXPRESSIONS`): neutral, deadpan, smile, happy, smug, excited, angry, shock, nervous,
  sad, blank, talk, blink. Override parts with `{ base, eye, brow, mouth, fx, blush }`.
- Comedy marks (`fx`): `sweat`, `vein`, `gloom`, `sparkle`.

## Rig and joints
- Bone tree: pelvis → spine/chest → neck → head; chest → shoulder → elbow → wrist → hand; pelvis → hip → knee → ankle → foot.
- Angles in degrees. 0° = bone points down; positive swings the far end to the viewer's right. Children are relative to parents.
- Knee value bends the shin backward (keep 0–130). Elbows: keep within ±150.
- Use `drawSkeleton()` on top of a pose to check it.

## Animation
- Animate **on twos** (`onTwos(t)`): 12 drawings/sec at 24fps. Use smooth timing only for camera moves.
- Loops: `ANIMS.idle`, `talk`, `walk`, `wave`, `shock`. Each returns `{ pose, expr }` for time `t`.
- Always include: anticipation before big moves, ease in/out, hair follow-through (`hairSway`),
  blinks every 3–4 s, and a contact shadow (already drawn by `drawCharacter`).

## Backgrounds
- `drawBackground(name, W, H, seed)`: `room` (the DumDown studio), `rooftop`, `street`, `reaction`.
- Far layers: no outlines, tinted toward the sky. Near props: ink lines and cel shadows.
- Use `reaction` behind punchlines and shock takes.

## Rendering
```bash
node render.mjs --char dum --anim talk --bg room --seconds 3 --png --out frames/shot01
ffmpeg -framerate 24 -i frames/shot01/f%04d.png -pix_fmt yuv420p shot01.mp4
```
