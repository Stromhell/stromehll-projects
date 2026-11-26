const fs=require('fs');const d=require('docx');
const {Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,WidthType,ShadingType,HeadingLevel,ExternalHyperlink,BorderStyle}=d;
const G='https://github.com/';
const C="Custom (made for this project, no public repo)", N="No public GitHub repo found";
const cats=[
["1. Engineering and workflow plugins",[
["superpowers","Core harness: planning, TDD, debugging, code review workflows",G+"obra/superpowers"],
["agent-protocols","Spec, plan, build, test, review and ship protocols",G+"arneesh/agent-protocols"],
["zizi-skills","Planning, project manager, status update, handoff and code quality skills",G+"ziazon/zizi-skills"],
["hookify","Create hooks that stop unwanted behaviour",G+"anthropics/claude-plugins-official"],
["ycofficehour","YC-style product thinking for new ideas",N],
["product-management","Specs, roadmaps, research synthesis",G+"anthropics/knowledge-work-plugins"],
["skill-creator","Create and improve skills",G+"anthropics/skills"],
["task-observer","Logs skill improvements and corrections during tasks",G+"rebelytics/one-skill-to-rule-them-all"],
["ponytail (+ audit, review, debt, gain, help)","Smallest-change coding mode and quality audits",G+"DietrichGebert/ponytail"]]],
["2. Video, animation and 3D",[
["remotion (plugin)","Remotion video skills: captions, render, studio, maps",G+"remotion-dev/claude-code-plugin"],
["Remotion (framework)","React-based video rendering",G+"remotion-dev/remotion"],
["MotionMaxx (motion-kit)","Titles, map/stat reveals, kinetic type, reel hooks",G+"Tejashmakwana/motionmaxxing"],
["Shotcraft (video-shotcraft)","Shot cards and sound design references",G+"Vincentwei1021/video-shotcraft"],
["video-talkcraft","Companion to Shotcraft for talking-style videos",G+"Vincentwei1021/video-talkcraft"],
["vibe-motion sound","Sound effect references used by the motion kit",G+"vibe-motion/sound"],
["HyperFrames (HeyGen)","Programmable HTML video projects",G+"heygen-com/hyperframes"],
["three.js","3D engine behind the 3D line and 3d-animator",G+"mrdoob/three.js"],
["3d-animator","Cinematic 3D films and reels in code",C],
["meshy-3d-agent","Generate 3D models, textures, rigging",G+"meshy-dev/meshy-3d-agent"],
["yt-longform-videostyle-stromhell-animation","House 2D art and animation style",C],
["toon-lanky-character","Characters in Pushpam's Toon Lanky style",C],
["cutout-cartoon-shorts","2D cut-out cartoon Shorts from a fact script",C],
["paper-collage-film","Torn-paper collage motion films",C],
["editorial-film-edit","Archival editorial edit style",C],
["GSAP skills (gsap-core, timeline, scrolltrigger + 5 more)","Official GSAP animation skills, added 27 Nov",G+"greensock/gsap-skills"],
["three.js skills (13 threejs-* skills)","Scenes, lighting, shaders, animation, performance, added 27 Nov",G+"cloudai-x/threejs-skills"],
["motion-design","Timing, easing, Disney principles for motion, added 27 Nov",G+"lottiefiles/motion-design-skill"],
["genjutsu (cast, paint, bunshin)","Anti-slop motion and visual signatures, added 27 Nov",G+"AThevon/genjutsu"],
["SupoClip","Long video to clips (own channels only)",G+"FujiwaraChoki/supoclip"],
["FFmpeg","Encoding, combining and QA decoding",G+"FFmpeg/FFmpeg"],
["Playwright / Chromium","Headless frame rendering of HTML acts",G+"microsoft/playwright"],
["creative-claw","Image, video, voice generation (needs sign-in)",G+"CreativeClawCo/creative-claw-marketplace"],
["render-progress-monitor","Live progress page for long renders",C]]],
["3. Voice and audio",[
["pushpam-voice / my-voice","Voiceovers in Pushpam's cloned voice",C],
["Chatterbox","Open-source voice cloning engine used for Pushpam's voice",G+"resemble-ai/chatterbox"],
["Kokoro TTS","Free TTS (Spanish voice for Stormi Knows Anime)",G+"hexgrad/kokoro"],
["kokoro-onnx","ONNX runtime version of Kokoro",G+"thewh1teagle/kokoro-onnx"],
["ACE-Step 1.5 (acestep skill)","AI music generation (not used without paid key)",G+"ace-step/ACE-Step-1.5"],
["ElevenLabs MCP","Long-video thumbnails only (credits rule)",G+"elevenlabs/elevenlabs-mcp"]]],
["4. QA and video watching",[
["claude-video /watch","Frame-by-frame render QA",G+"bradautomates/claude-video"],
["Transformers","Runs Qwen3-VL locally for lean QA",G+"huggingface/transformers"],
["Qwen3-VL-4B","Free vision model for qa_lean.py and qwen_qa.py",G+"QwenLM/Qwen3-VL"],
["peek (Matt's Peeker)","Video analysis from frames and transcript",N],
["qa_auto / qa_lean / voice_qa / qa_learn","Project QA scripts and lessons loop",C],
["yt-dlp","Video downloads (bot-blocked in cloud)",G+"yt-dlp/yt-dlp"],
["youtube-link-watch","Pull YouTube data via Pushpam's Chrome",C],
["clips-youtube-colab-download","Download clip sources via Colab to Drive",C]]],
["5. YouTube and content skills",[
["yt-script, yt-package, yt-seo, yt-chapters, yt-shorts","Scripts, titles/thumbs, SEO, chapters, Shorts",C],
["yt-audit, yt-plan, yt-retention, yt-viral, yt-edit, yt-comment","Channel audit, planning, retention, trends, edits, replies",C],
["youtube-thumbnail","Branded thumbnails from a title",C],
["hook-generator, reels-scripting","Hooks and reel scripts",C],
["contagious","STEPPS virality framework",N],
["short-form-video","Reels/TikTok/Shorts making guide",N],
["art-consistency","Character and style consistency for AI images",N],
["image-generation","Prompting guide for text-to-image models",G+"ahmedraza28/image-generation-skill"],
["humanizer","Makes AI text read naturally",G+"blader/humanizer"],
["no-ai-slop","Edits drafts to sound human",C],
["caveman","Short, simple reply mode",G+"akramsystems/caveman"],
["deep-research, niche-research","Multi-source research and niche stories",C]]],
["6. Social posting and marketing",[
["Zernio plugin","Scheduling and publishing across platforms",G+"zernio-dev/zernio-claude-plugin"],
["upload-post","Posting, campaigns, comment funnels",G+"Upload-Post/upload-post-plugin"],
["postiz","Social scheduling CLI and MCP",G+"gitroomhq/postiz-agent"],
["social, video (marketing skills)","Social content and AI video production guides",G+"coreyhaines31/marketingskills"],
["instagram-marketing","Instagram planning and auditing",G+"sergebulaev/instagram-skills"],
["instagram (plugin)","Read/reply to IG comments and DMs",N],
["marketing, small-business, design","Anthropic knowledge-work plugins",G+"anthropics/knowledge-work-plugins"],
["seo-audit","SEO audits and fix plans",G+"grayskripko/marketing-skills"],
["aeotester","AI search visibility audit",G+"shapito27/aeotester-site-audit"],
["LinkedIn skills (post-writer, post-scorer, content-matrix, etc.)","LinkedIn writing and graphics",C]]],
["7. Design, documents and data",[
["docx, pdf, pptx, xlsx","Office and PDF files",G+"anthropics/skills"],
["web-artifacts-builder, frontend-design","Artifacts and UI design",G+"anthropics/skills"],
["impeccable","Design critique and polish",G+"pbakaus/impeccable"],
["design-taste-frontend (tasteskill)","Anti-slop frontend art direction",G+"Leonxlnx/taste-skill"],
["dataink","Charts, infographics, data storytelling",G+"oh-da/dataink"],
["adobe-for-creativity","Adobe Creative Cloud tools (needs sign-in)",G+"adobe/skills"],
["canva","Canva designs (needs sign-in)",N],
["design-dna","Reference images to style JSON and back, added 27 Nov",G+"zanwei/design-dna"],
["anatomy","Isometric SVG explainer figures",C]]],
["8. Token saving and efficiency",[
["Graphify","Code map of the pipeline, query before grepping",G+"Graphify-Labs/graphify"],
["Headroom (hc)","Compresses big JSON output",G+"headroomlabs-ai/headroom"],
["rtk","Compact git/ls/grep output",G+"rtk-ai/rtk"],
["repomix (agent-kit pack)","Compressed bundles for handoffs",G+"yamadashy/repomix"],
["token-shield","Token spend playbook and reports",G+"khalilmaaouni/token-shield"],
["token-efficiency-audit","Audits token use across skills and tasks",G+"MSApps-Mobile/claude-plugins"]]],
["9. Project system tools (all custom, in /mnt/project-files)",[
["gdrive_upload.py / drive_sync","Uploads to Drive AI",C],
["Control Room, calendar","Hourly dashboard and all-channels calendar",C],
["pipeline-watchdog, cover-watchdog, shorts-fulllink","Scheduled checks and Shorts linking",C],
["longvideo-refresh, storage-cleanup, housekeeping","Low-view refresh, storage and cache cleanup",C],
["Production rulebook + handover template","stormi-production-system-v1.md",C]]],
];
const W=[3000,3700,2660];const b={style:BorderStyle.SINGLE,size:4,color:"BBBBBB"};const bd={top:b,bottom:b,left:b,right:b};
const cell=(c,i,h)=>new TableCell({width:{size:W[i],type:WidthType.DXA},borders:bd,shading:h?{type:ShadingType.CLEAR,fill:"1F3A5F",color:"auto"}:undefined,margins:{top:60,bottom:60,left:100,right:100},children:[new Paragraph({children:[c]})]});
const t=(s,o={})=>new TextRun({text:s,font:"Arial",size:19,...o});
const kids=[new Paragraph({heading:HeadingLevel.TITLE,children:[t("Skills and Tools Used in the Project",{size:40,bold:true})]}),
new Paragraph({spacing:{after:200},children:[t("All channels (Stormi, Finance, DumDown, Stormi Knows Anime, Clips). Made 26 Nov 2026, updated 27 Nov with the design and motion kit. Every GitHub link was checked to exist on GitHub today. Rows marked custom were built in this project; rows marked \"no public repo found\" came from a marketplace or connector with no source link I could verify.",{size:20})]})];
let total=0,linked=0;
for(const [h,rows] of cats){kids.push(new Paragraph({heading:HeadingLevel.HEADING_1,children:[t(h,{size:28,bold:true,color:"1F3A5F"})]}));
 const tr=[new TableRow({tableHeader:true,children:["Skill / tool","What it does","GitHub repo"].map((x,i)=>cell(t(x,{bold:true,color:"FFFFFF"}),i,1))})];
 for(const [n,p,l] of rows){total++;const isL=l.startsWith("http");if(isL)linked++;
  tr.push(new TableRow({children:[cell(t(n,{bold:true}),0),cell(t(p),1),cell(isL?new ExternalHyperlink({link:l,children:[t(l.replace("https://",""),{color:"0563C1",underline:{}})]}):t(l,{italics:true,color:"666666"}),2)]}));}
 kids.push(new Table({width:{size:9360,type:WidthType.DXA},columnWidths:W,rows:tr}));}
kids.push(new Paragraph({spacing:{before:240},children:[t(`Total: ${total} rows, ${linked} with a verified GitHub repo.`,{bold:true})]}));
const doc=new Document({styles:{default:{document:{run:{font:"Arial",size:20}},title:{run:{font:"Arial",size:40,bold:true},paragraph:{spacing:{before:0,after:120},keepNext:true}},heading1:{run:{font:"Arial",size:28,bold:true},paragraph:{spacing:{before:280,after:120},keepNext:true}}}},
sections:[{properties:{page:{size:{width:12240,height:15840},margin:{top:1080,bottom:1080,left:1440,right:1440}}},children:kids}]});
Packer.toBuffer(doc).then(x=>{fs.writeFileSync("Project-Skills-and-Tools_v2.docx",x);console.log(total,linked)});
