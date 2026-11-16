# DumDown — setup plan v3 (16 Nov 2026): family-friendly for US + UK kids/teens

Builds on v2 (kept unchanged next to this file). New in v3: the family-friendly rule and US/UK young-viewer optimisation (Pushpam, 16 Nov 2026 17:24 UTC, option B).

## 1. Scope
- Applies to every DumDown video AFTER Spider-Man: Brand New Day. Spider-Man BND stays as made (adult jokes OK). Already booked videos (Loki, Deadpool 2, Ironheart, Agatha, Deadpool & Wolverine) are not edited or moved.
- Family-friendly, NOT YouTube "Made for kids". Audience setting stays "No, it's not made for kids" per video, so comments, bell, end screens, cards and personalised ads keep working. Changing that setting needs Pushpam's OK.
- Target: US + UK kids and teens (about 8-16) and families watching Marvel together.

## 2. Family-friendly script rules (check every script before storyboard)
1. No swearing, not even bleeped or mouthed. Mild words OK: "heck", "dang", "oh crumbs", "what the—" cut-offs.
2. No sexual or innuendo jokes, no "adult" double meanings, no dating/body jokes about anyone.
3. No drink, drugs, smoking or gambling as a joke. Show alcohol only if the plot needs it, never as the gag.
4. Violence stays cartoon: no gore, blood close-ups or lingering death. Deaths are told with care (a beat of heart, then move on).
5. No mean jokes about real people, bodies, race, religion, gender or disability. Tease the characters' choices, not who they are.
6. Humour that suits 8-16: slapstick, silly sound effects, exaggerated reactions, running gags, game/school/snack/pet references, gentle sarcasm, meta jokes about Marvel logic, "the narrator is confused too".
7. Deadpool-type films: if a title is R-rated in the source, either skip it or write a fully clean recap (no quoting swear lines).
8. Scary scenes: say "it gets spooky here" before jump scares; keep horror (e.g. Agatha-type) silly not frightening.
9. QA gate: add a "Family check" line to every script review — read each gag and line against rules 1-8; any doubt = rewrite. Voice, thumbnails and titles get the same check.

## 3. Titles
- Plain, exciting, easy words a 10-year-old can read. 40-60 chars. Show name first.
- Formulas: "<Show> Explained in 20 Minutes (Funny Recap)", "<Show> But It Makes Sense Now", "Everything That Happened in <Show>", "<Show> Ending Explained (Spoilers!)".
- No clickbait shock words like "disturbing", no swearing, no suggestive wording. US spelling in titles (US is the larger audience); British readers are fine with it.

## 4. Descriptions
- Line 1-2: what the video recaps + "funny cartoon recap for Marvel fans of all ages".
- Chapters (timestamps) always.
- Spoiler note, the "Fan-made parody and commentary. Not affiliated with Marvel or Disney." line, and a "Watch next" playlist link.
- No links to outside sites or merch aimed at kids. 2-3 hashtags: #Marvel #MCU #<Show>.

## 5. Tags
- Constant set (channel-seo.md) stays: it already targets beginners/teens.
- Per-video own tags ~200 chars: show name variants, "<show> explained for kids", "<show> recap for teens", "<hero> cartoon", "<show> funny recap", "<show> ending explained".

## 6. Thumbnails
- Bright, saturated colours, big expressive cartoon faces (hero + DumDown mascot reacting), 2-4 word text max in a chunky readable font, subject name highlighted (existing rule).
- No blood, weapons pointed at camera, scary close-ups, or suggestive poses. Funny surprise or "uh-oh" faces work best for this age.
- ElevenLabs still only for long-video thumbnails (existing rule).

## 7. Upload times (US + UK after-school and weekend)
UK after school 16:00-19:00 GMT; US after school 3-6 pm ET (20:00-23:00 UTC) and 12-3 pm PT.
- Weekdays (Mon-Fri): 21:00 UTC first choice (4 pm ET / 1 pm PT / 9 pm UK), then 22:00 UTC, then 16:00 UTC (UK after school, US lunch).
- Weekends (Sat-Sun): 16:00 UTC first choice (11 am ET, 4 pm UK), then 14:00 UTC.
- Friday 21:00 UTC and Saturday 16:00 UTC are the strongest slots for young viewers.
- Still follow the shared DumDown + Finance rule: one video in making, >=48 h after the previous DumDown video. Booked Zernio posts are never moved without Pushpam's ask.
- This replaces the 16/13/17/22 UTC best-time list for DumDown only, from the first video after Spider-Man BND. Note: 21:00 UTC is a new slot, so the pipeline watchdog (check.py) needs it added for DumDown.

## 8. Channel description and keywords
- Use channel-seo.md (already written for US + UK kids and teens). Add one line: "Clean, family-friendly recaps: no swearing, safe to watch with the whole family."
- Keywords: as channel-seo.md plus "Marvel for kids" "family friendly Marvel" "Marvel recap for teens".
- Changing these in YouTube Studio is done by Pushpam, or by Claude via Chrome only after Pushpam says yes.

## 9. Playlists (create when the first clean video is live)
1. Start Here: Marvel for Beginners
2. Marvel Series Recaps (Loki, VisionQuest, Ironheart, Agatha...)
3. Marvel Movie Recaps
4. Spider-Man Recaps
5. Ending Explained
Each video goes in 2 playlists; end screen points to the next playlist video.

## 10. Done / open
- Done: rules + plan v3, memory note.
- Open (needs Pushpam OK): update YouTube Studio channel description/keywords; add 21:00 UTC to watchdog slots; create playlists.
