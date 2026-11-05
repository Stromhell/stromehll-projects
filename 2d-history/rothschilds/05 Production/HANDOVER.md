# Rothschilds (2D) handover, 5 Nov 2026

## 1. Video
- Title / line: "How One Family Became Richer Than Kings", 2D (Leo style)
- Final full video: 2d-history/rothschilds/production/full/rothschilds_full.mp4 (not in git, 582 MB); project folder /mnt/project-files/2d-history/rothschilds/launch/rothschilds_full.mp4; Drive v2 https://drive.google.com/file/d/14Rnk0tVryCgnVugOKBJlHzC2bjf-7XFt/view
- Reels: /mnt/project-files/2d-history/rothschilds/launch/reels/ (15), covers reel_covers/ (with THE ROTHSCHILDS tag); IG parts ig_parts/ (3) + ig_covers/; thumbnail Rothschilds_Thumbnail_v2.jpg (ElevenLabs). Repo: rothschilds/reels/, rothschilds/launch/. Not on Drive (token expired 5 Nov).
- Zernio: full video Tue 8 Dec 19:00 UTC (19:00 UK, 14:00 ET), post 6aecde974c0b35512db5e88b. Reels 9-13 Dec, 3/day (9 Dec 03:00, 17:00, 22:00; 10-13 Dec 00:30, 12:00, 19:30 UTC), YT + IG. IG parts 1-3 at 20:30 UTC on 9, 10, 11 Dec.

## 2. What was done
- 8 acts rendered and checked; full video v2 approved by Pushpam 31 Oct 08:55.
- Reels: 2 checkup rounds (production/qa/reels-round1.md); rebuilt 5 Nov with clean opening frames and reworded reels 3, 8, 10.
- IG parts built with shared/tools/ig_parts.py; manifest launch/RS_release_manifest.json; booking sheet reels/RS_booking_sheet.txt.

## 3. Reusable for the next video
- Reels: spec [act, s0, s1, hook, kicker] -> mkreels.py -> render.js on act_nosub.html (KIT.drawSubs no-op) with t0 t1 -> shared/tools/build_reel.py ID VIDEO DIR PREFIX FULL MUSIC CTA.
- Covers: shared/tools/reel_thumb.py SPEC REELDIR OUTDIR PREFIX, with TAG="SERIES NAME" env to put the series name on top (Pushpam 5 Nov).
- IG parts: NPARTS=n ig_parts.py VIDEO FRAMEROOT OUT PREFIX parts.json NEXTVOICE_DIR "TITLE"; each part under 3 min, split at act boundaries.
- Thumbnail: ElevenLabs gemini-3.1-flash-lite-image (~206 credits per image), left 40% empty for text set in code. Never "banker on a pile of gold" imagery (antisemitic trope).
- Gotchas: pushpam-voice takes ~5 min per line when run one line per call; /tmp disk fills at ~1.5 GB of reel frames per video (delete frames after build); the project-files share stamps a C2PA box into files that start like MP4 and fails silently on files over ~500 MB, so send big files split and gzip the first piece.

## 4. Open items
- Drive upload of the launch folder once Pushpam renews the Drive token.

## 5. Cleanup done
- Scratch / render caches deleted: yes (reel frames, IG frames, transfer pieces)
- Control Room card: not updated (Pushpam 5 Nov: no more Control Room updates)
