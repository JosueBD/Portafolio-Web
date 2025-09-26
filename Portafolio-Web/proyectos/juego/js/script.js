(() => {
  const resEl = document.getElementById('result'), scoreEl = document.getElementById('score');
  let sJ=0,sPC=0;
  const moves = ['piedra','papel','tijera'];
  document.querySelector('.btns').addEventListener('click', e => {
    const btn = e.target.closest('button'); if(!btn) return;
    const me = btn.dataset.move; const pc = moves[Math.floor(Math.random()*3)];
    let outcome;
    if (me === pc) outcome='Empate';
    else if ((me==='piedra'&&pc==='tijera')||(me==='papel'&&pc==='piedra')||(me==='tijera'&&pc==='papel')) { outcome='Ganaste'; sJ++; }
    else { outcome='Perdiste'; sPC++; }
    resEl.textContent = `Tú: ${me} | PC: ${pc} → ${outcome}`;
    scoreEl.textContent = `Jugador: ${sJ} | PC: ${sPC}`;
  });
})();
