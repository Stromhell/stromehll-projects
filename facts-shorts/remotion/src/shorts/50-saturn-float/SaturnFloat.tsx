import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer, wavePath} from '../../lib/short';

const SPACE = '#141A33', SAT = '#E9C27A', SAT2 = '#C99A4E', RING = '#D8B98A', WATER = '#3E8FC4';

const Stars: React.FC<{t: number}> = ({t}) => (
  <g>{Array.from({length: 60}).map((_, i) => <circle key={i} cx={(i * 397) % 1300 - 110} cy={(i * 613) % 2100 - 90} r={3 + (i % 3) * 2} fill="#fff" opacity={0.5 + 0.5 * Math.sin(t * 2 + i)} />)}</g>
);

// Saturn with a face; ring back half drawn behind the ball
const Saturn: React.FC<{t: number; s?: number; face?: 'happy' | 'calm'}> = ({t, s = 1, face = 'happy'}) => (
  <g transform={`scale(${s})`}>
    <g transform="rotate(-14)">
      <path d="M -330 0 A 330 80 0 0 1 330 0" stroke={RING} strokeWidth={36} fill="none" />
      <path d="M -330 0 A 330 80 0 0 1 330 0" stroke={INK} strokeWidth={4} fill="none" />
    </g>
    <circle r={200} fill={SAT} stroke={INK} strokeWidth={LW} />
    {[-110, -40, 40, 110].map((y) => <path key={y} d={`M ${-Math.sqrt(200 * 200 - y * y)} ${y} Q 0 ${y + 18 * Math.sin(t + y)} ${Math.sqrt(200 * 200 - y * y)} ${y}`} stroke={SAT2} strokeWidth={14} fill="none" />)}
    <circle cx={-60} cy={-20} r={14} fill={INK} /><circle cx={60} cy={-20} r={14} fill={INK} />
    <path d={face === 'happy' ? 'M -50 40 Q 0 85 50 40' : 'M -40 50 Q 0 65 40 50'} stroke={INK} strokeWidth={9} fill="none" strokeLinecap="round" />
    <g transform="rotate(-14)">
      <path d="M -330 0 A 330 80 0 0 0 330 0" stroke={RING} strokeWidth={36} fill="none" />
      <path d="M -330 0 A 330 80 0 0 0 330 0" stroke={INK} strokeWidth={4} fill="none" />
    </g>
  </g>
);

const Earth: React.FC<{s?: number}> = ({s = 1}) => (
  <g transform={`scale(${s})`}>
    <circle r={40} fill="#4FA3E0" stroke={INK} strokeWidth={6} />
    <path d="M -20 -20 Q 0 -30 10 -10 Q 0 5 -15 0 Z M 5 10 Q 25 10 20 28 Q 5 30 5 10 Z" fill="#5DB55A" />
  </g>
);

const Duck: React.FC<{s?: number}> = ({s = 1}) => (
  <g transform={`scale(${s})`}>
    <ellipse cx={0} cy={0} rx={110} ry={70} fill="#FFD23C" stroke={INK} strokeWidth={LW} />
    <circle cx={70} cy={-80} r={55} fill="#FFD23C" stroke={INK} strokeWidth={LW} />
    <path d="M 115 -80 L 160 -70 L 115 -55 Z" fill="#F28C28" stroke={INK} strokeWidth={6} />
    <circle cx={85} cy={-95} r={9} fill={INK} />
  </g>
);

