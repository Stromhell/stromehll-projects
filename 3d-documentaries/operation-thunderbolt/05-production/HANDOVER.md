# Operation Thunderbolt - handover (7 Nov 2026)

Status: DONE and BOOKED on Zernio (23 posts, booked by Production plan thread). IDs: /mnt/project-files/3d/thunderbolt/TB_booked.txt
- Full video 10 Dec 22:00 UTC (post 6aee6a19e2752ec7054d3e4e); Drive 1aRyj2qUE2LaWzdPm1f3N_YoFIQplY1Ao (AI/Operation Thunderbolt/05 Production)
- 15 reels 11-14 Dec (YT Shorts + IG); 7 IG parts 11-17 Dec 02:00 UTC
- Manifest: reels/release-manifest.md (Drive 17Dg-sJMY4hYXB2Sp_wskTucFRHtUAE2H); YouTube package reels/TB_Full_YouTube.md
- Open: long-video thumbnail is frame-based (TB_Full_Thumb_frame.png). ElevenLabs version waits on Pushpam confirming the "elevan_labs" connector; swap on post 6aee6a19e2752ec7054d3e4e via Production plan thread.

Lessons for next 3D video (Caesar):
- QA prompt /home/user/work/fable_qa_prompt.md (copy in this repo needed if container resets) incl. 6 Nov Extra checks (walk-in-place, floating props, terrain gaps, glow).
- RQ=fast can overflow half-float near glossy surfaces -> black slab (act 1 shot 1.10). Keep lights away from clearcoat; verify with video at RQ=fast, not stills.
- Stills mode leaks overlays between shots; render shots alone.
- Engine captions are burned in; reels reuse them. Lock per-shot captions with ownCaption to stop top/bottom jumping.
- Full-video QA catches things act QA missed (script contradictions, floating props) - always run it.
- Combine: per-act video copy + audio trimmed to frames/24 with fades, concat, 2-pass loudnorm -14 LUFS.
