# qa_auto report: CreditCards_full_1080p.mp4 (full)

Result: **FAIL** - 2 fail, 11 warn, 37 to eyeball

| level | check | detail | standard fix |
|---|---|---|---|
| FAIL | z-fighting / shimmer | 4:40.00-4:57.00 around top-centre (5 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| FAIL | z-fighting / shimmer | 7:33.00-7:41.00 around middle-centre (4 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| WARN | dark scene | 0:07.75-0:10.75 mean luma 23/255 | lift exposure/key light or add rim light + practical glow; subject must read on a phone |
| WARN | dark scene | 0:17.25-0:21.50 mean luma 20/255 | lift exposure/key light or add rim light + practical glow; subject must read on a phone |
| WARN | dark scene | 0:45.00-0:48.25 mean luma 9/255 | lift exposure/key light or add rim light + practical glow; subject must read on a phone |
| WARN | dark scene | 3:24.50-3:27.50 mean luma 9/255 | lift exposure/key light or add rim light + practical glow; subject must read on a phone |
| WARN | dark scene | 6:33.75-6:37.00 mean luma 9/255 | lift exposure/key light or add rim light + practical glow; subject must read on a phone |
| WARN | dark scene | 10:22.00-10:25.75 mean luma 12/255 | lift exposure/key light or add rim light + practical glow; subject must read on a phone |
| WARN | dark scene | 12:25.00-12:26.50 mean luma 24/255 | lift exposure/key light or add rim light + practical glow; subject must read on a phone |
| WARN | dark scene | 14:49.75-14:53.00 mean luma 8/255 | lift exposure/key light or add rim light + practical glow; subject must read on a phone |
| WARN | dark scene | 17:39.50-17:42.50 mean luma 9/255 | lift exposure/key light or add rim light + practical glow; subject must read on a phone |
| WARN | dark scene | 19:08.75-19:14.50 mean luma 22/255 | lift exposure/key light or add rim light + practical glow; subject must read on a phone |
| WARN | dark scene | 19:20.25-19:26.00 mean luma 6/255 | lift exposure/key light or add rim light + practical glow; subject must read on a phone |
| CHECK | black / near-black | 0:45.08-0:48.25 (3.2s) | OK if it is a chapter/title card or fade; otherwise a missing shot/plate or bad cut |
| CHECK | black / near-black | 3:24.38-3:27.58 (3.2s) | OK if it is a chapter/title card or fade; otherwise a missing shot/plate or bad cut |
| CHECK | black / near-black | 6:33.71-6:36.88 (3.2s) | OK if it is a chapter/title card or fade; otherwise a missing shot/plate or bad cut |
| CHECK | black / near-black | 10:21.88-10:25.08 (3.2s) | OK if it is a chapter/title card or fade; otherwise a missing shot/plate or bad cut |
| CHECK | black / near-black | 14:49.75-14:52.92 (3.2s) | OK if it is a chapter/title card or fade; otherwise a missing shot/plate or bad cut |
| CHECK | black / near-black | 17:39.42-17:42.58 (3.2s) | OK if it is a chapter/title card or fade; otherwise a missing shot/plate or bad cut |
| CHECK | possible pop-in | ~0:17.20 upper-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~0:22.50 top-mid-left, top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~1:10.00 bottom-mid-left, bottom-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~1:54.80 lower-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~2:18.80 top-mid-left, top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~2:27.50 upper-left, lower-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~2:30.00 upper-left, lower-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~3:16.00 upper-left, lower-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~3:48.20 upper-right, lower-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~3:54.80 upper-right, lower-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~4:50.00 lower-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | local glitch/flicker | ~4:56.80 lower-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~5:08.20 bottom-mid-left, bottom-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~5:39.00 upper-right, lower-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~5:45.50 upper-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~6:37.80 top-mid-left, top-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~6:39.20 lower-mid-left | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~6:44.50 bottom-mid-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~6:48.00 upper-right, lower-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~7:01.00 bottom-mid-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~7:22.00 upper-right, lower-mid-right, lower-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~7:28.50 upper-right, lower-mid-right, lower-right | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | local glitch/flicker | ~7:39.80 upper-mid-right | background/door/window flicker: stable layer order, no per-frame random, no texture swap; fix the asset at that spot |
| CHECK | possible pop-in | ~8:24.80 upper-left, lower-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | possible pop-in | ~8:31.20 upper-left, lower-left | something appeared/vanished in one step: characters walk in/out, props slide/fade in (>=0.3 s), never pop (text cards popping on purpose are OK) |
| CHECK | more local changes | 33 more spots, e.g. 8:42.50, 8:44.00, 8:51.00, 9:04.00, 9:10.50, 9:15.80, 10:50.00, 11:09.20 | step through those seconds at 8 fps |
| CHECK | z-fighting / shimmer | 0:07.00-0:14.00 around top-centre (5 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| CHECK | z-fighting / shimmer | 8:18.00-8:24.00 around middle-centre (16 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| CHECK | z-fighting / shimmer | 10:25.00-10:30.00 around bottom-right (1 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| CHECK | z-fighting / shimmer | 13:25.00-13:30.00 around top-right (2 cells) | 3D: coplanar surfaces (board on frame, window on wall, door on desk plane) -> offset 1-2 cm or polygonOffset, raise near plane; 2D: per-frame random/texture swap -> fixed seed |
| CHECK | end screen | CreditCards_full_1080p_qa/zoom/last5s.jpg: last 5 s clean (no text/subtitles/characters in the YouTube end-screen element zones) |  |
| PASS | decode check | decodes with 0 errors |  |
| INFO | streams | 1920x1080 h264 yuv420p r=24.000 avg=24.000 fps, 1165.97 s, audio=1 |  |
| INFO | loudness | I=-14.0 LUFS, true peak=-1.4 dBTP, LRA=2.0 LU |  |
| INFO | levels | speech/peak windows -14.5 dBFS, floor -33.1 dBFS |  |
| INFO | contact sheets | 39 sheets in CreditCards_full_1080p_qa/sheets - READ EVERY ONE against RENDER-QA-CHECKLIST.md |  |

