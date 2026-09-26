
const scenes = [...document.querySelectorAll('.scene')];
const outside = document.getElementById('outside');
const hall = document.getElementById('hall');
const ready = document.getElementById('ready');
const screening = document.getElementById('screening');
const reveal = document.getElementById('reveal');

const claimBtn = document.getElementById('claimBtn');
const ticketPop = document.getElementById('ticketPop');
const clerkText = document.getElementById('clerkText');
const enterBtn = document.getElementById('enterBtn');
const rows = document.getElementById('rows');
const seatMessage = document.getElementById('seatMessage');
const screenCopy = document.getElementById('screenCopy');

const projectorAudio = document.getElementById('projectorAudio');
const curtainAudio = document.getElementById('curtainAudio');
const breakAudio = document.getElementById('breakAudio');
const voiceAudio = document.getElementById('voiceAudio');
const revealAudio = document.getElementById('revealAudio');
const firstShotAudio = document.getElementById('firstShotAudio');
const summariesAudio = document.getElementById('summariesAudio');
const appreciationAudio = document.getElementById('appreciationAudio');
const learningAudio = document.getElementById('learningAudio');
const versionsAudio = document.getElementById('versionsAudio');
const doorHookAudio = document.getElementById('doorHookAudio');
const bgMusic = document.getElementById('bgMusic');
const lobbyBellAudio = document.getElementById('lobbyBellAudio');
const footstepsAudio = document.getElementById('footstepsAudio');
const dreamDoorAudio = document.getElementById('dreamDoorAudio');
const intermissionBellAudio = document.getElementById('intermissionBellAudio');
const janaLiveAudio = document.getElementById('janaLiveAudio');
const applauseAudio = document.getElementById('applauseAudio');
const filmGateAudio = document.getElementById('filmGateAudio');
const censorStampAudio = document.getElementById('censorStampAudio');
const photoFlipAudio = document.getElementById('photoFlipAudio');
const comedyStingAudio = document.getElementById('comedyStingAudio');
const cinematicTransition = document.getElementById('cinematicTransition');
const censorScene = document.getElementById('censorScene');
const censorFileButton = document.getElementById('censorFileButton');
const archiveScene = document.getElementById('archiveScene');
const seatConfirmBubble = document.getElementById('seatConfirmBubble');
const fakeEnding = document.getElementById('fakeEnding');
const lastCurtain = document.getElementById('lastCurtain');
const finalMessage = document.getElementById('finalMessage');
const creditsScene = document.getElementById('creditsScene');
const curtainSlowAudio = document.getElementById('curtainSlowAudio');
const audienceRiseAudio = document.getElementById('audienceRiseAudio');
const projectorStopAudio = document.getElementById('projectorStopAudio');
const finalCueAudio = document.getElementById('finalCueAudio');
const finalVoiceAudio = document.getElementById('finalVoiceAudio');


const dreamDoor = document.getElementById('dreamDoor');
const dreamDoorButton = document.getElementById('dreamDoorButton');
const husseinScene = document.getElementById('husseinScene');
const intermission = document.getElementById('intermission');


const firstShot = document.getElementById('firstShot');
const summaries = document.getElementById('summaries');
const appreciation = document.getElementById('appreciation');
const learning = document.getElementById('learning');
const versions = document.getElementById('versions');

const experienceGate = document.getElementById('experienceGate');
const startExperience = document.getElementById('startExperience');
const outsideAmbience = document.getElementById('outsideAmbience');
const ticketAudio = document.getElementById('ticketAudio');
const doorAudio = document.getElementById('doorAudio');
const hallAmbience = document.getElementById('hallAmbience');
const seatAudio = document.getElementById('seatAudio');
const wrongSeatAudio = document.getElementById('wrongSeatAudio');
const correctSeatAudio = document.getElementById('correctSeatAudio');
const lightsDimAudio = document.getElementById('lightsDimAudio');


let runId = 0;

function safePlay(audio, volume=1, reset=true){
  if(!audio) return;
  try{
    if(reset) audio.currentTime=0;
    audio.volume=volume;
    const p=audio.play();
    if(p && p.catch) p.catch(()=>{});
  }catch(e){}
}
function fadeAudio(audio, target, duration=500, pauseAtEnd=false){
  if(!audio) return;
  const start=audio.volume;
  const steps=20;
  let n=0;
  clearInterval(audio._fadeTimer);
  audio._fadeTimer=setInterval(()=>{
    n++;
    audio.volume=Math.max(0,Math.min(1,start+(target-start)*(n/steps)));
    if(n>=steps){
      clearInterval(audio._fadeTimer);
      audio.volume=target;
      if(pauseAtEnd && target===0) audio.pause();
    }
  },duration/steps);
}


