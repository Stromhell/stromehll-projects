# Act 0 (cold open): review round 1, after Pushpam's 31 Oct notes

Checked: production/acts/act0/act0.mp4 (1920x1080, 30 fps, 35.6 s), the /watch run (qa.sh rs0, 2 sheets), 1 fps sheets
(36 frames), 5-6 fps step sheets for 0-4.8 s, 3.5-6.5 s and 15-18 s, and full-res crops at 1.4, 2.6, 4.2-4.7, 10, 14, 16.2-16.8 and 23 s.
Every item in shared/qa_rules.md was checked.

## Pushpam's three notes

| Note | Status |
|---|---|
| 10 s: telegram should be in the messenger's hand | **Fixed at 10 s only.** From 4.67 s on (standing pose) the sheet sits in the outstretched hand with the thumb over its edge. During the run (0.4-4.6 s) it still comes loose from the hand. See issues 1 and 2. |
| 14 s: Disraeli standing on the desk / flying | **Fixed.** The new desk covers him below the chest, and no feet or legs show above the desk top. Two side effects: issues 3 and 4. |
| 23 s: money floating above the table | **Fixed.** The coin stacks and the note bundle sit on Lionel's desk top with their bottom edges touching it. The grapes are on a plate on the desk, and the one in Lionel's hand is held at his fingertips. |

## Issues

1. **0.4-4.6 s, HIGH (rules 5, 7): the telegram floats on the messenger's thigh during the run.** In every stride where the near arm
   swings forward, that hand is an empty fist and the sheet is drawn on his belt or thigh with no hand on it (clear at 1.4, 4.2, 4.4 and 4.6 s).
   It looks held only when the near hand happens to swing back to the hip, as at 2.6 s. It seems to follow the far arm, which is hidden behind
   the body, while being drawn in front of the legs. This is the same thing Pushpam caught.
   Fix: in the run, put the telegram in the visible near hand and hold that arm in a fixed carry pose (bent at the elbow, no swing), so the
   sheet never leaves the hand and never covers the legs.

2. **4.6 to 4.67 s, MEDIUM (rule 6): abrupt snap from run to stand.** In one frame the run pose becomes the `present` pose, and the telegram
   jumps from his thigh to the outstretched hand.
   Fix: blend the walk end into `present` over about 0.3 s, so the arm rises with the sheet in the hand and the legs come together.

3. **11.5-17.8 s, MEDIUM (rule 4): the desk lamp shade floats.** On Disraeli's desk, to the right of the inkwell, the green lamp shade hangs in the air above the desk.
   A faint pale stem comes up from the desk top but stops well short of the shade, so the shade reads as floating against the bookshelf. The lamp base
   was probably hidden when the new desk was drawn over him. There is also a small white paper corner poking up at the back right edge of the desk top.
   Fix: draw the whole lamp (base on the desk top, a solid stem up to the shade) above the new desk, or remove the shade. Settle or remove the paper corner.

4. **11.5-17.8 s, LOW (not a rule hit, a side effect of the 14 s fix): the desk is chest-high on Disraeli.** Only his head, shoulders and
   pointing arm show above the desk top (desk top at y 640, his shoulders at y 580). Measured against the messenger, the desk stands taller than a
   man's waist, so it reads like a shop counter. Grounding is now correct, and this is only proportion.
   Fix (optional): lower the desk top by about 60-80 px, or raise Disraeli by the same amount, so the desk edge meets his waist while his feet stay hidden.

5. **0-11.5 s, MEDIUM (rule 11): a blocky building in the centre of the Westminster backdrop.** The building behind the messenger is a plain grey
   rectangle with one arch and plain steps. Big Ben, the Parliament tower silhouettes, the lamps and the cobbles are fine. Pushpam did not call
   this out, so it ranks below issues 1-3.
   Fix: add facade detail to the block (Gothic windows, buttresses, a parapet, a few lit windows through the fog).

6. **33.0-35.6 s, LOW (rule 8): the title card is almost still.** Once "RICHER THAN KINGS" lands, the only movement is grain and glow flicker
   (about 1,300 pixels changing per 0.1 s). There is no character in the shot, so this is not a hit under rule 8.
   Fix (optional): a slow push-in on the crest, or a soft glow pulse.

## Rules with no hits
- 1 (standing on furniture): Disraeli and Lionel stand behind their desks with their feet hidden. The messenger, the secretary and Lionel's visitor all stand on the floor.
- 2 (sitting on air): no seated characters.
- 3 (walking above buildings): the messenger runs on the cobbles, and the secretary walks out on the floor (16.0-17.8 s, telegram held the whole way).
- 6 (books): the open book on Lionel's desk rests on the desk, and nobody holds it.
- 8 (no still frames): the idles are working. Every character shot changes between 3,000 and 33,000 pixels per 0.5 s.
- 9, 10, 12 (vehicles, animals): none in this act.
- 13 (period detail): top hats, gas lamps, Big Ben, the 1875 map.
- Labels: none cover the subtitles or a face. The money counter at 8-11 s sits just above the hat without touching it.

## Audio
- Integrated -16.2 LUFS (target about -16), LRA 5.9 LU, true peak -1.5 dBFS.
- The narration ends at 30.5 s. The title sting (stamp, hit, swell, 31.5-32.5 s) peaks at -15.7 LUFS momentary, below the loudest narration
  in the mix (-12.4 LUFS). The hit at 28.8 s falls in a narration pause. No SFX is louder than the narration.
- No sample jumps over 0.25 in mix.wav, so no pops.

## Content
- Disraeli and Lionel de Rothschild are stylised cartoons, and the portrait above the fireplace has no face. No swastikas, no Hitler, no antisemitic material.

## Decode
- `ffmpeg -v error -i act0.mp4 -f null -` gives no errors (both the production file and the rs-preview copy).

Totals: 1 high, 3 medium, 2 low.

RESULT: FIXING
