---
name: clips-youtube-colab-download
description: Download a YouTube video to Drive via Pushpam's Google Colab notebook, then pull it into the cloud for SupoClip. Use ONLY when Pushpam says the video is for clips.
---

# Clips YouTube download (Colab -> Drive -> cloud)

Cloud yt-dlp is bot-blocked by YouTube (HTTP 429, "confirm you're not a bot"). Google Colab is not, so the video is
downloaded inside Colab straight into Pushpam's Drive, and the cloud pulls it from there.
Method from Pushpam's own notebook (20 Nov 2026): `pip install -U yt-dlp`, then
`yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]" -o "/content/drive/MyDrive/%(title)s.%(ext)s" URL`.
His test: a 4 h live stream (12.5 GB at 1440p) took about 10 minutes.

## When to use

- ONLY when Pushpam sends a YouTube link AND says the video is for clips (the SupoClip clips channel).
- Any other YouTube link: follow the normal transcript/screenshot rule (youtube-download-blocked memory), not this.
- Never try cookie, login or bot-check workarounds in the cloud; never retry cloud yt-dlp.

## Hard rules

- Never sign in with Pushpam's Google credentials, type a password, or approve a Google sign-in/consent screen.
  If Colab shows "Connect to Google Drive", an account picker, or a sign-in page, stop and ask Pushpam to click it.
- No secrets in the repo, on Drive, or in the notebook. Drive API keys live only in the environment / project secrets folder.
- Use Pushpam's browser only for this Colab run. Open a new tab, close it when done.
- No delete, no overwrite: the notebook uses `--no-overwrites`; the pull script saves `_v2`, `_v3` instead of replacing.
- Rights: clips of another creator's video need credit; flag it to Pushpam before anything is posted. Nothing posts without his OK.

## Files

- Notebook (Drive): AI/Clips Channel/Tools/Colab YouTube Download/clips_yt_download_v1.ipynb
  Colab link: https://colab.research.google.com/drive/1EL-V0zqOMS3f1_F5VEyJNpTUl-uBo8i1
  Same notebook in the repo: `skills/clips-youtube-colab-download/clips_yt_download.ipynb`.
  It has two form fields, URL and MAX_HEIGHT (default 1080, enough for 9:16 clips and much smaller than 1440p).
- Output folder (Drive): AI/Clips Channel/Sources, file name `<title up to 80 chars> [<video id>].mp4`.
- Pull script: `skills/clips-youtube-colab-download/pull_from_drive.py` (also /mnt/project-files/tools/clips-youtube-colab-download/).

## Route A (default): Colab in Pushpam's browser

1. Load the Chrome tools in one ToolSearch call (tabs_context_mcp, tabs_create_mcp, navigate, computer, find,
   form_input, get_page_text, javascript_tool, tabs_close_mcp). Call tabs_context_mcp first; use "Browser 1" (his Mac).
2. Open the Colab link above in a NEW tab.
3. Fill the URL form field with the YouTube link (form_input on the field, or click it and type). Leave MAX_HEIGHT at 1080
   unless Pushpam asks for more.
4. Run: Runtime > Run all (or Ctrl+F9). If a "This notebook was not authored by Google" warning appears, click "Run anyway"
   (it is Pushpam's own notebook). If the Drive-mount permission popup appears, STOP and ask Pushpam to approve it.
5. Watch the output every 1 to 2 minutes (get_page_text). Done when it prints `DONE_CLIPS_DOWNLOAD` after a `[Merger]`
   line or "has already been downloaded". The JS-runtime warning is harmless. Errors: "Sign in to confirm" or 429 in Colab
   too -> go to Route B. Runtime disconnected -> run again (no-overwrites keeps finished parts).
6. Close the tab. Leave the Colab runtime alone; it times out on its own.

Tested 21 Nov 2026 with https://youtu.be/tj9rs2KiWzs: Pushpam clicked "Connect to Google Drive" once, then the 39 s 1080p
video (8 MB) was in Drive in under a minute and pulled to the cloud fine. Expect the Drive permission popup again on each
new Colab runtime: post the ask, schedule a 10-minute check, and continue when he says done.

## Route B (no browser): Remote Control on Pushpam's Mac

Use when the Chrome tools are missing, the browser is not connected, or Colab is blocked too. Pushpam said a no-browser
route is fine (20 Nov 2026).
1. `start_remote_control` with instructions: install/upgrade yt-dlp (`pip3 install -U yt-dlp` or `brew install yt-dlp`),
   then run the same format string with `--no-overwrites --no-playlist --merge-output-format mp4`, height <= 1080, saving to
   the Google Drive for desktop folder `~/Library/CloudStorage/GoogleDrive-*/My Drive/AI/Clips Channel/Sources/` if it
   exists, otherwise to `~/Downloads/clips-sources/` and tell Pushpam to drop the file into Drive AI/Clips Channel/Sources.
   No sign-in, no cookies-from-browser.
2. Wait for the file to sync to Drive, then Route C below.

## Route C (last resort): ask Pushpam

Send him the Colab link, ask him to paste the YouTube link into URL and press Run all. Then pull as below.

## Pull into the cloud

```
python3 skills/clips-youtube-colab-download/pull_from_drive.py --list x        # what is in Sources
python3 skills/clips-youtube-colab-download/pull_from_drive.py "<YouTube URL or id>" [--out DIR]
```
It finds `[<video id>]` in Sources, checks free disk, streams to `/home/user/clips-sources/` (not the /mnt network mount),
and prints the local path. "No finished mp4 yet" means Colab is still running. Then hand the file to SupoClip
(`bash /mnt/project-files/tools/supoclip/setup.sh`, then `clip.sh VIDEO ...`) and the clips-channel layout and QA rules.

## Report to Pushpam

One short line: video title, size, where it is on Drive, and that clipping has started. Mention the route used if not A.
