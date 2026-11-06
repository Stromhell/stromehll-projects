import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const BG = '#F6EBD9', SOIL = '#7A5534', PURPLE = '#7A3FA0', YELLOW = '#F2C230', ORANGE = '#F28C28';

const Carrot: React.FC<{col: string; t: number; face?: boolean; s?: number}> = ({col, t, face = true, s = 1}) => (
  <g transform={`scale(${s}) rotate(${3 * Math.sin(t * 3)})`}>
    {[-30, 0, 30].map((a) => <path key={a} d="M 0 -170 Q 10 -260 0 -320" transform={`rotate(${a} 0 -170)`} stroke="#3E9A4A" strokeWidth={22} fill="none" strokeLinecap="round" />)}
    <path d="M -70 -170 Q 0 -200 70 -170 Q 50 100 0 260 Q -50 100 -70 -170 Z" fill={col} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
    {[-90, -20, 50].map((y) => <path key={y} d={`M -40 ${y} l 25 0`} stroke={INK} strokeWidth={5} opacity={0.4} strokeLinecap="round" />)}
    {face && <g><circle cx={-22} cy={-100} r={10} fill={INK} /><circle cx={22} cy={-100} r={10} fill={INK} /><path d="M -15 -65 Q 0 -50 15 -65" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" /></g>}
  </g>
);

export const PurpleCarrots: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.purple - 0.25 ? 'intro' : t < T.Netherlands - 0.25 ? 'old' : t < T.story - 0.25 ? 'dutch' : t < T.Historians - 0.25 ? 'story' : 'myth';
  const cues: Cue[] = [
    {f: 'pop', at: 0.3, db: -18}, {f: 'boing', at: 1.0, db: -20},
    {f: 'whoosh', at: T.purple - 0.25, db: -24}, {f: 'pop', at: T.purple + 0.1, db: -18}, {f: 'pop', at: T.purple + 0.5, db: -18},
    {f: 'whoosh', at: T.Netherlands - 0.25, db: -24}, {f: 'creak', at: T.Netherlands + 0.3, db: -22}, {f: 'ding', at: T.Netherlands + 1.0, db: -18},
    {f: 'whoosh', at: T.story - 0.25, db: -24}, {f: 'rise', at: T.story + 0.2, db: -22},
    {f: 'whoosh', at: T.Historians - 0.25, db: -24}, {f: 'crack', at: T.Historians + 0.6, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: BG}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={BG} />

        {scene === 'intro' && (() => {
          const k = prog(t, 0.6, T.purple - 0.5);
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1070, 1.05], [T.purple - 0.3, 540, 1070, 1]])}>
                <g transform={`translate(540 1380) scale(${pop(t, 0.1, 10, 6)})`}><Carrot t={t} col={k < 0.5 ? ORANGE : PURPLE} s={1.3} /></g>
                <g transform={`translate(540 1830) rotate(-4) scale(${pop(t, 0.9, 12, 6)})`}>
                  <rect x={-240} y={-55} width={480} height={100} rx={20} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={56} fill={PURPLE}>THE ORIGINAL?</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={65} s={pop(t, 0.1, 12, 6)} color="#fff">CARROTS WEREN'T ORANGE</Label>
            </g>
          );
        })()}

        {scene === 'old' && (
          <g>
            <Layer cam={keys(t, [[T.purple - 0.25, 540, 1070, 1], [T.Netherlands - 0.3, 540, 1070, 1.06]])}>
              <rect x={-400} y={1650} width={1900} height={800} fill={SOIL} stroke={INK} strokeWidth={LW} />
              <g transform={`translate(360 1500) scale(${pop(t, T.purple, 12, 6)})`}><Carrot t={t} col={PURPLE} s={0.9} /></g>
              <g transform={`translate(720 1500) scale(${pop(t, T.purple + 0.4, 12, 6)})`}><Carrot t={t + 1} col={YELLOW} s={0.9} /></g>
              <g transform={`translate(540 1850) scale(${pop(t, T.purple + 0.8, 12, 6)})`}>
                <rect x={-300} y={-50} width={600} height={90} rx={20} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={48} fill={INK}>CENTRAL ASIA, 900s</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={82} s={pop(t, T.purple, 12, 6)} color="#fff">FIRST FARMED</Label>
            <Sticker t={t} t0={T.purple + 0.3} x={540} y={790} text="PURPLE AND YELLOW" size={62} fill={PURPLE} />
          </g>
        )}

        {scene === 'dutch' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#CFE6FF" />
            <Layer cam={keys(t, [[T.Netherlands - 0.25, 540, 1070, 1], [T.story - 0.3, 540, 1070, 1.06]])}>
              <rect x={-400} y={1650} width={1900} height={800} fill="#6CC05A" stroke={INK} strokeWidth={LW} />
              <g transform="translate(260 1650)">
                <path d="M -70 0 L -50 -380 L 50 -380 L 70 0 Z" fill="#C0533A" stroke={INK} strokeWidth={LW} />
                <path d="M -60 -380 L 0 -460 L 60 -380 Z" fill="#7A3A2A" stroke={INK} strokeWidth={LW} />
                <g transform={`translate(0 -360) rotate(${t * 60})`}>{[0, 90, 180, 270].map((a) => <rect key={a} x={-20} y={-260} width={40} height={250} fill="#FFF8E7" stroke={INK} strokeWidth={6} transform={`rotate(${a})`} />)}</g>
                <circle cx={0} cy={-360} r={20} fill={INK} />
              </g>
              {[0, 1, 2].map((i) => <g key={i} transform={`translate(${580 + i * 170} 1560) scale(${0.55 * pop(t, T.Netherlands + 0.4 + i * 0.15, 12, 6)})`}><Carrot t={t + i} col={ORANGE} /></g>)}
            </Layer>
            <Label x={540} y={640} size={74} s={pop(t, T.Netherlands, 12, 6)} color="#fff">ORANGE TOOK OFF</Label>
            <Sticker t={t} t0={T.Netherlands + 0.4} x={540} y={790} text="NETHERLANDS, 1600s" size={60} fill={ORANGE} />
          </g>
        )}

        {scene === 'story' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#FFE9CC" />
            <Layer cam={keys(t, [[T.story - 0.25, 540, 1070, 1], [T.Historians - 0.3, 540, 1070, 1.06]])}>
              <g transform="translate(400 1780)">
                <Guy t={t} expr="happy" handL={[-150, -300]} handR={[160, -330]} stand />
                <path d="M -80 -440 L -60 -520 L -20 -470 L 10 -540 L 40 -470 L 80 -520 L 100 -440 Z" fill="#FFD23C" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
                <path d="M -120 -260 Q 0 -200 120 -260 L 100 -60 L -100 -60 Z" fill={ORANGE} stroke={INK} strokeWidth={6} />
              </g>
              <g transform={`translate(780 1500) scale(${0.6 * pop(t, T.story + 0.4, 12, 6)})`}><Carrot t={t} col={ORANGE} /></g>
              <text x={400} y={1880} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={48} fill={INK}>WILLIAM OF ORANGE</text>
            </Layer>
            <Label x={540} y={640} size={68} s={pop(t, T.story, 12, 6)} color="#fff">A ROYAL TRIBUTE?</Label>
          </g>
        )}

        {scene === 'myth' && (
          <g>
            <Layer cam={keys(t, [[T.Historians - 0.25, 540, 1070, 1], [T.card, 540, 1070, 1.06]])}>
              {[0, 1, 2].map((i) => <g key={i} transform={`translate(${270 + i * 270} 1450) scale(0.75)`}><Carrot t={t + i} col={[PURPLE, YELLOW, ORANGE][i]} /></g>)}
              <g transform={`translate(540 1800) rotate(-8) scale(${pop(t, T.Historians + 0.5, 10, 6)})`}>
                <rect x={-260} y={-70} width={520} height={130} rx={18} fill="none" stroke="#E5414A" strokeWidth={14} />
                <text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={84} fill="#E5414A">MYTH?</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={66} s={pop(t, T.Historians, 12, 6)} color="#fff">{t < T.stuck - 0.2 ? 'PROBABLY A MYTH' : 'BUT ORANGE STUCK'}</Label>
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="68-purple-carrots" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
