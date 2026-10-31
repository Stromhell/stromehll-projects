# Act 2: Five Arrows, review round 2 (31 Oct)

File checked: `rothschilds/production/acts/act2/act2.mp4`. It was rendered at 06:58 and runs 53.52 s at 1920x1080 and 30 fps.

What I looked at:
- the 1 fps 6x5 sheets (2)
- a 4 fps sheet of 2.01 from 0.3 to 6.3 s
- a 10 fps strip of the 2.03→2.04 crossfade
- full-res frames and 1:1 crops at 1.5, 2.5, 3.5, 5.9, 25.5, 29, 45.3, 47 and 52.5 s

## Round-1 issues

| # | Round 1 | Status |
|---|---------|--------|
| 1 | 2.01 walkers on house fronts during the walk-in | **FIXED.** The zoom is about 1.97. At every 4 fps frame from 0.3 to 6.3 s, every foot (y≈890–920) is on cobbles, including each brother's first steps at the left edge (crops at 1.5 and 3.5 s). The feet are about 25–55 px above the subtitle box and never covered. In the final line-up at 5.9 s, all five stand on stone. |
| – | Plate at this zoom | **OK.** At 1:1 the house fronts are slightly softer than the characters, but the edges are clean, with no pixel steps or blockiness. The window glow and the cobble texture still read well. LOW note only (see 3 below). |
| 2 | Title over the subtitle at 45 s | **FIXED.** "INFORMATION = A FORTUNE" now sits at y≈840–900, about 45 px clear of the "on its own." box. |
| 3 | Sons behind the bed have no legs | **FIXED.** A red scalloped bed skirt now hangs to the floor between the posts, so the space under the bed is closed and the sons read as standing behind it. |
| 4 | Standing son's feet under the "1812" tag | **FIXED.** He stands at x≈1540–1620 with his feet visible at y≈945. The tag is at x≈1700–1830, and the candle table has moved behind him on the right. He holds the will out in his hand. |
| 5 | Floating envelope in 2.04 | **FIXED.** The letters ride in a buckled saddlebag on the horse's rump, with a sealed letter showing at the top. Nothing floats. |
| 6 | Low-detail horse, empty-handed rider | **FIXED.** The new horse has a mane, a bridle with a bit ring, reins running into the rider's hands, a saddle on a red gold-trimmed cloth, jointed legs with hooves, a tail and a ground shadow. The gallop cycle reads. |
| 7 | Two sons in identical poses | **FIXED.** The fourth son now leans in with both hands on the blanket. All four poses differ. |
| 8 | Hooves behind the subtitle | **FIXED.** With the ride line raised, the hooves land at y≈900–915, clear of the box. |
| 9 | 2.05 letter floats in front of the bookcase | Unchanged, LOW (a stylised close-up insert). |
| 10 | 2.03→2.04 crossfade | **FIXED.** The dissolve now takes about 0.3–0.4 s (10 fps strip: crest only at 24.1 s, field only by 24.4 s). |

## Full qa_rules pass

| Rule | Result |
|------|--------|
| 1 (standing on furniture) | Pass. The sons are behind the bed with the skirt down, and the standing son is on the floor. |
| 2 (sitting) | Pass. The rider is in the saddle. |
| 3 (walkers) | Pass. All brothers are on the cobbles. |
| 4 (floating props) | Pass in 2.01, 2.04 and 2.07. The briefcases are held by their handles or raised in hand. The will is in the son's hand. The letters are in the saddlebag. |
| 5–7 (held props) | Pass. The will is held. The briefcases are held and do not cross the legs. The quill moves in 2.05. |
| 8 (no still frames) | Pass. Every shot has a walk, an arrow draw, a crest bob, the gallop, the quill, map letters or the candle flicker, plus a push. |
| 9–10 (vehicles and animal teams) | None in this act. |
| 11–13 (detail) | Pass. The street, map, study and bedroom are painterly. The horse is now detailed. |

Audio:
- Integrated loudness is -16.0 LUFS, LRA 3.3 LU and true peak -1.4 dBFS.
- No SFX is louder than the narration. The cues are unchanged from round 1.

Content rules: pass. Decode: `ffmpeg -v error -i act2.mp4 -f null -` reports no errors.

## Issues remaining
1. **32–38.4 s (2.05), LOW:** the big letter and envelope float in front of the bookcase. This is acceptable as an insert. A desk edge or a hand would ground it.
2. **24–32 s (2.04), LOW:** the horse's legs are built from separate tube segments, which shows slightly at the joints mid-stride. It reads fine at speed.
3. **0–6.2 s (2.01), LOW:** the backdrop is slightly soft against the crisp characters at about 2x zoom. It is not pixelated. If a higher-resolution street plate is easy to make, it would sharpen the shot.

0 high, 0 medium.

RESULT: CLEAN

## Round 3 quick verify (07:28, after 07:26 render)
2.05 letter now lies on the writing desk, then folds and seals; map dissolve and deathbed unchanged. RESULT: CLEAN.
