# QA: The Rothschilds, full video, round 2 (after Pushpam's 31 Oct review fixes)

This replaces the earlier 02:33 round-2 note. That pass was on the pre-review combine, and its findings are kept in git history.

- **File:** `production/full/rothschilds_full.mp4`, combined 31 Oct 07:59.
  - Video: H.264 1080p30, 14,651 frames, 488.367 s. Audio: AAC 48 kHz.
- **Acts used:** the act files dated 06:53, 07:06, 07:26, 07:47, 07:56, 07:40, 01:31 and 02:02. Their frame counts are 1068, 2584, 1605, 1485, 2993, 1881, 1664 and 1371, which sum to 14,651, the same as the full file.
- **Decode:** `ffmpeg -v error -i rothschilds_full.mp4 -f null -` gives no errors.

## 1. Joins

The act starts are frames ÷ 30: 35.600, 121.733, 175.233, 224.733, 324.500, 387.200 and 442.667 s.

| Join | t (s) | Black / frozen | Video match to acts | Audio offset vs act mix | Pop at the cut | Subtitle sync (last word / first word) |
|---|---|---|---|---|---|---|
| 0→1 | 35.600 | none (min luma 49) | 0.00 / 0.00 | +5 ms, corr. 0.994 / 0.998 | no (max step 0.001, silent) | "there?" 29.73 ✓ / "Frankfurt," 36.20 ✓ |
| 1→2 | 121.733 | none (44) | 0.00 / 0.00 | +5 ms, 0.997 / 0.997 | no | "it." 120.47 ✓ / "Mayer" 122.33 ✓ |
| 2→3 | 175.233 | none (33) | 0.00 / 0.00 | +5 ms, 0.998 / 0.998 | no | "family." 173.68 ✓ / "In" 175.83 ✓ |
| 3→4 | 224.733 | none (84) | 0.00 / 0.00 | +5 ms, 0.998 / 0.998 | no | "nobility." 223.15 ✓ / "Through" 225.33 ✓ |
| 4→5 | 324.500 | none (114) | 0.00 / 0.00 | +5 ms, 0.998 / 0.998 | no | "Egypt." 323.07 ✓ / "The" 325.10 ✓ |
| 5→6 | 387.200 | none (21) | 0.00 / 0.00 | +5 ms, 0.995 / 0.998 | no | "Palace." 384.90 ✓ / "A" 387.80 ✓ |
| 6→7 | 442.667 | none (17) | 0.00 / 0.00 | +5 ms, 0.996 / 0.998 | no | "camps." 441.20 ✓ / "After" 443.27 ✓ |

How each column was checked:
- **Black / frozen:** `blackdetect` (0.05 s, pix_th 0.06) and `freezedetect` (0.5 s) over the whole file found nothing. At each join, no frame-to-frame difference falls below 0.05, so there are no duplicate frames.
- **Video match:** the 30 frames on each side of every join are pixel-identical to the act files (mean difference 0.00).
- **Audio offset:** a constant +5 ms on every join, in both directions. This is a fixed AAC encoder delay; it does not drift from join to join. The 20 ms either side of each cut is silence (-57 to -133 dB).
- **Subtitle sync:** I cropped the subtitle at the word onset −0.15/−0.2 s, +0.12 s, and on the next word.
  - Before the onset, the word is not yet highlighted, or no subtitle is up.
  - At +0.12 s it is highlighted.
  - The highlight then moves to the next word on time.
  - Each act's first word starts at 0.60 s in timing.json, and the narration onset in vo.wav is 0.63–0.65 s. That fits the normal attack, so there is no offset.

## 2. Loudness
- Integrated **-14.0 LUFS** (target -14). LRA 3.6 LU. True peak **-2.2 dBFS** (limit -1.5). Pass.

## 3. Whole-video pass against qa_rules (1 fps, 11 sheets, 489 frames)
Nothing new came from the combine:
- every join is a clean cut from one act's last frame to the next act's first frame;
- no shot is cut short or doubled;
- no subtitle or label is carried across a join.

Every shot still matches its clean act review:
- grounding is correct in every shot;
- no props float;
- every vehicle stays clear of architecture;
- the zebras are in single file;
- Walter is seated;
- the battle and train scenes are detailed;
- something moves in every shot.

Notes:
- **Act 3 (3.04, about 3:20–3:30):** the pamphlet stamp reads **FALSE**, not MYTH as in my act3 round 2 (07:20). It was changed deliberately in commit e155fac, "stamp reads FALSE per content rule", and act3.mp4 was re-rendered at 07:47. I checked the change in the full file: the image is still fully blurred and the stamp is legible. The duration and frame count are unchanged. It now matches the content rule (blurred + FALSE), though script line 3.04 still says MYTH. Not an issue. The script table could be updated to match.
- Content across the whole video:
  - the antisemitic pamphlets (3:20 and 6:28–6:45) are blurred and stamped FALSE;
  - Hitler and swastikas never appear (the 1938 Vienna shots show only plain uniforms);
  - the 1940 film is shown only as a reel icon;
  - the Ravensbrück beat is a candle;
  - real people are drawn as stylised cartoons.

## 4. Pushpam's 12 timestamps (full timeline)

| Time | Shot | Note | Now |
|---|---|---|---|
| 0:10 | 0.01 | telegram should be held | **Fixed.** It is in the messenger's hand, thumb over the edge, and held through the whole run. |
| 0:14 | 0.02 | Disraeli standing on the desk or flying | **Fixed.** He stands behind the desk, which meets his waist. The lamp sits on the desk. |
| 0:23 | 0.03 | money floating | **Fixed.** The coins, notes and grape plate sit on the desk top. |
| 1:12 | 1.06 | character on the desk or bench "flying" | **Fixed.** All the traders are on the paving, with the benches behind them. The courtyard is now detailed. |
| 1:30 | 1.08 | still frame, abrupt book overlapping the legs | **Fixed.** Mayer walks in with the ledger closed, eases it open, holds it with both hands clear of his legs, and idles. |
| 2:24 | 2.01 to 2.03 | walking above buildings / still frame | **Fixed.** The 2.01 brothers walk on the cobbles (2:02–2:07). The 2.03 crest shot (2:19–2:25) pushes in, and the arrows animate. |
| 3:08 | 3.02 | Waterloo "looks low, war site" | **Fixed.** It is a full battlefield with guns firing clear of the officer, real cavalry and the eagle falling. |
| 4:00 | 4.02 | Paris station: backgrounds low, detailed train | **Fixed.** The named locomotive has rods and spoked wheels, and the trainshed has a glass roof and a clock. |
| 4:04 | 4.03 | Belgium: add detail | **Fixed.** It has a crowd in period dress, flags, bunting, sentries and the tricolour. |
| 4:59 | 4.09 | Vienna train overlapping the arch | **Fixed.** The train stays on the viaduct deck, with every arch below it. |
| 6:06 | 5.04 | oil (prop / pose) | **Fixed.** The rival holds the oil can by its handle and changes pose. The derricks, gusher and pools are present. |
| 6:26 | 5.06 | zebras overlapping, sitting on air | **Fixed.** Three zebras in harness walk in single file with gaps. Walter sits on the box seat with the reins. |

## Issues
None.

Totals: 0 high, 0 medium, 0 low.

RESULT: CLEAN
