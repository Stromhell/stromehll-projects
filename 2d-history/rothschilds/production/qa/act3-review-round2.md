# Act 3 (Waterloo and the real money): review round 2

Checked: production/acts/act3/act3.mp4 (re-rendered 31 Oct 07:20; 1920x1080, 30 fps, 49.5 s), the /watch run (qa.sh rs3b, 3 sheets),
1 fps sheets (50 frames), a 5 fps step sheet for 9.6-15.6 s (Waterloo), and full-res frames at 2, 12.2, 13.2, 14.6, 26 and 44 s.
Every item in shared/qa_rules.md was checked again.

## Round-1 issues

| # | Round 1 | Round 2 |
|---|---|---|
| 1 | MEDIUM: gun B fired out of the officer's body | **Fixed.** The officer now stands further right (world x 1730). Gun B's muzzle flash and star burst (12.2, 13.2 and 15.0 s) sit in clear field between the rear gunner and the officer, at least 100 px from his body. His pointing hand stops short of the flagpole, and the eagle falls to the right, away from him. |
| 2 | MEDIUM: the cavalry horses were llama-like | **Fixed.** The three cavalry horses (bay, black, bay) now have a deep chest, jointed legs with hooves, mane, tail, saddle cloth and bridle. The red-coated riders sit in the saddle with sabres raised. The horses are well apart and never overlap (rule 10). |
| 3 | MEDIUM: the dock ship had little detail | **Fixed.** The main ship has a shaded hull with wale and gunports, three masts with yards and furled sails, rigging and a red pennant. A second, smaller ship of the same build sits further off. Both sit on the water. |
| 4 | LOW: the eagle fell right at the cut | **Fixed.** It now falls at 14.2-14.6 s and lies on the ground for about 0.6 s before the dissolve. |
| 5 | LOW: the quill stood on its nib | **Fixed.** The quill lies flat on the desk at an angle, beside the pamphlet. |
| 6 | LOW: the code comment mentioned a gangway | Unchanged and still not a rule hit. The porters walk along the quay holding their chests. |

## Points the coordinator asked about
- **Waterloo is a full battlefield:** a smoke sky, Hougoumont burning, the British line with its colours, the French columns, cavalry, two crewed field guns firing, craters, ruts, debris, cannonballs, a burning wagon and the falling eagle. Rule 11 is met.
- **Grounding at Waterloo:**
  - the left gunner stands on the field;
  - the rear gunner stands behind gun B, with his feet level with its wheel;
  - the officer's legs run down behind the subtitle;
  - the cavalry hooves are on the ground;
  - the flagpole is planted in the field.
  Nothing floats, and nothing overlaps.
- **Desk props:** the 3.04 pamphlet, the history book, coins and quill lie flat on the desk. The 3.05 ledgers settle into a stack on the desk, and the chart board stands on it.
- **Varied poses (3.06):** the brothers are bearded, gesturing, one is cheering with both arms up, and one waves. They stand on the floor with gaps between them. The coat of arms is small and hangs over the door.

## Full qa_rules pass
- 1-3 (grounding): the porters and Nathan on the quay, the gunners, the officer and the cavalry, the 3.03 traders and Nathan, and the brothers and the emperor all have their feet on the ground or floor. Nobody stands on furniture, and nobody is seated.
- 4-7 (props): the chests, linstock and rammer are held. The desk props rest on the desk, and the ledgers land on the stack. Nothing crosses a body.
- 8 (no still frames): every shot moves. The quietest stretch is the 3.04 desk close-up (25-27.5 s and 33-34.5 s, 1,000-2,700 pixels per 0.5 s). There the camera drifts, the light flickers and the stamp and book animate.
- 9 (vehicles): the only vehicle is the wrecked wagon, and nothing crosses any architecture.
- 10 (animals): the cavalry horses keep apart.
- 11-13 (detail): the battlefield, ships, exchange, library and hall are detailed, and every scene has period dress.
- Labels: none cover the subtitles or a face.

## Audio
- Integrated -16.1 LUFS, LRA 3.3 LU, true peak -1.5 dBFS.
- I took the narration out of the mix (gain 1.6). The loudest leftover is -23.2 dB RMS, against narration at -14.3 dB. The battle effects stay at least 8 dB under the narration,
  and the hit at 14.8 s falls in a narration pause. No effect is louder than the narration. No sample jumps, so no pops.

## Content
- Nathan, the brothers and Emperor Francis are stylised. Napoleon is not drawn.
- 3.04: the antisemitic pamphlet is fully blurred and stamped MYTH, as script line 3.04 asks. It is captioned "SOME OPENLY ANTISEMITIC" and followed by the historians' account. No swastikas, no Hitler.

## Decode
- `ffmpeg -v error -i act3.mp4 -f null -` gives no errors.

## Issues
None open. (The gangway point above is a note on the code comment, not an issue.)

Totals: 0 high, 0 medium, 0 low.

RESULT: CLEAN
