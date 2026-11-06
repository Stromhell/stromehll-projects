import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const JUNGLE = '#BFE6B0', LEAF = '#5DA858', LEAF2 = '#3E8A44', FROG = '#B8E986';

// frog from below/above; clear = 0..1 transparency of skin, belly shows organs
const Frog: React.FC<{t: number; clear?: number; belly?: boolean; sleep?: boolean; blood?: number}> = ({t, clear = 0, belly, sleep, blood = 1}) => {
  const beat = 1 + 0.12 * Math.max(0, Math.sin(t * 8));
  return (
    <g>
      {[-1, 1].map((k) => <path key={k} d={`M ${k * 90} 40 Q ${k * 200} 60 ${k * 220} 150 L ${k * 280} 160`} stroke={FROG} strokeWidth={34} fill="none" strokeLinecap="round" opacity={1 - clear * 0.6} />)}
      {[-1, 1].map((k) => <path key={k} d={`M ${k * 80} -60 Q ${k * 170} -90 ${k * 200} -20`} stroke={FROG} strokeWidth={26} fill="none" strokeLinecap="round" opacity={1 - clear * 0.6} />)}
      <ellipse cx={0} cy={0} rx={140} ry={170} fill={FROG} fillOpacity={1 - clear * 0.75} stroke={INK} strokeWidth={LW} />
      {belly && <g>
        <g transform={`translate(0 -60) scale(${beat})`}><path d="M 0 30 C -50 0 -40 -45 0 -20 C 40 -45 50 0 0 30 Z" fill="#E5414A" fillOpacity={blood} stroke={INK} strokeWidth={4} /></g>
        <path d="M -60 10 Q -10 40 -40 80 Q 20 110 50 60 Q 80 20 30 10" stroke="#F2C29B" strokeWidth={26} fill="none" strokeLinecap="round" />
        <ellipse cx={60} cy={-10} rx={45} ry={30} fill="#8A3A3A" fillOpacity={0.4 + 0.6 * (1 - blood)} stroke={INK} strokeWidth={4} />
        {[0, 1, 2].map((i) => <circle key={i} cx={-40 + 30 * Math.sin(t * 2 + i)} cy={20 + i * 30} r={6} fill="#E5414A" opacity={blood} />)}
      </g>}
      <ellipse cx={0} cy={-150} rx={110} ry={70} fill={FROG} fillOpacity={1 - clear * 0.6} stroke={INK} strokeWidth={LW} />
      {[-1, 1].map((k) => <g key={k}><circle cx={k * 60} cy={-200} r={40} fill="#FFF8D0" stroke={INK} strokeWidth={6} />
        {sleep ? <path d={`M ${k * 60 - 22} -200 Q ${k * 60} -188 ${k * 60 + 22} -200`} stroke={INK} strokeWidth={6} fill="none" /> : <circle cx={k * 60} cy={-198} r={18} fill={INK} />}</g>)}
      <path d="M -40 -130 Q 0 -110 40 -130" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
    </g>
  );
};

const Leaf: React.FC = () => (
  <g>
    <path d="M -420 0 Q 0 -260 420 0 Q 0 260 -420 0 Z" fill={LEAF} stroke={INK} strokeWidth={LW} />
    <path d="M -400 0 L 400 0" stroke={LEAF2} strokeWidth={8} />
    {[-250, -100, 50, 200].map((x) => <path key={x} d={`M ${x} 0 L ${x + 90} -90 M ${x} 0 L ${x + 90} 90`} stroke={LEAF2} strokeWidth={6} />)}
  </g>
);

