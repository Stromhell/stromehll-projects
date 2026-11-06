import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SPACE = '#141A33', MOON = '#D9D6CC', MOON2 = '#B8B4A8';

const Stars: React.FC<{t: number}> = ({t}) => (
  <g>{Array.from({length: 60}).map((_, i) => <circle key={i} cx={(i * 397) % 1300 - 110} cy={(i * 613) % 2100 - 90} r={3 + (i % 3) * 2} fill="#fff" opacity={0.5 + 0.5 * Math.sin(t * 2 + i)} />)}</g>
);

const Moon: React.FC<{t: number; s?: number; run?: boolean; face?: 'sly' | 'happy'}> = ({t, s = 1, run, face = 'sly'}) => (
  <g transform={`scale(${s})`}>
    {run && [-1, 1].map((k) => <path key={k} d={`M ${k * 40} 120 L ${k * 40 + 60 * Math.sin(t * 12 + (k > 0 ? 0 : Math.PI))} 230`} stroke={INK} strokeWidth={16} strokeLinecap="round" />)}
    <circle r={150} fill={MOON} stroke={INK} strokeWidth={LW} />
    {[[-60, -60, 30], [50, 60, 24], [70, -40, 16], [-50, 70, 18]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={MOON2} />)}
    <circle cx={-35} cy={-10} r={12} fill={INK} /><circle cx={40} cy={-10} r={12} fill={INK} />
    <path d={face === 'sly' ? 'M -30 40 Q 10 60 45 35' : 'M -35 35 Q 5 75 45 35'} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>
);

const Earth: React.FC<{s?: number; worried?: boolean}> = ({s = 1, worried}) => (
  <g transform={`scale(${s})`}>
    <circle r={160} fill="#4FA3E0" stroke={INK} strokeWidth={LW} />
    <path d="M -90 -60 Q -30 -110 20 -60 Q 0 0 -70 10 Z M 30 40 Q 100 20 110 90 Q 50 120 30 40 Z" fill="#5DB55A" stroke={INK} strokeWidth={6} />
    <circle cx={-40} cy={-5} r={12} fill={INK} /><circle cx={40} cy={-5} r={12} fill={INK} />
    <path d={worried ? 'M -30 55 Q 0 35 30 55' : 'M -30 40 Q 0 65 30 40'} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>
);

