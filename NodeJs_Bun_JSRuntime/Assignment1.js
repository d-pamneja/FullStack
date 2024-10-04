// Create a command line interface that lets the user specify a file path and the nodejs process counts the number of words inside it.

const { program } = require('commander');
const fs = require('fs');
const path = require('path');

program
  .name('WordCounter')
  .description('CLI to count words in a file')
  .version('0.0.1')
  .option('-s, --separator <word>','specific seperator for words (by default " ")')
  .argument('<input-file>')
  
program.parse();

const filename = program.args[0];
fs.readFile(filename, 'utf-8', function(err, contents) {
    if(err){
        console.log(err);
    }
    else{
        const sep = program.opts().separator ? program.opts().separator : " ";
        const count = contents.split(sep).length;
        console.log("You have " + count + " words in this file.")
    }
});

