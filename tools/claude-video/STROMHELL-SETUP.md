# /watch (claude-video) in this project

Vendored from https://github.com/bradautomates/claude-video at commit
`03ceb42` (v0.3.2, MIT licence), installed 29 Oct 2026.

## What it does

`/watch` lets a Claude session "see" a video. Give it a local file or a URL
(YouTube, Vimeo, TikTok and others via yt-dlp) and it returns timestamped
frames plus the captions/transcript. Claude then reads the frames and answers
questions about the video.

Useful here for:
- QA of our own renders (acts, full videos, reels): check scenes, glitches,
  overlaps, logo/end-card placement against the branding rule.
- Studying reference or competitor videos before scripting.

## How threads use it

The skill lives at `.claude/skills/watch` (a link to
`tools/claude-video/skills/watch`), so any Claude Code session that opens this
repo sees it as a project skill. In a fresh cloud session run once:

```bash
bash tools/claude-video/setup-cloud.sh
```

Then:

```bash
python3 .claude/skills/watch/scripts/watch.py "<file-or-url>" --engine local \
  --question "<what to check>"
```

Read the frame paths it prints with the Read tool. Delete the `/tmp/watch-*`
work dir afterwards.

## Project rules for this tool

- **Always `--engine local`.** No API keys are configured. Do not add Gemini,
  Groq or OpenAI keys without Pushpam's OK: the Gemini engine uploads videos
  to Google, and Groq/OpenAI upload audio.
- **Transcription fallback is `none`.** Our own renders have no captions, so
  the transcript will be empty; use the script/`*.txt` VO files instead. The
  optional WhisperX backend downloads ~1.5 GB of models; skip it in cloud
  sessions.
- It never touches ElevenLabs, so the ElevenLabs credits rule is not affected.
- Do not use `--cookies-from-browser` (reads browser cookies).

## Security review (29 Oct 2026)

Read the code before installing. No credential harvesting, no hidden network
calls. Network use is limited to: yt-dlp downloads of the URL you pass;
Gemini/Groq/OpenAI APIs only if a key is set (none is); the WhisperX
installer, which downloads the `uv` installer from astral.sh and PyTorch
wheels (only if you choose WhisperX). The plugin's SessionStart hook only runs
a silent setup check. The 249 bundled tests pass.

## Installing on Pushpam's own machine (optional)

In Claude Code (terminal, VS Code or Desktop Code tab):

```
/plugin marketplace add bradautomates/claude-video
/plugin install watch@claude-video
```

It does not work in Claude Chat or Cowork.
