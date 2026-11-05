# Act 2 QA, round 2 (act2.mp4, 86.5 s)
Shot times come from act2.timing.json: 2.1 0–4.7, 2.2 –13.3, 2.3 –20.8, 2.4 –28.4, 2.5 –34.4, 2.6 –39.4, 2.7 –45.4, 2.8 –53.7, 2.9 –64.9, 2.10 –69.3, 2.11 –74.9, 2.12 –80.7, 2.13 –86.5.
**Verdict: not clean.** There are 2 high and 5 medium problems.

| Time | Shot | Problem | Severity | Fix |
|---|---|---|---|---|
| 00:00–00:04 | 2.1 | The four lineup figures are tiny and nearly black. They cannot be read; only the "?" icons show. | MEDIUM | Raise the key or spot light on each figure and push the camera in about 40%. |
| 00:16 | 2.3 | The WILFRIED BÖSE and BRIGITTE KUHLMANN labels overlap while Kuhlmann's label pops in. The camera pan has not finished. | MEDIUM | Delay Kuhlmann's label until the pan settles, or give her label a fixed screen x offset. |
| 00:29–00:34 | 2.5 | The scale pans hang under the beam with no strings or chains, so they look like they float. The scale is simple, low-detail geometry. The plane prop is a white blob. | MEDIUM | Add hanging chains and a base. Bevel and texture the brass. Replace the blob with the proper airliner model. |
| 00:54–01:04 | 2.9 | The airstair truck is a flat white box with black rectangles for windows (rule 12, low detail). It fills the foreground. | HIGH | Use a detailed stair-truck model (cab glass, grille, panel lines, wheel hubs, shading), or reframe so the truck is not the hero. |
| 00:46–00:53 | 2.8 | The same flat stair truck sits at the left edge. | MEDIUM | Same fix as 2.9. |
| 01:05–01:09 | 2.10 | The tarmac is flat grey and meets the sky in a hard line with no horizon detail. | MEDIUM | Add a distant terrain, building or tree line and haze at the horizon. |
| 01:21–01:26 | 2.13 | The shot is very dark. A blown-out white head close to the camera dominates the frame, and the camera nearly touches it at 01:24–01:26. | HIGH | Move the camera back or up out of the hair, tone down that head's material or light, and lift the cabin fill so faces can be read. |

Checked and fine: grounding (no one stands on furniture or air), the box held in hand in 2.8, motion in every shot (no frozen frames), and no vehicle overlaps. Shots 2.2, 2.4, 2.6, 2.7, 2.11 and 2.12 are clean apart from minor map-edge black corners in 2.4 (LOW: fill the frame with the map).
