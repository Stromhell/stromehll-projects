import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const BG = '#DCE6EE', IRON = '#8C96A3', IRON2 = '#6B7480', HORN = '#F2E6C8', RED = '#E5414A';

// helmet sits on a head whose top is at y=0
const Helmet: React.FC<{horns?: number}> = ({horns = 0}) => (
  <g>
    {horns > 0 && [-1, 1].map((k) => <path key={k} d={`M ${k * 90} -60 Q ${k * 200} -100 ${k * 190} ${-60 - 180 * horns}`} stroke={INK} strokeWidth={50} fill="none" strokeLinecap="round" />)}
    {horns > 0 && [-1, 1].map((k) => <path key={k} d={`M ${k * 90} -60 Q ${k * 200} -100 ${k * 190} ${-60 - 180 * horns}`} stroke={HORN} strokeWidth={34} fill="none" strokeLinecap="round" />)}
    <path d="M -130 0 Q -130 -150 0 -150 Q 130 -150 130 0 Z" fill={IRON} stroke={INK} strokeWidth={LW} />
    <path d="M -130 0 L 130 0" stroke={IRON2} strokeWidth={18} />
    <path d="M 0 -150 L 0 0" stroke={IRON2} strokeWidth={14} />
    <path d="M -90 0 Q -60 60 -10 50 L -10 10 M 90 0 Q 60 60 10 50 L 10 10" stroke={INK} strokeWidth={10} fill={IRON} />
  </g>
);

