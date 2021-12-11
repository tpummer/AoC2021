const { spawn } = require('child_process');
const fs = require('fs');
const { format } = require('path');
const { nextTick } = require('process');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('11\\input.txt');
  //const fileStream = fs.createReadStream('11\\testinput.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let grid = []
  
  for await (const line of rl) {
    grid.push(line.split('').map(Number))
  }

  maxX = grid[0].length
  maxY = grid.length

  let flashes = 0

  //console.log("Begin")
  //printMap(grid)
  let rounds = 0
  while(flashes != 100){
      flashes = 0
      rounds++
      increaseGrid(grid)

      let somethingExploded = false
      do{
          //printMap(grid)
          somethingExploded = false
          let newFlashes = boom(grid)
          if(newFlashes != 0){
            flashes += newFlashes
              somethingExploded = true
          }
      } while (somethingExploded)
  }
  console.log(rounds)
}

function boom(grid){
    let flashes = 0

    for(let y = 0; y < maxY; y++){
        for(let x = 0; x < maxX; x++){
            if(grid[y][x] > 9){
                flashes++
                makeBoom(x,y, grid)
            }
        }
    }
    first = false

    return flashes
}

function increaseGrid(grid){
    for(let y = 0; y < maxY; y++){
        for(let x = 0; x < maxX; x++){
            grid[y][x]++
        }
    }
    return grid
}


function printMap(map){
    let erg = ''
  
    for(let x = 0; x < map.length; x++){
      for(let y = 0; y < map[x].length; y++){
        erg = erg + map[x][y] + ','
      }
      erg = erg + '\n'
    }
  
    console.log(erg)
  }

  function makeBoom(x,y, grid){

    // selbst explodieren
    grid[y][x] = 0
    
    // nachbarn erhöhen
    let map = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]

    for(let neighbour of map){
        ydiff = neighbour[0]
        xdiff = neighbour[1]

        // wenn existent
        if(grid[y+ydiff] !== undefined && grid[x+xdiff] !== undefined){
            // wenn nicht schon explodiert
            if(grid[y+ydiff][x+xdiff] != 0){
                grid[y+ydiff][x+xdiff]++
            }
        }
    }
  }
  


processLineByLine();