function showScene(target){
  const current = scenes.find(s => s.classList.contains('active'));
  if(current === target) return;

  const doSwitch=()=>{
    if(current) current.classList.remove('active','cine-enter','cine-exit','fade-in','fade-out');
    target.classList.add('active','cine-enter');
    setTimeout(()=>target.classList.remove('cine-enter'),950);
  };

  if(current){
    current.classList.add('cine-exit');
    setTimeout(doSwitch,520);
  }else{
    doSwitch();
  }
}
function cineGate(){
  if(!cinematicTransition) return;
  safePlay(filmGateAudio,.42,true);
  cinematicTransition.classList.remove('play');
  void cinematicTransition.offsetWidth;
  cinematicTransition.classList.add('play');
  setTimeout(()=>cinematicTransition.classList.remove('play'),900);
}

function tryUnlockAudio(){ }
let soundtrackStarted=false;
function startSoundtrack(){
  if(soundtrackStarted) return;
  soundtrackStarted=true;
  bgMusic.volume=.15;
  const p=bgMusic.play();
  if(p && p.catch) p.catch(()=>{soundtrackStarted=false;});
  outside.classList.add('music-started');
}
function musicTo(v,d=650){
  if(!soundtrackStarted) return;
  fadeAudio(bgMusic,v,d,false);
}


startExperience.addEventListener('click',()=>{
  startSoundtrack();
  safePlay(outsideAmbience,.10,false);
  experienceGate.classList.add('hidden');
  setTimeout(()=>experienceGate.remove(),950);
});

claimBtn.addEventListener('click',()=>{
  startSoundtrack();
  if(outsideAmbience.paused) safePlay(outsideAmbience,.12,false);
  safePlay(ticketAudio,.95,true);
  setTimeout(()=>safePlay(lobbyBellAudio,.48,true),260);
  clerkText.textContent = 'آه تمام... موجودة';
  claimBtn.style.opacity = '0';
  claimBtn.style.pointerEvents = 'none';
  setTimeout(()=>{
    ticketPop.classList.add('show');
    ticketPop.setAttribute('aria-hidden','false');
  },420);
});

enterBtn.addEventListener('click',()=>{
  safePlay(doorAudio,.90,true);
  safePlay(footstepsAudio,.62,true);
  musicTo(.13,500);
  fadeAudio(outsideAmbience,0,650,true);
  ticketPop.classList.remove('show');
  ticketPop.setAttribute('aria-hidden','true');
  outside.classList.add('entering');
  setTimeout(()=>{
    showScene(hall);
    outside.classList.remove('entering');
    safePlay(hallAmbience,.24,false);
  },720);
});

const names = [
  ['چنى FEE','هش من هنا','الكرسي ده بتاع چنى FEE مش ليكي'],
  ['چنى Rally','لأ معلش','چنى Rally سبقتك عليه'],
  ['چنى تحكم','مش ده','چنى تحكم حاجزة هنا'],
  ['چنى HERAFY','شوفي غيره','ده بتاع چنى HERAFY'],
  ['چنى NAWA','معلش محجوز','چنى NAWA لسه واخداه جديد'],
  ['چنى ملخصات','صعب للأسف','چنى ملخصات قاعدة هنا من امبارح... غالبا عندها امتحان']
];
const rowSizes = [7,8,9,10,11];
const correct = {row:0,index:3};

rowSizes.forEach((count,rowIndex)=>{
  const row=document.createElement('div'); row.className='seat-row';
  for(let i=0;i<count;i++){
    const seat=document.createElement('button');
    seat.className='seat';
    seat.setAttribute('aria-label',`كرسي ${rowIndex+1}-${i+1}`);
    if(rowIndex===correct.row && i===correct.index) seat.classList.add('correct');
    seat.addEventListener('click',()=>pickSeat(seat,rowIndex,i));
    row.appendChild(seat);
  }
  rows.appendChild(row);
});

