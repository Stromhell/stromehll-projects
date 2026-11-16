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
