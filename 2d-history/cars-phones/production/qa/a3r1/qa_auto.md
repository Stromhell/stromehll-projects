# qa_auto report: act3.mp4 (act)

Result: **PASS (machine checks)** - 0 fail, 2 warn, 10 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| WARN | loudness | -16.1 LUFS (target -14) | two-pass loudnorm I=-14:TP=-1.5 |
| WARN | cine: cut rhythm | 0:00.0 75% of shots are longer than 8 s (median 11.8 s) | checklist B11 rows 67-75 |
| CHECK | flash/flicker spike | ~0:45.25 (one-frame change then back) | look for texture/ground flicker, shadow-update throttle, variety flip, pop-in; keep cuts on purpose |
| CHECK | local glitch/flicker | ~0:01.50 lower-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:05.20 upper-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:06.50 upper-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:26.00 lower-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:33.00 lower-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:33.20 lower-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:40.50 upper-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:45.20 upper-left, upper-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:53.00 top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 69.20 s, audio=1 |  |
| INFO | loudness | I=-16.1 LUFS, true peak=-1.4 dBTP, LRA=4.0 LU |  |
| INFO | levels | speech/peak windows -12.2 dBFS, floor -30.6 dBFS |  |
| INFO | cine | still-camera share 11%, 4 shots, median shot 11.83 s |  |
| INFO | contact sheets | 3 sheets in cars-phones/production/qa/a3r1/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
