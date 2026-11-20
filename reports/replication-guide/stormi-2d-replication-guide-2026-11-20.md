# Stormi 2D video pipeline: tools list + replication prompt

Written 20 Nov 2026 for Pushpam, to train another AI to make our videos.
Every number below was measured from real project files: Japan Comeback (`2d-dynamic/japan-comeback/`), Eli Cohen 1 and 2 (`2d-dynamic/eli-cohen-1/`, `eli-cohen-2/`), and the shared engine in `2d-dynamic/shared/`. No API keys or secrets are included.

---

## Part 1. Everything the pipeline actually uses

### 1.1 Open-source GitHub repos

| Repo | What we use it for | Where it lives in our setup |
|---|---|---|
| https://github.com/Graphify-Labs/graphify (PyPI `graphifyy`) | Code map of the whole pipeline, so an AI finds code without reading every file (about 34x fewer tokens) | `tools/graphify/gq "question"` |
| https://github.com/bradautomates/claude-video | `/watch` skill: samples frames of each render for QA (local engine only) | repo `tools/claude-video`, `.claude/skills/watch` |
| https://github.com/resemble-ai/chatterbox | Free local text-to-speech that clones Pushpam's voice (inside the `pushpam-voice` skill) | `~/.cache/pushpam-voice/venv` |
| https://github.com/SYSTRAN/faster-whisper | Word-level timestamps and a re-check of every voice line (`shared/wt.py --check`) | pip |
| https://github.com/Tejashmakwana/motionmaxxing (commit 8c8ec0f) | MotionMaxx skill: titles, map and stat reveals, kinetic type, reel hooks | `tools/motion-kit/setup.sh` |
| https://github.com/Vincentwei1021/video-shotcraft | Shot and camera recipe cards, sound-design guide | `tools/skills/video-shotcraft` |
| https://github.com/coreyhaines31/marketingskills | `social` and `video` skills: hooks, short-form scripts, repurposing | `tools/skills/social`, `tools/skills/video` |
| https://github.com/sergebulaev/instagram-skills | Instagram captions, hashtags, hook extraction (publish step not used) | `tools/skills/instagram-marketing` |
| omer-metin/skills-for-antigravity, skill `art-consistency` | Character and style consistency checklist | `tools/skills/art-consistency` |
| https://github.com/rtk-ai/rtk | Shortens command output to save tokens (hook) | `tools/agent-kit/bin/rtk` |
| repomix (run with npx) | Packs one video's build code into one file for handovers | `tools/agent-kit/pack` |
| superpowers (account plugin) | The one agent harness we chose (planning, debugging, verification habits) | account plugin |
| https://github.com/anthropics/skills | `anthropic-skills:*` (docx, pdf, pptx, skill-creator...) | account |
| Playwright + Chromium | Renders every act page frame by frame | pre-installed (`/opt/pw-browsers/chromium`) |
| FFmpeg | Encodes frames to MP4, contact sheets, combine | system |
| Python numpy + scipy | Our own SFX, music and mixing code | pip |

Installed but NOT used for production (do not copy): `calesthio/openmontage` acestep (needs a paid GPU key), `remotion-dev/remotion` (skill available, our engine is our own canvas code), Headroom (optional token tool).

### 1.2 Skills (Claude account skills)

Used on every 2D video:
- `yt-longform-videostyle-stromhell-animation`: house style skill (cartoon history explainer look, overlays, pacing). Pushpam's own skill; copy the folder from the account.
- `pushpam-voice`: VO in Pushpam's cloned voice with Chatterbox, local, zero credits.
- `impeccable`, `design-taste-frontend`, `graphic-designer`, `no-ai-slop`: design quality for sets, thumbnails, storyboards.
- `yt-script`, `yt-viral`, `yt-retention`, `yt-plan`: script writing and structure.
- `yt-package`, `yt-seo`, `yt-chapters`: titles, descriptions, tags, chapters.
- `youtube-thumbnail`: thumbnail rules.
- `yt-shorts`, `hook-generator`, `reels-scripting`, `post-scorer`: reels and shorts.
- `peek`, `render-progress-monitor`: QA package and live render progress page.
- `humanizer`, `skill-creator`, `task-observer` (at handover only).

