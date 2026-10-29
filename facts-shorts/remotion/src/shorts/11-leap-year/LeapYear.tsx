import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Sun, SweatDrop, clamp, lerp, prog, pop, keys, easeOut} from '../../lib/cartoon';
import {W, H, FPS, Label, Sticker, Logo, EndCard, SoundTrack, Cue} from '../../lib/short';

const CalPage: React.FC<{month: string; day: string; s?: number; col?: string; face?: boolean; t?: number}> = ({month, day, s = 1, col = '#E5414A', face, t = 0}) => (
  <g transform={`scale(${s})`}>
    <rect x={-170} y={-200} width={340} height={400} rx={30} fill="#fff" stroke={INK} strokeWidth={LW} />
    <path d="M -170 -110 L 170 -110 L 170 -170 Q 170 -200 140 -200 L -140 -200 Q -170 -200 -170 -170 Z" fill={col} stroke={INK} strokeWidth={LW} />
    {[-90, 90].map((x) => <rect key={x} x={x - 12} y={-232} width={24} height={60} rx={10} fill="#9AA5B1" stroke={INK} strokeWidth={6} />)}
    <Label x={0} y={-130} size={58} keep>{month}</Label>
    <text x={0} y={90} textAnchor="middle" fontFamily="Anton, 'Arial Black', sans-serif" fontWeight={900} fontSize={180} fill={INK}>{day}</text>
    {face && <g><circle cx={-70} cy={150} r={8} fill={INK} /><circle cx={70} cy={150} r={8} fill={INK} /><path d={`M -20 ${160 + 2 * Math.sin(t * 6)} q 20 14 40 0`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" /></g>}
  </g>
);

const Earth: React.FC<{t: number; r?: number}> = ({t, r = 70}) => (
  <g transform={`rotate(${t * 40})`}>
    <circle r={r} fill="#3D8CF0" stroke={INK} strokeWidth={LW} />
    <path d={`M ${-r * 0.6} ${-r * 0.2} q ${r * 0.3} ${-r * 0.5} ${r * 0.7} ${-r * 0.2} q ${r * 0.1} ${r * 0.4} ${-r * 0.3} ${r * 0.5} Z`} fill="#4CC38A" stroke={INK} strokeWidth={4} />
    <path d={`M ${r * 0.2} ${r * 0.3} q ${r * 0.3} ${-r * 0.1} ${r * 0.4} ${r * 0.3} q ${-r * 0.2} ${r * 0.2} ${-r * 0.4} 0 Z`} fill="#4CC38A" stroke={INK} strokeWidth={4} />
  </g>
);

const Snowman: React.FC<{t: number; melt: number}> = ({t, melt}) => (
  <g transform={`scale(1 ${1 - 0.25 * melt})`}>
    <ellipse cx={0} cy={0} rx={110 + 40 * melt} ry={30} fill="#BFE6FF" opacity={melt} />
    <circle cx={0} cy={-90} r={90} fill="#fff" stroke={INK} strokeWidth={LW} />
    <circle cx={0} cy={-230} r={66} fill="#fff" stroke={INK} strokeWidth={LW} />
    <circle cx={-22} cy={-240} r={7} fill={INK} /><circle cx={22} cy={-240} r={7} fill={INK} />
    <path d="M 0 -226 L 46 -216 L 0 -210 Z" fill="#FF8A3D" stroke={INK} strokeWidth={4} />
    <path d="M -24 -200 q 24 -14 48 0" stroke={INK} strokeWidth={5} fill="none" />
    <SweatDrop x={-60} y={-270 + 30 * ((t * 1.2) % 1)} s={0.6} />
  </g>
);

export const LeapYear: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.earth - 0.2 ? 'cal' : t < T.century - 0.25 ? 'orbit' : t < T.fourth - 0.25 ? 'seasons' : t < T.overshoots - 0.25 ? 'flip' : 'century';
  const orbitA = (t - T.earth) * 2.4 - Math.PI / 2;
  const drift = prog(t, T.slips - 0.1, T.slips + 1.4);
  const melt = prog(t, T.weeks - 0.3, T.weeks + 0.8);
  const flipN = Math.min(4, Math.floor(prog(t, T.fourth - 0.2, T.fourth + 1.0, (u) => u) * 4.999));
  const cues: Cue[] = [
    {f: 'pop', at: 0.25, db: -18}, {f: 'pop', at: T.four, db: -20}, {f: 'whoosh', at: T.earth - 0.2, db: -24},
    {f: 'pop', at: T.quarter, db: -18}, {f: 'boing', at: T.skip, db: -22}, {f: 'wobble', at: T.slips, db: -22},
    {f: 'whoosh', at: T.century - 0.25, db: -24}, {f: 'sizzle', at: T.seasons, db: -24}, {f: 'sad', at: T.weeks + 0.3, db: -22},
    {f: 'whoosh', at: T.fourth - 0.25, db: -24}, {f: 'tick', at: T.fourth, db: -20}, {f: 'tick', at: T.fourth + 0.25, db: -20},
    {f: 'tick', at: T.fourth + 0.5, db: -20}, {f: 'ding', at: T.fourth + 0.8, db: -18}, {f: 'whoosh', at: T.overshoots - 0.25, db: -24},
    {f: 'zap', at: T.skip2, db: -20}, {f: 'pop', at: T.skip2 + 0.5, db: -18},
  ];
  const confetti = (t0: number) => t > t0 && t < t0 + 1.5 ? Array.from({length: 20}).map((_, i) => {
    const a = t - t0; const ang = i * 0.9; const x = 540 + Math.cos(ang) * 500 * a, y = 900 + Math.sin(ang) * 300 * a + 600 * a * a;
    return <rect key={i} x={x} y={y} width={22} height={34} rx={4} fill={['#FFD84D', '#E5414A', '#3D8CF0', '#4CC38A'][i % 4]} stroke={INK} strokeWidth={3} transform={`rotate(${i * 40 + a * 300} ${x} ${y})`} />;
  }) : null;
  return (
    <AbsoluteFill style={{background: '#FFF4DE'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect width={W} height={H} fill={scene === 'orbit' ? '#141A44' : '#FFF1D6'} />
        {scene === 'cal' && (
          <g>
            <g transform={`translate(540 1050) rotate(${3 * Math.sin(t * 2)}) scale(1.6)`}><CalPage month="FEBRUARY" day="29" face t={t} /></g>
            <Label x={540} y={560} size={84} s={pop(t, 0.25, 12, 6)} color="#FFE45C">AN EXTRA DAY?</Label>
            <Sticker t={t} t0={T.four} x={540} y={1600} text="EVERY 4 YEARS" size={90} fill="#2C7BE5" />
          </g>
        )}
        {scene === 'orbit' && (
          <g>
            {Array.from({length: 50}).map((_, i) => <circle key={i} cx={(i * 197) % W} cy={(i * 389) % H} r={3 + (i % 3)} fill="#fff" opacity={0.6} />)}
            <ellipse cx={540} cy={1000} rx={400} ry={300} fill="none" stroke="#5A6AA0" strokeWidth={6} strokeDasharray="20 16" />
            <g transform="translate(540 1000) scale(0.9)"><Sun t={t} mood="smug" /></g>
            <g transform={`translate(${540 + 400 * Math.cos(orbitA)} ${1000 + 300 * Math.sin(orbitA)})`}><Earth t={t} /></g>
            {/* where the calendar thinks the year ends vs where earth really is */}
            <g transform={`translate(${540 + 400 * Math.cos(-Math.PI / 2 + drift * 0.5)} ${1000 + 300 * Math.sin(-Math.PI / 2 + drift * 0.5)})`} opacity={clamp(drift * 3)}>
              <path d="M 0 -60 L 0 -150" stroke="#E5414A" strokeWidth={8} /><path d="M 0 -150 L 60 -130 L 0 -110 Z" fill="#E5414A" stroke={INK} strokeWidth={4} />
            </g>
            <Sticker t={t} t0={T.quarter - 0.1} t1={T.century - 0.3} x={540} y={560} text="365¼ DAYS" size={110} fill="#2C7BE5" />
            <Label x={540} y={1560} size={78} s={pop(t, T.slips, 12, 6)} color="#FF8A8A">CALENDAR SLIPS</Label>
          </g>
        )}
        {scene === 'seasons' && (
          <g>
            <g transform="translate(200 300) scale(0.8)"><Sun t={t} mood="grin" /></g>
            <path d="M 0 1500 L 1080 1500 L 1080 1920 L 0 1920 Z" fill="#8FCF7A" stroke={INK} strokeWidth={LW} />
            <g transform="translate(320 1500)"><Snowman t={t} melt={melt} /></g>
            <g transform="translate(780 1150) scale(0.75) rotate(5)"><CalPage month="DECEMBER" day="25" col="#2C7BE5" /></g>
            <Sticker t={t} t0={T.century} x={540} y={560} text="AFTER 100 YEARS" size={90} fill="#2B3A4A" />
            <Label x={540} y={620} size={74} s={pop(t, T.weeks, 12, 6)} color="#FF8A8A">SEASONS 3+ WEEKS OFF</Label>
          </g>
        )}
        {scene === 'flip' && (
          <g>
            {[0, 1, 2, 3].map((i) => (
              <g key={i} transform={`translate(${210 + i * 220} 1050) scale(${0.55 * pop(t, T.fourth - 0.2 + i * 0.25, 12, 6)})`}>
                <CalPage month={`YEAR ${i + 1}`} day={i === 3 ? '29' : '28'} col={i === 3 ? '#E5414A' : '#9AA5B1'} />
              </g>
            ))}
            {confetti(T.fourth + 0.8)}
            <Sticker t={t} t0={T.fourth + 0.8} x={540} y={1500} text="FEB 29 · LEAP DAY" size={86} fill="#E5414A" />
          </g>
        )}
        {scene === 'century' && (
          <g>
            {['1700', '1800', '1900', '2000'].map((y, i) => {
              const k = pop(t, T.overshoots - 0.2 + i * 0.22, 12, 6);
              const yes = y === '2000';
              return (
                <g key={y} transform={`translate(540 ${710 + i * 230}) scale(${k})`}>
                  <rect x={-260} y={-90} width={520} height={170} rx={30} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <Label x={-60} y={30} size={100}>{y}</Label>
                  <g transform={`translate(170 -6) scale(${pop(t, T.skip2 + i * 0.12, 12, 6)})`}>
                    {yes ? <path d="M -36 0 L -10 26 L 40 -30" stroke="#4CC38A" strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      : <path d="M -30 -30 L 30 30 M 30 -30 L -30 30" stroke="#E5414A" strokeWidth={18} strokeLinecap="round" />}
                  </g>
                </g>
              );
            })}
            <Label x={540} y={560} size={64} s={pop(t, T.overshoots, 12, 6)} color="#FFE45C">MOST CENTURIES SKIP IT</Label>
            <Label x={540} y={1600} size={56} s={pop(t, T.skip2 + 0.6, 12, 6)}>ONLY IF IT DIVIDES BY 400</Label>
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="11-leap-year" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
