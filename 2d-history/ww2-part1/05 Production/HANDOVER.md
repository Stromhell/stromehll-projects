# WW2 Part 1 (2D) handover, 6 Nov 2026

## 1. Video
- Title / line: "How One Treaty Started World War 2 (Part 1)", 2D history, 9 acts (act0-8), 6:17, -14 LUFS.
- Final full video: 2d-history/ww2-part1/production/full/ww2-part1_full.mp4 (not in git), md5 5e08482d3cb49170974388f266c51cfe. Project folder copy: /mnt/project-files/2d-history/ww2-part1/launch/full/. Drive: AI/long form history video/WW2 Part 1 (2D)/Renders/Full (id 1Sdqx-Cb6TVap1l2EUpkDONM2J7f8jQBJ).
- Launch kit: /mnt/project-files/2d-history/ww2-part1/launch/ holds:
  - reels/ (15) and reel_covers/ (tag WW2)
  - ig_parts/ (3) and ig_covers/
  - WW2_Part1_Thumbnail_v1.jpg (ElevenLabs background)
  - WW2_Part1_Title_Description.txt
  - WW2_release_manifest.json (titles and captions for every post)
- The same kit is on Drive under .../WW2 Part 1 (2D)/Launch, in the folders Reels, Reel covers, IG parts and IG covers.
- Repo: ww2-part1/reels/ (specs, voices, covers) and ww2-part1/launch/.
- Zernio: booking sent to the Production plan thread on 6 Nov. Booked times go here once confirmed.

## 2. What was done
- Content rules: Hitler appears only as a silhouette, with no Nazi symbols, and German forces are plain grey.
- Every act passed /watch QA by round 2-3. Notes are in production/qa/actN-roundR.md.
- Pushpam's 6 Nov lessons applied:
  - VO hiss removed
  - walk cycles checked
  - nothing floating
  - cover text kept off the characters
  - the subject (WW2) highlighted on every cover
- Pushpam approved the video on 6 Nov at 18:05 UTC.
- Reels and IG parts were cut from subtitle-free act pages (act_nosub.html = act.html with `KIT.drawSubs = () => {};`).
- Hook voices were re-voiced wherever whisper heard a mispronunciation (respell the hook text, then re-check).

## 3. Reusable for the next video
- shared/mkmusic.py wraps shared/score.py. remix_plus.py now uses it, because the old scratchpad mkmusic.py is gone. Moods: tense, warm, drive, epic, sad, calm.
- shared/tools/long_thumb.py: `ART OUT "LINE1" "SLAB" "#acc" maxw`.
- build_reel.py needs a FULL dir with actN.mp4 at the top level (symlink the acts).
- IG covers: reel_thumb.py with spec items that carry `tag: "PART N OF 3"`.
- faster_whisper on file input fails with an av error. Decode to numpy with ffmpeg first.
- /mnt/project-files adds about 6 KB of metadata to binary files, so md5 won't match. Compare pixels or durations instead.

## 4. Open items
- Booking confirmation from the Production plan thread, then fill in section 1.
- Delete /home/user/ww2_nosub frames (container scratch, not shared).

## 5. Cleanup done
- Reel frames and IG frame scratch are container-local only.
- Control Room card: not updated (Pushpam, 5 Nov).
