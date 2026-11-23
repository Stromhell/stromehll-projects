# qa_auto report: act1.mp4 (act)

Result: **PASS (machine checks)** - 0 fail, 2 warn, 5 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| WARN | loudness | -16.2 LUFS (target -14) | two-pass loudnorm I=-14:TP=-1.5 |
| WARN | cine: cut rhythm | 0:00.0 100% of shots are longer than 8 s (median 66.5 s) | checklist B11 rows 67-75 |
| CHECK | possible pop-in | ~0:00.50 bottom-mid-left, bottom-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:00.80 top-mid-left, top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:09.50 bottom-mid-left, bottom-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:19.00 bottom-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | z-fighting / shimmer | 0:53.00-0:58.00 around bottom-centre (1 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 66.43 s, audio=1 |  |
| INFO | loudness | I=-16.2 LUFS, true peak=-1.5 dBTP, LRA=4.0 LU |  |
| INFO | levels | speech/peak windows -12.1 dBFS, floor -30.4 dBFS |  |
| INFO | cine | still-camera share 7%, 1 shots, median shot 66.5 s |  |
| INFO | contact sheets | 3 sheets in gulf-monarchies/production/acts/act1/act1_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
