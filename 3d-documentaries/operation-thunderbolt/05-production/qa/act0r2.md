# Act 0 QA, re-render 2 (act0.mp4, 50.4 s)
Verdict: NOT CLEAN. 6 issues (0 high, 5 medium, 1 low).
Shot timing (from act0.timing.json): 0.1 00:00-00:08, 0.2 00:09-00:13, 0.3 00:13-00:19, 0.4 00:19-00:27, 0.5 00:27-00:34, 0.6 00:34-00:39, 0.7 00:39-00:47, 0.8 00:47-00:50.

| Shot | Time | Problem | Sev | Fix |
|---|---|---|---|---|
| 0.6 | 00:34-00:39 | Tops of both passengers' heads are cut off by the Mercedes roof line, so the heads read as pushed up into the roof. Faces are barely lit. The Yoni callout leader ends on the roof, not on his face. | MEDIUM | Lower the seated figures or raise the roof/camera so whole heads sit inside the window. Add interior fill light. Anchor the callout to Yoni's head. |
| 0.3 | 00:13-00:19 | Engine close-up is very dark and flat (low-detail nacelles, untextured fuselage). Prop discs show as thin halo rings. A hard dark vertical strip/seam at the left edge of the cloud plane. | MEDIUM | Add rim or moon light and fuselage texture. Soften the prop-disc rings. Extend or hide the cloud-plane edge. |
| 0.4 | 00:19-00:27 | Mercedes and Land Rovers leaving the ramp are near-black shapes that are hard to read. The vehicle models are blocky. | MEDIUM | Add key light on the vehicles and the ramp, and use more detailed vehicle models (wheels, chrome, windows). |
| 0.5 | 00:27-00:34 | Terminal interior is low detail: plain untextured pillars and blocky benches. Hostages are tiny and hard to see. A large foreground pillar fills the left third at 00:29-00:31. | MEDIUM | Texture the pillars and walls and add period props (luggage, blankets). Move the camera so the pillar does not block the frame, and bring the hostages closer. |
| 0.7 | 00:39-00:47 | Lead truck is a flat, blocky box from behind. Ground plane ends in a hard line against the sky at the horizon. | MEDIUM | Use a detailed truck model and add a horizon haze or distant terrain to blend the seam. |
| 0.2 | 00:09-00:13 | Burned-in caption sits over the map labels (Uganda/Kenya are hidden under the text). | LOW | Raise the map or move the caption band below it. |

Checklist (render-qa-rules): no one is standing on furniture or sitting on air. No floating props. No frozen frames: the camera or subject moves in every shot. No vehicle passes through architecture. Detail-level items (11-13) are hit in shots 0.3, 0.4, 0.5 and 0.7, listed above.
Shots 0.1 and 0.8 (title) are clean.
