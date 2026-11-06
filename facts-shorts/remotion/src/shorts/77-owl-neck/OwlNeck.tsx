import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, Guy, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

const NIGHT = '#1E2A4A', OWL = '#A8865A', OWL2 = '#D9C3A0', BRANCH = '#5A4030';

// owl; turn = degrees of head rotation (shown as face sliding around + angle arc)
const Owl: React.FC<{t: number; turn?: number}> = ({t, turn = 0}) => {
  const f = Math.sin((turn * Math.PI) / 180), back = Math.cos((turn * Math.PI) / 180) < 0;
  return (
    <g>
      <ellipse cx={0} cy={0} rx={150} ry={190} fill={OWL} stroke={INK} strokeWidth={LW} />
      <ellipse cx={0} cy={40} rx={95} ry={120} fill={OWL2} />
      {[-1, 1].map((k) => <path key={k} d={`M ${k * 40} 180 l ${k * 10} 40 M ${k * 60} 180 l ${k * 30} 35`} stroke="#F2A13A" strokeWidth={10} strokeLinecap="round" />)}
      <g transform="translate(0 -200)">
        <circle r={130} fill={OWL} stroke={INK} strokeWidth={LW} />
        <path d="M -110 -90 L -80 -160 L -40 -110 M 110 -90 L 80 -160 L 40 -110" fill={OWL} stroke={INK} strokeWidth={6} />
        {!back && <g transform={`translate(${f * 70} 0) scale(${Math.max(0.2, Math.abs(Math.cos((turn * Math.PI) / 180)))} 1)`}>
          {[-1, 1].map((k) => <g key={k}><circle cx={k * 50} cy={-10} r={44} fill="#FFF3B0" stroke={INK} strokeWidth={6} /><circle cx={k * 50} cy={-10} r={20} fill={INK} /></g>)}
          <path d="M -12 30 L 0 60 L 12 30 Z" fill="#F2A13A" stroke={INK} strokeWidth={5} />
        </g>}
        {back && [0, 1, 2].map((i) => <path key={i} d={`M ${-60 + i * 50} -40 q 20 30 0 60`} stroke={OWL2} strokeWidth={8} fill="none" />)}
      </g>
    </g>
  );
};

