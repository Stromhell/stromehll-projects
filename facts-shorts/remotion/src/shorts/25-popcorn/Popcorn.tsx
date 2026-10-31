import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, clamp, lerp, prog, pop, keys, shake} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const KPATH = 'M 0 -150 C 125 -150 150 10 50 130 Q 0 175 -50 130 C -150 10 -125 -150 0 -150 Z';
const HULL = '#E08A1E', KCOL = '#F5B335', STARCH = '#FFF3C9';
type Ex = 'happy' | 'worried' | 'strain' | 'calm';

const Face: React.FC<{ex: Ex; t: number; y?: number; gap?: number}> = ({ex, t, y = -85, gap = 40}) => {
  const blink = (t % 3.1) < 0.12;
  const eyes = [-gap, gap].map((x, i) => {
    if (ex === 'strain') return <path key={i} d={i ? `M ${x + 12} ${y - 10} L ${x - 8} ${y} L ${x + 12} ${y + 10}` : `M ${x - 12} ${y - 10} L ${x + 8} ${y} L ${x - 12} ${y + 10}`} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
    if (ex === 'happy') return <path key={i} d={`M ${x - 13} ${y + 5} Q ${x} ${y - 12} ${x + 13} ${y + 5}`} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />;
    return <g key={i}><ellipse cx={x} cy={y} rx={10} ry={blink ? 1.5 : ex === 'worried' ? 16 : 13} fill={INK} />{!blink && <circle cx={x + 3} cy={y - 5} r={3.5} fill="#fff" />}</g>;
  });
  const m = y + 42;
  const mouth = ex === 'happy' ? <g><path d={`M -24 ${m - 6} Q 0 ${m + 30} 24 ${m - 6} Z`} fill={INK} /><ellipse cx={0} cy={m + 8} rx={10} ry={5} fill="#F07A8A" /></g>
    : ex === 'strain' ? <g><rect x={-24} y={m - 12} width={48} height={22} rx={8} fill="#fff" stroke={INK} strokeWidth={6} /><path d={`M -8 ${m - 12} L -8 ${m + 10} M 8 ${m - 12} L 8 ${m + 10}`} stroke={INK} strokeWidth={4} /></g>
    : ex === 'worried' ? <path d={`M -22 ${m + Math.sin(t * 16) * 2} q 7 -7 14 0 q 7 7 14 0 q 7 -7 14 0`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
    : <path d={`M -18 ${m - 4} Q 0 ${m + 10} 18 ${m - 4}`} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />;
  return <g>{eyes}{mouth}<ellipse cx={-gap - 22} cy={y + 32} rx={14} ry={8} fill="#F58A7A" opacity={0.6} /><ellipse cx={gap + 22} cy={y + 32} rx={14} ry={8} fill="#F58A7A" opacity={0.6} /></g>;
};

const Spiral: React.FC<{c?: string}> = ({c = '#fff'}) => (
  <g>
    <path d="M -20 0 A 20 20 0 1 1 0 20 A 11 11 0 1 1 -9 9" stroke="#8A97A6" strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d="M -20 0 A 20 20 0 1 1 0 20 A 11 11 0 1 1 -9 9" stroke={c} strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>
);

const Drop: React.FC<{t: number; s: number}> = ({t, s}) => (s <= 0.01 ? null : (
  <g transform={`scale(${s})`}>
    <path d="M 0 -60 C 18 -30 40 -8 40 18 C 40 42 22 56 0 56 C -22 56 -40 42 -40 18 C -40 -8 -18 -30 0 -60 Z" fill="#4FB4F5" stroke={INK} strokeWidth={7} />
    <ellipse cx={-14} cy={10} rx={7} ry={11} fill="#BFE6FF" />
    <g transform="translate(0 -50) scale(0.45)"><Face ex="calm" t={t + 0.7} y={110} gap={30} /></g>
  </g>
));

// kernel: whole, or cut away to show the inside
const Kernel: React.FC<{t: number; cut?: number; drop?: number; steam?: number; press?: number; ex?: Ex; glow?: number}> =
  ({t, cut = 0, drop = 0, steam = 0, press = 0, ex = 'happy', glow = 0}) => (
    <g>
      <path d={KPATH} fill={cut > 0.5 ? HULL : KCOL} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      {glow > 0.01 && <path d={KPATH} fill="none" stroke="#FFE45C" strokeWidth={22} opacity={glow} />}
      {cut <= 0.5 && <g>
        <path d="M -50 130 Q 0 175 50 130 Q 0 112 -50 130 Z" fill="#F6E3A8" stroke={INK} strokeWidth={6} />
        <ellipse cx={-55} cy={-70} rx={18} ry={38} fill="#FFD77A" transform="rotate(20 -55 -70)" />
      </g>}
      {cut > 0.01 && (
        <g opacity={clamp(cut * 2)}>
          <path d={KPATH} transform="translate(0 -4) scale(0.78)" fill={STARCH} stroke={INK} strokeWidth={5} />
          <g clipPath="url(#kin)">
            {Array.from({length: 7}).map((_, i) => {
              const a = (i / 7) * Math.PI * 2 + t * (1.5 + 4 * press);
              const r = 52 + 10 * Math.sin(t * 3 + i);
              return <g key={i} transform={`translate(${Math.cos(a) * r} ${12 + Math.sin(a) * r * 1.2}) rotate(${t * 200 + i * 50}) scale(${steam * (0.9 + 0.2 * Math.sin(t * 5 + i))})`}><Spiral /></g>;
            })}
          </g>
          <g transform="translate(0 30)"><Drop t={t} s={drop * (1 - steam)} /></g>
        </g>
      )}
      {press > 0.01 && Array.from({length: 6}).map((_, i) => {
        const a = (i / 6) * 360 + 30, l = 30 + 14 * Math.sin(t * 14 + i);
        return <g key={i} transform={`translate(0 10) rotate(${a})`} opacity={press}>
          <path d={`M 0 -62 L 0 ${-62 - l}`} stroke="#E5414A" strokeWidth={9} strokeLinecap="round" />
          <path d={`M -12 ${-56 - l} L 0 ${-74 - l} L 12 ${-56 - l} Z`} fill="#E5414A" />
        </g>;
      })}
      <Face ex={ex} t={t} />
    </g>
  );

const PUFF: number[][] = [[0, -70, 92], [-92, -20, 78], [92, -25, 82], [-55, 65, 78], [58, 62, 82], [0, 5, 92], [-120, -95, 52], [110, -110, 58], [-10, -150, 55]];
const Puff: React.FC<{t: number; face?: boolean; ex?: Ex; tint?: string; foam?: number}> = ({t, face = true, ex = 'happy', tint = '#FFFDF5', foam = 0}) => (
  <g>
    <path d="M -60 120 L -30 175 L 10 130 L 50 170 L 70 118 Z" fill={HULL} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    {PUFF.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r + LW} fill={INK} />)}
    {PUFF.map(([x, y, r], i) => <circle key={'w' + i} cx={x} cy={y} r={r} fill={tint} />)}
    {PUFF.map(([x, y, r], i) => <circle key={'s' + i} cx={x + r * 0.25} cy={y + r * 0.3} r={r * 0.55} fill="#F4E6C4" opacity={0.6} />)}
    {foam > 0.01 && [[-80, -60, 12], [70, -80, 10], [-40, 90, 9], [100, 40, 13], [20, -130, 8], [-120, 10, 9], [40, 100, 7], [-90, -120, 7]].map(([x, y, r], i) => (
      <circle key={'f' + i} cx={x} cy={y} r={r * clamp(foam * 1.5 - i * 0.06)} fill="none" stroke="#C9B48A" strokeWidth={4} />
    ))}
    {face && <g transform="translate(0 70)"><Face ex={ex} t={t} /></g>}
  </g>
);