export const VikingHelmets: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.Gjermundbu - 0.25 ? 'intro' : t < T.opera - 0.25 ? 'find' : t < T.fight - 0.25 ? 'opera' : 'fight';
  const cues: Cue[] = [
    {f: 'boing', at: 0.4, db: -20}, {f: 'crack', at: 1.2, db: -16},
    {f: 'whoosh', at: T.Gjermundbu - 0.25, db: -24}, {f: 'clink', at: T.Gjermundbu + 0.2, db: -18}, {f: 'ding', at: T.Gjermundbu + 1.2, db: -18},
    {f: 'whoosh', at: T.opera - 0.25, db: -24}, {f: 'rise', at: T.opera, db: -22}, {f: 'boing', at: T.y1876 + 0.5, db: -18},
    {f: 'whoosh', at: T.fight - 0.25, db: -24}, {f: 'squeeze', at: T.fight + 0.4, db: -18}, {f: 'blegh', at: T.fight + 0.9, db: -20},
  ];
  return (
    <AbsoluteFill style={{background: BG}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={BG} />

        {scene === 'intro' && (() => {
          const gone = t > 1.1;
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1120, 1.05], [T.Gjermundbu - 0.3, 540, 1120, 1]])}>
                <rect x={-400} y={1780} width={1900} height={700} fill="#8FB0C0" stroke={INK} strokeWidth={LW} />
                <g transform="translate(540 1780)">
                  <Guy t={t} expr={gone ? 'worried' : 'happy'} handL={[-150, -300]} handR={[170, -280]} stand />
                  <path d="M -60 -300 Q 10 -200 80 -300 Q 60 -180 10 -170 Q -40 -180 -60 -300 Z" fill="#E8A040" stroke={INK} strokeWidth={6} />
                  <g transform="translate(10 -470)"><Helmet horns={gone ? 0 : 1} /></g>
                </g>
                {gone && [-1, 1].map((k) => <g key={k} transform={`translate(${540 + k * (200 + 300 * prog(t, 1.1, 1.8))} ${1150 + 500 * prog(t, 1.1, 1.8, (u) => u * u)}) rotate(${k * 200 * prog(t, 1.1, 1.8)})`}>
                  <path d="M 0 0 Q 40 -60 20 -160" stroke={INK} strokeWidth={50} fill="none" strokeLinecap="round" /><path d="M 0 0 Q 40 -60 20 -160" stroke={HORN} strokeWidth={34} fill="none" strokeLinecap="round" />
                </g>)}
                <g transform={`translate(540 1180) rotate(-10) scale(${pop(t, 1.1, 10, 6)})`}>
                  <rect x={-200} y={-60} width={400} height={110} rx={16} fill="none" stroke={RED} strokeWidth={12} />
                  <text y={25} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={80} fill={RED}>MYTH</text>
                </g>
              </Layer>
              <Label x={540} y={640} size={71} s={pop(t, 0.1, 12, 6)} color="#fff">VIKINGS HAD NO HORNS</Label>
            </g>
          );
        })()}

        {scene === 'find' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#2E3440" />
            <Layer cam={keys(t, [[T.Gjermundbu - 0.25, 540, 1120, 1], [T.opera - 0.3, 540, 1120, 1.1]])}>
              <rect x={190} y={1600} width={700} height={60} fill="#5A4030" stroke={INK} strokeWidth={LW} />
              <path d="M 540 1000 L 300 1600 L 780 1600 Z" fill="#FFF3B0" opacity={0.15} />
              <g transform={`translate(540 1560) scale(${1.6 * pop(t, T.Gjermundbu, 10, 6)})`}><Helmet /></g>
              <g transform={`translate(540 1800) scale(${pop(t, T.Gjermundbu + 0.4, 12, 6)})`}>
                <rect x={-360} y={-55} width={720} height={100} rx={22} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={48} fill={INK}>GJERMUNDBU, NORWAY</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={64} s={pop(t, T.Gjermundbu, 12, 6)} color="#fff">THE ONLY NEAR-COMPLETE</Label>
            <Sticker t={t} t0={T.Gjermundbu + 1.0} x={540} y={790} text="NO HORNS AT ALL" size={62} fill={RED} />
          </g>
        )}

        {scene === 'opera' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill="#5A1E2A" />
            <Layer cam={keys(t, [[T.opera - 0.25, 540, 1030, 1], [T.fight - 0.3, 540, 1040, 1.04]])}>
              <path d="M -100 900 Q 100 1100 60 1700 L -100 1700 Z M 1180 900 Q 980 1100 1020 1700 L 1180 1700 Z" fill="#B22234" stroke={INK} strokeWidth={LW} />
              <rect x={-100} y={1700} width={1300} height={300} fill="#7A4A2A" stroke={INK} strokeWidth={LW} />
              <path d="M 540 900 L 330 1700 L 750 1700 Z" fill="#FFF3B0" opacity={0.2} />
              <g transform="translate(540 1700)">
                <Guy t={t} expr="happy" handL={[-180, -380]} handR={[180, -380]} stand />
                <g transform="translate(10 -470)"><Helmet horns={pop(t, T.y1876 + 0.4, 10, 6)} /></g>
              </g>
              <g transform={`translate(540 1870) scale(${pop(t, T.y1876, 12, 6)})`}>
                <rect x={-340} y={-55} width={680} height={100} rx={22} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={48} fill={INK}>1876: WAGNER'S RING</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={74} s={pop(t, T.opera, 12, 6)} color="#fff">HORNS CAME FROM</Label>
            <Sticker t={t} t0={T.opera + 0.3} x={540} y={790} text="AN OPERA COSTUME" size={60} fill="#B22234" />
          </g>
        )}

        {scene === 'fight' && (() => {
          const grab = prog(t, T.fight + 0.3, T.fight + 0.7);
          return (
            <g>
              <Layer cam={keys(t, [[T.fight - 0.25, 540, 1120, 1], [T.card, 540, 1120, 1.06]])}>
                <rect x={-400} y={1780} width={1900} height={700} fill="#8FB0C0" stroke={INK} strokeWidth={LW} />
                <g transform={`translate(380 1780) rotate(${-8 * grab})`}>
                  <Guy t={t} expr="worried" handL={[-150, -280]} handR={[150, -280]} stand />
                  <g transform="translate(10 -470)"><Helmet horns={1} /></g>
                </g>
                <g transform="translate(780 1780) scale(-1 1)">
                  <Guy t={t} expr="hot" handL={[-150, -280]} handR={[lerp(150, 300, grab), lerp(-280, -640, grab)]} stand />
                </g>
              </Layer>
              <Label x={540} y={640} size={74} s={pop(t, T.fight, 12, 6)} color="#fff">IN A REAL FIGHT</Label>
              <Sticker t={t} t0={T.fight + 0.5} x={540} y={790} text="HORNS = HANDLES" size={64} fill={RED} />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="71-viking-helmets" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
