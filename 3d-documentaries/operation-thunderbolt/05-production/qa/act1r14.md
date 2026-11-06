# Act 1 QA — act1r14 (act1.mp4, 1:59)

Method: watch.py (local, balanced, 768) 21 frames + 6 one-fps sheets + zooms at 01:30.5, 01:45.6–01:46.0. Rules: fable_qa_prompt incl. Extra checks + render-qa-rules.md.

## Requested checks
- 1.12 (01:12–01:17) raised wide: PASS — both pilots' caps and heads show above the seats.
- Main panel (1.12/1.16): about 40 round gauges with rims and needles: PASS. The panel face is still near-black navy, not clearly lighter (see issue 1).
- Seats 1.12–1.16: off-white fleece covers and brown armrests are visible in every cockpit shot: PASS.
- 1.13–1.15 (01:17–01:33): no clipping, all seated people are on seats, the engineer walks to the door and travels with it, the door opens, the hands-up pose holds with motion: PASS.
- 1.18 (01:45.6–01:54.6): the handset is held in his hand at his mouth, the head and hand move a little, and the camera slowly pushes in: PASS. The opening frames 01:45.6 and 01:45.75 have no heading-dial overlay (the dial shows only in 1.16, as intended).
- 1.2 split-flap: intended, not flagged.

## Issues
| # | Time | Shot | Problem | Severity | Fix |
|---|------|------|---------|----------|-----|
| 1 | 01:12–01:17, 01:33–01:39 | 1.12, 1.16 | The main instrument panel face still reads near-black. It is only slightly lighter than before, so the "lighter panel" change is hard to see. | low | Raise the panel albedo to a mid-grey (about #4a5058) or add a little fill light on the panel. |

Rest of the act (1.1–1.11, 1.17, 1.19): no clipping, floating, walk-in-place, frozen frames, glow or label problems found.

Verdict: CLEAN apart from one low note (the panel tone).
