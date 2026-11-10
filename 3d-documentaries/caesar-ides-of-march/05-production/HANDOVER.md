# HANDOVER: The Ides of March (3D, Julius Caesar)

Status: BOOKED on Zernio, 10 Nov 2026. Thread closed. The next 3D video starts a NEW thread that reads only the rulebook (/mnt/project-files/system/stormi-production-system-v1.md) and this file.

## 1. What shipped
- Full video v2: 10:15, "60 Men, 1 Target: The Real Story of Julius Caesar's Assassination". Drive CAE_Full_v2.mp4 (1TUUS83GiOfeyN3HgmfkyBGKm9vzAO-Kb), thumbnail CAE_Thumbnail_v1.jpg (1gK4I1ffvgt1L3rb-MfYdbc5AII_KU2bp), YouTube copy CAE_Full_YouTube.md.
- 15 story reels (17-21 s, centre-framed, shock line in first second, Stormi logo + end card), 7 IG parts, covers for all. Drive folder "Launch kit v2" in AI/The Ides of March (Caesar)/05 Production.
- Launch kit page: https://claude.ai/artifact/Q6bxyYbZt7v1zZtwtr4jzK
- Release manifest: release-manifest.md (this folder) and /mnt/project-files/3d/caesar/CAE_release_manifest.md.

## 2. Booked on Zernio (23 posts, UTC; ids in /mnt/project-files/3d/caesar/CAE_booked.txt)
- Full video: Thu 25 Feb 2027 16:00, YouTube, post 6af2bcd83b0d55c747a215f0
- Reels R01-R15 (YouTube Shorts + IG Reels): R01 26 Feb 16:00; then 12:00/17:00/22:00 on 27 Feb, 28 Feb, 1 Mar, 2 Mar; R14-R15 3 Mar 12:00/17:00. Max 4 shorts/day kept (26 Feb has 4).
- IG parts P1-P7: 26 Feb to 4 Mar, 14:30 UTC (20:00 IST) daily, IG only.
- Release Calendar updated (v15): https://claude.ai/artifact/TNqVPtPGHr7ibYEjoeM2TS
- Next free long slot: 1 Mar 2027 16:00 UTC (every 4 days after). Shorts are free from 4 Mar onward.

## 3. Engine lessons (3d-documentaries/engine)
- Cloth/shadow flicker root cause: a shadow-update throttle in lib/core.js. Removed. Never re-add it. Keep key light normalBias .02 (rome.key()).
- Real-size props and seat heights: seats at .6, diners on couch edges; check every sit/stand for clipping with a short video clip, not stills (stills catch arm blends mid-way).
- New arm poses in lib/real.js: plead, stab (right arm), tuck (hand into toga fold to hide a dagger). Arms blend over 0.35 s. Go straight hold -> stab; a wind-up 'raise' looked weird.
- runtime.js: set `kit.overlayEnd` to stop the auto name tag/overlay before a blackout.
- ui.js subtitles: sticky placement plus x clamp 200-1720 stops captions jumping.
- rome.js: sella() X legs with feet; river() animated waves; softer candle flicker; colosseum arenaModel for arena shots.
- Inline `//` comments inside one-line shot code swallow the rest of the line. Use `/* */`. Syntax-check shots by copying to .mjs and `node --check`.

## 4. Sound
- tools/sound_mix.py takes `"silence": [[shot, at, dur]]` to mute music+SFX (not VO) with 0.25 s fades (used for the 5.12 beat).
- make_cues.py EXTRA cues: heartbeat in acts 0 and 5, cloth and dagger cues.
- VO: plain spelling of names works best ("Octavian"); phonetic spellings garbled the take. Never run scripts/voice.py (ElevenLabs credits).

## 5. Release tools
- reels/build_release.py reads reels.json + ig.json, writes job scripts; story reels may span acts only by splitting the segment per act. Panel is vertically centred. IG part boundaries must be recomputed after any act length change.
- Covers: tools/reel_thumb.js from 1920x700 crops (y190) + cover_jobs.json; convert PNG to JPG (~200 KB) before Zernio upload.
- Zernio booking: media_get_media_presigned_url -> curl PUT -> posts_create_post with media_items {url, thumbnail, instagramThumbnail}; YouTube title in platformSpecificData.title; IG uses contentType reels.

## 6. Pushpam feedback to carry forward
- 9 Nov fix list (47 points) is the QA bar for the next 3D: no clothing flicker, no clipping (chairs, stairs, hands with scrolls, tables, columns), no missing legs, no ground/light flicker, smooth transitions, detailed water, real Roman architecture, hidden props really hidden, natural poses, motion graphics on any black frame, steady subtitles, clean VO, doors close only after a character fully enters.
- Reels: small stories that open with the shock line; they may run over 25 s if the story needs it.
