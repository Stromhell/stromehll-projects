# qa_auto report: act0.mp4 (act)

Result: **PASS (machine checks)** - 0 fail, 1 warn, 13 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| WARN | cine: cut rhythm | 0:00.0 100% of shots are longer than 8 s (median 45.0 s) | checklist B11 rows 67-75 |
| CHECK | local glitch/flicker | ~0:13.50 top-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:20.20 top-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:20.80 upper-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:22.00 top-mid-right, top-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:25.20 lower-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:25.20 lower-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:27.50 lower-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:32.00 upper-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:33.80 lower-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:33.80 bottom-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:34.50 upper-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:34.80 upper-mid-right, lower-mid-left, lower-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | z-fighting / shimmer | 0:00.00-0:07.00 around top-right (3 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 44.93 s, audio=1 |  |
| INFO | loudness | I=-15.9 LUFS, true peak=-1.4 dBTP, LRA=2.0 LU |  |
| INFO | levels | speech/peak windows -11.9 dBFS, floor -33.2 dBFS |  |
| INFO | cine | still-camera share 24%, 1 shots, median shot 45.0 s |  |
| INFO | contact sheets | 2 sheets in prime/production/acts/act0/act0_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
