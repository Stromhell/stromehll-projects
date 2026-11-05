import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys, shake} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

// ---------------------------------------------------------------- props
const BONE = '#F6EEDC';

// height chart on the wall, ticks every 40 px
const Chart: React.FC<{mark?: number; mark2?: number}> = ({mark, mark2}) => (
  <g>
    <rect x={-70} y={-900} width={140} height={900} fill="#fff" stroke={INK} strokeWidth={LW} />
    {Array.from({length: 22}).map((_, i) => <path key={i} d={`M -70 ${-i * 40} L ${i % 5 === 0 ? 10 : -30} ${-i * 40}`} stroke={INK} strokeWidth={i % 5 === 0 ? 6 : 4} />)}
    {mark !== undefined && <path d={`M -110 ${mark} L 110 ${mark}`} stroke="#E5414A" strokeWidth={12} strokeLinecap="round" />}
    {mark2 !== undefined && <path d={`M -110 ${mark2} L 110 ${mark2}`} stroke="#2C7BE5" strokeWidth={12} strokeLinecap="round" />}
  </g>
);

const Vertebra: React.FC = () => (
  <g>
    <path d="M -110 -40 Q -120 0 -110 40 L 110 40 Q 120 0 110 -40 Z" fill={BONE} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M 110 -20 L 200 -30 L 200 20 L 110 20" fill={BONE} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -80 -20 L -40 -20 M 40 18 L 70 18" stroke="#D8CBB0" strokeWidth={6} strokeLinecap="round" />
  </g>
);

// squishy disc with a face; `sq` 0 = full and round, 1 = squashed flat
const Disc: React.FC<{t: number; sq: number; i: number; face?: boolean}> = ({t, sq, i, face = true}) => {
  const h = lerp(54, 24, sq), w = lerp(220, 250, sq);
  const blink = (t + i * 0.7) % 3 < 0.12;
  return (
    <g>
      <ellipse rx={w / 2} ry={h / 2} fill="#7CC7F0" stroke={INK} strokeWidth={7} />
      <ellipse cx={-40} cy={-h / 6} rx={30} ry={h / 7} fill="#C8ECFF" />
      {face && <g>
        <circle cx={-20} cy={0} r={blink ? 1.5 : 5} fill={INK} /><circle cx={20} cy={0} r={blink ? 1.5 : 5} fill={INK} />
        {sq > 0.5
          ? <path d="M -12 10 Q 0 4 12 10" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
          : <path d="M -12 8 Q 0 16 12 8" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />}
      </g>}
    </g>
  );
};

const Spine: React.FC<{t: number; sq: number; n?: number; faces?: number[]}> = ({t, sq, n = 5, faces = [1, 3]}) => {
  const vh = 80, dh = lerp(54, 24, sq), step = vh + dh;
  return (
    <g>
      {Array.from({length: n}).map((_, i) => {
        const y = -i * step;
        return (
          <g key={i}>
            <g transform={`translate(0 ${y})`}><Vertebra /></g>
            {i < n - 1 && <g transform={`translate(0 ${y - vh / 2 - dh / 2})`}><Disc t={t} sq={sq} i={i} face={faces.includes(i)} /></g>}
          </g>
        );
      })}
    </g>
  );
};

const Drop: React.FC<{s?: number}> = ({s = 1}) => (
  <path transform={`scale(${s})`} d="M 0 -28 Q 22 0 18 12 Q 12 28 0 28 Q -12 28 -18 12 Q -22 0 0 -28 Z" fill="#4FA3D9" stroke={INK} strokeWidth={5} />
);

const Bed: React.FC = () => (
  <g>
    <rect x={-380} y={-60} width={760} height={110} rx={20} fill="#E5414A" stroke={INK} strokeWidth={LW} />
    <rect x={-400} y={-200} width={50} height={330} rx={14} fill="#9A6236" stroke={INK} strokeWidth={LW} />
    <rect x={350} y={-120} width={50} height={250} rx={14} fill="#9A6236" stroke={INK} strokeWidth={LW} />
    <ellipse cx={-280} cy={-80} rx={80} ry={40} fill="#fff" stroke={INK} strokeWidth={LW} />
  </g>
);

