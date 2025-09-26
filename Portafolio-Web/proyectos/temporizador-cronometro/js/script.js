document.addEventListener('DOMContentLoaded',()=>{
  // crono
  let segs=0, cronoInt=null;
  const cronoEl=document.getElementById('crono');
  function updCrono(){ const h=Math.floor(segs/3600), m=Math.floor(segs/60)%60, s=segs%60; cronoEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; }
  document.getElementById('startC').onclick = ()=>{ if(cronoInt) return; cronoInt=setInterval(()=>{segs++;updCrono();},1000); };
  document.getElementById('pauseC').onclick = ()=>{ clearInterval(cronoInt); cronoInt=null; };
  document.getElementById('resetC').onclick = ()=>{ clearInterval(cronoInt); cronoInt=null; segs=0; updCrono(); };

  // temporizador
  let tempo=0, tempoInt=null;
  const tempoEl=document.getElementById('tempo');
  function updTempo(){ tempoEl.textContent = `${String(Math.floor(tempo/60)).padStart(2,'0')}:${String(tempo%60).padStart(2,'0')}`; }
  document.getElementById('startT').onclick = ()=>{
    if(tempoInt) return;
    const min = parseInt(document.getElementById('min').value)||0;
    const sec = parseInt(document.getElementById('sec').value)||0;
    if(tempo===0) tempo = min*60 + sec;
    if(tempo<=0) return;
    tempoInt = setInterval(()=>{
      tempo--; updTempo();
      if(tempo<=0){ clearInterval(tempoInt); tempoInt=null; alert('¡Tiempo terminado!'); }
    },1000);
  };
  document.getElementById('pauseT').onclick = ()=>{ clearInterval(tempoInt); tempoInt=null; };
  document.getElementById('resetT').onclick = ()=>{ clearInterval(tempoInt); tempoInt=null; tempo=0; updTempo(); };
  updCrono(); updTempo();
});
