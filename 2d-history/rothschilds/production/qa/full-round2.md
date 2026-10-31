# QA: The Rothschilds, full video, round 2

- File: `production/full/rothschilds_full.mp4`, rebuilt 31 Oct 02:22 with `shared/combine_full.sh`.
  - Video: H.264 1080p30, copied from the act files. It holds 14,647 frames, with the last frame at 488.322 s and an end time of 488.355 s.
  - Audio: AAC, stereo (dual-mono), 488.366 s.
- Act frame counts: 1068, 2584, 1605, 1485, 2993, 1881, 1664 and 1371, which sum to **14,651**.
- Expected act starts (frames ÷ 30):

  | Act | Start (s) |
  |---|---|
  | 0 | 0.000 |
  | 1 | 35.600 |
  | 2 | 121.733 |
  | 3 | 175.233 |
  | 4 | 224.733 |
  | 5 | 324.500 |
  | 6 | 387.200 |
  | 7 | 442.667 |
- Passes run:
  - full decode check;
  - ebur128 with true peak, and astats;
  - audio cross-correlation of each act against its source, the same method as round 1;
  - frame matching at the start and end of every act;
  - a scan of every video timestamp;
  - 20 ms RMS envelopes, sample-step click checks and digital-silence runs at every join.

## Overall
- **Decode:** clean, exit code 0, no errors. PASS.
- **Loudness:** −14.0 LUFS integrated, LRA 3.6 LU. PASS.
- **True peak:** −2.1 dBTP. Sample peak is −2.12 dBFS with a peak count of 2, and flat factor is 0, so there is no clipping. This confirms the −14.0 LUFS and −2.1 dBFS you measured. PASS.

## Act joins, audio
Every join now has a clean 0.2 s fade-out, a short gap and a 0.06 s fade-in. There are no clicks: the largest sample step at any join is 0.0001–0.0010, against a 99.9th percentile of about 0.09–0.12.

| Join | Time (s) | Fade-out from | Digital silence | Fade-in to |
|---|---|---|---|---|
| J1 | 35.600 | −43 dBFS | 35 ms | −77 |
| J2 | 121.733 | −50 | 37 ms | −86 |
| J3 | 175.233 | −57 | 42 ms | −98 |
| J4 | 224.733 | −42 | 12 ms | −74 |
| J5 | 324.500 | −47 | 37 ms | −87 |
| J6 | 387.200 | −54 | 88 ms | act 6 opening |
| J7 | 442.667 | −53 | 20 ms | −82 |

The round-1 dropouts (J1 and J4) and soft cuts (J2, J3, J5) now read as short, intended dips. PASS. Round-1 M1 and L1 are FIXED, and L2 (mono) is FIXED: the audio is now stereo.

## Issues

### HIGH

**H1. The audio is now 23–117 ms ahead of the picture from act 2 onward, because the copied video has timestamp gaps at five joins**
- Region: whole timeline from 121.7 s, worst in act 7.
- Audio placement is now exact. The cross-correlation lag is a constant +5.0 ms (AAC decoder delay) for all 8 acts, with correlation 1.000. Round-1 H1's audio drift is gone.
- But the video timestamp scan finds five gaps, each about 2 frames long, where the copied video skips ahead:

  | From (s) | To (s) | Gap |
  |---|---|---|
  | 121.700 | 121.761 | 61 ms |
  | 175.228 | 175.280 | 52 ms |
  | 224.747 | 224.803 | 56 ms |
  | 387.236 | 387.297 | 60 ms |
  | 442.730 | 442.789 | 59 ms |

  The video therefore restarts acts 2–7 at the **old** starts (121.761, 175.280, 224.803, 324.570, 387.297 and 442.789 s), while the audio uses the new frame-based starts.
- Frame matching confirms this. The video is 0 ms late in acts 0–1, about +33 ms in acts 2–3, +67–100 ms in acts 4–5, and +100–133 ms in acts 6–7.
- Net audio lead over the picture, by act:

  | Act | Audio lead |
  |---|---|
  | 0 | −5 ms (audio slightly behind) |
  | 1 | −5 ms (audio slightly behind) |
  | 2 | +23 ms |
  | 3 | +42 ms |
  | 4 | +65 ms |
  | 5 | +65 ms |
  | 6 | +92 ms |
  | 7 | +117 ms |

  Audio arriving before the picture is noticed sooner than audio arriving after it (from about 45 ms), so the narration and SFX in acts 4–7 are perceptibly ahead of the stamps, cards and subtitles. The file also holds 4 fewer frames than the acts contain (14,647 against 14,651), because the gaps are holes rather than frames.
- Likely cause: the video concat demuxer starts each act at the file's duration, which is the longer of its audio and video. Acts 1, 2, 3, 5 and 6 have audio 19–28 ms longer than their video, so it adds a gap after each. The new audio path correctly uses frames ÷ 30, so the two timelines now disagree.
- Fix (either option):
  - Strip the audio from each act before the video concat, so each file's duration equals its video, for example `ffmpeg -i actN.mp4 -an -c copy vN.mp4`. Then concat the `vN.mp4` files.
  - Or write `duration <frames/30>` under each `file` line in `list.txt`.
- Afterwards:
  - Confirm `nb_read_packets` is 14,651 and the timestamp scan shows no gaps.
  - Confirm frame matching shows 0 ms at every act start.
  - Confirm the cross-correlation still reads a constant +5 ms.

Totals: 1 high, 0 medium, 0 low.

RESULT: FIXING
