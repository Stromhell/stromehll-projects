# DumDown video 5: Agatha All Along Season 1 explained — HANDOVER

- BOOKED Mon 23 Nov 2026 16:00 UTC on DumDown Zernio (YouTube @stormidumbdown, account 6af588367c013269c7d19174), post 6afab68206094f3a5cce0e12. Pushpam OK on full v2 16 Nov 2026 07:51 UTC ("okay").
- Title: Dumbing Down Agatha All Along For You (Agatha All Along Explained). Category 24, public, not for kids, pinned first comment set. Metadata launch/metadata.md; Zernio response launch/zernio_booked.json. Launch kit https://claude.ai/artifact/8T43ygvf7KxELUEsaA98x6.
- Full video v2, 15:38, Drive DumDown/Agatha All Along S1 (id 1Na5N7cwxr3OYMmQ1x0iCc7p7ZFl6-VfP; v1 1LeRwNPtQRIXWHGJELhjUgkxzSdpbrfnn kept, rejected). Thumbnail v2 (ElevenLabs seedream-5-lite redraw + code text).
- Voice: free Kokoro narrator. Backgrounds: 27 free local SDXL-Turbo plates (animation/tools/sdgen, plate_meta.json for per-plate scale k and floor fy).
- Build: repo branch claude/project-thread-qhl1uq, dumdown/scripts/agatha-all-along-s1/animation. Booking: POST /media/presign, curl -T PUT, POST /posts (dumdown/tools/zernio.sh).

## Lessons for the next DumDown video (v1 was rejected as a slideshow)
- Camera: every shot needs motion (push, pan, whip, handheld drift); cine_qa.py checks still-camera share (<5%), slideshow runs and cut rhythm. Clamp the camera so the plate always covers the frame.
- Scale: calibrate each plate to real-world size (~333 px per metre at s1.45 characters) using a reference object (door, car, counter); set k/fy in plate_meta.json.
- Props: handheld props attach to a hand (grab/side), objects being examined sit on a table, nothing parks in mid-air unless it truly flies.
- Cards and titles: characters move to the side opposite the card; titles at the top, never over faces.
- Run qa_auto + cine_qa + a 1 fps watch on every act before assembly; shimmer FAILs on magic effects are accepted false positives.
