#!/usr/bin/env python3
"""Pull a Colab-downloaded YouTube video from Drive AI/Clips Channel/Sources.

Usage: python3 pull_from_drive.py VIDEO_ID_OR_URL [--out DIR] [--list]
Finds the file whose name contains "[VIDEO_ID]" and streams it to DIR
(default: /home/user/clips-sources). Never overwrites: an existing local
file with the same size is reused, otherwise the new copy gets _v2, _v3.
Uses the Drive helper /mnt/project-files/tools/gdrive_upload.py (env vars
GDRIVE_CLIENT_ID / GDRIVE_CLIENT_SECRET / GDRIVE_REFRESH_TOKEN; never print them).
"""
import argparse, os, re, sys, urllib.request

sys.path.insert(0, "/mnt/project-files/tools")
import gdrive_upload as g  # noqa: E402

SOURCES = "Clips Channel/Sources"


def video_id(s):
    m = re.search(r"(?:v=|youtu\.be/|/live/|/shorts/|/embed/)([\w-]{11})", s)
    return m.group(1) if m else s.strip()


def sources_folder():
    parent = g.ai_root()
    for part in SOURCES.split("/"):
        hits = g.find(part, parent=parent, folder=True)
        if not hits:
            sys.exit(f'Drive folder AI/{SOURCES} not found. Has the Colab run finished?')
        parent = hits[0]["id"]
    return parent


def list_files(folder):
    _, _, d = g.request("GET", g.API + "/files", {
        "q": f"'{folder}' in parents and trashed = false",
        "fields": "files(id,name,size,createdTime)", "orderBy": "createdTime desc",
        "pageSize": 100, "supportsAllDrives": "true", "includeItemsFromAllDrives": "true"})
    return d.get("files", [])


def free_name(path):
    if not os.path.exists(path):
        return path
    base, ext = os.path.splitext(path)
    n = 2
    while os.path.exists(f"{base}_v{n}{ext}"):
        n += 1
    return f"{base}_v{n}{ext}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("--out", default="/home/user/clips-sources")
    ap.add_argument("--list", action="store_true", help="only list what is in Sources")
    a = ap.parse_args()
    folder = sources_folder()
    files = list_files(folder)
    if a.list:
        for f in files:
            print(f"{int(f.get('size', 0))/1e9:6.2f} GB  {f['createdTime']}  {f['name']}")
        return
    vid = video_id(a.video)
    hits = [f for f in files if f"[{vid}]" in f["name"] and f["name"].endswith(".mp4")]
    partial = [f for f in files if vid in f["name"] and re.search(r"\.f\d+\.|\.part$|\.ytdl$", f["name"])]
    if not hits:
        sys.exit(f"No finished mp4 for {vid} yet" + (" (download still in progress)" if partial else "") + ".")
    f = hits[0]
    size = int(f.get("size", 0))
    os.makedirs(a.out, exist_ok=True)
    dest = os.path.join(a.out, f["name"])
    if os.path.exists(dest) and os.path.getsize(dest) == size:
        print(dest)
        return
    dest = free_name(dest)
    st = os.statvfs(a.out)
    if st.f_bavail * st.f_frsize < size * 1.05:
        sys.exit(f"Not enough local disk for {size/1e9:.1f} GB. Free space or re-run Colab at a lower MAX_HEIGHT.")
    req = urllib.request.Request(f"{g.API}/files/{f['id']}?alt=media&supportsAllDrives=true",
                                 headers={"Authorization": "Bearer " + g.access_token()})
    done = 0
    with urllib.request.urlopen(req) as r, open(dest + ".part", "wb") as out:
        while True:
            chunk = r.read(8 << 20)
            if not chunk:
                break
            out.write(chunk)
            done += len(chunk)
            if done % (1 << 30) < (8 << 20):
                print(f"  {done/1e9:.1f}/{size/1e9:.1f} GB", file=sys.stderr)
    if size and done != size:
        sys.exit(f"Download incomplete ({done} of {size} bytes); left at {dest}.part")
    os.rename(dest + ".part", dest)
    print(dest)


if __name__ == "__main__":
    main()
