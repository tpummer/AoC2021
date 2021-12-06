const { spawn } = require('child_process');
const fs = require('fs');
const { format } = require('path');
const { nextTick } = require('process');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('06\\input.txt');
  //const fileStream = fs.createReadStream('06\\testinput.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let fishes = [];
  let daysToReach = 80
  
  for await (const line of rl) {
    fishes = line.split(',').map( Number )
  }

  for(let day = 1; day <=daysToReach; day++){
    //console.log(fishes)
    
    let counterNew = 0;

    for(let i = 0; i < fishes.length; i++){
      fishes[i]--
      if(fishes[i] == -1){
        counterNew++;
        fishes[i] = 6
      }
    }

    for(let i = 0; i < counterNew; i ++){
      fishes.push(8);
    }
  }
  
  console.log(`After ${daysToReach} days there are ${fishes.length} fishes`)
}

function nextDay(fishes){
  
}

processLineByLine();