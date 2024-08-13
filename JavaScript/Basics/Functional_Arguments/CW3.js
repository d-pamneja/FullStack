// Functional Arguments
// As we can see in the examples above, functions can be passed as arguments to other functions.
// We define 4 functions: sum, multiply, subtract, and divide. Then we define a function doOperation that takes 3 arguments: a, b, and op.
// The function doOperation calls the function op with arguments a and b and returns the result. Basically, doOperation is a higher-order function that takes another function as an argument.

function sum(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    return a / b;
}

function doOperation(a, b, op) {
    return op(a, b)
}

console.log(doOperation(8, 12, divide))