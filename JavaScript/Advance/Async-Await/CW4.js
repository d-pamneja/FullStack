// Callback Hell
// When we have to do one async call after another async call, we tend to run into callback hell.

setTimeout(function() {
    console.log("hi");
    setTimeout(function() {
        console.log("hello");
        setTimeout(function() {
            console.log("hello there");
        }, 5000);
    }, 3000);
}, 1000);

// Alt solution (does'nt really have callback hell)
function step3Done() {
    console.log("hello there");
}

function step2Done() {
    console.log("hello");
    setTimeout(step3Done, 5000);
}

function step1Done() {
    console.log("hi");
    setTimeout(step2Done, 3000);
}

setTimeout(step1Done, 1000);


// Alt solution using Promises (does'nt really have callback hell)
function setTimeoutPromisified(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

setTimeoutPromisified(1000).then(function() {
    console.log("hi");
    return setTimeoutPromisified(3000);
}).then(function() {
    console.log("hello");
    return setTimeoutPromisified(5000);
}).then(function() {
    console.log("hello there");
});

// Async await syntax
// The async and await syntax in JavaScript provides a way to write asynchronous code that looks and behaves like synchronous code, making it easier to read and maintain.
// It builds on top of Promises and allows you to avoid chaining .then() and .catch() methods while still working with asynchronous operations.
// async/await is essentially syntactic sugar on top of Promises. 
function setTimeoutPromisified(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// This is the best version to write code making it almost synchronus using promises
async function solve() {
    await setTimeoutPromisified(1000);
    console.log("hi");
    await setTimeoutPromisified(3000);
    console.log("hello");
    await setTimeoutPromisified(5000);
    console.log("hi there");
}

solve();