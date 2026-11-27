# qa_auto report: act4.mp4 (act)

Result: **FAIL** - 1 fail, 1 warn, 18 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| FAIL | z-fighting / shimmer | 0:35.00-0:43.00 around bottom-right (1 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| WARN | cine: cut rhythm | 0:00.0 57% of shots are longer than 8 s (median 9.3 s) | checklist B11 rows 67-75 |
| CHECK | flash/flicker spike | ~0:21.75 (one-frame change then back) | look for texture/ground flicker, shadow-update throttle, variety flip, pop-in; keep cuts on purpose |
| CHECK | flash/flicker spike | ~0:41.75 (one-frame change then back) | look for texture/ground flicker, shadow-update throttle, variety flip, pop-in; keep cuts on purpose |
| CHECK | flash/flicker spike | ~1:06.25 (one-frame change then back) | look for texture/ground flicker, shadow-update throttle, variety flip, pop-in; keep cuts on purpose |
| CHECK | local glitch/flicker | ~0:00.50 lower-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:00.50 bottom-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:00.80 upper-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:00.80 top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:10.00 lower-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:13.20 upper-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:13.80 upper-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:15.50 top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:16.00 top-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:27.50 upper-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:32.80 lower-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:33.00 lower-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:50.80 top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:56.20 upper-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~1:03.00 top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 75.77 s, audio=1 |  |
| INFO | loudness | I=-16.0 LUFS, true peak=-1.4 dBTP, LRA=2.9 LU |  |
| INFO | levels | speech/peak windows -12.0 dBFS, floor -32.0 dBFS |  |
| INFO | cine | still-camera share 27%, 7 shots, median shot 9.33 s |  |
| INFO | contact sheets | 3 sheets in act4_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
