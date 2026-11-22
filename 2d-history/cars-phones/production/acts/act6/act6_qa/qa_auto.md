# qa_auto report: act6.mp4 (act)

Result: **PASS (machine checks)** - 0 fail, 2 warn, 9 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| WARN | loudness | -16.2 LUFS (target -14) | two-pass loudnorm I=-14:TP=-1.5 |
| WARN | cine: cut rhythm | 0:00.0 33% of shots are longer than 8 s (median 6.8 s) | checklist B11 rows 67-75 |
| CHECK | possible pop-in | ~0:10.00 top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:16.50 upper-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:25.80 upper-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:28.20 upper-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:28.50 top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:51.00 lower-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:51.20 bottom-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:58.00 top-mid-left, top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:59.80 top-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 63.97 s, audio=1 |  |
| INFO | loudness | I=-16.2 LUFS, true peak=-1.5 dBTP, LRA=4.4 LU |  |
| INFO | levels | speech/peak windows -12.0 dBFS, floor -31.5 dBFS |  |
| INFO | cine | still-camera share 1%, 3 shots, median shot 6.83 s |  |
| INFO | contact sheets | 3 sheets in cars-phones/production/acts/act6/act6_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
