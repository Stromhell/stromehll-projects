import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const NIGHT = '#3A1E2A', WALL = '#F3E2C0', BEAM = '#5A3A22', ROOF = '#8A4B32';

const Flame: React.FC<{t: number; s?: number; seed?: number}> = ({t, s = 1, seed = 0}) => {
  const f = 1 + 0.12 * Math.sin(t * 11 + seed * 3);
  return (
    <g transform={`scale(${s} ${s * f})`}>
      <path d="M 0 0 C -70 -10 -60 -110 -10 -170 C -20 -110 30 -110 20 -200 C 80 -130 80 -20 0 0 Z" fill="#F28C28" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 0 -10 C -30 -20 -25 -70 0 -100 C 10 -60 40 -50 0 -10 Z" fill="#FFE45C" />
    </g>
  );
};

// Tudor timber house, base at (0,0)
const House: React.FC<{w?: number; h?: number}> = ({w = 180, h = 260}) => (
  <g>
    <rect x={-w / 2} y={-h} width={w} height={h} fill={WALL} stroke={INK} strokeWidth={7} />
    <path d={`M ${-w / 2} ${-h * 0.5} L ${w / 2} ${-h * 0.5} M ${-w / 2} ${-h} L ${w / 2} ${-h * 0.5} M ${-w / 4} 0 L ${-w / 4} ${-h} M ${w / 4} 0 L ${w / 4} ${-h}`} stroke={BEAM} strokeWidth={10} />
    <path d={`M ${-w / 2 - 20} ${-h} L 0 ${-h - 120} L ${w / 2 + 20} ${-h} Z`} fill={ROOF} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-22} y={-h * 0.35} width={44} height={60} fill="#FFD27A" stroke={INK} strokeWidth={5} />
  </g>
);

const Dome: React.FC<{burn?: number}> = ({burn = 0}) => (
  <g>
    <rect x={-260} y={-260} width={520} height={260} fill="#D8D2C4" stroke={INK} strokeWidth={LW} />
    {[-180, -60, 60, 180].map((x) => <rect key={x} x={x - 22} y={-230} width={44} height={200} fill="#B8B0A0" stroke={INK} strokeWidth={5} />)}
    <rect x={-160} y={-360} width={320} height={100} fill="#D8D2C4" stroke={INK} strokeWidth={LW} />
    <path d="M -160 -360 Q -160 -560 0 -580 Q 160 -560 160 -360 Z" fill={burn > 0 ? '#5A4A44' : '#9FB0B8'} stroke={INK} strokeWidth={LW} />
    <path d="M -10 -580 L -10 -650 L 10 -650 L 10 -580 M -25 -630 L 25 -630" stroke={INK} strokeWidth={8} />
  </g>
);

const Smoke: React.FC<{t: number; x: number; y: number}> = ({t, x, y}) => (
  <g>{[0, 1, 2, 3].map((i) => {
    const a = (t * 0.35 + i / 4) % 1;
    return <circle key={i} cx={x + 40 * Math.sin(t + i) + 80 * a} cy={y - 600 * a} r={60 + 90 * a} fill="#4A3A40" opacity={0.6 * (1 - a)} />;
  })}</g>
);

