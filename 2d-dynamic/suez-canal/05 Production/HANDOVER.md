# Video handover: Suez Canal (2D dynamic, Village Painterly)

Written 31 Oct 2026 by the 2D dynamic line thread when Suez was fully booked. The next 2D dynamic video (Napoleon) starts in a NEW thread. That thread should read the rulebook (`system/stormi-production-system-v1.md`) plus section 3 of this file.

## 1. Video
- **Title / line:** "3,000 Years, 6 Empires, 1 Ditch: The Suez Canal Story". 2D dynamic, prefix SZ, slug `suez-canal`.
- **Final full video:** 6:05, 1080p, -14.0 LUFS. Drive `2D Dynamic/suez-canal/Renders/Suez_FULL.mp4` (id 1EPSDZkmb8FoE0IElCr4eELiH5yU62AYd). It is too big for git; the repo has only `2d-dynamic/suez-canal/final/Suez_FULL_chapters.json`.
- **Act renders:** Drive `2D Dynamic/suez-canal/Renders/Acts` (act0-act6).
- **Thumbnail:** `2d-dynamic/suez-canal/launch/Suez_Canal_thumbnail.jpg` (Drive 16JYanCIwEzE_b-0aZOKLVCtm5LPWjIwv). Art from ElevenLabs gemini-3.1-flash-lite-image (3 variants, about 206 credits each); text added with `shared/launch/long_thumb.py`.
- **Title, description, tags, 22 chapters:** `launch/Suez_Title_Description.txt` + `launch/launch.json`.
- **15 reels + thumbnails:** Drive `2D Dynamic/suez-canal/Reels`. Config in `reels/reels.json`, thumbnails in `reels/thumbs/`, titles in `reels/SZ_Reels_Titles_Descriptions.txt`.
- **3 IG parts:** Drive `2D Dynamic/suez-canal/Reels/IG Parts` (SZ_IG_Part_01-03: 2:30, 1:46, 1:57).
- **Hand-off files:** booking sheet `reels/SZ_booking_sheet.txt`; manifest `launch/SZ_release_manifest.json` (Drive 1Ra8CkUEipxEYz78eJDnSkiR_98BjpYEi).
- **Zernio bookings (all 19 posts, booked by Production plan, UTC):**
  - Full video: Sat 12 Dec 16:00 UTC (16:00 UK, 11:00 ET), post 6ae5851eb6a87971b597a49b.
  - Reels:
    - R01: 1 Nov 03:00. R02: 3 Nov 03:00.
    - R03: 4 Dec 03:00. R04: 4 Dec 07:30.
    - R05: 5 Dec 03:00. R06: 5 Dec 07:30.
    - R07: 6 Dec 03:00. R08: 6 Dec 07:30.
    - R09: 7 Dec 03:00. R10: 7 Dec 07:30.
    - R11: 8 Dec 03:00. R12: 8 Dec 07:30. R13: 8 Dec 17:00. R14: 8 Dec 22:00.
    - R15: 9 Dec 12:00.
  - IG parts 1-3: 13, 14 and 15 Dec at 20:30 UTC.

## 2. What was done
- **Script + storyboard:** storyboard https://claude.ai/artifact/GikYHfVAiYGKtyRueb5Uu2, approved 30 Oct 11:07. Script `suez-canal-production-script.md`.
- **Voice:** Pushpam's cloned voice via voice_batch.py. Per-act narration is in `production/voice/`; timing is in `production/acts/actN/timing.json`.
- **Acts:** 7 acts (cold open + 1-6), pages at `production/acts/actN/act.html`. Sets are in `production/sz_sets*.js` and the cast in `production/sz_cast.js`.
- **Checkup rounds:**
  - Act 5: 3 rounds.
  - Act 6: 2 rounds.
  - Full video: 2 rounds. Round 1 found the act 3 date tag covering soldiers; it was moved to the top and act 3 re-rendered. Notes are in `production/qa/full-round1.md`.
- **Combine:** `shared/combine.py`, trimming 3.3 s of each act tail with audio fades. Loudness was then raised +2.16 dB to -14 LUFS with the video stream copied.
- **Pushpam review:** full preview https://claude.ai/artifact/K5fyNyCMoffVY7Tt3X8XPj; approved 31 Oct 04:57.

