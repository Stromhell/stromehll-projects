# qa_auto report: act4.mp4 (act)

Result: **FAIL** - 1 fail, 1 warn, 10 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| FAIL | cine: slideshow (camera frozen) | 0:56.3 camera does not move for 6.8 s: add a push-in, truck, arc or cut to new coverage | checklist B11 rows 67-75 |
| WARN | cine: cut rhythm | 0:00.0 57% of shots are longer than 8 s (median 8.8 s) | checklist B11 rows 67-75 |
| CHECK | flash/flicker spike | ~0:14.75 (one-frame change then back) | look for texture/ground flicker, shadow-update throttle, variety flip, pop-in; keep cuts on purpose |
| CHECK | flash/flicker spike | ~0:42.75 (one-frame change then back) | look for texture/ground flicker, shadow-update throttle, variety flip, pop-in; keep cuts on purpose |
| CHECK | possible pop-in | ~0:02.20 upper-mid-left, upper-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:16.00 lower-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:18.50 upper-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:20.50 upper-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:22.80 upper-mid-right, lower-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:34.80 upper-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:35.00 upper-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:40.00 lower-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 64.90 s, audio=1 |  |
| INFO | loudness | I=-15.9 LUFS, true peak=-1.3 dBTP, LRA=3.4 LU |  |
| INFO | levels | speech/peak windows -11.7 dBFS, floor -31.1 dBFS |  |
| INFO | cine | still-camera share 35%, 7 shots, median shot 8.83 s |  |
| INFO | contact sheets | 3 sheets in cars-phones/production/qa/a4r2/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