export const OwlNeck: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.fixed - 0.25 ? 'turn' : t < T.neck - 0.25 ? 'eyes' : t < T.pools - 0.25 ? 'bones' : t < T.tried - 0.25 ? 'blood' : 'us';
  const cues: Cue[] = [
    {f: 'creak', at: 0.4, db: -18}, {f: 'creak', at: 1.2, db: -18}, {f: 'ding', at: 2.0, db: -18},
    {f: 'whoosh', at: T.fixed - 0.25, db: -24}, {f: 'knock', at: T.fixed + 0.3, db: -20},
    {f: 'whoosh', at: T.neck - 0.25, db: -24}, ...Array.from({length: 14}).map((_, i) => ({f: 'tick', at: T.neck + 0.2 + i * 0.07, db: -24})),
    {f: 'whoosh', at: T.pools - 0.25, db: -24}, {f: 'pour', at: T.pools + 0.2, db: -22},
    {f: 'whoosh', at: T.tried - 0.25, db: -24}, {f: 'crack', at: T.tried + 0.5, db: -18},
  ];
  return (
    <AbsoluteFill style={{background: NIGHT}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={NIGHT} />
        {(scene === 'turn' || scene === 'eyes') && <circle cx={880} cy={1050} r={70} fill="#FFF3B0" opacity={0.9} />}

        {scene === 'turn' && (() => {
          const a = 270 * prog(t, 0.3, T.fixed - 0.6);
          return (
            <g>
              <Layer cam={keys(t, [[0, 540, 1120, 1.05], [T.fixed - 0.3, 540, 1120, 1]])}>
                <rect x={-400} y={1700} width={1900} height={50} rx={25} fill={BRANCH} stroke={INK} strokeWidth={LW} />
                <g transform="translate(540 1490)"><Owl t={t} turn={a} /></g>
                <path d={`M ${540 + 200 * Math.cos(-Math.PI / 2)} ${1290 + 200 * Math.sin(-Math.PI / 2)} A 200 200 0 ${a > 180 ? 1 : 0} 1 ${540 + 200 * Math.cos(-Math.PI / 2 + (a * Math.PI) / 180)} ${1290 + 200 * Math.sin(-Math.PI / 2 + (a * Math.PI) / 180)}`} stroke="#FFE45C" strokeWidth={14} fill="none" strokeLinecap="round" opacity={a > 2 ? 1 : 0} />
                <text x={540} y={1850} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={90} fill="#FFE45C" stroke={INK} strokeWidth={12} paintOrder="stroke">{`${Math.round(a)}°`}</text>
              </Layer>
              <Label x={540} y={640} size={71} s={pop(t, 0.1, 12, 6)} color="#fff">OWLS TURN THEIR HEAD</Label>
              <Sticker t={t} t0={0.6} x={540} y={790} text="270 DEGREES" size={74} fill="#E5414A" />
            </g>
          );
        })()}

        {scene === 'eyes' && (
          <g>
            <Layer cam={keys(t, [[T.fixed - 0.25, 540, 1070, 1.1], [T.neck - 0.3, 540, 1020, 1.3]])}>
              <g transform="translate(540 1500)"><Owl t={t} /></g>
              {[-1, 1].map((k) => <g key={k} transform={`translate(${540 + k * 50} 1290)`}><path d="M -30 -30 L 30 30 M 30 -30 L -30 30" stroke="#E5414A" strokeWidth={0} /><rect x={-60} y={-60} width={120} height={100} rx={10} fill="none" stroke="#E5414A" strokeWidth={8} strokeDasharray="14 10" opacity={pop(t, T.fixed + 0.3, 12, 6)} /></g>)}
            </Layer>
            <Label x={540} y={640} size={68} s={pop(t, T.fixed, 12, 6)} color="#fff">THEIR EYES CAN'T MOVE</Label>
            <Sticker t={t} t0={T.fixed + 0.5} x={540} y={790} text="SO THE WHOLE HEAD DOES" size={52} fill="#E5414A" />
          </g>
        )}

        {scene === 'bones' && (
          <g>
            <Layer cam={keys(t, [[T.neck - 0.25, 540, 1120, 1], [T.pools - 0.3, 540, 1120, 1.04]])}>
              <text x={300} y={1080} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={56} fill="#fff">OWL</text>
              <text x={780} y={1080} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={56} fill="#fff">YOU</text>
              {Array.from({length: 14}).map((_, i) => <rect key={i} x={240} y={1120 + i * 52} width={120} height={40} rx={12} fill="#F4F0E6" stroke={INK} strokeWidth={5} opacity={pop(t, T.neck + 0.2 + i * 0.07, 12, 6)} />)}
              {Array.from({length: 7}).map((_, i) => <rect key={i} x={720} y={1120 + i * 52} width={120} height={40} rx={12} fill="#F4F0E6" stroke={INK} strokeWidth={5} opacity={pop(t, T.neck + 0.2 + i * 0.07, 12, 6)} />)}
              <text x={300} y={1940} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={80} fill="#FFE45C" stroke={INK} strokeWidth={10} paintOrder="stroke">14</text>
              <text x={780} y={1940} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={80} fill="#9FC4E8" stroke={INK} strokeWidth={10} paintOrder="stroke">7</text>
            </Layer>
            <Label x={540} y={640} size={76} s={pop(t, T.neck, 12, 6)} color="#fff">14 NECK BONES</Label>
            <Sticker t={t} t0={T.neck + 0.5} x={540} y={790} text="TWICE AS MANY AS US" size={58} fill="#7A4DC8" />
          </g>
        )}

        {scene === 'blood' && (
          <g>
            <Layer cam={keys(t, [[T.pools - 0.25, 540, 970, 1], [T.tried - 0.3, 540, 980, 1.04]])}>
              <path d="M 540 1900 Q 480 1600 540 1300 Q 600 1150 540 1000" stroke="#E5414A" strokeWidth={24} fill="none" strokeLinecap="round" />
              {[1700, 1420, 1150].map((y, i) => <ellipse key={y} cx={540 + (i % 2 ? 40 : -20)} cy={y} rx={40 + 30 * pop(t, T.pools + 0.3 + i * 0.2, 10, 6) * (1 + 0.1 * Math.sin(t * 5))} ry={30 + 20 * pop(t, T.pools + 0.3 + i * 0.2, 10, 6)} fill="#E5414A" stroke={INK} strokeWidth={6} />)}
              <g transform="translate(540 960)"><circle r={90} fill="#FF9EC0" stroke={INK} strokeWidth={LW} /><text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={40} fill={INK}>BRAIN</text></g>
            </Layer>
            <Label x={540} y={640} size={70} s={pop(t, T.pools, 12, 6)} color="#fff">BLOOD POOLS</Label>
            <Sticker t={t} t0={T.pools + 0.4} x={540} y={790} text="KEEP THE BRAIN FED" size={58} fill="#E5414A" />
          </g>
        )}

        {scene === 'us' && (
          <g>
            <Layer cam={keys(t, [[T.tried - 0.25, 540, 1120, 1], [T.card, 540, 1120, 1.05]])}>
              <rect x={-400} y={1780} width={1900} height={700} fill="#2E3A5A" stroke={INK} strokeWidth={LW} />
              <g transform={`translate(540 1780) rotate(${6 * Math.sin(t * 20) * prog(t, T.tried + 0.3, T.tried + 0.5)})`}><Guy t={t} expr="worried" handL={[-180, -420]} handR={[180, -420]} stand /></g>
              <text x={540} y={1150} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={120} fill="#E5414A" stroke={INK} strokeWidth={12} paintOrder="stroke" opacity={pop(t, T.tried + 0.4, 12, 6)}>OUCH!</text>
            </Layer>
            <Label x={540} y={640} size={74} s={pop(t, T.tried, 12, 6)} color="#fff">DON'T TRY THIS</Label>
            <Sticker t={t} t0={T.tried + 0.5} x={540} y={790} text="WE COULD TEAR ARTERIES" size={52} fill="#E5414A" />
          </g>
        )}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="77-owl-neck" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
