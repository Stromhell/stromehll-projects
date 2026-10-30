import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Sun, clamp, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

// stylised tower, base at origin, height ~ 900*grow
const Tower: React.FC<{t: number; grow?: number; s?: number; col?: string; face?: 'hot' | 'cold' | 'proud'}> = ({t, grow = 1, s = 1, col = '#8A5A3C', face = 'proud'}) => {
  const h = 900 * grow;
  const y = (f: number) => -h * f;
  const xw = (f: number) => 300 * Math.pow(1 - f, 1.8) + 18;
  const L = [0, 0.15, 0.35, 0.6, 0.85, 1];
  return (
    <g transform={`scale(${s})`}>
      <path d={`M ${-xw(0)} 0 C ${-xw(0.2)} ${y(0.2)} ${-xw(0.5)} ${y(0.5)} ${-xw(1)} ${y(1)} L ${xw(1)} ${y(1)} C ${xw(0.5)} ${y(0.5)} ${xw(0.2)} ${y(0.2)} ${xw(0)} 0 L 150 0 Q 0 ${y(0.13)} -150 0 Z`} fill={col} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      {L.slice(1, 5).map((f) => <rect key={f} x={-xw(f) - 16} y={y(f) - 14} width={(xw(f) + 16) * 2} height={28} rx={8} fill="#6B4430" stroke={INK} strokeWidth={6} />)}
      {[0.2, 0.45, 0.72].map((f) => <path key={f} d={`M ${-xw(f) + 10} ${y(f)} L ${xw(f + 0.12) - 6} ${y(f + 0.12)} M ${xw(f) - 10} ${y(f)} L ${-xw(f + 0.12) + 6} ${y(f + 0.12)}`} stroke="#5A3826" strokeWidth={6} />)}
      <path d={`M 0 ${y(1)} L 0 ${y(1) - 90}`} stroke={INK} strokeWidth={10} />
      <g transform={`translate(0 ${y(0.45)})`}>
        <circle cx={-34} cy={0} r={10} fill="#fff" stroke={INK} strokeWidth={4} /><circle cx={34} cy={0} r={10} fill="#fff" stroke={INK} strokeWidth={4} />
        <circle cx={-34} cy={2} r={5} fill={INK} /><circle cx={34} cy={2} r={5} fill={INK} />
        {face === 'cold' ? <path d="M -20 34 l 8 -6 l 8 6 l 8 -6 l 8 6 l 8 -6" stroke={INK} strokeWidth={5} fill="none" />
          : face === 'hot' ? <path d="M -22 28 Q 0 46 22 28" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
            : <path d="M -24 26 Q 0 50 24 26 Z" fill={INK} />}
      </g>
    </g>
  );
};

const Atom: React.FC<{x: number; y: number; t: number; j: number; i: number}> = ({x, y, t, j, i}) => (
  <g transform={`translate(${x + j * 10 * Math.sin(t * 40 + i * 1.7)} ${y + j * 10 * Math.cos(t * 37 + i)})`}>
    <circle r={40} fill="#9AA5B1" stroke={INK} strokeWidth={7} /><circle cx={-12} cy={-12} r={10} fill="#D6DEE6" />
  </g>
);

