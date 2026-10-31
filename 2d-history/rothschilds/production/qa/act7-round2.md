# QA: Act 7 "Ending: After the Empire", round 2

- File: `scratchpad/rs-preview/act7.mp4`, re-rendered 31 Oct 01:54. 1280x720, 30 fps, 45.70 s. The master `production/acts/act7/act7.mp4` is 1920x1080 and the same length; crops were taken from the master.
- Timing: shot 3 now ends at 30.01 s (the 0.6 s hold). Shot 4 runs 30.01–39.715 s with VO from 30.285 s. The end card runs 39.715–45.7 s (6.0 s).
- Passes run: `qa.sh` with tag rs7b (26 frames, 2 sheets), 1 fps sheets (`rs7b_fps_01/02.jpg`), full-res crops, a 5 fps strip of 27.2–30.4 s, a logo crop, ebur128, silencedetect and an astats envelope of the end card.
- All coordinates are in 1920x1080 space.

## Content rules
- Swastikas: none. PASS.
- Antisemitic imagery: none. The "trillions" myth is a generic phone stamped FANTASY. PASS.
- Hitler: does not appear. PASS.
- Real people: generic figures only. PASS.
- The seal is still the wax-seal crest, not the corporate mark.
- The channel lockup is the house brand: the Stormi mascot plus "STORMI / EXPLAIN EVERYTHING", matching the shorts brand spec.

## VO sync after the 0.6 s hold
- The VO stops at 29.31 s and audibly resumes at 30.22 s. `timing.json` puts "What's" at 30.285 s, so audio and timing agree.
- Every 7.04 cue moved +0.6 s along with it: the chime at 30.41 s, the gate slam at 32.19 s, the "five sons" whooshes at 33.43–34.93 s, and the RAILWAYS pop at 36.21 s. Each lands on its word in the 1 fps sheet.
- The subtitles lead the VO by only 0.2–0.3 s at the shot start, as in every other act.
- The last word, "1800s.", ends at 38.625 s and the end card starts at 39.715 s.
- PASS.

## Round-1 issues

| # | Status | Evidence |
|---|---|---|
| H1 "TRILLIONS? NO." late and brief | FIXED | The phone pops at 27.4 s, on "trillions". The FANTASY stamp and title start at 28.4 s, on "fantasy" (stamp cue 28.385 s). The title is fully readable from about 28.6 s until the dissolve at about 30.0 s, roughly 1.4 s. |
| M1 subtitles over the office feet | FIXED | Feet now sit at y ≈ 890; the subtitle box is at y 945–1025. |
| M2 end card had no branding and was under 5 s | FIXED | The card now runs 6.0 s with a slow push-in. The lockup slides in at about 41.3 s at bottom right (see L1). |
| L1 NATIONALISED early | FIXED | The stamp cue is at 9.74 s, on the word "nationalised". |
| L2 stamp crowding London and Paris | FIXED | The stamp sits at about x 1210–1670, y 380–540, clear of the dots. PARIS is labelled below its dot, and SOCIALIST GOVERNMENT is at y 640. |
| L3 RAILWAYS card over the cartouche | FIXED | The card is at about x 1340–1780, y 655–735, clear of the "Europa 1800" cartouche at y 830–920. |
| L4 end card static and silent | PARTLY FIXED | The push-in is in. Audio is still near-silent after 42.9 s (see L2 below). |
| L5 loudness | DEFERRED TO COMBINE | −16.1 LUFS, LRA 7.5 LU (raised by the quiet end-card tail), true peak −1.3 dBFS. |

## New issues

### LOW

**L1. 41.3–45.7 s: the lockup is legible but sits slightly outside title-safe, and its tagline is small**
- Region:
  - STORMI wordmark: x 1596–1724, y 930–976 (44 px). Clear at 85 % opacity.
  - "EXPLAIN EVERYTHING" tag: x 1516–1720, y 986–1016. At 24 px it is about 13 px tall in the 720p preview and hard to read on a phone.
  - Mascot: x 1760–1840, y 940–1036. It crosses the 90 % title-safe line (x ≤ 1824, y ≤ 1026) by about 15 px, though it stays inside action-safe.
- The lockup clears the title, which ends at x ≈ 1350.
- Fix:
  - Move the whole lockup 30 px up and 30 px left, for example by drawing the mascot at (1700, 880, 124, 124).
  - Raise the tagline to 30 px or more.

**L2. 42.9–45.7 s: the end-card "swell/hum bed" is effectively silent**
- The level is about −50 LUFS momentary after 42.9 s, and there are silence runs at 42.87–43.95 s and 44.47–45.45 s. The listed beds end at 40.515 s, so nothing carries the last 2.8 s.
- Fix: extend the swell or hum bed to 45.7 s at about −24 LUFS, with a 1 s fade-out. Music at combine can replace it.

**L3. 29.9–30.3 s: during the 7.03→7.04 dissolve, "TRILLIONS? NO." and the incoming "WHAT'S REAL IS ENOUGH" card overlap**
- Region: x 660–1260, y 100–220. They are briefly garbled for about 0.3 s.
- Fix: delay the "WHAT'S REAL IS ENOUGH" card from `at: .4` to `at: .7`, or fade the 7.03 title out at 29.9 s.

**L4. `snap.log` is stale and still reads "W miss trillions"**
- It is dated 31 Oct 01:35, before the fix. The cue now lands on the word (27.405 s).
- Fix: regenerate `snap.log` on the next build, so a real miss isn't hidden by an old message.

## Clean checks
- No regressions in any other shot.
  - The 7.01 arcs and labels are clean.
  - In 7.02 the walk-in has real strides, and the "WORLD'S RICHEST / NO ROTHSCHILD" list is intact.
  - In 7.03 the pie split, phone and stamp are all correct.
  - In 7.04 the arcs to London, Paris, Vienna and Naples are correct.
- No floating figures, flicker, cut-off text or cards over the subtitles.
- SFX stay under the VO, and the scene joins are clean.

Totals: 0 high, 0 medium, 5 low (L1–L4 new; round-1 L5 loudness deferred).

RESULT: CLEAN
