import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, clamp, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const Astronaut: React.FC<{t: number; s?: number; shake?: boolean; bino?: boolean}> = ({t, s = 1, shake: sh, bino}) => (
  <g transform={`scale(${s}) rotate(${(sh ? 10 * Math.sin(t * 8) : 6 * Math.sin(t * 1.2))})`}>
    <rect x={-90} y={40} width={180} height={200} rx={50} fill="#F4F6F8" stroke={INK} strokeWidth={LW} />
    <rect x={-50} y={90} width={100} height={60} rx={12} fill="#C9D3DD" stroke={INK} strokeWidth={6} />
    <circle cx={0} cy={-40} r={120} fill="#F4F6F8" stroke={INK} strokeWidth={LW} />
    <ellipse cx={0} cy={-40} rx={86} ry={70} fill="#2B3A6A" stroke={INK} strokeWidth={7} />
    <path d="M -50 -80 Q -30 -96 -10 -86" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.7} />
    {bino
      ? <g><circle cx={-28} cy={-40} r={30} fill="#4B5563" stroke={INK} strokeWidth={7} /><circle cx={28} cy={-40} r={30} fill="#4B5563" stroke={INK} strokeWidth={7} /><circle cx={-28} cy={-40} r={14} fill="#7FD3FF" /><circle cx={28} cy={-40} r={14} fill="#7FD3FF" /></g>
      : <g><circle cx={-28} cy={-46} r={10} fill="#fff" /><circle cx={28} cy={-46} r={10} fill="#fff" /><path d={sh ? 'M -24 0 q 24 -14 48 0' : 'M -24 -10 q 24 20 48 0'} stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" /></g>}
    <path d="M -90 100 Q -170 60 -150 -10" stroke={INK} strokeWidth={50} fill="none" strokeLinecap="round" /><path d="M -90 100 Q -170 60 -150 -10" stroke="#F4F6F8" strokeWidth={34} fill="none" strokeLinecap="round" />
    <path d="M 90 100 Q 170 60 150 -10" stroke={INK} strokeWidth={50} fill="none" strokeLinecap="round" /><path d="M 90 100 Q 170 60 150 -10" stroke="#F4F6F8" strokeWidth={34} fill="none" strokeLinecap="round" />
  </g>
);

const Earth: React.FC<{t: number; r: number}> = ({t, r}) => (
  <g>
    <circle r={r} fill="#3D8CF0" stroke={INK} strokeWidth={LW} />
    <g transform={`rotate(${t * 4})`}>
      <path d={`M ${-r * 0.5} ${-r * 0.5} q ${r * 0.4} ${-r * 0.2} ${r * 0.7} ${r * 0.1} q ${r * 0.1} ${r * 0.4} ${-r * 0.3} ${r * 0.5} q ${-r * 0.4} ${-r * 0.1} ${-r * 0.4} ${-r * 0.6} Z`} fill="#C9A86A" stroke={INK} strokeWidth={6} />
      <path d={`M ${r * 0.2} ${r * 0.2} q ${r * 0.4} 0 ${r * 0.5} ${r * 0.3} q ${-r * 0.2} ${r * 0.3} ${-r * 0.5} ${r * 0.1} Z`} fill="#6FB35A" stroke={INK} strokeWidth={6} />
    </g>
    <circle r={r + 30} fill="none" stroke="#9FD8FF" strokeWidth={14} opacity={0.5} />
  </g>
);

// winding wall seen from above or the side
const wallPath = 'M -100 1300 C 100 1150 200 1350 380 1200 S 620 1050 760 1180 S 980 1240 1180 1080';

