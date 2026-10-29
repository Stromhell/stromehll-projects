import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, Cloud, SweatDrop, clamp, lerp, prog, pop, keys, easeOut, shake} from '../../lib/cartoon';
import {W, H, FPS, Layer, Label, Sticker, Logo, EndCard, SoundTrack, Cue, SkyGrad, wavePath} from '../../lib/short';

// ---------------------------------------------------------------- flamingo (origin = standing foot)
const PINK = '#F78FB3', PINK_D = '#E2679A', LEG = '#F06292';
const Stroke: React.FC<{d: string; w: number; col: string}> = ({d, w, col}) => (
  <g><path d={d} stroke={INK} strokeWidth={w + 16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
);
export const FlamingoBird: React.FC<{t: number; twoLegs?: number; sleep?: boolean; lock?: number; glow?: number; wob?: number; smug?: boolean}> =
  ({t, twoLegs = 0, sleep = true, lock = 0, glow = 0, wob = 0, smug = false}) => {
    const breathe = 1 + 0.012 * Math.sin(t * 3);
    const neckSway = 6 * Math.sin(t * 1.3);
    const lift = 1 - twoLegs; // 1 = tucked leg up
    const kx = lerp(-48, -30, twoLegs), ky = lerp(-250, -170, twoLegs), fx = lerp(-6, -46, twoLegs), fy = lerp(-292, 0, twoLegs);
    return (
      <g transform={`rotate(${wob})`}>
        <ellipse cx={lerp(0, -20, twoLegs)} cy={4} rx={lerp(60, 90, twoLegs)} ry={12} fill="rgba(30,40,60,0.22)" />
        {/* standing leg: foot -> backward knee -> hip */}
        <Stroke d="M 30 0 L 0 0 L 2 -170 L 10 -330" w={12} col={LEG} />
        {/* second leg: tucked up or down */}
        <Stroke d={`M ${fx - 30 * twoLegs} ${fy} L ${fx} ${fy} L ${kx} ${ky} L -6 -330`} w={12} col={LEG} />
        {glow > 0 && <circle cx={2} cy={-170} r={30 + 8 * Math.sin(t * 10)} fill="#FFE45C" opacity={0.55 * glow} />}
        {lock > 0.01 && (
          <g transform={`translate(52 -178) scale(${lock})`}>
            <path d={`M -16 -6 L -16 ${-26 + 10 * (1 - lock)} A 16 16 0 0 1 16 -26 L 16 -6`} fill="none" stroke={INK} strokeWidth={8} />
            <rect x={-26} y={-8} width={52} height={40} rx={8} fill="#FFC93C" stroke={INK} strokeWidth={7} />
            <circle cx={0} cy={10} r={6} fill={INK} />
          </g>
        )}
        {/* body */}
        <g transform={`translate(0 -400) scale(${breathe})`}>
          <path d="M -150 10 C -150 -60 -40 -90 50 -70 C 120 -56 140 -10 120 30 C 90 80 -40 90 -100 60 L -175 70 L -150 40 Z" fill={PINK} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
          <path d="M -120 0 C -80 -40 0 -46 50 -20 C 20 30 -60 44 -120 30 Z" fill={PINK_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M -90 -46 C -40 -66 20 -64 60 -52" stroke="#FFC1D6" strokeWidth={12} fill="none" strokeLinecap="round" />
        </g>
        {/* neck + head */}
        <Stroke d={`M 90 -440 C 170 -500 ${120 + neckSway} -590 ${70 + neckSway} -630 C ${20 + neckSway} -670 ${40 + neckSway} -750 ${100 + neckSway} -760`} w={26} col={PINK} />
        <g transform={`translate(${108 + neckSway} -768)`}>
          <circle r={40} fill={PINK} stroke={INK} strokeWidth={LW} />
          <path d="M 26 -18 C 66 -16 86 6 82 40 C 70 30 52 16 30 14 Z" fill="#FFE6EF" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <path d="M 66 6 C 80 14 84 28 82 40 C 76 34 70 28 62 24 Z" fill={INK} />
          {sleep
            ? <path d="M -14 -6 Q -2 4 12 -6" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
            : <g><circle cx={-2} cy={-8} r={9} fill={INK} /><circle cx={1} cy={-11} r={3} fill="#fff" /></g>}
          {smug && <path d="M -18 -22 L 10 -18" stroke={INK} strokeWidth={6} strokeLinecap="round" />}
        </g>
      </g>
    );
  };

const Zzz: React.FC<{t: number; x: number; y: number}> = ({t, x, y}) => (
  <g>{[0, 1, 2].map((i) => {
    const a = ((t * 0.6 + i / 3) % 1);
    return <g key={i} opacity={a < 0.85 ? 1 : (1 - a) / 0.15} transform={`translate(${x + a * 70} ${y - a * 140}) scale(${0.5 + a * 0.6})`}><Label x={0} y={0} size={56} color="#fff">Z</Label></g>;
  })}</g>
);

const LabStand: React.FC = () => (
  <g stroke={INK} strokeWidth={LW} strokeLinejoin="round">
    <rect x={-150} y={-24} width={300} height={36} rx={14} fill="#B8C3CE" />
    <path d="M -110 -24 L -110 -420" strokeWidth={30} stroke={INK} />
    <path d="M -110 -24 L -110 -420" strokeWidth={14} stroke="#D9E1E8" />
    <path d="M -110 -400 L -40 -400" strokeWidth={22} stroke={INK} />
    <path d="M -110 -400 L -40 -400" strokeWidth={8} stroke="#D9E1E8" />
  </g>
);

const Clipboard: React.FC = () => (
  <g transform="translate(-10 -40) rotate(-8)">
    <rect x={-40} y={-56} width={80} height={104} rx={8} fill="#C48A52" stroke={INK} strokeWidth={7} />
    <rect x={-30} y={-42} width={60} height={82} fill="#fff" stroke={INK} strokeWidth={4} />
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M -20 ${-28 + i * 18} L 20 ${-28 + i * 18}`} stroke="#9AA5B1" strokeWidth={4} />)}
    <rect x={-16} y={-62} width={32} height={14} rx={4} fill="#9AA5B1" stroke={INK} strokeWidth={5} />
  </g>
);

const BoltOff: React.FC<{t: number; t0: number; t1: number; x: number; y: number}> = ({t, t0, t1, x, y}) => {
  const k = pop(t, t0, 12, 6) * (1 - prog(t, t1, t1 + 0.2));
  if (k <= 0.01) return null;
  const off = prog(t, t0 + 0.45, t0 + 0.6);
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <circle r={62} fill="#fff" stroke={INK} strokeWidth={LW} />
      <path d="M 10 -46 L -24 6 L 0 6 L -12 46 L 26 -8 L 2 -8 Z" fill="#FFD84D" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <g opacity={off}><path d="M -44 -44 L 44 44" stroke="#E5414A" strokeWidth={14} strokeLinecap="round" /></g>
    </g>
  );
};

const camAt = (t: number) => keys(t, [
  [0, 520, 1060, 1.0],
  [T.scientists - 0.3, 520, 1060, 1.0],
  [T.scientists + 0.4, 600, 1060, 1.15],
  [T.muscles - 0.3, 600, 1060, 1.15],
  [T.muscles + 0.3, 640, 1080, 1.3],
  [T.weight - 0.2, 640, 1080, 1.3],
  [T.weight + 0.4, 660, 1250, 1.9],
  [T.two - 0.3, 660, 1250, 1.9],
  [T.two + 0.3, 600, 1060, 1.15],
  [T.lazy - 0.6, 600, 1060, 1.15],
  [T.lazy + 0.2, 520, 1060, 1.0],
]);

export const Flamingo: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const cam = camAt(t);
  const lab = t > T.zoo - 0.25 && t < T.two + 1.6; // flamingo on the lab stand
  const twoLegs = prog(t, T.two - 0.15, T.two + 0.3) * (1 - prog(t, T.lazy - 0.6, T.lazy - 0.3));
  const wob = twoLegs > 0.5 && t < T.lazy - 0.4 ? 9 * Math.sin((t - T.two) * 9) * Math.min(1, (t - T.two) * 2) : 0;
  const lock = pop(t, T.locks - 0.05, 12, 6) * (1 - prog(t, T.two - 0.3, T.two));
  const glow = prog(t, T.weight, T.weight + 0.3) * (1 - prog(t, T.two - 0.3, T.two));
  // guy: balancing on the shore, falls in on "lazy"
  const fall = prog(t, T.lazy + 0.15, T.lazy + 0.6, easeOut);
  const guyLean = 8 * Math.sin(t * 2.6) * (1 - fall) + 75 * fall;
  const guyArms = Math.sin(t * 5.2) * 30;
  const clip = t > T.scientists - 0.2 && t < T.two + 1.6;
  const expr = t > T.lazy + 0.15 ? 'worried' : clip ? 'hope' : 'hot';
  const [shx, shy] = shake(t, t > T.lazy + 0.55 && t < T.lazy + 0.9 ? 8 * (1 - (t - T.lazy - 0.55) / 0.35) : 0);
  const cues: Cue[] = [
    {f: 'snore', at: 0.2, db: -26}, {f: 'pop', at: T.y2017 - 0.05, db: -18}, {f: 'whoosh', at: T.scientists - 0.3, db: -26},
    {f: 'whoosh', at: T.zoo - 0.25, db: -26}, {f: 'pop', at: T.muscles, db: -20}, {f: 'zap', at: T.muscles + 0.45, db: -24},
    {f: 'ding', at: T.balanced + 0.1, db: -22}, {f: 'rise', at: T.weight - 0.1, db: -26}, {f: 'clink', at: T.locks, db: -18},
    {f: 'wobble', at: T.two + 0.1, db: -20}, {f: 'wobble', at: T.two + 0.6, db: -22}, {f: 'whoosh', at: T.lazy - 0.4, db: -26},
    {f: 'splash', at: T.lazy + 0.55, db: -15}, {f: 'snore', at: T.lazy + 1.0, db: -24},
  ];
  return (
    <AbsoluteFill style={{background: '#FFC98B'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', transform: `translate(${shx}px, ${shy}px)`}}>
        <SkyGrad top="#FF9F80" bottom="#FFE2B0" />
        <Layer cam={cam} p={0.15}>
          <circle cx={760} cy={640} r={120} fill="#FFF0A8" stroke={INK} strokeWidth={LW} />
          <g transform={`translate(${200 + t * 5} 360)`}><Cloud s={0.9} /></g>
        </Layer>
        <Layer cam={cam} p={0.35}>
          <path d="M -1000 900 Q -600 700 -200 860 Q 200 640 600 850 Q 1000 700 1400 860 Q 1800 760 2200 900 Z" fill="#B57BA6" stroke={INK} strokeWidth={LW} />
        </Layer>
        <Layer cam={cam} p={0.6}>
          <rect x={-2000} y={880} width={6000} height={3000} fill="#7FC8E8" />
          <path d="M -2000 880 L 4000 880" stroke={INK} strokeWidth={LW} />
        </Layer>
        <Layer cam={cam}>
          <path d={wavePath(t, 1100, 10, 220, 1.0)} fill="#6DBBE0" />
          {/* reeds */}
          {[900, 960, 1010].map((x, i) => <path key={i} d={`M ${x} 1480 Q ${x + 10 * Math.sin(t * 1.5 + i)} 1300 ${x + 20 * Math.sin(t * 1.5 + i)} ${1180 + i * 30}`} stroke="#4E8A3E" strokeWidth={14} fill="none" strokeLinecap="round" />)}
          {lab && <g transform="translate(527 1502) scale(1.1)"><LabStand /></g>}
          <g transform={`translate(600 1500) scale(1.1)`}>
            <FlamingoBird t={t} twoLegs={twoLegs} sleep={!(t > T.two - 0.2 && t < T.lazy - 0.4)} lock={lock} glow={glow} wob={wob} smug={t > T.lazy} />
          </g>
          {/* ripples round the foot */}
          {!lab && [0, 1].map((i) => { const a = (t * 0.5 + i / 2) % 1; return <ellipse key={i} cx={610} cy={1502} rx={40 + 120 * a} ry={10 + 22 * a} fill="none" stroke="#fff" strokeWidth={6} opacity={1 - a} />; })}
          {/* shore */}
          <path d="M -400 1500 Q 100 1420 420 1560 L 420 2400 L -400 2400 Z" fill="#F2D29B" stroke={INK} strokeWidth={LW} />
          <g transform={`translate(${230 + 120 * fall} ${1565 + 60 * fall}) rotate(${guyLean}) scale(0.78)`}>
            <Guy t={t} expr={expr as any} stand handL={[-150, -260 + guyArms]} handR={clip ? [70, -150] : [160, -260 - guyArms]} bendL={0.3} bendR={0.3}
              blink={((t + 0.7) % 3.1) < 0.1} sweat={t < T.scientists ? ((t % 2.4) / 2.4) : 0} stepL={-6} stepR={8}
              handChildren={clip ? <Clipboard /> : null} />
          </g>
          {t > T.lazy + 0.5 && t < T.lazy + 1.4 && [-1, -0.5, 0, 0.5, 1].map((k, i) => {
            const a = t - T.lazy - 0.5; const x = 420 + 200 * k * a, y = 1620 - 500 * a + 700 * a * a;
            return <circle key={i} cx={x} cy={y} r={14 * (1 - a / 0.9) + 3} fill="#7FC8E8" stroke={INK} strokeWidth={5} />;
          })}
          {(t < T.zoo - 0.3 || t > T.lazy) && <Zzz t={t} x={640} y={700} />}
        </Layer>
        <Sticker t={t} t0={T.y2017 - 0.05} t1={T.zoo - 0.3} x={540} y={560} text="2017" size={110} fill="#2C7BE5" />
        <Label x={540} y={700} size={58} s={pop(t, T.scientists, 12, 6) * (1 - prog(t, T.zoo - 0.3, T.zoo))}>GEORGIA TECH + EMORY</Label>
        <BoltOff t={t} t0={T.muscles - 0.05} t1={T.weight - 0.3} x={860} y={1180} />
        <Label x={540} y={1650} size={86} s={pop(t, T.balanced, 12, 6) * (1 - prog(t, T.weight - 0.3, T.weight))} color="#FFE45C">STILL BALANCED</Label>
        <Label x={540} y={1650} size={86} s={pop(t, T.locks, 12, 6) * (1 - prog(t, T.two - 0.3, T.two))} color="#FFE45C">JOINTS LOCK</Label>
        <Label x={540} y={1650} size={86} s={pop(t, T.steady - 0.2, 12, 6) * (1 - prog(t, T.lazy - 0.6, T.lazy - 0.3))} color="#FF8A8A">TWO LEGS? WOBBLY</Label>
        <Sticker t={t} t0={T.lazy} t1={T.card} x={540} y={600} text="LAZY MODE" size={96} fill="#E5414A" />
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="02-flamingo" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
