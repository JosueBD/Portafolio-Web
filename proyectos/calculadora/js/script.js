const display = document.getElementById('display');
let current = '';
let operator = '';
let previous = '';

function updateDisplay() {
    display.value = current || previous || '0';
}

// Función de operación
function calcular() {
    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    if (isNaN(prev) || isNaN(curr)) return;

    let result;
    switch(operator) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case '*': result = prev * curr; break;
        case '/': result = curr !== 0 ? prev / curr : 'Error'; break;
        default: return;
    }
    current = result.toString();
    operator = '';
    previous = '';
    updateDisplay();
}

// Eventos botones
document.querySelectorAll('.num').forEach(btn => {
    btn.addEventListener('click', () => {
        current += btn.textContent;
        updateDisplay();
    });
});

document.querySelectorAll('.op').forEach(btn => {
    btn.addEventListener('click', () => {
        if(current === '' && previous === '') return;
        if(previous !== '') calcular();
        operator = btn.textContent;
        previous = current;
        current = '';
        updateDisplay();
    });
});

document.getElementById('equals').addEventListener('click', calcular);

document.getElementById('clear').addEventListener('click', () => {
    current = '';
    previous = '';
    operator = '';
    updateDisplay();
});

// Escuchar teclado
document.addEventListener('keydown', (e) => {
    if(e.key >= '0' && e.key <= '9') {
        current += e.key;
        updateDisplay();
    }
    if(['+', '-', '*', '/'].includes(e.key)) {
        if(current === '' && previous === '') return;
        if(previous !== '') calcular();
        operator = e.key;
        previous = current;
        current = '';
        updateDisplay();
    }
    if(e.key === 'Enter') calcular();
    if(e.key === 'Backspace') current = current.slice(0,-1), updateDisplay();
    if(e.key.toLowerCase() === 'c') current = '', previous = '', operator = '', updateDisplay();
});
