# Register every short that has a timing.ts (plus Seawater) in src/Root.tsx.
import os, re
root = os.path.dirname(os.path.abspath(__file__)) + '/../remotion/src'
shorts = sorted(d for d in os.listdir(f'{root}/shorts') if os.path.exists(f'{root}/shorts/{d}/timing.ts'))
imp, comp = [], []
for d in shorts:
    tsx = [f for f in os.listdir(f'{root}/shorts/{d}') if f.endswith('.tsx') and not f.startswith('Thumb')][0][:-4]
    alias = re.sub(r'\W', '', d.title())
    imp.append(f"import {{{tsx} as C{alias}}} from './shorts/{d}/{tsx}';\nimport {{T as T{alias}}} from './shorts/{d}/timing';")
    comp.append(f'    <Composition id="S{d.replace("-", "")}" component={{C{alias}}} width={{1080}} height={{1920}} fps={{60}} durationInFrames={{Math.round(T{alias}.end * 60)}} />')
    if os.path.exists(f'{root}/shorts/{d}/Thumb.tsx'):
        imp.append(f"import {{Thumb as Th{alias}}} from './shorts/{d}/Thumb';")
        comp.append(f'    <Composition id="Th{d.replace("-", "")}" component={{Th{alias}}} width={{1080}} height={{1920}} fps={{60}} durationInFrames={{1}} />')
if os.path.exists(f'{root}/thumbs/Thumbs.tsx'):
    imp.append("import {THUMBS, ShortThumb} from './thumbs/Thumbs';")
    comp.append('    {THUMBS.map((th) => <Composition key={th.id} id={`Th${th.id}`} component={ShortThumb} defaultProps={{id: th.id}} width={1080} height={1920} fps={60} durationInFrames={1800} />)}')
open(f'{root}/Root.tsx', 'w').write("""import React from 'react';
import {Composition} from 'remotion';
import {Seawater} from './seawater/Seawater';
import {T, FPS} from './seawater/timing';
import {SeawaterThumb} from './seawater/Thumb';
""" + '\n'.join(imp) + """
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Seawater" component={Seawater} width={1080} height={1920} fps={FPS} durationInFrames={Math.round(T.end * FPS)} />
    <Composition id="SeawaterThumbV" component={SeawaterThumb} width={1080} height={1920} fps={60} durationInFrames={1} defaultProps={{vertical: true}} />
    <Composition id="SeawaterThumbH" component={SeawaterThumb} width={1280} height={720} fps={60} durationInFrames={1} defaultProps={{vertical: false}} />
""" + '\n'.join(comp) + "\n  </>\n);\n")
print(shorts)
