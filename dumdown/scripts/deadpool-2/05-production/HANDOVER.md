# DumDown video 3: Deadpool 2 (Super Duper Cut), HANDOVER

**Status:** BOOKED. YouTube (DumDown) Thu 19 Nov 2026 16:00 UTC, Zernio post `6af8b2ccf8e007f927d6290f` (DumDown's own Zernio). Pushpam asked for 3 days after the next video (Loki, 16 Nov).

- Full video: DumDown_Deadpool2_FULL_v2.mp4, 16:06, 1080p24, -14 LUFS, clean last 5 s. Drive AI/DumDown/Deadpool 2/04 Full Video (id 10hjZQk_VcJoNS2fYIgQvvZi1PbTOzDWf).
- Launch kit: https://claude.ai/artifact/5LsFfrtnwbsEykHzZpjwsA. Launch files: /mnt/project-files/dumdown/scripts/deadpool-2/launch/ (metadata.md, thumbnail v1, zernio_booked.json).
- Voice: free Kokoro (am_michael narrator, gag voices in animation/gags/gags_data.py). No ElevenLabs used (thumbnail made in code too).
- Build: animation/ (acts/, plates.js with DRESS detail pass, gags/, mixloki.py, render_acts.sh, render_gags.sh, assemble_full.py, chapters.py, thumb/). Work dir was /tmp/dp2work.
- Booking: POST /media/presign then PUT (use `curl -T` for big files; --data-binary runs out of memory), then POST /posts with mediaItems (video + thumbnail) and platformSpecificData title/categoryId/firstComment. YouTube account 6af588367c013269c7d19174.

## Lessons for the next DumDown video
- Read every 1 fps sheet of the full: dressing props (plants, frames, cameras, signs) placed at character height read as floating or cover close-ups. Keep dressing above head height or at the edges.
- Handheld props (device) must use `on: <char index>` so they never float.
- Gag signs must sit below the letterbox (world y >= 360).
- Grain "z-fighting" FAILs in qa_auto are false positives on this engine.
- Reels not made (DumDown is long-form only).
