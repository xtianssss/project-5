let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitForSecondOperand = false;

const display = document.querySelector('.display');

function updateDisplay() {
    display.textContent = displayValue;
}

updateDisplay();

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        const number = button.textContent;
        if (waitForSecondOperand === true) {
            displayValue = number;
            waitForSecondOperand = false;
        } else {
            displayValue === '0' ? displayValue = number : displayValue += number;
        }
        updateDisplay();
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        const operatorClicked = button.textContent;
        if (operator && waitForSecondOperand) {
            operator = operatorClicked;
            return;
        }
        if (firstOperand === null) {
            firstOperand = parseFloat(displayValue);
        } else if (operator) {
            const result = operate(operator, firstOperand, parseFloat(displayValue));
            displayValue = String(result);
            firstOperand = result;
        }
        operator = operatorClicked;
        waitForSecondOperand = true;
        updateDisplay();
    });
});

document.querySelector('.equals').addEventListener('click', () => {
    if (operator && !waitForSecondOperand) {
        const result = operate(operator, firstOperand, parseFloat(displayValue));
        displayValue = String(result);
        firstOperand = null;
        operator = null;
        waitForSecondOperand = true;
        updateDisplay();
    }
});

document.querySelector('.clear').addEventListener('click', () => {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitForSecondOperand = false;
    updateDisplay();
});

document.querySelector('.backspace').addEventListener('click', () => {
    displayValue = displayValue.slice(0, -1);
    if (displayValue === '') {
        displayValue = '0';
    }
    updateDisplay();
});

document.querySelector('.decimal').addEventListener('click', () => {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
});

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Error';
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            return 'Error';
    }
}