export const MoonAway: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.drifts - 0.25 ? 'run' : t < T.mirrors - 0.25 ? 'drift' : t < T.longer - 0.25 ? 'laser' : 'days';
  const cues: Cue[] = [
    {f: 'step', at: 0.3, db: -20}, {f: 'step', at: 0.55, db: -20}, {f: 'step', at: 0.8, db: -20}, {f: 'whoosh', at: T.running, db: -20},
    {f: 'whoosh', at: T.drifts - 0.25, db: -24}, {f: 'tick', at: T.drifts + 0.4, db: -22}, {f: 'ding', at: T.fingernails, db: -20},
    {f: 'whoosh', at: T.mirrors - 0.25, db: -24}, {f: 'clink', at: T.mirrors + 0.3, db: -18}, {f: 'zap', at: T.lasers, db: -18}, {f: 'ding', at: T.lasers + 0.8, db: -20},
    {f: 'whoosh', at: T.longer - 0.25, db: -24}, {f: 'rise', at: T.longer, db: -22},
  ];
  return (
    <AbsoluteFill style={{background: SPACE}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SPACE} />
        <Stars t={t} />

        {scene === 'run' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1070, 1], [T.drifts - 0.3, 600, 1070, 0.95]])}>
              <g transform="translate(220 1400)"><Earth s={0.9} worried /></g>
              <g transform={`translate(${lerp(500, 840, prog(t, 0.2, T.drifts - 0.3))} ${1250 - 20 * Math.abs(Math.sin(t * 12))}) rotate(${8 * Math.sin(t * 6)})`}><Moon t={t} s={0.75} run /></g>
              {Array.from({length: 4}).map((_, i) => { const a = (t * 2 + i / 4) % 1; return <path key={i} d={`M ${lerp(500, 840, prog(t, 0.2, T.drifts - 0.3)) - 150 - 120 * a} ${1200 + i * 40} l -80 0`} stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={1 - a} />; })}
            </Layer>
            <Label x={540} y={640} size={84} s={pop(t, 0.1, 12, 6)} color="#fff">THE MOON IS</Label>
            <Sticker t={t} t0={T.running} x={540} y={790} text="RUNNING AWAY FROM US" size={56} fill="#E5414A" />
          </g>
        )}

        {scene === 'drift' && (() => {
          const nail = t > T.fingernails - 0.2;
          return (
            <g>
              <Layer cam={keys(t, [[T.drifts - 0.25, 540, 1070, 1], [T.mirrors - 0.3, 540, 1090, 1.06]])}>
                <g transform="translate(180 1300)"><Earth s={0.6} /></g>
                <g transform={`translate(${lerp(820, 880, prog(t, T.drifts, T.mirrors - 0.3))} 1300)`}><Moon t={t} s={0.55} /></g>
                <path d="M 300 1300 L 780 1300" stroke="#fff" strokeWidth={6} strokeDasharray="16 12" />
                <g transform={`translate(540 1650) scale(${pop(t, T.drifts + 0.3, 12, 6)})`}>
                  <rect x={-440} y={-80} width={880} height={140} rx={28} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={66} fill={INK}>+ 3.8 CM EVERY YEAR</text>
                </g>
                {nail && <g transform={`translate(540 1100) scale(${pop(t, T.fingernails, 12, 6)})`}>
                  <rect x={-60} y={-90} width={120} height={200} rx={60} fill="#F2C29B" stroke={INK} strokeWidth={LW} />
                  <rect x={-42} y={-80 - 20 * Math.abs(Math.sin(t * 2))} width={84} height={90 + 20 * Math.abs(Math.sin(t * 2))} rx={30} fill="#FFE9EE" stroke={INK} strokeWidth={6} />
                  <text x={0} y={-140} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={46} fill="#FFE45C" stroke={INK} strokeWidth={10} paintOrder="stroke">SAME SPEED</text>
                </g>}
              </Layer>
              <Label x={540} y={640} size={68} s={pop(t, T.drifts, 12, 6)} color="#fff">{nail ? 'AS FAST AS NAILS GROW' : 'DRIFTING AWAY'}</Label>
            </g>
          );
        })()}

        {scene === 'laser' && (() => {
          const beam = prog(t, T.lasers, T.lasers + 0.6, (u) => u);
          const back = prog(t, T.lasers + 0.6, T.lasers + 1.2, (u) => u);
          return (
            <g>
              <Layer cam={keys(t, [[T.mirrors - 0.25, 540, 1020, 1], [T.longer - 0.3, 540, 1020, 1.05]])}>
                                <g transform="translate(540 1830)"><Earth s={1.0} /></g>
                <rect x={-400} y={1200} width={1900} height={160} fill={MOON} stroke={INK} strokeWidth={LW} />
                {[[120, 1260, 30], [900, 1280, 40]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={MOON2} />)}
                <g transform={`translate(640 1200) scale(${pop(t, T.mirrors + 0.1, 12, 6)})`}>
                  <rect x={-90} y={-70} width={180} height={70} fill="#9FB0C8" stroke={INK} strokeWidth={6} />
                  {[0, 1, 2, 3].map((i) => <rect key={i} x={-80 + i * 42} y={-62} width={34} height={54} fill="#CFE6FF" stroke={INK} strokeWidth={3} />)}
                </g>
                <g transform="translate(400 1200)"><path d="M 0 0 L 0 -110" stroke={INK} strokeWidth={8} /><rect x={0} y={-110} width={80} height={50} fill="#fff" stroke={INK} strokeWidth={5} /><rect x={0} y={-110} width={32} height={26} fill="#2C5AA0" /></g>
                {beam > 0 && <path d={`M 560 1660 L ${lerp(560, 640, beam)} ${lerp(1660, 1180, beam)}`} stroke="#FF3B3B" strokeWidth={14} strokeLinecap="round" />}
                {back > 0 && <path d={`M 640 1180 L ${lerp(640, 600, back)} ${lerp(1180, 1660, back)}`} stroke="#FF8080" strokeWidth={10} strokeLinecap="round" strokeDasharray="20 12" />}
              </Layer>
              <Label x={540} y={640} size={75} s={pop(t, T.mirrors, 12, 6)} color="#fff">{t < T.lasers ? 'APOLLO LEFT MIRRORS' : 'WE BOUNCE LASERS'}</Label>
            </g>
          );
        })()}

        {scene === 'days' && (() => {
          const u = prog(t, T.longer, T.card, (x) => x);
          return (
            <g>
              <Layer cam={keys(t, [[T.longer - 0.25, 540, 1070, 1], [T.card, 540, 1070, 1.08]])}>
                <g transform={`translate(540 1300) rotate(${t * 40})`}><Earth s={1.2} /></g>
                <g transform={`translate(${lerp(900, 980, u)} 1000)`}><Moon t={t} s={0.35} face="happy" /></g>
                <g transform="translate(540 1750)">
                  <rect x={-380} y={-50} width={760} height={100} rx={50} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <rect x={-370} y={-40} width={lerp(560, 740, u)} height={80} rx={40} fill="#FFB020" />
                  <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={56} fill={INK}>1 DAY</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={71} s={pop(t, T.longer, 12, 6)} color="#fff">OUR DAYS ARE GETTING</Label>
              <Sticker t={t} t0={T.longer + 0.3} x={540} y={790} text="SLOWLY LONGER" size={66} fill="#F28C28" />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="60-moon-away" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
