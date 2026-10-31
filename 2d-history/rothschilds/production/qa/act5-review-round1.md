# Act 5: Beyond Banking, review round 1 (after Pushpam's review, 31 Oct)

File checked: `rothschilds/production/acts/act5/act5.mp4` (62.73 s, 1920x1080, 30 fps, rendered 06:30).
Method:
- read qa_rules.md and ran the qa.sh /watch sheets (3 sheets, 39 frames)
- read the 1 fps 6x5 sheets (3)
- strips of 5.06 (3–6 fps, plus 30 fps of the guard's pose change) and of 5.04 (1.5 and 2.5 fps)
- full-res frames and crops at 4, 10.5, 29, 31.5, 40, 48, 49.3, 52, 55, 57.5, 58.9, 61
- read act.html for 5.06

## Pushpam's notes
- **Zebras overlapping, need more detail: FIXED.** 5.06 (50.4–62.7 s) has three zebras in single file. The gap stays about
  330–340 px on screen in every frame I stepped through, and no zebra touches another. Each has a bridle, a collar, a back-pad with a terret,
  traces to the zebra behind, and reins to Walter's hands. The legs move in a trot, with hoof dust while moving. The team halts at about 59 s.
  Where the team crosses architecture (left gate pillar and bars, the topiary tub, the right gate), the layering is correct: the zebras and the carriage are drawn in
  front, and nothing cuts through. The carriage has spoked turning wheels, a window, a lamp, a crest and a roof rail.
- **Character sitting on air: FIXED.** Walter sits on a red cushioned box seat with his feet on the curved footboard (crop at 58.9 s). The
  gate bars are drawn behind him and the dash, and his hands hold the reins. He waves at about 60.6–62 s.

## Other fixer changes, checked
- Oil (5.04): the rival holds the oil can by its handle. The oil pools, barrels, pipeline and the walk-in with a change of pose are all present.
- Vineyard (5.01): the bottles stand on the ground with contact shadows. Nathaniel walks in, then turns to point.
- Diamonds (5.03): the poses change (arms raised in a cheer, the other man presents).
- Shell insert (5.05): the document and the handshake drift slowly. Not frozen.
- 5.06 guard: the pose change from stand to present is tweened over about 0.3 s (30 fps strip). Not a snap.

## Issues

1. **36–46 s (5.04), MEDIUM: the rival's feet are hidden by the subtitle.** The green-suited rival with the oil can stands at x≈940–1000.
   His legs run down to y≈945, the top of the subtitle box, so his shoes and the pool he stands in are behind the subtitle. You can't see where
   he is grounded. **Fix:** move his stand line up about 70 px (feet at about y 870–880) or move him right of x 1320. Keep the oil pool
   under him.

2. **≈4–12 s (5.01), MEDIUM: Nathaniel's front foot is clipped by the subtitle box.** Standing at x≈1310–1390, his near shoe (y≈965–985)
   is half behind the right edge of the subtitle box (x≈1325). **Fix:** move him about 80 px right, or raise his stand line about 40 px.

3. **30.5–33 s (5.03 inset) and 46.5–50.4 s (5.05), MEDIUM: glitch in the handshake icon, and low detail.** A white rectangle shows
   behind the oval of clasped hands (its corners stick out above and below the oval at about x 890–1030, y 320–395 in 5.05). Each
   "arm" is a flat rounded bar with no hand shapes, so it reads as a placeholder. **Fix:** remove the white backing rect. Draw two hands
   with thumbs and fingers wrapped, and add cuffs and sleeve folds.

4. **46.1–50.4 s (5.05), MEDIUM, rules 4/5: the document floats.** The "SALE OF OIL INTERESTS" paper hangs in mid-air in front of the
   bookcase. It does not rest on anything and nobody holds it. **Fix:** lay it on a desk top in the foreground, with the stamp coming down onto it, or
   have the two handshake hands hold the paper between them.

5. **12.2–23.4 s (5.02), MEDIUM, rule 11: bare field.** After the vines "wither" the plate is plain brown ground with tiny tick marks for
   11 s. There are no withered vine stocks, stakes, wires or dead leaves, and no people. **Fix:** draw rows of dead and brown vine stocks on stakes and
   wires, curled leaves and a few bare patches. Optionally add a worried grower in the background.

6. **24.0–33.1 s (5.03), MEDIUM, rules 11/13: the diamond pit has no detail.** The "deep diamond pit" is a dark ellipse with radial lines on an
   empty desert. There are no terraces, claim ropes, headgear, buckets, carts or diggers. **Fix:** paint the Kimberley "Big Hole" with
   stepped terraces and claim walls, the cableways that run into it, a winding wheel, carts and a few distant diggers.

7. **35.5–46 s (5.04), MEDIUM, rules 11/12: the oil gusher is low detail.** The gusher is a column of grey, semi-transparent circles. When it first
   rises it forms a chevron of beads, and it reads as smoke dots, not oil. **Fix:** draw a black-brown oil jet with a solid core and spray at
   the top, with drips falling back and a dark pool and splatter around the derrick base.

8. **51–62.7 s (5.06), LOW: zebra legs behind the subtitle.** The middle zebra's legs (and for a while the third's) pass behind the subtitle box. The hooves still show
   below it at y≈1040. **Fix:** raise the road line (y 1392 in plate space) by about 50 px.

9. **24–33 s (5.03), LOW: stray rod.** A short brown rod sticks out sideways behind both men's necks at shoulder height (x≈305–340 on the left man, x≈1495 on
   the right man). It reads as a stray prop or a hidden arm. Remove it or make it a visible pickaxe on the miner's back.

10. **0–12 s (5.01), LOW:** the vine rows are uniform green blobs. They work, but they are plain next to the chateau. Leaves and stakes would help.

## Other checks
- Rule 1 (desks): none in this act. Rule 2 (seated): Walter has a seat. Pass. Rule 3 (walkers): Nathaniel, the miner and the rival walk on the ground
  plane. Pass. Rule 6/7: the oil can is held by its handle, and the bottles are not held. Pass. Rule 8: something moves in every shot (walks,
  magnifier, smoke, gusher, drift, team, flag, birds). Pass. Rules 9/10: covered above. Pass. Rule 12: carriage pass. The gusher is in issue 7.
- Audio: integrated -16.1 LUFS, LRA 3.8 LU, true peak -1.4 dBFS. The momentary max per 2 s window ranges from -11.8 to -15.9 LUFS. Through 5.06 the
  bed and hooves rise by about the same amount as the VO (VO→mix gain 4.2 dB against 4.6 dB in 5.04), so no sound effect is louder than the narration. No pops. Pass.
- Content: real people (Nathaniel, James, Rhodes, Walter) are stylised. No swastikas, no Hitler, no antisemitic material. The Shell logo appears as a
  stylised shell stamp. Pass.
- Decode: `ffmpeg -v error -i act5.mp4 -f null -` gives no errors. Pass.

RESULT: FIXING
