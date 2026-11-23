# DumDown 12: Every Avengers Mistake That Built Doomsday - handover (23 Nov 2026)

**Booked:** Mon 7 Dec 2026 16:00 UTC (9:30 PM IST), YouTube DumbDown, Zernio post `6b04010e43e8ea9481eb6541`, public, category 24, not for kids.
**Title:** Every Avengers Mistake That Built Doomsday (Funny Countdown) · **Thumbnail:** A "THANK YOU, AVENGERS" (B/C kept in launch/ for a swap test).
**Final file:** DumDown_AvengersMistakes_FULL_v3.mp4 (12:05, clean 7 s end screen). Drive AI/DumDown/Avengers Mistakes Doomsday/Renders (id 1AB5WLwkXAsMNJopWhqZyzWCXvK_hr_p7). Launch kit https://claude.ai/artifact/BrAAsVbQAJLL4uNUDqs5Vf. Metadata launch/metadata_v3.md.
**Next free DumDown slot:** 9 Dec 16:00 UTC (Wakanda Forever proposed).

## Reuse next time
- Engine: repo branch claude/project-thread-vf4g6w, dumdown/scripts/avengers-mistakes-doomsday/animation/ (engine.js, shots.js, amprops.js, am_help.js, acts/, mix_am.py, vo_regen_am.py).
- Gags live inside act shot lists (Pushpam 22 Nov); ~1 gag per 45-60 s.
- Pushpam's v2 review (22 Nov 20:43 UTC) and what fixed it, apply from the start:
  - Bodies cut by letterbox bars: shots.js FLOOR_DY lift (feet y 1320 -> 1210, visible bottom at z1 is ~1256); auto-frame two-shots on the taller character; head-fit also on framed shots; camera follows characters who move vertically.
  - Hovering: contact-shadow ellipse under every standing character.
  - Pop boxes jumping: render workers cached placement per worker; engine.js pre-places pops deterministically.
  - Rough gag cuts: comic wipe (yellow parallelogram) + whoosh/swipe SFX at every narration<->gag boundary (shots.js _gx, mix_am.py).
  - Voice warbles: vo_regen_am.py re-makes flagged paragraphs chunk by chunk until voice_qa is clean (~3 min/chunk on CPU; don't run SD at the same time). Re-run mk_timing.py N + vo_soften_stops.py after.
- QA: qa_lean's Qwen pass timed out on a 12-min full (25 min); qa_auto shimmer = mouths/arms, cut leak = bars/meter (false positives). Eyeball 1 frame/4 s sheets per act.
- Known small leftover: office scene (act09) people stand against office chairs, legs overlap seats.
