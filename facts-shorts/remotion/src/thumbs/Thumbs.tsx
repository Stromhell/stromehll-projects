import React from 'react';
import {AbsoluteFill, Freeze, Img, staticFile} from 'remotion';
import {INK} from '../lib/cartoon';
import {NoText} from '../lib/short';
import {Flamingo} from '../shorts/02-flamingo/Flamingo';
import {PlaneWindows} from '../shorts/03-plane-windows/PlaneWindows';
import {Venus} from '../shorts/04-venus/Venus';
import {Woodpecker} from '../shorts/05-woodpecker/Woodpecker';
import {WrinklyFingers} from '../shorts/06-wrinkly-fingers/WrinklyFingers';
import {AstronautBones} from '../shorts/07-astronaut-bones/AstronautBones';
import {SixtyMinutes} from '../shorts/08-sixty-minutes/SixtyMinutes';
import {SpiderWeb} from '../shorts/09-spider-web/SpiderWeb';
import {IceFloats} from '../shorts/10-ice-floats/IceFloats';
import {LeapYear} from '../shorts/11-leap-year/LeapYear';
import {OctopusHearts} from '../shorts/12-octopus-hearts/OctopusHearts';
import {T as T12} from '../shorts/12-octopus-hearts/timing';
import {BlueSky} from '../shorts/13-blue-sky/BlueSky';
import {T as T13} from '../shorts/13-blue-sky/timing';
import {Honey} from '../shorts/14-honey/Honey';
import {T as T14} from '../shorts/14-honey/timing';
import {EiffelTower} from '../shorts/15-eiffel-tower/EiffelTower';
import {T as T15} from '../shorts/15-eiffel-tower/timing';
import {BananaBerry} from '../shorts/16-banana-berry/BananaBerry';
import {T as T16} from '../shorts/16-banana-berry/timing';
import {OnionTears} from '../shorts/17-onion-tears/OnionTears';
import {T as T17} from '../shorts/17-onion-tears/timing';
import {DeadSea} from '../shorts/18-dead-sea/DeadSea';
import {T as T18} from '../shorts/18-dead-sea/timing';
import {LightningSun} from '../shorts/19-lightning-sun/LightningSun';
import {T as T19} from '../shorts/19-lightning-sun/timing';
import {RecordedVoice} from '../shorts/20-recorded-voice/RecordedVoice';
import {T as T20} from '../shorts/20-recorded-voice/timing';
import {GreatWall} from '../shorts/21-great-wall/GreatWall';
import {T as T21} from '../shorts/21-great-wall/timing';
import {SharksTrees} from '../shorts/22-sharks-trees/SharksTrees';
import {T as T22} from '../shorts/22-sharks-trees/timing';
import {MoonFace} from '../shorts/23-moon-face/MoonFace';
import {T as T23} from '../shorts/23-moon-face/timing';
import {CatFeet} from '../shorts/24-cat-feet/CatFeet';
import {T as T24} from '../shorts/24-cat-feet/timing';
import {Popcorn} from '../shorts/25-popcorn/Popcorn';
import {T as T25} from '../shorts/25-popcorn/timing';
import {LibertyGreen} from '../shorts/26-liberty-green/LibertyGreen';
import {T as T26} from '../shorts/26-liberty-green/timing';
import {BigBen} from '../shorts/27-big-ben/BigBen';
import {T as T27} from '../shorts/27-big-ben/timing';
import {BubblesRound} from '../shorts/28-bubbles-round/BubblesRound';
import {T as T28} from '../shorts/28-bubbles-round/timing';
import {EverestMaunaKea} from '../shorts/29-everest-mauna-kea/EverestMaunaKea';
import {T as T29} from '../shorts/29-everest-mauna-kea/timing';
import {StarsTwinkle} from '../shorts/30-stars-twinkle/StarsTwinkle';
import {T as T30} from '../shorts/30-stars-twinkle/timing';
import {Goosebumps} from '../shorts/31-goosebumps/Goosebumps';
import {T as T31} from '../shorts/31-goosebumps/timing';

