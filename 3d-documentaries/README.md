# 3D documentaries

One folder per film. Every film uses the same layout, matching the Google Drive folders under AI.

| Folder | What goes in it |
|---|---|
| `01-script` | Production script (`<CODE> - Script v1.md`), shot list JSON the engine reads, VO line files, source transcript |
| `02-storyboard` | Storyboard: rough sketch of every shot plus how it will be animated |
| `03-frames` | Still frames and contact sheets |
| `04-build` | Build source: shot source file, Three.js scenes, audio and render scripts |
| `05-production` | Rendered acts, combined film, reels, thumbnails, packaging notes. Files over 100 MB go here as smaller copies; the full file is on Drive |

`tools/build_script.py` turns a film's shot source file into the script tables, shots JSON and VO lines.

| Film | Code | Status |
|---|---|---|
| Operation Thunderbolt (Entebbe, 1976) | TB | Script v1 done, queued |
| The Ides of March (Caesar) | CAE | Script v1 done, queued |
