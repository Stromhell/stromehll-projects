# TigerGraph Script 5, v9 (28 Nov 2026)

Full rebuild from Pushpam's v8 notes (12:49 UTC) and his ask at 12:58 UTC: one seamless shot, very smooth, calmer background with an animated gradient, 3D tricks like the references. File: renders/TigerGraph_Script5_v9.mp4, same VO and sound system.

## What was learned from the references (3 WhatsApp videos + 5 Pinterest clips)
- One camera gliding over UI planes laid out in one space, seen at a slight angle while it moves (Maily / fostr / Acuity).
- Real motion blur on every move, so fast travel reads as smooth instead of stepped.
- One soft gradient ground that never stops moving (Shotlist, Food Safety), with very little else behind the subject.
- Objects regroup into the next layout instead of being replaced (tiles into a ring, cards into a row).
- Flying forward through an object into the next idea (beliv8 light cone, fostr panels).

## How v9 is built (anim_v9/)
- ONE continuous shot. Every scene is a station placed in one 3D space. Nothing fades in or out as a layer any more (this was the "cut" in v8). The film camera travels from station to station: it pulls back a little, glides with a slight turn (about 7 degrees) and settles, in one 2.1 s Easy Ease move. Two moves fly forward through an object instead (into the lens at 0:36, into the dashboard at 2:30).
- Scene content no longer fades away at the end of a scene. It stays and leaves the frame with the camera.
- One animated gradient ground for the whole film: four soft colour fields per ground that drift slowly all the time. When the camera moves to a station with a different ground, the new light arrives from the same side and at the same speed as the move (a soft wash), never as a dissolve.
- Background is much calmer: rays, light patches, glass shards, particles and orbs are removed. The network has 54 points instead of 92, with fainter lines, and still joins up slowly through the whole film.
- No idle bobbing on any object (it read as jitter).
- Motion blur: every frame is 4 sub-frames across a 180 degree shutter, averaged (render_film.js --sub 4). render_chunks.sh renders in 12 s chunks so a restart loses only one chunk.

## Notes fixed
- 0:15: the two record cards keep their content, their corners round off slowly (1.5 s) until each is a circle and the colour comes in; the circle lands, the eyes open, then the body grows out from under it. Less confetti.
- 0:19, 1:06, 1:26, 2:05: no layer fades; camera travel instead.
- 1:14: the names are centred in their pills all the way (the pill lost its centring during the move in v8), and the cards behind them slide out with the camera instead of fading.
- Background: see above.

## New skills
- Installed 21 more skills as a shared kit: /mnt/project-files/tools/motion-skills-extra (bash setup.sh). HyperFrames motion-doctrine, seam-craft, cut-the-curve, oversized-cursor + 5 blocks (Apache 2.0); iart web-animation skills (MIT); alharkan7 2D/3D motion graphics and animated chart.
- Used here: motion-doctrine and seam-craft rules (one continuous camera move, how you exit decides how you enter, no idle wobble, opaque stage ground), motionmaxxing shutter blur, explainer-engaging one-take camera over stations.
