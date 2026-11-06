import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const SKY = '#BFE8FF', SOIL = '#9A6B43', PINE = '#F2B33D', PINE2 = '#D98A1E', LEAF = '#3F9A4A';

const Leaves: React.FC<{s?: number; t: number}> = ({s = 1, t}) => (
  <g transform={`scale(${s})`}>
    {[-60, -35, -12, 12, 35, 60].map((a, i) => <path key={i} transform={`rotate(${a + 3 * Math.sin(t * 2 + i)})`} d="M 0 0 Q -25 -120 0 -230 Q 25 -120 0 0 Z" fill={i % 2 ? LEAF : '#4FB35A'} stroke={INK} strokeWidth={6} />)}
  </g>
);

// pineapple centred at (0,0); split 0..1 pushes the berry cells apart
const Pineapple: React.FC<{t: number; s?: number; split?: number; faces?: boolean}> = ({t, s = 1, split = 0, faces}) => (
  <g transform={`scale(${s})`}>
    <g transform="translate(0 -150)"><Leaves t={t} s={0.8} /></g>
    {split < 0.05 && <ellipse rx={120} ry={160} fill={PINE} stroke={INK} strokeWidth={LW} />}
    {Array.from({length: 5}).map((_, r) => Array.from({length: 4 + (r % 2)}).map((_, c) => {
      const n = 4 + (r % 2), x = (c - (n - 1) / 2) * 52, y = -110 + r * 55;
      if (Math.abs(x) > 115 * Math.sqrt(Math.max(0, 1 - (y / 165) ** 2))) return null;
      const k = 1 + split * 1.6;
      return (
        <g key={`${r}${c}`} transform={`translate(${x * k} ${y * k})`}>
          <path d="M 0 -26 L 24 0 L 0 26 L -24 0 Z" fill={split > 0.05 ? PINE : 'none'} stroke={PINE2} strokeWidth={split > 0.05 ? 5 : 6} />
          {faces && split > 0.5 && <><circle cx={-7} cy={-3} r={3.5} fill={INK} /><circle cx={7} cy={-3} r={3.5} fill={INK} /><path d="M -6 7 Q 0 12 6 7" stroke={INK} strokeWidth={3} fill="none" /></>}
        </g>
      );
    }))}
  </g>
);

