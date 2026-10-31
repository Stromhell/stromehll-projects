# QA: Act 7 "Ending: After the Empire", round 1

- File: `scratchpad/rs-preview/act7.mp4`, 1280x720, 30 fps, 43.70 s. The master is `production/acts/act7/act7.mp4` at 1920x1080 and the same length; crops were taken from the master.
- Timing: `timing.json` lists 4 VO shots ending at 39.115 s, followed by the 7.05 end card to 43.715 s. `snap.log` reads "W miss trillions". `cues.json` puts the phone ring at 26.991 s and the stamp at 28.291 s.
- Passes run: `qa.sh` with tag rs7 (27 frames, 2 sheets), 1 fps sheets (`rs7_fps_01/02.jpg`), full-res crops, a 5 fps strip of 26.8–29.6 s, a frame-difference motion scan, ebur128 and silencedetect.
- All coordinates are in 1920x1080 space.

## Content rules
- Swastikas: none. PASS.
- Antisemitic imagery: none in this act. The "trillions" myth is shown only as a generic phone screen reading "TRILLIONS!!", stamped FANTASY. PASS.
- Hitler: does not appear. PASS.
- Real people: the office pair (7.02) are generic house-style figures. PASS.
- The end-card seal is a bundle of five arrows in a red wax seal. It reads as the historic family crest, not as the Rothschild & Co corporate mark. Keep it in that wax-seal form.

## Cue check: "TRILLIONS? NO." (shot 7.03)
- Why the cue was missed: in `timing.json` the word is stored with its quotes as `'trillions'` (27.405–28.385 s). The cue lookup `A.at(S,'trillions',4.2)` therefore missed it and fell back to 4.2 s into the shot, putting `tT` at 26.991 s.
- What lands where:
  - The phone reading "TRILLIONS!!" pops in at 27.0 s, during "claims of". That is 0.4 s before the word, which is acceptable.
  - The FANTASY stamp lands at 28.3–28.4 s, on the "trillions"/"fantasy" boundary. That is fine.
  - The **"TRILLIONS? NO."** title is set to appear at `tT + 2`, which is 28.99 s. It starts fading in at about 29.0 s and is only fully visible at about 29.4 s, with the cut at 29.41 s. By then the VO has already finished "fantasy." (ends 28.785 s) and the whole line (ends 29.135 s).
- Result: the tag is late, by about 0.6 s against "fantasy" and about 1.6 s against "trillions", and it is readable for only about 0.4 s. See H1.

## Issues

### HIGH

**H1. 28.99–29.41 s: "TRILLIONS? NO." comes in late and is on screen for only about 0.4 s before the cut**
- Region: x 700–1220, y 100–220 (top centre, `y:160`, 90 px).
- Likely cause:
  - The word lookup does not strip quotes or punctuation, so it falls back to 4.2 s.
  - The title offset is `tT + 2`, which would still be too late even with the correct cue (27.405 + 2 = 29.4 s, the cut itself).
- Fix:
  - Normalise words in `A.at`/`K.setWords` (lowercase, strip `'"‘’“”.,!?;:`) so that `'trillions'` matches. `snap.log` should then stop reporting the miss.
  - Key the phone pop to "trillions" (27.41 s).
  - Key the FANTASY stamp and the "TRILLIONS? NO." title together to "fantasy" (28.39 s). Equivalently, set `at: S.tT + 1.0` instead of `+ 2`.
  - Extend 7.03 by about 0.6 s of tail, so the shot ends at about 30.0 s and the title holds for at least 1.5 s before the cut.

### MEDIUM

**M1. 11.7–22.8 s: subtitles cover both office characters' feet (shot 7.02)**
- Region: the man's feet at x 550–700 and the woman's at x 1200–1350, both at y 945–1000. The subtitle box spans y 945–1025.
- Likely cause: the office ground line (about y 980) sits inside the subtitle band. This is the same issue as Act 6 round-1 M3.
- Fix: raise both figures and the wine table about 90 px so feet sit at y ≤ 890, or scale the figures to 0.9 from the head.

**M2. 39.1–43.7 s: the end card has no channel branding, and at 4.6 s it is shorter than YouTube's 5 s end-screen minimum**
- Region: full frame. The seal is at x 650–1270, y 210–830 and the title "THE ROTHSCHILDS" at x 690–1230, y 880–1000.
- The title and seal are centred and clean, and nothing is cut off.
- There is no channel logo, wordmark or handle anywhere on the card.
- Act 7 is the final act, so this card is the video's ending. At 4.6 s it cannot carry YouTube end-screen elements, which need 5–20 s.
- Likely cause: the 7.05 spec in `act.html` draws only the seal and the title.
- Fix:
  - Add the channel logo or wordmark at about 60 % opacity, either bottom-right (around x 1640–1860, y 960–1030) or as a small line under the title (around y 1010).
  - Extend the card to at least 5 s; use 10–20 s if end-screen elements will be added.
  - If end-screen elements are planned, shrink the seal and title to the upper-centre (seal around y 300, title around y 560) and leave the lower half free for the elements.

### LOW

**L1. 8.96–9.7 s: the NATIONALISED stamp comes in about 0.8 s early**
- Region: x 1150–1610, y 330–470.
- It lands on "France's socialist", while the word "nationalised" runs 9.74–10.6 s.
- Fix: key the stamp to the word "nationalised".

**L2. 5–12 s: the NATIONALISED stamp touches the Paris dot, and the LONDON and PARIS labels crowd each other**
- Region: x 1380–1720, y 240–340.
- Fix: nudge the stamp 60 px down and to the right, and offset the PARIS label below its dot.

**L3. 35.6–39.1 s: the "RAILWAYS · WARS · CANALS" card sits on top of the painted "Europa 1800" cartouche**
- Region: x 1420–1860, y 810–900.
- Fix: move the card to around x 1500, y 700, or crop the plate so the cartouche is out of shot.

**L4. 40.5–43.7 s: the end card is fully static and silent for its last 3 s**
- The audio fades out by 41.8 s, leaving 1.9 s of silence.
- This is acceptable for a title card if music arrives at combine. Otherwise add a slow 2 % push-in and keep the swell going under the hold.

**L5 (deferred to combine). Loudness**
- Integrated loudness is −16.0 LUFS, LRA 4.8 LU, true peak −1.3 dBFS.
- No SFX is louder than the VO: the stamps at 8.96, 22.10 and 28.29 s peak at −15 to −18 momentary LUFS under VO at about −15. The end-card stamp, hit and swell peak at −19.
- VO gaps of 0.4–0.6 s at the joins are clean, with no harsh cuts.

## Clean checks
- No gliding walks: the man's walk-in at 11.7–13 s shows real strides.
- No flicker, no blocky plates and no floating figures. The office plate is detailed and lit.
- Text: none is cut off. "TRILLIONS!!" and "FANTASY" are inside the frame.
- No cards over the subtitle text.
- Script vs picture matches:
  - 7.01: the map pans to New York with a "THE NEW CENTRE OF MONEY" arc.
  - 7.02: modern office, a wine bottle on the table, and a "WORLD'S RICHEST" list stamped NO ROTHSCHILD.
  - 7.03: the pie splits into many slices.
  - 7.04: the five-capitals map with gold arcs to London, Paris, Vienna and Naples.
- Motion: no static span over 3 s during VO. The maps drift at 0.2–0.4 ΔY, and the pie splits in steps.

Totals: 1 high, 2 medium, 5 low (L5 deferred).

RESULT: FIXING
