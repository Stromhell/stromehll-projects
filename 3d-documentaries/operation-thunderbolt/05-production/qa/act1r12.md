# Act 1 QA, round 12 (act1r12)

Checked: watch frames (18), 1 fps sheets act1r12_1fps_01-06, the first 8 frames of 1.18, and the render-qa-rules checklist plus the Extra checks.

## Re-rendered shots
- 1.13 (01:17-01:21): The captain's head is fully in frame. Detailed panel. OK.
- 1.15 (01:27-01:33): Detailed cockpit, with gauges, quilted walls and leather seats. Böse is seated in the co-pilot seat. OK.
- 1.16 (01:33-01:39): Detailed cockpit. The heading-indicator overlay belongs to this shot. OK.
- 1.18 (01:46-01:55): Detailed cockpit and matte caps. The first frames show no heading-indicator leak: they open straight on Böse, with no compass. He holds the microphone to his face, and his head sways slightly from frame to frame. OK.

## Full act scan
| Time | Shot | Problem | Severity | Fix |
|---|---|---|---|---|
| 01:12-01:13 | 1.12 | The cockpit wide shot still uses the old low-detail cockpit: flat, blocky seats and a plain panel. It does not match the detailed cockpit in 1.13/1.15/1.16/1.18. | MEDIUM | Re-render 1.12 with the detailed cockpit and matte caps. |

The 1.2 split-flap board is intended. No other hits on grounding, props, frozen frames, walk-in-place, floating objects, terrain gaps or glow.
