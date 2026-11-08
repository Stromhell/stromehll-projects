# Motion + token kit (installed 8 Nov 2026)

One command per session loads it: `bash /mnt/project-files/tools/motion-kit/setup.sh` (add `--headroom`
only when you will pipe big JSON through `hc`). Skills become usable in the same session.
All third-party code was read before install; repos are pinned in `setup.sh`.

| Tool | Status | Use it for | How |
|---|---|---|---|
| **MotionMaxx** (`motionmaxxing` skill) | setup.sh installs it | Title cards, map/stat reveals, kinetic type, reel hooks, end cards. Its timing laws (land fast then ease, cut on motion, nothing grows from zero, one hero per frame) and `scripts/look.py` / `lint.mjs` gates also work as an extra QA pass on act renders. | Invoke the skill. Chrome is `CHROME_PATH=/opt/pw-browsers/chromium`. **Never run `scripts/voice.py`** (spends ElevenLabs credits; credits are for long-video thumbnails only). |
| **Shotcraft** (`video-shotcraft` skill) | Already in shared skills since 31 Oct (same upstream SKILL.md) | 124 shot-recipe cards, beat sync, SFX finding/aligning for reels and acts. | Invoke the skill. |
| **Subframe Motion** (MCP) | No sign-in needed. In repo `.mcp.json` for sessions that load it; shell helper always works | Motion guidance (timing, enter/exit, springs) and React/WebGL motion examples to adapt into act HTML. | `bash /mnt/project-files/tools/motion-kit/subframe search "map line draw"`, `subframe get <slug>`, `subframe guide timing` |
| **Headroom** (`hc`) | `setup.sh --headroom` (448 MB, per session, not in project storage) | Shrinks big JSON (Zernio post lists, API dumps) ~45% before it enters context. Does nothing on git logs or prose. | `some_cmd \| hc` (offline, telemetry off). Proxy mode (`headroom wrap claude`) cannot run in cloud threads; only on Pushpam's own machine. |
| **Task Observer** (`task-observer` skill) | Already an account skill | Logs skill improvements and corrections. The file is ~13k tokens, so invoke it at **handover / end of a video**, not at every session start. | Log folder: `/mnt/project-files/tools/skill-observations/`. Fold findings into skills via `propose_skills`. |
