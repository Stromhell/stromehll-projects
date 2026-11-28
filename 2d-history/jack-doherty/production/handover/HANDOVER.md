# Handover: Jack Doherty "Paid to Stop Posting" (JD, Stormi 2D)

BOOKED: YouTube Mon 30 Nov 2026 16:00 UTC (9:30 PM IST), Zernio post 6b0b108f086fb3744f3e25c8 (stormiexplaineverything). Pushpam OK ("okay") 28 Nov 17:30 UTC.
Title: "A Casino Paid This YouTuber to Stop Posting". Thumbnail JD_Thumbnail_v1.jpg (PAID TO QUIT, in-house). Description, chapters, tags in launch/JD_Title_Description_v1.txt.

- Source: youtu.be/TvpFRx2klyk (Sid Montage, research only). 7 acts, 7:07, -14 LUFS, louder VO remix, last 5 s clean end card.
- Full video: JD_full_v2.mp4 on Drive AI/Stormi Explain Everything/Jack Doherty Paid to Quit (2D)/04 Renders (id 1eWFDkacE3MA9iVQK9puY9PvqNMLa1WjX). v1 = before act5/6 camera fixes.
- Launch kit https://claude.ai/artifact/RGAu6WvATpSJDrn5wVFEdF ; storyboard https://claude.ai/artifact/3fxSWLqHKkCejZ36vhyxAi
- Repo: 2d-history/jack-doherty on branch claude/project-thread-3pdro7 (acts load whatnot kits via ../../../../whatnot/production/). No reels made.
- Other longs moved +48 h (SS 2 Dec ... Micromax 19 Jan): see reschedule-done-v1.md. Shorts re-link: 2-hourly job.

How booking was done (no browser needed):
- media_get_media_presigned_url for mp4 + jpg, curl PUT each file (-T for big file), then call_tool posts_create_post with media_items [{type video, url, thumbnail}], platforms [{youtube, accountId 6add4e45e997d795ad6dfc72, platformSpecificData {title, visibility public, madeForKids false}}], scheduled_for, tags.
- posts_update(post_id, scheduled_for) moves posts; do latest first.

Lessons:
- Container restart kills voice_batch/autoq: rerun, they skip finished acts.
- wt.py BAD flags are often digits-vs-words false positives; real ones (repeated phrase, misread names) need retake.py. Respell tricky names ('Eye-land Boys', 'Doh-er-tee').
- Check car/prop scale against characters (act1 car was tiny) and look for frozen cameras and chart labels under subtitles.
- Project-files mount adds metadata so md5 differs: upload big renders from local copies.
- QA left: gentle camera on chart ~6:26, z-fight 0:55-1:04, two dark scenes (told Pushpam).
