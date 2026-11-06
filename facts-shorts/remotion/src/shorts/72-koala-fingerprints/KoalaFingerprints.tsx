import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const BG = '#E3EEDC', FUR = '#9AA3AD', FUR2 = '#C8CED6', EUC = '#6FA889';

const Koala: React.FC<{t: number; s?: number}> = ({t, s = 1}) => (
  <g transform={`scale(${s})`}>
    <ellipse cx={0} cy={120} rx={150} ry={170} fill={FUR} stroke={INK} strokeWidth={LW} />
    {[-1, 1].map((k) => <g key={k}><circle cx={k * 150} cy={-90} r={80} fill={FUR} stroke={INK} strokeWidth={LW} /><circle cx={k * 150} cy={-90} r={45} fill={FUR2} /></g>)}
    <circle cx={0} cy={-40} r={150} fill={FUR} stroke={INK} strokeWidth={LW} />
    {t % 3 < 0.12 ? <path d="M -70 -60 L -40 -60 M 40 -60 L 70 -60" stroke={INK} strokeWidth={8} /> : <><circle cx={-55} cy={-60} r={14} fill={INK} /><circle cx={55} cy={-60} r={14} fill={INK} /></>}
    <ellipse cx={0} cy={0} rx={42} ry={58} fill="#3A3A48" stroke={INK} strokeWidth={6} />
    <path d="M -20 80 Q 0 95 20 80" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
);

// fingerprint: concentric loops
const Print: React.FC<{s?: number; col?: string; seed?: number}> = ({s = 1, col = INK, seed = 0}) => (
  <g transform={`scale(${s})`}>
    <ellipse cx={0} cy={0} rx={150} ry={200} fill="#F6E3D2" stroke={INK} strokeWidth={LW} />
    {Array.from({length: 9}).map((_, i) => <path key={i} d={`M ${-20 - i * 14} ${120 - i * 4} Q ${-30 - i * 15} ${-40 - i * 18} ${10 + seed * 6} ${-60 - i * 16} Q ${40 + i * 15} ${-40 - i * 16} ${30 + i * 14} ${110 - i * 3}`} stroke={col} strokeWidth={6} fill="none" strokeLinecap="round" />)}
  </g>
);

