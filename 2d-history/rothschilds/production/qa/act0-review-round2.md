# Act 0 (cold open): review round 2

Checked: production/acts/act0/act0.mp4 (re-rendered 31 Oct 06:53; 1920x1080, 30 fps, 35.6 s), the /watch run (qa.sh rs0b, 2 sheets),
1 fps sheets (36 frames), a 10 fps step sheet for 0-5.4 s, and full-res frames at 1.4, 4.4, 4.65, 4.8, 11.9, 12.4, 12.9, 14, 23 and 34.5 s.
Every item in shared/qa_rules.md was checked again.

## Round-1 issues

| # | Round 1 | Round 2 |
|---|---|---|
| 1 | HIGH: the telegram floated on the messenger's thigh during the run | **Fixed.** At 10 fps through 0-4.6 s the sheet stays in the visible near hand on every stride (checked at full res at 1.4 and 4.4 s). It never touches the legs or body. |
| 2 | MEDIUM: run-to-stand snap at 4.6 s | **Fixed.** From 4.6 to 4.9 s the legs close and the arm rises with the sheet still in the hand, with no single-frame jump. |
| 3 | MEDIUM: Disraeli's desk lamp shade floated, and a paper corner poked up | **Fixed.** The whole brass lamp (base, stem, green shade) stands on the desk top. The paper corner is gone, and the quill sits in the inkwell. |
| 4 | LOW: desk chest-high on Disraeli | **Fixed.** Raised by 70 px, Disraeli now shows to the waist, with the desk edge at his belt. His head-to-waist height (255 px) matches the messenger's, so he stands on the floor behind the desk. No legs or feet show above the desk, so he does not fly. He stands through the whole shot, from 11.9 s on. |
| 5 | MEDIUM: the Westminster block was a plain box | **Fixed.** It now has a Gothic front: pinnacles, a crenellated parapet, quatrefoil frieze, lit pointed windows and a moulded arch. |
| 6 | LOW: the title card was almost still | **Fixed.** The crest pushes in slowly. Against the first title frame, 4,200 growing to 6,300 pixels change per 0.5 s, plus the grain. |

## Pushpam's three original notes (rechecked)
- **10 s, telegram in hand:** held in the hand at 10 s and for the whole run before it.
- **14 s, Disraeli standing on the desk or flying:** he stands behind the desk with his feet hidden, and the desk now meets his waist.
- **23 s, money floating:** the coin stacks, the note bundle and the grape plate sit on Lionel's desk top.

## Full qa_rules pass
- 1-3 (grounding): the messenger runs on the cobbles. Disraeli and Lionel stand behind their desks. The secretary and Lionel's visitor stand on the floor, and the secretary walks out (16-17.8 s) with his feet on the floor. Nobody is seated.
- 4-5 (props): the telegram is in hand everywhere (shots 1 and 2). The lamp, papers and inkwell sit on Disraeli's desk, and the money, book and grapes on Lionel's.
- 6-7 (books): the open book rests on Lionel's desk. The prop moves have in-betweens, and nothing crosses a body.
- 8 (no still frames): every shot moves (2,000-33,000 pixels per 0.5 s, the lowest being the title push and the 17.5 s door beat).
- 9, 10, 12 (vehicles, animals): none in this act.
- 11, 13 (detail): the Westminster plate is now detailed, the library and the red hall are detailed, and the map is period-styled.
- Labels: none cover the subtitles or a face.

## Audio
- Integrated -16.2 LUFS, LRA 5.9 LU, true peak -1.5 dBFS.
- I took the narration out of the mix (gain 1.79). The loudest leftover (effects and beds) is -23.3 dB RMS, against narration up to -10.4 dB. No effect is louder than the narration. No sample jumps, so no pops.

## Content
- The people are stylised and Disraeli's portrait has no face. No swastikas, no Hitler, no antisemitic material.

## Decode
- `ffmpeg -v error -i act0.mp4 -f null -` gives no errors.

## Issues
None.

Totals: 0 high, 0 medium, 0 low.

RESULT: CLEAN
