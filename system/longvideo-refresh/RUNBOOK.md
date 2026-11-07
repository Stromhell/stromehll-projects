# Low-view long video refresh (Pushpam, 7 Nov 2026 19:45 UTC)
"If long video is not getting views for more than 32 hours then generate new thumbnail and title and description, do this only two times."

Scheduled task "Long video refresh check", every 4 h. Opus 5.5 low. Keep it cheap. No OK needed; show each swap in the thread.

## Rule
- Scope: LONG YouTube videos only (duration > 180 s, no #shorts) on "Stormi Explain Everything" (Zernio account 6add4e45e997d795ad6dfc72).
- Low views = fewer than THRESHOLD views (state.json, default 50) when 32 h have passed since publish (swap 1) or since the last swap (swap 2).
- Swap 2 compares views gained since swap 1 against the threshold.
- At most 2 swaps per video, ever. After swap 2 the video is "done" in state.json and never touched again.
- Applies to long videos published on or after 1 Nov 2026.

## Each run
1. Read state.json {threshold, videos:{<ytVideoId>:{zernioPostId,title,publishedAt,swaps:[{at,viewsBefore,title,thumb}],done}}}.
2. mcp__Zernio__analytics_get_analytics platform=youtube from_date=2026-11-01 limit=50 (walk pages). Big output: parse the saved file with python ast.literal_eval(result). Long = analytics.videoDurationSeconds > 180.
3. A long video not yet in state.json: add it (find its project folder by matching the title in */*/launch/launch.json). For each long video not done: hours = now - (last swap at, else publishedAt). If hours >= 32 and views (minus viewsBefore of last swap, for swap 2) < threshold -> swap.
4. Swap:
   a. New title (<= 100 chars), different angle/hook from all earlier titles; true to the video (launch/launch.json backups are a good start). New description: new hook paragraph on top, keep chapters, sources, hashtags from launch/*_Title_Description.txt.
   b. Thumbnail art: ElevenLabs creative_generate_image model recraft-v4.1-flash (cheapest, ~48 credits/take), 2 takes, detailed prompt, LEFT third empty for text, painterly 2D cartoon; never name real dictators (ToS block). New concept, not a copy of the old one.
   c. Text: python3 /mnt/project-files/2d-dynamic/shared/launch/long_thumb.py ART OUT.jpg "LINE1" "SLAB" "#accent" 430. Look at it: text off faces, subject name/number highlighted, readable small.
   d. Upload: Zernio call_tool media_get_media_presigned_url {filename, content_type:"image/jpeg"} -> curl -X PUT the file to uploadUrl -> publicUrl.
   e. Apply: Zernio call_tool posts_update_post_metadata {post_id:<zernioPostId>, platform:"youtube", title, description, thumbnail_url:publicUrl}.
   f. Save files to <video>/launch/refresh-N/ (project files + repo branch + Drive AI/<video>/Thumbnails).
   g. Append to log.tsv and update state.json.
   h. Post the new thumbnail + title in the thread (and coordinator relays to project chat).
5. Nothing to swap -> stay silent.
