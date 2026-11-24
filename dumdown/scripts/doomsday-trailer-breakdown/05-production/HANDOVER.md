# DumDown 13: Avengers: Doomsday Final Trailer Breakdown - handover (24 Nov 2026)

**Booked:** Wed 25 Nov 2026 16:00 UTC (9:30 PM IST), YouTube DumbDown, Zernio post `6b053dfcdb81365b3387ceba`, public, category 24, not for kids.
**Title:** Avengers: Doomsday Final Trailer Breakdown: Every Reference You Missed. **Thumbnail:** A, Old Cap with the hammer (B/C kept in 06-launch for a swap test).
**Final file:** DumDown_DoomsdayTrailer_FULL_v3.mp4 (13:31, clean end screen). Drive AI/DumDown/Doomsday Trailer Breakdown/04 Renders (id 1WRLqRHBlMVFFqr_u6qjn9ExoytbIfZO5). Launch kit https://claude.ai/artifact/RKrkAWShzQR5TGKQxeKDpy, metadata 06-launch/metadata_v3.md.
**Other DumDown bookings moved +48 h (Pushpam 23 Nov rule):** Deadpool & Wolverine 27 Nov, Spider-Man BND 29 Nov, Thunderbolts* 1 Dec, Doctor Doom 3 Dec, The Marvels 5 Dec, Secret Invasion 7 Dec, Avengers Mistakes 9 Dec (all 16:00 UTC). Next free DumDown slot: 11 Dec (Wakanda Forever).

## Reuse next time
- Engine sources: repo branch claude/project-thread-niwyq8, dumdown/scripts/doomsday-trailer-breakdown/04-animation/.
- Names: narrator = Kokoro am_fenrir with an IPA dictionary for every name (vo_kk_dd.py + gags/names_ipa_dd.py), verified by whisper (namecheck_dd.py). Chatterbox respellings mangled names (Pushpam 24 Nov). Gag voices = plain Chatterbox clones, no respellings.
- Scale/floors: per-set horizon + floor in dd_floor.js (440 px character at s=1); plates cropped 220 px from the top so the floor shows above the letterbox bar. Wrong horizon values were the real cause of "flying / wrong scale".
- Walks: speed scales with body size, walker settles to idle on arrival (shots.js).
- Long holds: shots.js splits any narration shot over 7 s into 2-3 angles; act tail 0.6 s.
- qa_auto flags lightning, comic wipes and the water/shield wipe as shimmer/cut leak: false positives.