export const GreatWall: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.astronauts - 0.25 ? 'intro' : t < T.few - 0.25 ? 'long' : t < T.orbit - 0.25 ? 'road' : t < T.stone - 0.25 ? 'orbit' : 'blend';
  const cues: Cue[] = [
    {f: 'whoosh', at: 0.15, db: -24}, {f: 'pop', at: T.space, db: -20},
    {f: 'whoosh', at: T.astronauts - 0.25, db: -24}, {f: 'blegh', at: T.not, db: -22},
    {f: 'whoosh', at: T.long - 0.2, db: -24}, {f: 'rise', at: T.long, db: -24},
    {f: 'whoosh', at: T.few - 0.25, db: -24}, {f: 'pop', at: T.few + 0.2, db: -20}, {f: 'boing', at: T.road, db: -20},
    {f: 'whoosh', at: T.orbit - 0.25, db: -22}, {f: 'tick', at: T.hundreds, db: -20}, {f: 'sad', at: T.thin, db: -22},
    {f: 'whoosh', at: T.stone - 0.25, db: -24}, {f: 'wobble', at: T.colour, db: -22}, {f: 'ding', at: T.colour + 0.6, db: -18},
  ];
  const stars = Array.from({length: 60}).map((_, i) => <circle key={i} cx={(i * 197) % W} cy={(i * 331) % H} r={2 + (i % 3)} fill="#fff" opacity={0.4 + 0.4 * Math.abs(Math.sin(t + i))} />);
  return (
    <AbsoluteFill style={{background: '#0E1230'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect width={W} height={H} fill={scene === 'long' || scene === 'road' ? '#BFE6FF' : '#0E1230'} />
        {(scene === 'intro' || scene === 'orbit') && stars}
        {scene === 'intro' && (
          <g>
            <g transform={`translate(540 ${lerp(2300, 1900, prog(t, 0, 1.2))})`}><Earth t={t} r={760} /></g>
            <g transform={`translate(560 ${980 + 20 * Math.sin(t * 1.5)})`}><Astronaut t={t} shake={t > T.not} /></g>
            <Label x={540} y={620} size={70} s={pop(t, T.space, 12, 6)} color="#FFE45C">SEEN FROM SPACE?</Label>
            <Sticker t={t} t0={T.not} x={540} y={1360} text="NOT REALLY" size={92} fill="#E5414A" />
          </g>
        )}
        {scene === 'long' && (
          <g>
            <path d="M 0 900 L 200 760 L 380 880 L 600 720 L 820 860 L 1080 760 L 1080 1920 L 0 1920 Z" fill="#B8C77A" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
            <path d={wallPath} stroke={INK} strokeWidth={46} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${prog(t, T.long - 0.2, T.long + 1)} 1`} />
            <path d={wallPath} stroke="#C9A86A" strokeWidth={30} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${prog(t, T.long - 0.2, T.long + 1)} 1`} />
            {[[150, 1220], [480, 1140], [820, 1200]].map(([x, y], i) => <rect key={i} x={x - 30} y={y - 50} width={60} height={60} fill="#C9A86A" stroke={INK} strokeWidth={6} transform={`scale(1)`} opacity={prog(t, T.long + i * 0.2, T.long + 0.3 + i * 0.2)} />)}
            <Label x={540} y={620} size={80} s={pop(t, T.long, 12, 6)} color="#fff">INCREDIBLY LONG…</Label>
          </g>
        )}
        {scene === 'road' && (
          <g>
            <Layer cam={keys(t, [[T.few - 0.25, 540, 1100, 0.9], [T.road, 540, 1150, 1.1]])}>
              <rect x={-200} y={1300} width={1500} height={800} fill="#B8C77A" stroke={INK} strokeWidth={LW} />
              <g transform="translate(540 1300)">
                <rect x={-260} y={-300} width={520} height={300} fill="#C9A86A" stroke={INK} strokeWidth={LW} />
                {Array.from({length: 6}).map((_, i) => <rect key={i} x={-260 + i * 94} y={-360} width={60} height={60} fill="#C9A86A" stroke={INK} strokeWidth={7} />)}
                {Array.from({length: 4}).map((_, r) => <path key={r} d={`M -260 ${-240 + r * 70} L 260 ${-240 + r * 70}`} stroke="#A88A52" strokeWidth={6} />)}
                <g transform={`translate(${lerp(-500, 0, prog(t, T.road - 0.4, T.road + 0.2))} -330) scale(${pop(t, T.road - 0.4, 10, 6)})`}>
                  <rect x={-120} y={-80} width={240} height={70} rx={20} fill="#E5414A" stroke={INK} strokeWidth={7} />
                  <path d="M -70 -80 L -40 -130 L 50 -130 L 80 -80 Z" fill="#7FD3FF" stroke={INK} strokeWidth={7} />
                  <circle cx={-70} cy={-10} r={26} fill={INK} /><circle cx={70} cy={-10} r={26} fill={INK} />
                </g>
                <path d="M -260 80 L 260 80" stroke="#fff" strokeWidth={10} opacity={prog(t, T.few, T.few + 0.3)} />
                <path d="M -260 50 L -260 110 M 260 50 L 260 110" stroke="#fff" strokeWidth={10} opacity={prog(t, T.few, T.few + 0.3)} />
              </g>
            </Layer>
            <Sticker t={t} t0={T.few} x={540} y={620} text="ONLY A FEW METRES WIDE" size={61} fill="#2C7BE5" />
            <Label x={540} y={1760} size={76} s={pop(t, T.road, 12, 6)} color="#FFE45C">AS WIDE AS A ROAD</Label>
          </g>
        )}
        {scene === 'orbit' && (
          <g>
            <g transform="translate(540 2500)"><Earth t={t} r={1100} /></g>
            <path d="M 300 1520 C 420 1480 500 1540 620 1490 S 760 1460 820 1480" stroke="#C9A86A" strokeWidth={2.5} fill="none" opacity={prog(t, T.thin, T.thin + 0.4)} />
            <circle cx={560} cy={1500} r={130} fill="none" stroke="#FFE45C" strokeWidth={8} strokeDasharray="20 14" opacity={prog(t, T.thin, T.thin + 0.4)} />
            <g transform={`translate(540 ${880 + 16 * Math.sin(t * 1.4)}) scale(0.85)`}><Astronaut t={t} bino /></g>
            <Sticker t={t} t0={T.hundreds} x={540} y={620} text="400 KM UP" size={92} fill="#5B3A8C" />
            <Label x={540} y={1260} size={80} s={pop(t, T.thin, 12, 6)} color="#FF8A8A">FAR TOO THIN</Label>
          </g>
        )}
        {scene === 'blend' && (
          <g>
            <rect x={0} y={0} width={W} height={H} fill="#C2A46E" />
            {Array.from({length: 30}).map((_, i) => <ellipse key={i} cx={(i * 173) % W} cy={(i * 251) % H} rx={60 + (i % 4) * 20} ry={30 + (i % 3) * 10} fill="#B39460" />)}
            <path d={wallPath} transform="translate(0 -300)" stroke="#B39460" strokeWidth={40} fill="none" strokeLinecap="round" opacity={1 - 0.7 * prog(t, T.colour, T.colour + 0.8)} />
            <path d={wallPath} transform="translate(0 -300)" stroke={INK} strokeWidth={4} fill="none" opacity={1 - prog(t, T.colour, T.colour + 0.8)} />
            <g transform="translate(320 1460)" opacity={pop(t, T.stone, 12, 6)}><rect x={-110} y={-110} width={220} height={220} rx={20} fill="#C9A86A" stroke={INK} strokeWidth={LW} /><Label x={0} y={180} size={56}>WALL</Label></g>
            <g transform="translate(760 1460)" opacity={pop(t, T.colour - 0.3, 12, 6)}><rect x={-110} y={-110} width={220} height={220} rx={20} fill="#C2A46E" stroke={INK} strokeWidth={LW} /><Label x={0} y={180} size={56}>LAND</Label></g>
            <Label x={540} y={1470} size={110} s={pop(t, T.colour, 12, 6)} color="#fff">=</Label>
            <Label x={540} y={620} size={68} s={pop(t, T.colour + 0.2, 12, 6)} color="#fff">SAME COLOUR AS LAND</Label>
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="21-great-wall" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
