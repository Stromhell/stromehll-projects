import React from 'react';
import {Composition} from 'remotion';
import {Seawater} from './seawater/Seawater';
import {T, FPS} from './seawater/timing';
import {SeawaterThumb} from './seawater/Thumb';
import {Flamingo as C02Flamingo} from './shorts/02-flamingo/Flamingo';
import {T as T02Flamingo} from './shorts/02-flamingo/timing';
import {PlaneWindows as C03PlaneWindows} from './shorts/03-plane-windows/PlaneWindows';
import {T as T03PlaneWindows} from './shorts/03-plane-windows/timing';
import {Venus as C04Venus} from './shorts/04-venus/Venus';
import {T as T04Venus} from './shorts/04-venus/timing';
import {Woodpecker as C05Woodpecker} from './shorts/05-woodpecker/Woodpecker';
import {T as T05Woodpecker} from './shorts/05-woodpecker/timing';
import {WrinklyFingers as C06WrinklyFingers} from './shorts/06-wrinkly-fingers/WrinklyFingers';
import {T as T06WrinklyFingers} from './shorts/06-wrinkly-fingers/timing';
import {AstronautBones as C07AstronautBones} from './shorts/07-astronaut-bones/AstronautBones';
import {T as T07AstronautBones} from './shorts/07-astronaut-bones/timing';
import {SixtyMinutes as C08SixtyMinutes} from './shorts/08-sixty-minutes/SixtyMinutes';
import {T as T08SixtyMinutes} from './shorts/08-sixty-minutes/timing';
import {SpiderWeb as C09SpiderWeb} from './shorts/09-spider-web/SpiderWeb';
import {T as T09SpiderWeb} from './shorts/09-spider-web/timing';
import {IceFloats as C10IceFloats} from './shorts/10-ice-floats/IceFloats';
import {T as T10IceFloats} from './shorts/10-ice-floats/timing';
import {LeapYear as C11LeapYear} from './shorts/11-leap-year/LeapYear';
import {T as T11LeapYear} from './shorts/11-leap-year/timing';
import {OctopusHearts as C12OctopusHearts} from './shorts/12-octopus-hearts/OctopusHearts';
import {T as T12OctopusHearts} from './shorts/12-octopus-hearts/timing';
import {BlueSky as C13BlueSky} from './shorts/13-blue-sky/BlueSky';
import {T as T13BlueSky} from './shorts/13-blue-sky/timing';
import {Honey as C14Honey} from './shorts/14-honey/Honey';
import {T as T14Honey} from './shorts/14-honey/timing';
import {EiffelTower as C15EiffelTower} from './shorts/15-eiffel-tower/EiffelTower';
import {T as T15EiffelTower} from './shorts/15-eiffel-tower/timing';
import {BananaBerry as C16BananaBerry} from './shorts/16-banana-berry/BananaBerry';
import {T as T16BananaBerry} from './shorts/16-banana-berry/timing';
import {OnionTears as C17OnionTears} from './shorts/17-onion-tears/OnionTears';
import {T as T17OnionTears} from './shorts/17-onion-tears/timing';
import {DeadSea as C18DeadSea} from './shorts/18-dead-sea/DeadSea';
import {T as T18DeadSea} from './shorts/18-dead-sea/timing';
import {LightningSun as C19LightningSun} from './shorts/19-lightning-sun/LightningSun';
import {T as T19LightningSun} from './shorts/19-lightning-sun/timing';
import {RecordedVoice as C20RecordedVoice} from './shorts/20-recorded-voice/RecordedVoice';
import {T as T20RecordedVoice} from './shorts/20-recorded-voice/timing';
import {GreatWall as C21GreatWall} from './shorts/21-great-wall/GreatWall';
import {T as T21GreatWall} from './shorts/21-great-wall/timing';
import {SharksTrees as C22SharksTrees} from './shorts/22-sharks-trees/SharksTrees';
import {T as T22SharksTrees} from './shorts/22-sharks-trees/timing';
import {MoonFace as C23MoonFace} from './shorts/23-moon-face/MoonFace';
import {T as T23MoonFace} from './shorts/23-moon-face/timing';
import {CatFeet as C24CatFeet} from './shorts/24-cat-feet/CatFeet';
import {T as T24CatFeet} from './shorts/24-cat-feet/timing';
import {Popcorn as C25Popcorn} from './shorts/25-popcorn/Popcorn';
import {T as T25Popcorn} from './shorts/25-popcorn/timing';
import {LibertyGreen as C26LibertyGreen} from './shorts/26-liberty-green/LibertyGreen';
import {T as T26LibertyGreen} from './shorts/26-liberty-green/timing';
import {BigBen as C27BigBen} from './shorts/27-big-ben/BigBen';
import {T as T27BigBen} from './shorts/27-big-ben/timing';
import {BubblesRound as C28BubblesRound} from './shorts/28-bubbles-round/BubblesRound';
import {T as T28BubblesRound} from './shorts/28-bubbles-round/timing';
import {EverestMaunaKea as C29EverestMaunaKea} from './shorts/29-everest-mauna-kea/EverestMaunaKea';
import {T as T29EverestMaunaKea} from './shorts/29-everest-mauna-kea/timing';
import {StarsTwinkle as C30StarsTwinkle} from './shorts/30-stars-twinkle/StarsTwinkle';
import {T as T30StarsTwinkle} from './shorts/30-stars-twinkle/timing';
import {Goosebumps as C31Goosebumps} from './shorts/31-goosebumps/Goosebumps';
import {T as T31Goosebumps} from './shorts/31-goosebumps/timing';
import {THUMBS, ShortThumb} from './thumbs/Thumbs';
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Seawater" component={Seawater} width={1080} height={1920} fps={FPS} durationInFrames={Math.round(T.end * FPS)} />
    <Composition id="SeawaterThumbV" component={SeawaterThumb} width={1080} height={1920} fps={60} durationInFrames={1} defaultProps={{vertical: true}} />
    <Composition id="SeawaterThumbH" component={SeawaterThumb} width={1280} height={720} fps={60} durationInFrames={1} defaultProps={{vertical: false}} />
    <Composition id="S02flamingo" component={C02Flamingo} width={1080} height={1920} fps={60} durationInFrames={Math.round(T02Flamingo.end * 60)} />
    <Composition id="S03planewindows" component={C03PlaneWindows} width={1080} height={1920} fps={60} durationInFrames={Math.round(T03PlaneWindows.end * 60)} />
    <Composition id="S04venus" component={C04Venus} width={1080} height={1920} fps={60} durationInFrames={Math.round(T04Venus.end * 60)} />
    <Composition id="S05woodpecker" component={C05Woodpecker} width={1080} height={1920} fps={60} durationInFrames={Math.round(T05Woodpecker.end * 60)} />
    <Composition id="S06wrinklyfingers" component={C06WrinklyFingers} width={1080} height={1920} fps={60} durationInFrames={Math.round(T06WrinklyFingers.end * 60)} />
    <Composition id="S07astronautbones" component={C07AstronautBones} width={1080} height={1920} fps={60} durationInFrames={Math.round(T07AstronautBones.end * 60)} />
    <Composition id="S08sixtyminutes" component={C08SixtyMinutes} width={1080} height={1920} fps={60} durationInFrames={Math.round(T08SixtyMinutes.end * 60)} />
    <Composition id="S09spiderweb" component={C09SpiderWeb} width={1080} height={1920} fps={60} durationInFrames={Math.round(T09SpiderWeb.end * 60)} />
    <Composition id="S10icefloats" component={C10IceFloats} width={1080} height={1920} fps={60} durationInFrames={Math.round(T10IceFloats.end * 60)} />
    <Composition id="S11leapyear" component={C11LeapYear} width={1080} height={1920} fps={60} durationInFrames={Math.round(T11LeapYear.end * 60)} />
    <Composition id="S12octopushearts" component={C12OctopusHearts} width={1080} height={1920} fps={60} durationInFrames={Math.round(T12OctopusHearts.end * 60)} />
    <Composition id="S13bluesky" component={C13BlueSky} width={1080} height={1920} fps={60} durationInFrames={Math.round(T13BlueSky.end * 60)} />
    <Composition id="S14honey" component={C14Honey} width={1080} height={1920} fps={60} durationInFrames={Math.round(T14Honey.end * 60)} />
    <Composition id="S15eiffeltower" component={C15EiffelTower} width={1080} height={1920} fps={60} durationInFrames={Math.round(T15EiffelTower.end * 60)} />
    <Composition id="S16bananaberry" component={C16BananaBerry} width={1080} height={1920} fps={60} durationInFrames={Math.round(T16BananaBerry.end * 60)} />
    <Composition id="S17oniontears" component={C17OnionTears} width={1080} height={1920} fps={60} durationInFrames={Math.round(T17OnionTears.end * 60)} />
    <Composition id="S18deadsea" component={C18DeadSea} width={1080} height={1920} fps={60} durationInFrames={Math.round(T18DeadSea.end * 60)} />
    <Composition id="S19lightningsun" component={C19LightningSun} width={1080} height={1920} fps={60} durationInFrames={Math.round(T19LightningSun.end * 60)} />
    <Composition id="S20recordedvoice" component={C20RecordedVoice} width={1080} height={1920} fps={60} durationInFrames={Math.round(T20RecordedVoice.end * 60)} />
    <Composition id="S21greatwall" component={C21GreatWall} width={1080} height={1920} fps={60} durationInFrames={Math.round(T21GreatWall.end * 60)} />
    <Composition id="S22sharkstrees" component={C22SharksTrees} width={1080} height={1920} fps={60} durationInFrames={Math.round(T22SharksTrees.end * 60)} />
    <Composition id="S23moonface" component={C23MoonFace} width={1080} height={1920} fps={60} durationInFrames={Math.round(T23MoonFace.end * 60)} />
    <Composition id="S24catfeet" component={C24CatFeet} width={1080} height={1920} fps={60} durationInFrames={Math.round(T24CatFeet.end * 60)} />
    <Composition id="S25popcorn" component={C25Popcorn} width={1080} height={1920} fps={60} durationInFrames={Math.round(T25Popcorn.end * 60)} />
    <Composition id="S26libertygreen" component={C26LibertyGreen} width={1080} height={1920} fps={60} durationInFrames={Math.round(T26LibertyGreen.end * 60)} />
    <Composition id="S27bigben" component={C27BigBen} width={1080} height={1920} fps={60} durationInFrames={Math.round(T27BigBen.end * 60)} />
    <Composition id="S28bubblesround" component={C28BubblesRound} width={1080} height={1920} fps={60} durationInFrames={Math.round(T28BubblesRound.end * 60)} />
    <Composition id="S29everestmaunakea" component={C29EverestMaunaKea} width={1080} height={1920} fps={60} durationInFrames={Math.round(T29EverestMaunaKea.end * 60)} />
    <Composition id="S30starstwinkle" component={C30StarsTwinkle} width={1080} height={1920} fps={60} durationInFrames={Math.round(T30StarsTwinkle.end * 60)} />
    <Composition id="S31goosebumps" component={C31Goosebumps} width={1080} height={1920} fps={60} durationInFrames={Math.round(T31Goosebumps.end * 60)} />
    {THUMBS.map((th) => <Composition key={th.id} id={`Th${th.id}`} component={ShortThumb} defaultProps={{id: th.id}} width={1080} height={1920} fps={60} durationInFrames={1800} />)}
  </>
);
