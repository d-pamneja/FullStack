// **I/O heavy operations**
// I/O (Input/Output) heavy operations refer to tasks in a computer program that involve a lot of data transfer between the program and external systems or devices. These operations usually require waiting for data to be read from or written to sources like disks, networks, databases, or other external devices, which can be time-consuming compared to in-memory computations.

// Examples of I/O Heavy Operations:
// 1. Reading a file
// 2. Starting a clock
// 3. HTTP Requests

// **I/O bound tasks vs CPU bound tasks**

// CPU bound tasks
// CPU-bound tasks are operations that are limited by the speed and power of the CPU. These tasks require significant computation and processing power, meaning that the performance bottleneck is the CPU itself.
// A real world example of a CPU intensive task is running for 3 miles. Your legs/brain have to constantly be engaged for 3 miles while you run.

// I/O bound tasks
// I/O-bound tasks are operations that are limited by the system’s input/output capabilities, such as disk I/O, network I/O, or any other form of data transfer. These tasks spend most of their time waiting for I/O operations to complete.
// A real world example of an I/O bound task would be Boiling water. I don’t have to do much, I just have to put the water on the kettle, and my brain can be occupied elsewhere.


const fs = require('fs'); // Importing File System Library to read other files in present JS file

// Both of these are synchronus functions
// 1. Reading a file
const contents = fs.readFileSync('./JavaScript/Basics/IO_Heavy_Tasks/a.txt', 'utf8');
console.log(contents);

// 2. Writing in a file
fs.writeFileSync('./JavaScript/Basics/IO_Heavy_Tasks/a.txt', contents + " Written from JS File.", 'utf8')
const newContents = fs.readFileSync('./JavaScript/Basics/IO_Heavy_Tasks/a.txt', 'utf8');
console.log(newContents);