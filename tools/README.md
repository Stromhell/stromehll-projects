# Shared tools

## gdrive_upload.py — upload big files to Google Drive

Uploads any size file (renders, reels, full videos) into the Drive **AI** folder
(id `16PuMG7uDxzLKm5h_FuoP3oyKSGrVt6TS`) using the Drive API's resumable upload.
Tested with a 150 MB file on 2026-10-28 (about 11 s, checksum matched).

```bash
# one or more files into AI/<video>/<subfolder>; folders are created if missing
python3 tools/gdrive_upload.py out/act1.mp4 out/act2.mp4 --dest "Tesla/Renders/Acts"

# every file in a local folder
python3 tools/gdrive_upload.py --dir out/reels --dest "Tesla/Reels"

# move a Drive file to trash
python3 tools/gdrive_upload.py --delete <FILE_ID>
```

- A same-named file in the destination is replaced as a new version; pass `--keep-both` to keep both.
- Prints one JSON line per file: name, id, size, link.
- Needs `GDRIVE_CLIENT_ID`, `GDRIVE_CLIENT_SECRET`, `GDRIVE_REFRESH_TOKEN` in the environment.
  Optional `GDRIVE_AI_FOLDER_ID` skips the folder lookup.
- The refresh token expires about 7 days after 2026-10-28 while the Google app is in Testing mode.
  If uploads fail with "Refresh token expired", Pushpam needs to publish the app and generate a new token.
