# act0 round 2 (render 1 of fixed body)
Note: remix_cp.py reuses an existing actN_dry.mp4, so a fresh render must be moved to actN_dry.mp4 before remixing (round 1's first render was overwritten by the stale cut this way).
qa_auto: PASS (0 fail); only WARN cut rhythm (shots = VO paragraphs, accepted). Shimmer gone.
| t | issue | sev | fix |
|---|---|---|---|
| 22-37 | courtroom near-static 15 s, small action | med | cam push z 1.0->1.22 towards pie/cards |
Re-render after courtroom push: qa_auto PASS (0 fail, WARN cut rhythm only). Sheets reviewed: no float/overlap, cards readable. CLEAN.
