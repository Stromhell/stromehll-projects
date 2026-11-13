# Render QA checklist + watch procedure (v2, 13 Nov 2026)

Applies to EVERY line and channel: Stormi 2D, 2D dynamic, 3D, 3D low, DumDown, Finance with Stromi, reels, IG parts, shorts.
Built from every mistake Pushpam caught by eye (29 Oct to 13 Nov). Each item says what to look for, how to catch it,
and the standard fix. Any hit is at least MEDIUM. Nothing is handed over, combined, uploaded or booked until a round is clean.

Files: `system/qa/RENDER-QA-CHECKLIST.md` (this), `system/qa/qa_auto.py` (machine checks + 1 fps sheets).
Project files `/mnt/project-files/system/qa/`, repo `system/qa/` (branch claude/project-thread-s1uli2), Drive `AI/Tools/Render QA`.

---

## A. Procedure (every act, every full combine, every reel/short/IG part)

1. **Machine pass:** `python3 /mnt/project-files/system/qa/qa_auto.py FILE --kind act|full|reel --out QA_DIR`
   - Fix every FAIL before anything else. WARN = fix unless clearly intended. CHECK = look at that timestamp by eye.
   - It writes `QA_DIR/qa_auto.md`, timestamped 1 fps contact sheets `QA_DIR/sheets/`, zoom crops `QA_DIR/zoom/`.
2. **/watch pass:** `python3 .claude/skills/watch/scripts/watch.py FILE --engine local --question "<paste section D>"`
   (setup once: `bash tools/claude-video/setup-cloud.sh`, branch claude/project-thread-6cjl04). Local engine only.
3. **Eyes-on pass:** Read EVERY contact sheet and every zoom crop. For each frame walk the checklist in section B:
   feet, what is under them, what is in the hands, what overlaps, is anything moving, does the scale make sense,
   is the text clear. For every walk shot, vehicle crossing, prop hand-off and seated shot, also extract that
   stretch at 4-10 fps (`ffmpeg -ss T -t 4 -i FILE -vf fps=8,scale=480:-2,tile=8x4 out.jpg`) and step through it.
4. **Listen pass:** check the qa_auto audio lines, then listen to 3 random 10 s spots + the first 10 s: hiss, clicks,
   VO cut mid-word, music audible, SFX on cuts.
5. **Write the note** `05 Production/qa/<file>-roundN.md`: each hit = time, frame, severity, cause, fix (use the fix column).
6. **Fix every hit, re-render, re-run 1-5.** Repeat until the round is clean. Only then hand over / combine / book.
7. Full video only: after the final encode, `--kind full` again on the EXACT file that will be uploaded (decode + CFR).

Severity: HIGH = broken/unwatchable or factual/map error or upload risk; MEDIUM = anything in section B; LOW = polish.

---

## B. The checklist (what Pushpam has flagged)

### B1. Grounding and floating
| # | Look for | How to catch | Standard fix |
|---|---|---|---|
| 1 | Characters standing ON desks/tables (looks like flying) | feet line at/above a desk top; body lifted above the floor plane | put feet on the floor behind the desk or hide them behind it |
| 2 | Sitting on air | no seat under the hip in a seated pose | add chair/bench/rock; `VP.sit` on a real prop |
| 3 | Walkers above buildings/roofs/sky | feet y vs the painted ground line | move the walk path onto the street plane |
| 4 | Floating props: money, coins, papers, luggage on camels, crowns, flags | bottom edge not touching a surface and not in a hand | rest it on the surface (contact shadow) or attach to the hand |
| 5 | Terrain/mountains/buildings not touching the ground | gap or hard edge between object base and ground | extend base into ground, add ground blend + contact shadow |
| 6 | People walking across a big prop's body (planes, ships, tanks) | feet over the prop silhouette | walk on the ground in front/under it, or stairs to a door |

