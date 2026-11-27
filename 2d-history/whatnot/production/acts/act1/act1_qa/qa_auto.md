# qa_auto report: act1.mp4 (act)

Result: **FAIL** - 1 fail, 1 warn, 5 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| FAIL | z-fighting / shimmer | 0:15.00-0:28.00 around middle-left (9 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| WARN | cine: cut rhythm | 0:00.0 100% of shots are longer than 8 s (median 35.7 s) | checklist B11 rows 67-75 |
| CHECK | possible pop-in | ~0:27.80 top-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:52.20 top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~1:05.20 lower-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~1:07.00 top-mid-left, top-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | z-fighting / shimmer | 0:40.00-0:47.00 around middle-right (5 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 71.33 s, audio=1 |  |
| INFO | loudness | I=-16.0 LUFS, true peak=-1.4 dBTP, LRA=2.9 LU |  |
| INFO | levels | speech/peak windows -12.0 dBFS, floor -29.4 dBFS |  |
| INFO | cine | still-camera share 5%, 2 shots, median shot 35.67 s |  |
| INFO | contact sheets | 3 sheets in act1_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
