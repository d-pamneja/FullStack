const fs = require('fs'); // Importing File System Library to read other files in present JS file

// Both of these are Asynchronus functions
// 1. Reading the file asynchronusly
// fs.readFile('./JavaScript/Basics/Asynchronus/a.txt', 'utf-8', function(err, contents) {
//     console.log(contents);
// });


// // 2. Writing the file asynchronusly
fs.writeFile('./JavaScript/Basics/Asynchronus/a.txt', "Final Writing Async in a.txt.", 'utf-8', function(err, contents) {});
fs.readFile('./JavaScript/Basics/Asynchronus/a.txt', 'utf-8', function(err, contents) {
    console.log(contents);
});


// fs.writeFile('./JavaScript/Basics/Asynchronus/a.txt', contentsAsync + " Written from JS File Async.", 'utf8')
// const newContentsAsync = fs.readFile('./JavaScript/Basics/Asynchronus/a.txt', 'utf8');
// console.log(newContentsAsync);