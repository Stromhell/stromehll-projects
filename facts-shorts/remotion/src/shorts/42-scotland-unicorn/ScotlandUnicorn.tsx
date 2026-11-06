import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const GOLD = '#F2B632', SALTIRE = '#005EB8';

// side-view unicorn facing right; gallop 0..1 swings legs; rear lifts the front
const Unicorn: React.FC<{t: number; gallop?: number; rear?: number; chain?: number}> = ({t, gallop = 0, rear = 0, chain = 0}) => {
  const blink = t % 3 < 0.12;
  const lg = (i: number) => gallop * 26 * Math.sin(t * 10 + (i % 2) * Math.PI);
  return (
    <g transform={`rotate(${-25 * rear} -150 80)`}>
      {[-150, -90, 90, 150].map((x, i) => (
        <g key={x}>
          <path d={`M ${x} 60 L ${x + lg(i)} 190`} stroke={INK} strokeWidth={42} strokeLinecap="round" />
          <path d={`M ${x} 60 L ${x + lg(i)} 190`} stroke="#fff" strokeWidth={26} strokeLinecap="round" />
          <ellipse cx={x + lg(i)} cy={200} rx={22} ry={12} fill={GOLD} stroke={INK} strokeWidth={6} />
        </g>
      ))}
      {/* tail */}
      <path d={`M -210 -10 Q ${-300 + 10 * Math.sin(t * 4)} 20 ${-280 + 20 * Math.sin(t * 3)} 140`} stroke="#B78CFF" strokeWidth={40} fill="none" strokeLinecap="round" />
      <ellipse cx={0} cy={10} rx={230} ry={110} fill="#fff" stroke={INK} strokeWidth={LW} />
      {/* neck + head */}
      <path d="M 140 -40 L 220 -200 L 300 -170 L 230 40 Z" fill="#fff" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <ellipse cx={300} cy={-200} rx={110} ry={65} fill="#fff" stroke={INK} strokeWidth={LW} transform="rotate(20 300 -200)" />
      <path d="M 230 -260 Q 150 -230 140 -100 Q 170 -150 200 -150 Q 160 -80 190 -20" stroke="#FF8AC4" strokeWidth={36} fill="none" strokeLinecap="round" />
      <path d="M 270 -250 L 330 -400 L 310 -245 Z" fill={GOLD} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 300 -290 L 318 -298 M 308 -330 L 324 -336" stroke={INK} strokeWidth={5} />
      <path d="M 250 -255 L 240 -300 L 275 -265" fill="#fff" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={310} cy={-210} r={blink ? 2 : 11} fill={INK} />
      <circle cx={385} cy={-175} r={6} fill={INK} />
      {chain > 0 && <g opacity={chain}>
        <ellipse cx={210} cy={-60} rx={60} ry={24} fill="none" stroke={GOLD} strokeWidth={14} transform="rotate(60 210 -60)" />
        {Array.from({length: 7}).map((_, i) => <ellipse key={i} cx={180 - i * 55} cy={-20 + i * 32 + 6 * Math.sin(t * 3 + i)} rx={24} ry={14} fill="none" stroke={GOLD} strokeWidth={9} />)}
      </g>}
    </g>
  );
};

const Shield: React.FC = () => (
  <g>
    <path d="M -230 -260 L 230 -260 L 230 0 Q 230 200 0 290 Q -230 200 -230 0 Z" fill={SALTIRE} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <path d="M -230 -260 L 230 220 M 230 -260 L -230 220" stroke="#fff" strokeWidth={50} />
    <path d="M -230 -260 L 230 -260 L 230 0 Q 230 200 0 290 Q -230 200 -230 0 Z" fill="none" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    <g transform="translate(0 -330)">
      <path d="M -110 40 L -130 -50 L -60 0 L 0 -70 L 60 0 L 130 -50 L 110 40 Z" fill={GOLD} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <circle cx={0} cy={-80} r={16} fill="#E5414A" stroke={INK} strokeWidth={6} />
    </g>
  </g>
);

