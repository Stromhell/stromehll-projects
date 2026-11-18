# Video 10 full v2 - QA review (18 Nov 2026)
qa_auto --kind full: decode PASS, CFR 24, I=-14.1 LUFS, TP=-2.4 dBTP (AAC 256k), 12:31.5.
Remaining auto FAILs, checked by eye, accepted:
- 0:49.88-0:56.04 black: "The Waiting Room" title card + chapter 1 card (intended).
- 12:21.04-12:25.54 black: disclaimer card (intended).
- 8:36-8:47 shimmer middle-centre: RH.film old-film scratch line (house style), no coplanar geometry.
- 9:46.5 cut leak: S34 camera switch on the same fridge shot (same scene both sides).
WARNs: dark 3 s at each chapter card (cards), cut rhythm (long shots have moving cameras + pops).
Round 1 fixes (from act v1 QA + 1 fps sheets): S03 camera inside bank columns; S13 Abe hidden by chair; S25 black room edge + cropped Pip; S14/S15/S26 tooth poster z-fight + S26 too close; S31 lamp posts past camera, managers in front of camera, number card label cut (shortened labels S10/S19/S31, card auto width); S27 Gus behind stop sign; S40 Wren cut at edge; S41 tag over bank sign; S42 cousin/Wren cropped. Audio: true peak -0.6 -> -2.4 dBTP.