const Astronaut: React.FC<{t: number}> = ({t}) => (
  <g>
    <rect x={-80} y={-60} width={160} height={210} rx={60} fill="#fff" stroke={INK} strokeWidth={LW} />
    <rect x={-50} y={-10} width={100} height={60} rx={10} fill="#D9DEE6" stroke={INK} strokeWidth={6} />
    <circle cx={-20} cy={20} r={8} fill="#E5414A" /><circle cx={10} cy={20} r={8} fill="#2C7BE5" />
    {[-1, 1].map((sd) => (
      <g key={sd}>
        <path d={`M ${sd * 70} -20 Q ${sd * 150} ${-40 + 20 * Math.sin(t * 2 + sd)} ${sd * 170} ${-110 + 15 * Math.sin(t * 2 + sd)}`} stroke={INK} strokeWidth={62} fill="none" strokeLinecap="round" />
        <path d={`M ${sd * 70} -20 Q ${sd * 150} ${-40 + 20 * Math.sin(t * 2 + sd)} ${sd * 170} ${-110 + 15 * Math.sin(t * 2 + sd)}`} stroke="#fff" strokeWidth={44} fill="none" strokeLinecap="round" />
        <path d={`M ${sd * 40} 140 L ${sd * (60 + 16 * Math.sin(t * 1.5 + sd))} 260`} stroke={INK} strokeWidth={68} strokeLinecap="round" />
        <path d={`M ${sd * 40} 140 L ${sd * (60 + 16 * Math.sin(t * 1.5 + sd))} 260`} stroke="#fff" strokeWidth={50} strokeLinecap="round" />
      </g>
    ))}
    <circle cx={0} cy={-150} r={100} fill="#fff" stroke={INK} strokeWidth={LW} />
    <ellipse cx={0} cy={-145} rx={72} ry={60} fill="#2B3566" stroke={INK} strokeWidth={6} />
    <path d="M -40 -170 Q -20 -190 0 -186" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.7} />
    <circle cx={-20} cy={-140} r={t % 3 < 0.12 ? 1.5 : 7} fill="#fff" /><circle cx={24} cy={-140} r={t % 3 < 0.12 ? 1.5 : 7} fill="#fff" />
    <path d="M -14 -112 Q 2 -100 18 -112" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>
);

const Stars: React.FC<{t: number; n?: number}> = ({t, n = 30}) => (
  <g>{Array.from({length: n}).map((_, i) => <circle key={i} cx={(i * 211) % 1080} cy={(i * 337) % 1920} r={3 + 3 * Math.abs(Math.sin(t * 1.7 + i))} fill="#fff" />)}</g>
);

const Sun: React.FC<{t: number}> = ({t}) => (
  <g>
    {Array.from({length: 10}).map((_, i) => <path key={i} transform={`rotate(${i * 36 + t * 10})`} d="M 0 -100 L 0 -140" stroke="#FFB020" strokeWidth={14} strokeLinecap="round" />)}
    <circle r={80} fill="#FFD84A" stroke={INK} strokeWidth={LW} />
  </g>
);

