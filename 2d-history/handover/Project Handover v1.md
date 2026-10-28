# YouTube History Video Launches: Full Project Handover (v1)

Written 28 Oct 2026, 17:30 UTC, from every thread in the project, the project chat, project memory and the shared folder `/mnt/project-files/`. Anyone (a new thread, a new coordinator, another project) should be able to pick up the work from this file alone.

Owner: **Pushpam** (GitHub `Stromhell`). YouTube channel: **Stromhell** (@latentindiaclips). Repo attached to the project: `Stromhell/stromehll-projects` (empty, nothing has been committed there; all work lives in the shared folder).

---

## Contents

1. What the project is for
2. Standing rules (the non-negotiables)
3. Current status of every video and the launch calendar
4. Open tasks
5. The production pipeline, step by step
6. Key files and folders
7. The Production Control Room (board) and how to log to it
8. Tools, accounts and environment limits
9. The house style (look, characters, sound)
10. Pushpam's feedback: every message, grouped, with patterns
11. Skills used and when
12. What makes a video great here: lessons learned
13. Gotchas and hard-won technical notes
14. Link index

---

## 1. What the project is for

Pushpam pastes the transcript of another creator's video (English, Hindi or Urdu). We turn it into an **original, fact-checked, 12 to 15 minute animated history/explainer documentary** in a calm serious tone, narrated in **Pushpam's own cloned voice**, then package it for YouTube (thumbnail, title, description with chapters, tags), cut **15 vertical reels** from its most viral moments, and **schedule everything on YouTube and Instagram through Zernio**.

The visual style is 2D with 3D touches: round white-headed ink characters, painted backgrounds, parchment maps with faces, 3D props from the anatomy skill, slow parallax camera moves. It started with "The Great War" series (Part 1 made in an earlier session, Part 2 made here) and every later video reuses that pipeline.

Videos so far: Great War Part 2, Hitler's early life, Salman al-Farsi, Osho on the ego, El Mencho, LEGO, Secret Service. A FlyDubai Hijacking video is made in a different project but shows on our board.

---

## 2. Standing rules (the non-negotiables)

Each rule lists when Pushpam set it. If a rule here conflicts with older notes, the newer rule wins.

### Script and content
1. **Original script, never copied wording.** Rewrite the transcript fully in our own words. Drop every sponsor read (Brilliant, Shopify, Zocdoc...), plugs for the other channel, and interview clips with other creators.
2. **Fact-check everything.** List each fix against the transcript at the end of the script file (for example "12:30, not 1:25"; "TEN rules, not six"). Unverifiable claims get dropped or flagged on screen.
3. **Tone:** calm, serious documentary like Great War Part 1. No jokes, no gag cards (26 Oct: "match the video tone to the first video").
4. **Sensitive subjects:** non-graphic violence (cut away, shadows, distant flashes). Hitler video: his own claims tagged "HIS VERSION", false racial ideas and the stab-in-the-back myth stated as false, no Nazi symbols in the video itself (the thumbnail later got an exception, see 3.2). Salman: the Prophet ﷺ is never drawn in any form, not even hands; companions faceless after conversion; caliphs never shown. Osho: politics neutral, Trump never drawn. LEGO: generic bricks only, no logo or trademark art, criticism framed as criticism.
5. **Run every script through the YouTube/social skills** (26 Oct): yt-script (hookscore), hook-generator, yt-retention, no-ai-slop, humanizer, yt-package, yt-chapters, yt-viral.
6. **Script approval first.** Write script + storyboard artifact, send for approval, start production only after Pushpam says go ("cool go ahead").

### Voice and audio
7. **All narration in Pushpam's own voice** (26 Oct 20:18: "use that voice in all the act... make sure using that voice all over the project"). Skill `anthropic-skills:pushpam-voice` (voice built in) or `my-voice` (local Chatterbox, free, no credits). Never an ElevenLabs voice for narration. Reels hooks and CTAs also in his voice.
8. **SFX well under the VO** (26 Oct 17:24 GW2 and 27 Oct 21:21 Hitler: "sound effects... too loud... the VO is the more prominent... do the fade properly"). Effects about -7 dB, sidechain-ducked under the voice, soft fade in/out on every effect, final loudness about -16 LUFS.
9. **More SFX and a background music bed on combine, never overpowering the VO** (28 Oct, said on Salman, Osho, El Mencho, LEGO and Secret Service). Use many varied effects, not the same few repeated (27 Oct Hitler review).

### Images
10. **ElevenLabs images: YouTube thumbnails only** (28 Oct, repeated in every video thread: "u can use eleven labs but only for yt thumbnail"). Never for video frames. History: 26 Oct 14:08 "don't generate any image from ElevenLabs, it's only for audio"; GW2 thumbnail was the first exception.
11. For frames: try Canva, Mage, ImagineArt, Gemini/Nano Banana, Artlist first; in this cloud env their downloads are blocked, so backgrounds are **painted in code** (canvas brush engine) and must look like real paintings.

### Production flow
12. **One act at a time, each its own video.** Do NOT combine until Pushpam says "combine" (26 Oct 17:02, 20:59 and in every video thread).
13. **After combine: thumbnail, title, description, then 15 reels** from the most viral moments using all social skills (27 Oct 20:08). Reels: vertical, 15 to 60 s, hook in the first seconds, end with "watch the full video on our YouTube channel", Pushpam's voice, **no thumbnails for reels** (27 Oct 21:35).
14. **Every frame through the design skills.** Use anatomy (3D props), design-taste-frontend and impeccable on stills; if a frame looks blocky or plain, add shadows and detail (26 Oct 09:49 and repeated).
15. **2D with 3D elements, not full 3D** (26 Oct 18:47).

### Project operations
16. **Concurrency: 2 video production threads at a time** (27 Oct 20:21). Drop to 1 if 2 hours remain in the usage window and usage is above 80%; back to 2 when the limit refreshes. The coordinator can't see usage, so act when Pushpam says. When a thread finishes or waits on Pushpam's approval, the next queued video starts. Approved finishing work may run over.
17. **Production Control Room, forever** (27 Oct 21:25 and 21:37): every thread logs each of Pushpam's feedback messages and every status change/milestone via `post.py` (section 7).
18. **Close finished videos** (28 Oct 01:58): when a video is fully done (full video, thumbnail, 15 reels, scheduled), resolve its thread and remove it from the board (`--status closed`).
19. **Previews on the board** (28 Oct 02:02): every storyboard, act preview and full preview gets linked on the video's card (`post.py VIDEO preview "Label" URL`).
20. **Share previews as artifacts.** Pushpam can't open `/mnt/project-files` paths (26 Oct 17:32), so every video is shown as a claude.ai Artifact watch page (720p, files under 16 MB each).
21. **Show progress** with his render-progress-monitor skill for long renders (26 Oct 08:05, 27 Oct 19:01).
22. **Storage:** never delete without Pushpam's OK (question open, see section 4).
23. Earlier rule, less used now: save everything to Google Drive > AI > one folder per video (26 Oct 07:57). Drive connector only takes text, so Drive gets notes docs, not videos.

---

## 3. Current status of every video

### 3.1 Summary table