let wrongCounter=0;
function pickSeat(seat,rowIndex,index){
  if(rowIndex===correct.row && index===correct.index){
    document.querySelectorAll('.seat').forEach(s=>s.disabled=true);
    seat.classList.add('selected');
    hall.classList.add('seat-confirmed');
    safePlay(seatAudio,.72,true);
    setTimeout(()=>safePlay(correctSeatAudio,.68,true),120);

    // Keep the cinema screen/curtain untouched. Confirmation lives beside the seat.
    setTimeout(()=>{
      hall.classList.add('dim-for-show');
      safePlay(lightsDimAudio,.48,true);
      fadeAudio(hallAmbience,.055,900,false);
    },900);

    setTimeout(()=>{
      fadeAudio(hallAmbience,0,850,true);
      const myRun=++runId;
      beginFilm(myRun);
    },3000);
    return;
  }
  safePlay(seatAudio,.58,true);
  setTimeout(()=>safePlay(wrongSeatAudio,.62,true),65);
  seat.classList.remove('wrong'); void seat.offsetWidth; seat.classList.add('wrong');
  const m=names[wrongCounter % names.length]; wrongCounter++;
  seatMessage.innerHTML=`${m[1]}<small>${m[2]}</small>`;
}

const filmCurtainL=document.getElementById('filmCurtainL');
const filmCurtainR=document.getElementById('filmCurtainR');
const phaseLeader=document.getElementById('phaseLeader');
const phaseTitle=document.getElementById('phaseTitle');
const phaseScene=document.getElementById('phaseScene');
const openDoorClip=document.getElementById('openDoorClip');
const phaseMalfunction=document.getElementById('phaseMalfunction');
const countNumber=document.getElementById('countNumber');
const screeningCaption=document.getElementById('screeningCaption');

function setPhase(el){
  [phaseLeader,phaseTitle,phaseScene,phaseMalfunction].forEach(p=>p.classList.remove('active-phase'));
  if(el) el.classList.add('active-phase');
}
function caption(html, small=false){
  screeningCaption.innerHTML=html;
  screeningCaption.className='screening-caption'+(small?' small':'')+' flash';
  setTimeout(()=>screeningCaption.classList.remove('flash'),260);
}
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

async function beginFilm(myRun){
  if(hallAmbience){ hallAmbience.pause(); hallAmbience.currentTime=0; }
  showScene(screening);
  await sleep(800); if(myRun!==runId)return;

  filmCurtainL.classList.add('open'); filmCurtainR.classList.add('open');
  safePlay(curtainSlowAudio,.48,true);
  projectorAudio.currentTime=0; projectorAudio.volume=.10; musicTo(.11,500); projectorAudio.play().catch(()=>{});

  setPhase(phaseLeader);
  countNumber.textContent='3';
  await sleep(1000); if(myRun!==runId)return;
  countNumber.textContent='2';
  await sleep(1000); if(myRun!==runId)return;
  countNumber.textContent='1';
  await sleep(1000); if(myRun!==runId)return;

  setPhase(phaseTitle);
  await sleep(3000); if(myRun!==runId)return;

  // Real ~30-second clip from Rotana Cinema's official YouTube upload.
  if(openDoorClip){
    openDoorClip.src=openDoorClip.dataset.src;
    phaseScene.classList.add('clip-live','clip-ready');
  }
  musicTo(.045,700);
  setPhase(phaseScene);
  await sleep(30000); if(myRun!==runId)return;

  // Stop the external player cleanly before the film malfunction.
  if(openDoorClip){
    phaseScene.classList.remove('clip-live','clip-ready');
    openDoorClip.src='about:blank';
  }
  musicTo(.09,350);

  // Malfunction
  setPhase(phaseMalfunction);
  breakAudio.currentTime=0; breakAudio.play().catch(()=>{});
  projectorAudio.pause();
  await sleep(850); if(myRun!==runId)return;

  filmCurtainL.classList.remove('open'); filmCurtainR.classList.remove('open');
  filmCurtainL.classList.add('closed'); filmCurtainR.classList.add('closed');
  safePlay(curtainSlowAudio,.48,true);
  setPhase(null);
  await sleep(1500); if(myRun!==runId)return;

  caption('');
  await sleep(550); if(myRun!==runId)return;

  // Voiceover behind closed curtain.
  musicTo(.04,450);
  voiceAudio.currentTime=0; voiceAudio.volume=.95; voiceAudio.play().catch(()=>{});
  await sleep(Math.max(7600, (voiceAudio.duration||7.55)*1000 + 250)); if(myRun!==runId)return;

  musicTo(.11,650);
  caption('ثانية واحدة يا چنى', true);
  await sleep(2200); if(myRun!==runId)return;
  caption('');
  await sleep(700); if(myRun!==runId)return;

  revealAudio.currentTime=0; revealAudio.play().catch(()=>{});
  projectorAudio.currentTime=0; projectorAudio.volume=.065; musicTo(.12,650); projectorAudio.play().catch(()=>{});
  showScene(reveal);
  await sleep(9800); if(myRun!==runId)return;
  beginPart3(myRun);
}


