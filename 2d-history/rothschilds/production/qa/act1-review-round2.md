# Act 1 (The Boy From Jews' Street): review round 2

Checked: production/acts/act1/act1.mp4 (re-rendered 31 Oct 07:06; 1920x1080, 30 fps, 86.2 s), the /watch run (qa.sh rs1b, 4 sheets),
1 fps sheets (86 frames), step sheets for the coach (68.4-74.4 s, 5 fps), the courtyard walker (36.6-40.2 s, 5 fps) and the Judengasse child
(0-6 s, 3 fps), and full-res frames at 3, 26, 37.2, 37.5, 37.6, 39.9, 57.5, 70.6, 71.8 and 81 s. Every item in shared/qa_rules.md was checked again.

## Round-1 issues

| # | Round 1 | Round 2 |
|---|---|---|
| 1 | MEDIUM: the coach drove through the closed gate | **Fixed.** The coach now crosses the foreground road left to right (69.6-73.9 s) and leaves frame right. It never goes near the gate or any building. Old Mayer walks in from the left at about 73.8 s. |
| 2 | MEDIUM: the coach was a box with hoop wheels and oval horses | **Fixed.** It is now a detailed coach: a lacquered body with a lit window, door and crest, a coach lamp, red spoked wheels and a driver seated on a cushioned box with reins in hand. It is pulled by two bay horses with harness, eyes and tails. The horses walk in single file with a clear gap between them (rule 10), and their hooves stay on the road at the bottom of the frame. |
| 3 | MEDIUM: the Hanover lamp shade floated | **Fixed.** The whole brass lamp stands on the desk. |
| 4 | MEDIUM: the teal walker merged with a standing trader | **Fixed.** He walks through the gap between the second and fourth traders and settles beside the second. At no point is his body covered by another figure. For about 0.3 s at the start (36.6-37.3 s) his trailing hand brushes the fourth trader's hand (low, see below). |
| 5 | MEDIUM: the courtyard was flat | **Fixed.** It now has ashlar stonework, coloured shutters with window boxes, a clock, company signs on every arch (V.O.C., Wisselbank, East India Co., Beurs and others), a notice board on a pillar, crates and sacks on the paving, and pigeons on the ground. It reads as a period exchange. |
| 6 | LOW: the Hanover desk was chest-high and the hands merged | **Fixed.** The figures are raised, so the desk meets their waists, with no legs showing above it. The boy's quill hand and the banker's hand stay apart. |
| 7 | LOW: one hand on the open ledger | **Fixed.** Both hands now show, one on each edge of the open ledger (57.5 s). |
| 8 | LOW: the Wealth of Nations card had no surface | **Fixed.** It is now a card taped up with pinned corners, clearly a graphic. |
| 9 | LOW: the Judengasse child walked in front of the man | **Fixed.** The child stands on the right-hand pavement and starts walking at about 3.3 s, after the bearded man has passed. They never overlap. |
| 10 | LOW: faint blockade ships | **Fixed.** A detailed ship (hull, gunports, three masts, yards, a pennant and a lantern) sits on the water behind the quay. The smugglers walk in front of it on the quay. |

## Pushpam's two notes (rechecked)
- **36.4 s, characters "flying" in the courtyard:** all six traders and the walker stand on the paving. The benches and crates stand behind them, and nobody is on a bench or crate.
- **54.4 s, still frame and book hold:** Mayer walks in with the ledger closed against his chest, eases it open over about 0.33 s, holds it with both hands clear of his legs, and idles throughout.

## Full qa_rules pass
- 1-3 (grounding): every walker and stander has his feet on the street, paving, floor or quay. The coach driver sits on the box seat, and the Hanover figures stand behind the desk.
- 4-7 (props): the coins and ledger rest on the Hanover desk. The coin tray, the ledgers and the bales are held, the ledger moves are eased, and nothing crosses a leg.
- 8 (no still frames): the quietest moments (49.0, 61.0 and 68.5 s) are dissolves. Every shot moves.
- 9-10 (vehicles, animals): the coach stays on the open road and goes nowhere near a building or the gate. The horses keep their spacing.
- 11-13 (detail): the coach, ship and courtyard are now detailed, and so are the Judengasse, library, hall, 1806 street and quay.
- Labels: none cover the subtitles or a face.

## Issues
1. **36.6-37.3 s, LOW: the walker's hand brushes a trader's hand.** As he sets off, the teal walker's trailing hand briefly touches the fourth trader's
   front hand. They separate by 37.5 s. Optional: start him about 40 px further left.

## Audio
- Integrated -16.0 LUFS, LRA 3.3 LU, true peak -1.5 dBFS.
- I took the narration out of the mix (gain 1.71). The loudest leftover (effects and beds) is -21.9 dB RMS, against narration at -14.3 dB. No effect is louder than the narration.
- The only sample jump (45.06 s) is a consonant in the narration that is also in vo.wav. With the narration taken out, the leftover has no jumps, so no pops.

## Content
- The people are stylised. Napoleon appears only as text. The Judengasse and the trade bans are shown as historical facts. No swastikas, no Hitler.

## Decode
- `ffmpeg -v error -i act1.mp4 -f null -` gives no errors.

Totals: 0 high, 0 medium, 1 low.

RESULT: CLEAN
