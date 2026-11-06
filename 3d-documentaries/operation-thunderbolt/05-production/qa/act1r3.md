# Act 1 QA, round 3 (act1.mp4, 119 s)
**Not clean.** 1 HIGH, 3 MEDIUM, 1 LOW. Shot starts from act1.timing.json: 1.7 39.17, 1.8 44.69, 1.10 55.03, 1.12 72.14, 1.17 98.84, 1.19 114.31.

| Time | Shot | Sev | Problem | Fix |
|---|---|---|---|---|
| 00:55–00:59 | 1.10 | HIGH | NOT FIXED. About 4 s of near-black frame. A black slab fills the frame except cabin strips at the left and right edges (z_57.jpg). The scene only appears at 01:00. | The camera-path change did not take effect, or the start point is still inside a seat back or bulkhead. Move the dolly start clear of the obstruction (e.g. [0,1.55,-1.5]), or hide meshes within 0.6 m of the camera. Check frame 0. |
| 01:39–01:45 | 1.17 | MEDIUM | OVERLAP: the countdown chip (2:41→0:10) sits on top of the cabin. At 01:44 it covers rows of passengers and seat backs (z_104.5.jpg), and at 01:42–01:43 it sits on the hull edge. | Pin the timer in empty void (top-left, which is dark), or give it a solid plate placed outside the cutaway's frame area. |
| 00:45–00:50 | 1.8 (also 1.17) | MEDIUM | The hull shell now shows on one side only. The cutaway still floats in a plain black void, which looks unfinished. | Add a gradient or fog floor or a sky backdrop behind the cutaway. |
| 00:41 | 1.7 | MEDIUM | Two captions show at once: "Four of the new passengers walk straight" at the top and again at the bottom. | Keep one caption position per shot. Clear the old caption before the new one appears. |
| 01:43 | 1.17 | LOW | The bottom-right caption "the whole plane is theirs" fades in very faint for about 1 s. | Make the fade in faster (about 0.2 s). |

Fixed and verified: 1.1 caption stays in one place; 1.3 EGYPT label is clear; 1.5 counters fade in; 1.12 Bacos label sits inside the frame and is gone by the co-pilot beat; 1.19 papers are already falling at the start; no stale overlays.
Checklist: seated people are in seats, walkers are on the floor, the microphone is held at 01:46+, nothing floats, there are no frozen frames over 2 s apart from 1.10 black, there are no vehicle overlaps.
