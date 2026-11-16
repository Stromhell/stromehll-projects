import sys,re
src,out=sys.argv[1:3]; s=open(src).read()
s=s.replace("<script>\n// ===== STYLE","<script>window.SPEC=JSON.parse(decodeURIComponent(location.hash.slice(1)||'{}'));\n// ===== STYLE",1)
i=s.find('const S={'); j=s.find('\n',i); s=s[:j]+"\nObject.assign(S,window.SPEC.S||{});"+s[j:]
s=s.replace("new THREE.WebGLRenderer({canvas:cv,antialias:true})","new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true,preserveDrawingBuffer:true})")
s=s.replace("function loop(t){requestAnimationFrame(loop);","function loop(t){if(window.HOLD)return;requestAnimationFrame(loop);")
k=s.rfind('</script>'); s=s[:k]+"\n"+open('hook.js').read()+"\n"+s[k:]
s=s.replace('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','three.min.js')
open(out,'w').write(s); print(out, 'const S' in s)
