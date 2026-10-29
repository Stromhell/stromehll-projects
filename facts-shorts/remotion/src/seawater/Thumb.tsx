import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {INK, LW, Guy, SaltCube, Sun, Raft} from '../lib/cartoon';

const wave = (y: number, amp: number, len: number, w: number) => {
  let d = `M -200 ${y + 900} L -200 ${y}`;
  for (let x = -200; x < w + 200; x += len) d += ` Q ${x + len / 2} ${y - amp} ${x + len} ${y}`;
  return d + ` L ${w + 200} ${y + 900} Z`;
};
const Txt: React.FC<{x: number; y: number; size: number; color?: string; rot?: number; children: React.ReactNode}> = ({x, y, size, color = '#fff', rot = 0, children}) => (
  <text x={x} y={y} transform={`rotate(${rot} ${x} ${y})`} textAnchor="middle" fontFamily="Anton, 'Arial Black', 'DejaVu Sans', sans-serif" fontWeight={900}
    fontSize={size} fill={color} stroke={INK} strokeWidth={size * 0.17} paintOrder="stroke" strokeLinejoin="round">{children}</text>
);

// vertical = Shorts cover 1080x1920; otherwise 1280x720 landscape
export const SeawaterThumb: React.FC<{vertical?: boolean}> = ({vertical = true}) => {
  const W = vertical ? 1080 : 1280, H = vertical ? 1920 : 720;
  const g = vertical ? {x: 450, y: 1700, s: 2.2} : {x: 900, y: 760, s: 1.25};
  return (
    <AbsoluteFill style={{background: '#7FCBFF'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <radialGradient id="tb" cx="0.5" cy="0.35" r="0.8"><stop offset="0" stopColor="#BDE9FF" /><stop offset="1" stopColor="#4DB2F5" /></radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#tb)" />
        <g transform={vertical ? 'translate(930 -40) scale(0.0)' : 'translate(1150 110) scale(0.6)'}><Sun t={0.4} mood="grin" /></g>
        <path d={wave(vertical ? 1180 : 470, 24, 200, W)} fill="#2F7DC7" stroke={INK} strokeWidth={LW} />
        <g transform={`translate(${g.x} ${g.y}) scale(${g.s})`}>
          <g transform="translate(0 40)"><Raft t={0.6} /></g>
          <Guy t={0.3} expr="yuck" handL={[-78, -78]} handR={[215, -170]} bendR={0.4} cup="R" cupFull
            cupChildren={<g>{[-1, 0, 1].map((i) => <g key={i} transform={`translate(${i * 34} ${-98 - (i === 0 ? 22 : 0)}) scale(0.6)`}><SaltCube t={i} /></g>)}</g>} />
        </g>
        <path d={wave(vertical ? 1700 : 680, 28, 240, W)} fill="#2563A6" stroke={INK} strokeWidth={LW} />
        {vertical ? (
          <g>
            <Txt x={540} y={300} size={150} rot={-3}>WHY NOT</Txt>
            <Txt x={540} y={470} size={170} rot={-3} color="#FFE45C">DRINK IT?</Txt>
            <g transform="translate(540 610) rotate(4)">
              <rect x={-215} y={-72} width={430} height={124} rx={26} fill="#E5414A" stroke={INK} strokeWidth={10} />
              <Txt x={0} y={22} size={80}>3.5% SALT</Txt>
            </g>
          </g>
        ) : (
          <g>
            <Txt x={400} y={250} size={118} rot={-3}>WHY NOT</Txt>
            <Txt x={400} y={400} size={126} rot={-3} color="#FFE45C">DRINK IT?</Txt>
          </g>
        )}
      </svg>
      <Img src={staticFile('seawater/stormi.png')} style={vertical ? {position: 'absolute', left: 60, top: 1720, width: 150, height: 150} : {position: 'absolute', left: 24, top: 590, width: 110, height: 110}} />
    </AbsoluteFill>
  );
};
