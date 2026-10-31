import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, SweatDrop, clamp, lerp, prog, pop, keys, shake, easeOutBack} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const STONE = '#E6CB8C', STONE_D = '#BC9D5E', SLATE = '#4E6275', GOLD = '#F2C14E', BRONZE = '#D69A3E', BRONZE_D = '#A8742A';

// cartoon clock tower; origin = base centre, ~1880 px tall; belfry centre at (0,-1310), clock at (0,-1065)
const Tower: React.FC<{t: number}> = ({t}) => {
  const blink = (t % 3.1) < 0.12;
  return (
    <g>
      <ellipse cx={0} cy={6} rx={200} ry={20} fill="rgba(30,30,40,0.22)" />
      <rect x={-130} y={-900} width={260} height={900} fill={STONE} stroke={INK} strokeWidth={LW} />
      {[-80, -28, 28, 80].map((x) => <path key={x} d={`M ${x} -880 L ${x} -40`} stroke={STONE_D} strokeWidth={8} />)}
      {[-300, -560, -790].map((y) => <g key={y}>
        <path d={`M -64 ${y} L -64 ${y - 60} Q -44 ${y - 86} -24 ${y - 60} L -24 ${y} Z`} fill="#3A4A5C" stroke={INK} strokeWidth={6} />
        <path d={`M 24 ${y} L 24 ${y - 60} Q 44 ${y - 86} 64 ${y - 60} L 64 ${y} Z`} fill="#3A4A5C" stroke={INK} strokeWidth={6} />
      </g>)}
      {/* clock stage */}
      <rect x={-162} y={-1232} width={324} height={332} fill={STONE} stroke={INK} strokeWidth={LW} />
      <circle cx={0} cy={-1065} r={142} fill={GOLD} stroke={INK} strokeWidth={LW} />
      <circle cx={0} cy={-1065} r={118} fill="#FFF8E1" stroke={INK} strokeWidth={6} />
      {Array.from({length: 12}).map((_, i) => <path key={i} transform={`rotate(${i * 30} 0 -1065)`} d="M 0 -1175 L 0 -1155" stroke={INK} strokeWidth={6} strokeLinecap="round" />)}
      {blink ? <path d="M -54 -1092 L -26 -1092 M 26 -1092 L 54 -1092" stroke={INK} strokeWidth={7} strokeLinecap="round" />
        : <g><ellipse cx={-40} cy={-1094} rx={10} ry={15} fill={INK} /><ellipse cx={40} cy={-1094} rx={10} ry={15} fill={INK} /></g>}
      <path d="M -36 -1022 Q 0 -996 36 -1022" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
      <path transform={`rotate(${t * 20} 0 -1065)`} d="M 0 -1065 L 0 -1120" stroke={INK} strokeWidth={10} strokeLinecap="round" />
      <path transform={`rotate(${t * 180} 0 -1065)`} d="M 0 -1065 L 0 -1150" stroke="#E5414A" strokeWidth={6} strokeLinecap="round" />
      <circle cx={0} cy={-1065} r={9} fill={INK} />
      {/* belfry */}
      <rect x={-142} y={-1402} width={284} height={170} fill={STONE} stroke={INK} strokeWidth={LW} />
      {[-82, 0, 82].map((x) => <path key={x} d={`M ${x - 28} -1250 L ${x - 28} -1340 Q ${x} -1380 ${x + 28} -1340 L ${x + 28} -1250 Z`} fill="#2A2F3A" stroke={INK} strokeWidth={6} />)}
      <path d="M -18 -1262 L -14 -1300 Q 0 -1316 14 -1300 L 18 -1262 Z" fill={BRONZE} />
      {/* roof + spire */}
      <path d="M -150 -1402 L -150 -1480 L -128 -1402 Z M 150 -1402 L 150 -1480 L 128 -1402 Z" fill={GOLD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -172 -1402 L 0 -1770 L 172 -1402 Z" fill={SLATE} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d="M -120 -1500 L 120 -1500 M -76 -1600 L 76 -1600" stroke={GOLD} strokeWidth={10} />
      <path d="M 0 -1770 L 0 -1870" stroke={INK} strokeWidth={18} strokeLinecap="round" /><path d="M 0 -1770 L 0 -1870" stroke={GOLD} strokeWidth={8} strokeLinecap="round" />
      <circle cx={0} cy={-1876} r={13} fill={GOLD} stroke={INK} strokeWidth={6} />
    </g>
  );
};

// the bell; origin = top of the hanging yoke, mouth (lip) at y 360
const Bell: React.FC<{t: number; mood?: 'sleep' | 'happy' | 'strain' | 'bong'; tag?: number; tagSwing?: number}> = ({t, mood = 'happy', tag = 0, tagSwing = 0}) => {
  const blink = (t % 2.9) < 0.12;
  return (
    <g>
      <rect x={-46} y={-60} width={92} height={66} rx={10} fill={BRONZE_D} stroke={INK} strokeWidth={LW} />
      <path d="M -70 0 C -84 40 -100 80 -110 200 C -120 300 -170 336 -205 356 L 205 356 C 170 336 120 300 110 200 C 100 80 84 40 70 0 Z" fill={BRONZE} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d="M -60 40 C -78 110 -86 200 -100 270" stroke="#F2C27A" strokeWidth={18} fill="none" strokeLinecap="round" />
      <path d="M -112 230 L 112 230 M -150 316 L 150 316" stroke={BRONZE_D} strokeWidth={9} />
      <ellipse cx={0} cy={360} rx={208} ry={26} fill={BRONZE_D} stroke={INK} strokeWidth={LW} />
      <circle cx={0} cy={392} r={26} fill="#5A4A3A" stroke={INK} strokeWidth={6} />
      {/* face */}
      {mood === 'sleep' || blink
        ? <path d="M -64 150 Q -46 162 -28 150 M 28 150 Q 46 162 64 150" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
        : mood === 'strain'
          ? <path d="M -62 136 l 24 14 l -24 14 M 62 136 l -24 14 l 24 14" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          : <g><ellipse cx={-46} cy={148} rx={11} ry={16} fill={INK} /><ellipse cx={46} cy={148} rx={11} ry={16} fill={INK} /><circle cx={-43} cy={142} r={4} fill="#fff" /><circle cx={49} cy={142} r={4} fill="#fff" /></g>}
      {mood === 'bong' ? <ellipse cx={0} cy={200} rx={26} ry={30} fill={INK} />
        : mood === 'strain' ? <path d="M -30 204 q 10 -10 20 0 q 10 10 20 0 q 10 -10 20 0" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
          : mood === 'sleep' ? <path d="M -16 200 L 16 200" stroke={INK} strokeWidth={7} strokeLinecap="round" />
            : <path d="M -30 192 Q 0 222 30 192" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />}
      {tag > 0 && (
        <g transform={`translate(0 386) rotate(${tagSwing}) scale(${tag})`}>
          <path d="M -60 -10 L -110 84 M 60 -10 L 110 84" stroke={INK} strokeWidth={6} />
          <rect x={-170} y={80} width={340} height={110} rx={22} fill="#fff" stroke={INK} strokeWidth={LW} />
          <Label x={0} y={160} size={64} color="#E5414A">BIG BEN</Label>
        </g>
      )}
    </g>
  );
};

// inside the belfry: stone wall, two arches looking out, a beam
const Belfry: React.FC<{t: number}> = ({t}) => (
  <g>
    <rect x={-400} y={-400} width={1880} height={2720} fill="#9A8770" />
    {Array.from({length: 22}).map((_, i) => <rect key={i} x={-300 + (i % 6) * 300 + (Math.floor(i / 6) % 2) * 150} y={420 + Math.floor(i / 6) * 380} width={260} height={110} rx={14} fill="#AA9780" />)}
    {[180, 900].map((x) => (
      <g key={x}>
        <path d={`M ${x - 130} 1700 L ${x - 130} 960 Q ${x} 760 ${x + 130} 960 L ${x + 130} 1700 Z`} fill="#8FD3FF" stroke={INK} strokeWidth={LW} />
        <path d={`M ${x - 130} 1700 L ${x - 130} 1560 L ${x - 80} 1560 L ${x - 80} 1500 L ${x - 30} 1500 L ${x - 30} 1580 L ${x + 40} 1580 L ${x + 40} 1520 L ${x + 130} 1520 L ${x + 130} 1700 Z`} fill="#6E7FA0" />
        <ellipse cx={x - 40 + 20 * Math.sin(t * 0.5)} cy={1060} rx={50} ry={22} fill="#fff" />
      </g>
    ))}
    <rect x={-400} y={1700} width={1880} height={700} fill="#6E5C48" stroke={INK} strokeWidth={LW} />
    <rect x={-400} y={640} width={1880} height={90} fill="#8A5A30" stroke={INK} strokeWidth={LW} />
    <path d="M -400 690 L 1480 690" stroke="#6E4524" strokeWidth={8} />
  </g>
);

const Rings: React.FC<{t: number; t0: number; x: number; y: number; n?: number; col?: string; max?: number}> = ({t, t0, x, y, n = 4, col = '#FFE45C', max = 520}) => {
  if (t < t0) return null;
  return <g>{Array.from({length: n}).map((_, i) => {
    const u = ((t - t0) * 0.9 + i / n) % 1;
    return <circle key={i} cx={x} cy={y} r={60 + u * max} fill="none" stroke={col} strokeWidth={14 * (1 - u) + 2} opacity={1 - u} />;
  })}</g>;
};

const Crown: React.FC<{t: number}> = ({t}) => (
  <g>
    <path d="M -170 -60 C -170 -240 170 -240 170 -60 Z" fill="#C8314A" stroke={INK} strokeWidth={LW} />
    <path d="M -230 60 L -250 -150 L -150 -60 L -80 -200 L 0 -80 L 80 -200 L 150 -60 L 250 -150 L 230 60 Z" fill={GOLD} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    {[[-250, -150], [-80, -200], [80, -200], [250, -150]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={20} fill="#fff" stroke={INK} strokeWidth={6} />)}
    <path d="M 0 -250 L 26 -210 L 0 -170 L -26 -210 Z" fill="#BFF1FF" stroke={INK} strokeWidth={6} />
    <rect x={-236} y={40} width={472} height={70} rx={14} fill="#E3A93A" stroke={INK} strokeWidth={LW} />
    {[[-160, '#E5414A'], [160, '#2C7BE5']].map(([x, c], i) => <path key={i} d={`M ${x} 50 L ${(x as number) + 22} 75 L ${x} 100 L ${(x as number) - 22} 75 Z`} fill={c as string} stroke={INK} strokeWidth={5} />)}
    {(t % 2.6) < 0.12 ? <path d="M -70 -30 L -34 -30 M 34 -30 L 70 -30" stroke={INK} strokeWidth={8} strokeLinecap="round" />
      : <g><ellipse cx={-52} cy={-30} rx={12} ry={18} fill={INK} /><ellipse cx={52} cy={-30} rx={12} ry={18} fill={INK} /></g>}
    <path d="M -38 12 Q 0 48 38 12" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>
);

const Bunting: React.FC<{t: number; y: number; k: number; ph: number}> = ({t, y, k, ph}) => {
  const cols = ['#E5414A', '#fff', '#2C7BE5'];
  const n = 9, sag = 70;
  const pt = (u: number) => [-40 + u * 1160, y + sag * 4 * u * (1 - u) + 8 * Math.sin(t * 2 + ph)];
  return (
    <g>
      <path d={`M ${pt(0)[0]} ${pt(0)[1]} Q 540 ${y + sag * 2 + 8 * Math.sin(t * 2 + ph)} ${pt(1)[0]} ${pt(1)[1]}`} stroke={INK} strokeWidth={6} fill="none" pathLength={1} strokeDasharray={`${k} 1`} />
      {Array.from({length: n}).map((_, i) => {
        const u = (i + 0.5) / n; if (u > k) return null;
        const [x, yy] = pt(u);
        return <path key={i} transform={`translate(${x} ${yy}) rotate(${6 * Math.sin(t * 3 + i + ph)})`} d="M -44 0 L 44 0 L 0 90 Z" fill={cols[i % 3]} stroke={INK} strokeWidth={6} strokeLinejoin="round" />;
      })}
    </g>
  );
};

const Skyline: React.FC<{t: number; k: number}> = ({t, k}) => {
  const bs = [[-20, 220, 260, '#B9C7D8'], [210, 160, 180, '#C9B8E8'], [380, 200, 330, '#AFC9D9'], [920, 180, 240, '#C9B8E8'], [1010, 140, 360, '#B9C7D8']];
  return (
    <g>
      {/* big wheel */}
      <g transform={`translate(330 ${1250 + 200 * (1 - k)})`}>
        <circle r={190} fill="none" stroke={INK} strokeWidth={14} /><circle r={190} fill="none" stroke="#fff" strokeWidth={6} />
        <g transform={`rotate(${t * 8})`}>{Array.from({length: 8}).map((_, i) => <g key={i} transform={`rotate(${i * 45})`}><path d="M 0 0 L 0 -190" stroke={INK} strokeWidth={5} /><circle cx={0} cy={-190} r={16} fill="#E5414A" stroke={INK} strokeWidth={5} /></g>)}</g>
        <path d="M -60 260 L 0 0 L 60 260" stroke={INK} strokeWidth={12} fill="none" />
      </g>
      {bs.map(([x, w, h, c], i) => {
        const yy = 1520 - (h as number) * prog(k, i * 0.08, 0.6 + i * 0.08);
        return <g key={i}>
          <rect x={x as number} y={yy} width={w as number} height={600} fill={c as string} stroke={INK} strokeWidth={LW} />
          {[0, 1, 2].map((r) => <rect key={r} x={(x as number) + 30} y={yy + 30 + r * 70} width={(w as number) - 60} height={26} rx={6} fill="#fff" opacity={0.7} />)}
        </g>;
      })}
      <rect x={-100} y={1510} width={1280} height={500} fill="#4FA3E0" stroke={INK} strokeWidth={LW} />
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${((i * 300 + t * 60) % 1300) - 100} ${1600 + i * 60} q 40 -16 80 0`} stroke="#BFE6FF" strokeWidth={8} fill="none" strokeLinecap="round" />)}
    </g>
  );
};

const Bird: React.FC<{x: number; y: number; t: number}> = ({x, y, t}) => (
  <path transform={`translate(${x} ${y})`} d={`M -26 ${-8 * Math.sin(t * 12)} Q -12 -10 0 6 Q 12 -10 26 ${-8 * Math.sin(t * 12)}`} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
);

export const BigBen: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const sBell = T.bell - 0.9;                       // "the giant"
  const sWeigh = T.weighs - 0.25;
  const sLondon = T.london - 0.9;                   // "rung out over"
  const tSince = lerp(T.london, T.clock, 0.27);     // "since eighteen fifty-nine"
  const sName = lerp(T.london, T.clock, 0.5);       // "The tower itself"
  const tYear = lerp(T.clock, T.renamed, 0.5);      // "in twenty twelve"
  const sJub = T.queen - 0.25;
  const sBong = lerp(T.queen, T.bongs, 0.55);       // "So when you hear"
  const scene = t < sBell ? 'tower' : t < sWeigh ? 'bell' : t < sLondon ? 'weigh' : t < sName ? 'london' : t < sJub ? 'name' : t < sBong ? 'jubilee' : 'bong';
  const cues: Cue[] = [
    {f: 'pop', at: 0.5, db: -20}, {f: 'blegh', at: T.tower, db: -22}, {f: 'whoosh', at: T.tower + 0.9, db: -22},
    {f: 'ding', at: T.bell, db: -20}, {f: 'whoosh', at: sWeigh, db: -24}, {f: 'boing', at: T.weighs, db: -20},
    {f: 'whoosh', at: sLondon, db: -24}, {f: 'ding', at: T.london, db: -22},
    {f: 'whoosh', at: sName, db: -24}, {f: 'knock', at: T.clock, db: -18}, {f: 'wobble', at: T.renamed - 0.1, db: -22},
    {f: 'whoosh', at: sJub, db: -24}, {f: 'whoosh', at: sBong, db: -24}, {f: 'ding', at: T.bongs, db: -16},
  ];
  return (
    <AbsoluteFill style={{background: '#9FD8FF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        {scene === 'tower' && (() => {
          const fade = 1 - prog(t, T.tower + 0.9, T.tower + 1.1);
          return (
            <g>
              <rect width={W} height={H} fill="#9FD8FF" />
              <Layer cam={keys(t, [[0, 540, 1250, 0.8], [1.3, 540, 990, 1], [T.tower + 0.9, 540, 1000, 1.02], [sBell, 540, 1014, 6]])}>
                {[[160, 820], [880, 1000]].map(([x, y], i) => <ellipse key={i} cx={x + 30 * Math.sin(t * 0.4 + i)} cy={y} rx={110} ry={40} fill="#fff" />)}
                <rect x={-600} y={1790} width={2300} height={600} fill="#8CCB62" stroke={INK} strokeWidth={LW} />
                <g transform="translate(540 1800) scale(0.6)"><Tower t={t} /></g>
              </Layer>
              <Label x={540} y={520} size={110} s={pop(t, 0.5, 12, 6) * fade} color="#fff">BIG BEN?</Label>
              {fade > 0 && <path d="M 250 490 L 830 460" stroke="#E5414A" strokeWidth={22} strokeLinecap="round" pathLength={1} strokeDasharray={`${prog(t, T.tower - 0.05, T.tower + 0.2)} 1`} opacity={t > T.tower - 0.05 ? fade : 0} />}
              <Sticker t={t} t0={T.tower} t1={T.tower + 0.9} x={540} y={1690} text="NOT THE TOWER!" size={76} fill="#E5414A" />
            </g>
          );
        })()}
        {scene === 'bell' && (
          <g>
            <Layer cam={keys(t, [[sBell, 540, 900, 1.5], [T.bell, 540, 930, 1], [sWeigh, 540, 940, 0.96]])}>
              <Belfry t={t} />
              <g transform={`translate(540 760) rotate(${2 * Math.sin(t * 1.6)}) scale(1.45)`}>
                <Bell t={t} mood={t < T.bell - 0.2 ? 'sleep' : 'happy'} tag={pop(t, T.bell, 10, 6)} tagSwing={18 * Math.exp(-3 * Math.max(0, t - T.bell)) * Math.sin((t - T.bell) * 9)} />
              </g>
            </Layer>
            <Label x={540} y={620} size={76} s={pop(t, T.bell - 0.15, 12, 6)} color="#FFE45C">IT&apos;S THE BELL!</Label>
          </g>
        )}
        {scene === 'weigh' && (() => {
          const land = prog(t, sWeigh, T.weighs, (u) => u * u);
          const sq = t > T.weighs ? 0.12 * Math.exp(-6 * (t - T.weighs)) * Math.cos((t - T.weighs) * 18) : 0;
          const needle = lerp(-120, 100, easeOutBack(clamp((t - T.weighs) / 0.9))) + (t > T.weighs + 0.9 ? 3 * Math.sin(t * 20) : 0);
          return (
            <g>
              <rect width={W} height={H} fill="#FFE7A8" />
              <g transform={`translate(540 1100) rotate(${t * 6})`}>{Array.from({length: 12}).map((_, i) => <path key={i} transform={`rotate(${i * 30})`} d="M 0 0 L 110 -1500 L -110 -1500 Z" fill="#FFDD85" />)}</g>
              <rect x={-100} y={1640} width={1280} height={400} fill="#C99A62" stroke={INK} strokeWidth={LW} />
              {/* scale */}
              <g transform={`translate(0 ${12 * Math.max(0, sq) * 4})`}>
                <rect x={170} y={1540} width={600} height={34} rx={10} fill="#C9D3DD" stroke={INK} strokeWidth={LW} />
              </g>
              <rect x={210} y={1570} width={520} height={74} rx={12} fill="#7F8C99" stroke={INK} strokeWidth={LW} />
              <rect x={790} y={1160} width={44} height={480} fill="#7F8C99" stroke={INK} strokeWidth={LW} />
              <path d="M 730 1600 L 800 1600" stroke={INK} strokeWidth={22} /><path d="M 730 1600 L 800 1600" stroke="#7F8C99" strokeWidth={10} />
              <g transform={`translate(812 1040) rotate(${t > T.weighs + 0.9 ? 2 * Math.sin(t * 5) : 0})`}>
                <circle r={150} fill="#fff" stroke={INK} strokeWidth={LW} />
                <path d="M 104 -60 A 120 120 0 0 1 112 44" stroke="#E5414A" strokeWidth={26} fill="none" />
                {Array.from({length: 9}).map((_, i) => <path key={i} transform={`rotate(${-120 + i * 27.5})`} d="M 0 -128 L 0 -106" stroke={INK} strokeWidth={6} strokeLinecap="round" />)}
                <Label x={0} y={70} size={34} color="#E5414A">TONNES</Label>
                <g transform={`rotate(${needle})`}><path d="M -8 10 L 0 -118 L 8 10 Z" fill="#E5414A" stroke={INK} strokeWidth={5} strokeLinejoin="round" /></g>
                <circle r={14} fill={INK} />
              </g>
              <g transform={`translate(470 ${lerp(-500, 1540 - 386 * 1.15, land) + 12 * Math.max(0, sq) * 4}) scale(${1.15 * (1 + sq)} ${1.15 * (1 - sq)})`}>
                <g transform="translate(0 0)"><Bell t={t} mood={t > T.weighs ? 'strain' : 'happy'} /></g>
                {t > T.weighs + 0.3 && <SweatDrop x={-150} y={60 + 120 * (((t - T.weighs - 0.3) * 0.8) % 1)} s={0.9} />}
              </g>
              {t > T.weighs && t < T.weighs + 0.5 && [[-1, 0], [1, 0]].map(([d], i) => <path key={i} d={`M ${470 + d * 300} 1540 l ${d * 60} -30 M ${470 + d * 300} 1520 l ${d * 70} -70`} stroke={INK} strokeWidth={8} strokeLinecap="round" />)}
              <Sticker t={t} t0={T.weighs + 0.75} x={540} y={640} text="13+ TONNES" size={92} fill="#E5414A" />
            </g>
          );
        })()}
        {scene === 'london' && (() => {
          const k = prog(t, sLondon, sLondon + 0.7);
          return (
            <g>
              <rect width={W} height={H} fill="#A8DCFF" />
              <ellipse cx={200 + 20 * Math.sin(t * 0.3)} cy={830} rx={120} ry={40} fill="#fff" />
              <Layer cam={keys(t, [[sLondon, 540, 1060, 1.12], [sName, 540, 1000, 1]])}>
                <Rings t={t} t0={T.london - 0.1} x={760} y={1050} n={4} max={620} />
                <Skyline t={t} k={k} />
                <g transform={`translate(760 ${1600 + 300 * (1 - k)}) scale(0.42)`}><Tower t={t} /></g>
                {t > T.london && [0, 1, 2].map((i) => <Bird key={i} t={t + i} x={760 - 100 + i * 70 - (t - T.london) * (200 + i * 50)} y={1000 - i * 30 - (t - T.london) * (180 + i * 40)} />)}
              </Layer>
              <Label x={540} y={620} size={56} s={pop(t, T.london, 12, 6)} color="#fff">RINGING OVER LONDON</Label>
              <Sticker t={t} t0={tSince} x={540} y={1740} text="SINCE 1859" size={90} fill="#2C7BE5" rot={-4} />
            </g>
          );
        })()}
        {scene === 'name' && (() => {
          const flip = prog(t, T.renamed - 0.2, T.renamed + 0.2);
          const sy = Math.max(0.02, Math.abs(Math.cos(flip * Math.PI)));
          const txt = t < T.clock ? '? ? ?' : flip < 0.5 ? 'CLOCK TOWER' : 'ELIZABETH TOWER';
          return (
            <g>
              <rect width={W} height={H} fill="#FFD9B8" />
              <Layer cam={keys(t, [[sName, 540, 1200, 1.15], [T.clock, 540, 1000, 1], [sJub, 540, 990, 1.03]])}>
                <rect x={-400} y={1460} width={1880} height={700} fill="#8CCB62" stroke={INK} strokeWidth={LW} />
                <g transform="translate(540 1470) scale(0.45)"><Tower t={t} /></g>
                {t > T.renamed && Array.from({length: 6}).map((_, i) => <g key={i} transform={`translate(${540 + 340 * Math.cos(i * 1.05 + t)} ${1120 + 300 * Math.sin(i * 1.05 + t)}) scale(${0.6 * pop(t, T.renamed + i * 0.05, 12, 6)})`}><path d="M 0 -40 Q 7 -7 40 0 Q 7 7 0 40 Q -7 7 -40 0 Q -7 -7 0 -40 Z" fill="#FFF7C2" stroke={INK} strokeWidth={5} /></g>)}
                <g transform={`translate(860 ${1150 + 6 * Math.sin(t * 2)}) rotate(6) scale(${pop(t, tYear, 12, 6)})`}>
                  <rect x={-110} y={-110} width={220} height={230} rx={18} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <rect x={-110} y={-110} width={220} height={66} rx={18} fill="#E5414A" stroke={INK} strokeWidth={LW} />
                  <path d="M -50 -130 L -50 -90 M 50 -130 L 50 -90" stroke={INK} strokeWidth={14} strokeLinecap="round" />
                  <Label x={0} y={60} size={66} color="#2C7BE5">2012</Label>
                </g>
              </Layer>
              <g transform={`translate(540 1610) scale(${pop(t, sName + 0.5, 12, 6)} ${pop(t, sName + 0.5, 12, 6) * sy})`}>
                <rect x={-370} y={-80} width={740} height={150} rx={20} fill="#24406E" stroke={INK} strokeWidth={LW} />
                <rect x={-350} y={-62} width={700} height={114} rx={12} fill="none" stroke={GOLD} strokeWidth={6} />
                <g transform={`scale(${t < T.clock ? 1 : pop(t, T.clock, 12, 6)})`}><Label x={0} y={24} size={66} color={GOLD}>{txt}</Label></g>
              </g>
              {t < T.renamed ? <Label x={540} y={500} size={76} s={pop(t, sName + 0.85, 12, 6)} color="#fff">AND THE TOWER?</Label>
                : <Label x={540} y={500} size={70} s={pop(t, T.renamed, 12, 6)} color="#FFE45C">RENAMED IN 2012</Label>}
            </g>
          );
        })()}
        {scene === 'jubilee' && (
          <g>
            <rect width={W} height={H} fill="#5B3A8C" />
            <g transform={`translate(540 1180) rotate(${t * 10})`}>{Array.from({length: 14}).map((_, i) => <path key={i} transform={`rotate(${i * (360 / 14)})`} d="M 0 0 L 120 -1600 L -120 -1600 Z" fill="#6B4A9C" />)}</g>
            <Bunting t={t} y={720} k={prog(t, sJub, sJub + 0.6)} ph={0} />
            <Bunting t={t} y={1420} k={prog(t, sJub + 0.2, sJub + 0.8)} ph={1.5} />
            {Array.from({length: 22}).map((_, i) => {
              const y = 760 + ((t * 260 + i * 97) % 820);
              return <rect key={i} x={(i * 151) % W} y={y} width={18} height={30} fill={['#E5414A', '#fff', '#2C7BE5', '#FFE45C'][i % 4]} stroke={INK} strokeWidth={3} transform={`rotate(${t * 200 + i * 40} ${(i * 151) % W + 9} ${y + 15})`} opacity={prog(t, T.queen, T.queen + 0.3)} />;
            })}
            <g transform={`translate(540 ${1200 + 14 * Math.sin(t * 2.2)}) rotate(${4 * Math.sin(t * 1.7)}) scale(${1.1 * pop(t, T.queen, 10, 6)})`}><Crown t={t} /></g>
            {[[160, 1020], [920, 980], [150, 1300], [930, 1320]].map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y}) rotate(45) scale(${pop(t, T.queen + 0.2 + i * 0.1, 12, 6) * (0.8 + 0.2 * Math.sin(t * 5 + i))})`}>
                <rect x={-26} y={-26} width={52} height={52} fill="#BFF1FF" stroke={INK} strokeWidth={6} />
              </g>
            ))}
            <Label x={540} y={620} size={66} s={pop(t, T.queen, 12, 6)} color="#FFE45C">DIAMOND JUBILEE</Label>
            <Label x={540} y={1760} size={70} s={pop(t, T.queen + 0.3, 12, 6)} color="#fff">FOR THE QUEEN</Label>
          </g>
        )}
        {scene === 'bong' && (() => {
          const strike = (t0: number) => clamp(1 - Math.abs(t - t0) / 0.12);
          const back = prog(t, sBong, T.bongs - 0.25);
          const ang = t < T.bongs ? lerp(0, -55, back) : -55 * (1 - prog(t, T.bongs - 0.25, T.bongs, (u) => u * u)) + 0;
          const hammerAng = t < T.bongs - 0.25 ? ang : t < T.bongs + 0.2 ? lerp(-55, 0, prog(t, T.bongs - 0.25, T.bongs, (u) => u * u)) : -25 * prog(t, T.bongs + 0.2, T.bongs + 0.6);
          const wob = t > T.bongs ? 5 * Math.exp(-2.5 * (t - T.bongs)) * Math.sin((t - T.bongs) * 22) : 0;
          const [sx, sy] = shake(t, 14 * strike(T.bongs + 0.05) + 6 * clamp(1 - (t - T.bongs) * 2) * (t > T.bongs ? 1 : 0));
          return (
            <g>
              <g transform={`translate(${sx} ${sy})`}>
                <Layer cam={keys(t, [[sBong, 540, 1080, 0.92], [T.bongs, 540, 1060, 1.02], [T.card, 540, 1060, 1.06]])}>
                  <Belfry t={t} />
                  <Rings t={t} t0={T.bongs} x={540} y={1100} n={5} max={700} />
                  <g transform={`translate(540 760) rotate(${wob + 1.5 * Math.sin(t * 1.6)}) scale(1.45)`}>
                    <Bell t={t} mood={t > T.bongs && t < T.bongs + 1.2 ? 'bong' : 'happy'} tag={1} tagSwing={6 * Math.sin(t * 2) + wob * 3} />
                  </g>
                  {/* hammer: pivot outside the lip, strikes the bell's rim */}
                  <g transform={`translate(1010 1170) rotate(${hammerAng})`}>
                    <path d="M 0 0 L -150 150" stroke={INK} strokeWidth={30} strokeLinecap="round" /><path d="M 0 0 L -150 150" stroke="#8A5A30" strokeWidth={16} strokeLinecap="round" />
                    <rect x={-200} y={130} width={80} height={56} rx={12} transform="rotate(45 -160 158)" fill="#7F8C99" stroke={INK} strokeWidth={LW} />
                    <circle r={22} fill="#7F8C99" stroke={INK} strokeWidth={7} />
                  </g>
                </Layer>
              </g>
              {t < T.bongs ? <Label x={540} y={620} size={62} s={pop(t, sBong + 0.1, 12, 6)} color="#fff">HEAR THOSE BONGS?</Label>
                : <Sticker t={t} t0={T.bongs} x={540} y={650} text="BONG!" size={120} fill="#FFB938" color="#fff" rot={-6} />}
              <Label x={540} y={1760} size={70} s={pop(t, lerp(T.bongs, T.vend, 0.6), 12, 6)} color="#FFE45C">THAT&apos;S BIG BEN!</Label>
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="27-big-ben" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
