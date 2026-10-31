# Stormi Production System v1 (approved)

**Channel:** Stormi Explain Everything · **Owner:** Pushpam · **Written:** 30 Oct 2026 (from Pushpam's 13-point brief, 23:52 UTC)
**Status:** APPROVED by Pushpam 31 Oct 2026 00:28 UTC ("good set the system"). Live config: section 1.4. Schedule: section 13. Watchdog: section 17.

This is the one rulebook every thread follows, from a pasted transcript to a scheduled post. It folds in every standing rule already in force (file storage, Control Room, branding, ElevenLabs, Render QA, Graphify/token, Opus 5.5 model rule) so nobody has to hunt for them.

---

## 0. The pipeline at a glance

```
Transcript ──► [1] Script Room ──► [2] Storyboard ──► [3] Narration ──► [4] Acts (build + render)
                  │ routes to a line                                          │
                  ▼                                                           ▼
          2D │ 2D dynamic │ 3D low │ 3D                          [5] SFX + score, mixed under VO
                                                                              │
                                                              [6] Checkup loop per act (watch + peek)
                                                                              │
          [8] Act previews ◄─────────────────────────────────── act CLEAN ◄───┘
                  │
          [7] Combine full video ──► full checkup ──► [8] full preview ──► [9] Pushpam review ──► APPROVED
                                                                                                    │
          [10] 15 reels + Instagram parts ──► [11] titles/descriptions ──► [12] thumbnails ──► [13] Production plan schedules
```

Gates where Pushpam is needed: **only [9] (video approval)**. Everything else runs without waiting. Pushpam also sets the live concurrency per line (section 1.4).

Every stage updates the video's **Control Room card** (https://claude.ai/artifact/EbHs3wuQ4PB1FS5Y1BvvxN) the moment its state changes, and saves its files to **GitHub + Drive AI** (section 15).

---

## 1. Script Room (new thread per transcript batch)

**Trigger:** Pushpam pastes or uploads one or more transcripts in project chat. The coordinator opens one **Script Room thread** per batch (uploads can hide several transcripts separated by U+2028 characters; split them first).

### 1.1 Inputs the Script Room loads before writing
| Need | Skill / tool we have | Notes |
|---|---|---|
| Channel tone + house style | `yt-longform-videostyle-stromhell-animation`, `pushpam-voice` style notes, approved scripts in repo (Spain 1-3, Japan, NVIDIA) | Tone = confident, cause-before-effect storytelling, short punchy sentences, one "wait, what?" turn every 60-90 s |
| What is going viral in this niche right now | `yt-viral` | Run per batch, name the formula used |
| Hooks + retention beats | `yt-script` (21 hook formulas, scored), `yt-retention` | Every script gets 3 scored hook options; the best one opens the video |
| Shorts/reels potential | `yt-shorts`, `reels-scripting`, `hook-generator` | Mark 15+ reel-able moments in the script while writing, so stage 10 is pre-planned |
| Packaging | `yt-package`, `yt-seo` | Working title + thumbnail idea drafted here so the hook and the thumbnail agree |
| Human, non-slop prose | `no-ai-slop`, `humanizer` | Final pass on every script |

**Skills to add (found on skills.sh, 30 Oct; read before install, see section 14):** `coreyhaines31/marketingskills@social` (88K installs) + `@social-content` (67K) for platform-native Instagram/YouTube patterns; `sergebulaev/instagram-skills@instagram-marketing` (Instagram reel/caption/hashtag rules); `shipshitdev/skills@youtube-video-analyst` (breaks down why a video performed). If nothing fits a gap, write our own with `skill-creator` and save it in the repo under `tools/skills/`.

### 1.2 What the Script Room writes per transcript
1. **Production script** (`01 Script/<slug>-production-script.md`): hook, acts (one act ≈ 60-90 s of VO, 5-8 acts), each act with VO lines, on-screen action per line (what the picture does while the line is said), map/date/badge callouts, and the end CTA. English VO; translate Hindi sources.
2. **Virality sheet** (`01 Script/<slug>-virality.md`): the 3 hook options with scores, the viral formula borrowed, the 15 reel moments (timestamp range, hook line, why it stands alone), working title + thumbnail concept, one-line "why someone shares this".
3. **Line recommendation** with reasoning (section 1.3).

Long sources are split into parts (Spain 1-3, Eli Cohen 1-2 style). Facts and dates are kept from the transcript; nothing is invented.

### 1.3 Line routing rule (which line gets which script)
Cost order (slowest first): **3D > 3D low > 2D dynamic > 2D**. Measured 30 Oct: 2D ≈ 17 h hands-on, 2D dynamic ≈ 11 h, 3D low ≈ 20 min render per minute of film, 3D realistic 36 h+ for half a film. So the **share of scripts** is the reverse: **2D > 2D dynamic > 3D low > 3D**.

Default split per 10 scripts: **4 × 2D, 3 × 2D dynamic, 2 × 3D low, 1 × 3D** (approved by Pushpam 31 Oct; he can change it any time). **3D low takes nothing until Pushpam sets it up ("in a few days", from 31 Oct).** While it is off, scripts that would go to 3D low go to 2D dynamic.

A script goes **up** a line only when the format adds a real viral edge:
| Send to | When |
|---|---|
| **2D** (3 styles: Leo sheet, Gumball/t-shirt, Alium; 2D thread picks per script) | Default. Corporate/biography/business stories, personality-driven, lots of talking heads, humour works. |
| **2D dynamic** (Village Painterly, locked style) | Epic sweep: empires, wars, journeys, crowds, landscapes, period costume. Needs painterly backgrounds and camera moves to land. |
| **3D low** (cartoon 3D, FlyDubai house look) | Vehicles, machines, maps with motion, aircraft, ships, buildings, "how it worked" mechanics, heists/ops where blocking in space matters. |
| **3D** (realistic) | Only when the whole premise is spectacle: disasters, space, military ops where realism IS the hook, AND the script scored top-tier on `yt-viral`. Nothing goes to 3D "because it would look nice". |

Hard rules carried over: a 3D freeze or queue cap set by Pushpam beats this table; unstarted scripts may be moved down a line to rebalance; already-rendered work never moves.

### 1.4 Concurrency (Pushpam sets, threads obey)
Pushpam states in the thread how many videos of each line run live. **Live now (Pushpam 31 Oct 00:28): 1 × 2D only. 2D dynamic 0, 3D low 0, 3D 0.** Other lines keep queues and may prep scripts/storyboards/narration but render nothing. A video waiting on Pushpam's review does not count. When a slot opens the next queued script starts on its own (auto-advance) **unless Pushpam has a stop in place**, as now.

Cadence on the calendar stays **3 × 2D-type videos before each 1 × 3D-type video**.

### 1.5 Hand-off
The Script Room posts, per script: script + virality sheet links, chosen line + reason. The coordinator relays to the line thread and project chat, creates the Control Room card (format 2D / 2D dynamic / 3D low / 3D), and the line thread takes over. No approval wait.

---

## 2. Storyboard (line thread)
- Sketch storyboard of every shot: thumbnail sketch, VO line(s), **layers (foreground / midground / background)**, character staging + action beats, camera move vector, light preset, SFX cue, music mood. One row per shot, built from the script's on-screen action column (2D dynamic: `shared/gen.py` from `build/data.py`; 2D: `mksketch.js`; 3D lines: shot list + blockout frames).
- Published as an artifact page and saved as `02 Storyboard/<PREFIX>_storyboard.html`.
- Link relayed to project chat **for information only**. Production starts the moment the storyboard is saved. Pushpam can still comment; comments become fixes in the next act build.

## 3. Narration (Pushpam's cloned voice)
- `pushpam-voice` skill / `shared/voice_batch.py` (local Chatterbox, zero credits). One WAV per VO line, per act (`05 Production/voice/actN/vo-XX.wav`).
- Always respell years 1000-1999 (TTS gotcha), run `wt.py --check` (faster-whisper) and re-record any flagged line.
- **Timing map (added 31 Oct from Gemini draft):** `wt.py` also writes a word-level timestamp map (`voice/actN.timing.json` + `.srt`) before any act is built; every visual beat in stage 4 is keyed to a word timestamp from this map, never to a guessed second. Energy up on hooks and turns, calmer on exposition.
- Narration for queued videos may be pre-recorded in the background so it is never the bottleneck.
- **Never ElevenLabs** for voice.

## 4. Acts: build and render, one act at a time
Design skills loaded before building any set or character: `impeccable`, `design-taste-frontend`, `yt-longform-videostyle-stromhell-animation`, the line's style skill/board (Village Painterly board https://claude.ai/artifact/GgVHB5fmuBYedmezi8CXKC + cast sheet; 2D rig notes; 3D low README). Found skills worth adding: `vincentwei1021/video-shotcraft` (6.2K installs, shot composition + camera grammar), `omer-metin/skills-for-antigravity@art-consistency` (character/style consistency checklist).

**Animation bar for every act, every line (fail any = act not CLEAN):**
1. **Detail everywhere.** Painted, layered backgrounds with foreground/midground/background depth; props on tables, texture on walls, sky and ground detail. Any blocky or flat area gets more detail before render.
2. **Motion, never cuts-into-place.** Everything arrives by moving (walk in, slide in, grow, pan to). No object or character pops into position. Eases on every move, with anticipation and follow-through; no linear snaps. **Continuous secondary motion** on held shots (breathing, cloth/hair in wind, ambient particles, flicker of light).
3. **Belonging.** Every character/object has a contact shadow, a cast shadow that follows the scene light, ambient-occlusion darkening where things meet, and rim/edge highlights from the same light. Light presets per scene (studio, golden, moon, fire, door...).
4. **Animate the VO.** Each VO line has a visible action that shows what is being said (the ship sinks when the line says it sinks). No static talking frames longer than 3 s.
5. **No overlaps, no floating.** Characters never overlap each other or props (riders/horses behind walkers). Nobody stands or sits on air; feet on ground, seats under seats, hands hold flags/coins. Consistent scale between foreground and background people. Bodies complete (no missing legs unless truly hidden).
6. **Nobody appears from nothing.** Enter and exit through the frame.
7. **Variety.** No rows of identical figures; varied poses, gestures, faces, costume bits.
8. **Camera.** Dynamic camera in every act: 3D lines move the camera in most shots (dolly, orbit, crane, rack focus); 2D lines use pans, push-ins, parallax, and a subtle drift on held shots.
9. **Smooth sizing.** Scale changes ease; nothing jumps in size between shots.
10. **Walk cycles and wheels** actually cycle; no gliding feet, no frozen wheels, no texture flicker.
11. **Subtitles never over characters; SFX never over VO** (3D low rules, now global).

Build order per video: act 0 (cold open/hook) first, then act 1, 2... Each act goes through stage 5 and 6 before the next act is **started** in render (the next act's page may be built while the current one renders). Fixes found in act N are swept across all later acts before they render.

Render targets: 1280×720 act files (<15 MB each for preview), 1920×1080 final combine. Watchdog on every render queue (restart stalled renders; see `pipeline-watchdog` memory).

## 5. Sound: SFX + score
- **SFX** for every action in the storyboard's SFX column: footsteps, doors, paper, crowd, weather, impacts, whooshes on camera moves, UI ticks on badges/dates. Source: our code-made library (`shared/mksfx.py`, `shared/sfx/`) first; free CC0 libraries second; never random noise. Each SFX placed on the exact frame of the action, with level ducked under VO (`shared/mix.py`: **VO normalised to −14 LUFS**, SFX −12 to −18 dB, score auto-ducked to −22 to −26 dB under speech, rising to about −14 dB in VO gaps; J/L-cut crossfades on every scene change, no abrupt audio cuts).
- **Score** generated locally (`shared/score.py`, code-composed, no credits), mood per act from the storyboard (tense / wonder / triumph / grief). Music fades in/out across act joins; no hard starts. Candidate add-on if we want richer music: `calesthio/openmontage@acestep` (local ACE-Step model, free; check VRAM first). ElevenLabs music is **not** used (credits rule).
- Mix rule: VO always intelligible; one listen-through per act in the checkup (stage 6) specifically for "does anything fight the voice".

## 6. Checkup loop (the most important stage)
Run on **every act render, every re-render, the full combine, every reel and every Instagram part**. Nothing is handed over, combined or scheduled before a CLEAN result.

1. `/watch` (claude-video, `--engine local`) with a question list, AND a 1-frame-per-second contact-sheet pass (`ffmpeg -vf fps=1`, 30 frames per sheet, read every sheet), AND `peek` for the frames+transcript package. 3D low: `qa.js` strict overlap checker before render.
2. Check list (write findings against each item): glitches, overlaps, missing body parts, floating/sitting on air, pop-ins and vanishing objects, gliding walks, frozen wheels, texture/ground flicker, camera inside heads, blocky or empty backgrounds, flat lighting (no shadows/highlights), characters that don't fit the scene, VO/action mismatch, SFX off-frame or louder than VO, music hard-cut, subtitle over character, logo/end card placement (reels), text truncation, **audio-visual desync, harsh audio cuts, SFX louder than VO**.
3. **Feedback note** per act (`05 Production/qa/actN-roundR.md`): each issue with timestamp, frame, severity (high/medium/low), **cause** and **at least one concrete fix or alternative approach** (e.g. "move rider to back layer" or "replace crowd shot with over-shoulder").
4. Apply **every** fix, re-render, re-check. Repeat until CLEAN (zero high, zero medium; low only if cosmetic and noted). Act N+1 does not start rendering until act N is CLEAN (progression gate). Rounds logged on the Control Room card.
5. Only then: act preview link posted (stage 8) and the next act moves into render.

All checks run on Opus 5.5 at medium effort (model rule, 30 Oct 21:35), including subagents.

## 7. Combine
`shared/combine.py` (act tails trimmed, audio fades across joins, chapters JSON). Full video gets the complete stage-6 checkup again: act-to-act seams, colour/lighting consistency between acts, unified loudness (−14 LUFS integrated), music continuity, chapter marks. Save `Renders/<PREFIX>_FULL.mp4` to Drive (too big for GitHub; say so) and the chapters file to both.

## 8. Previews
- **Act preview page** per video (artifact): one row per act, updated the moment an act is CLEAN, with its render, QA round count and notes.
- **Full preview** when the combine is CLEAN. Both links go to the Control Room card and are relayed to project chat.

## 9. Pushpam's review (the only approval gate)
Pushpam watches the full preview and gives notes. The thread applies every note, re-runs the affected acts through stage 6, re-combines, re-checks, and posts the new full preview. Pushpam reviews again. Repeat until Pushpam says **approved**. No reels, titles or thumbnails are made before approval (except the pre-planned reel moment list from stage 1).

## 10. After approval: 15 reels + Instagram full-video parts
**15 reels** (9:16, 1080×1920, 30-75 s each): picked from the stage-1 reel moments plus `yt-shorts` on the final video; each reel gets:
- a viral hook in the first 1-2 s (`hook-generator`, `reels-scripting`, the social skills from section 14); re-cut/zoom the opening frame if the hook needs it;
- Stormi logo top-right inside the safe zone (150-190 px, clear of the top ~250 px and right ~120 px UI bands);
- centred end card: "Watch the full video on our YouTube channel · Stormi Explain Everything" (3 s);
- its own in-house thumbnail (stage 12), title and description (stage 11);
- a stage-6 checkup.

**Instagram full-video parts** (Instagram only): cut the full video into parts each **under 3 minutes**, at act or beat boundaries; adapt to 9:16 (smart reframe that keeps the active character/subject centred in the safe zone, per shot; letterbox with painted detail where cropping would cut characters); logo in safe zone; **each part ends on a card "Watch Part N+1 on this page"** (not the YouTube card); the last part ends on the YouTube card. Each part gets a thumbnail, title ("Part N of M") and description. Part files: `Reels/IG Parts/<PREFIX>_Part_NN.mp4`.

Tooling per line: 2D `build_reel.py`, 2D dynamic `shared/reels/`, 3D `reel_brand.sh`. Add a shared `ig_parts.py` (new) for the part cutter and the "next part" end card.

## 11. Titles and descriptions
- Full video: 5 title candidates via `yt-package` + `yt-viral` formula, linted (truncation, vagueness), pick one; description + tags via `yt-seo`; chapters from the combine. Exaggerated/curiosity titles are fine, but the video must pay the title off.
- Every reel and IG part: high-retention title, caption with hook line + CTA, hashtags from the Instagram skill. Saved as `Launch/<PREFIX>_titles_descriptions.md` (and the booking sheet for Production plan).

## 12. Thumbnails
- **Full 16:9 YouTube thumbnail:** the only use of **ElevenLabs** credits. Cheapest available image model, one detailed prompt (subject, exaggerated expression/moment, composition, lighting, style, empty area for text). Text layer and Stormi mascot added in code on top. Clickbait-level exaggeration in both image and text is allowed and encouraged; max 3-4 words of text. Judge against `youtube-thumbnail` + `yt-package` principles; make 2-3 variants, pick one.
- **Every reel and IG part thumbnail:** made fully in code (HTML/Canvas render), no external credits: frozen hero frame + exaggerated 2-3 word text + mascot/logo. Judged with the social + design skills before use.
- Files: `Thumbnails/<PREFIX>_thumb.jpg`, `Reels/out/<PREFIX>_Reel_NN_thumb.jpg`.

## 13. Hand-off to Production plan
The line thread sends the Production plan thread a **release manifest** (`Launch/<PREFIX>_release_manifest.json` + the readable `Reels/<PREFIX>_booking_sheet.txt`): full video (Drive link, title, description, thumbnail, chapters), 15 reels + IG parts (files, thumbnails, titles, captions, order). Production plan books Zernio. Once everything is booked, the video's card leaves the pipeline board and the calendar shows it.

### 13.1 Posting times: UK + US prime time (Pushpam 31 Oct 00:28: "target audience is UK and US English speaking")
All times UTC (Zernio takes UTC). From 1 Nov 2026 to 14 Mar 2027: UK = UTC, US Eastern = UTC-5, US Pacific = UTC-8. When clocks change, each slot keeps its **local** meaning (shift UTC by the DST offset).

| What | Slot (UTC) | Why |
|---|---|---|
| Full video, Mon-Fri | **19:00** (19:00 UK, 14:00 ET, 11:00 PT) | Lands in UK evening prime; indexed and recommended before US evening prime (19-22 ET) |
| Full video, Sat-Sun | **16:00** (16:00 UK, 11:00 ET) | Weekend afternoons are peak on both sides |
| Reels (max 7/day), fill in this order | **19:30, 00:30, 12:00, 22:00, 17:00, 03:00, 07:30** | 19:30 UK prime · 00:30 = 19:30 ET US prime · 12:00 UK lunch · 22:00 = 17:00 ET US after-work · 17:00 UK commute + US lunch · 03:00 = 19:00 PT West-coast prime · 07:30 UK morning commute |
| Facts shorts (max 3/day, YouTube upload limit) | **18:00, 21:00, 01:30** | UK pre-prime, UK late prime + US afternoon, US East prime |
| Instagram full-video parts | **20:30**, one per day, starting the day after the YouTube release, in order | UK prime; each part's "watch next part" card pays off the next evening |

Rules: full videos ≥ 2 days apart; never more than 1 full video per day; keep a reel and a full video at least 30 min apart; respect the YouTube daily upload limit (count full + reels + shorts on the YouTube account per day, stay under it, move the lowest-priority item to the next day if needed).
**Existing bookings:** Pushpam asked (31 Oct) for all existing scheduled posts to move to these times. Production plan re-slots every future post to the nearest new slot **on the same date** (never to a different day unless the daily limit forces it), and logs every move.

### 13.2 Thread handover and close-out (Pushpam 31 Oct 06:34, "after videos are done and scheduled, create a detailed handover doc and /clear")
Once a video's full video, reels, IG parts, titles and thumbnails are **booked in Zernio**, the owning thread:
1. Writes `<video folder>/05 Production/HANDOVER.md` from the template `system/handover-template.md` (repo + Drive, same folder): final files + links, bookings, what was done, **what the next video can reuse** (sets, cast, build commands, QA fixes, gotchas), open items, cleanup done.
2. Removes the video's Control Room card (the calendar keeps the bookings).
3. Deletes scratch, render caches and temp clones from its container.
4. Resolves itself. The thread is finished; it is never reused for another video.
Every **next video starts as a NEW thread** that reads only (a) this rulebook, (b) the previous video's HANDOVER.md for its line, (c) its own script + storyboard. It does not read old thread history. This is the cloud version of `/clear`.
Long-lived job threads (Production plan, Facts shorts, Script Room, watchdog host) do the same once their history gets large: write `system/handovers/<job>-<date>.md`, hand the job to a fresh thread, resolve.

---

## 14. Skills: what we have, what to add
**Have (enabled):** yt-viral, yt-script, yt-shorts, yt-package, yt-seo, yt-retention, yt-plan, hook-generator, reels-scripting, post-scorer, youtube-thumbnail, pushpam-voice, cutout-cartoon-shorts, yt-longform-videostyle-stromhell-animation, impeccable, design-taste-frontend, graphic-designer, no-ai-slop, humanizer, peek, claude-video `/watch` (vendored), render-progress-monitor, skill-creator, find-skills.

**Installed 31 Oct (Pushpam approved "install all skills"; each read before install):** copies in `/mnt/project-files/tools/skills/` and repo `tools/skills/`. A thread installs them with `mkdir -p ~/.claude/skills && cp -r /mnt/project-files/tools/skills/* ~/.claude/skills/`.
| Skill | Use it for | Notes from review |
|---|---|---|
| `social` (coreyhaines31/marketingskills, 88K installs; now includes social-content) | Hooks, short-form video scripts, repurposing, platform rules | Listening recipes use public curl endpoints only; no keys |
| `video` (same repo) | Video production patterns, "copy this edit" breakdowns | Mentions paid AI video tools: do NOT use them (credits rule) |
| `instagram-marketing` (sergebulaev, 9 sub-skills) | Captions with 125-char hook, hashtag sizing, hook extraction, repurposing, humanizer | Its publish step uses the Publora API: not used; we post via Zernio |
| `video-shotcraft` (vincentwei1021, 6.2K) | 124 shot/motion recipe cards, sound-design + SFX sourcing guide | Built for product promos; use the shot cards and sound-design refs only. Skip its upload-post publish step |
| `art-consistency` (omer-metin) | Character/style consistency QA checklist in stage 6 | Pure guidance |
| `acestep` (calesthio/openmontage) | Music generation | **Needs a RunPod key (paid GPU).** Not used until Pushpam OKs the spend; score stays local (`score.py`) |
`youtube-video-analyst` no longer exists in its repo; `yt-viral` + `yt-retention` cover it.

Anything still missing gets written as our own skill with `skill-creator`, stored in repo `tools/skills/<name>/` and Drive AI/Tools/Skills, and listed here.

## 15. Standing rules every stage obeys
- **Files:** everything to GitHub `Stromhell/stromehll-projects` AND Drive `AI/<Line>/<Video>/` with the folder set `01 Script, 02 Storyboard, 03 Frames, 04 Build Files, 05 Production, Renders/Acts, Thumbnails, Reels, Launch`. >100 MB files: Drive only (or LFS), say so. Commit after every act (mount loss recovery).
- **Control Room:** one card per video, marked with its line; updated at every state change (script, storyboard, narration, each act render, each QA round, fixes, waiting on review, combined, reels, thumbnails, booked) with "now / next / latest links"; removed when fully booked.
- **Model:** Opus 5.5 at medium for all work incl. subagents and /watch.
- **Tokens:** Graphify (`tools/graphify/gq "question"`) before grepping; read files in parts; short handoffs; hourly temp cleanup.
- **Credits:** ElevenLabs only for the 16:9 long-video thumbnail. Voice, music, SFX, reel thumbs, frames: in-house/free.
- **Branding:** Stormi logo + end cards on every reel/short/IG part.
- **Stop/pause:** a Pushpam stop halts every stage; booked Zernio posts stay booked.
- **Handover:** booked video → HANDOVER.md + card removed + scratch cleared + thread resolved; next video = new thread (section 13.2). No MCPs or plugins beyond the ones the stage needs (Pushpam's token audit thread trims the unused ones).

## 16. Decisions (Pushpam, 31 Oct 00:28)
1. Default split 4/3/2/1: approved.
2. Live now: 1 × 2D only.
3. Install all skills: done (section 14).
4. 3D low: nothing goes there until Pushpam sets it up.
5. Scheduling: UK + US prime time, existing bookings re-timed (section 13.1).
6. Control Room rebuilt around these stages (Pushpam 31 Oct 00:30).
7. Watchdog checks every line follows this system (Pushpam 31 Oct 00:30, section 17).
8. Handover + fresh thread per video, unused MCPs/plugins removed (Pushpam 31 Oct 06:34, section 13.2).

## 17. System watchdog (see also section 18)
A scheduled audit (every 2 hours) wakes the system thread, which checks every production thread and the Control Room against this rulebook and fixes or flags what is off. It checks:
- **Concurrency:** no more videos rendering per line than section 1.4 allows; nothing in 3D low; a Pushpam stop is respected.
- **Order of stages:** no combine before every act is CLEAN; no reels/thumbnails before Pushpam's approval; nothing scheduled before a clean checkup.
- **Checkup evidence:** every rendered act has a `05 Production/qa/actN-roundR.md` note ending CLEAN.
- **Control Room freshness:** each live video card updated within the last 2 hours and its stage matches the thread's real state.
- **Files:** latest outputs committed to GitHub and present on Drive AI.
- **Credits/model:** no ElevenLabs use outside 16:9 thumbnails.
- **Schedule:** Zernio posts sit on section 13.1 slots; YouTube daily limit not exceeded.
- **Handover:** every video whose bookings are all in the calendar has `05 Production/HANDOVER.md` (repo + Drive), no Control Room card left, and its thread resolved; a new video never runs in an old video's thread.
Result: a short report on the Control Room ("System check" panel) and, for each problem, a message to the owning thread with the fix. Pushpam is told only about problems a thread can't fix itself. Never restarts a stopped line, never deletes or moves posts itself (it asks Production plan).

## 18. Change log
- v1.3, 31 Oct 06:40: section 13.2 thread handover + close-out (HANDOVER.md, card removal, scratch cleanup, fresh thread per video), watchdog check for it, handover rule in section 15.
- v1.0, 31 Oct 00:00: draft from Pushpam's 13-point brief.
- v1.1, 31 Oct 00:30: approved; live config, UK/US slots, installed skills, Control Room v33, watchdog.
- v1.2, 31 Oct 00:40: merged the useful parts of Pushpam's Gemini draft: word-level VO timing map (stage 3), FG/MG/BG layers in storyboards (stage 2), anticipation/follow-through + secondary motion + AO/rim light (stage 4), exact mix targets −14 LUFS VO / score −22 to −26 dB / SFX −12 to −18 dB + J/L cuts (stage 5), audio checks in the checkup (stage 6), seam/colour/loudness pass on the master (stage 7), subject-centred 9:16 reframe (stage 10), release manifest JSON (stage 13). Not adopted: "3D low = dioramas/low shader" wording (our 3D low is the toon house look, routing table in 1.3 stands); the Gemini numbering is the same 13 stages as ours.
