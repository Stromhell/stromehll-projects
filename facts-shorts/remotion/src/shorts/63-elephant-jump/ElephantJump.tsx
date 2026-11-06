import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SKY = '#FFE7B8', GROUND = '#D9A866', GREY = '#9AA6B8', GREY2 = '#B9C3D2';

// side view elephant, feet at y=0; lift[i] raises leg i (0 back-left ... 3 front-right); strain bobs body
const Ele: React.FC<{t: number; lift?: number[]; strain?: number; xray?: boolean}> = ({t, lift = [0, 0, 0, 0], strain = 0, xray}) => {
  const body = -330 - 14 * strain * Math.abs(Math.sin(t * 10));
  return (
    <g>
      {[-150, -80, 90, 160].map((x, i) => (
        <g key={i} transform={`translate(0 ${-lift[i]})`}>
          <rect x={x - 34} y={body + 120} width={68} height={-body - 120} rx={14} fill={i % 2 ? GREY : '#8592A6'} stroke={INK} strokeWidth={LW} />
          {xray && <g><path d={`M ${x} ${body + 140} L ${x} -40`} stroke="#fff" strokeWidth={16} strokeLinecap="round" /><circle cx={x} cy={-50} r={16} fill="#FFE45C" stroke={INK} strokeWidth={4} /></g>}
        </g>
      ))}
      <ellipse cx={0} cy={body} rx={250} ry={150} fill={GREY} stroke={INK} strokeWidth={LW} />
      <circle cx={230} cy={body - 70} r={110} fill={GREY} stroke={INK} strokeWidth={LW} />
      <ellipse cx={160} cy={body - 60} rx={70} ry={95} fill={GREY2} stroke={INK} strokeWidth={LW} />
      <path d={`M 320 ${body - 40} Q 380 ${body + 60} 340 ${body + 170}`} stroke={INK} strokeWidth={56} fill="none" strokeLinecap="round" />
      <path d={`M 320 ${body - 40} Q 380 ${body + 60} 340 ${body + 170}`} stroke={GREY} strokeWidth={40} fill="none" strokeLinecap="round" />
      <circle cx={270} cy={body - 100} r={14} fill={INK} />
      {strain > 0 && <path d={`M 250 ${body - 140} L 300 ${body - 125}`} stroke={INK} strokeWidth={8} strokeLinecap="round" />}
      <path d={`M -250 ${body - 20} Q -300 ${body + 30} -280 ${body + 80}`} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
  );
};

const Spring: React.FC<{k: number}> = ({k}) => (
  <path d={Array.from({length: 9}).map((_, i) => `${i ? 'L' : 'M'} ${i % 2 ? 30 : -30} ${-i * 22 * k}`).join(' ')} stroke="#E5414A" strokeWidth={10} fill="none" strokeLinejoin="round" />
);

