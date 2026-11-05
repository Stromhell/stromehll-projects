import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {T, VO_AT} from './timing';
import {INK, LW, lerp, prog, pop, keys} from '../../lib/cartoon';
import {W, H, FPS, FONT, Label, Sticker, Logo, EndCard, SoundTrack, Cue, Layer} from '../../lib/short';

// ---------------------------------------------------------------- props
const STONE = '#E8D8B0', STONE2 = '#CDB98A';

// gothic college front with a tower and spires; `rise` 0..1 builds it from the ground up
const College: React.FC<{rise?: number; t: number; lit?: boolean}> = ({rise = 1, t, lit = false}) => (
  <g>
    <defs><clipPath id="ox-rise"><rect x={-400} y={-700 * rise} width={800} height={700 * rise + 10} /></clipPath></defs>
    <g clipPath="url(#ox-rise)">
      <rect x={-320} y={-260} width={640} height={260} fill={STONE} stroke={INK} strokeWidth={LW} />
      {[-240, -120, 120, 240].map((x) => (
        <g key={x}>
          <path d={`M ${x - 32} -60 L ${x - 32} -170 Q ${x} -220 ${x + 32} -170 L ${x + 32} -60 Z`} fill={lit ? '#FFE07A' : '#5B6B8A'} stroke={INK} strokeWidth={6} />
          <path d={`M ${x} -60 L ${x} -195`} stroke={INK} strokeWidth={4} />
        </g>
      ))}
      <path d="M -60 0 L -60 -120 Q 0 -190 60 -120 L 60 0 Z" fill="#7A4A26" stroke={INK} strokeWidth={LW} />
      {/* battlements */}
      {Array.from({length: 8}).map((_, i) => <rect key={i} x={-320 + i * 84} y={-292} width={46} height={34} fill={STONE} stroke={INK} strokeWidth={6} />)}
      {/* tower */}
      <rect x={-90} y={-560} width={180} height={300} fill={STONE2} stroke={INK} strokeWidth={LW} />
      <circle cx={0} cy={-450} r={50} fill="#fff" stroke={INK} strokeWidth={6} />
      <path d={`M 0 -450 L ${30 * Math.sin(t)} ${-450 - 30 * Math.cos(t)} M 0 -450 L 0 -420`} stroke={INK} strokeWidth={6} strokeLinecap="round" />
      {[-90, 90].map((x) => <path key={x} d={`M ${x - 26} -560 L ${x} -660 L ${x + 26} -560 Z`} fill={STONE2} stroke={INK} strokeWidth={6} strokeLinejoin="round" />)}
      <path d="M -50 -560 L 0 -700 L 50 -560 Z" fill={STONE2} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    </g>
  </g>
);

// stepped Aztec temple with the twin shrines on top; `rise` builds it
const Temple: React.FC<{rise?: number; t: number}> = ({rise = 1}) => {
  const steps = 5;
  return (
    <g>
      {Array.from({length: steps}).map((_, i) => {
        const u = Math.max(0, Math.min(1, rise * steps - i));
        if (u <= 0) return null;
        const w = 520 - i * 80, y = -i * 80;
        return <g key={i} transform={`translate(0 ${(1 - u) * 60})`} opacity={u}><rect x={-w / 2} y={y - 80} width={w} height={80} fill={i % 2 ? '#D9A066' : '#C98B50'} stroke={INK} strokeWidth={LW} /></g>;
      })}
      {rise > 0.9 && (
        <g opacity={(rise - 0.9) * 10}>
          <path d="M -50 -400 L 50 -400 L 50 -80 L -50 -80" fill="#F2E3C4" stroke={INK} strokeWidth={6} />
          {[-70, 70].map((x) => <g key={x}><rect x={x - 50} y={-500} width={100} height={100} fill="#F2E3C4" stroke={INK} strokeWidth={LW} /><rect x={x - 54} y={-530} width={108} height={30} fill={x < 0 ? '#E5414A' : '#2C7BE5'} stroke={INK} strokeWidth={6} /></g>)}
        </g>
      )}
    </g>
  );
};

