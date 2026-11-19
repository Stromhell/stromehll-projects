# Handover: Finance 14 "Every Stock Market Term Explained in 13 Minutes" (Marketland)

- BOOKED: Finance Zernio, YouTube, Wed 9 Dec 2026 16:00 UTC (9:30 PM IST). Post 6aff3f75ddc52195578c715b (zernio_booked.json here). Pushpam OK'd full v1 on 19 Nov 18:24 UTC ("okay").
- Title used exactly as Pushpam gave it. Thumbnail thumb_v2.jpg. Pinned comment set as firstComment.
- Full video v1 (12:02, 1080p 24 fps CFR, -14.0 LUFS / -1.2 dBTP, clean last 5 s): https://drive.google.com/file/d/1agkILhefdpJVHhP7rvZ9gX7ngIQXF_DV/view (Drive 03 Renders). Launch kit https://claude.ai/artifact/8S3MXHEaknLiJ8AatufmaM.
- Story: Milo (bike courier, $500) can't parse Benny's jargon; one year in Marketland with pocket dictionary Lexi, one chapter per month, ~75 terms; circular ending. End card: watch next video 10.
- Build: 04 Build Files/build14_v1.tgz and repo 04 Build Files/build (sets14.js, acts14_body*.js, render14.js, snap14.js, combine14.sh). Rebuild acts14.js: cat acts13_head.js helpers13.js acts14_body.js acts14_body2.js. Acts used: act0 v1; 2,3,5,8,9,11 v2; 1,4,6,7,10 v3.
- QA: qa_auto + sheets on every act, 2 fix rounds. Accepted: chapter-card blacks, internal cut-leak flags (same set), exchange crowd shimmer flag, 7 s title+chapter card run near 0:43 with ~1 s quiet, a few characters cut at the frame edge.
- Lessons: ext14() side walls/fills close set edges for wide or panning cameras; never put an extra plane coplanar with an existing wall (z-fighting), push it 5-8 cm behind; keep MG cards' bottom edge above ~y 300 (720p) when characters stand mid-frame; snap14.js stills catch these before a full re-render.
- Next Finance slot: earliest 11 Dec 16:00 UTC (48 h rule).