// Shorts cover = a frozen hero frame of the short itself + a loud headline band on top.
type Th = {id: string; C: React.FC; t: number; l1: string; l2: string; tag: string; bg: string; bg2: string; tagFill: string; srcY?: number; s?: number; dx?: number};
export const THUMBS: Th[] = [
  {id: '02flamingo', C: Flamingo, t: 11.2, l1: 'ONE LEG', l2: 'IS LAZIER?!', tag: 'NO MUSCLE NEEDED', bg: '#FF7AA8', bg2: '#E5417A', tagFill: '#2C7BE5'},
  {id: '03planewindows', C: PlaneWindows, t: 16.9, l1: 'SQUARE WINDOWS', l2: 'BROKE PLANES', tag: '1954', bg: '#3D8CF0', bg2: '#1F5FB8', tagFill: '#E5414A'},
  {id: '04venus', C: Venus, t: 20.4, l1: 'NOT MERCURY?!', l2: 'VENUS IS HOTTER', tag: '460°C', bg: '#FF8A3D', bg2: '#D9481F', tagFill: '#7A5CC8', srcY: 640},
  {id: '05woodpecker', C: Woodpecker, t: 7.2, l1: 'NO HEADACHE?', l2: 'HOW?!', tag: 'NO CONCUSSION', bg: '#4CC38A', bg2: '#22955F', tagFill: '#E5414A'},
  {id: '06wrinklyfingers', C: WrinklyFingers, t: 8.6, l1: 'PRUNE FINGERS', l2: 'ARE A TRICK', tag: 'YOUR NERVES DO IT', bg: '#7FD0FF', bg2: '#3D8CF0', tagFill: '#E5414A'},
  {id: '07astronautbones', C: AstronautBones, t: 16.4, l1: 'SPACE EATS', l2: 'YOUR BONES', tag: 'UP TO 2% A MONTH', bg: '#7A5CC8', bg2: '#4B3596', tagFill: '#E5414A'},
  {id: '08sixtyminutes', C: SixtyMinutes, t: 10.9, l1: 'WHY NOT', l2: '100 MINUTES?', tag: 'BLAME BABYLON', bg: '#FFC93D', bg2: '#E59A1F', tagFill: '#2C7BE5'},
  {id: '09spiderweb', C: SpiderWeb, t: 3.4, l1: "WHY DON'T", l2: 'SPIDERS STICK?', tag: 'SECRET LEGS', bg: '#2B3A4A', bg2: '#141A44', tagFill: '#4CC38A', srcY: 360},
  {id: '10icefloats', C: IceFloats, t: 6.4, l1: 'ICE SHOULD', l2: 'SINK!', tag: 'WATER IS WEIRD', bg: '#7FD0FF', bg2: '#2C7BE5', tagFill: '#FF8A5B', srcY: 560},
  {id: '11leapyear', C: LeapYear, t: 1.6, l1: 'WHY FEB 29', l2: 'EXISTS', tag: '365¼ DAYS', bg: '#E5414A', bg2: '#A8222B', tagFill: '#2C7BE5', srcY: 500},
  {id: '12octopushearts', C: OctopusHearts, t: T12.gills + 0.7, l1: 'THREE HEARTS', l2: 'BLUE BLOOD?!', tag: 'OCTOPUS SECRET', bg: '#7A5CC8', bg2: '#4B3596', tagFill: '#E5414A', srcY: 560},
  {id: '13bluesky', C: BlueSky, t: T13.long + 0.7, l1: 'WHY IS THE', l2: 'SKY BLUE?', tag: 'SUNLIGHT IS WHITE', bg: '#3D8CF0', bg2: '#1F5FB8', tagFill: '#E5414A', srcY: 560},
  {id: '14honey', C: Honey, t: T14.years + 0.7, l1: 'HONEY NEVER', l2: 'GOES BAD', tag: 'FOR YEARS', bg: '#FFC93D', bg2: '#E59A1F', tagFill: '#2C7BE5', srcY: 700},
  {id: '15eiffeltower', C: EiffelTower, t: T15.fifteen + 0.7, l1: 'EIFFEL TOWER', l2: 'GROWS?!', tag: '+15 CM IN SUMMER', bg: '#FF8A3D', bg2: '#D9481F', tagFill: '#2C7BE5', srcY: 600},
  {id: '16bananaberry', C: BananaBerry, t: T16.not + 0.45, l1: 'BANANA = BERRY', l2: "STRAWBERRY ISN'T", tag: 'BOTANY IS WEIRD', bg: '#4CC38A', bg2: '#22955F', tagFill: '#E5414A', srcY: 640},
  {id: '17oniontears', C: OnionTears, t: T17.flood + 0.5, l1: 'WHY ONIONS', l2: 'MAKE YOU CRY', tag: '+ THE FIX', bg: '#B07AD8', bg2: '#7A4AA8', tagFill: '#2C7BE5', srcY: 660},
  {id: '18deadsea', C: DeadSea, t: T18.why + 0.5, l1: "YOU CAN'T", l2: 'SINK HERE', tag: 'DEAD SEA', bg: '#4FB3C8', bg2: '#2A7F95', tagFill: '#E5414A', srcY: 760},
  {id: '19lightningsun', C: LightningSun, t: T19.sun + 0.8, l1: 'HOTTER THAN', l2: 'THE SUN?!', tag: '30,000°C', bg: '#2B3A6A', bg2: '#141A44', tagFill: '#E5414A', srcY: 680, s: 1.4, dx: -40},
  {id: '20recordedvoice', C: RecordedVoice, t: T20.skull + 0.6, l1: 'WHY YOUR VOICE', l2: 'SOUNDS WEIRD', tag: 'ON RECORDINGS', bg: '#7A5CC8', bg2: '#4B3596', tagFill: '#E5414A', srcY: 640},
  {id: '21greatwall', C: GreatWall, t: T21.not + 0.5, l1: 'GREAT WALL', l2: 'FROM SPACE?', tag: 'ASTRONAUTS SAY NO', bg: '#2B3A6A', bg2: '#141A44', tagFill: '#E5414A', srcY: 700},
  {id: '22sharkstrees', C: SharksTrees, t: T22.first + 0.6, l1: 'SHARKS ARE', l2: 'OLDER THAN TREES', tag: '450 MILLION YEARS', bg: '#3D8CF0', bg2: '#1F5FB8', tagFill: '#E5414A', srcY: 700},
  {id: '23moonface', C: MoonFace, t: T23.tidal + 0.6, l1: 'WHY WE NEVER', l2: 'SEE THE FAR SIDE', tag: 'TIDAL LOCKING', bg: '#2B3A6A', bg2: '#141A44', tagFill: '#7A5CC8', srcY: 600},
  {id: '24catfeet', C: CatFeet, t: T24.twists + 0.8, l1: 'HOW CATS', l2: 'ALWAYS LAND', tag: 'RIGHTING REFLEX', bg: '#FF8A3D', bg2: '#D9481F', tagFill: '#2C7BE5', srcY: 600},
  {id: '25popcorn', C: Popcorn, t: T25.bursts + 0.4, l1: 'WHY POPCORN', l2: 'POPS!', tag: '10x PRESSURE', bg: '#FFC93D', bg2: '#E59A1F', tagFill: '#E5414A', srcY: 620},
  {id: '26libertygreen', C: LibertyGreen, t: T26.penny + 0.8, l1: 'LIBERTY WAS', l2: 'NOT GREEN?!', tag: 'SHINY COPPER', bg: '#4CC38A', bg2: '#22955F', tagFill: '#E5414A', srcY: 600},
  {id: '27bigben', C: BigBen, t: T27.bell - 0.12, l1: 'BIG BEN IS', l2: 'NOT THE TOWER', tag: "IT'S THE BELL", bg: '#E5414A', bg2: '#A8222B', tagFill: '#2C7BE5', srcY: 560},
  {id: '28bubblesround', C: BubblesRound, t: T28.sphere + 0.8, l1: 'WHY BUBBLES', l2: 'ARE ROUND', tag: 'SPHERE WINS', bg: '#FF7AA8', bg2: '#E5417A', tagFill: '#2C7BE5', srcY: 640},
  {id: '29everestmaunakea', C: EverestMaunaKea, t: T29.beats + 0.6, l1: 'EVEREST IS', l2: 'NOT THE TALLEST', tag: '10,000+ M', bg: '#3D8CF0', bg2: '#1F5FB8', tagFill: '#E5414A', srcY: 700},
  {id: '30starstwinkle', C: StarsTwinkle, t: T30.flickers + 0.5, l1: 'WHY STARS', l2: 'TWINKLE', tag: "BUT PLANETS DON'T", bg: '#2B3A6A', bg2: '#141A44', tagFill: '#E5414A', srcY: 560},
  {id: '31goosebumps', C: Goosebumps, t: T31.bigger + 0.5, l1: 'WHY WE GET', l2: 'GOOSEBUMPS', tag: 'FURRY ANCESTORS', bg: '#7A5CC8', bg2: '#4B3596', tagFill: '#E5414A', srcY: 680},
];

