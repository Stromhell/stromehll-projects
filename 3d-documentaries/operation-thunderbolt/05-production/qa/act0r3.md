# Act 0 QA, re-render 3 (act0.mp4, 50.4 s)
Verdict: NOT CLEAN. 4 issues (0 high, 3 medium, 1 low).
Shots: 0.1 00:00-00:08, 0.2 00:09-00:13, 0.3 00:13-00:19, 0.4 00:19-00:27, 0.5 00:27-00:34, 0.6 00:34-00:39, 0.7 00:39-00:47, 0.8 00:47-00:50.

| Shot | Time | Problem | Sev | Fix |
|---|---|---|---|---|
| 0.2 | 00:09-00:12 | Caption still sits on the map and covers the UGANDA label (the target country). The "RED SEA" tag sits bottom-right off the map, far from the Red Sea. | MEDIUM | Put the caption below the map, or shift the map up/right so Uganda is clear. Pin the Red Sea tag on the sea, or drop it. |
| 0.6 | 00:34-00:39 | Fixed: heads sit inside the window, faces lit, callout on Yoni. Still wrong: the Mercedes front is a flat slab and the star badge floats in front of it. Reads as cheap in a close shot. | MEDIUM | Add hood, grille, bumper and headlight shapes, and seat the badge on the grille or hood. |
| 0.7 | 00:39-00:44 | Fixed: the horizon now has terrain, with no hard seam. Still wrong: the lead truck seen from behind is a dark, untextured box with no tailgate, canvas or tail-light detail. | MEDIUM | Use a detailed truck model (canvas cover ribs, tailgate, tail lights) and add a rim light. |
| 0.3 | 00:13-00:19 | Better lit and camouflage shows. The fuselage is still smooth and low-detail for a close-up (no panel lines or rivets). | LOW | Add panel-line/normal texture to the fuselage and nacelles. |

Fixed since r2: engine close-up lighting and prop rings (0.3), vehicles readable on the ramp (0.4), terminal now has mattresses, luggage and posters, and the pillar is gone (0.5), car interior heads (0.6), horizon haze (0.7).
Checklist (render-qa-rules): hostages sit on mattresses, not on air. Nobody stands on furniture or air, and no props float. No frozen frames. No vehicle passes through the plane or a building. Detail-level hits are listed above (0.6, 0.7, 0.3). Shots 0.1, 0.4, 0.5 and 0.8 are clean.
