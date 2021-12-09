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

  let lowest = []

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
              //console.log("x: " + x + " y: " + y + " value:" + cave[y][x])
              //if(cave[y-1] !== undefined) console.log(cave[y-1][x])
              //if(cave[y][x-1] !== undefined) console.log(cave[y][x-1])
              //if(cave[y+1] !== undefined) console.log(cave[y+1][x])
              //if(cave[y][x+1] !== undefined) console.log(cave[y][x+1])
              lowest.push(y+","+x)
              result = result + 1 + cave[y][x]
          }
      }
  }
  
  //console.log(`Result ${result}`)

  //console.log(lowest)

  let seizes = []

  for(let low of lowest){
    console.log(low)
    let visited = []
    let count = 1
    let neighbours = getNeighbours(low, visited, cave)
    console.log(neighbours)
    for(let n of neighbours){
      if(visited.indexOf(n) != 1 && cave[low.split(',')[0]][low.split(',')[1]] != 9 ){
        count++
        visited.push(n)
      }
    }
    seizes.push(count)
  }

  seizes.sort(function(a, b){return a-b});

  console.log(seizes)

  let finish = seizes[seizes.length-1] * seizes[seizes.length-2] * seizes[seizes.length-3]
  console.log("Finish " + finish)

}

function getNeighbours(root, visited, cave){
  if(visited.indexOf(root) != -1){
    return [] 
  }
  visited.push(root)
  let result = []
  let y = root.split(',').map(Number)[0]
  let x = root.split(',').map(Number)[1]
  let node = cave[y][x]
  if(node == 9 ){
    return result
  }
  result.push(root)
  console.log(root + ": " + result) 
  newX = x
  newY = y-1
  if(cave[y-1] !== undefined){
    result = result.concat(getNeighbours(newY+","+newX, visited, cave))
  }
  console.log(root + ": " + result) 
  newX = x-1
  newY = y
  if(cave[y][x-1] !== undefined){
    result = result.concat(getNeighbours(newY+","+newX, visited, cave))
  }
  console.log(root + ": " + result) 
  newX = x
  newY = y+1
  if(cave[y+1] !== undefined){
    result = result.concat(getNeighbours(newY+","+newX, visited, cave))
  }
  console.log(root + ": " + result) 
  newX = x+1
  newY = y
  if(cave[y][x+1] !== undefined) {
    result = result.concat(getNeighbours(newY+","+newX, visited, cave))
  }          
  console.log(root + ": " + result) 
  return result
}

processLineByLine();