export const KoalaFingerprints: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.microscope - 0.25 ? 'intro' : t < T.relatives - 0.25 ? 'scope' : t < T.grip - 0.25 ? 'tree' : 'grip';
  const cues: Cue[] = [
    {f: 'pop', at: 0.3, db: -20}, {f: 'ding', at: 1.2, db: -18},
    {f: 'whoosh', at: T.microscope - 0.25, db: -24}, {f: 'zap', at: T.microscope + 0.3, db: -22}, {f: 'tick', at: T.loops, db: -20},
    {f: 'whoosh', at: T.relatives - 0.25, db: -24}, {f: 'creak', at: T.relatives + 0.3, db: -22},
    {f: 'whoosh', at: T.grip - 0.25, db: -24}, {f: 'squeeze', at: T.grip + 0.2, db: -20}, {f: 'slurp', at: T.grip + 1.2, db: -20},
  ];
  return (
    <AbsoluteFill style={{background: BG}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={BG} />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1120, 1.05], [T.microscope - 0.3, 540, 1120, 1]])}>
              <g transform="translate(320 1450)"><Koala t={t} s={0.75} /></g>
              <g transform="translate(780 1780)"><Guy t={t} expr="happy" handL={[-150, -300]} handR={[150, -300]} stand /></g>
              <g transform={`translate(540 1180) scale(${pop(t, 0.8, 12, 6)})`}>
                <text x={0} y={0} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={130} fill="#E5414A" stroke={INK} strokeWidth={10} paintOrder="stroke">=</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={74} s={pop(t, 0.1, 12, 6)} color="#fff">KOALA FINGERPRINTS</Label>
            <Sticker t={t} t0={0.6} x={540} y={790} text="ALMOST IDENTICAL TO OURS" size={48} fill="#E5414A" />
          </g>
        )}

        {scene === 'scope' && (
          <g>
            <Layer cam={keys(t, [[T.microscope - 0.25, 540, 1120, 1], [T.relatives - 0.3, 540, 1120, 1.08]])}>
              <g transform={`translate(300 1350) scale(${pop(t, T.microscope, 12, 6)})`}><Print s={1.1} /><text y={290} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={52} fill={INK}>KOALA</text></g>
              <g transform={`translate(780 1350) scale(${pop(t, T.microscope + 0.2, 12, 6)})`}><Print s={1.1} seed={1} /><text y={290} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={52} fill={INK}>HUMAN</text></g>
              <g transform={`translate(${540 + 240 * Math.sin(t * 1.5)} 1300)`}>
                <circle r={120} fill="#fff" fillOpacity={0.15} stroke={INK} strokeWidth={16} />
                <path d="M 85 85 L 180 180" stroke={INK} strokeWidth={30} strokeLinecap="round" />
              </g>
            </Layer>
            <Label x={540} y={640} size={66} s={pop(t, T.microscope, 12, 6)} color="#fff">EVEN EXPERTS STRUGGLE</Label>
            <Sticker t={t} t0={T.loops} x={540} y={790} text="SAME LOOPS AND SWIRLS" size={54} fill="#7A4DC8" />
          </g>
        )}

        {scene === 'tree' && (() => {
          const uT = prog(t, T.relatives, T.relatives + 0.5), u = prog(t, T.relatives + 0.45, T.relatives + 1.0);
          return (
            <g>
              <Layer cam={keys(t, [[T.relatives - 0.25, 540, 1120, 1], [T.grip - 0.3, 540, 1120, 1.05]])}>
                <path d={`M 540 1850 L 540 ${lerp(1850, 1350, uT)}`} stroke="#7A5534" strokeWidth={30} strokeLinecap="round" />
                <path d={`M 540 1350 Q 400 1250 ${lerp(540, 260, u)} ${lerp(1350, 1150, u)} M 540 1350 Q 680 1250 ${lerp(540, 820, u)} ${lerp(1350, 1150, u)}`} stroke="#7A5534" strokeWidth={24} fill="none" strokeLinecap="round" opacity={u > 0.3 ? 1 : 0} />
                <g transform={`translate(240 1060) scale(${0.45 * pop(t, T.relatives + 0.8, 12, 6)})`}><Koala t={t} /></g>
                <g transform={`translate(840 1240) scale(${0.45 * pop(t, T.relatives + 1.0, 12, 6)})`}><Guy t={t} expr="happy" handL={[-150, -300]} handR={[150, -300]} stand /></g>
                <text x={540} y={1960} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={48} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={pop(t, T.relatives + 1.2, 12, 6)}>SPLIT 100+ MILLION YEARS AGO</text>
              </Layer>
              <Label x={540} y={640} size={70} s={pop(t, T.relatives, 12, 6)} color="#fff">NOT CLOSE RELATIVES</Label>
            </g>
          );
        })()}

        {scene === 'grip' && (
          <g>
            <Layer cam={keys(t, [[T.grip - 0.25, 540, 1120, 1], [T.card, 540, 1120, 1.06]])}>
              <path d="M 540 2100 L 540 1040" stroke="#7A5534" strokeWidth={70} />
              {[[360, 1200], [720, 1300], [340, 1480]].map(([x, y], i) => <g key={i}><path d={`M 540 ${y} L ${x} ${y - 60}`} stroke="#7A5534" strokeWidth={20} />
                {[0, 1, 2].map((j) => <ellipse key={j} cx={x + (x < 540 ? -40 : 40) * j} cy={y - 60 - 25 * j} rx={50} ry={22} fill={EUC} stroke={INK} strokeWidth={5} transform={`rotate(${x < 540 ? -20 : 20} ${x} ${y})`} />)}</g>)}
              <g transform={`translate(560 ${1350 + 10 * Math.sin(t * 2)}) scale(0.7)`}><Koala t={t} /></g>
              <g transform={`translate(780 1700) scale(${pop(t, T.grip + 1.0, 12, 6)})`}>
                <rect x={-200} y={-55} width={400} height={100} rx={22} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={50} fill="#2FA35A">TASTY LEAF?</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={70} s={pop(t, T.grip, 12, 6)} color="#fff">BUILT FOR GRIP</Label>
            <Sticker t={t} t0={T.grip + 0.4} x={540} y={790} text="AND FEELING LEAVES" size={60} fill="#2FA35A" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="72-koala-fingerprints" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
