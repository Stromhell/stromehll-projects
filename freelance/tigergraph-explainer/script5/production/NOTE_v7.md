# TigerGraph Script 5, v7 (28 Nov 2026)

Built from "TigerGraph_Script5_Video1_Audit_and_Polish_Guide.docx" (the audit of v6, saved in script5/feedback/ as _v6.docx).
File: renders/TigerGraph_Script5_v7.mp4, 2:43.3 (end slate hold trimmed 2.3 s). Same VO, music and SFX system as v6.

## Glitches fixed
- 2:30 white block: the orange node now opens into the real dashboard picture at 80 % size (dark rim), and the dashboard window starts at that size and Z-zooms in. No plain light rectangle.
- 2:32 "21 %": the left ring shows 28 % from the moment it appears (settles 96 -> 100 %); only the ring sweeps. The 90 % counter is unchanged.
- Blank cards at 0:20, 1:04, 1:34: carried cards now keep their real content while they travel (0:20 record names on the folded cards, 1:04 risk cards -> record cards with text, 1:34 the profile panel turns into the 92 % score card on the way).
- 2:14 empty "Add graph when" card (found in our own check): all four rows land faint as soon as the card forms; each lights up when spoken.
- 1:52 handoff: the dashed slots are TG Blue (they were white on a light ground, invisible), and the exit blur is lighter, so the hand-off no longer reads as a wash.

## Motion system
- Centre-locked camera: no sideways drift. Every scene has one continuous Z push (with a small tilt) for its whole length, so holds keep moving.
- Z push-through at every cut: the new scene arrives still travelling the way the last one left (zoom in -> starts at 90 %, zoom out -> starts at 110 %).
- Background network, glass shards and light patches drift in depth instead of sliding left to right. Orbit exit rotates around centre (no slide).
- Easy Out on all entrances (power3.out instead of the hard expo stop); counters ease out too.
- End slate: lockup keeps a slow push and the logo glow breathes; resolved hold under 1 s after the CTA sweep.

## QA
- Decode clean, -14.3 LUFS, -4.1 dBTP.
- qa_auto "camera frozen" flags at 0:00, 0:39, 2:07: judged false positives (content keeps building: neural branch, the two networks growing, Anna Lee duplicates merging, all under the slow Z push). Overall still-camera share is now under the limit.
- Frame sheets checked at every hand-off and at the audit timecodes.

Build: anim_v7 (gen.py -> pages, render.js) -> audio/mix_v7.sh.
