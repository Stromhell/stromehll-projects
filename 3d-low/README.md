# 3D low: the cartoon 3D documentary line

Set up 30 Oct 2026 from `Video Production Handover v2` (the FlyDubai project that made FZ1073, Tesla vs Edison, North Korea and McDonald's in Africa). "3D low" is that house look: a lightweight cartoon 3D world (round white-headed characters, raised parchment maps, bold titles) rendered with toon materials and ink outlines. It is a separate line from the realistic 3D engine in `3d-documentaries/` (which uses HDRI, PBR and MakeHuman people) and renders several times faster, so it can take long scripts the realistic line can't fit.

Thread: "Set up 3D low-poly production line". Drive mirror: `AI/3D low/`.

## 1. The look (from the handover, section 6)

- **Characters** (`engine/lib/people.js`): big sphere head `#fffdf8` lit / `#e9e5df` far, no nose or ears, ink outline `#2b1e16` (never pure black), small body, white mitten hands. Face on a canvas: two ink-oval eyes, brows by mood (calm / stern / worried / smug / sad / surprised), one-stroke mouth. Blinks ease shut and open over 0.28 s on each figure's own 2.6 to 5.4 s timer, so crowds never blink together. Costume and hair carry the detail (uniform stripes, coats, aprons, armbands). Everyone breathes, sways and tilts; no frozen figures.
- **Walks**: legs ±26°, knee bends only in swing, arms opposite, two bobs per stride, 3° lean, stride length matched to ground speed via `dist` so feet never slide. Use `sets.lanePath()` and drive `p.update(t, {pose:'walk', dist})`.
- **Staging**: floor plan with walk lanes per set; feet on a visible surface; contact shadow under every figure; scale matched to props; figures cut by a table stand behind its far edge; people spaced apart. **Cause before effect**: chair swivels, then stand; door opens fully, then walk through its centre, door closes after; handshakes ease in, three shakes, ease out; stamps ease down and lift.
- **Sets** (`engine/lib/sets_low.js`, `props.js`): real 3D geometry with lights and shadows, hollow rooms with a working door and furnished, lit interiors seen through glass. If a frame looks blocky or plain, add shadows and detail. Brands as simple shapes, no real mascots.
- **Maps** (`engine/lib/maps.js` + `engine/data/world.json`): parchment look, brown borders, raised highlighted countries, pins dropping with overshoot, growing gold route ribbons on an ink underlay, travelling icons. `world.json` is Natural Earth 10m **India point-of-view** data, so India always shows the official boundary with all of J&K, Ladakh and Aksai Chin (India `#F2830F`). Keep labels off Kashmir. Side effects of that data: Western Sahara inside Morocco, Somaliland inside Somalia (flag them to Pushpam when they appear). Historic places get both names ("SMILJAN, AUSTRIAN EMPIRE IN 1856, TODAY CROATIA").
- **Overlays** (`engine/lib/ui.js`): Anton titles white with thick dark stroke; slam titles scale 1.9x to 1x in 0.22 s; act badge top left (dark box, gold text); slanted white date tag bottom right; running tally top right; two-line callouts (second line red); attribution chips ("his claim, not verified"); word-by-word subtitles placed in the band with least overlap with characters and other overlays, never over a character. Short overlay text only.
- **Finish**: one palette per film written in the script; grain 0.055 and vignette 0.5 on every frame; warm grade. Camera always moves (eased push-ins, dollies, cranes, orbits, over-the-shoulder close-ups), never snaps. Cut every 3 to 10 s with a soft whoosh 0.35 s before each cut. The shot must match the exact VO line.
- **Sensitive content**: violence implied (cut to black, silhouettes, closed curtain, silent crowd); no blood, no weapon in motion, no imagery of real attacks; unproven claims carry a chip; leaders as portraits or turned-away silhouettes when needed; real people as generic house figures with a name callout; "hijacker"/"accused", never "terrorist", for anyone untried (make both, recommend the safer).

## 2. Sound, voice, subtitles (handover section 7)

- Narration in Pushpam's cloned voice (`pushpam-voice` skill, local Chatterbox; never ask for a sample). Narration `--energy 0.45 --pace 0.4 --pause 0.3`; hooks and reels `--energy 0.7`. Normalise text for TTS (years spelled out, phonetic spellings) but keep proper spellings in subtitles. Check every line with speech-to-text and regenerate garbled ones. VO first, then render (the voice model runs 70x slower while rendering). Needs huggingface.co, cdn-lfs.huggingface.co, download.pytorch.org allowed in the environment; a network change only reaches new sessions.
- Every shot gets at least two sound effects from the script's SFX column; all effects synthesised or free (no ElevenLabs, no Artlist). `tools/sound_mix.py` lays room tone per shot, placed cues, a whoosh per cut and an optional music bed, side-chain ducked under the VO; then `loudnorm I=-16 TP=-1.5`. More SFX and music at combine time, still under the VO.
- Character voices: Pushpam's voice pitch-shifted with rubberband (formant preserved).

## 3. Pipeline (handover section 5), per film

| Step | What | Where |
|---|---|---|
| 1 Intake | First reply: say what you're doing, drop sponsor reads (ask once), create the Control Room card marked **3D** | board |
| 2 Script | `yt-script`, `yt-plan`, `hook-generator`; fact-check hard against real reporting; `<CODE> - Script v1.md` with hook table, "what changed" table, style, **"feedback built in" table**, sources, one shot table per act (Shot, Type MAP/SCENE/DATA/GAG/TITLE/CARD, Narration, On screen, Motion, SFX x2, Overlay), fact-check table. Also `shots.json` and `voice-lines/actN.tsv`. ~150 wpm, sentences under 25 words, no AI patterns. Act 0 = 45 to 65 s cold open, hook in 10 s. 3 to 10 s per shot | `<film>/01-script/` |
| 3 Voice | `pushpam-voice`, one wav per line, `ids.txt` per act; never render with placeholder timings | `<film>/03-voice/` (Drive only for big audio) |
| 4 Scenes | One `shots/<code>_actN.js` per act, sets in `lib/`, every shot checked with stills (`render.js stills ... --at 0.15,0.55,0.9`) and the strict overlap checker until **QA CLEAN** | `engine/shots/` |
| 5 Storyboard | Real frames of every shot (one still each) with VO line, camera move and sound notes; published as an Artifact and saved as HTML + images | `<film>/02-storyboard/` |
| 6 Render | `tools/act_pipeline.sh N` (per-shot clips, resumable, VO laid on the timeline, mix, damage check); `render_queue.sh` for several acts; `watchdog.sh` + 12-min keep-awake check-ins while rendering; one act per background job, everything resumes from clips on disk | `<film>/05-production/acts/` |
| 7 Watch check | `tools/qa_watch.sh act.mp4 TAG` (1 fps sheets + /watch frames), read by a **Fable 5.1** subagent; fix every finding, re-render the range, check again until clean. Nothing is handed over before a clean check | |
| 8 Preview | One combined preview page per film (Artifact with assets, 480/720p copies under ~13 MB per act); `previewUrl` on the board card; then status `waiting` and ask once: "All N acts are ready, can I combine?" Keep producing the next queued film while waiting | |
| 9 Feedback | Timestamped note = fix that shot, re-render that range, then sweep every act for the same class of problem. General note = whole film and future "feedback built in" rows. Film-specific note stays on that film | |
| 10 Combine | Concatenate acts with chapters, richer SFX and music under the VO, 2-pass under 450 MB, `<CODE>_Full_v1.mp4` + chapters file | `05-production/` |
| 11 Package | 10 scored titles (`yt-package`), thumbnail A and B (HTML page screenshot, big yellow/white condensed text, dark outline; ElevenLabs image allowed **only here**, cheapest model, detailed prompt), description with chapters and sources, pinned comment | `05-production/launch/` |
| 12 Reels | 15 reels, 15 to 60 s, re-rendered **without burned subtitles**, vertical 1080x1920 with captions below the picture, on-screen hook, Stormi logo top-right in the safe zone and the centred "watch the full video on our YouTube channel" end card (`tools/reel_brand.sh`), own in-house thumbnail, title and caption; check no reel freezes or starts black; watch-check each | `05-production/reels/` |
| 13 Schedule | Booking sheet to the Production plan thread (it owns Zernio slots); check `posts_list` before any retry | |
| 14 Close | Remove the card from the pipeline once the film and its reels are scheduled; archive sources; tell the coordinator | |

Every file goes to GitHub (`3d-low/<film>/01-script … 05-production`) **and** Drive `AI/3D low/<Film>/…` (`tools/drive_put.py FILE --dest "3D low/<Film>/05 Production"`; files over 100 MB go to Drive only, say so). Keep the Control Room card updated at every step with what is happening now, what comes next and the latest preview links.

## 4. Engine quick start

```
cd 3d-low/engine && npm i            # three@0.170
node render.js stills <shots.json> shots/<mod>.js <outdir> [act|ids] --at 0.15,0.55,0.9   # prints OVERLAP hits
RQ=fast RS=0.667 node render.js video <shots.json> shots/<mod>.js out.mp4 <act> --fps 30 --crf 21 --timing act.timing.json
```
`render.js` runs headless Chromium with SwiftShader at 1920x1080 and streams JPEG frames into ffmpeg; `RQ=fast RS=0.667` draws the 3D at two-thirds size (text stays full-res) for about 2x speed. Style test: ~1.7 fps in fast mode on this 4-core box (about 20 min per minute of film).

Shot modules export `shots = { id: async kit => updateFn(t, u) }`. The kit gives `scene, camera, core, people, props, maps, ui, sets, qa`. Set `k.draw(ctx, t)` for extra 2D drawing, `k.anchor` for callouts, `p.userData.driven = true` for figures you animate yourself, `p.userData.allow = ['desk chair']` for props a figure may legitimately touch. Mark solid props with `qa.solid(obj, 'name')` so the checker sees them. A glitch at a regular interval is a renderer bug, not a scene bug.

`shots.json` fields per shot: `id, type, narration, seconds, overlay ("callout: A / B; chip: text; tally: value"), dateTag, badge, fadeIn, fadeOut, noSubs`.

## 5. What Pushpam values (in order)

1. Nothing passes through anything. 2. Motion that looks real, cause before effect. 3. The India map. 4. Rich sound that never covers the voice; subtitles that never cover characters. 5. Seeing progress without asking (board, preview pages). 6. Work that keeps moving while he reviews. He writes short messages with typos; "1.05" means 1:05 into that act; when his act number doesn't match the footage, go by timestamp and say which act was fixed.

## 6. Style test (30 Oct 2026)

`style-test/`: four shots (night apron cold open with slam title and foot-locked walkers; office with swivel-then-stand and door-opens-then-walk; India-view world map with pins, route ribbon and plane; data card with counting number and chip). Stills in `style-test/stills/`, clip in `style-test/out/`, watch-check notes in `style-test/QA.md`.
