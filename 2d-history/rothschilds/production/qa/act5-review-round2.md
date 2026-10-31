# Act 5: Beyond Banking, review round 2 (31 Oct)

File checked: `rothschilds/production/acts/act5/act5.mp4`, rendered at 07:13. It runs 62.73 s at 1920x1080, 30 fps.

What I looked at:
- All three 1 fps 6x5 contact sheets.
- Full-resolution frames at 3, 10.5, 16, 20, 26, 31.5, 37, 40, 44, 48.5, 55 and 61 s.
- Crops of the zebra hooves against the subtitle box at 55 and 61 s.

## Round-1 issues

| # | Round 1 | Status |
|---|---------|--------|
| 1 | 5.04: the rival's feet were hidden by the subtitle | **FIXED.** Both men's shoes are at y≈915, with the oil pool under the rival. That is about 30 px clear of the box. I measured y≈915, not the y 835 the fixer reported, but it is clear either way. |
| 2 | 5.01: Nathaniel's foot was clipped by the subtitle | **FIXED.** He now stands at x≈1360–1460 with his feet at y≈945, right of the box edge at x≈1325. |
| 3 | Handshake: white box and flat bars | **FIXED.** Both the 5.03 inset and 5.05 now show two real hands with fingers wrapped, a thumb, white cuffs with gold links, and creased sleeves. There is no white backing. |
| 4 | 5.05: the document floated | **FIXED.** The paper lies flat on a wooden desk, with an inkwell and quill beside it and a shadow under it. The Shell stamp is on the paper and the camera pushes in slowly. The handshake is still a hovering icon above the desk (see LOW 3). |
| 5 | 5.02: the field was bare | **FIXED.** The field has rows of dead, twisted vine stocks on wires, with brown leaves on the ground and leaves falling. A worried grower with a sweat drop stands at the left, fully on screen with his feet visible. |
| 6 | 5.03: the pit had no detail | **FIXED.** The pit is now a terraced Big Hole with concentric benches. It has a headframe and winding wheel, two cableways on T-posts with buckets running down, about six diggers working the terraces, an ore cart, waste dumps and a tent camp. The two men stand clear of the posts, and the stray rod behind their necks is gone. |
| 7 | 5.04: the gusher looked like grey dots | **FIXED.** The gusher is an opaque black jet that mushrooms at the top. Droplets arc out and fall, and a black pool spreads at the derrick foot. It reads as oil. |
| 8 | Zebra legs behind the subtitle | **NOT FIXED. It got worse (see issue 1).** |
| 10 | 5.01: plain blob vines | **FIXED.** The vines have leafy stocks with purple grape clusters. A few of the old pale-green blobs still show between the rows (see LOW 2). |

## Issues

1. **51–62.7 s (5.06), MEDIUM: zebra hooves are now inside the subtitle box.**
   - Raising the road by 50 px moved the hooves from just below the box (round 1, y≈1040) to right inside it (now y≈995–1005).
   - At 61 s the middle zebra's hooves (x≈960–1050), and part of the lead zebra's, sit behind "to Buckingham Palace." At 55 s the third zebra's hooves sit behind "Walter Rothschild filled a museum with".
   - The box is semi-transparent, so the legs show faintly, but you can't see where the zebras touch the ground.
   - **Fix:** raise the road line about 90 px more, so the hooves land at y≈905–915 like the other grounded figures in this act. Alternatively, return it to below the box (hooves at y≥1035).

2. **10.5 s and the rest of 5.01, LOW:** some of the old pale-green blob vines still show between the new leafy vines, which looks like two layers of foliage. Remove the old blob layer from the plate.

3. **47–50.4 s (5.05) and 30.5–33 s (5.03 inset), LOW:** the handshake is a floating icon with no bodies. In 5.03 it sits in a circular inset, which works. In 5.05 it hangs in the air over the desk. Put it in an inset circle there too, or drop it now that the paper tells the story.

4. **30.5–33 s (5.03), LOW:**
   - The inset circle is slightly see-through, so the headframe shows faintly inside it and its cable hangs out of the bottom of the circle.
   - The cableway lines are drawn across two of the small diggers.
   - **Fix:** make the inset opaque, or move it clear of the headframe.

## Full qa_rules pass

| Rule | Result |
|------|--------|
| 1 (desks) | No characters at desks. The 5.05 desk holds only props. |
| 2 (seated) | Pass. Walter sits on the box seat with his feet on the footboard. |
| 3 (walkers) | Nathaniel, the grower, the miners, Rhodes, the oil men and the guard all stand on their ground planes. The zebras' grounding is hidden; see issue 1. |
| 4 (floating props) | Pass. The bottles stand on the ground with shadows. The paper lies on the desk. The diamonds sit on the tray. The coins and oil pool are on the ground. |
| 5–7 (held props) | Pass. The oil can is held by its handle and the reins are in Walter's hands. |
| 8 (no still frames) | Pass. Every shot moves (walks, falling leaves, the magnifier, the diggers, the gusher, the desk push, the team and the flag). |
| 9 (vehicles through architecture) | Pass. The carriage and team are drawn in front of the gate, with correct layering. |
| 10 (animals overlapping) | Pass. The three zebras stay spaced in single file with no overlap. |
| 11–13 (detail) | Pass. The vineyard, the dead field, the Big Hole, the Baku field, the study and the palace are all detailed now. |

**Audio: pass.**
- Integrated loudness -16.1 LUFS, LRA 3.8 LU, true peak -1.4 dBFS.
- I re-measured loudness only. The cues come from the same cue list, and round 1 showed no sound effect louder than the narration.

**Content: pass.**

**Decode: pass.** `ffmpeg -v error -i act5.mp4 -f null -` returned no errors.

0 high, 1 medium.

RESULT: FIXING
