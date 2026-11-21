# qa_auto report: act2.mp4 (act)

Result: **PASS (machine checks)** - 0 fail, 1 warn, 5 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| WARN | cine: cut rhythm | 0:00.0 100% of shots are longer than 8 s (median 38.7 s) | checklist B11 rows 67-75 |
| CHECK | possible pop-in | ~0:18.20 top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:34.20 top-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:35.80 upper-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:35.80 top-left, top-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | z-fighting / shimmer | 0:19.00-0:24.00 around middle-right (2 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 38.63 s, audio=1 |  |
| INFO | loudness | I=-16.0 LUFS, true peak=-1.5 dBTP, LRA=1.8 LU |  |
| INFO | levels | speech/peak windows -12.2 dBFS, floor -30.5 dBFS |  |
| INFO | cine | still-camera share 14%, 1 shots, median shot 38.67 s |  |
| INFO | contact sheets | 2 sheets in prime/production/acts/act2/act2_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
