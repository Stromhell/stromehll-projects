# QA: The Rothschilds, full video, round 3

- File: `production/full/rothschilds_full.mp4`, rebuilt 31 Oct 02:35 with each act's audio stripped before the video join.
  - Video: H.264 1080p30, **14,651 frames**. The last frame is at 488.333 s and the video ends at 488.367 s.
  - Audio: AAC, stereo, 488.366 s.
- Act starts (frames ÷ 30): 0, 35.600, 121.733, 175.233, 224.733, 324.500, 387.200 and 442.667 s.
- Passes run, using the same methods as rounds 1–2:
  - a scan of every video timestamp;
  - full decode check;
  - audio cross-correlation of each act against its source (seconds 2–12);
  - frame matching at the start and end of every act;
  - 20 ms RMS envelopes and sample-step click checks at every join;
  - ebur128 with true peak.

## Video gaps at joins
- There are none. All 14,651 frames are exactly 1/30 s apart, matching the acts' total (1068 + 2584 + 1605 + 1485 + 2993 + 1881 + 1664 + 1371).
- Round-2 H1's gaps at 121.70, 175.23, 224.75, 387.24 and 442.73 s are gone. FIXED.

## Audio vs picture at every act start

| Act | Start (s) | Audio lag | Video offset (start / end of act) |
|---|---|---|---|
| 0 | 0.000 | +5.0 ms | 0 / 0 |
| 1 | 35.600 | +5.0 ms | 0 / 0 |
| 2 | 121.733 | +5.0 ms | 0 / 0 |
| 3 | 175.233 | +5.0 ms | 0 / 0 |
| 4 | 224.733 | +5.0 ms | 0 / +33* |
| 5 | 324.500 | +5.0 ms | 0 / 0 |
| 6 | 387.200 | +5.0 ms | 0 / +33* |
| 7 | 442.667 | +5.0 ms | 0 / 0 |

- Audio correlation is 1.000 in every act, so the audio sits a constant +5 ms behind the picture throughout (AAC decoder delay). That is inside the 0 to +5 ms target. PASS.
- \* The single-frame readings near the ends of acts 4 and 6 are seek-rounding artifacts in the reference frame grab, not drift. The timestamps have no gaps, and the next act's first frame matches at 0 ms in both cases.

## Joins, audio
- Unchanged from round 2 and clean. Each join has a 0.2 s fade-out, a 12–88 ms gap and a 0.06 s fade-in.
- There are no clicks: the largest sample step at any join is 0.0001–0.0010, against a 99.9th percentile of about 0.09–0.12.
- There are no dropouts: every join reads as a short, intended dip. PASS.

## Overall
- **Decode:** clean, exit code 0, no errors. PASS.
- **Loudness:** −14.0 LUFS integrated, LRA 3.6 LU. PASS.
- **True peak:** −2.1 dBTP, within the ≤ −1.0 dBTP limit. PASS.
- **Lengths:** video 488.367 s and audio 488.366 s. PASS.

## Issues
None.

Totals: 0 high, 0 medium, 0 low.

RESULT: CLEAN