export const TallerMorning: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.spine - 0.25 ? 'morning' : t < T.gravity - 0.25 ? 'spine' : t < T.sleep - 0.25 ? 'squash'
    : t < T.astronauts - 0.25 ? 'night' : 'space';
  const cues: Cue[] = [
    {f: 'whoosh', at: 0.15, db: -24}, {f: 'ding', at: T.taller, db: -20},
    {f: 'whoosh', at: T.spine - 0.25, db: -24}, {f: 'boing', at: T.discs, db: -20},
    {f: 'whoosh', at: T.gravity - 0.25, db: -24}, {f: 'squeeze', at: T.gravity + 0.2, db: -20}, {f: 'pour', at: T.water, db: -24},
    {f: 'wobble', at: T.shrink, db: -22},
    {f: 'whoosh', at: T.sleep - 0.25, db: -24}, {f: 'snore', at: T.sleep + 0.4, db: -24}, {f: 'rise', at: T.stretch, db: -22},
    {f: 'whoosh', at: T.astronauts - 0.25, db: -24}, {f: 'zap', at: T.astronauts + 0.4, db: -24}, {f: 'ding', at: T.astronauts + 1.4, db: -18},
  ];
  const bgCol = scene === 'night' ? '#2B3566' : scene === 'space' ? '#141A33' : scene === 'morning' ? '#FFE7A8' : '#CFEFFF';
  return (
    <AbsoluteFill style={{background: bgCol}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={bgCol} />

        {scene === 'morning' && (() => {
          const markUp = prog(t, T.taller + 0.2, T.taller + 0.6);
          return (
            <g>
            <Layer cam={keys(t, [[0.6, 540, 960, 1], [T.spine - 0.25, 420, 990, 1.1]])}>
              <g transform="translate(760 940)"><Sun t={t} /></g>
              <rect x={-400} y={1680} width={1900} height={700} fill="#C99A6A" stroke={INK} strokeWidth={LW} />
              <g transform="translate(260 1680)"><Chart mark={markUp > 0 ? lerp(-330, -390, markUp) : undefined} /></g>
              <g transform={`translate(${lerp(-200, 470, prog(t, 0, 0.6))} 1680) scale(0.85)`}>
                <Guy t={t} expr="happy" handL={[-110, -180]} handR={[150, -360]} bendR={-0.3} look={[-10, -6]} stand blink={t % 2.7 < 0.12} />
              </g>
            </Layer>
              <Label x={540} y={640} size={82} s={pop(t, T.taller, 12, 6)} color="#fff">TALLER AT 7 AM</Label>
            </g>
          );
        })()}

        {scene === 'spine' && (
          <g>
            <Layer cam={keys(t, [[T.spine - 0.25, 540, 1200, 1], [T.discs - 0.1, 540, 1200, 1], [T.discs + 0.5, 540, 1180, 1.35]])}>
              <g transform={`translate(540 ${lerp(1900, 1560, prog(t, T.spine - 0.25, T.spine + 0.3))})`}><Spine t={t} sq={0} /></g>
            </Layer>
            <Label x={540} y={640} size={84} s={pop(t, T.spine, 12, 6)} color="#fff">YOUR SPINE</Label>
            <Sticker t={t} t0={T.discs} x={540} y={1760} text="SOFT, SQUISHY DISCS" size={58} fill="#2C7BE5" />
          </g>
        )}

        {scene === 'squash' && (() => {
          const sq = prog(t, T.gravity + 0.1, T.shrink + 0.2);
          const [jx] = sq > 0.05 && sq < 0.99 ? shake(t, 3) : [0, 0];
          const press = 20 * Math.sin(t * 4);
          return (
            <g>
            <Layer cam={keys(t, [[T.shrink, 540, 960, 1], [T.sleep - 0.25, 560, 980, 1.08]])}>
              <g transform={`translate(${470 + jx} 1600)`}><Spine t={t} sq={sq} /></g>
              {/* gravity arrows pressing down */}
              {[330, 470, 610].map((x, i) => (
                <g key={x} transform={`translate(${x} ${820 + press + i * 10}) scale(${pop(t, T.gravity + i * 0.1, 12, 6)})`}>
                  <path d="M 0 -60 L 0 40" stroke={INK} strokeWidth={32} strokeLinecap="round" />
                  <path d="M 0 -60 L 0 40" stroke="#E5414A" strokeWidth={18} strokeLinecap="round" />
                  <path d="M -36 30 L 0 80 L 36 30 Z" fill="#E5414A" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
                </g>
              ))}
              {/* water drops leaving the discs */}
              {t > T.water && Array.from({length: 8}).map((_, i) => {
                const a = t - T.water - (i % 4) * 0.25; if (a < 0) return null;
                const side = i % 2 ? 1 : -1;
                return <g key={i} transform={`translate(${470 + side * (150 + 220 * a)} ${1250 + (i % 4) * 90 + 300 * a * a})`} opacity={Math.max(0, 1 - a)}><Drop /></g>;
              })}
              {/* height marker on the right */}
              <g transform="translate(900 1720) scale(0.8)">
                <Chart mark2={-560} mark={sq > 0.02 ? lerp(-560, -600, 0) + 60 * sq : undefined} />
              </g>
            </Layer>
              <g transform="translate(900 930)"><Label x={0} y={0} size={60} s={pop(t, T.shrink, 12, 6)} color="#E5414A">-1 CM</Label></g>
              <Label x={540} y={640} size={84} s={pop(t, T.gravity, 12, 6)} color="#fff">GRAVITY SQUASH</Label>
            </g>
          );
        })()}

        {scene === 'night' && (() => {
          const refill = prog(t, T.sleep + 0.3, T.stretch);
          const stretch = prog(t, T.stretch, T.stretch + 0.6);
          return (
            <g>
              <Stars t={t} n={18} />
              <circle cx={850} cy={900} r={70} fill="#FFF3B0" stroke={INK} strokeWidth={LW} />
              <circle cx={880} cy={880} r={60} fill="#2B3566" />
              <g transform="translate(540 1500)"><Bed /></g>
              <g transform={`translate(${lerp(620, 660, stretch)} 1440) rotate(-90) scale(0.7 ${0.7 * lerp(1, 1.08, stretch)})`}>
                <Guy t={t} expr="happy" handL={[stretch > 0 ? -60 : -110, stretch > 0 ? -460 : -170]} handR={[stretch > 0 ? 60 : 110, stretch > 0 ? -460 : -170]} stand blink={stretch === 0} />
              </g>
              {/* little spine bubble refilling */}
              <g transform={`translate(300 1060) scale(${pop(t, T.sleep + 0.2, 12, 6)})`}>
                <circle r={170} fill="#CFEFFF" stroke={INK} strokeWidth={LW} />
                <g transform="translate(0 110) scale(0.55)"><Spine t={t} sq={1 - refill} n={4} faces={[1]} /></g>
                {refill > 0 && refill < 1 && Array.from({length: 4}).map((_, i) => {
                  const a = ((t * 1.4 + i * 0.25) % 1);
                  return <g key={i} transform={`translate(${(i % 2 ? 1 : -1) * lerp(150, 50, a)} ${-40 + i * 30})`} opacity={1 - a}><Drop s={0.7} /></g>;
                })}
              </g>
              {t > T.sleep + 0.4 && t < T.stretch && <text x={760} y={1260} fontFamily={FONT} fontWeight={900} fontSize={60} fill="#fff" opacity={0.5 + 0.5 * Math.sin(t * 3)}>Z z z</text>}
              <Label x={540} y={640} size={72} s={pop(t, T.sleep, 12, 6)} color="#fff">{t < T.stretch ? 'SLEEP = REFILL' : 'STRETCH OUT'}</Label>
            </g>
          );
        })()}

        {scene === 'space' && (() => {
          const grow = prog(t, T.astronauts + 0.5, T.astronauts + 1.4);
          return (
            <g>
              <Stars t={t} />
              <circle cx={180} cy={1700} r={260} fill="#4FA3D9" stroke={INK} strokeWidth={LW} />
              <path d="M 40 1600 Q 120 1540 200 1610 Q 260 1660 330 1620" stroke="#5EAE5A" strokeWidth={40} fill="none" strokeLinecap="round" />
              <g transform={`translate(540 ${1180 + 20 * Math.sin(t * 1.2)}) rotate(${8 * Math.sin(t * 0.9)}) scale(1 ${lerp(1, 1.06, grow)})`}><Astronaut t={t} /></g>
              <g transform="translate(880 1640) scale(0.75)"><Chart mark2={-640} mark={grow > 0 ? -640 - 120 * grow : undefined} /></g>
              <g transform="translate(880 880)"><Label x={0} y={0} size={64} s={pop(t, T.astronauts + 1.4, 12, 6)} color="#3CB371">+5 CM</Label></g>
              <Label x={540} y={640} size={76} s={pop(t, T.astronauts, 12, 6)} color="#fff">ASTRONAUTS GROW</Label>
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="34-taller-morning" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
