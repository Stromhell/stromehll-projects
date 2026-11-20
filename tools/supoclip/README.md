# SupoClip (installed 20 Nov 2026)

Open-source OpusClip alternative (github.com/FujiwaraChoki/supoclip, pinned commit dab704b).
Give it a long video; it transcribes it, an LLM picks the 3-7 most clip-worthy moments, scores them
(hook, engagement, value, shareability) and renders vertical 9:16 clips with face-centred crop,
word-synced captions and an AI hook title. Workflows: highlights, series (Part 1..N), topic, recap, trailer.

## Use in a thread
```bash
bash /mnt/project-files/tools/supoclip/setup.sh                      # ~3 min first time, then seconds
bash /mnt/project-files/tools/supoclip/clip.sh FULL_VIDEO.mp4 short  # -> supoclip-<date>/clip_01.mp4 ... + clips.json
INSTRUCTIONS="Skip the intro" bash .../clip.sh FULL.mp4 medium highlights OUT_DIR
TOPIC="Rockefeller oil" bash .../clip.sh FULL.mp4 auto topic
bash /mnt/project-files/tools/supoclip/setup.sh --stop
```
API docs at http://localhost:8000/docs (key in ~/.cache/supoclip/.local_api_key). No web UI (not needed).

## Status / blocker
- Works: install, Postgres/Redis, API, worker, upload, local Whisper transcription (free, tested on JP_Reel_02).
- Needs: ONE LLM key for clip selection. None added. Pushpam must approve which. Put it in
  `/mnt/project-files/tools/supoclip/keys.env`, e.g.
  `LLM=google-gla:gemini-3-flash-preview` + `GOOGLE_API_KEY=...` (Gemini has a free tier), or
  `LLM=anthropic:claude-...` + `ANTHROPIC_API_KEY=...`. Then rerun setup.sh.
- Optional paid extras NOT used: AssemblyAI (better transcripts), Pexels B-roll, Apify downloads.

## House rules still apply
Its clips are raw material: our reels still need the Stormi logo top-right, end card, own thumbnail,
bars layout, shock line in 1st second, and render QA (qa_auto.py --kind reel + /watch).
SupoClip captions may duplicate ours; turn them off or restyle if they clash.
Our videos are animated (cartoon/3D), so face-crop works less well than on talking heads: check framing.

## License
SupoClip Noncommercial 1.1: free for an individual creator on own channels (incl. monetised).
NOT allowed for client/freelance work (e.g. TigerGraph) without written permission.

## Files
setup.sh (v2 native install), clip.sh (helper), setup-docker_v1.sh (first Docker attempt, fails: builds can't reach proxy).
