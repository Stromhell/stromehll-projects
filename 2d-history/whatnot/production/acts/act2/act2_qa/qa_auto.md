# qa_auto report: act2.mp4 (act)

Result: **PASS (machine checks)** - 0 fail, 2 warn, 3 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| WARN | loudness | -16.2 LUFS (target -14) | two-pass loudnorm I=-14:TP=-1.5 |
| WARN | cine: cut rhythm | 0:00.0 100% of shots are longer than 8 s (median 55.5 s) | checklist B11 rows 67-75 |
| CHECK | local glitch/flicker | ~0:30.00 lower-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:52.00 top-mid-right, upper-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | z-fighting / shimmer | 0:14.00-0:20.00 around middle-centre (1 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 55.53 s, audio=1 |  |
| INFO | loudness | I=-16.2 LUFS, true peak=-1.3 dBTP, LRA=3.1 LU |  |
| INFO | levels | speech/peak windows -12.1 dBFS, floor -30.3 dBFS |  |
| INFO | cine | still-camera share 1%, 1 shots, median shot 55.5 s |  |
| INFO | contact sheets | 2 sheets in act2_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
