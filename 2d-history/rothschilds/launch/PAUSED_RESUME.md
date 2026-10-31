# Rothschilds launch: paused 31 Oct 2026 10:45 UTC

Pushpam (31 Oct 10:43): "stop creating all the video for now until thu 12.30 pm". Nothing is booked yet.

## Done
- Full video v2 approved by Pushpam (31 Oct 08:55). Drive: https://drive.google.com/file/d/14Rnk0tVryCgnVugOKBJlHzC2bjf-7XFt/view
- Long-video title, description and chapters are in `launch/Rothschilds_Title_Description.txt` (also on Drive, Launch folder).
- The long-video thumbnail `launch/Rothschilds_Thumbnail_v1.jpg` was made in-house, because the ElevenLabs image connector is signed out. If Pushpam reconnects it, make an ElevenLabs version.
- 15 reels have been built and uploaded to Drive (Reels folder), with covers in Reels/Covers.
  - Spec and timings: `reels/spec.json` and `reels.json`. Copy: `reels/reels_copy.json`.
  - Covers: `reels/thumbs/`. Voice lines: `reels/voice/` (vo-01..15 hooks, 16 YouTube CTA, 17 and 18 "watch part 2/3").
  - The music bed is at /mnt/project-files/2d-history/rothschilds/launch/reel_music.wav.
- Instagram parts are cut at acts 0-2, 3-4 and 5-7 (`reels/ig_parts.json`), built with `shared/tools/ig_parts.py`.
  - Part 1 (178.4 s) and Part 2 (152.7 s) are built and uploaded to Drive (Reels/IG Parts).
  - Part 3 was stopped mid-build and has not been built.
  - Part covers are in `reels/ig_covers/`.

## Still to do when work resumes
1. Fix the reel checkup findings in `production/qa/reels-round1.md`, then rebuild the affected reels.
   - **HIGH and MEDIUM (11 reels):** the hook plays over the previous shot's last frame. In build_reel.py, when t0 > 0, take the hook still from `frames[int(0.8*FPS)]` and hold that frame over the first ~21 clip frames. This affects reels 3, 5, 6, 7, 8, 9, 10, 11, 13, 14 and 15.
   - **Reel 3:** change the kicker to "BANKING IN WARTIME" and the hook to "Napoleon's wars changed this family's fortunes. Here's how." This needs a new voice line.
   - **Reel 8:** change the kicker to "LOANS TO NEW NATIONS" and the hook to "When Belgium broke away, it needed a loan to survive." This needs a new voice line.
   - **Reel 10:** set s1 = 7 so the reel ends on "first practising Jewish MP".
   - **LOW:** hold the last caption group for 0.6 s, and move two-line kickers below y 250.
   - To rebuild, re-render frames for those reels with /tmp/claude-0/rs_render_reels.sh (act_nosub.html pages need re-creating: add `<script>KIT.drawSubs = () => {};</script>` before `</body>`). Then run build_reel.py, re-check, and re-upload.
2. Re-render the act 5-7 subtitle-free frames, then build Part 3: `NPARTS=3 python3 shared/tools/ig_parts.py rothschilds FRAMEROOT OUT RS p3.json NVDIR "THE ROTHSCHILDS"`. Run a checkup on all 3 parts.
3. IG part titles and captions (Part N of 3).
4. Write the release manifest and booking sheet, and send them to the Production plan thread for booking.
5. After booking: write HANDOVER.md in 05 Production (repo and Drive), clear scratch, message the system thread to delete the card, and resolve the thread.
