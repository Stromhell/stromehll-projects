# qa_auto report: act6.mp4 (act)

Result: **PASS (machine checks)** - 0 fail, 1 warn, 2 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| WARN | cine: cut rhythm | 0:00.0 50% of shots are longer than 8 s (median 5.4 s) | checklist B11 rows 67-75 |
| CHECK | possible pop-in | ~0:18.20 upper-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~1:15.00 upper-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 94.47 s, audio=1 |  |
| INFO | loudness | I=-15.9 LUFS, true peak=-1.5 dBTP, LRA=4.1 LU |  |
| INFO | levels | speech/peak windows -11.7 dBFS, floor -29.4 dBFS |  |
| INFO | cine | still-camera share 6%, 6 shots, median shot 5.42 s |  |
| INFO | contact sheets | 4 sheets in act6_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
