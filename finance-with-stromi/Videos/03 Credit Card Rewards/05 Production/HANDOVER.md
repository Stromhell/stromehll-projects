# Handover: Finance with Stromi 03, "How Credit Cards Make Money Even If You Pay in Full"

**Status:** BOOKED on Finance Zernio (YouTube, financewithstromi). The post is set for 18 Nov 2026 at 16:00 UTC, three days after Frozen Market, as Pushpam asked on 14 Nov at 20:32 UTC. Post id: 6af8c59dbd1119a8d365c7ce, saved in zernio_booked.json. No reels have been made.

## Final files
- Full video: 03 Renders/CreditCards_full_1080p.mp4 (also on Drive, file id 1cvRAQnoTXTZt_aqYM3SkElDxdzitNb8d). Specs: 19:26, 1080p24, -14 LUFS, true peak -1.4 dBTP, clean last 5.4 s.
- Thumbnail: CreditCards-thumbnail.jpg. The art is from ElevenLabs gemini-3.1-flash-lite-image (2 takes at 206 credits each); the text was added in canvas.
- Launch kit: https://claude.ai/artifact/4G9WzEB6tWsYd6Bjd9LKSQ (local copy: launch-kit.html).
- QA notes: qa/act*-round1.md and qa-full-final.md.

## Build
- Engine: the Frozen Market engine plus sets03.js, acts03.js and mgdata03.js (03 Production/build in the repo, branch claude/project-thread-yl7emg; project files 04 Build Files).
- Motion graphics: mg02.js now supports `delay` on a beat and two new positions, C and CL.
- Audio: audio/mix03.py and foley03.py.
- Rendering: `node render.js ACT out.mp4 [f0 f1]` renders a frame range. You can re-render only the shots you fixed and splice them in (see renders/splice.sh pattern), which is about 3x faster than a whole act.

## Lessons
- qa_auto flags shimmer on intended motion (the coin arc, spinning clock hands). Check the frames before you treat a flag as a fault.
- Watch for graphic cards placed over characters. The fix was to put the card in the gap between groups and delay it until the characters have walked apart.
- The true peak came out at -0.9 dBTP after AAC encoding. Fix it with alimiter limit=0.78 on the final remux.
