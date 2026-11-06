import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer, wavePath} from '../../lib/short';

const SEA = '#2A7DB8', DEEP = '#1B4F7A', DOL = '#7FA6C9', NIGHT = '#16224A';

// dolphin facing right; eyes: [left-hemisphere-eye (the visible one), shown asleep or awake]
const Dolphin: React.FC<{t: number; eyeOpen?: boolean; zz?: boolean}> = ({t, eyeOpen = true, zz}) => (
  <g transform={`rotate(${4 * Math.sin(t * 2)})`}>
    <path d="M -200 0 Q -100 -90 100 -60 Q 180 -40 230 -10 L 280 0 L 230 10 Q 120 60 -100 50 Q -180 40 -200 0 Z" fill={DOL} stroke={INK} strokeWidth={LW} />
    <path d="M -20 -70 L 20 -140 L 60 -60 Z" fill={DOL} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d={`M -195 0 L -270 ${-50 + 12 * Math.sin(t * 4)} L -250 0 L -270 ${50 + 12 * Math.sin(t * 4)} Z`} fill={DOL} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -100 40 Q 40 70 200 20" stroke="#CFE0F0" strokeWidth={14} fill="none" />
    {eyeOpen ? <circle cx={150} cy={-25} r={12} fill={INK} /> : <path d="M 136 -25 Q 150 -15 164 -25" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />}
    <path d="M 200 15 Q 230 25 255 8" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
    {zz && <text x={60} y={-160} fontFamily={FONT} fontWeight={900} fontSize={60} fill="#fff" stroke={INK} strokeWidth={8} paintOrder="stroke" opacity={0.5 + 0.5 * Math.sin(t * 3)}>z</text>}
  </g>
);

// brain seen from above: left half / right half, sleeping half dimmed
const Brain: React.FC<{t: number; sleep: 'L' | 'R'}> = ({t, sleep}) => (
  <g>
    {(['L', 'R'] as const).map((h) => {
      const k = h === 'L' ? -1 : 1, asleep = sleep === h;
      return <g key={h}>
        <path d={`M 0 -200 Q ${k * 260} -220 ${k * 260} 0 Q ${k * 260} 220 0 200 Z`} fill={asleep ? '#7C6FB0' : '#FF9EC0'} stroke={INK} strokeWidth={LW} />
        {[-110, -30, 50, 130].map((y, i) => <path key={i} d={`M ${k * 40} ${y} q ${k * 60} -30 ${k * 120} 0 t ${k * 70} 0`} stroke={INK} strokeWidth={5} fill="none" opacity={0.5} />)}
        <text x={k * 130} y={290} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={50} fill="#fff" stroke={INK} strokeWidth={8} paintOrder="stroke">{asleep ? 'ZZZ' : 'AWAKE'}</text>
        {!asleep && <circle cx={k * 130} cy={0} r={30 + 8 * Math.sin(t * 8)} fill="#FFE45C" opacity={0.6} />}
      </g>;
    })}
  </g>
);

