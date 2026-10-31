# Act 1 (The Boy From Jews' Street): review round 1, after Pushpam's 31 Oct notes

Checked: production/acts/act1/act1.mp4 (1920x1080, 30 fps, 86.2 s), the /watch run (qa.sh rs1, 4 sheets), 1 fps sheets
(3 sheets, 86 frames), step sheets at 5-6 fps for 36-38.4 s, 43.5-45.5 s, 53.6-57.2 s and 68.4-73.4 s, and full-res frames at 3, 26, 33,
36.6, 37.4, 38, 40, 54.8, 56.1, 57.5, 70, 74 and 82 s. Every item in shared/qa_rules.md was checked.

## Pushpam's two notes

| Note | Status |
|---|---|
| Act 36.4 s (full 1:12): "character standing in desk looks like he is flying" | **Fixed.** In the exchange courtyard (1.06) all six traders stand on the paving, with feet at y 985-1030. The two benches sit behind them, bench legs ending at y 945. Nobody stands on a bench, and nothing floats in the cross-dissolve at 36.4-36.8 s. The Hanover desk (1.04) is also clean: the boy and the banker show no legs above the desk top. See issue 4 for a new overlap just after this point. |
| Act 54.4 s (full 1:30): still frame and an abrupt book hold that overlapped the legs | **Fixed.** Mayer walks in from 53.9 to 55.9 s with the ledger closed against his chest, and the far hand's fingers grip its edge. Between 56.1 and 56.4 s it turns edge-on, then opens, a move of about 0.33 s. From then on it is held open at chest height, well clear of his legs. The idle motion works: 16,000-21,000 pixels change per 0.5 s through to 61 s. See issue 7 for a small hand point. |

## Issues

1. **70.4-73.2 s, MEDIUM (rule 9): the prince's carriage drives through the closed city gate.** As it shrinks toward the gate, its horses
   (the two black ovals) and then the body are drawn over the portcullis bars. The gate never opens, and the carriage is still visible
   inside the gate at 73.2 s.
   Fix: open the gate before the carriage arrives, or put the carriage behind the gate layer and fade it out once it reaches the gate.

2. **69.0-73.2 s, MEDIUM (rule 12): the carriage has very little detail.** It is a plain black box with a gold panel. The wheels are bare hoops with no spokes, and
   the "horses" are two black ovals with no legs or harness.
   Fix: draw a real coach, with spoked wheels, doors with windows, lamps, a driver on the box, and two horses seen from behind with legs, tails and harness.

3. **23.0-31.0 s, MEDIUM (rule 4): the desk lamp shade floats.** This is the same library plate as act 0. The green lamp shade sits behind the banker's
   right shoulder above the desk, and its faint stem stops short of it. The fix should go into the shared plate, so act 0 and act 1 are fixed together.
   Fix: draw the whole lamp, with its base on the desk top and a solid stem up to the shade, over the redrawn desk, or remove the shade.

4. **37.0-38.2 s, MEDIUM (overlap rule, 29 Oct): the walking trader merges with a standing trader.** The trader in the teal suit walks in
   behind the brown-suited trader, the second from the left. At 37.4 s only his face and one shoulder show behind the other man, and the two
   bodies read as one figure with two heads.
   Fix: start his walk to the right of the brown trader, or route him across in front with a clear gap. The layering is right, and he only needs to avoid being covered by a whole body.

5. **36.6-50.0 s, MEDIUM (rules 11 and 13): the exchange courtyard is flat.** It shows a plain wall, a row of identical windows, an empty
   arcade and a bare tiled floor. The scene stands for "banks, stock exchanges and trading companies" in Amsterdam and London over a century,
   but it has no period detail of a busy exchange. Pushpam did not call this out, so it ranks below issues 1-4.
   Fix: add an exchange clock, signboards or ship-company notices in the arcades, a few more distant traders, papers and ledgers, and some shading and ornament on the facade.

6. **23.0-31.0 s, LOW (proportion, not a rule hit): the Hanover desk is too high for the boy.** The redrawn desk top comes up to the 13-year-old's armpit and the banker's
   chest, so it looks like a counter (the same as act 0). Around 25.5-26.5 s the banker's reaching hand also lands on top of the boy's
   quill hand, and the two hands merge into one lump.
   Fix (optional): lower the desk top by about 60 px. Stop the banker's point about 40 px short of the boy's hand.

7. **56.4-61.0 s, LOW (rule 6): the open ledger shows only one hand.** The open ledger is supposed to be held with both hands, but only the far hand shows, at the right edge.
   No hand shows on the left edge, so the left half looks unsupported.
   Fix: draw the near hand's thumb and fingers on the left page edge.

8. **44.5-49.5 s, LOW (graphic or prop?): The Wealth of Nations has no surface.** The book appears in mid-air beside a trader's hand
   (44.67 s), then grows into a large card with a drop shadow. The act.html comment says it "slaps onto the desk", but this shot has no desk.
   As a callout graphic it reads fine. If it is meant as a prop, it floats (rule 4), and it should land on a table or in a trader's hands.

9. **2.0-4.5 s, LOW (overlap): the bearded man walks across in front of the child.** The child is smaller and further back, so the
   depth reads correctly, and they separate by 5 s. Optional: offset the child's path by about 80 px.

10. **78-86 s, LOW (rule 12, background only): the blockade ships are very faint.** The ships behind the quay are masts and lines in fog. They are
    background and in fog, so this is not a hit. Optional: add one clearer hull with rigging and a lantern.

## Rules with no hits
- 1-3 (grounding): the Judengasse walkers, Mayer at the noble's gate, the traders, Mayer in the Hesse-Kassel hall, Mayer in the 1806 street and the three smugglers
  all have their feet on the street, path, floor or quay. The figures behind the Hanover desk show no legs above it. No seated figures.
- 4-5 (props): the coins and ledger rest on the Hanover desk. The coin tray (32-35 s), the ledgers (54-61 and 69-77 s) and the smugglers' bales are all held in hands.
- 6-7 (books): the ledger eases from closed to open (issue 7 is minor), and nothing overlaps the legs.
- 8 (no still frames): the quietest points are cuts and dissolves (49.0, 61.0 and 77.5 s), and every shot otherwise moves. Mayer in the 1806 street breathes while the carriage leaves.
- 10 (animals): only the carriage horses (issue 2), and they do not overlap.
- 13 (period detail): the Judengasse and the 1806 street are detailed, and the maps are period-styled.
- Labels: none cover the subtitles or a face.

## Audio
- Integrated -16.0 LUFS (target about -16), LRA 3.3 LU, true peak -1.5 dBFS.
- Effects and beds against narration: I took the narration out of the mix (narration gain 1.71). The loudest leftover (effects and beds) is -21.9 dB RMS at 0.8-1.6 s,
  against narration at -14 dB in the same windows. Everywhere else it sits at least 7 dB under the narration. No effect is louder than the narration.
- The one sample jump over 0.25 (45.06 s) is also in vo.wav. It is a consonant in the narration, not a pop.

## Content
- Mayer, the banker and Prince William are stylised cartoons. Napoleon appears only as text. No swastikas, no Hitler.
- The Judengasse and the trade bans are shown as historical facts, and there is no antisemitic imagery.

## Decode
- `ffmpeg -v error -i act1.mp4 -f null -` gives no errors.

Totals: 0 high, 5 medium, 5 low.

RESULT: FIXING