const PanBack: React.FC<{w: number}> = ({w}) => (
  <g>
    <rect x={-w / 2 - 300} y={-26} width={320} height={44} rx={20} fill="#7A4E2C" stroke={INK} strokeWidth={LW} />
    <ellipse cx={0} cy={0} rx={w / 2} ry={34} fill="#59636F" stroke={INK} strokeWidth={LW} />
    <ellipse cx={0} cy={4} rx={w / 2 - 22} ry={22} fill="#2A3038" />
  </g>
);
const PanFront: React.FC<{w: number}> = ({w}) => (
  <g>
    <path d={`M ${-w / 2} 0 A ${w / 2} 34 0 0 0 ${w / 2} 0 L ${w / 2 - 40} 110 Q 0 132 ${-w / 2 + 40} 110 Z`} fill="#3E4651" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d={`M ${-w / 2 + 40} 50 Q 0 70 ${w / 2 - 60} 50`} stroke="#5A6470" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>
);
const Flames: React.FC<{t: number; k: number; w: number}> = ({t, k, w}) => (
  <g>
    <rect x={-w / 2 + 40} y={226} width={w - 80} height={24} rx={10} fill="#2A3038" stroke={INK} strokeWidth={7} />
    {k > 0.01 && Array.from({length: 7}).map((_, i) => {
      const x = lerp(-w / 2 + 80, w / 2 - 80, i / 6), f = k * (0.85 + 0.2 * Math.sin(t * 13 + i * 2));
      return (
        <g key={i} transform={`translate(${x} 228) scale(${0.9 + 0.1 * Math.sin(t * 9 + i)} ${f})`}>
          <path d="M 0 0 Q -38 -40 -6 -100 Q 4 -60 18 -70 Q 38 -30 0 0 Z" fill="#FF7A2E" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M 0 -6 Q -16 -30 0 -60 Q 16 -30 0 -6 Z" fill="#FFE45C" />
        </g>
      );
    })}
  </g>
);

