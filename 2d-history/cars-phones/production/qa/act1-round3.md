# act1 round 3
Round-2 re-render still flagged shimmer 29-53 middle-centre. Frame diff (45 s) shows it is the thin, high-contrast moving rain streaks (and wiper edge) inside the windscreen.
Fix: rain streak alpha .32->.14, width 4, speed 650->380 px/s.
Result after re-render: still FAIL shimmer 29-53 middle-centre (67 cells), so it is NOT the rain. Remaining suspects: motorway plate fine texture resampled under slow sub-pixel cam pan (cam x 1300->1080 / zoom 1.15->1.25 on shots 4-5), or tail-light spray. Not visible as a defect on the 1 fps sheet. 3 rounds used: left OPEN (med) for the lead; try a static cam or integer-pixel cam on shots 4-5 next.
Other: WARN cam frozen 3 s at 11.8 (card shot, animated content), cut rhythm (shots = VO paragraphs).
