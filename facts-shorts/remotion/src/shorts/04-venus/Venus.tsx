import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Sun, SweatDrop, clamp, lerp, prog, pop, keys, easeOut} from '../../lib/cartoon';
import {W, H, FPS, Layer, Label, Sticker, Logo, EndCard, SoundTrack, Cue} from '../../lib/short';

type Face = 'smile' | 'shock' | 'hot' | 'cold' | 'smug' | 'sleep';
const Planet: React.FC<{t: number; r: number; fill: string; shade: string; face: Face; craters?: boolean; bands?: boolean; sweat?: number}> =
  ({t, r, fill, shade, face, craters, bands, sweat = 0}) => {
    const k = r / 100;
    const eyes = face === 'sleep' ? null : face === 'shock'
      ? <g><ellipse cx={-30 * k} cy={-14 * k} rx={11 * k} ry={16 * k} fill={INK} /><ellipse cx={30 * k} cy={-14 * k} rx={11 * k} ry={16 * k} fill={INK} /></g>
      : <g><ellipse cx={-30 * k} cy={-14 * k} rx={9 * k} ry={13 * k} fill={INK} /><ellipse cx={30 * k} cy={-14 * k} rx={9 * k} ry={13 * k} fill={INK} />
          {face === 'smug' && <path d={`M ${-44 * k} ${-24 * k} L ${-16 * k} ${-22 * k} M ${16 * k} ${-22 * k} L ${44 * k} ${-24 * k}`} stroke={INK} strokeWidth={6 * k} strokeLinecap="round" />}</g>;
    const mouth = face === 'shock' ? <ellipse cx={0} cy={30 * k} rx={14 * k} ry={18 * k} fill={INK} />
      : face === 'hot' ? <g><path d={`M ${-26 * k} ${24 * k} Q 0 ${44 * k} ${26 * k} ${24 * k} Z`} fill={INK} /><path d={`M ${-8 * k} ${32 * k} L ${-8 * k} ${58 * k} Q 0 ${66 * k} ${8 * k} ${58 * k} L ${8 * k} ${32 * k}`} fill="#F07A8A" stroke={INK} strokeWidth={4 * k} /></g>
      : face === 'cold' ? <path d={`M ${-26 * k} ${30 * k} l 9 ${-8 * k} l 9 ${8 * k} l 9 ${-8 * k} l 9 ${8 * k} l 9 ${-8 * k}`} stroke={INK} strokeWidth={5 * k} fill="none" />
      : face === 'sleep' ? <g><path d={`M ${-40 * k} ${-12 * k} Q ${-30 * k} ${-2 * k} ${-18 * k} ${-12 * k} M ${18 * k} ${-12 * k} Q ${30 * k} ${-2 * k} ${40 * k} ${-12 * k}`} stroke={INK} strokeWidth={6 * k} fill="none" /><path d={`M -12 ${28 * k} Q 0 ${36 * k} 12 ${28 * k}`} stroke={INK} strokeWidth={6 * k} fill="none" /></g>
      : <path d={`M ${-24 * k} ${22 * k} Q 0 ${44 * k} ${24 * k} ${22 * k}`} stroke={INK} strokeWidth={7 * k} fill="none" strokeLinecap="round" />;
    return (
      <g>
        <circle r={r} fill={fill} stroke={INK} strokeWidth={LW} />
        <defs><clipPath id={`pc${r}${fill}`}><circle r={r} /></clipPath></defs>
        <g clipPath={`url(#pc${r}${fill})`}>
          {bands && [-0.5, -0.1, 0.35].map((y, i) => <path key={i} d={`M ${-r} ${y * r} Q 0 ${(y + 0.15) * r + 6 * Math.sin(t + i)} ${r} ${y * r}`} stroke={shade} strokeWidth={14 * k} fill="none" />)}
          {craters && [[-50, -50, 16], [46, 40, 20], [-30, 60, 12], [60, -30, 10]].map(([x, y, c], i) => <circle key={i} cx={x * k} cy={y * k} r={c * k} fill={shade} stroke={INK} strokeWidth={4} />)}
          <circle cx={30 * k} cy={10 * k} r={r * 1.02} fill="none" stroke={shade} strokeWidth={22 * k} opacity={0.6} />
        </g>
        {eyes}{mouth}
        {sweat > 0 && <SweatDrop x={-r * 0.75} y={-r * 0.6 + 40 * k * sweat} s={k * 0.9} />}
      </g>
    );
  };