export const ElephantJump: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.feet - 0.25 ? 'try' : t < T.bones - 0.25 ? 'feet' : t < T.run - 0.25 ? 'bones' : t < T.need - 0.25 ? 'run' : 'need';
  const cues: Cue[] = [
    {f: 'boing', at: 0.4, db: -20}, {f: 'creak', at: 1.0, db: -20}, {f: 'rumble', at: T.hop, db: -20}, {f: 'sad', at: T.hop + 0.8, db: -22},
    {f: 'whoosh', at: T.feet - 0.25, db: -24}, {f: 'knock', at: T.feet + 0.3, db: -18}, {f: 'knock', at: T.feet + 0.6, db: -18},
    {f: 'whoosh', at: T.bones - 0.25, db: -24}, {f: 'zap', at: T.bones + 0.2, db: -22}, {f: 'wobble', at: T.ankles + 0.3, db: -20},
    {f: 'whoosh', at: T.run - 0.25, db: -24}, ...[0, 1, 2, 3, 4, 5].map((i) => ({f: 'step', at: T.run + 0.2 + i * 0.3, db: -18})),
    {f: 'whoosh', at: T.need - 0.25, db: -24}, {f: 'ding', at: T.need + 0.3, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: SKY}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SKY} />

        {scene === 'try' && (() => {
          const crouch = t < T.hop ? Math.abs(Math.sin(t * 4)) : 0;
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1070, 1.05], [T.feet - 0.3, 540, 1090, 1]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill={GROUND} stroke={INK} strokeWidth={LW} />
                <g transform={`translate(500 1700) scale(${0.95} ${0.95 * (1 - 0.06 * crouch)})`}><Ele t={t} strain={1} /></g>
                <text x={500} y={1150} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={70} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={pop(t, T.hop, 12, 6)}>0 CM</text>
              </Layer>
              <Label x={540} y={640} size={71} s={pop(t, 0.1, 12, 6)} color="#fff">ELEPHANTS CAN'T JUMP</Label>
              <Sticker t={t} t0={T.hop} x={540} y={790} text="NOT EVEN A LITTLE HOP" size={54} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'feet' && (
          <g>
            <Layer cam={keys(t, [[T.feet - 0.25, 540, 1120, 1], [T.bones - 0.3, 540, 1170, 1.1]])}>
              <rect x={-400} y={1700} width={1900} height={800} fill={GROUND} stroke={INK} strokeWidth={LW} />
              <g transform="translate(500 1700) scale(0.95)"><Ele t={t} /></g>
              {[-150, -80, 90, 160].map((x, i) => <g key={i} transform={`translate(${500 + x * 0.95} 1760) scale(${pop(t, T.feet + 0.2 + i * 0.12, 12, 6)})`}>
                <circle r={34} fill="#2FA35A" stroke={INK} strokeWidth={5} /><path d="M -14 0 L -3 12 L 16 -12" stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>)}
            </Layer>
            <Label x={540} y={640} size={65} s={pop(t, T.feet, 12, 6)} color="#fff">ALL 4 FEET NEVER LEAVE</Label>
            <Sticker t={t} t0={T.feet + 0.5} x={540} y={790} text="THE GROUND TOGETHER" size={58} fill="#2C7BE5" />
          </g>
        )}

        {scene === 'bones' && (() => {
          const ank = t > T.ankles - 0.2;
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#24304A" />
              <Layer cam={keys(t, [[T.bones - 0.25, 540, 1090, 1], [T.run - 0.3, 560, 1190, 1.12]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill="#3A4766" stroke={INK} strokeWidth={LW} />
                <g transform="translate(500 1700) scale(0.95)" opacity={0.9}><Ele t={t} xray /></g>
                {ank && <g transform={`translate(800 1560) scale(${pop(t, T.ankles, 12, 6)})`}>
                  <rect x={-110} y={-120} width={220} height={150} rx={20} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <g transform="translate(0 10)"><Spring k={0.5 + 0.08 * Math.sin(t * 8)} /></g>
                  <path d="M -80 -100 L 80 10 M 80 -100 L -80 10" stroke="#E5414A" strokeWidth={14} strokeLinecap="round" />
                </g>}
              </Layer>
              <Label x={540} y={640} size={64} s={pop(t, T.bones, 12, 6)} color="#fff">{ank ? 'ANKLES NOT SPRINGY' : 'LEG BONES POINT DOWN'}</Label>
              <Sticker t={t} t0={ank ? T.ankles + 0.4 : T.bones + 0.4} x={540} y={790} text={ank ? 'TOO MUCH WEIGHT TO PUSH UP' : 'LIKE PILLARS'} size={ank ? 46 : 64} fill="#F28C28" />
            </g>
          );
        })()}

        {scene === 'run' && (() => {
          const ph = (t - T.run) * 4;
          const lift = [0, 1, 2, 3].map((i) => Math.max(0, 40 * Math.sin(ph * Math.PI + i * Math.PI / 2)));
          return (
            <g>
              <Layer cam={keys(t, [[T.run - 0.25, 540, 1090, 1], [T.need - 0.3, 560, 1090, 1.04]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill={GROUND} stroke={INK} strokeWidth={LW} />
                {Array.from({length: 5}).map((_, i) => { const a = (t * 1.5 + i / 5) % 1; return <path key={i} d={`M ${200 - 260 * a} ${1300 + i * 70} l -120 0`} stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={1 - a} />; })}
                <g transform={`translate(${lerp(460, 560, prog(t, T.run, T.need - 0.3))} 1700) scale(0.95)`}><Ele t={t} lift={lift} /></g>
                {[0, 1, 2, 3].map((i) => <circle key={i} cx={360 + i * 120} cy={1860} r={30} fill={lift[i] < 1 ? '#2FA35A' : '#ccc'} stroke={INK} strokeWidth={5} />)}
              </Layer>
              <Label x={540} y={640} size={74} s={pop(t, T.run, 12, 6)} color="#fff">EVEN WHEN RUNNING</Label>
              <Sticker t={t} t0={T.run + 0.5} x={540} y={790} text="ONE FOOT STAYS DOWN" size={60} fill="#2FA35A" />
            </g>
          );
        })()}

        {scene === 'need' && (
          <g>
            <Layer cam={keys(t, [[T.need - 0.25, 540, 1090, 1], [T.card, 540, 1070, 1.06]])}>
              <rect x={-400} y={1700} width={1900} height={800} fill={GROUND} stroke={INK} strokeWidth={LW} />
              <path d="M 900 1700 L 900 1180" stroke="#7A5534" strokeWidth={40} />
              <circle cx={900} cy={1140} r={150} fill="#5DA858" stroke={INK} strokeWidth={LW} />
              {[[840, 1100], [960, 1180], [900, 1240]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={26} fill="#E5414A" stroke={INK} strokeWidth={5} />)}
              <g transform="translate(420 1700) scale(0.9)"><Ele t={t} /></g>
              <path d={`M ${420 + 340 * 0.9} ${1700 - 160 * 0.9} Q 760 ${1440 - 60 * prog(t, T.need, T.need + 0.8)} 860 1240`} stroke={INK} strokeWidth={50} fill="none" strokeLinecap="round" />
              <path d={`M ${420 + 340 * 0.9} ${1700 - 160 * 0.9} Q 760 ${1440 - 60 * prog(t, T.need, T.need + 0.8)} 860 1240`} stroke={GREY} strokeWidth={34} fill="none" strokeLinecap="round" />
            </Layer>
            <Label x={540} y={640} size={76} s={pop(t, T.need, 12, 6)} color="#fff">WHO NEEDS TO JUMP?</Label>
            <Sticker t={t} t0={T.need + 0.5} x={540} y={790} text="WHEN YOU HAVE A TRUNK" size={52} fill="#7A4DC8" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="63-elephant-jump" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
