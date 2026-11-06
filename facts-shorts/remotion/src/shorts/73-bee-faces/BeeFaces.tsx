import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const BG = '#FFF4CC', YEL = '#FFC93C', SKIN = '#F2C29B';

const Bee: React.FC<{t: number; s?: number}> = ({t, s = 1}) => (
  <g transform={`scale(${s}) rotate(${6 * Math.sin(t * 4)})`}>
    {[-1, 1].map((k) => <ellipse key={k} cx={k * 30} cy={-70} rx={50} ry={34} fill="#DDF2FF" fillOpacity={0.85} stroke={INK} strokeWidth={5} transform={`rotate(${k * (20 + 25 * Math.sin(t * 50))} ${k * 10} -40)`} />)}
    <ellipse cx={0} cy={0} rx={90} ry={65} fill={YEL} stroke={INK} strokeWidth={LW} />
    <path d="M -30 -60 L -30 60 M 20 -63 L 20 63" stroke={INK} strokeWidth={22} />
    <circle cx={90} cy={-10} r={42} fill={YEL} stroke={INK} strokeWidth={LW} />
    <circle cx={105} cy={-20} r={9} fill={INK} />
    <path d="M 100 -50 Q 120 -100 140 -95 M 85 -50 Q 90 -100 110 -105" stroke={INK} strokeWidth={5} fill="none" />
    <path d="M -90 0 L -125 0" stroke={INK} strokeWidth={8} strokeLinecap="round" />
  </g>
);

