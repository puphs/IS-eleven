const OPERATION_NONE = 0;
const OPERATION_ADD = 1;
const OPERATION_SUB = 2;
const OPERATION_MUL = 3;
const OPERATION_DIV = 4;
const OPERATION_SIN = 5;
const OPERATION_COS = 6;
const OPERATION_SQUARE_ROOT = 7;
const OPERATION_SQUARE_ROOT_OF_N = 8;
const OPERATION_MODULE = 9;

let resultInput = document.getElementById("result")
let numberButtons = document.getElementsByClassName("number");
let operandButtons = document.getElementsByClassName("operand");

let strNumber1 = "0",
    strNumber2 = "0";
let number1 = 0,
    number2 = 0;
let currentOperation = OPERATION_NONE;
let currentOperandStr = "";

printToResult(number1);

for (let i = 0; i < numberButtons.length; i++) {
    let btn = numberButtons[i];
    btn.addEventListener("click", function () {
        parseNumbers(btn.innerHTML);
        printToResult(createMathExpression());
    });
}

for (let i = 0; i < operandButtons.length; i++) {
    let btn = operandButtons[i];
    btn.addEventListener("click", function () {
        processOperandString(btn.innerHTML)
    });
}

function parseNumbers(str) {
    if (currentOperation == OPERATION_NONE) {
        strNumber1 += str;
        number1 = parseFloat(strNumber1);
    } else {
        strNumber2 += str;
        number2 = parseFloat(strNumber2);
    }
}

function processOperandString(str) {
    currentOperandStr = str;
    switch (currentOperandStr) {
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
            printToResult(calculateResult());
            return;

        case "sin":
            currentOperation = OPERATION_SIN;
            printToResult(calculateResult());
            return;
        case "cos":
            currentOperation = OPERATION_COS;
            printToResult(calculateResult());
            return;

        case "√":
            currentOperation = OPERATION_SQUARE_ROOT;
            printToResult(calculateResult());
            return;
        case "n√":
            currentOperation = OPERATION_SQUARE_ROOT_OF_N;
            break;

        case "||":
            currentOperation = OPERATION_MODULE;
            printToResult(calculateResult());
            return;

        case "C":
            strNumber1 = "0";
            strNumber2 = "0";
            number1 = 0;
            number2 = 0;
            currentOperation = OPERATION_NONE;
            currentOperandStr = "";
            printToResult(0);
            return;
    }
    printToResult(createMathExpression());
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
            if (number2 == 0)
                result = 0;
            else
                result /= number2;
            break;
        case OPERATION_SIN:
            result = Math.sin(result);
            break;
        case OPERATION_COS:
            result = Math.cos(result);
            break;
        case OPERATION_SQUARE_ROOT:
            result = Math.sqrt(result);
            break;
        case OPERATION_SQUARE_ROOT_OF_N:
            result = Math.pow(result, 1 / number2);
            break;
        
        case OPERATION_MODULE:
            result = Math.abs(result);
        break;
    }
    strNumber1 = result.toString();
    strNumber2 = "0";
    number1 = result;
    number2 = 0;
    currentOperation = OPERATION_NONE;
    return result;
}

function createMathExpression() {

    switch (currentOperation) {
        case OPERATION_NONE:
            return number1;

        case OPERATION_SQUARE_ROOT_OF_N:
            return number2.toString() + "√" + number1.toString();
        
        default:
            return number1.toString() + currentOperandStr + number2.toString();
    }
}

function printToResult(n) {
    resultInput.value = n;
}