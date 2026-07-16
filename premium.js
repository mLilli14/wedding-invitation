const scenes=[...document.querySelectorAll(".scene")];
const show=id=>{scenes.forEach(s=>s.classList.toggle("active",s.id===id));window.scrollTo(0,0)};
const envelope=document.getElementById("envelope");
const bow=document.getElementById("bow");
const pageCard=document.getElementById("pageCard");
const turnBtn=document.getElementById("turnPage");
const closeBtn=document.getElementById("closeBook");

document.getElementById("openEnvelope").onclick=()=>{
  envelope.classList.add("open");
  setTimeout(()=>show("coverScene"),1300);
};

document.getElementById("untieBow").onclick=()=>{
  bow.classList.add("untie");
  document.getElementById("untieBow").disabled=true;
  setTimeout(()=>show("pageScene"),1050);
};

turnBtn.onclick=()=>{
  pageCard.classList.add("turning");
  requestAnimationFrame(()=>pageCard.classList.add("flipped"));
  setTimeout(()=>{
    pageCard.classList.remove("turning");
    turnBtn.classList.add("hidden");
    closeBtn.classList.remove("hidden");
  },1100);
};

closeBtn.onclick=()=>{
  pageCard.style.transition="transform .75s ease,opacity .55s ease";
  pageCard.style.transform="rotateY(-88deg) scale(.96)";
  pageCard.style.opacity="0";
  setTimeout(()=>show("backScene"),700);
};

document.getElementById("showMap").onclick=()=>show("mapScene");

document.getElementById("restart").onclick=()=>{
  envelope.classList.remove("open");
  bow.classList.remove("untie");
  document.getElementById("untieBow").disabled=false;
  pageCard.classList.remove("flipped","turning");
  pageCard.removeAttribute("style");
  turnBtn.classList.remove("hidden");
  closeBtn.classList.add("hidden");
  show("intro");
};