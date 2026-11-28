# DumDown: Black Panther: Wakanda Forever, handover (28 Nov 2026)

**Booked:** Fri 11 Dec 2026 16:00 UTC (9:30 PM IST), YouTube DumbDown, Zernio post `6b0af2619d2e83d10d925399`, public, category 24, not for kids. Pushpam OK 28 Nov 15:22 UTC.
**Title:** Black Panther: Wakanda Forever Explained (But It's Funny). **Thumbnail:** A, fish man (B ankles / C homework kept in launch/ for a swap test).
**Final file:** DumDown_WakandaForever_FULL_v6.mp4 (13:36, clean end screen). Drive AI/DumDown/Wakanda Forever/04 Renders (id 1D-8pbvarXqPN8coRl29wQ38D2K6Se9bY; v4, v5b kept). Launch kit https://claude.ai/artifact/U3wo9hVUoxZXA2fM4MbSk1 (v3), metadata launch/metadata.md.
**Next DumDown slots:** 13 Dec is Doomsday 0.25x; next free after that is 15 Dec.

## Reuse next time
- Engine sources: repo branch claude/project-thread-404ii9, dumdown/scripts/wakanda-forever/04-animation/ (wf_floor.js per-set floor model, shots.js REAL SCALE + zoom cap + fade-in entrances, actions.js arms-only carry/chain/doze).
- Names (Chatterbox narrator): lower-case run-together respellings (Oh-koy-ay, Reeree, Wakahnda, Tahlohkahn) in gags/names_wf_v2.py. Upper-case stress syllables ("KAHN") get read as letters. Verify with voicecheck_wf.py --narr (whisper). The trailer thread used Kokoro + IPA instead, also fine.
- Grounding: groundcheck_2d.cjs / voicecheck_2d.py in /mnt/project-files/system/qa (checklist v3.1 items 90-97).
- qa_auto flags film grain as shimmer and letterbox bars as cut leak: false positives. Qwen lean QA on a 13-min full exceeds 1 h; use 6 s contact sheets.
- Booking: dumdown/tools/zernio.sh POST /media/presign, curl -T PUT, POST /posts.
