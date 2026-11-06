import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys, clamp} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SKIN = '#E9C9A8', DRY = '#A9824F';

// chubby water bear; dry 0 = normal, 1 = curled "tun"
const Tardi: React.FC<{t: number; dry?: number; wave?: boolean}> = ({t, dry = 0, wave}) => {
  const col = dry > 0.5 ? DRY : SKIN;
  const sx = lerp(1, 0.55, dry), sy = lerp(1, 0.75, dry);
  const blink = t % 2.6 < 0.12;
  return (
    <g transform={`scale(${sx} ${sy})`}>
      {[-120, -40, 40, 120].map((x, i) => {
        const k = dry > 0.6 ? 0 : 1, sw = 10 * Math.sin(t * 7 + i * 1.3);
        const lift = wave && i === 3 ? -70 + 20 * Math.sin(t * 9) : 0;
        return k ? <g key={x}>
          <path d={`M ${x} 50 L ${x + sw} ${110 + lift}`} stroke={INK} strokeWidth={46} strokeLinecap="round" />
          <path d={`M ${x} 50 L ${x + sw} ${110 + lift}`} stroke={col} strokeWidth={30} strokeLinecap="round" />
          <path d={`M ${x + sw - 12} ${128 + lift} l -6 14 M ${x + sw} ${132 + lift} l 0 14 M ${x + sw + 12} ${128 + lift} l 6 14`} stroke={INK} strokeWidth={5} strokeLinecap="round" />
        </g> : null;
      })}
      <path d="M -210 30 Q -230 -90 -100 -110 Q 0 -130 100 -110 Q 220 -90 220 10 Q 220 80 120 80 L -120 80 Q -200 80 -210 30 Z" fill={col} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      {[-110, -10, 90].map((x) => <path key={x} d={`M ${x} -110 Q ${x + 15} -10 ${x} 76`} stroke={dry > 0.5 ? '#8A6538' : '#D4A982'} strokeWidth={8} fill="none" />)}
      {/* face on the left end */}
      <g transform="translate(-170 -10)">
        <circle cx={-10} cy={-30} r={blink || dry > 0.5 ? 2 : 10} fill={INK} /><circle cx={30} cy={-30} r={blink || dry > 0.5 ? 2 : 10} fill={INK} />
        <circle cx={10} cy={20} r={dry > 0.5 ? 6 : 16} fill="#B5555A" stroke={INK} strokeWidth={6} />
      </g>
    </g>
  );
};

const Stars: React.FC<{t: number}> = ({t}) => (
  <g>{Array.from({length: 34}).map((_, i) => <circle key={i} cx={(i * 211) % 1080} cy={(i * 337) % 1920} r={3 + 3 * Math.abs(Math.sin(t * 1.7 + i))} fill="#fff" />)}</g>
);

const Earth: React.FC<{t: number; s?: number}> = ({t, s = 1}) => (
  <g transform={`scale(${s})`}>
    <circle r={300} fill="#4FA3D9" stroke={INK} strokeWidth={LW} />
    <g transform={`rotate(${t * 6})`}>
      <path d="M -200 -100 Q -120 -200 -40 -120 Q 0 -60 -80 -20 Q -160 20 -200 -100 Z" fill="#5EAE5A" stroke={INK} strokeWidth={6} />
      <path d="M 60 60 Q 160 20 200 120 Q 150 220 60 160 Z" fill="#5EAE5A" stroke={INK} strokeWidth={6} />
    </g>
  </g>
);

const Capsule: React.FC<{open: number}> = ({open}) => (
  <g>
    <path d="M -110 60 L -70 -80 L 70 -80 L 110 60 Z" fill="#D9DEE6" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <rect x={-60} y={-20} width={120} height={40} rx={10} fill="#2C7BE5" stroke={INK} strokeWidth={6} />
    <text y={12} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={28} fill="#fff">ESA</text>
    <g transform={`translate(-70 -80) rotate(${-110 * open})`}><rect x={0} y={-24} width={140} height={24} rx={8} fill="#B8C0CC" stroke={INK} strokeWidth={6} /></g>
  </g>
);

