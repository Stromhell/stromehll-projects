# Act 1 QA — r10 (act1.mp4, 1:59)

## Shot 1.12 (01:12.1–01:17.3)
- Subtitle: "In the cockpit are Michel Bacos, / the captain, his co-pilot, / and the flight engineer." Matches the new line. No ASR available offline, so I checked the words against the script and the timing. It was not transcribed.
- VO (act1.vo.wav): speech runs 72.45–76.65 s, about 4.2 s for 15 words. Peak −8.4 dBFS, 0 clipped samples. No gaps over 0.15 s inside the line. Tail decays naturally to 0 before the cut, so it is not cut off. Mix peak −2.6 dBFS. Voice and timbre can't be confirmed by ear here.
- Label MICHEL BACOS / CAPTAIN, AIR FRANCE sits over the left (captain) seat and agrees with the line.

## Issues
| Time | Shot | Problem | Sev | Fix |
|---|---|---|---|---|
| 01:14.9–01:16.0 | 1.12 | Subtitle jumps from top to bottom mid-shot ("the captain, his co-pilot," and "and the flight engineer." flip position) | MEDIUM | Keep the subtitle at one position for the whole shot |
| 01:16–01:17 | 1.12 | "and the flight engineer" plays over a close shot that looks like the same grey-haired captain model, so the engineer isn't clearly a different person | MEDIUM | Use a distinct engineer model/seat (side panel), or frame the engineer clearly |
| 01:15.1 | 1.12 | White glow/blown highlight on the side of the captain's cap | LOW | Lower the key light/spec on the cap |
| 01:17–01:19 | 1.13 | Foreground dark cap/head fills the bottom-centre of frame; camera nearly in a head | MEDIUM | Pull the camera back/up past the seated figure |
| 01:12–01:22 | 1.12–1.14 | Cockpit set reads flat and blocky (bare panel, simple seats, plain walls) in close shots | MEDIUM | Add panel detail, overhead switches, textures |

Rest of the act: no floating feet, walk-in-place, frozen frames, overlaps or terrain gaps found on the 1 fps sheets. The split-flap scramble (00:06–00:08) and the black frame at the end are intentional.
