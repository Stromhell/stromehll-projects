# Handover: The Spy Who Bet on Jensen (2D, prefix JH)

## Status (10 Nov 2026)
- **Full video:** 12:35, booked on YouTube for 10 Nov 20:30 UTC (Zernio post 6af36d63b7f08d9bcc57e79c). v2 is on Drive (id 1wIpoqupSQ-fVOkUPj9IrDTOw1jZP_BIt).
- **Thumbnail:** JH_Thumbnail_v2.jpg (Drive id 1Plo_H3JtJere34_MU_Pd-gif1ZdwvxOT).
- **Reels:** 15, ALL BOOKED 10 Nov 21:58 UTC on YouTube + Instagram, 11-18 Nov, each with an Instagram Manual Trial Reel copy 1.5 h later. They use the v2 face-cutout covers (reels/covers_v2.py). Ids: /mnt/project-files/2d-history/jensen-spy/launch/JH_reels_booked.txt. The 15 displaced reels now sit 27 Feb-9 Mar 2027.
- **Launch kit:** https://claude.ai/artifact/UBHjyHe68hSxUamRJn4HGz

## Where things are
- **Repo:** 2d-history/jensen-spy on branch claude/project-thread-mxr012.
- **Reels:** jensen-spy/reels/.
  - build_jh.py ID builds one reel (bars layout).
  - reels.json holds act, t0, t1, hook and kicker.
  - copy.json holds titles and captions.
  - Hook voices are in voice/hooks.
- **Reel mp4s and covers:** /mnt/project-files/2d-history/jensen-spy/reels/, and Drive "AI/long form history video/Jensen Huang Spy Story (2D)/06 Reels".

## Lessons for the next 2D video
- **Reel layout:** Pushpam rejected the full-bleed 9:16 pan crop ("camera movement feels off").
  - Use the bars layout: the 16:9 frame in a band over a blurred backdrop, a kicker on top, captions below and the logo top-right.
- **Reel openings:** every reel opens on the long-thumbnail face art for 3 s or less, with a voiced shock line.
  - Gold name slab, with the last words of the line in red.
  - The face card also serves as the cover.
- **Clean frames for reels:** render act_nosub.html (act.html plus `K.drawSubs = () => {}`) with shared/render.js. Act 0 to 10 took about 16 min with 3 workers.
- **Pushpam's QA fixes** (also in render-qa-rules-checklist):
  - Seated legs go behind the torso.
  - Custom walks set `o.t = o.walkPhase = X.phase`.
  - Mic grills face the speaker.
  - Use lots of SFX and music (remix2.py).
- **Python gotcha:** when string-replacing a line of Python, check that the rest of the line didn't get pulled into an if-block. A reel came out 15 s long because of this.
