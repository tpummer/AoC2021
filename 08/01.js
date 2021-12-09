const { spawn } = require('child_process');
const fs = require('fs');
const { format } = require('path');
const { nextTick } = require('process');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('08\\input.txt');
  //const fileStream = fs.createReadStream('08\\testinput.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let digits = [];
  
  for await (const line of rl) {
    //console.log(line)
    let row = line.split('|')[1].trimStart(' ').split(' ')
    row.forEach(entry => digits.push(entry))
  }

  result = 0

  console.log(digits)

  digits.forEach(digit =>
    result += getOneIfValid(digit))

  console.log(digits.length)
  console.log(result)

  
  //console.log(`After ${resultFuel} fuel used all crabs are at positoin ${resultSpot}.`)
}

function getOneIfValid(digit){
  console.log(digit)
  //1
  if(digit.length == 2) return 1
  //4
  if(digit.length == 4) return 1
  //7
  if(digit.length == 3) return 1
  //8
  if(digit.length == 7) return 1

  return 0
}

processLineByLine();