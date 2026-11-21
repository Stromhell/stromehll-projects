# DumDown 11: Secret Invasion S1 - handover (21 Nov 2026)

**Booked:** Sat 5 Dec 2026 16:00 UTC (9:30 PM IST), YouTube DumbDown, Zernio post `6b0207a9586380b124e4f6cd`, public, category 24, not for kids.
**Title:** Secret Invasion But It Makes Sense Now (Funny Recap) · **Thumbnail:** A "WHICH ONE IS FAKE?" (B/C kept in launch/ for a later swap test).
**Final file:** DumDown_SecretInvasion_FULL_v4.mp4 (13:05, -14 LUFS, clean 6 s end screen). Drive AI/DumDown/Secret Invasion S1/Renders (id 1oOTfG3PV39j7O9CW4eRMU8nuBKMDFPgb). Launch kit https://claude.ai/artifact/DzVt33euv9pPgGxrnSKf6G.
**Next free DumDown slot:** 7 Dec 16:00 UTC (>=48 h).

## What the next video should reuse
- Engine source: repo branch claude/project-thread-ckcepc, dumdown/scripts/secret-invasion-s1/animation/ (shots.js, actions.js with 39 keyed acting actions, siprops.js, engine.js, acts/, gags/).
- Voice: Chatterbox + Fenrir ref, exag .75, cfg .35 (vo_cb.py); gags via gag_vo_cb.py. Run voice_qa; fix "word stops dead" with vo_soften_stops.py. Never trust long exclamation lines ("Aaaaah!" ran 37 s).
- Pushpam's review fixes (21 Nov, apply from the start next time):
  - Sitting: char flag `seat: 1` (side view) = legL hip 86 knee 80, legR 82/84, bob 70, hands on lap; sit on `chairS` (s ≈ char s × 1.04) and tables with legs (`sideTable`).
  - Held props: grip (fist forced), bags/cases hang from the handle, a threequarter holder renders in side view so the holding hand faces camera.
  - Real-world scale: at char s 1.4 a person is ~600 px tall (1 m ≈ 341 px); sedan s 2.5; size every prop from real cm.
- QA: qa_auto flags snow/sparks as z-fighting and blur whips as cut leaks (false positives here). Real fix made: unblurred plate underlay during whip blur (engine.js plate()).
- Engagement check: weakest stretch 0:30-2:15 before the first gag scene; next time put the first gag scene before 1:30.
