#!/usr/bin/env python3
"""Upload files of any size to Google Drive, under the "AI" folder.

Uses the Drive API directly (resumable upload, 8 MB chunks), so it handles
renders and reels far bigger than the Drive connector can.

Needs these environment variables (set in the cloud environment):
    GDRIVE_CLIENT_ID, GDRIVE_CLIENT_SECRET, GDRIVE_REFRESH_TOKEN

Usage:
    python3 tools/gdrive_upload.py FILE [FILE ...] --dest "Tesla/Renders/Acts"
    python3 tools/gdrive_upload.py --dest "Tesla/Renders" --dir out/acts   # every file in a folder
    python3 tools/gdrive_upload.py --delete FILE_ID                        # move a file to trash

--dest is a path inside the AI folder; missing folders are created, existing
ones reused. An existing file with the same name in the destination is
replaced (new version) unless --keep-both is given. Prints one JSON line per
uploaded file: {"name", "id", "size", "link"}.

Only the standard library is used.
"""
import argparse
import json
import mimetypes
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = "https://www.googleapis.com/drive/v3"
UPLOAD_API = "https://www.googleapis.com/upload/drive/v3"
FOLDER_MIME = "application/vnd.google-apps.folder"
ROOT_NAME = "AI"
CHUNK = 8 * 1024 * 1024  # must be a multiple of 256 KB

_token = None


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    # Drive answers unfinished resumable chunks with 308; treat it as a status, not a redirect.
    def redirect_request(self, *args, **kwargs):
        return None


_opener = urllib.request.build_opener(_NoRedirect)


def access_token():
    global _token
    if _token and _token[1] > time.time() + 60:
        return _token[0]
    missing = [v for v in ("GDRIVE_CLIENT_ID", "GDRIVE_CLIENT_SECRET", "GDRIVE_REFRESH_TOKEN") if not os.environ.get(v)]
    if missing:
        sys.exit("Missing environment variables: " + ", ".join(missing))
    body = urllib.parse.urlencode({
        "client_id": os.environ["GDRIVE_CLIENT_ID"],
        "client_secret": os.environ["GDRIVE_CLIENT_SECRET"],
        "refresh_token": os.environ["GDRIVE_REFRESH_TOKEN"],
        "grant_type": "refresh_token",
    }).encode()
    try:
        with urllib.request.urlopen("https://oauth2.googleapis.com/token", body) as r:
            d = json.load(r)
    except urllib.error.HTTPError as e:
        msg = e.read().decode(errors="replace")
        if "invalid_grant" in msg:
            sys.exit("Refresh token expired or revoked. Pushpam needs to generate a new GDRIVE_REFRESH_TOKEN.")
        sys.exit(f"Token exchange failed ({e.code}): {msg}")
    _token = (d["access_token"], time.time() + d.get("expires_in", 3600))
    return _token[0]


def request(method, url, params=None, body=None, headers=None, retries=5):
    if params:
        url += "?" + urllib.parse.urlencode(params)
    data = json.dumps(body).encode() if isinstance(body, (dict, list)) else body
    for attempt in range(retries):
        h = {"Authorization": "Bearer " + access_token()}
        if isinstance(body, (dict, list)):
            h["Content-Type"] = "application/json; charset=UTF-8"
        h.update(headers or {})
        req = urllib.request.Request(url, data=data, method=method, headers=h)
        try:
            with _opener.open(req) as r:
                raw = r.read()
                return r.status, dict(r.headers), (json.loads(raw) if raw else {})
        except urllib.error.HTTPError as e:
            raw = e.read()
            if e.code == 308:  # resumable "keep going"
                return 308, dict(e.headers), {}
            if e.code in (429, 500, 502, 503, 504) and attempt < retries - 1:
                time.sleep(2 ** attempt)
                continue
            raise RuntimeError(f"{method} {url} -> {e.code}: {raw.decode(errors='replace')}")
        except urllib.error.URLError:
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
                continue
            raise