export const GreatFire: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.homes - 0.25 ? 'intro' : t < T.bakery - 0.25 ? 'homes' : t < T.Cathedral - 0.25 ? 'bakery' : t < T.only - 0.25 ? 'church' : t < T.Historians - 0.25 ? 'six' : 'hist';
  const cues: Cue[] = [
    {f: 'sizzle', at: 0.2, db: -18}, {f: 'rumble', at: T.London, db: -20}, {f: 'tick', at: T.London + 0.8, db: -22},
    {f: 'whoosh', at: T.homes - 0.25, db: -24}, {f: 'creak', at: T.homes + 0.2, db: -18}, {f: 'crack', at: T.homes + 0.7, db: -18},
    {f: 'whoosh', at: T.bakery - 0.25, db: -24}, {f: 'ding', at: T.bakery + 0.1, db: -20}, {f: 'sizzle', at: T.bakery + 0.8, db: -18},
    {f: 'whoosh', at: T.Cathedral - 0.25, db: -24}, {f: 'rumble', at: T.Cathedral, db: -16}, {f: 'crack', at: T.Cathedral + 0.8, db: -16},
    {f: 'whoosh', at: T.only - 0.25, db: -24}, {f: 'knock', at: T.only + 0.2, db: -16}, {f: 'sad', at: T.only + 0.6, db: -22},
    {f: 'whoosh', at: T.Historians - 0.25, db: -24}, {f: 'rise', at: T.Historians + 0.3, db: -22},
  ];
  return (
    <AbsoluteFill style={{background: NIGHT}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <defs><linearGradient id="fsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3A1E2A" /><stop offset="1" stopColor="#C2502A" /></linearGradient></defs>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="url(#fsky)" />

        {scene === 'intro' && (() => {
          const day = 1 + Math.min(3, Math.floor(prog(t, T.London + 0.6, T.homes - 0.4, (u) => u) * 3.99));
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1170, 1.05], [T.homes - 0.3, 540, 1170, 1]])}>
                <rect x={-400} y={1750} width={1900} height={800} fill="#3A2A22" stroke={INK} strokeWidth={LW} />
                {[[80, 220], [270, 300], [460, 250], [650, 320], [840, 240], [1030, 280]].map(([x, h], i) => (
                  <g key={i}><Smoke t={t} x={x} y={1750 - h - 100} /><g transform={`translate(${x} 1750)`}><House h={h} /></g>
                    <g transform={`translate(${x} ${1750 - h - 60})`}><Flame t={t} s={pop(t, 0.1 + i * 0.12, 10, 6) * 0.9} seed={i} /></g></g>
                ))}
              </Layer>
              <g transform={`translate(540 1100) scale(${pop(t, T.London + 0.5, 12, 6)})`}>
                <rect x={-200} y={-80} width={400} height={140} rx={24} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={25} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={80} fill="#C2502A">{`DAY ${day}`}</text>
              </g>
              <Label x={540} y={640} size={70} s={pop(t, T.London, 12, 6)} color="#FFE45C">GREAT FIRE OF LONDON</Label>
              <Sticker t={t} t0={T.London + 0.5} x={540} y={790} text="BURNED FOR 4 DAYS" size={56} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'homes' && (() => {
          const n = Math.round(13200 * prog(t, T.homes, T.bakery - 0.5));
          return (
            <g>
              <Layer cam={keys(t, [[T.homes - 0.25, 540, 1060, 0.95], [T.bakery - 0.3, 540, 1070, 1.02]])}>
                <rect x={-600} y={1560} width={2300} height={900} fill="#3A2A22" stroke={INK} strokeWidth={LW} />
                {Array.from({length: 30}).map((_, i) => {
                  const x = -260 + (i % 10) * 160, row = Math.floor(i / 10), y = 1250 + row * 150;
                  const burnt = t > T.homes + i * 0.04;
                  return <g key={i} transform={`translate(${x} ${y}) scale(0.68)`}><House h={220} />{burnt && <g transform="translate(0 -260)"><Flame t={t} seed={i} /></g>}</g>;
                })}
              </Layer>
              <g transform={`translate(540 1800) scale(${pop(t, T.homes, 12, 6)})`}>
                <rect x={-360} y={-80} width={720} height={140} rx={28} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={72} fill={INK}>{`${n.toLocaleString('en-US')} HOMES`}</text>
              </g>
              <Label x={540} y={640} size={84} s={pop(t, T.homes, 12, 6)} color="#fff">DESTROYED OVER</Label>
            </g>
          );
        })()}

        {scene === 'bakery' && (() => {
          const spark = t > T.bakery + 0.7;
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#24161E" />
              <Layer cam={keys(t, [[T.bakery - 0.25, 540, 1120, 1], [T.Cathedral - 0.3, 560, 1150, 1.1]])}>
                <rect x={-400} y={1750} width={1900} height={800} fill="#3A2A22" stroke={INK} strokeWidth={LW} />
                <g transform="translate(540 1750)"><House w={560} h={520} /></g>
                <g transform={`translate(540 1130) rotate(${3 * Math.sin(t * 2)})`}>
                  <rect x={-220} y={-60} width={440} height={110} rx={14} fill="#7A5230" stroke={INK} strokeWidth={LW} />
                  <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={54} fill="#FFE45C">PUDDING LANE</text>
                </g>
                <g transform="translate(540 1600)">
                  <path d="M -150 150 L -150 0 Q 0 -140 150 0 L 150 150 Z" fill="#8A6A55" stroke={INK} strokeWidth={LW} />
                  <path d="M -80 150 L -80 60 Q 0 -10 80 60 L 80 150 Z" fill="#2A1A10" stroke={INK} strokeWidth={6} />
                  <g transform="translate(0 140)"><Flame t={t} s={0.5 + (spark ? 0.6 * prog(t, T.bakery + 0.7, T.Cathedral - 0.3) : 0)} /></g>
                  {spark && [0, 1, 2, 3, 4].map((i) => { const a = ((t - T.bakery) * 1.2 + i / 5) % 1; return <circle key={i} cx={-40 + i * 20 + 60 * Math.sin(i + t)} cy={40 - 300 * a} r={8} fill="#FFE45C" opacity={1 - a} />; })}
                </g>
              </Layer>
              <Label x={540} y={640} size={65} s={pop(t, T.bakery, 12, 6)} color="#fff">IT STARTED IN A BAKERY</Label>
              <Sticker t={t} t0={T.bakery + 0.4} x={540} y={790} text="SEPTEMBER 1666" size={60} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'church' && (() => {
          const burn = prog(t, T.Cathedral + 0.2, T.Cathedral + 1.0);
          return (
            <g>
              <Layer cam={keys(t, [[T.Cathedral - 0.25, 540, 1080, 1], [T.only - 0.3, 540, 1090, 1.06]])}>
                <rect x={-400} y={1750} width={1900} height={800} fill="#3A2A22" stroke={INK} strokeWidth={LW} />
                <Smoke t={t} x={540} y={1100} />
                <g transform="translate(540 1750)"><Dome burn={burn} /></g>
                {[-180, 0, 180].map((x, i) => <g key={x} transform={`translate(${540 + x} ${1750 - (i === 1 ? 560 : 300)})`}><Flame t={t} s={burn * (i === 1 ? 1.1 : 0.8)} seed={i} /></g>)}
                {[90, 990].map((x, i) => <g key={x} transform={`translate(${x} 1750)`}>
                  <rect x={-50} y={-300} width={100} height={300} fill="#C8BFAE" stroke={INK} strokeWidth={6} />
                  <path d="M -60 -300 L 0 -420 L 60 -300 Z" fill="#9FB0B8" stroke={INK} strokeWidth={6} />
                  <g transform="translate(0 -320)"><Flame t={t} s={0.7 * prog(t, T.Cathedral + 0.6 + i * 0.2, T.Cathedral + 1.2 + i * 0.2)} seed={i + 5} /></g>
                </g>)}
              </Layer>
              <Label x={540} y={640} size={75} s={pop(t, T.Cathedral, 12, 6)} color="#fff">ST PAUL'S CATHEDRAL</Label>
              <Sticker t={t} t0={T.Cathedral + 0.6} x={540} y={790} text="+ 87 CHURCHES GONE" size={58} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'six' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#2A1A20" />
            <Layer cam={keys(t, [[T.only - 0.25, 540, 900, 1], [T.Historians - 0.3, 540, 910, 1.04]])}>
              <g transform={`translate(540 1300) rotate(-3)`}>
                <rect x={-320} y={-380} width={640} height={760} fill="#F3E2C0" stroke={INK} strokeWidth={LW} />
                <ellipse cx={0} cy={-380} rx={340} ry={40} fill="#E2CDA2" stroke={INK} strokeWidth={LW} />
                <ellipse cx={0} cy={380} rx={340} ry={40} fill="#E2CDA2" stroke={INK} strokeWidth={LW} />
                {[-260, -200, -140].map((y) => <path key={y} d={`M -240 ${y} L 240 ${y}`} stroke="#B89A6A" strokeWidth={10} />)}
                <text y={180} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={360 * Math.max(0.01, pop(t, T.only + 0.2, 12, 6))} fill="#C2502A" stroke={INK} strokeWidth={12} paintOrder="stroke">6</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={75} s={pop(t, T.only, 12, 6)} color="#fff">YET ONLY SIX DEATHS</Label>
            <Sticker t={t} t0={T.only + 0.5} x={540} y={790} text="OFFICIALLY RECORDED" size={56} fill="#7A4DC8" />
          </g>
        )}

        {scene === 'hist' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#2A1A20" />
            <Layer cam={keys(t, [[T.Historians - 0.25, 540, 900, 1], [T.card, 560, 910, 1.05]])}>
              <g transform="translate(540 1300) rotate(-3)">
                <rect x={-320} y={-380} width={640} height={760} fill="#F3E2C0" stroke={INK} strokeWidth={LW} />
                <text y={180} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={360} fill="#C2502A" stroke={INK} strokeWidth={12} paintOrder="stroke">6</text>
              </g>
              <g transform={`translate(${540 + 160 * Math.sin(t * 1.5)} ${1220 + 60 * Math.cos(t * 1.5)}) scale(${pop(t, T.Historians + 0.1, 10, 6)})`}>
                <circle r={150} fill="#CFF0FF" fillOpacity={0.35} stroke={INK} strokeWidth={14} />
                <path d="M 100 110 L 230 260" stroke="#7A5230" strokeWidth={40} strokeLinecap="round" />
                <text y={50} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={160} fill="#E5414A" stroke={INK} strokeWidth={10} paintOrder="stroke">?</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={80} s={pop(t, T.Historians, 12, 6)} color="#fff">HISTORIANS THINK</Label>
            <Sticker t={t} t0={T.Historians + 0.4} x={540} y={790} text="THE REAL TOLL WAS HIGHER" size={48} fill="#E5414A" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="54-great-fire" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
