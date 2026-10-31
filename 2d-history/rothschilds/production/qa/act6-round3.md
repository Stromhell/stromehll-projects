# QA: Act 6 "Hatred and Loss", round 3

- File: `scratchpad/rs-preview/act6.mp4`, re-rendered on 31 Oct at 01:32. 1280x720, 30 fps, 55.51 s.
- Passes run: `qa.sh` with tag rs6c (33 frames). Sheets 1–2 were produced; sheet 3 failed again because a single frame can't be tiled, so I checked that frame (the candle) on the 1 fps sheet. Also 1 fps sheets (`rs6c_fps_01/02.jpg`), full-res crops of the reader (5 s, 8 s) and the card and shoes (22 s, 26 s), 5 fps strips of 37.4–39.0 s and 46.8–48.4 s, ebur128 and silencedetect.
- All coordinates are in 1920x1080 space.

## Content rules
- Swastikas: none. PASS.
- Antisemitic imagery: all pamphlets are blurred and each is stamped FALSE. PASS.
- Hitler: does not appear. PASS.
- Real people: stylised figures and name cards only. PASS.
- The reader's new face is a worried, clean-shaven family member with no caricature traits (see below).

## Round-2 issues

| # | Status | Evidence |
|---|---|---|
| M1 Baron name tag cut off at the frame edge | FIXED | The tag is fully inside the frame at 37.4 s and 37.6 s (right edge about x 1880), half-faded at 37.8 s and gone by 38.0 s. It is never cut off. |
| M2 reader's beard and scowl | FIXED | He is clean-shaven with a visible mouth. At 5 s he shows raised brows and a sweat drop; at 8 s his eyes are squeezed shut with a frown. He reads as worried and hurt, not menacing. |
| L1 card clips the woman's shoes | FIXED | At 22 s and 26 s there is a gap of about 15 px between her soles (y ≈ 860) and the top of the "CREDITANSTALT · 1931" card (y ≈ 875). |
| L2 map overlays popping during the dissolve | FIXED | The dissolve runs 47.0–47.4 s. The arrow-origin dot, "MANY ESCAPED" and "EUROPE · 1940" all appear at about 47.8 s on the fully visible map. |
| L3 candle hold | DEFERRED | The VO ends at 54.48 s and the file ends at 55.51 s. |
| L4 loudness | DEFERRED TO COMBINE | Unchanged: −16.0 LUFS integrated, LRA 2.6 LU, true peak −1.3 dBFS. |

## New issues

### LOW

**L5. 47.4–47.8 s: a blank, faint rectangle shows on the map before "EUROPE · 1940" pops in**
- Region: x 1290–1800, y 765–855. It is at about 15 % opacity, has no text, and is wider than the card.
- Likely cause: the card's backing or shadow layer starts at the dissolve, while its text and fill start at 47.8 s.
- Fix: give the backing layer the same in-point as the card (47.8 s), or delete it if it is a leftover.

## Clean checks
- No regressions elsewhere. Sheets 1–2 match round 2 for every other shot:
  - feet stay above the subtitle band (y ≈ 860 against a box at y 940–1020);
  - the reel and card stay clear of heads;
  - the escort walk-off has real strides;
  - the Switzerland arrow is correct;
  - the USA edge tag is in place.
- Audio is unchanged from round 2. VO gaps at the joins (18.0, 29.1, 38.9, 46.7, 51.0 s) are clean, with no harsh cuts and no SFX louder than the VO.

Totals: 0 high, 0 medium, 3 low (L5 new; L3 and L4 deferred).

RESULT: CLEAN