| Video | Status | Full video goes live | Reels |
|---|---|---|---|
| Great War Part 2 "Who Broke First in World War 1?" | DONE, scheduled | Sat 28 Nov 2026, 06:00 IST (YouTube) | 10 reels YT+IG, 28 Nov to 3 Dec, 8 am and 1 am IST |
| Hitler "The 30 Years That Made Hitler" | DONE, scheduled, thread closed | Fri 30 Oct, 3 pm ET (19:00Z), YouTube only | 15 reels YT+IG, 31 Oct to 7 Nov, 12 pm and 7 pm ET |
| Salman al-Farsi "He Crossed 5,000 km to Find One Man" | DONE, scheduled, closed | Mon 9 Nov, 3 pm ET (20:00Z) | 15 reels, 10 to 17 Nov, noon and 7 pm ET |
| El Mencho "The Rise and Fall of El Mencho" | DONE, scheduled, closed | Wed 11 Nov, 3 pm ET | 15 reels, 12 to 19 Nov, 10 am and 5 pm ET |
| Osho "The Tiger Inside You: Osho on the Ego" | DONE, scheduled, closed | Thu 12 Nov, 3 pm ET | 15 reels, 14 to 22 Nov (9 am ET on 14 to 17 Nov, then noon/7 pm) |
| LEGO "How LEGO Got So Big, and Why Fans Are Turning on It" | DONE, scheduled, closed | Mon 30 Nov, 3 pm ET | 15 reels, 1 to 9 Dec (Pushpam's exact slots) |
| Secret Service "How the Secret Service Actually Protects the President" (ZERO FAIL) | **IN PROGRESS: rework after Pushpam's review** | not scheduled | not made yet |
| Great War Part 1 "How a Wrong Turn Started World War 1" | Live since 27 Oct 05:00 IST | underperforming (2 views at 28 h) | WW1 Shorts doing well |
| FlyDubai Hijacking | Other project; row on our board fed by that project | n/a | n/a |

### 3.2 Per-video detail

**Great War Part 2** (`great-war-part2/`). 13:46, intro + 13 acts, 105 shots, script v3 from the real Part 2 transcript (1915 to Versailles), finale of a two-part series. Narrator was ElevenLabs "Matt" (made before the own-voice rule; keep as is). Zernio YouTube post `6adf95a57919771d329c6159` at 28 Nov 00:30 UTC. Thumbnail v2 "4 EMPIRES GONE" with PART 2 badge and small WORLD WAR 1 line. Backup thumbnail B "HOW A 19-YEAR-OLD MADE 4 EMPIRES DISAPPEAR" (Princip); a scheduled task `trig_01P26hay242HW5PexrCZeNpJ` fires 30 Nov 00:35 UTC and swaps it in if Part 2 has under 70% of Part 1's first-48h views. 10 reels (Pushpam asked for 5, then "create more 5"). Reels R6 to R10 open on their own narrated line because ElevenLabs credits ran out. Full 1080p file is gone from `production/full/` (Zernio has it; can be rebuilt from act mp4s + `full/audio/mix_final_*.wav`).

**Hitler early life** (`hitler-early-life/`). 13:46, cold open + 10 acts. Approved script 26 Oct 18:47. Big review 27 Oct 18:20, fixes, combine, SFX remix (v2 mix). Zernio full post `6ae14e34fe631a0abf51fe43`. Thumbnail v2 (Pushpam 28 Oct 01:20 asked for Hitler + Nazi imagery on the thumbnail; ElevenLabs blocked it under its terms, so it was drawn from the video's own Hitler figure in front of a red Nazi flag, "FAILED PAINTER → DICTATOR"). v1 "FAILED PAINTER" kept in `launch/`. Backup title "How Hitler Became Hitler (1889-1919)". Note: `production/out/` is now empty; the full file lives on Zernio.

**Salman al-Farsi** (`salman-al-farsi/`). 11:54, cold open + 9 acts, 118 shots. Zernio full post `6ae1d893eb3ba1ed54c5f32a`. Thumbnail "SOLD AS A SLAVE → GOVERNOR" (young Salman in chains before the sacred fire, pre-conversion so he has a face). Full file present: `production/out/SAF_Full_v1.mp4` (+ 720p copy).

**El Mencho** (`el-mencho/`). 13:04, cold open + 8 acts, 101 shots. Zernio full post `6ae1e5c2c2b6604c4cabe0d5`; reel payloads in `production/reels/build/zernio_plan.json`. Thumbnail "MEXICO'S MOST WANTED / FOUND" (ElevenLabs background). Pushpam chose launch "right after Salman" (2 days later). Full file present: `production/out/EM_Full_v1.mp4`.

**Osho** (`osho-ego/`). 12:09, cold open + 9 acts, 96 shots. Hook: the mouse-to-tiger fable ("punar mushiko bhava"); running visual: the hero's shadow grows cat → dog → tiger and shrinks back to a mouse. Zernio full post `6ae1df4b7db1f3c46e56d325`. Thumbnail "IT'S JUST A MOUSE". Full file present: `production/out/TTI_Full_v1.mp4`.

**LEGO** (`lego-rise-backlash/`). 13:40, cold open + 11 acts, 96 shots. Running device: one red 2x4 brick passed Grandpa Erik (1962) → Dad Jonas → Maya (2026). On-screen title "THE BRICK EMPIRE". Zernio full post `6ae220a33dbe895f1dfc9b05`. Thumbnail "WHY FANS TURNED ON IT". `production/out/LEGO_Full_v1.mp4` is missing (gone by 16:15 on 28 Oct); master copy is on Zernio and the LEGO thread had a local copy.

**Secret Service** (`secret-service/`, board id `secret`). Script v1 approved 28 Oct 10:45: cold open + 9 acts, 101 shots, ~2,460 words. Devices: a made-up attack tagged SCENARIO on screen (cold open, Act 7, Act 8 payoff), a years-since-a-president-was-killed counter, a ring diagram of protection layers. Thumbnail v1 done ("ZERO FAIL / NO SECOND CHANCES", agent in sunglasses turning to a rooftop glint). 15-reel plan done (`reels/Secret Service - Reels plan v1.md`). All 10 parts were first rendered by 15:35 (14:52). **Pushpam's review 16:49 was the harshest yet** ("all the scenes look blocky... why this one feels like it's a bad job"). The thread found the cause (flat-shape backgrounds vs the 3 to 4x more detailed painted plates in other videos), repainted all 31 backgrounds, rebuilt crowds, chairs, car interior and characters, fixed every timestamp, and as of 17:22 UTC is **re-rendering all 10 parts as v3**. The act `out/` folders are currently empty while this runs. Pushpam already approved combining after the fixes.

**Great War Part 1 and Rome.** Daily performance check (routine, 9:00 IST) found on 28 Oct: Part 1 long video 2 views, "Entire History of Rome in 12 Minutes" 1 view, while WW1 Shorts did 1,100 to 1,600 views each and Samay comedy clips did 15,000+. Likely cause: the channel audience is Hindi comedy, so YouTube tests long English history on people who don't click. Proposed fixes in `performance/2026-10-28-daily-check.md` (new titles, a "WRONG TURN" thumbnail, description openers, link every WW1 Short to Part 1 as the related video, pin a comment, cut Rome Shorts). **Waiting for Pushpam to choose.** Nothing changed yet.

### 3.3 Launch calendar (all times as scheduled)

| Date | Post |
|---|---|
| 30 Oct | Hitler full video, 3 pm ET |
| 31 Oct to 7 Nov | Hitler reels, 12 pm / 7 pm ET |
| 9 Nov | Salman full video, 3 pm ET |
| 10 to 17 Nov | Salman reels, noon / 7 pm ET |
| 11 Nov | El Mencho full video, 3 pm ET |
| 12 to 19 Nov | El Mencho reels, 10 am / 5 pm ET |
| 12 Nov | Osho full video, 3 pm ET |
| 14 to 22 Nov | Osho reels (9 am ET 14 to 17 Nov, 7 pm 17 Nov, then noon / 7 pm) |
| 28 Nov | Great War Part 2 full video, 06:00 IST |
| 28 Nov to 3 Dec | GW2 reels, 8 am / 1 am IST |
| 30 Nov | LEGO full video, 3 pm ET; GW2 thumbnail-swap check 00:35 UTC |
| 1 to 9 Dec | LEGO reels |
| after 9 Dec (suggested) | Secret Service full video, then its reels |

Scheduling conventions Pushpam has used: full videos YouTube only, never Instagram; reels go to YouTube Shorts and Instagram, start the day after the full video, at most about 3 reels a day, in story order, slots chosen not to clash with other videos' reels.

---

## 4. Open tasks

| # | Task | Owner / waiting on | Notes |
|---|---|---|---|
| 1 | Secret Service rework: finish v3 re-render of all 10 parts, update previews page, then smoother-motion pass and taste/impeccable review | Secret Service thread (working) | Combine already approved after fixes |
| 2 | Secret Service combine with more SFX + music bed under VO, title, description, chapters, 15 reels, Zernio scheduling, close on board | Secret Service thread, then **Pushpam for a launch date** | Free dates are after 30 Nov / after LEGO reels end 9 Dec |
| 3 | Storage cleanup decision | **Pushpam** | Project storage is 9.9 of 10 GB. Coordinator asked 28 Oct 11:54 whether to delete old working files (per-act renders, raw VO) of finished videos, keeping finals, thumbnails and reels. No answer yet. Do not delete without his OK. A write bigger than the free space is silently refused, so keep renders in scratch and copy only finals. |
| 4 | Performance-check fixes for Great War Part 1 and Rome | **Pushpam** | Pick from the report; nothing applied yet |
| 5 | Missing full-video files: LEGO (`production/out/` empty), Hitler (`production/out/` empty), GW2 (`production/full/` has only build/audio) | Pushpam to say if he wants them restored | Zernio holds the uploads, so the scheduled posts are fine. GW2 can be rebuilt from act mp4s + remixed audio. |
| 6 | GW2 thumbnail swap at 48 h | Automatic task 30 Nov 00:35 UTC | Rule: under 70% of Part 1's first-48h views → swap to thumbnail B |
| 7 | Hitler backup title / other backup titles after 48 h if CTR is weak | Whoever watches performance | Backups listed in each `title-and-tags.txt` |
| 8 | Next videos | Pushpam sends a new transcript | Queue is empty |

---

## 5. The production pipeline, step by step

This is the pipeline every video since Hitler uses. Folder layout per video: `<video>/build/` (script generator), `<video>/storyboard/`, `<video>/production/` (shared tools, voice, one folder per act, music, out, reels), `<video>/launch/` (thumbnail, title, description).

### Step 1. Script
- Read the transcript, fact-check (news, books, primary sources), drop sponsor/plugs.
- Generate the script from a data file: `build/data.py` (acts, shots with id, seconds, shot type, VO, on screen, build/detail, motion/SFX, date tag, title, overlay) + `build/gen.py` → `<video>-production-script.md` and a storyboard HTML built from the Hitler/Salman template (`sections_top.md`, `sections_bottom.md`).
- Run the social skills on it (hook scored with yt-script hookscore; retention signposts; humanizer/no-ai-slop).
- Typical size: cold open + 8 to 11 acts, about 100 shots, 2,000 to 2,500 words, 12 to 16 minutes.
- Publish the storyboard as an artifact, post script + storyboard + fact fixes + recommended title, wait for approval.

### Step 2. Voice (Pushpam's voice)
- Write each act's narration to `production/voice/actN.txt` with **years written as words** and **phonetic spellings** for hard names (no hyphens: hyphens cause choppy pauses).
- Generate with the pushpam-voice skill's `speak.py` (Chatterbox, CPU, roughly 10 to 25 min per act). Secret Service settings: `--energy 0.45 --pace 0.42 --pause 0.45`; Hitler used `--energy 0.4 --pace 0.4 --pause 0.45`. `voice/genall.sh` runs every act in the background and resumes where it stopped.
- Get word timings with local whisper (`wt.py`; medium.en with small.en gap-fill, because small.en mishears names and skips lines).
- **Listen/check for misreads** and re-voice only the bad sentence, splice it in, keep the raw take as `vo_actN_raw.wav`. Real examples: "pirates" → "pilots", "digital pets" → "digital pegs", "net sales" → "next sales", "2025" read as "2005", doubled "the hospital", doubled "He fires", garbled "Unlock. Open. Scroll.", Sanskrit lines, German words. Update the script text so subtitles match.

### Step 3. Backgrounds (plates)
- Painted in code with the canvas brush engine in `production/shared/p2/` (`engine.js`, `paint.js`, `plates.js`, `extra.js`): `node paint.js name1,name2` (comma separated) → `plates/<name>.jpg` at 2560x1440.
- They must read as **paintings**: layered light, textures, props, depth, period detail, rustic materials. Flat shapes get rejected (Secret Service lesson).
- Maps drawn from real geodata (`mkmap.py`/`mapM.py`, historical-basemaps for 1914/1920 borders, Natural Earth coastlines) into `mapdata.part`.

### Step 4. Props and characters
- 3D props from the anatomy kit (`mk3d_*.mjs` → `propsN.part`, front-on camera azimuth 90, elevation 18). Examples: tables, benches, beds, chairs, crates, bricks, desks, crowns, calendars, telegraph keys.
- Characters from `walker.js` (shared rig): round heads, ink faces with eased blinks and tapered brows, costume presets (coats, caps, options like glasses, wreath, veil, helmet), walk cycle, stand idle, seated poses, push, reach. Video-specific kits: `emkit.part`, `sskit.part`, `salman.part`, `osho.part`, `animals.js` (mouse, cat, dog, tiger).

### Step 5. Scenes and timing
- `actN/build/scenes.part` defines `scene(id, start, end, fn)` blocks drawing SVG for time `t`.
- `mktiming.py` matches each shot's first words in the whisper word list → `timing.part` (`TS` scene starts, `W('phrase')` / `WS('phrase')` word-time lookups) so cuts, pops and text land on the spoken word.
- `mksubs.py` builds `subs.part`: VO-timed dynamic subtitles that move top/bottom so they never cover a character (`SUBPOS[sceneId]` overrides).
- `post.part`: 0.8 s crossfades between scenes, grain and vignette.
- `build_act.sh <actdir>` concatenates kit + helpers + kits + mapdata + timing + scenes + post + subs → `act.html`.

### Step 6. Check before rendering
- Stills of every scene (`snap.js`/`snapscenes.js`) and consecutive-frame contact sheets (`sheet.py`) for motion.
- Run design-taste-frontend and impeccable on the stills; fix floating figures, overlaps, blocky areas, text overflow.

### Step 7. Render and mix
- `render.js`: Playwright, 1920x1080, 30 fps, JPEG q93, 3 to 4 workers in parallel (`START`/`END` env re-render a frame range). Writes `cues.json` (every SFX cue the animation fires).
- Mixer (`mix.py` / `ssmix.py` / `omix.py`): VO at its offset (0.3 s acts, 0.4 s cold open), varied SFX placed at cues (rotating whooshes/pops, footsteps by surface, per-scene ambience, spot effects), effects about -7 dB, sidechain duck under VO (threshold 0.015, ratio 6, attack 40 ms, release 600 ms), 40 ms fade-in on one-shots, 0.5 s on loops, 1.2 s on ambience, loudness about -16 LUFS. Secret Service added a music bed per act (`mkmusic.py`, moods tense/solemn, about 12 dB under VO).
- `render_part.sh` builds, renders in scratch, mixes, encodes (libx264 crf 20, aac 192k, faststart) and copies only the final mp4 to the shared folder.

### Step 8. Preview and review
- Publish each act as a 720p artifact (or one previews page per video with every act), add it to the board with `post.py VIDEO preview`.
- Post a short message per act; keep going to the next act; never combine.
- When all acts are done, ask Pushpam to review. He replies with timestamped notes per act, plus general notes, usually ending with "and combine...".

### Step 9. Fix, then combine
- Fix each timestamp, re-render only changed parts (versions v2, v3; delete superseded renders now that storage is tight).
- Combine script (`combine.py`, `remix.py`/`remix.sh`, `build_full.sh`): extra SFX at every scene change, ambience per act, synthesized music bed ducked under a full-length VO key, 0.8 s crossfades, loudness -16 LUFS. Combine from local copies, not straight off the mount.
- Publish the full video as a multi-part 720p watch page (artifacts cap each file at 16 MB, so split into parts).

### Step 10. Launch package
- Thumbnail: ElevenLabs image (gemini-3-pro-image or gpt-image) for the background only, text added in code (`thumb.html` with Anton/Poppins, rendered with Playwright). 2 to 4 big words, one subject, readable at phone size. Reviewed with taste/impeccable and the youtube-thumbnail skill.
- Title (scored with yt-package, plus 2 backups for an A/B swap after 48 h), description (search-friendly first two lines, chapters re-timed to the real cut, sources note), tags. Files: `launch/description.txt`, `launch/title-and-tags.txt`.

### Step 11. 15 reels
- Pick 15 self-contained moments (yt-shorts), write and score hooks (hook-generator, yt-viral, reels-scripting), voice the hooks and CTA in Pushpam's voice.
- `reels/build/reels.json` (start/end phrases matched to each act's subs) → `build_reels.py` renders the subtitle-free act HTML (`act_nosub.html`) and builds 1080x1920 reels: 16:9 clip on a blurred copy, kicker, word-by-word captions (with a name-spelling fix map, `FIXW`), quiet mix, end card "Watch the full video on our YouTube channel". 25 to 59 s each.
- Captions, Shorts titles (end in #shorts) and hashtags in `reels/<prefix> - Reels v1 notes.md`. Reels preview page artifact.

### Step 12. Schedule and close
- Ask Pushpam for the launch date (or use his slots). Upload to Zernio (presign + curl PUT works from the sandbox), create the full-video post (YouTube only) and 15 reel posts (YouTube + Instagram). Save payloads (`zernio_plan.json`). `posts_create` can time out but still succeed: check `posts_list` before retrying.
- Log DONE on the board with `--status closed`, write the Zernio ids to memory, resolve the thread, tell the coordinator so the next queued video starts.

---

## 6. Key files and folders

### Shared folder `/mnt/project-files/`

| Path | What it is |
|---|---|
| `production-board/` | Control Room: `board.json` (cards), `board.py` (scans folders, builds snapshot, `--push`), `post.py` (logging), `updates.jsonl` (feed), `template.html` + `build_page.py` (page source of truth), `tick.sh` |
| `great-war-part2/style-guide/GW2 - Video Style Guide v1.md` | The portable style guide (also a Google Doc). Read it before any new video. |
| `performance/2026-10-28-daily-check.md` | Latest performance report and suggested fixes |
| `handover/Project Handover v1.md` | This file |
| `uploads/hearth/` | Files Pushpam uploaded (including his voice reference clip) |

### Per video

| Video | Script | Shared tools | Finals | Launch | Reels |
|---|---|---|---|---|---|
| GW2 | `great-war-part2-production-script.md`, `build/script-v3/` | per-act `build/` (head.part, helpers, kit2, propsN, scenesN, walker.js, render.js), `mapw.py`, `mkplates*.js`, `mk3d*.mjs`, `full/build/patchmix.py` | act mp4s in `production/actN/`; `full/audio/mix_final_*.wav` | `launch/` (v2 thumb, thumb B, chapters, description, tags) | `production/reels/` (10), `reels/build/reels.py`, `align.py` |
| Hitler | `hitler-early-life-production-script.md`, `build/data.py`+`gen.py` | `production/shared/` (combine.py, mix.py, mix_v1.py, mksubs.py, post.part, render_part.sh, render_all.sh, sheet.py, snapscenes.js), `shared3d/` | out/ empty (on Zernio) | `launch/` (HEL_Thumbnail_v1/v2, thumb_scene.js, shot.js) | `production/reels/` (15), `HEL - Reels v1 notes.md` |
| Salman | `salman-al-farsi-production-script.md` | `production/shared/` (kit, helpers, salman.part, post.part, tail.part, walker.js, p2 painter, mix.py, remix.py, mksubs.py, mktiming.py, render_act.sh, vo_all.sh) | `production/out/SAF_Full_v1.mp4` | `launch/` | `production/reels/` (15) |
| Osho | `osho-ego-production-script.md` | `production/shared/` (render.sh, omix.py, remix.py, mkmusic.py, wt.py, animals.js, walker.js) | `production/out/TTI_Full_v1.mp4` | `production/launch/` | `production/reels/` (15) |
| El Mencho | `el-mencho-production-script.md`, `build/acts.json` | `production/shared/` (emkit.part, mix.py, mix2.py, mkmusic.py, remix.sh, combine.py, tlib.py, wt.py, render_part.sh, maps) | `production/out/EM_Full_v1.mp4`; each act `actN/EM_ActN_final.mp4` | `launch/` (+ `src/thumb.html`) | `production/reels/` (15), `build/zernio_plan.json` |
| LEGO | `lego-rise-backlash-production-script.md` | `production/shared/` (build_full.sh, mix.py, mix2.py, mkmusic.py, mk3d_bricks.mjs, mk3d_home.mjs, mkmap.py, walker.js, wt.py) | out/ empty (on Zernio) | `launch/` | `production/reels/` (15) |
| Secret Service | `secret-service-production-script.md`, `build/data.py` | `production/shared/` (kit, helpers, emkit, sskit.part, mapdata.part, build_act.sh, render.js, render_part.sh, ssmix.py, mksfx.py, mkmusic.py, mktiming.py, mksubs.py, wt.py, walker.js, p2/) | rendering v3 now | `launch/SS_Thumbnail_v1.jpg` | `reels/Secret Service - Reels plan v1.md` |

Secret Service act folders: `act0-coldopen, act1-dallas, act2-afterdallas, act3-zerofail, act4-eyes, act5-sixshots, act6-threats, act7-sevenmin, act8-newthreats, act9-rust` (each `build/` with `act.html, scenes.part, timing.part, subs.part, plates/, p2/`, plus `out/`). Per act: `mktiming.py N` + `mksubs.py N` + `build_act.sh` + `render_part.sh <actdir> <vo> <out> [tense|solemn]`.

### Project memory (`/tmp/claude/memory/team/silo/`)
`MEMORY.md` index plus one file per subject: `great-war-series`, `great-war-production-rules`, `great-war-part2-v3`, `-acts`, `-launch`, `-reels`, `hitler-early-life`, `hitler-early-life-revision`, `salman-al-farsi`, `osho-ego`, `el-mencho`, `lego-rise-backlash`, `secret-service`, `production-board`, `production-control-room`, `reels-after-final-video`, `sound-mix-feedback`.

---

## 7. The Production Control Room (board)

- Page (pinned): https://claude.ai/artifact/EbHs3wuQ4PB1FS5Y1BvvxN. Animated bars per video, elapsed time, time left, queue strip, "Latest" and "Your feedback" lines per card, Previews row, and a feed of every update. Built in the thread "Build live production progress board", which pushes every 10 minutes.
- Log from any thread:

```
python3 /mnt/project-files/production-board/post.py VIDEO KIND "text" [--status working|paused|queued|waiting|done|closed] [--stage "one line"]
#   VIDEO: hitler | salman | osho | elmencho | lego | secret | all
#   KIND:  update | feedback | rule | preview
python3 /mnt/project-files/production-board/post.py secret preview "Act 3" https://claude.ai/artifact/XXXX
```

- `--status closed` removes a finished video and its feed entries. New videos must be added to `board.json` (ask the board thread). Approval to combine: set `"approved_combine": true` and `"combine_started"` in that video's entry, or the card stays "waiting".
- Estimates the board uses: 25 min per act build+render, VO minutes per shot by video, combine 30, check 10, 15 reels 100 min. Times exclude waits for Pushpam.
- Edit `template.html` and rebuild with `build_page.py`; never hand-edit the published page.
- FlyDubai's row comes from db doc `external/flydubai`, written by the other project.
- There is also a pinned status post in the project chat (message `cmsg_011wYAodKWybDUtqksvFYNqKQFV5owrvD61tmNNHJkuak3`) that the coordinator edits on every start/pause/finish.

---

## 8. Tools, accounts and environment limits

| Need | What works | Notes |
|---|---|---|
| Narration | pushpam-voice / my-voice skill (Chatterbox, local CPU) | venv at `/root/.cache/pushpam-voice/venv` (reinstall in each new container, a few minutes). Script: `/root/.claude/skills/synced/*/pushpam-voice/scripts/speak.py`. ~2x realtime after ~90 s load. |
| Word timings | local faster-whisper (`wt.py`), vosk aligner (`align.py`) | free; ElevenLabs transcription costs credits |
| SFX | ElevenLabs sound effects library already generated in each video's `sfx/` folders; synthesized extras (`mksfx.py`) | ElevenLabs SFX come back 1 to 6 s, loop them |
| Music bed | synthesized (`mkmusic.py`) | Salman used an ElevenLabs music bed once |
| Thumbnail background | ElevenLabs image (gemini-3-pro-image, gpt-image) | allowed for thumbnails only; credits run low; it refuses Hitler/swastika prompts |
| Frame images | code-painted plates | Canva (199 px previews only), Mage (cdn3.mage.space), ImagineArt (asset.imagine.art; free tokens used up), Artlist download hosts are blocked by the cloud proxy. To use them, Pushpam would add a custom cloud environment with those hosts allowed. |
| Scheduling | Zernio | YouTube account `6add4e45e997d795ad6dfc72` (Stromhell, @latentindiaclips), Instagram `6add4e3335057a25ed050012` |
| Analytics | Zernio analytics (daily check routine) | yt-viral can't reach YouTube from the sandbox |
| Docs | Google Drive (text only) | big videos can't go to Drive through the connector |
| Rendering | Playwright Chromium + ffmpeg | preinstalled |

Credit history: ElevenLabs ran out on 26 Oct (294 credits left), later topped up enough for thumbnails. Don't spend ElevenLabs credits on anything but thumbnails.

---

## 9. The house style

Full detail is in the style guide (`great-war-part2/style-guide/GW2 - Video Style Guide v1.md`). The essentials:

- **Look:** calm, serious 2D documentary. Detailed painted backgrounds, round white-headed ink characters, parchment maps from real borders with small faces on nations, bold condensed white titles with thick dark outlines, dark era badge top left, slanted white date tag bottom right, warm sepia grade, film grain (~13%), soft vignette. 2D with 3D elements: anatomy-kit props, layered depth, parallax camera push-ins.
- **Type:** Anton for titles/labels/badges/tags, Oswald Bold for secondary text. Callout cards off-white with ink border, rotated about -4°.
- **Palette:** ink #2b1e16 / #1d1712, parchment #ead8ae → #dcc28f, gold #e9b54a, red #b8322a, skin #fffdf8. Faction colours for maps listed in the style guide.
- **Characters:** no nose or ears, ink-oval eyes, eased blinks (~0.28 s, sin² curve, own timer per figure), tapered lens-shaped brows set by mood, one-stroke mouth. Costumes carry the detail (lapels, ties, pockets, belts, buttons, real shoes, hair). Near limbs lighter in front, far limbs darker behind.
- **Motion:** one gait phase drives everything; legs ±26°, knees bend in swing, arms ±34° opposite their own-side leg, body bobs twice per stride, feet don't slide. Idle breathing, sway, blinks. Every figure on screen moves. All transitions eased; props pop with small overshoot.
- **Grounding:** feet on a visible surface or hidden by foreground, contact shadow matching the light, scale matched to nearby objects, colour grade/rim light matching the plate. Behind the far edge of tables. Seated figures on a real seat. Crowds follow the ground line.
- **Text timing:** text and cards appear on the spoken word (timed from whisper words), never late.
- **Sound:** voice on top; varied SFX under it; ambience per scene; music bed on combine; soft fades; -16 LUFS.
- **Story devices that worked:** a running object or tally (WW1 "ALLIES 8 / CENTRAL 2", "AGE n" tag for Hitler, LEGO's red brick through three generations, Osho's growing shadow, Secret Service SCENARIO tag and years-counter), a question hook answered at the end, a signpost line at every act change, recap of the previous part before the title.

---

## 10. Pushpam's feedback: every message, grouped

Quoted close to his words (typos tidied). Use this to predict what he will catch.

### 10.1 Great War Part 2 (26 Oct)
- "match the video tone to the first video" → serious, no jokes.
- "use all the social skills to write the viral script"; "make sure you run the script through all the social skills".
- "I have added anatomy skill which will help creating 3D objects... make every shot detailed if it feels too blocky and use taste and impeccable skills on frames to have visually stunning shots."
- "add some short summary about part one after the hook... this is the last part... make sure all concluded in this video."
- "first generate single act, at the end join all the parts in single video."
- "use all the design skills... design the characters, make their animation human-like and no abrupt animation... use Canva to generate paintings... every character you put there has moving animation... if it feels blocky and plain then include shadows and details, pass those frames through taste and impeccable."
- Intro: "the character hand animation looks abrupt, looks like both the hands are on same side... same with leg and walking animation."
- Act 1 0:22: "the characters are appearing to be flying and their face lines look abrupt."
- Act 2: "the character eyebrows look bad."
- "try using Canva as much as you can for image generation and Adobe for photo manipulation"; "try using Nano Banana"; "you can also use ImagineArt"; "I have put Gemini also".
- Act 3: "moustache of character is overlapping with eyes and all the characters appear to be floating"; 0:35 "appear to fly in air... for next time, characters should feel they are integrated into the scene"; 1:06 "the 3 characters walking on air, do something different"; 1:36 "the king's legs look weird and he appears too big... make it look like he is sitting on the throne itself."
- Act 4 0:37: "there are lines above the boat, fix that."
- "try all other image generation models before, and if every other model fails then only generate with ElevenLabs"; then "from now on don't generate any image from ElevenLabs, it's only for audio generation."
- "you have the 3D skill with you, you can make use of that"; "keep using the 3D and proper detail and shadowing of character."
- "don't join the full video until I say."
- Full join: "the sound effects added feel too loud, so adjust it properly and fade perfectly and VO is clear."
- "I can not open the files, can you upload it in the drive... or show me the preview files."
- Launch: "schedule it to upload on 28 Nov 6am with Zernio, write the viral title and description... ElevenLabs image generation for thumbnail... go through taste and impeccable... reels more than 15 sec and less than 60 sec and need to have watch full video on the YT channel."
- Thumbnail: "add the World War 1 in small and Part 2 somewhere... create one more thumbnail 'how 19 year old made 4 empires disappear' and use that if for 48 hours the video doesn't perform good."
- Reels: "have most viral hooks"; "create 5 more reels"; "schedule all created reels with viral title and caption on YouTube and Insta, 2 videos daily, one at 8am and other at 1am."
- Praise: "good job" on Acts 7 and 8.

### 10.2 Hitler (26 to 28 Oct)
- On approval: "use all the AI designing tools and animation is smooth... if some frame looks blocky add a lot of detail, highly detailed character and background and shadows to everything, make it look dynamic, choose a dynamic colour... 3D skills anatomy... dynamic camera motion, make it feel like a 3D world... use less ElevenLabs credit... don't use it for image generation... go through taste and impeccable and improve as much as you can."
- "don't do full 3D, do 2D with elements of 3D."
- "add VO with ElevenLabs, use lowest credit... cheapest model... ElevenLabs for VO only" → then "I have made a skill my voice, use that voice in all the acts... all over the project."
- Act 1: 0:28 "make the scene look like a marriage ceremony, include decoration and their uniforms"; 0:55 "the moustache looks weird... standing in very awkward pose, that's the case with all the characters"; "the background looks bland, add some more details, don't slack off"; 1:00 "the carriage is going above the house"; 1:10 "standing in awkward position, make the home more detailed and medieval style... don't make everything look like it's code-generated. Every background shot highly detailed, it should feel like a painting"; 1:58 "the female character looks like she is walking backwards"; "make more use of the 3D skill."
- "after one act is done start other act, don't combine all acts until I say, I will check all the acts when I wake up."
- Review (27 Oct): Act 3 "bed is in air" (0:03, 1:17), "walking cycle is not working" (0:57), "document scaling is very weird, make it smooth" (1:28); Act 4 "text on the red is going outside, use taste and impeccable", "the frame looks bland, add detailing and some more frames according to VO" (0:42); Act 6 "actually show him painting"; Act 7 "the doctor appearing to be flying"; Act 8 "make sure the character is walking on the path"; Act 10 "characters and cup appearing to be flying"; general "all the furniture looks a little weird with the angle... only few sound effects and they are repeating... use multiple sound effects... fading of the scenes is not smooth... dynamic subtitles of what the VO is saying in proper time... no subtitle overlaps any character... combine all the parts... GREAT JOB WITH detailed background and VO, keep it up."
- After combine: "the sound effects are too loud... VO should be more prominent... reduce loudness of effects and do the fade properly."
- "Keep the production control room updated with what's happening."
- "create the thumbnail and video title and description with all the social and design skills... reels... don't need thumbnails... give that to the production planner project to schedule."
- Thumbnail: "you can use ElevenLabs image generator for thumbnails... make it attractive... use a lot of Nazi symbols and Hitler to show it is about him" (we used one flag, explained YouTube restriction risk).
- "Okay thanks, keep the good work going."

### 10.3 Salman (27 to 28 Oct)
- Approved via decision cards (English VO; Prophet ﷺ never drawn, companions faceless).
- "great job, combine all the video, add more sound effect and background music but make sure they don't overpower the VO, create a viral thumbnail and the title and description, you can use ElevenLabs for the thumbnail, use all the social and design skills, then same thing for all the reels but they don't need thumbnail."
- Gave exact schedule; "close when it's done."

### 10.4 Osho (27 to 28 Oct)
- "cool go ahead."
- Review: Act 2 0:19 "the dog hands are not joined"; Act 3 0:54 "the weights are in air", 1:00 "the character cap looks weird, reduce the size"; Act 4 0:43 "the shadow looks weird"; Act 5 0:28 "the paper boat scaling looks weird, make it smooth"; then the standard combine + SFX/music + ElevenLabs thumbnail + reels line.
- Gave exact schedule, "close the thread when the scheduling is done."

### 10.5 El Mencho (27 to 28 Oct)
- "cool go ahead, you know the style and everything, keep at it."
- Review: cold open 0:16 "make the scaling of the car smooth", 0:21 "the car door opens weirdly"; Act 7 0:04 "the dirt path looks weird and overlapping the building"; Act 8 "the car scaling looks weird, make it smooth"; then the standard combine line.
- Launch choice: right after Salman.

### 10.6 LEGO (27 to 28 Oct)
- "cool go ahead."
- Review: cold open 0:40 "make the bricks sit on the table properly", 0:32 "make the zoom smooth and the hand proper"; general "make the 3D objects properly sit on the table and furniture"; then the standard combine line.
- Gave every reel slot himself.

### 10.7 Secret Service (28 Oct)
- Approval: "go ahead with production, do not combine until I approve, add more sound effects and background music but it does not overpower the VO, start creating the YouTube thumbnail, you can use ElevenLabs but only for YT thumbnail, and start with reels, use all social skills for designing and creating and writing."
- Review 16:49 (the most detailed and most critical):
  - Act 1: 0:16 "characters are moving awkwardly in place, either create a walking cycle or do something else"; 0:59 "the character is standing on the car front"; 1:18 "putting himself on the back of the moving car looks weird, make it human-like"; 1:31 "make the character sit properly in the chair".
  - Act 2: 0:20 "the character is sitting on air, put some chair... the stuff on the table also looks weird"; 0:49 "characters that should be behind the car are in front, looks flying"; 1:22 "it's taking too long for the text to appear, add more frames before, according to the VO".
  - Act 3: "the hallway looks blocky, add more details, make it look like a painting"; 0:57 "make the animation of the character start earlier, it looks weird when they suddenly start walking".
  - Act 4: 1:04 "the car interior looks blocky, add more details, make it look like a car inside".
  - Act 6: "characters are walking above the metal detector, make it look like they walk through"; 1:07 "add more details in the background".
  - Act 7: 0:07 "some characters look like they are flying, and add detailed crowd"; 0:34 "they look like they are sitting in air, add chairs".
  - Act 8: "one character looks black, add more detail".
  - Act 9: "characters look blocky"; 0:31 "make him properly jump the fence... improve the animation"; 1:06 "add detailed crowd".
  - General: "all the scenes look blocky, add more detail. All the videos in the other threads look highly detailed, but why does this one feel like a bad job? Make it correct. Make all animation frames smoother and add more frames where possible. Add more detail so it feels like a painting, not generated by code. Take help of all the design skills and pass it through the taste and impeccable skills. Make all the characters highly detailed." Then the standard combine line.

### 10.8 Project-level messages
- Progress: "use the skill I made to show the progress of what's happening and how much time everything is going to take"; "show me the progress with the skill I created"; "create a progress monitor for all the threads... is it waiting for my approval or not, how much progress... at what stage"; "pin it and keep it updated"; "make a custom live progress bar that shows the timing and how much time it will take"; "add the video from FlyDubai Hijacking project in this same also."
- "With everything, my feedback and other updates on ongoing threads, keep the production room updated with everything forever in this project."
- "When video is completed and thread is closed, mark them closed and remove it from production control room, and embed the preview page of all the video threads in there so I can access it directly."
- Concurrency rule (see 2.16). Reels rule (see 2.13).
- "wait stop all the action" (26 Oct 09:23): he will stop work mid-flight; stop immediately and wait.

### 10.9 Patterns in his feedback (what he always checks)

| Pattern | How often | What he says | What to do before he sees it |
|---|---|---|---|
| Floating / flying / sitting on air | Every video | "appears to be flying", "bed is in air", "sitting on air", "weights in air" | Feet, seat, bed legs and props must touch a surface; contact shadow; check every figure at full size |
| Wrong depth order | GW2, SS | "should be behind the car are in front", "standing on the car front", "path overlapping the building", "carriage above the house" | Layer order by ground y; clip behind tables/cars; nothing drawn over what should be in front of it |
| Blocky / code-looking / bland | GW2, Hitler, SS | "blocky", "bland", "looks like code", "don't slack off", "should feel like a painting" | Painted plates with texture, props and layered light; detailed characters and crowds; 3D props |
| Unnatural motion | Every video | "walking in place", "walking backwards", "walk cycle not working", "awkward pose", "hands on same side", "suddenly start walking", "make it human-like", "fence jump" | Real walk cycles with distance covered, eased starts already in motion, natural stand poses, proper climb/jump arcs |
| Jerky scaling / zoom | Hitler, Osho, El Mencho, LEGO | "document scaling weird", "paper boat scaling", "car scaling", "make the zoom smooth" | Eased scale curves, perspective-correct growth, no jumps |
| Weird anatomy / props | GW2, Hitler, Osho, SS | moustache over eyes, eyebrows, dog legs not joined, cap too big, odd shadow, all-black character, hands | Check faces, joints, hats, shadows and colours at full size |
| Missing furniture / context | Hitler, SS | "wedding should look like a ceremony", "add chairs", "show him painting", "stuff on the table looks weird" | If someone sits, draw the chair; if the VO names an action, show it |
| Text timing / overflow | Hitler, SS | "text going outside", "taking too long for text to appear" | Time text to the spoken word; fit text in its box |
| Sound balance | GW2, Hitler, every combine | "effects too loud", "VO prominent", "fade properly", "more SFX and music but don't overpower" | Duck, fade, vary, music bed at combine |
| Process | Everywhere | "don't combine until I say", "use all the skills", "keep the board updated", "close when done" | Follow section 2 |
| Praise | Hitler, GW2 | "great job with detailed background and VO", "good job" | Detailed painted backgrounds and his voice are what he values most |

How he writes feedback: one message per review, act by act, with timestamps (m:ss in the act preview), short imperative notes, then a "general feedback" paragraph, then the next instruction (almost always "combine... more SFX and music... thumbnail with ElevenLabs only... reels with all social skills"). He reviews on waking or in batches, so finish all acts and ask once.

---

## 11. Skills used and when

| Stage | Skills |
|---|---|
| Script | yt-script (hook writing + hookscore), hook-generator, yt-retention, no-ai-slop, humanizer, yt-package (titles), yt-chapters, yt-viral, yt-seo, yt-plan |
| Look and frames | yt-longform-videostyle-stromhell-animation (base house style), anatomy (3D props, isometric/solid parts, four-tone shading), design-taste-frontend (taste), impeccable (polish/critique), graphic-designer, frontend-design, editorial-film-edit / paper-collage-film where useful |
| Voice | pushpam-voice (preferred, voice built in), my-voice |
| Progress | render-progress-monitor |
| Thumbnail | youtube-thumbnail, taste, impeccable |
| Reels | yt-shorts (finding moments), reels-scripting, hook-generator, yt-viral, post-writer, post-formatter, post-scorer |
| Launch / ops | Zernio tools, yt-edit, yt-audit (performance) |

Pushpam's instruction is "use ALL the design skills" and "use ALL the social skills". Say which ones were run when delivering.

---

## 12. What makes a video great here: lessons learned

1. **Detail is the bar.** The Secret Service first cut was rejected because its backgrounds were flat shapes; the approved videos use textured painted plates 3 to 4 times as detailed, with props, layered lighting and depth. Before rendering, compare a still side by side with an approved video (Hitler, Salman, El Mencho). If it looks emptier, it is not ready.
2. **Characters must belong in the painting.** Grounding, shadows, scale, colour grade, seats under sitters, correct layering behind cars and tables. This is the single most repeated complaint across all seven videos.
3. **Motion must read as human.** Walk cycles that cover ground, arms opposite legs, no walking in place, no sudden starts (begin a shot with the figure already moving), proper climb and jump arcs, eased everything. More frames where motion matters.
4. **Smooth camera and scale.** Every zoom, scale and car approach uses eased, perspective-correct curves.
5. **Time everything to the voice.** Cards, text and cuts land on the spoken word from whisper timings. If a shot has long VO, add more visual beats ("more frames according to VO").
6. **Show what the narration says.** "Show him actually painting", "make it look like a ceremony". Literal, specific visuals beat generic ones.
7. **His voice, clean.** Check every act's VO for misreads and doubled words, re-voice the sentence, keep the raw. He praised the VO; keep it that way.
8. **Sound sits under the voice.** Varied effects, ambience, a music bed on combine, all ducked and faded. Repetitive or loud SFX gets flagged every time.
9. **Fact-check and keep it original.** Every script lists its fact fixes; sponsor reads and copied wording are removed. This protects the channel.
10. **Strong packaging.** One subject, 2 to 4 words, readable at phone size, with a backup title and thumbnail for a 48 h swap. Hooks that open with "you", one number, one question.
11. **Running devices tie a video together** (tally sign, AGE tag, red brick, growing shadow, SCENARIO tag).
12. **Self-review before he does.** Contact sheets, full-size stills, taste/impeccable passes, a floating-object sweep of every act. Most of his notes could have been caught by a 4x-zoom check of each scene.
13. **Keep him informed without noise.** One message per finished act with a preview link, board updated at each step, one "ready for review" message when all acts are done.
14. **Audience mismatch is the growth problem, not quality.** Long English history videos get almost no impressions on a channel built on Hindi comedy clips, while WW1 Shorts do well. Linking Shorts to the long videos is the biggest lever (see the performance report).

---

## 13. Gotchas and hard-won technical notes

- **Storage is nearly full (9.9/10 GB).** A write larger than the free space looks saved but is silently refused. Render frames in the session scratchpad, copy only the final mp4, delete superseded versions of your own renders, re-check files ~10 s after writing.
- `/mnt/project-files` is a network mount: no symlinks (use `../../shared/` paths), copying mp4s changes bytes slightly but they decode, reading big files straight off it during a combine once corrupted a run (copy locally first), a 720p write was once truncated (encode locally then copy).
- Full videos have gone missing from `out/` folders (Hitler, LEGO, GW2). Zernio keeps the uploaded copy; keep a local copy until scheduling is confirmed.
- Long jobs need `run_in_background` with a long timeout (default kills at 30 min), and a stable working directory (a deleted cwd broke a remix).
- `pgrep -f render.js` in a wait loop matches itself; wait on the node PIDs.
- A scene switch must not reveal black; use a scale-in plus white flash or the 0.8 s crossfade.
- Chatterbox mangles German, Sanskrit and some names; spell phonetically without hyphens and check with whisper. Whisper small.en mishears names; verify suspect lines with medium.en.
- Subtitles come from the script md, so fix the narration text there too when you re-voice a line.
- Secret Service timing helper is `WS(phrase)`, not `W`. `paint.js` takes plate names comma separated.
- walker.js crowds fall back to a uniform jacket if a coat preset is missing (Secret Service had to add whiteshirt/denim/tee/check).
- Zernio `posts_create` can time out but succeed; list posts before retrying. Presign + curl PUT to media.zernio.com works from the sandbox.
- Artifacts cap each file at 16 MB: split full previews into 720p parts; one publish under 64 MB.
- Threads have an attachment limit; after that, give paths instead.
- ElevenLabs blocks images of Hitler or swastikas; don't retry with other AI tools, build from the video's own art.
- yt-viral can't reach YouTube from the cloud.

---

## 14. Link index

| What | Link |
|---|---|
| Production Control Room (pinned) | https://claude.ai/artifact/EbHs3wuQ4PB1FS5Y1BvvxN |
| Style guide (Google Doc) | https://docs.google.com/document/d/14rU2IlawF2yk_UTczLuMRL1418fvFXtvN0QBUE-vJWk/edit |
| Great War Part 1 storyboard | https://claude.ai/artifact/AveckVvJCmsdT1xdHBnL4h |
| GW2 storyboard v3 | https://claude.ai/artifact/Qx5ukGG6gzHX1Lekt2B83W |
| GW2 full video | https://claude.ai/artifact/GstdNHQP6pSQdAYfNNjeMR |
| GW2 reels | https://claude.ai/artifact/PoUWRCD3QA9YoAZejvXyXK |
| Hitler storyboard | https://claude.ai/artifact/XRK2RXTaXtqEQd45eWevbb |
| Hitler full video | https://claude.ai/artifact/ApdHEsybPpKj6CAgM7H4Kx |
| Hitler launch package + reels | https://claude.ai/artifact/UFureepAEiAeTuxVK2YvGj |
| Salman storyboard | https://claude.ai/artifact/PAmYGjuovqfafa4jLqV5SV |
| Salman full video | https://claude.ai/artifact/LNyb5RYwJEHjx6tXMihQ7P |
| Salman reels | https://claude.ai/artifact/TaNJPzGqBPtQNpC3eqXHEg |
| Osho storyboard | https://claude.ai/artifact/SArgpsve9AdwYBm6Rt94MB |
| Osho full video | https://claude.ai/artifact/SMDYd2cESmbhwKMmvcsYQV |
| El Mencho storyboard | https://claude.ai/artifact/TkvrHobQv14Y46P6b71U2R |
| El Mencho full video | https://claude.ai/artifact/H3FxSdQTPzhDkMhip8KLsv |
| El Mencho reels | https://claude.ai/artifact/WLBK8RASieBAQtsPMGUpqe |
| LEGO storyboard | https://claude.ai/artifact/ViWGEwSgWhXJLfTJgcZCLr |
| LEGO act previews | https://claude.ai/artifact/PK1Tw3DqwgxVUBtxSvEdMj |
| LEGO full video | https://claude.ai/artifact/LJB53m6zNZCE3fpPbmoHQ9 |
| LEGO reels | https://claude.ai/artifact/7Qi53rLT8A88YFK8VQzXMG |
| Secret Service storyboard | https://claude.ai/artifact/HCR4bgy8fXyTLCK7YnRw5P |
| Secret Service act previews | https://claude.ai/artifact/2rAg5s26C8LHU9bCeWh1tt |

### Threads
- Make Secret Service video (active): `cmsg_011wYAodKWybDUtqksvFYNqKPZqH9QAmM23ujQjTgjmoZD`
- Build live production progress board (active): `cmsg_011wYAodKWybDUtqksvFYNqKLJKXN9aSgqhZxacXAYftoF`
- Daily video performance check (waiting on Pushpam): `cmsg_011wYAodKWybDUtqksvFYNqKH9kCMpFhZNJfBm6MpfbivF`
- Closed: Hitler `...KCpUaZVevSbGKEXuNPCjig3`, Salman `...K3WkmUW1ixyLVsiWova7L2r`, Osho `...KHW1pemcvr5PexgmpwLwi6y`, El Mencho `...KF11XvnHopsgVvmLhdU5pup`, LEGO `...KJUbD5GKNrfErGGyvY91P2v`, GW2 script `...K3V3LHVYArFjhCh6NigJG7T`, GW2 schedule `...KFceBckweXLhcx4thXpYHPb`, GW2 reels `...KPM8zcaunsJfDHWxjTe7LJL`, style guide `...K6Tfs2LfNzvnuTXzaYEHYcD` (all prefixed `cmsg_011wYAodKWybDUtqksvFYNq`).