### 1.3 Our own tools (in repo `Stromhell/stromehll-projects` and `/mnt/project-files/`)

| File | Job |
|---|---|
| `system/stormi-production-system-v1.md` | The rulebook: 13 stages from script to booking |
| `2d-dynamic/shared/vp/engine.js`, `cast.js`, `scenes.js` | Village Painterly drawing engine: everything is a pure function of time, so it plays live and renders to video |
| `2d-dynamic/shared/vp.js` | Sets, camera, light presets, contact shadows, figure shadows, sitting, riders, motes, glow, rays |
| `2d-dynamic/shared/kit.js` | Overlays: date tag, badge, card, title, counter, bars, pie, subtitles, parchment |
| `2d-dynamic/shared/gen.py` + `<video>/build/data.py` | Builds the storyboard (`storyboard.json` + HTML) from the script |
| `2d-dynamic/shared/voice_batch.py` | Voices every shot, respells years and hard names |
| `2d-dynamic/shared/wt.py` | Joins VO clips per act, word timestamps (`timing.json`), Whisper check |
| `2d-dynamic/shared/mksfx.py` + `shared/sfx/` | 42 code-made SFX and ambience loops |
| `2d-dynamic/shared/score.py` | Code-composed music per act, moods by timestamp |
| `2d-dynamic/shared/mix.py` | Mix VO + SFX + beds + music with ducking |
| `2d-dynamic/shared/render.js`, `render_act.sh` | Playwright frame render at 30 fps, FFmpeg encode |
| `2d-dynamic/shared/combine.py` | Joins acts, fades, chapters JSON |
| `2d-dynamic/shared/reels/build_reel_dd.py`, `thumb_dd.py` | 9:16 reels with logo + end card, reel thumbnails in code |
| `system/qa/qa_auto.py`, `voice_qa.py`, `cine_qa.py`, `RENDER-QA-CHECKLIST.md` | Automatic render QA, voice QA, 66-item checklist |
| `tools/gdrive_upload.py` | Uploads any size file to Drive AI folder |
| `tools/motion-kit/setup.sh` | Loads MotionMaxx + Shotcraft |

Style references (open these, they show the look better than words): Village Painterly style board https://claude.ai/artifact/GgVHB5fmuBYedmezi8CXKC and cast sheet https://claude.ai/artifact/8caDoKRA6f6rcrwhUdMgsu. Rule file: `2d-style-study/village-painterly/STYLE-RULE.md`.

---

## Part 2. Measured numbers from real videos

| | Japan Comeback | Eli Cohen 1 | Eli Cohen 2 |
|---|---|---|---|
| Acts (incl. cold open) | 6 | 6 | 6 |
| Shots total | 42 | 28 | 27 |
| Shots per act | 5, 6, 8, 8, 7, 8 | 4, 5, 5, 4, 5, 5 | 4, 5, 4, 5, 4, 5 |
| Unique backgrounds (sets) in video | 29 | 22 | 19 |
| Sets per act | 5, 6, 6, 6, 6, 7 | 3, 5, 4, 4, 5, 5 | 2, 4, 4, 5, 4, 5 |
| Named characters used | 30 | 33 | (reuses EC1 cast) |
| SFX cues per act | 14 to 25 | 10 to 17 | 8 to 19 |
| Act length | 39 s to 88 s | 26 s to 49 s | 23 s to 58 s |
| Runtime | 7:14 (1,058 words, about 146 words a minute) | about 3:55 | about 4:08 |
| Shot types | WIDE 5, MED 32, CU 3, MAP 1, TITLE 1 | | |

Rules of thumb that come out of this: one new set for almost every shot (about 0.7 to 0.9 sets per shot), one shot every 7 to 13 seconds of VO, the cold open is the shortest act (4 to 5 shots), and MED is the workhorse shot (about 3 of every 4).

