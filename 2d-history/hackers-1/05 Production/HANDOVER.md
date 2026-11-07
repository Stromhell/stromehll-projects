# Kids Who Hacked the World Pt1 - Twitter (2D) handover, 7 Nov 2026

## 1. Video
- "The Kids Who Hacked the World, Part 1: The 17-Year-Old Who Hacked Twitter". 2D history, Gumball rig style, prefix TW, 9 acts (act0-8), 5:23, -14 LUFS.
- Master: 2d-history/hackers-1/production/full/hackers-1_full.mp4 (234 MB, not in git). Drive: AI/long form history video/Kids Who Hacked Pt1 - Twitter (2D)/Renders/Full (id 1SaAHaZyoZh9s3lVhG5JzP35ATX0gBTNX); acts in Renders/Acts. Project-folder copy (crf 26, 46 MB): /mnt/project-files/2d-history/hackers-1/launch/full/.
- Launch kit: /mnt/project-files/2d-history/hackers-1/launch/ (TW_release_manifest.json, TW_Thumbnail_v1.jpg, TW_Title_Description.txt, reels/ 15, reel_covers/, ig_parts/ 3, ig_covers/, TW_booked.txt). Same on Drive under .../Launch.
- Previews: full https://claude.ai/artifact/ErZvdsvDkPsUcbLkVJ72YS, kit https://claude.ai/artifact/E9CJAig3mPX3i3UvFMAKnx.
- Repo branch claude/project-thread-11ddqz: hackers-1/production (plates.js, tw_kit.js, acts, qa), hackers-1/reels (specs, voices), hackers-1/launch.

## 2. Booked on Zernio (19 posts, UTC; ids in launch/TW_booked.txt)
- Full video Sat 16 Jan 2027 16:00, post 6aef7c95d1b3847601ffe4ac
- IG parts: P1 16 Jan 16:00, P2 18 Jan 13:00, P3 18 Jan 16:00
- Reels R01-R15 (YT Shorts + IG) 17-21 Jan at 12:00/17:00/22:00

## 3. What was done
- All 9 acts QA'd on 1 fps contact sheets + whisper VO check until CLEAN (production/qa/actN-roundR.md). /watch (claude-video) is not on this branch and running it from a clone was blocked, so sheets were used instead.
- Fixes: titles/cards kept above the subtitle line, car no longer overlapping Graham, coins behind the wallet, gavel lands flat on the block, no near-empty opening frames.
- Pushpam OK'd the full video 18:32 UTC; at 18:38 UTC said kit previews need no OK, book straight away.

## 4. Reusable for the next video
- production/tw_kit.js: tweet cards + famous-account wall (names only), monitor/window UI, phone, login page, chat, wallet meter with clamp, PHASE card, stamp, chair, typing/phone-at-ear arms, headset, cast GRAHAM/EMP/MAN/WOMAN.
- Seated figure: seat top = floor y-120 at s 1.9; a phone at the ear goes in a live layer after the chair, behind the head.
- shared/tools/ig_covers.py: IG part AND reel covers in a band layout (headline above, 16:9 frame band, badge below) so text never sits on characters. Reel covers via reel_covers.json with name/badge/acc.
- act_nosub.html = act.html plus `KIT.drawSubs = () => {};` after `A.build(); K.boot();`; render to /tmp frames with shared/render.js for reels and IG parts.
- build_reel.py now loads the logo from shared/brand/stormi-watermark.png; ig_parts.py skips non-jpg files in frame dirs.
- Part 2 (Xbox Underground) is teased at the end; next in the series.

## 5. Open items
- Project folder still ~9.9 of 10 GB.
