# Nike (2D) handover, 5 Nov 2026

## 1. Video
- Title / line: "How a Waffle Iron Built Nike", 2D (Leo style), 10 acts, 8:53, -14 LUFS
- Final full video: 2d-history/nike/production/full/nike_full.mp4 (not in git). Project folder: /mnt/project-files/2d-history/nike/launch/full_parts/ (split, part00 gzipped, md5 a22cad89d60f46d1c6fb1af52d294a6c). Keep full_parts until the Drive sync thread has rebuilt and uploaded it.
- Reels: /mnt/project-files/2d-history/nike/launch/reels/ (15), covers reel_covers/ (NIKE tag); IG parts ig_parts/ (4) + ig_covers/; thumbnail Nike_Thumbnail_v1.jpg (ElevenLabs). Repo: nike/reels/, nike/launch/.
- Zernio (ids in /mnt/project-files/2d-history/nike/launch/NK_booked.txt): full video Mon 14 Dec 19:00 UTC, post 6aecf074ba2cbd11b3188e6d. Reels 15-19 Dec, 3/day at 00:30, 12:00, 19:30 UTC, YT + IG. IG parts 1-4 at 20:30 UTC on 16-19 Dec.

## 2. What was done
- Acts 0-9 voiced, rendered and checked; act 7 runners spread out and rulebook moved; act 8 Hill kept clear of the HQ sign.
- All acts remixed louder with shared/remix_plus.py (SFX -8 dB, ambience beds -22 dB, music bed -21 dB, mood per act), as Pushpam asked.
- Pushpam approved the video and the booking 5 Nov 20:23 UTC.

## 3. Reusable for the next video
- Same pipeline as Rothschilds (see 2d-history/rothschilds/05 Production/HANDOVER.md section 3).
- Sound boost: python3 shared/remix_plus.py VIDEO (keeps cues_orig.json, remuxes with -c:v copy).
- Combine: bash shared/combine_full.sh VIDEO.
- Big files to the project folder: split -b 40M -d, gzip part00, add an md5 file.

## 4. Open items
- Drive upload of the Nike launch folder: waiting on a working Drive token (new token gives 401 unauthorized_client). The Drive sync thread owns it.
- After that upload, delete /mnt/project-files/2d-history/nike/launch/full_parts/ (needs Pushpam's OK).

## 5. Cleanup done
- Reel frames, IG act frames, cover scratch and act_nosub.html deleted: yes
- Control Room card: not updated (Pushpam 5 Nov)
