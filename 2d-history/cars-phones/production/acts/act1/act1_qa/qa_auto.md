# qa_auto report: act1.mp4 (act)

Result: **PASS (machine checks)** - 0 fail, 2 warn, 6 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| WARN | cine: slideshow (camera frozen) | 0:11.8 camera still for 3.0 s | checklist B11 rows 67-75 |
| WARN | cine: cut rhythm | 0:00.0 67% of shots are longer than 8 s (median 18.5 s) | checklist B11 rows 67-75 |
| CHECK | local glitch/flicker | ~0:00.50 upper-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:01.00 upper-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:06.50 bottom-mid-left, bottom-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~0:17.20 lower-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~0:51.20 top-mid-right, top-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~0:53.20 upper-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| INFO | streams | 1920x1080 h264 yuv420p r=30.000 avg=30.000 fps, 55.57 s, audio=1 |  |
| INFO | loudness | I=-15.8 LUFS, true peak=-1.5 dBTP, LRA=3.7 LU |  |
| INFO | levels | speech/peak windows -11.5 dBFS, floor -27.7 dBFS |  |
| INFO | cine | still-camera share 15%, 3 shots, median shot 18.5 s |  |
| INFO | contact sheets | 2 sheets in cars-phones/production/acts/act1/act1_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |
