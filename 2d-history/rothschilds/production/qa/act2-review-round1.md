# Act 2: Five Arrows, review round 1 (after Pushpam's "walking above the building" note, 31 Oct)

File checked: `rothschilds/production/acts/act2/act2.mp4` (53.52 s, 1920x1080, 30 fps, rendered 06:15).
Note: `scratchpad/rs-preview/act2.mp4` is a different encode (5.6 MB, md5 differs, same 53.5 s length). I checked the act file.
Method: qa_rules.md; qa.sh /watch sheets (sheets 1 and 2 built; sheet 3, the last frame only, failed with an ffmpeg option error); 1 fps
6x5 sheets (2); 6 fps sheet of 2.01; full-res frames and crops at 2.5, 5.9, 24.1, 25.6, 32.2, 45.0–45.7, 47.0, 52.5;
10 fps crops of the will hand-off and the gallop; act.html for the push code.

## Fix checks
- **2.01 walkers on the street: PARTLY FIXED.** When all five brothers stand (about 4.0–6.2 s), every pair of feet is on the cobbles at
  about y 935–945, clear of the house fronts (the outer brothers are right at the street edge but on stone). Feet stay just above the
  subtitle box: the shoes come within about 0–5 px of its top edge and are not covered. **But during the walk-in (about 0.8–3.8 s) each brother
  enters from the left edge across the house fronts.** Because the street edge runs diagonally, at x < ~230 the walk line y≈940 is
  on the house wall. See issue 1.
- **2.07 deathbed: MOSTLY FIXED.** The floor is now drawn (boards below y≈880). The will is held in the standing son's hand all
  through the shot and moves out to an offered position with a smooth in-between (no snap). The sons have more varied poses than before, though
  two are still copies of each other. New problems are in issues 3, 4 and 7.
- **2.03 and 2.05 camera pushes: FIXED.** `push(c,u,.04)` plus a backdrop zoom of 1.03 on both shots. The SSIM of a corner crop from the first frame to the last is
  0.975 / 0.978, against 0.994 for frames one apart, so the frame really moves. The crest bobs and rocks, and the quill moves. No frozen frames.

## Issues

1. **0.8–3.8 s (2.01), MEDIUM, rule 3: walkers on house fronts.** Each brother walks in from the left frame edge. For his first
   ~0.4–0.6 s on screen (x < ~230 px) his feet are on the lower wall and arches of the left-hand houses, not on the cobbles
   (clearest at 2.5 s: the green-suited brother's back foot is at x≈40–90, y≈940, on the house wall). Pushpam's note was about this
   exact problem. **Fix:** either start the walkers further right, so they enter from behind the subtitle area or from the vanishing
   point, or bring them in from frame-bottom-left along the street's diagonal edge. Another option is to clip the walker layer to the
   street polygon (in screen space: the edge from about (230,940) up to (790,650)) so they appear to step out from behind the corner house.

2. **44.9–45.6 s (2.06), MEDIUM: title over subtitle.** `K.title('INFORMATION = A FORTUNE', y: 1000)` sits in the subtitle band
   and collides with the subtitle "on its own." for about 0.6 s ("INFORM[on its own.]FORTUNE"). **Fix:** move the title to y≈160
   (or above the map's bottom edge, around y≈820), or start it after the subtitle clears.

3. **45.7–53.5 s (2.07), MEDIUM, rule 1: sons behind the bed have no legs.** The four sons behind the bed end at the mattress top.
   The space under the bed frame (y≈880–940, between the posts) shows empty floor, with no legs or feet behind it, so the sons read as
   torsos hovering behind the bed. **Fix:** draw their legs and feet on the floor behind the bed, visible through the gap under the frame. You could also give the
   bed a valance or blanket that hangs to the floor so the gap is closed.

4. **45.7–53.5 s (2.07), MEDIUM: standing son's feet under the "1812" tag.** The son holding the will stands at x≈1700–1790. His
   feet (y≈930) touch the tag at 47 s and are hidden behind the "1812" tag (x≈1700–1830, y≈930–990) from about 48 s on, so you can't see
   where he is grounded. **Fix:** move the tag to the bottom-left corner, or move the son about 150 px left (there is room between the
   candle table and the frame edge if the table moves left).

5. **24.0–26.8 s (2.04), MEDIUM, rules 4/5: floating letter.** A large sealed envelope pops up in the middle of the vineyard field at
   (1500,760). Nobody holds it and it rests on nothing, then it fades as "letter" is said. **Fix:** put the letter in the courier's hand
   or saddlebag (show him tucking it in), or make it a clearly framed inset card with a border and drop shadow, kept out of the scene.

6. **24.0–32.0 s (2.04), MEDIUM, rules 6/12: low-detail horse and an empty-handed rider.** The horse is a flat brown shape with
   stick legs. It has no mane, bridle, reins, saddle or hoof detail. The rider's hands reach forward and close on air because there are no reins.
   The gallop cycle itself reads fine. **Fix:** add a bridle and reins running to the rider's hands, a saddle and saddle-cloth, a mane and
   tail with motion, and shaded hooves (rules 6/12 detail level).

7. **45.7–53.5 s (2.07), LOW: two sons in identical poses.** The blue-suited son (2) and the brown-suited son (4) have the same pose: one
   arm across the body, hand on the blanket. **Fix:** give one of them a hand on the brother's shoulder or clasped hands.

8. **29–31 s (2.04), LOW:** the horse's hooves pass behind the subtitle box for about 1 s. Raise the ride line about 40 px.

9. **32–38.4 s (2.05), LOW:** the big letter and envelope float in front of the bookcase. This works as a stylised close-up insert, but a
   desk edge or a hand holding it at the bottom of frame would ground it.

10. **24.0–24.4 s, LOW:** the crossfade from 2.03 to 2.04 lays the crest, "SNAP" and "HOLDS" over the chateau for about 0.4 s. This is an
    ordinary dissolve and is acceptable. A shorter fade would be cleaner.

## Other checks
- Rule 2 (sitting): the courier sits on the horse. No other seated characters. Pass.
- Rules 9/10: no vehicles or animal teams in this act. Pass.
- Rule 11/13: the Frankfurt street, map, study and bedroom backdrops are painterly and period. Pass. The vineyard is plain but acceptable.
- Rule 8: something moves in every shot (walk, map arrows, crest bob, gallop, quill, map letters, candle flicker and push in 2.07). Pass.
- Audio: integrated -16.0 LUFS, LRA 3.3 LU, true peak -1.4 dBFS. Momentary max per 2 s window ranges from -12.2 to -15.7 LUFS with no spikes at SFX cues
  (hit, stamp, neigh, chime), so no SFX is louder than the narration. No pops heard or measured. Pass.
- Content: only stylised people, no swastikas, no Hitler, no antisemitic material. The Hebrew-letter Yiddish letter is shown neutrally. Pass.
- Decode: `ffmpeg -v error -i act2.mp4 -f null -` gives no errors. Pass.

RESULT: FIXING
