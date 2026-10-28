# Production Control Room

Live page: https://claude.ai/artifact/EbHs3wuQ4PB1FS5Y1BvvxN

- `control-room.html`: page source as published (version 14, 28 Oct 2026).
- `board-releases.json`: the `board/releases` db doc the release list reads.
- `board-calendar.json`: the `board/calendar` db doc the Zernio calendar reads (every post, UTC times; page shows ET).

Other threads that republish this page must keep the release section and the
Running order timeline (2D/3D tags, start/done times, release dates).

Act by act: each card renders `acts[]` as a grid. Per act: `label`, `state` (done|active|review|fix|todo), optional `name`, `pct`, `url` (Drive or claude.ai link to the render, shown as Watch) and `video` (direct https mp4, plays inline).
