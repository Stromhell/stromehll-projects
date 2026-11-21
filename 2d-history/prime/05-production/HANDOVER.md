# Handover: Remember Prime? Now Logan Paul Blames Everyone Else (2D, prefix PR)

## Status (21 Nov 2026)
- **Full video:** 7:25, booked on YouTube for Sat 21 Nov 16:00 UTC (Zernio post 6b01353cb97703f6aeadb468). On Drive as PR_full_v1.mp4 (id 1dphY84B-9xT-ngyf8Eg9WRILNvzLMbzN), folder AI/.../Prime Logan Paul KSI (2D)/Renders.
- **Thumbnail:** launch/thumb/PR_Thumbnail_v1.jpg (ElevenLabs gemini-3.1-flash-lite art + PIL text, mk_thumb.py).
- **Reels:** 15, booked YT + IG 10-14 Mar 2027 after the last booked short (Pushpam's pick). Ids in launch/PR_reels_booked.txt. Registered in system/shorts-fulllink/linkmap.json so the full-video link is added once they publish.
- **Launch kit:** https://claude.ai/artifact/1UQ32nbG8hBgKNRooBWRyD
- **Reschedule:** every later Stormi long video moved +48 h (SS 23 Nov ... Micromax 11 Jan). Log: /mnt/project-files/2d-history/prime/05 Production/reschedule-done-v1.md.

## Where things are
- Repo 2d-history/prime on branch claude/project-thread-888nhe: build/data.py (script), production/ (plates, pr_kit.js, acts, voice, remix2.py, autoq.sh), reels/ (plan.py, build_pr.py, reels.json, copy.json), launch/.
- Project files /mnt/project-files/2d-history/prime/ (01 Script, 02 Storyboard, 04 Renders, 05 Production, 06 Reels, 07 Launch).

## Lessons for the next Stormi 2D video
- **VOICE CHANGE (Pushpam 21 Nov 06:02 UTC):** next Stormi videos use the PREVIOUS voice clone (voice/pushpam.wav + voice_batch.py, not take P speak_mixed.py), and the VO must be LOUDER in the mix.
- Shorts are full at 4/day until 10 Mar 2027; Pushpam chose to append new reels after the last short rather than displace others.
- Real VO runs shorter than the word-count estimate (this video planned ~9 min, came out 7:25).
- Clean reel frames: act_nosub.html = act.html + `K.drawSubs=()=>{}` (script /tmp nosub.sh pattern, 2 workers).
- voice_qa.py crashes on short hook clips without pauses: pad 0.6 s of silence first.
- Covers all used the same Logan/KSI art; consider covers_v2-style scene cutouts for variety next time.
