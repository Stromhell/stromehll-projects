# qa_auto report: act0.mp4 (act)

Result: **PASS (machine checks)** - 0 fail, 1 warn, 5 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| WARN | loudness | -16.1 LUFS (target -14) | two-pass loudnorm I=-14:TP=-1.5 |
| CHECK | possible pop-in | ~0:01.00 top-mid-left, top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:10.80 upper-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:39.50 bottom-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:39.80 lower-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:41.20 lower-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 45.73 s, audio=1 |  |
| INFO | loudness | I=-16.1 LUFS, true peak=-1.5 dBTP, LRA=2.6 LU |  |
| INFO | levels | speech/peak windows -11.9 dBFS, floor -30.8 dBFS |  |
| INFO | cine | still-camera share 5%, 7 shots, median shot 0.17 s |  |
| INFO | contact sheets | 2 sheets in gulf-monarchies/production/acts/act0/act0_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
