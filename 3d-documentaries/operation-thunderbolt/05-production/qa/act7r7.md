# Act 7 – render 7 QA
File: /home/user/work/tb3_acts/act7.mp4 (98.5 s). Looked at: the /watch frames, the 1 fps sheets act7r7_1fps_01..05, a 2 fps sheet of 7.9 (s79_01) and a 3 fps sheet of 7.11 (s711_01). Checked against render-qa-rules.md.
Shot map: 7.9 = 0:45.9-0:54.7, 7.11 = 1:03.4-1:08.3.

## Verdict: NOT clean. 2 medium items, 2 low items.

| Shot | Time | Problem | Severity | Fix |
|---|---|---|---|---|
| 7.11 | 1:05-1:08 | The orange route line runs straight through the "ETHIOPIA" label and hides a letter, so it reads "ETHIO A". The label overlaps the route. | MEDIUM | Draw the labels above the route (renderOrder/depth), or move the Ethiopia label west of the route. |
| 7.11 | 1:03-1:05 | The map edges and black void show in the top corners during the opening tilt. | MEDIUM | Start the camera tighter or extend the map plane past the frustum. |
| 7.11 | about 1:05.5 | The plane icon leaves the bottom of the frame mid-shot, and the rest of the shot shows only the line. | LOW | Have the camera follow the icon, or frame Lake Victoria/Entebbe. |
| 7.9 | 0:49-0:51 | The Hercules formation sinks out the bottom edge, partly cut off under the caption, while the 707s enter cut off at the top. The handoff looks clumsy. | LOW | Cut or crossfade earlier, or keep the C-130s in frame until the tilt finishes. |

## Rest of act
7.9 otherwise: the props spin, the 707s read as 707s, the labels don't overlap and the soft cloud foreground moves.
The other shots are unchanged from r6 and pass the scan. The r6 LOW item on 7.13 (chunky tyres) is still open.
Checklist: grounding OK, the commando stands on the floor, every shot moves, and no vehicle overlaps anything.
