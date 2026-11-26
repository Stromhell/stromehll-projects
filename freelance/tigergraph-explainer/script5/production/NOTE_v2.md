# TigerGraph Script 5, v2 (fully animated)

v1 moved whole storyboard frames like slides. v2 rebuilds every scene object by object, following the storyboard v5 animation notes.

- `anim_v2/`: GSAP scenes, one per storyboard scene (`scenes/sc01.js` to `sc14.js`), plus a shared helper library (`lib.js`) for the camera, particles, depth, networks and type. `gen.py` builds the pages from the VO beat timings. `render.js` renders each scene to an mp4 with Playwright at 30 fps and writes its sound cues.
- `audio/sfx_v2.py`: synthesises the SFX and places them at the cue times. `audio/mix_v2.sh`: mixes VO, music bed and SFX (-14 LUFS, true peak about -3.6 dBTP).
- `adobe/`: Adobe Generative Expand and Lens Blur plates, used blurred behind scene 13.
- The VO is unchanged (Kokoro voice C, af_heart).
- Every scene is built from separate layers (world, camera, front), so it can be handed off to After Effects later.

Rebuild: `python3 anim_v2/gen.py && node anim_v2/render.js OUT && bash audio/mix_v2.sh OUT OUT/TigerGraph_Script5_v2.mp4`
