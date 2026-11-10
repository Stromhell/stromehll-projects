# Default voice from 10 Nov 2026: Pushpam mixed accent (take P)

Pushpam (10 Nov 2026, 12:51 UTC): every video from now on uses this voice.

- Voice: Pushpam's own cloned voice with a mixed accent, about 55% Indian, 35% American, 10% British. It is narration-style with a slightly American lean.
- Reference: `voice/pushpam_mixed.wav` (16 s). Use it instead of `voice/pushpam.wav` for all new narration.
- Script: `scripts/speak_mixed.py` (settings and method are in its header). Same Chatterbox venv as the rest of the kit. Free, local, never ElevenLabs.
- Approved sample: take P plus the history / tech / crime previews in Drive AI/Tools/Pushpam Voice Kit/Accent previews.
- After voicing, the normal steps still apply: wt.py timing and --check, then the /watch QA on the finished video.

How the reference was made (only needed to rebuild it): a Kokoro TTS voice blend (0.35 am_liam + 0.10 bm_george + 0.55 hm_omega) read a line, Chatterbox VC moved it onto voice/pushpam.wav, then 10 s of that was joined with 6 s of the real pushpam.wav.

Lessons from Pushpam's feedback (10 Nov):
- No time-stretching of words: it warbles.
- Don't splice lines that belong together. Generate them as one chunk to avoid hard cuts.
- Keep short gaps (about 0.2 s), breaths, and a faint room tone. No dead digital silence.
- Commas before a dramatic beat make the model drop the pitch and cut. Use an em-dash or "..." instead.
- Use "thee" before a vowel ("thee update"), and write numbers as words.
