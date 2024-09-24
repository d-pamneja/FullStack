// A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. 
// Promises are used to handle asynchronous operations more effectively than traditional callback functions, providing a cleaner and more manageable way to deal with code that executes asynchronously, such as API calls, file I/O, or timers.

function setTimeoutPromisified(ms) { // Assume this is a global function which returns an object of the promise class
    return new Promise(resolve => setTimeout(resolve, ms));
}

function callback() {
    console.log("3 seconds have passed");
}

setTimeoutPromisified(3000).then(callback) // This is a way of using promises instead of callbacks. They are sytactically cleaner