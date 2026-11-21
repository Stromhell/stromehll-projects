# qa_auto report: act1.mp4 (act)

Result: **PASS (machine checks)** - 0 fail, 1 warn, 7 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| WARN | cine: cut rhythm | 0:00.0 50% of shots are longer than 8 s (median 4.7 s) | checklist B11 rows 67-75 |
| CHECK | possible pop-in | ~0:19.20 top-mid-left, top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:22.20 top-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:25.50 bottom-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:46.00 bottom-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:51.20 top-mid-right, top-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:57.00 upper-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~1:00.80 upper-mid-left, lower-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 62.37 s, audio=1 |  |
| INFO | loudness | I=-16.0 LUFS, true peak=-1.5 dBTP, LRA=2.1 LU |  |
| INFO | levels | speech/peak windows -12.2 dBFS, floor -32.1 dBFS |  |
| INFO | cine | still-camera share 18%, 6 shots, median shot 4.75 s |  |
| INFO | contact sheets | 3 sheets in prime/production/acts/act1/act1_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
