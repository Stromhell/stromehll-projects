# New Year history (2D dynamic) - PAUSED 7 Nov 2026 17:07 UTC
Pushpam: "dont start on new year video now after 2d video is done". Resume when the coordinator says the current 2D video is booked.
Done: script (new-year-history-production-script.md), storyboard (storyboard/NY_storyboard.html, https://claude.ai/artifact/Fnnpwjevv8a2GzbsuwiLpM), voice text (production/voice/actN.txt), new sets draft (production/ny_sets.js, not yet test-rendered), set gallery page production/gal/gal.html.
Voice: partial act0 clips only. Resume with: VB_ENERGY=0.6 VB_PACE=0.45 python3 shared/voice_batch.py new-year-history (from 2d-dynamic/, after pushpam-voice setup.sh + pip install faster-whisper). Respellings added to shared/voice_batch.py.
Next: test-render ny_sets.js in gal.html, write ny_head.html (copy mongols mg_head.html) + body0-5.js, prep_act per act, render, QA.
Release target: 31 Dec 00:00 IST = 30 Dec 18:30 UTC (confirm with Pushpam at preview). Fact fix: Britain switched in 1752, not 1751.
Existing sets to reuse: sz_delta/sz_oldcanal (Nile), sz_temple, np_notredame/church (medieval), np_moscow, living, hall/goldhall.
Rule (Pushpam 7 Nov 18:38, replaces 18:33): SHOW Pushpam a launch kit preview (thumbnail, reels, IG parts, covers, titles, descriptions) but do NOT wait for OK; book as soon as done.
