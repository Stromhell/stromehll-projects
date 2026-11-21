# DumDown: rules for every video from video 11 on (Pushpam feedback, 21 Nov 2026 10:44 UTC, after The Marvels)

Read this before writing the script. These add to DumDown-setup-plan-v4.md; where they differ, this file wins.

## 1. Acting animation (characters must DO what the narrator says)
- When the line says punch, the character actually throws a punch with wind-up, hit and follow-through (not a static "punch" pose that just appears). Same for fly, run, fall, hug, grab, throw, swap places, get hit.
- Every verb in the VO that a character does gets a keyed action (anticipation, action, settle), timed to the word.
- Before building, find and learn a proper character animation tool/skill (search skills with SearchSkills/find-skills; check MotionMaxx motion-kit `bash /mnt/project-files/tools/motion-kit/setup.sh`; look for rig/bone tweening libraries usable in our canvas engine). Write what was learned into the handover.

## 2. Framing (proper composition in every shot)
- No graphic (pop label, card, prop, sign) may overlap a character. No graphics pushed far to the left or bottom edge; keep everything inside a safe frame and balanced.
- Characters fill the frame properly (no tiny figures in a big empty plate, no heads or feet cut off by accident).
- Use design-taste and impeccable skills (anthropic-skills:design-taste-frontend, anthropic-skills:impeccable) on proof sheets; fix every flagged shot before the full render.

## 3. Cutaway gags must cut the scene cleanly
- Before a gag, the current scene ends (its shot finishes, the line finishes); it must not still be running or continue awkwardly. After the gag, start a fresh shot. Check every gag in/out point on the full video.

## 4. Voice
- Narrator uses the voice from the Spider-Man: Brand New Day video for EVERYTHING (narrator and gags): Chatterbox with the Fenrir reference (animation/vo_cb.py, voice_ref/fenrir_ref.wav, exaggeration .75 cfg .35, run with /tmp/vt/cb/bin/python; repo branch claude/project-thread-p09u9z, dumdown/scripts/spider-man-brand-new-day/animation). Gags get character variations of it, not Kokoro.

## 5. Jokes (funny, engaging)
- Research how comedy writers build jokes (setup/punchline, rule of three, callbacks, misdirection, escalation, act-outs) and write the gags and narration on that. Use skills: hook-generator, yt-script, yt-retention, yt-viral. Every 20-30 s needs a laugh or a surprise.
- Family-friendly stays (no swearing, no adult jokes).

## 6. Engagement test before sharing
- When the video is made, run an engagement/retention test (yt-retention skill + any retention-prediction tool found and installed), fix the weak spots it finds (slow openings, long talk without a joke or visual change), re-test, then share.

## 7. Packaging for views
- Pushpam is OK with theory angles and clickbait-style titles and thumbnails to get views (still family-friendly, no false shock claims about real people). Test 2-3 title/thumbnail options per video.
