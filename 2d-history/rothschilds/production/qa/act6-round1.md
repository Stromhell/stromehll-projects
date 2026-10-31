# QA: Act 6 "Hatred and Loss", round 1

- File: `scratchpad/rs-preview/act6.mp4`, 1280x720, 30 fps, 55.51 s. The script plans 58.2 s across shots 6.01–6.06.
- Passes run: `qa.sh` (/watch, local engine, 29 frames, 2 sheets), 1 fps contact sheets (`rs6_fps_01/02.jpg`), full-res crops, 5 fps walk-cycle strips, a frame-difference motion scan, ebur128 and silencedetect. `peek` could not run because the OpenRouter and Deepgram keys are not set, so I did the audio checks with ffmpeg instead.
- All coordinates below are in 1920x1080 space.

## Content rules
- Swastikas: none seen. The 1938 street has no banners at all.
- Antisemitic imagery: all three pamphlet cartoons are heavily blurred (0.5–10.5 s), and the 6.02 page carries a red FALSE stamp (11–18.5 s). PASS.
- Hitler: does not appear. PASS.
- Real people (Baron Louis, Elisabeth de Rothschild): generic house-style figures or a name card only, with no likeness. PASS.

## Issues

### HIGH

**H1. 33.0–35.5 s: the film-reel icon and the "1940 · PROPAGANDA FILM" card cover the standing man's head**
- Region: x 750–1170, y 300–700. The reel is at roughly x 830–1090, y 310–540 and the card at x 750–1170, y 600–680. His head is completely hidden, so he reads as headless for about 2.5 s.
- Likely cause: the icon and card are anchored to frame centre, and the label placer does not check them against the character's head box.
- Fix: move the reel and card into the empty upper-left building area (around x 200–620, y 120–420), or move the man to x ≈ 1350 before the reel pops. Also add a head-box exclusion rule to the label placer.

### MEDIUM

**M1. 2.0–10.5 s and 11.0–18.5 s: long static frames, and the picture does not match the VO for 6.01 and 6.02**
- Region: full frame.
- The motion scan shows almost no change from 2.0–7.5 s (5.5 s) and from 11.0–18.5 s (7.5 s). The only movement is label pop-ins at 9.0 s and 14.5 s.
- 6.01 is missing the family member who should be reading a pamphlet.
- In 6.02 the "wall of cartoons" drops to a single page on a hard cut at 10.5 s, so the other two pamphlets disappear.
- Likely cause: the shot was built as a cards-only insert with no character layer and no camera move. The 6.02 layout replaced the three-page group instead of stamping it.
- Fix:
  - Add a family member (left third, x 120–600, y 380–1000) holding one pamphlet, with a head shake and page lower on "a target".
  - Add a slow 3–5 % push-in across 6.01.
  - In 6.02, keep all three blurred pages and slam a FALSE stamp onto each in turn: "false then" ≈ 11.5 s, "false now" ≈ 13.5 s, and the third at ≈ 15 s. Add a small camera drift.

**M2. 2.0–10.5 s: a production note appears on screen as a caption**
- Region: x 680–1240, y 120–180.
- The tag reads "ANTISEMITIC PAMPHLETS (BLURRED)". "(BLURRED)" is an internal annotation, not viewer copy.
- Likely cause: the shot-description field was used as the label text.
- Fix: change it to "ANTISEMITIC PROPAGANDA · LATE 1800s", or to "MYTH", and drop "(BLURRED)".

**M3. Subtitles sit over characters' legs and feet**
- 20.0–29.5 s: the crowd outside the bank. Region x 600–1320, y 940–1020.
- 34–39 s: the middle man's feet. Region x 900–1010, y 950–1010.
- 40–46 s: the walkers carrying paintings. Region x 300–1300, y 940–1020.
- Likely cause: the characters' ground line (about y 1000) falls inside the subtitle band (y 940–1030).
- Fix: raise the ground line so feet sit at y ≤ 900, or scale the figures to 0.9 from the head, in all three shots. Alternatively, add a subtitle safe-zone check that keeps character boxes out of y > 920.