const Txt: React.FC<{x: number; y: number; size: number; color?: string; rot?: number; children: React.ReactNode}> = ({x, y, size, color = '#fff', rot = 0, children}) => (
  <text x={x} y={y} transform={`rotate(${rot} ${x} ${y})`} textAnchor="middle" fontFamily="Anton, 'Arial Black', 'DejaVu Sans', sans-serif" fontWeight={900}
    fontSize={size} fill={color} stroke={INK} strokeWidth={size * 0.16} paintOrder="stroke" strokeLinejoin="round">{children}</text>
);
const fit = (s: string, max: number, base: number) => Math.min(base, Math.floor(max / (s.length * 0.74)));

export const ShortThumb: React.FC<{id: string}> = ({id}) => {
  const th = THUMBS.find((x) => x.id === id)!;
  const BAND = 660, srcY = th.srcY ?? 420, s = th.s ?? 1.0;
  const {C} = th;
  return (
    <AbsoluteFill style={{background: th.bg2}}>
      {/* the short's own frame, shifted so its busy top edge sits under the band */}
      <AbsoluteFill style={{transform: `translate(${th.dx ?? 0}px, ${BAND - srcY * s}px) scale(${s})`, transformOrigin: '50% 0'}}>
        <NoText.Provider value={true}><Freeze frame={Math.round(th.t * 60)}><C /></Freeze></NoText.Provider>
      </AbsoluteFill>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute'}}>
        <defs>
          <radialGradient id="g" cx="0.5" cy="0.4" r="0.8"><stop offset="0" stopColor={th.bg} /><stop offset="1" stopColor={th.bg2} /></radialGradient>
        </defs>
        <path d={`M 0 0 L 1080 0 L 1080 ${BAND - 30} Q 540 ${BAND + 40} 0 ${BAND - 30} Z`} fill="url(#g)" stroke={INK} strokeWidth={12} />
        {Array.from({length: 14}).map((_, i) => { const a = (i / 14) * Math.PI * 2; return <path key={i} d={`M 540 330 L ${540 + Math.cos(a) * 900} ${330 + Math.sin(a) * 900} L ${540 + Math.cos(a + 0.12) * 900} ${330 + Math.sin(a + 0.12) * 900} Z`} fill="#fff" opacity={0.08} />; })}
        <Txt x={540} y={250} size={fit(th.l1, 960, 150)} rot={-3}>{th.l1}</Txt>
        <Txt x={540} y={430} size={fit(th.l2, 960, 165)} rot={-3} color="#FFE45C">{th.l2}</Txt>
        <g transform={`translate(540 ${BAND + 10}) rotate(4)`}>
          <rect x={-(th.tag.length * 26 + 50)} y={-62} width={(th.tag.length * 26 + 50) * 2} height={116} rx={26} fill={th.tagFill} stroke={INK} strokeWidth={10} />
          <Txt x={0} y={22} size={78}>{th.tag}</Txt>
        </g>
      </svg>
      <Img src={staticFile('shared/stormi.png')} style={{position: 'absolute', left: 50, top: 1730, width: 150, height: 150}} />
    </AbsoluteFill>
  );
};
