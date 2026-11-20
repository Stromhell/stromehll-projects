# qa_auto report: MC_StyleTest_v1.mp4 (act)

Result: **FAIL** - 4 fail, 0 warn, 2 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| FAIL | cine: cut leak (old scene still on screen) | 0:02.5 25% of the frame unchanged across the cut while 50% changed | checklist B11 rows 67-75 |
| FAIL | cine: cut leak (old scene still on screen) | 0:03.0 25% of the frame unchanged across the cut while 72% changed | checklist B11 rows 67-75 |
| FAIL | cine: cut leak (old scene still on screen) | 0:10.0 25% of the frame unchanged across the cut while 69% changed | checklist B11 rows 67-75 |
| FAIL | cine: cut leak (old scene still on screen) | 0:15.3 25% of the frame unchanged across the cut while 75% changed | checklist B11 rows 67-75 |
| CHECK | possible pop-in | ~0:20.50 lower-mid-left, lower-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | z-fighting / shimmer | 0:10.00-0:14.00 around middle-centre (1 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 24.50 s, audio=1 |  |
| INFO | loudness | I=-15.4 LUFS, true peak=-2.0 dBTP, LRA=1.7 LU |  |
| INFO | levels | speech/peak windows -11.3 dBFS, floor -26.2 dBFS |  |
| INFO | cine | still-camera share 19%, 12 shots, median shot 2.08 s |  |
| INFO | contact sheets | 1 sheets in /mnt/project-files/manga-comics-channel/Videos/00 Style Test/Renders/MC_StyleTest_v1_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