export const GlassFrog: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.Flip - 0.25 ? 'intro' : t < T.sleep - 0.25 ? 'flip' : t < T.transparent - 0.25 ? 'sleep' : t < T.Hungry - 0.25 ? 'clear' : 'birds';
  const cues: Cue[] = [
    {f: 'boing', at: 0.3, db: -20}, {f: 'ding', at: 1.0, db: -20},
    {f: 'whoosh', at: T.Flip - 0.25, db: -24}, {f: 'wobble', at: T.Flip + 0.1, db: -20}, {f: 'knock', at: T.Flip + 0.8, db: -22}, {f: 'knock', at: T.Flip + 1.0, db: -22}, {f: 'slurp', at: T.Flip + 1.6, db: -22},
    {f: 'whoosh', at: T.sleep - 0.25, db: -24}, {f: 'snore', at: T.sleep + 0.3, db: -22}, {f: 'pour', at: T.liver, db: -22},
    {f: 'whoosh', at: T.transparent - 0.25, db: -24}, {f: 'rise', at: T.transparent, db: -20},
    {f: 'whoosh', at: T.Hungry - 0.25, db: -24}, {f: 'tick', at: T.Hungry + 0.4, db: -20}, {f: 'tick', at: T.Hungry + 0.8, db: -20},
  ];
  return (
    <AbsoluteFill style={{background: JUNGLE}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={JUNGLE} />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1120, 1.05], [T.Flip - 0.3, 540, 1120, 1]])}>
              <g transform="translate(540 1450)"><Leaf /></g>
              <g transform={`translate(540 ${1420 + 6 * Math.sin(t * 3)}) scale(0.9)`}><Frog t={t} /></g>
            </Layer>
            <Label x={540} y={640} size={80} s={pop(t, 0.1, 12, 6)} color="#fff">THIS FROG HAS A</Label>
            <Sticker t={t} t0={0.6} x={540} y={790} text="SEE-THROUGH BELLY" size={60} fill="#2FA35A" />
          </g>
        )}

        {scene === 'flip' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#DFF5E8" />
            <Layer cam={keys(t, [[T.Flip - 0.25, 540, 1120, 1], [T.sleep - 0.3, 540, 1070, 1.25]])}>
              <rect x={150} y={1050} width={780} height={620} rx={40} fill="#fff" fillOpacity={0.5} stroke={INK} strokeWidth={LW} />
              <g transform={`translate(540 1400) scale(1.2) scale(1 ${t < T.Flip + 0.3 ? Math.cos((t - T.Flip + 0.25) * 6) : 1})`}><Frog t={t} clear={1} belly={t > T.Flip + 0.2} /></g>
            </Layer>
            <Label x={540} y={640} size={70} s={pop(t, T.Flip, 12, 6)} color="#fff">FLIP IT OVER...</Label>
            <Sticker t={t} t0={T.Flip + 0.7} x={540} y={790} text="WATCH THE HEART BEAT" size={52} fill="#E5414A" />
          </g>
        )}

        {scene === 'sleep' && (() => {
          const b = 1 - prog(t, T.liver - 0.2, T.liver + 0.8);
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#26344A" />
              <Layer cam={keys(t, [[T.sleep - 0.25, 540, 1120, 1], [T.transparent - 0.3, 540, 1120, 1.1]])}>
                <g transform="translate(540 1450)"><Leaf /></g>
                <g transform="translate(540 1400) scale(1.1)"><Frog t={t * 0.4} clear={1} belly sleep blood={b} /></g>
                <text x={820} y={1100} fontFamily={FONT} fontWeight={900} fontSize={70} fill="#fff" opacity={0.5 + 0.5 * Math.sin(t * 3)}>z z</text>
              </Layer>
              <Label x={540} y={640} size={66} s={pop(t, T.sleep, 12, 6)} color="#fff">{t < T.liver - 0.2 ? 'WHEN THEY SLEEP' : 'BLOOD HIDES IN LIVER'}</Label>
            </g>
          );
        })()}

        {scene === 'clear' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#26344A" />
            <Layer cam={keys(t, [[T.transparent - 0.25, 540, 1120, 1], [T.Hungry - 0.3, 540, 1120, 1.05]])}>
              <g transform="translate(540 1450)"><Leaf /></g>
              <g transform="translate(540 1400) scale(1.1)" opacity={1 - 0.6 * prog(t, T.transparent, T.transparent + 1)}><Frog t={t * 0.4} clear={1} belly sleep blood={0} /></g>
              <g transform={`translate(540 1800) scale(${pop(t, T.transparent + 0.2, 12, 6)})`}>
                <rect x={-280} y={-55} width={560} height={100} rx={22} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={54} fill={INK}>{`UP TO ${Math.round(61 * prog(t, T.transparent + 0.2, T.transparent + 1.2))}% CLEARER`}</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={72} s={pop(t, T.transparent, 12, 6)} color="#fff">NEARLY INVISIBLE</Label>
          </g>
        )}

        {scene === 'birds' && (
          <g>
            <Layer cam={keys(t, [[T.Hungry - 0.25, 540, 1120, 1], [T.card, 540, 1120, 1.05]])}>
              <g transform="translate(540 1500)"><Leaf /></g>
              <g transform="translate(540 1460) scale(0.9)" opacity={0.3}><Frog t={t} clear={1} sleep /></g>
              <g transform={`translate(${lerp(900, 760, prog(t, T.Hungry, T.Hungry + 0.6))} 1230) rotate(${10 * Math.sin(t * 2)})`}>
                <ellipse cx={0} cy={0} rx={110} ry={80} fill="#3A7BD5" stroke={INK} strokeWidth={LW} />
                <circle cx={-80} cy={-60} r={55} fill="#3A7BD5" stroke={INK} strokeWidth={LW} />
                <path d="M -130 -60 L -190 -45 L -130 -40 Z" fill="#FFB020" stroke={INK} strokeWidth={5} />
                <circle cx={-90} cy={-70} r={10} fill={INK} />
                <text x={-40} y={-150} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={90} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={pop(t, T.Hungry + 0.5, 12, 6)}>?</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={66} s={pop(t, T.Hungry, 12, 6)} color="#fff">BIRDS LOOK RIGHT</Label>
            <Sticker t={t} t0={T.Hungry + 0.4} x={540} y={790} text="THROUGH THEM" size={64} fill="#3A7BD5" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="70-glass-frog" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
