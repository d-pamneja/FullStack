const fs = require('fs'); // Importing File System Library to read other files in present JS file

function print(err, contents) {
    console.log(contents);
};

fs.readFile('./JavaScript/Basics/Asynchronus/a.txt', 'utf-8', print);
// Here, we are reading the file asynchronusly. This means that the code will not wait for the file to be read and will continue executing the next lines.
// When the file is read, the print function will be called with the contents of the file as an argument.
// Basically, the "print" function is a Callback function that is called when the file is read.
// Just as how when the washing machine is done, it beeps to let you know that the clothes are washed. So in a way, it calls us back.
// Similarly, when the file is read, the print function is called back with the contents of the file.

// We have a lot of performance benefits with Asynchronus code. We can do multiple tasks at the same time, and we don't have to wait for one task to finish to start another.
// So direclty, we can say that Asynchronus code is faster than Synchronus code as it saves up a lot of time.

// For example : 

fs.readFile('./JavaScript/Basics/Asynchronus/a.txt', 'utf-8', print);
fs.readFile('./JavaScript/Basics/Asynchronus/a.txt', 'utf-8', print);

function caller() {
    console.log("Timeout Callback Called!");
}

setTimeout(caller, 5000);
console.log("Done!");

// In the above code, the two files are read at the same time. The print function is called when the file is read. So, the "Done!" is printed before the contents of the file are printed.
// This is the power of Asynchronus code. We can do multiple tasks at the same time.


// Note that even in the case of an async function with less time and a CPU intensive task, the priority is given to the CPU Task.
// For example, in the below code, the CPU Task is given priority over the async function.

fs.readFile('./JavaScript/Basics/Asynchronus/a.txt', 'utf-8', print);
// fs.readFile('./JavaScript/Basics/Asynchronus/a.txt', 'utf-8', print);

function caller() {
    console.log("Timeout Callback Called!");
}

setTimeout(caller, 1000);
console.log("Done!");

let c = 0;
for (let i = 0; i < 1000000000; i++) {
    c += i;
}
console.log(c);

// We can see that the CPU Task is given priority over the async function. The async function is called after the CPU Task is completed.
// This is because the CPU Task is a synchronous task and is given priority over the async function. The async function is called after the CPU Task is completed.
// Primary reason is that the thread has delegated the async function to the event loop and is waiting for the CPU Task to complete, hence 
// the async function is called after the CPU Task is completed.