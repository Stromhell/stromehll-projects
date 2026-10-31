# QA: The Rothschilds, full video, round 1

- File: `production/full/rothschilds_full.mp4`, 567.5 MB, built from `full/list.txt` (act0…act7 `.mp4` in order).
  - Video: H.264, 1920x1080, 30 fps, 488.489 s (8:08.5), start_time 0.021 s.
  - Audio: AAC, 48 kHz, **mono**. ffprobe reports 488.523 s; the decode actually yields 488.683 s of samples.
- Act start offsets (cumulative act durations):

  | Act | Start |
  |---|---|
  | 0 | 0.000 |
  | 1 | 35.600 |
  | 2 | 121.761 |
  | 3 | 175.280 |
  | 4 | 224.803 |
  | 5 | 324.570 |
  | 6 | 387.297 |
  | 7 | 442.789 |

  The acts end at 488.489 s, which matches the video length.
- Passes run:
  - full decode check;
  - ebur128 with true peak, and astats;
  - blackdetect, and a frame-difference cut scan;
  - 10–50 ms RMS envelopes and sample-step click metrics at every join;
  - audio cross-correlation of each act against its source file, and frame matching for video placement;
  - 1 fps skim sheets of the whole video (`full_fps_01–06.jpg`), 30 fps strips at each join, and crops of the act 7 polish items.
- Coordinates are in 1920x1080 space.

## Overall
- **Decode:** clean. A full decode to null took 68 s with no errors or warnings.
- **Loudness:** −14.1 LUFS integrated (target about −14). LRA 3.4 LU. PASS.
- **True peak:** −1.4 dBTP, within the ≤ −1.0 dBTP limit. Sample peak is −1.39 dBFS with a peak count of 2. Flat factor is 0, so there is no clipping, and DC offset is −0.0002. PASS.
- **Black frames:** none. blackdetect (≥ 1 frame, pix_th 0.06) found nothing.
- **1 fps skim:** nothing broke in the combine. All 489 sampled seconds match the per-act renders: every act's opening frame, subtitles, cards, the end card, and no stray frames from neighbouring acts.

## Act joins, video
- Each join is a single clean hard cut. The frame-difference spike sits exactly one frame after each offset because of the 0.021 s start_time. Spikes: 35.62, 121.78, 175.30, 224.82, 324.59, 387.32 and 442.81 s.
- There are no black, duplicated or flash frames, and no other frame-difference spike above 25 anywhere in the file.
- PASS.

## Issues

### HIGH

**H1. The audio drifts later than the picture at every join, reaching about 0.18 s late by act 7**
- Region: whole timeline, worst in acts 6–7.
- Measurement: I cross-correlated each act's own audio (seconds 2–12) against the full mix at that act's offset (correlation 0.995–0.998). Frame matching shows the video sits steady at +21–33 ms in every act checked (acts 1, 6 and 7).

  | Act | Audio lag | Relative to act 0 |
  |---|---|---|
  | 0 | 26 ms | 0 |
  | 1 | 32 ms | +5 |
  | 2 | 57 ms | +31 |
  | 3 | 85 ms | +59 |
  | 4 | 119 ms | +93 |
  | 5 | 129 ms | +102 |
  | 6 | 164 ms | +138 |
  | 7 | 203 ms | +177 |

- Effect:
  - From act 4 on, the burned-in subtitles and every word-keyed stamp or card lead the narration by about 0.1–0.18 s. Examples are the act 6 FALSE stamps and the act 7 "TRILLIONS? NO." and NATIONALISED.
  - Past about 125 ms the lag is noticeable.
  - The audio also runs about 0.19 s past the last video frame.
- Likely cause: the audio was joined at its packet level rather than placed at each act's start time. Each act's AAC encoder delay and padding, plus the gap between its audio and video lengths (act audio is 4–28 ms longer or shorter than its video), add up at every join.
- Fix:
  1. Rebuild the soundtrack from PCM. Decode each act's audio (or use its `mix.wav`) and trim or pad it to that act's exact duration from the offsets table, for example `apad,atrim=end=<dur>`.
  2. Join the eight pieces sample-accurately, with the concat filter or numpy, run loudnorm once, encode AAC once, and mux with the video stream copied (`-map 0:v -map 1:a -c:v copy -shortest`).
  3. Re-run this cross-correlation. Every act should sit within ±20 ms of act 0.

### MEDIUM

**M1. Hard audio cuts at J1 (act 0→1) and J4 (act 3→4)**
- J1 at 35.600 s: the act 0 bed runs at a steady −38 dBFS RMS right up to the cut, then drops to −75/−90 dBFS within 10 ms. That is about 0.3 s of near-silence before act 1's whoosh, and it reads as a dropout.
- J4 at 224.803 s: an act 3 sound swelling from −43 to −34 dBFS is cut straight into about 30 ms of digital silence (−129 dBFS), then act 4 fades up from −77.
- There is no click at either join: the largest sample step there is 0.021 and 0.011, against a 99.9th percentile of 0.088. These are audible gaps, not pops.
- Likely cause: the act mixes end without a fade-out and start from silence, so each join is a hard edit.
- Fix:
  - During the H1 rebuild, add a 150–250 ms `afade=out` to the tail of every act and a 50–100 ms `afade=in` to every head. Or join the acts with a 0.2 s `acrossfade` (equal-power), keeping the total length the same by padding.
  - Alternatively, let act 3's swell finish before its last frame.

### LOW

**L1. Softer bed cuts at J2, J3 and J5**
- J2 at 121.761 s: −48 → −91 dBFS.
- J3 at 175.280 s: −52 → −92 dBFS, with 46 ms of digital silence.
- J5 at 324.570 s: −45 → −75 dBFS.
- These are quieter versions of M1 and will be cleared by the same fades or crossfade.
- J6 (387.297 s) already fades from −51 to −63 before a 93 ms gap, and J7 (442.789 s) stays at −54 throughout. Both are clean.

**L2. Mono soundtrack**
- The audio is 1 channel. That is fine for a voice-led explainer, and YouTube will play it on both sides.
- If the music added at combine was meant to be stereo, encode the rebuilt mix as stereo (`-ac 2`).

## Act 7 polish (light pass)
- **Logo:** it is now at about x 1640–1805, y 895–1000. The mascot ends at y ≈ 998 and x ≈ 1805, inside title-safe. "EXPLAIN EVERYTHING" is at 30 px and readable. PASS.
- **End bed:** steady at about −15 dBFS RMS to 488.0 s, then a 0.7 s fade. There is no longer a silent tail. PASS.
- **"WHAT'S REAL IS ENOUGH":** it first appears at about 473.7 s (act time 30.9 s). During the 7.03→7.04 dissolve (472.4–473.6 s), "TRILLIONS? NO." fades out alone with no overlap. PASS.

Totals: 1 high, 1 medium, 2 low.

RESULT: FIXING
