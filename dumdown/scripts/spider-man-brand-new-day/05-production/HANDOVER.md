# HANDOVER: DumDown video 7, Spider-Man: Brand New Day

- BOOKED Fri 27 Nov 2026 16:00 UTC, DumDown YouTube, Zernio post 6afd629d8600800b20f39758 (06-launch/zernio_booked.json). Pushpam OK'd v1 on 18 Nov (via coordinator).
- Final file: DumDown_SpiderManBND_FULL_v3.mp4 (16:02, -14.7 LUFS, one-pass encode, decode clean). Drive: https://drive.google.com/file/d/1fJ0y60_kdi3OF6OkUNhUqEbd3arHH64U/view (05 Production). v1 kept.
- v3 = v2 (rooftop floor/parapet prop under every *_roof shot, 9 acts re-rendered) + 5 s clean end screen (sd_nyc_roof plate, music fade).
- Thumbnail thumb_v3.jpg; metadata 06-launch/metadata.md (title, chapters, tags, pinned comment).
- Style: Toon Lanky trial (Kai/Mira rig, TLSNAP sprites in Agatha v2 engine). Narrator Chatterbox + Fenrir ref; gag voices Kokoro.
- Build: repo branch claude/project-thread-p09u9z, dumdown/scripts/spider-man-brand-new-day/animation. Booking: POST /media/presign, curl -T, POST /posts (dumdown/tools/zernio.sh).

## Known leftovers (accepted)
- qa_auto "z-fighting/shimmer" FAILs at 2:26, 8:27, 10:16-10:50: moire from the dense atrium/office painted plates under camera drift, not 3D z-fighting. Next time: blur/downscale busy plates slightly.
- voice_qa: 11 "clipped word" flags on narrator chunks; waveform shows a natural 40-50 ms decay, judged false positives.
- 10:44: two pop labels ("INHIBITOR CANNOT ATTACH" + "(SAME)") overlap briefly near the Hulk's head.

## Lessons for the next DumDown video
- Wide shots on roof plates need a floor prop (sbprops P.roof) or characters float.
- Always add the clean 5 s end screen inside the one-pass encode; never concat -c copy (timebase mismatch = decode FAIL).
- Toon Lanky trial was for this video only; next DumDown video returns to the usual style unless Pushpam says otherwise.
