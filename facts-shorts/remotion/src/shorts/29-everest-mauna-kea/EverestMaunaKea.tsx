import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Cloud, SharkFin, SweatDrop, clamp, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer, wavePath} from '../../lib/short';

// gentle caption pop (small overshoot so wide captions stay inside the frame)
const pk = (t: number, t0: number) => pop(t, t0, 10, 8);
const fmt = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// World: 1 px = 10 m vertically. Sea level at y = SL.
// Everest summit 8,849 m above sea level; Mauna Kea 4,207 m above sea level and ~10,210 m from its base on the ocean floor.
const SL = 1250, EX = 300, MX = 2300;
const EV_H = 885, MK_UP = 421, MK_DOWN = 600; // 4,207 m up + ~6,000 m down = over 10,000 m

type MMood = 'smug' | 'worried' | 'grin' | 'shy' | 'sad';
const MFace: React.FC<{t: number; mood: MMood; lid: string; look?: [number, number]}> = ({t, mood, lid, look = [0, 0]}) => {
  const blink = t % 3.4 < 0.12;
  const [lx, ly] = look;
  const brows: Record<MMood, string[]> = {
    smug: ['M -86 -74 Q -54 -66 -24 -72', 'M 24 -80 Q 54 -100 86 -84'],
    worried: ['M -86 -70 Q -56 -80 -26 -96', 'M 26 -96 Q 56 -80 86 -70'],
    grin: ['M -86 -84 Q -54 -104 -24 -86', 'M 24 -86 Q 54 -104 86 -84'],
    shy: ['M -84 -80 Q -54 -90 -26 -82', 'M 26 -82 Q 54 -90 84 -80'],
    sad: ['M -86 -72 Q -56 -82 -26 -94', 'M 26 -94 Q 56 -82 86 -72'],
  };
  const wob = Math.sin(t * 16) * 3;
  const mouth = {
    smug: <path d="M -46 58 Q 4 80 52 44" stroke={INK} strokeWidth={9} fill="none" strokeLinecap="round" />,
    worried: <path d={`M -40 ${66 + wob} q 10 -10 20 0 q 10 10 20 0 q 10 -10 20 0 q 10 10 20 0`} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />,
    grin: <g><path d="M -58 46 Q 0 120 58 46 Z" fill={INK} /><path d="M -46 52 L 46 52" stroke="#fff" strokeWidth={10} /><ellipse cx={0} cy={86} rx={20} ry={9} fill="#F07A8A" /></g>,
    shy: <path d="M -26 60 Q 0 76 26 60" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />,
    sad: <path d="M -40 76 Q 0 48 40 76" stroke={INK} strokeWidth={9} fill="none" strokeLinecap="round" />,
  }[mood];
  return (
    <g>
      {(mood === 'shy' || mood === 'grin') && <g opacity={0.5}><ellipse cx={-92} cy={30} rx={26} ry={14} fill="#FF7F9F" /><ellipse cx={92} cy={30} rx={26} ry={14} fill="#FF7F9F" /></g>}
      {[-1, 1].map((sd) => (
        <g key={sd}>
          <ellipse cx={sd * 54} cy={-20} rx={30} ry={blink ? 4 : 36} fill="#fff" stroke={INK} strokeWidth={7} />
          {!blink && <circle cx={sd * 54 + lx} cy={-14 + ly} r={14} fill={INK} />}
          {!blink && <circle cx={sd * 54 + lx + 5} cy={-20 + ly} r={4} fill="#fff" />}
          {!blink && mood === 'smug' && <path d={`M ${sd * 54 - 33} -20 A 33 38 0 0 1 ${sd * 54 + 33} -20 Z`} fill={lid} stroke={INK} strokeWidth={7} />}
        </g>
      ))}
      {brows[mood].map((d, i) => <path key={i} d={d} stroke={INK} strokeWidth={9} fill="none" strokeLinecap="round" />)}
      {mouth}
      {(mood === 'worried' || mood === 'sad') && <SweatDrop x={100} y={-80 + 30 * ((t * 0.8) % 1)} s={1.1} />}
    </g>
  );
};

