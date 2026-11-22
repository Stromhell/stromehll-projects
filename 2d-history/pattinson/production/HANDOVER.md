# Handover: Why Hollywood Can't Stop Casting Robert Pattinson (2D, prefix RP)

## Status (22 Nov 2026)
- **Full video:** RP_full_v2.mp4, 6:45, -14.6 LUFS, last 5 s clean end card. Booked on YouTube (stormiexplaineverything) for Tue 24 Nov 2026 16:00 UTC (9:30 PM IST), Zernio post 6b036d8ce15ef0891c1101e3. Pushpam OK'd ("Good this will go tomorrow", "Move other").
- **Moved:** Cars Into Phones (6b02c0233914b5d713ce7f73) 24 Nov -> Thu 26 Nov 16:00 UTC. Logged in /mnt/project-files/2d-history/prime/05 Production/reschedule-done-v1.md.
- **Thumbnail:** launch/thumb/RP_Thumbnail_v2.jpg = ElevenLabs gemini-3.1-flash-lite art (RP_thumb_art_v2_1, cartoon of Pattinson described from Pushpam's photo) + mk_thumb.py text. ElevenLabs credits ran out (40 left), so no refinement pass; v1 (generic cartoon) kept as spare.
- **Launch kit:** https://claude.ai/artifact/8CVYynovtQxFKMJqNUSGYd (launch/RP_Title_Description.txt: title, description, chapters, tags).
- **Drive:** AI/Stormi Explain Everything/Robert Pattinson Bond (2D)/ (00 Source, 01 Script, 02 Storyboard, 04 Final, 06 Launch).
- **Reels:** none made yet.

## Where things are
- Repo 2d-history/pattinson on branch claude/project-thread-8pl3l6: build/data.py (script), production/ (rp_kit.js, plates, acts 0-9, voice, remix2.py, autoq.sh, full/), launch/.

## Lessons for the next Stormi 2D video
- Booking without keys: Zernio call_tool media_get_media_presigned_url -> curl PUT the file -> call_tool posts_create_post (media_items video+thumbnail, platforms youtube account 6add4e45e997d795ad6dfc72, tags list, scheduled_for).
- prep_act.sh "BAD" lines print a 1-BASED clip index: (2, ...) means vo-02. I re-voiced the wrong clip once (swapped a line). Always run qa_lean.py --script on the full video; it caught it.
- voice_qa.py "clipped word" FAILs are common on Chatterbox takes: regen.sh pattern (up to 3 takes until clean) in /tmp only; respell tricky words (Dune -> Doon, Rain-soaked -> Rain soaked).
- qa_lean "cut leak" in a shot that flips a screen, and "slideshow" on the 5 s end card, are expected.
- ElevenLabs workspace has no upload tool here; reference photos can't be attached, so likeness has to come from a text description.
