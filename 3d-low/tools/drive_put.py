#!/usr/bin/env python3
"""Upload files to the Drive AI folder (resumable, any size).
Usage: python3 drive_put.py FILE... --dest "Operation Thunderbolt/02 Storyboard"
Needs GDRIVE_CLIENT_ID / GDRIVE_CLIENT_SECRET / GDRIVE_REFRESH_TOKEN. Same-named files are replaced.
"""
import json, mimetypes, os, sys, urllib.parse, urllib.request

AI = '16PuMG7uDxzLKm5h_FuoP3oyKSGrVt6TS'

def req(url, data=None, headers=None, method=None):
    r = urllib.request.Request(url, data=data, headers=headers or {}, method=method)
    with urllib.request.urlopen(r) as f:
        return f.status, dict(f.headers), f.read()

def token():
    body = urllib.parse.urlencode({'client_id': os.environ['GDRIVE_CLIENT_ID'], 'client_secret': os.environ['GDRIVE_CLIENT_SECRET'],
                                   'refresh_token': os.environ['GDRIVE_REFRESH_TOKEN'], 'grant_type': 'refresh_token'}).encode()
    return json.loads(req('https://oauth2.googleapis.com/token', body)[2])['access_token']

def find(tok, parent, name, folder=None):
    q = f"'{parent}' in parents and name = '{name.replace(chr(39), chr(92) + chr(39))}' and trashed = false"
    if folder: q += " and mimeType = 'application/vnd.google-apps.folder'"
    u = 'https://www.googleapis.com/drive/v3/files?' + urllib.parse.urlencode({'q': q, 'fields': 'files(id,name)', 'supportsAllDrives': 'true', 'includeItemsFromAllDrives': 'true'})
    return json.loads(req(u, headers={'Authorization': 'Bearer ' + tok})[2])['files']

def folder(tok, path):
    cur = AI
    for part in [p for p in path.split('/') if p]:
        f = find(tok, cur, part, True)
        if f: cur = f[0]['id']; continue
        body = json.dumps({'name': part, 'mimeType': 'application/vnd.google-apps.folder', 'parents': [cur]}).encode()
        cur = json.loads(req('https://www.googleapis.com/drive/v3/files?supportsAllDrives=true', body, {'Authorization': 'Bearer ' + tok, 'Content-Type': 'application/json'})[2])['id']
    return cur

def put(tok, parent, fp):
    name = os.path.basename(fp); mime = mimetypes.guess_type(fp)[0] or 'application/octet-stream'
    old = find(tok, parent, name)
    h = {'Authorization': 'Bearer ' + tok, 'Content-Type': 'application/json; charset=UTF-8', 'X-Upload-Content-Type': mime}
    if old:
        st, hd, _ = req(f"https://www.googleapis.com/upload/drive/v3/files/{old[0]['id']}?uploadType=resumable&supportsAllDrives=true", b'{}', h, 'PATCH')
    else:
        st, hd, _ = req('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&supportsAllDrives=true', json.dumps({'name': name, 'parents': [parent]}).encode(), h)
    loc = hd.get('Location') or hd.get('location')
    with open(fp, 'rb') as f:
        st, hd, b = req(loc, f.read(), {'Content-Type': mime}, 'PUT')
    return json.loads(b)['id']

if __name__ == '__main__':
    a = sys.argv[1:]; dest = a[a.index('--dest') + 1]; files = [x for i, x in enumerate(a) if x != '--dest' and (i == 0 or a[i - 1] != '--dest')]
    t = token(); p = folder(t, dest)
    for fp in files: print(put(t, p, fp), fp, flush=True)
