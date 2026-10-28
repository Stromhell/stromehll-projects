# Build board/analytics from Zernio dumps: posts.raw (analytics_get_analytics), followers.json, daily.json, calendar.json
import json,ast,sys
posts_raw, cal_path, out = sys.argv[1], sys.argv[2], sys.argv[3]
d=ast.literal_eval(json.load(open(posts_raw))['result'])
cal=json.load(open(cal_path)); cp={p['id']:p for p in cal.get('posts',[])}
F=json.load(open('followers.json')); D=json.load(open('daily.json'))
P=[]
for p in d['posts']:
    a=p.get('analytics') or {}; c=cp.get(p.get('latePostId') or '')
    first=(p.get('content') or '').split('\n')[0].replace('#shorts','').strip()
    P.append({"id":p['_id'],"plat":p['platform'],"v":c['v'] if c else None,"kind":c['kind'] if c else ("reel" if '#shorts' in (p.get('content') or '') or p['platform']=='instagram' else "full"),
      "title":c['title'] if c else first[:90],"at":p.get('publishedAt'),"url":p.get('platformPostUrl'),
      "views":a.get('views') or 0,"likes":a.get('likes') or 0,"comments":a.get('comments') or 0,"shares":a.get('shares') or 0,"saves":a.get('saves') or 0,
      "reach":a.get('reach') or 0,"er":a.get('engagementRate'),"watch":round((a.get('igReelsAvgWatchTime') or 0)/1000,1) or None,"skip":a.get('reelsSkipRate'),"dur":a.get('videoDurationSeconds')})
doc={"asOf":d['overview'].get('lastSync'),"yt":F['yt'],"ig":F['ig'],"daily":D,"posts":P}
json.dump(doc,open(out,'w'),ensure_ascii=False)
print(len(P), sum(1 for x in P if x['v']), len(json.dumps(doc)))
