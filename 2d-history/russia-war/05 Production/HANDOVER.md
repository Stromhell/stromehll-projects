# Russia-NATO War (2D) handover, 7 Nov 2026

## 1. Video
- Title / line: "How a Russia-NATO War Would Unfold", 2D history (Alium rig style), 9 acts (act0-8), 6:33, -14 LUFS. A scenario, labelled fiction at start and end.
- Master full video: 2d-history/russia-war/production/full/russia-war_full.mp4 (450 MB, not in git). Drive: AI/long form history video/Russia-NATO War (2D)/Renders/Full (id 1ZmQ1-V30jGUavnE_hFAPxjnHh-MBegRo). Project folder copy is a crf 26 re-encode (74 MB): /mnt/project-files/2d-history/russia-war/launch/full/.
- Launch kit: /mnt/project-files/2d-history/russia-war/launch/ holds reels/ (15), reel_covers/, ig_parts/ (3), ig_covers/, RU_NATO_Thumbnail_v1.jpg (ElevenLabs background), RU_NATO_Title_Description.txt, RU_release_manifest.json, RU_booked.txt.
- The same kit is on Drive under .../Russia-NATO War (2D)/Launch (Reels, Reel covers, IG parts).
- Repo: russia-war/production (acts, plates.js, ru_props.js, prep_act.sh), russia-war/reels (specs, voices, covers), russia-war/launch.
- Zernio (19 posts, ids in launch/RU_booked.txt):
  - full video Wed 6 Jan 2027 16:00 UTC, post 6aef305a3cba429ceaf55c85
  - IG parts: P1 6 Jan 16:00, P2 8 Jan 13:00, P3 8 Jan 16:00 UTC
  - reels R01-R15, YT Shorts + IG, 7-11 Jan at 12:00/17:00/22:00 UTC

## 2. What was done
- All acts passed /watch QA (production/qa/actN-roundR.md). Pushpam's 7 Nov 12:38 notes fixed in round 3 (acts 3-7):
  - soldiers climb airliner stairs (no walking over the plane)
  - every object at real-world size vs people (airliner, jets, drones); rule added to shared/qa_rules.md
  - trucks on a road toward camera drawn front view (act7 truckFront)
  - Gotland plate given much more detail
- Pushpam approved scheduling after the fixes (7 Nov 12:38 UTC).
- Hook 11 re-voiced with plainer wording because whisper misheard "fait accompli".
- Reel 12 cover moved to the 2030 calendar frame to keep text off characters.

## 3. Reusable for the next video
- production/ru_props.js: modern jets, drones, subs, ro-ro ship, trains, modern soldiers. Scale: rig figure ~205 u/m at s=1, RU props ~57 u/m, so soldier s = prop s x 0.28.
- IG part covers: Suez make_ig_part_covers.py adapted (paths to shared/fonts and shared/brand), frame grabbed at 40 s of each part.
- The x264 `-crf 26 -tune animation` re-encode cuts a 450 MB full to ~74 MB with no visible loss; use it for project-folder copies.

## 4. Open items
- Project folder is at ~9.8 of 10 GB. Old full-video copies (e.g. ww2-part1/launch/full, 513 MB) can go once Pushpam OKs.
- Not-yet-rendered 2D videos approved 29 Oct (JPMorgan, Dark Web King, Putin security, Mongol Empire): Pushpam not asked yet whether to keep them.

## 5. Cleanup done
- Reel frame scratch: kept locally only in this container (not in git or project folder).
- Control Room card: not updated (dropped).
