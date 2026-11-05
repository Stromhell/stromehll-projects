# Act 7 (Four Hercules) – render 3 QA

File: /home/user/work/tb3_acts/act7.mp4 (98.5 s, 1920x1080, 24 fps)
Looked at: watch frames (13, /home/user/work/fable_watch/act7r3/act7r3_watch_sheet.jpg), all five 1 fps sheets (/home/user/work/fable_watch/act7r3_1fps_01..05.jpg), full-res frames f_*.jpg and crops cz_*.jpg / z_*.jpg in /home/user/work/fable_watch/act7r3/. Checklist in render-qa-rules.md applied to every sheet.

Shot map: 7.1 0:00-0:07 | 7.2 0:07-0:11 | 7.3 0:11-0:16 | 7.4 0:16-0:21 | 7.5 0:21-0:29 | 7.6 0:29-0:34 | 7.7 0:34-0:40 | 7.8 0:40-0:46 | 7.9 0:46-0:55 | 7.10 0:55-1:03 | 7.11 1:03-1:08 | 7.12 1:08-1:11 | 7.13 1:11-1:19 | 7.14 1:19-1:25 | 7.15 1:25-1:30 | 7.16 1:30-1:35 | 7.17 1:35-1:38

## Verdict

NOT clean, but no high-severity problem remains. Nothing floats, nobody stands on furniture, no clipping between people and props, no camera inside geometry, no frozen shots, all labels readable and non-overlapping; map shots (7.5, 7.6, 7.10, 7.11), the 707 label shot (7.9) and the numbered line-up (7.12) are clean. What is left is 5 medium and 5 low items, all cosmetic/detail.

## Medium

1. 0:16-0:21 (7.4) and 1:11-1:19 (7.13) – Mercedes reads as a featureless black mirror slab. In 7.4 the nearest car is a black box with two white lights; in 7.13 the whole lower half of the frame is a glossy black plane with a red glare on it, no roof line, windows, pillars or trim (f_18.jpg, f_74.jpg, z_b.jpg). Fix: lighter body colour (dark grey, roughness ~0.5 instead of mirror), make the glass panels visible (slightly lighter / separate material), add a low fill light (PointLight ~2 at y 1.2 over the car) so the silhouette reads as a car. In 7.13 alternatively start the dolly at z -1.5 so the roof is only a strip at the bottom.

2. 1:35-1:38 (7.17) – medic standing with arm 'hold' but nothing in his hands; hands raised to the chest holding air (f_97.jpg, cz_seats96.jpg). Checklist rule 5 (held props in hand). Fix: parent a clipboard or small medical bag to the right hand bone, or use arm: null with hands at the sides.

3. 1:30-1:35 (7.16), also visible 1:25-1:30 (7.15) – the under-bench point lights (benchSeats, PointLight 0xff8a60 intensity 3 at y .3) bloom into bright orange streaks at the bottom corners next to the nearest soldiers' hands and knees; they read as flames or torches being held (f_93.5.jpg bottom-left ~x400 y1040 and bottom-right ~x1450 y1030; sheet 05 row 3). Fix: intensity 3 -> ~0.8 and distance 3 -> 2, or move the lights under the bench (y .2, x s*1.3) and keep only the emissive webbing strip.

4. 0:34-0:40 (7.7) – ten soldiers in one identical straight idle pose, arms hanging, evenly spaced behind the pumps like mannequins (f_36.jpg). Varied-poses rule. Fix: give 3-4 of them a task pose (crouch at the pump, one hand on the carry frame, hands on hips, holding the hose coil) and jitter x/rot by +-0.3.

5. 0:11-0:16 (7.3) – the dirt strip is a flat single-colour plane (0x9a7a56) with hard straight edges against the textured grass, right under the plane in a close shot (f_13.6.jpg, f_15.5.jpg). Fix: PBR dirt/gravel texture with repeat ~[8,180] and a softened edge (second slightly wider plane with an alpha gradient, or a few dark patches breaking the line).

## Low

6. 0:44-0:45 (7.8) – a small black sphere hangs ~30 px off the left wingtip of the foreground plane as it passes over camera (cz_dot44.jpg). Looks like the wingtip nav-light sphere placed beyond the wing. Fix: move the light sphere inside the wingtip or hide it at close range.

7. 0:00-0:07 (7.1) – chairs are plain untextured brown boxes 2.5 m from the camera, and the floor is nearly black around the table. Fix: lib chair with a wood texture, hemisphere light ~0.6.

8. 0:16-0:21 (7.4) – the cabin lamp panel top-left is fully blown out (white, no texture) and the 6 standing soldiers share the same idle (one hugging). Fix: lower lamp emissive; add one crouching / leaning soldier.

9. 1:35-1:38 (7.17) – stretcher racks read as green shelves with white pillows; the three seated figures behind the medic are mostly hidden behind the rack posts, so they look like white shapes in the aisle (cz_seats98.jpg). Fix: show stretcher poles and straps (two visible tubes along the long edge, folded blanket), and shift the seated group to x +-1.3 so they are clearly on the side seats.

10. Captions – inside some shots the caption jumps between top and bottom per line (0:16 top, 0:17 bottom, 0:18 top, 0:19 bottom in 7.4; 1:33 top, 1:34 bottom in 7.16). Readable and never overlapping anything, so only a note: if the position is meant to be fixed per shot, pin it.

## Checked and clean

- Grounding: all seated soldiers (7.13, 7.15, 7.16, 7.17) have a bench/seat under the hips; standing figures (7.4, 7.7, 7.13, 7.17) have feet on the floor; cards on the table in 7.1 sit on the top; the photo frame in 7.14 stands on the shelf.
- No clipping between people, seats, cars, pumps or board.
- Motion: every shot has a camera move plus character idle/talk or prop motion (props, dust, clouds, map route, number badges).
- Labels: FLYING HOSPITAL / FLYING COMMAND POST (0:51-0:55) do not overlap; numbers 1-4 (1:08-1:11) pop in sequence by design; SHARM EL-SHEIKH tag clear; SECRET DEAL WITH KENYA clear.
- Backgrounds: horizon haze in 7.2/7.12 hides the ground edge; 7.7 hangar floor-to-backdrop join is hidden by the dark band; 7.8 sea/sand/asphalt edges fine; 7.9 clouds fine.
- Vehicles: props turn (blurred discs), gear on ground in 7.3 after touchdown, no vehicle passes through structure.
