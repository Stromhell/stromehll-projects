# DumDown video 9: Doctor Doom's Entire Life — HANDOVER

- BOOKED Tue 1 Dec 2026 16:00 UTC (9:30 PM IST) on DumDown Zernio (YouTube @stormidumbdown, account 6af588367c013269c7d19174), post 6b007d995eaab45ce4db0b53. Pushpam OK 20 Nov 2026 17:04 UTC ("okay") on the kit https://claude.ai/artifact/LYpi7zA2EeQBbtMeUrhoaK.
- Title: Doctor Doom's Entire Life Explained (Funny Recap). Category 24, public, not for kids, pinned first comment. Metadata launch/metadata.md, booking response launch/zernio_booked.json.
- Full video v1, 17:43, -14.5 LUFS, 18 acts + 10 gags. Copy in 05-production/DumDown_DoctorDoom_FULL_v1.mp4; Zernio media https://media.zernio.com/media/1795173710447_7203a891e2ec3fd0_DumDown_DoctorDoom_FULL_v1.mp4. NOT on Drive yet: gdrive_upload.py refresh token expired 20 Nov; upload to Drive AI/DumDown/Doctor Doom (1uUT0YMzt3BCpiLDWcV8DUg3KmdU4Z2ck) once a new token exists.
- Thumbnail v1: free engine still (animation/acts/thumb.js + thumbkit/thumb_mk.py). No ElevenLabs used.
- Look: flat cartoon copied from Pushpam's reference youtu.be/ZfffqOOlLAY; no letterbox, no grain. Storyboard https://claude.ai/artifact/UJ4gE4PMCwjhBbRcPw5Bu4. Script doctor-doom-narrator-script-v1.md.
- Build: repo branch claude/project-thread-87ifha, dumdown/scripts/doctor-doom/animation (flatkit.js canvas engine, cast.js, sets.js, props.js, film.js, acts/, gags/, mix.py, assemble_full.py). Work dir /tmp/ddwork (cloud scratch).

## Lessons for the next DumDown video
- qa_auto "slideshow (camera frozen)": avoid `still: true` and zoom ranges under ~0.2; drift now also applies to cam.on shots.
- qa_auto "cut leak" fires on same-room reframes with flat walls; check by eye, usually false.
- Poses: negative elbow bend = inward. 'lie' pose is broken.
- Kokoro clipped word ends: add a 25 ms decaying tail, not a fade.
- Never run two render.sh jobs at once (they share /tmp/ddwork/frames/<name>).
- Render ~1-3 min per act on 4 workers; assemble ~10 min.