### B2. Walks and motion
| # | Look for | How to catch | Standard fix |
|---|---|---|---|
| 7 | Walk-in-place / gliding / sliding tyres | qa_auto "possible walk-in-place"; 8 fps strip: legs cycle but nothing travels, or travels with legs still | scroll the background with the walker or move the walker; small zoom-out on stop; walk phase follows real x travel |
| 8 | Walk cycle too fast/slow or not starting/stopping on time | leg cycle vs distance per step; legs still moving after the stop | set `o.t = o.walkPhase = X.phase` in custom walks; cycle speed matched to movement; start/stop on the beat |
| 9 | Wheels not turning | spokes identical frame to frame while vehicle moves | rotate wheels by distance / radius |
| 10 | Still frames / frozen characters | qa_auto "frozen picture"; a character in one pose >2 s; whole frame static >5 s | idle breathing/sway, camera push, ambient motion (smoke, birds, water), motion-graphic tags (Finance: nothing static >5-7 s) |
| 11 | Abrupt pose snaps / weird joints | prop or limb jumps between two frames | ~0.3 s in-between; time-smoothed pose angles; no pose switch faster than ~1.7 s |
| 12 | Animation not following the VO | action happens before/after the line that names it | key the action to the VO word timing (wt.py timing) |

### B3. Overlaps, clipping and layering
| # | Look for | How to catch | Standard fix |
|---|---|---|---|
| 13 | Characters overlapping each other | two bodies sharing pixels without clear depth | spread them; riders/horses in a back layer; vary depth scale |
| 14 | Props clipping bodies (book over legs, prop over trousers, door through a person) | prop drawn over the body where it should be behind/in hand | `holdBehind: true`; layer order; move the door/prop |
| 15 | Seated legs in front of the torso | legs drawn over the body in sit poses | legs BEHIND the torso (rig_leo.js), legsFront only for squat/work |
| 16 | Vehicles through architecture (train through arch, ship through bridge) | step every frame where a vehicle meets a structure | correct layering (goes behind) or change the path |
| 17 | Animal teams overlapping (zebras, horses) | bodies merged | spread them or layer clearly |
| 18 | Camera inside a head / near-clip in 3D | half faces, cut geometry at frame edge | pull camera back or adjust near plane |
| 19 | Characters vanishing or popping in | person in frame N, gone in N+1 (or vice versa) without walking | walk in / walk out of frame; never appear from air |
| 20 | Legs cut by a hard crop look "missing" | body ends at a crop line mid-shot | put grass/wheat/props in front instead of a hard clip; bodies complete |

### B4. Scale, direction and realism
| # | Look for | How to catch | Standard fix |
|---|---|---|---|
| 21 | Objects not at real-world size vs people | compare to a 1.75 m person: airliner fuselage ~4 m (door sill 3.4 m), fighter 16 m long, loco 4.3 m, tank 2.4 m, truck 3 m, drone 0.4-0.7 m | rescale (2D rig ~205 u/m vs RU props ~57 u/m: soldier s = prop s x 0.28); foreground person at most a bit bigger, never 2x |
| 22 | Background people tiny next to foreground people | inconsistent scale in one plane | consistent scale per depth |
| 23 | Vehicles on a road toward camera drawn side-on | side view on a perspective road | front or rear view |
| 24 | Mics pointing the wrong way | grill not toward the speaker's mouth | rotate the mic to the speaker |
| 25 | Identical rows of figures | same pose/look repeated | vary pose, gesture, look |

### B5. Detail, light and texture
| # | Look for | How to catch | Standard fix |
|---|---|---|---|
| 26 | Plain / blocky scenes (low detail, flat colour) | few props, big flat areas; war/train/era shots without period detail | add painted detail, dynamic shadows, period props; war = smoke, debris, fire glow, churned ground |
| 27 | Blocky sea / textures / faceted close-ups | grid of squares, stepped gradients | animated detailed sea (`S.npSea`), smooth normals (`real.rbox`), higher-res texture |
| 28 | Dark scenes (subject unreadable on a phone) | qa_auto "dark scene" (mean luma <28 for >1.5 s) | lift key light, add rim light/practicals, grade up |
| 29 | Flicker: ground/road/texture, cloth, look-variety flips | qa_auto "flash/flicker spike"; same spot changing frame to frame | 3D: never throttle shadow updates (Caesar cloth flicker root cause); 2D: reset variety per frame; stable seeds |
| 30 | THREE.Sprite black under post-fx; lamps blowing out paper | black boxes / white burnt areas | use planes not Sprites; move/dim lamps near paper |
| 31 | Black frames / missing shots | qa_auto "black frames" | re-render the shot; check the cut list |

