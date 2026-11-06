# Act 1 QA, round 4 (act1.mp4, 119 s)
**Not clean.** 1 HIGH, 1 MEDIUM. Shot starts: 1.7 39.17, 1.8 44.69, 1.10 55.03, 1.17 98.84.

| Time | Shot | Sev | Problem | Fix |
|---|---|---|---|---|
| 00:55–00:59 | 1.10 | HIGH | NOT FIXED (3rd round). Black slab fills about 90% of the frame for about 4 s, with cabin slivers at the left and right edges (z_57.jpg). The scene appears only at 01:00. | The near-mesh hiding did not take effect. Check that it runs before the first frame and that its radius covers the object in front of the camera (probably a seat back or bulkhead, more than 0.6 m away). Otherwise move the dolly start clear of it. Check frame 0 of the shot. |
| 00:45–00:50 | 1.8 | MEDIUM | NOT FIXED. The caption still moves: top at 00:45, bottom at 00:46–00:48 ("Two of them sit in first class" / "Two sit in economy" / "They look like everyone else"), then top again at 00:49–00:50 (z_46, z_49). | Lock 1.8 to one caption position, the bottom, for the whole shot. |

Verified fixed: 1.7 shows a single caption (top only, 00:39–00:43). The 1.8 and 1.17 cutaways have a blue gradient backdrop and no plain black void. 1.17 countdown is pinned top-left (2:41→0:11), clear of the cabin, and its caption is at the bottom with no overlap and no faint fade-in.
Whole-act scan: no other issues. Seated people are in seats, walkers are on the floor, the microphone is held from 01:46, newspapers rest on the table, nothing floats, there are no frozen frames over 2 s apart from the 1.10 black, there are no vehicle overlaps, and labels are inside the frame. Black at 01:59 is the end fade.
