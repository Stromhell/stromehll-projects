# Micromax (2D) handover, 6 Nov 2026

## 1. Video
- Title / line: "Who Killed Micromax?", 2D (Leo style), 7 acts, 6:25, -14 LUFS
- Final full video: 2d-history/micromax/production/full/micromax_full.mp4 (not in git), md5 01274d2c6dfd885f09b45f60b01268ad. Project folder copy: /mnt/project-files/2d-history/micromax/launch/full_parts/ (split, part00 gzipped).
- Reels: /mnt/project-files/2d-history/micromax/launch/reels/ (15), covers reel_covers/ (MICROMAX tag); IG parts ig_parts/ (3) + ig_covers/; thumbnail Micromax_Thumbnail_v1.jpg (ElevenLabs). Repo: micromax/reels/, micromax/launch/.
- Zernio (ids in micromax/launch/MX_booked.txt): full video Fri 18 Dec 19:00 UTC, post 6aedf69659626664e0de1995. Reels 1-15 on 20-24 Dec at 12:00, 17:00, 22:00 UTC (YT + IG). IG parts 1-3 at 20:30 UTC on 23, 24, 25 Dec.

## 2. What was done
- Acts 0-6 voiced, rendered, remixed with shared/remix_plus.py (moods tense,warm,drive,drive,epic,tense,warm).
- Pushpam review 6 Nov 10:55: India maps now use India's official borders (shared/p2/world_ind.js, world:'ind', highlight:'India'); sample phone drawn behind the trousers (rig_v5 holdBehind); voice hiss removed in every act.
- Pushpam approved publishing 6 Nov 11:32 UTC. Booked 6 Nov 15:50 UTC.

## 3. Reusable for the next video
- Voice denoise (all VO, hooks, CTA): arnndn=m=sh.rnnn,afftdn=nr=14:nf=-50:tn=1,lowpass=f=11000, then atrim start_sample=1680 + apad to cancel the 35 ms delay. Keep vo_raw.wav.
- India maps: ENV.regionMap(..., { world: 'ind', highlight: 'India' }), keep the north in frame.
- remix_plus.py VIDEO MOODS; combine_full.sh skips actN_dry.mp4.
- New QA rule (Pushpam 6 Nov, Mongols review): check walk-in-place, walk start/stop timing, floating props/people, terrain touching ground.

## 4. Open items
- Drive: done 6 Nov 12:40 UTC (long form history video / Micromax (2D) / Launch, 40 files + micromax_full.mp4, md5 matched).
- Delete /mnt/project-files/2d-history/micromax/launch/full_parts/ (needs Pushpam's OK).

## 5. Cleanup done
- Reel frames, IG act frames, cover scratch deleted: yes
- Control Room card: not updated (Pushpam 5 Nov)
