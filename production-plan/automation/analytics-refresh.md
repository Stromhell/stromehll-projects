# Analytics refresh (Control Room CH 05)

Writes db doc `board/analytics` on the Control Room. Runs nightly and when Pushpam presses "Refresh stats" (that fires the Control Room request check task with text "Refresh analytics").

1. Zernio `analytics_get_analytics` (from_date = 60 days ago, limit 100). Save the raw result to `posts.raw` as `{"result": "<string>"}`.
2. Zernio `accounts_get_follower_stats` for YouTube 6add4e45e997d795ad6dfc72 and Instagram 6add4e3335057a25ed050012 (from 30 days ago). Write `followers.json`:
   `{"yt":{"subs","videos","totalViews","hist":[[date,n]...],"user","name"},"ig":{"followers","media","hist":[[date,n]...],"user"}}`
3. Zernio `analytics_get_daily_metrics` (attribution "received", from 30 days ago). Write `daily.json`: `[[date,{"youtube":{views,likes,comments,shares,saves},"instagram":{...}}],...]`
4. Read `board/calendar` (for video names) to `calendar.json`, then `python3 -I analytics_build.py posts.raw calendar.json analytics.json` in the folder holding followers.json and daily.json.
5. ArtifactData `set` board/analytics from analytics.json (read first and pass if_version).
Never invent numbers; if a call fails, leave the old doc.

Note (28 Oct 2026): scheduled-task runs may start without this repo. The full steps and the build script are now written into the "Control Room request check" task prompt (trig_01Lx8uJDGUGKHpcdeNhkHLyi), and the nightly task points there. Keep the two in sync if this file changes.
