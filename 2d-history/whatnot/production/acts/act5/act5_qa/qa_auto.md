# qa_auto report: act5.mp4 (act)

Result: **FAIL** - 1 fail, 3 warn, 18 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| FAIL | z-fighting / shimmer | 0:28.00-0:44.00 around top-left (1 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| WARN | cine: slideshow (camera frozen) | 0:23.8 camera still for 3.0 s | checklist B11 rows 67-75 |
| WARN | cine: slideshow (camera frozen) | 0:31.8 camera still for 3.2 s | checklist B11 rows 67-75 |
| WARN | cine: cut rhythm | 0:00.0 100% of shots are longer than 8 s (median 83.8 s) | checklist B11 rows 67-75 |
| CHECK | local glitch/flicker | ~0:01.80 upper-mid-right, upper-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:05.20 top-mid-right, upper-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:11.20 top-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:13.80 top-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:15.50 top-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:16.00 lower-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:28.80 upper-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:29.20 upper-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:29.50 upper-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:31.50 upper-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:34.80 upper-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:35.00 upper-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:39.50 upper-mid-right, lower-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~1:03.00 top-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~1:09.50 top-left, top-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~1:22.80 bottom-mid-left, bottom-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | z-fighting / shimmer | 0:11.00-0:17.00 around top-left (1 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| CHECK | z-fighting / shimmer | 0:18.00-0:24.00 around top-left (1 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 83.90 s, audio=1 |  |
| INFO | loudness | I=-15.9 LUFS, true peak=-1.4 dBTP, LRA=3.8 LU |  |
| INFO | levels | speech/peak windows -11.8 dBFS, floor -29.1 dBFS |  |
| INFO | cine | still-camera share 31%, 1 shots, median shot 83.83 s |  |
| INFO | contact sheets | 3 sheets in act5_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