export const TardigradeSpace: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.Tardigrades - 0.25 ? 'intro' : t < T.orbit - 0.25 ? 'meet' : t < T.alive - 0.25 ? 'orbit' : t < T.trick - 0.25 ? 'back' : 'trick';
  const cues: Cue[] = [
    {f: 'whoosh', at: 0.1, db: -24}, {f: 'ding', at: T.survived, db: -20},
    {f: 'whoosh', at: T.Tardigrades - 0.25, db: -24}, {f: 'boing', at: T.Tardigrades + 0.2, db: -20}, {f: 'tick', at: T.smaller, db: -18},
    {f: 'whoosh', at: T.orbit - 0.25, db: -24}, {f: 'rise', at: T.orbit, db: -22}, {f: 'creak', at: T.exposed, db: -20},
    {f: 'whoosh', at: T.alive - 0.25, db: -24}, {f: 'ding', at: T.alive + 0.2, db: -18}, {f: 'pop', at: T.eggs, db: -18}, {f: 'pop', at: T.eggs + 0.2, db: -18},
    {f: 'whoosh', at: T.trick - 0.25, db: -24}, {f: 'sizzle', at: T.trick + 0.3, db: -24}, {f: 'plop', at: T.water, db: -18}, {f: 'boing', at: T.water + 0.3, db: -18},
  ];
  const bg = scene === 'meet' ? '#BFE8FF' : scene === 'back' ? '#BFE8FF' : scene === 'trick' ? '#F7E3B5' : '#141A33';
  return (
    <AbsoluteFill style={{background: bg}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={bg} />

        {scene === 'intro' && (
          <g>
            <Stars t={t} />
            <Layer cam={keys(t, [[0, 540, 1200, 1.2], [T.Tardigrades - 0.3, 540, 1200, 1]])}>
              <g transform="translate(540 2300)"><Earth t={t} s={2.4} /></g>
              <g transform={`translate(540 ${1180 + 30 * Math.sin(t * 1.4)}) rotate(${t * 25}) scale(${pop(t, 0.15, 9, 5) * 1.1})`}><Tardi t={t} /></g>
            </Layer>
            <Label x={540} y={640} size={84} s={pop(t, T.survived, 12, 6)} color="#FFE45C">IT SURVIVED SPACE</Label>
          </g>
        )}

        {scene === 'meet' && (() => {
          const ruler = pop(t, T.smaller, 12, 6);
          return (
            <g>
              <Layer cam={keys(t, [[T.Tardigrades - 0.25, 540, 1150, 1], [T.orbit - 0.3, 520, 1150, 1.1]])}>
                <rect x={-400} y={1500} width={1900} height={900} fill="#7CC77A" stroke={INK} strokeWidth={LW} />
                {/* moss blobs */}
                {[100, 330, 780, 1000].map((x, i) => <circle key={x} cx={x} cy={1500} r={90 + 20 * (i % 2)} fill="#5EAE5A" stroke={INK} strokeWidth={LW} />)}
                <g transform={`translate(${lerp(1300, 600, prog(t, T.Tardigrades - 0.2, T.Tardigrades + 0.6)) - 90 * prog(t, T.Tardigrades + 0.6, T.orbit, (u) => u)} ${1350 - 10 * Math.abs(Math.sin(t * 7))}) rotate(${2 * Math.sin(t * 7)}) scale(1.5)`}><Tardi t={t} /></g>
                <g transform={`translate(540 1780) scale(${ruler})`}>
                  <rect x={-380} y={-40} width={760} height={80} rx={10} fill="#FFE45C" stroke={INK} strokeWidth={LW} />
                  {Array.from({length: 11}).map((_, i) => <path key={i} d={`M ${-350 + i * 70} -40 L ${-350 + i * 70} ${i % 5 ? -10 : 5}`} stroke={INK} strokeWidth={6} />)}
                </g>
              </Layer>
              <Label x={540} y={640} size={92} s={pop(t, T.Tardigrades, 12, 6)} color="#fff">WATER BEARS</Label>
              <Sticker t={t} t0={T.smaller} x={540} y={840} text="LESS THAN 1 MM" size={64} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'orbit' && (() => {
          const a = (t - T.orbit) * 0.7 - 1.2;
          const cx = 540 + 380 * Math.cos(a), cy = 1300 + 160 * Math.sin(a);
          const open = prog(t, T.exposed, T.exposed + 0.5);
          return (
            <g>
              <Stars t={t} />
              <Layer cam={keys(t, [[T.orbit - 0.25, 540, 1250, 0.95], [T.exposed, 540, 1250, 0.95], [T.alive - 0.3, cx, cy - 200, 1.5]])}>
                <g transform="translate(540 1350)"><Earth t={t} s={0.75} /></g>
                <ellipse cx={540} cy={1300} rx={380} ry={160} fill="none" stroke="#fff" strokeWidth={4} strokeDasharray="14 18" opacity={0.6} />
                <g transform={`translate(${cx} ${cy}) scale(${pop(t, T.orbit, 10, 6) * 0.9})`}>
                  <Capsule open={open} />
                  {open > 0.3 && [0, 1, 2].map((i) => (
                    <g key={i} transform={`translate(${(i - 1) * 90} ${-120 - 30 * (i % 2) + 6 * Math.sin(t * 3 + i)}) rotate(${10 * Math.sin(t * 2 + i)}) scale(${0.28 * pop(t, T.exposed + 0.3 + i * 0.1, 10, 6)})`}><Tardi t={t + i} /></g>
                  ))}
                </g>
              </Layer>
              <Label x={540} y={640} size={84} s={pop(t, T.orbit, 12, 6)} color="#fff">{t < T.exposed ? 'SENT INTO ORBIT' : 'EXPOSED TO SPACE'}</Label>
              <Sticker t={t} t0={T.orbit + 0.4} t1={T.exposed} x={540} y={790} text="2007 SPACE MISSION" size={52} fill="#2C7BE5" />
            </g>
          );
        })()}

        {scene === 'back' && (
          <g>
            <Layer cam={keys(t, [[T.alive - 0.25, 540, 1150, 1], [T.trick - 0.3, 560, 1200, 1.1]])}>
              <rect x={-400} y={1550} width={1900} height={900} fill="#7CC77A" stroke={INK} strokeWidth={LW} />
              <g transform={`translate(800 ${lerp(900, 1490, prog(t, T.alive - 0.25, T.alive + 0.3))}) scale(0.9)`}><Capsule open={1} /></g>
              <g transform={`translate(420 1420) scale(1.1) rotate(${4 * Math.sin(t * 3)})`}><Tardi t={t} wave /></g>
              {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(${160 + i * 70} 1520) scale(${pop(t, T.eggs + i * 0.15, 12, 6)})`}>
                  <ellipse rx={32} ry={40} fill="#FFF7DA" stroke={INK} strokeWidth={6} />
                  <circle cx={-8} cy={-10} r={6} fill="#E9D9B0" />
                </g>
              ))}
            </Layer>
            <Label x={540} y={640} size={86} s={pop(t, T.alive, 12, 6)} color="#fff">CAME BACK ALIVE</Label>
            <Sticker t={t} t0={T.eggs} x={540} y={790} text="AND LAID EGGS" size={58} fill="#E5414A" />
          </g>
        )}

        {scene === 'trick' && (() => {
          const dry = prog(t, T.trick + 0.2, T.trick + 1.0) * (1 - prog(t, T.water + 0.2, T.water + 0.8));
          const dropY = lerp(500, 1300, prog(t, T.water - 0.5, T.water, (u) => u * u));
          return (
            <g>
              <Layer cam={keys(t, [[T.trick - 0.25, 540, 1250, 1.1], [T.water, 540, 1250, 1.2], [T.card, 540, 1250, 1.05]])}>
                <rect x={-400} y={1500} width={1900} height={900} fill="#D9B77A" stroke={INK} strokeWidth={LW} />
                {dry > 0.2 && dry < 0.95 && [0, 1, 2].map((i) => <path key={i} d={`M ${470 + i * 60} ${1180 - ((t * 200 + i * 60) % 180)} q 15 -20 0 -40`} stroke="#C99A6A" strokeWidth={8} fill="none" strokeLinecap="round" />)}
                <g transform="translate(540 1400) scale(1.4)"><Tardi t={t} dry={dry} /></g>
                {t > T.water - 0.5 && t < T.water + 0.05 && <path transform={`translate(540 ${dropY}) scale(1.6)`} d="M 0 -28 Q 22 0 18 12 Q 12 28 0 28 Q -12 28 -18 12 Q -22 0 0 -28 Z" fill="#4FA3D9" stroke={INK} strokeWidth={5} />}
                {t > T.water && t < T.water + 0.6 && <circle cx={540} cy={1400} r={60 + 400 * (t - T.water)} fill="none" stroke="#4FA3D9" strokeWidth={10 * (1 - (t - T.water) / 0.6)} />}
              </Layer>
              <Label x={540} y={640} size={80} s={pop(t, T.trick, 12, 6)} color="#fff">{t < T.water ? 'DRY OUT = PAUSE' : 'ADD WATER = GO!'}</Label>
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="38-tardigrade-space" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
