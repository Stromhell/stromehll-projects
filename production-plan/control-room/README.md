# Production Control Room

Live page: https://claude.ai/artifact/EbHs3wuQ4PB1FS5Y1BvvxN

- `control-room.html`: page source as published (version 17, 28 Oct 2026).
- `board-releases.json`: the `board/releases` db doc the release list reads.
- `board-calendar.json`: the `board/calendar` db doc the Zernio calendar reads (every post, UTC times; page shows ET).

Other threads that republish this page must keep the release section and the
Running order timeline (2D/3D tags, start/done times, release dates).

Act by act: each card renders `acts[]` as a grid. Per act: `label`, `state` (done|active|review|fix|todo), optional `name`, `pct`, `url` (Drive or claude.ai link to the render, shown as Watch) and `video` (direct https mp4, plays inline).

Control from the page (v15): each act has a Feedback box; each video has big Combine acts / Create reels / Schedule buttons (tap twice to confirm).
Every action writes a doc to db collection `requests` {video, short, title, format, kind feedback|combine|reels|schedule, act, actName, text, at, status new|relayed|working|done|declined, reply?} and, when available, a "Send to Claude" comment that wakes the Production plan thread, which relays it to the thread making that video. The producing thread sets status (and an optional `reply`) as it works. Schedule requests are handled by the Production plan thread itself.
Safety net: scheduled task "Control Room request check" (trig_01Lx8uJDGUGKHpcdeNhkHLyi, hourly at :33) relays any request still "new". A failed instant send is recorded on the doc as `sendError`.
Release list (v17): each board/releases row may carry `key` (= board/calendar post `v`) and `reelsTotal`; the page shows full-video and reel posting progress from board/calendar, and hides a row once its full video and all reels are posted (a scheduled post past its time counts as posted).

## v18 (28 Oct 2026): feedback status and instant link

Why notes got stuck: the page's "send to Claude" path (comments) reports `off` in the view Pushpam uses, so notes were saved but only picked up by the hourly check. The Ancient Humans note (requests/mvsn298jghr4) recorded `sendError: "sending to Claude is off in this view"`.

Fix: on save, the page now calls the Claude Code Remote connector's `fire_trigger` on the "Control Room request check" scheduled task (trig_01Lx8uJDGUGKHpcdeNhkHLyi), which runs in the Production plan session right away. Fallbacks: comments sendToClaude, then the hourly run. The first press asks the viewer to allow the connector once. The doc gets `sentVia: "instant"` or `sendError` with the reasons.

Status flow on each `requests` doc (shown on the act and in the list):
- `new` Received (saved) -> `relayed` Received by the team
- `understood` + `summary` (one line on what will change) + `when` now|later
- `working` (Working on it now) or `queued` (Queued for later)
- `done` (+ optional `url` of the fixed render), or `declined` + `reply`
The producing thread sets understood/working/queued/done itself.

v19: Combine / Create reels / Schedule buttons show the latest request of that kind as three icons (Received, Working or Queued, Done) using the same status field.

v20: act notes use the same icons (inbox Received, bulb Understood, gear Working / clock Queued, tick Done) with the current step named.

v21: redesign as a dark broadcast-style control room. Top desk bar (IST/ET clocks, meters: in production, need your OK, open requests, full videos on Zernio), numbered channels (CH 01 Production line, CH 02 Running order, CH 03 Release plan, CH 04 Zernio calendar, CH 05 Activity log), per-video pipeline rail (Acts, Combine, Reels, Schedule). Colours: amber = working, red = needs your OK, cyan = requested/notes, green = done/live, violet = 3D. Light theme kept for data-theme=light.
