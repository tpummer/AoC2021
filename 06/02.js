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

  let fishes = [0,0,0,0,0,0,0,0,0]
  let daysToReach = 256
  
  for await (const line of rl) {
    let values = line.split(',').map( Number )
    values.forEach(fish => {
      fishes[fish]++
    })
  }

  for(let day = 1; day <=daysToReach; day++){
    console.log("DAY "+day)
    console.log("o"+fishes)
    let newDayFishes = [0,0,0,0,0,0,0,0,0]

    for(let i = 0; i < fishes.length; i++){
      let count = fishes[i]
      let newPos = i -1
      console.log("c"+count+"p"+newPos)
      if(newPos != -1){
        newDayFishes[newPos] += count
      }
      if(newPos == -1 && count > 0){
        newDayFishes[6] += count
        newDayFishes[8] += count
      }
    }
    console.log("n"+newDayFishes)

    fishes = newDayFishes
  }

  let sum = 0;
  fishes.forEach(fish => sum += fish)
  
  console.log(`After ${daysToReach} days there are ${sum} fishes`)
}

function makeArray(w, h, val) {
  var arr = [];
  for(let i = 0; i < h; i++) {
      arr[i] = [];
      for(let j = 0; j < w; j++) {
          arr[i][j] = val;
      }
  }
  return arr;
}

processLineByLine();