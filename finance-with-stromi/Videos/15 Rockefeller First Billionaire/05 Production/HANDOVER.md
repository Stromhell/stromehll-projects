# Handover: Finance 15 "Rockefeller: The First Confirmed Billionaire (And How He Did It)" (Ledger A)

- BOOKED: Finance Zernio, YouTube, Fri 11 Dec 2026 16:00 UTC (9:30 PM IST). Post 6b01355804d30632d6d7faad (zernio_booked.json here). Pushpam OK'd full v6 on 21 Nov 06:04 UTC ("Okay").
- Title used exactly as Pushpam gave it. Thumbnail thumb_v1.jpg (ElevenLabs art + code text). Pinned comment set as firstComment. Description/tags v1.
- Full video v6 (17:01, 1080p 24 fps CFR, -14.0 LUFS / -1.1 dBTP, clean last 5 s): Drive 04 Renders/15-Rockefeller-full_v6.mp4 (id 1B7i_CsbKybVo2Y0rV7IN93mov24WV--t). Launch kit https://claude.ai/artifact/74sSXbpnbJGqUszPaygXxh. v4/v5 on Drive superseded.
- Story: old John gives Dot a dime on the 1916 porch; 10 chapters around Ledger A; Your Wallet; circular ending. End card: watch next video 14.
- Build: 04 Build Files/build15_v2.tgz and repo 04 Build Files/build. Rebuild acts15.js: cat acts13_head.js helpers13.js acts15_body.js. Acts: act1 render v4, all others v5. Audio mix15_v3.wav (combine15_v2.sh).
- Pushpam's v5 review (7 notes): floating glasses/lamp, character inside table, ledger text cut by spine, mustache off (VIEW out of scope in sets15 -> fx=0), chair clipping, glasses/mustache wrong (fix at character creation), text cards over objects. All fixed.
- New QA (checklist v2.6/v2.7 rows 80-86): system/qa/scenecheck_3d.js (character inside furniture, floating props) must PASS before render; system/qa/tagcheck_3d.js (labels over wall signs/characters); engine planTags auto-moves screen labels off boards with words (board() objects get userData.txt=1). Date chips never move.
- Accepted qa_auto flags: dark ledger-closeup edges flagged as "edge exposed" (0:41-0:51), act3 oil-drop shimmer, chapter-card blacks, same cut-leak set.
- Lessons: set userData.txt on any 3D sign/board so labels avoid it; face add-ons (glasses, mustache) must follow the head's view angle; check props have a surface under them.
- Next Finance slot: earliest 13 Dec 16:00 UTC (48 h rule). Videos 16-24 still on hold.