## 3. Reusable for the next video (read this)
**Build commands that worked** (working copy at /home/user/w2d is a copy of repo `2d-dynamic/`):
- Render one act: `bash shared/render_act.sh VIDEO N 6`. It takes about 5 min per minute of video, so keep the turn alive with foreground wait loops; the machine sleeps when a turn ends.
- Combine:
  1. `python3 shared/combine.py VIDEO VIDEO/final/X_FULL.part.mp4`
  2. Decode-check it with `ffmpeg -v error -i F -f null -`.
  3. `mv` it to the final name.
  4. Loudness: measure with `loudnorm print_format=json`, then apply `-c:v copy -af volume=XdB` to reach -14 LUFS.
- Preview page: cut the master into one 720p clip per chapter (about 1.5 Mbps, under 13 MB each) and use `<video preload="none" playsinline>`. With preload=metadata, a phone failed to load 2 of 7 clips. Publish in 2 batches (64 MB per publish limit).
- Reels:
  1. Write `reels/reels.json` (id, act, s0, s1 shot indices, hook, kicker, mood, title, desc, thumb [2 lines], pre).
  2. Write `reels/voice/hooks.txt`: 15 hooks plus the CTA as line 16, with years spelled out.
  3. Record the hooks with the pushpam-voice `speak.py --file hooks.txt --scenes --energy 0.5 --pace 0.45 --pause 0.3`, about 5 min per line. Run it with `setsid nohup`.
  4. Build each reel: `python3 shared/reels/build_reel_dd.py VIDEO ID`.
  5. Make thumbnails: `python3 shared/reels/thumb_dd.py VIDEO IDs`.
- IG parts: `python3 shared/reels/ig_parts.py FULL.mp4 CHAPTERS.json OUT PREFIX "Short title" "1-3,4-5,6-7"` (groups of acts, 1-based, each part under 3 min). It takes over 10 minutes, so run it in the background.
- Drive upload: `python3 tools/gdrive_upload.py FILES --dest "2D Dynamic/<slug>/..."`. The token expires around 4 Nov 2026.
- Vertical QA contact sheet: the /watch tiler squashes 9:16 video. Grab N frames with ffmpeg at 225x400 instead.

**QA issues found and fixes:**
- Date tags (K.dateTag) default to the bottom-right and can cover figures. Pass `{ y: 100 }` to put them top-right.
- When a reel starts mid-act, its first frame is still the crossfade from the previous shot. build_reel_dd now takes the hook frame 1 s in.
- Reel thumbnail defaults often land on empty frames or cut-off cards. Set `tt` (s into clip), `thx` (crop centre x of 1920), `tz` (zoom) and `thy` (0-1 vertical) per reel in reels.json, and keep faces clear of the logo at top-right.
- The IG part fill must be built from the top 78% of the frame, or the blurred, burned-in subtitles show as huge smears.
- A card or tag over a character is always a fail; so is a crossfade that ghosts figures (use `xfade: 0` for a hard cut).

**Gotchas:**
- ffmpeg 6.1 rejects durations like `d=.8`. Write `0.8`. The error shows up as "Error parsing global options".
- Never run two combines of the same video at once. They share `/tmp/combine_<name>`, which corrupts the output.
- Background `&` jobs die when the Bash call ends. Use `setsid nohup ... &`, or run in the foreground.
- E.in does not exist in kit easing; use E.inn.
- In the titles file, put a separator line before any section after the last reel. Production plan read the "IG parts" heading as part of Reel 15's caption.
- The voice TTS mangles raw 4-digit years. Spell them out in hooks.
- The ElevenLabs image model can paint stray words into the art (one variant had "LEFT 40%"). Check every variant.

**Next in the 2D dynamic queue:** Napoleon (card 2dd-napoleon, paused).
- Pages and data are in repo `2d-dynamic/napoleon/`: all 7 act pages built.
- Narration is recorded for part of the acts; it is saved in `napoleon/production/voice/`, with timing.json/timing.js and vo.wav in each act folder.
- Acts 0-2 were rendered as prep but NOT checked. Drive `2D Dynamic/napoleon/Renders/Acts (prep, unchecked)`. Re-check them, and re-render if pages changed.
- Then: Mongols (Ain Jalut), Eli Cohen 1, Eli Cohen 2, North Korea next, Bermuda (no script yet), and Education Trap (needs Pushpam's yes).
- Nothing starts until Pushpam opens the line. Only 1 x 2D is live right now (rulebook 1.4 / 16).

## 4. Open items
- None for Suez; everything is booked.
- The Control Room card 2dd-suez is marked done (v12). The system thread will delete it, because this thread's delete was blocked.

## 5. Cleanup done
- Scratch / render caches deleted from the container: yes (frames, watch caches, reel temp, preview clips; final renders were kept only after confirming they are on Drive).
- Control Room card removed: handed to the system thread (marked done here).
