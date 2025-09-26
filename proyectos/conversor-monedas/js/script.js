document.getElementById('go').addEventListener('click', async ()=>{
  const amount = parseFloat(document.getElementById('amount').value);
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const resEl = document.getElementById('res');
  if (!amount || amount<=0){ resEl.textContent = 'Introduce cantidad válida'; return; }
  if (from === to){ resEl.textContent = `Resultado: ${amount} ${to}`; return; }
  try {
    const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
    const r = await fetch(url);
    const data = await r.json();
    if (data && typeof data.result === 'number') {
      resEl.textContent = `Resultado: ${data.result.toFixed(2)} ${to}`;
    } else resEl.textContent = 'Error al obtener tasas';
  } catch {
    resEl.textContent = 'Error de conexión';
  }
});
