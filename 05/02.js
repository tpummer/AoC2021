const fs = require('fs');
const { format } = require('path');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('05\\input.txt');
  //const fileStream = fs.createReadStream('05\\testinput.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let values = [];
  
  for await (const line of rl) {
    values.push(line)
  }

  let map = generateMap(values)

  for(let i = 0; i < values.length && i < 100000; i++){
    drawLine(map, values[i])
    //console.log(values[i])
    //printMap(map)
  }

  let erg = findMoreThanTwo(map)
  
  console.log(`ergVaue ${erg['value']} ergCount ${erg['count']}`)
}

function drawLine(map, line){
  let tupels = line.split(' -> ');
  let start = tupels[0].split(',')
  let end = tupels[1].split(',')

  let x1 = Number(start[0])
  let y1 = Number(start[1])
  let x2 = Number(end[0])
  let y2 = Number(end[1])

  if(x1 == x2){
    for(let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++){
      map[y][x1]++;
    } 
  } else if (y1 == y2){
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++){
      map[y1][x]++;
    }
  } else if ((x1 > x2 && y1 > y2) || (x1 < x2 && y1 < y2)) {
    for (let x = Math.min(x1, x2), y = Math.min(y1, y2); x <= Math.max(x1, x2); x++, y++) {
      map[y][x]++;
    }
  } else {
    for (let x = Math.min(x1, x2), y = Math.max(y1, y2); x <= Math.max(x1, x2); x++, y--) {
      map[y][x]++;
    }
  }   

}

function findMoreThanTwo(map){
//printMap(map)

  let erg = []
  erg['value'] = '2+'
  erg['count'] = 0

  for(let x = 0; x < map.length; x++){
    for(let y = 0; y < map.length; y++){
      if(map[y][x] > 1){
        erg['count']++
      }
    }
  }

  return erg
}

function findMaxAndCount(map){
  //printMap(map)
  let erg = []

  erg['value'] = 0
  erg['count'] = 0

  for(let x = 0; x < map.length; x++){
    for(let y = 0; y < map.length; y++){
      if(map[x][y] > erg['value']){
        erg['value'] = map[x][y];
        erg['count'] = 0;
      } else if(map[x][y] == erg['value']){
        erg['count']++
      }
    }
  }

  return erg
}

function printMap(map){
  let erg = ''

  for(let x = 0; x < map.length; x++){
    for(let y = 0; y < map.length; y++){
      erg = erg + map[x][y] + ','
    }
    erg = erg + '\n'
  }

  console.log(erg)
}


function generateMap(values){
  let maxX = 0
  let maxY = 0
  for(let i = 0; i < values.length; i++){
    let line = values[i].split(' -> ');
    let start = line[0].split(',')
    let end = line[1].split(',')

    if(maxX < Number(start[0])) maxX = Number(start[0])
    if(maxY < Number(start[1])) maxY = Number(start[1])
    if(maxX < Number(end[0])) maxX = Number(end[0])
    if(maxY < Number(end[1])) maxY = Number(end[1])
  }

  console.log(`Mapsize: ${maxX},${maxY}`)

  let map = makeArray(maxX+1, maxY+1, 0)

  return map
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
