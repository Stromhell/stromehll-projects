# qa_auto report: act3.mp4 (act)

Result: **PASS (machine checks)** - 0 fail, 2 warn, 12 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| WARN | loudness | -16.1 LUFS (target -14) | two-pass loudnorm I=-14:TP=-1.5 |
| WARN | cine: cut rhythm | 0:00.0 60% of shots are longer than 8 s (median 11.2 s) | checklist B11 rows 67-75 |
| CHECK | local glitch/flicker | ~0:01.50 lower-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:01.80 top-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:05.20 upper-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:15.20 top-mid-left, top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:24.00 upper-mid-left, lower-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:26.00 lower-mid-right, lower-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:29.50 top-mid-left, top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:33.00 lower-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:33.20 lower-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:40.50 top-left, upper-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:53.00 top-mid-right, upper-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | z-fighting / shimmer | 0:17.00-0:22.00 around top-right (2 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 69.20 s, audio=1 |  |
| INFO | loudness | I=-16.1 LUFS, true peak=-1.4 dBTP, LRA=4.0 LU |  |
| INFO | levels | speech/peak windows -12.2 dBFS, floor -30.6 dBFS |  |
| INFO | cine | still-camera share 6%, 5 shots, median shot 11.17 s |  |
| INFO | contact sheets | 3 sheets in cars-phones/production/qa/a3r2/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