const Sparkles: React.FC<{t: number; n?: number; r?: number}> = ({t, n = 8, r = 300}) => (
  <g>{Array.from({length: n}).map((_, i) => {
    const a = i / n * Math.PI * 2 + t * 0.6, k = 0.6 + 0.4 * Math.sin(t * 5 + i);
    return <path key={i} transform={`translate(${r * Math.cos(a)} ${r * 0.7 * Math.sin(a)}) scale(${k})`} d="M 0 -30 L 8 -8 L 30 0 L 8 8 L 0 30 L -8 8 L -30 0 L -8 -8 Z" fill="#FFE45C" stroke={INK} strokeWidth={4} />;
  })}</g>
);

const Hills: React.FC = () => (
  <g>
    <path d="M -400 1500 Q 100 1250 540 1420 Q 900 1300 1500 1460 L 1500 2400 L -400 2400 Z" fill="#6DAA5C" stroke={INK} strokeWidth={LW} />
    <path d="M -400 1640 Q 300 1520 700 1620 Q 1100 1560 1500 1640 L 1500 2400 L -400 2400 Z" fill="#7FBF6A" stroke={INK} strokeWidth={LW} />
    {[160, 420, 880].map((x) => <g key={x} transform={`translate(${x} 1700)`}><circle r={18} fill="#9B59B6" stroke={INK} strokeWidth={5} /><path d="M 0 18 L 0 60" stroke="#3F8A4A" strokeWidth={8} /></g>)}
  </g>
);

