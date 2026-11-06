# Act 8 · QA pass act8r3 (re-render after r2 fixes)
File: /home/user/work/tb3_acts/act8.mp4 (136.83 s, matches timing.json). Looked at: 9 watch frames (watch_sheet.jpg), 7 one-fps sheets (1fps_01..07.jpg), full-res z_*.jpg, zz.jpg, crop818.jpg, brightness (YAVG) probes.

**Verdict: NOT clean. 0 high, 3 medium, 1 low.**

| # | Time | Shot | Problem | Sev | Fix |
|---|------|------|---------|-----|-----|
| 1 | 1:43–1:48 | 8.18 | NOT FIXED. The right pillar's base still sits inside the near mattress (crop818.jpg, 1:44.5). Prop runs through architecture. | MEDIUM | Check the keep-out against the pillar's base/plinth footprint, not the shaft, and add the mattress half-length. Or move/drop that mattress. |
| 2 | 1:26.0–1:28.7 | 8.15 (end) | About 2.7 s of near-black (YAVG≈16) with nothing visible: a still frame over 2 s. 8.15 shares the new sky, so check that the sky/lights did not go out. | MEDIUM | Keep the runners/terminal visible until the cut, or shorten the fade to under 1 s. |
| 3 | ~1:00 | 8.10 | The Land Rover shot washes out to a flat grey frame: the sky and ground fog go uniform grey with a blown headlight glow, then cut to black. It reads as a broken sky/exposure, not a muzzle flash. 8.10 is not on the sky list, but check it next to the shared-sky change. | MEDIUM | Clamp the flash exposure and keep the night sky gradient during the flash. |
| 4 | 0:00–0:04.7 | 8.1 | The "parchment map" fix is barely visible: still flat cream/red fills with clean vector edges, and no paper grain, stains or edge wear. The orange arrow passes under the caption. | LOW | Add the parchment texture/normal map and a vignette, and raise the arrow or caption so they do not cross. |

## Verified fixed
- 8.4 (0:13–0:20): navy sky gradient instead of black. Rifles hang along the body and read as slung.
- 8.17 (1:34–1:42): rim light makes the right commando readable, and there is no wall clipping.
- Shared sky in 8.12/8.14/8.21/8.22/8.23: no seams or banding seen.

## Checklist (render-qa-rules)
Grounding OK: feet on the floor, hostages on mattresses. Held props in hand (lamps, megaphone, handset). No vehicle overlaps. Only frozen frame is #2. The 1:57 black under "He is killed" is intended and short.