export const EiffelTower: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.iron - 0.25 ? 'intro' : t < T.metre - 0.25 ? 'atoms' : t < T.hottest - 0.25 ? 'stack' : t < T.winter2 - 0.25 ? 'grow' : 'winter';
  const heat = prog(t, T.heats - 0.1, T.heats + 0.6);
  const cues: Cue[] = [
    {f: 'pop', at: 0.2, db: -18}, {f: 'rise', at: T.taller, db: -22}, {f: 'boing', at: T.how, db: -22},
    {f: 'whoosh', at: T.iron - 0.25, db: -24}, {f: 'clink', at: T.iron, db: -20}, {f: 'sizzle', at: T.heats, db: -22},
    {f: 'whoosh', at: T.metre - 0.25, db: -24}, {f: 'tick', at: T.fraction, db: -20}, {f: 'rise', at: T.three, db: -22},
    {f: 'whoosh', at: T.hottest - 0.25, db: -24}, {f: 'sizzle', at: T.hottest, db: -24}, {f: 'ding', at: T.fifteen, db: -18},
    {f: 'whoosh', at: T.winter2 - 0.25, db: -24}, {f: 'wobble', at: T.winter2 + 0.3, db: -22},
  ];
  const isHot = scene === 'grow' || (scene === 'intro');
  return (
    <AbsoluteFill style={{background: '#9FD8FF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <defs>
          <linearGradient id="hot15" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FF9A4D" /><stop offset="1" stopColor="#FFE3A3" /></linearGradient>
          <linearGradient id="cold15" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6E8FB8" /><stop offset="1" stopColor="#DDEBF7" /></linearGradient>
        </defs>
        <rect width={W} height={H} fill={scene === 'winter' ? 'url(#cold15)' : scene === 'atoms' || scene === 'stack' ? '#FFF1D6' : 'url(#hot15)'} />
        {scene === 'intro' && (
          <g>
            <rect x={540} y={0} width={540} height={H} fill="url(#cold15)" />
            <path d="M 540 0 L 540 1920" stroke={INK} strokeWidth={LW} />
            <g transform="translate(150 830) scale(0.6)"><Sun t={t} mood="grin" /></g>
            <rect x={0} y={1640} width={W} height={280} fill="#7CB860" stroke={INK} strokeWidth={LW} />
            <rect x={540} y={1640} width={540} height={280} fill="#F2F6FA" />
            <g transform={`translate(290 1640)`}><Tower t={t} s={0.8} grow={1 + 0.1 * pop(t, T.taller, 10, 5)} face="proud" /></g>
            <g transform="translate(800 1640)"><Tower t={t} s={0.8} face="cold" /></g>
            <path d={`M 40 ${1640 - 792 - 72 * pop(t, T.taller, 10, 5)} L 1040 ${1640 - 792 - 72 * pop(t, T.taller, 10, 5)}`} stroke="#E5414A" strokeWidth={8} strokeDasharray="24 16" opacity={clamp((t - T.taller) * 3)} />
            {Array.from({length: 12}).map((_, i) => <circle key={i} cx={560 + ((i * 97) % 500)} cy={(t * 140 + i * 160) % 1640} r={10} fill="#fff" stroke={INK} strokeWidth={3} />)}
            <Label x={270} y={620} size={80} s={pop(t, 0.3, 12, 6)} color="#FFD84D">SUMMER</Label>
            <Label x={810} y={620} size={80} s={pop(t, 0.5, 12, 6)} color="#BFE6FF">WINTER</Label>
          </g>
        )}
        {scene === 'atoms' && (
          <g>
            <Layer cam={keys(t, [[T.iron - 0.25, 540, 1050, 1.25], [T.heats + 1, 540, 1050, 1]])}>
              <rect x={170} y={800} width={lerp(740, 860, heat)} height={500} rx={40} fill={`rgb(${lerp(200, 255, heat)},${lerp(206, 140, heat)},${lerp(214, 80, heat)})`} stroke={INK} strokeWidth={LW} opacity={0.5} />
              {Array.from({length: 15}).map((_, i) => {
                const c = i % 5, r = Math.floor(i / 5);
                return <Atom key={i} i={i} t={t} j={0.3 + heat * 1.6} x={250 + c * lerp(145, 175, heat)} y={920 + r * 130} />;
              })}
              {[0, 1, 2].map((i) => <path key={i} d={`M ${300 + i * 220} 1500 q -20 -40 0 -80 q 20 -40 0 -80`} stroke="#FF6A3D" strokeWidth={16} fill="none" strokeLinecap="round" opacity={heat} transform={`translate(0 ${-20 * Math.sin(t * 6 + i)})`} />)}
            </Layer>
            <Label x={540} y={620} size={96} s={pop(t, T.iron, 12, 6)} color="#C9D3DD">IRON</Label>
            <Sticker t={t} t0={T.heats} x={540} y={1700} text="HEAT = IT GROWS" size={80} fill="#E5414A" />
          </g>
        )}
        {scene === 'stack' && (
          <g>
            <g transform="translate(330 1050)">
              <rect x={-50} y={-300} width={100} height={lerp(600, 640, prog(t, T.fraction, T.fraction + 0.6))} fill="#8A5A3C" stroke={INK} strokeWidth={LW} />
              <Label x={-120} y={20} size={60} anchor="end">1 m</Label>
              <Sticker t={t} t0={T.fraction} x={0} y={460} text="+ 0.5 mm" size={64} fill="#2C7BE5" />
            </g>
            <g transform="translate(760 1660)">
              {Array.from({length: 10}).map((_, i) => (
                <g key={i} transform={`translate(0 ${-94 * (i + 1) + 43}) scale(${pop(t, T.three + i * 0.07, 14, 6)})`}><rect x={-60} y={-43} width={120} height={86} rx={8} fill="#8A5A3C" stroke={INK} strokeWidth={6} /></g>
              ))}
            </g>
            <Label x={540} y={620} size={80} s={pop(t, T.three, 12, 6)} color="#FFD84D">× 300 METRES</Label>
          </g>
        )}
        {scene === 'grow' && (
          <g>
            <g transform="translate(190 860) scale(0.55)"><Sun t={t} mood="grin" /></g>
            <rect x={0} y={1640} width={W} height={280} fill="#7CB860" stroke={INK} strokeWidth={LW} />
            <g transform="translate(470 1640)"><Tower t={t} s={0.95} grow={1 + 0.08 * prog(t, T.hottest, T.fifteen + 0.3)} face="hot" /></g>
            <g transform="translate(860 1640)">
              <rect x={-40} y={-1060} width={80} height={1060} fill="#FFE45C" stroke={INK} strokeWidth={7} />
              {Array.from({length: 22}).map((_, i) => <path key={i} d={`M -40 ${-i * 48} L ${i % 5 === 0 ? 0 : -16} ${-i * 48}`} stroke={INK} strokeWidth={5} />)}
            </g>
            <Sticker t={t} t0={T.fifteen} x={540} y={620} text="+15 CM TALLER" size={88} fill="#E5414A" />
          </g>
        )}
        {scene === 'winter' && (
          <g>
            <rect x={0} y={1640} width={W} height={280} fill="#F2F6FA" stroke={INK} strokeWidth={LW} />
            {Array.from({length: 22}).map((_, i) => <circle key={i} cx={(i * 113) % W + 20 * Math.sin(t + i)} cy={(t * 160 + i * 140) % 1640} r={10 + (i % 3) * 3} fill="#fff" stroke={INK} strokeWidth={3} />)}
            <g transform="translate(540 1640)"><Tower t={t} s={0.95} grow={1.08 - 0.08 * prog(t, T.winter2 + 0.2, T.winter2 + 1.2)} face="cold" /></g>
            <Label x={540} y={620} size={88} s={pop(t, T.winter2, 12, 6)} color="#BFE6FF">WINTER: SHRINKS</Label>
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="15-eiffel-tower" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
