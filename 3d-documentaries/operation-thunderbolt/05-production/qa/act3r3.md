# Act 3 QA, round 3 (act3.mp4, 95.2 s)

Shot starts (from act3.timing.json): 3.1 0:00 · 3.2 0:04.7 · 3.3 0:12.2 · 3.4 0:18.1 · 3.5 0:22.6 · 3.6 0:29.8 · 3.7 0:36.4 · 3.8 0:42.0 · 3.9 0:47.6 · 3.10 0:52.6 · 3.11 0:59.7 · 3.12 1:06.3 · 3.13 1:13.0 · 3.14 1:20.4 · 3.15 1:26.8

**The act is not clean.** There is 1 medium problem and 3 low ones. Everything else passes the render-qa-rules checklist: grounding, props, motion, overlaps and detail.

## Problems
1. **0:00–0:12 (3.1, 3.2) and 1:13–1:20 (3.13). MEDIUM. Amin's cap is broken.** In full-res frames (z_10.5.jpg, z_74.jpg, z_80.2.jpg) the cap floats above the hair with a visible gap. It also reads as a hollow, open-top box or ring, not a peaked cap. In 3.13 it looks like a green headband sitting at forehead level. Fix: in tb3_act3.js, the `S2.cap(0x3a4428)` attaches at lines 54, 68 and 202 (offsets [0,.15,.01] and [0,.2,-.01]). Lower the Y offset until the cap sits on the skull, about .10–.12. Give the cap a closed crown: a top disc, or `side: DoubleSide` plus a cap top. Also check the line 68 variant (.2), which is the highest.
2. **0:53–0:59 (3.10). LOW. The hall is very dark.** The hijackers are dark figures against dark pillars, and the two at the left are barely readable. Fix: raise the key/fill on the group by about 30%, or add a rim light.
3. **1:20 (3.13 to 3.14). LOW.** About 1 s of pure black between the Amin shot and the demands card. Fix: shorten the fade-out/in, or cross-dissolve.
4. **0:42–0:52 (3.8, 3.9). LOW, possibly by design.** The airport map is flat, untextured blocks (beige plane, brown boxes, yellow terminal block). It reads as a diagram, which is acceptable, but it looks cheap next to the realistic shots. Fix (optional): add a paper or terrain texture and a soft bevel/edge on the terminal blocks.

## Checked and OK
- Flags (3.4): fine.
- Night landing (3.5): wheels and plane fine.
- Tower (3.6): fine.
- Soldiers around the jet (3.7): fine.
- Hostages on mattresses (3.12): seated and grounded.
- Passenger line on the tarmac (3.11): grounded, and the ground/sky seam is hidden by haze.
- Amin and guard (3.13): feet on the floor.
- Demand cards (3.14, 3.15): fine.
- No frozen shots and no clipping found.

Frames: /home/user/work/fable_watch/act3r3/ (act3r3_1fps_01-05.jpg, z_*.jpg, watch-05pq55i3/)
