# Stormi Production System v1

**Channel:** Stormi Explain Everything · **Owner:** Pushpam · **Written:** 30 Oct 2026 (from Pushpam's 13-point brief, 23:52 UTC)
**Status:** DRAFT for Pushpam's review. Production is on FULL STOP until Pushpam lifts it; nothing below starts until then.

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

Default split per 10 scripts: **4 × 2D, 3 × 2D dynamic, 2 × 3D low, 1 × 3D** (Pushpam can change it any time).

A script goes **up** a line only when the format adds a real viral edge:
| Send to | When |
|---|---|
| **2D** (3 styles: Leo sheet, Gumball/t-shirt, Alium; 2D thread picks per script) | Default. Corporate/biography/business stories, personality-driven, lots of talking heads, humour works. |
| **2D dynamic** (Village Painterly, locked style) | Epic sweep: empires, wars, journeys, crowds, landscapes, period costume. Needs painterly backgrounds and camera moves to land. |
| **3D low** (cartoon 3D, FlyDubai house look) | Vehicles, machines, maps with motion, aircraft, ships, buildings, "how it worked" mechanics, heists/ops where blocking in space matters. |
| **3D** (realistic) | Only when the whole premise is spectacle: disasters, space, military ops where realism IS the hook, AND the script scored top-tier on `yt-viral`. Nothing goes to 3D "because it would look nice". |

Hard rules carried over: a 3D freeze or queue cap set by Pushpam beats this table; unstarted scripts may be moved down a line to rebalance; already-rendered work never moves.

### 1.4 Concurrency (Pushpam sets, threads obey)
Pushpam states in the thread how many videos of each line run live (current default from 30 Oct: 2 × 2D, 1 × 2D dynamic, 1 × 3D; 3D low: 0 until its style test is clean). A video waiting on Pushpam's review does not count. When a slot opens the next queued script starts on its own (auto-advance) **unless Pushpam has a stop in place**, as now.

Cadence on the calendar stays **3 × 2D-type videos before each 1 × 3D-type video**.

### 1.5 Hand-off
The Script Room posts, per script: script + virality sheet links, chosen line + reason. The coordinator relays to the line thread and project chat, creates the Control Room card (format 2D / 2D dynamic / 3D low / 3D), and the line thread takes over. No approval wait.

---

## 2. Storyboard (line thread)
- Sketch storyboard of every shot: thumbnail sketch, VO line(s), camera move, characters + props in the shot, light preset, SFX cue, music mood. One row per shot, built from the script's on-screen action column (2D dynamic: `shared/gen.py` from `build/data.py`; 2D: `mksketch.js`; 3D lines: shot list + blockout frames).
- Published as an artifact page and saved as `02 Storyboard/<PREFIX>_storyboard.html`.
- Link relayed to project chat **for information only**. Production starts the moment the storyboard is saved. Pushpam can still comment; comments become fixes in the next act build.

## 3. Narration (Pushpam's cloned voice)
- `pushpam-voice` skill / `shared/voice_batch.py` (local Chatterbox, zero credits). One WAV per VO line, per act (`05 Production/voice/actN/vo-XX.wav`).
- Always respell years 1000-1999 (TTS gotcha), run `wt.py --check` (faster-whisper) and re-record any flagged line. Energy up on hooks and turns, calmer on exposition.
- Narration for queued videos may be pre-recorded in the background so it is never the bottleneck.
- **Never ElevenLabs** for voice.

## 4. Acts: build and render, one act at a time
Design skills loaded before building any set or character: `impeccable`, `design-taste-frontend`, `yt-longform-videostyle-stromhell-animation`, the line's style skill/board (Village Painterly board https://claude.ai/artifact/GgVHB5fmuBYedmezi8CXKC + cast sheet; 2D rig notes; 3D low README). Found skills worth adding: `vincentwei1021/video-shotcraft` (6.2K installs, shot composition + camera grammar), `omer-metin/skills-for-antigravity@art-consistency` (character/style consistency checklist).

**Animation bar for every act, every line (fail any = act not CLEAN):**
1. **Detail everywhere.** Painted, layered backgrounds with foreground/midground/background depth; props on tables, texture on walls, sky and ground detail. Any blocky or flat area gets more detail before render.
2. **Motion, never cuts-into-place.** Everything arrives by moving (walk in, slide in, grow, pan to). No object or character pops into position. Eases on every move; no linear snaps.
3. **Belonging.** Every character/object has a contact shadow, a cast shadow that follows the scene light, and highlights from the same light. Light presets per scene (studio, golden, moon, fire, door...).
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
- **SFX** for every action in the storyboard's SFX column: footsteps, doors, paper, crowd, weather, impacts, whooshes on camera moves, UI ticks on badges/dates. Source: our code-made library (`shared/mksfx.py`, `shared/sfx/`) first; free CC0 libraries second; never random noise. Each SFX placed on the exact frame of the action, with level ducked under VO (`shared/mix.py`: VO −3 dB reference, SFX −12 to −18 dB, score −20 to −24 dB under speech, rising to −14 dB in VO gaps).
- **Score** generated locally (`shared/score.py`, code-composed, no credits), mood per act from the storyboard (tense / wonder / triumph / grief). Music fades in/out across act joins; no hard starts. Candidate add-on if we want richer music: `calesthio/openmontage@acestep` (local ACE-Step model, free; check VRAM first). ElevenLabs music is **not** used (credits rule).
- Mix rule: VO always intelligible; one listen-through per act in the checkup (stage 6) specifically for "does anything fight the voice".

## 6. Checkup loop (the most important stage)
Run on **every act render, every re-render, the full combine, every reel and every Instagram part**. Nothing is handed over, combined or scheduled before a CLEAN result.

1. `/watch` (claude-video, `--engine local`) with a question list, AND a 1-frame-per-second contact-sheet pass (`ffmpeg -vf fps=1`, 30 frames per sheet, read every sheet), AND `peek` for the frames+transcript package. 3D low: `qa.js` strict overlap checker before render.
2. Check list (write findings against each item): glitches, overlaps, missing body parts, floating/sitting on air, pop-ins and vanishing objects, gliding walks, frozen wheels, texture/ground flicker, camera inside heads, blocky or empty backgrounds, flat lighting (no shadows/highlights), characters that don't fit the scene, VO/action mismatch, SFX off-frame or louder than VO, music hard-cut, subtitle over character, logo/end card placement (reels), text truncation.
3. **Feedback note** per act (`05 Production/qa/actN-roundR.md`): each issue with timestamp, frame, severity (high/medium/low), **cause** and **at least one concrete fix or alternative approach** (e.g. "move rider to back layer" or "replace crowd shot with over-shoulder").
4. Apply **every** fix, re-render, re-check. Repeat until CLEAN (zero high, zero medium; low only if cosmetic and noted). Rounds logged on the Control Room card.
5. Only then: act preview link posted (stage 8) and the next act moves into render.

All checks run on Opus 5.5 at medium effort (model rule, 30 Oct 21:35), including subagents.

## 7. Combine
`shared/combine.py` (act tails trimmed, audio fades across joins, chapters JSON). Full video gets the complete stage-6 checkup again (joins, music continuity, level consistency, chapter marks). Save `Renders/<PREFIX>_FULL.mp4` to Drive (too big for GitHub; say so) and the chapters file to both.

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

**Instagram full-video parts** (Instagram only): cut the full video into parts each **under 3 minutes**, at act or beat boundaries; adapt to 9:16 (smart crop with safe-area tracking, letterbox with detail where cropping would cut characters); logo in safe zone; **each part ends on a card "Watch Part N+1 on this page"** (not the YouTube card); the last part ends on the YouTube card. Each part gets a thumbnail, title ("Part N of M") and description. Part files: `Reels/IG Parts/<PREFIX>_Part_NN.mp4`.

Tooling per line: 2D `build_reel.py`, 2D dynamic `shared/reels/`, 3D `reel_brand.sh`. Add a shared `ig_parts.py` (new) for the part cutter and the "next part" end card.

## 11. Titles and descriptions
- Full video: 5 title candidates via `yt-package` + `yt-viral` formula, linted (truncation, vagueness), pick one; description + tags via `yt-seo`; chapters from the combine. Exaggerated/curiosity titles are fine, but the video must pay the title off.
- Every reel and IG part: high-retention title, caption with hook line + CTA, hashtags from the Instagram skill. Saved as `Launch/<PREFIX>_titles_descriptions.md` (and the booking sheet for Production plan).

## 12. Thumbnails
- **Full 16:9 YouTube thumbnail:** the only use of **ElevenLabs** credits. Cheapest available image model, one detailed prompt (subject, exaggerated expression/moment, composition, lighting, style, empty area for text). Text layer and Stormi mascot added in code on top. Clickbait-level exaggeration in both image and text is allowed and encouraged; max 3-4 words of text. Judge against `youtube-thumbnail` + `yt-package` principles; make 2-3 variants, pick one.
- **Every reel and IG part thumbnail:** made fully in code (HTML/Canvas render), no external credits: frozen hero frame + exaggerated 2-3 word text + mascot/logo. Judged with the social + design skills before use.
- Files: `Thumbnails/<PREFIX>_thumb.jpg`, `Reels/out/<PREFIX>_Reel_NN_thumb.jpg`.

## 13. Hand-off to Production plan
The line thread sends the Production plan thread a **booking sheet** (`Reels/<PREFIX>_booking_sheet.txt`): full video (Drive link, title, description, thumbnail, chapters), 15 reels + IG parts (files, thumbnails, titles, captions, order). Production plan books Zernio following its rules (full videos ≥2 days apart, 15:00 ET weekdays / 11:00 ET weekends; reels 7/day across the 7 slots; fill earlier months first; never move booked posts; IG parts posted in order, one per day, after the full video's YouTube release unless Pushpam says otherwise). Once everything is booked, the video's card leaves the pipeline board and the calendar shows it.

---

## 14. Skills: what we have, what to add
**Have (enabled):** yt-viral, yt-script, yt-shorts, yt-package, yt-seo, yt-retention, yt-plan, hook-generator, reels-scripting, post-scorer, youtube-thumbnail, pushpam-voice, cutout-cartoon-shorts, yt-longform-videostyle-stromhell-animation, impeccable, design-taste-frontend, graphic-designer, no-ai-slop, humanizer, peek, claude-video `/watch` (vendored), render-progress-monitor, skill-creator, find-skills.

**To add (found 30 Oct on skills.sh; each is read in full before install and summarised to Pushpam, per the find-skills rule):**
| Gap | Skill | Installs |
|---|---|---|
| Instagram/YouTube social patterns | `coreyhaines31/marketingskills@social`, `@social-content` | 88K / 67K |
| Instagram-specific (reels, captions, hashtags) | `sergebulaev/instagram-skills@instagram-marketing` | 937 |
| Why a video performed | `shipshitdev/skills@youtube-video-analyst` | 1K |
| Shot composition + camera grammar | `vincentwei1021/video-shotcraft` | 6.2K |
| Style/character consistency QA | `omer-metin/skills-for-antigravity@art-consistency` | 147 (small; evaluate) |
| Richer local music (optional) | `calesthio/openmontage@acestep` | 1.1K |

Anything still missing gets written as our own skill with `skill-creator`, stored in repo `tools/skills/<name>/` and Drive AI/Tools/Skills, and listed here.

## 15. Standing rules every stage obeys
- **Files:** everything to GitHub `Stromhell/stromehll-projects` AND Drive `AI/<Line>/<Video>/` with the folder set `01 Script, 02 Storyboard, 03 Frames, 04 Build Files, 05 Production, Renders/Acts, Thumbnails, Reels, Launch`. >100 MB files: Drive only (or LFS), say so. Commit after every act (mount loss recovery).
- **Control Room:** one card per video, marked with its line; updated at every state change (script, storyboard, narration, each act render, each QA round, fixes, waiting on review, combined, reels, thumbnails, booked) with "now / next / latest links"; removed when fully booked.
- **Model:** Opus 5.5 at medium for all work incl. subagents and /watch.
- **Tokens:** Graphify (`tools/graphify/gq "question"`) before grepping; read files in parts; short handoffs; hourly temp cleanup.
- **Credits:** ElevenLabs only for the 16:9 long-video thumbnail. Voice, music, SFX, reel thumbs, frames: in-house/free.
- **Branding:** Stormi logo + end cards on every reel/short/IG part.
- **Stop/pause:** a Pushpam stop halts every stage; booked Zernio posts stay booked.

## 16. Open points for Pushpam
1. Default split 4/3/2/1 (2D / 2D dynamic / 3D low / 3D) per 10 scripts: OK?
2. IG parts: post one per day **after** the YouTube release, or allow before (like reels)?
3. Approval to install the six skills in section 14 after I read and summarise them.
4. 3D low joins the routing only once its style test is CLEAN: OK?
