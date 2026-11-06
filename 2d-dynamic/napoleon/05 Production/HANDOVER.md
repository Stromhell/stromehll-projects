# Napoleon handover (2D dynamic) - 6 Nov 2026

## 1. Video
- Title / line: "Napoleon Had Everything. It Wasn't Enough." / 2D dynamic (Village Painterly). Approved by Pushpam 6 Nov 11:31 UTC (v2, after his 9 review notes).
- Final full video: project files `/mnt/project-files/2d-dynamic/napoleon/final/NP_FULL.mp4` (5:33, 1080p, -14 LUFS, -1.8 dBTP; 370 MB, not in git). Chapters `final/NP_FULL_chapters.json`. Preview https://claude.ai/artifact/9n6wtBLx5eiqGqim42rJEr. Drive: NOT uploaded (token 401).
- Launch: `napoleon/launch/` (launch.json, Napoleon_Title_Description.txt, Napoleon_thumbnail.jpg + alt; ElevenLabs flow HVmDbNKwGagkzkGssmi7, gemini-3.1-flash-lite, 3 x 206 credits). Reels: `napoleon/reels/` (reels.json, voice/hooks.txt, out/, thumbs/). IG parts: `napoleon/reels/ig/`.
- Zernio bookings (6 Nov, by Production plan; full record /mnt/project-files/2d-dynamic/napoleon/launch/NP_booked.txt):
  - Full video: Wed 16 Dec 19:00 UTC (19:00 UK, 14:00 ET), YouTube, post 6aedc3c54bdecb601cd1ca52.
  - 15 reels (YT + IG, covers set): 15-19 Dec at 03:00/17:00/22:00 UTC.
  - IG parts 1-3: 20, 21, 22 Dec at 20:30 UTC.
  - Next free full-video slot: Fri 18 Dec 19:00 UTC.

## 2. What was done
- Script/storyboard from 30 Oct; 7 acts (0-6), narration in Pushpam's voice (act 6 line 5 re-recorded: TTS said "billion").
- Every act: 1 fps sheets + /watch + Whisper word match (83-96%), 1-3 rounds each, all clean. Combine with ACT_TAIL_CUT=0.
- Pushpam review round 2 (`production/qa/review-r2.md`): props scale, flags held, sea/boat, Moscow, Spain drama, pop-ins, walk timing, wheat, VO breath noise.

## 3. Reusable for the next video (read this)
- Pattern: one `production/np_head.html` (includes + light presets + fig/pose/walk/ride/musket helpers, `KIT.xfade = 0` = hard cuts) + `bodyN.js` per act, joined by `production/build_acts.sh`.
- New reusable props in `np_props.js`: `S.npSea(c, poly, y0, y1, lt, {top,bot,glint,glintCol,haze})` detailed animated sea clipped to a polygon; `S.npRowBack/S.npRowFront(c,x,y,s,lt)` rowing boat (draw back, then seated figures via `VP.sit`, then front); `NPX.pedestal`; npCannon/npShip/npFlag/npSmoke/npSnow/npHat/npCrown; `S.npEurope` map.
- Sets in `np_sets.js` (np_moscow rebuilt 6 Nov with detailed Kremlin; np_bay, np_paris, np_berezina, np_waterloo, np_helena, np_longwood, np_bedroom...).
- Commands:
  - Render: `MUSIC_DB=-18 NODE_PATH=$(npm root -g) bash shared/render_act.sh VIDEO N 4` (~1 min per 15 s of video on 4 cores). Per-shot moods in actN/music.txt.
  - Remix audio only: score.py + mix.py `--music-db -18 --bed-db -22 --sfx-db -9`, then swap audio with `-c:v copy`.
  - VO breath fix: `python3 napoleon/production/tools/debreath.py actDIR` on each act after wt.py (backs up vo.orig.wav). Pushpam heard noise at line starts without it.
  - Combine: `ACT_TAIL_CUT=0 python3 shared/combine.py VIDEO VIDEO/final/X.part.mp4` when acts end ~1 s after the VO (default 3.3 s clips lines and act 0's title). Run it with `setsid nohup` (a worker restart killed a foreground combine). Then decode-check, mv, `volume=XdB,alimiter=limit=0.89` to -14 LUFS (measure again; first guess overshot by 1 dB).
  - Stills for quick checks: render single frames from act.html with playwright (`KIT.frame(t)` then canvas toDataURL).
- QA issues Pushpam caught that our checks missed (check these every time):
  - Props must be real-world scale (cannon wheel ~ waist high), flags held in hands (holdN), carriages/vehicles never above platforms (draw order).
  - Flat water / skylines read as "blocky": use npSea and detailed sets.
  - People in boats must sit (VP.sit + boat front over legs).
  - Looping walkers must never wrap mid-frame (no `% 1` positions); walk position linear while legs animate.
  - Hidden-in-crop legs look missing: put grass/wheat in front instead of a hard clip.
  - Big flat shots feel "abrupt and 2D": add camera push/shake, smoke, dust, warm light, foreground framing.
- Gotchas: shared/fonts and shared/sfx are not in git (copy fonts from /mnt/project-files/2d-dynamic/shared/fonts; `python3 shared/mksfx.py shared/sfx`). faster-whisper needs numpy audio (av breaks). Broad `rm -rf /tmp/watch-*` is blocked; delete named dirs.

## 4. Open items
- Launch pack done and booked. Kit: /mnt/project-files/2d-dynamic/napoleon/launch/ (full, thumbnail, 15 reels + covers, 3 IG parts, titles, booking sheet).
- Reel covers: thumb_dd defaults hid faces behind the text; set tz 1.25 / thy .9 / thx on the main character (see reels.json).
- Drive upload of everything once the token works.

## 5. Cleanup done
- Scratch caches: deleted (qa stills, preview clips, reel temp). Renders kept in project files. Control Room: not used (dropped 5 Nov).
