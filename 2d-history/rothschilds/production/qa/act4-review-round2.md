# Act 4 — QA review, round 2

File: `rothschilds/production/acts/act4/act4.mp4` (re-render 07:35, 99.77 s)
Checks: qa.sh sheets (rs4r2_1–4), 1 fps contact sheets (100 frames), 3 fps strips of 4.02 / 4.06 / 4.11, full-res frames at 14, 17.3, 19.3, 43.3, 48.5, 54.2, 55.4, 73, 87 s.

## Round-1 issues — status
| # | Round-1 issue | Status |
|---|---|---|
| 1 | 4.02 walkers cross James / hand on loco | FIXED. Walkers stop beside James (x≈1150–1250 vs 1460–1580), no passing through; James's arms down, clear of the locomotive. |
| 2 | 4.02 brown-coat woman's feet behind subtitle | FIXED. Feet y≈900–930. |
| 3 | 4.03 crowd feet behind subtitles | FIXED (two edge figures still tight, see L5). |
| 4 | 4.06 third porter behind IRELAND tag; clone porters | FIXED. Feet y≈905, x≈1370–1440, clear of tag; three varied porters (cap/sack, bare head/crate, top hat/long hair). |
| 5 | 4.07 REFUSED covers Lionel's face | FIXED for the face. Stamps at y≈340–435. Hat-brim overlap remains (L4). |
| 6 | 4.07 Parliament a plain block | FIXED. Clock tower, Gothic gate with pinnacles, lancet windows, Victoria-tower block, railings, lamps. |
| 7 | 4.05 identical inset figures | FIXED. Four varied figures (adult/child, different clothes). |
| 8 | 4.09 coins across train | FIXED. Coins arc into chest bottom-right, below the deck. |
| 9 | 4.03 sentries tangled in gate bars | FIXED. Sentries stand outside gate piers with muskets held at side. |
| 10 | 4.02 unclear round object | FIXED. Now a clear wheeled trunk. |
| 11 | 4.11 empty arcade | FIXED. Fruit stall, walker, two talking men, benches, falling sign. |

Pushpam's notes: 4.02 detailed train (named loco "ST-GERMAIN", carriages with passengers, iron shed, clock) — holds. 4.03 period detail (1830 crowd, flags, bunting, sentries, carriage) — holds. 4.09 viaduct: train runs only on the deck, arches below, never through an arch — holds. Ships (4.04/4.08) detailed hulls, rigging, flags; 4.08 reads as war zone (burning fort, smoke, shell splashes, debris) — holds.

## Issues

1. **4.11, ~85.7–86.7 s — MEDIUM (qa_rules grounding).** The top-hat walker comes out from behind the fruit stall and his shoes land exactly on the bench-seat line (bench top y≈880, shoes y≈860–880, x≈260–360), so for ~1 s he reads as stepping along the bench. **Fix:** put his walk line in front of the bench (feet y≥905–930), or move the left bench out of his path (e.g. x≥450 or remove).

2. **4.06, 44.0–45.5 s — LOW.** Porters enter bunched: the first and third overlap body-on-body and the middle one is hidden, then pops out as they spread. **Fix:** stagger their start x / entry delays so they arrive in single file.

3. **4.06, ~47–49 s — LOW.** The middle porter walks in front of the quay lamp post (x≈945); the pole passes through his hands/crate and looks held. **Fix:** move the lamp post to x≈560 or shift his path.

4. **4.06 — LOW.** Loose tan discs lying on the quay bottom-left (x≈0–360, y≈870–960) read as coins. **Fix:** make them clearly potatoes/sacks (texture, brown tone) or drop them.

5. **4.03, 18–25 s — LOW.** Two crowd figures sit right at the subtitle box edges (purple woman x≈450–530, capped man x≈1390–1450, feet y≈1030–1040). Feet are visible, but tight against the box. **Fix (optional):** nudge each 40–60 px outward.

6. **4.07, ~55.2–55.6 s — LOW.** Right REFUSED stamp (y≈340–435) overlaps the top of Lionel's hat as he walks under it; face clear. **Fix:** shift that stamp ~120 px right or ~40 px up.

7. **4.05, 33–43 s — LOW.** "COMPENSATION" runs past the page column into the red tabs. **Fix:** reduce font ~15% or move left.

## Audio
ebur128: I −16.2 LUFS, LRA 3.4 LU, true peak −1.4 dBFS. VO-to-mix gain uniform (unchanged from round 1); no SFX above narration, no pops heard/measured.

## Content
Real people stylised; no swastikas; no Hitler; no antisemitic material in this act. Enslaved inset handled respectfully with "THE ENSLAVED GOT NOTHING". OK.

## Decode
`ffmpeg -v error -i act4.mp4 -f null -` — no errors.

High: 0 · Medium: 1 · Low: 6

RESULT: FIXING
