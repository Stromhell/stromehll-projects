import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const BG = '#F3E9DA', FARM = '#C9E4A8', PIG = '#F7A8B8';

const hic = (t: number, rate = 1.5) => { const p = (t * rate) % 1; return p < 0.12 ? Math.sin((p / 0.12) * Math.PI) : 0; };

const Hic: React.FC<{t: number; x: number; y: number; rate?: number}> = ({t, x, y, rate = 1.5}) => {
  const p = (t * rate) % 1;
  return p < 0.5 ? <text x={x + 40 * p} y={y - 120 * p} fontFamily={FONT} fontWeight={900} fontSize={64} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={1 - p * 2}>HIC!</text> : null;
};

const Pig: React.FC = () => (
  <g>
    <ellipse cx={0} cy={0} rx={140} ry={95} fill={PIG} stroke={INK} strokeWidth={LW} />
    <circle cx={130} cy={-30} r={70} fill={PIG} stroke={INK} strokeWidth={LW} />
    <ellipse cx={185} cy={-20} rx={28} ry={22} fill="#F08AA0" stroke={INK} strokeWidth={5} />
    <circle cx={140} cy={-55} r={9} fill={INK} />
    {[-80, -30, 40, 90].map((x) => <rect key={x} x={x - 14} y={70} width={28} height={50} fill={PIG} stroke={INK} strokeWidth={5} />)}
  </g>
);

