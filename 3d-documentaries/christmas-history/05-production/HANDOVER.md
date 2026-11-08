# The Real History of Christmas (3D) - handover (8 Nov 2026)

Status: DONE. Booking sent to the Production plan thread 8 Nov ~01:40 UTC (full video in the held slot 23 Dec 18:30 UTC = 24 Dec 00:00 IST; reels suggested 24-27 Dec; 3 IG parts on the next free long days). Post ids: see BOOKED section below once added.
- Full: XM_FULL.mp4 6:34, -14 LUFS. Drive AI/The Real History of Christmas/05 Production (XM_FULL id 1-y4uy7ru1al2l4FDDEW_Odk_BWcN0ExD), subfolders Reels, Reel covers, IG parts, Launch.
- Launch kit page https://claude.ai/artifact/EygwzWZkT49ZvH7hWR91oG ; storyboard https://claude.ai/artifact/Rm9rtv9NbvXj6smHBiY4KU
- Character: Flurry the snowman (engine/shots/xm_sets.js), finale shot 6.8 says HAPPY CHRISTMAS. No sponsor.
- Thumbnail: ElevenLabs background (cheapest model) + in-house Anton text (launch/thumb_text.js).

How it was built
- Shots engine/shots/xm_act0-6.js; per-act pipeline tools/xm_act.sh A (resumable, delete shots/ID.mp4 to redo one shot; never edit it while it runs). cues.py = SFX/music cue lists.
- combine.sh joins acts (video copy, audio trimmed to frames/24, 2-pass loudnorm -14).
- launch/build_release.py: 15 reels + 3 IG parts from the full video, keeping burned captions (1600x1080 centre crop on blurred bg), auto-extends any reel under 30 s, brands with tools/reel_brand.sh / tools/ig_brand.sh.
- Covers: tools/reel_thumb.js on frames cropped (crop=1920:756:0:162) to cut burned captions; pick frames where faces sit in the upper half and use --pos bottom.

Lessons for the next 3D video
- Plan reel segments at >= 30 s up front (many 2-3 shot ranges were 21-27 s).
- Snowy pines: keep them off the camera path (cameras started inside trees twice).
- White beard + pale skin = blank face; add rosy skin, nose, cheeks.
- Artifact publish limit 64 MB per call: send preview media in two publishes; root must be the scratchpad.
- tools/ig_brand.sh already exists; don't regenerate it.