const Kitchen: React.FC<{counter: number}> = ({counter}) => (
  <g>
    <rect width={W} height={H} fill="#FFE6BA" />
    {Array.from({length: 8}).map((_, i) => <path key={'v' + i} d={`M ${i * 150} 0 L ${i * 150} ${counter}`} stroke="#F2CF96" strokeWidth={6} />)}
    {Array.from({length: 14}).map((_, i) => <path key={'h' + i} d={`M 0 ${i * 150} L ${W} ${i * 150}`} stroke="#F2CF96" strokeWidth={6} />)}
    <rect x={-20} y={counter} width={W + 40} height={H - counter + 20} fill="#5E9BD6" stroke={INK} strokeWidth={LW} />
    <rect x={-20} y={counter} width={W + 40} height={34} fill="#7DB4E8" stroke={INK} strokeWidth={LW} />
  </g>
);

const Gauge: React.FC<{v: number}> = ({v}) => {
  const ang = (x: number) => -120 + ((x - 1) / 9) * 240;
  return (
    <g>
      <rect x={-22} y={140} width={44} height={70} fill="#9AA6B2" stroke={INK} strokeWidth={7} />
      <circle r={150} fill="#fff" stroke={INK} strokeWidth={LW + 3} />
      <path d={`M ${Math.sin((ang(7) * Math.PI) / 180) * 118} ${-Math.cos((ang(7) * Math.PI) / 180) * 118} A 118 118 0 0 1 ${Math.sin((ang(10) * Math.PI) / 180) * 118} ${-Math.cos((ang(10) * Math.PI) / 180) * 118}`} stroke="#E5414A" strokeWidth={20} fill="none" />
      {Array.from({length: 10}).map((_, i) => <path key={i} d="M 0 -128 L 0 -104" stroke={INK} strokeWidth={6} transform={`rotate(${ang(i + 1)})`} />)}
      <text x={-82} y={86} fontFamily="Anton, 'Arial Black', sans-serif" fontSize={34} textAnchor="middle" fill={INK}>1</text>
      <text x={82} y={86} fontFamily="Anton, 'Arial Black', sans-serif" fontSize={34} textAnchor="middle" fill={INK}>10</text>
      <g transform={`rotate(${ang(v)})`}>
        <path d="M -9 10 L 0 -112 L 9 10 Z" fill="#E5414A" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      </g>
      <circle r={18} fill={INK} />
      <Label x={0} y={92} size={46} color="#FFE45C">{`${Math.round(v)}x`}</Label>
    </g>
  );
};

