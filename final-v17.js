window.addEventListener("load",()=>{
  const loader=document.getElementById("loader");
  const main=document.getElementById("mainContent");
  // Προσπάθεια αναπαραγωγής από την πρώτη εμφάνιση του φακέλου.
  // Σε browsers που μπλοκάρουν autoplay, ξεκινά με το πρώτο άγγιγμα/κλικ.
  setTimeout(()=>{
    loader.classList.add("hide");
    main.classList.remove("is-loading");
    startMusic();
  },1400);
});

const scenes=[...document.querySelectorAll('.scene')];
const show=id=>{scenes.forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo({top:0,behavior:'smooth'})};
const envelope=document.getElementById('envelope');
const bow=document.getElementById('bow');
const flipLeaf=document.getElementById('flipLeaf');
const turnBtn=document.getElementById('turnPage');
const closeBtn=document.getElementById('closeBook');
const music=document.getElementById('weddingMusic');
const musicToggle=document.getElementById('musicToggle');
const glow=document.getElementById('openingGlow');

music.volume=.22;

function startMusic(){
  music.play().then(()=>{
    musicToggle.classList.remove('hidden','paused');
    musicToggle.setAttribute('aria-label','Παύση μουσικής');
  }).catch(()=>{
    musicToggle.classList.remove('hidden');
    musicToggle.classList.add('paused');
  });
}

function unlockMusic(){
  if(music.paused) startMusic();
}
['pointerdown','touchstart','keydown'].forEach(type=>{
  document.addEventListener(type,unlockMusic,{once:true,passive:true});
});

musicToggle.onclick=()=>{
  if(music.paused){
    music.play();
    musicToggle.classList.remove('paused');
    musicToggle.setAttribute('aria-label','Παύση μουσικής');
  }else{
    music.pause();
    musicToggle.classList.add('paused');
    musicToggle.setAttribute('aria-label','Αναπαραγωγή μουσικής');
  }
};

document.getElementById('openEnvelope').onclick=()=>{
  envelope.classList.add('open');
  setTimeout(()=>show('coverScene'),1480);
};

document.getElementById('untieBow').onclick=()=>{
  bow.classList.add('release');
  document.getElementById('untieBow').disabled=true;
  glow.classList.remove('play');
  void glow.offsetWidth;
  glow.classList.add('play');
  if(navigator.vibrate) navigator.vibrate(35);
  setTimeout(()=>show('pageScene'),1120);
};

turnBtn.onclick=()=>{
  flipLeaf.classList.add('turning','flipped');
  setTimeout(()=>{
    flipLeaf.classList.remove('turning');
    turnBtn.classList.add('hidden');
    closeBtn.classList.remove('hidden');
  },1310);
};

closeBtn.onclick=()=>{
  flipLeaf.style.transition='transform .95s ease,opacity .7s ease';
  flipLeaf.style.transform='rotateY(-88deg) scale(.96)';
  flipLeaf.style.opacity='0';
  setTimeout(()=>show('backScene'),900);
};

document.getElementById('showFinal').onclick=()=>show('finalScene');
document.getElementById('showMap').onclick=()=>show('mapScene');

function updateCountdown(){
  const wedding=new Date('2026-09-27T17:00:00+03:00');
  const diff=wedding.getTime()-Date.now();
  const ids={days:document.getElementById('daysLeft'),hours:document.getElementById('hoursLeft'),minutes:document.getElementById('minutesLeft'),seconds:document.getElementById('secondsLeft')};
  if(diff<=0){
    ids.days.textContent='0'; ids.hours.textContent='0'; ids.minutes.textContent='0'; ids.seconds.textContent='0';
    const title=document.querySelector('.countdown-title');
    if(title) title.textContent='Σήμερα είναι η μεγάλη μας μέρα!';
    return;
  }
  const totalSeconds=Math.floor(diff/1000);
  ids.days.textContent=Math.floor(totalSeconds/86400).toLocaleString('el-GR');
  ids.hours.textContent=String(Math.floor((totalSeconds%86400)/3600)).padStart(2,'0');
  ids.minutes.textContent=String(Math.floor((totalSeconds%3600)/60)).padStart(2,'0');
  ids.seconds.textContent=String(totalSeconds%60).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown,1000);

function restartInvitation(){
  envelope.classList.remove('open');
  bow.classList.remove('release');
  document.getElementById('untieBow').disabled=false;
  flipLeaf.classList.remove('flipped','turning');
  flipLeaf.removeAttribute('style');
  turnBtn.classList.remove('hidden');
  closeBtn.classList.add('hidden');
  music.currentTime=0;
  startMusic();
  musicToggle.classList.remove('paused');
  show('intro');
}

document.getElementById('restart').onclick=restartInvitation;