async function p3Scene(scene, audio, volume, duration, myRun){
  [firstShot,summaries,appreciation,learning,versions].forEach(s=>s && s.classList.remove('run'));
  if(projectorAudio && !projectorAudio.paused) fadeAudio(projectorAudio,.02,350,false);
  showScene(scene);
  await sleep(720); if(myRun!==runId)return false;
  scene.classList.add('run');
  if(audio) safePlay(audio,volume,true);
  await sleep(duration); if(myRun!==runId)return false;
  return true;
}

async function beginPart3(myRun){
  fadeAudio(projectorAudio,.025,500,false); musicTo(.14,650);

  if(!(await p3Scene(firstShot,firstShotAudio,.62,7800,myRun))) return;
  if(!(await p3Scene(summaries,summariesAudio,.50,8200,myRun))) return;

  // Appreciation gets the longest pause and the softest mix.
  if(!(await p3Scene(appreciation,appreciationAudio,.48,17600,myRun))) return;

  if(!(await p3Scene(learning,learningAudio,.46,11100,myRun))) return;
  if(!(await p3Scene(versions,versionsAudio,.48,12600,myRun))) return;

  safePlay(doorHookAudio,.52,true);
  fadeAudio(projectorAudio,0,700,true);
  await sleep(1300); if(myRun!==runId)return;
  beginPart4(myRun);
}

// Debug helper for visual QA. Add ?scene=firstShot/summaries/appreciation/learning/versions
(function debugScene(){
  const p=new URLSearchParams(location.search);
  const s=p.get('scene');
  if(!s) return;
  const map={firstShot,summaries,appreciation,learning,versions};
  if(map[s]){
    setTimeout(()=>{
      runId++;
      scenes.forEach(x=>x.classList.remove('active','fade-in','fade-out'));
      map[s].classList.add('active','run');
    },120);
  }
})();


let dreamDoorResolve=null;
let dreamDoorOpened=false;
dreamDoorButton.addEventListener('click',()=>{
  if(dreamDoorOpened) return;
  dreamDoorOpened=true;
  safePlay(dreamDoorAudio,.76,true);
  dreamDoorButton.classList.add('open');
  dreamDoor.classList.add('opened');
  setTimeout(()=>{
    if(dreamDoorResolve){ dreamDoorResolve(); dreamDoorResolve=null; }
  },4300);
});
function waitForDreamDoor(){return new Promise(resolve=>{dreamDoorResolve=resolve;});}

async function beginPart4(myRun){
  musicTo(.12,600);
  showScene(dreamDoor);
  await sleep(700); if(myRun!==runId)return;
  dreamDoor.classList.add('run');

  await waitForDreamDoor(); if(myRun!==runId)return;
  await sleep(1200); if(myRun!==runId)return;

  showScene(husseinScene);
  await sleep(700); if(myRun!==runId)return;
  husseinScene.classList.add('run');
  musicTo(.10,700);
  await sleep(10400); if(myRun!==runId)return;

  cineGate();
  await sleep(360); if(myRun!==runId)return;
  showScene(intermission);
  await sleep(700); if(myRun!==runId)return;
  intermission.classList.add('run');
  safePlay(intermissionBellAudio,.56,true);
  musicTo(.065,700);

  // Let the intermission card breathe, then prepare the stage before singing.
  await sleep(6500); if(myRun!==runId)return;
  intermission.classList.add('live');
  musicTo(.028,900);

  // Spotlight + mic + title appear first. Singing starts only after the stage is ready.
  await sleep(3400); if(myRun!==runId)return;
  safePlay(janaLiveAudio,.94,true);
  const liveMs=Math.max(19000,(janaLiveAudio.duration||18.9)*1000+250);
  await sleep(liveMs); if(myRun!==runId)return;

  safePlay(applauseAudio,.68,true);
  intermission.classList.add('finished');
  musicTo(.10,950);
  await sleep(7600); if(myRun!==runId)return;
  beginPart5(myRun);
}

(function debugPart4(){
  const p=new URLSearchParams(location.search);
  const s=p.get('scene');
  const map4={dreamDoor,husseinScene,intermission};
  if(map4[s]){
    setTimeout(()=>{
      runId++;
      scenes.forEach(x=>x.classList.remove('active','fade-in','fade-out'));
      map4[s].classList.add('active','run');
      if(s==='intermission') setTimeout(()=>map4[s].classList.add('live'),3400);
    },180);
  }
})();