**M4. 36–39.5 s: the arrest reads as three friends meeting**
- Region: x 640–1300, y 520–1000.
- The script asks for "a man led away by soldiers". On screen, two identical suited civilians walk up to an identical third man and appear to shake hands. There are no soldiers, and nothing shows him being led away.
- The "BARON LOUIS ROTHSCHILD" tag (x 60–400, y 60–100) is not attached to anyone.
- Likely cause: the same character rig and outfit were reused for all three figures, and the action was a "meet" pose instead of an escort.
- Fix:
  - Dress the two escorts in plain grey-green uniforms and caps, with no insignia and no swastikas.
  - Have them take the Baron by the arms and walk him off frame right.
  - Give the Baron a distinct stylised look, such as a long dark overcoat and hat.
  - Attach the name tag to him with a leader line.

**M5. 47–50.5 s: the SWITZERLAND marker is in central France**
- Region: dot at about x 900, y 640, label at x 810–990, y 600–630.
- The dot lands west of the Alps, in central or southern France.
- Likely cause: the map coordinate was guessed rather than taken from the map plate.
- Fix: move the dot and label onto Switzerland on this plate, north of Italy and east of the arrow origin (about x 1150, y 560; check against the plate), and redraw the arrow.

### LOW

**L1. 47–50.5 s: a faded card is stuck at about 10 % opacity**
- Region: x 1440–1780, y 780–840, lower right of the map. The text is illegible and looks like "Europe 1940".
- Likely cause: a fade-in keyframe is missing, or it is a leftover layer.
- Fix: animate it to full opacity, or delete it.

**L2. 47–50.5 s: the USA dot sits on the map's Atlantic coast and reads as Ireland or Brittany**
- Region: x 90–150, y 390–450.
- Fix: run the arrow off the left frame edge and end it on an edge tag reading "→ USA".

**L3. 20–29 s: the CLOSED sign floats in mid-air, and there are no shut doors**
- Region: x 790–1130, y 360–470.
- The script asks for "doors shut". The sign is not mounted on anything.
- Fix: paint shut double doors into the central arch and hang the CLOSED sign on them.

**L4. 24–29 s: crowd arms pass through neighbouring torsos**
- Region: x 560–1400, y 660–760.
- Likely cause: the gesture rotation is too wide, and the layer order puts arms in front of the neighbour.
- Fix: shorten the arm swing to 30° or less, or put each figure's arm behind the neighbour's layer.

**L5. 44.0–46.0 s: the picture lags the VO**
- "Many family members escaped to Britain" starts while the SEIZED room is still on screen. The dissolve to the map is about 1.5 s late.
- Fix: start the dissolve at 44.0 s and shorten it to 0.5 s.

**L6. 50.5–55.5 s: the candle shot is short, and the act ends about 1 s after the last word**
- The VO ends at 54.48 s and the file ends at 55.51 s. The planned shot was 7.9 s; the render is about 5 s.
- The candle is nearly static from 52.5–55.5 s.
- Fix: hold the shot 2–3 s longer with room tone and a slow fade to black, add a subtle flame flicker, and use a 2 % push-in.

**L7. Audio level**
- Integrated loudness is −16.0 LUFS against a target of about −14. LRA is 2.6 LU and the true peak is −1.3 dBFS.
- I found no SFX louder than the VO: momentary peaks of −12 to −13 LUFS match word onsets. VO gaps of 0.3–0.5 s at 3.0 s, 18.4 s and 51.0 s are clean, with no clicks.
- Fix: two-pass `loudnorm=I=-14:TP=-1.5:LRA=7` at combine. The peak needs a limiter because +2 dB of gain would clip.

**L8. 20–29.5 s: the corner cards do not match the script**
- Region: x 1580–1900, y 930–1000.
- The script's on-screen text is "CREDITANSTALT · 1931". The render shows "VIENNA · 1931" bottom right and a small "CREDITANSTALT" top left.
- Fix: make the bottom-right card read "CREDITANSTALT · 1931".

## Clean checks
- No gliding walks. The 5 fps strips at 35–37 s and 41–43 s show proper stride changes.
- No ground or texture flicker, no frozen wheels (there are no wheels in this act), no missing body parts, and no truncated text.
- No cards over the subtitle text. The corner date cards share the band but sit at x > 1580, clear of the subtitles.
- Backgrounds are painted and lit, with no blocky or empty plates. The 19.0 s empty plaza fills as the crowd walks in.

Totals: 1 high, 5 medium, 8 low.

RESULT: FIXING
