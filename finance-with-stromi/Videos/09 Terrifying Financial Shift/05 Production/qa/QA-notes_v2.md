# Video 09 QA notes (v2, 18 Nov 2026)

Full video v2: 14:42, 1920x1080, 24 fps CFR, -14.2 LUFS, true peak -2.7 dBTP.

## Fixed after v1 watch check
- Vault: sign shadow, gold bars overlapping (spacing widened)
- Tokyo shop signs z-fighting (moved off the wall)
- Band table scene too dark (side fill lights)
- Y09 Dot/Gus standing inside the table, Brick in Y23 repositioned
- Counter showing in Y34/Y35 hidden
- Whole film lifted with a curves grade in the combine

## qa_auto flags accepted (checked by eye)
- "edge exposed": false positive on the dark 3D rooms (vignette corners, not a plate edge)
- "cut leak" at 0:24 and 10:06.7: dark vignette corners match across the cut; scenes change fully
- "black 1:01-1:07": title card "The Rubber Band" + chapter card "1. Free Money"
- "dark scene" luma 9-11 spans: chapter cards; other spans 15-27 are moody rooms with lit subjects
- Thin vertical line on cards: intended old-film scratch (RH.film), same as all Finance videos
- Cut rhythm warn: long dialogue skits by design

Voice QA: no FAILs. End screen: last ~6 s empty table, no text or characters.
