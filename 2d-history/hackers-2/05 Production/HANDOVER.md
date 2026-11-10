# Kids Who Hacked the World Pt2 - Xbox Underground (2D) handover, 10 Nov 2026

## 1. Video
- "The Kids Who Hacked the World, Part 2: The Teens Who Stole the Next Xbox". 2D history, Gumball rig style, prefix XU, 9 acts (act0-8), 5:53, -14 LUFS.
- Master: 2d-history/hackers-2/production/full/hackers-2_full.mp4 (not in git). Drive: AI/long form history video/Kids Who Hacked Pt2 - Xbox Underground (2D)/Renders/Full (id 1qSx90FfW7TwbdJzcf0vujdzXWXYz9D1T); acts in Renders/Acts (dry versions kept as actN_dry.mp4).
- Launch kit in repo hackers-2/launch (manifest, thumbnail, title/description, covers, booked ids); reel and IG part mp4s are on Drive under .../Launch (reels, reel_covers, ig_parts, ig_covers) and in hackers-2/reels/out locally.
- Kit preview: https://claude.ai/artifact/7vCcg1dfZypgwWuNeuDHEh
- Repo branch claude/project-thread-nr6qmy.

## 2. Booked on Zernio (19 posts, UTC; ids in launch/XU_booked.txt)
- Full video Mon 1 Mar 2027 16:00, post 6af2f181e5c368b241446aa8
- IG parts: P1 1 Mar 13:00, P2 5 Mar 13:00, P3 6 Mar 13:00
- Reels R01-R15 (YT Shorts + IG, one post each with both platforms) 4-8 Mar at 12:00/17:00/22:00 (3 a day, under the 3-4 cap)
- NEXT FREE LONG SLOT: 5 Mar 2027 16:00 UTC (every 4 days). Shorts are taken 4-8 Mar at 12/17/22 UTC, so next reels start 9 Mar.

## 3. What was done
- All 9 acts QA'd on 1 fps contact sheets + whisper VO check until CLEAN (production/qa/actN-round1.md, full-round1.md).
- Fixes: cards/titles moved off characters and above the subtitle line, Perth-to-Seychelles flight trail, extra desk removed, indictment and gavel framed panels, flips keyed to VO words.
- Thumbnail art: ElevenLabs recraft-v4.1-flash (cheapest), 2 takes; text "TEENS STOLE / THE NEXT XBOX" in green #5ad83a via shared/tools/long_thumb.py.
- Pushpam OK'd the full video 10 Nov 09:39 UTC.

## 4. Reusable for the next video
- production/xu_kit.js: console/dev-kit props, server racks, eBay listing, border booth, indictment page, framed gavel panel, Person A stamp, plus everything from tw_kit.js.
- Reel pipeline: reels/reels.json (id, act, s0, s1, hook, kicker, title, tag) -> act_nosub.html frames -> shared/tools/build_reel.py. Hook voices via a pseudo dir reels/vgen/production/voice + shared/voice_batch.py; add TTS respellings for numbers ("20,000 dollars", "about 25 companies").
- Whisper check: load wav with scipy and pass a 16 kHz numpy array (av.open fails on a metadata_errors kwarg).
- Zernio reel booking: presign each mp4 and cover with media_get_media_presigned_url, curl PUT, then posts_create_post with media_items {url, thumbnail, instagramThumbnail} and platforms youtube (platformSpecificData.title + " #shorts") + instagram.
- Part 3 (British teens who hacked the CIA director's email) is teased at the end; next in the series.

## 5. Open items
- A stray Drive folder "Kids Who Hacked Pt2 - Xbox Underground (2D)" may exist at AI root with a partial act0 from a wrong-path upload; safe to delete once Pushpam OKs.