// simple face photo; v changes features slightly
const Face: React.FC<{v: number; hi?: boolean}> = ({v, hi}) => (
  <g>
    <rect x={-120} y={-150} width={240} height={300} rx={20} fill="#fff" stroke={hi ? '#2FA35A' : INK} strokeWidth={hi ? 14 : LW} />
    <ellipse cx={0} cy={0} rx={80 + v * 6} ry={100 - v * 5} fill={SKIN} stroke={INK} strokeWidth={6} />
    <path d={`M ${-80 - v * 4} -40 Q 0 ${-150 + v * 10} ${80 + v * 4} -40`} fill={['#4A3524', '#E8A040', '#222'][v % 3]} stroke={INK} strokeWidth={5} />
    <circle cx={-30} cy={-5} r={9 + (v % 2) * 3} fill={INK} /><circle cx={30} cy={-5} r={9 + (v % 2) * 3} fill={INK} />
    <path d={`M -8 10 L ${-12 + v * 3} 40 L 8 40`} stroke={INK} strokeWidth={5} fill="none" />
    <path d={`M -30 ${60 + v * 3} Q 0 ${80 - v * 6} 30 ${60 + v * 3}`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
);

export const BeeFaces: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.y2005 - 0.25 ? 'intro' : t < T.later - 0.25 ? 'train' : t < T.puzzle - 0.6 ? 'later' : 'puzzle';
  const cues: Cue[] = [
    {f: 'wobble', at: 0.2, db: -22}, {f: 'ding', at: 1.2, db: -18},
    {f: 'whoosh', at: T.y2005 - 0.25, db: -24}, {f: 'pop', at: T.y2005 + 0.3, db: -20}, {f: 'pop', at: T.y2005 + 0.45, db: -20}, {f: 'pop', at: T.y2005 + 0.6, db: -20}, {f: 'slurp', at: T.sugar + 0.3, db: -20},
    {f: 'whoosh', at: T.later - 0.25, db: -24}, {f: 'ticktock', at: T.later, db: -22}, {f: 'ding', at: T.later + 1.2, db: -16},
    {f: 'whoosh', at: T.puzzle - 0.85, db: -24}, {f: 'pop', at: T.puzzle - 0.3, db: -20}, {f: 'pop', at: T.puzzle, db: -20}, {f: 'pop', at: T.puzzle + 0.3, db: -20},
  ];
  return (
    <AbsoluteFill style={{background: BG}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={BG} />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1120, 1.05], [T.y2005 - 0.3, 540, 1120, 1]])}>
              <g transform={`translate(540 1450) scale(${1.1 * pop(t, 0.1, 10, 6)})`}><Face v={0} /></g>
              <g transform={`translate(${540 + 250 * Math.cos(t * 2)} ${1200 + 80 * Math.sin(t * 4)}) scale(${Math.cos(t * 2) > 0 ? -1 : 1} 1)`}><Bee t={t} s={0.9} /></g>
            </Layer>
            <Label x={540} y={640} size={74} s={pop(t, 0.1, 12, 6)} color="#fff">BEES CAN RECOGNISE</Label>
            <Sticker t={t} t0={0.6} x={540} y={790} text="HUMAN FACES" size={72} fill="#E8A040" />
          </g>
        )}

        {scene === 'train' && (() => {
          const pick = t > T.sugar + 0.2;
          return (
            <g>
              <Layer cam={keys(t, [[T.y2005 - 0.25, 540, 1120, 1], [T.later - 0.3, 540, 1120, 1.04]])}>
                {[0, 1, 2].map((i) => <g key={i} transform={`translate(${220 + i * 320} 1450) scale(${0.85 * pop(t, T.y2005 + 0.2 + i * 0.15, 12, 6)})`}><Face v={i} hi={pick && i === 1} /></g>)}
                {pick && <g transform="translate(540 1680)"><ellipse rx={80} ry={30} fill="#9FD8F5" stroke={INK} strokeWidth={6} /><text y={90} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={44} fill={INK}>SUGAR WATER</text></g>}
                <g transform={`translate(${lerp(900, 560, prog(t, T.y2005 + 0.4, T.sugar + 0.2))} ${lerp(1100, 1600, prog(t, T.sugar, T.sugar + 0.4))})`}><Bee t={t} s={0.6} /></g>
              </Layer>
              <Label x={540} y={640} size={66} s={pop(t, T.y2005, 12, 6)} color="#fff">A 2005 EXPERIMENT</Label>
              <Sticker t={t} t0={T.y2005 + 0.4} x={540} y={790} text="TRAINED TO PICK ONE FACE" size={48} fill="#2FA35A" />
            </g>
          );
        })()}

        {scene === 'later' && (() => {
          const right = t > T.later + 1.1;
          return (
            <g>
              <Layer cam={keys(t, [[T.later - 0.25, 540, 1120, 1], [T.puzzle - 0.9, 540, 1120, 1.05]])}>
                {[2, 1, 0].map((v, i) => <g key={i} transform={`translate(${220 + i * 320} 1450) scale(0.85)`}><Face v={v} hi={right && v === 1} /></g>)}
                <g transform={`translate(${lerp(900, 540, prog(t, T.later + 0.3, T.later + 1.1))} ${lerp(1100, 1200, prog(t, T.later + 0.3, T.later + 1.1))})`}><Bee t={t} s={0.6} /></g>
                <g transform={`translate(540 1810) scale(${pop(t, T.later, 12, 6)})`}>
                  <rect x={-260} y={-55} width={520} height={100} rx={22} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={54} fill={INK}>2 DAYS LATER</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={70} s={pop(t, T.later, 12, 6)} color="#fff">{right ? 'STILL REMEMBERED!' : 'NO SUGAR THIS TIME'}</Label>
            </g>
          );
        })()}

        {scene === 'puzzle' && (
          <g>
            <Layer cam={keys(t, [[T.puzzle - 0.85, 540, 1120, 1], [T.card, 540, 1120, 1.06]])}>
              <g transform="translate(540 1430) scale(1.2)">
                <rect x={-120} y={-150} width={240} height={300} rx={20} fill="#fff" stroke={INK} strokeWidth={LW} />
                <ellipse cx={0} cy={0} rx={80} ry={100} fill={SKIN} stroke={INK} strokeWidth={6} opacity={0.4} />
                <g transform={`translate(${lerp(-200, 0, prog(t, T.puzzle - 0.5, T.puzzle - 0.2))} 0)`}><circle cx={-30} cy={-5} r={9} fill={INK} /><circle cx={30} cy={-5} r={9} fill={INK} /></g>
                <g transform={`translate(${lerp(220, 0, prog(t, T.puzzle - 0.2, T.puzzle + 0.1))} 0)`}><path d="M -8 10 L -12 40 L 8 40" stroke={INK} strokeWidth={5} fill="none" /></g>
                <g transform={`translate(0 ${lerp(250, 0, prog(t, T.puzzle + 0.1, T.puzzle + 0.4))})`}><path d="M -30 60 Q 0 80 30 60" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" /></g>
              </g>
              <g transform="translate(860 1120)"><Bee t={t} s={0.5} /></g>
            </Layer>
            <Label x={540} y={640} size={64} s={pop(t, T.puzzle - 0.85, 12, 6)} color="#fff">EYES + NOSE + MOUTH</Label>
            <Sticker t={t} t0={T.puzzle} x={540} y={790} text="PIECED LIKE A PUZZLE" size={56} fill="#E8A040" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="73-bee-faces" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
