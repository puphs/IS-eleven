const OPERATION_ADD = 0;
const OPERATION_SUB = 1;
const OPERATION_MUL = 2;
const OPERATION_DIV = 3;
const OPERATION_NONE = 4;

let resultInput = document.getElementById("result")
let numberButtons = document.getElementsByClassName("number");
let operandButtons = document.getElementsByClassName("operand");


let currentOperation = OPERATION_NONE;


printNumber(number1);

for (let i = 0; i < numberButtons.length; i++) {
    let btn = numberButtons[i];
    btn.addEventListener("click", function () {
        var n = parseInt(btn.innerHTML)
        n = getProcessedNumber(n);
        printNumber(n);
    });
}

for (let i = 0; i < operandButtons.length; i++) {
    let btn = operandButtons[i];
    btn.addEventListener("click", function () {
        processOperandString(btn.innerHTML)
    });
}

function getProcessedNumber(n) {
    if (currentOperation == OPERATION_NONE) {
        number1 = number1 * 10 + n;
        return number1;
    } else {
        number2 = number2 * 10 + n;
        return number2;
    }
}

function processOperandString(str) {
    console.log(str);
    switch (str) {
        case "+":
            currentOperation = OPERATION_ADD;
            break;
        case "-":
            currentOperation = OPERATION_SUB;
            break;
        case "*":
            currentOperation = OPERATION_MUL;
            break;
        case "/":
            currentOperation = OPERATION_DIV
            break;
        case "=":
            printNumber(calculateResult());
            break;
    }
}

function calculateResult() {
    let result = number1;
    switch (currentOperation) {
        case OPERATION_ADD:
            result += number2;
            break;
        case OPERATION_SUB:
            result -= number2;
            break;
        case OPERATION_MUL:
            result *= number2;
            break;
        case OPERATION_DIV:
            result /= number2;
            break;
        case OPERATION_NONE:
            break;
    }
    number1 = result;
    number2 = 0;
    currentOperation = OPERATION_NONE;
    return result;
}

function printNumber(n) {
    resultInput.value = n;
}