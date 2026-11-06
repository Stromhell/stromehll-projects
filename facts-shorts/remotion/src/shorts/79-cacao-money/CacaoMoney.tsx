import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const BG = '#F6E2C4', BEAN = '#6B3E26', BEAN2 = '#8A5234', GOLD = '#E8B030';

const Bean: React.FC<{s?: number; fake?: boolean; open?: number}> = ({s = 1, fake, open = 0}) => (
  <g transform={`scale(${s})`}>
    <ellipse cx={0} cy={0} rx={40} ry={60} fill={BEAN} stroke={INK} strokeWidth={6} transform={`translate(${-open * 30} 0) rotate(${-open * 20})`} />
    {open > 0 && <ellipse cx={0} cy={0} rx={32} ry={50} fill={fake ? '#7A5A3A' : BEAN2} transform={`translate(${open * 30} 0)`} />}
    <path d="M 0 -50 Q 10 0 0 50" stroke={BEAN2} strokeWidth={6} fill="none" />
  </g>
);

const Pile: React.FC<{n: number; t0: number; t: number; x: number; y: number}> = ({n, t0, t, x, y}) => (
  <g>{Array.from({length: n}).map((_, i) => { const r = Math.floor(i / 8), c = i % 8; return <g key={i} transform={`translate(${x + (c - 3.5) * 34 + (r % 2) * 17} ${y - r * 30}) rotate(${(i * 37) % 60 - 30}) scale(${0.45 * pop(t, t0 + i * 0.012, 12, 6)})`}><Bean /></g>; })}</g>
);

