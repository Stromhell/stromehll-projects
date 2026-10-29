import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, clamp, lerp, prog, pop, keys, easeOut} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue} from '../../lib/short';

const IceCube: React.FC<{t: number; s?: number; face?: 'chill' | 'wink' | 'none'}> = ({t, s = 1, face = 'chill'}) => (
  <g transform={`scale(${s}) rotate(${4 * Math.sin(t * 1.5)})`}>
    <path d="M -90 -70 L 0 -110 L 90 -70 L 90 70 L 0 110 L -90 70 Z" fill="#CFF0FF" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -90 -70 L 0 -30 L 90 -70 M 0 -30 L 0 110" stroke={INK} strokeWidth={6} fill="none" />
    <path d="M 0 -30 L 90 -70 L 90 70 L 0 110 Z" fill="#A8E2FA" />
    <path d="M -70 -50 L -40 -40" stroke="#fff" strokeWidth={10} strokeLinecap="round" />
    {face !== 'none' && (
      <g>
        {face === 'wink'
          ? <g><path d="M -64 0 q 12 -10 24 0" stroke={INK} strokeWidth={6} fill="none" /><ellipse cx={-14} cy={0} rx={7} ry={10} fill={INK} /></g>
          : <g><path d="M -72 -6 L -36 -6 L -38 8 Q -54 14 -70 8 Z M -30 -6 L 6 -6 L 4 8 Q -12 14 -28 8 Z" fill={INK} /><path d="M -36 -4 L -30 -4" stroke={INK} strokeWidth={4} /></g>}
        <path d="M -60 30 Q -40 46 -18 30" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
      </g>
    )}
  </g>
);

// water molecule: big O with two H
const Mol: React.FC<{x: number; y: number; r: number}> = ({x, y, r}) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <circle cx={-26} cy={-22} r={16} fill="#fff" stroke={INK} strokeWidth={5} />
    <circle cx={26} cy={-22} r={16} fill="#fff" stroke={INK} strokeWidth={5} />
    <circle r={28} fill="#E5414A" stroke={INK} strokeWidth={6} />
  </g>
);

const Fish: React.FC<{t: number; col: string}> = ({t, col}) => (
  <g transform={`rotate(${4 * Math.sin(t * 3)})`}>
    <path d={`M 60 0 L 110 ${-34 + 6 * Math.sin(t * 8)} L 110 ${34 + 6 * Math.sin(t * 8)} Z`} fill={col} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <ellipse rx={80} ry={46} fill={col} stroke={INK} strokeWidth={LW} />
    <circle cx={-44} cy={-10} r={12} fill="#fff" stroke={INK} strokeWidth={4} /><circle cx={-46} cy={-10} r={6} fill={INK} />
    <path d="M -70 16 Q -60 24 -50 16" stroke={INK} strokeWidth={5} fill="none" />
  </g>
);

const Glass: React.FC<{t: number; children?: React.ReactNode; level?: number; fill?: string}> = ({t, children, level = 0.65, fill = '#9FDBFF'}) => (
  <g>
    <path d="M -170 -260 L 170 -260 L 140 260 Q 0 280 -140 260 Z" fill="#F3FBFF" />
    <path d={`M ${-170 + 30 * (1 - level)} ${260 - 520 * level} L ${170 - 30 * (1 - level)} ${260 - 520 * level} L 140 260 Q 0 280 -140 260 Z`} fill={fill} />
    {children}
    <path d="M -170 -260 L 170 -260 L 140 260 Q 0 280 -140 260 Z" fill="none" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -130 -200 L -110 200" stroke="#fff" strokeWidth={14} strokeLinecap="round" opacity={0.8} />
  </g>
);