### B6. Text, maps, branding, thumbnails
| # | Look for | How to catch | Standard fix |
|---|---|---|---|
| 32 | Text/cards over subtitles or characters | card overlaps the subtitle band or a face/body | move cards above the subtitle line, off characters |
| 33 | Signs/cards/titles cut off at frame edge | letters touching or past the edge, in 16:9 and in the 9:16 crop | keep text in the title-safe area; reframe per reel |
| 34 | Spelling / wrong dates / names on screen | read every on-screen word on the sheets | fix the string |
| 35 | Wrong maps (India) | J&K, Ladakh not fully Indian; north cut off | `world: 'ind', highlight: 'India'` (world_ind.js); keep the north in frame |
| 36 | Reel logo missing / outside safe zone / over a face | qa_auto zoom/logo_*.jpg | Stormi watermark top-right inside the 9:16 safe zone |
| 37 | Reel end card missing or off-centre | qa_auto zoom/endcard.jpg | centred "Watch the full video on our YouTube channel" card (IG parts: "Watch Part N+1") |
| 38 | Reel hook weak | qa_auto zoom/first3s.jpg | shock line in the first second + subject face within 3 s |
| 39 | Reel cover on an empty frame / cut-off card / text over faces | look at every cover in one montage | set tt/thx/tz/thy per reel; name slab; faces clear of the logo |
| 40 | Thumbnail faces not fully visible (circles cropping faces) | each face fully inside its circle, forehead to chin | bigger circles, crop tight on faces, no circle overlaps |
| 41 | DumDown: no subtitles, no channel intro | any subtitle text or intro sting | remove |

### B7. Audio
| # | Look for | How to catch | Standard fix |
|---|---|---|---|
| 42 | VO hiss / breath noise | qa_auto noise floor; listen to pauses | `arnndn sh.rnnn` + `afftdn nr=14`, trim the 1680-sample delay, before mixing |
| 43 | Music/SFX too quiet or missing | qa_auto "music/SFX bed" + "dead air"; listen | whoosh on every cut, pop on each sentence, tick on numbers; SFX ~-4 dB, beds -17, music -15 under VO |
| 44 | VO cut mid-word at act joins | listen to every join in the full | `ACT_TAIL_CUT=0` when acts end ~1 s after the VO; edge fades 0.06/0.2 s |
| 45 | Wrong loudness / clipping | qa_auto loudness | two-pass loudnorm -14 LUFS, TP -1.5 |
| 46 | Wrong voice for the line | Stormi = take P; DumDown Loki = Kokoro am_michael; no ElevenLabs except where allowed | re-voice with the right model |

### B8. Final file and upload safety
| # | Look for | How to catch | Standard fix |
|---|---|---|---|
| 47 | Stitched-encode file that YouTube abandons (VisionQuest, 13 Nov) | qa_auto `--kind full`: decode errors, VFR (r != avg frame rate), A/V length mismatch | re-encode the whole master ONCE: `ffmpeg -i in -vf fps=30 -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -movflags +faststart out.mp4`; never upload a `-c copy` concat of separately encoded parts |
| 48 | No clean last 5 s for the end screen | qa_auto zoom/last5s.jpg | hold a clean 5 s end (no text/subtitles) |
| 49 | Wrong size/codec | qa_auto streams | full 1920x1080 h264 yuv420p; reels 1080x1920 |

---

## C. Two worked fixes Pushpam asked for by name
- **Walk-in-place (Mongols, 6 Nov):** scroll the painted background with the walker at walk speed, and add a small zoom-out when they stop.
- **Upload "Processing abandoned" (VisionQuest, 13 Nov):** cause was a full stitched from separately encoded acts and gags without re-encode. Fix = single-pass CFR re-encode + decode check before upload.

## D. /watch question (paste as --question)
"Check against the Stormi render QA checklist. Report every hit with its timestamp and a fix: characters standing on furniture, sitting on air, walking above ground or over big props, floating props or luggage, terrain not touching the ground; walk-in-place, gliding, walk cycles too fast or not starting/stopping on time, wheels not turning, frozen characters or still shots over 5 s, abrupt pose snaps, action out of sync with the narration; overlapping characters or animals, props clipping bodies, seated legs in front of the torso, vehicles through buildings, camera inside heads, characters vanishing or popping in, legs cut off by crops; wrong real-world scale, vehicles side-on on a road toward camera, mics facing away from the speaker, identical rows of figures; plain or blocky scenes, blocky sea or textures, scenes too dark, flicker; text over subtitles or characters, cut-off signs, spelling, wrong India map; reel logo top-right, centred end card, hook in the first 3 s; audio hiss, quiet music or SFX, dead air, words cut at joins."