export const ScotlandUnicorn: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.lion - 0.25 ? 'intro' : t < T.kings - 0.25 ? 'notlion' : t < T.tame - 0.25 ? 'arms' : t < T.chain - 1.1 ? 'tame' : 'chain';
  const cues: Cue[] = [
    {f: 'step', at: 0.2, db: -22}, {f: 'ding', at: T.unicorn, db: -18},
    {f: 'whoosh', at: T.lion - 0.25, db: -24}, {f: 'blegh', at: T.lion + 0.1, db: -20}, {f: 'blegh', at: T.lion + 0.8, db: -20}, {f: 'ding', at: T.lion + 1.4, db: -18},
    {f: 'whoosh', at: T.kings - 0.25, db: -24}, {f: 'pop', at: T.kings + 0.1, db: -18}, {f: 'rise', at: T.purity, db: -22},
    {f: 'whoosh', at: T.tame - 0.25, db: -24}, {f: 'boing', at: T.tame + 0.3, db: -18}, {f: 'step', at: T.tame + 0.6, db: -18},
    {f: 'whoosh', at: T.chain - 0.25, db: -24}, {f: 'clink', at: T.chain + 0.1, db: -16}, {f: 'clink', at: T.chain + 0.4, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: '#BFE8FF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#BFE8FF" />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1250, 1], [T.lion - 0.3, 560, 1300, 1.12]])}>
              <Hills />
              <g transform={`translate(${lerp(-300, 470, prog(t, 0, 1.0))} ${1360 - 30 * Math.abs(Math.sin(t * 5))}) scale(0.85)`}><Unicorn t={t} gallop={t < 1.0 ? 1 : 0.3} /></g>
              <g transform="translate(560 1250)"><Sparkles t={t} n={6} r={340} /></g>
            </Layer>
            <Label x={540} y={640} size={55} s={pop(t, 0.2, 12, 6)} color="#fff">SCOTLAND'S NATIONAL ANIMAL</Label>
            <Sticker t={t} t0={T.unicorn} x={540} y={790} text="THE UNICORN" size={78} fill="#FF5FA8" />
          </g>
        )}

        {scene === 'notlion' && (
          <g>
            <Layer cam={keys(t, [[T.lion - 0.25, 540, 1250, 1], [T.kings - 0.3, 540, 1260, 1.05]])}>
              <Hills />
              {[{x: 260, t0: T.lion, e: '🦁', n: 'LION'}, {x: 820, t0: T.lion + 0.7, e: '🦌', n: 'STAG'}].map((o) => (
                <g key={o.n} transform={`translate(${o.x} 1300) scale(${0.8 * pop(t, o.t0, 12, 6)})`}>
                  <circle r={170} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <text y={60} textAnchor="middle" fontSize={170}>{o.e}</text>
                  <g transform="translate(0 240)"><Label x={0} y={0} size={60} color="#fff">{o.n}</Label></g>
                  <path d="M -120 -120 L 120 120 M 120 -120 L -120 120" stroke="#E5414A" strokeWidth={30 * Math.min(1, Math.max(0, (t - o.t0 - 0.3) * 4))} strokeLinecap="round" />
                </g>
              ))}
              <g transform={`translate(540 ${1420 - 20 * Math.abs(Math.sin(t * 4))}) scale(${0.45 * pop(t, T.lion + 1.3, 10, 6)})`}><Unicorn t={t} gallop={0.4} /></g>
            </Layer>
            <Label x={540} y={640} size={86} s={pop(t, T.lion, 12, 6)} color="#fff">NOT A LION</Label>
          </g>
        )}

        {scene === 'arms' && (
          <g>
            <Layer cam={keys(t, [[T.kings - 0.25, 540, 1200, 1], [T.tame - 0.3, 540, 1250, 1.1]])}>
              <g transform={`translate(540 1470) scale(${0.85 * pop(t, T.kings, 10, 6)})`}><Shield /></g>
              <g transform={`translate(880 1560) scale(${-0.48 * pop(t, T.kings + 0.3, 10, 6)} ${0.48 * pop(t, T.kings + 0.3, 10, 6)}) rotate(-12)`}><Unicorn t={t} /></g>
              {t > T.purity && <g transform="translate(540 1470)"><Sparkles t={t} n={10} r={420} /></g>}
            </Layer>
            <Label x={540} y={640} size={78} s={pop(t, T.kings, 12, 6)} color="#FFE45C">{t < T.purity ? 'ON THE ROYAL ARMS' : 'PURITY + POWER'}</Label>
            <Sticker t={t} t0={T.kings + 0.6} x={540} y={790} text="FOR 500+ YEARS" size={60} fill={SALTIRE} />
          </g>
        )}

        {scene === 'tame' && (() => {
          const rear = Math.max(0, Math.sin((t - T.tame) * 4));
          return (
            <g>
              <Layer cam={keys(t, [[T.tame - 0.25, 540, 1250, 1], [T.chain - 1.1, 560, 1280, 1.06]])}>
                <Hills />
                <g transform={`translate(680 1380) scale(0.75)`}><Unicorn t={t} rear={rear} /></g>
                <g transform={`translate(${lerp(220, 340, prog(t, T.tame, T.chain - 1.1))} 1640) scale(0.7)`}>
                  <Guy t={t} expr="hope" handL={[-120, -170]} handR={[170, -300]} stand blink={t % 2.9 < 0.12} stepL={8 * Math.sin(t * 8)} stepR={-8 * Math.sin(t * 8)} />
                  <path d="M -110 -470 L -130 -560 L -60 -510 L 10 -590 L 80 -510 L 150 -560 L 130 -470 Z" fill={GOLD} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
                </g>
              </Layer>
              <Label x={540} y={640} size={57} s={pop(t, T.tame, 12, 6)} color="#fff">ONLY A KING COULD TAME IT</Label>
            </g>
          );
        })()}

        {scene === 'chain' && (
          <g>
            <Layer cam={keys(t, [[T.chain - 1.1, 540, 1250, 1], [T.card, 560, 1300, 1.12]])}>
              <Hills />
              <g transform="translate(480 1430) scale(0.75)"><Unicorn t={t} chain={prog(t, T.chain - 0.9, T.chain - 0.3)} /></g>
              <g transform="translate(520 1400)"><Sparkles t={t} n={6} r={300} /></g>
            </Layer>
            <Label x={540} y={640} size={68} s={pop(t, T.chain - 1.0, 12, 6)} color="#FFE45C">SO IT WEARS A CHAIN</Label>
            <Sticker t={t} t0={T.chain - 0.6} x={540} y={790} text="LOOK CLOSELY NEXT TIME" size={50} fill="#FF5FA8" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="42-scotland-unicorn" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
