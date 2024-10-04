// # npm

// The full form of **NPM** is **Node Package Manager**. 

// It is a package manager for JavaScript, primarily used for managing libraries and dependencies in Node.js projects. NPM allows developers to easily install, update, and manage packages of reusable code

// <aside>
// 💡 `package managers` are an important concept in programming languages/runtimes. 
// For eg the `package manager` of rust is `cargo`

// </aside>

// Uses of `npm`

// - Initializing a project

// ```jsx
// npm init
// ```

// - Running scripts

// ```jsx
// npm run test
// ```

// - Installing external dependencies

// ```jsx
// npm install chalk
// ```

// - Write some code

// ```jsx
// const chalk = require('chalk');

// console.log(chalk.blue('Hello, world!'));
// console.log(chalk.red.bold('This is an error message.'));
// console.log(chalk.green.underline('This is a success message.'));
// ```

import chalk from 'chalk'

console.log(chalk.blue('Hello, world!'));
console.log(chalk.red.bold('This is an error message.'));
console.log(chalk.green.underline('This is a success message.'));