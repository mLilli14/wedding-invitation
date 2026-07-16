
window.addEventListener("load",()=>{
  const loader=document.getElementById("loader");
  const main=document.getElementById("mainContent");
  setTimeout(()=>{
    loader.classList.add("hide");
    main.classList.remove("is-loading");
  },1400);
});

const scenes=[...document.querySelectorAll('.scene')];
const show=id=>{scenes.forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo(0,0)};
const envelope=document.getElementById('envelope');
const bow=document.getElementById('bow');
const flipLeaf=document.getElementById('flipLeaf');
const turnBtn=document.getElementById('turnPage');
const closeBtn=document.getElementById('closeBook');

document.getElementById('openEnvelope').onclick=()=>{
  envelope.classList.add('open');
  setTimeout(()=>show('coverScene'),1250);
};

document.getElementById('untieBow').onclick=()=>{
  bow.classList.add('release');
  document.getElementById('untieBow').disabled=true;
  setTimeout(()=>show('pageScene'),950);
};

turnBtn.onclick=()=>{
  flipLeaf.classList.add('turning','flipped');
  setTimeout(()=>{
    flipLeaf.classList.remove('turning');
    turnBtn.classList.add('hidden');
    closeBtn.classList.remove('hidden');
  },1080);
};

closeBtn.onclick=()=>{
  flipLeaf.style.transition='transform .75s ease,opacity .55s ease';
  flipLeaf.style.transform='rotateY(-88deg) scale(.96)';
  flipLeaf.style.opacity='0';
  setTimeout(()=>show('backScene'),700);
};

document.getElementById('showMap').onclick=()=>show('mapScene');

document.getElementById('restart').onclick=()=>{
  envelope.classList.remove('open');
  bow.classList.remove('release');
  document.getElementById('untieBow').disabled=false;
  flipLeaf.classList.remove('flipped','turning');
  flipLeaf.removeAttribute('style');
  turnBtn.classList.remove('hidden');
  closeBtn.classList.add('hidden');
  show('intro');
};