export const SaturnFloat: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.huge - 0.25 ? 'intro' : t < T.lighter - 0.25 ? 'huge' : t < T.bathtub - 0.25 ? 'lighter' : t < T.luck - 0.25 ? 'tub' : 'luck';
  const cues: Cue[] = [
    {f: 'splash', at: 0.4, db: -18}, {f: 'boing', at: T.float + 0.3, db: -20},
    {f: 'whoosh', at: T.huge - 0.25, db: -24}, {f: 'rumble', at: T.huge + 0.1, db: -20}, {f: 'pop', at: T.huge + 0.8, db: -20},
    {f: 'whoosh', at: T.lighter - 0.25, db: -24}, {f: 'clink', at: T.lighter + 0.3, db: -18}, {f: 'rise', at: T.lighter + 0.8, db: -22},
    {f: 'whoosh', at: T.bathtub - 0.25, db: -24}, {f: 'splash', at: T.bathtub + 0.3, db: -16}, {f: 'squeeze', at: T.bob, db: -20}, {f: 'plop', at: T.bob + 0.6, db: -20},
    {f: 'whoosh', at: T.luck - 0.25, db: -24}, {f: 'wobble', at: T.luck + 0.3, db: -20},
  ];
  return (
    <AbsoluteFill style={{background: SPACE}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SPACE} />

        {scene === 'intro' && (() => {
          const drop = prog(t, 0, 0.5, (u) => u * u);
          return (
            <g>
              <Stars t={t} />
              <Layer cam={keys(t, [[0, 540, 1250, 1], [T.huge - 0.3, 540, 1300, 1.1]])}>
                <path d={wavePath(t, 1480, 26, 220, 2)} fill={WATER} />
                <g transform={`translate(540 ${lerp(600, 1400, drop) + (t > 0.5 ? 25 * Math.sin((t - 0.5) * 3.2) * Math.exp(-(t - 0.5) * 0.6) + 10 * Math.sin(t * 2) : 0)}) scale(0.95)`}><Saturn t={t} /></g>
                <path d={wavePath(t + 1, 1500, 22, 200, 2.4)} fill={WATER} opacity={0.6} />
                {t > 0.45 && t < 1.5 && Array.from({length: 10}).map((_, i) => {
                  const a = (t - 0.45) / 1.05, ang = Math.PI * (1.1 + 0.8 * i / 9);
                  return <circle key={i} cx={540 + Math.cos(ang) * 380 * a} cy={1480 + Math.sin(ang) * 260 * a + 500 * a * a} r={18} fill="#CFF0FF" opacity={1 - a} />;
                })}
              </Layer>
              <Label x={540} y={640} size={92} s={pop(t, T.float - 0.4, 12, 6)} color="#FFE45C">SATURN WOULD</Label>
              <Label x={540} y={770} size={120} s={pop(t, T.float + 0.2, 12, 6)} color="#fff">FLOAT</Label>
            </g>
          );
        })()}

        {scene === 'huge' && (
          <g>
            <Stars t={t} />
            <Layer cam={keys(t, [[T.huge - 0.25, 540, 1080, 1.3], [T.huge + 0.6, 540, 1080, 0.9], [T.lighter - 0.3, 540, 1080, 0.95]])}>
              <g transform={`translate(560 1250) rotate(${2 * Math.sin(t)})`}><Saturn t={t} s={1.3} face="calm" /></g>
              <g transform={`translate(140 1700) scale(${pop(t, T.huge + 0.6, 12, 6)})`}><Earth /></g>
              <text x={140} y={1800} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={44} fill="#fff" opacity={pop(t, T.huge + 0.8, 12, 6)}>EARTH</text>
              {Array.from({length: 12}).map((_, i) => {
                const a = ((t - T.huge) * 0.4 + i / 12) % 1;
                return <circle key={i} cx={560 + 240 * Math.cos(i * 2.1 + t)} cy={1250 + 240 * Math.sin(i * 2.1 + t)} r={20 * (1 - a)} fill="#fff" opacity={0.25} />;
              })}
            </Layer>
            <Label x={540} y={640} size={92} s={pop(t, T.huge, 12, 6)} color="#fff">HUGE, BUT...</Label>
            <Sticker t={t} t0={T.huge + 0.9} x={540} y={790} text="MOSTLY HYDROGEN + HELIUM" size={46} fill="#7A4DC8" />
          </g>
        )}

        {scene === 'lighter' && (() => {
          const tip = 12 * prog(t, T.lighter + 0.3, T.lighter + 1.0);
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#BFE8FF" />
              <Layer cam={keys(t, [[T.lighter - 0.25, 540, 1120, 1], [T.bathtub - 0.3, 540, 1130, 1.06]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill="#C9D3DE" stroke={INK} strokeWidth={LW} />
                <path d="M 540 1700 L 540 1250" stroke={INK} strokeWidth={24} />
                <g transform={`translate(540 1250) rotate(${tip})`}>
                  <rect x={-420} y={-14} width={840} height={28} rx={14} fill="#8A96B0" stroke={INK} strokeWidth={7} />
                  {[-330, 330].map((x, i) => (
                    <g key={x} transform={`translate(${x} 0) rotate(${-tip})`}>
                      <path d="M -140 140 L 140 140 L 100 180 L -100 180 Z" fill="#fff" stroke={INK} strokeWidth={7} />
                      <path d="M -120 140 L 0 0 L 120 140" stroke={INK} strokeWidth={5} fill="none" />
                      {i === 0 ? <g transform="translate(0 60)"><Saturn t={t} s={0.22} /></g>
                        : <rect x={-70} y={-5} width={140} height={140} rx={10} fill={WATER} stroke={INK} strokeWidth={7} opacity={pop(t, T.lighter + 0.1, 10, 6)} />}
                      <text y={250} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={46} fill={INK}>{i === 0 ? 'SATURN 0.69' : 'WATER 1.0'}</text>
                    </g>
                  ))}
                </g>
              </Layer>
              <Label x={540} y={640} size={79} s={pop(t, T.lighter, 12, 6)} color="#fff">LIGHTER THAN WATER</Label>
              <Sticker t={t} t0={T.lighter + 0.8} x={540} y={790} text="FOR ITS SIZE" size={60} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'tub' && (() => {
          const bob = 30 * Math.sin((t - T.bathtub) * 3);
          return (
            <g>
              <Stars t={t} />
              <Layer cam={keys(t, [[T.bathtub - 0.25, 540, 1120, 0.9], [T.bob, 540, 1160, 1.0], [T.luck - 0.3, 560, 1180, 1.08]])}>
                <path d="M 0 1300 L 1080 1300 L 1020 1720 Q 1000 1800 900 1800 L 180 1800 Q 80 1800 60 1720 Z" fill="#fff" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
                {[180, 900].map((x) => <rect key={x} x={x - 30} y={1790} width={60} height={70} rx={20} fill="#C9D3DE" stroke={INK} strokeWidth={7} />)}
                <path d="M 980 1300 L 980 1150 Q 980 1100 930 1100 L 880 1100" stroke="#C9D3DE" strokeWidth={30} fill="none" />
                <g transform={`translate(420 ${lerp(900, 1360, prog(t, T.bathtub, T.bathtub + 0.5, (u) => u * u)) + (t > T.bathtub + 0.5 ? bob : 0)}) rotate(${4 * Math.sin(t * 2)})`}><Saturn t={t} s={0.6} /></g>
                <g transform={`translate(800 ${1380 - bob * 0.8}) rotate(${-6 * Math.sin(t * 3)}) scale(${pop(t, T.bob, 12, 6) * 0.8})`}><Duck /></g>
                <path d={wavePath(t, 1400, 16, 120, 3, 40, 1040)} fill={WATER} opacity={0.75} />
                <path d="M 40 1400 L 1040 1400" stroke="none" />
              </Layer>
              <Label x={540} y={640} size={79} s={pop(t, T.bathtub, 12, 6)} color="#fff">IN A GIANT BATHTUB</Label>
              <Sticker t={t} t0={T.bob} x={540} y={790} text="BOBS LIKE A RUBBER DUCK" size={48} fill="#F28C28" />
            </g>
          );
        })()}

        {scene === 'luck' && (
          <g>
            <Stars t={t} />
            <Layer cam={keys(t, [[T.luck - 0.25, 540, 1080, 1], [T.card, 540, 1110, 1.08]])}>
              <rect x={-400} y={1700} width={1900} height={800} fill="#5A4B7A" stroke={INK} strokeWidth={LW} />
              <g transform="translate(540 1700)">
                <Guy t={t} expr="worried" handL={[-150, -330]} handR={[160, -330]} stand blink={t % 2.7 < 0.12} sweat={(t * 0.8) % 1} lean={4 * Math.sin(t * 3)} />
              </g>
              <g transform={`translate(${880} ${1150 + 15 * Math.sin(t * 2)}) rotate(${10 * Math.sin(t)})`}><Saturn t={t} s={0.45} /></g>
              <text x={540} y={1100} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={150} fill="#FFE45C" stroke={INK} strokeWidth={14} paintOrder="stroke" opacity={pop(t, T.luck + 0.3, 12, 6)}>?</text>
            </Layer>
            <Label x={540} y={640} size={84} s={pop(t, T.luck, 12, 6)} color="#fff">GOOD LUCK FINDING</Label>
            <Sticker t={t} t0={T.luck + 0.4} x={540} y={790} text="THAT BATHTUB" size={64} fill="#E5414A" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="50-saturn-float" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
