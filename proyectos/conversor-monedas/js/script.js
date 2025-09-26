
document.getElementById('go').addEventListener('click', async () => {
  const amount = parseFloat(document.getElementById('amount').value);
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const resEl = document.getElementById('res');

  if (!amount || amount <= 0) {
    resEl.textContent = "Introduce una cantidad válida";
    return;
  }

  try {
    const url = `https://api.apilayer.com/exchangerates_data/convert?from=${from}&to=${to}&amount=${amount}`;

    const r = await fetch(url, {
      headers: { "apikey": "54f65d3326de62d3ae0aabf5" }  // <-- pon tu API Key aquí
    });

    const data = await r.json();

    if (data.result) {
      resEl.textContent = `Resultado: ${data.result.toFixed(2)} ${to}`;
    } else {
      resEl.textContent = "Error al obtener tasas";
    }
  } catch (e) {
    resEl.textContent = "Error de conexión";
  }
});
