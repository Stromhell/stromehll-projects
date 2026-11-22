# qa_auto report: act2.mp4 (act)

Result: **FAIL** - 2 fail, 2 warn, 11 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| FAIL | z-fighting / shimmer | 0:07.00-0:20.00 around bottom-centre (8 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| FAIL | z-fighting / shimmer | 0:29.00-0:39.00 around bottom-centre (9 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| WARN | loudness | -16.7 LUFS (target -14) | two-pass loudnorm I=-14:TP=-1.5 |
| WARN | cine: cut rhythm | 0:00.0 67% of shots are longer than 8 s (median 9.6 s) | checklist B11 rows 67-75 |
| CHECK | local glitch/flicker | ~0:13.50 upper-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:13.80 upper-mid-right, upper-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:20.20 top-mid-left, top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:29.00 bottom-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:42.80 top-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:45.20 top-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:49.00 upper-mid-right, upper-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:57.80 upper-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~1:03.00 top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~1:06.80 upper-mid-right, upper-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | z-fighting / shimmer | 0:56.00-1:01.00 around middle-centre (1 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 69.90 s, audio=1 |  |
| INFO | loudness | I=-16.7 LUFS, true peak=-1.5 dBTP, LRA=3.5 LU |  |
| INFO | levels | speech/peak windows -12.3 dBFS, floor -29.4 dBFS |  |
| INFO | cine | still-camera share 4%, 6 shots, median shot 9.58 s |  |
| INFO | contact sheets | 3 sheets in act2_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
