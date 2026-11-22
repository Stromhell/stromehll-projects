# G6 QA + fix brief (one agent per group of acts)

Read first: gta6-story/production/ACT_BRIEF.md (rules), /mnt/project-files/system/qa/RENDER-QA-CHECKLIST.md (the checklist), and the example note gta6-story/production/qa/act0-round1.md.
Repo: /home/user/repo/2d-history (branch claude/project-thread-hwk5es). Do NOT commit/push, never delete files, only edit your own acts' body.js. Don't edit shared/, prime/, g6_kit.js, plates.

For each act N you own:
1. The act is rendered at gta6-story/production/acts/actN/actN.mp4 with real voice timing (timing.js from Whisper). If `actN_qa/sheets/` doesn't exist, run `python3 /mnt/project-files/system/qa/qa_auto.py gta6-story/production/acts/actN/actN.mp4 --kind act`. READ every sheet (1 frame per second, timestamped) and the qa_auto table.
2. Write gta6-story/production/qa/actN-round1.md like the example: each issue with time, severity (HIGH/MED/LOW), cause, concrete fix. Look hard for: plain/empty backgrounds, frozen camera >3 s, overlaps between characters or through props/vehicles, floating people/props, pop-ins, text over faces/bodies or in the bottom subtitle band, wrong scale (vehicles too small), action not matching the VO line at that moment (cards landing on the wrong word now that timing is real), cards left on screen too long, clipped text, missing name tags, missing running devices (trust board / walk-away card / Tommy jar per ACT_BRIEF).
3. Fix EVERY HIGH and MED issue (and LOWs that are quick) in actN/body.js, rebuild with `bash gta6-story/production/acts/mk.sh N "title"` (timing.js stays as is), verify with `node shared/snap.js gta6-story/production/acts/actN/act.html /tmp/claude-0/-home-user/d00c403b-8070-5167-b171-c1550bf31c6c/scratchpad/fixN.jpg t1,t2,...` at the problem times and look. No [pageerror]. Do NOT run full renders; the lead re-renders.
4. Report back in a few lines per act: issues found/fixed, anything left.