export const IceFloats: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.most - 0.2 ? 'glass' : t < T.molecules - 0.25 ? 'compare' : t < T.lighter - 0.1 ? 'crystal' : t < T.fish - 0.25 ? 'scale' : 'lake';
  const lock = prog(t, T.lock - 0.1, T.roomy + 0.4);
  const sink = prog(t, T.most + 0.3, T.solid + 0.6, easeOut);
  const tilt = prog(t, T.lighter, T.lighter + 0.6, easeOut);
  const lid = prog(t, T.top - 0.2, T.lid + 0.2);
  const cues: Cue[] = [
    {f: 'clink', at: 0.2, db: -18}, {f: 'plop', at: 0.5, db: -22}, {f: 'whoosh', at: T.most - 0.2, db: -24},
    {f: 'plop', at: T.solid, db: -18}, {f: 'boing', at: T.weird, db: -22}, {f: 'whoosh', at: T.molecules - 0.25, db: -24},
    {f: 'clink', at: T.lock, db: -18}, {f: 'clink', at: T.lock + 0.25, db: -20}, {f: 'pop', at: T.roomy, db: -18},
    {f: 'tick', at: T.lighter, db: -18}, {f: 'whoosh', at: T.fish - 0.25, db: -24}, {f: 'splash', at: T.fish + 0.1, db: -24},
    {f: 'clink', at: T.lid, db: -18}, {f: 'ding', at: T.survive + 0.2, db: -20},
  ];
  const mols = Array.from({length: 18}).map((_, i) => {
    const gx = (i % 6) * 120 - 300, gy = Math.floor(i / 6) * 130 - 130;
    const hexX = gx + (Math.floor(i / 6) % 2) * 60, hexY = gy;
    const jx = 140 * Math.sin(i * 7.1 + t * 2.4) * 0.6, jy = 110 * Math.cos(i * 3.3 + t * 2.0) * 0.6;
    return {x: lerp(gx * 0.7 + jx, hexX * 1.15, lock), y: lerp(gy * 0.7 + jy, hexY * 1.15, lock), r: lerp(i * 40 + t * 90, 0, lock)};
  });
  return (
    <AbsoluteFill style={{background: '#E8F7FF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect width={W} height={H} fill="#E3F4FF" />
        {scene === 'glass' && (
          <g>
            <g transform="translate(540 1100) scale(1.35)">
              <Glass t={t}><g transform={`translate(0 ${-80 + 6 * Math.sin(t * 2)})`}><IceCube t={t} s={0.9} face={t > 1.0 ? 'wink' : 'chill'} /></g></Glass>
            </g>
            <Label x={540} y={560} size={66} s={pop(t, 0.2, 12, 6)} color="#FFE45C">WHY DOES IT FLOAT?</Label>
          </g>
        )}
        {scene === 'compare' && (
          <g>
            <g transform="translate(300 1100) scale(0.95)">
              <Glass t={t} fill="#F2C46D"><g transform={`translate(0 ${lerp(-120, 170, sink)})`}><rect x={-60} y={-60} width={120} height={120} rx={14} fill="#E3A84A" stroke={INK} strokeWidth={LW} /></g></Glass>
            </g>
            <g transform="translate(790 1100) scale(0.95)">
              <Glass t={t}><g transform={`translate(0 ${-110 + 6 * Math.sin(t * 2)})`}><IceCube t={t} s={0.7} face={t > T.weird ? 'wink' : 'chill'} /></g></Glass>
            </g>
            <Label x={290} y={1520} size={56} s={pop(t, T.most, 12, 6)}>SOLIDS SINK</Label>
            <Label x={790} y={1520} size={56} s={pop(t, T.weird, 12, 6)} color="#7FD0FF">WATER: FLOATS</Label>
            <Sticker t={t} t0={T.weird} x={540} y={560} text="WATER IS WEIRD" size={96} fill="#2C7BE5" />
          </g>
        )}
        {scene === 'crystal' && (
          <g>
            <g transform={`translate(540 1000) scale(${pop(t, T.molecules - 0.25, 10, 6)})`}>
              {lock > 0.5 && [0, 1, 2].map((r) => [0, 1, 2, 3, 4].map((c) => (
                <path key={`${r}${c}`} transform={`translate(${(c * 120 - 300 + (r % 2) * 60) * 1.15} ${(r * 130 - 130) * 1.15})`} d="M -60 0 L -30 -52 L 30 -52 L 60 0 L 30 52 L -30 52 Z" fill="none" stroke="#7FB8E0" strokeWidth={5} opacity={(lock - 0.5) * 2} />
              )))}
              {mols.map((m, i) => <Mol key={i} x={m.x} y={m.y} r={m.r} />)}
            </g>
            <Label x={540} y={560} size={80} s={pop(t, T.molecules, 12, 6) * (1 - prog(t, T.lock - 0.2, T.lock))}>LIQUID: PACKED CLOSE</Label>
            <Label x={540} y={560} size={86} s={pop(t, T.roomy, 12, 6)} color="#FFE45C">ICE: ROOMY CRYSTAL</Label>
          </g>
        )}
        {scene === 'scale' && (
          <g>
            <g transform={`translate(540 1150) scale(${pop(t, T.lighter - 0.1, 10, 6)})`}>
              <path d="M 0 0 L 0 300 M -160 300 L 160 300" stroke={INK} strokeWidth={22} strokeLinecap="round" />
              <g transform={`rotate(${12 * tilt})`}>
                <path d="M -360 0 L 360 0" stroke={INK} strokeWidth={22} strokeLinecap="round" />
                <g transform="translate(-300 -40)"><IceCube t={t} s={0.75} face="chill" /></g>
                <g transform="translate(300 -90)"><rect x={-80} y={-70} width={160} height={150} rx={18} fill="#6BBDF0" stroke={INK} strokeWidth={LW} /></g>
              </g>
              <circle r={22} fill={INK} />
            </g>
            <Label x={260} y={1500} size={60}>ICE</Label>
            <Label x={820} y={1500} size={60}>WATER</Label>
            <Sticker t={t} t0={T.lighter + 0.1} x={540} y={560} text="ICE IS LIGHTER" size={100} fill="#2C7BE5" />
          </g>
        )}
        {scene === 'lake' && (
          <g>
            <rect width={W} height={700} fill="#CFE4F2" />
            {Array.from({length: 24}).map((_, i) => { const y = ((t * 80 + i * 97) % 700); return <circle key={i} cx={(i * 173) % W} cy={y} r={8} fill="#fff" stroke={INK} strokeWidth={2} />; })}
            <path d="M 0 700 L 1080 700 L 1080 1920 L 0 1920 Z" fill="#3E8ED0" />
            <path d="M 0 1700 Q 300 1640 540 1720 Q 800 1800 1080 1700 L 1080 1920 L 0 1920 Z" fill="#8A6A44" stroke={INK} strokeWidth={LW} />
            <g transform={`translate(0 ${-200 * (1 - lid)})`} opacity={clamp(lid * 3)}>
              <rect x={-20} y={640} width={1120} height={130} fill="#DDF5FF" stroke={INK} strokeWidth={LW} />
              {[120, 420, 760].map((x, i) => <path key={i} d={`M ${x} 670 l 60 30 l 40 -20`} stroke="#9ED6F2" strokeWidth={8} fill="none" />)}
            </g>
            <g transform={`translate(${380 + 120 * Math.sin(t * 0.7)} 1150)`}><Fish t={t} col="#FF8A5B" /></g>
            <g transform={`translate(${760 - 100 * Math.sin(t * 0.6)} 1420) scale(-0.8 0.8)`}><Fish t={t + 1} col="#FFD84D" /></g>
            <Label x={540} y={560} size={70} s={pop(t, T.lid, 12, 6)} color="#FFE45C">ICE LID</Label>
            <Sticker t={t} t0={T.fish} t1={T.top - 0.2} x={540} y={560} text="LUCKY FISH" size={100} fill="#FF8A5B" />
            <Label x={540} y={1000} size={72} s={pop(t, T.liquid, 12, 6)}>STILL LIQUID BELOW</Label>
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="10-ice-floats" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
