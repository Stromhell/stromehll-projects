# Toon Lanky character style (v1, 16 Nov 2026)
Source: Pushpam's 6 Pinterest pins (refs/). Flat "teen cartoon" look: lanky bodies, graphic hair, big white eyes.

## Rules
- Proportions: 7-8 heads tall, long legs (~half height), small torso, thin neck, noodle arms, big hands with 4 fingers.
- Head: tall oval, soft pointed chin, low small ears, nose = one ink stroke/small wedge.
- Eyes: large white ovals almost touching, small black dot pupils, ink brows; expressions come from lids, brows, pupil look (normal, happy closed, half-lid, surprised, side glance, angry).
- Hair: one solid dark graphic shape, angular spikes or blocky fringe; no strands.
- Colour: flat fills + one hard shadow tone max; limited palette (black, red, white, dark navy, skin). Thick even ink outline (3 px 2D / inverted hull 3D).
- Clothes make the silhouette: baggy pants, chunky sneakers/boots, layered tee.
- Poses: relaxed contrapposto, hand on hip, arms crossed, hands in pockets.
- 3D: MeshToonMaterial 2-step ramp + back-face outline; 2D: SVG noodle-limb rig with 8 drawn views.

## Files
- viewer_v3.html — 3D rig (three.js r128): orbit 360, top/bottom, turnaround, X/Y/Z sliders on every joint incl. fingers, poses, faces.
- viewer2d_v2.html — 2D SVG rig: 8-view turn, look up/down, side-by-side sheet, joint sliders, poses, faces.
- New character = copy the viewer, change the token block (S / C colours) and hair/clothes builder functions only.

## v4 (16 Nov): 3D model with heavy 2D feel (use for 2D-animation videos)
- Custom cel shader: camera-locked key light (shadow shapes stay graphic like drawn), hard 2-tone step + small highlight band, purple-tinted shadow colours.
- Screen-space diagonal hatching inside shadows; hand-painted canvas textures (dry-brush grain, denim weave + stitch, knit stripes, shirt fold lines, hair strokes).
- Ink outline in clip space = constant pixel width, with line boil (wobble changes each drawing).
- Animate on twos (12 fps step) toggle; paper grain overlay; flat drop shadow disc instead of real shadows.
- More detail: lathe limbs, collar, chest panel, tee sleeves over long sleeves, cuffs, belt + buckle, necklace tag, cargo pockets + flap, knee fold lines, layered sneakers with toe cap/laces/collar, 2-segment fingers, lashes, pupil highlights, 13 hair locks + fringe.

## v5 (16 Nov): clean cartoon joints (Pushpam feedback)
- Limbs are capped tubes whose round ends match the next segment's radius, so bends are seamless; no visible joint balls. Lathe winding fixed (was inside-out).
- Elbows/knees are hinges only (elbow X -150..0, knee X 0..150), finger tips curl one way, wrist/neck/head limited.
- Shoulders/hips use ZXY order: Y twists the arm so the elbow bends toward the body (hand on hip works).
- Body collision: forearm and hand points are tested against the torso; the shoulder auto-lifts outward until nothing goes inside the body.
- Current master: viewer_v5.html.

## v6 (16 Nov): athletic build + real eyelids
- Lean-muscular: broader chest with pec shapes, V taper to waist, wider shoulders, deltoid caps, thicker upper arms/forearms/neck/thighs (joint radii still matched = seamless).
- Eyelids are skin-coloured hemispheres with an ink lash rim that roll down over the eye (blink, half lid, side glance, serious, happy squint). Brows sit above and only tilt; they never cover the eye.
- Wave fixed: upper arm out to the side, forearm straight up, palm forward.

## v7 (16 Nov): brows fixed for every angle
- Brows are arcs wrapped on the skull surface above the eyes (y 0.8), so from side/3/4 they never float in front of the eye. Raise/tilt only.
- Hair cap moved back/up to show a forehead; lids slimmer so they don't bulge in profile.

## v8 (16 Nov): lids + muscle; first female character
- Kai v8 (viewer_v8.html): lids hidden when eyes are open (no black rim at the side); side glance/serious lids now clearly drop; broader chest, pecs, traps, wider shoulders, biceps/forearms.
- Mira v1 (mira_v1.html): female in the same style (from pin 4): long straight ginger hair with swept fringe, freckles, longer lashes + flicks, thin brows, yellow crop top with flower print and straps, bare midriff, narrow waist/wider hips, slim arms with bangles, dark-green frayed cut-off shorts, brown knee boots with heel. Same rig, sliders, poses, faces and 2D-feel shading.

## v9 (16 Nov): emotion system (from 2 emotion-challenge sheets) + fixes
- Hybrid face: 3D eyes/lids/brows + a 2D-drawn face decal (canvas texture wrapped on the head, Spider-Verse/Arcane technique) for mouths, ^^ / >< / - - / u u closed eyes, blush, tears, sweat, gloom, anger vein, sparkles; heart/star/swirl pupils.
- 26 presets (Neutral...Pout) + Face controls (upper lid, lower lid, lid tilt, brow raise/tilt/asym, pupil size/look, mouth type/open/size/offset, extras) + Expression sheet mode. Shared code: face_rig_v1.js.
- Pupils now sit flush on the eyeball (follow its curve) so lids always cover them.
- Mira: fuller torso (ribcage, upper back, thicker midriff); side locks shortened so the torso reads in profile.
- Masters: viewer_v9.html (Kai), mira_v2.html (Mira).
