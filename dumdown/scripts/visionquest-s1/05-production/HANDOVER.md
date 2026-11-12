# DumDown VisionQuest S1: HANDOVER (booked 12 Nov 2026)

## Status
- FULL v4 (29:27, 26 gags) is booked on DumDown's Zernio account (YouTube stormidumdown, account 6af588367c013269c7d19174). It goes out Sat 14 Nov 2026 at 16:00 UTC, post id 6af627f4d4ce9b130f171b5c.
- Title: "Dumbing Down VisionQuest For You (Season 1 Explained)". Category 24, not made for kids. The pinned first comment is set.
- Thumbnail (OK'd by Pushpam 21:41 UTC): launch/DumDown_VisionQuest_S1_thumbnail_v4_comic.jpg. It shows green Wanda with Doom, Vision and Ultron in circles, the text "WANDA IS ALIVE", a red/green grade and a filter-made comic look.
- Launch kit: https://claude.ai/artifact/E7GNzxZnM3hfPsrAiZHBRz
- Metadata and tags: launch/metadata.md and launch/tags.json. The channel SEO and the constant 200-character channel tag set are in /mnt/project-files/dumdown/channel-seo.md.

## Pipeline (code in repo dumdown/scripts/visionquest-s1/animation-v2, scratch cold2/)
1. Each act goes VO (ElevenLabs "David", eleven_v4, one take) → whisper timings → act.js → render → mix (mixlib; never run mixes in parallel) → ffmpeg.
2. Gags: renderer gags.js; voices are ElevenLabs eleven_flash_v2_5, batched one generation per voice and split per line with whisper (split4.py).
3. Assembly: assemble.py splits each act at the gag points. Gags listed in the CUT set are skipped, and acts_v3/ overrides acts_v2/.

## Thumbnail lessons (Pushpam)
- He wants REAL characters in thumbnails, built from screenshots he supplies. The steps are cutouts (rembg isnet-general-use), yellow, red or green ringed circles with faces fully visible and big, big text boxes, and arrows.
- ElevenLabs refuses to generate real Marvel faces, and we never have AI redraw official characters. A comic look is done with filters only (posterize, edges, halftone).

## Open items
- Drive: the refresh token expired 12 Nov 21:35 UTC, so launch/ (thumbnails v2-v4, metadata) and this handover have NOT been uploaded to Drive "DumDown/VisionQuest S1/05 Launch". Upload them once Pushpam renews GDRIVE_REFRESH_TOKEN.
- Pushpam still needs to paste the channel description and keywords from channel-seo.md into YouTube Studio.
- Next DumDown video: start a NEW thread that reads this handover and dumdown-channel memory.
