import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, clamp, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const HoneyJar: React.FC<{t: number; lid?: number; s?: number; mood?: 'smug' | 'happy'}> = ({t, lid = 1, s = 1, mood = 'happy'}) => (
  <g transform={`scale(${s})`}>
    <path d="M -150 -130 Q -190 -100 -180 0 L -170 170 Q -160 220 -100 220 L 100 220 Q 160 220 170 170 L 180 0 Q 190 -100 150 -130 Z" fill="#F5A623" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -130 -60 Q -150 40 -130 150" stroke="#FFD27A" strokeWidth={22} fill="none" strokeLinecap="round" />
    <rect x={-110} y={10} width={220} height={110} rx={20} fill="#FFF4DE" stroke={INK} strokeWidth={6} />
    <text x={0} y={85} textAnchor="middle" fontFamily="Anton, 'Arial Black', sans-serif" fontSize={64} fill={INK}>HONEY</text>
    <g transform={`translate(0 ${-150 - 80 * (1 - lid)}) rotate(${-20 * (1 - lid)})`}>
      <rect x={-165} y={-40} width={330} height={70} rx={18} fill="#C0392B" stroke={INK} strokeWidth={LW} />
      <path d="M -150 -20 L 150 -20" stroke="#E86A5C" strokeWidth={8} />
    </g>
    <g transform="translate(0 -60)">
      {mood === 'smug'
        ? <g><path d="M -70 -10 L -20 -10 M 20 -10 L 70 -10" stroke={INK} strokeWidth={9} strokeLinecap="round" /><path d="M -30 22 Q 10 40 44 14" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" /></g>
        : <g><circle cx={-44} cy={-10} r={10} fill={INK} /><circle cx={44} cy={-10} r={10} fill={INK} /><path d="M -34 16 q 34 28 68 0" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" /></g>}
    </g>
  </g>
);

const Germ: React.FC<{t: number; dry?: number; s?: number}> = ({t, dry = 0, s = 1}) => {
  const r = 70 * (1 - 0.55 * dry);
  return (
    <g transform={`scale(${s})`}>
      {Array.from({length: 9}).map((_, i) => {
        const a = (i / 9) * Math.PI * 2 + t; const L = r + 30 * (1 - dry);
        return <path key={i} d={`M ${Math.cos(a) * r} ${Math.sin(a) * r} L ${Math.cos(a) * L} ${Math.sin(a) * L}`} stroke={INK} strokeWidth={8} strokeLinecap="round" />;
      })}
      <circle r={r} fill={dry > 0.5 ? '#A8A27A' : '#7DD35A'} stroke={INK} strokeWidth={LW} />
      {dry > 0.6
        ? <g><path d="M -26 -14 l 16 16 m 0 -16 l -16 16 M 12 -14 l 16 16 m 0 -16 l -16 16" stroke={INK} strokeWidth={6} /></g>
        : <g><circle cx={-20} cy={-8} r={9} fill={INK} /><circle cx={20} cy={-8} r={9} fill={INK} /><path d="M -18 22 l 8 -8 l 8 8 l 8 -8 l 8 8" stroke={INK} strokeWidth={5} fill="none" /></g>}
    </g>
  );
};

const Bee: React.FC<{t: number}> = ({t}) => (
  <g transform={`rotate(${6 * Math.sin(t * 4)})`}>
    <ellipse cx={-30} cy={-80} rx={60} ry={34} fill="#E6F6FF" stroke={INK} strokeWidth={6} opacity={0.9} transform={`rotate(${-20 + 18 * Math.sin(t * 40)} -10 -40)`} />
    <ellipse cx={30} cy={-80} rx={60} ry={34} fill="#E6F6FF" stroke={INK} strokeWidth={6} opacity={0.9} transform={`rotate(${20 - 18 * Math.sin(t * 40)} 10 -40)`} />
    <ellipse rx={120} ry={80} fill="#FFD84D" stroke={INK} strokeWidth={LW} />
    {[-40, 10, 60].map((x) => <path key={x} d={`M ${x} -76 Q ${x + 14} 0 ${x} 76`} stroke={INK} strokeWidth={22} fill="none" />)}
    <circle cx={-80} cy={-10} r={14} fill={INK} /><circle cx={-84} cy={-14} r={5} fill="#fff" />
    <path d="M -100 26 q 16 10 30 0" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M -100 -66 Q -120 -120 -90 -140 M -76 -72 Q -80 -130 -50 -146" stroke={INK} strokeWidth={6} fill="none" />
  </g>
);

export const Honey: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.water - 0.25 ? 'intro' : t < T.acidic - 0.2 ? 'dry' : t < T.enzyme - 0.2 ? 'acid' : t < T.sealed - 0.25 ? 'bee' : 'seal';
  const cues: Cue[] = [
    {f: 'pop', at: 0.2, db: -18}, {f: 'blegh', at: T.rots, db: -22}, {f: 'ding', at: T.years, db: -20},
    {f: 'whoosh', at: T.water - 0.25, db: -24}, {f: 'plop', at: T.germs, db: -20}, {f: 'sizzle', at: T.die - 0.2, db: -24}, {f: 'sad', at: T.die, db: -24},
    {f: 'whoosh', at: T.acidic - 0.2, db: -24}, {f: 'zap', at: T.acidic, db: -22},
    {f: 'whoosh', at: T.enzyme - 0.2, db: -24}, {f: 'pop', at: T.enzyme, db: -20}, {f: 'squeeze', at: T.peroxide, db: -22},
    {f: 'whoosh', at: T.sealed - 0.25, db: -24}, {f: 'knock', at: T.sealed + 0.3, db: -18}, {f: 'ding', at: T.never, db: -18},
  ];
  const rot = prog(t, T.rots - 0.2, T.rots + 0.8);
  return (
    <AbsoluteFill style={{background: '#FFF1D6'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect width={W} height={H} fill="#FFE8B8" />
        {Array.from({length: 7}).map((_, r) => Array.from({length: 5}).map((_, c) => {
          const x = c * 240 + (r % 2) * 120, y = r * 280 + 100;
          return <path key={`${r}-${c}`} transform={`translate(${x} ${y})`} d="M 0 -120 L 104 -60 L 104 60 L 0 120 L -104 60 L -104 -60 Z" fill="none" stroke="#F5C76A" strokeWidth={8} />;
        }))}
        <rect x={0} y={1560} width={W} height={360} fill="#B9784A" stroke={INK} strokeWidth={LW} />
        {scene === 'intro' && (
          <g>
            <g transform={`translate(290 1400) scale(${lerp(1, 0.85, rot)})`}>
              <circle r={130} fill={`rgb(${lerp(229, 120, rot)},${lerp(65, 100, rot)},${lerp(74, 50, rot)})`} stroke={INK} strokeWidth={LW} />
              <path d="M 0 -130 Q 10 -180 40 -190" stroke={INK} strokeWidth={10} fill="none" />
              {rot > 0.3 && [0, 1, 2].map((i) => <circle key={i} cx={-40 + i * 40} cy={-20 + (i % 2) * 40} r={22} fill="#6E5A2E" opacity={rot} />)}
              {rot > 0.5 && [0, 1].map((i) => {
                const a = t * 5 + i * 3;
                return <g key={i} transform={`translate(${Math.cos(a) * 170} ${-150 + Math.sin(a * 1.3) * 50})`}><circle r={12} fill={INK} /><ellipse cx={-8} cy={-14} rx={10} ry={6} fill="#fff" stroke={INK} strokeWidth={3} /></g>;
              })}
            </g>
            <g transform={`translate(770 1340) scale(${pop(t, T.years - 0.3, 10, 6) * 0.95})`}><HoneyJar t={t} mood="smug" /></g>
            <Sticker t={t} t0={T.rots} x={290} y={1100} text="DAYS" size={80} fill="#6E5A2E" />
            <Sticker t={t} t0={T.years} x={770} y={1000} text="YEARS!" size={90} fill="#2C7BE5" rot={5} />
            <Label x={540} y={620} size={82} s={pop(t, 0.25, 12, 6)} color="#FFD84D">HONEY NEVER ROTS?</Label>
          </g>
        )}
        {scene === 'dry' && (
          <g>
            <Layer cam={keys(t, [[T.water - 0.25, 540, 1100, 1], [T.germs, 540, 1150, 1.3]])}>
              <path d={`M 120 1560 Q 120 1250 540 1240 Q 960 1250 960 1560 Z`} fill="#F5A623" stroke={INK} strokeWidth={LW} />
              <path d="M 180 1500 Q 200 1320 420 1290" stroke="#FFD27A" strokeWidth={20} fill="none" strokeLinecap="round" />
              <g transform={`translate(540 ${lerp(700, 1230, prog(t, T.germs - 0.4, T.germs))})`}><Germ t={t} dry={prog(t, T.germs + 0.3, T.die + 0.2)} /></g>
              {Array.from({length: 5}).map((_, i) => {
                const k = prog(t, T.germs + 0.2 + i * 0.1, T.germs + 0.9 + i * 0.1);
                return <path key={i} d={`M ${lerp(540, 440 + i * 50, k)} ${lerp(1230, 1100, k)} q 0 18 10 18`} stroke="#3D8CF0" strokeWidth={14} fill="none" strokeLinecap="round" opacity={1 - k} />;
              })}
            </Layer>
            <Label x={540} y={620} size={84} s={pop(t, T.water, 12, 6)} color="#fff">ALMOST NO WATER</Label>
            <Sticker t={t} t0={T.die} x={540} y={820} text="GERMS DRY OUT" size={80} fill="#6E5A2E" rot={4} />
          </g>
        )}
        {scene === 'acid' && (
          <g>
            <g transform="translate(360 1300)"><HoneyJar t={t} s={0.8} /></g>
            <g transform="translate(790 1100)">
              <rect x={-90} y={-260} width={180} height={460} rx={30} fill="#fff" stroke={INK} strokeWidth={LW} />
              {['#E5414A', '#FF8A3D', '#FFD84D', '#4CC38A', '#3D8CF0', '#6B4FD8'].map((c, i) => <rect key={c} x={-60} y={-230 + i * 70} width={120} height={60} rx={10} fill={c} stroke={INK} strokeWidth={5} />)}
              <g transform={`translate(-110 ${lerp(160, -170, prog(t, T.acidic, T.acidic + 0.8))})`}><path d="M 0 0 L -50 -30 L -50 30 Z" fill={INK} /></g>
            </g>
            <Label x={540} y={620} size={88} s={pop(t, T.acidic, 12, 6)} color="#FFD84D">QUITE ACIDIC</Label>
            <Sticker t={t} t0={T.acidic + 0.5} x={790} y={1460} text="pH ≈ 4" size={70} fill="#E5414A" />
          </g>
        )}
        {scene === 'bee' && (
          <g>
            <g transform={`translate(${lerp(1200, 520, prog(t, T.enzyme - 0.2, T.enzyme + 0.4))} ${930 + 30 * Math.sin(t * 3)}) scale(1.4)`}><Bee t={t} /></g>
            <g transform="translate(540 1360)"><HoneyJar t={t} s={0.75} lid={0} /></g>
            {Array.from({length: 8}).map((_, i) => {
              const k = prog(t, T.peroxide + i * 0.12, T.peroxide + 0.8 + i * 0.12);
              return k > 0 && k < 1 ? <circle key={i} cx={540 + (i - 4) * 40} cy={lerp(1220, 1040, k)} r={16 + (i % 3) * 6} fill="#fff" stroke={INK} strokeWidth={4} opacity={1 - k} /> : null;
            })}
            <Sticker t={t} t0={T.enzyme} x={540} y={620} text="BEE ENZYME" size={86} fill="#E07B12" />
            <Label x={540} y={1720} size={72} s={pop(t, T.peroxide, 12, 6)} color="#fff">→ HYDROGEN PEROXIDE</Label>
          </g>
        )}
        {scene === 'seal' && (
          <g>
            <g transform={`translate(540 1250) scale(${1 + 0.04 * pop(t, T.sealed + 0.3, 14, 5)})`}><HoneyJar t={t} s={1.15} lid={prog(t, T.sealed, T.sealed + 0.35)} /></g>
            <Sticker t={t} t0={T.sealed + 0.2} x={540} y={620} text="KEEP IT SEALED" size={84} fill="#C0392B" />
            <Label x={540} y={1760} size={80} s={pop(t, T.never, 12, 6)} color="#FFD84D">NEVER GOES BAD</Label>
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="14-honey" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