const Thermo: React.FC<{level: number}> = ({level}) => (
  <g>
    <rect x={-34} y={-360} width={68} height={380} rx={34} fill="#fff" stroke={INK} strokeWidth={LW} />
    <rect x={-18} y={-340 + 340 * (1 - level)} width={36} height={340 * level + 10} rx={18} fill="#E5414A" />
    <circle cx={0} cy={40} r={60} fill="#E5414A" stroke={INK} strokeWidth={LW} />
    {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M 34 ${-300 + i * 70} L 58 ${-300 + i * 70}`} stroke={INK} strokeWidth={6} />)}
  </g>
);

const Arrow: React.FC<{x1: number; y1: number; x2: number; y2: number; col: string; p: number}> = ({x1, y1, x2, y2, col, p}) => {
  const x = lerp(x1, x2, p), y = lerp(y1, y2, p); const a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  return (
    <g>
      <path d={`M ${x1} ${y1} L ${x} ${y}`} stroke={INK} strokeWidth={26} strokeLinecap="round" />
      <path d={`M ${x1} ${y1} L ${x} ${y}`} stroke={col} strokeWidth={13} strokeLinecap="round" />
      <path transform={`translate(${x} ${y}) rotate(${a})`} d="M 0 -26 L 36 0 L 0 26 Z" fill={col} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    </g>
  );
};

const Stars: React.FC<{t: number}> = ({t}) => (
  <g>{Array.from({length: 60}).map((_, i) => {
    const x = (i * 197) % 1700 - 300, y = (i * 389) % 2600 - 300; const tw = 0.5 + 0.5 * Math.sin(t * 2 + i);
    return <circle key={i} cx={x} cy={y} r={3 + (i % 3) * 2} fill="#fff" opacity={0.4 + 0.6 * tw} />;
  })}</g>
);

const MERC = [560, 700], VEN = [560, 1300];
const camAt = (t: number) => keys(t, [
  [0, 540, 960, 1.0],
  [T.mercury2 - 0.3, 540, 960, 1.0],
  [T.mercury2 + 0.3, MERC[0] + 120, MERC[1] - 40, 1.4],
  [T.venus2 - 0.3, MERC[0] + 120, MERC[1] - 40, 1.4],
  [T.venus2 + 0.3, VEN[0], VEN[1] - 80, 1.35],
  [T.surface - 0.3, VEN[0], VEN[1] - 80, 1.35],
  [T.surface + 0.3, 540, 1100, 1.1],
]);

export const Venus: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const cam = camAt(t);
  const blanket = pop(t, T.blanket - 0.1, 9, 6);
  const sunIn = t > T.sunlight - 0.1 && t < T.surface ? prog(t, T.sunlight - 0.1, T.sunlight + 0.5) : 0;
  const heatOut = t > T.cant - 0.2 && t < T.surface ? prog(t, T.cant - 0.2, T.cant + 0.4) : 0;
  const leak = t > T.leaks - 0.3 && t < T.venus2 ? prog(t, T.leaks - 0.3, T.leaks + 0.6) : 0;
  const thermo = prog(t, T.venus1 + 0.1, T.venus1 + 0.9, easeOut);
  const lead = prog(t, T.lead, T.lead + 1.2);
  const vFace: Face = t < T.venus1 ? 'smile' : t > T.blanket && t < T.surface ? 'sleep' : 'hot';
  const mFace: Face = t < T.venus1 ? 'smug' : t < T.mercury2 ? 'shock' : t < T.venus2 + 0.3 ? 'cold' : 'shock';
  const night = t > T.day + 0.1 && t < T.lead ? ((t - T.day) % 1.0) > 0.5 : false;
  const cues: Cue[] = [
    {f: 'pop', at: T.mercury1, db: -20}, {f: 'pop', at: T.venus1, db: -20}, {f: 'rise', at: T.venus1 + 0.1, db: -22},
    {f: 'whoosh', at: T.mercury2 - 0.3, db: -24}, {f: 'whoosh', at: T.leaks, db: -22}, {f: 'wobble', at: T.air + 0.1, db: -26},
    {f: 'whoosh', at: T.venus2 - 0.3, db: -24}, {f: 'pop', at: T.blanket, db: -18}, {f: 'snore', at: T.blanket + 0.4, db: -26},
    {f: 'zap', at: T.sunlight, db: -24}, {f: 'boing', at: T.cant + 0.3, db: -22}, {f: 'pop', at: T.surface + 0.4, db: -18},
    {f: 'sizzle', at: T.surface + 0.3, db: -24}, {f: 'tick', at: T.day + 0.5, db: -24}, {f: 'tick', at: T.day + 1.0, db: -24},
    {f: 'sizzle', at: T.lead + 0.1, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: '#12163A'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect width={W} height={H} fill="#141A44" />
        <Layer cam={cam} p={0.2}><Stars t={t} /></Layer>
        <Layer cam={cam}>
          <g transform="translate(-60 300) scale(1.6)"><Sun t={t} mood={t > T.lead ? 'grin' : 'smug'} /></g>
          {/* mercury: heat leaking away */}
          {leak > 0 && [0, 1, 2].map((i) => <Arrow key={i} x1={MERC[0] + 60 + i * 10} y1={MERC[1] - 40 + i * 50} x2={MERC[0] + 330} y2={MERC[1] - 160 + i * 130} col="#FF7A45" p={leak} />)}
          <g transform={`translate(${MERC[0]} ${MERC[1]}) scale(${0.9 + 0.1 * pop(t, T.mercury1, 12, 6)})`}>
            <Planet t={t} r={110} fill="#A9A49B" shade="#8C877E" face={mFace} craters />
            {mFace === 'cold' && <g>{[-1, 1].map((s) => <path key={s} d={`M ${s * 130} 20 l ${s * 14} -10 l ${s * 4} 16`} stroke="#9FE0FF" strokeWidth={6} fill="none" transform={`translate(${2 * Math.sin(t * 40)} 0)`} />)}</g>}
          </g>
          <Label x={MERC[0] + 220} y={MERC[1] + 20} size={50} anchor="start" s={pop(t, T.mercury1, 12, 6) * (1 - prog(t, T.venus2, T.venus2 + 0.2))}>MERCURY</Label>
          <Label x={MERC[0]} y={MERC[1] + 190} size={54} s={pop(t, T.air, 12, 6) * (1 - prog(t, T.venus2 - 0.3, T.venus2))} color="#FFE45C">ALMOST NO AIR</Label>
          {/* venus with its thick CO2 blanket */}
          {sunIn > 0 && [0, 1].map((i) => <Arrow key={i} x1={160} y1={900 + i * 140} x2={VEN[0] - 90} y2={VEN[1] - 120 + i * 90} col="#FFD84D" p={sunIn} />)}
          <g transform={`translate(${VEN[0]} ${VEN[1]})`}>
            <Planet t={t} r={170} fill="#F2C46D" shade="#D9A04A" face={vFace} bands sweat={vFace === 'hot' ? ((t % 1.6) / 1.6) : 0} />
            {blanket > 0.01 && (
              <g transform={`scale(${blanket})`} opacity={0.93}>
                {Array.from({length: 18}).map((_, i) => { const a = (i / 18) * Math.PI * 2 + t * 0.15; return <circle key={'o' + i} cx={Math.cos(a) * 205} cy={Math.sin(a) * 205} r={60} fill={INK} />; })}
                {Array.from({length: 18}).map((_, i) => { const a = (i / 18) * Math.PI * 2 + t * 0.15; return <circle key={'f' + i} cx={Math.cos(a) * 205} cy={Math.sin(a) * 205} r={51} fill="#F7D9A0" />; })}
                <circle r={190} fill="none" stroke="#F7D9A0" strokeWidth={40} />
              </g>
            )}
            {heatOut > 0 && [0, 1, 2].map((i) => {
              const a = -0.6 + i * 0.6; const p = ((t - T.cant) * 1.2 + i * 0.33) % 1;
              const r0 = 175, r1 = 230; const out = p < 0.5 ? lerp(r0, r1, p * 2) : lerp(r1, r0, (p - 0.5) * 2);
              return <circle key={i} cx={Math.cos(a) * out + 80} cy={Math.sin(a) * out - 40} r={14} fill="#FF5A36" stroke={INK} strokeWidth={5} opacity={heatOut} />;
            })}
          </g>
          <Label x={VEN[0]} y={VEN[1] + 330} size={56} s={pop(t, T.venus1, 12, 6) * (1 - prog(t, T.mercury2 - 0.3, T.mercury2))}>VENUS</Label>
          <Sticker t={t} t0={T.blanket + 0.2} t1={T.surface - 0.2} x={VEN[0] + 260} y={VEN[1] - 250} text="CO2" size={70} fill="#7A5CC8" rot={8} />
          <g transform={`translate(${VEN[0] + 330} ${VEN[1] + 60}) scale(${pop(t, T.venus1 + 0.05, 10, 6) * (1 - prog(t, T.mercury2 - 0.3, T.mercury2)) + pop(t, T.surface, 10, 6) * (1 - prog(t, T.card - 0.3, T.card))})`}>
            <Thermo level={t < T.surface ? thermo : 1} />
          </g>
          {/* melting lead */}
          {t > T.lead - 0.2 && (
            <g transform={`translate(${VEN[0] - 280} ${VEN[1] + 220}) scale(${pop(t, T.lead - 0.2, 12, 6)})`}>
              <path d={`M -70 0 L 70 0 L 70 ${-110 * (1 - lead)} Q 0 ${-120 * (1 - lead) - 10} -70 ${-110 * (1 - lead)} Z`} fill="#8C96A3" stroke={INK} strokeWidth={LW} />
              <ellipse cx={0} cy={4} rx={70 + 90 * lead} ry={14 + 10 * lead} fill="#8C96A3" stroke={INK} strokeWidth={LW} />
              <Label x={0} y={-30 * (1 - lead) - 10} size={50 * (1 - lead * 0.6)} color="#fff">LEAD</Label>
            </g>
          )}
        </Layer>
        <Sticker t={t} t0={T.venus1 + 0.2} t1={T.mercury2 - 0.3} x={540} y={1030} text="HOTTEST" size={100} fill="#E5414A" />
        <Label x={540} y={1650} size={80} s={pop(t, T.cant, 12, 6) * (1 - prog(t, T.surface - 0.3, T.surface))} color="#FFB37A">HEAT CAN'T GET OUT</Label>
        <Sticker t={t} t0={T.surface + 0.4} t1={T.card} x={540} y={1640} text="460°C+" size={120} fill="#E5414A" />
        <Label x={540} y={1790} size={64} s={pop(t, T.day, 12, 6) * (1 - prog(t, T.lead - 0.2, T.lead))} color={night ? '#9FD0FF' : '#FFE45C'}>{night ? 'NIGHT TOO' : 'DAY'}</Label>
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="04-venus" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