let censorResolve=null;
let censorOpened=false;

censorFileButton.addEventListener('click',()=>{
  if(censorOpened) return;
  censorOpened=true;
  safePlay(censorStampAudio,.72,true);
  setTimeout(()=>safePlay(comedyStingAudio,.38,true),300);
  censorScene.classList.add('opened');
  setTimeout(()=>{
    if(censorResolve){censorResolve();censorResolve=null;}
  },4700);
});
function waitForCensor(){return new Promise(resolve=>{censorResolve=resolve;});}

async function beginPart5(myRun){
  cineGate();
  await sleep(360); if(myRun!==runId)return;
  showScene(censorScene);
  await sleep(700); if(myRun!==runId)return;
  censorScene.classList.add('run');
  musicTo(.105,650);

  // Jana opens the "forbidden" folder herself.
  await waitForCensor(); if(myRun!==runId)return;
  await sleep(6200); if(myRun!==runId)return;

  cineGate();
  await sleep(360); if(myRun!==runId)return;
  showScene(archiveScene);
  await sleep(650); if(myRun!==runId)return;
  archiveScene.classList.add('run');
  musicTo(.085,900);

  // A page-flip cue for each archival photo.
  [1400,2700,4000,5300].forEach(t=>setTimeout(()=>safePlay(photoFlipAudio,.35,true),t));
  await sleep(10300); if(myRun!==runId)return;
  beginPart6(myRun);
}

// Part 5 debug.
(function debugPart5(){
  const p=new URLSearchParams(location.search);
  const s=p.get('scene');
  const map5={censorScene,archiveScene};
  if(map5[s]){
    setTimeout(()=>{
      runId++;
      scenes.forEach(x=>x.classList.remove('active','fade-in','fade-out','cine-enter','cine-exit'));
      map5[s].classList.add('active','run');
      if(s==='censorScene') setTimeout(()=>map5[s].classList.add('opened'),1400);
    },160);
  }
})();


async function beginPart6(myRun){
  cineGate();
  await sleep(420); if(myRun!==runId)return;

  // Fake ending
  showScene(fakeEnding);
  await sleep(700); if(myRun!==runId)return;
  fakeEnding.classList.add('run');
  musicTo(.055,900);
  safePlay(projectorStopAudio,.42,true);

  await sleep(9200); if(myRun!==runId)return;
  safePlay(audienceRiseAudio,.34,true);
  fakeEnding.classList.add('lights-on');

  await sleep(2300); if(myRun!==runId)return;
  fakeEnding.classList.add('closing');
  safePlay(curtainSlowAudio,.55,true);

  await sleep(3900); if(myRun!==runId)return;

  // Curtains unexpectedly open again.
  showScene(lastCurtain);
  await sleep(500); if(myRun!==runId)return;
  lastCurtain.classList.add('run');
  safePlay(curtainSlowAudio,.48,true);
  musicTo(.035,700);

  await sleep(7200); if(myRun!==runId)return;

  // Real final message.
  showScene(finalMessage);
  await sleep(650); if(myRun!==runId)return;
  finalMessage.classList.add('run');
  safePlay(finalCueAudio,.34,true);
  musicTo(.028,850);

  finalVoiceAudio.currentTime=0;
  finalVoiceAudio.volume=.96;
  finalVoiceAudio.play().catch(()=>{});

  const finalVoiceMs = Math.max(69720,(finalVoiceAudio.duration||68.92)*1000+800);
  await sleep(finalVoiceMs); if(myRun!==runId)return;

  finalMessage.classList.add('birthday');
  musicTo(.10,1100);
  await sleep(6000); if(myRun!==runId)return;

  // Credits
  showScene(creditsScene);
  await sleep(700); if(myRun!==runId)return;
  creditsScene.classList.add('run');
  musicTo(.115,850);

  await sleep(33000); if(myRun!==runId)return;
  safePlay(projectorStopAudio,.34,true);
  musicTo(0,2200);
}

// Debug final scenes.
(function debugPart6(){
  const p=new URLSearchParams(location.search);
  const s=p.get('scene');
  const map6={fakeEnding,lastCurtain,finalMessage,creditsScene};
  if(map6[s]){
    setTimeout(()=>{
      runId++;
      scenes.forEach(x=>x.classList.remove('active','fade-in','fade-out','cine-enter','cine-exit'));
      map6[s].classList.add('active','run');
      if(s==='finalMessage') setTimeout(()=>map6[s].classList.add('birthday'),8000);
    },180);
  }
})();
