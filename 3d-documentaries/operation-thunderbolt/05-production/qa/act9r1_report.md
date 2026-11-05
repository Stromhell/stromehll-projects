# Act 9 "Aftermath" QA — act9r1 (render finished 5 Nov 08:07, 101.76 s, 1920x1080 24fps)
Evidence: /home/user/work/fable_watch/act9r1_1fps_0[1-6].jpg, act9r1_watch_0[12].jpg, act9r1_t*.jpg

| time | shot | sev | problem | fix |
|---|---|---|---|---|
| 00:00-00:02 | 9.1 | (known) | old terminal model | already queued for re-render |
| 00:10-00:18 | 9.4 | medium | MiGs are bare grey primitives (cylinder+cone+flat wings, sphere wheels), no texture, in a fairly close lateral dolly | swap for the proper MiG/jet mesh or push camera back + darken; add canopy/markings |
| 00:24-00:27 | 9.5 | medium | as the card pushes in, the burned-in caption ("Five commandos are wounded." / "Only one dies.") lands on the yellow card: white on yellow, unreadable | limit push-in so card bottom stays above caption band, or add caption backing/box |
| 00:33-00:37 | 9.7 | medium | route destination (Israel) is off the top edge of the map plane: pin + tiny unreadable label float in black above the map; "ETHIOPIA" label cut by the route ribbon | extend map plane north / raise camera so Israel is on the map; label readable size; ribbon under labels |
| 00:38-00:42 | 9.8 | medium | two crowd figures (tan suit + white-haired man) spawn in the same spot and interpenetrate at the fence | offset spawn positions / collision spacing |
| 00:43-00:48 | 9.9 | medium | left hugging pair: man's forearm passes through the woman's head; right pair hand sinks into shoulder | adjust hug pose/height pairing (taller/shorter partners) |
| 00:48-00:55 | 9.10 | low | Amin "slams a fist" but the hand is open, pointing; white blob on desk reads as an untextured block | fist pose + desk prop (papers/phone) |
| 00:55-00:59 | 9.11 | low | "LAKE VICTORIA" map label collides with the caption line (00:55 and 00:58) | move label up or shift map so lake sits above caption band |
| 00:59-01:05 | 9.12 | low | bed and curtain are flat untextured primitives; curtain is a single plane with a jagged bottom edge | add fabric/sheet texture, curtain folds, or keep further/darker |
| 01:05-01:12 | 9.14 | low | memorial stones are glossy red/white/yellow spheres (read as billiard balls); headstone has no inscription; caption sits across them at 01:05-01:07 | matte grey pebbles; add engraved text or plaque |
| 01:25-01:31 | 9.16 | medium | hard horizontal seam: terrain/mountains end abruptly against a flat reflective water plane; planes fly at that seam, nose/tail below the horizon line; sun reflection streak with no sun in sky | raise flight path above horizon, blend shore (fog/haze), add sun disc or remove streak |
| 01:31-01:37 | 9.17 | (known) | old terminal (same model as 9.1) | already queued |
| 00:27-00:33 | 9.6 | low | clock face shows faint offset double rim (ghost ring) | single rim mesh / fix z offset |

Clean: 9.2, 9.3, 9.13, 9.15, 9.18. No flicker/popping, floating feet or camera clipping found at 1 fps.