def q_escape(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")


def find(name, parent=None, folder=None):
    q = [f"name = '{q_escape(name)}'", "trashed = false"]
    if parent:
        q.append(f"'{parent}' in parents")
    if folder is True:
        q.append(f"mimeType = '{FOLDER_MIME}'")
    elif folder is False:
        q.append(f"mimeType != '{FOLDER_MIME}'")
    _, _, d = request("GET", API + "/files", {
        "q": " and ".join(q), "fields": "files(id,name,parents)",
        "orderBy": "createdTime", "pageSize": 10,
        "supportsAllDrives": "true", "includeItemsFromAllDrives": "true",
    })
    return d.get("files", [])


def ai_root():
    if os.environ.get("GDRIVE_AI_FOLDER_ID"):
        return os.environ["GDRIVE_AI_FOLDER_ID"]
    hits = find(ROOT_NAME, parent="root", folder=True) or find(ROOT_NAME, folder=True)
    if not hits:
        sys.exit('Could not find the "AI" folder in Drive.')
    return hits[0]["id"]


def ensure_path(path):
    parent = ai_root()
    for part in [p for p in path.strip("/").split("/") if p]:
        hits = find(part, parent=parent, folder=True)
        if hits:
            parent = hits[0]["id"]
        else:
            _, _, d = request("POST", API + "/files", {"fields": "id", "supportsAllDrives": "true"},
                              {"name": part, "mimeType": FOLDER_MIME, "parents": [parent]})
            parent = d["id"]
    return parent


def upload(path, folder_id, keep_both=False):
    name = os.path.basename(path)
    size = os.path.getsize(path)
    mime = mimetypes.guess_type(name)[0] or "application/octet-stream"
    existing = [] if keep_both else find(name, parent=folder_id, folder=False)
    common = {"uploadType": "resumable", "fields": "id,name,size,webViewLink", "supportsAllDrives": "true"}
    hdr = {"X-Upload-Content-Type": mime, "X-Upload-Content-Length": str(size)}
    if existing:
        _, h, _ = request("PATCH", f"{UPLOAD_API}/files/{existing[0]['id']}", common, {}, hdr)
    else:
        _, h, _ = request("POST", UPLOAD_API + "/files", common, {"name": name, "parents": [folder_id]}, hdr)
    session = h.get("Location") or h.get("location")

    offset, last_pct = 0, -1
    with open(path, "rb") as f:
        while True:
            f.seek(offset)
            chunk = f.read(CHUNK)
            end = offset + len(chunk) - 1
            crange = f"bytes {offset}-{end}/{size}" if size else "bytes */0"
            try:
                status, h, d = request("PUT", session, body=chunk, headers={"Content-Range": crange, "Content-Type": "application/octet-stream"})
            except Exception as e:  # ask the server where it got to, then resume
                print(f"  chunk failed ({e}); resuming", file=sys.stderr)
                time.sleep(3)
                status, h, d = request("PUT", session, body=b"", headers={"Content-Range": f"bytes */{size}"})
            if status in (200, 201):
                return {"name": d["name"], "id": d["id"], "size": int(d.get("size", size)), "link": d.get("webViewLink")}
            rng = h.get("Range") or h.get("range")
            offset = int(rng.split("-")[1]) + 1 if rng else 0
            pct = offset * 100 // max(size, 1)
            if pct // 10 != last_pct // 10:
                print(f"  {name}: {pct}%", file=sys.stderr)
                last_pct = pct


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("files", nargs="*")
    ap.add_argument("--dest", help='path inside the AI folder, e.g. "Tesla/Renders/Acts"')
    ap.add_argument("--dir", help="upload every file in this local folder (not recursive)")
    ap.add_argument("--keep-both", action="store_true", help="do not replace a same-named file")
    ap.add_argument("--delete", metavar="FILE_ID", help="move a Drive file to trash and exit")
    a = ap.parse_args()

    if a.delete:
        request("PATCH", f"{API}/files/{a.delete}", {"supportsAllDrives": "true"}, {"trashed": True})
        print(json.dumps({"trashed": a.delete}))
        return
    files = list(a.files)
    if a.dir:
        files += sorted(os.path.join(a.dir, n) for n in os.listdir(a.dir) if os.path.isfile(os.path.join(a.dir, n)))
    if not files or a.dest is None:
        ap.error("give at least one file (or --dir) and --dest")
    folder = ensure_path(a.dest)
    for p in files:
        print(json.dumps(upload(p, folder, a.keep_both)), flush=True)


if __name__ == "__main__":
    main()
