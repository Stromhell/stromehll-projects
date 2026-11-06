import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer, wavePath} from '../../lib/short';

const FUR = '#A88A64', FUR2 = '#D9C3A0', RIVER = '#3E8FC4', JUNGLE = '#BFE6B0';

// sloth body centred, facing right; swim swings the arms
const Sloth: React.FC<{t: number; swim?: number; sleepy?: boolean; cheeks?: boolean}> = ({t, swim = 0, sleepy, cheeks}) => (
  <g>
    {[-1, 1].map((s) => <path key={s} d={`M ${s * 40} -20 Q ${s * 150 + 60 * swim * Math.sin(t * 8 + (s > 0 ? 0 : Math.PI))} ${-40 + 80 * swim * Math.cos(t * 8 + (s > 0 ? 0 : Math.PI))} ${s * 200 + 40 * swim * Math.sin(t * 8 + (s > 0 ? 0 : Math.PI))} ${-120 + 140 * swim * Math.cos(t * 8 + (s > 0 ? 0 : Math.PI))}`} stroke={FUR} strokeWidth={50} fill="none" strokeLinecap="round" />)}
    <ellipse cx={0} cy={40} rx={170} ry={130} fill={FUR} stroke={INK} strokeWidth={LW} />
    <g transform="translate(110 -80)">
      <circle r={95} fill={FUR} stroke={INK} strokeWidth={LW} />
      <ellipse cx={20} cy={10} rx={75} ry={60} fill={FUR2} />
      <path d="M -30 -10 Q -5 -30 15 -5 M 35 -5 Q 55 -30 75 -10" stroke="#5A3F28" strokeWidth={22} strokeLinecap="round" fill="none" />
      {sleepy ? <><path d="M -20 -8 Q -5 0 10 -8 M 40 -8 Q 55 0 70 -8" stroke={INK} strokeWidth={6} fill="none" /></> : <><circle cx={-5} cy={-10} r={9} fill={INK} /><circle cx={55} cy={-10} r={9} fill={INK} /></>}
      <ellipse cx={25} cy={20} rx={14} ry={10} fill={INK} />
      {cheeks ? <circle cx={25} cy={50} r={18} fill={INK} /> : <path d="M 5 45 Q 25 60 45 45" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />}
    </g>
  </g>
);

const Dolphin: React.FC<{t: number}> = ({t}) => (
  <g transform={`rotate(${5 * Math.sin(t * 3)})`}>
    <path d="M -200 0 Q -100 -90 100 -60 Q 180 -40 230 -10 L 280 0 L 230 10 Q 120 60 -100 50 Q -180 40 -200 0 Z" fill="#7FA6C9" stroke={INK} strokeWidth={LW} />
    <path d="M -20 -70 L 20 -140 L 60 -60 Z" fill="#7FA6C9" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -195 0 L -270 -50 L -250 0 L -270 50 Z" fill="#7FA6C9" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <circle cx={150} cy={-25} r={10} fill={INK} />
  </g>
);

const Timer: React.FC<{mins: number; s: number}> = ({mins, s}) => (
  <g transform={`scale(${s})`}>
    <rect x={-230} y={-90} width={460} height={170} rx={28} fill="#1B1B2E" stroke={INK} strokeWidth={LW} />
    <text y={40} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={110} fill="#7CFF6B">{`${String(Math.floor(mins)).padStart(2, '0')}:${String(Math.floor((mins % 1) * 60)).padStart(2, '0')}`}</text>
  </g>
);

