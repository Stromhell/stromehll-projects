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

v22: quick-jump bar under the header (channels 01-06, highlights the one in view) and CH 05 Analytics from db board/analytics (see automation/analytics-refresh.md). Button 'Open all video analytics' shows every post grouped by video with views, likes, comments, shares, saves, reach, average watch time and skip rate.

v23: per-act Play/Watch (green) and Feedback (blue) are full-size buttons on their own row; fixed act names picking up the analytics panel style.

v24: channel quick-jump moved to a fixed side rail (left with names on wide screens, right-edge number buttons on phones) plus a Top button; it stays put while scrolling and lights the channel in view.

v25: visual polish (soft colour glows, rounder roomier panels, pill bars) and the channel rail no longer squeezes the page: on very wide screens it sits in the empty left gutter, otherwise a floating Channels button (bottom right) opens it.

## v26 (28 Oct 2026)
- 3D acts now show a Watch button. The 3D docs give only a whole-video `previewUrl`, no per-act `url`, so acts showed "No render yet". Each started act (not `todo`) now falls back to the video's `previewUrl`. A per-act `url` / `video` still wins when present.

## v27 (28 Oct 2026)
- Each card has a "Full preview" box. It lists every preview made so far (the video's `previews` plus each act's own `url`, with duplicates removed). It also has a big "Watch everything so far" button, which opens `previewUrl` or a preview labelled all/full/combined.
- "Feedback on whole video" button: writes a `requests` doc with kind `feedback` and act `"all"`, and shows the same status icons as act feedback.
- Rule (Pushpam 28 Oct 22:44Z): a card can come off the production line once its full video is scheduled on Zernio. Reels no longer hold a card.

## v28 (28 Oct 2026)
The 2D and 3D cards now render the same way:
- "Your feedback" was blank when a doc's `feedback` was a list of plain strings, which is what the 2D and 3D threads write. It now shows the latest string.
- The main preview (`mainPreview`) uses `previewUrl` (3D). If that's missing, it falls back to the `previews` entry labelled all/full/combined, or to "Act(s) preview" (2D). Both "Watch everything so far" and the per-act Watch fallback use it, so 2D acts get Watch buttons too.
- An act labelled "0" now reads "Cold open", the same as "CO".

## v29 (29 Oct 2026)
- Three production lines (Pushpam 29 Oct): 2D (4 at once), 2D dynamic (3, Village Painterly style, its own thread) and 3D (2). Always-on: when a video waits for review, the next one in that line starts.
- New format "2D dynamic" (cyan tag). `fmtKey()` maps any format containing "DYN" to the key 2DD; `fmtName()` shows it as "2D dynamic". Cards, timeline, release list and calendar all use it.
- Release plan now opens with a "Production lines" strip: in production / target per line, open slots, waiting on Pushpam, queued.
- Spain parts 1-3 moved to 2D dynamic in board/releases. 2D dynamic cards live in db external/2dd-*.
- McDonald's in Africa: full video (2 Dec 20:00Z) and 15 reels (2-7 Dec) were scheduled on Zernio by the 3D chat; calendar and release plan updated.
- The hourly request check now routes 2D dynamic requests to the 2D dynamic thread.

## v30 (29 Oct 2026): production line as a list
- Each video is one compact row: format tag, title, latest note, progress bar, status, arrow.
- Rows are sorted in working order: working, waiting on Pushpam, paused, queued, other project, done (then by line 2D, 2D dynamic, 3D, then progress).
- Click a row to open every detail (stages, notes, preview, acts, feedback, Combine/Reels/Schedule buttons). Click again to close. Open rows are remembered in the browser.
- Timeline/side-rail jumps to a video open its row.

## v31 (29 Oct 2026): facts shorts as one card
- Every db doc `external/fs-*` (or format "Short") is grouped into one "Facts shorts" row in the production line, showing how many were created and how many are done/booked, in progress, waiting or queued.
- Opening it lists each short with its progress; click a short for its latest note, steps, file links (claude.ai or Google Drive) and booking time (`booked` field).
- Short statuses: working, review (shown as "Needs your OK"), queued, paused, done, scheduled/booked/posted (shown as done). Cards stay after booking so the count keeps growing.
