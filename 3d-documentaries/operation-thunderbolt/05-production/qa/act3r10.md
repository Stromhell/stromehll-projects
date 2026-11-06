# Act 3 QA (act3r10) - /home/user/work/tb3_acts/act3.mp4 (95.2 s)

Verdict: NOT CLEAN (2 MEDIUM, 1 LOW)

| Time | Shot | Problem | Severity | Fix |
|---|---|---|---|---|
| 00:00-00:01 | 3.1 | The fix did not land. Frame 0 (full-res) has no caption, and at 1 s it is still fading in. It is at the bottom band, but it is not there from frame 0. | MEDIUM | Set the caption opacity to 1 at frame 0, with no fade-in. |
| 00:04.7-00:12.2 | 3.2 | Frozen pose (rule 8): Amin stands in the same arms-down pose for about 7.5 s. At 2 fps only a slow camera drift and the caption change; there is no gesture or weight shift. | MEDIUM | Add idle sway and breathing plus one or two gestures (a head turn, a hand move) during "He was loud, unpredictable". |
| 00:15-00:18 | 3.3 | Nothing covers TANZANIA any more: the badge sits above it and the caption is in the top band. But the camera push-in moves TANZANIA out of the bottom of the frame from about 15 s. | LOW | End the push a little wider if TANZANIA should stay readable. |

Checked and OK:
- 3.3 at 00:14: TANZANIA shows below the badge.
- 3.11 (00:59.7-01:06.3) walking line, 4 fps strip: the walkers move across the ground and nobody walks in place.
- 3.12 (01:06.3-01:13.0), 4 fps strip as asked: this is the main-hall shot, with seated hostages and a slow camera move, and nobody is walking in it.
- Rest of the act (flags, plane landing, tower, apron, terminal map, hall, Amin's speech, demands): grounded, no floating, no overlaps, no haze. Night shots are dark but readable.

Note: in the timing file 3.12 is the hall shot. The walking shot is 3.11, so both were stripped.
