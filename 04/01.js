const fs = require('fs');
const { format } = require('path');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('04\\input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let count = 0;
  
  let first = true;

  let bingonumbers = [];
  let bretter = [];
  let brett = [];
  for await (const line of rl) {
    if(first){
      first = false;
      bingonumbers = line.split(',');
    } else {
      if(line == ''){
        if(brett.length != 0) {
          bretter.push(brett);
        }
        brett = [];
      } else {
        let dirty = line.split(' ');
        let clear = []
        for(let i = 0; i < dirty.length; i++){
          if(dirty[i] != ''){
            clear.push(dirty[i])
          }
        }
        brett.push(clear)
      }
    }
  }
  bretter.push(brett);

  // :/ sorted
  //for(const bingonumber in bingonumbers){
  //  console.log(bingonumber)
  //

  let winner = true;

  for(let i = 0; i < bingonumbers.length; i++){
    for(let j = 0; j < bretter.length; j++){
      markIfEists(bingonumbers[i], bretter[j])
      if(winner && hasBingo(bretter[j])){
        console.log(`Winner: ${calculateIdentifier(bretter[j], bingonumbers[i])}`)
        winner = false
      }
    }
  }
  

  console.log(`Bingonumbers: ${bingonumbers} Bretter: ${bretter.length}`);
}

function markIfEists(number, brett){
  for(let x = 0; x < brett.length; x++){
    for(let y = 0; y < brett[x].length; y++){
      if(brett[x][y] === number) {
        brett[x][y] = 'x';
      }
    }
  }
}

function calculateIdentifier(brett, number){
  let result = 0;
  for(let x = 0; x < brett.length; x++){
    for(let y = 0; y < brett[x].length; y++){
      if(brett[x][y] != 'x') {
        result += Number(brett[x][y]);
      }
    }
  }
  return result * number
}

function hasBingo(brett){
  console.log(brett)
  let brettXMax = brett.length;
  let brettYMax = brett[0].length;
  console.log(`x ${brettXMax} y ${brettYMax}`)

  if(brett[0][0] == 'x' && brett[0][1] == 'x' && brett[0][2] == 'x' && brett[0][3] == 'x' && brett[0][4] == 'x') return true;
  if(brett[1][0] == 'x' && brett[1][1] == 'x' && brett[1][2] == 'x' && brett[1][3] == 'x' && brett[1][4] == 'x') return true;
  if(brett[2][0] == 'x' && brett[2][1] == 'x' && brett[2][2] == 'x' && brett[2][3] == 'x' && brett[2][4] == 'x') return true;
  if(brett[3][0] == 'x' && brett[3][1] == 'x' && brett[3][2] == 'x' && brett[3][3] == 'x' && brett[3][4] == 'x') return true;
  if(brett[4][0] == 'x' && brett[4][1] == 'x' && brett[4][2] == 'x' && brett[4][3] == 'x' && brett[4][4] == 'x') return true;

  if(brett[0][0] == 'x' && brett[1][0] == 'x' && brett[2][0] == 'x' && brett[3][0] == 'x' && brett[4][0] == 'x') return true;
  if(brett[0][1] == 'x' && brett[1][1] == 'x' && brett[2][1] == 'x' && brett[3][1] == 'x' && brett[4][1] == 'x') return true;
  if(brett[0][2] == 'x' && brett[1][2] == 'x' && brett[2][2] == 'x' && brett[3][2] == 'x' && brett[4][2] == 'x') return true;
  if(brett[0][3] == 'x' && brett[1][3] == 'x' && brett[2][3] == 'x' && brett[3][3] == 'x' && brett[4][3] == 'x') return true;
  if(brett[0][4] == 'x' && brett[1][4] == 'x' && brett[2][4] == 'x' && brett[3][4] == 'x' && brett[4][4] == 'x') return true;

  return false;
}

processLineByLine();
