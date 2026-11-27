# qa_auto report: act3.mp4 (act)

Result: **PASS (machine checks)** - 0 fail, 2 warn, 11 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| WARN | cine: slideshow (camera frozen) | 0:34.8 camera still for 3.5 s | checklist B11 rows 67-75 |
| WARN | cine: cut rhythm | 0:00.0 50% of shots are longer than 8 s (median 5.3 s) | checklist B11 rows 67-75 |
| CHECK | flash/flicker spike | ~0:34.25 (one-frame change then back) | look for texture/ground flicker, shadow-update throttle, variety flip, pop-in; keep cuts on purpose |
| CHECK | flash/flicker spike | ~1:05.25 (one-frame change then back) | look for texture/ground flicker, shadow-update throttle, variety flip, pop-in; keep cuts on purpose |
| CHECK | possible pop-in | ~0:18.50 upper-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:30.50 top-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:38.00 lower-mid-left, lower-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:41.00 bottom-mid-left, bottom-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:42.80 lower-mid-right, lower-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~1:07.00 bottom-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~1:07.80 bottom-mid-left, bottom-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~1:11.50 bottom-mid-left, bottom-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~1:17.00 bottom-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 77.83 s, audio=1 |  |
| INFO | loudness | I=-15.9 LUFS, true peak=-1.4 dBTP, LRA=3.1 LU |  |
| INFO | levels | speech/peak windows -11.9 dBFS, floor -32.6 dBFS |  |
| INFO | cine | still-camera share 20%, 10 shots, median shot 5.33 s |  |
| INFO | contact sheets | 3 sheets in act3_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
