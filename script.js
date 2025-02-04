// Initialize calculator mode
let currentMode = 'rad';

// Main calculator functions
function addLog(msg) {
    const ul = document.getElementById('log');
    const li = document.createElement('li');
    li.textContent = msg;
    ul.appendChild(li);
    ul.scrollTop = ul.scrollHeight;
}

function clearInput() {
    document.getElementById('expression').value = '';
}

function backspace() {
    const expression = document.getElementById('expression').value;
    document.getElementById('expression').value = expression.slice(0, -1);
}

function inputNumber(value) {
    document.getElementById('expression').value += value;
}

function inputOperator(operator) {
    document.getElementById('expression').value += operator;
}

function inputDecimal(dot) {
    const expression = document.getElementById('expression');
    const parts = expression.value.split(/[\+\-\*\/]/);
    const lastNumber = parts[parts.length - 1];
    
    if (!lastNumber.includes('.')) {
        expression.value += dot;
    }
}
function inputFunction(func) {
    const expression = document.getElementById('expression');
    if (['sin', 'cos', 'tan'].includes(func)) {
        if (currentMode === 'deg') {
            expression.value += `${func}(`;
        } else {
            expression.value += `${func}(`;
        }
    } else {
        expression.value += `${func}(`;
    }
}

function mathCalculate() {
    const expression = document.getElementById('expression');
    try {
        let result = expression.value;
        
        // Convert degrees to radians for trig functions if in degree mode
        if (currentMode === 'deg') {
            ['sin', 'cos', 'tan'].forEach(func => {
                result = result.replace(new RegExp(`${func}\\((.*?)\\)`, 'g'), (match, p1) => {
                    return `${func}((${p1}) * pi/180)`;
                });
            });
        }
        
        // Evaluate the expression
        const answer = math.evaluate(result);
        
        // Format the result
        if (Number.isInteger(answer)) {
            expression.value = answer;
        } else {
            expression.value = Number(answer.toFixed(8));
        }
        
        // Add to calculation log
        addLog(`${result} = ${expression.value}`);
    } catch (e) {
        addLog('Error: Invalid Expression');
        expression.value = 'Error';
        setTimeout(() => expression.value = '', 1500);
    }
}


function setMode(mode) {
    currentMode = mode;
    // Update UI to show active mode
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="setMode('${mode}')"]`).classList.add('active');
}

function degToRad(value) {
    return value * (Math.PI / 180);
}


function clearLog() {
    document.getElementById('log').innerHTML = '';
}

// Event listeners for keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Number keys
    if (/[0-9]/.test(key)) {
        inputNumber(key);
    }
    // Operators
    else if (['+', '-', '*', '/', '(', ')', '.'].includes(key)) {
        inputOperator(key);
    }
    // Enter key for calculation
    else if (key === 'Enter') {
        mathCalculate();
    }
    // Backspace
    else if (key === 'Backspace') {
        backspace();
    }
    // Escape key to clear
    else if (key === 'Escape') {
        clearInput();
    }
    
    event.preventDefault();
});

// Initialize calculator
document.addEventListener('DOMContentLoaded', () => {
    setMode('rad'); // Set default mode to radians
});
