# Cover watchdog (Pushpam, 6 Nov 2026: "make sure all the yt short have cover on them ... every time")
Scheduled task "Shorts cover watchdog", every 3 h. Runs in the thread "Set up watchdog for Shorts covers". Opus 5.5 low. Keep it cheap.

## Each run
1. Read state: /mnt/project-files/system/cover-watchdog/state.json {"last_checked": ISO|null, "last_full": ISO|null, "fixed_total": n}
2. List YouTube posts that are still to go out:
   mcp__Zernio__call_tool "posts_list_posts" {"status":"scheduled","platform":"youtube","fields":"title,mediaItems,scheduledFor,platforms","limit":100,"sort_by":"scheduled-asc","updated_since": last_checked}
   - Full sweep (drop updated_since, walk every page with nextCursor) when last_checked is null or last_full is older than 24 h.
   - Also check status "failed" posts the same way (they may be retried).
3. A post is MISSING a cover when its video mediaItem has no `thumbnail`, or the post also goes to Instagram and has no `instagramThumbnail`.
4. Fix, in this order (stop at the first that works):
   a. One of the two fields is set: copy it into the other.
   b. A cover file exists in the project folders for that video (match the mp4 file name: e.g. JP_Reel_01.mp4 -> */reels/out/JP_Reel_01_thumb.jpg, *_Cover*.jpg, *_cover.png in /mnt/project-files/<line>/<video>/ or Drive AI/<video>/Thumbnails|Reels). Upload it (media_get_media_presigned_url -> curl PUT) and attach.
   c. Make one in-house with HOWTO.md (sheet.py + cover.py). Rules: accurate to the reel, subject name highlighted, text never over faces/characters, logo top-right, no ElevenLabs. Check the preview before attaching.
   Attach with posts_update_post {"post_id", "media_items":[{"type":"video","url":<same url>,"thumbnail":X,"instagramThumbnail":X}]}. Change NOTHING else (never times, titles, captions).
5. Write state (last_checked = run start time) and append one line per fix to /mnt/project-files/system/cover-watchdog/log.tsv: time, post id, scheduledFor, title, fix a|b|c, cover url.
6. Report: nothing missing -> no message. Fixes made -> one short message to Pushpam (count + earliest post fixed). A post going out in under 6 h that could not be fixed -> tell Pushpam at once, plus the owning thread.
