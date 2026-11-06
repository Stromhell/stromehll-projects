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
import {WombatCubes} from '../shorts/32-wombat-cubes/WombatCubes';
import {T as T32} from '../shorts/32-wombat-cubes/timing';
import {OxfordAztecs} from '../shorts/33-oxford-aztecs/OxfordAztecs';
import {T as T33} from '../shorts/33-oxford-aztecs/timing';
import {TallerMorning} from '../shorts/34-taller-morning/TallerMorning';
import {T as T34} from '../shorts/34-taller-morning/timing';

// AUTO-B-IMPORTS
import {BananaRadioactive as C35} from '../shorts/35-banana-radioactive/BananaRadioactive';
import {PistolShrimp as C36} from '../shorts/36-pistol-shrimp/PistolShrimp';
import {CleopatraMoon as C37} from '../shorts/37-cleopatra-moon/CleopatraMoon';
import {TardigradeSpace as C38} from '../shorts/38-tardigrade-space/TardigradeSpace';
import {VenusDay as C39} from '../shorts/39-venus-day/VenusDay';
import {HippoSwim as C40} from '../shorts/40-hippo-swim/HippoSwim';
import {ShortestWar as C41} from '../shorts/41-shortest-war/ShortestWar';
import {ScotlandUnicorn as C42} from '../shorts/42-scotland-unicorn/ScotlandUnicorn';
import {Nintendo1889 as C43} from '../shorts/43-nintendo-1889/Nintendo1889';
import {NapoleonHeight as C44} from '../shorts/44-napoleon-height/NapoleonHeight';
import {ButterflyFeet as C45} from '../shorts/45-butterfly-feet/ButterflyFeet';
import {NeutronSpoon as C46} from '../shorts/46-neutron-spoon/NeutronSpoon';
import {TreesStars as C47} from '../shorts/47-trees-stars/TreesStars';
import {KetchupMedicine as C48} from '../shorts/48-ketchup-medicine/KetchupMedicine';
import {EmpireLightning as C49} from '../shorts/49-empire-lightning/EmpireLightning';
import {SaturnFloat as C50} from '../shorts/50-saturn-float/SaturnFloat';
import {MantisPunch as C51} from '../shorts/51-mantis-punch/MantisPunch';
import {PolarBearSkin as C52} from '../shorts/52-polar-bear-skin/PolarBearSkin';
import {CrowsFaces as C53} from '../shorts/53-crows-faces/CrowsFaces';
import {GreatFire as C54} from '../shorts/54-great-fire/GreatFire';
import {PineappleYears as C55} from '../shorts/55-pineapple-years/PineappleYears';
import {Fingernails as C56} from '../shorts/56-fingernails/Fingernails';
import {SoundWater as C57} from '../shorts/57-sound-water/SoundWater';
import {RainSmell as C58} from '../shorts/58-rain-smell/RainSmell';
import {SlothBreath as C59} from '../shorts/59-sloth-breath/SlothBreath';
import {MoonAway as C60} from '../shorts/60-moon-away/MoonAway';
import {AntarcticaDesert as C61} from '../shorts/61-antarctica-desert/AntarcticaDesert';
import {CloudWeight as C62} from '../shorts/62-cloud-weight/CloudWeight';
import {ElephantJump as C63} from '../shorts/63-elephant-jump/ElephantJump';
import {DolphinSleep as C64} from '../shorts/64-dolphin-sleep/DolphinSleep';
import {MammothPyramids as C65} from '../shorts/65-mammoth-pyramids/MammothPyramids';
import {HummingbirdBackwards as C66} from '../shorts/66-hummingbird-backwards/HummingbirdBackwards';
import {HeartBeats as C67} from '../shorts/67-heart-beats/HeartBeats';
import {PurpleCarrots as C68} from '../shorts/68-purple-carrots/PurpleCarrots';
import {SpiderSilk as C69} from '../shorts/69-spider-silk/SpiderSilk';
import {GlassFrog as C70} from '../shorts/70-glass-frog/GlassFrog';
import {VikingHelmets as C71} from '../shorts/71-viking-helmets/VikingHelmets';
import {KoalaFingerprints as C72} from '../shorts/72-koala-fingerprints/KoalaFingerprints';
import {BeeFaces as C73} from '../shorts/73-bee-faces/BeeFaces';
import {FlamingoPink as C74} from '../shorts/74-flamingo-pink/FlamingoPink';
import {MarsSunset as C75} from '../shorts/75-mars-sunset/MarsSunset';
import {RedSpot as C76} from '../shorts/76-red-spot/RedSpot';
import {OwlNeck as C77} from '../shorts/77-owl-neck/OwlNeck';
import {Hiccups68 as C78} from '../shorts/78-hiccups-68-years/Hiccups68';
import {CacaoMoney as C79} from '../shorts/79-cacao-money/CacaoMoney';
import {GoldfishMemory as C80} from '../shorts/80-goldfish-memory/GoldfishMemory';
import {SunMass as C81} from '../shorts/81-sun-mass/SunMass';
import {ImmortalJellyfish as C82} from '../shorts/82-immortal-jellyfish/ImmortalJellyfish';
import {OldestTree as C83} from '../shorts/83-oldest-tree/OldestTree';
import {StomachLining as C84} from '../shorts/84-stomach-lining/StomachLining';
// END-B-IMPORTS
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
  {id: '32wombatcubes', C: WombatCubes, t: T32.cubes + 0.7, l1: 'THIS ANIMAL', l2: 'POOPS CUBES', tag: 'WOMBATS!', bg: '#8BC34A', bg2: '#5E9E2A', tagFill: '#7A4A26', srcY: 760},
  {id: '33oxfordaztecs', C: OxfordAztecs, t: 2.6, l1: 'OXFORD IS OLDER', l2: 'THAN THE AZTECS', tag: '1096 vs 1325', bg: '#E5414A', bg2: '#A8222B', tagFill: '#2C7BE5', srcY: 600},
  {id: '34tallermorning', C: TallerMorning, t: 2.2, l1: "YOU'RE TALLER", l2: 'IN THE MORNING', tag: 'BY ABOUT 1 CM', bg: '#3D8CF0', bg2: '#1F5FB8', tagFill: '#E5414A', srcY: 620},
  // AUTO-B-ENTRIES
  {id: '35bananaradioactive', C: C35, t: 1.40, l1: "YOUR BANANA IS", l2: "RADIOACTIVE", tag: "NO JOKE", bg: '#7A4DC8', bg2: '#4B2A96', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '36pistolshrimp', C: C36, t: 1.40, l1: "THIS SHRIMP IS", l2: "HOTTER THAN THE SUN", tag: "4,700\u00b0C BUBBLE", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '37cleopatramoon', C: C37, t: 6.02, l1: "CLEOPATRA WAS", l2: "CLOSER TO US", tag: "THAN THE PYRAMIDS", bg: '#E5414A', bg2: '#A8222B', tagFill: '#2C7BE5', srcY: 860, s: 1.3},
  {id: '38tardigradespace', C: C38, t: 3.88, l1: "THIS ANIMAL", l2: "SURVIVED SPACE", tag: "NO SUIT", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '39venusday', C: C39, t: 3.06, l1: "A DAY ON VENUS", l2: "IS LONGER THAN A YEAR", tag: "243 vs 225 DAYS", bg: '#3B4BA8', bg2: '#151C4A', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '40hipposwim', C: C40, t: 3.40, l1: "HIPPOS", l2: "CAN'T SWIM", tag: "THEY BOUNCE", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '41shortestwar', C: C41, t: 5.68, l1: "SHORTEST WAR", l2: "UNDER 45 MIN", tag: "1896", bg: '#E5414A', bg2: '#A8222B', tagFill: '#2C7BE5', srcY: 860, s: 1.3},
  {id: '42scotlandunicorn', C: C42, t: 3.68, l1: "SCOTLAND'S", l2: "NATIONAL ANIMAL", tag: "IS A UNICORN", bg: '#E5414A', bg2: '#A8222B', tagFill: '#2C7BE5', srcY: 860, s: 1.3},
  {id: '43nintendo1889', C: C43, t: 4.86, l1: "NINTENDO IS", l2: "135 YEARS OLD", tag: "STARTED WITH CARDS", bg: '#E5414A', bg2: '#A8222B', tagFill: '#2C7BE5', srcY: 860, s: 1.3},
  {id: '44napoleonheight', C: C44, t: 3.54, l1: "NAPOLEON", l2: "WASN'T SHORT", tag: "BRITISH PROPAGANDA", bg: '#E5414A', bg2: '#A8222B', tagFill: '#2C7BE5', srcY: 860, s: 1.3},
  {id: '45butterflyfeet', C: C45, t: 1.40, l1: "BUTTERFLIES", l2: "TASTE WITH FEET", tag: "EVERY LANDING", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '46neutronspoon', C: C46, t: 3.40, l1: "1 SPOON =", l2: "1 BILLION TONNES", tag: "NEUTRON STAR", bg: '#3B4BA8', bg2: '#151C4A', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '47treesstars', C: C47, t: 4.32, l1: "MORE TREES", l2: "THAN STARS", tag: "3 TRILLION", bg: '#F28C28', bg2: '#C0601A', tagFill: '#2C7BE5', srcY: 860, s: 1.3},
  {id: '48ketchupmedicine', C: C48, t: 4.78, l1: "KETCHUP WAS", l2: "MEDICINE", tag: "TOMATO PILLS", bg: '#E5414A', bg2: '#A8222B', tagFill: '#2C7BE5', srcY: 860, s: 1.3},
  {id: '49empirelightning', C: C49, t: 3.60, l1: "LIGHTNING", l2: "STRIKES TWICE", tag: "20x A YEAR", bg: '#7A4DC8', bg2: '#4B2A96', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '50saturnfloat', C: C50, t: 3.14, l1: "SATURN", l2: "WOULD FLOAT", tag: "IN A BATHTUB", bg: '#3B4BA8', bg2: '#151C4A', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '51mantispunch', C: C51, t: 5.04, l1: "THIS SHRIMP", l2: "PUNCHES LIKE A BULLET", tag: "CRACKS GLASS", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '52polarbearskin', C: C52, t: 3.98, l1: "POLAR BEARS", l2: "AREN'T WHITE", tag: "BLACK SKIN", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '53crowsfaces', C: C53, t: 4.62, l1: "CROWS", l2: "NEVER FORGET", tag: "YOUR FACE", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '54greatfire', C: C54, t: 3.90, l1: "LONDON BURNED", l2: "FOR 4 DAYS", tag: "13,000 HOMES", bg: '#E5414A', bg2: '#A8222B', tagFill: '#2C7BE5', srcY: 860, s: 1.3},
  {id: '55pineappleyears', C: C55, t: 3.82, l1: "1 PINEAPPLE =", l2: "2 YEARS", tag: "NOT EVEN 1 FRUIT", bg: '#F28C28', bg2: '#C0601A', tagFill: '#2C7BE5', srcY: 860, s: 1.3},
  {id: '56fingernails', C: C56, t: 5.00, l1: "FINGERNAILS", l2: "GROW 2x FASTER", tag: "THAN TOENAILS", bg: '#3D8CF0', bg2: '#1F5FB8', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '57soundwater', C: C57, t: 3.36, l1: "SOUND IS 4x", l2: "FASTER UNDERWATER", tag: "1,500 m/s", bg: '#7A4DC8', bg2: '#4B2A96', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '58rainsmell', C: C58, t: 3.52, l1: "THE RAIN SMELL", l2: "HAS A NAME", tag: "PETRICHOR", bg: '#7A4DC8', bg2: '#4B2A96', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '59slothbreath', C: C59, t: 4.82, l1: "SLOTHS BEAT", l2: "DOLPHINS", tag: "40 MIN BREATH", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '60moonaway', C: C60, t: 3.86, l1: "THE MOON IS", l2: "LEAVING US", tag: "4 CM A YEAR", bg: '#3B4BA8', bg2: '#151C4A', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '61antarcticadesert', C: C61, t: 3.88, l1: "BIGGEST DESERT", l2: "ISN'T THE SAHARA", tag: "IT'S ANTARCTICA", bg: '#F28C28', bg2: '#C0601A', tagFill: '#2C7BE5', srcY: 860, s: 1.3},
  {id: '62cloudweight', C: C62, t: 5.32, l1: "A CLOUD WEIGHS", l2: "100 ELEPHANTS", tag: "500 TONNES", bg: '#7A4DC8', bg2: '#4B2A96', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '63elephantjump', C: C63, t: 3.46, l1: "ELEPHANTS", l2: "CAN'T JUMP", tag: "NOT EVEN A HOP", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '64dolphinsleep', C: C64, t: 4.16, l1: "DOLPHINS SLEEP", l2: "HALF AWAKE", tag: "1 EYE OPEN", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '65mammothpyramids', C: C65, t: 10.50, l1: "MAMMOTHS SAW", l2: "THE PYRAMIDS", tag: "2000 BC", bg: '#E5414A', bg2: '#A8222B', tagFill: '#2C7BE5', srcY: 860, s: 1.3},
  {id: '66hummingbirdbackwards', C: C66, t: 0.90, l1: "THIS BIRD", l2: "FLIES BACKWARDS", tag: "80 BEATS/SEC", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 900, s: 1.05},
  {id: '67heartbeats', C: C67, t: 7.32, l1: "YOUR HEART", l2: "100,000 BEATS", tag: "EVERY DAY", bg: '#3D8CF0', bg2: '#1F5FB8', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '68purplecarrots', C: C68, t: 10.36, l1: "CARROTS WERE", l2: "PURPLE", tag: "NOT ORANGE", bg: '#E5414A', bg2: '#A8222B', tagFill: '#2C7BE5', srcY: 860, s: 1.3},
  {id: '69spidersilk', C: C69, t: 1.20, l1: "SPIDER SILK", l2: "BEATS STEEL", tag: "TOUGHER THAN KEVLAR", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '70glassfrog', C: C70, t: 7.70, l1: "THIS FROG IS", l2: "SEE-THROUGH", tag: "61% INVISIBLE", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '71vikinghelmets', C: C71, t: 10.30, l1: "VIKINGS HAD", l2: "NO HORNS", tag: "BLAME AN OPERA", bg: '#E5414A', bg2: '#A8222B', tagFill: '#2C7BE5', srcY: 860, s: 1.3},
  {id: '72koalafingerprints', C: C72, t: 8.44, l1: "KOALAS HAVE", l2: "OUR FINGERPRINTS", tag: "CRIME SCENE?", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '73beefaces', C: C73, t: 6.08, l1: "BEES KNOW", l2: "YOUR FACE", tag: "AFTER 2 DAYS", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '74flamingopink', C: C74, t: 5.48, l1: "FLAMINGOS", l2: "ARE BORN GREY", tag: "FOOD = PINK", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '75marssunset', C: C75, t: 10.26, l1: "SUNSETS ON MARS", l2: "ARE BLUE", tag: "NASA PHOTOS", bg: '#3B4BA8', bg2: '#151C4A', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '76redspot', C: C76, t: 8.66, l1: "A STORM", l2: "BIGGER THAN EARTH", tag: "AND IT'S SHRINKING", bg: '#3B4BA8', bg2: '#151C4A', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '77owlneck', C: C77, t: 3.00, l1: "OWLS TURN", l2: "270 DEGREES", tag: "14 NECK BONES", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '78hiccups68years', C: C78, t: 6.40, l1: "HICCUPS FOR", l2: "68 YEARS", tag: "430 MILLION", bg: '#3D8CF0', bg2: '#1F5FB8', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '79cacaomoney', C: C79, t: 5.34, l1: "AZTECS PAID", l2: "WITH CHOCOLATE", tag: "100 BEANS = TURKEY", bg: '#E5414A', bg2: '#A8222B', tagFill: '#2C7BE5', srcY: 860, s: 1.3},
  {id: '80goldfishmemory', C: C80, t: 6.58, l1: "3 SEC MEMORY?", l2: "TOTAL MYTH", tag: "THEY REMEMBER MONTHS", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '81sunmass', C: C81, t: 9.18, l1: "THE SUN IS", l2: "99.86%", tag: "OF EVERYTHING", bg: '#3B4BA8', bg2: '#151C4A', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '82immortaljellyfish', C: C82, t: 8.52, l1: "THIS JELLYFISH", l2: "NEVER DIES", tag: "OF OLD AGE", bg: '#2FA35A', bg2: '#1C7A3E', tagFill: '#E5414A', srcY: 860, s: 1.3},
  {id: '83oldesttree', C: C83, t: 2.50, l1: "THIS TREE IS", l2: "4,800 YEARS OLD", tag: "LOCATION: SECRET", bg: '#F28C28', bg2: '#C0601A', tagFill: '#2C7BE5', srcY: 860, s: 1.3},
  {id: '84stomachlining', C: C84, t: 8.10, l1: "NEW STOMACH", l2: "EVERY 3-5 DAYS", tag: "ACID PROOF", bg: '#3D8CF0', bg2: '#1F5FB8', tagFill: '#E5414A', srcY: 860, s: 1.3},
  // END-B-ENTRIES
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
