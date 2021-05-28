'use strict'
// const fs = require('fs');
const Checker = require('./module/Checker.js');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Create reusable function for user input 
const userInput = (instruction) => {
  return new Promise((resolve, reject) => {
    rl.question(instruction , (answer) => {
      resolve(answer);
    });
  });
}

// Main Function
const main = async () => {

  var path = await userInput("Enter path. /path/to/file  ");
  var fileName = await userInput("Enter file name (index.js)  ");
  // var fileName = await fileNameInput();

  // Create an instence of Checker and check the file with the check method.
  const check_style = new Checker(path, fileName); 
  var message = await check_style.check();
  
  for (var i = message.length - 1; i >= 0; i--) {
    console.error(message[i]);
  }
  rl.close();
}
 // Call Main Function 
main();