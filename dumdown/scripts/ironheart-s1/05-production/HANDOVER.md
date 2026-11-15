# DumDown video 4: Ironheart Season 1 explained — HANDOVER

- BOOKED Sat 21 Nov 2026 16:00 UTC on DumDown Zernio (YouTube @stormidumbdown, account 6af588367c013269c7d19174), post 6af9cd98f354bd89ed6a0661. Pushpam OK 15 Nov 2026 15:16 UTC ("okay").
- Title: Dumbing Down Ironheart Season 1 For You (Ironheart Explained). Category 24, public, not for kids, pinned first comment set. Metadata: launch/metadata_v2.md. Launch kit https://claude.ai/artifact/S4Pt9zRHynPAMuuSLvCKYk.
- Full video v3, 17:23, Drive DumDown/Ironheart S1/04 Full Video (id 1rAICZryjLBTpH1X2uBWskgNWuOv1w493; v1, v2 kept). Thumbnail v1 (engine render, free) Drive 1J2om9Ax2h8GfZA0wxBIvHbMiD7pYz2X0.
- Script ironheart-s1-narrator-script-v1.md, storyboard https://claude.ai/artifact/HNku348eQpf7knGv8vP9aj. Source: Drive 1BwSK5L4_eeUOn7XGeS0JBamTc-Nvp5ze (one mkv, all 6 eps; subs stream 12).
- Voice: free Kokoro am_michael narrator (animation/vo_kokoro.py), gag voices in animation/gags/gags_data.py. No ElevenLabs.
- Build: repo branch claude/project-thread-qo6yqt, dumdown/scripts/ironheart-s1/animation (25 acts, 12 gags, plates.js Ironheart block, cast.cjs, props.js). Work dir was /tmp/ihwork. Booking: POST /media/presign, `curl -T` PUT, POST /posts (post.json shape in launch/zernio_booked.json).

## Lessons for the next DumDown video
- Handheld props (`on:` / `onHead:`) must draw in the front layer. shots.js now does this automatically; in the back layer they were invisible, and glow props crashed the render and silently cut acts short. After every render compare each act mp4 length with its mix wav.
- Big captions (`big:`) now draw inside the bottom letterbox bar (engine POSTBAR hook), so they never cover characters.
- Objects being examined go on a `table` prop, never floating mid-air.
- Comic/plain plates need zoom 1.45+ or characters read tiny.
- `render_gags.sh` needs `mkdir -p $SCR/gframes` first.
- Grain "z-fighting" FAILs in qa_auto are still false positives on this engine.
