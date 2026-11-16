# One-video-at-a-time watchdog (DumDown + Finance with Stromi)

Rule (Pushpam, 15 Nov 2026, clarified 09:53): only ONE video in making or rendering across DumDown and Finance with Stromi COMBINED (not one per channel). A video that is finished and only waiting for Pushpam's approval does not count, so the next queued video starts then. When Pushpam gives feedback on a video, it goes to the TOP of the queue and is worked next, still one at a time. The queue is shared by both channels. Every video books at the earliest best time (13:00, 16:00, 17:00 or 22:00 UTC) at least 48 h after that channel's previous video.

## STATUS.json (every video thread keeps this up to date)

One file per video, in the video's own folder:
- Finance: `/mnt/project-files/finance-with-stromi/Videos/<NN Name>/STATUS.json`
- DumDown: `/mnt/project-files/dumdown/scripts/<slug>/STATUS.json`

```json
{
 "channel": "finance | dumdown",
 "video": "05 Escaping the Rat Race",
 "state": "queued | making | waiting_approval | approved | booked | live | parked",
 "thread": "cmsg_... (the thread working on it)",
 "feedback": false,
 "queue_pos": 1,
 "booked_for": "2026-11-21T16:00Z or null",
 "zernio_post": "post id or null",
 "updated": "2026-11-15T10:00Z",
 "note": "one line"
}
```

States:
- `queued`: script/idea is waiting. `queue_pos` sets the order (1 = next). `feedback: true` puts it ahead of every other queued video.
- `making`: being built or rendered (script, VO, acts, QA, combine). Only ONE across both channels.
- `waiting_approval`: storyboard or full video + launch kit shared, waiting for Pushpam's OK. Does not count as making.
- `approved`: Pushpam said OK, booking in progress (counts as done for the limit).
- `booked`: Zernio post scheduled. Fill `booked_for` and `zernio_post`.
- `live` / `parked`: out, or put aside by Pushpam.

When to write it (update `updated` every time, write a fresh file only, never delete another video's file):
1. Thread starts a video: set `making` only if no DumDown or Finance video is `making` (run check.py); otherwise set `queued` and wait.
2. Full video shared for approval: set `waiting_approval`. Then the next `queued` video (either channel, feedback first, then `queue_pos`) may start.
3. Pushpam gives feedback on a waiting video: set `queued`, `feedback: true`. It is next as soon as the current `making` video reaches `waiting_approval`.
4. Picking up feedback: set it back to `making`, `feedback: false`.
5. Booked: pick the time with `python3 check.py` ("next free slot"), set `booked`, `booked_for`, `zernio_post`.
6. While `making`, touch `updated` at least once a day (the watchdog flags anything quiet for 24 h).

## The check

`python3 /mnt/project-files/system/pipeline-watchdog/check.py` (add `--json` for machine output). Read-only. Exit 1 when a rule is broken. It reports:
- VIOLATIONS: more than one video `making` across both channels; two bookings less than 48 h apart; a booking not on a best-time hour; an unreadable STATUS.json.
- ACTIONS: nothing in making but a video is queued (start it, feedback first); a `making` video quiet for 24 h.
- Per channel: making, waiting, queue order, last booking, next free slot.

## Scheduled run (hourly, thread "Set up one-video-at-a-time watchdog")

Opus 5.5 low effort. Keep it cheap. Each run:
1. Run check.py.
2. `list_threads` state=working: if a working thread is clearly making a DumDown or Finance video that has no STATUS.json, or two such threads are building/rendering at once, treat it as a violation too.
3. Clean and no ACTIONS: say nothing (no message).
4. ACTIONS only: message the owning thread (or coordinator to start the next queued video). Do not repeat the same action more than once every 6 h (state.json `last_sent`).
5. VIOLATIONS: report to the project chat via the coordinator, naming the videos/threads and what rule is broken.
6. NEVER delete, cancel, move or re-time any post, and never change another thread's STATUS.json. Report only.

## One-time exceptions (exceptions.json)

When Pushpam allows two videos in making together, add an entry to `exceptions.json` (`videos` as "channel/video"). check.py does not flag that set while it is making, and marks the entry `expired` as soon as either video leaves making, so the normal one-at-a-time rule is back automatically. Current: Rat Race + Ironheart (Pushpam 15 Nov 11:12 UTC, "start the video of dumdown also for now").

## DumDown upload times (Pushpam OK 16 Nov 2026 17:30 UTC)
DumDown weekdays 21:00, 22:00, 16:00 UTC; weekends 16:00, 14:00 UTC (US/UK after-school + weekend). Finance keeps 16/13/17/22. Old 16/13/17/22 DumDown bookings stay valid.
