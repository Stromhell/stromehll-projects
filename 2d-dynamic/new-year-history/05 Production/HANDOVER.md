# New Year history handover (2D dynamic) - 7 Nov 2026

## 1. Video
- "Why New Year Is on January 1st" (working title "The Wild History of New Year"), 2D dynamic, Village Painterly, prefix NY. 3:38, 1080p, -14.0 LUFS, -1.9 dBTP.
- Full video: project files `/mnt/project-files/2d-dynamic/new-year-history/launch/NY_FULL.mp4` (not in git, too big), Drive `AI/2D Dynamic/new-year-history/Renders` (id 1K-n2-0qA2RL_67i80MTq4WdzAV1q3td1). Chapters `final/NY_FULL_chapters.json`.
- Preview + launch kit page: https://claude.ai/artifact/B3iFKafZJvAWMcRvcr9UKg
- Launch kit `/mnt/project-files/2d-dynamic/new-year-history/launch/` (Drive .../Launch, .../Reels, .../Instagram parts):
  - NY_Title_Description.txt, NY_thumbnail.jpg (+ alt). Thumbnail: ElevenLabs flow tyne8kCG6uiIRx2Vgenh, gemini-3.1-flash-lite, 3 x 206 credits.
  - 15 reels + covers in reels/, 2 IG parts in ig/ (covers ig_covers/). Captions NY_Reels_Titles_Descriptions.txt. Booking sheet NY_booking_sheet.txt.
- BOOKED on Zernio 7 Nov 22:47 UTC (18 posts, UTC). Full video (YouTube) 30 Dec 18:30 = 31 Dec 00:00 IST, id 6aefaa292c2498ae77d88694 (14 tags added by Production plan). Reels R01 30 Dec 19:30, R02-R04 31 Dec, R05-R10 1 Jan, R11-R15 2 Jan (last 22:00); ids R01-R15: 6aefaa332c2498ae77d886e9, 6aefaa35c20d46c5e1f451ca, 6aefaa382c2498ae77d88718, 6aefaa3ac20d46c5e1f451ec, 6aefaa3cc20d46c5e1f45203, 6aefaa3fe82a98ba9dbd94b0, 6aefaa41c20d46c5e1f45211, 6aefaa432c2498ae77d88782, 6aefaa452c2498ae77d88795, 6aefaa48e82a98ba9dbd94bf, 6aefaa49c20d46c5e1f4523d, 6aefaa4b2c2498ae77d887d6, 6aefaa4e2c2498ae77d887f1, 6aefaa502c2498ae77d88808, 6aefaa52c20d46c5e1f45265. IG parts: P1 20 Jan 13:00 (6aefaa2cc20d46c5e1f4519b), P2 20 Jan 16:00 (6aefaa302c2498ae77d886d7). Booked from Drive files (mount lagged).

## 2. What was done
- 6 acts (0-5), 32 shots, Pushpam's voice (Chatterbox), debreath + afftdn. Two QA rounds per act (1 fps sheets + 2 fps motion strips) plus Pushpam's note (party hats floated above heads, fixed in `ny_cast.js` H.partycone).
- Fact fixes vs the transcript: Britain switched in 1752 (not 1751); Rome's first calendar 10 months / 304 days, Numa added Jan/Feb; Julian 46 BCE; Gregorian 4 -> 15 Oct 1582; Russia Feb 1918.

## 3. Reusable for the next video
- `production/ny_sets.js` (14 sets incl. Times Square, Vatican, Georgian London, bedroom, Moscow), `ny_cast.js` (40 characters, headwear: laurel, circlet, babcap, hood, nightcap, tricorne, ushanka, partycone, beanie, zucchetto; `S.nyJanus` two-faced bust), `ny_lib.js` (calendar page, fireworks, confetti, countdown numbers, rubber stamp, crowd row, snow).
- Lying-in-bed cross-fade (body4.js `INBED`) for sleep scenes; the rig can't lie down.
- Whisper word times are badly off on fast lists (countdowns). Patch `timing.json` words from the vo.wav energy envelope (50 ms bins) and rewrite timing.js.
- `shared/qa_act_sheets.sh N` now takes `V=<video slug>`. The /watch tool is not in the container after a restart: `git archive origin/claude/project-thread-6cjl04 tools/claude-video | tar -x -C /tmp/claude-0/cv`.
- Reel covers: check that cover text (65-88% of height) doesn't sit over faces; use tz 1.2-1.5 with thy 0 to frame props/signs instead of people.
- Hats: check close crops of every headwear; cones must sit on the crown.

## 4. Open items
- Booking IDs from Production plan (fill in above).

## 5. Cleanup
- Scratch frames/stills in /tmp/claude-0 can be deleted. Control Room: not used.
