(() => {
  const display = document.getElementById('display');
  const keys = document.querySelector('.keys');

  function evalSafe(expr) {
    // solo permitir números, operadores y punto
    if(!/^[0-9+\-*/.%() ]+$/.test(expr)) return 'Error';
    try { return Function('"use strict";return ('+expr+')')(); }
    catch { return 'Error'; }
  }

  keys.addEventListener('click', e => {
    const btn = e.target;
    if (!btn.matches('button')) return;
    const val = btn.textContent;
    const action = btn.dataset.action;

    if (action === 'clear') { display.value = ''; return; }
    if (action === 'back') { display.value = display.value.slice(0,-1); return; }
    if (action === 'percent') { display.value = (parseFloat(display.value)||0)/100; return; }
    if (action === 'sqrt') { display.value = Math.sqrt(parseFloat(display.value)||0); return; }
    if (action === '=') {
      const res = evalSafe(display.value.replace('×','*').replace('÷','/').replace('−','-'));
      display.value = (res === 'Error') ? 'Error' : String(res);
      return;
    }
    // operadores con data-action or number
    if (action) {
      display.value += action;
      return;
    }
    // number or dot
    display.value += val;
  });
})();
