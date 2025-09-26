let count = 0;
const display = document.getElementById('contador');
document.getElementById('sum').onclick = () => { display.textContent = ++count; };
document.getElementById('sub').onclick = () => { display.textContent = --count; };
document.getElementById('reset').onclick = () => { count = 0; display.textContent = count; };
