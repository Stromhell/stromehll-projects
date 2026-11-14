# DumDown video 02: Loki S1 + S2 — HANDOVER

**Status:** BOOKED. YouTube (DumDown) Mon 16 Nov 2026 16:00 UTC, Zernio post `6af7f90daf85b6890cd16097` (DumDown's own Zernio, not Stormi's connector).
Title "Dumbing Down Loki For You (Season 1 + 2 Explained)", 21:17, thumbnail v6, 31 tags (12 constant + 19 own), pinned first comment, category 24, not made for kids. No reels/shorts (DumDown is long-form only).

## Where things are
- Launch files: /mnt/project-files/dumdown/scripts/loki-s1-s2/launch/ (metadata.md, tags.json, thumbnails v1-v6, zernio_booked.json) + Drive AI/DumDown/Loki S1+S2/04 Full Video.
- Full video: Drive AI/DumDown/Loki S1+S2/04 Full Video/DumDown_Loki_S1S2_FULL_v1.mp4 (id 1x5GvmkObwEfsRhGYzRzLCutOZIao21of). Not kept in project files (storage cap).
- Launch kit page: https://claude.ai/artifact/JGDEzvYpiTPQmtULF5QrHz
- Code: this folder's animation/ (branch claude/project-thread-n1trmm).

## Pipeline (what to reuse for video 03)
1. VO: free Kokoro TTS (kokoro-onnx v1.0), narrator am_michael. Pushpam: no ElevenLabs for this video (voice or thumbnail).
2. acts/actNN.js -> mkpage.sh NN -> render_all.sh (render.cjs, 4 workers, ~2-5 min/act) -> mixloki.py (VO + code score + cue SFX).
3. Gags: gags/gags_data.py (act + seconds) -> render_gags.sh.
4. assemble_full.py: pipes each segment's raw frames into ONE x264 encode (a 42-input filter_complex ran out of 16 GB RAM). Then loudnorm -14 and an alimiter limit=0.7 level=0 pass (AAC pushed true peak to -0.9 otherwise).
5. QA: qa_auto.py --kind act/full + 1 fps sheets. Its "z-fighting" FAILs are the film-grain texture (false positive, same as VisionQuest).

## Engine lessons from this video
- Screen coords for pops/bigText are 1920x1080; world is 2560x1440. bigText takes (text, lt, a, b, col, bx, by).
- shots.js head-fit auto-raises the camera so horns/heads are not cut; `noHeadFit` on a shot turns it off; close-ups fall back to face-only framing.
- New props: keeper (Time-Keeper with springy head), bench (judge desk), plane.
- Never leave a full blackout >2 s mid-act (QA fails it as black + frozen); use a dim colored light instead.

## Thumbnail
thumb_mk.py (throne frame + text + Dr Doom inset). Source frame upscaled 4x with free local Real-ESRGAN (upscale_esrgan.py + x4.onnx, ~13 min CPU).
