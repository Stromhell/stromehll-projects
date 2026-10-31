# Make in-house YouTube Shorts covers (Stormi channel)
Pushpam approved: covers made in-house (NO ElevenLabs, no paid tools). Clickbait text is fine, but it MUST be accurate to what the reel actually says/shows. Never invent facts.

Folder: C=/tmp/claude-0/-home-user-stromehll-projects/6a704166-3eb0-50a9-9d8c-0c09c5ae1412/scratchpad/cov
Your group file: $C/grp_<GROUP>.json  (items: id = Zernio post id, url = reel mp4, title = YouTube title, t = post time UTC, ig = also on Instagram, n = number)
Work in $C/work_<GROUP>/ (mkdir it). Process items in order of t (earliest first).

Per item:
1. curl -s -o work_<GROUP>/<n>.mp4 "<url>"
2. python3 -I $C/tools/sheet.py work_<GROUP>/<n>.mp4 work_<GROUP>/<n>_sheet.jpg   -> then Read the sheet image. It shows 9 frames with seconds; the burned-in captions tell you what the narration says.
3. Pick the most striking, clear frame that matches the hook (a face/character/key object; avoid end card, avoid frames mid-transition), and write 2 lines:
   LINE1 = white headline, 2-4 words; SLAB = accent slab, 1-3 words. Together they form a curiosity hook true to the reel (based on title + captions). ALL CAPS. Avoid naming real people's private matters beyond what the reel says.
4. python3 -I $C/tools/cover.py work_<GROUP>/<n>.mp4 <SECONDS> work_<GROUP>/<n>.jpg "LINE1" "SLAB" "#hexaccent" <cx 0-1> [panelTop,panelBottom]
   - The reel's 16:9 picture panel sits in the middle of the 9:16 frame; the tool auto-detects it and blows it up to fill the cover. It prints 'panel (a,b)'. If the cover shows caption text bars / blurred background at the top, pass the panel rows explicitly (e.g. 627,1222). Check one cover per group carefully, then reuse the same panel for the group.
   - cx = horizontal focus (0 left .. 1 right) so the main subject is centred and not under the text (text sits in the lower ~40%; logo top-right).
   - accent: yellow #ffd23f, red #ff4b3e, green #7ee03c, cyan #39d0ff - vary per video.
5. Make a 360x640 preview (python3 -I -c "from PIL import Image; Image.open('X.jpg').resize((360,640)).save('Xs.jpg')") and Read it. Fix and redo if text is cut off, subject hidden, or it looks wrong.
6. Upload: mcp__Zernio__call_tool name "media_get_media_presigned_url" arguments {"filename": "<GROUP>_<n>_cover.jpg", "content_type": "image/jpeg"} -> curl -s -o /dev/null -w "%{http_code}" -T work_<GROUP>/<n>.jpg -H "Content-Type: image/jpeg" '<uploadUrl>'  (expect 200)
7. Attach: mcp__Zernio__call_tool name "posts_update_post" arguments {"post_id": id, "media_items": [{"type": "video", "url": <url exactly>, "thumbnail": <publicUrl>, "instagramThumbnail": <publicUrl>}]}  (omit instagramThumbnail if ig is false). Change NOTHING else.
8. Append a line to $C/done_<GROUP>.tsv: id<TAB>n<TAB>t<TAB>LINE1 / SLAB<TAB>publicUrl
9. Delete the mp4 and sheet after the post is updated (keep the cover jpg).
Load Zernio tools with ToolSearch "select:mcp__Zernio__call_tool". Rules: do not touch times, captions, titles or any other post. If a post fails to update, retry once, then report it.
Final reply: count done, any failures, and 2-3 example covers (LINE1 / SLAB).
