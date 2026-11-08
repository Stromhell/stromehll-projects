import sys,json,os
from headroom import compress
t=sys.stdin.read()
msgs=[{'role':'user','content':'x'},{'role':'assistant','content':[{'type':'tool_use','id':'t1','name':'Bash','input':{}}]},{'role':'user','content':[{'type':'tool_result','tool_use_id':'t1','content':t}]}]
r=compress(msgs,model='claude-opus-4-5')
o=r.messages[-1]['content'][0]['content']
o=o if isinstance(o,str) else json.dumps(o)
sys.stderr.write(f"headroom: {r.tokens_before} -> {r.tokens_after} tokens ({','.join(map(str,r.transforms_applied))})\n")
print(o)
