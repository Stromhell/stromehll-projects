# DumDown: Doomsday Final Trailer at 0.25x - handover (28 Nov 2026)

**Booked:** Sun 13 Dec 2026 16:00 UTC (9:30 PM IST), YouTube DumbDown, Zernio post `6b0af1b02c9777c46721c27e`, public, category 24, not for kids. Pushpam OK 28 Nov 15:18 UTC.
**Title:** I Watched the Doomsday Trailer at 0.25x Speed. Here's What Marvel Hid · **Thumbnail:** A (06-launch/thumb_A_slowmo_remote_v2.jpg); B/C kept for a swap test.
**Final file:** DumDown_DoomsdaySlowMo_FULL_v4.mp4 (15:13, clean 7 s end screen), Drive AI/DumDown/Doomsday Trailer 0.25x/04 Renders https://drive.google.com/file/d/1OPLxHddSiGdby726aFtbmj-sDbXTG9oA/view. Launch kit https://claude.ai/artifact/6X3HJfu5twfja5dZCavYKf. Metadata 06-launch/metadata_v1.md.
**Next free DumDown slot:** 15 Dec 16:00 UTC (Wakanda Forever still waiting for OK with 11 Dec proposed).

## Reuse next time
- Engine: 04-animation (repo branch claude/project-thread-nnwu92), acts_v2/, ds_floor_v2.js, dsprops_v2.js (in-house P.roof rooftop, P.throne).
- Pushpam review 28 Nov 06:00 UTC: "characters in air, not standing on the ground" (repeat mistake, lesson L64). Fix: FLOOR_MODEL y0 must be the real walkable floor of each plate, never the horizon or a table top. Before rendering, draw hz/y0/y1 lines on every plate used (see chk3/floors.jpg method) and read a frame of every shot (shotrev_ds.cjs + contact sheets) checking feet. Plates without ground (city skylines, sky) get an in-house floor prop; seated characters get a real seat prop.
- QA: qa_lean's Qwen + Whisper vo_check are far too slow on the 4-core cloud (Whisper stalls ~7 min in); use qa_auto + per-shot frame sheets. qa_auto shimmer (green hall glow, portals, lightning) and cut leak at comic wipes are false positives.
- Drive mount drops MP4s over ~500 MB: split -b 40M into 04-renders/FULL_vN_parts + md5 and ask the Drive upload thread.
