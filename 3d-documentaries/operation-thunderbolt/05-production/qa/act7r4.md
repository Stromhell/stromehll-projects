# Act 7 – render 4 QA

File: /home/user/work/tb3_acts/act7.mp4 (98.5 s). Looked at: the watch sheet (act7r4_watch_sheet.jpg), the 1 fps sheets ../act7r4_1fps_01..05.jpg, and the full-res frames f_*.jpg / z*.jpg. I checked every sheet against render-qa-rules.md.
Shot map (from the cumulative durations in act7.timing.json): 7.1 0:00-0:07 | 7.2 -0:11 | 7.3 -0:16 | 7.4 -0:21 | 7.5 -0:29 | 7.6 -0:34 | 7.7 -0:40 | 7.8 -0:46 | 7.9 -0:55 | 7.10 -1:03 | 7.11 -1:08 | 7.12 -1:11 | 7.13 -1:19 | 7.14 -1:25 | 7.15 -1:30 | 7.16 -1:35 | 7.17 -1:38

## Verdict: NOT clean. 1 medium item is left.

### Medium
1. 1:11-1:19 (7.13): the Mercedes still reads as a big glossy red slab across the lower half of the frame. It has no windows, pillars or wheels in view. Two small orange point-light hotspots near its rear corner (~1:12-1:14) look like candles. Frames: z4.jpg top-right and bottom-left. Fix: in 7.13, apply the 7.4 car material/lighting (dark grey, roughness ~0.5, visible glass), lower the red cabin light on the car or add a neutral fill above it, and remove or dim the two small lights by the car's tail.

### Round-3 fixes verified
- 7.1: chairs are textured wood and the table is readable.
- 7.3: the dirt strip is textured and its edge is broken up.
- 7.4: the Mercedes reads clearly (grille, headlights, wheel) and the soldiers' poses vary.
- 7.7: the ground crew are in varied poses (crouching at pumps, leaning).
- 7.8: no stray nav-light sphere.
- 7.15/7.16: the bench lights no longer flare.
- 7.17: the medic holds a red bag, the stretchers have rails and pads, and the seated group sits clearly on the side seats.
- Captions: each shot keeps one fixed caption position.

### Checklist (render-qa-rules.md)
No feet floating or sunk, nobody on furniture, every seated figure has a seat, held props are in hand, no clipping, every shot moves, and labels don't overlap.
