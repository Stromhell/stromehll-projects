# 2D render checkup rules (read before every /watch checkup)

Every checkup (per act and full video) must look for each item below on the 1 fps sheets AND the /watch frames.
Any hit is at least MEDIUM. These come from mistakes Pushpam caught by eye that earlier checkups passed
(Rothschilds full review, 31 Oct 2026). Earlier rules: no overlaps, nothing floats, nobody pops in, varied poses,
complete bodies, detailed backgrounds (29 Oct).

## Grounding (every character, every frame)
1. **Standing ON furniture.** A character standing behind a desk/table must have feet hidden by the desk or on the
   floor behind it. If the feet line is at or above the desk top, or the body looks lifted above the floor, the
   character is "flying". Check where the feet meet the floor plane, not just whether feet are drawn.
2. **Sitting on air.** A seated character needs a visible chair/bench/seat under the hip. No seat = fail.
3. **Walking above buildings.** Walkers must stand on the street/ground plane of the backdrop. Feet over rooftops,
   walls or the sky = fail. Compare feet y with the painted ground line.
4. **Props floating.** Money, coins, papers, books rest on a surface or are held in a hand. Stacks on a table must
   sit on the table top (bottom edge touching), not hover above it.

## Holding props
5. A paper or letter the narration mentions must be held in the character's hand, not floating beside him.
6. Books are held like books (open with two hands, or closed under the arm or in one hand). A prop that snaps from
   one pose to another in a single frame is "abrupt": it needs an in-between move (about 0.3 s).
7. A held prop must never overlap the character's legs or body in a way that reads as passing through them.

## No still frames
8. Something must move in every shot: breathing/idle sway on characters, camera push, ambient motion (smoke,
   birds, flicker, water). A character frozen in one pose for more than about 2 s = fail.

## Overlaps
9. Vehicles (trains, carriages, ships) never pass through architecture (arches, bridges, buildings) unless they
   are drawn going behind it with correct layering. Check every frame where a vehicle crosses a structure.
10. Animals in a team (zebras, horses) must not overlap each other: spread them out or layer them clearly.

## Detail level ("looks low" = fail)
11. Backgrounds must be detailed and painterly, never flat or blocky. War and battle scenes need war-zone
    detail: smoke, debris, soldiers, cannons, flags, fire glow, churned ground.
12. Vehicles and machines (trains, ships, carriages) need real detail: wheels with spokes, rods, windows,
    rivets, smoke, shading. Not simple shapes.
13. Period scenes (an "age" or era shot) need period detail: buildings, people, props of that time.

## Motion and props (Pushpam's Mongols review, 6 Nov 2026)
14. Walking in place = fail. If a person, horse or camel moves its legs, it must travel across the frame, or the
    background must scroll with it. Check two frames 0.5 s apart: legs changed but the figure and the ground
    did not move = walking in place.
15. Legs stop when the figure stops. A horse that has arrived must stand still, not keep its walk cycle going.
16. Loads sit on the animal: bags and bales are strapped onto the hump or saddle, never hovering above it.
17. Nobody walks over props on the ground (bags, bales, bodies). Move the props out of the walking path.
18. Spears, poles and staffs must not cross a face. Tilt them forward or hold them lower.
19. Hills and mountains meet the ground: no strip of sky or distant ridge showing under a hill.
20. A letter or paper being handed over comes out of a hand and stays in the hand. It never floats beside the figure.
21. Title and reveal shots need drama: camera push, foreground detail, light, sound hit. A flat static zoom = fail.

## How to check
- Read EVERY 1 fps contact sheet. For each character ask: where are the feet, what is under them, what is in
  the hands, is anything moving.
- For every walking or riding shot, also look at a 4 fps strip (ffmpeg fps=4) of that shot for rules 14-15.
- For each vehicle or animal group, step through every frame where it touches architecture or another animal.
- Write each hit with its time, what is wrong and the fix, and mark it at least MEDIUM.