const evPts = [[-650, 0], [-470, -300], [-380, -250], [-220, -600], [-130, -540], [0, -885], [95, -700], [175, -765], [310, -430], [390, -480], [650, 0]];
const poly = (pts: number[][], sx = 1, sy = 1) => 'M ' + pts.map(([x, y]) => `${x * sx} ${y * sy}`).join(' L ') + ' Z';

// Everest, origin = middle of its base at sea level
const Everest: React.FC<{t: number; mood: MMood; sx?: number; sy?: number; droop?: number}> = ({t, mood, sx = 1, sy = 1, droop = 0}) => {
  const wave = (k: number) => 12 * Math.sin(t * 6 + k) * (1 - droop);
  return (
    <g>
      <path d={poly(evPts, sx, sy)} fill="#8E7F74" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d={poly([[0, -885], [95, -700], [175, -765], [310, -430], [390, -480], [650, 0], [180, 0], [60, -420]], sx, sy)} fill="#7A6C62" />
      <path d={poly([[0, -885], [95, -700], [62, -688], [30, -722], [0, -684], [-32, -716], [-70, -700]], sx, sy)} fill="#fff" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d={poly([[126, -725], [175, -765], [209, -680], [186, -694], [160, -672], [140, -700]], sx, sy)} fill="#fff" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d={poly([[-260, -510], [-220, -600], [-162, -566], [-190, -540], [-215, -555], [-240, -515]], sx, sy)} fill="#fff" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d={poly(evPts, sx, sy)} fill="none" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      {/* summit flag */}
      <g transform={`translate(0 ${-885 * sy})`}>
        <path d="M 0 0 L 0 -150" stroke={INK} strokeWidth={14} strokeLinecap="round" />
        <path d="M 0 0 L 0 -150" stroke="#D9D9D9" strokeWidth={6} strokeLinecap="round" />
        <g transform={`rotate(${droop * 70} 4 -146)`}>
          <path d={`M 4 -146 Q 50 ${-158 + wave(0)} 100 ${-146 + wave(1)} L 100 ${-90 + wave(2)} Q 50 ${-102 + wave(1)} 4 -92 Z`} fill="#E5414A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <path d={`M 40 ${-128 + wave(1) * 0.5} l 8 14 l 14 2 l -10 10 l 3 14 l -13 -7 l -13 7 l 3 -14 l -10 -10 l 14 -2 Z`} fill="#FFE45C" transform="scale(0.8) translate(14 -28)" />
        </g>
      </g>
      <g transform={`translate(${20 * sx} ${-330 * sy}) scale(${Math.min(1, sx * 1.6)})`}><MFace t={t} mood={mood} lid="#8E7F74" /></g>
    </g>
  );
};

