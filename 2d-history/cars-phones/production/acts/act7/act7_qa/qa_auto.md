# qa_auto report: act7.mp4 (act)

Result: **PASS (machine checks)** - 0 fail, 4 warn, 18 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| WARN | loudness | -16.5 LUFS (target -14) | two-pass loudnorm I=-14:TP=-1.5 |
| WARN | cine: slideshow (camera frozen) | 0:50.2 camera still for 3.2 s | checklist B11 rows 67-75 |
| WARN | cine: slideshow (camera frozen) | 1:20.2 camera still for 3.2 s | checklist B11 rows 67-75 |
| WARN | cine: cut rhythm | 0:00.0 50% of shots are longer than 8 s (median 20.8 s) | checklist B11 rows 67-75 |
| CHECK | possible pop-in | ~0:01.00 top-mid-left, top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:09.20 upper-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:22.80 upper-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:25.80 top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:29.20 top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:32.20 lower-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:37.80 upper-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:38.50 top-mid-left, top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:44.80 lower-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:54.20 top-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:58.80 top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~1:06.00 bottom-mid-left, bottom-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~1:07.20 bottom-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~1:10.50 top-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~1:10.50 top-mid-left, upper-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~1:11.00 top-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~1:13.50 upper-mid-right, upper-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~1:16.00 lower-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 85.33 s, audio=1 |  |
| INFO | loudness | I=-16.5 LUFS, true peak=-1.4 dBTP, LRA=3.7 LU |  |
| INFO | levels | speech/peak windows -11.8 dBFS, floor -28.0 dBFS |  |
| INFO | cine | still-camera share 16%, 4 shots, median shot 20.83 s |  |
| INFO | contact sheets | 3 sheets in act7_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
