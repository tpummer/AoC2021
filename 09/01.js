const { spawn } = require('child_process');
const fs = require('fs');
const { format } = require('path');
const { nextTick } = require('process');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('09\\input.txt');
  //const fileStream = fs.createReadStream('09\\testinput.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let cave = [];

  let xMax = 0;
  let yMax = 0;
  
  for await (const line of rl) {
    let row = line.split('').map( Number )
    cave.push(row)
    xMax = row.length
  }
  yMax = cave.length

  //console.log(cave)
  console.log("Cave is = " + xMax + "x" + yMax)

  let result = 0

  for(let y = 0; y < yMax; y++){
    for(let x = 0; x < xMax; x++){ 
          let lowerNeigbour = false
          if(cave[y - 1] != undefined && cave[y -1][x] !== undefined && cave[y - 1][x] <= cave[y][x]){
               lowerNeigbour = true
          }
          if(cave[y][x -1] !== undefined && cave[y][x-1] <= cave[y][x]){
               lowerNeigbour = true
          }
          if(cave[y + 1] != undefined && cave[y + 1][x] !== undefined && cave[y + 1][x] <= cave[y][x]){
               lowerNeigbour = true
          }
          if(cave[y][x + 1] !== undefined && cave[y][x+1] <= cave[y][x]){
            lowerNeigbour = true
          } 
          if(lowerNeigbour == false){
              console.log("x: " + x + " y: " + y + " value:" + cave[y][x])
              if(cave[y-1] !== undefined) console.log(cave[y-1][x])
              if(cave[y][x-1] !== undefined) console.log(cave[y][x-1])
              if(cave[y+1] !== undefined) console.log(cave[y+1][x])
              if(cave[y][x+1] !== undefined) console.log(cave[y][x+1])
              result = result + 1 + cave[y][x]
          }
      }
  }
  
  console.log(`Result ${result}`)
}

processLineByLine();