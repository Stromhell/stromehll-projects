# Handover: Finance with Stromi 05, "Escaping the Rat Race: What School Failed to Teach You About Money"

**Status:** BOOKED on Finance Zernio (YouTube, financewithstromi) for Sat 21 Nov 2026 at 16:00 UTC (9:30 PM IST). Pushpam OK'd v4 on 15 Nov at 14:05 UTC. Post id 6af9bc80f145948f64a622fe, saved in zernio_booked.json. No reels have been made.

## Final files
- Full video: 03 Renders/Escaping-the-Rat-Race-full_v4.mp4 (Drive file id 1BVt82PDdX4U_KLHEDe5dy4SRZVx4noMA). Specs: 14:53, 1080p24, -14.2 LUFS, true peak -1.8 dBTP, clean end. Older v3 is kept beside it.
- Thumbnail: thumb.jpg. The art is ElevenLabs (1 take, 206 credits); the text is from thumb_build.html (Anton font).
- Launch kit: https://claude.ai/artifact/RBCGhp691rBSsiMQznABtv (index.html, built by `python3 mkkit.py DRIVE_LINK LENGTH`; index_v1.html is the v3 kit).
- Description: youtube-description.txt (chapters, sources, CC BY music credits). Tags: youtube-tags.json (20).

## Build
- Work dir: /home/user/work/rr (cloud scratch). Build source copied to repo branch claude/project-thread-y025fp, folder finance-with-stromi/Videos/05 Escaping the Rat Race/04 Build Files/src.
- Script: shots05.py. Voice: tts05.py (Kokoro). Timing: mktiming05.py writes build/timing05.js.
- Scenes: build/sets05.js, acts05.js, mgdata05.js. The engine is shared with Credit Cards. Previous versions are kept as *_v1.js and *_v2.js.
- Rendering: `node build/render.js ACT out.mp4`, at most 4 in parallel, about 0.2 s per frame. `node build/snapall.js ACT outdir fracs` gives quick stills per shot for checking a fix.
- Audio: audio/mix05.py needs the venv python (`kv/bin/python`, which has scipy, pedalboard and pyloudnorm). It now writes rr_mix_v4.wav. combine05_v4.sh limits it (alimiter 0.6) and muxes it with the acts.

## Lessons from Pushpam's review (15 Nov 13:03 UTC)
- Sound effects and room ambience must duck under the voice. In v4 the SFX peak is 0.30 and drops to 40% while voice plays; ambience 0.14, down to 30%; music 0.42.
- No prop may float. That covered a swinging broom, a coin arcing through empty air, and a magazine board hanging above a stool. Props rest on something or sit in a hand, or they are removed.
- Wall cards must not clip into windows. Use a screen tag instead.
- Don't put a prop on a character's head for a gag (the cushion). Stage it with the body instead (here Jimmy turns into the couch).
- qa_auto's z-fighting flag in act 5 is the spinning hamster wheel, which is intended. The 6.2 s black at 1:08 is two title cards in a row, which is accepted.
- Run the venv python for mix scripts. System python3 has no scipy.
