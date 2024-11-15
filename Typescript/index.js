"use strict";
// let x = 1  // Here, type inferencing is happening i.e. the system automatically assumed x will be a number
// let y : number = 2 // Here, we can explicitly tell the type of a variable in typescript
// console.log(x+y)
// 1. Type defining a parameter in a function
const userName = (firstName) => {
    console.log(`Hello ${firstName}`);
};
userName("DP");
const sum = (a, b) => {
    return a + b;
};
const ans = sum(1, 2);
console.log(ans);
