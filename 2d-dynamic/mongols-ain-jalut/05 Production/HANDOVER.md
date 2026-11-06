# Mongols / Ain Jalut handover (2D dynamic) - 6 Nov 2026

## 1. Video
- Title / line: "The Battle That Stopped the Mongols" / 2D dynamic (Village Painterly). Pushpam reviewed v1 (6 Nov 15:44 UTC, 8 notes), and at 16:06 said to release after the fixes without a second preview.
- Final full video: project files `/mnt/project-files/2d-dynamic/mongols-ain-jalut/launch/MJ_FULL.mp4` (4:47, 1080p, -14.02 LUFS, -1.94 dBTP; not in git). Drive `AI/2D Dynamic/mongols-ain-jalut/Renders`. Chapters `final/MJ_FULL_chapters.json`.
- Launch kit `/mnt/project-files/2d-dynamic/mongols-ain-jalut/launch/` (also Drive `.../Launch`, `.../Reels`, `.../Instagram parts`):
  - MJ_Title_Description.txt and MJ_thumbnail.jpg (+ alt). The thumbnail comes from ElevenLabs flow bch0LMQhkIDCPuPPlTZg, gemini-3.1-flash-lite, 3 x 206 credits.
  - 15 reels and their covers in reels/, plus 3 IG parts in ig/ (with ig_covers/).
  - Captions in MJ_Reels_Titles_Descriptions.txt, and the booking sheet MJ_booking_sheet.txt.
- Zernio bookings (by Production plan, 6 Nov; all post IDs in `launch/MJ_booked.txt`):
  - Full video: Mon 21 Dec 16:00 UTC (16:00 UK, 11:00 ET), YouTube. 16:00 UTC is now the full-video rule.
  - Reels R01-R15: 21-26 Dec at 19:30, 00:30 and 03:00 UTC.
  - IG parts 1-3: 26, 27 and 28 Dec at 20:30 UTC.

## 2. What was done
- 7 acts (0-6) in Pushpam's voice, cleaned with debreath and afftdn. Every act passed /watch plus 1 fps sheets, in 2-3 rounds. After Pushpam's notes, all 7 acts were re-rendered and checked again with the new 2 fps motion strips.
- Pushpam's notes (all fixed):
  - horses walking in place, and legs still cycling after a stop
  - the letter not in the rider's hand
  - the hill not touching the ground
  - a flat title zoom
  - luggage floating above the camels
  - soldiers walking over bales
  - a spear across a face
  - "After" walking in place: the background now scrolls, then the camera zooms out a little at the stop

## 3. Reusable for the next video (read this)
- `production/mg_head.html`:
  - `rideG(c, ch, xf, y, uu, col, lt, L, po, f, face, k, gf, amp)`: the gait comes from the distance travelled (xf/gf are functions of time), so legs move only while the horse moves. Use it instead of `ride` for any moving rider.
  - `S.mgPan(c, set, off)`: a seamless scrolling set built from mirrored tiles with the edge columns trimmed. Use it for ride-along shots so nothing walks in place.
- `production/mg_geo.js` + `S.mgRegion/S.mgTide(bound)`: real Natural Earth coastlines and rivers, with empire fills clipped to lon/lat outlines.
- `production/mg_detail.js`: `wrap(set, extra)` adds detail layers to existing sets. Also `S.mgBirds` and `S.mgWind`.
- `production/prep_act.sh N`: timing, then debreath, then hiss clean-up, then rebuilding the pages.
- Spears: hold them at about -1.12 rad. Near-vertical angles (-1.4 and up) cross the face.
- A camel pack strapped to the hump (`pack()` in body1.js); props on the ground go behind the walking path (y about 600 against the wall).
- QA: the rules are in `2d-dynamic/shared/qa_rules.md` (copy at /mnt/project-files/system/render-qa-rules.md), with new rules 14-21: walking in place, held props, loads, hills, letters and title drama. The runner `shared/qa_act_sheets.sh N` makes /watch frames, 1 fps sheets and 2 fps motion strips. Read the motion strips for every walking or riding shot.
- Reels:
  1. Write reels.json and hooks.txt.
  2. Record with `speak.py --file hooks.txt --out vo/vo.wav --scenes --energy 0.5 --pace 0.45 --pause 0.3` (about 3 min per line).
  3. Run `build_reel_dd.py` (about 80 s per reel), then `thumb_dd.py`.
  4. Cover defaults crop cards at the top: set tt, thx, tz and thy per reel (see reels.json).
- Combine: `ACT_TAIL_CUT=0 python3 shared/combine.py`, then `volume=XdB,alimiter=limit=0.89`. The measured gap overshoots by about 1 dB (+1.3 dB took -16.3 to -14.0).

## 4. Open items
- None. Everything is booked. Repo branch `claude/project-thread-qssuzd`.

## 5. Cleanup done
- Scratch QA frames, stills and preview clips deleted from the container: yes. Control Room: not used (dropped 5 Nov).