// little scholar in a gown and mortarboard
const Scholar: React.FC<{t: number; flip?: boolean; talk?: boolean; col?: string; arm?: number}> = ({t, flip, talk, col = '#2B2B3A', arm = 0}) => {
  const blink = (t + (flip ? 1.1 : 0)) % 2.9 < 0.12;
  const mouth = talk ? 6 + 6 * Math.abs(Math.sin(t * 14 + (flip ? 1 : 0))) : 3;
  return (
    <g transform={`scale(${flip ? -1 : 1} 1)`}>
      <path d="M -90 0 L -60 -230 L 60 -230 L 90 0 Z" fill={col} stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
      <path d={`M 50 -200 L ${110 + 20 * arm} ${-260 - 60 * arm}`} stroke={col} strokeWidth={30} strokeLinecap="round" />
      <path d={`M 50 -200 L ${110 + 20 * arm} ${-260 - 60 * arm}`} stroke={INK} strokeWidth={4} strokeLinecap="round" strokeDasharray="1 300" />
      <circle cx={112 + 20 * arm} cy={-264 - 60 * arm} r={18} fill="#fff" stroke={INK} strokeWidth={6} />
      <circle cx={0} cy={-300} r={74} fill="#fff" stroke={INK} strokeWidth={LW} />
      <circle cx={-24} cy={-306} r={blink ? 1.5 : 7} fill={INK} /><circle cx={26} cy={-306} r={blink ? 1.5 : 7} fill={INK} />
      <ellipse cx={8} cy={-266} rx={14} ry={mouth} fill={INK} />
      <path d="M -100 -380 L 0 -410 L 100 -380 L 0 -350 Z" fill={INK} />
      <rect x={-46} y={-372} width={92} height={28} fill={INK} />
      <path d={`M 90 -382 Q 100 -350 ${96 + 6 * Math.sin(t * 5)} -330`} stroke="#FFC93C" strokeWidth={6} fill="none" />
    </g>
  );
};

const Bubble: React.FC<{text: string; s: number}> = ({text, s}) => (
  <g transform={`scale(${s})`}>
    <path d="M -110 -60 L 110 -60 Q 130 -60 130 -40 L 130 30 Q 130 50 110 50 L 0 50 L -30 90 L -30 50 L -110 50 Q -130 50 -130 30 L -130 -40 Q -130 -60 -110 -60 Z" fill="#fff" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <text x={0} y={18} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={48} fill={INK}>{text}</text>
  </g>
);

const Lake: React.FC<{t: number; y: number}> = ({t, y}) => (
  <g>
    <rect x={-60} y={y} width={1200} height={700} fill="#4FA3D9" />
    {Array.from({length: 6}).map((_, i) => <path key={i} d={`M ${((i * 230 + t * 40) % 1300) - 100} ${y + 60 + (i % 3) * 120} q 30 -14 60 0 q 30 14 60 0`} stroke="#BFE6FF" strokeWidth={6} fill="none" strokeLinecap="round" />)}
  </g>
);