const mkPath = 'M -560 600 C -420 380 -300 -200 -110 -395 Q -60 -421 -30 -421 L -14 -410 L 14 -410 L 30 -421 Q 60 -421 110 -395 C 300 -200 420 380 560 600 Z';
// Mauna Kea, origin = its sea-level point under the summit (summit at -421, ocean-floor base at +600)
const MaunaKea: React.FC<{t: number; mood: MMood; id: string; look?: [number, number]; under?: number; sx?: number; sy?: number}> = ({t, mood, id, look, under = 1, sx = 1, sy = 1}) => (
  <g>
    <g transform={`scale(${sx} ${sy})`}>
    <defs><clipPath id={id}><rect x={-700} y={-600} width={1400} height={600} /></clipPath></defs>
    <path d={mkPath} fill="#5E5A6E" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -380 560 C -300 380 -200 200 -120 120" stroke="#6E6A80" strokeWidth={30} fill="none" strokeLinecap="round" opacity={under} />
    {[[-200, 300], [120, 420], [260, 200], [-60, 160]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={34} ry={18} fill="#4E4A5E" opacity={under} />)}
    <g clipPath={`url(#${id})`}>
      <path d={mkPath} fill="#9C7A52" />
      <path d="M -400 0 C -300 -60 -260 -120 -230 -160 L 230 -160 C 260 -120 300 -60 400 0 Z" fill="#6FB35A" />
      <path d="M -330 -70 C -260 -150 -200 -260 -110 -350" stroke="#B89468" strokeWidth={24} fill="none" strokeLinecap="round" />
    </g>
    <path d={mkPath} fill="none" stroke={INK} strokeWidth={LW} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    {/* summit observatory domes */}
    {[-20, 22].map((x, i) => <path key={i} d={`M ${x - 15} -410 A 15 15 0 0 1 ${x + 15} -410 Z`} fill="#fff" stroke={INK} strokeWidth={5} />)}
    {/* hibiscus */}
    </g>
    <g transform={`translate(${-150 * sx} ${-250 * sy}) rotate(${t * 10}) scale(${Math.min(1, sx * 1.6)})`}>
      {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={0} cy={-20} rx={14} ry={20} fill="#FF5C8A" stroke={INK} strokeWidth={5} transform={`rotate(${a})`} />)}
      <circle r={9} fill="#FFE45C" stroke={INK} strokeWidth={4} />
    </g>
    <g transform={`translate(0 ${-210 * sy}) scale(${0.85 * Math.min(1, sx * 1.4)})`}><MFace t={t} mood={mood} lid="#9C7A52" look={look} /></g>
  </g>
);

const Ruler: React.FC<{x: number; y0: number; y1: number; k: number}> = ({x, y0, y1, k}) => {
  if (k <= 0.001) return null;
  const top = lerp(y0, y1, k);
  const ticks: number[] = [];
  for (let v = y0 - 100; v >= top; v -= 100) ticks.push(v);
  return (
    <g>
      <rect x={x - 20} y={top} width={40} height={y0 - top} fill="#FFE45C" stroke={INK} strokeWidth={7} />
      {ticks.map((v, i) => <path key={i} d={`M ${x - 20} ${v} L ${x + 8} ${v}`} stroke={INK} strokeWidth={6} />)}
      <path d={`M ${x - 40} ${top} L ${x + 40} ${top}`} stroke={INK} strokeWidth={10} strokeLinecap="round" />
    </g>
  );
};

const Fish: React.FC<{t: number; col: string; dir?: number}> = ({t, col, dir = 1}) => (
  <g transform={`scale(${dir} 1) rotate(${5 * Math.sin(t * 6)})`}>
    <path d={`M -40 0 L -70 ${-22 + 6 * Math.sin(t * 12)} L -70 ${22 + 6 * Math.sin(t * 12)} Z`} fill={col} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <ellipse cx={0} cy={0} rx={48} ry={28} fill={col} stroke={INK} strokeWidth={6} />
    <circle cx={22} cy={-6} r={7} fill="#fff" stroke={INK} strokeWidth={3} /><circle cx={24} cy={-6} r={3.5} fill={INK} />
    <path d="M 34 10 Q 40 14 44 8" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />
  </g>
);