export const PineappleYears: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.plant - 0.25 ? 'grow' : t < T.fruit - 0.25 ? 'one' : t < T.pizza - 0.25 ? 'berries' : 'pizza';
  const cues: Cue[] = [
    {f: 'rise', at: 0.3, db: -22}, {f: 'tick', at: T.pineapple + 0.6, db: -22}, {f: 'ding', at: T.plant - 0.5, db: -20},
    {f: 'whoosh', at: T.plant - 0.25, db: -24}, {f: 'pop', at: T.plant + 0.3, db: -20},
    {f: 'whoosh', at: T.fruit - 0.25, db: -24}, {f: 'boing', at: T.berries, db: -20}, {f: 'pop', at: T.berries + 0.3, db: -20}, {f: 'pop', at: T.berries + 0.5, db: -20},
    {f: 'whoosh', at: T.pizza - 0.25, db: -24}, {f: 'plop', at: T.pizza + 0.2, db: -20}, {f: 'step', at: T.toddler, db: -20}, {f: 'step', at: T.toddler + 0.4, db: -20}, {f: 'boing', at: T.toddler + 0.9, db: -20},
  ];
  return (
    <AbsoluteFill style={{background: SKY}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={SKY} />

        {scene === 'grow' && (() => {
          const g = prog(t, 0.2, T.plant - 0.5, (u) => u);
          const months = Math.round(24 * g);
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1080, 1], [T.plant - 0.3, 540, 1090, 1.04]])}>
                <rect x={-400} y={1650} width={1900} height={800} fill={SOIL} stroke={INK} strokeWidth={LW} />
                <g transform={`translate(400 1650) scale(${0.3 + 0.7 * g})`}><Leaves t={t} s={1.6} /></g>
                <g transform={`translate(400 ${1650 - 330 * (0.3 + 0.7 * g)}) scale(${0.9 * prog(t, (T.plant - 0.5) * 0.55, T.plant - 0.5)})`}><Pineapple t={t} /></g>
                <g transform={`translate(820 1380) rotate(4) scale(${pop(t, T.pineapple + 0.5, 12, 6)})`}>
                  <rect x={-150} y={-150} width={300} height={280} rx={20} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <rect x={-150} y={-150} width={300} height={80} rx={20} fill="#E5414A" stroke={INK} strokeWidth={LW} />
                  <text y={-92} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={44} fill="#fff">MONTHS</text>
                  <text y={90} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={130} fill={INK}>{months}</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={86} s={pop(t, 0.1, 12, 6)} color="#fff">ONE PINEAPPLE</Label>
              <Sticker t={t} t0={T.pineapple + 0.6} x={540} y={790} text="TAKES 2 YEARS TO GROW" size={54} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'one' && (
          <g>
            <Layer cam={keys(t, [[T.plant - 0.25, 540, 1130, 1], [T.fruit - 0.3, 540, 1140, 1.05]])}>
              <rect x={-400} y={1650} width={1900} height={800} fill={SOIL} stroke={INK} strokeWidth={LW} />
              {[180, 540, 900].map((x, i) => (
                <g key={x}>
                  <g transform={`translate(${x} 1650) scale(1.1)`}><Leaves t={t + i} s={1.4} /></g>
                  <g transform={`translate(${x} ${1300 - 10 * Math.abs(Math.sin(t * 3 + i))}) scale(${0.75 * pop(t, T.plant + 0.2 + i * 0.15, 12, 6)})`}><Pineapple t={t} /></g>
                  <text x={x} y={1790} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={80} fill="#fff" stroke={INK} strokeWidth={12} paintOrder="stroke" opacity={pop(t, T.plant + 0.5 + i * 0.15, 12, 6)}>x1</text>
                </g>
              ))}
            </Layer>
            <Label x={540} y={640} size={84} s={pop(t, T.plant, 12, 6)} color="#fff">ONE PER PLANT</Label>
            <Sticker t={t} t0={T.plant + 0.5} x={540} y={790} text="AT A TIME" size={64} fill="#2FA35A" />
          </g>
        )}

        {scene === 'berries' && (() => {
          const sp = prog(t, T.berries - 0.1, T.berries + 0.6);
          return (
            <g>
              <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#FFF1C9" />
              <Layer cam={keys(t, [[T.fruit - 0.25, 540, 1100, 1], [T.pizza - 0.3, 540, 1100, 1.0]])}>
                <g transform={`translate(540 1500) rotate(${3 * Math.sin(t * 2)})`}><Pineapple t={t} s={1.55} split={sp} faces /></g>
              </Layer>
              <Label x={540} y={640} size={84} s={pop(t, T.fruit, 12, 6)} color="#fff">{sp > 0.1 ? 'DOZENS OF BERRIES' : 'NOT ONE FRUIT...'}</Label>
              {sp > 0.1 && <Sticker t={t} t0={T.berries + 0.4} x={540} y={790} text="FUSED TOGETHER" size={64} fill={PINE2} />}
            </g>
          );
        })()}

        {scene === 'pizza' && (() => {
          const tod = t > T.toddler - 0.2;
          return (
            <g>
              <Layer cam={keys(t, [[T.pizza - 0.25, 540, 1300, 1], [T.card, 540, 1320, 1.08]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill="#C9A06A" stroke={INK} strokeWidth={LW} />
                <g transform={`translate(${tod ? 300 : 540} 1500) rotate(${tod ? -8 : 0}) scale(${tod ? 0.7 : 1})`}>
                  <path d="M 0 180 L -220 -200 Q 0 -280 220 -200 Z" fill="#F7C94B" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
                  <path d="M -220 -200 Q 0 -280 220 -200 L 200 -170 Q 0 -240 -200 -170 Z" fill="#D9963A" stroke={INK} strokeWidth={6} />
                  {[[-60, -100], [60, -80], [0, 20], [-20, -170], [70, -160]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y - 200 * (1 - pop(t, T.pizza + i * 0.1, 10, 6))})`}><path d="M -26 -20 L 26 -20 L 20 20 L -20 20 Z" fill={PINE} stroke={INK} strokeWidth={5} /></g>)}
                  {[[-90, -40], [40, -140], [80, 0]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={22} fill="#C0392B" stroke={INK} strokeWidth={5} />)}
                </g>
                {tod && <g transform={`translate(${lerp(600, 820, prog(t, T.toddler, T.card, (u) => u))} 1700) scale(0.55)`}>
                  <Guy t={t} expr="happy" handL={[-170, -330]} handR={[170, -330]} stand stepL={Math.max(0, Math.sin(t * 6))} stepR={Math.max(0, -Math.sin(t * 6))} lean={8 * Math.sin(t * 6)} blink={t % 2.4 < 0.12} />
                </g>}
              </Layer>
              <Label x={540} y={640} size={68} s={pop(t, T.pizza, 12, 6)} color="#fff">{tod ? 'LONGER THAN A TODDLER' : 'THAT PIZZA TOPPING'}</Label>
              {tod && <Sticker t={t} t0={T.toddler + 0.3} x={540} y={790} text="TAKES TO LEARN TO WALK" size={52} fill="#E5414A" />}
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="55-pineapple-years" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