export const DolphinSleep: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.rests - 0.25 ? 'intro' : t < T.eye - 0.25 ? 'brain' : t < T.swimming - 0.25 ? 'eye' : t < T.swap - 0.25 ? 'swim' : 'swap';
  const cues: Cue[] = [
    {f: 'snore', at: 0.3, db: -20}, {f: 'ding', at: T.half + 0.2, db: -18},
    {f: 'whoosh', at: T.rests - 0.25, db: -24}, {f: 'snore', at: T.rests + 0.2, db: -22}, {f: 'zap', at: T.rests + 1.0, db: -22},
    {f: 'whoosh', at: T.eye - 0.25, db: -24}, {f: 'pop', at: T.eye + 0.2, db: -18},
    {f: 'whoosh', at: T.swimming - 0.25, db: -24}, {f: 'splash', at: T.swimming + 0.5, db: -20}, {f: 'rumble', at: T.sharks, db: -20},
    {f: 'whoosh', at: T.swap - 0.25, db: -24}, {f: 'tick', at: T.swap + 0.2, db: -20}, {f: 'ding', at: T.swap + 0.7, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: SEA}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SEA} />

        {scene === 'intro' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={NIGHT} />
            <Layer cam={keys(t, [[0, 540, 1070, 1.08], [T.rests - 0.3, 540, 1070, 1]])}>
              <circle cx={850} cy={1000} r={80} fill="#FFF3B0" stroke={INK} strokeWidth={LW} />
              <rect x={-400} y={1150} width={1900} height={1400} fill={DEEP} />
              <path d={wavePath(t, 1150, 18, 220, 1.5)} fill={DEEP} />
              <g transform={`translate(520 ${1450 + 15 * Math.sin(t * 1.5)}) scale(1.05)`}><Dolphin t={t} eyeOpen={t % 1.6 < 0.8} zz /></g>
              <g transform={`translate(540 1760) scale(${pop(t, T.half, 12, 6)})`}>
                <circle cx={-80} cy={0} r={70} fill="#7C6FB0" stroke={INK} strokeWidth={LW} />
                <circle cx={80} cy={0} r={70} fill="#FF9EC0" stroke={INK} strokeWidth={LW} />
                <text x={-80} y={20} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={54} fill="#fff">½</text>
                <text x={80} y={20} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={54} fill="#fff">½</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={75} s={pop(t, 0.1, 12, 6)} color="#fff">DOLPHINS SLEEP WITH</Label>
            <Sticker t={t} t0={T.half} x={540} y={790} text="HALF THEIR BRAIN AWAKE" size={52} fill="#E5414A" />
          </g>
        )}

        {scene === 'brain' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={NIGHT} />
            <Layer cam={keys(t, [[T.rests - 0.25, 540, 1120, 1], [T.eye - 0.3, 540, 1120, 1.08]])}>
              <g transform={`translate(540 1380) scale(${pop(t, T.rests, 10, 6)})`}><Brain t={t} sleep="L" /></g>
            </Layer>
            <Label x={540} y={640} size={74} s={pop(t, T.rests, 12, 6)} color="#fff">ONE SIDE RESTS</Label>
            <Sticker t={t} t0={T.rests + 0.8} x={540} y={790} text="THE OTHER STAYS ALERT" size={54} fill="#F28C28" />
          </g>
        )}

        {scene === 'eye' && (
          <g>
            <Layer cam={keys(t, [[T.eye - 0.25, 600, 1070, 1.1], [T.swimming - 0.3, 640, 1050, 1.3]])}>
              <g transform="translate(480 1350) scale(1.3)"><Dolphin t={t} eyeOpen /></g>
              <g transform={`translate(675 1320) scale(${pop(t, T.eye + 0.1, 12, 6)})`}>
                <circle r={60} fill="none" stroke="#FFE45C" strokeWidth={10} />
              </g>
            </Layer>
            <Label x={540} y={640} size={78} s={pop(t, T.eye, 12, 6)} color="#fff">ONE EYE STAYS OPEN</Label>
          </g>
        )}

        {scene === 'swim' && (() => {
          const shark = t > T.sharks - 0.2;
          return (
            <g>
              <Layer cam={keys(t, [[T.swimming - 0.25, 540, 1070, 1], [T.swap - 0.3, 540, 1070, 1.05]])}>
                <rect x={-400} y={950} width={1900} height={60} fill="#CFF0FF" opacity={0.6} />
                <path d={wavePath(t, 1000, 14, 200, 2)} fill="none" stroke="#fff" strokeWidth={6} />
                {(() => { const u = prog(t, T.swimming, T.sharks - 0.3, (x) => x); const y = 1300 - 280 * Math.sin(u * Math.PI); return (
                  <g transform={`translate(${lerp(300, 600, u)} ${y}) rotate(${-25 * Math.cos(u * Math.PI)})`}><Dolphin t={t} /></g>); })()}
                {t > T.sharks - 0.6 && t < T.sharks && <g transform="translate(540 1050)">{[0, 1, 2].map((i) => <circle key={i} cx={(i - 1) * 50} cy={-30 * i} r={14} fill="#CFF0FF" stroke={INK} strokeWidth={4} />)}</g>}
                {shark && <g transform={`translate(${lerp(1300, 900, prog(t, T.sharks, T.sharks + 0.8))} 1650) scale(-1 1)`}>
                  <path d="M -220 0 Q -80 -90 140 -40 L 230 -80 L 210 0 L 230 80 L 140 40 Q -80 90 -220 0 Z" fill="#6B7A8A" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
                  <path d="M -20 -60 L 20 -170 L 70 -50 Z" fill="#6B7A8A" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
                  <circle cx={-150} cy={-15} r={10} fill={INK} />
                  <path d="M -200 20 L -110 20" stroke={INK} strokeWidth={6} />
                </g>}
                {shark && <text x={500} y={1560} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={110} fill="#FFE45C" stroke={INK} strokeWidth={12} paintOrder="stroke" opacity={pop(t, T.sharks + 0.3, 12, 6)}>!</text>}
              </Layer>
              <Label x={540} y={640} size={62} s={pop(t, T.swimming, 12, 6)} color="#fff">{shark ? 'AND WATCH FOR SHARKS' : 'KEEP SWIMMING + BREATHE'}</Label>
            </g>
          );
        })()}

        {scene === 'swap' && (() => {
          const flip = t > T.swap + 0.15;
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={NIGHT} />
              <Layer cam={keys(t, [[T.swap - 0.25, 540, 1120, 1], [T.card, 540, 1120, 1.06]])}>
                <g transform="translate(540 1380)"><Brain t={t} sleep={flip ? 'R' : 'L'} /></g>
                <g transform={`translate(540 1780) scale(${pop(t, T.swap + 0.2, 12, 6)})`}>
                  <rect x={-320} y={-60} width={640} height={110} rx={24} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={60} fill={INK}>ABOUT 2 HOURS</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={82} s={pop(t, T.swap, 12, 6)} color="#fff">THEN THEY SWAP</Label>
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="64-dolphin-sleep" voAt={VO_AT} card={T.card} cues={cues} bed="ocean" bedVol={0.04} />
    </AbsoluteFill>
  );
};