export const CacaoMoney: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.Cacao - 0.25 ? 'intro' : t < T.fake - 0.25 ? 'prices' : t < T.drank - 0.25 ? 'fake' : 'drink';
  const cues: Cue[] = [
    {f: 'clink', at: 0.3, db: -18}, {f: 'clink', at: 0.5, db: -20}, {f: 'ding', at: 1.2, db: -18},
    {f: 'whoosh', at: T.Cacao - 0.25, db: -24}, {f: 'clink', at: T.turkey + 0.3, db: -18}, {f: 'clink', at: T.turkey + 0.6, db: -18}, {f: 'pop', at: T.turkey + 1.6, db: -20},
    {f: 'whoosh', at: T.fake - 0.25, db: -24}, {f: 'crack', at: T.fake + 0.3, db: -18}, {f: 'squeeze', at: T.mud, db: -18},
    {f: 'whoosh', at: T.drank - 0.25, db: -24}, {f: 'pour', at: T.drank + 0.2, db: -20}, {f: 'slurp', at: T.drank + 1.0, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: BG}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={BG} />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1120, 1.05], [T.Cacao - 0.3, 540, 1120, 1]])}>
              <rect x={-400} y={1700} width={1900} height={800} fill="#C9A06A" stroke={INK} strokeWidth={LW} />
              <Pile n={40} t0={0.2} t={t} x={540} y={1650} />
              <g transform={`translate(540 1200) rotate(-6) scale(${pop(t, 0.8, 12, 6)})`}>
                <rect x={-230} y={-70} width={460} height={130} rx={20} fill={GOLD} stroke={INK} strokeWidth={LW} />
                <text y={25} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={76} fill={INK}>= MONEY</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={70} s={pop(t, 0.1, 12, 6)} color="#fff">THE AZTECS PAID WITH</Label>
            <Sticker t={t} t0={0.5} x={540} y={790} text="CHOCOLATE" size={76} fill={BEAN} />
          </g>
        )}

        {scene === 'prices' && (() => {
          const avo = t > T.turkey + 1.4;
          return (
            <g>
              <Layer cam={keys(t, [[T.Cacao - 0.25, 540, 1120, 1], [T.fake - 0.3, 540, 1120, 1.04]])}>
                <rect x={-400} y={1700} width={1900} height={800} fill="#C9A06A" stroke={INK} strokeWidth={LW} />
                <g transform={`translate(300 1650) scale(${pop(t, T.Cacao + 0.3, 12, 6)})`}>
                  <ellipse cx={0} cy={-120} rx={110} ry={90} fill="#8A5A3A" stroke={INK} strokeWidth={LW} />
                  {[-60, -20, 20, 60].map((a) => <path key={a} d="M 0 -150 L 0 -300" stroke={['#E5414A', '#E8B030', '#2FA35A', '#2C7BE5'][(a + 60) / 40]} strokeWidth={30} strokeLinecap="round" transform={`rotate(${a} 0 -150)`} />)}
                  <circle cx={100} cy={-200} r={40} fill="#8A5A3A" stroke={INK} strokeWidth={LW} />
                  <path d="M 130 -200 L 160 -190 L 130 -180 Z" fill="#F2A13A" />
                  <circle cx={110} cy={-210} r={7} fill={INK} />
                </g>
                <text x={300} y={1830} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={56} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={pop(t, T.Cacao + 0.6, 12, 6)}>100 BEANS</text>
                {avo && <g>
                  <g transform={`translate(780 1560) scale(${pop(t, T.turkey + 1.4, 12, 6)})`}>
                    <path d="M 0 -130 Q 80 -60 80 30 Q 70 110 0 110 Q -70 110 -80 30 Q -80 -60 0 -130 Z" fill="#5DA858" stroke={INK} strokeWidth={LW} />
                    <circle cx={0} cy={30} r={40} fill="#8A5A3A" stroke={INK} strokeWidth={6} />
                  </g>
                  <text x={780} y={1830} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={56} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={pop(t, T.turkey + 1.6, 12, 6)}>3 BEANS</text>
                </g>}
              </Layer>
              <Label x={540} y={640} size={74} s={pop(t, T.Cacao, 12, 6)} color="#fff">REAL PRICES</Label>
              <Sticker t={t} t0={T.Cacao + 0.4} x={540} y={790} text="PAID IN CACAO BEANS" size={58} fill={BEAN} />
            </g>
          );
        })()}

        {scene === 'fake' && (() => {
          const op = prog(t, T.fake + 0.2, T.fake + 0.7);
          const mud = t > T.mud - 0.2;
          return (
            <g>
              <Layer cam={keys(t, [[T.fake - 0.25, 540, 1120, 1.1], [T.drank - 0.3, 540, 1120, 1.2]])}>
                <g transform="translate(540 1380) scale(3)"><Bean open={op} fake={mud} /></g>
                {mud && <g>
                  <path d="M 780 1100 Q 700 1250 620 1380" stroke="#7A5A3A" strokeWidth={50} fill="none" strokeLinecap="round" opacity={pop(t, T.mud, 12, 6)} />
                  <text x={540} y={1760} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={80} fill="#fff" stroke={INK} strokeWidth={12} paintOrder="stroke" opacity={pop(t, T.mud + 0.3, 12, 6)}>FILLED WITH MUD</text>
                </g>}
              </Layer>
              <Label x={540} y={640} size={76} s={pop(t, T.fake, 12, 6)} color="#fff">FAKE MONEY TOO</Label>
              <Sticker t={t} t0={T.fake + 0.4} x={540} y={790} text="EMPTY BEAN SHELLS" size={60} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'drink' && (
          <g>
            <Layer cam={keys(t, [[T.drank - 0.25, 540, 1120, 1], [T.card, 540, 1120, 1.05]])}>
              <rect x={-400} y={1780} width={1900} height={700} fill="#C9A06A" stroke={INK} strokeWidth={LW} />
              <g transform="translate(330 1780)">
                <Guy t={t} expr="happy" handL={[-150, -300]} handR={[200, -380]} stand />
                <path d="M -80 -440 L -60 -520 L -20 -470 L 10 -540 L 40 -470 L 80 -520 L 100 -440 Z" fill={GOLD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
              </g>
              <g transform="translate(610 1330)">
                <path d="M -60 -80 L 60 -80 L 45 60 L -45 60 Z" fill="#E8D2B0" stroke={INK} strokeWidth={LW} />
                <ellipse cx={0} cy={-80} rx={60} ry={14} fill={BEAN} stroke={INK} strokeWidth={5} />
                {[0, 1, 2].map((i) => <path key={i} d={`M ${-20 + i * 20} -110 q 12 -25 0 -50`} stroke="#fff" strokeWidth={6} fill="none" opacity={0.5 + 0.5 * Math.sin(t * 3 + i)} />)}
              </g>
              <g transform={`translate(800 1600) scale(${pop(t, T.drank + 0.6, 12, 6)})`}>
                <rect x={-170} y={-55} width={340} height={100} rx={22} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={48} fill="#E5414A">SPICY!</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={66} s={pop(t, T.drank, 12, 6)} color="#fff">THE RICH DRANK IT</Label>
            <Sticker t={t} t0={T.drank + 0.4} x={540} y={790} text="LITERALLY DRINKING MONEY" size={48} fill={BEAN} />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="79-cacao-money" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
