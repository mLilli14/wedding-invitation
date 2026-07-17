window.addEventListener("load",()=>{
  const loader=document.getElementById("loader");
  const main=document.getElementById("mainContent");
  setTimeout(()=>{
    loader.classList.add("hide");
    main.classList.remove("is-loading");
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
  startMusic();
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

document.getElementById('showMap').onclick=()=>show('mapScene');
document.getElementById('showFinal').onclick=()=>show('finalScene');

function updateCountdown(){
  const wedding=new Date('2026-09-27T17:00:00+03:00');
  const now=new Date();
  const diff=wedding-now;
  const daysEl=document.getElementById('daysLeft');
  const label=document.getElementById('countdownLabel');
  if(diff<=0){
    daysEl.textContent='Σήμερα';
    label.textContent='είναι η μεγάλη μας μέρα!';
    return;
  }
  const days=Math.ceil(diff/86400000);
  daysEl.textContent=days.toLocaleString('el-GR');
  label.textContent=days===1?'ημέρα μέχρι τη μεγάλη μας μέρα':'ημέρες μέχρι τη μεγάλη μας μέρα';
}
updateCountdown();

function restartInvitation(){
  envelope.classList.remove('open');
  bow.classList.remove('release');
  document.getElementById('untieBow').disabled=false;
  flipLeaf.classList.remove('flipped','turning');
  flipLeaf.removeAttribute('style');
  turnBtn.classList.remove('hidden');
  closeBtn.classList.add('hidden');
  music.pause();
  music.currentTime=0;
  musicToggle.classList.add('hidden');
  musicToggle.classList.remove('paused');
  show('intro');
}

document.getElementById('restart').onclick=restartInvitation;