const Cactus: React.FC<{t: number}> = ({t}) => (
  <g>
    <rect x={-22} y={-200} width={44} height={200} rx={22} fill="#3C9A5F" stroke={INK} strokeWidth={LW} />
    <path d="M -22 -110 L -70 -110 L -70 -170" stroke={INK} strokeWidth={44 + LW * 2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M -22 -110 L -70 -110 L -70 -170" stroke="#3C9A5F" strokeWidth={44} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* eagle */}
    <g transform={`translate(0 -230) rotate(${4 * Math.sin(t * 3)})`}>
      <path d={`M -10 0 Q -90 ${-60 - 20 * Math.sin(t * 8)} -130 -10 Q -70 -10 -10 20 Z`} fill="#6B4A30" stroke={INK} strokeWidth={6} />
      <path d={`M 10 0 Q 90 ${-60 - 20 * Math.sin(t * 8)} 130 -10 Q 70 -10 10 20 Z`} fill="#6B4A30" stroke={INK} strokeWidth={6} />
      <ellipse cx={0} cy={10} rx={30} ry={40} fill="#7A5236" stroke={INK} strokeWidth={6} />
      <circle cx={0} cy={-40} r={22} fill="#fff" stroke={INK} strokeWidth={6} />
      <path d="M 14 -40 L 34 -34 L 14 -28 Z" fill="#FFC93C" stroke={INK} strokeWidth={4} />
      <circle cx={4} cy={-44} r={4} fill={INK} />
    </g>
  </g>
);

const YearTag: React.FC<{year: string; s: number; col: string}> = ({year, s, col}) => (
  <g transform={`scale(${s})`}>
    <rect x={-150} y={-62} width={300} height={124} rx={22} fill={col} stroke={INK} strokeWidth={LW} />
    <text x={0} y={36} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={96} fill="#fff" stroke={INK} strokeWidth={4} paintOrder="stroke">{year}</text>
  </g>
);

export const OxfordAztecs: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const scene = t < T.ninety - 0.6 ? 'vs' : t < T.Aztecs - 0.25 ? 'oxford' : t < T.later - 1.4 ? 'aztec'
    : t < T.students - 0.25 ? 'gap' : t < T.still - 0.25 ? 'hall' : 'today';
  const cues: Cue[] = [
    {f: 'whoosh', at: 0.15, db: -24}, {f: 'boing', at: T.older, db: -20},
    {f: 'whoosh', at: T.ninety - 0.6, db: -24}, {f: 'rise', at: T.ninety - 0.4, db: -24}, {f: 'ding', at: T.ninety + 0.2, db: -18},
    {f: 'whoosh', at: T.Aztecs - 0.25, db: -24}, {f: 'splash', at: T.Aztecs, db: -24}, {f: 'rumble', at: T.Tenochtitlan, db: -22},
    {f: 'whoosh', at: T.later - 1.4, db: -24}, {f: 'tick', at: T.later, db: -22},
    {f: 'whoosh', at: T.students - 0.25, db: -24}, {f: 'pop', at: T.students + 0.3, db: -22}, {f: 'pop', at: T.students + 0.9, db: -22},
    {f: 'crack', at: T.temple, db: -24},
    {f: 'whoosh', at: T.still - 0.25, db: -24}, {f: 'ding', at: T.still + 0.3, db: -18},
  ];
  const bgCol = scene === 'aztec' ? '#FFE3B0' : scene === 'hall' ? '#5A4636' : scene === 'gap' ? '#FFF4D6' : '#BDE8FF';
  return (
    <AbsoluteFill style={{background: bgCol}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
        <rect x={-100} y={-100} width={W + 200} height={H + 200} fill={bgCol} />

        {scene === 'vs' && (
          <g>
            <Layer cam={keys(t, [[0.6, 540, 960, 1], [T.ninety - 0.6, 540, 1150, 1.07]])}>
            <rect x={-60} y={1500} width={600} height={900} fill="#8FCB6B" stroke={INK} strokeWidth={LW} />
            <rect x={540} y={1500} width={600} height={900} fill="#E3B877" stroke={INK} strokeWidth={LW} />
            <g transform={`translate(${lerp(-300, 280, prog(t, 0, 0.5))} 1500) scale(0.66) rotate(${2 * Math.sin(t * 2.4)})`}><College t={t} /></g>
            <g transform={`translate(${lerp(1400, 810, prog(t, 0.15, 0.65))} 1500) scale(0.72)`}><Temple t={t} /></g>
            <g transform={`translate(540 1160) scale(${pop(t, 0.5, 12, 6) * (1 + 0.08 * Math.sin(t * 6))})`}>
              <circle r={80} fill="#FFE45C" stroke={INK} strokeWidth={LW} />
              <text x={0} y={30} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={84} fill={INK}>VS</text>
            </g>
            </Layer>
            <Label x={540} y={640} size={96} s={pop(t, T.older, 12, 6)} color="#fff">OLDER?!</Label>
          </g>
        )}

        {scene === 'oxford' && (() => {
          const rise = prog(t, T.ninety - 0.55, T.ninety + 0.3);
          return (
            <g>
              <Layer cam={keys(t, [[T.ninety - 0.6, 540, 960, 1], [T.Aztecs - 0.6, 540, 960, 1], [T.Aztecs - 0.25, 540, 1100, 1.1]])}>
                <rect x={-60} y={1560} width={1200} height={500} fill="#8FCB6B" stroke={INK} strokeWidth={LW} />
                <g transform="translate(540 1560)"><College t={t} rise={rise} /></g>
                {[-1, 1].map((sd) => <circle key={sd} cx={540 + sd * 420} cy={1500} r={90} fill="#5EAE5A" stroke={INK} strokeWidth={LW} />)}
              </Layer>
              <g transform="translate(830 1010)"><YearTag year="1096" s={pop(t, T.ninety + 0.1, 12, 6)} col="#2C7BE5" /></g>
              <Label x={540} y={640} size={84} s={pop(t, T.ninety - 0.5, 12, 6)} color="#fff">OXFORD</Label>
            </g>
          );
        })()}

        {scene === 'aztec' && (() => {
          const rise = prog(t, T.Aztecs + 0.4, T.Tenochtitlan + 1.2);
          return (
            <g>
              <Lake t={t} y={1420} />
              <path d="M 120 1460 Q 540 1380 960 1460 L 960 1520 L 120 1520 Z" fill="#E3B877" stroke={INK} strokeWidth={LW} strokeLinejoin="round" />
              <g transform={`translate(300 1450) scale(${0.8 * pop(t, T.Aztecs + 0.1, 12, 6)})`}><Cactus t={t} /></g>
              <g transform="translate(680 1460) scale(0.8)"><Temple t={t} rise={rise} /></g>
              <g transform="translate(540 940)"><YearTag year="1325" s={pop(t, T.Tenochtitlan + 0.3, 12, 6)} col="#E5414A" /></g>
              <Label x={540} y={640} size={80} s={pop(t, T.Aztecs, 12, 6)} color="#fff">AZTECS</Label>
              <Sticker t={t} t0={T.Tenochtitlan} x={540} y={1720} text="TENOCHTITLAN" size={62} fill="#2C7BE5" />
            </g>
          );
        })()}

        {scene === 'gap' && (() => {
          const fill = prog(t, T.later - 1.3, T.later - 0.2);
          const x0 = 190, x1 = 890;
          return (
            <g>
              <path d={`M ${x0} 1200 L ${x1} 1200`} stroke={INK} strokeWidth={30} strokeLinecap="round" />
              <path d={`M ${x0} 1200 L ${lerp(x0, x1, fill)} 1200`} stroke="#FFC93C" strokeWidth={16} strokeLinecap="round" />
              <g transform={`translate(${x0 + 30} 1080) scale(0.42)`}><College t={t} /></g>
              <g transform={`translate(${x1 - 30} 1080) scale(${0.44 * pop(t, T.later - 0.25, 12, 6)})`}><Temple t={t} /></g>
              <text x={x0} y={1310} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={64} fill="#2C7BE5" stroke={INK} strokeWidth={3} paintOrder="stroke">1096</text>
              <text x={x1} y={1310} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={64} fill="#E5414A" stroke={INK} strokeWidth={3} paintOrder="stroke" opacity={pop(t, T.later - 0.25, 12, 6)}>1325</text>
              <Label x={540} y={640} size={84} s={pop(t, T.later - 1.35, 12, 6)} color="#FFC93C">200+ YEARS</Label>
              <Sticker t={t} t0={T.later} x={540} y={1520} text="LATER" size={70} fill="#5B3A8C" />
            </g>
          );
        })()}

        {scene === 'hall' && (() => {
          const ins = pop(t, T.temple, 10, 6);
          return (
            <g>
            <Layer cam={keys(t, [[T.students - 0.25, 540, 960, 1], [T.still - 0.25, 540, 1180, 1.12]])}>
              {/* hall: wood panels, tall window, long table */}
              <rect x={-200} y={-300} width={1500} height={1900} fill="#7A5A42" />
              {Array.from({length: 6}).map((_, i) => <rect key={i} x={-40 + i * 200} y={760} width={160} height={780} fill="#8A6A50" stroke={INK} strokeWidth={6} />)}
              <path d="M 440 1260 L 440 900 Q 540 800 640 900 L 640 1260 Z" fill="#FFE07A" stroke={INK} strokeWidth={LW} />
              <rect x={-60} y={1560} width={1200} height={500} fill="#4A3628" stroke={INK} strokeWidth={LW} />
              <rect x={60} y={1500} width={960} height={60} fill="#9A6236" stroke={INK} strokeWidth={LW} />
              <g transform={`translate(280 ${1500 - (Math.sin(t * 2.2) > 0 ? 14 * Math.abs(Math.sin(t * 7)) : 0)}) scale(${0.9 * pop(t, T.students - 0.2, 12, 6)})`}><Scholar t={t} talk={Math.sin(t * 2.2) > 0} arm={Math.abs(Math.sin(t * 3))} /></g>
              <g transform={`translate(800 ${1500 - (Math.sin(t * 2.2) <= 0 ? 14 * Math.abs(Math.sin(t * 7)) : 0)}) scale(${0.9 * pop(t, T.students, 12, 6)})`}><Scholar t={t} flip talk={Math.sin(t * 2.2) <= 0} col="#3A2B5A" arm={Math.abs(Math.sin(t * 3 + 1))} /></g>
              <g transform="translate(270 1000)"><Bubble text="WRONG!" s={pop(t, T.students + 0.3, 12, 6) * (Math.sin(t * 2.2) > 0 ? 1 : 0.85)} /></g>
              <g transform="translate(810 1000) scale(-1 1)"><g transform="scale(-1 1)"><Bubble text="NO, YOU!" s={pop(t, T.students + 0.9, 12, 6) * (Math.sin(t * 2.2) <= 0 ? 1 : 0.85)} /></g></g>
              {ins > 0.01 && (
                <g transform={`translate(540 1090) scale(${ins * 0.85})`}>
                  <circle r={150} fill="#FFE3B0" stroke={INK} strokeWidth={LW} />
                  <path d="M -150 60 L 150 60" stroke="#4FA3D9" strokeWidth={60} />
                  <g transform="translate(0 50) scale(0.2)"><Temple t={t} rise={0.15} /></g>
                  <text x={0} y={-60} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={44} fill={INK}>NOT YET</text>
                </g>
              )}
            </Layer>
              <Label x={540} y={640} size={72} s={pop(t, T.students, 12, 6)} color="#FFE45C">STUDENTS ARGUING</Label>
            </g>
          );
        })()}

        {scene === 'today' && (() => {
          const toss = t - (T.still + 0.4);
          return (
            <g>
              <rect x={-60} y={1560} width={1200} height={500} fill="#8FCB6B" stroke={INK} strokeWidth={LW} />
              <g transform="translate(540 1560) scale(0.95)"><College t={t} lit /></g>
              {[230, 420, 660, 850].map((x, i) => (
                <g key={x}>
                  <g transform={`translate(${x} 1760) scale(0.55)`}><Scholar t={t + i} flip={i % 2 === 1} col={['#2B2B3A', '#3A2B5A', '#2B3A5A', '#5A2B3A'][i]} arm={toss > 0 ? 1 : 0} /></g>
                  {toss > 0 && (
                    <g transform={`translate(${x + 30} ${1560 - 600 * toss + 520 * toss * toss}) rotate(${toss * 400 + i * 50})`}>
                      <path d="M -50 0 L 0 -16 L 50 0 L 0 16 Z" fill={INK} />
                    </g>
                  )}
                </g>
              ))}
              <Label x={540} y={640} size={76} s={pop(t, T.still - 0.1, 12, 6)} color="#fff">STILL TEACHING</Label>
              <Sticker t={t} t0={T.still + 0.2} x={540} y={790} text="900+ YEARS ON" size={56} fill="#2C7BE5" />
            </g>
          );
        })()}
      </svg>
      <Logo t={t} card={T.card} />
      <EndCard t={t} card={T.card} />
      <SoundTrack id="33-oxford-aztecs" voAt={VO_AT} card={T.card} cues={cues} />
    </AbsoluteFill>
  );
};
