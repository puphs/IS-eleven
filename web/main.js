var arrayInput = document.getElementById("array");
var array = [];

document.getElementById("sort-array").addEventListener("click", sortArray);
document.getElementById("reverse-sort-array").addEventListener("click", reverseSortArray);
document.getElementById("print-every-even-first").addEventListener("click", printEveryEvenElement);
document.getElementById("print-first-last-elements").addEventListener("click", printFirstLastElements);
document.getElementById("print-mod").addEventListener("click", printModElements);

function getArray() {
    var strArray = arrayInput.value.trim();
    if (strArray) {
        array = strArray.split(" ");
        for (var i = 0; i < array.lenght; i++) {
            array[i] = parseFloat(array[i]);
        }
        return array;
    }
    return [];
}

function printArray(array) {
    arrayInput.value = array.join(' ');
}

function sortArray() {
    getArray();
    array.sort(function (a, b) {
        return a - b;
    });
    printArray(array);
}

function reverseSortArray() {
    getArray();
    array.sort(function (a, b) {
        return b - a;
    });
    printArray(array);
}

function printEveryEvenElement() {
    var array = getArray();
    var newArray = [];

    for (var i = 0; i < array.length; i++) {
        if (i % 2 == 0)
            newArray.push(array[i]);
    }
    printArray(newArray);
}

function printFirstLastElements() {
    var array = getArray();
    var newArray = [];

    for (var i = 0; i < array.length / 2; i++) {
        newArray.push(array[i]);
        newArray.push(array[array.length - i - 1]);
    }
    printArray(newArray);
}

function printModElements() {
    var mod = document.getElementById("mod").value - 0;
    var array = getArray();
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i] % mod == 0)
            newArray.push(array[i]);
    }
    printArray(newArray);
}