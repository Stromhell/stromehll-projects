# Nightly plan refresh

- **Scheduled task:** "Video plan refresh", id `trig_01UDA7QmqRYnvXwrmeTCvGCG`
- **When:** every day at 22:11 IST. The first run is 29 Oct 2026.
- **Where it reports:** the production plan thread in the Meta project.
- **Old task:** `trig_01Ri7tjorPxkAgWMdvKgCDnW` in the old project, switched off on 28 Oct 2026.

## What each run does

1. Checks Drive's "Ready to post" folder and new video folders under `AI/` for final mp4s.
2. Lists Zernio's scheduled, published and failed posts, and moves any post that breaks the rules.
3. Schedules finished mp4s into the next free slots (see `../schedule/rules.md`).
4. Flags any break in the 3 x 2D then 1 x 3D order without moving posts.
5. Saves updated plan files to GitHub and Drive.
6. Posts in the thread only when something changed.
