
const calculator = document.getElementById('calculator');


calculator.style.setProperty('--x', '50%');
calculator.style.setProperty('--y', '50%');
calculator.style.setProperty('--hue', '280'); 

document.addEventListener('mousemove', (e) => {
    const rect = calculator.getBoundingClientRect();
    
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    
    const width = rect.width;
    const hue = (x / width) * 360; 
    
   
    calculator.style.setProperty('--x', x + 'px');
    calculator.style.setProperty('--y', y + 'px');
    calculator.style.setProperty('--hue', hue);
});


let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

const currentOperandTextElement = document.getElementById('currentOperand');
const previousOperandTextElement = document.getElementById('previousOperand');

function updateDisplay() {
    currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
    if (operation != null) {
        previousOperandTextElement.innerText = `${getDisplayNumber(previousOperand)} ${operation}`;
    } else {
        previousOperandTextElement.innerText = '';
    }
}

function getDisplayNumber(number) {
    if (number === 'Error') return number;
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    
    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
    } else {
        return integerDisplay;
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '×': computation = prev * current; break;
        case '÷': 
            if (current === 0) {
                currentOperand = 'Error';
                operation = undefined;
                previousOperand = '';
                updateDisplay();
                return;
            }
            computation = prev / current; break;
        case '%': computation = prev % current; break;
        default: return;
    }
    
    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') currentOperand = '0';
    updateDisplay();
}

updateDisplay();