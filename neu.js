const { spawn } = require('child_process');
const fs = require('fs');
const { format } = require('path');
const { nextTick } = require('process');
const readline = require('readline');

async function processLineByLine() {
  //const fileStream = fs.createReadStream('11\\input.txt');
  const fileStream = fs.createReadStream('11\\testinput.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  for await (const line of rl) {
    console.log(line)
  }

}


processLineByLine();