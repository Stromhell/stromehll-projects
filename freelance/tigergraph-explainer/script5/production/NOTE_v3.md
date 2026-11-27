# TigerGraph Script 5, v3 (Pushpam's animation plan, 27 Nov)

- No wobble anywhere: one slow camera drift per scene, no tilt/bounce, no back-ease pops. Entrances use slide/rise + opacity, scale + opacity, trim-path line draws and drawn checkmarks.
- Backgrounds always move (drifting light rays, light patches, particles); light/dark changes use a radial gradient reveal, never a hard swap.
- VO gaps tightened: each line now has a 0.3 s lead and a short tail, so the video is 2:13 (was 3:00). Animations start just before the words (Whisper word times).
- Every scene reworked per the scene-by-scene notes (record cards glide in, slow scan + counting, 93% ring becomes the MERGE button, button breaks into data particles, side entries, fixed title zone + neural net, interface zooms, network merge test, risk cards, Novak gauge, orange path through shared nodes, transaction cards absorbed one by one, chart built bar by bar, magnifier with evidence chips, score/reason text reveal, slates with growing network, duplication into one master record, checklist with a visual per item, dashboard zoom into the comparison, curved-path end card).
- Adobe: Lens Blur plate darkens the dashboard in scene 13.

Rebuild: `python3 anim_v3/gen.py && node anim_v3/render.js OUT && bash audio/mix_v3.sh OUT OUT/TigerGraph_Script5_v3.mp4`