---

## Part 3. The replication prompt

Copy everything inside the box into the other AI. Put the topic and the script in the slot at the end. It is topic-free.

```text
You are a 2D animation director and engineer. Make a long-form YouTube explainer in the
"Village Painterly 2D dynamic" style described below. Follow every number and rule. Do not
change the look.

=== 0. OUTPUT ===
- 16:9 video, drawn at 1280x720 on an HTML canvas, final delivered at 1920x1080, 30 fps,
  H.264 (CRF 19, yuv420p), AAC 192 kbps, -14 LUFS integrated.
- Everything is code: every frame is a pure function of time t (no hand-placed keyframes in an
  editor). The same page plays live in a browser and is rendered frame by frame with Playwright
  (screenshot canvas as JPEG quality 0.93), then encoded with FFmpeg.
- Built ACT BY ACT. Each act is its own HTML page + its own timing file + its own mix.

=== 1. STRUCTURE ===
- 6 acts: Act 0 = cold open (hook), Acts 1-5 = story. Acts 1-5 each have a chapter name.
- Script: about 140-150 words a minute. A 7-minute video is about 1,050 words.
- Cold open: 4-5 shots, 25-45 s. Opens on a shocking concrete fact in the first line, jumps
  forward to the payoff ("X years later..."), poses the question, ends on a TITLE shot (about
  4 s, no VO) built around one small recurring symbol object.
- Acts 1-5: 4-8 shots each, 35-90 s each.
- One SHOT = one VO paragraph (1-3 sentences, 6-13 s). Total 25-45 shots per video.
- Shot type mix: about 75% MED, 10-12% WIDE (one establishing WIDE at the start of most acts),
  about 7% CU (emotional or detail beats), 1-2 MAP shots, 1 TITLE.
- A story device: follow one ordinary family/person through the whole video, plus one recurring
  symbol object that returns in every act (e.g. a doll knocked over and set upright again), plus
  one running visual (e.g. a line graph painting itself across the background).

=== 2. STORYBOARD (before any build) ===
One row per shot with: id (act.shot, e.g. 1.03), type (WIDE/MED/CU/MAP/TITLE), seconds, VO text,
visual (who, where, doing what), on-screen text (date tag / badge / card), animation (what moves),
layers (foreground / midground / background), camera move, light preset, SFX cues, music mood.
Every VO line must have a visible action that SHOWS what is said (the ship sinks when the line
says it sinks). No talking-head frames held longer than 3 s.

=== 3. BACKGROUNDS (SETS) ===
- Count: about one new set per shot. Target 5-7 sets per act, 20-30 unique sets per video.
  A set may be reused at most in nearby shots with a different camera or light.
- Each set is drawn once into an offscreen 1280x720 canvas and cached; motion is added on top.
- Painterly look, never flat or blocky. Build every set in this layer order:
  1. Sky gradient (3-4 colour stops) + 150-250 soft paint dabs for clouds/haze.
  2. Far layer: skyline / hills / mountains, 20-30 varied shapes from a seeded random generator.
  3. Haze band between far and mid (transparent-to-pale gradient, about 90 px tall).
  4. Mid layer: the main buildings or interior walls, with windows, beams, signage, textures
     (wood grain, tin, brick, plaster drawn with helper functions).
  5. Ground: base colour + 500-700 small texture dabs + 100-150 debris/stone/grass marks.
  6. Foreground props on the ground and on tables (pots, crates, papers, tools), each with a
     contact shadow.
  7. Film grain over the whole set (about 5% opacity).
- Use a seeded RNG so every set is identical on every frame and every render.
- Interiors: props on every surface, texture on walls. Exteriors: sky and ground detail.
- Maps: real geography from latitude/longitude points projected to the canvas; parchment-like
  colours; place names in a handwritten font; events shown as glowing pulses and expanding rings.
  Use official borders for any country.

=== 4. LIVE LAYERS ON TOP OF THE SET (every shot has 3-5 parallax/motion layers) ===
- Ambience: drifting smoke, ash, dust motes (about 40 particles), rain, birds, flicker of fire
  or bulbs, light rays, glow spots.
- A colour-grade layer per shot (multiply tint for dusk/night).
- Characters (section 5) in front of the set, then foreground props, then overlays (section 7).

=== 5. CHARACTERS (RIG) ===
- Human proportions, 6 heads tall, smooth tapered limbs, detailed 4-finger hands, nose below
  the eye line, front and 3/4 views. Painted cel shading with base, shade and rim colours per
  material (skin, cloth, hair), all lit by the shot's light preset.
- Each character is data: skin tone, hair, costume pieces, hat, props. Costume pieces are
  small draw functions (cap, headscarf, uniform, suit, overalls) shared across the cast.
- Cast size: 25-35 named characters per video (the family members at 2-3 ages, historic
  figures, workers, crowd types). New characters reuse the same rig, never a new style.
- Scale: one unit size per shot; foreground adults about 40-58 px units, children about 30,
  background people the same scale for the same depth (never tiny next to big).
- Every character drawn with: a contact shadow under the feet, a cast shadow that follows the
  scene light (skewed and blurred), and rim light on the light side.
- Pose controls per frame: shoulder and elbow angle of near and far arm, facing (left/right),
  idle sway with a per-character phase, breathing, blinking at random times, look direction,
  mouth open, smile, worry. Hands can hold props (drawn at the wrist position).
- Walk cycle for anyone who moves; feet must not glide. Wheels turn. Riders/horses on a back
  layer behind people on foot.

=== 6. MOVEMENT AND CAMERA ===
- Nothing pops in. Characters walk into frame and out of it; objects slide, grow or fall in.
- Every move is eased (ease-in-out or ease-out), with anticipation and follow-through. No
  linear snaps. Scale changes ease too.
- Every beat is keyed to a WORD in the VO (word timestamps from Whisper), never a guessed
  second: e.g. the badge appears on the word "fraction", the bomb flash on "atomic".
- Held shots always keep secondary motion: breathing, sway, cloth, smoke, particles, flicker.
- Camera in every shot: one of slow push-in (zoom 1.15 -> 1.55 over the shot), lateral pan
  (x moves 150-200 px over the shot), fixed zoom with drift, whip pan between scenes, or a
  short shake (1-2 px) for trains, explosions, impacts. Camera eases across the whole shot.
- Transitions: match cuts between related images (shack -> bullet train), whip pans, hard cuts
  on beats for rapid lists of 3.
- No overlaps: characters never overlap each other or props. Nobody floats: feet on ground,
  seated people on real seats, coins on surfaces, flags in hands. Bodies are complete.
- Variety: no rows of identical figures; vary pose, gesture, face, costume per person.
- Violence and disaster shown through aftermath and light, never gore.

=== 7. ON-SCREEN TEXT AND OVERLAYS ===
- Date tag (e.g. "AUGUST 1945") early in the first shot of each scene change in time/place.
- Badge: short fact in capitals ("~50% OF TOKYO BURNED"), appears on its keyword, leaves before
  the next one.
- Card: a slanted (about -2 degrees) caption card for a key phrase or nickname, 44-48 px.
- Place labels on maps in a handwritten font.
- Fonts: Anton (titles), Oswald (badges/tags), Caveat (handwritten labels).
- Text never covers a character's face or body. No subtitles burned into the long video.

=== 8. LIGHT PRESETS ===
One preset per shot, defined as: light direction vector, ambient colour + strength, rim colour +
strength, tint colour + strength, and a slow swing of the light. Typical set: GREY overcast,
DUSK warm-orange rim, BULB warm interior from above, DAY bright neutral, plus moon, fire,
golden, door light. Shadows and highlights on everything follow the preset.

=== 9. VOICE ===
- One narrator, warm, clear, English, calm on exposition, more energy on hooks and turns.
- One WAV per shot. Respell years as words ("nineteen forty-five") and add phonetic respellings
  for hard names before speaking.
- Join the shot clips with about 0.55 s gaps into the act VO; run Whisper; re-record any shot
  whose transcript does not match. Save word timestamps per shot (start, VO start, VO end, end)
  and per word.
- No hiss, no robotic artefacts; every line must sound natural.

=== 10. SOUND EFFECTS AND MUSIC ===
- 10-25 SFX cues per act, each tied to a visible action and keyed to a word or a time:
  whoosh on camera moves, thud on impacts, tick on badges and numbers, pop on cards, paper,
  coins, footsteps, doors, stamp, typing, phone ring, camera shutter, crowd, heartbeat, alarm.
- 1-2 ambience beds per shot (wind, city, crowd, fire, rain, office, hum, night, ocean,
  birds), low level.
- Music: an original score per act made in code (strings pad, low cello line, plucks, soft
  drum pulse on tension), mood changes at timestamps (tension / sad / hope / triumph). Music
  fades across act joins; no hard starts.
- Mix: VO normalised (final -14 LUFS), SFX about -11 to -18 dB, beds about -26 dB, music
  about -24 dB, ducked a further 9 dB under speech and rising in VO gaps. Crossfades on every
  scene change. SFX never louder than the voice.

=== 11. RENDER AND ASSEMBLY ===
- Render each act at 1280x720 for preview (under 15 MB), check it, then the next act.
- Combine: trim act tails, audio fades across joins, write chapters (one per act), deliver
  1920x1080, constant frame rate.
- Last 5 s of the long video: clean (no text) for the YouTube end screen.

=== 12. QA (fix until clean, every act and the full video) ===
Sample 1 frame per second into contact sheets (30 frames a sheet) and look at every frame.
Fail the act if any of these appear: glitches, overlapping characters/objects, missing body
parts, floating or sitting on air, pop-ins or vanishing, gliding feet, frozen wheels, texture
flicker, blocky or empty background, flat light without shadows, VO and action out of sync,
text over characters, truncated text, SFX louder than VO, hard music cut, harsh audio cut.
Write each issue with timestamp, severity, cause and a concrete fix. Apply every fix, re-render,
re-check. Repeat until zero high and zero medium issues. Then run the final check again on
the exact upload file.

=== 13. SHORTS / REELS FROM THE VIDEO ===
9:16, 1080x1920. Shock line in the first second, subject's face in the first 3 s. Keep the 16:9
picture with painted bars above/below (no full crop). Channel logo top-right inside the safe zone.
End card centred for 3 s: "Watch the full video on our YouTube channel". Each reel gets its own
thumbnail (frozen hero frame + 2-3 big words), title and description.

=== YOUR INPUT ===
Topic: <TOPIC>
Script (or ask me to write it in the structure above): <SCRIPT>
Start with the storyboard table for all shots, then build Act 0.
```

---

## Part 4. Notes for whoever trains the other AI

- The fastest way to teach the look is to give it real files: one act page (`2d-dynamic/japan-comeback/production/acts/act1/act.html`), its `timing.js`, one sets file (`jp_sets.js`), one cast file (`jp_cast.js`) and the shared engine (`2d-dynamic/shared/vp/`, `vp.js`, `kit.js`). Shot 1.03 (black-market trade) is a good single example: set, light preset, 6 characters with varied poses, a prop hand-off keyed to the words "sold their clothes", a train shake, falling dust, a peeling bamboo-shoot gag, a badge, a card and 5 SFX.
- The prompt above is the Village Painterly 2D dynamic line. The older 2D history line (`2d-history/`, Leo-sheet rig) and the round white-head cartoon look in the `yt-longform-videostyle-stromhell-animation` skill are different styles; ask if one of those is wanted instead.
- No paid services are needed for anything in the prompt. ElevenLabs is used only for the 16:9 long-video thumbnail.
