# WW2 Part 1 (2D): start notes for the new thread, 6 Nov 2026

Read first: /mnt/project-files/system/stormi-production-system-v1.md, then the last 2D handover:
2d-history/micromax/05 Production/HANDOVER.md (also in /mnt/project-files/2d-history/micromax/05 Production/).

## State
- shared/pipeline.conf: ACTIVE="ww2-part1" (only 1 x 2D video in production).
- Script: ww2-part1/ww2-part1-production-script.md (cold open + 7 acts + ending = act0..act8, ~6:51).
- Plates painted (production/plates/), act pages act0..act8 exist (body.js, act.html, placeholder timing.js).
- Voice text extracted from the script: production/voice/act0.txt .. act8.txt (one paragraph per shot). Not voiced yet.

## Next steps
1. bash shared/run_video.sh ww2-part1  (runs voice_batch.py -> wt.py --check -> timing.js -> denoise vo.wav (vo_raw.wav kept) -> render_act.sh per act). Several hours; run in background, watch disk (delete frame caches).
2. Check each act's wt.log for BAD lines and re-voice those.
3. /watch QA every act, fix-until-clean. Shot timings in body.js were built against placeholder timing; re-check after real timing.
4. python3 shared/remix_plus.py ww2-part1 MOODS (lots of SFX + music; one mood per act), then combine_full.sh, preview artifact to Pushpam.
5. After OK: thumbnail (ElevenLabs, cheapest model, YT thumbnail only), 15 reels, IG parts, kit to Production plan thread for booking. Never post to Zernio directly.

## Content rules (WW2)
- Hitler only as a silhouette; no swastikas or Nazi insignia (German forces plain grey). Real people stylised.
- India maps (if any) official borders: world:'ind', highlight:'India'.

## QA lessons (Pushpam, 6 Nov, all lines)
- Remove VO hiss/breath noise (denoise is built into run_video.sh).
- /watch must catch: walk-in-place (fix: scroll background with the character, small zoom-out on stop), walk cycles not starting/stopping on time, floating objects/people (luggage, riders, soldiers), terrain not touching ground, props clipping over bodies (rig_v5 holdBehind), characters vanishing, blocky sea/textures.
- Thumbnail and every reel cover: subject name highlighted (e.g. WW2 / HITLER'S EUROPE), text never over characters.

## When done
Write ww2-part1/05 Production/HANDOVER.md (template: micromax), copy to the project folder, then resolve the thread. Every new video gets its own new thread (Pushpam 6 Nov 15:52).
