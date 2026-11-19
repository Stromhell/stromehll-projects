# Handover: Finance 13 "The Psychology of Personal Finance | Build a System That Works for You" (Head Office)

- BOOKED: Finance Zernio, YouTube, Mon 7 Dec 2026 16:00 UTC (9:30 PM IST). Post 6afe9ee03ab7d8be3e9f6d48 (zernio_booked.json here). Pushpam OK'd full v3 on 19 Nov 06:58 UTC ("okay for all post it").
- Title used exactly as Pushpam gave it. Thumbnail thumb_v2.jpg. Pinned comment set as firstComment.
- Full video v3 (16:36, 1080p 24 fps CFR, -14.0 LUFS / -1.0 dBTP, clean last 5 s): https://drive.google.com/file/d/1yiVF8IYB-GdwiRgemzBIbMR5CVjXgz6j/view (Drive 03 Renders). Launch kit https://claude.ai/artifact/G4uzuaKYQfUbVVGYU5d2r8.
- Story: Hattie (streetcar driver) blows a $1,200 bonus; inside her head a 1930s Head Office with 5 departments (Pigeonholes, Switchboard, Ghost of What-Else, High Wire, House Rules + Sunday Meeting). End card: watch next video 10.
- Build: 04 Build Files/e13_build_v2.tgz (build/ + audio13/). Engine shared with videos 10/11 (do not edit engine.js). life13.js = camera life layer (breathing zoom + truck + bob on every shot, opt out with noLife). Kokoro voices.
- QA: qa_auto full v2/v3 passed (only WARN: 52% of shots > 8 s, eased by camera drift). Accepted: chapter-card blacks, end-card shimmer flag, P30 Ace's head near top edge while climbing, P33 net label partly behind poles.
- Lessons: roomShell ceiling (h 4.5) hides characters on high sets, hide the ceiling mesh and add PointLights; 2-bar MG card is only 300 px wide, keep its title <= ~21 chars and bar labels short; to fix one shot, render just its frame range with `node render13.js ACT out f0 f1` and splice with ffmpeg trim (took 7 min vs 100 min per act).
- Next Finance slot: earliest 9 Dec 16:00 UTC (48 h rule).
