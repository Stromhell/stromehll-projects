# act0 round 1
Baseline act0.mp4 was stale (pre-v3 motorway cut, 51.9 s); lead notes and qa_auto shimmer (top-left 0-33 s, rain/wipers) came from it. Re-rendered from v3 body.js.
| t | issue | sev | cause | fix |
|---|---|---|---|---|
| 0-11.7 | wide hold, small car | high | car s .62, static cam | car s .95, cam z 1.5->1.68 pans with car (x 800->1380), car path eased to match |
| all | text cards tiny (px 26-40) | high | small px | tags px 48-60, verdict tag s .34->.6; Key Largo cards moved below meter |
| 37.7-54 | cover dome bigger than car; left figures tiny | high | cover unscaled, figs s 1.0 | cover scaled .92x.78, figs s 1.4, car x 2010 |
| 0-33 | shimmer top-left | med | old motorway render (rain/wipers) | n/a in v3; re-check qa_auto |