export const SlothBreath: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.dolphins - 0.25 ? 'intro' : t < T.heartbeat - 0.25 ? 'vs' : t < T.surprise - 0.25 ? 'heart' : 'swim';
  const cues: Cue[] = [
    {f: 'splash', at: 0.3, db: -18}, {f: 'ticktock', at: T.breath, db: -22},
    {f: 'whoosh', at: T.dolphins - 0.25, db: -24}, {f: 'boing', at: T.dolphins + 0.3, db: -20}, {f: 'ding', at: T.dolphins + 1, db: -18},
    {f: 'whoosh', at: T.heartbeat - 0.25, db: -24}, {f: 'tick', at: T.heartbeat + 0.3, db: -18}, {f: 'tick', at: T.heartbeat + 1.2, db: -20}, {f: 'tick', at: T.heartbeat + 2.4, db: -22},
    {f: 'whoosh', at: T.surprise - 0.25, db: -24}, {f: 'boing', at: T.surprise + 0.2, db: -20}, {f: 'splash', at: T.swimmers, db: -18}, {f: 'whoosh', at: T.swimmers + 0.6, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: JUNGLE}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={JUNGLE} />

        {scene === 'intro' && (() => {
          const dive = prog(t, 0.1, 0.7, (u) => u * u);
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1020, 1], [T.dolphins - 0.3, 540, 1070, 1.08]])}>
                <rect x={-400} y={1150} width={1900} height={1400} fill={RIVER} />
                <path d={wavePath(t, 1150, 22, 220, 2)} fill={RIVER} />
                <g transform={`translate(520 ${lerp(900, 1560, dive) + 10 * Math.sin(t * 2)}) scale(0.9)`}><Sloth t={t} cheeks sleepy={false} /></g>
                {Array.from({length: 3}).map((_, i) => { const a = ((t * 0.5 + i / 3) % 1); return <circle key={i} cx={660 + 20 * Math.sin(t * 3 + i)} cy={1450 - 250 * a} r={12 + i * 4} fill="none" stroke="#CFF0FF" strokeWidth={5} opacity={1 - a} />; })}
              </Layer>
              <g transform="translate(540 1820)"><Timer mins={40 * prog(t, T.breath, T.dolphins - 0.4)} s={pop(t, T.breath, 12, 6)} /></g>
              <Label x={540} y={640} size={59} s={pop(t, 0.1, 12, 6)} color="#fff">SLOTHS HOLD THEIR BREATH</Label>
              <Sticker t={t} t0={T.breath + 0.5} x={540} y={790} text="FOR UP TO 40 MINUTES" size={57} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'vs' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={RIVER} />
            <Layer cam={keys(t, [[T.dolphins - 0.25, 540, 1070, 1], [T.heartbeat - 0.3, 540, 1070, 1.06]])}>
              <g transform={`translate(300 ${1090 + 15 * Math.sin(t * 2)}) scale(0.6)`}><Sloth t={t} cheeks /></g>
              <g transform={`translate(780 ${1090 + 15 * Math.sin(t * 2 + 1)}) scale(0.7)`}><Dolphin t={t} /></g>
              {[{x: 300, v: 40, c: '#2FA35A'}, {x: 780, v: 10, c: '#7FA6C9'}].map((b) => {
                const h = 460 * (b.v / 40) * prog(t, T.dolphins + 0.2, T.dolphins + 1.0);
                return <g key={b.x}><rect x={b.x - 90} y={1850 - h} width={180} height={h} fill={b.c} stroke={INK} strokeWidth={LW} />
                  <text x={b.x} y={1830 - h} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={60} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke">{`${b.v} MIN`}</text></g>;
              })}
            </Layer>
            <Label x={540} y={640} size={71} s={pop(t, T.dolphins, 12, 6)} color="#fff">LONGER THAN DOLPHINS</Label>
          </g>
        )}

        {scene === 'heart' && (() => {
          const rate = lerp(1, 0.3, prog(t, T.heartbeat, T.surprise - 0.5));
          const ph = (t - T.heartbeat) * 3 * rate;
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#14202E" />
              <Layer cam={keys(t, [[T.heartbeat - 0.25, 540, 1020, 1], [T.surprise - 0.3, 540, 1020, 1.08]])}>
                <rect x={80} y={950} width={920} height={500} rx={30} fill="#0B1A12" stroke={INK} strokeWidth={LW} />
                <path d={Array.from({length: 46}).map((_, i) => { const x = 100 + i * 19.5, k = ((i / 46) * 4 + ph) % 1; const y = 1200 - (k > 0.45 && k < 0.5 ? 200 : k > 0.5 && k < 0.55 ? -120 : 0); return `${i ? 'L' : 'M'} ${x} ${y}`; }).join(' ')} stroke="#7CFF6B" strokeWidth={10} fill="none" strokeLinejoin="round" />
                <g transform={`translate(540 1620) scale(${1 + 0.12 * Math.max(0, Math.sin(ph * Math.PI * 2))})`}>
                  <path d="M 0 60 C -120 -20 -80 -120 0 -60 C 80 -120 120 -20 0 60 Z" fill="#E5414A" stroke={INK} strokeWidth={LW} />
                </g>
              </Layer>
              <Label x={540} y={640} size={55} s={pop(t, T.heartbeat, 12, 6)} color="#fff">HEARTBEAT SLOWS RIGHT DOWN</Label>
              <Sticker t={t} t0={T.heartbeat + 0.6} x={540} y={790} text="TO SAVE OXYGEN" size={64} fill="#2FA35A" />
            </g>
          );
        })()}

        {scene === 'swim' && (() => {
          const go = t > T.swimmers - 0.2;
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={RIVER} />
              <Layer cam={keys(t, [[T.surprise - 0.25, 540, 1020, 1], [T.card, 540, 1020, 1.08]])}>
                {go && Array.from({length: 8}).map((_, i) => { const a = ((t * 1.5 + i / 8) % 1); return <path key={i} d={`M ${900 - 1100 * a} ${950 + i * 80} l -160 0`} stroke="#CFF0FF" strokeWidth={10} strokeLinecap="round" opacity={0.7} />; })}
                <g transform={`translate(${go ? 540 + 40 * Math.sin(t * 3) : 540} ${1250 + 20 * Math.sin(t * 4)}) rotate(${go ? -8 : 0})`}><Sloth t={t} swim={go ? 1 : 0} sleepy={!go} /></g>
                {!go && <text x={800} y={1050} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={160} fill="#FFE45C" stroke={INK} strokeWidth={14} paintOrder="stroke" opacity={pop(t, T.surprise + 0.2, 12, 6)}>!?</text>}
              </Layer>
              <Label x={540} y={640} size={84} s={pop(t, T.surprise, 12, 6)} color="#fff">{go ? 'GREAT SWIMMERS' : 'THE SURPRISE?'}</Label>
              {go && <Sticker t={t} t0={T.swimmers + 0.3} x={540} y={790} text="3X FASTER IN WATER" size={62} fill="#E5414A" />}
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="59-sloth-breath" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
