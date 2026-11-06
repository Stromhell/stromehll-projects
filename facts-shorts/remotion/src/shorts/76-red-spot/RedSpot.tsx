import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SPACE = '#141A33', BAND1 = '#E8C9A0', BAND2 = '#C99A6A', SPOT = '#C8452C';

const Stars: React.FC<{t: number}> = ({t}) => (
  <g>{Array.from({length: 50}).map((_, i) => <circle key={i} cx={(i * 397) % 1300 - 110} cy={(i * 613) % 2100 - 90} r={2 + (i % 3) * 2} fill="#fff" opacity={0.4 + 0.5 * Math.sin(t * 2 + i)} />)}</g>
);

// Jupiter close-up surface with the spot; spot width w
const Surface: React.FC<{t: number; w: number}> = ({t, w}) => (
  <g>
    <clipPath id="jup"><rect x={-200} y={950} width={1480} height={1100} rx={0} /></clipPath>
    <g clipPath="url(#jup)">
      {Array.from({length: 9}).map((_, i) => <path key={i} d={`M -300 ${950 + i * 120} Q 540 ${930 + i * 120 + 20 * Math.sin(t + i)} 1400 ${950 + i * 120} L 1400 ${1070 + i * 120} L -300 ${1070 + i * 120} Z`} fill={i % 2 ? BAND1 : BAND2} />)}
      <g transform={`translate(540 1450) rotate(${t * -30})`}>
        <ellipse rx={w} ry={w * 0.55} fill={SPOT} stroke={INK} strokeWidth={LW} />
        {[0.7, 0.45, 0.2].map((k) => <ellipse key={k} rx={w * k} ry={w * k * 0.55} fill="none" stroke="#F2A07A" strokeWidth={8} strokeDasharray="30 20" />)}
      </g>
    </g>
  </g>
);

const Earth: React.FC<{r: number}> = ({r}) => (
  <g>
    <circle r={r} fill="#4FA3E0" stroke={INK} strokeWidth={6} />
    <path d={`M ${-r * 0.5} ${-r * 0.3} Q ${-r * 0.1} ${-r * 0.7} ${r * 0.2} ${-r * 0.3} Q ${r * 0.05} 0 ${-r * 0.4} ${r * 0.1} Z`} fill="#5DB55A" />
  </g>
);

export const RedSpot: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.Red - 0.25 ? 'intro' : t < T.winds - 0.25 ? 'age' : t < T.shrinking - 0.25 ? 'winds' : 'shrink';
  const cues: Cue[] = [
    {f: 'rumble', at: 0.2, db: -20}, {f: 'boing', at: 1.2, db: -18},
    {f: 'whoosh', at: T.Red - 0.25, db: -24}, {f: 'ticktock', at: T.Red + 0.8, db: -22},
    {f: 'whoosh', at: T.winds - 0.25, db: -24}, {f: 'whoosh', at: T.winds + 0.3, db: -18}, {f: 'whoosh', at: T.winds + 0.8, db: -18},
    {f: 'whoosh', at: T.shrinking - 0.25, db: -24}, {f: 'sad', at: T.shrinking + 0.2, db: -22}, {f: 'tick', at: T.century, db: -18}, {f: 'tick', at: T.Now, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: SPACE}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SPACE} />
        <Stars t={t} />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1170, 0.95], [T.Red - 0.3, 540, 1170, 1.02]])}>
              <Surface t={t} w={330} />
              <g transform={`translate(540 1450) scale(${pop(t, 0.9, 10, 6)})`}><Earth r={130} /></g>
            </Layer>
            <Label x={540} y={640} size={70} s={pop(t, 0.1, 12, 6)} color="#fff">A STORM ON JUPITER</Label>
            <Sticker t={t} t0={0.7} x={540} y={790} text="BIGGER THAN EARTH" size={66} fill={SPOT} />
          </g>
        )}

        {scene === 'age' && (
          <g>
            <Layer cam={keys(t, [[T.Red - 0.25, 540, 1170, 1], [T.winds - 0.3, 540, 1170, 1.06]])}>
              <Surface t={t} w={300} />
              <g transform={`translate(540 1830) scale(${pop(t, T.Red + 0.7, 12, 6)})`}>
                <rect x={-300} y={-60} width={600} height={110} rx={24} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={58} fill={INK}>{`${Math.round(190 * prog(t, T.Red + 0.8, T.Red + 2))}+ YEARS`}</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={74} s={pop(t, T.Red, 12, 6)} color="#fff">THE GREAT RED SPOT</Label>
            <Sticker t={t} t0={T.Red + 0.4} x={540} y={790} text="WATCHED SINCE THE 1830s" size={50} fill={SPOT} />
          </g>
        )}

        {scene === 'winds' && (
          <g>
            <Layer cam={keys(t, [[T.winds - 0.25, 540, 1170, 1.1], [T.shrinking - 0.3, 540, 1220, 1.25]])}>
              <Surface t={t * 4} w={320} />
              {Array.from({length: 6}).map((_, i) => { const a = t * 4 + i; return <path key={i} d={`M ${540 + 260 * Math.cos(a)} ${1450 + 140 * Math.sin(a)} A 260 140 0 0 1 ${540 + 260 * Math.cos(a + 0.6)} ${1450 + 140 * Math.sin(a + 0.6)}`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" />; })}
              <g transform={`translate(540 1830) scale(${pop(t, T.winds + 0.3, 12, 6)})`}>
                <rect x={-300} y={-60} width={600} height={110} rx={24} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={58} fill={INK}>600+ KM/H</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={76} s={pop(t, T.winds, 12, 6)} color="#fff">CRAZY WINDS</Label>
          </g>
        )}

        {scene === 'shrink' && (() => {
          const now = t > T.Now - 0.2;
          const old = t > T.century - 0.2;
          return (
            <g>
              <Layer cam={keys(t, [[T.shrinking - 0.25, 540, 1170, 1], [T.card, 540, 1170, 1.04]])}>
                <Surface t={t} w={now ? 190 : 330} />
                {old && (now ? [0] : [-1, 0, 1]).map((k) => <g key={k} transform={`translate(${540 + k * 205} 1450) scale(${pop(t, (now ? T.Now : T.century) + 0.2 + (k + 1) * 0.1, 12, 6)})`}><Earth r={100} /></g>)}
                <g transform="translate(540 1860)">
                  <rect x={-370} y={-55} width={740} height={100} rx={22} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={52} fill={INK}>{now ? 'NOW: JUST OVER 1' : old ? '100 YEARS AGO: ~3' : 'SHRINKING...'}</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={76} s={pop(t, T.shrinking, 12, 6)} color="#fff">BUT IT'S SHRINKING</Label>
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="76-red-spot" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