export const Hiccups68: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.y1922 - 0.25 ? 'intro' : t < T.y1990 - 0.25 ? 'pig' : t < T.million - 0.25 ? 'years' : t < T.married - 0.25 ? 'count' : 'family';
  const cues: Cue[] = [
    ...Array.from({length: 4}).map((_, i) => ({f: 'boing', at: 0.15 + i / 1.5, db: -22})),
    {f: 'whoosh', at: T.y1922 - 0.25, db: -24}, {f: 'squeeze', at: T.y1922 + 0.4, db: -18}, {f: 'boing', at: T.y1922 + 1.0, db: -16},
    {f: 'whoosh', at: T.y1990 - 0.25, db: -24}, {f: 'ticktock', at: T.y1990, db: -22}, {f: 'ding', at: T.y1990 + 1.2, db: -18},
    {f: 'whoosh', at: T.million - 0.25, db: -24}, {f: 'rise', at: T.million, db: -22}, {f: 'tick', at: T.minute, db: -18},
    {f: 'whoosh', at: T.married - 0.25, db: -24}, {f: 'ding', at: T.married + 0.3, db: -18}, {f: 'pop', at: T.married + 1.0, db: -20},
  ];
  return (
    <AbsoluteFill style={{background: BG}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={BG} />

        {scene === 'intro' && (
          <g>
            <Layer cam={keys(t, [[0, 540, 1120, 1.05], [T.y1922 - 0.3, 540, 1120, 1]])}>
              <rect x={-400} y={1780} width={1900} height={700} fill="#D9C3A0" stroke={INK} strokeWidth={LW} />
              <g transform={`translate(540 ${1780 - 40 * hic(t)})`}><Guy t={t} expr="worried" handL={[-150, -280]} handR={[150, -280]} stand /></g>
              <Hic t={t} x={720} y={1320} />
              <g transform={`translate(540 1100) scale(${pop(t, 0.8, 12, 6)})`}>
                <rect x={-200} y={-80} width={400} height={150} rx={30} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={96} fill="#E5414A">68 YRS</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={70} s={pop(t, 0.1, 12, 6)} color="#fff">HICCUPS FOR 68 YEARS</Label>
          </g>
        )}

        {scene === 'pig' && (
          <g>
            <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={FARM} />
            <Layer cam={keys(t, [[T.y1922 - 0.25, 540, 1120, 1], [T.y1990 - 0.3, 540, 1120, 1.06]])}>
              <rect x={-400} y={1780} width={1900} height={700} fill="#9A7A4A" stroke={INK} strokeWidth={LW} />
              <g transform={`translate(400 ${1780 - 30 * hic(t - T.y1922 - 1.0)})`}><Guy t={t} expr={t > T.y1922 + 1 ? 'worried' : 'hot'} handL={[-60, -420]} handR={[230, -470]} stand /></g>
              <g transform={`translate(700 ${lerp(1700, 1230, prog(t, T.y1922 + 0.2, T.y1922 + 0.8))}) scale(0.9)`}><Pig /></g>
              {t > T.y1922 + 1 && <Hic t={t} x={120} y={1200} />}
              <g transform={`translate(540 1880) scale(${pop(t, T.y1922, 12, 6)})`}>
                <rect x={-150} y={-50} width={300} height={90} rx={20} fill="#fff" stroke={INK} strokeWidth={LW} />
                <text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={56} fill={INK}>1922</text>
              </g>
            </Layer>
            <Label x={540} y={640} size={66} s={pop(t, T.y1922, 12, 6)} color="#fff">CHARLES OSBORNE</Label>
            <Sticker t={t} t0={T.y1922 + 0.3} x={540} y={790} text="WAS LIFTING A PIG" size={60} fill="#E5414A" />
          </g>
        )}

        {scene === 'years' && (() => {
          const y = Math.round(lerp(1922, 1990, prog(t, T.y1990 - 0.2, T.y1990 + 1.0)));
          return (
            <g>
              <Layer cam={keys(t, [[T.y1990 - 0.25, 540, 1120, 1], [T.million - 0.3, 540, 1120, 1.05]])}>
                <rect x={240} y={1050} width={600} height={500} rx={30} fill="#fff" stroke={INK} strokeWidth={LW} />
                <rect x={240} y={1050} width={600} height={120} rx={30} fill="#E5414A" stroke={INK} strokeWidth={LW} />
                <text x={540} y={1440} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={200} fill={INK}>{y}</text>
                <g transform={`translate(540 ${1800 - 30 * hic(t, 2)})`} />
                <text x={540} y={1760} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={70} fill="#fff" stroke={INK} strokeWidth={10} paintOrder="stroke" opacity={hic(t, 2) > 0 ? 1 : 0.4}>HIC! HIC! HIC!</text>
              </Layer>
              <Label x={540} y={640} size={74} s={pop(t, T.y1990, 12, 6)} color="#fff">UNTIL 1990</Label>
            </g>
          );
        })()}

        {scene === 'count' && (() => {
          const perMin = t > T.minute - 0.2;
          const n = Math.round(430 * prog(t, T.million - 0.1, T.million + 1));
          return (
            <g>
              <Layer cam={keys(t, [[T.million - 0.25, 540, 1120, 1], [T.married - 0.3, 540, 1120, 1.05]])}>
                <g transform="translate(540 1300)">
                  <rect x={-420} y={-110} width={840} height={220} rx={30} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <text y={40} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={96} fill="#E5414A">{`${n} MILLION`}</text>
                </g>
                {perMin && <g transform={`translate(540 1650) scale(${pop(t, T.minute, 12, 6)})`}>
                  <circle r={140} fill="#fff" stroke={INK} strokeWidth={LW} />
                  <path d={`M 0 0 L ${100 * Math.sin(t * 6)} ${-100 * Math.cos(t * 6)}`} stroke="#E5414A" strokeWidth={10} strokeLinecap="round" />
                  <text y={210} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={56} fill={INK}>40 PER MINUTE</text>
                </g>}
              </Layer>
              <Label x={540} y={640} size={72} s={pop(t, T.million, 12, 6)} color="#fff">ABOUT 430 MILLION</Label>
              <Sticker t={t} t0={T.million + 0.3} x={540} y={790} text="HICCUPS IN TOTAL" size={62} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'family' && (
          <g>
            <Layer cam={keys(t, [[T.married - 0.25, 540, 1120, 1], [T.card, 540, 1120, 1.04]])}>
              <rect x={-400} y={1780} width={1900} height={700} fill="#D9C3A0" stroke={INK} strokeWidth={LW} />
              <g transform={`translate(250 ${1780 - 25 * hic(t)})`}><Guy t={t} expr="happy" handL={[-150, -280]} handR={[150, -280]} stand /></g>
              <Hic t={t} x={350} y={1160} />
              {Array.from({length: 8}).map((_, i) => <g key={i} transform={`translate(${430 + i * 72} 1780) scale(${(0.3 + (i % 2) * 0.04) * pop(t, T.married + 0.6 + i * 0.1, 12, 6)})`}>
                <Guy t={t + i} expr="happy" handL={[-90, -300]} handR={[90, -300]} stand />
              </g>)}
            </Layer>
            <Label x={540} y={640} size={66} s={pop(t, T.married, 12, 6)} color="#fff">STILL MARRIED TWICE</Label>
            <Sticker t={t} t0={T.married + 0.6} x={540} y={790} text="AND HAD 8 KIDS" size={66} fill="#2FA35A" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="78-hiccups-68-years" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
