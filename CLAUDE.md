# Stormi video pipeline: rules for every session

## Use Graphify before reading code (token saving rule, Pushpam 30 Oct 2026)

A Graphify knowledge graph maps all pipeline code in `/mnt/project-files` (act builders, sets,
cast, rigs, reels, render and narration scripts). Asking it costs ~1.5k tokens. Reading the files
costs ~55k (34x more).

**Before you grep, glob or open more than one or two files to find where something lives, ask
the map first, then open only the files it points to:**

```bash
tools/graphify/gq "where is the walk cycle defined"   # question (auto-rebuilds if code changed)
tools/graphify/gq explain VP                            # one module, every link, file:line
tools/graphify/gq path build_reel_dd.py kit.js          # how two things connect
tools/graphify/gq affected rig.js                       # what a change would break
tools/graphify/gq                                       # the hub modules
```

`gq` installs Graphify (`pip install graphifyy`) and rebuilds the map the first time, and again
whenever any pipeline code is newer than the map (~40 s, local, no LLM, no credits). A copy of the
tools lives in `/mnt/project-files/tools/` if this checkout lacks `tools/`. Interactive map:
https://claude.ai/artifact/5f2eT3jUT2VXbGGMe3kD7x. Full guide: `tools/graphify/README.md`.

## Keep context small

- Read files in parts (offset/limit, `sed -n`, `grep -n`) instead of whole large files.
- Never print media, base64 or minified bundles into the conversation.
- Keep handoff and status notes short: what changed, what's next, links. No replays of work.

## Hourly housekeeping

`tools/housekeeping/hourly_clean.sh` runs every hour. It clears rebuildable caches (`__pycache__`,
pip cache), gzips logs older than 1 hour, and refreshes the Graphify map. It never deletes renders,
media, uploads, scripts or memory. Log: `/mnt/project-files/housekeeping/hourly-clean.log`.
