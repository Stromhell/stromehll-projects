# qa_auto report: act0.mp4 (act)

Result: **PASS (machine checks)** - 0 fail, 1 warn, 7 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| WARN | cine: cut rhythm | 0:00.0 43% of shots are longer than 8 s (median 0.2 s) | checklist B11 rows 67-75 |
| CHECK | flash/flicker spike | ~0:28.75 (one-frame change then back) | look for texture/ground flicker, shadow-update throttle, variety flip, pop-in; keep cuts on purpose |
| CHECK | local glitch/flicker | ~0:00.50 upper-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:07.00 upper-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:09.50 upper-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:10.20 upper-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:10.80 upper-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:14.80 top-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 42.40 s, audio=1 |  |
| INFO | loudness | I=-16.0 LUFS, true peak=-1.5 dBTP, LRA=3.8 LU |  |
| INFO | levels | speech/peak windows -11.9 dBFS, floor -30.0 dBFS |  |
| INFO | cine | still-camera share 12%, 7 shots, median shot 0.17 s |  |
| INFO | contact sheets | 2 sheets in act0_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
