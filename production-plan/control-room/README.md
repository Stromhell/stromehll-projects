# Production Control Room

Live page: https://claude.ai/artifact/EbHs3wuQ4PB1FS5Y1BvvxN

- `control-room.html`: page source as published (version 15, 28 Oct 2026).
- `board-releases.json`: the `board/releases` db doc the release list reads.
- `board-calendar.json`: the `board/calendar` db doc the Zernio calendar reads (every post, UTC times; page shows ET).

Other threads that republish this page must keep the release section and the
Running order timeline (2D/3D tags, start/done times, release dates).

Act by act: each card renders `acts[]` as a grid. Per act: `label`, `state` (done|active|review|fix|todo), optional `name`, `pct`, `url` (Drive or claude.ai link to the render, shown as Watch) and `video` (direct https mp4, plays inline).

Control from the page (v15): each act has a Feedback box; each video has big Combine acts / Create reels / Schedule buttons (tap twice to confirm).
Every action writes a doc to db collection `requests` {video, short, title, format, kind feedback|combine|reels|schedule, act, actName, text, at, status new|relayed|working|done|declined, reply?} and, when available, a "Send to Claude" comment that wakes the Production plan thread, which relays it to the thread making that video. The producing thread sets status (and an optional `reply`) as it works. Schedule requests are handled by the Production plan thread itself.
