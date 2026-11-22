# qa_auto report: act5.mp4 (act)

Result: **PASS (machine checks)** - 0 fail, 2 warn, 8 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| WARN | loudness | -16.3 LUFS (target -14) | two-pass loudnorm I=-14:TP=-1.5 |
| WARN | cine: cut rhythm | 0:00.0 67% of shots are longer than 8 s (median 10.8 s) | checklist B11 rows 67-75 |
| CHECK | possible pop-in | ~0:00.50 bottom-mid-left, bottom-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:08.80 upper-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:12.80 lower-mid-right, lower-right, bottom-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:34.20 lower-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:40.80 upper-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:43.50 lower-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:47.00 top-mid-left, top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:50.80 lower-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 58.37 s, audio=1 |  |
| INFO | loudness | I=-16.3 LUFS, true peak=-1.4 dBTP, LRA=3.4 LU |  |
| INFO | levels | speech/peak windows -12.1 dBFS, floor -30.8 dBFS |  |
| INFO | cine | still-camera share 11%, 3 shots, median shot 10.83 s |  |
| INFO | contact sheets | 2 sheets in cars-phones/production/acts/act5/act5_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
