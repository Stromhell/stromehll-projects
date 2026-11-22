# Handover: Tesla Turned Cars Into Phones. Now They Keep Crashing (2D, prefix CP)

## Status (22 Nov 2026)
- **Full video:** 8:47, booked on YouTube (stormiexplaineverything) for Tue 24 Nov 2026 16:00 UTC (9:30 PM IST). Zernio post 6b02c0233914b5d713ce7f73. Pushpam OK'd the video ("okay", 10:05 UTC) and thumbnail v3 ("good job", 10:12 UTC). No other bookings moved.
- **Drive:** AI/Stormi Explain Everything/Cars Into Phones (Tesla crashes)/ (06 Renders/CP_FULL_v1.mp4, 07 Launch, 01 Script, 02 Storyboard).
- **Thumbnail:** launch/CP_Thumbnail_v3.jpg = ElevenLabs edit (gemini-3.1-flash-lite-image) of art4 with an Elon Musk caricature + real Tesla logo badge (Pushpam's photo + logo, launch/tesla_logo_ref.png) via mk_thumb_v3.py. ~1,440 credits total (4 art + 2 edits).
- **Launch text:** launch/CP_Title_Description_v2.txt (YouTube copy drops "no real logos"). Launch kit https://claude.ai/artifact/BrvxPNie97337jbdDPLdiT (shows thumbnail v1). Storyboard https://claude.ai/artifact/3Nbkdv6kU8PbRg49Jj5Gpu.
- **Reels:** none made (shorts calendar full; Pushpam's rule: new reels go after the last booked short).

## Where things are
- Repo 2d-history/cars-phones on branch claude/project-thread-mu8kai: build/data.py (v3 script, older data_v1/v2), production/ (cp_kit.js, plates, acts 0-7, voice, remix_cp.py, autoq_cp.sh, voice_batch_cp.py, qa/), launch/.
- Project files /mnt/project-files/2d-history/cars-phones/ (01 Script, 02 Storyboard, 05 Production, 07 Launch).

## Lessons for the next Stormi 2D video
- Pushpam wanted the topic re-angled on the news hook (Tesla crashes) but kept every part of the source story: blend, don't cut.
- Pushpam likes real faces (caricatured) and real brand logos on thumbnails when the video is about that brand.
- Whisper mishears names (Porsche, Benavides); respell in voice_batch and accept close matches.
- remix: detect fresh renders by mtime or the old dry picture is reused.
- Never commit production/full/*.mp4 (550 MB, GitHub rejects); Drive only.
- Jobs over 2 h get killed: nohup + disown.
