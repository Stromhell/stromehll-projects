# Act 1 QA, round 2 (act1.mp4, 119 s)

**Not clean.** One HIGH problem and several MEDIUM/LOW ones.

| Time | Shot | Sev | Problem | Fix |
|---|---|---|---|---|
| 00:55–00:59 | 1.10 (tb3_act1.js:335) | HIGH | About 4 s of almost black screen. The camera starts at z=-4.5 inside or right behind a seat back or bulkhead, so a black slab fills the frame except thin cabin strips at the edges (full-res frame z_57.jpg). The scene only appears at 00:59. | Start the dolly at a free aisle point in front of the obstruction, e.g. pos [0,1.55,-1.5] → [0,1.5,-0.3]. Or hide the seat or bulkhead meshes within about 0.6 m of the camera. Check that frame 0 shows the cabin. |
| 00:45–00:50 | 1.8 | MEDIUM | Overhead cutaway of the cabin floats in a pure black void with no fuselage shell. It looks unfinished and cheap. The same look recurs at 01:54 (1.18 end) and 01:40–01:44 (1.18). | Add a fuselage hull, a sky or cloud backdrop, or a dark gradient with a fog floor, so the cutaway reads as an intentional diagram. |
| 01:15 | 1.13 | MEDIUM | "MICHEL BACOS / CAPTAIN" label is cut off at the left frame edge (full-res frame z_75.jpg). It also stays on the over-shoulder shot while the caption says "the co-pilot" and then "the flight engineer" (01:20–01:21), so the label points at the wrong man. | Clamp the label inside a 5% safe margin. Show it only while Bacos is the subject, and hide it on the co-pilot and engineer beats. |
| 01:43 | 1.18 | LOW | A faint caption ghost ("the whole plane is theirs") appears at top centre over the cabin wall while the real caption is at bottom right. Two caption positions show in the same frame. | Fade out the top caption before the bottom one appears, or keep one caption position per shot. |
| 00:03–00:05 | 1.1 | LOW | The caption jumps from top to bottom in the middle of the shot ("Tel Aviv, Sunday 27 June 1976"). | Keep the caption in one position for the whole shot. |
| 00:12–00:13 | 1.3 | LOW | The map label "EGYPT" sits right under or against the caption ("just before nine in the morning"). | Move the caption up or the label down, or hide the EGYPT label. |
| 00:25 | 1.5 | LOW | The OFF counter tag pops in at a tiny scale ("OFF 0") for one frame before reaching full size. | Ease the scale-in over about 0.3 s, or start the tag at full size with an opacity fade. |
| 01:54 | 1.19 | LOW | About 1 s of empty brown table before the newspapers drop in. It reads as a dead frame. | Start the papers already falling at t=0, or trim the lead-in. |

Checklist (render-qa-rules) on all 1 fps sheets: grounding is fine (seated people are in seats, walkers are on the floor). Held props pass: newspaper 0:21, microphone 1:35. No frozen frames over 2 s except the black stretch in 1.10. No vehicle overlaps. Detail level falls short only on the black-void cabin cutaways (listed above). Intended items are not flagged: the departures-board scramble at 0:06, the silhouetted hijackers, and the newspapers in mid-fall at 1:55.