export const Popcorn: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const shellT = lerp(T.water, T.heat, 0.85);
  const steamT = lerp(T.heat, T.pressure, 0.6);
  const coolsT = lerp(T.foam, T.fluffy, 0.7);
  const kernelT = lerp(T.fluffy, T.vend, 0.6);
  const insideT = lerp(T.fluffy, T.vend, 0.45);
  const scene = t < T.water - 0.25 ? 'intro' : t < T.heat - 0.25 ? 'inside' : t < T.bursts - 0.25 ? 'cook' : t < T.fluffy - 0.25 ? 'burst' : 'fluffy';
  const cues: Cue[] = [
    {f: 'whoosh', at: 0.15, db: -24}, {f: 'pop', at: T.pop, db: -18},
    {f: 'whoosh', at: T.water - 0.25, db: -24}, {f: 'plop', at: T.water, db: -20}, {f: 'knock', at: shellT, db: -20},
    {f: 'whoosh', at: T.heat - 0.25, db: -24}, {f: 'sizzle', at: T.heat, db: -24}, {f: 'rise', at: T.pressure, db: -24}, {f: 'tick', at: T.ten, db: -20},
    {f: 'crack', at: T.bursts, db: -18}, {f: 'pop', at: T.bursts + 0.05, db: -18}, {f: 'squeeze', at: T.foam, db: -22},
    {f: 'whoosh', at: T.fluffy - 0.25, db: -24}, {f: 'ding', at: insideT, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: '#FFE6BA'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <defs>
          <clipPath id="kin"><path d={KPATH} transform="translate(0 -4) scale(0.78)" /></clipPath>
          <radialGradient id="popglow" cx="0.5" cy="0.55" r="0.6"><stop offset="0" stopColor="#FFF4A8" /><stop offset="1" stopColor="#FFB53D" /></radialGradient>
        </defs>

        {scene === 'intro' && (() => {
          const jump = t - T.pop;
          return (
            <g>
              <Layer cam={keys(t, [[T.pop + 0.9, 540, 1100, 1], [T.water - 0.3, 540, 1250, 1.45]])}>
                <Kitchen counter={1580} />
                <g transform="translate(540 1350)">
                  <PanBack w={640} />
                  {[-210, -120, 120, 210].map((x, i) => <g key={x} transform={`translate(${x} ${-38 + 4 * Math.sin(t * 3 + i)}) rotate(${(i - 1.5) * 14}) scale(0.38)`}><Kernel t={t + i} ex="calm" /></g>)}
                  <g transform={`translate(0 ${-60 + 6 * Math.sin(t * 2.4)}) rotate(${4 * Math.sin(t * 1.8)}) scale(0.6)`}><Kernel t={t} ex={t > T.pop ? 'worried' : 'happy'} /></g>
                  <PanFront w={640} />
                  <Flames t={t} k={0} w={640} />
                </g>
                {jump > 0 && jump < 1.6 && (
                  <g transform={`translate(${540 + 260 * jump} ${1280 - 900 * jump + 700 * jump * jump}) rotate(${jump * 300}) scale(${0.4 * pop(t, T.pop, 14, 6)})`}><Puff t={t} /></g>
                )}
              </Layer>
              <Label x={540} y={640} size={62} s={pop(t, 0.4, 12, 6)} color="#fff">WHY DOES POPCORN POP?</Label>
              {jump > 0 && <Label x={300} y={1000} size={90} s={pop(t, T.pop, 12, 6) * (1 - prog(t, T.pop + 1.6, T.pop + 1.9))} rot={-8} color="#FFE45C">POP!</Label>}
            </g>
          );
        })()}

        {scene === 'inside' && (
          <g>
            <rect width={W} height={H} fill="#FFD27A" />
            {Array.from({length: 12}).map((_, i) => <path key={i} transform={`translate(540 1150) rotate(${i * 30 + t * 6})`} d="M 0 0 L 120 -1600 L -120 -1600 Z" fill="#FFC85A" />)}
            <ellipse cx={540} cy={1520} rx={260} ry={34} fill="#E9A944" />
            <g transform={`translate(540 ${1170 + lerp(500, 0, prog(t, T.water - 0.25, T.water + 0.15)) + 8 * Math.sin(t * 2)}) rotate(${3 * Math.sin(t * 1.4)}) scale(2)`}>
              <Kernel t={t} cut={prog(t, T.water - 0.15, T.water + 0.2)} drop={pop(t, T.water + 0.1, 12, 6)} glow={t > shellT ? Math.abs(Math.sin((t - shellT) * 6)) * (1 - prog(t, shellT + 1, shellT + 1.4)) : 0} ex="happy" />
            </g>
            <Label x={540} y={640} size={62} s={pop(t, T.water, 12, 6)} color="#fff">TINY DROP OF WATER</Label>
            {t > shellT && <g opacity={prog(t, shellT, shellT + 0.2)}><path d="M 870 1590 Q 900 1350 790 1210" stroke={INK} strokeWidth={18} fill="none" strokeLinecap="round" /><path d="M 870 1590 Q 900 1350 790 1210" stroke="#FFE45C" strokeWidth={9} fill="none" strokeLinecap="round" /></g>}
            <Sticker t={t} t0={shellT} x={540} y={1700} text="TOUGH SHELL" size={82} fill="#C2621B" />
          </g>
        )}

        {scene === 'cook' && (() => {
          const steam = prog(t, steamT - 0.3, steamT + 0.6);
          const press = prog(t, T.pressure, T.ten);
          const v = lerp(1, 10, prog(t, T.pressure, T.ten));
          const [sx, sy] = shake(t, 2 + 10 * press + 6 * prog(t, T.ten, T.bursts));
          return (
            <g>
              <Kitchen counter={1620} />
              <g transform="translate(420 1390)">
                <PanBack w={600} />
                <g transform={`translate(${sx} ${-200 + sy}) scale(${1.5 * (1 + 0.08 * press + 0.03 * Math.sin(t * 20) * press)})`}>
                  <Kernel t={t} cut={1} drop={1} steam={steam} press={press} ex={press > 0.4 ? 'strain' : steam > 0.5 ? 'worried' : 'happy'} />
                </g>
                <PanFront w={600} />
                <Flames t={t} k={pop(t, T.heat, 10, 6)} w={600} />
              </g>
              {t > T.pressure - 0.05 && <g transform={`translate(830 1060) scale(${pop(t, T.pressure, 12, 6)}) rotate(${press > 0.9 ? 3 * Math.sin(t * 30) : 0})`}><Gauge v={v} /></g>}
              <Sticker t={t} t0={T.heat} t1={T.pressure - 0.1} x={540} y={640} text="HEAT MAKES STEAM" size={68} fill="#E5414A" />
              <Sticker t={t} t0={T.pressure} x={540} y={640} text="PRESSURE BUILDS" size={70} fill="#5B3A8C" />
              <Sticker t={t} t0={T.ten} x={540} y={1760} text="10x AIR PRESSURE" size={66} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'burst' && (() => {
          const b = t - T.bursts;
          const grow = b < 0 ? 0 : 0.85 * clamp(pop(t, T.bursts, 12, 6)) + 0.25 * prog(t, T.starch - 0.2, T.starch + 0.5) + 0.2 * prog(t, T.foam - 0.2, T.foam + 0.5);
          const [sx, sy] = shake(t, b < 0 ? 14 : 18 * Math.exp(-4 * b));
          const cool = prog(t, coolsT, coolsT + 0.8);
          return (
            <g transform={`translate(${sx} ${sy})`}>
              <Kitchen counter={1650} />
              <g transform="translate(540 1420)">
                <PanBack w={640} />
                {b < 0 && <g transform="translate(0 -200) scale(1.5)"><Kernel t={t} cut={1} drop={0} steam={1} press={1} ex="strain" /></g>}
                {b >= 0 && <g transform={`translate(0 -225) scale(${grow * 1.25})`}><Puff t={t} ex={t > T.foam ? 'happy' : 'calm'} foam={prog(t, T.foam, T.foam + 0.6)} tint={cool > 0.5 ? '#FFFFFF' : '#FFFDF5'} /></g>}
                {b >= 0 && [[-1, -1], [1, -1.2], [-1.3, 0.2], [1.2, 0.3]].map(([dx, dy], i) => {
                  const u = clamp(b / 0.9);
                  return <path key={i} d="M -40 -30 Q 0 -60 40 -30 L 25 30 Q 0 40 -25 30 Z" fill={HULL} stroke={INK} strokeWidth={7}
                    transform={`translate(${dx * 330 * u} ${-200 + dy * 260 * u + 420 * u * u}) rotate(${dx * 400 * u}) scale(${1 - 0.5 * u})`} opacity={1 - prog(t, T.bursts + 0.7, T.bursts + 0.9)} />;
                })}
                <PanFront w={640} />
                <Flames t={t} k={1 - prog(t, T.foam, coolsT)} w={640} />
                {cool > 0.01 && [[-380, -380], [370, -420], [-400, -140], [390, -180]].map(([x, y], i) => (
                  <g key={i} transform={`translate(${x} ${y + 10 * Math.sin(t * 3 + i)}) rotate(${t * 60}) scale(${pop(t, coolsT + i * 0.1, 12, 6)})`}>
                    {[0, 60, 120].map((a) => <path key={a} d="M 0 -28 L 0 28" stroke="#3FA3EA" strokeWidth={9} strokeLinecap="round" transform={`rotate(${a})`} />)}
                  </g>
                ))}
              </g>
              {b >= 0 && b < 0.3 && <rect width={W} height={H} fill="#fff" opacity={1 - b / 0.3} />}
              {b >= 0 && <Label x={540} y={660} size={110} s={pop(t, T.bursts, 12, 6) * (1 - prog(t, T.starch - 0.3, T.starch - 0.1))} rot={-5} color="#FFE45C">BURST!</Label>}
              <Sticker t={t} t0={T.starch} t1={T.foam - 0.1} x={540} y={640} text="SOFT STARCH PUFFS OUT" size={60} fill="#E5414A" />
              <Sticker t={t} t0={T.foam} x={540} y={640} text="A FOAM!" size={90} fill="#2C7BE5" />
              <Sticker t={t} t0={coolsT} x={540} y={1770} text="SETS AS IT COOLS" size={64} fill="#3FA3EA" />
            </g>
          );
        })()}

        {scene === 'fluffy' && (
          <g>
            <rect width={W} height={H} fill="url(#popglow)" />
            {Array.from({length: 16}).map((_, i) => <path key={i} transform={`translate(540 1150) rotate(${i * 22.5 - t * 8})`} d="M 0 0 L 90 -1700 L -90 -1700 Z" fill="#FFE07A" opacity={0.6} />)}
            <rect x={-20} y={1560} width={W + 40} height={400} fill="#5E9BD6" stroke={INK} strokeWidth={LW} />
            <ellipse cx={600} cy={1520} rx={300} ry={46} fill="#fff" stroke={INK} strokeWidth={LW} />
            <ellipse cx={600} cy={1512} rx={230} ry={28} fill="#E8EEF4" />
            <g transform={`translate(600 ${1270 - 14 * Math.abs(Math.sin(t * 2.6))}) rotate(${5 * Math.sin(t * 1.6)}) scale(${1.45 * pop(t, T.fluffy - 0.25, 10, 6)})`}>
              <Puff t={t} ex="happy" tint="#FFFFFF" />
            </g>
            {[[300, 900], [880, 1000], [940, 1350], [140, 1100]].map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y}) rotate(${t * 90 + i * 20}) scale(${(0.7 + 0.3 * Math.sin(t * 5 + i)) * prog(t, T.fluffy + i * 0.15, T.fluffy + 0.3 + i * 0.15)})`}>
                <path d="M 0 -34 L 9 -9 L 34 0 L 9 9 L 0 34 L -9 9 L -34 0 L -9 -9 Z" fill="#fff" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
              </g>
            ))}
            {t > kernelT - 0.05 && (
              <g>
                <g transform={`translate(150 ${1520 - 4 * Math.sin(t * 3)}) scale(${0.36 * pop(t, kernelT, 12, 6)})`}><Kernel t={t} ex="happy" /></g>
                <g opacity={prog(t, kernelT + 0.2, kernelT + 0.5)}>
                  <path d="M 190 1400 Q 230 1260 330 1250" stroke={INK} strokeWidth={20} fill="none" strokeLinecap="round" />
                  <path d="M 190 1400 Q 230 1260 330 1250" stroke="#E5414A" strokeWidth={10} fill="none" strokeLinecap="round" />
                  <path d="M 322 1222 L 362 1250 L 322 1278 Z" fill="#E5414A" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
                </g>
              </g>
            )}
            <Label x={540} y={640} size={64} s={pop(t, T.fluffy, 12, 6)} color="#fff">FLUFFY WHITE PIECE</Label>
            <Sticker t={t} t0={insideT} x={540} y={1740} text="INSIDE OUT!" size={86} fill="#E5414A" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="25-popcorn" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
