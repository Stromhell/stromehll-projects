#!/usr/bin/env python3
"""Upload a Markdown file to Drive as a Google Doc (replaces a same-named doc).
Usage: python3 drive_doc.py FILE.md --dest "Folder/01 Script" [--title NAME]
"""
import sys, json, os, urllib.parse
sys.path.insert(0, os.path.dirname(__file__))
import markdown
from drive_put import token, folder, find, req
a = sys.argv[1:]; src = a[0]; dest = a[a.index('--dest') + 1]
title = a[a.index('--title') + 1] if '--title' in a else os.path.splitext(os.path.basename(src))[0]
html = markdown.markdown(open(src, encoding='utf-8').read(), extensions=['tables'])
html = '<html><head><meta charset="utf-8"><style>table{border-collapse:collapse}td,th{border:1px solid #999;padding:3px;font-size:9pt}</style></head><body>' + html + '</body></html>'
tok = token(); parent = folder(tok, dest)
for f in find(tok, parent, title):
    req('https://www.googleapis.com/drive/v3/files/' + f['id'] + '?supportsAllDrives=true', headers={'Authorization': 'Bearer ' + tok}, method='DELETE')
b = 'xxBOUNDARYxx'
meta = json.dumps({'name': title, 'parents': [parent], 'mimeType': 'application/vnd.google-apps.document'})
body = (f'--{b}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n{meta}\r\n--{b}\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n{html}\r\n--{b}--').encode()
s, h, r = req('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true', data=body,
              headers={'Authorization': 'Bearer ' + tok, 'Content-Type': f'multipart/related; boundary={b}'}, method='POST')
print('https://docs.google.com/document/d/' + json.loads(r)['id'])
