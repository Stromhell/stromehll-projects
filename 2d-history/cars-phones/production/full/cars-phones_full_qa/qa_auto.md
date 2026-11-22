# qa_auto report: cars-phones_full.mp4 (full)

Result: **FAIL** - 2 fail, 3 warn, 31 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| FAIL | z-fighting / shimmer | 2:03.00-2:16.00 around bottom-centre (8 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| FAIL | z-fighting / shimmer | 2:24.00-2:35.00 around bottom-centre (9 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| WARN | cine: slideshow (camera frozen) | 1:12.0 camera still for 3.0 s | checklist B11 rows 67-75 |
| WARN | cine: slideshow (camera frozen) | 8:12.2 camera still for 3.3 s | checklist B11 rows 67-75 |
| WARN | cine: cut rhythm | 0:00.0 52% of shots are longer than 8 s (median 8.8 s) | checklist B11 rows 67-75 |
| CHECK | flash/flicker spike | ~0:18.25 (one-frame change then back) | look for texture/ground flicker, shadow-update throttle, variety flip, pop-in; keep cuts on purpose |
| CHECK | flash/flicker spike | ~4:57.75 (one-frame change then back) | look for texture/ground flicker, shadow-update throttle, variety flip, pop-in; keep cuts on purpose |
| CHECK | possible pop-in | ~0:02.50 top-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:07.00 top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:12.80 top-mid-left, top-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:18.00 top-mid-left, top-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:20.50 top-mid-left, top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:23.20 upper-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:25.00 upper-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:28.20 upper-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:31.50 top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:35.80 upper-left, upper-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:43.00 top-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:45.50 bottom-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:47.00 lower-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:47.00 bottom-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:47.20 upper-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:48.20 top-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:56.00 top-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:56.00 top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:57.80 upper-left, upper-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:58.80 upper-mid-left, lower-mid-left, lower-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~1:01.20 upper-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~1:09.50 bottom-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~1:09.80 bottom-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~1:10.20 bottom-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~1:51.50 top-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | more local changes | 69 more spots, e.g. 1:51.50, 1:53.50, 2:09.20, 2:16.00, 2:24.80, 2:39.20, 2:41.00, 2:44.80 | step through those seconds at 8 fps |
| CHECK | z-fighting / shimmer | 2:52.00-2:57.00 around middle-centre (1 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| CHECK | z-fighting / shimmer | 3:22.00-3:27.00 around top-right (1 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| CHECK | end screen | cars-phones_full_qa/zoom/last5s.jpg: last 5 s clean (no text/subtitles/characters in the YouTube end-screen element zones) |  |
| PASS | decode check | decodes with 0 errors |  |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 527.40 s, audio=1 |  |
| INFO | loudness | I=-14.0 LUFS, true peak=-1.9 dBTP, LRA=3.8 LU |  |
| INFO | levels | speech/peak windows -12.7 dBFS, floor -31.1 dBFS |  |
| INFO | cine | still-camera share 11%, 42 shots, median shot 8.83 s |  |
| INFO | contact sheets | 18 sheets in cars-phones_full_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