export const EverestMaunaKea: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const aboveT = lerp(T.peak, T.hawaii, 8 / 14);
  const pokesT = lerp(T.hawaii, T.underwater, 2 / 17), fourT = lerp(T.hawaii, T.underwater, 4 / 17), butT = lerp(T.hawaii, T.underwater, 11 / 17);
  const floorT = lerp(T.base, T.beats, 4 / 14), tallT = lerp(T.base, T.beats, 12 / 14), kmT = lerp(T.beats, T.vend, 0.5);
  const scene = t < T.peak - 0.25 ? 'everest' : t < T.hawaii - 0.25 ? 'peak' : t < T.underwater - 0.25 ? 'hawaii'
    : t < T.base - 0.25 ? 'under' : t < T.beats - 0.25 ? 'base' : 'beats';
  const cues: Cue[] = [
    {f: 'rise', at: T.highest, db: -22}, {f: 'sad', at: T.tallest, db: -22},
    {f: 'whoosh', at: T.peak - 0.25, db: -24}, {f: 'tick', at: T.peak, db: -20},
    {f: 'whoosh', at: T.hawaii - 0.25, db: -22}, {f: 'pop', at: fourT, db: -20},
    {f: 'whoosh', at: T.underwater - 0.25, db: -24}, {f: 'pour', at: T.underwater, db: -22},
    {f: 'whoosh', at: T.base - 0.25, db: -24}, {f: 'rise', at: T.base, db: -22}, {f: 'ding', at: tallT, db: -18},
    {f: 'whoosh', at: T.beats - 0.25, db: -24}, {f: 'boing', at: T.beats, db: -20}, {f: 'pop', at: kmT, db: -18},
  ];

  const cam = keys(t, [
    [0, EX, 640, 1.2], [T.highest, EX, 420, 1], [T.tallest - 0.1, EX, 380, 1.1], [T.peak - 0.25, EX, 420, 1], [T.hawaii - 0.3, EX - 20, 440, 0.97],
    [T.hawaii - 0.25, EX - 20, 440, 0.97], [T.hawaii + 0.6, MX, 789, 1], [butT, MX, 800, 1.02], [T.underwater - 0.25, MX, 900, 1],
    [T.underwater + 0.5, MX, 1019, 1], [T.beats, MX, 1019, 1],
  ]);
  const waterOp = 1 - 0.68 * prog(t, T.underwater - 0.1, T.underwater + 0.6);

  const evMood: MMood = t < T.tallest ? 'smug' : t < T.peak - 0.25 ? 'worried' : t > T.peak + 1.8 ? 'smug' : 'grin';
  const mkMood: MMood = t < butT ? 'shy' : t < T.base ? 'worried' : t > tallT ? 'grin' : 'shy';
  const mkLook: [number, number] = t > butT && t < T.underwater + 0.5 ? [0, 12] : [0, 0];

  const world = () => (
    <Layer cam={cam}>
      {/* sky clouds, slow parallax */}
      {[[-200, 380], [500, 300], [1300, 420]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x + ((t * 18 + i * 40) % 300)} ${y + (cam[1] - 420) * 0.6})`}><Cloud s={1.1} /></g>
      ))}
      {/* seagulls over Hawaii, always just below the caption band */}
      {[0, 1].map((i) => {
        const f = 18 * Math.sin(t * 9 + i * 2);
        return <path key={i} d={`M -34 ${f} Q -17 -14 0 6 Q 17 -14 34 ${f}`} transform={`translate(${1980 + i * 130 + 40 * Math.sin(t * 0.8 + i)} ${cam[1] - 70 + i * 50})`} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
      })}
      {/* land under Everest, then the continental slope down to the ocean floor */}
      <path d={`M -1600 ${SL} L 1000 ${SL} L 1150 ${SL + 60} L 1500 ${SL + MK_DOWN} L 3600 ${SL + MK_DOWN} L 3600 2600 L -1600 2600 Z`} fill="#C9A86A" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d={`M -1600 ${SL} L 1000 ${SL} L 1000 ${SL + 40} L -1600 ${SL + 40} Z`} fill="#7CC960" />
      <path d={`M -1600 ${SL} L 1000 ${SL}`} stroke={INK} strokeWidth={LW} />
      <path d={`M 1500 ${SL + MK_DOWN} L 3600 ${SL + MK_DOWN} L 3600 ${SL + MK_DOWN + 30} L 1500 ${SL + MK_DOWN + 30} Z`} fill="#E8D29A" />
      <g transform={`translate(${EX} ${SL})`}><Everest t={t} mood={evMood} /></g>
      <g transform={`translate(${MX} ${SL})`}><MaunaKea t={t} mood={mkMood} id="mk29w" look={mkLook} under={1 - waterOp * 0.6} /></g>
      {/* ocean */}
      <path d={wavePath(t, SL, 16, 140, 2.2, 1060, 3700)} fill="#2E6FD1" opacity={waterOp} />
      <path d={wavePath(t, SL, 16, 140, 2.2, 1060, 3700)} fill="none" stroke={INK} strokeWidth={7} opacity={0.9} />
      {/* sea life */}
      {[[0, 1700, '#FFB84D', 1], [1, 1560, '#FF6FA5', -1], [2, 1760, '#6FDC8C', 1], [3, 1460, '#A98BFF', -1]].map(([i, y, c, d]) => {
        const x = d === 1 ? 1600 + ((t * 90 + (i as number) * 330) % 1500) : 3100 - ((t * 80 + (i as number) * 410) % 1500);
        return <g key={i as number} transform={`translate(${x} ${(y as number) + 14 * Math.sin(t * 2 + (i as number))})`}><Fish t={t + (i as number)} col={c as string} dir={d as number} /></g>;
      })}
      {(scene === 'hawaii') && <g transform={`translate(${lerp(2950, 1700, prog(t, T.hawaii, T.underwater, (u) => u))} ${SL + 8})`}><SharkFin /></g>}
      {/* rulers */}
      {(scene === 'peak') && <Ruler x={EX - 430} y0={SL} y1={SL - EV_H} k={prog(t, T.peak, T.peak + 1.8)} />}
      {(scene === 'peak') && <path d={`M ${EX - 400} ${SL - EV_H} L ${EX - 10} ${SL - EV_H}`} stroke="#fff" strokeWidth={6} strokeDasharray="18 14" opacity={prog(t, T.peak + 1.6, T.peak + 2)} />}
      {(scene === 'peak') && <path d={`M -1600 ${SL} L 1000 ${SL}`} stroke="#2C7BE5" strokeWidth={10} strokeDasharray="30 20" opacity={prog(t, aboveT - 0.2, aboveT + 0.2)} />}
      {(scene === 'hawaii') && <Ruler x={MX - 380} y0={SL} y1={SL - MK_UP} k={prog(t, pokesT, fourT + 0.4)} />}
      {(scene === 'base') && <Ruler x={MX + 430} y0={SL + MK_DOWN} y1={SL - MK_UP} k={prog(t, T.base, tallT, (u) => u)} />}
      {(scene === 'base') && <path d={`M 1500 ${SL + MK_DOWN} L 3600 ${SL + MK_DOWN}`} stroke="#FFE45C" strokeWidth={14} opacity={clamp(1 - Math.abs(t - floorT - 0.3) * 1.2)} />}
    </Layer>
  );

  const beatsScene = () => {
    const BASE = 1760, k = 0.95;
    const inE = prog(t, T.beats - 0.3, T.beats + 0.05), inM = prog(t, T.beats - 0.2, T.beats + 0.2);
    const mx = lerp(1500, 780, inM);
    const evTop = BASE - EV_H * k, mkTop = BASE - (MK_UP + MK_DOWN) * k, mkSea = BASE - MK_DOWN * k;
    const line = prog(t, T.beats + 0.3, T.beats + 0.8);
    return (
      <g>
        <defs><linearGradient id="sky29b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7FCBFF" /><stop offset="1" stopColor="#E0F4FF" /></linearGradient></defs>
        <rect width={W} height={H} fill="url(#sky29b)" />
        <g transform={`translate(${((t * 20) % 400) - 100} 400)`}><Cloud s={0.9} /></g>
        <g transform={`translate(${lerp(-400, 280, inE)} ${BASE})`}><Everest t={t} mood={t > T.beats + 0.2 ? 'sad' : 'worried'} sx={0.5} sy={k} droop={prog(t, T.beats + 0.2, T.beats + 0.8)} /></g>
        <g transform={`translate(${mx} ${mkSea})`}><MaunaKea t={t} mood="grin" id="mk29b" sx={0.5} sy={k} /></g>
        <path d={wavePath(t, mkSea, 10, 90, 2.2, mx - 170, mx + 500)} fill="#2E6FD1" opacity={0.32} />
        <path d={wavePath(t, mkSea, 10, 90, 2.2, mx - 170, mx + 500)} fill="none" stroke={INK} strokeWidth={5} opacity={0.8 * inM} />
        <path d={`M 0 ${BASE} L ${W} ${BASE} L ${W} ${H} L 0 ${H} Z`} fill="#C9A86A" stroke={INK} strokeWidth={LW} />
        {/* height comparison */}
        <path d={`M 280 ${evTop} L 1050 ${evTop}`} stroke="#fff" strokeWidth={6} strokeDasharray="18 14" opacity={line} />
        <path d={`M 780 ${mkTop} L 1050 ${mkTop}`} stroke="#fff" strokeWidth={6} strokeDasharray="18 14" opacity={line} />
        <g opacity={prog(t, kmT - 0.3, kmT)}>
          <path d={`M 1040 ${mkTop} L 1040 ${evTop}`} stroke={INK} strokeWidth={22} strokeLinecap="round" />
          <path d={`M 1040 ${mkTop} L 1040 ${evTop}`} stroke="#FFE45C" strokeWidth={10} strokeLinecap="round" />
        </g>
        <Label x={280} y={evTop - 175} size={50} s={pk(t, T.beats + 0.3)} color="#fff">8,849 M</Label>
        <Label x={780} y={mkTop - 45} size={50} s={pk(t, T.beats + 0.5)} color="#fff">10,000+ M</Label>
        <Label x={540} y={640} size={76} s={pk(t, T.beats)} color="#FFE45C">BEATS EVEREST!</Label>
        <Sticker t={t} t0={kmT} x={540} y={1640} text="+1 KM" size={96} fill="#E5414A" />
      </g>
    );
  };

  const evVal = prog(t, T.peak, T.peak + 1.8);
  const mkVal = prog(t, T.base, tallT, (u) => u);
  return (
    <AbsoluteFill style={{background: '#7FCBFF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <defs><linearGradient id="sky29" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6FC0FF" /><stop offset="1" stopColor="#D8F2FF" /></linearGradient></defs>
        <rect width={W} height={H} fill="url(#sky29)" />
        {scene !== 'beats' && world()}
        {scene === 'everest' && (
          <g>
            <Label x={540} y={640} size={70} s={pk(t, T.highest)} color="#FFE45C">HIGHEST MOUNTAIN</Label>
            {t > T.tallest && [0, 1].map((i) => <Label key={i} x={300 + i * 480} y={1120 - 10 * Math.sin(t * 5 + i)} size={90} s={pk(t, T.tallest + 0.2 + i * 0.15)} rot={i ? 12 : -12} color="#fff">?</Label>)}
            <Sticker t={t} t0={T.tallest} x={540} y={1650} text="NOT THE TALLEST" size={68} fill="#E5414A" />
          </g>
        )}
        {scene === 'peak' && (
          <g>
            <Label x={540} y={640} size={96} s={pk(t, T.peak)} color="#fff">{evVal < 1 ? fmt(Math.floor(evVal * 884.9) * 10) : '8,849'} M</Label>
            <Sticker t={t} t0={aboveT} x={540} y={1660} text="ABOVE SEA LEVEL" size={66} fill="#2C7BE5" />
          </g>
        )}
        {scene === 'hawaii' && (
          <g>
            <Label x={540} y={640} size={66} s={pk(t, T.hawaii)} color="#FFE45C">MAUNA KEA, HAWAII</Label>
            <Sticker t={t} t0={fourT} x={540} y={1640} text="4,207 M ABOVE SEA" size={60} fill="#E5414A" />
          </g>
        )}
        {scene === 'under' && <Label x={540} y={640} size={66} s={pk(t, T.underwater)} color="#fff">HIDDEN UNDERWATER</Label>}
        {scene === 'base' && (
          <g>
            <Label x={540} y={640} size={96} s={pk(t, T.base)} color="#FFE45C">{mkVal < 1 ? fmt(Math.floor(mkVal * 999.9) * 10) : '10,000+'} M</Label>
            <Sticker t={t} t0={floorT} x={520} y={1700} text="FROM THE OCEAN FLOOR" size={54} fill="#2C7BE5" />
          </g>
        )}
        {scene === 'beats' && beatsScene()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="29-everest-mauna-kea" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
